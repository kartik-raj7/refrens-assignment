const getLastDigitsAfterSlash = (url) => {
  const parts = url.split("/");
  const lastPart = parts[parts.length - 1];
  const digits = lastPart.match(/\d+/);
  return digits ? parseInt(digits[0], 10) : null;
};
export { getLastDigitsAfterSlash };
