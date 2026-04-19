const input = document.getElementById('codeInput')
const highlight = document.getElementById('highlight')

let highTypeREDStyle = 'color: rgb(255, 0, 0); font-weight: bold;'
let highTypeYELLOWStyle = 'color: rgb(255, 187, 0);'
let highTypeBLUEStyle = 'color: rgb(108, 108, 242); font-weight: bold;'
let lowTypeStyle = 'color: rgba(144, 212, 255, 1)'

let TAG_STYLE = {
    strongRed: 'color: rgb(255, 0, 0); font-weight: bold;',
    simpleRed: 'color: rgb(255, 0, 0);',

    strongOrange: 'color: rgb(255, 187, 0); font-weight: bold;',
    simpleOrange: 'color: rgb(255, 187, 0);',

    strongPink: 'color: rgb(230, 140, 200); font-weight: bold;',
    simplePink: 'color: rgb(230, 140, 200);',

    strongBlue: 'color: rgb(108, 108, 242); font-weight: bold;',
    simpleBlue: 'color: rgb(108, 108, 242);',

    strongDarkRed: 'color: rgb(204, 66, 66); font-weight: bold;',
    simpleDarkRed: 'color: rgb(204, 66, 66);',

    strongBanana: 'color: rgb(236, 230, 181); font-weight: bold;',
    simpleBanana: 'color: rgb(236, 230, 181)',

    strongPurple: 'color: rgb(181, 74, 230); font-weight: bold;',
    simplePurple: 'color: rgb(181, 74, 230);',
}

auxiliar_color_text = 'color: rgb(234, 231, 180);'

let point = ' .'
let virg = ' ,'
let history = '.history'
let office = '.office'

let sum = '+'
let minus = '-'
let multiply = '*'
let divide = '/'
let module = '%'

let par_i = '('
let par_f = ')'

let TAGS = {
    serf: TAG_STYLE.strongRed,
    burgher: TAG_STYLE.strongRed,
    revolt: TAG_STYLE.strongRed,
    sugar: TAG_STYLE.strongRed,
    alias: TAG_STYLE.strongBlue,
    noble: TAG_STYLE.strongBlue,
    tea: TAG_STYLE.strongBlue,
    
    do: TAG_STYLE.simpleDarkRed,
    union: TAG_STYLE.simpleDarkRed,
    wth: TAG_STYLE.simpleBanana,
    for: TAG_STYLE.simpleDarkRed,
    ntw: TAG_STYLE.simpleDarkRed,
    add: TAG_STYLE.simpleDarkRed,
    minus: TAG_STYLE.simpleDarkRed,

    [history]: TAG_STYLE.simplePink,
    [office]: TAG_STYLE.simplePink,

    [point]: TAG_STYLE.strongRed,
    [virg]: TAG_STYLE.simpleBlue,

    work: TAG_STYLE.simpleOrange,
    trade: TAG_STYLE.simpleOrange,
    pirate: TAG_STYLE.simpleOrange,
    inherit: TAG_STYLE.simpleOrange,
    settle: TAG_STYLE.simpleOrange,
    deal: TAG_STYLE.simplePurple,

    colony: TAG_STYLE.simpleRed,
    neg: TAG_STYLE.simpleRed,
    and: TAG_STYLE.simpleRed,
    or: TAG_STYLE.simpleRed,

}

const TYPE_RULES = {
  serf: "do",
  burgher: "do",
  sugar: "do",
  tea: "do",
  noble: "do",
  revolt: "do",
  alias: "for",
};

function escapeHTML(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
}

function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

const symbols = new Set()

function parseDeclarations(text) {
    symbols.clear();

    for (const [type, operator] of Object.entries(TYPE_RULES)) {

        const regex = new RegExp(
            `${type}\\s+([a-zA-Z_]\\w*)\\s+${operator}`,
            "gi"
        );

        let match;

        while ((match = regex.exec(text)) !== null) {
            symbols.add(match[1]);
        }
    }
}

function highlight_Vars(text) {
    return text.replace(/\b([a-zA-Z_]\w*)\b/g, (word) => {
        if (symbols.has(word)) {
            return `<span style="color:#a7d5e8">${word}</span>`
        }

        return word
    })
}

function highlightTags(text) {
    text = escapeHTML(text)

    const strings = []

    // 1. extrai strings
    text = text.replace(/"([^"]*)"/g, (match) => {
        const id = strings.length
        strings.push(match)
        return `__STR${id}__`
    })

    for (const [tag, style] of Object.entries(TAGS)) {
        const safeTag = escapeRegex(tag)

        let regex

        if (/^[a-zA-Z]+$/.test(tag)) {
            regex = new RegExp(`(?<![a-zA-Z])${safeTag}(?![a-zA-Z])`, 'gi')
        } else {
            regex = new RegExp(safeTag, 'g')
        }

        text = text.replace(
            regex,
            (match) => `<span style="${style}">${match}</span>`,
        )
    }

    for (const sym of symbols) {
        const regex = new RegExp(
            `(?<![a-zA-Z])${escapeRegex(sym)}(?![a-zA-Z])`,
            'g',
        )

        text = text.replace(regex, `<span style="color:rgba(144, 212, 255, 1);">${sym}</span>`)
    }

    // 3. restaura strings com cor marrom
    text = text.replace(/__STR(\d+)__/g, (_, i) => {
        return `<span style="color:#b36339">${strings[i]}</span>`
    })

    return text
}

a = '#a7d5e8'
