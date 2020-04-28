import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client"
export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "https://graphql.fauna.com/graphql",
    headers: {
      authorization: `Bearer ${process.env.GATSBY_FAUNA_CLIENT_KEY}`,
    },
  }),
})
