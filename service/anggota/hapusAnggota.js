const cekAnggota = require("./cekAnggota");

module.exports = async function hapusAnggota(conn, id, cb) {
  if (!id) {
    cb("Kode anggota tidak ditemukan");
  } else {
    await cekAnggota(conn, id, (err, result) => {
      if (err) {
        cb(err);
      } else {
        conn.query(
          "DELETE FROM anggota WHERE kd_anggota = ?",
          id,
          (err, deleted) => {
            if (err) {
              cb(err);
            } else if (deleted) {
              cb(null, {
                status: 200,
                deleted: true,
                msg: "Anggota berhasil dihapus",
                data: deleted
              });
            } else {
              cb({
                status: 400,
                deleted: false,
                msg: "Gagal menghapus anggota"
              });
            }
          }
        );
      }
    });
  }
};
