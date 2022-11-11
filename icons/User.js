import * as React from "react"
import Svg, { Path } from "react-native-svg"

const User = ({color}) => (
  <Svg width={25} height={24} fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.5 19a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5 3 3 0 0 1-3 3h-10a3 3 0 0 1-3-3Zm5-3a3 3 0 0 0-3 3 1 1 0 0 0 1 1h10a1 1 0 0 0 1-1 3 3 0 0 0-3-3h-6ZM12.5 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z"
      fill={color}
    />
  </Svg>
)

export default User
