const {register, login} = require("../Controllers/AuthController");
const { registerValidation,loginValidation } = require("../Middleware/Validation");



const router = require("express").Router();



router.post('/login', loginValidation, login);
router.post('/register' , registerValidation, register)

module.exports = router;