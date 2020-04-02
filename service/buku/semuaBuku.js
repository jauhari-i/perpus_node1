module.exports = async function semuaBuku(conn, cb) {
  await conn.query("SELECT * FROM buku", (err, data) => {
    if (err) {
    } else if (data.length > 0) {
      const datas = data.map(doc => ({
        kode_buku: doc.kd_buku,
        nama_buku: doc.nm_buku,
        pengarang: doc.pengarang,
        penerbit: doc.penerbit,
        tarif: doc.tarif,
        stok: doc.stok,
        durasi: doc.durasi
      }));
      cb(null, {
        status: 200,
        data: datas
      });
    } else {
      cb({
        status: 200,
        data: null,
        msg: "Data buku kosong"
      });
    }
  });
};
