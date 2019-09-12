const {table, getBorderCharacters} = require('table')
const inquirer = require('inquirer')
const chalk = require('chalk')

const format = require('./format')

let _ROLE_MAP = {
    root: chalk.red,
    r: str => str,
    w: chalk.green,
    rw: chalk.yellow
}

class AccountCmd {
    constructor(api) {
        this._api = api
    }

    async list(conf) {
        let items = await this._api.account.list({
            q: conf.keyword,
            p: conf.page
        })
        if (items.length < 1) {
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

    async create(conf) {
        let password = await this._ask_password()

        await this._api.account.create({
            email: conf.email,
            password: password,
            role: conf.role
        })
    }

    async remove(conf) {
        await this._api.account.remove(conf.email)
    }

    // PRIVATE MEMBERS

    _object_to_array(items) {
        let array = []

        for (let item of items) {
            array.push([
                this._format_role(item.role),
                item.email,
                item._id,
                format.datetime(item.created),
                format.datetime(item.modified)
            ])
        }

        return array
    }

    _format_role(role) {
        let format = _ROLE_MAP[role] || function (str) { return str }
        return format(role.toUpperCase())
    }

    async _ask_password() {
        let input = await inquirer.prompt([
            {
                name: 'password',
                type: 'password'
            }
        ])
        return input.password
    }
}

module.exports = AccountCmd
