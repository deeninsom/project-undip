const { PrismaClient } = require("@prisma/client");
const Prisma = new PrismaClient();



class nilaiPkl {


    async getNilai (req, res){
        try {
            const dataNilai = await Prisma.nilaiPkl.findMany({
                select: {
                    id_nilai : true,
                    nilaiPkl: true,
                    author:true
                }

            })
          return  res.status(200).json({data: dataNilai, msg:"succes deleted" });
        } catch (error) {
            console.log(error)
            return res.status(400).json({ msg: error.message });
        }
    }

    async createNilai (req, res){
        const {nilaiPkl, } = req.body
        try {
            const createNilai = await Prisma.pkl.update({
                where:{
                  id_pkl: String(req.params.id)
                },
               data:{
                nilai:{
                    update:{
                        nilaiPkl
                    }
                }
               }
            })

          return  res.status(200).json({data: createNilai, msg:"succes create" });
        } catch (error) {
            console.log(error)
            return res.status(400).json({ msg: error.message });
        }
    }

}

module.exports = new nilaiPkl()