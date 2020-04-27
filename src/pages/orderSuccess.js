import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import { navigate } from "gatsby"
import { getConfirmation } from "../js/get-confirmation"
import { useMutation, gql } from "@apollo/client"
import BodyHeader from "../layout/BodyHeader"
import {
  ConfirmationContainer,
  Ticket,
  BodyTextHeader,
  BodyText,
  HorizontalLayout,
  VerticalLayout,
} from "./confirmOrder"
import formatPrice from "../util/formatPrice"
import { twoSP } from "../util/twoSP"
import CheckoutButton from "../components/CheckoutButton"
import { ContinueButton } from "../components/ConfirmationButton"

const SET_ORDER_PAID = gql`
  mutation updateOrder($id: ID!) {
    updateOrder(id: $id, data: { status: ORDERED }) {
      _id
      customerName
      customerEmail
      customerPhoneNo
      items {
        data {
          name
          quantity
          sku
          price
        }
      }
      collection {
        date
      }
      status
    }
  }
`

const OrderSuccessPage = ({ location }) => {
  let orderId = /\d+$/.exec(location.search)[0]
  const [setPaid, { loading, error, data }] = useMutation(SET_ORDER_PAID)
  const [orderInfo, setOrderInfo] = useState({})
  useEffect(() => {
    if (orderId) {
      setPaid({ variables: { id: orderId } })
    }
  }, [orderId, setPaid])
  useEffect(() => {
    setOrderInfo(data?.updateOrder)
  }, [data])
  console.log("data", data)
  console.log("orderInfo", orderInfo)
  // const [confirmationData, setConfirmationData] = useState({})
  // getConfirmation().then(result => setConfirmationData(result))
  return (
    <Layout>
      <ConfirmationContainer>
        <Ticket>
          <BodyHeader>Order Success</BodyHeader>
          <VerticalLayout>
            <BodyTextHeader>customer details:</BodyTextHeader>
            <BodyText style={{ textTransform: "uppercase" }}>
              {orderInfo?.customerName}
            </BodyText>
            <HorizontalLayout>
              <BodyText>{orderInfo?.customerPhoneNo}</BodyText>
              <BodyText>{orderInfo?.customerEmail}</BodyText>
            </HorizontalLayout>
          </VerticalLayout>
          <VerticalLayout>
            <BodyTextHeader>your order:</BodyTextHeader>
            {orderInfo?.items?.data?.map(v => (
              <HorizontalLayout key={v.name}>
                <BodyText>
                  {v.quantity} x {v.name}
                </BodyText>
                <BodyText>{formatPrice(v.quantity * v.price)}</BodyText>
              </HorizontalLayout>
            ))}
          </VerticalLayout>
          <VerticalLayout>
            <HorizontalLayout>
              <BodyTextHeader>total:</BodyTextHeader>
              <BodyText style={{ fontWeight: "600" }}>
                {formatPrice(
                  orderInfo?.items?.data?.reduce(
                    (acc, val) => acc + val.quantity * val.price,
                    0
                  )
                )}
              </BodyText>
            </HorizontalLayout>
          </VerticalLayout>
          <VerticalLayout>
            <BodyTextHeader>to be collected on:</BodyTextHeader>
            <BodyText style={{ alignSelf: "flex-end", fontWeight: "600" }}>
              {new Date(orderInfo?.collection?.date).toDateString()} at{" "}
              {new Date(orderInfo?.collection?.date).getHours()}:
              {new Date(orderInfo?.collection?.date).getMinutes()}
            </BodyText>
          </VerticalLayout>
          <ContinueButton onClick={() => navigate("/menu")}>
            Back to Main Page
          </ContinueButton>
        </Ticket>
      </ConfirmationContainer>
    </Layout>
  )
}

export default OrderSuccessPage
