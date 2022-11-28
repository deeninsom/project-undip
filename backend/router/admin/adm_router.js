const express = require('express');
const admin = express.Router();

const Admin= require('../../controller/admin/admin_controller');
const VerifyOn = require('../../middleware/verifyUser');


admin.get('/admin',VerifyOn.verifyUser,VerifyOn.adminOnly,Admin.getAdmin );
admin.post('/admin',Admin.createAdmin);
admin.get('/admin/:id',VerifyOn.verifyUser,VerifyOn.adminOnly, Admin.getAdminById)
admin.put('/admin/:id',VerifyOn.verifyUser,VerifyOn.adminOnly, Admin.updateAdmin)
admin.delete('/admin/:id',VerifyOn.verifyUser,VerifyOn.adminOnly, Admin.deletedAdmin)



module.exports = admin;
