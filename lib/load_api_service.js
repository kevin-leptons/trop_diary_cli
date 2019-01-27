const {Service} = require('@trop/diary_nodejs')

function load_api_service(conf_service, cache_service) {
    let conf = conf_service.read()
    if (!conf.endpoint) {
        console.error('No API Endpoint')
        process.exit(1)
    }

    let api = new Service({
        endpoint: conf.endpoint
    })

    let token = cache_service.read_token()
    api.auth.set_token(token)

    api.auth.on('refresh_token', (e, token) => {
        if (e) {
            return
        }
        cache_service.write_token(token)
    })

    return api
}

module.exports = load_api_service
