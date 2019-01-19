const path = require('path')
const os = require('os')
const fs = require('fs')

const shell = require('shelljs')

_CONF_DIR = path.join(os.homedir(), '.trop_diary_cli'),
_CONF_FILE = path.join(_CONF_DIR, 'service.json')

function read_conf() {
    if (!fs.existsSync(_CONF_FILE)) {
        return null
    }
    return require(_CONF_FILE)
}

function write_conf(conf) {
    let data = JSON.stringify(conf)

    shell.mkdir('-p', _CONF_DIR)
    fs.writeFileSync(_CONF_FILE, data)
}

module.exports = {
    read: read_conf,
    write: write_conf
}
