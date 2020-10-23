var router = require("express-promise-router")();

const  {AauthFormRequest} = require('../middlewares/form-request/Aauth')
const AauthController = require('../controllers/Aauth.controller')

/* GET users listing. */
router.post('/login', AauthController.login);
//router.post('/signup',authFormRequest('createUser'), bauthController.signup);

module.exports = router;
