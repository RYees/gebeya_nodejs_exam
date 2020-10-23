var router = require("express-promise-router")();

const jobController = require('../controllers/job.controller')

router.get('/',jobController.Alljobs);

router.get('/:id',jobController.getjob);

module.exports = router;
