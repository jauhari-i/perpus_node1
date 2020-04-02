const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

const cekAuth = require("./cekAuth");

module.exports = login = async (conn, data, cb) => {
  const validation = [];
  if (!data.email) {
    validation.push({
      error: "Email tidak boleh kosong"
    });
  }
  if (!data.password) {
    validation.push({
      error: "Password tidak boleh kosong"
    });
  }
  if (validation.length > 0) {
    cb(validation);
  } else {
    await cekAuth(conn, data.email, (err, datas) => {
      if (err) {
        cb(err);
      } else {
        bcryptjs.compare(data.password, datas.password, (err, match) => {
          if (err) {
            cb(err);
          } else if (match) {
            if (datas.role === 1) {
              conn.query(
                "SELECT * FROM auth INNER JOIN petugas ON auth.detail=petugas.kd_petugas WHERE id_auth = ? ",
                datas.id_auth,
                (err, petugas) => {
                  if (err) {
                    cb(err);
                  } else if (petugas.length > 0) {
                    let token = jwt.sign(
                      {
                        email: petugas[0].email,
                        role: petugas[0].role,
                        nm_petugas: petugas[0].nm_petugas,
                        jabatan: petugas[0].jabatan,
                        tlpn_petugas: petugas[0].tlpn_petugas
                      },
                      "perpus"
                    );
                    cb(null, {
                      status: 200,
                      login: true,
                      data: {
                        token: token
                      },
                      msg: "Login berhasil"
                    });
                  } else {
                    cb("Detail petugas tidak ditemukan");
                  }
                }
              );
            } else {
              conn.query(
                "SELECT * FROM auth INNER JOIN anggota ON auth.detail=anggota.kd_anggota WHERE id_auth=?",
                datas.id_auth,
                (err, anggota) => {
                  if (err) {
                    cb(err);
                  } else if (anggota.length > 0) {
                    let token = jwt.sign(
                      {
                        email: anggota[0].email,
                        role: anggota[0].role,
                        nm_anggota: anggota[0].nm_anggota,
                        alamat: anggota[0].alamat,
                        tlpn: anggota[0].tlpn
                      },
                      "perpus"
                    );
                    cb(null, {
                      status: 200,
                      login: true,
                      data: {
                        token: token
                      },
                      msg: "Login berhasil"
                    });
                  } else {
                    cb("Detail anggota tidak ditemukan");
                  }
                }
              );
            }
          } else {
            cb("Password tidak sama");
          }
        });
      }
    });
  }
};
