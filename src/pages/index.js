import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

import { loadStripe } from "@stripe/stripe-js"
import ProspectLogo from "../components/ProspectLogo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <ProspectLogo />
    <Link to="menu">Order Food For Collection</Link>
  </Layout>
)

export default IndexPage
