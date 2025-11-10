import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const SVGComponent = (props: SvgProps) => (
  <Svg
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 20 20"
    style={{
      enableBackground: 'new 0 0 512 512',
    }}
    xmlSpace="preserve"
    width={20}
    height={20}
    {...props}>
    <Path
      style={{
        fill: '#000',
      }}
      d="M19.818 6.046a0.91 0.91 0 0 0 -1.272 -0.182L10 12.272 1.454 5.864a0.908 0.908 0 1 0 -1.09 1.454l9.092 6.818a0.9 0.9 0 0 0 0.546 0.182c0.192 0 0.384 -0.06 0.546 -0.182l9.09 -6.818a0.91 0.91 0 0 0 0.182 -1.272"
    />
  </Svg>
);
export default SVGComponent;
