class BotError extends Error {
  constructor(message) {
    super("BotError");
    this.isOperational = true;
    this.message = message;
  }
}

module.exports = BotError;
