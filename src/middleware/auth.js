const jwt = require('jsonwebtoken');
const Student = require('../model/product')

const auth = async (req, res, next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'mynewproject')
        const student = await Student.findOne({_id: decoded._id});
        if(!student){
            throw new Error()
        }

        req.student = student;
        next();
    } catch(e) {
        res.status(401).send("Unauthorized");
    }
}

module.exports = auth;