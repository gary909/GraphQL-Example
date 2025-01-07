const { ApolloServer, gql } = require("apollo-server");

// Sample data
const books = [
  { id: 1, title: "1984", author: "George Orwell" },
  { id: 2, title: "Brave New World", author: "Aldous Huxley" },
  { id: 3, title: "Fahrenheit 451", author: "Ray Bradbury" },
];

// Define GraphQL schema
const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    author: String!
  }

  type Query {
    books: [Book!]!
    book(id: ID!): Book
  }

  type Mutation {
    addBook(title: String!, author: String!): Book
  }
`;

// Define resolvers
const resolvers = {
  Query: {
    books: () => books,
    book: (_, { id }) => books.find((book) => book.id === parseInt(id)),
  },
  Mutation: {
    addBook: (_, { title, author }) => {
      const newBook = {
        id: books.length + 1,
        title,
        author,
      };
      books.push(newBook);
      return newBook;
    },
  },
};

// Create Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

// Start the server
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
