import React, { useContext } from "react"
import Context from "../../state/context"
import styled from "styled-components"
import formatPrice from "../../util/formatPrice"

const CardStyled = styled.div`
  border-bottom: solid 2px #c4c4c4c4;
  margin: 0.5rem 0;
  position: relative;
  padding: 0.5rem 0;
`

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 0.3rem;
  align-items: baseline;
`

const ButtonStyled = styled.button`
  border: none;
  outline: none;
  font-family: inherit;
  font-size: 1rem;
  padding: 0rem 1rem;
  background: transparent;
  opacity: ${({ primary }) => (primary ? "1" : "0.7")};
  opacity: ${({ shown }) => (shown ? "0.2" : "0.7")};
`

const Price = styled.p`
  margin: 0;
  font-size: 1.5rem;
`

const ActionsRow = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: baseline;
`

const QuantityIndicator = styled.div`
  background-color: red;
  width: 1.8rem;
  height: 1.8rem;
  display: flex;
  color: white;
  align-items: center;
  justify-content: center;
  padding: 0.3rem;
  font-size: 1.8rem;
  border-radius: 400px;
  position: absolute;
  bottom: -0.25rem;
  visibility: ${({ visible }) => (visible ? "visible" : "hidden")};
`

const MenuItem = ({ sku, stripePromise }) => {
  const { state, dispatch } = useContext(Context)
  const redirectToCheckout = async (event, sku, quantity = 1) => {
    event.preventDefault()
    const stripe = await stripePromise
    const { error } = await stripe.redirectToCheckout({
      items: [{ sku, quantity }],
      successUrl: `${window.location.origin}/page-2/`,
      cancelUrl: `${window.location.origin}/advanced`,
    })

    if (error) {
      console.warn("Error:", error)
    }
  }

  let quantity = state.itemList.filter(items => items.sku === sku.id)?.[0]
    ?.quantity
  console.log("quantity", quantity)
  return (
    <>
      <CardStyled>
        <HeaderRow>
          <h4>{sku.attributes.name}</h4>
          <h5>{sku.product.metadata.description}</h5>
        </HeaderRow>
        <ActionsRow>
          <ButtonStyled
            onClick={event =>
              dispatch({ type: "add_item", sku: sku.id, price: sku.price })
            }
            primary
          >
            add +
          </ButtonStyled>
          <ButtonStyled
            onClick={event => dispatch({ type: "remove_item", sku: sku.id })}
            shown={quantity === undefined}
          >
            remove -
          </ButtonStyled>
          <Price>{formatPrice(sku.price, sku.currency)}</Price>
        </ActionsRow>
        <QuantityIndicator visible={quantity > 0}>{quantity}</QuantityIndicator>
      </CardStyled>
    </>
  )
}

export default MenuItem
