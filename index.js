import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import CanvasController from './src/CanvasController';
import sortColors from './src/sortColors';

import {
    COLOR_ALPHA_MAX,
    COLOR_ALPHA_PRECISION,
    COLOR_DIFFERENCE_DEFAULT,
    SORT_TYPE_COUNT,
    SORT_DIR_DESC,
    COLOR_VAL_MAX,
    CANVAS_SIDE_DEFAULT
} from "./src/Const";

class ReactImageParser extends PureComponent {
    static propTypes = {
        img: PropTypes.string.isRequired,
        onColorsParsed: PropTypes.func,
        minColorAlpha: PropTypes.number,
        colorAlphaPrecision: PropTypes.number,
        colorDifference: PropTypes.number,
        sortType: PropTypes.string,
        maxImgSideSize: PropTypes.number
    };

    static defaultProps = {
        img: '',
        onColorsParsed: null,
        minColorAlpha: COLOR_ALPHA_MAX,
        colorAlphaPrecision:COLOR_ALPHA_PRECISION,
        colorDifference: COLOR_DIFFERENCE_DEFAULT,
        sortType: SORT_TYPE_COUNT,
        sortDir: SORT_DIR_DESC,
        maxImgSideSize: CANVAS_SIDE_DEFAULT
    };

    constructor(...args) {
        super(...args);

        const {img} = this.props;

        this.state = {
            img
        };

        this.onImgLoad = this.onImgLoad.bind(this);
        this.parseColorsFromData = this.parseColorsFromData.bind(this);
    }

    parseColorsFromData(data = []) {
        const {
            minColorAlpha,
            colorAlphaPrecision,
            colorDifference,
            sortType,
            sortDir,
            onColorsParsed
        } = this.props;
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
    }

    onImgLoad(e) {
        const imgElem = e.target;

        this.setState({
            imgElem
        });
    }

    render() {
        const {
            maxImgSideSize,
            onColorsParsed
        } = this.props;
        const {
            img,
            imgElem
        } = this.state;

        const shouldParseColors = typeof onColorsParsed === 'function';

        return (
            <div style={{display: 'none'}}>
                {shouldParseColors && imgElem && <CanvasController
                    imgElem={imgElem}
                    sideSize={maxImgSideSize}
                    onImageData={this.parseColorsFromData}
                />}
                {!imgElem && img && <img
                    src={img}
                    alt={'ParseImageColorsController img'}
                    onLoad={this.onImgLoad}
                />}
            </div>
        );
    }
}

export default ReactImageParser;