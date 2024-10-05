import * as React from 'react';
import Svg, {SvgProps, Path, Circle} from 'react-native-svg';
const SVGComponent = (props: SvgProps) => (
  <Svg
    width={20}
    height={20}
    viewBox="0 0 24 24"
    fill="none"
    stroke="#000000"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}>
    <Path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <Circle cx={12} cy={7} r={4} />
  </Svg>
);
export default SVGComponent;
