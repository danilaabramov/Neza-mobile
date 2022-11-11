import { Dimensions, PixelRatio, Platform } from "react-native";

const { width } = Dimensions.get("window");

const scale = width / 320;

export default function normalize(size) {
  const newSize = size * scale;
  if (Platform.OS === "ios") return Math.round(PixelRatio.roundToNearestPixel(newSize));
  else return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
}
