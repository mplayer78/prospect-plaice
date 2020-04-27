import React, { useContext } from "react"
import Context from "../state/context"
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

const ConfirmationButton = ({ disabled }) => {
  const { state } = useContext(Context)
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
    status: "UNFULFILLED",
  }

  async function handleClick(e) {
    try {
      const result = await newOrder({ variables: { orderObject } })
      navigate("/confirmOrder", {
        state: result,
      })
    } catch (err) {
      console.error(err)
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
