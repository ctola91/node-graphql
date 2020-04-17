const express = require('express');
const { GraphQLSchema, GraphQLObjectType, GraphqlString, GraphQLInt , graphql } = require('graphql');


const app = express();

const courseType = new GraphQLObjectType({
  name: 'Course',
  fields: {
    title: {
      type: GraphqlString
    },
    views: { type: GraphQLInt}
  }
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      message: {
        type: GraphqlString,
        resolve() {
          return 'Hello World';
        }
      },
      course: {
        type: courseType,
        resolve() {
          return { title: 'Graphql Course', views: 1000 };
        }
      }
    }
  })
})

app.get('/', (req, res) => {
  graphql(schema, ` { message, course{ title } }`).then(r => res.json(r))
    .catch(res.json);
});

app.listen(3000, () => {
  console.log('Server started on port 3000')
})