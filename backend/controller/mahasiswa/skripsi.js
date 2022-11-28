const { PrismaClient } = require("@prisma/client");
const Prisma = new PrismaClient();
const path = require("path");
const fs = require("fs");


class dataSkripsi {
  async getBerkasSkripsi(req, res) {
    try {
      let respons;
      const page = parseInt(req.query.page) || 0;
      const limitPage = parseInt(req.query.limitPerpage) || 10;
      const status = req.query.status || ""
      const offsite = page * limitPage;
      const allRows = await Prisma.skripsi.count({
        where: {
          status_skripsi: {
            startsWith: status,
          },
          // OR:{
          //   status:{
          //     startsWith: status
          //   }
          // }
        },
      });
      respons = await Prisma.skripsi.findMany({
        where:{
          status_skripsi: {
            startsWith: status,
          },
        },
        select: {
          id_skripsi: true,
          status_skripsi: true,
          tgl_sidang: true,
          dospem: true,
          berkas_skripsi: true,
          url: true,
          author: {
            select: {
              nama: true,
              angkatan: true,
              status: true
            },
          },
        },
        take: limitPage,
        skip: offsite,
        // orderBy: [
        //   {
        //     createdAt: "desc",
        //   },
        // ],
      });
      const allPages = Math.ceil(allRows / limitPage);
      return res.status(200).json({
        data: respons,
        allRows: allRows,
        allPages: allPages,
        page: page,
        limit: limitPage,
      });
    } catch (error) {
      console.log(error)
      res.status(400).json({ data: { msg: "data tidak ditemukan" } });
    }
  }

  async getBerkasSkripsiById(req, res) {
    try {
      const getDataSkripsi = await Prisma.skripsi.findMany({
        where: {
          id_skripsi: String(req.params.id),
        },
        select: {
          id_skripsi: true,
          status_skripsi: true,
          tgl_sidang: true,
          dospem: true,
          berkas_skripsi: true,
          url: true,
        },
      });
      return res.status(200).json({ data: getDataSkripsi });
    } catch (error) {
      res.status(400).json({ data: { msg: "data tidak ditemukan" } });
    }
  }

  async createBerkasSkripsi(req, res) {
    if (req.files === null) return res.status(400).json({ msg: "no file up" });
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/berkas_skripsi/${fileName}`;
    const allowedType = [".pdf"];
    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 5000000)
      return res.status(422).json({ msg: "Image must be less than 5 MB" });

    file.mv(`./public/skripsi/${fileName}`, async (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
    const { id_skripsi, status_skripsi, tgl_sidang, dospem } = req.body;
    try {
      const dataskripsi = await Prisma.skripsi.create({
        data: {
          id_skripsi: id_skripsi,
          status_skripsi: status_skripsi,
          tgl_sidang: tgl_sidang,
          dospem: dospem,
          berkas_skripsi: fileName,
          url: url,
          id_skripsi: req.session.userId,
        },
      });
      res.status(201).json({ data: dataskripsi });
    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: "Data tidak ter-input" });
    }
  }

  async updateBerkasSkripsi(req, res) {
    const dataSkripsi = await Prisma.skripsi.findUnique({
      where: {
        id_skripsi: req.session.userId,
      },
    });
    if (!dataSkripsi) return res.status(404).json({ msg: "data tidak ada" });
    let fileName = "";
    if (req.files === null) {
      fileName = dataSkripsi.berkas_skripsi;
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
      const filepath = `./public/skripsi/${dataSkripsi.berkas_skripsi}`;
      fs.unlinkSync(filepath);
      file.mv(`./public/skripsi/${fileName}`, async (err) => {
        if (err) return res.status(500).json({ msg: err.message });
      });
    }
    const url = `${req.protocol}://${req.get("host")}/berkas_skripsi/${fileName}`;
    const { id_skripsi, status_skripsi, tgl_sidang, dospem } = req.body;
    try {
      const updateData = await Prisma.skripsi.update({
        where: {
          id_skripsi: req.session.userId,
        },
        data: {
          id_skripsi: id_skripsi,
          status_skripsi: status_skripsi,
          tgl_sidang: tgl_sidang,
          dospem: dospem,
          berkas_skripsi: fileName,
          url: url,
        },
      });
      return res.status(200).json({ data: updateData, msg: "data created" });
    } catch (error) {
      if (error) return res.status(400).json({ msg: "Data tidak terinput" });
    }
  }

  async deletedBerkasSkripsi(req, res) {
    const dataSkripsi = await Prisma.skripsi.findUnique({
      where: {
        id_skripsi: req.session.userId,
      },
    });
    if (!dataSkripsi) return res.status(404).json({ msg: "data tidak ada" });
    const filepath = `./public/skripsi/${dataSkripsi.berkas_skripsi}`;
    fs.unlinkSync(filepath);
    try {
      await Prisma.skripsi.delete({
        where: {
          id_skripsi: req.session.userId,
        },
      });
      res.status(200).json({ msg: "data terhapus" });
    } catch (error) {
      if (error) return res.status(400).json({ msg: "Data tidak terhapus" });
    }
  }
}

module.exports = new dataSkripsi();
