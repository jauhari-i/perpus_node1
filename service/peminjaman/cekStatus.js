const moment = require("moment");

module.exports = cekStatus = async (conn, peminjaman, cb) => {
  const kd_buku = peminjaman.kd_buku;
  const kd_pinjam = peminjaman.no_pinjam;
  await conn.query(
    "SELECT durasi FROM buku WHERE kd_buku = ?",
    kd_buku,
    (err, durasi) => {
      if (err) {
        cb(err);
      } else {
        conn.query(
          "SELECT * FROM peminjam WHERE no_pinjam = ?",
          kd_pinjam,
          (err, pinjam) => {
            if (err) {
              cb(err);
            } else if (pinjam.length > 0) {
              const dataPeminjaman = pinjam[0];
              const tgl_pengembalian = moment(dataPeminjaman.tgl_pinjam)
                .add(durasi[0].durasi, "d")
                .format("");
              const today = moment().format();
              if (tgl_pengembalian > today) {
                cb(null, {
                  status: 1
                });
              } else {
                cb(null, {
                  status: 2
                });
              }
            } else {
              cb("Data peminjaman tidak ditemukan");
            }
          }
        );
      }
    }
  );
};
