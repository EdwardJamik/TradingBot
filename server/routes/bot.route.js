const { getRegUser, getUserData, getSuccessModule, getModuleList, getLessonList, getLessonContent, setAnswer,
    getUserPhone
} = require("../controllers/auth.controller");
const router = require("express").Router();

router.post("/getModuleList", getModuleList);
router.post("/getLessonList", getLessonList);
router.post("/getLessonContent", getLessonContent);
router.post("/getUserPhone", getUserPhone);
router.post("/setAnswer", setAnswer);

router.post("/getRegUser", getRegUser);
router.post("/getUserData", getUserData);
router.post("/getSuccessModule", getSuccessModule);

module.exports = router;