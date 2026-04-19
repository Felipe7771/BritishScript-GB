function getFormattedDate() {
    const now = new Date();

    const yy = String(now.getFullYear()).slice(-2);
    const dd = String(now.getDate()).padStart(2, '0');
    const mm = String(now.getMonth() + 1).padStart(2, '0');

    const hh = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');

    return `[${yy}/${dd}/${mm} - ${hh}:${min}:${ss}]`;
}

async function startingTerminal() {
    terminal.innerHTML = terminal.innerHTML + '\n'
    date = getFormattedDate()
    log(`Starting a war in ${date} >>>`)
    log('')

    await sleep(400)

    terminal.innerHTML = terminal.innerHTML + 'cmd /C "c:\\Planet\\Countrys\\histora.exe\\n'

    await sleep(600)

    terminal.innerHTML = terminal.innerHTML + 'c:\\Planet\\Countrys\\.urss_servers\\cold\\ms-histora.debugpy-1991.18.0-win32-x19\\bundled\\launcher 57875 -- '

    await sleep(200)

    terminal.innerHTML = terminal.innerHTML + '"c:\\Planet\\Countrys\\Wars\\historical_archive\\machine_guns\\hra.py\n\n'

    await sleep(1000)
}