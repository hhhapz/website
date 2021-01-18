import React, { FC } from "react"
import * as SC from "./styles"
import { oauthLink } from "../../utils/appeals"
import { navigate } from "gatsby"

export const OAuthButton: FC = ({ children }) => {
  const onClick = (e: React.MouseEvent) => {
    e.preventDefault()
    oauthLink()
      .then((l) => navigate(l))
      .catch((e) => alert(e))
  }

  return (
    <SC.OAuthButtonWrapper onClick={onClick}>
      <SC.StyledDiscordLogo /> {children}
    </SC.OAuthButtonWrapper>
  )
}
