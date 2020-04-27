const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

exports.handler = async ({ body, header }) => {
  try {
    console.log("header", header)
    const stripeEvent = stripe.webhooks.constructEvent(
      body
      // Headers["stripe-signature"],
      // process.env.STRIPE_WEBHOOK_SECRET
    )

    // if (stripeEvent.type === "checkout.session.completed") {
    //   const eventObject = stripeEvent.data.object
    //   const items = eventObject.display_items
    //   const shippingDetails = eventObject.shipping

    //   console.log("eventObject", eventObject)
    // }
    console.log("stripeEvent", stripeEvent)
    console.log("body", typeof body)
    return {
      statusCode: 200,
      body,
    }
  } catch (err) {
    console.log("Stripe webhook failed with ", err)

    return {
      statusCode: 400,
      body: `Webhook Error: ${err.message}`,
    }
  }
}
