const express = require("express");
const { buildSchema } = require("graphql");
const graphqlHTP = require("express-graphql");
// mock courses
let courses = require("./courses");

const app = express();

//schema definition language
const schema = buildSchema(`
    type Course {
        id: ID!
        title: String!
        views: Int
    }

    type Alert {
        message: String
    }

    input CourseInput {
        title: String!
        views: Int
    }

    type Query {
        getCourses: [Course]
        getCourse(id: ID): Course
    }

    type Mutation {
        addCourse(input: CourseInput): Course
        updateCourse(id: ID!, input: CourseInput): Course
        deleteCourse(id: ID!): Alert
    }

`);

const root = {
  getCourses() {
    return courses;
  },
  getCourse({ id }) {
    return courses.find((course) => id === course.id);
  },
  addCourse({ input }) {
    const id = String(courses.length + 1);
    const course = { id, ...input };
    courses.push(course);
    return course;
  },
  updateCourse({ id, input }) {
    const courseIndex = courses.findIndex((course) => {
      return course.id === id;
    });
    const course = courses[courseIndex];
    const newCourse = Object.assign(course, input);
    courses[courseIndex] = newCourse;
    return newCourse;
  },
  deleteCourse({ id }) {
    courses = courses.filter(course => {
        course.id !== id
    });
    return {
        message: `Course with id: ${id} was deleted`};
  }
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
