import React from "react"
import Layout from "../components/layout"
import { useQuery, gql } from "@apollo/client"
import BodyContainer from "../layout/BodyContainer"
import BodyHeader from "../layout/BodyHeader"
import twoSP from "../util/twoSP"
import CheckoutButton from "../components/CheckoutButton"

const GET_ORDER = gql`
  query Order($id: ID!) {
    findOrderByID(id: $id) {
      _id
      customerName
      customerEmail
      customerPhoneNo
      items {
        data {
          name
          quantity
          sku
        }
      }
      collection {
        date
      }
    }
  }
`

const ConfirmOrderPage = ({ location }) => {
  const _id = location.state?.data?.createOrder?._id || ""
  const { loading, error, data } = useQuery(GET_ORDER, {
    variables: { id: _id },
  })
  console.log("data", data)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>
  const {
    findOrderByID: {
      customerName,
      customerEmail,
      customerPhoneNo,
      items: { data: orderItems },
      collection: { date },
    },
  } = data
  let collectionDate = new Date(date)
  return (
    <Layout>
      <BodyContainer>
        <BodyHeader>Order Confirmation</BodyHeader>
        <div className="customer-details">
          customer:
          {customerName}
          {customerPhoneNo}
          {customerEmail}
        </div>
        <div className="order-details">
          your order:
          {orderItems.map(v => (
            <span key={v.name}>
              {v.quantity} x {v.name} at £???
            </span>
          ))}
        </div>
        <div className="total-price">£???</div>
        <div className="collection-date">
          to be collected on:
          {collectionDate.toDateString()} at {collectionDate.getHours()}:
          {collectionDate.getMinutes()}
        </div>
        <CheckoutButton
          orderItems={orderItems}
          customerName={customerName}
          customerEmail={customerEmail}
          customerPhoneNo={customerPhoneNo}
        >
          Place Order
        </CheckoutButton>
      </BodyContainer>
    </Layout>
  )
}

export default ConfirmOrderPage
