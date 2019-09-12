const {ErrorChain} = require('@trop/gear').error

class InvalidDataError extends ErrorChain {
    constructor(message, prev_error, context) {
        super(message, prev_error, context)
        this.name = this.constructor.name
    }
}

module.exports = {
    InvalidDataError
}
