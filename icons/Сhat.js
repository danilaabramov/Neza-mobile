import * as React from "react"
import Svg, { G, Path, Defs } from "react-native-svg"

const Chat = ({color}) => (
  <Svg width={28} height={30} fill="none" xmlns="http://www.w3.org/2000/svg">
    <G filter="url(#a)" stroke={color}>
      <Path
        d="M14 21a9 9 0 1 0-7.403-3.88c.105.15.126.345.048.512l-1.218 2.62a.5.5 0 0 0 .435.748H14Z"
        strokeWidth={2}
      />
      <Path
        d="M10 13.15a1.15 1.15 0 1 0 0-2.3 1.15 1.15 0 0 0 0 2.3ZM18 13.15a1.15 1.15 0 1 0 0-2.3 1.15 1.15 0 0 0 0 2.3ZM14 13.15a1.15 1.15 0 1 0 0-2.3 1.15 1.15 0 0 0 0 2.3Z"
        fill={color}
        strokeWidth={0.3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs></Defs>
  </Svg>
)

export default Chat
