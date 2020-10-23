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

const jobs = [
 {   jname:"software developer",
    address:"mexico",
    salary: "5000",
    workingTime:"part-time",
    experience:"2years",
    peopleRequired:"5"
}
]


module.exports = { permissions, roles, admins,jobs}
