module.exports = async function satuPetugas(conn, id, cb) {
  if (!id) {
    cb("Kode petugas tidak ditemukan");
  } else {
    await conn.query(
      "SELECT * FROM petugas WHERE kd_petugas = ?",
      id,
      (err, petugas) => {
        if (err) {
          cb(err);
        } else if (petugas.length > 0) {
          cb(null, {
            satuPetugas: 200,
            data: petugas.map(doc => ({
              kode_petugas: "P" + doc.kd_petugas,
              nama_petugas: doc.nm_petugas,
              jabatan: doc.jabatan,
              telepon: doc.tlpn_petugas
            }))
          });
        } else {
          cb({
            status: 404,
            data: null,
            msg: "Data petugas tidak ditemukan"
          });
        }
      }
    );
  }
};
