function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import * as React from 'react';
import { I18nManager, Image, View, Platform, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import MaskedView from '../MaskedView';
import TouchableItem from '../TouchableItem';

class HeaderBackButton extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {});

    _defineProperty(this, "handleLabelLayout", e => {
      const {
        onLabelLayout
      } = this.props;
      onLabelLayout && onLabelLayout(e);
      this.setState({
        fullLabelWidth: e.nativeEvent.layout.x + e.nativeEvent.layout.width
      });
    });

    _defineProperty(this, "shouldTruncateLabel", () => {
      const {
        titleLayout,
        screenLayout,
        label
      } = this.props;
      const {
        fullLabelWidth: initialLabelWidth
      } = this.state;
      return !label || initialLabelWidth && titleLayout && screenLayout && (screenLayout.width - titleLayout.width) / 2 < initialLabelWidth + 26;
    });

    _defineProperty(this, "renderBackImage", () => {
      const {
        backImage,
        labelVisible,
        tintColor
      } = this.props;

      if (backImage) {
        if (typeof backImage === 'function') {
          return backImage({
            tintColor
          });
        }

        return backImage;
      } else {
        return /*#__PURE__*/React.createElement(Image, {
          style: [styles.icon, Boolean(labelVisible) && styles.iconWithLabel, Boolean(tintColor) && {
            tintColor
          }],
          source: require('../assets/back-icon.png'),
          fadeDuration: 0
        });
      }
    });

    _defineProperty(this, "handlePress", () => this.props.onPress && requestAnimationFrame(this.props.onPress));
  }

  renderLabel() {
    const {
      label,
      truncatedLabel,
      allowFontScaling,
      labelVisible,
      backImage,
      labelStyle,
      tintColor,
      screenLayout
    } = this.props;
    const leftLabelText = this.shouldTruncateLabel() ? truncatedLabel : label;

    if (!labelVisible || leftLabelText === undefined) {
      return null;
    }

    const labelElement = /*#__PURE__*/React.createElement(View, {
      style: screenLayout ? // We make the button extend till the middle of the screen
      // Otherwise it appears to cut off when translating
      [styles.labelWrapper, {
        minWidth: screenLayout.width / 2 - 27
      }] : null
    }, /*#__PURE__*/React.createElement(Animated.Text, {
      accessible: false,
      onLayout: // This measurement is used to determine if we should truncate the label when it doesn't fit
      // Only measure it when label is not truncated because we want the measurement of full label
      leftLabelText === label ? this.handleLabelLayout : undefined,
      style: [styles.label, tintColor ? {
        color: tintColor
      } : null, labelStyle],
      numberOfLines: 1,
      allowFontScaling: !!allowFontScaling
    }, leftLabelText));

    if (backImage || Platform.OS !== 'ios') {
      // When a custom backimage is specified, we can't mask the label
      // Otherwise there might be weird effect due to our mask not being the same as the image
      return labelElement;
    }

    return /*#__PURE__*/React.createElement(MaskedView, {
      maskElement: /*#__PURE__*/React.createElement(View, {
        style: styles.iconMaskContainer
      }, /*#__PURE__*/React.createElement(Image, {
        source: require('../assets/back-icon-mask.png'),
        style: styles.iconMask
      }), /*#__PURE__*/React.createElement(View, {
        style: styles.iconMaskFillerRect
      }))
    }, labelElement);
  }

  render() {
    const {
      pressColorAndroid,
      label,
      disabled
    } = this.props;
    return /*#__PURE__*/React.createElement(TouchableItem, {
      disabled: disabled,
      accessible: true,
      accessibilityRole: "button",
      accessibilityComponentType: "button",
      accessibilityLabel: label && label !== 'Back' ? "".concat(label, ", back") : 'Go back',
      accessibilityTraits: "button",
      testID: "header-back",
      delayPressIn: 0,
      onPress: disabled ? undefined : this.handlePress,
      pressColor: pressColorAndroid,
      style: [styles.container, disabled && styles.disabled],
      hitSlop: Platform.select({
        ios: undefined,
        default: {
          top: 16,
          right: 16,
          bottom: 16,
          left: 16
        }
      }),
      borderless: true
    }, /*#__PURE__*/React.createElement(React.Fragment, null, this.renderBackImage(), this.renderLabel()));
  }

}

_defineProperty(HeaderBackButton, "defaultProps", {
  pressColorAndroid: 'rgba(0, 0, 0, .32)',
  tintColor: Platform.select({
    ios: '#037aff',
    web: '#5f6368'
  }),
  labelVisible: Platform.OS === 'ios',
  truncatedLabel: 'Back'
});

const styles = StyleSheet.create({
  container: _objectSpread({
    alignItems: 'center',
    flexDirection: 'row'
  }, Platform.select({
    ios: null,
    default: {
      marginVertical: 3,
      marginHorizontal: 11
    }
  })),
  disabled: {
    opacity: 0.5
  },
  label: {
    fontSize: 17,
    // Title and back label are a bit different width due to title being bold
    // Adjusting the letterSpacing makes them coincide better
    letterSpacing: 0.35
  },
  labelWrapper: {
    // These styles will make sure that the label doesn't fill the available space
    // Otherwise it messes with the measurement of the label
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  icon: Platform.select({
    ios: {
      height: 21,
      width: 13,
      marginLeft: 8,
      marginRight: 22,
      marginVertical: 12,
      resizeMode: 'contain',
      transform: [{
        scaleX: I18nManager.isRTL ? -1 : 1
      }]
    },
    default: {
      height: 24,
      width: 24,
      margin: 3,
      resizeMode: 'contain',
      transform: [{
        scaleX: I18nManager.isRTL ? -1 : 1
      }]
    }
  }),
  iconWithLabel: Platform.OS === 'ios' ? {
    marginRight: 6
  } : {},
  iconMaskContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  iconMaskFillerRect: {
    flex: 1,
    backgroundColor: '#000'
  },
  iconMask: {
    height: 21,
    width: 13,
    marginLeft: -14.5,
    marginVertical: 12,
    alignSelf: 'center',
    resizeMode: 'contain',
    transform: [{
      scaleX: I18nManager.isRTL ? -1 : 1
    }]
  }
});
export default HeaderBackButton;
//# sourceMappingURL=HeaderBackButton.js.map