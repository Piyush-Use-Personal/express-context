const { Router } = require('express')
const RequestProcessor = require('../context/processor')
const { SimpleSuccessResponse, ErrorResponse } = require('../context/responses')
const router = Router()

const controller = ({ name }) => {
    return new SimpleSuccessResponse({
        message: 'success',
        name
    })
}
const errorController = () => {
    throw new ErrorResponse('No data found')
}



router.get('/', new RequestProcessor(controller).processRequest)
router.get('/error', new RequestProcessor(errorController).processRequest)

module.exports = router


