import React, { useContext } from "react"
import ConfirmationButton from "../components/ConfirmationButton"
import BodyContainer from "../layout/BodyContainer"
import BodyHeader from "../layout/BodyHeader"
import Context from "../state/context"

const CustomerDetails = props => {
  const { state, dispatch } = useContext(Context)
  let formValidated =
    !!state.collectionSlot &&
    state.itemList.length > 0 &&
    state.customerName.length > 0 &&
    state.customerPhoneNo.length > 0 &&
    state.customerEmail.length > 0
  console.log("formValidated", formValidated)
  return (
    <BodyContainer>
      <BodyHeader>Customer Details</BodyHeader>
      <label htmlFor="customerName">Customer Name</label>
      <input
        type="text"
        name="customerName"
        value={state.customerName}
        onChange={e =>
          dispatch({
            type: "set_form",
            name: e.target.name,
            value: e.target.value,
          })
        }
      />
      <label htmlFor="customerPhoneNo">Phone Number</label>
      <input
        type="text"
        name="customerPhoneNo"
        value={state.customerPhoneNo}
        onChange={e =>
          dispatch({
            type: "set_form",
            name: e.target.name,
            value: e.target.value,
          })
        }
      />
      <label htmlFor="customerEmail">Phone Number</label>
      <input
        type="text"
        name="customerEmail"
        value={state.customerEmail}
        onChange={e =>
          dispatch({
            type: "set_form",
            name: e.target.name,
            value: e.target.value,
          })
        }
      />
      <ConfirmationButton disabled={!formValidated} />
    </BodyContainer>
  )
}

export default CustomerDetails
