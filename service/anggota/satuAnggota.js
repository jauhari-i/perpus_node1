module.exports = async function satuAnggota(conn, id, cb) {
  if (!id) {
    cb("kode anggota tidak ditemukan");
  } else {
    await conn.query(
      "SELECT * FROM anggota WHERE kd_anggota = ?",
      id,
      (err, anggota) => {
        if (err) {
          cb(err);
        } else if (anggota.length > 0) {
          cb(null, {
            status: 200,
            data: anggota.map(doc => ({
              kode_anggota: "AG" + doc.kd_anggota,
              nama_anggota: doc.nm_anggota,
              alamat: doc.alamat,
              telepon: doc.tlpn
            }))
          });
        } else {
          cb({
            status: 404,
            data: null,
            msg: "Data anggota tidak ditemukan"
          });
        }
      }
    );
  }
};
