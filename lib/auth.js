const os = require('os')
const path = require('path')
const fs = require('fs')

const inquirer = require('inquirer')
const diary = require('@trop/diary_nodejs')

const cli_conf = require('./conf')

/*
Argument
    * conf / object / {}.
    * conf.email / string
*/
async function login(conf) {
    let local = cli_conf.read()
    if (!local || !local.endpoint) {
        console.error('Endpoint is unspecified')
        return
    }

    let password = await _get_password()
    let d = diary({
        endpoint: local.endpoint
    })
    try {
        let token = await d.auth.get_token(conf.email, password)
        local.token = token.token
    } catch (e) {
        switch (e.response.status) {
            case 400:
                console.error('Invalid format email or password')
                break
            case 401:
                console.error('Invalid email or password')
                break
            default:
        }

        process.exit(1)
    }

    cli_conf.write(local)
    console.log('Login successfully')
}

async function load() {
    let conf = cli_conf.read()
    if (!conf.endpoint) {
        _unauthorization()
    }
    let d = diary({
        endpoint: conf.endpoint
    })
    d.set_token(conf.token)
    return d
}

async function logout() {
    let conf = cli_conf.read()

    conf.token = null
    cli_conf.write(conf)
}

// PRIVATE MEMBERS

function _unauthorization() {
    console.error('Authentication failed')
    process.exit(1)
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
    login: login,
    load: load,
    logout: logout
}
