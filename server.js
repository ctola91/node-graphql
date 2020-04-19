const { ApolloServer } = require("apollo-server");
const { makeExecutableSchema } = require('graphql-tools');

const courses = require('./courses');

const typeDefs = `
    type Course {
        id: ID!
        title: String!
        views: Int
    }
    type Query {
        getCourses(page: Int, limit: Int = 1): [Course]
    }
`;

const schema = makeExecutableSchema({typeDefs, resolvers: {
    Query: {
        getCourses(obj, {page, limit} ) {
            if(page !== undefined) {
                return courses.slice((page -1) * limit, page * limit);
            }
            return courses;
        }
    },
}})

const server = new ApolloServer({
  schema,
});

server.listen().then(({ url }) => {
  console.log(`Server started in ${url}`);
});

