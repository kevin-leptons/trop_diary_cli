const dateformat = require('dateformat')

function title(label, pad=8) {
    return label.toUpperCase().padEnd(pad)
}

function date(input) {
    if (Number.isInteger(input)) {
        input = input * 1000
    }
    let d = new Date(input)
    return dateformat(d, 'yyyy-mm-dd"T"HH:MM:sso')
}

module.exports = {
    title: title,
    date: date
}
