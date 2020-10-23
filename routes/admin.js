var router = require("express-promise-router")();

const  {userFormRequest} = require('../middlewares/form-request/Aauth')
const { hasPermissions } = require('../middlewares/auth');
/**
 * Returns All Jobs
 * 
 * @route GET /admin 
 * @group Admin - Retrive Job information
 * @returns {object} 200 - An array of job info
 * @returns {Error}  default - Unexpected error
 */
const adminController = require('../controllers/admin.controller')

router.get('/', hasPermissions([ 'view any job']),adminController.Alljobs);

router.get('/:id', hasPermissions(['view job']),adminController.getjob);

router.post('/', hasPermissions(['create job']) && userFormRequest('createUser'),adminController.createjob);

router.patch('/:id', hasPermissions(['update job']), adminController.updatejob);

router.delete('/:id', hasPermissions(['remove job']),adminController.removejob);




module.exports = router;
