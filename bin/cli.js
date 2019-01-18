#!/usr/bin/env node

const yargs = require('yargs')

const service = require('../lib')

yargs.
usage('$0 <cmd> [args]').

command('login <endpoint>', 'Login to service', (yargs) => {
}, async_cli(service.cli_login)).

command('logout', 'Logout from service', (yargs) => {
}, async_cli(service.cli_logout)).

command('status', 'Show service status', (yargs) => {
}, async_cli(service.cli_status)).

command('message list', 'Work with log message', (yargs) => {
    yargs.
    option('page', {
        describe: 'Page index',
        type: 'number',
        default: 1
    }).
    option('size', {
        describe: 'Page size',
        types: 'number',
        default: 8
    })
}, async_cli(service.cli_message_list)).

strict().
demandCommand().
help().
argv

function async_cli(async_fn) {
    return (arg) => {
        async_fn(arg).
        catch(e => {
            console.error(e)
            process.exit(1)
        })
    }
}
