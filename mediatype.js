(function () {
    function Mapping() {
        this.types = Object.create(null)
        this.extensions = Object.create(null)
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

    var mediatype = new Mapping
    mediatype.define(require('./reg.json'))

    module.exports = mediatype
})()
