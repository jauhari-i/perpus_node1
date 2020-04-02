module.exports = cekStok = async (conn, id, cb) => {
  if (!id) {
    cb("Kode buku tidak valid");
  }
  await conn.query("SELECT * FROM buku WHERE kd_buku = ?", id, (err, buku) => {
    if (err) {
      cb(err);
    } else if (buku.length > 0) {
      if (buku[0].stok < 0) {
        cb("Stok buku tidak memadai");
      } else {
        cb(null, {
          msg: "Stok buku memadai",
          buku: buku[0]
        });
      }
    } else {
      cb("Buku tidak ditemukan");
    }
  });
};
