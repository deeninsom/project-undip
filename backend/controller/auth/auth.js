const { PrismaClient } = require("@prisma/client");
const Prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const e = require("express");

class Auth {
  //login User
  async loginUser(req, res, next) {
    const admin = await Prisma.admin.findUnique({
      where: {
        noInduk: String(req.body.noInduk),
      },
    });
    const mahasiswa = await Prisma.mahasiswa.findUnique({
      where: {
        noInduk: String(req.body.noInduk),
      },
    });
    const dosen = await Prisma.dosen.findUnique({
      where: {
        noInduk: String(req.body.noInduk),
      },
    });
    //Verify user user

    if (admin) {
      const matchPassword = await bcrypt.compare(
        req.body.password,
        admin.password
      );
      if (!matchPassword)
        return res.status(404).json({ msg: "Password salah !" });
      req.session.userId = admin.id_adm;
      const data = {
        admin: admin.id_adm,
        nama: admin.nama,
        noInduk: admin.noInduk,
        role: admin.role,
        kode_departement: admin.kode_departement
      };
      return res.status(200).json({ data, msg: "login sukses" });
    } else if (mahasiswa) {
      const matchPassword = await bcrypt.compare(
        req.body.password,
        mahasiswa.password
      );
      if (!matchPassword)
        return res.status(404).json({ msg: "Password salah !" });
      req.session.userId = mahasiswa.id_mhs;
      const data = {
        userId: mahasiswa.id_mhs,
        nama: mahasiswa.nama,
        noInduk: mahasiswa.noInduk,
        angkatan: mahasiswa.angkatan,
        image: mahasiswa.image,
        role: mahasiswa.role,
      };
      return res
        .status(200)
        .json({ data, msg: "login sukses" });
    }else if(dosen){
      const matchPassword = await bcrypt.compare(
        req.body.password,
        dosen.password
      );
      if (!matchPassword)
        return res.status(404).json({ msg: "Password salah !" });
      req.session.userId = dosen.id_dsn;
      const dataDosen = {
        userId: dosen.id_dsn,
        nama: dosen.nama,
        noInduk: dosen.noInduk,
        role: dosen.role,
        kode_departement: dosen.kode_departement
      };
      return res
        .status(200)
        .json({ data: dataDosen , msg: "login sukses" });
    }
    return res.status(400).json({msg: "data tidak ditemukan"})

    // if (!admin) return res.status(404).json({ msg: "User tidak ditemukan" });

    //Verify user user
  }

  //get user login
  async getLoginUser(req, res) {
    if (!req.session.userId) {
      return res.status(404).json({ msg: "Mohon login ke akun anda !" });
    }

    const admin = await Prisma.admin.findUnique({
      where: {
        id_adm: req.session.userId,
      },
    });
    const mahasiswa = await Prisma.mahasiswa.findUnique({
      where: {
        id_mhs: req.session.userId,
      },
    });
    const dosen = await Prisma.dosen.findUnique({
      where: {
        id_dsn: req.session.userId,
      },
    });
    if(admin){
      const data = {
        admin: admin.id_adm,
        nama: admin.nama,
        noInduk: admin.noInduk,
        role: admin.role,
        kode_departement: admin.kode_departement
      };
      return res
        .status(200)
        .json({ data, msg: "getLogin sukses" });
    }else if(mahasiswa){
      const data = {
        userId: mahasiswa.id_mhs,
        nama: mahasiswa.nama,
        noInduk: mahasiswa.noInduk,
        status: mahasiswa.status,
        angkatan: mahasiswa.angkatan,
        url: mahasiswa.url,
        role: mahasiswa.role,
      };
      return res
        .status(200)
        .json({ data, msg: "getLogin sukses" });
    }else if(dosen){
      const data = {
        userId: dosen.id_dsn,
        nama: dosen.nama,
        noInduk: dosen.noInduk,
        role: dosen.role,
        kode_departement: dosen.kode_departement
      };
      return res
        .status(200)
        .json({ data, msg: "getLogin sukses" });
    }
    console.log(mahasiswa)

    return res.status(400).json({msg: "data tidak ditemukan"})
    // console.log(mahasiswa)
    // if (!mahasiswa) return res.status(404).json({ msg: "User tidak ditemukan" });
    // const userId = mahasiswa.id_mhs;
    // const nama = mahasiswa.nama;
    // const noInduk = mahasiswa.noInduk;
    // const role = mahasiswa.role;
    // return res
    //   .status(200)
    //   .json({ data: { userId, nama, noInduk, role }, msg: "getLogin sukses" });
  }

  //logout User
  async logoutUser(req, res) {
    req.session.destroy((err) => {
      if (err) return res.status(404).json({ msg: "Tidak dapat logout !" });
      return res.status(200).json({ msg: "Anda telah logout" });
    });
  }
}

module.exports = new Auth();
