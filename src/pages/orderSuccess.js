import React, { useState } from "react"
import Layout from "../components/layout"
import { Link } from "gatsby"
import { getConfirmation } from "../js/get-confirmation"
import OrderSuccess from "../components/OrderSuccess"
import { useQueryParam, StringParam } from "use-query-params"

const OrderSuccessPage = ({ location }) => {
  console.log("props", /\d+$/.exec(location.search)[0])
  // const [confirmationData, setConfirmationData] = useState({})
  // getConfirmation().then(result => setConfirmationData(result))
  return (
    <Layout>
      <h1>Order Successful</h1>
      <OrderSuccess />
      <Link to="/menu">Back to Main Page</Link>
    </Layout>
  )
}

export default OrderSuccessPage
