import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
const SVGComponent = (props: SvgProps) => (
  <Svg
    width="24px"
    height="24px"
    viewBox="0 0 0.48 0.48"
    fill="none"
    {...props}>
    <Path
      fill="#000000"
      fillRule="evenodd"
      d="M0.24 0a0.24 0.24 0 1 0 0 0.48A0.24 0.24 0 0 0 0.24 0m0 0.045v0.39a0.195 0.195 0 1 0 0 -0.39"
      clipRule="evenodd"
    />
  </Svg>
);
export default SVGComponent;
