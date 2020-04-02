module.exports = async function cekBuku(conn, id, cb) {
    if (!id) {
        cb("Kode buku tidak ditemukan");
    } else {
        await conn.query(
            "SELECT * FROM buku WHERE kd_buku = ?",
            id,
            (err, buku) => {
                if (err) {
                    cb(err);
                } else if (buku.length > 0) {
                    cb(null, {
                        status: 200,
                        data: buku
                    });
                } else {
                    cb({
                        status: 404,
                        data: null,
                        msg: "Data buku tidak ditemukan"
                    });
                }
            }
        );
    }
};