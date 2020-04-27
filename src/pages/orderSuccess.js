import React, { useState } from "react"
import Layout from "../components/layout"
import { Link } from "gatsby"
import { getConfirmation } from "../js/get-confirmation"

const OrderSuccess = props => {
  const [confirmationData, setConfirmationData] = useState({})
  getConfirmation().then(result => setConfirmationData(result))
  console.log("confirmationData", confirmationData)
  return (
    <Layout>
      <h1>Order Successful</h1>
      <Link to="/menu">Back to Main Page</Link>
    </Layout>
  )
}

export default OrderSuccess
