const cekStok = require("./cekStok");

module.exports = gantiStok = async (conn, id, stok, cb) => {
  await cekStok(conn, id, (err, result) => {
    if (err) {
      cb(err);
    } else {
      const buku = result.buku;
      const newStok = buku.stok - stok;
      if (newStok < 0) {
        cb("Jumlah buku tidak valid");
      } else {
        conn.query(
          "UPDATE buku SET stok = ? WHERE kd_buku = ? ",
          [newStok, id],
          (err, ganti) => {
            if (err) {
              cb(err);
            } else if (ganti) {
              cb(null, {
                msg: "Stok buku berhasil diupdate"
              });
            } else {
              cb("Gagal memperbarui stok buku");
            }
          }
        );
      }
    }
  });
};
