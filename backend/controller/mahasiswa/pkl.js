const { PrismaClient } = require("@prisma/client");
const Prisma = new PrismaClient();
const path = require("path");
const fs = require("fs");

class berkasPkl {
  async getPkl(req, res) {
    try {

      let response;
      const page = parseInt(req.query.page) || 0;
      const limitPage = parseInt(req.query.limitPerpage) || 10;
      const sort = req.query.sort || "";
      const offsite = page * limitPage;
      const allRows = await Prisma.pkl.count({
        where: {
          status_pkl: {
            contains: sort,
          },
        },
      });

      response = await Prisma.pkl.findMany({
        where: {
          status_pkl: {
            contains: sort,
          },
        },
        take: limitPage,
        skip: offsite,
        orderBy: [
          {
            status_pkl: "asc",
          },
        ],
        select: {
          id_pkl: true,
          status_pkl: true,
          dospem: true,
          nama_instantsi: true,
          berkas_pkl: true,
          url: true,

          nilai: {
            select: {
              nilaiPkl: true,
            },
          },

          author: {
            select: {
              nama: true,
              noInduk: true,
              angkatan: true,
              status: true
            },
          },
        },
      });
      const allPages = Math.ceil(allRows / limitPage);
      return res.status(200).json({
        status: true,
        message: "USER_IS_FOUND",
        data: response,
        allPages: allPages,
        allRows: allRows,
        page: page,
        limit: limitPage,
      });
    } catch (error) {
      console.log(error.message);
    }
  }
  async getPklById(req, res) {
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
          author: {
            select: {
              nama: true,
              noInduk: true,
              angkatan: true,
            },
          },
          nilai: true,
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
  async createBerkasPkl(req, res) {
    if (req.files === null) return res.status(400).json({ msg: "no file up" });
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/berkas_pkl/${fileName}`;
    const allowedType = [".pdf"];
    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 5000000)
      return res.status(422).json({ msg: "Image must be less than 5 MB" });

    file.mv(`./public/pkl/${fileName}`, async (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
    const { id_pkl, status_pkl, dospem, nama_instantsi } = req.body;
    try {
      const berkasPkl = await Prisma.pkl.create({
        data: {
          id_pkl: id_pkl,
          status_pkl: status_pkl,
          dospem: dospem,
          nama_instantsi: nama_instantsi,
          berkas_pkl: fileName,
          url: url,
          nilai:{
            create: {
              nilaiPkl: "-"
            }
          },
          id_pkl: req.session.userId,
        },
      });
      res.status(201).json({ data: berkasPkl });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: "Data tidak ter-input" });
    }
  }
  async updateBerkasPkl(req, res) {
    const dataPkl = await Prisma.pkl.findUnique({
      where: {
        id_pkl: req.session.userId,
      },
    });
    if (!dataPkl) return res.status(404).json({ msg: "data tidak ada" });
    let fileName = "";
    if (req.files === null) {
      fileName = dataPkl.berkas_pkl;
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
      const filepath = `./public/pkl/${dataPkl.berkas_pkl}`;
      fs.unlinkSync(filepath);
      file.mv(`./public/pkl/${fileName}`, async (err) => {
        if (err) return res.status(500).json({ msg: err.message });
      });
    }
    const url = `${req.protocol}://${req.get("host")}/berkas_pkl/${fileName}`;
    try {
      const { id_pkl, status_pkl, dospem, nama_instantsi } = req.body;
      const dataUpdate = await Prisma.pkl.update({
        where: {
          id_pkl: req.session.userId,
        },
        data: {
          id_pkl: id_pkl,
          status_pkl: status_pkl,
          dospem: dospem,
          nama_instantsi: nama_instantsi,
          berkas_pkl: fileName,
          url: url,
        },
      });
      return res.status(200).json({ data: dataUpdate, msg: "produk update" });
    } catch (error) {
      console.log(error.message);
    }
  }
  async deletedBerkasPkl(req, res) {
    const dataPkl = await Prisma.pkl.findUnique({
      where: {
        id_pkl: req.session.userId,
      },
    });
    if (!dataPkl) return res.status(404).json({ msg: "data tidak ada" });
    const filepath = `./public/pkl/${dataPkl.berkas_pkl}`;
    fs.unlinkSync(filepath);
    try {
      await Prisma.pkl.delete({
        where: {
          id_pkl: req.session.userId,
        },
      });
      res.status(200).json({ msg: "data terhapus" });
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = new berkasPkl();
