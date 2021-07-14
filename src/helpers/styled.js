import styled, { createGlobalStyle } from "styled-components";
import { device } from "../helpers/breakpoints";

import FONT_RUN from "../assets/fonts/run.ttf";
import FONT_MAVEN_REGULAR from "../assets/fonts/MavenPro-Regular.ttf";
import FONT_MAVEN_MEDIUM from "../assets/fonts/MavenPro-Medium.ttf";
import FONT_MAVEN_SEMI from "../assets/fonts/MavenPro-SemiBold.ttf";
import FONT_MAVEN_BOLD from "../assets/fonts/MavenPro-Bold.ttf";
import FONT_MAVEN_EXTRA from "../assets/fonts/MavenPro-ExtraBold.ttf";
import FONT_MAVEN_BLACK from "../assets/fonts/MavenPro-Black.ttf";
import FONT_VARELA from "../assets/fonts/VarelaRound-Regular.ttf";

export const StyledGlobal = createGlobalStyle`
    @font-face {
        font-family: 'Run';
        src: local('Run'), local('Run'),
        url(${FONT_RUN}) format('ttf'),
        font-weight: 400;
        font-style: normal;
    }
    @font-face {
        font-family: 'MavenPro-Regular';
        src: local('MavenPro-Regular'), local('MavenPro-Regular'),
        url(${FONT_MAVEN_REGULAR}) format('ttf'),
        font-weight: 400;
        font-style: normal;
    }
    @font-face {
        font-family: 'MavenPro-Medium';
        src: local('MavenPro-Medium'), local('MavenPro-Medium'),
        url(${FONT_MAVEN_MEDIUM}) format('ttf'),
        font-weight: 500;
        font-style: normal;
    }
    @font-face {
        font-family: 'MavenPro-SemiBold';
        src: local('MavenPro-SemiBold'), local('MavenPro-SemiBold'),
        url(${FONT_MAVEN_SEMI}) format('ttf'),
        font-weight: 600;
        font-style: normal;
    }
    @font-face {
        font-family: 'MavenPro-Bold';
        src: local('MavenPro-Bold'), local('MavenPro-Bold'),
        url(${FONT_MAVEN_BOLD}) format('ttf'),
        font-weight: 700;
        font-style: normal;
    }
    @font-face {
        font-family: 'MavenPro-ExtraBold';
        src: local('MavenPro-ExtraBold'), local('MavenPro-ExtraBold'),
        url(${FONT_MAVEN_EXTRA}) format('ttf'),
        font-weight: 800;
        font-style: normal;
    }
    @font-face {
        font-family: 'MavenPro-Black';
        src: local('MavenPro-Black'), local('MavenPro-Black'),
        url(${FONT_MAVEN_BLACK}) format('ttf'),
        font-weight: 900;
        font-style: normal;
    }
    @font-face {
        font-family: 'VarelaRound-Regulark';
        src: local('VarelaRound-Regulark'), local('VarelaRound-Regulark'),
        url(${FONT_VARELA}) format('ttf'),
        font-weight: 400;
        font-style: normal;
    }
`;

export const StyledSubTitle = styled.h3`
  margin: 0;
  font-family: "MavenPro-Regular";

  @media ${device.base} {
    ${(props) => (props.hideMobile ? `display: none;` : "")}
  }
  @media ${device.laptop} {
    ${(props) => (props.hideMobile ? `display: block;` : "")}
  }

  ${(props) => (props.center ? `text-align:center;` : "")}
  ${(props) => (props.color ? `color: ${props.color};` : "color: #232323;")}
  ${(props) => (props.ml ? `margin-left:${props.ml};` : "")}
  ${(props) => (props.mr ? `margin-right:${props.mr};` : "")}
  ${(props) => (props.mb ? `margin-bottom:${props.mb};` : "")}
  ${(props) => (props.mt ? `margin-top:${props.mt};` : "")}

  ${(props) =>
    props.mv ? `margin-top:${props.mv};margin-bottom:${props.mv};` : ""}
  ${(props) =>
    props.mh ? `margin-left:${props.mh};margin-right:${props.mh};` : ""}

  ${(props) => (props.pl ? `padding-left:${props.pl};` : "")}
  ${(props) => (props.pr ? `padding-right:${props.pr};` : "")}
  ${(props) => (props.pb ? `padding-bottom:${props.pb};` : "")}
  ${(props) => (props.pt ? `padding-top:${props.pt};` : "")}

  ${(props) =>
    props.pv ? `padding-top:${props.pv};padding-bottom:${props.pv};` : ""}
  ${(props) =>
    props.ph ? `padding-left:${props.ph};padding-right:${props.ph};` : ""}
  &.darkMode {
    color: white;
    ${(props) => (props.color ? `color: rgba(255,255,255, 0.4);` : "")}
  }
`;

export const StyledImg = styled.img`
  ${(props) => (props.w ? `width: ${props.w};` : "width: inherit;")}
  ${(props) => (props.h ? `height: ${props.h};` : "height: inherit;")}
  ${(props) => (props.mt ? `margin-top:${props.mt};` : "")}
  ${(props) =>
    props.minimgh ? `min-height:${props.minimgh};` : `min-height: inherit;`}
  ${(props) => (props.bordered ? `border-bottom: solid 4px #ffdd00;` : "")}
  ${(props) =>
    props.shadow
      ? `box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.3);
          border-radius: 50%;`
      : ""}
`;

export const StyledForm = styled.form`
  ${(props) => (props.flex ? `display: flex;` : "")}
  ${(props) => (props.f ? `flex: ${props.f};` : "")}
  ${(props) => (props.fwrap ? `flex-wrap: wrap;` : "")}
  ${(props) => (props.between ? "justify-content: space-between;" : "")}
  ${(props) => (props.around ? "justify-content: space-around;" : "")}
  ${(props) => (props.evenly ? "justify-content: space-evenly;" : "")}
  ${(props) => (props.jcenter ? "justify-content: center;" : "")}
  ${(props) => (props.center ? "align-items: center;" : "")}
  ${(props) => (props.col ? " flex-direction: column;" : "")}
  ${(props) => (props.w ? `width: ${props.w};` : "width: 100%;")}
  ${(props) =>
    props.maxw ? `max-width: ${props.maxw};` : "  max-width: 450px;"}
    ${(props) => (props.ml ? `margin-left:${props.ml};` : "")}
  ${(props) => (props.mr ? `margin-right:${props.mr};` : "")}
  ${(props) => (props.mb ? `margin-bottom:${props.mb};` : "")}
  ${(props) => (props.mt ? `margin-top:${props.mt};` : "")}

  ${(props) =>
    props.mv ? `margin-top:${props.mv};margin-bottom:${props.mv};` : ""}
  ${(props) =>
    props.mh ? `margin-left:${props.mh};margin-right:${props.mh};` : ""}

  ${(props) => (props.pl ? `padding-left:${props.pl};` : "")}
  ${(props) => (props.pr ? `padding-right:${props.pr};` : "")}
  ${(props) => (props.pb ? `padding-bottom:${props.pb};` : "")}
  ${(props) => (props.pt ? `padding-top:${props.pt};` : "")}

  ${(props) =>
    props.pv ? `padding-top:${props.pv};padding-bottom:${props.pv};` : ""}
  ${(props) =>
    props.ph ? `padding-left:${props.ph};padding-right:${props.ph};` : ""}

    
  @media ${device.base} {
    ${(props) => (props.jcenterXS ? "justify-content: center;" : "")}
  }
  @media ${device.mobileUI} {
    ${(props) => (props.betweenUI ? "justify-content: space-between;" : "")}
  }
`;

export const StyledNavButton = styled.button`
  cursor: pointer;
  overflow: hidden;
  width: 100%;
  line-height: 3.15rem;
  background: transparent;
  border: none;
  padding: 0;
  padding: 0 1rem;
  font-family: inherit;
  font-size: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  ${(props) => (props.color ? `color: ${props.color};` : `color: inherit;`)}
  ${(props) => (props.jleft ? "justify-content: left;" : "")}
  &.normal {
    background-color: transparent;
    color: #232323;
    &:hover,
    &:focus {
      background-color: rgba(0, 0, 0, 0.05);
    }
    &.open {
      background-color: #5829dd !important;
      color: white;
      svg {
        fill: white;
      }
    }
    &.active {
      background-color: #232323 !important;
      color: white;
      svg {
        fill: white;
      }
    }
  }
  &.inverse {
    background-color: #5829dd;
    color: white;
    &:hover,
    &:focus {
      background-color: rgb(59 27 150);
    }
    &.open {
      background-color: #232323 !important;
      &.move {
        svg {
          transition: transform 0.1596s cubic-bezier(0.52, 0.16, 0.52, 0.84)
            0.1008s;
          rect:nth-child(1) {
            transition: transform 0.1806s cubic-bezier(0.04, 0.04, 0.12, 0.96);
            transform: rotate(45deg) translate(3px, -6px);
          }
          rect:nth-child(2) {
            display: none;
          }
          rect:nth-child(3) {
            transition: transform 0.1806s cubic-bezier(0.04, 0.04, 0.12, 0.96);
            transform: rotate(-45deg) translate(-10px, 0px);
          }
        }
      }
    }
  }
  &.plain {
    color: #232323;
    background-color: transparent;
    &:hover,
    &:focus {
      background-color: rgba(0, 0, 0, 0.05);
    }
    &.open {
      background-color: transparent;
      color: #232323 !important;
      svg {
        fill: #232323 !important;
      }
    }
  }
`;

export const StyledButton = styled.button`
  cursor: pointer;
  overflow: hidden;
  background: transparent;
  border: none;
  font-family: inherit;
  font-size: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  ${(props) => (props.position ? `position: ${props.position};` : "")}
  ${(props) => (props.top ? `top: ${props.top};` : "")}
  ${(props) => (props.left ? `left: ${props.left};` : "")}
  ${(props) => (props.w ? `width: ${props.w};` : "")}
  ${(props) => (props.h ? `height: ${props.h};` : "")}
  ${(props) => (props.lb ? `white-space: pre-line;` : "")}
  ${(props) => (props.lbt ? `white-space: pre-wrap;` : "")}
  ${(props) => (props.bg ? `background-color: ${props.bg};` : "")}

  ${(props) => (props.ml ? `margin-left:${props.ml};` : "")}
  ${(props) => (props.mr ? `margin-right:${props.mr};` : "")}
  ${(props) => (props.mb ? `margin-bottom:${props.mb};` : "")}
  ${(props) => (props.mt ? `margin-top:${props.mt};` : "")}

  ${(props) =>
    props.mv ? `margin-top:${props.mv};margin-bottom:${props.mv};` : ""}
  ${(props) =>
    props.mh ? `margin-left:${props.mh};margin-right:${props.mh};` : ""}

  ${(props) => (props.pl ? `padding-left:${props.pl};` : "")}
  ${(props) => (props.pr ? `padding-right:${props.pr};` : "")}
  ${(props) => (props.pb ? `padding-bottom:${props.pb};` : "")}
  ${(props) => (props.pt ? `padding-top:${props.pt};` : "")}

  ${(props) =>
    props.pv ? `padding-top:${props.pv};padding-bottom:${props.pv};` : ""}
  ${(props) =>
    props.ph ? `padding-left:${props.ph};padding-right:${props.ph};` : ""}

  ${(props) => (props.flex ? `display: flex;` : "")}
  ${(props) => (props.f ? `flex: ${props.f};` : "")}
  ${(props) => (props.fwrap ? `flex-wrap: wrap;` : "")}
  ${(props) => (props.between ? "justify-content: space-between;" : "")}
  ${(props) => (props.around ? "justify-content: space-around;" : "")}
  ${(props) => (props.evenly ? "justify-content: space-evenly;" : "")}
  ${(props) => (props.jcenter ? "justify-content: center;" : "")}
  ${(props) => (props.center ? "align-items: center;" : "")}
  ${(props) => (props.col ? " flex-direction: column;" : "")}
  ${(props) => (props.color ? `color: ${props.color};` : `color: inherit;`)}
  ${(props) => (props.rounded ? `border-radius: 50% !important;` : ``)}


  @media ${device.base} {
    ${(props) => (props.maxwXS ? `max-width: ${props.maxwXS};` : "")}
  }
  @media ${device.mobileL} {
    ${(props) => (props.maxwML ? `max-width: ${props.maxwML};` : "")}
  }
  @media ${device.tablet} {
    ${(props) => (props.maxwT ? `max-width: ${props.maxwT};` : "")}
  }
  @media ${device.laptop} {
    ${(props) => (props.maxwL ? `max-width: ${props.maxwL};` : "")}
  }
  ${(props) => (props.maxw ? `max-width: ${props.maxw};` : ``)}

  &.plainDark {
    color: #232323;
    background-color: transparent;
    &:hover,
    &:focus {
      background-color: rgba(0, 0, 0, 0.1);
    }
    &.open {
      background-color: transparent;
      color: #232323 !important;
      svg {
        fill: #232323 !important;
      }
    }
  }
  &.plainWhite {
    color: white;
    background-color: transparent;
    &:hover,
    &:focus {
      background-color: rgba(0, 0, 0, 0.1);
    }
    &.open {
      background-color: transparent;
      color: #white !important;
      svg {
        fill: white !important;
      }
    }
  }
  &.primary {
    border-radius: 4px;
    &.sbr {
      border-radius: 0 0 4px 4px;
    }
    ${(props) => (props.w ? `width: ${props.w};` : "width: 100%;")}
    padding: 0.8rem 1.5rem;
    color: #232323;
    background-color: #ffdd00;
    &:hover,
    &:focus {
      background-color: rgb(242 210 0);
    }
    &:disabled,
    &.disabled {
      background-color: rgba(0, 0, 0, 0.1);
      pointer-events: none;
      &.darkMode {
        background-color: rgba(255, 255, 255, 0.1);
        color: white;
      }
    }
    &.transparent {
      border-radius: 0;
      &.sbr {
        border-radius: 0 0 4px 4px;
      }
      background-color: transparent;
      &:hover,
      &:focus {
        background-color: rgb(242 210 0);
      }
    }
    &.plain {
      background-color: rgba(0, 0, 0, 0.05);
      color: #232323;
      &:hover,
      &:focus {
        background-color: rgba(0, 0, 0, 0.1);
      }
      &.transparent {
        border-radius: 0;
        &.sbr {
          border-radius: 0 0 4px 4px;
        }
        background-color: transparent;
        &:hover,
        &:focus {
          background-color: rgba(0, 0, 0, 0.1);
        }
      }
    }
  }

  @media ${device.base} {
    ${(props) => (props.showMobile ? `display: block; position: initial;` : "")}
    ${(props) => (props.hideMobile ? `display: none;` : "")}
  }
  @media ${device.mobileL} {
    ${(props) => (props.showMobile ? `display: block;` : "")}
  }
  @media ${device.laptop} {
    ${(props) => (props.showMobile ? `display: none;` : "")}
    ${(props) => (props.hideMobile ? `display: block;` : "")}
  }
`;

export const StyledHeader = styled.header`
  z-index: 100;
  ${(props) =>
    props.position ? `position: ${props.position};` : "position: fixed;"}
  ${(props) => (props.left ? `left:${props.left};` : "left: 0;")}
  ${(props) => (props.top ? `top:${props.top};` : "top: 0;")}
  ${(props) => (props.w ? `width: ${props.w};` : "width: 100%;")}
  ${(props) => (props.h ? `height: ${props.h};` : "height: 3.15rem;")}
  ${(props) =>
    props.bg ? `background-color: ${props.bg};` : "background-color: #ffdd00;"}
  margin: 0;
  padding: 0;
`;

export const StyledNavList = styled.ul`
  padding: 0;
  margin: 0;
  ${(props) => (props.flex ? `display: flex;` : "")}
  ${(props) => (props.ml ? `margin-left:${props.ml} !important;` : "")}
  ${(props) => (props.mr ? `margin-right:${props.mr} !important;` : "")}
  ${(props) => (props.mb ? `margin-bottom:${props.mb} !important;` : "")}
  ${(props) => (props.mt ? `margin-top:${props.mt} !important;` : "")}

  ${(props) =>
    props.mv
      ? `margin-top:${props.mv} !important;margin-bottom:${props.mv} !important;`
      : ""}
  ${(props) =>
    props.mh
      ? `margin-left:${props.mh} !important;margin-right:${props.mh} !important;`
      : ""}

  ${(props) => (props.pl ? `padding-left:${props.pl} !important;` : "")}
  ${(props) => (props.pr ? `padding-right:${props.pr} !important;` : "")}
  ${(props) => (props.pb ? `padding-bottom:${props.pb} !important;` : "")}
  ${(props) => (props.pt ? `padding-top:${props.pt} !important;` : "")}

  ${(props) =>
    props.pv
      ? `padding-top:${props.pv} !important;padding-bottom:${props.pv} !important;`
      : ""}
      ${(props) =>
    props.ph
      ? `padding-left:${props.ph} !important;padding-right:${props.ph} !important;`
      : ""}
`;

export const StyledNavItems = styled.li`
  list-style: none;
  ${(props) => (props.w ? `width: ${props.w};` : "width: 11rem;")}

  ${(props) =>
    props.position ? `position: ${props.position};` : "position: relative;"}

  @media ${device.base} {
    ${(props) => (props.showMobile ? `display: flex; position: initial;` : "")}
    ${(props) => (props.hideMobile ? `display: none;` : "")}
    ${(props) => (props.flex ? `display: flex;` : "")}
    ${(props) => (props.between ? "justify-content: space-between;" : "")}
    ${(props) => (props.around ? "justify-content: space-around;" : "")}
    ${(props) => (props.evenly ? "justify-content: space-evenly;" : "")}
    ${(props) => (props.jcenter ? "justify-content: center;" : "")}
    ${(props) => (props.center ? "align-items: center;" : "")}
    ${(props) => (props.col ? " flex-direction: column;" : "")}
  }
  @media ${device.mobileL} {
    ${(props) => (props.showMobile ? `display: flex;` : "")}
    ${(props) =>
      props.position ? `position: ${props.position};` : "position: relative;"}
  }
  @media ${device.laptop} {
    ${(props) => (props.showMobile ? `display: none;` : "")}
    ${(props) => (props.hideMobile ? `display: flex;` : "")}
    ${(props) => (props.flex ? `display: flex;` : "")}
    ${(props) => (props.between ? "justify-content: space-between;" : "")}
    ${(props) => (props.around ? "justify-content: space-around;" : "")}
    ${(props) => (props.evenly ? "justify-content: space-evenly;" : "")}
    ${(props) => (props.jcenter ? "justify-content: center;" : "")}
    ${(props) => (props.center ? "align-items: center;" : "")}
    ${(props) => (props.col ? " flex-direction: column;" : "")}
  }
`;

export const StyledMenuItems = styled.li`
  cursor: pointer;
  width: auto;
  overflow: hidden;
  box-sizing: border-box;
  line-height: 1.5;
  padding-top: 6px;
  white-space: nowrap;
  padding-bottom: 6px;
  min-height: auto;
  padding-left: 16px;
  padding-right: 16px;
  }
`;

export const LinkButton = styled.a`
  cursor: pointer;
  text-decoration: underline;
  color: rgba(88, 41, 221, 1);
  ${(props) => (props.block ? `display: block;` : "")}
  ${(props) => (props.size ? `font-size:${props.size};` : "")}
  ${(props) => (props.tcenter ? "text-align: center;" : "")}

  &.darkMode {
    color: white;
  }
  &:link {
    color: rgb(85, 26, 139);
  }
  &:visited {
    color: rgb(85, 26, 139);
  }
  &:hover {
    color: rgb(85, 26, 139);
  }
  &:active {
    color: rgb(85, 26, 139);
  }
`;

export const StyledTitle = styled.h1`
  margin: 0;
  padding: 0;
  ${(props) => (props.font ? `font-size: ${props.font};` : "")}
  ${(props) => (props.tcenter ? "text-align: center;" : "")}
  ${(props) => (props.ttransform ? `text-transform: ${props.ttransform};` : "")}
  ${(props) => (props.color ? `color: ${props.color};` : "color: #232323;")}
  ${(props) =>
    props.family
      ? `font-family: ${props.family};`
      : "font-family: MavenPro-Medium;"}
      ${(props) => (props.ml ? `margin-left:${props.ml};` : "")}
  ${(props) => (props.mr ? `margin-right:${props.mr};` : "")}
  ${(props) => (props.mb ? `margin-bottom:${props.mb};` : "")}
  ${(props) => (props.mt ? `margin-top:${props.mt};` : "")}

  ${(props) =>
    props.mv ? `margin-top:${props.mv};margin-bottom:${props.mv};` : ""}
  ${(props) =>
    props.mh ? `margin-left:${props.mh};margin-right:${props.mh};` : ""}

  ${(props) => (props.pl ? `padding-left:${props.pl};` : "")}
  ${(props) => (props.pr ? `padding-right:${props.pr};` : "")}
  ${(props) => (props.pb ? `padding-bottom:${props.pb};` : "")}
  ${(props) => (props.pt ? `padding-top:${props.pt};` : "")}

  ${(props) =>
    props.pv ? `padding-top:${props.pv};padding-bottom:${props.pv};` : ""}
  ${(props) =>
    props.ph ? `padding-left:${props.ph};padding-right:${props.ph};` : ""}
    ${(props) => (props.w ? `width:${props.w};` : ``)}
  &.darkMode {
    color: white;
  }
`;

export const StyledSubMenu = styled.ul`
  z-index: 100;
  display: none;
  list-style-type: none;
  background-color: white;
  right: 0;
  left: 0;
  margin: 0;
  ${(props) => (props.top ? `top: ${props.top};` : "top: 3.15rem;")}
  padding: 0;
  box-shadow: 0px 3px 3px -2px rgba(0, 0, 0, 0.2),
    0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.12);
  border-radius: 0 0 3px 3px;
  overflow: hidden;
  overflow-y: auto;
  max-height: calc(100vh - 4rem);
  ${(props) =>
    props.open
      ? `
      display: block;
      position: absolute;
      `
      : ""}

  @media ${device.base} {
    left: 0;
  }
  @media ${device.mobileL} {
    ${(props) => (props.left ? `left:${props.left};` : "")}
  }

  ${(props) => (props.between ? "justify-content: space-between;" : "")}
  ${(props) => (props.around ? "justify-content: space-around;" : "")}
  ${(props) => (props.evenly ? "justify-content: space-evenly;" : "")}
  ${(props) => (props.jcenter ? "justify-content: center;" : "")}
  ${(props) => (props.center ? "align-items: center;" : "")}
  ${(props) => (props.col ? " flex-direction: column;" : "")}
`;

export const StyledSubMenuItems = styled.li`
  list-style: none;
  line-height: 3.15rem;
  position: relative;
  ${(props) =>
    props.position ? `position: ${props.position};` : "position: relative;"}

  a {
    padding: 0 1rem;
    display: block;
    text-decoration: none;
    color: #232323;
    &:active,
    &.active,
    &.active:hover {
      color: white;
      background-color: #5829dd;
    }
    &:hover,
    &:focus {
      background-color: rgba(0, 0, 0, 0.05);
      color: #232323;
      a {
        color: #232323;
      }
    }
  }
`;
export const StyledSubMenuTitle = styled.div`
  line-height: 3.15rem;
  color: white;
  background-color: #5829dd;
  padding: 0 1rem;
  pointer-events: none;
  ${(props) =>
    props.user
      ? ` background-color: #e9e9e9;
    pointer-events: none;
    color: #232323;
    text-align: center;
    font-size: 1.2rem;
    line-height: initial;
    padding: 1rem;
    svg {
      width: 2.15rem !important;
      height: 2.15rem !important;
    }`
      : ""}
  }
`;

export const StyledHr = styled.hr`
  border: none;

  ${(props) => (props.full ? "margin: 0;" : "margin: 0 1rem;")}

  ${(props) =>
    props.mh ? `margin-left:${props.mh};margin-right:${props.mh};` : ""}

  ${(props) =>
    props.border
      ? `border-top:${props.border};`
      : "border-top: 1px solid #e9e9e9;"}
      ${(props) =>
    props.vertical
      ? `border:none;border-left:${props.vertical};width:1px;height:1rem;`
      : ""}
`;

export const StyledNavFigure = styled.figure`
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3.15rem;

  ${(props) => (props.mr ? `margin-right:${props.mr};` : "")}
  ${(props) => (props.ml ? `margin-left:${props.ml};` : "")}
  ${(props) =>
    props.mv ? `margin-top:${props.mv};margin-bottom:${props.mv};` : ""}
  ${(props) =>
    props.little
      ? `svg {
          height: 0.5rem;
          width: 0.5rem;
        }`
      : `svg {
          height: 1.5rem;
          width: 1.5rem;
        }`}
`;

export const StyledNavLogo = styled.button`
  border: none;
  overflow: hidden;
  background: transparent;
  display: flex;
  align-items: center;
  figure {
    margin: 0;
    height: 3.15rem;
  }
  height: 3.15rem;
  cursor: pointer;
  &:hover,
  &:focus {
    background-color: rgba(0, 0, 0, 0.05);
  }
  svg {
    width: 100%;
    height: 3.15rem;
    min-width: 7rem;
    max-width: 10rem;
  }
  ${
    "" /* @media ${device.base} {
    margin-left: 1.55rem;
  }
  @media ${device.laptop} {
    padding: 0 1.55rem;
  } */
  }
`;

export const StyledFooter = styled.footer`
  background-color: #232323;
  color: white;
  ${(props) => (props.minh ? `min-height: ${props.minh};` : "")}
`;

export const StyledFooterLink = styled.a`
  color: white;
  text-decoration: none;
  font-size: 0.8rem;
  ${(props) =>
    props.mv ? `margin-top:${props.mv};margin-bottom:${props.mv};` : ""}
  ${(props) => (props.flex ? `display: flex;` : "")}
  ${(props) => (props.center ? "align-items: center;" : "")}
`;

export const StyledLink = styled.a`
  color: white;
  text-decoration: none;
  font-size: inherit;
`;

export const StyledSpan = styled.span`
  ${(props) =>
    props.decoration
      ? `text-decoration: ${props.decoration};`
      : "text-decoration: none;"}
  ${(props) => (props.ttransform ? `text-transform: ${props.ttransform};` : "")}
  ${(props) => (props.pointer ? `cursor: pointer;` : "")}
  ${(props) => (props.color ? `color: ${props.color};` : "color: white;")}
  ${(props) => (props.w ? `width:${props.w};` : ``)}
  ${(props) => (props.maxw ? `max-width: ${props.maxw};` : "")}
  ${(props) => (props.ttransform ? `text-transform: ${props.ttransform};` : "")}
  
  ${(props) =>
    props.font ? `font-size: ${props.font};` : "font-size: 0.8rem;"}

  @media ${device.base} {
    ${(props) => (props.mobileCenter ? `align-items: center;` : "")}
  }

  ${(props) => (props.lb ? `white-space: pre-line;` : "")}
  ${(props) => (props.lbt ? `white-space: pre-wrap;` : "")}
  ${(props) => (props.bg ? `background-color: ${props.bg};` : "")}

  ${(props) => (props.ml ? `margin-left:${props.ml};` : "")}
  ${(props) => (props.mr ? `margin-right:${props.mr};` : "")}
  ${(props) => (props.mb ? `margin-bottom:${props.mb};` : "")}
  ${(props) => (props.mt ? `margin-top:${props.mt};` : "")}

  ${(props) =>
    props.mv ? `margin-top:${props.mv};margin-bottom:${props.mv};` : ""}
  ${(props) =>
    props.mh ? `margin-left:${props.mh};margin-right:${props.mh};` : ""}

  ${(props) => (props.pl ? `padding-left:${props.pl};` : "")}
  ${(props) => (props.pr ? `padding-right:${props.pr};` : "")}
  ${(props) => (props.pb ? `padding-bottom:${props.pb};` : "")}
  ${(props) => (props.pt ? `padding-top:${props.pt};` : "")}

  ${(props) =>
    props.pv ? `padding-top:${props.pv};padding-bottom:${props.pv};` : ""}
  ${(props) =>
    props.ph ? `padding-left:${props.ph};padding-right:${props.ph};` : ""}

  ${(props) => (props.flex ? `display: flex;` : "")}
  ${(props) => (props.display ? `display: ${props.display};` : "")}
  ${(props) => (props.f ? `flex: ${props.f};` : "")}
  ${(props) => (props.fwrap ? `flex-wrap: wrap;` : "")}
  ${(props) => (props.between ? "justify-content: space-between;" : "")}
  ${(props) => (props.around ? "justify-content: space-around;" : "")}
  ${(props) => (props.evenly ? "justify-content: space-evenly;" : "")}
  ${(props) => (props.jcenter ? "justify-content: center;" : "")}
  ${(props) => (props.center ? "align-items: center;" : "")}
  ${(props) => (props.col ? " flex-direction: column;" : "")}

  ${(props) => (props.tcenter ? "text-align: center;" : "")}
    ${(props) => (props.tjustify ? "text-align: justify;" : "")}
    ${(props) => (props.weight ? `font-weight: ${props.weight};` : "")}
`;

export const StyledFigure = styled.figure`
  margin: 0;
  ${(props) =>
    props.shadow
      ? `box-shadow: 0 0 0rem 3px rgba(0,0,0,0.1);
          border-radius: 50%;`
      : ""}
  ${(props) => (props.pointer ? `cursor: pointer;` : "")}
  ${(props) => (props.noPointer ? `pointer-events: none;` : "")}
  ${(props) => (props.fill ? `svg{fill:${props.fill};}` : `svg{fill:#232323;}`)}
  ${(props) => (props.opacity ? `svg{fill-opacity:${props.opacity};}` : "")}
  ${(props) => (props.w ? `svg{width:${props.w};}` : `svg{width: 2rem;}`)}
  ${(props) => (props.h ? `svg{height:${props.h};}` : `svg{height: 2rem;}`)}
  ${(props) => (props.imgw ? `width:${props.imgw};` : ``)}
  ${(props) => (props.imgh ? `height:${props.imgh};` : ``)}
  ${(props) => (props.minimgh ? `min-height:${props.minimgh};` : ``)}
 
  ${(props) => (props.ml ? `margin-left:${props.ml} !important;` : "")}
  ${(props) => (props.mr ? `margin-right:${props.mr} !important;` : "")}
  ${(props) => (props.mb ? `margin-bottom:${props.mb} !important;` : "")}
  ${(props) => (props.mt ? `margin-top:${props.mt} !important;` : "")}

  ${(props) =>
    props.mv
      ? `margin-top:${props.mv} !important;margin-bottom:${props.mv} !important;`
      : ""}
  ${(props) =>
    props.mh
      ? `margin-left:${props.mh} !important;margin-right:${props.mh} !important;`
      : ""}

  ${(props) => (props.pl ? `padding-left:${props.pl} !important;` : "")}
  ${(props) => (props.pr ? `padding-right:${props.pr} !important;` : "")}
  ${(props) => (props.pb ? `padding-bottom:${props.pb} !important;` : "")}
  ${(props) => (props.pt ? `padding-top:${props.pt} !important;` : "")}

  ${(props) =>
    props.pv
      ? `padding-top:${props.pv} !important;padding-bottom:${props.pv} !important;`
      : ""}
      ${(props) =>
    props.ph
      ? `padding-left:${props.ph} !important;padding-right:${props.ph} !important;`
      : ""}

  ${(props) => (props.flex ? `display: flex;` : "")}
  ${(props) => (props.between ? "justify-content: space-between;" : "")}
  ${(props) => (props.around ? "justify-content: space-around;" : "")}
  ${(props) => (props.evenly ? "justify-content: space-evenly;" : "")}
  ${(props) => (props.jcenter ? "justify-content: center;" : "")}
  ${(props) => (props.center ? "align-items: center;" : "")}
  ${(props) => (props.col ? " flex-direction: column;" : "")}
  &.back {
    cursor: pointer;
    position: absolute;
    top: 0;
    background: #232323;
    padding: 0.4rem;
    left: 1.1rem;
    border-radius: 4px 0 4px 0;
  }
`;
export const StyledFooterFigure = styled.figure`
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  ${(props) => (props.ml ? `margin-left:${props.ml};` : "")}
  ${(props) => (props.mr ? `margin-right:${props.mr};` : "")}
  ${(props) => (props.mb ? `margin-bottom:${props.mb};` : "")}
  ${(props) => (props.mt ? `margin-top:${props.mt};` : "")}

  ${(props) =>
    props.mv ? `margin-top:${props.mv};margin-bottom:${props.mv};` : ""}
  ${(props) =>
    props.mh ? `margin-left:${props.mh};margin-right:${props.mh};` : ""}

  ${(props) => (props.pl ? `padding-left:${props.pl};` : "")}
  ${(props) => (props.pr ? `padding-right:${props.pr};` : "")}
  ${(props) => (props.pb ? `padding-bottom:${props.pb};` : "")}
  ${(props) => (props.pt ? `padding-top:${props.pt};` : "")}

  ${(props) =>
    props.pv ? `padding-top:${props.pv};padding-bottom:${props.pv};` : ""}
      ${(props) =>
    props.ph ? `padding-left:${props.ph};padding-right:${props.ph};` : ""}
  svg {
    ${(props) => (props.w ? `width: ${props.w};` : "width: 2rem;")}
    ${(props) => (props.h ? `height: ${props.h};` : "height: 2rem;")}
  }
`;

export const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  min-height: 100vh;
  box-sizing: border-box;
`;

export const StyledMain = styled.main`
  padding: 0;

  ${(props) => (props.bg ? `background-color: ${props.bg};` : "")}
  ${(props) => (props.mt ? `margin-top:${props.mt};` : "margin-top: 3.15rem;")}
  ${(props) => (props.flex ? `display: flex;` : "")}
  ${(props) => (props.f ? `flex: ${props.f};` : "")}
  ${(props) => (props.fwrap ? `flex-wrap: wrap;` : "")}
  ${(props) => (props.between ? "justify-content: space-between;" : "")}
  ${(props) => (props.around ? "justify-content: space-around;" : "")}
  ${(props) => (props.evenly ? "justify-content: space-evenly;" : "")}
  ${(props) => (props.jcenter ? "justify-content: center;" : "")}
  ${(props) => (props.center ? "align-items: center;" : "")}
  ${(props) => (props.col ? " flex-direction: column;" : "")}
`;

export const StyledContainer = styled.div`
  height: initial;
  ${(props) => (props.bbox ? `box-sizing: ${props.bbox};` : "")}
  @media ${device.base} {
    padding-left: 1.55rem;
    padding-right: 1.55rem;
    ${(props) => (props.maxwXS ? `max-width: ${props.maxwXS};` : "")}
  }
  @media ${device.mobileL} {
    padding-left: 1.55rem;
    padding-right: 1.55rem;
    max-width: 980px;
    ${(props) => (props.maxwML ? `max-width: ${props.maxwML};` : "")}
    margin: 0 auto;
  }
  @media ${device.tablet} {
    ${(props) => (props.maxwT ? `max-width: ${props.maxwT};` : "")}
  }
  @media ${device.laptop} {
    margin: 0 auto;
    max-width: 1250px;
    ${(props) => (props.maxwL ? `max-width: ${props.maxwL};` : "")}
  }
  ${(props) => (props.overflow ? `overflow: ${props.overflow}; ;` : ``)}
  ${(props) => (props.fh ? "height: 100%;" : "")}
  ${(props) => (props.w ? `width: ${props.w};` : "")}
  ${(props) => (props.ml ? `margin-left:${props.ml} !important;` : "")}
  ${(props) => (props.mr ? `margin-right:${props.mr} !important;` : "")}
  ${(props) => (props.mb ? `margin-bottom:${props.mb} !important;` : "")}
  ${(props) => (props.mt ? `margin-top:${props.mt} !important;` : "")}

  ${(props) =>
    props.mv
      ? `margin-top:${props.mv} !important;margin-bottom:${props.mv} !important;`
      : ""}
  ${(props) =>
    props.mh
      ? `margin-left:${props.mh} !important;margin-right:${props.mh} !important;`
      : ""}

  ${(props) => (props.pl ? `padding-left:${props.pl} !important;` : "")}
  ${(props) => (props.pr ? `padding-right:${props.pr} !important;` : "")}
  ${(props) => (props.pb ? `padding-bottom:${props.pb} !important;` : "")}
  ${(props) => (props.pt ? `padding-top:${props.pt} !important;` : "")}

  ${(props) =>
    props.pv
      ? `padding-top:${props.pv} !important;padding-bottom:${props.pv} !important;`
      : ""}
      ${(props) =>
    props.ph
      ? `padding-left:${props.ph} !important;padding-right:${props.ph} !important;`
      : ""}

  ${(props) => (props.flex ? `display: flex;` : "")}
  ${(props) => (props.fwrap ? `flex-wrap: wrap;` : "")}
  ${(props) => (props.between ? "justify-content: space-between;" : "")}
  ${(props) => (props.around ? "justify-content: space-around;" : "")}
  ${(props) => (props.evenly ? "justify-content: space-evenly;" : "")}
  ${(props) => (props.jcenter ? "justify-content: center;" : "")}
  ${(props) => (props.center ? "align-items: center;" : "")}
  ${(props) => (props.col ? " flex-direction: column;" : "")}
`;
export const StyledNav = styled.nav`
  ${(props) => (props.flex ? `display: flex;` : "")}
  ${(props) => (props.between ? "justify-content: space-between;" : "")}
  ${(props) => (props.around ? "justify-content: space-around;" : "")}
  ${(props) => (props.evenly ? "justify-content: space-evenly;" : "")}
  ${(props) => (props.jcenter ? "justify-content: center;" : "")}
  ${(props) => (props.center ? "align-items: center;" : "")}
  ${(props) => (props.col ? " flex-direction: column;" : "")}
  @media ${device.laptop} {
    margin: 0 auto;
    max-width: 1250px;
  }
`;
export const StyledCategoryNav = styled.nav`
  position: relative;
  @media ${device.laptop} {
    margin: 0 auto;
    max-width: 1250px;
  }
  ${(props) => (props.h ? `height: ${props.h};` : "height: 2.75rem;")}
  ${(props) => (props.flex ? `display: flex;` : "")}
  ${(props) => (props.between ? "justify-content: space-between;" : "")}
  ${(props) => (props.around ? "justify-content: space-around;" : "")}
  ${(props) => (props.evenly ? "justify-content: space-evenly;" : "")}
  ${(props) => (props.jcenter ? "justify-content: center;" : "")}
  ${(props) => (props.center ? "align-items: center;" : "")}
  ${(props) => (props.col ? " flex-direction: column;" : "")}
`;

export const StyledDiv = styled.div`
  ${(props) => (props.h ? `height:${props.h};` : "")}
  @media ${device.base} {
    ${(props) => (props.wXS ? `width:${props.wXS};` : "")}
    ${(props) => (props.mobileCenter ? `align-items: center;` : "")}
    ${(props) => (props.showMobile ? `display: block; position: initial;` : "")}
    ${(props) => (props.hideMobile ? `display: none;` : "")}
    ${(props) => (props.showTilTablet ? `display: block;` : "")}
    ${(props) => (props.showAtTablet ? `display: none;` : "")}
    ${(props) => (props.showAtMobileUI ? `display: none;` : "")}
    ${(props) => (props.showTilMobileUI ? `display: block;` : "")}
  }
  @media ${device.mobileL} {
    ${(props) => (props.showMobile ? `display: block;` : "")}
  }
  @media ${device.mobileUI} {
    ${(props) => (props.wXS ? `width: initial;` : "")}
    ${(props) => (props.showAtMobileUI ? `display: block;` : "")}
    ${(props) => (props.showTilMobileUI ? `display: none;` : "")}
  }
  @media ${device.tablet} {
    ${(props) => (props.showTilTablet ? `display: none;` : "")}
    ${(props) => (props.showAtTablet ? `display: block;` : "")}
  }
  @media ${device.laptop} {
    ${(props) =>
      props.container
        ? `margin: 0 auto;
          max-width: 1250px;`
        : ""}

    ${(props) => (props.showMobile ? `display: none;` : "")}
    ${(props) => (props.hideMobile ? `display: block;` : "")}
  }
  ${(props) => (props.pointer ? `cursor: pointer;` : "")}
  ${(props) => (props.position ? `position: ${props.position};` : "")}
  ${(props) => (props.top ? `top: ${props.top};` : "")}
  ${(props) => (props.bottom ? `bottom: ${props.bottom};` : "")}
  ${(props) => (props.right ? `right: ${props.right};` : "")}
  ${(props) => (props.left ? `left: ${props.left};` : "")}
  ${(props) => (props.tcenter ? "text-align: center;" : "")}
  ${(props) => (props.maxw ? `max-width: ${props.maxw};` : "")}
  ${(props) => (props.minw ? `min-width: ${props.minw};` : "")}
  ${(props) => (props.maxh ? `max-height: ${props.maxh};` : "")}
  ${(props) => (props.w ? `width: ${props.w};` : "")}
  ${(props) => (props.h ? `height: ${props.h};` : "")}

  ${(props) => (props.order ? `order: ${props.order};` : "")}
  ${(props) => (props.lb ? `white-space: pre-line;` : "")}
  ${(props) => (props.lbt ? `white-space: pre-wrap;` : "")}
  ${(props) => (props.bg ? `background-color: ${props.bg};` : "")}

  ${(props) => (props.ml ? `margin-left:${props.ml};` : "")}
  ${(props) => (props.mr ? `margin-right:${props.mr};` : "")}
  ${(props) => (props.mb ? `margin-bottom:${props.mb};` : "")}
  ${(props) => (props.mt ? `margin-top:${props.mt};` : "")}

  ${(props) =>
    props.mv ? `margin-top:${props.mv};margin-bottom:${props.mv};` : ""}
  ${(props) =>
    props.mh ? `margin-left:${props.mh};margin-right:${props.mh};` : ""}

  ${(props) => (props.pl ? `padding-left:${props.pl};` : "")}
  ${(props) => (props.pr ? `padding-right:${props.pr};` : "")}
  ${(props) => (props.pb ? `padding-bottom:${props.pb};` : "")}
  ${(props) => (props.pt ? `padding-top:${props.pt};` : "")}

  ${(props) =>
    props.pv ? `padding-top:${props.pv};padding-bottom:${props.pv};` : ""}
  ${(props) =>
    props.ph ? `padding-left:${props.ph};padding-right:${props.ph};` : ""}

  ${(props) => (props.flex ? `display: flex;` : "")}
  ${(props) => (props.f ? `flex: ${props.f};` : "")}
  ${(props) => (props.fwrap ? `flex-wrap: wrap;` : "")}
  ${(props) => (props.between ? "justify-content: space-between;" : "")}
  ${(props) => (props.jend ? "justify-content: flex-end;" : "")}
  ${(props) => (props.around ? "justify-content: space-around;" : "")}
  ${(props) => (props.evenly ? "justify-content: space-evenly;" : "")}
  ${(props) => (props.jcenter ? "justify-content: center;" : "")}
  ${(props) => (props.center ? "align-items: center;" : "")}
  ${(props) => (props.col ? " flex-direction: column;" : "")}

  ${(props) => (props.minh ? `min-height:${props.minh};` : ``)}
  ${(props) => (props.noSelect ? `user-select: none; ;` : ``)}
  ${(props) => (props.overflow ? `overflow: ${props.overflow}; ;` : ``)}
  ${(props) => (props.overflowX ? `overflow-x: ${props.overflowX}; ;` : ``)}
  ${(props) => (props.overflowY ? `overflow-y: ${props.overflowY}; ;` : ``)}
  ${(props) => (props.tcenter ? "text-align: center;" : "")}
    ${(props) => (props.tjustify ? "text-align: justify;" : "")}
    ${(props) => (props.weight ? `font-weight: ${props.weight};` : "")}
    ${(props) => (props.font ? `font-size: ${props.font};` : "")}
    ${(props) => (props.bbox ? `box-sizing: ${props.bbox};` : "")}

  
  ${(props) =>
    props.styledbg
      ? `
        background-size: cover;
        background-position: top;
        background-image: url(${props.styledbg});`
      : ""};
  ${(props) => (props.display ? `display: ${props.display};` : "")}


  &.ellipsis {
    display: block;
    display: -webkit-box;
    max-width: 100%;
    max-height: 95px;
    margin: 0 auto;
    font-size: 14px;
    line-height: 1;
    -webkit-line-clamp: 7;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &.searchDiv {
    
    @media ${device.base} {
      & div {
        width:100%;
      }
    }
    @media ${device.mobileUI} {
      & div {
        &:first-child {
          width: 50%;
        }
        &:last-child {
          width: initial;
        }
      }
    }
  }
  & .intense {
    color: #5829dd;
    font-size: 1.2rem;
    font-weight: bold;
  }
  &.cardPrice {
    padding: 8px 15px;
    background-color: white;
    border-radius: 4px;
    font-size: 2.25rem;
    color: #5829dd;
    border: solid 1px #dddddd;
    &.noBorder {
      border: none;
    }
  }
  &.bank {
    background-color: #e9e9e9;
    border-radius: 4px;
    border: solid 1px #dddddd;
    @media ${device.base} {
      flex-wrap: wrap;
      .column {
        width: 100%;
        &:not(:last-child) {
          border-bottom: solid 1px #ddd;
        }
      }
    }
    @media ${device.tablet} {
      width: initial;
      flex-wrap: initial;
      .column:not(:last-child) {
        .cell {
          border-right: solid 1px #ddd;
        }
      }
      .cell {
        white-space: nowrap;
      }
    }
    .label {
      border-bottom: solid 1px #ddd;
    }
    .cell {
      padding: 8px 15px;
      text-align: left;
    }
    .label {
      .cell {
        font-weight: bold;
      }
    }
  }
  .dots {
    display: flex;
    justify-content: center;
    opacity: 1;
    width: 100%;
    &__bullet {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 10px;
      overflow: hidden !important;
      width: 10px;
      height: 10px;
      cursor: pointer;
      border-radius: 50%;
      background-color: #ffffff59;
      will-change: background-color;
      &--selected {
        pointer-events: none;
        background-color: #ffdd00 !important;
        transition: background-color 0.4s,
          width 4s cubic-bezier(0.19, 1, 0.22, 1) !important;
      }
      &:hover {
        background-color: #ffdd00 !important;
        transition: background-color 0.4s,
          width 4s cubic-bezier(0.19, 1, 0.22, 1) !important;
      }
    }
  }
  }

  .card {
    width: 90%;
    box-sizing: border-box;
    margin: auto;
    color: rgb(255, 255, 255);
    opacity: 0.3;
    background-color: rgb(35, 35, 35);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    max-height: 270px;
    &.large {
      max-height: 350px;
    }
    overflow: hidden;
    box-shadow:  0 0px 1px 2px rgba(0,0,0,.2);
    will-change: opacity;
    transition: 0.5s;
    &.selected {
      opacity: 1;
      box-shadow: 1px 0px 6px rgba(0,0,0,.2);
    }
    &.white {
      background-color: #fff;
      border: solid 1px #ebebeb;
      
      opacity: 0.7;
      &.selected {
        opacity: 1;
      }
    }
    &.primary {
      background-color: #5829dd;
    }
  }

  &.slideshow {
    position: relative;
    background-color: #232323;
    &.bordered {
        border-bottom: solid 4px #ffdd00;
      }
    @media ${device.base} {
      height: 40vh;
    }
    @media ${device.tablet} {
      height: 60vh;
    }
    .h-100, .react-swipeable-view-container {
      height: 100% ;
    }
    .p-r {
      position: relative;
    }
    .slide-content {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
      color: #fff;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.5s ease 0.3s;
      will-change: opacity, translateY;
      opacity: 0;
      transform: translateY(40px);
      &.active {
        opacity: 1;
        transform: translateY(0%);
      }
      .caption { 
        @media ${device.base} {
      }   padding: 0 1rem;
      @media ${device.tablet} {
        padding: 0 100px;
      }
      @media ${device.laptop} {
      }
     
        &.full {
          width: 100%;
          text-align: left;
        }
        .classes {
          .title {
            font-size: calc( 20px + (55 - 20) * (100vw - 200px) / (2400 - 200));
          }
          .description {
            font-size: calc( 12px + (24 - 12) * (100vw - 200px) / (2400 - 200));
          }
        }

        
        .big {
          width: 25vw;
          .title {
            font-size: calc( 16px + (300 - 16) * (100vw - 200px) / (2400 - 200));
            line-height: calc( 16px + (300 - 12) * (100vw - 200px) / (2400 - 200));
          }
          .subtitle {
            font-size: calc( 12px + (24 - 12) * (100vw - 200px) / (2400 - 200));
            .primary {
              font-size: calc( 12px + (60 - 16) * (100vw - 200px) / (2400 - 200));
              color: #ffdd00;
              display: block;
            }
          }
        }
        .info {
          width: 35vw;
          font-size: calc( 12px + (24 - 12) * (100vw - 200px) / (2400 - 200));
          .link {
             color: #ffdd00;
             text-decoration: underline;
             text-decoration-color: #ffdd00;
             display: block;
             cursor: pointer;
          }
        }
      }
    }
    .image {
      width: 100%;
      object-fit: cover;
      height: 100%;
      &--container {
        position: absolute;
        overflow: hidden;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-position: center;
        z-index: 1;
        background-size: cover;
        &:not(.clear)::before { 
          content: "";
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.5);
        }
        &.clear::before { 
          content: "";
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.5) 33%, rgba(0,0,0,0) 100%);
        }
      }
    }
  }
`;
export const StyledDivAuth = styled.div`
  display: flex;
  @media ${device.base} {
    flex-direction: column;
    > div:nth-child(1) {
      order: 2;
      margin-top: 2rem;
      margin-bottom: 2rem;
    }
    > div:nth-child(2) {
      order: 1;
      background-size: cover;
      background-position: top;
      ${(props) =>
        props.mobileStyledbg
          ? `background-image: url(${props.mobileStyledbg});`
          : ""};
      width: 100%;
      height: 30vh;
    }
    div.container {
      padding-left: 1.55rem;
      padding-right: 1.55rem;
    }
  }
  }
  @media ${device.tablet} {

    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    position: relative;
    div.container {
      padding-left: 2rem;
      padding-right: 2rem;
    }
    > div:nth-child(1) {
      order: 1;
      width: 60%;
    }
    > div:nth-child(2) {
      order: 2;
      background-size: cover;
      background-position: center;
      ${(props) =>
        props.styledbg ? `background-image: url(${props.styledbg});` : ""};
      min-height: 500px;
      width: 40%;
      ${(props) => (props.mainSize ? `height: ${props.mainSize};` : "")};
    }
  }
  @media ${device.laptop} {
    > div:nth-child(1) {
      width: calc(80% - 308px) !important;
      margin-left: auto;
      margin-right: auto;
    }
    > div:nth-child(2) {
      width: 308px !important;
    }
  }
  @media ${device.laptopUI} {
    > div:nth-child(1) {
      width: 600px !important;
      margin-right: 150px;
    }
    > div:nth-child(2) {
      ${(props) => (props.bgw ? `width: ${props.bgw}px !important;` : "")};
    }
  }
`;

export const StyledFullPageLoader = styled.div`
  position: fixed;
  pointer-events: none;
  background-color: #232323;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  opacity: 0;
  transition: 0.5s;
  will-change: opacity;
  &.active {
    opacity: 1;
  }

  .content {
    max-width: 80vw;
    width: 100%;
    text-align: center;
    position: absolute;
    left: calc(10vw);
    top: calc(50% - 100px);
    h1 {
      letter-spacing: 0.15rem;
    }
    figure {
      display: block;
    }
  }
`;
