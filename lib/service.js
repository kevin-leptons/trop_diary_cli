const auth = require('./auth')
const root = require('./root')
const message = require('./message')
const cli_conf = require('./conf')

async function cli_set_endpoint(conf) {
    _check_endpoint(conf.url)

    let local_conf = cli_conf.read()
    if (!local_conf) {
        local_conf = {}
    }

    local_conf.endpoint = conf.url
    cli_conf.write(local_conf)
}

async function cli_login(conf) {
    await auth.login(conf)
}

async function cli_status() {
    let service = await auth.load()
    await root.status(service)
}

async function cli_logout() {
    await auth.logout()
}

async function cli_message_list(conf) {
    let service = await auth.load()
    await message.list(conf, service)
}

function _check_endpoint(endpoint) {
    let url

    try {
        url = new URL(endpoint)
    } catch {
        console.error('Invalid endpoint, not a URL')
        process.exit(1)
    }

    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
        console.error('Invalid endpoint, protocol must be HTTP or HTPPs')
        process.exit(1)
    }
    if (url.pathname !== '/') {
        console.error('Invalid endpoint, pathname must be empty')
        process.exit(1)
    }
}

module.exports = {
    cli_set_endpoint: cli_set_endpoint,
    cli_login: cli_login,
    cli_logout: cli_logout,
    cli_status: cli_status,
    cli_message_list: cli_message_list
}
