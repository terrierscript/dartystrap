import React from "react"
// import styled from "react-emotion"
import { Flex } from "reakit"

export const FlexRow = (props) => {
  return <Flex {...props} wrap={true} />
}
//  styled("div")`
//   display: flex;
//   flex-wrap: wrap;
//   max-width: 100vw;
// `
