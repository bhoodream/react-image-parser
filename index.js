import React, { PureComponent } from 'react';
import pt from 'prop-types';

import CanvasController from './src/CanvasController';

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
            style: { }
        };

        this.onImgLoad = this.onImgLoad.bind(this);
        this.onImgError = this.onImgError.bind(this);
        this.imageParsed = this.imageParsed.bind(this);
    }

    imageParsed(data = []) {
        this.props.onImageParsed(data);
        this.setState({
            isImageParsed: true
        });
    }

    onImgLoad(e) {
        this.setState({
            imgElem: e.target
        });
    }

    onImgError(src) {
        return () => console.error(`react-image-parser: error on load image "${src}"`, );
    }

    render() {
        const {
            maxImgSideSize,
            onImageParsed
        } = this.props;
        const {
            img,
            imgElem,
            isImageParsed
        } = this.state;

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
                    onError={this.onImgError(img)}
                />}
            </div>
        );
    }
}

export default ReactImageParser;