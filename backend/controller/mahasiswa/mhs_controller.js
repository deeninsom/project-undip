const { PrismaClient } = require("@prisma/client");
const Prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const path = require("path");
const fs = require("fs");
const nilaiPkl = require("./nilaiPkl");
class Mahasiswa {
  //Get Mahasiswa Controller

  async getMahasiswa(req, res){
    try {
      let response;
      if(req.role === "admin"){
        const page = parseInt(req.query.page) || 0;
        const limitPage = parseInt(req.query.limitPerpage) || 10;
        const search = req.query.search || "";
        const status = req.query.status || ""
        const tahun = req.query.tahun || ""
        const queryStatus = req.query.status
        const offsite = page * limitPage;
        const allRows = await Prisma.mahasiswa.count({
          where: {
            nama: {
              contains: search,
            },
            OR:{
              status:{
                startsWith: status
              }
            }
          },
        });
        response = await Prisma.mahasiswa.findMany({
          where: {
            nama: {
              contains: search,
            },
            OR:{
              status:{
                startsWith: status
              },
              // angkatan: {
              //   equals: 2019
              // }
            }
          },
          select: {
            id_mhs: true,
            nama: true,
            noInduk: true,
            angkatan:true,
            password: true,
            status: true,
            role: true,
            image: true,
            url: true,
            biodata:true,
            dataKhs: true,
            dataIrs: true,
            dataPkl: {
              select:{
                status_pkl: true,
                dospem: true,
                berkas_pkl: true,
                nama_instantsi: true,
                nilai: {
                  select:{

                    nilaiPkl: true
                  }
                }
              }
            },
            dataSkripsi: true
          },
          take: limitPage,
          skip: offsite,
          orderBy: [
            {
              createdAt: "desc",
            },
          ],
        })
        const allPages = Math.ceil(allRows / limitPage);
        return res.status(200).json({
          data: response,
          allRows: allRows,
          allPages: allPages,
          page: page,
          limit: limitPage,
        });
      }
      else if(req.role === "dosen"){
        const page = parseInt(req.query.page) || 0;
        const limitPage = parseInt(req.query.limitPerpage) || 10;
        const search = req.query.search || "";
        const status = req.query.status || ""
        const tahun = req.query.tahun || ""
        const offsite = page * limitPage;
        const allRows = await Prisma.mahasiswa.count({
          where: {
            nama: {
              contains: search,
            },
            OR:{
              verifikasi:{
                is: {
                  verif : {
                    contains : status
                  }
                }
              },
            }
          },
        });
        response = await Prisma.mahasiswa.findMany({
          where: {
            nama: {
              contains: search,
            },
            OR:{
              verifikasi:{
                is: {
                  verif : {
                    contains : status
                  }
                }
              },
            }
          },
          select: {
            id_mhs: true,
            nama: true,
            noInduk: true,
            angkatan:true,
            password: true,
            status: true,
            role: true,
            image: true,
            url: true,
            biodata:true,
            dataKhs: true,
            dataIrs: true,
            verifikasi: {
              select:{
                verif: true
              }
            },
            dataPkl: {
              select:{
                status_pkl: true,
                dospem: true,
                berkas_pkl: true,
                nama_instantsi: true,
                nilai: {
                  select:{
                    nilaiPkl: true
                  }
                }
              }
            },
            dataSkripsi: true
          },
          take: limitPage,
          skip: offsite,
          orderBy: [
            {
              createdAt: "desc",
            },
          ],
        })
        const allPages = Math.ceil(allRows / limitPage);
        return res.status(200).json({
          data: response,
          allRows: allRows,
          allPages: allPages,
          page: page,
          limit: limitPage,
     
          
          // sort : findStatus
        });
      }
      else {
        response= await Prisma.mahasiswa.findMany({
          where:{
            id_mhs: req.session.userId
          },
          select: {
            id_mhs: true,
            nama: true,
            noInduk: true,
            angkatan:true,
            password: true,
            status: true,
            role: true,
            image: true,
            url: true,
          },
        });
        return res.status(200).json({
          data: response
        });
      } 
    } catch (error) {
      console.log(error)
      res.status(500).json({ msg: error.message });
    }
  }

 async getMahasiswaById(req, res) {
    try {
      const mahasiswa = await Prisma.mahasiswa.findUnique({
        where: {
          id_mhs: String(req.params.id),
        },
        select: {
          id_mhs: true,
          nama: true,
          noInduk: true,
          angkatan: true,
          password: true,
          role: true,
          image: true,
          status: true,
          url: true
        
        },
      });
      res.status(200).json({ data: mahasiswa, status: 200 });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  }

  //Post Mahasiswa Controller
  async createMahasiswa(req, res) {
    if (req.files === null) return res.status(400).json({ msg: "no file up" });
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/image/${fileName}`;
    const allowedType = [".png", ".jpg", ".jpeg"];
    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 5000000)
      return res.status(422).json({ msg: "Image must be less than 5 MB" });

    file.mv(`./public/image/${fileName}`, async (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
    const {
      id_mhs,
      nama,
      noInduk,
      password: textPasword,
      angkatan,
      status,
      role,
      verif
    } = req.body;
    const password = await bcrypt.hash(textPasword, 10);
    try {
      const mahasiswa = await Prisma.mahasiswa.create({
        data: {
          id_mhs: id_mhs,
          nama: nama,
          noInduk: noInduk,
          angkatan: parseInt(angkatan),
          password: password,
          status: status,
          role: role,
          image: fileName,
          url: url,
          verifikasi:{
            create:{
              verif : "false"
            }
          }
  },
      });
      res.status(201).json({ data: mahasiswa });
    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: "Data tidak ter-input" });
    }
  }

  //Put Mahasiswa Controller
  async updateMahasiswa(req, res) {
    try {
      // let respons;
      const findUser = await Prisma.mahasiswa.findUnique({
        where: {
          id_mhs: String(req.params.id),
        }
      })
      if(!findUser) return res.status(400).json({msg: "user tidak ditemukan"})
      let fileName = "";
      if (req.files === null) {
        fileName = findUser.image;
      } else {
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = [".png", ".jpg", ".jpeg"];
        if (!allowedType.includes(ext.toLowerCase()))
          return res.status(422).json({ msg: "Invalid Images" });
        if (fileSize > 5000000)
          return res.status(422).json({ msg: "Image must be less than 5 MB" });
        const filepath = `./public/image/${findUser.image}`;
        fs.unlinkSync(filepath);
        file.mv(`./public/image/${fileName}`, async (err) => {
          if (err) return res.status(500).json({ msg: err.message });
        });
      }
      const url = `${req.protocol}://${req.get("host")}/image/${fileName}`;
      const {
        id_mhs,
        nama,
        noInduk,
        password: textPasword,
        angkatan,
        status,
        role
      } = req.body;
      const password = await bcrypt.hash(textPasword, 10);
       const updateData=  await Prisma.mahasiswa.update({
        where:{
          id_mhs: String(req.params.id),
        },
        data: {
          id_mhs: id_mhs,
          nama: nama,
          noInduk: noInduk,
          angkatan: parseInt(angkatan),
          password: password,
          status: status,
          role: role,
          image: fileName,
          url: url,
        },
      });
      res.status(200).json({ data: updateData });
    } catch (error) {
      console.log(error)
      res.status(400).json({ msg: error.message });
    }
  }

  //Deleted Mahasiswa Controller
  async deletedMahasiswa(req, res) {
    const dataKhs = await Prisma.mahasiswa.findUnique({
      where: {
        id_mhs: String(req.params.id),
      },
    });
    if (!dataKhs) return res.status(404).json({ msg: "data tidak ada" });
    const filepath = `./public/image/${dataKhs.image}`;
    fs.unlinkSync(filepath);
    try {
       await Prisma.mahasiswa.delete({
        where: {
          id_mhs: String(req.params.id),
        },
      });
      res.status(200).json({msg:"succes deleted" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  }


  async verifMahasisiswa (req, res){
    const {verif, id_verif } = req.body
        try {
            const createNilai = await Prisma.mahasiswa.update({
                where:{
                    id_mhs: String(req.params.id)
                },
                data :{
                  verifikasi:{              
                      update:{
                        verif
                      }
                   
                  }
                }
                
            })

          return  res.status(200).json({data :createNilai, msg:"succes create" });
        } catch (error) {
            console.log(error)
            return res.status(400).json({ msg: error.message });
        }
  }

  async lihatVerify(req, res){

  }

}

module.exports = new Mahasiswa();
