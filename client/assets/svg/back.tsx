import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
const SVGComponent = (props: SvgProps) => (
  <Svg
    width={props.height ? props.height : '40px'}
    height={props.width ? props.width : '40px'}
    viewBox="0 0 0.96 0.96"
    fill="none"
    {...props}>
    <Path
      stroke="#000000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.08}
      d="m0.56 0.28 -0.2 0.2 0.2 0.2"
    />
  </Svg>
);
export default SVGComponent;
