const controller = {};

const tambahPetugas = require("../service/petugas/tambahPetugas");
const semuaPetugas = require("../service/petugas/semuaPetugas");
const satuPetugas = require("../service/petugas/satuPetugas");
const editPetugas = require("../service/petugas/editPetugas");
const hapusPetugas = require("../service/petugas/hapusPetugas");

controller.tambahPetugas = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) {
      res.send(err);
    } else {
      let data = req.body;
      tambahPetugas(conn, data, (err, result) => {
        if (err) {
          res.json(err);
        } else {
          res.json(result);
        }
      });
    }
  });
};

controller.semuaPetugas = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) {
      res.send(err);
    } else {
      semuaPetugas(conn, (err, result) => {
        if (err) {
          res.json(err);
        } else {
          res.json(result);
        }
      });
    }
  });
};

controller.satuPetugas = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) {
      res.send(err);
    } else {
      let id = req.params.kode;
      satuPetugas(conn, id, (err, result) => {
        if (err) {
          res.json(err);
        } else {
          res.json(result);
        }
      });
    }
  });
};

controller.editPetugas = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) {
      res.send(err);
    } else {
      let id = req.params.kode;
      let data = req.body;
      editPetugas(conn, data, id, (err, result) => {
        if (err) {
          res.json(err);
        } else {
          res.json(result);
        }
      });
    }
  });
};

controller.hapusPetugas = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) {
      res.send(err);
    } else {
      let id = req.params.kode;
      hapusPetugas(conn, id, (err, result) => {
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
