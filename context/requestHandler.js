const { SimpleSuccessResponse, DownloadResponse, RedirectResponse } = require('./responses');

const isNullOrUndefined = objectToVerify => {
    return objectToVerify == undefined // * Always returns a boolean
}

const processOutput = (output, res) => {
    if (output instanceof SimpleSuccessResponse) res.status(output.successCode).json(output.responsePayload)
    else if (output instanceof DownloadResponse) res.download(output.filepath)
    else if (output instanceof RedirectResponse) res.redirect(output.redirectUrl)
    else throw Error('Unsupported response type')
}
class ManagerPromiseHandler {

    requestProcessor = async (promiseToCall, res, next) => {
        if (isNullOrUndefined(promiseToCall)) throw Error('Missing promise to process')
        else if (isNullOrUndefined(res)) throw Error('res parameter is missing')
        else if (isNullOrUndefined(next)) throw Error('next parameter is missing')
        try {
            const output = await promiseToCall
            processOutput(output, res)
        } catch (error) {
            next(error)
        }
    }

}

module.exports = new ManagerPromiseHandler()