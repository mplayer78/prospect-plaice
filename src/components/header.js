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
        marginBottom: "20px",
        paddingBotton: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderBottom: "solid 2px var(--primary500)",
        width: "100%",
      }}
    >
      <div style={{ width: "min(500px, 100%)" }}>
        <FullHeader />
      </div>

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
