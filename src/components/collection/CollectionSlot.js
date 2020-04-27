import React, { useContext } from "react"
import { twoSP } from "../../util/twoSP"
import Context from "../../state/context"
import styled from "styled-components"

const CollectionSlotStyle = styled.div`
  border: ${({ currentSlot }) =>
    currentSlot ? "transparent" : "solid 2px #999999"};
  margin: 2px 0;
  padding: 4px;
  padding: 4px;
  text-align: center;
  font-family: inherit;
  font-weight: 600;
  font-size: 16px;
  line-height: 16px;
  color: ${({ currentSlot }) => (currentSlot ? "var(--white)" : "#333333")};
  background: ${({ currentSlot }) => (currentSlot ? "#333333" : "transparent")};
  outline: none;
  -webkit-appearance: none;
  -webkit-border-fit: border !important;
`

const CollectionSlot = ({ currentSlot, hour, minute, date }) => {
  const { dispatch } = useContext(Context)
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
