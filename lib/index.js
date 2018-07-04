'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _CanvasController = require('./CanvasController');

var _CanvasController2 = _interopRequireDefault(_CanvasController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactImageParser = function (_PureComponent) {
    _inherits(ReactImageParser, _PureComponent);

    function ReactImageParser() {
        var _ref;

        _classCallCheck(this, ReactImageParser);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = ReactImageParser.__proto__ || Object.getPrototypeOf(ReactImageParser)).call.apply(_ref, [this].concat(args)));

        var img = _this.props.img;


        _this.state = {
            img: img,
            style: { display: 'none' }
        };

        _this.onImgLoad = _this.onImgLoad.bind(_this);
        _this.onImgError = _this.onImgError.bind(_this);
        _this.imageParsed = _this.imageParsed.bind(_this);
        return _this;
    }

    _createClass(ReactImageParser, [{
        key: 'imageParsed',
        value: function imageParsed() {
            var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            this.props.onImageParsed(data);
            this.setState({
                isImageParsed: true
            });
        }
    }, {
        key: 'onImgLoad',
        value: function onImgLoad(e) {
            this.setState({
                imgElem: e.target
            });
        }
    }, {
        key: 'onImgError',
        value: function onImgError(src) {
            return function () {
                return console.error('react-image-parser: error on load image "' + src + '"');
            };
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                maxImgSideSize = _props.maxImgSideSize,
                onImageParsed = _props.onImageParsed;
            var _state = this.state,
                img = _state.img,
                imgElem = _state.imgElem,
                isImageParsed = _state.isImageParsed;


            if (isImageParsed) {
                return null;
            }

            var shouldParseImage = typeof onImageParsed === 'function' && !!imgElem;

            return _react2.default.createElement(
                'div',
                { style: this.state.style },
                shouldParseImage && _react2.default.createElement(_CanvasController2.default, {
                    imgElem: imgElem,
                    sideSize: maxImgSideSize,
                    onImageData: this.imageParsed
                }),
                !imgElem && img && _react2.default.createElement('img', {
                    src: img,
                    alt: 'ParseImageColorsController img',
                    onLoad: this.onImgLoad,
                    onError: this.onImgError(img)
                })
            );
        }
    }]);

    return ReactImageParser;
}(_react.PureComponent);

ReactImageParser.propTypes = {
    img: _propTypes2.default.string.isRequired,
    maxImgSideSize: _propTypes2.default.number,
    onImageParsed: _propTypes2.default.func
};
ReactImageParser.defaultProps = {
    img: null,
    onImageParsed: function onImageParsed() {}
};
exports.default = ReactImageParser;