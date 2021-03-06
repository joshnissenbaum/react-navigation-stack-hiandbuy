function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import * as React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import Animated from 'react-native-reanimated';
import HeaderTitle from './HeaderTitle';
import HeaderBackButton from './HeaderBackButton';
import HeaderBackground from './HeaderBackground';
import memoize from '../../utils/memoize';

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

export const getDefaultHeaderHeight = (layout, insets) => {
  const isLandscape = layout.width > layout.height;
  let headerHeight;

  if (Platform.OS === 'ios') {
    // @ts-ignore
    if (isLandscape && !Platform.isPad) {
      headerHeight = 32;
    } else {
      headerHeight = 44;
    }
  } else if (Platform.OS === 'android') {
    headerHeight = 56;
  } else {
    headerHeight = 64;
  }

  return headerHeight + (insets ? insets.top : 0);
};
export default class HeaderSegment extends React.Component {
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

    _defineProperty(this, "getInterpolatedStyle", memoize((styleInterpolator, layout, current, next, titleLayout, leftLabelLayout) => styleInterpolator({
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
      headerTitleAlign = Platform.select({
        ios: 'center',
        default: 'left'
      }),
      headerLeft: left = onGoBack ? props => /*#__PURE__*/React.createElement(HeaderBackButton, props) : undefined,
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

    const _ref = StyleSheet.flatten(customHeaderStyle || {}),
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
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Animated.View, {
      pointerEvents: "none",
      style: [StyleSheet.absoluteFill, backgroundStyle]
    }, headerBackground ? typeof headerBackground === 'function' ? headerBackground() : headerBackground : headerTransparent ? null : /*#__PURE__*/React.createElement(HeaderBackground, {
      style: safeStyles
    })), /*#__PURE__*/React.createElement(Animated.View, {
      pointerEvents: "box-none",
      style: [{
        height,
        minHeight,
        maxHeight,
        opacity
      }]
    }, /*#__PURE__*/React.createElement(View, {
      pointerEvents: "none",
      style: {
        height: statusBarHeight
      }
    }), /*#__PURE__*/React.createElement(View, {
      pointerEvents: "box-none",
      style: styles.content
    }, leftButton ? /*#__PURE__*/React.createElement(Animated.View, {
      pointerEvents: "box-none",
      style: [styles.left, {
        left: insets.left
      }, leftButtonStyle, leftContainerStyle]
    }, leftButton) : null, /*#__PURE__*/React.createElement(Animated.View, {
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
    }) : /*#__PURE__*/React.createElement(HeaderTitle, {
      onLayout: this.handleTitleLayout,
      allowFontScaling: titleAllowFontScaling,
      style: [{
        color: headerTintColor
      }, customTitleStyle]
    }, currentTitle)), right !== undefined ? /*#__PURE__*/React.createElement(Animated.View, {
      pointerEvents: "box-none",
      style: [styles.right, {
        right: insets.right
      }, rightButtonStyle, rightContainerStyle]
    }, typeof right === 'function' ? right({
      tintColor: headerRightTintColor || headerTintColor
    }) : right) : null)));
  }

}
const styles = StyleSheet.create({
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