/**
   * Helper method that normalizes a given svg string.
   * @param {string} svgString - The raw svg string.
   * @param {number} width - The with of the final svg.
   * @param {number} height - The height of the final svg.
   */
export const createSVGDataURIFromString = (svgString, width, height) => {
  return (
    'data:image/svg+xml,' +
    encodeURIComponent(
      svgString
        .replace(/width\s*=\s*"?(\d+)"/, `width="${width}"`)
        .replace(/height\s*=\s*"?(\d+)"/, `height="${height}"`)
        .replace(/\n+/g, '')
    ) // remove newlines & encode URL-unsafe characters
      .replace(/%20/g, ' ') // put spaces back in
      .replace(/%3D/g, '=') // ditto equals signs
      .replace(/%3A/g, ':') // ditto colons
      .replace(/%2F/g, '/') // ditto slashes
      .replace(/%22/g, "'") // replace quotes with apostrophes (may break certain SVGs)
  );
};