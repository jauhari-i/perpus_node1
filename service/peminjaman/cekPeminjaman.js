const cekStatus = require("./cekStatus");
const moment = require("moment");

module.exports = cekPinjam = async (conn, id, cb) => {
  await conn.query(
    "SELECT * FROM di_pinjam WHERE id_peminjaman = ?",
    id,
    (err, pinjam) => {
      if (err) {
        cb(err);
      } else if (pinjam.length > 0) {
        if (pinjam[0].status === 0) {
          conn.query(
            "SELECT * FROM di_pinjam INNER JOIN buku ON di_pinjam.kd_buku=buku.kd_buku INNER JOIN peminjam ON di_pinjam.no_pinjam=peminjam.no_pinjam INNER JOIN anggota ON peminjam.kd_anggota=anggota.kd_anggota INNER JOIN petugas ON peminjam.kd_petugas=petugas.kd_petugas WHERE id_peminjaman = ?",
            id,
            (err, data) => {
              if (err) {
                cb(err);
              } else {
                const peminjaman = data.map(doc => ({
                  status: "Sudah Dikembalikan",
                  anggota: doc.nm_anggota,
                  petugas: doc.nm_petugas,
                  buku: doc.nm_buku,
                  durasi: doc.durasi,
                  tarif: doc.tarif,
                  tgl_pinjam: doc.tgl_pinjam,
                  tgl_kembali: moment(doc.tgl_pinjam)
                    .add(doc.durasi, "d")
                    .format()
                }));
                cb(null, {
                  data: peminjaman
                });
              }
            }
          );
        } else {
          cekStatus(conn, pinjam[0], (err, status) => {
            if (err) {
              cb(err);
            } else {
              if (status.status === 1) {
                conn.query(
                  "SELECT * FROM di_pinjam INNER JOIN buku ON di_pinjam.kd_buku=buku.kd_buku INNER JOIN peminjam ON di_pinjam.no_pinjam=peminjam.no_pinjam INNER JOIN anggota ON peminjam.kd_anggota=anggota.kd_anggota INNER JOIN petugas ON peminjam.kd_petugas=petugas.kd_petugas WHERE id_peminjaman = ?",
                  id,
                  (err, data) => {
                    if (err) {
                      cb(err);
                    } else {
                      const peminjaman = data.map(doc => ({
                        status: "Dipinjam",
                        anggota: doc.nm_anggota,
                        petugas: doc.nm_petugas,
                        buku: doc.nm_buku,
                        durasi: doc.durasi,
                        tarif: doc.tarif,
                        tgl_pinjam: doc.tgl_pinjam,
                        tgl_kembali: moment(doc.tgl_pinjam)
                          .add(doc.durasi, "d")
                          .format()
                      }));
                      cb(null, {
                        data: peminjaman
                      });
                    }
                  }
                );
              } else {
                // terlambat
                conn.query(
                  "UPDATE di_pinjam SET status = ? WHERE id_peminjaman = ?",
                  [status.status, id],
                  (err, updated) => {
                    if (err) {
                      cb(err);
                    } else {
                      conn.query(
                        "SELECT * FROM di_pinjam INNER JOIN buku ON di_pinjam.kd_buku=buku.kd_buku INNER JOIN peminjam ON di_pinjam.no_pinjam=peminjam.no_pinjam INNER JOIN anggota ON peminjam.kd_anggota=anggota.kd_anggota INNER JOIN petugas ON peminjam.kd_petugas=petugas.kd_petugas WHERE id_peminjaman = ?",
                        id,
                        (err, data) => {
                          if (err) {
                            cb(err);
                          } else {
                            const peminjaman = data.map(doc => ({
                              status: "Terlambat",
                              anggota: doc.nm_anggota,
                              petugas: doc.nm_petugas,
                              buku: doc.nm_buku,
                              durasi: doc.durasi,
                              tarif: doc.tarif,
                              tgl_pinjam: doc.tgl_pinjam,
                              tgl_kembali: moment(doc.tgl_pinjam)
                                .add(doc.durasi, "d")
                                .format()
                            }));
                            cb(null, {
                              data: peminjaman
                            });
                          }
                        }
                      );
                    }
                  }
                );
              }
            }
          });
        }
      } else {
        cb("Peminjaman tidak ditemukan");
      }
    }
  );
};
