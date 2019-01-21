const chalk = require('chalk')

let _LEVEL_MAP = {
    info: chalk.grey,
    debug: chalk.green,
    warn: chalk.yellow,
    error: chalk.red,
    fatal: chalk.bold.red
}
let _LEVEL_STR = {
    0: 'info',
    1: 'debug',
    2: 'warn',
    3: 'error',
    4: 'fatal'
}

async function message_list(conf, service) {
    try {
        let items = await service.message.list()
        for (let item of items) {
            _print_item(item)
        }
    } catch (e) {
        console.log(e);
        switch (e.response.status) {
            case 400:
                console.error('Bad input')
                break
            case 500:
                console.error(`log_id=${e.response.body.log_id}`)
                break
            default:
                throw e
        }
    }
}

async function message_find(service, conf) {
    function _title(title) {
        return chalk.grey(title.toUpperCase().padEnd(8)) + ' '
    }

    try {
        let item = await service.message.find(conf.id)
        console.log(_title('id'), chalk.grey(item._id))
        console.log(_title('level').padEnd(8), _format_level(item.level))
        console.log(_title('created'), _format_date(item.created))
        console.log(_title('ip'), _format_ip(item.ip))
        console.log(''.padEnd(80, '-'))
        console.log(item.message)
        console.log(''.padEnd(80, '-'))
    } catch (e) {
        switch (e.response.status) {
            case 400:
                console.error('Bad input')
                break
            case 404:
                console.log('Not Found')
                break
            case 500:
                console.error(`log_id=${e.response.body.log_id}`)
                break
            default:
                throw e
        }
    }
}

// PRIVATE MEMBERS

function _print_item(item) {
    let level = _format_level(item.level)
    let created = _format_date(item.created)
    let ip = _format_ip(item.ip)
    let label = _format_label(item.label)

    process.stdout.write(level + ' ')
    process.stdout.write(chalk.grey(item._id) + ' ')
    process.stdout.write(created + ' ')
    process.stdout.write(ip + ' ')
    process.stdout.write(label + ' ')
    process.stdout.write(item.message)
    process.stdout.write('\n')
}

function _format_level(level_no) {
    let level = _LEVEL_STR[level_no]
    if (!level) {
        console.error(`Invalide level no ${level_no}`)
        process.exit(1)
    }
    let format = _LEVEL_MAP[level]
    level = level.toUpperCase()
    level = level.padEnd(5)

    if (!format) {
        return level
    } else {
        return format(level)
    }
}

function _format_date(timestamp) {
    let d = new Date(timestamp * 1000)
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
    list: message_list,
    find: message_find
}
