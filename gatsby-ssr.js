import React from "react"
import { ApolloProvider } from "@apollo/client"
import { renderToString } from "react-dom/server"
import fetch from "isomorphic-fetch"
import { client } from "./gatsby-browser"
// import Provider from './src/store/provider'; // This can be the React context API or Redux/Mobx

// gatsby-ssr is required for build regardless if you plan to support SSR

export const replaceRenderer = ({ bodyComponent, replaceBodyHTMLString }) => {
  const ConnectedBody = () => (
    <ApolloProvider client={client}>{bodyComponent}</ApolloProvider>
  )

  replaceBodyHTMLString(renderToString(<ConnectedBody />))
}
