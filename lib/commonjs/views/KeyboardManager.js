"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class KeyboardManager extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "previouslyFocusedTextInput", null);

    _defineProperty(this, "handlePageChangeStart", () => {
      const input = _reactNative.TextInput.State.currentlyFocusedField(); // When a page change begins, blur the currently focused input


      _reactNative.TextInput.State.blurTextInput(input); // Store the id of this input so we can refocus it if change was cancelled


      this.previouslyFocusedTextInput = input;
    });

    _defineProperty(this, "handlePageChangeConfirm", () => {
      _reactNative.Keyboard.dismiss(); // Cleanup the ID on successful page change


      this.previouslyFocusedTextInput = null;
    });

    _defineProperty(this, "handlePageChangeCancel", () => {
      // The page didn't change, we should restore the focus of text input
      const input = this.previouslyFocusedTextInput;

      if (input) {
        _reactNative.TextInput.State.focusTextInput(input);
      }

      this.previouslyFocusedTextInput = null;
    });
  }

  render() {
    return this.props.children({
      onPageChangeStart: this.handlePageChangeStart,
      onPageChangeConfirm: this.handlePageChangeConfirm,
      onPageChangeCancel: this.handlePageChangeCancel
    });
  }

}

exports.default = KeyboardManager;
//# sourceMappingURL=KeyboardManager.js.map