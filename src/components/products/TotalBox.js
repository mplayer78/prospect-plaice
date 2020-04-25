import React, { useContext } from "react"
import styled from "styled-components"
import Context from "../../state/context"
import formatPrice from "../../util/formatPrice"

const TotalBoxDiv = styled.div`
  position: -webkit-sticky;
  position: sticky;
  bottom: 0;
  background: #fcfcfc33;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: space-between;
  padding-top: 1rem;
  box-shadow: 0px -10px 10px #fcfcfc;
  color: #333333;
  h4 {
    text-transform: uppercase;
    font-weight: 600;
  }
  h1 {
    font-family: inherit;
  }
`

const TotalBox = props => {
  const { state, dispatch } = useContext(Context)
  const totalPrice = state.itemList.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )
  return (
    <TotalBoxDiv>
      <h4>Total</h4>
      <h1>{formatPrice(totalPrice)}</h1>
    </TotalBoxDiv>
  )
}

export default TotalBox
