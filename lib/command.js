const ConfService = require('./conf_service')
const CacheService = require('./cache_service')
const SchemaService = require('./schema_service')
const load_api_service = require('./load_api_service')

class Command {
    constructor() {
        this._conf_service = new ConfService()
        this._schema_service = new SchemaService()
        this._cache_service = new CacheService()
        this._api_service = load_api_service(
            this._conf_service,
            this._cache_service
        )
    }

    get auth() {
        const AuthCmd = require('./auth_cmd')
        return new AuthCmd(this._api_service, this._cache_service)
    }

    get root() {
        const RootCmd = require('./root_cmd')
        return new RootCmd(this._api_service)
    }

    get account() {
        const AccountCmd = require('./account_cmd')
        return new AccountCmd(this._api_service)
    }

    get message() {
        const MessageCmd = require('./message_cmd')
        return new MessageCmd(this._api_service, this._schema_service)
    }

    get key() {
        const KeyCmd = require('./key_cmd')
        return new KeyCmd(this._api_service)
    }
}

module.exports = Command
