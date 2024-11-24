import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const SVGComponent = (props: SvgProps) => (
  <Svg
    width="24px"
    height="24px"
    viewBox="0 0 0.72 0.72"
    fill="none"
    {...props}>
    <Path
      d="M0.489 0.069a0.03 0.03 0 0 1 0.042 0l0.12 0.12a0.03 0.03 0 0 1 0 0.042l-0.39 0.39A0.03 0.03 0 0 1 0.24 0.63H0.12a0.03 0.03 0 0 1 -0.03 -0.03v-0.12a0.03 0.03 0 0 1 0.009 -0.021l0.3 -0.3zM0.42 0.222l-0.27 0.27V0.57h0.078l0.27 -0.27zm0.12 0.035L0.588 0.21 0.51 0.132 0.462 0.18z"
      fill="#0D0D0D"
    />
  </Svg>
);
export default SVGComponent;
