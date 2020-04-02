module.exports = async function semuaAnggota(conn, cb) {
  await conn.query("SELECT * FROM anggota", (err, data) => {
    if (err) {
      cb(err);
    } else if (data.length > 0) {
      const datas = data.map(doc => ({
        kode_anggota: "AG" + doc.kd_anggota,
        nama_anggota: doc.nm_anggota,
        alamat: doc.alamat,
        telepon: doc.tlpn
      }));
      cb(null, {
        status: 200,
        data: datas
      });
    } else {
      cb({
        status: 200,
        data: null,
        msg: "Data anggota kosong"
      });
    }
  });
};
