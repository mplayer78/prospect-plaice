import React, { useContext } from "react"
import { graphql, StaticQuery } from "gatsby"
import MenuItem from "./MenuItem"
import { loadStripe } from "@stripe/stripe-js"
import Context from "../../state/context"
import styled from "styled-components"
import BodyContainer from "../../layout/BodyContainer"
import BodyHeader from "../../layout/BodyHeader"
import TotalBox from "./TotalBox"

const containerStyles = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
  padding: "1rem 0 1rem 0",
}

const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY)

const MenuList = () => {
  const { state, dispatch } = useContext(Context)
  return (
    <StaticQuery
      query={graphql`
        query SkusForProduct {
          skus: allStripeSku(sort: { fields: [price] }) {
            edges {
              node {
                id
                currency
                price
                attributes {
                  name
                }
                product {
                  metadata {
                    description
                  }
                }
              }
            }
          }
        }
      `}
      render={({ skus }) => (
        <BodyContainer>
          <BodyHeader>takeaway menu</BodyHeader>
          {skus.edges.map(({ node: sku }) => (
            <MenuItem key={sku.id} sku={sku} stripePromise={stripePromise} />
          ))}
          <TotalBox />
        </BodyContainer>
      )}
    />
  )
}

export default MenuList
