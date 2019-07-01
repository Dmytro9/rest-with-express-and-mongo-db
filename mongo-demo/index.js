const mongoose = require('mongoose');

// use connection path from configuration file and instead of console.log - debug module
mongoose.connect('mongodb://localhost:27017/mydb', {
        useNewUrlParser: true
    })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('Could not connect to MongoDB... ', err));


const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {
        type: Date,
        default: Date.now
    },
    isPublished: Boolean
});


const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'React.js Course',
        author: 'Dima',
        tags: ['react', 'frontend'],
        isPublished: true
    });

    const result = await course.save();
    console.log(result);
};

async function getCourses() {
    // eq (equal)
    // ne (not equal)
    // gt (greater than)
    // gte (greater than or equal to)
    // lt (less than or equal to)
    // lte (less than or equal to)
    // in
    // nin (not in)


    // or
    // and


    const courses = await Course
        // .find({
        //     author: 'Dima',
        //     isPublished: true
        // })



        // .find({
        //     price: {
        //         $gte: 10,
        //         $lte: 20
        //     }
        // })
        // .find({
        //     price: {
        //         $in: [10, 15, 20]
        //     }
        // })



        // .find()
        // .or([{
        //         author: 'Dima',
        //     },
        //     {
        //         isPublished: true
        //     }
        // ])
        // .and([{
        //         author: 'Dima',
        //     },
        //     {
        //         isPublished: true
        //     }
        // ])


        // With Regular Expression (starts with Dima)
        .find({
            author: /^Dima/
        })

        // With Regular Expression (ends with Dima, case sensitive)
        .find({
            author: /Dima$/i
        })

        // Contains 'Dima' case sensitive
        .find({
            author: /.*Dima.*/i
        })


        .limit(10)
        .sort({
            name: 1
        })
        .select({
            name: 1,
            tags: 1
        })



    console.log(courses);
};

getCourses();