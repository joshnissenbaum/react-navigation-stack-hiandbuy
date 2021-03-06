"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _BorderlessButton = _interopRequireDefault(require("./BorderlessButton"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const ANDROID_VERSION_LOLLIPOP = 21;

class TouchableItem extends React.Component {
  render() {
    /*
     * TouchableNativeFeedback.Ripple causes a crash on old Android versions,
     * therefore only enable it on Android Lollipop and above.
     *
     * All touchables on Android should have the ripple effect according to
     * platform design guidelines.
     * We need to pass the background prop to specify a borderless ripple effect.
     */
    if (_reactNative.Platform.OS === 'android' && _reactNative.Platform.Version >= ANDROID_VERSION_LOLLIPOP) {
      const _this$props = this.props,
            {
        style,
        pressColor,
        borderless,
        children
      } = _this$props,
            rest = _objectWithoutProperties(_this$props, ["style", "pressColor", "borderless", "children"]);

      return /*#__PURE__*/React.createElement(_reactNative.TouchableNativeFeedback, _extends({}, rest, {
        useForeground: _reactNative.TouchableNativeFeedback.canUseNativeForeground(),
        background: _reactNative.TouchableNativeFeedback.Ripple(pressColor, borderless)
      }), /*#__PURE__*/React.createElement(_reactNative.View, {
        style: style
      }, React.Children.only(children)));
    } else if (_reactNative.Platform.OS === 'ios') {
      return /*#__PURE__*/React.createElement(_BorderlessButton.default, _extends({
        hitSlop: {
          top: 10,
          bottom: 10,
          right: 10,
          left: 10
        },
        disallowInterruption: true,
        enabled: !this.props.disabled
      }, this.props), this.props.children);
    } else {
      return /*#__PURE__*/React.createElement(_reactNative.TouchableOpacity, this.props, this.props.children);
    }
  }

}

exports.default = TouchableItem;

_defineProperty(TouchableItem, "defaultProps", {
  borderless: false,
  pressColor: 'rgba(0, 0, 0, .32)'
});
//# sourceMappingURL=TouchableItem.js.map