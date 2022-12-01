const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("@prisma/client");
const fileUpload = require("express-fileupload")
const mhs_router = require("./router/mahasiswa/mhs_router");
const dosen = require("./router/dosen/dsn_router");
const admin = require("./router/admin/adm_router");
const authRouter = require("./router/authRouth/authRouter");
const port = process.env.PORT || 5000;
require("dotenv").config();

//middleware
app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new PrismaClient(),
    store: new PrismaSessionStore(new PrismaClient(), {
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: true,
    }),
    cookie: {
      secure: 'auto',
    },
  })
);
app.use(
  cors({
    credentials: true,
    origin: "https://project-undip.vercel.app",
  })
);
app.use(express.json());
app.use(fileUpload())

app.use(express.static("public"))

//api routing
app.use("/api/v1", authRouter, mhs_router, dosen, admin);


//on listen port
app.listen(port,  () => {
  console.log(`Server running at `);
});
