import React from "react"
import styled from "styled-components"

const BodyContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  &:nth-child(1) {
    border-right: solid #666 2px;
  }
  &:nth-child(3) {
    border-left: solid #666 2px;
  }
  color: #666;
  padding: 1rem;
`

export default BodyContainer
