var assert = require('assert'),
    mediatype = require('../mediatype')

describe('mediatype', function () {
    it('should have useful defaults', function () {
        assert(Object.keys(mediatype.types).length > 500)
        assert(Object.keys(mediatype.extensions).length > 500)
    })
})
