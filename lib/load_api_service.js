const {Service} = require('@trop/diary_nodejs')

function load_api_service(conf_service) {
    let conf = conf_service.read()
    if (!conf.endpoint) {
        console.error('No API Endpoint')
        process.exit(1)
    }

    let api = new Service({
        endpoint: conf.endpoint
    })
    if (conf.token) {
        api.auth.set_token(conf.token.access_token)
    }
    return api
}

module.exports = load_api_service
