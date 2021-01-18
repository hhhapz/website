import React, { FC, useEffect, useState } from "react"
import * as SC from "./styles"
import { info, token, clearToken } from "../../../utils/appeals"
import { navigate } from "gatsby"

const avatarURL = (id: string, discrim: string, avatar?: string): string => {
  if (!avatar) {
    return `https://cdn.discordapp.com/embed/avatars/${Number(discrim) % 5}.png`
  }
  return `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`
}

export const Header: FC = () => {
  const [avatar, setAvatar] = useState(
    "https://cdn.discordapp.com/embed/avatars/0.png"
  )
  const [name, setName] = useState("user#0000")

  const load = (token: string) => {
    info(token)
      .then(({ id, username, discriminator, avatar }) => {
        setAvatar(avatarURL(id, discriminator, avatar))
        setName(`${username}#${discriminator}`)
      })
      .catch((err) => {
        console.log(err)
        logout()
        navigate("/appeals")
      })
  }

  useEffect(() => {
    const tk = token()
    tk && load(tk)
  }, [])

  const logout = (e?: React.MouseEvent) => {
    console.log("logging out")
    e && e.preventDefault()
    clearToken()
    navigate("/appeals")
  }

  const newAppeal = (e: React.MouseEvent) => {
    e.preventDefault()
    navigate("/appeals/form")
  }

  return (
    <SC.HeaderWrapper>
      <SC.Profile>
        <SC.ProfileImg src={avatar} alt="" />
        <SC.ProfileText>{name}</SC.ProfileText>
      </SC.Profile>
      <SC.NavLinks>
        <SC.NavLink onClick={logout} href="#">
          Log Out
        </SC.NavLink>
        <SC.NavLink onClick={newAppeal} href="#">
          New Appeal
        </SC.NavLink>
      </SC.NavLinks>
    </SC.HeaderWrapper>
  )
}
