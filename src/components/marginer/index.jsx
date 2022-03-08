import React from "react";
import styled from "styled-components";

const MarginHorizontal = styled.span`
  display: flex;
  width: ${({ margin }) =>
        typeof margin === "string" ? margin : `${margin}px`};
`;

const MarginVertical = styled.span`
  display: flex;
  height: ${({ margin }) =>
        typeof margin === "string" ? margin : `${margin}px`};
`;

function Marginer(props) {
    const { direction } = props;

    if (direction === "horizontal") return <MarginHorizontal {...props} />;
    else {
        return <MarginVertical {...props} />;
    }
}

Marginer.defaultProps = {
    direction: "horizontal",
};

export { Marginer };