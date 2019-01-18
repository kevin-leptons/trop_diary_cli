const auth = require('./auth')
const root = require('./root')
const message = require('./message')

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

module.exports = {
    cli_login: cli_login,
    cli_logout: cli_logout,
    cli_status: cli_status,
    cli_message_list: cli_message_list
}
