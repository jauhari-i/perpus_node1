module.exports = async function tambahBuku(conn, data, cb) {
  const validation = [];
  if (!data.nm_buku) {
    validation.push({
      error: "Judul buku diperlukan"
    });
  }
  if (!data.pengarang) {
    validation.push({
      error: "Nama pengarang diperlukan"
    });
  }
  if (!data.penerbit) {
    validation.push({
      error: "Penerbit diperlukan"
    });
  }
  if (!data.tarif) {
    validation.push({
      error: "Tarif diperlukan"
    });
  }
  if (!data.stok) {
    validation.push({
      error: "Stok diperlukan"
    });
  }
  if (!data.durasi) {
    validation.push({
      error: "Durasi diperlukan"
    });
  }
  if (validation.length > 0) {
    cb(validation);
  } else {
    conn.query(
      "INSERT INTO buku (nm_buku,pengarang,penerbit,tarif,stok,durasi) VALUES (?,?,?,?,?,?)",
      [
        data.nm_buku,
        data.pengarang,
        data.penerbit,
        data.tarif,
        data.stok,
        data.durasi
      ],
      (err, inserted) => {
        if (err) {
          cb(err);
        } else if (inserted) {
          cb(null, {
            status: 200,
            inserted: true,
            msg: "Buku telah ditambahkan",
            data: inserted
          });
        } else {
          cb("Gagal menambahkan buku");
        }
      }
    );
  }
};
