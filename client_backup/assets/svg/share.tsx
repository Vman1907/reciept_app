import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */
const Edit = (props: SvgProps) => (
  <Svg
    fill="#000000"
    width="24px"
    height="24px"
    viewBox="0 0 15.36 15.36"
    {...props}>
    <Path d="M11.55 13.92q-0.84 0 -1.38 -0.57 -0.57 -0.57 -0.57 -1.38 0 -0.27 0.03 -0.33l-4.5 -2.55q-0.51 0.51 -1.26 0.51 -0.81 0 -1.38 -0.57t-0.57 -1.38q0 -0.78 0.57 -1.32 0.57 -0.57 1.38 -0.57 0.75 0 1.26 0.51l4.5 -2.52q-0.03 -0.09 -0.03 -0.42 0 -0.78 0.57 -1.32 0.54 -0.57 1.35 -0.57 0.78 0 1.35 0.57 0.54 0.54 0.57 1.32 0 0.81 -0.57 1.38t-1.35 0.57q-0.69 0 -1.29 -0.51l-4.5 2.55q0.03 0.06 0.03 0.33 0 0.3 -0.03 0.39l4.5 2.55q0.6 -0.51 1.32 -0.51 0.9 0 1.38 0.57t0.48 1.35 -0.48 1.35 -1.38 0.57" />
  </Svg>
);
export default Edit;
