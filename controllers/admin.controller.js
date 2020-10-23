const { pick } = require('lodash')
const jobModel = require('../models/job-model')
const mongoose = require('mongoose')


exports.Alljobs = async (req, res) => {

    try {

        let sort = {}
        if(req.query.sort) {
            sort[req.query.sort] = req.query.asc ? 1 :-1 
        }

        let query = {}

        if(req.query.filter) {
            let filter = JSON.parse(req.query.filter);
           
            query = pick(filter, ['jname', 'address', 'active']) 
            
        }
        
        const options = {
            sort: Object.values(sort).length > 0 ? sort: {
                'created_at': -1
            },
            page: req.query.page || 1,
            limit: req.query.limit || 10,
            populate: { path: 'roles', populate: {path: 'permissions'}}
        }
        const jobs = await jobModel.paginate(query,options)

        res.json(jobs)

    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
    
}

exports.getjob = async (req, res) => {

    try {
        console.log(req.params);
        const job = await jobModel.findById(req.params.id)
        res.json(job)
    } catch (error) {
        res.status(404).json({
            error: true,
            message: error
        })
    }

}

exports.createjob = async (req, res) => {
    try {

        const job = await jobModel.create(req.body)
         res.json(job)
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error
        })
    }

}

exports.updatejob = async (req, res) => {

    try {
        let job = await jobModel.findById(req.params.id)
        if(job) {
            broker = await jobModel.updateOne({_id: job._id}, req.body)
            return res.json(job)
        }

        throw new Error('Job dosen\'t exist')
       

        
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error
        })
    }
}

exports.removejob = async (req, res) => {
    try {
        let job = await jobModel.findById(req.params.id)
        if(job) {
            await jobModel.remove({
                _id: job._id
            })
            return res.json(job)
        }
        throw new Error('Job doesn\t exist')

    } catch (error) {
        
    }
}






