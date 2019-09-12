const path = require('path')
const os = require('os')
const fs = require('fs')
const yaml = require('js-yaml')

const conf_file = require('./conf_file')

const _CONF_FILE = path.join(os.homedir(), '.config', 'trop_diary_cli.yaml')

class ConfService {
    constructor() {
    }

    read() {
        return conf_file.load(_CONF_FILE)
    }
}

module.exports = ConfService
