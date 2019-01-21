const chalk = require('chalk')
const dateformat = require('dateformat')

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
let _LEVEL_CODE = {
    'info': 0,
    'debug': 1,
    'warn': 2,
    'error': 3,
    'fatal': 4
}

async function message_list(conf, service) {
    try {
        let filter = _create_filter(conf)
        let items = await service.message.list(filter)
        if (items.length === 0) {
            console.log('Not Found')
            return
        }
        if (items.length === 0) {
            console.log('Not Found')
            return
        }
        for (let item of items) {
            _print_item(item)
        }
    } catch (e) {
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
        console.log(_title('label').padEnd(8), _format_label(item.label))
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

function _create_filter(conf) {
    let filter = {}
    if (conf.page) {
        filter.p = conf.page
    }
    if (conf.label) {
        filter.l = conf.label
    }

    if (conf.fromDate) {
        filter.lc = _getTimestamp(conf.fromDate)
    }
    if (conf.toDate) {
        filter.uc = _getTimestamp(conf.toDate)
    }

    if (conf.fromLevel) {
        filter.ll = _getLevel(conf.fromLevel)
    }
    if (conf.toLevel) {
        filter.ul = _getLevel(conf.toLevel)
    }

    return filter
}

function _getTimestamp(date_str) {
    try {
        let d = new Date(date_str)
        return Math.floor(d.getTime() / 1000)
    } catch {
        console.error('Invalid date time string')
        process.exit(1)
    }
}

function _getLevel(level_str) {
    let code = _LEVEL_CODE[level_str]
    if (code === undefined) {
        console.error('Invalid level, ... info, debug, warn, error, fatal')
        process.exit(1)
    }
    return code
}

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
    let str = dateformat(d, 'yyyy-mm-dd"T"HH:MM:sso')
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
