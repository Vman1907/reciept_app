import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
const SVGComponent = (props: SvgProps) => (
  <Svg
    width="20px"
    height="20px"
    viewBox="0 0 0.45 0.45"
    fill="none"
    {...props}>
    <Path
      d="m0.435 0.435 -0.12 -0.12m-0.12 0.06a0.18 0.18 0 1 1 0 -0.36 0.18 0.18 0 0 1 0 0.36Z"
      strokeWidth={0.03}
    />
  </Svg>
);
export default SVGComponent;
