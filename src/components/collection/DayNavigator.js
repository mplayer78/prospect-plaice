import React, { useContext } from "react"
import Context from "../../state/context"

const DayNavigator = props => {
  const { state, dispatch } = useContext(Context)
  console.log("state", state)
  return (
    <>
      <p>-</p>
      <p>+</p>
    </>
  )
}

export default DayNavigator
