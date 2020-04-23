import React, { useContext } from "react"
import Context from "../state/context"
import { loadStripe } from "@stripe/stripe-js"
import styled from "styled-components"

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

const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY)

const ConfirmationButton = ({ disabled }) => {
  const { state, dispatch } = useContext(Context)
  console.log("state.itemList", state.itemList)
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
      <ContinueButton disabled={disabled} onClick={e => redirectToCheckout(e)}>
        Press to Continue...
      </ContinueButton>
    </>
  )
}

export default ConfirmationButton
