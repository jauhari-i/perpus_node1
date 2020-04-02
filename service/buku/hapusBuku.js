const cekBuku = require("./cekBuku")

module.exports = async function hapusBuku(conn, id, cb) {
    if (!id) {
        cb("Kode buku tidak ditemukan");
    } else {
        await cekBuku(conn, id, (err, result) => {
            if (err) {
              cb(err);
            } else {
                conn.query(
                    "DELETE FROM buku WHERE kd_buku = ?",
                    id,
                    (err, deleted) => {
                    if (err) {
                        cb(err);
                    } else if (deleted) {
                        cb(null, {
                        status: 200,
                        deleted: true,
                        msg: "Buku berhasil dihapus",
                          data: deleted
                        });
                    } else {
                        cb({
                        status: 400,
                        deleted: false,
                        msg: "Gagal menghapus buku"
                        });
                    }
                    }
                );
            }
        });
    }
};