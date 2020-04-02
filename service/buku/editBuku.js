const cekBuku = require("./cekBuku");

module.exports = async function editBuku(conn, data, id, cb) {
  const validation = [];
  if (!data.nm_buku) {
    validation.push({
      error: "Nama buku diperlukan"
    });
  }
  if (!data.pengarang) {
    validation.push({
      error: "Pengarang diperlukan"
    });
  }
  if (!data.penerbit) {
    validation.push({
      error: "Penerbit diperlukan"
    });
  }
  if (!data.tarif) {
    validation.push({
      error: "Tarif diperlukan"
    });
  }
  if (!data.durasi) {
    validation.push({
      error: "Durasi diperlukan"
    });
  }
  if (!data.stok) {
    validation.push({
      error: "Stok diperlukan"
    });
  }
  if (!id) {
    validation.push({
      error: "Kode buku tidak valid"
    });
  }
  if (validation.length > 0) {
    cb(validation);
  } else {
    await cekBuku(conn, id, (err, ada) => {
      if (err) {
        cb(err);
      } else {
        conn.query(
          "UPDATE buku SET nm_buku = ?, pengarang = ?, penerbit = ?, tarif = ?, stok = ?, durasi = ? WHERE kd_buku = ?",
          [
            data.nm_buku,
            data.pengarang,
            data.penerbit,
            data.tarif,
            data.stok,
            data.durasi,
            id
          ],
          (err, updated) => {
            if (err) {
              cb(err);
            } else if (updated) {
              cb(null, {
                status: 200,
                updated: true,
                msg: "Buku telah diupdate",
                data: updated
              });
            } else {
              cb({
                status: 400,
                updated: false,
                msg: "Gagal mengupdate buku"
              });
            }
          }
        );
      }
    });
  }
};
