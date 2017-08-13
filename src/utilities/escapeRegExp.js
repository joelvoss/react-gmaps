/**
 * Escapes special characters in user input for regex
 * @param {string} str - The user input string
 */
const escapeRegExp = str => {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
};

export default escapeRegExp;
