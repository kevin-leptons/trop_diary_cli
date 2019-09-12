const chalk = require('chalk')
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
const _EMPTY_STR = '-'
const _UNKNOW_STR = '?'

class MessageCmd {
    constructor(api, schema) {
        this._api = api
        this._schema = schema
    }

    async list(conf) {
        let filter = this._list_filter(conf)
        let items = await this._api.message.list(filter)

        this._schema.verify('//api/message_list', items)
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

        this._schema.verify('//api/message_find', item)
        console.log(format.title('ID'), item._id)
        console.log(format.title('Level'), this._format_level(item.level))
        console.log(format.title('Label'), this._format_label(item.label))
        console.log(format.title('IP'), item.ip)
        console.log(format.title('Created'), format.datetime(item.created))
        console.log('')
        console.log(this._format_data(item.data))
    }

    // PRIVATE MEMBERS

    _format_data(data) {
        if (data === undefined || data === null) {
            return _EMPTY_STR
        } else {
            return JSON.stringify(data, null, 2)
        }
    }

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
        return items.map(item => ([
            this._format_level(item.level),
            item._id,
            format.datetime(item.created),
            item.ip,
            this._format_label(item.label)
        ]))
    }

    _format_level(level_no) {
        let level = _LEVEL_STR[level_no]
        if (!level) {
            return _UNKNOW_STR
        }

        let format = _LEVEL_MAP[level]
        return format(level.toUpperCase())
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
        return label || _EMPTY_STR
    }
}

module.exports = MessageCmd
