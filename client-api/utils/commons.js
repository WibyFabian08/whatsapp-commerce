const date = require("date-and-time");
const qrString = require("qr-string");
const sharp = require("sharp");
const path = require("path");
const { code } = require("../utils/constants");

function generateInvoiceCode(id) {
  const now = new Date();
  const dateCode = date.format(now, "YYYYMMDDHHSS");

  return code.transaction + dateCode + id;
}

function generateMerchantCode(id) {
  const now = new Date();
  const dateCode = date.format(now, "YYYYMMDD");

  return code.merchant + "." + dateCode + String(id).padStart(5, "0");
}

const formatPrice = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

async function convertQRString(qrisString, owner_name, customer_name, price) {
  const base64Qris = await qrString.sync({ message: qrisString });
  const headerLabel = `
        <svg width="400" height="75">
          <rect x="0" y="0" width="100%" height="100%" fill="none" />
          <text x="50%" y="35%" text-anchor="middle" dy=".3em" font-family="Arial, Helvetica, sans-serif" font-weight="bold" font-size="30" fill="#000">${owner_name}</text>
          <text x="50%" y="73%" text-anchor="middle" dy=".3em" font-family="Arial, Helvetica, sans-serif" font-size="17" fill="#000">${customer_name}</text>
        </svg>
      `;
  const priceLabel = `
        <svg width="240" height="120">
          <rect x="0" y="0" width="100%" height="100%" fill="none" />
          <text x="50%" y="50%" text-anchor="middle" dy=".3em" font-family="Arial, Helvetica, sans-serif" font-weight="bold" font-size="30" fill="#000">RP. ${price}</text>
        </svg>
      `;
  const t = await sharp(
    path.join(__dirname, "../public/images/qris-background.png")
  )
    .composite([
      {
        input: Buffer.from(base64Qris.split(";base64,").pop(), "base64"),
        gravity: "centre",
      },
      { input: Buffer.from(headerLabel), top: 88, left: 36, gravity: "centre" },
      {
        input: Buffer.from(priceLabel),
        top: 450,
        left: 100,
        gravity: "centre",
      },
    ])
    .toBuffer();

  return `data:image/png;base64,${t.toString("base64")}`;
}

module.exports = {
  generateInvoiceCode,
  generateMerchantCode,
  formatPrice,
  convertQRString,
};
