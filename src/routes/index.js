const express = require("express");
const router = express.Router();

const userRoutes = require("./user.routes");
const codeRouters = require("./code.routes");

router.use("/users", userRoutes);
router.use("/code", codeRouters);

module.exports = router;
