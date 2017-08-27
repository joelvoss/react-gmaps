const address = require('address');
const url = require('url');
const chalk = require('chalk');
const clearConsole = require('./clearConsole');
const formatWebpackMessages = require('./formatWebpackMessages');

const isInteractive = process.stdout.isTTY;
let handleCompile;

function prepareUrls(protocol, host, port) {
  const formatUrl = hostname =>
    url.format({
      protocol,
      hostname,
      port,
      pathname: '/'
    });
  const prettyPrintUrl = hostname =>
    url.format({
      protocol,
      hostname,
      port: chalk.bold(port),
      pathname: '/'
    });

  const isUnspecifiedHost = host === '0.0.0.0' || host === '::';
  let prettyHost, lanUrlForConfig, lanUrlForTerminal;
  if (isUnspecifiedHost) {
    prettyHost = 'localhost';
    try {
      // This can only return an IPv4 address
      lanUrlForConfig = address.ip();
      if (lanUrlForConfig) {
        // Check if the address is a private ip
        // https://en.wikipedia.org/wiki/Private_network#Private_IPv4_address_spaces
        if (/^10[.]|^172[.](1[6-9]|2[0-9]|3[0-1])[.]|^192[.]168[.]/.test(lanUrlForConfig)) {
          // Address is private, format it for later use
          lanUrlForTerminal = prettyPrintUrl(lanUrlForConfig);
        } else {
          // Address is not private, so we will discard it
          lanUrlForConfig = undefined;
        }
      }
    } catch (_e) {
      // ignored
    }
  } else {
    prettyHost = host;
  }
  const localUrlForTerminal = prettyPrintUrl(prettyHost);
  const localUrlForBrowser = formatUrl(prettyHost);
  return {
    lanUrlForConfig,
    lanUrlForTerminal,
    localUrlForTerminal,
    localUrlForBrowser
  };
}

function printInstructions(appName, urls, useYarn) {
  console.log();
  console.log(`You can now view ${chalk.bold(appName)} in the browser.`);
  console.log();

  if (urls.lanUrlForTerminal) {
    console.log(`  ${chalk.bold('Local:')}            ${urls.localUrlForTerminal}`);
    console.log(`  ${chalk.bold('On Your Network:')}  ${urls.lanUrlForTerminal}`);
  } else {
    console.log(`  ${urls.localUrlForTerminal}`);
  }

  console.log();
  console.log('Note that the development build is not optimized.');
  console.log(`To create a production build, use ` + `${chalk.cyan(`npm run build`)}.`);
  console.log();
}

function createCompiler(webpack, config, appName, urls, useYarn) {
  // "Compiler" is a low-level interface to Webpack.
  // It lets us listen to some events and provide our own custom messages.
  let compiler;
  try {
    compiler = webpack(config, handleCompile);
  } catch (err) {
    console.log(chalk.red('Failed to compile.'));
    console.log();
    console.log(err.message || err);
    console.log();
    process.exit(1);
  }

  // "invalid" event fires when you have changed a file, and Webpack is
  // recompiling a bundle. WebpackDevServer takes care to pause serving the
  // bundle, so if you refresh, it'll wait instead of serving the old one.
  // "invalid" is short for "bundle invalidated", it doesn't imply any errors.
  compiler.plugin('invalid', () => {
    if (isInteractive) {
      clearConsole();
    }
    console.log('Compiling...');
  });

  let isFirstCompile = true;

  // "done" event fires when Webpack has finished recompiling the bundle.
  // Whether or not you have warnings or errors, you will get this event.
  compiler.plugin('done', stats => {
    if (isInteractive) {
      clearConsole();
    }

    // We have switched off the default Webpack output in WebpackDevServer
    // options so we are going to "massage" the warnings and errors and present
    // them in a readable focused way.
    const messages = formatWebpackMessages(stats.toJson({}, true));
    const isSuccessful = !messages.errors.length && !messages.warnings.length;
    if (isSuccessful) {
      console.log(chalk.green('Compiled successfully!'));
    }
    if (isSuccessful && (isInteractive || isFirstCompile)) {
      printInstructions(appName, urls, useYarn);
    }
    isFirstCompile = false;

    // If errors exist, only show errors.
    if (messages.errors.length) {
      console.log(chalk.red('Failed to compile.\n'));
      console.log(messages.errors.join('\n\n'));
      return;
    }

    // Show warnings if no errors were found.
    if (messages.warnings.length) {
      console.log(chalk.yellow('Compiled with warnings.\n'));
      console.log(messages.warnings.join('\n\n'));

      // Teach some ESLint tricks.
      console.log(
        '\nSearch for the ' + chalk.underline(chalk.yellow('keywords')) + ' to learn more about each warning.'
      );
      console.log('To ignore, add ' + chalk.cyan('// eslint-disable-next-line') + ' to the line before.\n');
    }
  });
  return compiler;
}

module.exports = {
  createCompiler,
  prepareUrls
};
