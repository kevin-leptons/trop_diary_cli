const format = require('./format')

class RootCmd {
    constructor(api) {
        this._api = api
    }

    async status() {
        let info = await this._api.root.get()
        console.log(format.title('version'), info.version)
        console.log(format.title('messages'), info.message_count)
    }
}

module.exports = RootCmd
