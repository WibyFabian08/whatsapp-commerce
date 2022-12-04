exports.registerMessage = {
  createCategory: "Mohon untuk masukan kategori merchant!",
  createName: "*Mohon untuk inputkan nama merchant!*",
  createOwner: "*Mohon untuk inputkan pemilik toko!*",
  createPhone: "*Mohon untuk inputkan nomor telp merchant! (ex. 085321454813)*",
  createEmail: "*Mohon untuk inputkan email merchant! (ex. merchant@gmail.com)*",
  createAddress: "*Mohon untuk inputkan alamat merchant!*",
  createLocation: "*Mohon untuk kirimkan lokasi kamu (Menggunakan fitur sharelocation)!*\nCatatan : Gunakan current location / lokasi sekarang, bukan live location.",
  createIDCard: "*Mohon untuk kirimkan foto ktp kamu!*",
  createStore: "*Mohon untuk kirimkan foto toko!*",
  createAccountNumber: "*Mohon untuk inputkan no rekening merchant!*",
  successCreatingMerchant: "Berhasil! data merchant sudah tersimpan di sistem kami.",
  cancelCreating: "Pembuatan merchant berhasil dibatalkan.",
  changeData: "Mohon untuk memilih data yang ingin diubah.",
};

exports.reservasiMessage = {
  createKotaStart: "Mohon untuk memilih kota keberangkatan.",
  createOutletStart: "Mohon untuk memilih outlet keberangkatan.",
  createKotaArrive: "Mohon untuk memilih kota kedatangan.",
  createOutletArrive: "Mohon untuk memilih outlet kedatangan.",
  createTanggalKeberangkatan: "Mohon untuk memilih tanggal keberangkatan.",
  createJumlahPenumpang: "Mohon untuk memilih jumlah penumpang.",
  createJadwalKeberangkatan: "Mohon untuk memilih jadwal keberangkatan.",
  createListSeat: "*Informasi Tempat Duduk.*\n 1. Tersedia \n 2. Tersedia \n 3. Tersedia \n 4. Tersedia \n 5. Tersedia \n 6. Tersedia \n 7. Tersedia \n 8. Tersedia \n 9. Tersedia \n 10. Tersedia",
  createBangkuPenumpang: "Silahkan pilih bangku untuk penumpang",
  createNomorPenumpang: "Silahkan ketik nomor telfon anda. (_contoh : 085156658616_)",
  createNamaPenumpang: "Silahkan ketik nama lengkap anda.",
  createPembayaran: "Mohon untuk memilih metode pembayaran.",
};

exports.errorMessage = {
  validationNumber: "Mohon untuk mengirimkan dengan format nomor.",
  validationList: "Mohon untuk mengirimkan dengan format yang disediakan pada list menu.",
  validationText: "Mohon untuk mengirimkan dengan format text.",
  validationFormat: "Format tidak ditemukan.",
  validationImage: "Mohon untuk mengirimkan dengan format gambar.",
  validationFile: "Mohon untuk mengirimkan dengan format file.",
  validationLocation: "Mohon untuk mengirimkan dengan format sharelocation.",
  validationExists: "Data ini sudah terpakai.",
  validationLength: "Panjang Karakter tidak sesuai.",
};

exports.commonMessage = {
  dataEmpty: "Data kosong!",
  cancel: "Silahkan ketik *batal* untuk membatalkan proses.",
};

exports.merchantReviewButtons = [
  {
    buttonId: "change",
    buttonText: {
      displayText: "Ubah Data",
    },
  },
  {
    buttonId: "confirm",
    buttonText: {
      displayText: "Konfirmasi",
    },
  },
  {
    buttonId: "cancel",
    buttonText: {
      displayText: "Batalkan",
    },
  },
];

exports.paymentMethodMenu = [
  {
    title: "Metode Pembayaran",
    rows: [
      {
        title: "QRIS",
        description: " ",
        rowId: "qrisMethod",
      },
      {
        title: "Payment Gateway",
        description: " ",
        rowId: "pgMethod",
      },
    ],
  },
];

exports.cancelRegisterButton = [
  {
    buttonId: "cancel",
    buttonText: {
      displayText: "Batalkan",
    },
  },
];

exports.paymentMessage = {
  qrisReceived: "Silahkan scan qris diatas untuk melakukan pembayaran.",
  pgReceived: "Silahkan scan qr diatas untuk menuju ke link pembayaran.",
};

exports.code = {
  transaction: "TRX",
  merchant: "MID",
};
