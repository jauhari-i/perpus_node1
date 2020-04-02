const cekAnggota = require("./cekAnggota");

module.exports = async function editAnggota(conn, data, id, cb) {
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
  if (!id) {
    validation.push({
      error: "Kode anggota tidak valid"
    });
  }
  if (validation.length > 0) {
    cb(validation);
  } else {
    await cekAnggota(conn, id, (err, ada) => {
      if (err) {
        cb(err);
      } else {
        conn.query(
          "UPDATE anggota SET nm_anggota = ?, alamat = ?, tlpn = ? WHERE kd_anggota = ?",
          [data.nm_anggota, data.alamat, data.tlpn, id],
          (err, updated) => {
            if (err) {
              cb(err);
            } else if (updated) {
              cb(null, {
                status: 200,
                updated: true,
                msg: "Anggota telah diupdate",
                data: updated
              });
            } else {
              cb({
                status: 400,
                updated: false,
                msg: "Gagal mengupdate anggota"
              });
            }
          }
        );
      }
    });
  }
};
