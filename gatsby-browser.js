import React from "react"
import { ApolloProvider } from "@apollo/client"
import { client } from "./src/store/client"

// Wraps every page in a component
export const wrapPageElement = ({ element, props }) => {
  return <ApolloProvider client={client}>{element}</ApolloProvider>
}
