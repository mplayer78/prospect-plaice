import React from "react"
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  gql,
  ApolloProvider,
} from "@apollo/client"

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "https://graphql.fauna.com/graphql",
    headers: {
      authorization: `Bearer fnADqNok9eACC3wh80w5hdNCBXNv-WdBhtiA1lBK`,
    },
  }),
})

// Wraps every page in a component
export const wrapPageElement = ({ element, props }) => {
  return <ApolloProvider client={client}>{element}</ApolloProvider>
}
