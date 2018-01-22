import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import parseColorsFromData from './src/parseColorsFromData';
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
        parseColorsFromData(this.props, data);
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