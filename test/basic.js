var assert = require('assert'),
    mediatype = require('../mediatype')

function eq(a, b) { assert.strictEqual(a, b) }

describe('mediatype', function () {
    it('should have useful defaults', function () {
        assert(Object.keys(mediatype.types).length > 500)
        assert(Object.keys(mediatype.extensions).length > 500)
        eq('application/octet-stream', mediatype.default)
    })

    it('should have method: get()', function () {
        eq('text/plain', mediatype.get('txt'))
        eq('text/plain', mediatype.get('TXT'))
        eq('application/octet-stream', mediatype.get('ninjacy'))
        eq('foo/bar', mediatype.get('ninjacy', 'foo/bar'))
    })

    it('should have method: lookup()', function () {
        eq('text/plain', mediatype.lookup('file.txt'))
        eq('text/plain', mediatype.lookup('FILE.TXT'))
        eq('text/plain', mediatype.lookup('dir/file.txt'))
        eq('text/plain', mediatype.lookup('.file.txt'))
        eq('text/plain', mediatype.lookup('.txt'))
        eq('text/plain', mediatype.lookup('txt'))
        eq('text/plain', mediatype.lookup('/txt'))
        eq('text/plain', mediatype.lookup('\\txt'))
        eq(mediatype.default, mediatype.lookup('file.ninjacy'))
        eq('foo/bar', mediatype.lookup('file.ninjacy', 'foo/bar'))
    })

    it('should have method: extension()', function () {
        eq('html', mediatype.extension(mediatype.types.html))
        eq('txt', mediatype.extension(mediatype.types.txt))
        eq('bin', mediatype.extension('application/octet-stream'))
        eq('bin', mediatype.extension('application/octet-stream\t\t'))
        eq('html', mediatype.extension('text/html; charset=ISO-8859-1'))
        eq('js', mediatype.extension(' Application/JavaScript ; Cirno=9\n'))
        eq(null, mediatype.extension('foo/ninjacy'))
        eq('bar', mediatype.extension('foo/ninjacy', 'bar'))
    })
})
