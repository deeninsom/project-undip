const { PrismaClient } = require("@prisma/client");
const Prisma = new PrismaClient();

class VerifyOn {
  async verifyUser(req, res, next) {
    if (!req.session.userId) {
      return res.status(404).json({ msg: "Mohon login ke akun anda !" });
    }

    const admin = await Prisma.admin.findUnique({
      where: {
        id_adm: req.session.userId
      },
    });
    const mahasiswa = await Prisma.mahasiswa.findUnique({
      where: {
        id_mhs: req.session.userId
      },
    });
    const dosen = await Prisma.dosen.findUnique({
      where: {
        id_dsn: req.session.userId
      },
    });

    if(admin){
      req.userId = admin.id_adm;
      req.role = admin.role;
    }else if(mahasiswa){
      req.userId = mahasiswa.id_mhs;
      req.role = mahasiswa.role;
    }else if(dosen){
      req.userId = dosen.id_dsn;
      req.role = dosen.role;
    }
    next();
  }

  async adminOnly(req, res, next) {
    const admin = await Prisma.admin.findUnique({
      where: {
        id_adm: req.session.userId,
      },
    });
    if(!admin) return res.status(404).json({msg: "User tidak ditemukan"});
    if (admin.role !== "admin") {
      return res.status(403).json({ msg: "Hak akses admin " });
    }
    next();
  }
}

module.exports = new VerifyOn();
