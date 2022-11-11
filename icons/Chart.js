import * as React from "react"
import Svg, { Path } from "react-native-svg"

const Chart = ({color}) => (
  <Svg width={25} height={24} fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M3.5 7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4h-10a4 4 0 0 1-4-4V7Z"
      stroke={color}
      strokeWidth={2}
    />
    <Path
      d="M8.5 14v2M16.5 8v8M12.5 11v5"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
)

export default Chart
