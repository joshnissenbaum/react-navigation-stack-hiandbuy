"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.getDefaultHeaderHeight = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactNativeReanimated = _interopRequireDefault(require("react-native-reanimated"));

var _HeaderTitle = _interopRequireDefault(require("./HeaderTitle"));

var _HeaderBackButton = _interopRequireDefault(require("./HeaderBackButton"));

var _HeaderBackground = _interopRequireDefault(require("./HeaderBackground"));

var _memoize = _interopRequireDefault(require("../../utils/memoize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const warnIfHeaderStylesDefined = styles => {
  Object.keys(styles).forEach(styleProp => {
    const value = styles[styleProp];

    if (styleProp === 'position' && value === 'absolute') {
      console.warn("position: 'absolute' is not supported on headerStyle. If you would like to render content under the header, use the 'headerTransparent' navigationOption.");
    } else if (value !== undefined) {
      console.warn("".concat(styleProp, " was given a value of ").concat(value, ", this has no effect on headerStyle."));
    }
  });
};

const getDefaultHeaderHeight = (layout, insets) => {
  const isLandscape = layout.width > layout.height;
  let headerHeight;

  if (_reactNative.Platform.OS === 'ios') {
    // @ts-ignore
    if (isLandscape && !_reactNative.Platform.isPad) {
      headerHeight = 32;
    } else {
      headerHeight = 44;
    }
  } else if (_reactNative.Platform.OS === 'android') {
    headerHeight = 56;
  } else {
    headerHeight = 64;
  }

  return headerHeight + (insets ? insets.top : 0);
};

exports.getDefaultHeaderHeight = getDefaultHeaderHeight;

class HeaderSegment extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {});

    _defineProperty(this, "handleTitleLayout", e => {
      const {
        height,
        width
      } = e.nativeEvent.layout;
      const {
        titleLayout
      } = this.state;

      if (titleLayout && height === titleLayout.height && width === titleLayout.width) {
        return;
      }

      this.setState({
        titleLayout: {
          height,
          width
        }
      });
    });

    _defineProperty(this, "handleLeftLabelLayout", e => {
      const {
        height,
        width
      } = e.nativeEvent.layout;
      const {
        leftLabelLayout
      } = this.state;

      if (leftLabelLayout && height === leftLabelLayout.height && width === leftLabelLayout.width) {
        return;
      }

      this.setState({
        leftLabelLayout: {
          height,
          width
        }
      });
    });

    _defineProperty(this, "getInterpolatedStyle", (0, _memoize.default)((styleInterpolator, layout, current, next, titleLayout, leftLabelLayout) => styleInterpolator({
      current: {
        progress: current
      },
      next: next && {
        progress: next
      },
      layouts: {
        screen: layout,
        title: titleLayout,
        leftLabel: leftLabelLayout
      }
    })));
  }

  render() {
    const {
      scene,
      layout,
      insets,
      title: currentTitle,
      leftLabel: previousTitle,
      onGoBack,
      headerTitle,
      headerTitleAlign = _reactNative.Platform.select({
        ios: 'center',
        default: 'left'
      }),
      headerLeft: left = onGoBack ? props => /*#__PURE__*/React.createElement(_HeaderBackButton.default, props) : undefined,
      headerTransparent,
      headerTintColor,
      headerLeftTintColor,
      headerRightTintColor,
      headerBackground,
      headerRight: right,
      headerBackImage: backImage,
      headerBackTitle: leftLabel,
      headerBackTitleVisible,
      headerTruncatedBackTitle: truncatedLabel,
      headerPressColorAndroid: pressColorAndroid,
      headerBackAllowFontScaling: backAllowFontScaling,
      headerTitleAllowFontScaling: titleAllowFontScaling,
      headerTitleStyle: customTitleStyle,
      headerBackTitleStyle: customLeftLabelStyle,
      headerLeftContainerStyle: leftContainerStyle,
      headerRightContainerStyle: rightContainerStyle,
      headerTitleContainerStyle: titleContainerStyle,
      headerStyle: customHeaderStyle,
      styleInterpolator
    } = this.props;
    const {
      titleLayout,
      leftLabelLayout
    } = this.state;
    const {
      titleStyle,
      leftButtonStyle,
      leftLabelStyle,
      rightButtonStyle,
      backgroundStyle
    } = this.getInterpolatedStyle(styleInterpolator, layout, scene.progress.current, scene.progress.next, titleLayout, previousTitle ? leftLabelLayout : undefined);
    const statusBarHeight = insets.top;

    const _ref = _reactNative.StyleSheet.flatten(customHeaderStyle || {}),
          {
      height = getDefaultHeaderHeight(layout, insets),
      minHeight,
      maxHeight,
      backgroundColor,
      borderBottomColor,
      borderBottomEndRadius,
      borderBottomLeftRadius,
      borderBottomRightRadius,
      borderBottomStartRadius,
      borderBottomWidth,
      borderColor,
      borderEndColor,
      borderEndWidth,
      borderLeftColor,
      borderLeftWidth,
      borderRadius,
      borderRightColor,
      borderRightWidth,
      borderStartColor,
      borderStartWidth,
      borderStyle,
      borderTopColor,
      borderTopEndRadius,
      borderTopLeftRadius,
      borderTopRightRadius,
      borderTopStartRadius,
      borderTopWidth,
      borderWidth,
      // @ts-ignore: web support for shadow
      boxShadow,
      elevation,
      shadowColor,
      shadowOffset,
      shadowOpacity,
      shadowRadius,
      opacity
    } = _ref,
          unsafeStyles = _objectWithoutProperties(_ref, ["height", "minHeight", "maxHeight", "backgroundColor", "borderBottomColor", "borderBottomEndRadius", "borderBottomLeftRadius", "borderBottomRightRadius", "borderBottomStartRadius", "borderBottomWidth", "borderColor", "borderEndColor", "borderEndWidth", "borderLeftColor", "borderLeftWidth", "borderRadius", "borderRightColor", "borderRightWidth", "borderStartColor", "borderStartWidth", "borderStyle", "borderTopColor", "borderTopEndRadius", "borderTopLeftRadius", "borderTopRightRadius", "borderTopStartRadius", "borderTopWidth", "borderWidth", "boxShadow", "elevation", "shadowColor", "shadowOffset", "shadowOpacity", "shadowRadius", "opacity"]);

    if (process.env.NODE_ENV !== 'production') {
      warnIfHeaderStylesDefined(unsafeStyles);
    }

    const safeStyles = {
      backgroundColor,
      borderBottomColor,
      borderBottomEndRadius,
      borderBottomLeftRadius,
      borderBottomRightRadius,
      borderBottomStartRadius,
      borderBottomWidth,
      borderColor,
      borderEndColor,
      borderEndWidth,
      borderLeftColor,
      borderLeftWidth,
      borderRadius,
      borderRightColor,
      borderRightWidth,
      borderStartColor,
      borderStartWidth,
      borderStyle,
      borderTopColor,
      borderTopEndRadius,
      borderTopLeftRadius,
      borderTopRightRadius,
      borderTopStartRadius,
      borderTopWidth,
      borderWidth,
      // @ts-ignore
      boxShadow,
      elevation,
      shadowColor,
      shadowOffset,
      shadowOpacity,
      shadowRadius,
      opacity
    }; // Setting a property to undefined triggers default style
    // So we need to filter them out
    // Users can use `null` instead

    for (const styleProp in safeStyles) {
      // @ts-ignore
      if (safeStyles[styleProp] === undefined) {
        // @ts-ignore
        delete safeStyles[styleProp];
      }
    }

    const leftButton = left !== undefined ? typeof left === 'function' ? left({
      backImage,
      pressColorAndroid,
      allowFontScaling: backAllowFontScaling,
      onPress: onGoBack,
      labelVisible: headerBackTitleVisible,
      label: leftLabel !== undefined ? leftLabel : previousTitle,
      truncatedLabel,
      labelStyle: [leftLabelStyle, customLeftLabelStyle],
      onLabelLayout: this.handleLeftLabelLayout,
      screenLayout: layout,
      titleLayout,
      tintColor: headerLeftTintColor || headerTintColor,
      canGoBack: Boolean(onGoBack)
    }) : left : null;
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_reactNativeReanimated.default.View, {
      pointerEvents: "none",
      style: [_reactNative.StyleSheet.absoluteFill, backgroundStyle]
    }, headerBackground ? typeof headerBackground === 'function' ? headerBackground() : headerBackground : headerTransparent ? null : /*#__PURE__*/React.createElement(_HeaderBackground.default, {
      style: safeStyles
    })), /*#__PURE__*/React.createElement(_reactNativeReanimated.default.View, {
      pointerEvents: "box-none",
      style: [{
        height,
        minHeight,
        maxHeight,
        opacity
      }]
    }, /*#__PURE__*/React.createElement(_reactNative.View, {
      pointerEvents: "none",
      style: {
        height: statusBarHeight
      }
    }), /*#__PURE__*/React.createElement(_reactNative.View, {
      pointerEvents: "box-none",
      style: styles.content
    }, leftButton ? /*#__PURE__*/React.createElement(_reactNativeReanimated.default.View, {
      pointerEvents: "box-none",
      style: [styles.left, {
        left: insets.left
      }, leftButtonStyle, leftContainerStyle]
    }, leftButton) : null, /*#__PURE__*/React.createElement(_reactNativeReanimated.default.View, {
      pointerEvents: "box-none",
      style: [headerTitleAlign === 'left' && {
        position: 'absolute',
        left: leftButton ? 72 : 16
      }, titleStyle, titleContainerStyle]
    }, typeof headerTitle === 'function' ? headerTitle({
      children: currentTitle,
      onLayout: this.handleTitleLayout,
      allowFontScaling: titleAllowFontScaling,
      style: [{
        color: headerTintColor
      }, customTitleStyle]
    }) : /*#__PURE__*/React.createElement(_HeaderTitle.default, {
      onLayout: this.handleTitleLayout,
      allowFontScaling: titleAllowFontScaling,
      style: [{
        color: headerTintColor
      }, customTitleStyle]
    }, currentTitle)), right !== undefined ? /*#__PURE__*/React.createElement(_reactNativeReanimated.default.View, {
      pointerEvents: "box-none",
      style: [styles.right, {
        right: insets.right
      }, rightButtonStyle, rightContainerStyle]
    }, typeof right === 'function' ? right({
      tintColor: headerRightTintColor || headerTintColor
    }) : right) : null)));
  }

}

exports.default = HeaderSegment;

const styles = _reactNative.StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  left: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  right: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'flex-end'
  }
});
//# sourceMappingURL=HeaderSegment.js.map