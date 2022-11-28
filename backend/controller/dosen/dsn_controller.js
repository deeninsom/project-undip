const { PrismaClient } = require("@prisma/client");
const Prisma = new PrismaClient();
const bcrypt = require("bcrypt");

class Dosen {
  //Get Dosen Controller
  async getDosen(req, res) {
    try {
      let response;
      if(req.role === "admin"){
        const page = parseInt(req.query.page) || 0;
        const limitPage = parseInt(req.query.limitPerpage) || 10;
        const search = req.query.search || "";
        const offsite = page * limitPage;
        const allRows = await Prisma.dosen.count({
          where: {
            nama: {
              contains: search,
            },
          },
        });
        response = await Prisma.dosen.findMany({
          where: {
            nama: {
              contains: search,
            },
          }, 
          select: {
            id_dsn: true,
            nama: true,
            noInduk: true,
            kode_departement: true,
            password: true,
            role: true,
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
          data: response,
          allRows: allRows,
          allPages: allPages,
          page: page,
          limit: limitPage,
        });
      }else{
        response = await Prisma.dosen.findMany({
          where: {
            id_dsn: req.session.userId
           },
           select: {
            id_dsn: true,
            nama: true,
            noInduk: true,
            kode_departement: true,
            role: true,
            
           },
        });
        return res.status(200).json({
          data: response
        });
      }
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  }

  //Get Dosen Controller by:id
  async getDosenById(req, res) {
    try {
      const dosen = await Prisma.dosen.findUnique({
        where: {
          id_dsn: String(req.params.id),
        },
        select: {
          id_dsn: true,
            nama: true,
            noInduk: true,
            kode_departement: true,
            role: true,
            password: true
        },
      });
      res.status(200).json({ data :dosen });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  }

  //Post Dosen Controller
  async createDosen(req, res) {
    const {
      id_dsn,
      nama,
      noInduk,
      kode_departement,
      role,
      password: textPasword
    } = req.body;
    const password = await bcrypt.hash(textPasword, 10);
    try {
      const dosen = await Prisma.dosen.create({
        data: {
          id_dsn: id_dsn,
          nama: nama,
          noInduk: noInduk,
          kode_departement: kode_departement,
          password: password,
          role: role
        },
      });
      res.status(201).json({ data: dosen });
    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: "Data tidak ter-input" });
    }
  }

  //Put Dosen Controller
  async updateDosen(req, res) {
    try {
      const {
        id_dsn,
        nama,
        noInduk,
        kode_departement,
        role,
        password: textPasword
      } = req.body;
      const password = await bcrypt.hash(textPasword, 10);
      const dosen = await Prisma.dosen.update({
        where: {
          id_dsn: String(req.params.id),
        },
        data: {
          id_dsn: id_dsn,
          nama: nama,
          noInduk: noInduk,
          kode_departement: kode_departement,
          password: password,
          role: role

        },
      });
      res.status(200).json({ data: dosen });
    } catch (error) {
      console.log(error)
      res.status(400).json({ msg: error.message });
    }
  }

  //Deleted Dosen Controller
  async deletedDosen(req, res) {
    try {
      await Prisma.dosen.delete({
        where: {
          id_dsn: String(req.params.id),
        },
      });
      res.status(200).json({ status: "sukses" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  }
}

module.exports = new Dosen();
