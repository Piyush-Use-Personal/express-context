class SimpleSuccessResponse {
    
    constructor(responsePayload, successCode = 200){
        if(responsePayload == undefined && successCode != 204) //Empty payload is valid only for 204
            throw Error(`Response payload is missing`)
        this.successCode = successCode
        this.responsePayload = responsePayload
    }
}

class DownloadResponse {
    constructor(filepath){
        if(filepath == undefined)
            throw Error(`File path is missing`)
        this.filepath = filepath
    }
}

class RedirectResponse {
    constructor(redirectUrl){
        if(redirectUrl == undefined)
            throw Error(`Redirect url is missing`)
        this.redirectUrl = redirectUrl
    }
}

class ErrorResponse extends Error {
    constructor(message, errorCode = 400, customPayload = undefined) {
      super(message)
      this.errorCode = errorCode
      this.customPayload = customPayload
    }

    getObjectToSend(){
      const dataToSend = {
        error: this.message,
        errorDetails: this.customPayload
      }
      dataToSend.errorStack = this.stack
      return dataToSend
    }

  }

module.exports = {
    SimpleSuccessResponse,
    DownloadResponse,
    RedirectResponse,
    ErrorResponse,
}