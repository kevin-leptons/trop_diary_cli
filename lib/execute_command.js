const {ApiError} = require('@trop/diary_nodejs')
const chalk = require('chalk')

function execute_command(cmd, attr) {
    return (conf) => {
        Promise.resolve(cmd[attr](conf)).
        catch(e => {
            if (e instanceof ApiError) {
                _print_api_error(e)
            } else {
                console.error(e)
                console.error('Oops!, Unexpected Error Just Happend')
            }

            process.exit(1)
        })
    }
}

function _print_api_error(e) {
    console.error(chalk.red('API Layer Error'))
    console.error(_title('STATUS'), e.status)
    console.error(_title('LOG_ID'), e.body.log_id || 'None')
    console.error(_title('ERROR'), e.body.error || 'None')
}

function _title(title) {
    return title.padEnd(8)
}

module.exports = execute_command
