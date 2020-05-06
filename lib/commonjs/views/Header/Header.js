"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNavigation = require("react-navigation");

var _HeaderSegment = _interopRequireDefault(require("./HeaderSegment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

class Header extends React.PureComponent {
  render() {
    const {
      scene,
      previous,
      layout,
      insets,
      navigation,
      styleInterpolator
    } = this.props;
    const {
      options
    } = scene.descriptor;
    const title = typeof options.headerTitle !== 'function' && options.headerTitle !== undefined ? options.headerTitle : options.title !== undefined ? options.title : scene.route.routeName;
    let leftLabel; // The label for the left back button shows the title of the previous screen
    // If a custom label is specified, we use it, otherwise use previous screen's title

    if (options.headerBackTitle !== undefined) {
      leftLabel = options.headerBackTitle;
    } else if (previous) {
      const o = previous.descriptor.options;
      leftLabel = typeof o.headerTitle !== 'function' && typeof o.headerTitle === 'string' ? o.headerTitle : o.title !== undefined ? o.title : previous.route.routeName;
    }

    return /*#__PURE__*/React.createElement(_HeaderSegment.default, _extends({}, options, {
      layout: layout,
      insets: insets,
      scene: scene,
      title: title,
      leftLabel: leftLabel,
      onGoBack: previous ? () => // @ts-ignore
      navigation.dispatch(_reactNavigation.StackActions.pop({
        key: scene.route.key
      })) : undefined,
      styleInterpolator: styleInterpolator
    }));
  }

}

exports.default = Header;
//# sourceMappingURL=Header.js.map