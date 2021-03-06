function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import * as React from 'react';
import { TextInput, Keyboard } from 'react-native';
export default class KeyboardManager extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "previouslyFocusedTextInput", null);

    _defineProperty(this, "handlePageChangeStart", () => {
      const input = TextInput.State.currentlyFocusedField(); // When a page change begins, blur the currently focused input

      TextInput.State.blurTextInput(input); // Store the id of this input so we can refocus it if change was cancelled

      this.previouslyFocusedTextInput = input;
    });

    _defineProperty(this, "handlePageChangeConfirm", () => {
      Keyboard.dismiss(); // Cleanup the ID on successful page change

      this.previouslyFocusedTextInput = null;
    });

    _defineProperty(this, "handlePageChangeCancel", () => {
      // The page didn't change, we should restore the focus of text input
      const input = this.previouslyFocusedTextInput;

      if (input) {
        TextInput.State.focusTextInput(input);
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
//# sourceMappingURL=KeyboardManager.js.map