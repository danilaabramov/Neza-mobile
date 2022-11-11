import * as React from "react"
import Svg, { Path } from "react-native-svg"

const Menu = ({color}) => (
  <Svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M21 18.874v-8.008c0-.984-.427-1.913-1.158-2.517l-5.386-4.453a3.814 3.814 0 0 0-4.912 0L4.158 8.349C3.428 8.953 3 9.882 3 10.866v8.008C3 20.048 3.895 21 5 21h2a2 2 0 0 0 2-2v-3.315c0-1.174.895-2.126 2-2.126h2c1.105 0 2 .952 2 2.126V19a2 2 0 0 0 2 2h2c1.105 0 2-.952 2-2.126Z"
      stroke={color}
      strokeWidth={2}
    />
  </Svg>
)

export default Menu
