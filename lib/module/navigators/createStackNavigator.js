function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import { StackRouter, createNavigator } from 'react-navigation';
import { Platform } from 'react-native';
import StackView from '../views/Stack/StackView';
import KeyboardManager from '../views/KeyboardManager';

function createStackNavigator(routeConfigMap, stackConfig = {}) {
  const router = StackRouter(routeConfigMap, stackConfig);

  if (stackConfig.disableKeyboardHandling || Platform.OS === 'web') {
    return createNavigator(StackView, router, stackConfig);
  }

  return createNavigator(navigatorProps => /*#__PURE__*/React.createElement(KeyboardManager, null, props => /*#__PURE__*/React.createElement(StackView, _extends({}, props, navigatorProps))), router, stackConfig);
}

export default createStackNavigator;
//# sourceMappingURL=createStackNavigator.js.map