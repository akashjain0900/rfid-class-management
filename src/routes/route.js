const express = require("express");
const AkashRouter = express.Router();
const controller = require("../controllers/controller");

AkashRouter.get("/", controller.gettingDataFetch);
AkashRouter.post("/register", controller.RegistrationFetch);
AkashRouter.post("/attendance", controller.StoreAttendanceFetch);
AkashRouter.get("/:id", controller.GetAttendanceFunction);
AkashRouter.post("/test", controller.TestFetch);
module.exports = AkashRouter;
