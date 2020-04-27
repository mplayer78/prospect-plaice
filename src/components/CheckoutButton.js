import React from "react"
import { loadStripe } from "@stripe/stripe-js"
import { ContinueButton } from "./ConfirmationButton"

const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY)

const CheckoutButton = ({
  orderItems,
  customerName,
  customerEmail,
  customerPhoneNo,
  children,
}) => {
  const redirectToCheckout = async event => {
    // event.preventDefault()
    const items = orderItems.map(({ sku, quantity }) => ({
      sku,
      quantity,
    }))
    const stripe = await stripePromise
    const { error } = await stripe.redirectToCheckout({
      items,
      customerEmail,
      // customerName: customerName,
      // phone: customerPhoneNo,
      successUrl: `${window.location.origin}/orderSuccess`,
      cancelUrl: `${window.location.origin}/orderCancelled`,
    })

    if (error) {
      console.warn("Error:", error)
    }
  }
  return (
    <ContinueButton onClick={() => redirectToCheckout()}>
      {children}
    </ContinueButton>
  )
}

export default CheckoutButton
