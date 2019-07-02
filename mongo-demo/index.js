const mongoose = require('mongoose');

// use connection path from configuration file and instead of console.log - debug module
mongoose.connect('mongodb://localhost:27017/mydb', {
        useNewUrlParser: true
    })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('Could not connect to MongoDB... ', err));



const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
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
        // name: 'React.js Course',
        author: 'Dima',
        tags: ['react', 'frontend'],
        isPublished: false
    });

    try {
        const result = await course.save();
        console.log(result);

        // course.validate(err => {
        //     if (err) {}
        // })
    } catch (error) {
        console.log(error.message)
    }

};

createCourse()



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

    // in real app this params are passed as queries /api/courses/pageNumber=2
    const pageNumber = 2;
    const pageSize = 10;

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
        // .find({
        //     author: /^Dima/
        // })

        // With Regular Expression (ends with Dima, case sensitive)
        // .find({
        //     author: /Dima$/i
        // })

        // Contains 'Dima' case sensitive
        // .find({
        //     author: /.*Dima.*/i
        // })

        .find()

        // .skip((pageNumber - 1) * pageSize)

        // .limit(pageSize)
        .sort({
            name: 1
        })
        .select({
            name: 1,
            tags: 1
        })
    // .countDocuments()



    console.log(courses);
};

getCourses();




async function updateCourse1(id) {
    const course = await Course.findById(id)
    if (!course) return

    course.isPublished = false
    course.author = 'Another Author'

    // Another approach

    // course.set({
    //     isPublished: true,
    //     author: 'Another Author'
    // })

    const result = await course.save()
    console.log(result)
}

async function updateCourse2(id) {

    // const result = await Course.findByIdAndUpdate({isPublished: false}) // to update all to isPublished: false

    const result = await Course.findByIdAndUpdate({
        _id: id
    }, {
        $set: {
            author: "Misha",
            isPublished: false
        }
    }, {
        new: true
    })

    console.log(result)
}

// updateCourse2('5d1a60153c78155a6345d06d');




async function removeCourse(id) {
    // const result = await Course.deleteOne({isPublished: false}) // to remove all with isPublished: false
    // const result = await Course.deleteMany({_id: id}) // to delete many documents
    // const result = await Course.findByIdAndRemove(id) // if there is no course with the given id - this methods returns null


    const result = await Course.deleteOne({
        _id: id
    })

    console.log(result)
}

removeCourse('5d1a60153c78155a6345d06d')