const chalk = require('chalk')

let _LEVEL_MAP = {
    info: chalk.grey,
    debug: chalk.green,
    warn: chalk.yellow,
    error: chalk.red,
    fatal: chalk.bgBlue
}

async function message_list(conf, service) {
    try {
        let items = await service.message.list()
        for (let item of items) {
            _print_item(item)
        }
    } catch (e) {
        let status = e.response.status
        if (status === 401 || status === 403) {
            console.error('Unauthorization')
            process.exit(1)
        }
    }
}

function _print_item(item) {
    let level = _format_level(item.level)
    let date = _format_date(item.date)
    let ip = _format_ip(item.ip)
    let label = _format_label(item.label)

    process.stdout.write(level + ' ')
    process.stdout.write(date + ' ')
    process.stdout.write(ip + ' ')
    process.stdout.write(label + ' ')
    process.stdout.write(item.message)
    process.stdout.write('\n')
}

function _format_level(level) {
    let format = _LEVEL_MAP[level]
    level = level.toUpperCase()
    level = level.padEnd(5)

    if (!format) {
        return level
    } else {
        return format(level)
    }
}

function _format_date(date) {
    let d = new Date(date)
    let str = d.toISOString()
    return chalk.grey(str)
}

function _format_ip(ip) {
    return chalk.grey(ip)
}

function _format_label(label) {
    if (!label) {
        label = 'None'
    }
    return chalk.grey(label)
}

module.exports = {
    list: message_list
}
