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