const express = require('express');
const { buildSchema} = require('graphql');
// mock courses
const courses = require('./courses');

const app = express();

const schema = buildSchema(`
    type Course {
        id: ID!
        title: String!
        views: Int
    }

    type Query {
        getCourses: [Course]
    }

`)

app.get('/', (req, res) => {
    res.json({courses});
})

app.listen(3000, () => {
    console.log(`Server started`);
})