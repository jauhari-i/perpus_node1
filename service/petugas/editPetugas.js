const cekPetugas = require("./cekPetugas")

module.exports = async function editPetugas(conn, data, id, cb) {
    const validation = [];
    if (!data.nm_petugas) {
        validation.push({
            error: "Nama petugas diperlukan"
        });
    }
    if (!data.jabatan) {
        validation.push({
            error: "Alamat diperlukan"
        });
    }
    if (!data.tlpn_petugas) {
        validation.push({
            error: "Telepon diperlukan"
        });
    }
    if (!id) {
        validation.push({
            error: "Kode petugas tidak valid"
        });
    }
    if (validation.length > 0) {
        cb(validation);
    } else {
        await cekPetugas(conn, id, (err, ada) => {
            if (err) {
                cb(err);
            } else {
                conn.query(
                    "UPDATE petugas SET nm_petugas = ?, jabatan = ?, tlpn = ? WHERE kd_petugas = ?",
                    [data.nm_petugas, data.jabatan, data.tlpn_petugas, id],
                    (err, updated) => {
                        if (err) {
                            cb(err);
                        } else if (updated) {
                            cb(null, {
                                status: 200,
                                updated: true,
                                msg: "Petugas telah diupdate",
                                data: updated
                            });
                        } else {
                            cb({
                                status: 400,
                                updated: false,
                                msg: "Gagal mengupdate petugas"
                            });
                        }
                    }
                );    
            }
        });
    }    
};