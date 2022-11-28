const { PrismaClient } = require("@prisma/client");
const Prisma = new PrismaClient();
const path = require("path");
const fs = require("fs");

class berkasIrs {
  async getIrs(req, res) {
    try {
      const getIrs = await Prisma.irs.findMany({
        select: {
          id_Irs: true,
          semester: true,
          jumlahSks: true,
          berkas: true,
          url: true,
          author: {
            select: {
              nama: true,
            },
          },
        },
      });
      return res
        .status(200)
        .json({ status: true, message: "USER_IS_FOUND", data: getIrs });
    } catch (error) {
      console.log(error.message);
    }
  }
  async getIrsById(req, res) {
    try {
      const datapkl = await Prisma.irs.findUnique({
        where: {
          id_Irs: String(req.params.id),
        },
        select: {
            id_Irs: true,
            semester: true,
            jumlahSks: true,
            berkas: true,
            url: true,
        },
      });
      return res
        .status(200)
        .json({ status: true, message: "USER_IS_FOUND", data: datapkl });
    } catch (error) {
      if (!error.code) {
        error.code = 500;
      }
      return res.status(error.code).json({
        status: false,
        message: err.message,
      });
    }
  }
  async createBerkasIrs(req, res) {
    if (req.files === null) return res.status(400).json({ msg: "no file up" });
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/berkas/${fileName}`;
    const allowedType = [".pdf"];
    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 5000000)
      return res.status(422).json({ msg: "Image must be less than 5 MB" });

    file.mv(`./public/irs/${fileName}`, async (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
    const { id_Irs, semester, jumlahSks } = req.body;
    try {
      const berkasPkl = await Prisma.irs.create({
        data: {
          id_Irs: id_Irs,
          semester: semester,
          jumlahSks: parseInt(jumlahSks),
          berkas: fileName,
          url: url,
          id_Irs: req.session.userId,
        },
      });
      res.status(201).json({ data: berkasPkl });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: "Data tidak ter-input" });
    }
  }
  async updateBerkasIrs(req, res) {
    const dataIrs = await Prisma.irs.findUnique({
      where: {
        id_Irs: req.session.userId,
      },
    });
    if (!dataIrs) return res.status(404).json({ msg: "data tidak ada" });
    let fileName = "";
    if (req.files === null) {
      fileName = dataIrs.berkas;
    } else {
      const file = req.files.file;
      const fileSize = file.data.length;
      const ext = path.extname(file.name);
      fileName = file.md5 + ext;
      const allowedType = [".pdf"];
      if (!allowedType.includes(ext.toLowerCase()))
        return res.status(422).json({ msg: "Invalid Images" });
      if (fileSize > 5000000)
        return res.status(422).json({ msg: "Image must be less than 5 MB" });
      const filepath = `./public/irs/${dataIrs.berkas}`;
      fs.unlinkSync(filepath);
      file.mv(`./public/irs/${fileName}`, async (err) => {
        if (err) return res.status(500).json({ msg: err.message });
      });
    }
    const url = `${req.protocol}://${req.get("host")}/berkas/${fileName}`;
    try {
        const { id_Irs, semester, jumlahSks } = req.body;
      const dataUpdate = await Prisma.irs.update({
        where: {
          id_Irs: req.session.userId,
        },
        data: {
            id_Irs: id_Irs,
            semester: semester,
            jumlahSks: parseInt(jumlahSks),
            berkas: fileName,
            url: url,
        },
      });
      return res.status(200).json({ data: dataUpdate, msg: "produk update" });
    } catch (error) {
      console.log(error.message);
    }
  }
  async deletedBerkasIrs(req, res) {
    const dataKhs = await Prisma.irs.findUnique({
      where: {
        id_Irs: req.session.userId,
      },
    });
    if (!dataKhs) return res.status(404).json({ msg: "data tidak ada" });
    const filepath = `./public/irs/${dataKhs.berkas}`;
    fs.unlinkSync(filepath);
    try {
      await Prisma.irs.delete({
        where: {
          id_Irs: req.session.userId,
        },
      });
      res.status(200).json({ msg: "data terhapus" });
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = new berkasIrs();
