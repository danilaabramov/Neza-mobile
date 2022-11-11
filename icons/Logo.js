import * as React from "react"
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg"

const Logo = ({size}) => (
  <Svg width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path
      d="m204.621 91.073-9.137 10.682-70.366 82.334 3.386-32.638 47.751-55.447-23.493 3.648-21.494 25.144 1.266-12.161L143.181 10l-1.099 1.282L9.099 166.855 8 168.137l31.153-4.831 9.137-10.682 70.377-82.334-18.063 174.089 1.099-1.282L234.686 87.524l1.099-1.282-31.164 4.831Z"
      stroke="url(#a)"
      strokeWidth={5.93}
      strokeMiterlimit={10}
    />
    <Path
      d="m309.988 184.781-9.082 10.547-70.035 81.196 17.975-171.707-1.105 1.264-132.336 153.445-1.105 1.275 31.001-4.776 28.35-32.861 45.873-8.083L206.454 336l1.105-1.275L339.895 181.28l1.105-1.264-31.012 4.765Zm-85.537-20.531-3.115 32.807-29.72 5.262 32.835-38.069Z"
      stroke="url(#b)"
      strokeWidth={5.93}
      strokeMiterlimit={10}
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={26.507}
        y1={159.295}
        x2={213.937}
        y2={100.098}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#AF5BE3" />
        <Stop offset={0.188} stopColor="#BB5EC4" />
        <Stop offset={0.44} stopColor="#278073" />
        <Stop offset={0.652} stopColor="#BE1DB8" />
        <Stop offset={1} stopColor="#DD54E0" />
      </LinearGradient>
      <LinearGradient
        id="b"
        x1={197.553}
        y1={153.195}
        x2={262.095}
        y2={345.912}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#DD54E0" />
        <Stop offset={0.253} stopColor="#CC229C" stopOpacity={0.747} />
        <Stop offset={0.473} stopColor="#39D3B8" stopOpacity={0.6} />
        <Stop offset={0.642} stopColor="#9765CA" />
        <Stop offset={1} stopColor="#3E60A2" stopOpacity={0.6} />
      </LinearGradient>
    </Defs>
  </Svg>
)

export default Logo
