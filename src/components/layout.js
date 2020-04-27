/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useReducer } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import reducer from "../state/reducer"
import Context from "../state/context"
import initialState from "../state/initialState"

import Header from "./header"
import "./layout.css"
import styled from "styled-components"

const StyledBody = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${({ oneColumn }) => (oneColumn ? "column" : "row")};
`

const Layout = ({ children, ...props }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  let [state, dispatch] = useReducer(reducer, initialState)
  return (
    <Context.Provider value={{ state, dispatch }}>
      <Header
        minimised={props.minimised}
        siteTitle={data.site.siteMetadata.title}
      />
      <div>
        <StyledBody oneColumn={props.oneColumn}>{children}</StyledBody>
        <footer>
          © {new Date().getFullYear()}, Built by{" "}
          <a href="https://www.mattplayer.dev">Matt Player</a> with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    </Context.Provider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
