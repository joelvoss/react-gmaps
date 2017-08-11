/**
 * Helper method to create a dom node from a string representation.
 * @param {string} string - The html as string representation
 * @returns a valid dom node.
 */
const createElementFromString = string => {
  const template = document.createElement('div');
  template.innerHTML = string;
  return template.firstChild;
};

export default createElementFromString;
