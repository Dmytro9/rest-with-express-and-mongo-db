const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', {
        useNewUrlParser: true
    })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
    name: String,
    bio: String,
    website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
    name: String,
    authors: [authorSchema]
}));

async function createCourse(name, authors) {
    const course = new Course({
        name,
        authors
    });

    const result = await course.save();
    console.log(result);
}

// createCourse('Node Course', [
//     new Author({
//         name: 'Mosh'
//     }),
//     new Author({
//         name: 'Dima'
//     })
// ]);


async function listCourses() {
    const courses = await Course.find();
    console.log(courses);
}

async function updateAuthor(courseId) {
    // const course = await Course.findById(courseId)

    Course.updateOne({
        _id: courseId
    }, {
        $set: {
            'author.name': 'Dimas'
        }
    }) // update directly in db

    // course.author.name = 'Dima'
    // course.save()
}

// updateAuthor('5d20e0477ab07556c1fdb9e8')

async function addAuthor(courseId, author) {
    const course = await Course.findById(courseId)
    course.authors.push(author)
    course.save()
}

// addAuthor('5d20e6fad6aadb5fceb108da', new Author({
//     name: 'Dima'
// }))


async function removeAuthor(courseId, authorId) {
    const course = await Course.findById(courseId)
    const author = course.authors.id(authorId)
    author.remove()
    course.save()
}

// removeAuthor('5d20e6fad6aadb5fceb108da', '5d20e8576ba36d60da0d3fe4')