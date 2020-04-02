module.exports = async function satuBuku(conn, id, cb) {
  if (!id) {
    cb("Kode buku tidak ditemukan");
  } else {
    await conn.query(
      "SELECT * FROM buku WHERE kd_buku = ?",
      id,
      (err, buku) => {
        if (err) {
          cb(err);
        } else if (buku.length > 0) {
          cb(null, {
            satuBuku: 200,
            data: buku.map(doc => ({
              kode_buku: doc.kd_buku,
              nama_buku: doc.nm_buku,
              pengarang: doc.pengarang,
              penerbit: doc.penerbit,
              tarif: doc.tarif,
              stok: doc.stok,
              durasi: doc.durasi
            }))
          });
        } else {
          cb({
            status: 404,
            data: null,
            msg: "Data buku tidak ditemukan"
          });
        }
      }
    );
  }
};
