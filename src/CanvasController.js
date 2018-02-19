import React, { PureComponent } from 'react';
import pt from 'prop-types';

class CanvasController extends PureComponent {
    static propTypes = {
        sideSize: pt.number,
        imgElem: pt.instanceOf(Element).isRequired,
        onImageData: pt.func
    };

    static defaultProps = {
        imgElem: null,
        onImageData: () => {}
    };

    componentDidMount() {
        this.getImageData();
    }

    getCanvasSideSizes(imgElem, sideSize = Math.max(imgElem.naturalWidth, imgElem.naturalHeight)) {
        const { naturalWidth: width, naturalHeight: height } = imgElem;
        const widthIsBigger = width > height;

        return {
            width: widthIsBigger ? sideSize : sideSize * (width / height),
            height: widthIsBigger ? sideSize * (height / width) : sideSize
        };
    }

    getImageData() {
        if (!this.props.imgElem) {
            console.error('CanvasController: no imgElem!');

            return;
        }

        if (this.props.sideSize <= 0) {
            console.error('CanvasController: sideSize can\'t be lower or equal to zero!');

            return;
        }

        const {
            imgElem,
            sideSize,
            onImageData
        } = this.props;
        const { width, height } = this.getCanvasSideSizes(imgElem, sideSize);
        const ctx = this.canvas.getContext("2d");
        let imageData = [];

        this.canvas = Object.assign(this.canvas, { width, height });

        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(imgElem, 0, 0, width, height);

        try {
            imageData = ctx.getImageData(0, 0, width, height).data;
        } catch (e) {
            console.error('CanvasController: catch error on getImageData!', e);
        }

        onImageData(imageData);
    }

    render() {
        return <canvas
            ref={canvas => this.canvas = canvas}
        />;
    }
}

export default CanvasController;