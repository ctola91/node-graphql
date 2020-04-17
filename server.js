const express = require('express');
const { buildSchema} = require('graphql');
const graphqlHTP = require('express-graphql')
// mock courses
const courses = require('./courses');

const app = express();

//schema definition language
const schema = buildSchema(`
    type Course {
        id: ID!
        title: String!
        views: Int
    }

    type Query {
        getCourses: [Course]
        getCourse(id: ID): Course
    }

`);

const root = {
    getCourses() {
        return courses;
    },
    getCourse({ id }) {
        return courses.find(course => id === course.id );
        
    }
}

app.use('/graphql', graphqlHTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}))

app.get('/', (req, res) => {
    res.json({courses});
})

app.listen(3000, () => {
    console.log(`Server started`);
})