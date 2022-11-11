import type { Node } from "@types/react";
import { useColorScheme } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

export const blackTheme = {
  background: '#0D0D0D',
  backgroundItem: '#1D1D1D',
  color: '#EDEDED',
  topBar: '#0D0D0D',
  bottomBar: '#0D0D0D',
  foreground: '#333',
  backgroundActive: '#EDEDED',
  colorActive: '#1D1D1D'
}

export const purpleTheme = {
  backgroundGradien: ["#2D1A7A", "rgba(57, 30, 77, 0.632023)", "rgba(110, 48, 112, 0.5)", "rgba(89, 36, 109, 0.697765)", "#4F347C", "#87528F"],
  background: 'transparent',
  backgroundItem: '#FFFFFF',
  color: '#1D1D1D',
  topGradient: ["#361F49", "#2B0348"],
  topBar: 'transparent',
  bottomBar: '#472D5B',
  foreground: '#aaa',
  // backgroundActive: '#0D0D0D',
  // colorActive: '#FFFFFF'
  backgroundActive: '#EDEDED',
  colorActive: '#1D1D1D'
}
