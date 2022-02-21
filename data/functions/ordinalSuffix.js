// This code takes any number and returns it with the ordinal suffix attached.
// Examples: 1st, 2nd, 3rd, 4th

module.exports = (number) => {
  const j = number % 10;
  const k = number % 100;

  if (j == 1 && k != 11) return number + 'st';
  if (j == 2 && k != 12) return number + 'nd';
  if (j == 3 && k != 13) return number + 'rd';

  return number + 'th';
};

// If you're reading this and know what the variables mean, please change them.
// I copy-pasted this code from SO and have no idea how it works, but it works
// and I have no interest in changing it as I don't know what I'm doing.