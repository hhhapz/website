import { transparentize } from "polished"
import styled, { css } from "styled-components"
import { fontFamily } from "../../design/typography"
import Header2560 from "../../images/header-2560x1440.png"
import Header1920 from "../../images/header-1920x1080.png"
import Header1440 from "../../images/header-1440x900.png"
import HeaderMobile from "../../images/header-mobile-375x300.png"

const spaceAbove = 67
const height = 300 - spaceAbove

export const HeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  height: ${height}px;
  padding-top: ${spaceAbove}px;
  position: relative;

  &.shifted {
    width: calc(100% - 305px);
    padding-right: 305px;
  }

  @media screen and (max-width: 1200px) {
    width: 100% !important;
    padding-right: 0 !important;
  }

  @media screen and (max-width: 767px) {
    display: flex;
    align-items: flex-end;
    height: auto;
    min-height: ${height}px;
  }
`

export const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: cover;

  // 2560x1400 screens
  @media screen and (min-width: 2500px) {
    background-image: url("${Header2560}");
  }

  // 1920x1080 screens
  @media screen and (min-width: 1800px) and (max-width: 2499px) {
    background-image: url("${Header1920}");
  }

  // 1440x900 screens
  @media screen and (min-width: 768px) and (max-width: 1799px) {
    background-image: url("${Header1440}");
  }

  // mobile screens
  @media screen and (max-width: 767px) {
    background-image: url("${HeaderMobile}");
  }
`

export const Box = styled.div`
  display: inline-flex;
  flex-direction: column;
  position: absolute;
  bottom: 40px;
  margin-left: -16px;
  background: ${(props) => transparentize(0.3, props.theme.main.background)};
  padding: 16px;
  backdrop-filter: blur(14px);
  max-width: 650px;

  @media screen and (max-width: 1200px) {
    max-width: 100%;
    left: 32px;
    right: 32px;
    margin-left: 0;
  }

  @media screen and (max-width: 767px) {
    position: static;
    bottom: auto;
    top: auto;
    margin: 32px 0;
    left: 0px;
    right: 0px;

    @-moz-document url-prefix() {
      & {
        position: relative;
      }
    }
  }
`

const title = css`
  font-family: ${fontFamily.header};
  font-size: 34px;
  line-height: 41px;
  letter-spacing: -1.75px;
  margin-top: 0;
  margin-bottom: 0;
`

export const Title = styled.h1`
  ${title};

  &.has-content-above {
    margin-top: 8px;
  }

  &.has-content-below {
    margin-bottom: 8px;
  }
`

export const SingleTitle = styled(Title)`
  ${title};
  color: #fff;
  position: absolute;
  bottom: 100px;
  text-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);

  &::after {
    position: absolute;
    content: "";
    left: 0;
    top: 100%;
    margin-top: 8px;
    width: 100px;
    height: 5px;
    background: #fff;
  }
`
