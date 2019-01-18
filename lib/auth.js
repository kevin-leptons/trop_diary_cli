const os = require('os')
const path = require('path')
const fs = require('fs')

const shell = require('shelljs')
const diary = require('@trop/diary_nodejs')

let _CONF_DIR = path.join(os.homedir(), '.trop_diary_cli')
let _CONF_FILE = path.join(_CONF_DIR, 'service.json')

/*
Argument
    * conf / object / {}.
    * conf.endpoint / string.
*/
async function login(conf) {
    _check_endpoint(conf.endpoint)
    _save_conf(conf.endpoint)
}

async function load() {
    if (!fs.existsSync(_CONF_FILE)) {
        _unauthorization()
    }
    let conf = require(_CONF_FILE)
    if (!conf.endpoint) {
        _unauthorization()
    }
    return diary({
        endpoint: conf.endpoint
    })
}

async function logout() {
    _save_conf(null)
}

// PRIVATE MEMBERS

function _unauthorization() {
    console.error('Authentication failed')
    process.exit(1)
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

function _save_conf(endpoint) {
    let data = JSON.stringify({
        endpoint: endpoint
    })

    shell.mkdir('-p', _CONF_DIR)
    fs.writeFileSync(_CONF_FILE, data)
}

module.exports = {
    login: login,
    load: load,
    logout: logout
}
