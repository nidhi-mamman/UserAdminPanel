const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const UserRouter = require("./router/UserRoutes");
const ContactRouter = require("./router/contactRoutes");
const AdminRouter = require("./router/adminRouter");
const cors = require("cors");
const bodyParser = require("body-parser");
const server = express();

//MIDDLEWARES
server.use(express.json());
server.use(bodyParser.json()); // For parsing application/json
server.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
  origin: "https://useradminpanel-frontend.onrender.com", 
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

server.use(cors(corsOptions));

//TO ACCESS USER ROUTES
server.use("/api", UserRouter);

//TO ACCESS CONTACT ROUTES
server.use("/form", ContactRouter);

//TO ACCESS ADMIN ROUTES
server.use("/admin", AdminRouter);

//Database connection
connectDB();

server.listen(process.env.PORT, () => {
  console.log(`Server is listening on port,${process.env.PORT}`);
});
