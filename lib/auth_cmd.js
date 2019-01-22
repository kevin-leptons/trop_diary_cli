const inquirer = require('inquirer')

class AuthCmd {
    constructor(api, conf) {
        this._api = api
        this._conf = conf
    }

    async login(conf) {
        let info = await this._ask_info()
        let token = await this._api.auth.create_token({
            grant_type: 'password',
            username: info.username,
            password: info.password
        })

        let old = this._conf.read()
        old.token = token
        this._conf.write(old)
        console.log(`Successfully, logged in as ${info.username}`);
    }

    async logout(conf) {
        let old = this._conf.read()
        old.token = null
        this._conf.write(old)
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
