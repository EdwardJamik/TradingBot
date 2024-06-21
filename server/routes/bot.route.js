const { getRegUser, getUserData, getSuccessModule} = require("../controllers/auth.controller");
const router = require("express").Router();

router.post("/getRegUser", getRegUser);
router.post("/getUserData", getUserData);
router.post("/getSuccessModule", getSuccessModule);

module.exports = router;