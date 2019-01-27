const inquirer = require('inquirer')

class AuthCmd {
    constructor(api, cache) {
        this._api = api
        this._cache = cache
    }

    async login(conf) {
        let info = await this._ask_info()
        let token = await this._api.auth.create_token({
            grant_type: 'password',
            username: info.username,
            password: info.password
        })

        this._cache.write_token(token)
        console.log(`Successfully, logged in as ${info.username}`);
    }

    async logout(conf) {
        this._cache.write_token({})
    }

    // PRIVATE MEMBERS

    async _ask_info() {
        let input = await inquirer.prompt([
            {
                name: 'username',
                type: 'input'
            },
            {
                name: 'password',
                type: 'password'
            }
        ])
        return input
    }
}

module.exports = AuthCmd
