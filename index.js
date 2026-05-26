import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import db from './_db.js';

// type definitions
import { typeDefs } from './schema.js';

const resolvers = {
    Query: {
        games: () => db.games,
        reviews: () => db.reviews,
        authors: () => db.authors,
        review: (_, args) => {
            return db.reviews.find(review => review.id === args.id);
        }
    }
}

// server setup
const server = new ApolloServer({
    typeDefs,
    resolvers
})

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);