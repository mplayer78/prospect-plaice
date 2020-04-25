import React, { useContext } from "react"
import Context from "../state/context"
import { loadStripe } from "@stripe/stripe-js"
import styled from "styled-components"
import { useMutation, gql } from "@apollo/client"
import { navigate } from "gatsby"

const AlertText = styled.p`
  text-align: center;
  visibility: ${({ disabled }) => (disabled ? "visible" : "hidden")};
`

const ContinueButton = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
  font-family: inherit;
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ disabled }) => (disabled ? "#ddd" : "inherit")};
`

const CREATE_ORDER = gql`
  mutation newOrder($orderObject: OrderInput!) {
    createOrder(data: $orderObject) {
      _id
    }
  }
`
const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY)

const ConfirmationButton = ({ disabled }) => {
  const { state, dispatch } = useContext(Context)
  const [newOrder, { data }] = useMutation(CREATE_ORDER)
  const orderObject = {
    items: {
      create: state.itemList,
    },
    customerEmail: state.customerEmail,
    customerName: state.customerName,
    customerPhoneNo: state.customerPhoneNo,
    collection: {
      create: {
        date: state.collectionSlot,
      },
    },
  }

  async function handleClick(e) {
    e.preventDefault()
    const result = await newOrder({ variables: { orderObject } })
    navigate("/confirmOrder", {
      state: result,
    })
  }
  const redirectToCheckout = async event => {
    event.preventDefault()
    const stripe = await stripePromise
    const { error } = await stripe.redirectToCheckout({
      items: state.itemList,
      successUrl: `${window.location.origin}/orderSuccess`,
      cancelUrl: `${window.location.origin}/orderCancelled`,
    })

    if (error) {
      console.warn("Error:", error)
    }
  }

  return (
    <>
      <AlertText disabled={disabled}>
        You must select a time slot, menu items and fill in your details to
        continue
      </AlertText>
      <ContinueButton disabled={disabled} onClick={e => handleClick(e)}>
        Press to Continue...
      </ContinueButton>
      <button onClick={() => newOrder({ variables: { orderObject } })}>
        Another Button
      </button>
    </>
  )
}

export default ConfirmationButton
