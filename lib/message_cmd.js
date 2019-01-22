const chalk = require('chalk')
const dateformat = require('dateformat')
const {table, getBorderCharacters} = require('table')

const format = require('./format')

const _LEVEL_MAP = {
    info: chalk.grey,
    debug: chalk.green,
    warn: chalk.yellow,
    error: chalk.red,
    fatal: chalk.bold.red
}
const _LEVEL_STR = {
    0: 'info',
    1: 'debug',
    2: 'warn',
    3: 'error',
    4: 'fatal'
}
const _LEVEL_CODE = {
    'info': 0,
    'debug': 1,
    'warn': 2,
    'error': 3,
    'fatal': 4
}

class MessageCmd {
    constructor(api) {
        this._api = api
    }

    async list(conf) {
        let filter = this._list_filter(conf)
        let items = await this._api.message.list(filter)
        if (items.length === 0) {
            console.log('Empty')
            return
        }

        items = this._object_to_array(items)
        let out = table(items, {
            border: getBorderCharacters(`void`),
            columnDefault: {
                paddingLeft: 0,
                paddingRight: 1
            },
            drawHorizontalLine: () => {
                return false
            }
        })
        process.stdout.write(out)
    }

    async find(conf) {
        let item = await this._api.message.find(conf.id)

        console.log(format.title('id'), item._id)
        console.log(format.title('level'), this._format_level(item.level))
        console.log(format.title('label'), this._format_label(item.label))
        console.log(format.title('created'), this._format_date(item.created))
        console.log(format.title('ip'), item.ip)
        console.log(''.padEnd(80, '-'))
        console.log(item.message)
        console.log(''.padEnd(80, '-'))
    }

    // PRIVATE MEMBERS

    _list_filter(conf) {
        let filter = {}

        if (conf.page) {
            filter.p = conf.page
        }
        if (conf.label) {
            filter.l = conf.label
        }

        if (conf.fromDate) {
            filter.lc = this._get_timestamp(conf.fromDate)
        }
        if (conf.toDate) {
            filter.uc = this._get_timestamp(conf.toDate)
        }

        if (conf.fromLevel) {
            filter.ll = this._get_level(conf.fromLevel)
        }
        if (conf.toLevel) {
            filter.ul = this._get_level(conf.toLevel)
        }

        return filter
    }

    _object_to_array(items) {
        let array = []

        for (let item of items) {
            array.push([
                this._format_level(item.level),
                item._id,
                this._format_date(item.created),
                item.ip,
                item.label,
                item.message
            ])
        }

        return array
    }

    _format_level(level_no) {
        let level = _LEVEL_STR[level_no]
        if (!level) {
            return '???'
        }

        let format = _LEVEL_MAP[level]
        return format(level.toUpperCase())
    }

    _format_date(timestamp) {
        let d = new Date(timestamp * 1000)
        return dateformat(d, 'yyyy-mm-dd"T"HH:MM:sso')
    }

    _get_level(level_str) {
        let code = _LEVEL_CODE[level_str]
        if (code === undefined) {
            console.error(`Invalid level "${level_str}"`)
            process.exit(1)
        }
        return code
    }

    _get_timestamp(date_str) {
        try {
            let d = new Date(date_str)
            return Math.floor(d.getTime() / 1000)
        } catch {
            console.error('Invalid date time string')
            process.exit(1)
        }
    }

    _format_label(label) {
        return label || 'None'
    }
}

module.exports = MessageCmd
