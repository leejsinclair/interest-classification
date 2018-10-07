# Interest Classification

Given a hobby or interest (as a string) attempt to classify it.

## Installation

Install using npm:

```
npm install interest-classification
```

## Usage

Examples:

```
const search = require('./lib/search');

console.log( search('train spotting') );
console.log( search('Spotting') );
```

## Results

```
{
    interest: 'TRAIN SPOTTING',
    category: 'AUTOMOTIVE',
    sub_category: 'SPOTTING',
    _interest: 'TRNSPTNK',
    _sub_category: 'SPT',
    _category: 'ATMT',
    distance: 0
}

{
    interest: 'TRAIN SPOTTING',
    category: 'AUTOMOTIVE',
    sub_category: 'SPOTTING',
    _interest: 'TRNSPTNK',
    _sub_category: 'SPT',
    _category: 'ATMT',
    distance: 0
}

```