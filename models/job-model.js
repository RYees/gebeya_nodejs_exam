
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const bcrypt = require('bcrypt')

const jobSchema = new mongoose.Schema({
    
    Jname: {type: String, default: '',required:true},
    address: {type: String, default: '',required:true},
    salary: {type: String, default: '',required:true},
    experience: {type: String, default: '',required:true},
    workingTime: {type: String, default: '',required:true},
    peopleRequired: {type: String, default: '',required:true},
    active: { type: Boolean, default: false },
    archived: { type: Boolean, default: false },
    last_login: { type: Date },
    created_at: { type: Date, default: new Date() },
    updated_at: { type: Date, default: new Date() }
})

jobSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Job', jobSchema);

