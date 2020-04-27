import React from "react"
import Layout from "../components/layout"
import { useQuery, gql } from "@apollo/client"
import BodyHeader from "../layout/BodyHeader"
import CheckoutButton from "../components/CheckoutButton"
import formatPrice from "../util/formatPrice"
import styled from "styled-components"
import { twoSP } from "../util/twoSP"

export const ConfirmationContainer = styled.div`
  flex: 1;
  text-align: center;
  display: flex;
  justify-content: center;
`

export const Ticket = styled.div`
  max-width: 500px;
`

export const VerticalLayout = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  border-bottom: solid #999999 3px;
  margin: 1rem;
`

export const HorizontalLayout = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* border: solid red 2px; */
  width: 100%;
`

export const BodyText = styled.p`
  font-weight: 400;
  font-size: 18px;
  margin: 0.5rem 1rem;
`

export const BodyTextHeader = styled(BodyText)`
  text-transform: uppercase;
  color: #666666;
`

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
          price
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
  console.log("_id, ", _id)
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
      <ConfirmationContainer>
        <Ticket>
          <BodyHeader>Order Confirmation</BodyHeader>
          <VerticalLayout>
            <BodyTextHeader>customer details:</BodyTextHeader>
            <BodyText style={{ textTransform: "uppercase" }}>
              {customerName}
            </BodyText>
            <HorizontalLayout>
              <BodyText>{customerPhoneNo}</BodyText>
              <BodyText>{customerEmail}</BodyText>
            </HorizontalLayout>
          </VerticalLayout>
          <VerticalLayout>
            <BodyTextHeader>your order:</BodyTextHeader>
            {orderItems.map(v => (
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
                  orderItems.reduce(
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
              {collectionDate.toDateString()} at {collectionDate.getHours()}:
              {twoSP(collectionDate.getMinutes())}
            </BodyText>
          </VerticalLayout>
          <CheckoutButton
            orderItems={orderItems}
            orderId={_id}
            customerEmail={customerEmail}
          >
            Press to Continue...
          </CheckoutButton>
        </Ticket>
      </ConfirmationContainer>
    </Layout>
  )
}

export default ConfirmOrderPage
