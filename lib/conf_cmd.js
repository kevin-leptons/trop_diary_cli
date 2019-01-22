class ConfCmd {
    constructor(conf_service) {
        this._conf_service = conf_service
    }

    set_endpoint(conf) {
        let current = this._conf_service.read()

        current.endpoint = conf.url
        this._conf_service.write(current)
    }
}

module.exports = ConfCmd
