class HttpError extends Error {
  constructor(response) {
    super("HttpError");
    this.message = response?.message ?? "Terjadi kesalahan pada server.";
    this.response = response;

    console.log("HTTP ERR:", response);
  }
}

module.exports = HttpError;
