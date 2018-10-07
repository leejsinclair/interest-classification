let doubleMetaphone = require('double-metaphone');
let stemmer = require('stemmer');
let interests = require('../data/interests');
let levenshtein = require('fast-levenshtein');

function shadow() {
    return interests.map( (item) => {
        let stemInterest = item.interest.toUpperCase(); //stemmer(item.interest);
        let stemSubCategory = item.sub_category?stemmer(item.sub_category):'';
        let stemCategory = item.category?stemmer(item.category):'';
    
        return {
            'interest': item.interest.toUpperCase(),
            'category': (item.category?item.category.toUpperCase():null),
            'sub_category': (item.sub_category?item.sub_category.toUpperCase():null),
            '_interest': doubleMetaphone( stemInterest ).filter(function(elem, pos,arr) {
                return arr.indexOf(elem) === pos
            })[0],
            '_sub_category': doubleMetaphone( stemSubCategory ).filter(function(elem, pos,arr) {
                return arr.indexOf(elem) === pos
            })[0],
            '_category': doubleMetaphone( stemCategory ).filter(function(elem, pos,arr) {
                return arr.indexOf(elem) === pos
            })[0],
        };
    });
}


function typeSearch( str, compare, field ) {
    let searchField = `_${field}`;
    // Quick filter
    let options = shadow().filter( (item)=>{
        return item[searchField] === compare || item[field] === str;
    });

    // Calculate string distance of original interest
    let compared = options.map( (item) => {
        let o = {...item}
        o.distance = levenshtein.get( item[field], str );

        return o;
    });

    // Sort lest distance first
    let sorted = compared.sort( (a,b) => {
        return a.distance - b.distance;
    });

    return sorted.length > 0?sorted[0]:null;
}

function search( str ) {
    let searchStr = str.toUpperCase();
    let stem = stemmer( str.toUpperCase() );

    // Get comparison string for quick search
    let compare = doubleMetaphone( stem ).filter(function(elem, pos,arr) {
        return arr.indexOf(elem) === pos
    })[0];

    let result = typeSearch( searchStr, compare, 'interest' );

    if( !result ) {
        result = typeSearch( searchStr, compare, 'sub_category' )
    }

    if( !result ) {
        result = typeSearch( searchStr, compare, 'category' )
    }

    return result;
}

module.exports = search;