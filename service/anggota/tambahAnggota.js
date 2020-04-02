module.exports = async function tambahAnggota(conn, data, cb) {
  const validation = [];
  if (!data.nm_anggota) {
    validation.push({
      error: "Nama anggota diperlukan"
    });
  }
  if (!data.alamat) {
    validation.push({
      error: "Alamat diperlukan"
    });
  }
  if (!data.tlpn) {
    validation.push({
      error: "Telepon diperlukan"
    });
  }
  if (validation.length > 0) {
    cb(validation);
  } else {
    await conn.query(
      "INSERT INTO anggota (nm_anggota,alamat,tlpn) VALUES (?,?,?)",
      [data.nm_anggota, data.alamat, data.tlpn],
      (err, inserted) => {
        if (err) {
          cb(err);
        } else if (inserted) {
          cb(null, {
            status: 200,
            inserted: true,
            msg: "Anggota telah ditambahkan",
            data: inserted
          });
        } else {
          cb("Gagal menambahkan anggota");
        }
      }
    );
  }
};
