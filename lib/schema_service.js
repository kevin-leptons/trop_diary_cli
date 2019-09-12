const path = require('path')
const {DataFlow} = require('@trop/dflow')

const {InvalidDataError} = require('./error')

class SchemaService {
    constructor() {
        let schema_dir = path.join(__dirname, '..', 'schema')
        this._dflow = new DataFlow([schema_dir])
    }

    verify(schema_id, data) {
        let e = this._dflow.verify(schema_id, data)
        if (e) {
            throw new InvalidDataError('API layer', undefined, {
                schema_id: schema_id,
                data: data,
                error: e
            })
        }
    }
}

module.exports = SchemaService
