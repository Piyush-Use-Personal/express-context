//A global error handling middleware

const { ErrorResponse } = require('./responses');

module.exports = (error, req, res) => {

    if (error instanceof ErrorResponse) {
        res.status(error.errorCode).json(error.getObjectToSend())
        return
    } else {
        const jsonToSend = {
            error: `Unhandled Exception - ${error.message}`
        }
        res.status(500).json(jsonToSend);
    }
}
