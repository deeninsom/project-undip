const { PrismaClient } = require("@prisma/client");
const Prisma = new PrismaClient();
const path = require("path");
const fs = require("fs");

class biodataMahasiswa {
  async getBio(req, res) {
    try {
      const getdata = await Prisma.bio_mahasiswa.findMany({
        select: {
          id_bio: true,
          no_telp: true,
          email: true,
          provinsi: true,
          kota: true,
          alamat: true,
          author: {
            select: {
              nama: true,
            },
          },
        },
      });
      return res.status(200).json({ data: getdata, msg: "succes" });
    } catch (error) {
      console.log(error.message);
    }
  }
  async getBioById(req, res) {
    try {
      const userById = await Prisma.bio_mahasiswa.findUnique({
        where: {
          id_bio: String(req.params.id),
        },
        select: {
          id_bio: true,
          no_telp: true,
          email: true,
          provinsi: true,
          kota: true,
          alamat: true,

        },
      });
      return res
        .status(200)
        .json({ status: true, message: "USER_IS_FOUND", data: userById });
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
  async createBio(req, res) {
    const { id_bio, no_telp, email, provinsi, kota, alamat } = req.body;
    try {
      const biodata = await Prisma.bio_mahasiswa.create({
        data: {
          id_bio: id_bio,
          no_telp: no_telp,
          email: email,
          provinsi: provinsi,
          kota: kota,
          alamat: alamat,
          id_bio: req.session.userId,
        },
      });
      res.status(201).json({ data: biodata });
    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: "Data tidak ter-input" });
    }
  }
  async updateBio(req, res) {
    const dataBio = await Prisma.bio_mahasiswa.findUnique({
      where: {
        id_bio: req.session.userId,
      },
    });
    if (!dataBio) return res.status(404).json({ msg: "data tidak ada" });

    try {
      const { id_bio, no_telp, email, provinsi, kota, alamat } = req.body;
      const dataUpdate = await Prisma.bio_mahasiswa.update({
        where: {
          id_bio: req.session.userId,
        },
        data: {
          id_bio: id_bio,
          no_telp: no_telp,
          email: email,
          provinsi: provinsi,
          kota: kota,
          alamat: alamat,
        },
      });
      return res.status(200).json({ data: dataUpdate, msg: "produk update" });
    } catch (error) {
      console.log(error.message);
    }
  }
  async deletedBio(req, res) {
    const biodata = await Prisma.bio_mahasiswa.findUnique({
      where: {
        id_bio: req.session.userId,
      },
    });
    if (!biodata) return res.status(404).json({ msg: "data tidak ada" });
    const filepath = `./public/image/${biodata.image}`;
    fs.unlinkSync(filepath);
    try {
      await Prisma.bio_mahasiswa.delete({
        where: {
          id_bio: req.session.userId,
        },
      });
      res.status(200).json({ msg: "data terhapus" });
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = new biodataMahasiswa();
