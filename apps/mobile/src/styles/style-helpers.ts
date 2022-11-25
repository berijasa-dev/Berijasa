import { Dimensions, PixelRatio } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";

const SCREEN_HEIGHT = Dimensions.get("screen").height;
const SCREEN_WIDTH = Dimensions.get("screen").width;

const sh = (numberInFigma: number) => {
    return hp((numberInFigma * 100) / 970);
};

const sw = (numberInFigma: number) => {
    return wp((numberInFigma * 100) / 375);
};

const sfont = (numberInFigma: number) => {
    return RFValue(numberInFigma, 640) / PixelRatio.getFontScale();
};

export { sh, sw, sfont };
