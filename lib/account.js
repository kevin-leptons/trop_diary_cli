const chalk = require('chalk')
const inquirer = require('inquirer')

let _ROLE_MAP = {
    root: chalk.red,
    r: chalk.grey,
    w: chalk.green,
    rw: chalk.yellow
}

async function cli_create(service, conf) {
    let password = await _get_password()

    try {
        await service.account.create({
            email: conf.email,
            role: conf.role,
            password: password
        })
    } catch (e) {
        switch (e.response.status) {
            case 400:
                console.error('Bad input')
                break
            case 409:
                console.error('Account is already existed')
                break
            case 500:
                let log_id = e.response.data.error_id
                console.error(`Server error, log_id=${log_id}`)
                break
            default:
                console.error(e)
        }
    }
}

async function cli_list(service, conf) {
    let items = await service.account.list({
        q: conf.keyword,
        p: conf.page
    })

    for (let item of items) {
        let role = _format_role(item.role)
        let email = item.email.padEnd(24)
        let created = chalk.grey(item.created)
        let modified = chalk.grey(item.modified)

        process.stdout.write(role + ' ')
        process.stdout.write(email + ' ')
        process.stdout.write(created + ' ')
        process.stdout.write(modified)
        process.stdout.write('\n')
    }
}

async function cli_remove(service, conf) {
    try {
        await service.account.remove(conf.email)
    } catch (e) {
        switch (e.response.status) {
            case 400:
                console.error('Account does not existed')
                break
            case 500:
                let log_id = e.response.data.error_id
                console.error(`Server error, log_id=${log_id}`)
                break
            default:
                console.error(e)
        }
    }
}

// PRIVATE MEMBERS

function _format_role(role) {
    let format = _ROLE_MAP[role]
    role = role.toUpperCase()
    role = role.padEnd(5)

    if (!format) {
        return role
    } else {
        return format(role)
    }
}

async function _get_password() {
    let input = await inquirer.prompt([
        {
            name: 'password',
            type: 'password'
        }
    ])
    return input.password
}

module.exports = {
    list: cli_list,
    remove: cli_remove,
    create: cli_create
}
