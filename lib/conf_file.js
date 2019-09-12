const seed = require('@trop/seed')

/*
Description
    * Load configurations from file

Input
    * file / String - Path to configuration file

Output / Object - See _CONF_SCHEMA
*/
function load(file) {
    let conf = seed.load(_CONF_SCHEMA, file, _CONF_DEFAULT)

    conf._source_file = file
    return conf
}

module.exports = {
    load
}

/*
Private members
*/

const _CONF_SCHEMA = {
    type: 'object',
    additionalProperties: false,
    required: [
        'endpoint'
    ],
    properties: {
        endpoint: {
            type: 'string',
            format: 'uri'
        }
    }
}

const _CONF_DEFAULT = {}
