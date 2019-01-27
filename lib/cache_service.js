const path = require('path')
const os = require('os')
const fs = require('fs')

const shell = require('shelljs')

_CACHE_DIR = path.join(os.homedir(), '.cache', 'trop_diary_cli')
_TOKEN_FILE = path.join(_CACHE_DIR, 'token.json')

class CacheService {
    constructor() {
    }

    read_token() {
        if (!fs.existsSync(_TOKEN_FILE)) {
            return {}
        }
        let raw = fs.readFileSync(_TOKEN_FILE)
        return JSON.parse(raw)
    }

    write_token(token) {
        let raw = JSON.stringify(token)

        shell.mkdir('-p', _CACHE_DIR)
        fs.writeFileSync(_TOKEN_FILE, raw)
    }
}

module.exports = CacheService
