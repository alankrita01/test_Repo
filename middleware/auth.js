// const jwt = require('jsonwebtoken');
// const User = require('../models/userModel');

// const authenticate = (req, res, next) => {

//     try{
//         const token = req.header('Authorization');
//         console.log(token);
//         const user = jwt.verify(token, 'secretKey');
//         console.log('userId >>>', user.userId);

//         User.findByPk(userId).then(user => {
//             //console.log(JSON.stringify(user));
//             req.user = user;
//             next();
//         })
//         .catch(err => {
//             throw new Error(err)
//         })

//     }
//     catch(err){
//         console.log(err);
//         return res.status(401).json({success: false})
//     }
    
// }

// module.exports ={
//     authenticate
// }



const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization');
    console.log(token);
    const user = jwt.verify(token, 'secretKey');
    console.log('userId >>>', user.userId);

    try {
      const userN = await User.findByPk(user.userId);
      // console.log(JSON.stringify(user));
      req.user = userN;
      next();
    } catch (err) {
      throw new Error(err);
    }
  } catch (err) {
    console.log(err);
    return res.status(401).json({ success: false });
  }
};

module.exports = {
  authenticate,
};