import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
const SVGComponent = (props: SvgProps) => (
  <Svg
    width="20px"
    height="20px"
    viewBox="0 0 0.72 0.72"
    fill="none"
    {...props}>
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.06}
      d="M0.24 0.21h0.24m-0.24 0.12h0.24m-0.24 0.12h0.12m0.24 0.18V0.15a0.06 0.06 0 0 0 -0.06 -0.06H0.18a0.06 0.06 0 0 0 -0.06 0.06v0.48l0.075 -0.06 0.09 0.06 0.075 -0.06 0.075 0.06 0.09 -0.06z"
    />
  </Svg>
);
export default SVGComponent;
