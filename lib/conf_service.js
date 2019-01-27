const path = require('path')
const os = require('os')
const fs = require('fs')

const shell = require('shelljs')

_CONF_FILE = path.join(os.homedir(), '.config', 'trop_diary_cli.json')

class ConfService {
    constructor() {
    }

    read() {
        if (!fs.existsSync(_CONF_FILE)) {
            return {}
        }
        let raw = fs.readFileSync(_CONF_FILE)
        return JSON.parse(raw)
    }

    write(conf) {
        let raw = JSON.stringify(conf, null, 4)

        shell.mkdir('-p', path.dirname(_CONF_FILE))
        fs.writeFileSync(_CONF_FILE, raw)
    }
}

module.exports = ConfService
