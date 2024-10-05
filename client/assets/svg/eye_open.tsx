import * as React from 'react';
import Svg, {Path, Rect, SvgProps} from 'react-native-svg';
const SVGComponent = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}>
    <Path
      d="M12 5C5 5 2 12 2 12C2 12 5 19 12 19C19 19 22 12 22 12C22 12 19 5 12 5Z"
      stroke="#A09CAB"
      strokeWidth={2}
      strokeLinecap="round"
    />
    <Rect
      x={9}
      y={9}
      width={6}
      height={6}
      rx={3}
      stroke="#A09CAB"
      strokeWidth={2}
    />
  </Svg>
);
export default SVGComponent;
