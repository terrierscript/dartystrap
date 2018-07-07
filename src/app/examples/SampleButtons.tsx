import React from "react"
import { button } from "./samples"
export const SampleButtons = () => (
  <div
    dangerouslySetInnerHTML={{
      __html: button
    }}
  />
)
