import React from "react"
import Layout from "../components/layout"
import { Link } from "gatsby"

const orderSuccess = props => {
  return (
    <Layout>
      <h1>Order Successful</h1>
      <Link to="/menu">Back to Main Page</Link>
    </Layout>
  )
}

export default orderSuccess
