import React from "react"
import { loadStripe } from "@stripe/stripe-js"
import { ContinueButton } from "./ConfirmationButton"

const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY)

const CheckoutButton = ({
  orderItems,
  orderId,
  customerEmail,
  customerPhoneNo,
  children,
}) => {
  const redirectToCheckout = async event => {
    const items = orderItems.map(({ sku, quantity }) => ({
      sku,
      quantity,
    }))
    const stripe = await stripePromise
    const { error } = await stripe.redirectToCheckout({
      items,
      customerEmail,
      clientReferenceId: orderId,
      successUrl: `${window.location.origin}/orderSuccess/?=${orderId}`,
      cancelUrl: `${window.location.origin}/orderCancelled/?=${orderId}`,
    })

    if (error) {
      console.warn("Error:", error)
    }
  }
  console.log("orderId", orderId)
  return (
    <ContinueButton onClick={() => redirectToCheckout()}>
      {children}
    </ContinueButton>
  )
}

export default CheckoutButton
