(function () {
    function Mapping() {
        this.types = Object.create(null)
        this.extensions = Object.create(null)
        this.default = null
    }

    var op = Object.prototype.hasOwnProperty

    Mapping.prototype.define = function (map) {
        for (var type in map) if (op.call(map, type)) {
            var endings = map[type]
            for (var c = 0; c < endings.length; ++c) {
                this.types[endings[c]] = type
            }
            if (this.extensions[type]) continue
            this.extensions[type] = endings[0]
        }
    }

    Mapping.prototype.get = function (a, b) {
        return this.types[a.toLowerCase()] || b || this.default
    }

    Mapping.prototype.lookup = function (a, b) {
        var ar = a.match(/.*\b(?!$)(.*)/)
        if (ar) return this.get(ar[1], b)
        else return b || this.default
    }

    Mapping.prototype.extension = function (a, b) {
        a = a.replace(/\s|;.*/g, '')
        return this.extensions[a.toLowerCase()] || b || null
    }

    var mediatype = new Mapping
    mediatype.define(require('./reg.json'))
    mediatype.default = mediatype.get('bin')

    module.exports = mediatype
})()
