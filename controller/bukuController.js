const controller = {};
const tambah = require("../service/buku/tambahBuku");
const semuaBuku = require("../service/buku/semuaBuku");
const satuBuku = require("../service/buku/satuBuku");
const editBuku = require("../service/buku/editBuku");
const hapusBuku = require("../service/buku/hapusBuku");

//tambahBuku
controller.tambahBuku = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) {
      res.send(err)
    } else {
      let data = req.body;
      tambah(conn, data, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
      })
    }
  })
};

//semuaBuku
controller.semuaBuku = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) {
      res.send(err);
    } else {
      semuaBuku(conn, (err, result) => {
        if (err) {
          res.json(err);
        } else {
          res.json(result);
        }
      });
    }
  });
};

//satuBuku
controller.satuBuku = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) {
      res.send(err);
    } else {
      let id = req.params.kode;
      satuBuku(conn, id, (err, result) => {
        if (err) {
          res.json(err);
        } else {
          res.json(result);
        }
      });
    }
  });
};

//editBuku
controller.editBuku = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) {
      res.send(err);
    } else {
      let id = req.params.kode;
      let data = req.body;
      editBuku(conn, data, id, (err, result) => {
        if (err) {
          res.json(err);
        } else {
          res.json(result);
        }
      });
    }
  });
};

//hapusBuku
controller.hapusBuku = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) {
      res.send(err);
    } else {
      let id = req.params.kode;
      hapusBuku(conn, id, (err, result) => {
        if (err) {
          res.json(err);
        } else {
          res.json(result);
        }
      });
    }
  });
};

module.exports = controller;