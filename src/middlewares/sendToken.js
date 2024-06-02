const sendToken = {
    //////////////////////////////////////////////////////
    // MIDDLEWARE FUNCTION FOR SENDING JWT TOKEN
    //////////////////////////////////////////////////////
    sendToken: (req, res, next) => {
        res.status(200).json({
            message: res.locals.message,
            token: res.locals.token,
        });
    }
}

module.exports = sendToken;
