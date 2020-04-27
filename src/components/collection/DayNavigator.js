import React, { useContext } from "react"
import Context from "../../state/context"
import styled from "styled-components"

const DayNavigatorStyled = styled.div`
  display: flex;
  justify-content: space-between;
`

const NavButton = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
  font-family: inherit;
`

const DayNavigator = props => {
  const { state, dispatch } = useContext(Context)
  return (
    <DayNavigatorStyled>
      <NavButton onClick={() => dispatch({ type: "decrement_selected_day" })}>
        prev
      </NavButton>
      <p>{state.currentSelectedDay.toDateString()}</p>
      <NavButton onClick={() => dispatch({ type: "increment_selected_day" })}>
        next
      </NavButton>
    </DayNavigatorStyled>
  )
}

export default DayNavigator
