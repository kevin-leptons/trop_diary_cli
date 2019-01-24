const fs = require('fs')

class KeyCmd {
    constructor(api) {
        this._api = api
    }

    async create(conf) {
        let key = await this._api.auth.create_key({
            role: conf.role
        })
        let out = JSON.stringify(key)
        fs.writeFileSync(conf.file, out)
    }
}

module.exports = KeyCmd
