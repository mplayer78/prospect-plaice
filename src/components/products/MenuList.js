import React, { useContext } from "react"
import { graphql, StaticQuery } from "gatsby"
import MenuItem from "./MenuItem"
import Context from "../../state/context"
import BodyContainer from "../../layout/BodyContainer"
import BodyHeader from "../../layout/BodyHeader"
import TotalBox from "./TotalBox"

const MenuList = () => {
  const { state, dispatch } = useContext(Context)
  return (
    <StaticQuery
      query={graphql`
        query SkusForProduct {
          skus: allStripeSku {
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
      render={({ skus }) => {
        return (
          <BodyContainer>
            <BodyHeader>takeaway menu</BodyHeader>
            {skus.edges.map(({ node: sku }) => (
              <MenuItem key={sku.id} sku={sku} />
            ))}
            <TotalBox />
          </BodyContainer>
        )
      }}
    />
  )
}

export default MenuList
