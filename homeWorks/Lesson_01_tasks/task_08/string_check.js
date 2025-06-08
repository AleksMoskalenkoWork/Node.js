module.exports = (string) => {
  const regExpression = /^[a-zа-яёїієґ]+$/;
  const formatString = string.trim();
  const isValid = regExpression.test(formatString);
  if (string === '') {
    return true;
  }

  return isValid;
};
