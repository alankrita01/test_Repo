const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authenticate = async (req, res, next) => {

    try{
        const token = req.header('Authorization');
        console.log(token);
        console.log('000000000')
        const user = jwt.verify(token, 'secretKey');
        console.log('111111111')
        console.log('userId >>>', user.userId);

        
            const userN = await User.findByPk(user.userId);

            req.user = userN;
            next();
        
    }
    catch(err){
        console.log(err);
        return res.status(401).json({success: false})
    }
    
}

module.exports ={
    authenticate
}