var fs = require('fs'),
    map = {}

function load(f) {
    fs.readFileSync(f, 'ascii')
        .split('\n')
        .map(function (str) { return str.trim() })
        .filter(function (str) { return str && str[0] != '#' })
        .forEach(function (str) {
            var words = str.split(/\s+/),
                type = words.shift()
            map[type] = (map[type] || []).concat(words)
        })
}

process.argv.slice(2).forEach(load)

console.log(JSON.stringify(map, null, '\t'))
