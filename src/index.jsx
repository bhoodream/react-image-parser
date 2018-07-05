import React, { PureComponent } from 'react';
import pt from 'prop-types';

import CanvasController from './CanvasController';

class ReactImageParser extends PureComponent {
    static propTypes = {
        img: pt.string.isRequired,
        maxImgSideSize: pt.number,
        onImageParsed: pt.func
    };

    static defaultProps = {
        img: null,
        onImageParsed: () => {}
    };

    constructor(...args) {
        super(...args);

        const { img } = this.props;

        this.state = {
            img,
            isImageParsed: false,
            style: { display: 'none' }
        };
    }

    imageParsed = (data = []) => {
        this.props.onImageParsed(data);
        this.setState({
            isImageParsed: true
        });
    };

    onImgLoad = e => {
        this.setState({
            imgElem: e.target
        });
    };

    onImgError = () =>
        console.error(`react-image-parser: error on load image "${this.state.img}"`, );

    render() {
        const {
            img,
            imgElem,
            isImageParsed
        } = this.state;
        const {
            maxImgSideSize,
            onImageParsed
        } = this.props;

        if (isImageParsed) {
            return null;
        }

        const shouldParseImage = typeof onImageParsed === 'function' && !!imgElem;

        return (
            <div style={this.state.style}>
                {shouldParseImage && <CanvasController
                    imgElem={imgElem}
                    sideSize={maxImgSideSize}
                    onImageData={this.imageParsed}
                />}
                {!imgElem && img && <img
                    src={img}
                    alt={'ParseImageColorsController img'}
                    onLoad={this.onImgLoad}
                    onError={this.onImgError}
                />}
            </div>
        );
    }
}

export default ReactImageParser;