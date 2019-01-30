# Introduction

## What it is?

* This is part of logging service [@trop/diary_api](https://trop-diary-api.netlify.com/)
* It exposes APIs of `@trop/diary_api` to Command Line Environment
* It is uses for developers, adminstrations who want to monitoring/tracing
  log messages

## How to start?

* It requires an API Endpoint, suppose that there is an instance at
  `API_ENDPOINT_URL`, if there are no one then checkout
  [@trop/diary_api](https://trop-diary-api.netlify.com/) to create new one
* It also requires an account `(email, password)` to login, for authentication
* Install binary distribution from NPM Registry

```bash
npm install -g @trop/diary_cli
```

* Create configuration file in `~/.confg/trop_diary_cli.json`

```json
{
    "endpoint": "API_ENDPOINT_URL"
}
```

* Login and checkout

```bash
trop-diary login
trop-diary status
trop-diary message-list
```

## What is next?

Checkout full commands [Command Line](use.md#command-line)
