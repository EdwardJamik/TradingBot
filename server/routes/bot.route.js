const { getRegUser, getUserData, getSuccessModule, getModuleList, getLessonList, getLessonContent, setAnswer} = require("../controllers/auth.controller");
const router = require("express").Router();

router.post("/getModuleList", getModuleList);
router.post("/getLessonList", getLessonList);
router.post("/getLessonContent", getLessonContent);
router.post("/setAnswer", setAnswer);

router.post("/getRegUser", getRegUser);
router.post("/getUserData", getUserData);
router.post("/getSuccessModule", getSuccessModule);

module.exports = router;