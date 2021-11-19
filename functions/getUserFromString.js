// Call this code from anywhere in the bot with a string and the message passed through, and
// this will try to find the user they tried to 'access'(?)

module.exports = (string, message) => {
  const client = message.client;

  let expression = string.match(/<@!?(\d+)>/);
  if (expression) {
    const user = client.users.cache.get(expression[1]);
    if (user) return user;
  }

  expression = string.match(/(\d+)/);
  if (expression) {
    const user = client.users.cache.get(expression[1]);
    if (user) return user;
  }
};