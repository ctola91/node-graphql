const express = require("express");
const { buildSchema } = require("graphql");
const graphqlHTP = require("express-graphql");
// mock courses
const courses = require("./courses");

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

    type Mutation {
        addCourse(title: String!, views: Int): Course
        updateCourse(id: ID!, title: String!, views: Int): Course
    }

`);

const root = {
  getCourses() {
    return courses;
  },
  getCourse({ id }) {
    return courses.find((course) => id === course.id);
  },
  addCourse({ title, views }) {
    const id = String(courses.length + 1);
    const course = { id, title, views };
    courses.push(course);
    return course;
  },
  updateCourse({ id, title, views }) {
    const courseIndex = courses.findIndex((course) => {
      return course.id === id;
    });
    const course = courses[courseIndex];
    const newCourse = Object.assign(course, { title, views });
    courses[courseIndex] = newCourse;
    return newCourse;
  },
};

app.use(
  "/graphql",
  graphqlHTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.get("/", (req, res) => {
  res.json({ courses });
});

app.listen(3000, () => {
  console.log(`Server started`);
});
