import styled from "styled-components"

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

export const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`

export const ProfileImg = styled.img`
  border-radius: 40px;
  width: 40px;
  height: 40px;
`

export const ProfileText = styled.small`
  padding-bottom: 3px;
  font-size: 1.2rem;
`

export const NavLinks = styled.div`
  display: flex;
  gap: 16px;
`

export const NavLink = styled.a`
  height: 28px;
  font-size: 0.95rem;
  padding: 0 2px;
`
