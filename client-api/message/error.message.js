exports.error200 = () => {
    return "Ups maaf Kak, terjadi kesalahan. 😭 \nSilahkan kembali ke Menu Utama dan coba beberapa saat lagi ya Kak.";
}

exports.invalidRequest = (state) => {
    return `Ups pesan yang Kaka kirim tidak valid, silahkan pilih *${state}* ya Kak`;
}

exports.invalidButton = (state) => {
    return `Ups Tidak dapat memilih menu *${state}* Kak, silahkan lanjutkan proses Reservasi atau ketik *Batal* untuk kembali ke Menu Utama ya Kak.`;
}

exports.ruteNull = () => {
    return "Ups, Maaf Kak untuk Rute di Hari tersebut tidak tersedia Jadwal Keberangkatan.\nSilahkan lakukan Reservasi kembali atau kunjungi website kami di www.pasteurtrans.id untuk informasi keseluruhan Rute yang tersedia. 🙏"
}

exports.bookExpired = () => {
    return `Ups, tidak bisa melakukan pembayaran karena Data Booking Kakak sudah *expired*.\nSilahkan lakukan Reservasi kembali ya Kak.`
}