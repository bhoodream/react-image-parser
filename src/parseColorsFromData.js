import sortColors from "./sortColors";
import {COLOR_VAL_MAX} from "./Const";

export default (props, data = []) => {
    const {
        minColorAlpha,
        colorAlphaPrecision,
        colorDifference,
        sortType,
        sortDir,
        onColorsParsed
    } = props;
    const dataLen = data.length;
    const rgbaKeyArrMirror = {};
    const rgbaKeyArr = [];
    const red = 0, green = 1, blue = 2, alpha = 3, colorStep = 4;

    for (let i = 0; i < dataLen; i += colorStep) {
        const dataAlpha = Math.round(
            (data[i + alpha] / COLOR_VAL_MAX) * colorAlphaPrecision
        ) / colorAlphaPrecision;
        const isAlphaOk =
            dataAlpha > 0
            && dataAlpha >= minColorAlpha;

        if (isAlphaOk) {
            const rgbaKey = [
                data[i + red],
                data[i + green],
                data[i + blue],
                dataAlpha
            ].join(',');

            if (rgbaKeyArrMirror[rgbaKey]) {
                rgbaKeyArrMirror[rgbaKey].count += 1
            } else {
                rgbaKeyArrMirror[rgbaKey] = {
                    rgbaKey,
                    alpha: dataAlpha,
                    count: 1
                };
                rgbaKeyArr.push(rgbaKeyArrMirror[rgbaKey]);
            }
        }
    }

    const sortedColors = sortColors({ sortType, sortDir }, rgbaKeyArr);
    const colors = [];
    const usedColors = [];

    sortedColors.forEach(colorItem => {
        let rgbaArr = colorItem.rgbaKey.split(',').map(Number),
            isValid = true;

        for (let l = 0; l < usedColors.length; l += 1) {
            let colorDiff = 0,
                usedRgbaArr = usedColors[l].split(',');

            for (let m = 0; m < 3; m += 1) {
                colorDiff += Math.abs(rgbaArr[m] - usedRgbaArr[m]);
            }

            if (colorDiff <= colorDifference) {
                isValid = false;

                break;
            }
        }

        if (isValid) {
            usedColors.push(colorItem.rgbaKey);
            colors.push(rgbaArr);
        }
    });

    onColorsParsed(colors);
};