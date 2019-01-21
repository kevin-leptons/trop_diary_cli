#!/usr/bin/env node

const yargs = require('yargs')

const service = require('../lib')

yargs.
usage('$0 <cmd> [args]').

command('set-endpoint <url>', 'Set API Endpoint', (yargs) => {
}, async_cli(service.cli_set_endpoint)).

command('account-create <email> <role>', 'Create a new account', (yargs) => {
}, async_cli(service.cli_account_create)).

command('account-list', 'List accounts', (yargs) => {
    yargs.
    option('keyword', {
        describe: 'Keyword to search with email',
        type: 'string'
    }).
    option('page', {
        describe: 'Page index',
        types: 'string'
    })
}, async_cli(service.cli_account_list)).

command('account-remove <email>', 'Remove an account', (yargs) => {
}, async_cli(service.cli_account_remove)).

command('login <email>', 'Login', (yargs) => {
}, async_cli(service.cli_login)).

command('logout', 'Logout', (yargs) => {
}, async_cli(service.cli_logout)).

command('status', 'Show service status', (yargs) => {
}, async_cli(service.cli_status)).

command('message-list', 'List messages', (yargs) => {
    yargs.
    option('page', {
        describe: 'Page index',
        type: 'number',
        default: 1
    }).
    option('label', {
        describe: 'Log label',
        types: 'string'
    }).
    option('from-level', {
        describe: 'Minimum log level',
        types: 'string'
    }).
    option('to-level', {
        describe: 'Maximum log level',
        types: 'string'
    }).
    option('from-date', {
        describe: 'Minimum created date',
        types: 'string'
    }).
    option('to-date', {
        describe: 'Maximum created date',
        types: 'string'
    })
}, async_cli(service.cli_message_list)).

command('message-find <id>', 'Find a message', (yargs) => {
}, async_cli(service.cli_message_find)).

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
