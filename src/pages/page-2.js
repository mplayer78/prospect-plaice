import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { useQuery, gql } from "@apollo/client"

const ALL_ITEMS = gql`
  {
    allItems {
      data {
        name
        sku
      }
    }
  }
`

const SecondPage = () => {
  const { loading, error, data } = useQuery(ALL_ITEMS)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error!</p>
  console.log("data", data)
  return (
    <Layout>
      <SEO title="Page two" />
      <h1>Hi from the second page</h1>
      <p>Welcome to page 2</p>
      <Link to="/">Go back to the homepage</Link>
    </Layout>
  )
}

export default SecondPage
