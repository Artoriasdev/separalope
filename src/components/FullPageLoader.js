import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import classnames from "classnames";
import {
  StyledFullPageLoader,
  StyledFigure,
  StyledTitle,
  StyledDiv,
  StyledSpan,
} from "../helpers/styled";
import { IsotypeSVG } from "../assets/images/svg";

const FullPageLoader = ({ children }) => {
  const { loading } = useSelector((state) => state.app);

  const [load, setLoad] = useState(true);

  useEffect(() => {
    setLoad(loading);
  }, [loading]);
  return (
    <>
      <StyledFullPageLoader className={classnames({ active: load })}>
        <StyledDiv className="content">
          <StyledFigure flex center w="100px" h="100px">
            <IsotypeSVG />
          </StyledFigure>
          <StyledTitle family="Run" color="#fff" mt="1rem">
            enmicasa.pe
          </StyledTitle>
          <StyledDiv mt="1rem">
            <StyledSpan color="#FFDD00" font="1.15rem" weight="bold">
              ¡Somos 100% digitales vía Zoom!
            </StyledSpan>
          </StyledDiv>
        </StyledDiv>
      </StyledFullPageLoader>
      {children}
    </>
  );
};
export default FullPageLoader;
