import React from "react"
import OrderList from "../components/order/OrderList"
import Filter from "../components/order/Filter"
import Sort from "../components/order/Sort"
import Layout from "../components/layout"

const OrderListPage = props => {
  return (
    <Layout minimised oneColumn>
      <Filter />
      <Sort />
      <OrderList />
    </Layout>
  )
}

export default OrderListPage
