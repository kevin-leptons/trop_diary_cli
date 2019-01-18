async function cli_status(service) {
    let status = await service.root.get()

    console.log(_format_label('version'), status.version)
    console.log(_format_label('message_count'), status.message_count)
}

function _format_label(label) {
    return label.padEnd(16)
}

module.exports = {
    status: cli_status
}
