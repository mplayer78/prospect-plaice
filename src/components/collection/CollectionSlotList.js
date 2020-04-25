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
  border: solid #999999 2px;
  padding: 2px;
  -webkit-box-shadow: inset 0px -20px 20px 0px var(--white);
  -moz-box-shadow: inset 0px -20px 20px 0px var(--white);
  box-shadow: inset 0px -20px 20px 0px var(--white);
`

const CollectionSlotList = props => {
  const { state, dispatch } = useContext(Context)
  const [currentDate, setCurrentDate] = useState(dateId(new Date()))
  const [daySlots, setDaySlots] = useState([])
  useEffect(() => {
    setDaySlots(createDaysCollectionSlots(new Date()))
  }, [currentDate])
  return (
    <BodyContainer>
      <BodyHeader>Collection Slots</BodyHeader>
      <DayNavigator />
      <SlotHolder>
        {daySlots.map(v => (
          <CollectionSlot
            currentSlot={state.collectionSlot === v.date}
            key={`${v.dateId}-${v.hour}:${v.minute}`}
            {...v}
          />
        ))}
      </SlotHolder>
    </BodyContainer>
  )
}

export default CollectionSlotList
