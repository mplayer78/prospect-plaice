import React, { useContext } from "react"
import BodyContainer from "../../layout/BodyContainer"
import BodyHeader from "../../layout/BodyHeader"
import Context from "../../state/context"

const CollectionSlotList = props => {
  const { state, dispatch } = useContext(Context)
  return (
    <BodyContainer>
      <BodyHeader>Collection Slots</BodyHeader>
      <button onClick={() => dispatch({ type: "book_collection_slot" })}>
        Fake book collection slot
      </button>
    </BodyContainer>
  )
}

export default CollectionSlotList
