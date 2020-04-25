import React, { useContext } from "react"
import { twoSP } from "../../util/twoSP"
import Context from "../../state/context"
import styled from "styled-components"

const CollectionSlotStyle = styled.button`
  border: ${({ currentSlot }) => (currentSlot ? "none" : "solid 2px #999999")};
  margin: 2px 0;
  padding: 0.5rem;
  font-family: inherit;
  font-weight: 600;
  font-size: 1rem;
  color: ${({ currentSlot }) => (currentSlot ? "var(--white)" : "#333333")};
  background: ${({ currentSlot }) => (currentSlot ? "#333333" : "transparent")};
  outline: none;
`

const CollectionSlot = ({ currentSlot, hour, minute, date }) => {
  const { state, dispatch } = useContext(Context)
  return (
    <CollectionSlotStyle
      onClick={() => dispatch({ type: "book_collection_slot", date })}
      currentSlot={currentSlot}
    >
      {twoSP(hour)}:{twoSP(minute)}
    </CollectionSlotStyle>
  )
}

export default CollectionSlot
