const chalk = require('chalk');

function printHostingInstructions(appPackage, publicUrl, publicPath, buildFolder) {
  if (publicPath !== '/') {
    // "homepage": "http://mywebsite.com/project"
    console.log(`The project was built assuming it is hosted at ${chalk.green(publicPath)}.`);
    console.log(
      `You can control this with the ${chalk.green('homepage')} field in your ${chalk.cyan('package.json')}.`
    );
    console.log();
    console.log(`The ${chalk.cyan('build')} folder is ready to be deployed.`);
    console.log();
  } else {
    if (publicUrl) {
      // "homepage": "http://mywebsite.com"
      console.log(`The project was built assuming it is hosted at ${chalk.green(publicUrl)}.`);
      console.log(
        `You can control this with the ${chalk.green('homepage')} field in your ${chalk.cyan('package.json')}.`
      );
      console.log();
    } else {
      // no homepage
      console.log('The project was built assuming it is hosted at the server root.');
      console.log(`To override this, specify the ${chalk.green('homepage')} in your ${chalk.cyan('package.json')}.`);
      console.log();
    }
    console.log(`The ${chalk.cyan(buildFolder)} folder is ready to be deployed.`);
    console.log('You may serve it with a static server:');
    console.log();
    console.log(`  ${chalk.cyan('npm')} install -g serve`);
    console.log(`  ${chalk.cyan('serve')} -s ${buildFolder}`);
    console.log();
  }
}

module.exports = printHostingInstructions;
