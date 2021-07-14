import React, { useState } from "react";
import FlipCard from "react-png-flipcard";
import classnames from "classnames";
import { StyledDiv } from "../helpers/styled";

const FlipComponent = (props) => {
  const {
    front,
    back,
    manual = false,
    margin = 20,
    width = 300,
    height = 300,
    radius = 50,
    backClass,
    frontClass,
    selected,
    styledbg,
  } = props;
  const [flip, setFlip] = useState(false);
  return (
    <FlipCard
      front={
        <StyledDiv
          h={"100%"}
          styledbg={styledbg}
          className={classnames("card", { selected })}
          onClick={() => setFlip(true)}
        >
          {front}
        </StyledDiv>
      }
      back={
        <StyledDiv h={"100%"} className={classnames("card", { selected })}>
          {back}
        </StyledDiv>
      }
      backClass={backClass}
      frontClass={frontClass}
      margin={parseInt(margin)}
      width={width}
      height={height}
      borderRadius={radius}
      direction="horizontal"
      manual={manual}
      flip={flip}
    />
  );
};
export default FlipComponent;
