const express = require("express");
const router = express.Router();
const { form } = require("../controllers/formcontrollers");
router.route("/contact").post(form);
// router.route("/contact").post(sendEmail);

module.exports = router;
