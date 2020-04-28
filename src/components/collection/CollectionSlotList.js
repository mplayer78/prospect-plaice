import React, { useContext, useState, useEffect } from "react"
import BodyContainer from "../../layout/BodyContainer"
import BodyHeader from "../../layout/BodyHeader"
import Context from "../../state/context"
import { dateId } from "../../util/dateId"
import { createDaysCollectionSlots } from "../../util/createDaysCollectionSlots"
import CollectionSlot from "./CollectionSlot"
import styled from "styled-components"
import DayNavigator from "./DayNavigator"

const SlotHolder = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 400px;
  overflow-y: scroll;
  border: solid var(--primary900) 2px;
  padding: 2px;
  -webkit-box-shadow: inset 0px -20px 20px 0px var(--white);
  -moz-box-shadow: inset 0px -20px 20px 0px var(--white);
  box-shadow: inset 0px -20px 20px 0px var(--white);
`

const CollectionSlotList = props => {
  const { state, dispatch } = useContext(Context)
  const [daySlots, setDaySlots] = useState([])
  useEffect(() => {
    setDaySlots(createDaysCollectionSlots(state.currentSelectedDay))
  }, [state])
  return (
    <BodyContainer>
      <BodyHeader>Collection Slots</BodyHeader>
      <DayNavigator />
      <SlotHolder>
        {daySlots.map(v => {
          return (
            <CollectionSlot
              currentSlot={
                v.date.toISOString() === state.collectionSlot?.toISOString()
              }
              key={`${v.dateId}-${v.hour}:${v.minute}`}
              {...v}
            />
          )
        })}
      </SlotHolder>
    </BodyContainer>
  )
}

export default CollectionSlotList
