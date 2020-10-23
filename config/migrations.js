const permissions = [
    'create job',
    'view job',
    'update job',
    'remove job',

    'create role',
    'view any role',
    'view role',
    'update role',
    'remove role',

    ]

const roles = {
    admin: [...permissions],
    }



const admins = [
{
    name: 'bell',
    username:'admin',
    password:'admin1234',
    email:'admin@gmail.com',
    roles:['admin']
}
]

const jobs = []
 


module.exports = { permissions, roles, admins,jobs}
