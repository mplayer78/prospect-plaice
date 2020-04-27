import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import ProspectLogo from "../components/ProspectLogo"
import styled from "styled-components"

const IndexLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30vh;
`

const StyledLink = styled(Link)`
  font-size: 2rem;
  color: #666666;
  pointer-events: cursor;
`

const IndexPage = props => {
  return (
    <Layout oneColumn>
      <SEO title="Home" />
      <IndexLayout>
        <ProspectLogo />
        <StyledLink to="menu">Order Food For Collection</StyledLink>
      </IndexLayout>
    </Layout>
  )
}

export default IndexPage
