# status

**syntax**

```bash
trop-api status
```

**input** - `none`

**output** / string - service status

**description** - retrieve status of API Endpoint

# login

**syntax**

```bash
trop-api login
```

**input**

* `:username` / string
* `:password` / string

**ouput** - `undefined`

**description** - do authenticate with API Endpoint, get granted permisions
for other operations

# logout

**syntax**

```bash
trop-api logout
```

**input** - `none`

**output** - `undefined`

**description** - remove all credential

# key-create

**syntax**

```bash
trop-api key-create <role> <file>
```

**input**

* `role` / string - one of `r`, `w` or `rw`
* `file` / string - path to output file

**output** - `undefined`

**description** - create a key file for `server-server` authentication

# account-list

**syntax**

```bash
trop-api account-list [--keyword v] [--page v]
```

**input**

* `--keyword` / string - for matching with email
* `--page` / integer - page index, begin from one

**output** - list of account information

**description** - retrieve accounts

# account-create

**syntax**

```bash
trop-api account-create <email> <role>
```

**input**

* `email` / string - email address as username
* `role` / string - one of `r`, `w`, `rw` or `root`

**output** - `undefined`

**description** - create an account

# account-remove

**syntax**

```bash
trop-api account-remove <email>
```

**input**

* `email` / string - email address as username

**output** - `undefined`

**description** - remove an account from system, however granted token is
still valid for few hours

# message-list

**syntax**

```bash
trop-api message-list [--page v] [--label v]
                      [--from-level v] [--to-level v]
                      [--from-date v] [--to-date v]
```

**input**

* `--page` / integer - page index, begin from one
* `--label` / string - for matching with label
* `--from-level` / string - minimum level of message, one of
  `info`, `debug`, `warn`, `error`, `fatal` which correspond with
  `0`, `1`, `3`, `4`
* `--to-level` / string - maximum level of message, similar as `--from-level`
  and must be greater or equal
* `--from-date` / string - message which is created from, by format
  `YYYY-MM-DD[Thh:mm:ss]`
* `--to-date` / string - message which is created before, similar as
  `--from-date` and must be greater or equal

**output** - list of log messages

**description** - retrieve log messages

# message-find

**syntax**

```bash
trop-api message-find <id>
```

**input**

* `id` / string - identity of message

**output** - message content

**description** - retrieve specific message
