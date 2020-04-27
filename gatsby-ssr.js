import React from "react"
import { ApolloProvider } from "@apollo/client"
import { renderToString } from "react-dom/server"
import fetch from "isomorphic-fetch"
import { client } from "./src/store/client"

export const replaceRenderer = ({ bodyComponent, replaceBodyHTMLString }) => {
  const ConnectedBody = () => (
    <ApolloProvider client={client}>{bodyComponent}</ApolloProvider>
  )

  replaceBodyHTMLString(renderToString(<ConnectedBody />))
}
