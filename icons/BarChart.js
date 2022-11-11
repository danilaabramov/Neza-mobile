import * as React from "react"
import Svg, { Path } from "react-native-svg"

const BarChart = () => (
  <Svg width={30} height={24} fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.973 7c0-2.761 2.658-5 5.938-5h11.877c3.28 0 5.939 2.239 5.939 5v10c0 2.761-2.659 5-5.939 5H8.911c-3.28 0-5.938-2.239-5.938-5V7ZM8.91 4C6.943 4 5.348 5.343 5.348 7v10c0 1.657 1.595 3 3.563 3h11.877c1.968 0 3.563-1.343 3.563-3V7c0-1.657-1.595-3-3.563-3H8.911Z"
      fill="#2D5687"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.099 10c.656 0 1.188.448 1.188 1v5c0 .552-.532 1-1.188 1-.656 0-1.188-.448-1.188-1v-5c0-.552.532-1 1.188-1ZM19.6 12c.656 0 1.188.448 1.188 1v3c0 .552-.532 1-1.187 1-.656 0-1.188-.448-1.188-1v-3c0-.552.532-1 1.188-1ZM14.85 7c.656 0 1.187.448 1.187 1v8c0 .552-.531 1-1.187 1s-1.188-.448-1.188-1V8c0-.552.532-1 1.188-1Z"
      fill="#2D5687"
    />
  </Svg>
)

export default BarChart
