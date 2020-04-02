const cekStok = require("./cekStok");
const gantiStok = require("./gantiStok");
const cekPetugas = require("../petugas/cekPetugas");
const cekAnggota = require("../anggota/cekAnggota");

module.exports = tambahPeminjaman = async (conn, data, cb) => {
  const validation = [];
  if (!data.kd_petugas) {
    validation.push({
      error: "Petugas diperlukan"
    });
  }
  if (!data.kd_anggota) {
    validation.push({
      error: "Anggota diperlukan"
    });
  }
  if (!data.kd_buku) {
    validation.push({
      error: "Buku diperlukan"
    });
  }
  if (!data.jumlah) {
    validation.push({
      error: "Jumlah buku diperlukan"
    });
  }
  if (validation.length > 0) {
    cb(validation);
  } else {
    await cekStok(conn, data.kd_buku, (err, stok) => {
      if (err) {
        cb(err);
      } else {
        cekAnggota(conn, data.kd_anggota, (err, anggota) => {
          if (err) {
            cb({
              msg: "Gagal melakukan peminjaman",
              error: err
            });
          } else {
            cekPetugas(conn, data.kd_petugas, (err, petugas) => {
              if (err) {
                cb({
                  msg: "Gagal melakukan peminjaman",
                  error: err
                });
              } else {
                conn.query(
                  "INSERT INTO peminjam (kd_petugas,kd_anggota,tgl_pinjam) VALUES (?,?,NOW())",
                  [data.kd_petugas, data.kd_anggota],
                  (err, inserted) => {
                    if (err) {
                      cb(err);
                    } else if (inserted) {
                      conn.query(
                        "INSERT INTO di_pinjam (no_pinjam,kd_buku,status) VALUES (?,?,1)",
                        [inserted.insertId, data.kd_buku],
                        (err, pinjam) => {
                          if (err) {
                            cb(err);
                          } else if (pinjam) {
                            gantiStok(
                              conn,
                              data.kd_buku,
                              data.jumlah,
                              (err, ganti) => {
                                if (err) {
                                  cb(err);
                                } else {
                                  cb(null, {
                                    status: 200,
                                    peminjaman: true,
                                    msg: "Berhasil melakukan peminjaman",
                                    data: pinjam
                                  });
                                }
                              }
                            );
                          } else {
                            cb("Gagal melakukan peminjaman");
                          }
                        }
                      );
                    } else {
                      cb("Gagal melakukan peminjaman");
                    }
                  }
                );
              }
            });
          }
        });
      }
    });
  }
};
