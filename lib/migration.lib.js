
var { permissions, roles, admins,jobs} = require('../config/migrations')


const logger = require('../config/logger');

const permissionModel = require('../models/permission-model')
const roleModel = require('../models/role-model')

const adminModel = require('../models/admin-model')
const jobModel = require('../models/job-model')


module.exports = {
    
    migratePermissions: async () => {
        logger.info(`Checking permissions migrations...`);
        // retrieve all permissions from db
        let permissionDocument =  await permissionModel.find({})
        
        if(permissions.length > permissionDocument.length) {
                logger.info(`Found new permissions...`);
                // some operation
                permissions = permissions.filter(per => {
                    return permissionDocument.findIndex(val => val.name === per) === -1
                })
                await permissionModel.insertMany([
                    ...permissions.map(val => ({name: val}))
                ])
                logger.info(`migrate permission completed ...`);
                return;
                
            }
            logger.info(`Noting to migrate fro permission ...`);
    },

    migrateRoles: async () => {
        logger.info(`Checking role migrations...`);

        await Object.keys(roles).forEach( async index => {
            // count if role exists
            let roleDocumentCount = await roleModel.countDocuments({ name: index})
            if(roleDocumentCount === 0) {
                logger.info(`Found new role...`);
                 let data =  await permissionModel.find({
                      name: {
                          $in: roles[index]
                      }
                  })
                  
                  await roleModel.create({
                        name: index,
                        permissions: data.map(val => val._id)
                    })
                    logger.info(`completed ${index} role migrated...`);
                   
            }
            })
            logger.info(`completed roles migrations...`);
        
    },

    migrateAdmins: async () => {
        logger.info(`Checking admins migrations...`);

        await admins.forEach(async admin => {
            let adminDocumentCount = await adminModel.countDocuments({
                username: admin.username
            })
            
                if(adminDocumentCount === 0) {
                    let data = await roleModel.find({
                        name: {
                            $in: admin.roles // [1,2,3]
                        }
                    })
                        await adminModel.create({
                            ...admin,
                            roles: data.map(val => val._id)
                        })
                        logger.info(`completed ${admin.username} user migrated...`);
                        
                }
        })
        logger.info(`completed admins migrations...`);
    },        

migrateAdmins: async () => {
    logger.info(`Checking comments migrations...`);

    await admins.forEach(async admin => {
        let adminDocumentCount = await adminModel.countDocuments({
            name: admin.name
        })
        
            if(adminDocumentCount === 0) {
                let data = await adminModel.find({
                    name: {
                        $in: admin.roles // [1,2,3]
                    }
                })
                    await adminModel.create({
                        ...admin,
                        roles: data.map(val => val._id)
                    })
                    logger.info(`completed ${admin.name} comment migrated...`);
                    
            }
    })
    logger.info(`completed comment migrations...`);
},

migrateJobs: async () => {
    logger.info(`Checking jobs migrations...`);

    await jobs.forEach(async job => {
        let jobDocumentCount = await jobModel.countDocuments({
            jname: job.jname
        })
        
            if(jobDocumentCount === 0) {
                let data = await roleModel.find({
                    name: {
                        $in: job.roles // [1,2,3]
                    }
                })
                    await jobModel.create({
                        ...job,
                        roles: data.map(val => val._id)
                    })
                    logger.info(`completed ${job.jname} job migrated...`);
                    
            }
    })
    logger.info(`completed job migrations...`);
}
}