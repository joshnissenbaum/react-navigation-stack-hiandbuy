function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import * as React from 'react';
import { StyleSheet, Platform } from 'react-native';
import Animated from 'react-native-reanimated';
export default function HeaderTitle(_ref) {
  let {
    style
  } = _ref,
      rest = _objectWithoutProperties(_ref, ["style"]);

  return /*#__PURE__*/React.createElement(Animated.Text, _extends({}, rest, {
    style: [styles.title, style]
  }));
}
const styles = StyleSheet.create({
  title: Platform.select({
    ios: {
      fontSize: 17,
      fontWeight: '600',
      color: 'rgba(0, 0, 0, .9)'
    },
    android: {
      fontSize: 20,
      fontWeight: '500',
      color: 'rgba(0, 0, 0, .9)'
    },
    default: {
      fontSize: 18,
      fontWeight: '400',
      color: '#3c4043'
    }
  })
});
//# sourceMappingURL=HeaderTitle.js.map