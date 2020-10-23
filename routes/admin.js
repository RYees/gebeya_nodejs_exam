var router = require("express-promise-router")();

//const  {userFormRequest} = require('../middlewares/form-request/Aauth')
//const { hasPermissions } = require('../middlewares/auth');
/**
 * Returns All Jobs
 * 
 * @route GET /admin 
 * @group Admin - Retrive Job information
 * @returns {object} 200 - An array of job info
 * @returns {Error}  default - Unexpected error
 */
const adminController = require('../controllers/admin.controller')

router.get('/',/* hasPermissions([ 'view broker']),*/adminController.Alljobs);

router.get('/:id',/* hasPermissions(['view broker']),*/adminController.getjob);

router.post('/',/* hasPermissions(['create broker']) && userFormRequest('createUser'),*/ adminController.createjob);

//router.patch('/updateStatus',/* hasPermissions(['remove user']),*/adminController.updatestatus);

router.patch('/:id',/* hasPermissions(['update broker']),*/ adminController.updatejob);

router.delete('/:id',/* hasPermissions(['remove user']),*/adminController.removejob);




module.exports = router;
