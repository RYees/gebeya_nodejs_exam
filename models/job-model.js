
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const bcrypt = require('bcrypt')

const jobSchema = new mongoose.Schema({
    
    Jname: {type: String, default: ''},
    address: {type: String, default: ''},
    salary: {type: String, default: ''},
    experience: {type: String, default: ''},
    workingTime: {type: String, default: ''},
    peopleRequired: {type: String, default: ''},
    active: { type: Boolean, default: false },
    archived: { type: Boolean, default: false },
    last_login: { type: Date },
    created_at: { type: Date, default: new Date() },
    updated_at: { type: Date, default: new Date() }
})

jobSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Job', jobSchema);

