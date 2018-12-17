let search = require('../lib/search');
var assert = require('assert');

describe('interests', () => {
    describe('#default', () => {
        it('should return 0 matches when no terms are present.', () => {
            let testString = 'Lorem ipsum dolor sit amet'
            let result = search(testString)
            assert.equal(null, result)
        })

        it('should ignore capitalization.', () => {
            let testString = 'drawINg';
            let result = search(testString);
            assert.equal('DRAWING', result.interest);
        })

        it('should do sub-category match', () => {
            let testString = 'Wellness'
            let result = search(testString);
            assert.equal('HEALTH AND WELL-BEING', result.interest);
        })

        it('should do category match', () => {
            let testString = 'Art';
            let result = search(testString);
            assert.equal('MUSEUM/ART GALLERY', result.interest);
        })

        it('should do category match', () => {
            let testString = 'Dog Training';
            let result = search(testString);
            assert.equal('DOG TRAINER', result.interest);
        })
        it('blank text', () => {
            let testString = '';
            let result = search(testString);
            assert.equal(null, result.interest);
        })

        it('space text', () => {
            let testString = ' ';
            let result = search(testString);
            assert.equal(null, result.interest);
        })

        it('Product\/Service', () => {
            let testString = 'Product\/Service';
            let result = search(testString);
            assert.equal('PRODUCTS SERVICES', result.interest);
            //'PRODUCTS SERVICES',
            // console.log( result );
        })
    })
})

