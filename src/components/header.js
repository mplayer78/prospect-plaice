import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useContext } from "react"
import Context from "../state/context"
import FullHeader from "./FullHeader"

const Header = ({ siteTitle }) => {
  const { state, dispatch } = useContext(Context)
  return (
    <header
      style={{
        margin: `1.45rem`,
        padding: `1.45rem`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderBottom: "solid 2px #666666",
      }}
    >
      <FullHeader />
      <h2 style={{ fontWeight: "400" }}>
        Prospect Place, Sidmouth EX10 8AS, England
      </h2>
      <h2 style={{ fontWeight: "400" }}>+44 1395 519328</h2>
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
