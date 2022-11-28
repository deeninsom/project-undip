const { PrismaClient } = require("@prisma/client");
const Prisma = new PrismaClient();
const bcrypt = require("bcrypt");

class Admin {
  async getAdmin(req, res) {
    try {
      const page = parseInt(req.query.page) || 0;
      const limitPage = parseInt(req.query.limitPerpage) || 10;
      const search = req.query.search || "";
      const offsite = page * limitPage;
      const allRows = await Prisma.admin.count({
        where: {
          nama: {
            contains: search,
          },
        },
      });
      const findAll = await Prisma.admin.findMany({
        where: {
          nama: {
            contains: search,
          },
        },
        select: {
          id_adm: true,
          nama: true,
          noInduk: true,
          password: true,
          role: true,
          kode_departement: true,
        },
        take: limitPage,
        skip: offsite,
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
      });
      const allPages = Math.ceil(allRows / limitPage);

      res.status(200).json({
        data: findAll,
        allRows: allRows,
        allPages: allPages,
        page: page,
        limit: limitPage,
      });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  }

  async getAdminById(req, res) {
    try {
      const admin = await Prisma.admin.findUnique({
        where: {
          id_adm: String(req.params.id),
        },
        select: {
          id_adm: true,
          nama: true,
          noInduk: true,
          password: true,
          role: true,
          kode_departement: true,
        },
      });
      res.status(200).json({ data: admin });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  }

  async createAdmin(req, res) {
    const {
      id_adm,
      nama,
      noInduk,
      role,
      password: textPasword,
      kode_departement,
    } = req.body;
    const password = await bcrypt.hash(textPasword, 10);
    try {
      const admin = await Prisma.admin.create({
        data: {
          id_adm: id_adm,
          nama: nama,
          noInduk: noInduk,
          password: password,
          role: role,
          kode_departement: kode_departement,
          // id_adm: req.session.userId,
        },
      });
      res.status(201).json({ data: admin });
    } catch (error) {
      console.log(error)
      res.status(400).json({ msg: "Data tidak ter-input" });
    }
  }

  async updateAdmin(req, res) {
    const { nama, id_adm, noInduk,password : textPasword, role, kode_departement } = req.body;
    try {
      // const findAdmin = await Prisma.admin.findUnique({
      //   where:{
      //     id_adm: String(req.params.id)
      //   }
      // })
      const password = await bcrypt.hash(textPasword, 10);
      const updateAdmin = await Prisma.admin.update({
        where: {
          id_adm: String(req.params.id),
        },
        data: {
          id_adm: id_adm,
          nama: nama,
          noInduk: noInduk,
          password: password,
          role: role,
          kode_departement: kode_departement,
          password: password,
        },
      });
      res.status(200).json({ data: updateAdmin });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  }

  async deletedAdmin(req, res) {
    try {
      await Prisma.admin.delete({
        where: {
          id_adm: String(req.params.id),
        },
      });
      res.status(200).json({ status: "sukses deleted" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  }
}

module.exports = new Admin();
