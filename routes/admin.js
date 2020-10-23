var router = require("express-promise-router")();

//const  {userFormRequest} = require('../middlewares/form-request/Aauth')
//const { hasPermissions } = require('../middlewares/auth');
const adminController = require('../controllers/admin.controller')

router.get('/alljobs',/* hasPermissions([ 'view broker']),*/adminController.Alljobs);

router.get('/job/:id',/* hasPermissions(['view broker']),*/adminController.getjob);

router.post('/createjob',/* hasPermissions(['create broker']) && userFormRequest('createUser'),*/ adminController.createjob);

//router.patch('/updateStatus',/* hasPermissions(['remove user']),*/adminController.updatestatus);

router.patch('/job/:id',/* hasPermissions(['update broker']),*/ adminController.updatejob);

router.delete('/job/:id',/* hasPermissions(['remove user']),*/adminController.removejob);




module.exports = router;
