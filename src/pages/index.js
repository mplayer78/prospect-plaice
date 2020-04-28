import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import ProspectLogo from "../components/ProspectLogo"
import styled from "styled-components"

// const IndexLayout = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   padding-top: 25vh;
// `

const StyledLink = styled(Link)`
  font-size: 2rem;
  color: var(--primary500);
  pointer-events: cursor;
  text-align: center;
`

const IndexPage = props => {
  return (
    <Layout oneColumn>
      <SEO title="Home" />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "25vh",
        }}
      >
        <ProspectLogo />
        <Link
          style={{
            fontSize: "2rem",
            color: "#666666",
            pointerEvents: "cursor",
            textAlign: "center",
          }}
          to="/menu"
        >
          Order Delicious Food For Collection
        </Link>
      </div>
    </Layout>
  )
}

export default IndexPage
