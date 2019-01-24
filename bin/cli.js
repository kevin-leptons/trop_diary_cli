#!/usr/bin/env node

const yargs = require('yargs')

const cmd = require('../lib')
const execute_command = require('../lib/execute_command')

yargs.
usage('$0 <cmd> [args]').

command('set-endpoint <url>', 'Set API Endpoint', (yargs) => {
}, execute_command(cmd.conf, 'set_endpoint')).

command('login', 'Login', (yargs) => {
}, execute_command(cmd.auth, 'login')).

command('logout', 'Logout', (yargs) => {
}, execute_command(cmd.auth, 'logout')).

command('key-create <role> <file>', 'Create a key for server-server', (yargs) => {
}, execute_command(cmd.key, 'create')).

command('status', 'Show service status', (yargs) => {
}, execute_command(cmd.root, 'status')).

command('account-list', 'List accounts', (yargs) => {
    yargs.
    option('keyword', {
        describe: 'Keyword to search for email',
        type: 'string'
    }).
    option('page', {
        describe: 'Page index',
        types: 'integer'
    })
}, execute_command(cmd.account, 'list')).

command('account-create <email> <role>', 'Create a new account', (yargs) => {
}, execute_command(cmd.account, 'create')).

command('account-remove <email>', 'Remove an account', (yargs) => {
}, execute_command(cmd.account, 'remove')).

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
}, execute_command(cmd.message, 'list')).

command('message-find <id>', 'Find a message', (yargs) => {
}, execute_command(cmd.message, 'find')).

strict().
demandCommand().
help().
argv
