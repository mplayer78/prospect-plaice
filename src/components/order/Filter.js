import React, { useContext } from "react"
import Context from "../../state/context"
import styled from "styled-components"

export const FilterBox = styled.div`
  display: flex;
  justify-content: flex-start;
`

export const FancyButton = styled.div`
  flex: 1;
  border: solid #666666 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  button {
    border: none;
    background: transparent;
  }
  margin: 5px;
  text-transform: uppercase;
`

const Filter = props => {
  const { state, dispatch } = useContext(Context)
  return (
    <FilterBox>
      <FancyButton onClick={() => dispatch({ type: "clear_filters" })}>
        Clear All Filters
      </FancyButton>
      <FancyButton style={{ flex: 1 }}>
        <button
          onClick={() => {
            dispatch({ type: "decrement_selected_day" })
            dispatch({ type: "filter_day" })
          }}
        >
          ⬅
        </button>
        {state.currentSelectedDay.toDateString()}
        <button
          onClick={() => {
            dispatch({ type: "increment_selected_day" })
            dispatch({ type: "filter_day" })
          }}
        >
          ⮕
        </button>
      </FancyButton>
    </FilterBox>
  )
}

export default Filter
