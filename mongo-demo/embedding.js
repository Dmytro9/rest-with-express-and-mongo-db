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
    // author: authorSchema
    author: {
        type: authorSchema,
        required: true
    }
}));

async function createCourse(name, author) {
    const course = new Course({
        name,
        author
    });

    const result = await course.save();
    console.log(result);
}

// createCourse('Node Course', new Author({
//     name: 'Mosh'
// }));


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