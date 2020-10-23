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
/**
 * @typedef admin
 * @property {string} username.required - A Unique user name
 * @property {string} email.required - A Unique email name
 * @property {string} password.required - A strong password
 */
/**
 * Returns ALL jobs
 * 
 * @route GET /admin
 * @group User - Deals with all CRUD operations with job model
 * @param {string} sort.query - sort parament
 * @param {string} page.query - set the page number
 * @param {string} filter.query - set filter query 
 * @security JWT
 * @returns {object} 200 - Array of jobs
 * @returns {Error}  default - Unexpected error
 */
router.get('/', hasPermissions([ 'view any job']),adminController.Alljobs);

/**
 * Create a  job by id
 * 
 * @route GET /admin/{id}
 * @group admin
 * @param {string} id.path.required -admin id
 * @security JWT
 * @returns {object} 200 - job object
 * @returns {Error}  default - Unexpected error
 */
router.get('/:id', hasPermissions(['view job']),adminController.getjob);

/**
 * Create a new admin 
 * 
 * @route POST /admin/
 * @group admin 
 * @param {JOB.model} user.body.required - the new job
 * @security JWT
 * @returns {object} 200 - job object
 * @returns {Error}  default - Unexpected error
 */
router.post('/', hasPermissions(['create job']) && userFormRequest('createUser'),adminController.createjob);

/**
 * Update an existing job by id 
 * 
 * @route PATCH /admin/:id
 * @group admin
 * @param {string} id.path.required - job id
 * @param {JOB.model} user.body - the new job object
 * @security JWT
 * @returns {JOB.model} 200 - job object
 * @returns {Error}  default - Unexpected error
 */
router.patch('/:id', hasPermissions(['update job']), adminController.updatejob);
/**
 * Remove a new job  with id
 * 
 * @route DELETE /admin/{id}
 * @group User 
 * @param {string} id.path.required - job id
 * @security JWT
 * @returns {object} 200 - job object
 * @returns {Error}  default - Unexpected error
 */
router.delete('/:id', hasPermissions(['remove job']),adminController.removejob);




module.exports = router;
