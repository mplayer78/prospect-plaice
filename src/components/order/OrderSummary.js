import React from "react"
import styled from "styled-components"

const OrderSummaryStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  border-bottom: solid var(--primary900) 3px;
  margin: 20px;
  padding-bottom: 20px;
  gap: 10px 10px;
  opacity: ${({ unfulfilled }) => (unfulfilled ? "0.5" : "1")};
`

const OrderDetails = styled.div`
  display: flex;
  flex-direction: column;
`

const CompleteButton = styled.button`
  border: none;
  background-color: var(--primary500);
  color: var(--white);
  font-family: inherit;
  font-size: 1rem;
  max-width: 30%;
`

const OrderSummary = props => {
  const collection = new Date(props.collection.date)
  console.log("props", props)
  return (
    <OrderSummaryStyled unfulfilled={props.status === "UNFULFILLED"}>
      <p style={{ fontWeight: 600, fontSize: "2rem", margin: 0 }}>
        {collection.toLocaleTimeString()}
      </p>
      <CompleteButton>Mark Complete</CompleteButton>
      <p>{props.status}</p>
      <OrderDetails>
        <p>{collection.toLocaleDateString()}</p>
        <p>{props.customerName}</p>
        <button>Show Order Details</button>
      </OrderDetails>
      <div className="checkbox-container">
        {props.items.data.map(v => (
          <div key={v.sku}>
            <input type="checkbox" id={v.sku} name={v.name} value={v.sku} />
            <label htmlFor={v.sku}>{v.name}</label>
          </div>
        ))}
      </div>
    </OrderSummaryStyled>
  )
}

export default OrderSummary
