const jwt = require('jsonwebtoken');

//user authrization 
exports.login = async (req, res) => {
    // login
    try {
        res.status(200).json({
            user: req.user,
        });
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};
exports.loginToken = async(req, res, next) => {
        // login
        jwt.sign({user: req.user}, 'secretKey', {expiresIn: '1h'}, (err, token) => {
        if(err) {
            return res.json({
            message: "Failed to login",
            token: null,
        });
        }
        res.json({
            token
        });
    })
}
exports.signup = async(req, res) => {
    try {
        res.status(200).json({
            user: req.user,
        });
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};