import { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';
import DB from './db';
import { User, Book } from './db'

const UserSchema = new GraphQLObjectType({
  name: 'User',
  description: 'User of the application.',
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve(user) {
          return user.id;
        }
      },
      username: {
        type: GraphQLString,
        resolve(user) {
          return user.username;
        }
      },
      password: {
        type: GraphQLString,
        resolve(user) {
          return user.password;
        }
      },
      email: {
        type: GraphQLString,
        resolve(user) {
          return user.email;
        }
      },
      books: {
        type: new GraphQLList(BookSchema),
        resolve(user) {
          return user.$get('books');
        }
      }
    }
  }
});

const BookSchema = new GraphQLObjectType({
  name: 'Book',
  description: 'Books that users create',
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve(book) {
          return book.id;
        }
      },
      title: {
        type: GraphQLString,
        resolve(book) {
          return book.title;
        }
      },
      description: {
        type: GraphQLString,
        resolve(book) {
          return book.description;
        }
      }
    }
  }
});

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'This is a root query',
  fields: () => {
    return {
      user: {
        type: new GraphQLList(UserSchema),
        args: {
          id: {
            type: GraphQLInt
          },
          username: {
            type: GraphQLString
          },
          email: {
            type: GraphQLString
          }
        },
        resolve(root, args) {
          return User.findAll({where: args})
        }
      },
      books: {
        type: new GraphQLList(BookSchema),
        resolve(root, args) {
          return Book.findAll({where: args});
        }
      }
    }
  }
});

const Schema = new GraphQLSchema({
  query: Query
});

export default Schema;