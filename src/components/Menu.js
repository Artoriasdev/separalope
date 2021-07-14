import React, { useState, useRef } from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import classnames from "classnames";
import {
  StyledNavItems,
  StyledNavButton,
  StyledSubMenu,
  StyledSubMenuItems,
  StyledHr,
  StyledDiv,
  StyledSubMenuTitle,
} from "../helpers/styled";

const Menu = (props) => {
  console.log("aacaaa llegooo");
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const handleOpen = () => setOpen((prevOpen) => !prevOpen);

  const handleClose = (event) => {
    if (menuRef.current && menuRef.current.contains(event.target)) return;
    if (open) setOpen(false);
    return;
  };

  const handleAction = (handleClick) => {
    handleClick();
    if (open) setOpen(false);
    return;
  };

  const {
    w,
    position,
    hideMobile,
    showMobile,
    title,
    sections,
    pathname,
    activePath,
    attr: { type, left, move = false },
  } = props;

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <StyledNavItems
        w={w}
        position={position}
        hideMobile={hideMobile}
        showMobile={showMobile}
      >
        <StyledNavButton
          className={classnames({
            [type]: type,
            open: open,
            move: open && move,
            active: pathname === activePath,
          })}
          onClick={handleOpen}
          ref={menuRef}
        >
          {title}
        </StyledNavButton>
        <StyledSubMenu left={left} open={open}>
          {sections.map(({ tag, title, actions, attr: { user } }, index) => (
            <StyledDiv key={`${tag}${index}`}>
              {title && (
                <StyledSubMenuTitle user={user}>{title}</StyledSubMenuTitle>
              )}
              {actions.map(
                (
                  { tag, title, handleClick, attr: { jleft } },
                  index,
                  { length }
                ) => (
                  <StyledSubMenuItems key={`${tag}${index}`}>
                    <StyledNavButton
                      jleft={jleft}
                      onClick={handleAction.bind(this, handleClick)}
                    >
                      {title}
                    </StyledNavButton>
                    {length - 1 !== index && <StyledHr />}
                  </StyledSubMenuItems>
                )
              )}
            </StyledDiv>
          ))}
        </StyledSubMenu>
      </StyledNavItems>
    </ClickAwayListener>
  );
};
export default Menu;
