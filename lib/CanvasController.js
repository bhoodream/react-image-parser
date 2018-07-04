'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CanvasController = function (_PureComponent) {
    _inherits(CanvasController, _PureComponent);

    function CanvasController() {
        _classCallCheck(this, CanvasController);

        return _possibleConstructorReturn(this, (CanvasController.__proto__ || Object.getPrototypeOf(CanvasController)).apply(this, arguments));
    }

    _createClass(CanvasController, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.getImageData();
        }
    }, {
        key: 'getCanvasSideSizes',
        value: function getCanvasSideSizes(imgElem) {
            var sideSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Math.max(imgElem.naturalWidth, imgElem.naturalHeight);
            var width = imgElem.naturalWidth,
                height = imgElem.naturalHeight;

            var widthIsBigger = width > height;

            return {
                width: widthIsBigger ? sideSize : sideSize * (width / height),
                height: widthIsBigger ? sideSize * (height / width) : sideSize
            };
        }
    }, {
        key: 'getImageData',
        value: function getImageData() {
            if (!this.props.imgElem) {
                console.error('CanvasController: no imgElem!');

                return;
            }

            if (this.props.sideSize <= 0) {
                console.error('CanvasController: sideSize can\'t be lower or equal to zero!');

                return;
            }

            var _props = this.props,
                imgElem = _props.imgElem,
                sideSize = _props.sideSize,
                onImageData = _props.onImageData;

            var _getCanvasSideSizes = this.getCanvasSideSizes(imgElem, sideSize),
                width = _getCanvasSideSizes.width,
                height = _getCanvasSideSizes.height;

            var ctx = this.canvas.getContext("2d");
            var imageData = [];

            this.canvas = Object.assign(this.canvas, { width: width, height: height });

            ctx.clearRect(0, 0, width, height);
            ctx.drawImage(imgElem, 0, 0, width, height);

            try {
                imageData = ctx.getImageData(0, 0, width, height).data;
            } catch (e) {
                console.error('CanvasController: catch error on getImageData!', e);
            }

            onImageData(imageData);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement('canvas', {
                ref: function ref(canvas) {
                    return _this2.canvas = canvas;
                }
            });
        }
    }]);

    return CanvasController;
}(_react.PureComponent);

CanvasController.propTypes = {
    sideSize: _propTypes2.default.number,
    imgElem: _propTypes2.default.instanceOf(Element).isRequired,
    onImageData: _propTypes2.default.func
};
CanvasController.defaultProps = {
    imgElem: null,
    onImageData: function onImageData() {}
};
exports.default = CanvasController;