import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useContext } from "react"
import Context from "../state/context"
import FullHeader from "./FullHeader"

const Header = ({ siteTitle, minimised }) => {
  const { state, dispatch } = useContext(Context)
  return (
    <header
      style={{
        margin: `0 auto`,
        padding: `0`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderBottom: "solid 2px #666666",
        width: "90vw",
        maxWidth: "500px",
      }}
    >
      <FullHeader />
      {!minimised && (
        <>
          <h2 style={{ fontWeight: "400", textAlign: "center" }}>
            Prospect Place, Sidmouth EX10 8AS, England
          </h2>
          <h2 style={{ fontWeight: "400" }}>+44 1395 519328</h2>
        </>
      )}
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
