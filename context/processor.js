const ManagerPromiseHandler = require("./requestHandler")

class RequestProcessor {

    #asyncFunctionToCall;
    /**
     *  This middleware should ideally be called at the last
     * @param {Function} asyncFunctionToCall an async function that can accept a single payload parameter
     */
    constructor(asyncFunctionToCall) {
        this.#asyncFunctionToCall = asyncFunctionToCall
    }

    processRequest = (req, res, next) => {
        const bodyToUnwrap = typeof req.body == 'string' ? {} : req.body
        const stringBody = typeof req.body == 'string' ? req.body : undefined
        const payload = {
            stringBody,
            file: req.file,
            reqURL: req.url,
            ...req.headers,
            ...bodyToUnwrap,
            ...req.params,
            ...req.query,
            ...req.context, // Injected instances in context should overwrite any of the duplicate keys above
        }
        ManagerPromiseHandler.requestProcessor(this.#asyncFunctionToCall(payload), res, next)
    }

}

module.exports = RequestProcessor