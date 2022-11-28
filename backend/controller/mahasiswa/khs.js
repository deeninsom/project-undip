const { PrismaClient } = require("@prisma/client");
const Prisma = new PrismaClient();
const path = require("path");
const fs = require("fs");

class berkasKhs {
  async getKhs(req, res) {
    try {
      const getPkl = await Prisma.khs.findMany({
        select: {
          id_khs: true,
          semester: true,
          ip_semester: true,
          ip_kumulatif: true,
          jumlah_sks: true,
          berkas_khs: true,
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
        .json({ status: true, message: "USER_IS_FOUND", data: getPkl });
    } catch (error) {
      console.log(error.message);
    }
  }
  async getKhsById(req, res) {
    try {
      const datapkl = await Prisma.pkl.findUnique({
        where: {
          id_pkl: String(req.params.id),
        },
        select: {
          id_pkl: true,
          status_pkl: true,
          dospem: true,
          nama_instantsi: true,
          berkas_pkl: true,
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
  async createBerkasKhs(req, res) {
    if (req.files === null) return res.status(400).json({ msg: "no file up" });
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/berkas_khs/${fileName}`;
    const allowedType = [".pdf"];
    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 5000000)
      return res.status(422).json({ msg: "Image must be less than 5 MB" });

    file.mv(`./public/khs/${fileName}`, async (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
    const { id_khs, semester, ip_semester, ip_kumulatif,jumlah_sks,  } = req.body;
    try {
      const berkasPkl = await Prisma.khs.create({
        data: {
          id_khs: id_khs,
          semester: semester,
          ip_semester: ip_semester,
          ip_kumulatif: ip_kumulatif,
          jumlah_sks: parseInt(jumlah_sks),
          berkas_khs: fileName,
          url: url,
          id_khs: req.session.userId,
        },
      });
      res.status(201).json({ data: berkasPkl });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: "Data tidak ter-input" });
    }
  }
  async updateBerkasKhs(req, res) {
    const dataKhs = await Prisma.khs.findUnique({
      where: {
        id_khs: req.session.userId,
      },
    });
    if (!dataKhs) return res.status(404).json({ msg: "data tidak ada" });
    let fileName = "";
    if (req.files === null) {
      fileName = dataKhs.image;
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
      const filepath = `./public/khs/${dataKhs.berkas_khs}`;
      fs.unlinkSync(filepath);
      file.mv(`./public/khs/${fileName}`, async (err) => {
        if (err) return res.status(500).json({ msg: err.message });
      });
    }
    const url = `${req.protocol}://${req.get("host")}/berkas_khs/${fileName}`;
    try {
        const { id_khs, semester, ip_semester, ip_kumulatif,jumlah_sks,  } = req.body;
      const dataUpdate = await Prisma.khs.update({
        where: {
            id_khs: req.session.userId,
        },
        data: {
            id_khs: id_khs,
            semester: semester,
            ip_semester: ip_semester,
            ip_kumulatif: ip_kumulatif,
            jumlah_sks: parseInt(jumlah_sks),
            berkas_khs: fileName,
            url: url,
        },
      });
      return res.status(200).json({ data: dataUpdate, msg: "produk update" });
    } catch (error) {
      console.log(error.message);
    }
  }
  async deletedBerkasKhs(req, res) {
    const dataKhs = await Prisma.khs.findUnique({
      where: {
        id_khs: req.session.userId,
      },
    });
    if (!dataKhs) return res.status(404).json({ msg: "data tidak ada" });
    const filepath = `./public/khs/${dataKhs.berkas_khs}`;
    fs.unlinkSync(filepath);
    try {
      await Prisma.khs.delete({
        where: {
          id_khs: req.session.userId,
        },
      });
      res.status(200).json({ msg: "data terhapus" });
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = new berkasKhs();
