// Trade off between query performances vs consistency


// Using References (Normalization) -> CONSISTENCY (if make some change we need update only in one place)
// (hovewer we need to do extra query to load the related author)

let author = {
    name: 'Dima'
}

let course = {
    author: 'id',
    // authors: [
    //     'id1',
    //     'id2'
    // ]
}


// Using Embedded Documents (Denormalization) (to load author by course we need to make only one query, 
// hovewer to update author by course we will need to make it in several places and mayby one of the requests will fale (: )

let course = {
    author: {
        name: 'Dima'
    }
}


// Hybrid approach (optimize the query performance including several props of ref object into parent obj)
let author = {
    name: 'Dima',
    // 50 other properties
}

let course = {
    author: {
        id: 'ref',
        name: 'Dima'
    }
}

// (ex.: we need to have some info in an object by making one query for read only)


// TRANSACTIONS - in mongodb - Two Phase Commit - fawn lib


// const mongoose = require('mongoose')
/*
 *  const id = new mongoose.Types.ObjectId()
 *  console.log(id.getTimestamp())
    id is created by mongo driver but not by mongo db, so to get it (send to client) we do not need reasign object when creating (post) it
**/


// custom-enviroment-variables.json - is set into docker file (env vars)

// To handle async errors in routes use require('express-async-errors') or middleware as async.js


// Tests: unit (fn, class or several classes without external dependencies), integration (fn, class or several classes with external dependencies) and end to end (selenium, with interacting with uset interface)s

// How many tests for function - to equal to number of exequtions (return) 
// Make unit tests for fns with minimum numbers of external dependencies (mock) because it will make unit tests unsupportive and hard to read / write
// for others make integrational tests (with a lot of mocking it's better to write integrational tests)