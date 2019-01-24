# CLI

```text
status                         Show service status
set-endpoint <url>             Set API endpoint
login                          Login
logout                         Logout
key-create <role> <file>       Create a key
account-list                   List accounts
account-create <email> <role>  Create a new account
account-remove <email>         Remove an account
message-list                   List log messages
message-find <id>              Find a message

status

    no input

set-endpoint <url>

    * url / string, refers to endpoint API, for example
      'http://api-endpoint.com'

login <email>

    * email / string, login by username

logout

    no input

key-create <role> <file>

    * role / string, one of 'r', 'w', 'rw'
    * file / string, path to key file

account-list [--keyword value] [--page value]

    * --keyword / string, for search email
    * --page / integer, page index, begin from 1

account-create <emai> <role>

    * email / string, email address of account, for example 'someone@mail.com'
    * role / string, one of 'root' - all permisions, 'r' - read only messages,
      'w' - write only messages, 'rw' - read/write messages

account-remove <email>

    * email / string, username to remove

message-list [--page value] [--label value]
    [--from-level value] [--to-level value]
    [--from-date value] [--to-date value]

    * --page / integer, page index, begin from 1
    * --label / string, match with label exactly
    * --from-level / string, minimum level of message, one of
      'info' - 0, 'debug' - 1, 'warn' - 2, 'error' - 3 or 'fatal' - 4
    * --to-level / string, maximum level of message, similar as --from-level
      but must be greater or equal
    * --from-date / string, message which is created from, by format
      'YYYY-MM-DD[Thh:mm:ss]'
    * --to-date / string, message which is created before, similar as
      --from-date but must be greater or equal

message-find <id>

    * id / string, identity of message
```
