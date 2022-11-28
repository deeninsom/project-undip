const express = require('express');
const dosen = express.Router();

const Dosen= require('../../controller/dosen/dsn_controller');
const VerifyOn = require('../../middleware/verifyUser');

dosen.get('/dosen',VerifyOn.verifyUser, Dosen.getDosen);
dosen.post('/dosen',VerifyOn.verifyUser, Dosen.createDosen);
dosen.get('/dosen/:id',VerifyOn.verifyUser, Dosen.getDosenById)
dosen.put('/dosen/:id',VerifyOn.verifyUser, Dosen.updateDosen)
dosen.delete('/dosen/:id',VerifyOn.verifyUser, Dosen.deletedDosen)


module.exports = dosen;
