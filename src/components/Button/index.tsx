import React, { FC } from "react"
import * as SC from "./styles"
import { navigate } from "gatsby"

interface IButtonProps {
  to: string
}

export const Button: FC<IButtonProps> = ({ children, to }) => {
  const onClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    navigate(to)
  }

  return (
    <SC.ButtonWrapper onClick={onClick}>{children}</SC.ButtonWrapper>
  )
}
