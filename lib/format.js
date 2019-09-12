const dateformat = require('dateformat')

function title(label, pad=8) {
    return label.padEnd(pad)
}

function datetime(input) {
    if (Number.isInteger(input)) {
        input = input * 1000
    }
    let d = new Date(input)
    return dateformat(d, 'yyyy-mm-dd HH:MM:ss')
}

module.exports = {
    title: title,
    datetime: datetime
}
