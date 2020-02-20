!function(n){var e={};function t(i){if(e[i])return e[i].exports;var Q=e[i]={i:i,l:!1,exports:{}};return n[i].call(Q.exports,Q,Q.exports,t),Q.l=!0,Q.exports}t.m=n,t.c=e,t.d=function(n,e,i){t.o(n,e)||Object.defineProperty(n,e,{enumerable:!0,get:i})},t.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},t.t=function(n,e){if(1&e&&(n=t(n)),8&e)return n;if(4&e&&"object"==typeof n&&n&&n.__esModule)return n;var i=Object.create(null);if(t.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var Q in n)t.d(i,Q,function(e){return n[e]}.bind(null,Q));return i},t.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return t.d(e,"a",e),e},t.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},t.p="",t(t.s=148)}({109:function(module,__webpack_exports__,__webpack_require__){"use strict";eval('/* harmony import */ var backbone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(23);\n/* harmony import */ var backbone__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(backbone__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _constants_faq_hook_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(33);\n/* harmony import */ var _validators_faq_validator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(61);\n/**\n * TinyMceToolbarHandler handles the toolbar button.\n * @since 3.26.0\n * @author Naveen Muthusamy <naveen@wordlift.io>\n */\n\n/**\n * Internal dependencies.\n */\n\n\n\nconst TINYMCE_TOOLBAR_BUTTON_NAME = "wl-faq-toolbar-button";\n\nclass TinymceToolbarHandler {\n  /**\n   * Construct the TinymceToolbarHandler\n   * @param editor {tinymce.Editor} instance.\n   * @param highlightHandler {TinymceHighlightHandler} instance.\n   */\n  constructor(editor, highlightHandler) {\n    this.editor = editor;\n    this.highlightHandler = highlightHandler;\n    this.faqItems = []; // Listen to store changes on faq items and set the tool bar\n    // button state based on it.\n\n    Object(backbone__WEBPACK_IMPORTED_MODULE_0__["on"])(_constants_faq_hook_constants__WEBPACK_IMPORTED_MODULE_1__[/* FAQ_ITEMS_CHANGED */ "c"], faqItems => {\n      this.faqItems = faqItems;\n    });\n  }\n  /**\n   * Sets the button text based on the text selected by user.\n   * @param selectedText The text selected by user.\n   * @param button Button present in toolbar.\n   * @param container This container holds the button.\n   */\n\n\n  setButtonTextBasedOnSelectedText(selectedText, button, container) {\n    if (_validators_faq_validator__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].isQuestion(selectedText)) {\n      button.innerText = "Add Question";\n      container.setAttribute("aria-label", "Add Question");\n    } else {\n      button.innerText = "Add Answer";\n      container.setAttribute("aria-label", "Add Answer");\n    }\n  }\n  /**\n   * Disable toolbar button\n   */\n\n\n  disableButton(container, button) {\n    container.classList.add("mce-disabled");\n    button.disabled = true;\n  }\n  /**\n   * Enable toolbar button\n   */\n\n\n  enableButton(container, button) {\n    container.classList.remove("mce-disabled");\n    button.disabled = false;\n  }\n  /**\n   * Determine if the tool bar button needed to be disabled.\n   * Conditions for disabling the button\n   * 1. If there is no selected text\n   * 2. If an answer is selected and there are no unanswered questions.\n   * @return {Boolean} True if we need to disable button, false if we dont want to.\n   */\n\n\n  shouldDisableButton(selectedText) {\n    if (0 === selectedText.length) {\n      return true;\n    } // If there is some selected text then check if it is an answer.\n\n\n    const questionsWithoutAnswer = this.faqItems.filter(e => e.answer === "").length;\n\n    if (0 === questionsWithoutAnswer && !_validators_faq_validator__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].isQuestion(selectedText)) {\n      // There are no questions without answer and selected text is answer then disable it.\n      return true;\n    } // Return false if no conditions are matching.\n\n\n    return false;\n  }\n  /**\n   * When there is no selection disable the button, determine\n   * if it is question or answer and change the button text.\n   */\n\n\n  changeButtonStateOnSelectedText() {\n    const editor = this.editor;\n    const selectedText = editor.selection.getContent({\n      format: "text"\n    });\n    const container = document.getElementById(TINYMCE_TOOLBAR_BUTTON_NAME);\n    const button = container.getElementsByTagName("button")[0];\n\n    if (this.shouldDisableButton(selectedText)) {\n      this.disableButton(container, button);\n    } else {\n      this.enableButton(container, button);\n    }\n\n    this.setButtonTextBasedOnSelectedText(selectedText, button, container);\n  }\n  /**\n   * Listen for node changes, and alter the state of\n   * the button according to the text selected.\n   */\n\n\n  changeToolBarButtonStateBasedOnTextSelected() {\n    const editor = this.editor;\n    editor.on("NodeChange", e => {\n      this.changeButtonStateOnSelectedText();\n    });\n  }\n  /**\n   * Adds the button to the toolbar.\n   */\n\n\n  addButtonToToolBar() {\n    const editor = this.editor;\n    const handler = this;\n    editor.addButton(TINYMCE_TOOLBAR_BUTTON_NAME, {\n      text: "Add Question or Answer",\n      id: TINYMCE_TOOLBAR_BUTTON_NAME,\n      onclick: function () {\n        const selectedText = editor.selection.getContent({\n          format: "text"\n        });\n        const selectedHTML = editor.selection.getNode().innerHTML;\n        Object(backbone__WEBPACK_IMPORTED_MODULE_0__["trigger"])(_constants_faq_hook_constants__WEBPACK_IMPORTED_MODULE_1__[/* FAQ_EVENT_HANDLER_SELECTION_CHANGED */ "a"], {\n          selectedText: selectedText,\n          selectedHTML: selectedHTML\n        });\n      }\n    });\n    this.changeToolBarButtonStateBasedOnTextSelected();\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__["a"] = (TinymceToolbarHandler);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvZmFxL2hvb2tzL3RpbnltY2UvdGlueW1jZS10b29sYmFyLWhhbmRsZXIuanM/M2JiMiJdLCJuYW1lcyI6WyJUSU5ZTUNFX1RPT0xCQVJfQlVUVE9OX05BTUUiLCJUaW55bWNlVG9vbGJhckhhbmRsZXIiLCJjb25zdHJ1Y3RvciIsImVkaXRvciIsImhpZ2hsaWdodEhhbmRsZXIiLCJmYXFJdGVtcyIsIm9uIiwiRkFRX0lURU1TX0NIQU5HRUQiLCJzZXRCdXR0b25UZXh0QmFzZWRPblNlbGVjdGVkVGV4dCIsInNlbGVjdGVkVGV4dCIsImJ1dHRvbiIsImNvbnRhaW5lciIsIkZhcVZhbGlkYXRvciIsImlzUXVlc3Rpb24iLCJpbm5lclRleHQiLCJzZXRBdHRyaWJ1dGUiLCJkaXNhYmxlQnV0dG9uIiwiY2xhc3NMaXN0IiwiYWRkIiwiZGlzYWJsZWQiLCJlbmFibGVCdXR0b24iLCJyZW1vdmUiLCJzaG91bGREaXNhYmxlQnV0dG9uIiwibGVuZ3RoIiwicXVlc3Rpb25zV2l0aG91dEFuc3dlciIsImZpbHRlciIsImUiLCJhbnN3ZXIiLCJjaGFuZ2VCdXR0b25TdGF0ZU9uU2VsZWN0ZWRUZXh0Iiwic2VsZWN0aW9uIiwiZ2V0Q29udGVudCIsImZvcm1hdCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImNoYW5nZVRvb2xCYXJCdXR0b25TdGF0ZUJhc2VkT25UZXh0U2VsZWN0ZWQiLCJhZGRCdXR0b25Ub1Rvb2xCYXIiLCJoYW5kbGVyIiwiYWRkQnV0dG9uIiwidGV4dCIsImlkIiwib25jbGljayIsInNlbGVjdGVkSFRNTCIsImdldE5vZGUiLCJpbm5lckhUTUwiLCJ0cmlnZ2VyIiwiRkFRX0VWRU5UX0hBTkRMRVJfU0VMRUNUSU9OX0NIQU5HRUQiXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7OztBQU1BOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxNQUFNQSwy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RyxFQUFQLENBQVUsWUFBVixFQUF3Qm9CLENBQUMsSUFBSTtBQUMzQixXQUFLRSwrQkFBTDtBQUNELEtBRkQ7QUFHRDtBQUVEOzs7OztBQUdBUSxvQkFBa0IsR0FBRztBQUNuQixVQUFNakMsTUFBTSxHQUFHLEtBQUtBLE1BQXBCO0FBQ0EsVUFBTWtDLE9BQU8sR0FBRyxJQUFoQjtBQUNBbEMsVUFBTSxDQUFDbUMsU0FBUCxDQUFpQnRDLDJCQUFqQixFQUE4QztBQUM1Q3VDLFVBQUksRUFBRSx3QkFEc0M7QUFFNUNDLFFBQUUsRUFBRXhDLDJCQUZ3QztBQUc1Q3lDLGFBQU8sRUFBRSxZQUFXO0FBQ2xCLGNBQU1oQyxZQUFZLEdBQUdOLE1BQU0sQ0FBQzBCLFNBQVAsQ0FBaUJDLFVBQWpCLENBQTRCO0FBQUVDLGdCQUFNLEVBQUU7QUFBVixTQUE1QixDQUFyQjtBQUNBLGNBQU1XLFlBQVksR0FBR3ZDLE1BQU0sQ0FBQzBCLFNBQVAsQ0FBaUJjLE9BQWpCLEdBQTJCQyxTQUFoRDtBQUNBQyxnRUFBTyxDQUFDQyx5R0FBRCxFQUFzQztBQUMzQ3JDLHNCQUFZLEVBQUVBLFlBRDZCO0FBRTNDaUMsc0JBQVksRUFBRUE7QUFGNkIsU0FBdEMsQ0FBUDtBQUlEO0FBVjJDLEtBQTlDO0FBWUEsU0FBS1AsMkNBQUw7QUFDRDs7QUFySHlCOztBQXdIYmxDLDhFQUFmIiwiZmlsZSI6IjEwOS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVGlueU1jZVRvb2xiYXJIYW5kbGVyIGhhbmRsZXMgdGhlIHRvb2xiYXIgYnV0dG9uLlxuICogQHNpbmNlIDMuMjYuMFxuICogQGF1dGhvciBOYXZlZW4gTXV0aHVzYW15IDxuYXZlZW5Ad29yZGxpZnQuaW8+XG4gKi9cblxuLyoqXG4gKiBJbnRlcm5hbCBkZXBlbmRlbmNpZXMuXG4gKi9cbmltcG9ydCB7IHRyaWdnZXIsIG9uIH0gZnJvbSBcImJhY2tib25lXCI7XG5pbXBvcnQgeyBGQVFfRVZFTlRfSEFORExFUl9TRUxFQ1RJT05fQ0hBTkdFRCwgRkFRX0lURU1TX0NIQU5HRUQgfSBmcm9tIFwiLi4vLi4vY29uc3RhbnRzL2ZhcS1ob29rLWNvbnN0YW50c1wiO1xuaW1wb3J0IEZhcVZhbGlkYXRvciBmcm9tIFwiLi4vdmFsaWRhdG9ycy9mYXEtdmFsaWRhdG9yXCI7XG5jb25zdCBUSU5ZTUNFX1RPT0xCQVJfQlVUVE9OX05BTUUgPSBcIndsLWZhcS10b29sYmFyLWJ1dHRvblwiO1xuXG5jbGFzcyBUaW55bWNlVG9vbGJhckhhbmRsZXIge1xuICAvKipcbiAgICogQ29uc3RydWN0IHRoZSBUaW55bWNlVG9vbGJhckhhbmRsZXJcbiAgICogQHBhcmFtIGVkaXRvciB7dGlueW1jZS5FZGl0b3J9IGluc3RhbmNlLlxuICAgKiBAcGFyYW0gaGlnaGxpZ2h0SGFuZGxlciB7VGlueW1jZUhpZ2hsaWdodEhhbmRsZXJ9IGluc3RhbmNlLlxuICAgKi9cbiAgY29uc3RydWN0b3IoZWRpdG9yLCBoaWdobGlnaHRIYW5kbGVyKSB7XG4gICAgdGhpcy5lZGl0b3IgPSBlZGl0b3I7XG4gICAgdGhpcy5oaWdobGlnaHRIYW5kbGVyID0gaGlnaGxpZ2h0SGFuZGxlcjtcbiAgICB0aGlzLmZhcUl0ZW1zID0gW107XG4gICAgLy8gTGlzdGVuIHRvIHN0b3JlIGNoYW5nZXMgb24gZmFxIGl0ZW1zIGFuZCBzZXQgdGhlIHRvb2wgYmFyXG4gICAgLy8gYnV0dG9uIHN0YXRlIGJhc2VkIG9uIGl0LlxuICAgIG9uKEZBUV9JVEVNU19DSEFOR0VELCBmYXFJdGVtcyA9PiB7XG4gICAgICB0aGlzLmZhcUl0ZW1zID0gZmFxSXRlbXM7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgYnV0dG9uIHRleHQgYmFzZWQgb24gdGhlIHRleHQgc2VsZWN0ZWQgYnkgdXNlci5cbiAgICogQHBhcmFtIHNlbGVjdGVkVGV4dCBUaGUgdGV4dCBzZWxlY3RlZCBieSB1c2VyLlxuICAgKiBAcGFyYW0gYnV0dG9uIEJ1dHRvbiBwcmVzZW50IGluIHRvb2xiYXIuXG4gICAqIEBwYXJhbSBjb250YWluZXIgVGhpcyBjb250YWluZXIgaG9sZHMgdGhlIGJ1dHRvbi5cbiAgICovXG4gIHNldEJ1dHRvblRleHRCYXNlZE9uU2VsZWN0ZWRUZXh0KHNlbGVjdGVkVGV4dCwgYnV0dG9uLCBjb250YWluZXIpIHtcbiAgICBpZiAoRmFxVmFsaWRhdG9yLmlzUXVlc3Rpb24oc2VsZWN0ZWRUZXh0KSkge1xuICAgICAgYnV0dG9uLmlubmVyVGV4dCA9IFwiQWRkIFF1ZXN0aW9uXCI7XG4gICAgICBjb250YWluZXIuc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBcIkFkZCBRdWVzdGlvblwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYnV0dG9uLmlubmVyVGV4dCA9IFwiQWRkIEFuc3dlclwiO1xuICAgICAgY29udGFpbmVyLnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgXCJBZGQgQW5zd2VyXCIpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNhYmxlIHRvb2xiYXIgYnV0dG9uXG4gICAqL1xuICBkaXNhYmxlQnV0dG9uKGNvbnRhaW5lciwgYnV0dG9uKSB7XG4gICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJtY2UtZGlzYWJsZWRcIik7XG4gICAgYnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFbmFibGUgdG9vbGJhciBidXR0b25cbiAgICovXG4gIGVuYWJsZUJ1dHRvbihjb250YWluZXIsIGJ1dHRvbikge1xuICAgIGNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKFwibWNlLWRpc2FibGVkXCIpO1xuICAgIGJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIERldGVybWluZSBpZiB0aGUgdG9vbCBiYXIgYnV0dG9uIG5lZWRlZCB0byBiZSBkaXNhYmxlZC5cbiAgICogQ29uZGl0aW9ucyBmb3IgZGlzYWJsaW5nIHRoZSBidXR0b25cbiAgICogMS4gSWYgdGhlcmUgaXMgbm8gc2VsZWN0ZWQgdGV4dFxuICAgKiAyLiBJZiBhbiBhbnN3ZXIgaXMgc2VsZWN0ZWQgYW5kIHRoZXJlIGFyZSBubyB1bmFuc3dlcmVkIHF1ZXN0aW9ucy5cbiAgICogQHJldHVybiB7Qm9vbGVhbn0gVHJ1ZSBpZiB3ZSBuZWVkIHRvIGRpc2FibGUgYnV0dG9uLCBmYWxzZSBpZiB3ZSBkb250IHdhbnQgdG8uXG4gICAqL1xuICBzaG91bGREaXNhYmxlQnV0dG9uKHNlbGVjdGVkVGV4dCkge1xuICAgIGlmICgwID09PSBzZWxlY3RlZFRleHQubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgLy8gSWYgdGhlcmUgaXMgc29tZSBzZWxlY3RlZCB0ZXh0IHRoZW4gY2hlY2sgaWYgaXQgaXMgYW4gYW5zd2VyLlxuICAgIGNvbnN0IHF1ZXN0aW9uc1dpdGhvdXRBbnN3ZXIgPSB0aGlzLmZhcUl0ZW1zLmZpbHRlcihlID0+IGUuYW5zd2VyID09PSBcIlwiKS5sZW5ndGg7XG4gICAgaWYgKDAgPT09IHF1ZXN0aW9uc1dpdGhvdXRBbnN3ZXIgJiYgIUZhcVZhbGlkYXRvci5pc1F1ZXN0aW9uKHNlbGVjdGVkVGV4dCkpIHtcbiAgICAgIC8vIFRoZXJlIGFyZSBubyBxdWVzdGlvbnMgd2l0aG91dCBhbnN3ZXIgYW5kIHNlbGVjdGVkIHRleHQgaXMgYW5zd2VyIHRoZW4gZGlzYWJsZSBpdC5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICAvLyBSZXR1cm4gZmFsc2UgaWYgbm8gY29uZGl0aW9ucyBhcmUgbWF0Y2hpbmcuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFdoZW4gdGhlcmUgaXMgbm8gc2VsZWN0aW9uIGRpc2FibGUgdGhlIGJ1dHRvbiwgZGV0ZXJtaW5lXG4gICAqIGlmIGl0IGlzIHF1ZXN0aW9uIG9yIGFuc3dlciBhbmQgY2hhbmdlIHRoZSBidXR0b24gdGV4dC5cbiAgICovXG4gIGNoYW5nZUJ1dHRvblN0YXRlT25TZWxlY3RlZFRleHQoKSB7XG4gICAgY29uc3QgZWRpdG9yID0gdGhpcy5lZGl0b3I7XG4gICAgY29uc3Qgc2VsZWN0ZWRUZXh0ID0gZWRpdG9yLnNlbGVjdGlvbi5nZXRDb250ZW50KHsgZm9ybWF0OiBcInRleHRcIiB9KTtcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChUSU5ZTUNFX1RPT0xCQVJfQlVUVE9OX05BTUUpO1xuICAgIGNvbnN0IGJ1dHRvbiA9IGNvbnRhaW5lci5nZXRFbGVtZW50c0J5VGFnTmFtZShcImJ1dHRvblwiKVswXTtcbiAgICBpZiAodGhpcy5zaG91bGREaXNhYmxlQnV0dG9uKHNlbGVjdGVkVGV4dCkpIHtcbiAgICAgIHRoaXMuZGlzYWJsZUJ1dHRvbihjb250YWluZXIsIGJ1dHRvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZW5hYmxlQnV0dG9uKGNvbnRhaW5lciwgYnV0dG9uKTtcbiAgICB9XG4gICAgdGhpcy5zZXRCdXR0b25UZXh0QmFzZWRPblNlbGVjdGVkVGV4dChzZWxlY3RlZFRleHQsIGJ1dHRvbiwgY29udGFpbmVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMaXN0ZW4gZm9yIG5vZGUgY2hhbmdlcywgYW5kIGFsdGVyIHRoZSBzdGF0ZSBvZlxuICAgKiB0aGUgYnV0dG9uIGFjY29yZGluZyB0byB0aGUgdGV4dCBzZWxlY3RlZC5cbiAgICovXG4gIGNoYW5nZVRvb2xCYXJCdXR0b25TdGF0ZUJhc2VkT25UZXh0U2VsZWN0ZWQoKSB7XG4gICAgY29uc3QgZWRpdG9yID0gdGhpcy5lZGl0b3I7XG4gICAgZWRpdG9yLm9uKFwiTm9kZUNoYW5nZVwiLCBlID0+IHtcbiAgICAgIHRoaXMuY2hhbmdlQnV0dG9uU3RhdGVPblNlbGVjdGVkVGV4dCgpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgdGhlIGJ1dHRvbiB0byB0aGUgdG9vbGJhci5cbiAgICovXG4gIGFkZEJ1dHRvblRvVG9vbEJhcigpIHtcbiAgICBjb25zdCBlZGl0b3IgPSB0aGlzLmVkaXRvcjtcbiAgICBjb25zdCBoYW5kbGVyID0gdGhpcztcbiAgICBlZGl0b3IuYWRkQnV0dG9uKFRJTllNQ0VfVE9PTEJBUl9CVVRUT05fTkFNRSwge1xuICAgICAgdGV4dDogXCJBZGQgUXVlc3Rpb24gb3IgQW5zd2VyXCIsXG4gICAgICBpZDogVElOWU1DRV9UT09MQkFSX0JVVFRPTl9OQU1FLFxuICAgICAgb25jbGljazogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkVGV4dCA9IGVkaXRvci5zZWxlY3Rpb24uZ2V0Q29udGVudCh7IGZvcm1hdDogXCJ0ZXh0XCIgfSk7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkSFRNTCA9IGVkaXRvci5zZWxlY3Rpb24uZ2V0Tm9kZSgpLmlubmVySFRNTDtcbiAgICAgICAgdHJpZ2dlcihGQVFfRVZFTlRfSEFORExFUl9TRUxFQ1RJT05fQ0hBTkdFRCwge1xuICAgICAgICAgIHNlbGVjdGVkVGV4dDogc2VsZWN0ZWRUZXh0LFxuICAgICAgICAgIHNlbGVjdGVkSFRNTDogc2VsZWN0ZWRIVE1MXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuY2hhbmdlVG9vbEJhckJ1dHRvblN0YXRlQmFzZWRPblRleHRTZWxlY3RlZCgpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRpbnltY2VUb29sYmFySGFuZGxlcjtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///109\n')},110:function(module,__webpack_exports__,__webpack_require__){"use strict";eval('/* harmony import */ var _constants_faq_hook_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(33);\n/* harmony import */ var backbone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(23);\n/* harmony import */ var backbone__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(backbone__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _mappings_blocks_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22);\n/**\n * TinyMceHighlightHandler handles the toolbar button.\n * @since 3.26.0\n * @author Naveen Muthusamy <naveen@wordlift.io>\n */\n\n\n\nconst QUESTION_HIGHLIGHT_COLOR = "#00ff00";\nconst ANSWER_HIGHLIGHT_COLOR = "#00FFFF";\n\nclass TinymceHighlightHandler {\n  /**\n   * Construct highlight handler instance.\n   * @param editor {tinymce.Editor} The Tinymce editor instance.\n   * @param store Redux store.\n   */\n  constructor(editor, store) {\n    this.editor = editor;\n    this.store = store;\n    /**\n     * Listen for highlighting events, then highlight the text.\n     * Expected object from the event\n     * {\n     *     text: string,\n     *     isQuestion:Boolean\n     *     id: Int\n     * }\n     */\n\n    Object(backbone__WEBPACK_IMPORTED_MODULE_1__["on"])(_constants_faq_hook_constants__WEBPACK_IMPORTED_MODULE_0__[/* FAQ_HIGHLIGHT_TEXT */ "b"], result => {\n      this.highlightSelectedText(result.text, result.isQuestion, result.id);\n    });\n  }\n  /**\n   * Highlight the selection done by the user.\n   * @param selectedText The text which was selected by the user.\n   * @param isQuestion {Boolean} Indicates if its question or answer.\n   * @param id {Int} Unique id for question and answer.\n   */\n\n\n  highlightSelectedText(selectedText, isQuestion, id) {\n    const html = this.editor.selection.getContent();\n    const className = Object(_mappings_blocks_helper__WEBPACK_IMPORTED_MODULE_2__[/* classExtractor */ "a"])({\n      "wl-faq__question": isQuestion,\n      "wl-faq__answer": !isQuestion\n    });\n    /**\n     * Prepare unique identifier for the string, we are appending the classname because ids should\n     * be unique.\n     * @type {string}\n     */\n\n    const identifier = `${className}--${id}`;\n    const editor = this.editor;\n    const highlightedElement = `<span class="${className}" id="${identifier}">${html}</span>`;\n    editor.selection.setContent(highlightedElement);\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__["a"] = (TinymceHighlightHandler);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvZmFxL2hvb2tzL3RpbnltY2UvdGlueW1jZS1oaWdobGlnaHQtaGFuZGxlci5qcz8xNTRlIl0sIm5hbWVzIjpbIlFVRVNUSU9OX0hJR0hMSUdIVF9DT0xPUiIsIkFOU1dFUl9ISUdITElHSFRfQ09MT1IiLCJUaW55bWNlSGlnaGxpZ2h0SGFuZGxlciIsImNvbnN0cnVjdG9yIiwiZWRpdG9yIiwic3RvcmUiLCJvbiIsIkZBUV9ISUdITElHSFRfVEVYVCIsInJlc3VsdCIsImhpZ2hsaWdodFNlbGVjdGVkVGV4dCIsInRleHQiLCJpc1F1ZXN0aW9uIiwiaWQiLCJzZWxlY3RlZFRleHQiLCJodG1sIiwic2VsZWN0aW9uIiwiZ2V0Q29udGVudCIsImNsYXNzTmFtZSIsImNsYXNzRXh0cmFjdG9yIiwiaWRlbnRpZmllciIsImhpZ2hsaWdodGVkRWxlbWVudCIsInNldENvbnRlbnQiXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7O0FBTUE7QUFDQTtBQUNBO0FBRUEsTUFBTUEsd0JBQXdCLEdBQUcsU0FBakM7QUFFQSxNQUFNQyxzQkFBc0IsR0FBRyxTQUEvQjs7QUFFQSxNQUFNQyx1QkFBTixDQUE4QjtBQUM1Qjs7Ozs7QUFLQUMsYUFBVyxDQUFDQyxNQUFELEVBQVNDLEtBQVQsRUFBZ0I7QUFDekIsU0FBS0QsTUFBTCxHQUFjQSxNQUFkO0FBQ0EsU0FBS0MsS0FBTCxHQUFhQSxLQUFiO0FBQ0E7Ozs7Ozs7Ozs7QUFTQUMsdURBQUUsQ0FBQ0Msd0ZBQUQsRUFBcUJDLE1BQU0sSUFBSTtBQUMvQixXQUFLQyxxQkFBTCxDQUEyQkQsTUFBTSxDQUFDRSxJQUFsQyxFQUF3Q0YsTUFBTSxDQUFDRyxVQUEvQyxFQUEyREgsTUFBTSxDQUFDSSxFQUFsRTtBQUNELEtBRkMsQ0FBRjtBQUdEO0FBRUQ7Ozs7Ozs7O0FBTUFILHVCQUFxQixDQUFDSSxZQUFELEVBQWVGLFVBQWYsRUFBMkJDLEVBQTNCLEVBQStCO0FBQ2xELFVBQU1FLElBQUksR0FBRyxLQUFLVixNQUFMLENBQVlXLFNBQVosQ0FBc0JDLFVBQXRCLEVBQWI7QUFDQSxVQUFNQyxTQUFTLEdBQUdDLHNGQUFjLENBQUM7QUFDL0IsMEJBQW9CUCxVQURXO0FBRS9CLHdCQUFrQixDQUFDQTtBQUZZLEtBQUQsQ0FBaEM7QUFJQTs7Ozs7O0FBS0EsVUFBTVEsVUFBVSxHQUFJLEdBQUVGLFNBQVUsS0FBSUwsRUFBRyxFQUF2QztBQUNBLFVBQU1SLE1BQU0sR0FBRyxLQUFLQSxNQUFwQjtBQUNBLFVBQU1nQixrQkFBa0IsR0FBSSxnQkFBZUgsU0FBVSxTQUFRRSxVQUFXLEtBQUlMLElBQUssU0FBakY7QUFDQVYsVUFBTSxDQUFDVyxTQUFQLENBQWlCTSxVQUFqQixDQUE0QkQsa0JBQTVCO0FBQ0Q7O0FBNUMyQjs7QUErQ2ZsQixnRkFBZiIsImZpbGUiOiIxMTAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFRpbnlNY2VIaWdobGlnaHRIYW5kbGVyIGhhbmRsZXMgdGhlIHRvb2xiYXIgYnV0dG9uLlxuICogQHNpbmNlIDMuMjYuMFxuICogQGF1dGhvciBOYXZlZW4gTXV0aHVzYW15IDxuYXZlZW5Ad29yZGxpZnQuaW8+XG4gKi9cblxuaW1wb3J0IHsgRkFRX0hJR0hMSUdIVF9URVhULCBGQVFfSVRFTVNfQ0hBTkdFRCB9IGZyb20gXCIuLi8uLi9jb25zdGFudHMvZmFxLWhvb2stY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBvbiB9IGZyb20gXCJiYWNrYm9uZVwiO1xuaW1wb3J0IHsgY2xhc3NFeHRyYWN0b3IgfSBmcm9tIFwiLi4vLi4vLi4vbWFwcGluZ3MvYmxvY2tzL2hlbHBlclwiO1xuXG5jb25zdCBRVUVTVElPTl9ISUdITElHSFRfQ09MT1IgPSBcIiMwMGZmMDBcIjtcblxuY29uc3QgQU5TV0VSX0hJR0hMSUdIVF9DT0xPUiA9IFwiIzAwRkZGRlwiO1xuXG5jbGFzcyBUaW55bWNlSGlnaGxpZ2h0SGFuZGxlciB7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgaGlnaGxpZ2h0IGhhbmRsZXIgaW5zdGFuY2UuXG4gICAqIEBwYXJhbSBlZGl0b3Ige3RpbnltY2UuRWRpdG9yfSBUaGUgVGlueW1jZSBlZGl0b3IgaW5zdGFuY2UuXG4gICAqIEBwYXJhbSBzdG9yZSBSZWR1eCBzdG9yZS5cbiAgICovXG4gIGNvbnN0cnVjdG9yKGVkaXRvciwgc3RvcmUpIHtcbiAgICB0aGlzLmVkaXRvciA9IGVkaXRvcjtcbiAgICB0aGlzLnN0b3JlID0gc3RvcmU7XG4gICAgLyoqXG4gICAgICogTGlzdGVuIGZvciBoaWdobGlnaHRpbmcgZXZlbnRzLCB0aGVuIGhpZ2hsaWdodCB0aGUgdGV4dC5cbiAgICAgKiBFeHBlY3RlZCBvYmplY3QgZnJvbSB0aGUgZXZlbnRcbiAgICAgKiB7XG4gICAgICogICAgIHRleHQ6IHN0cmluZyxcbiAgICAgKiAgICAgaXNRdWVzdGlvbjpCb29sZWFuXG4gICAgICogICAgIGlkOiBJbnRcbiAgICAgKiB9XG4gICAgICovXG4gICAgb24oRkFRX0hJR0hMSUdIVF9URVhULCByZXN1bHQgPT4ge1xuICAgICAgdGhpcy5oaWdobGlnaHRTZWxlY3RlZFRleHQocmVzdWx0LnRleHQsIHJlc3VsdC5pc1F1ZXN0aW9uLCByZXN1bHQuaWQpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEhpZ2hsaWdodCB0aGUgc2VsZWN0aW9uIGRvbmUgYnkgdGhlIHVzZXIuXG4gICAqIEBwYXJhbSBzZWxlY3RlZFRleHQgVGhlIHRleHQgd2hpY2ggd2FzIHNlbGVjdGVkIGJ5IHRoZSB1c2VyLlxuICAgKiBAcGFyYW0gaXNRdWVzdGlvbiB7Qm9vbGVhbn0gSW5kaWNhdGVzIGlmIGl0cyBxdWVzdGlvbiBvciBhbnN3ZXIuXG4gICAqIEBwYXJhbSBpZCB7SW50fSBVbmlxdWUgaWQgZm9yIHF1ZXN0aW9uIGFuZCBhbnN3ZXIuXG4gICAqL1xuICBoaWdobGlnaHRTZWxlY3RlZFRleHQoc2VsZWN0ZWRUZXh0LCBpc1F1ZXN0aW9uLCBpZCkge1xuICAgIGNvbnN0IGh0bWwgPSB0aGlzLmVkaXRvci5zZWxlY3Rpb24uZ2V0Q29udGVudCgpO1xuICAgIGNvbnN0IGNsYXNzTmFtZSA9IGNsYXNzRXh0cmFjdG9yKHtcbiAgICAgIFwid2wtZmFxX19xdWVzdGlvblwiOiBpc1F1ZXN0aW9uLFxuICAgICAgXCJ3bC1mYXFfX2Fuc3dlclwiOiAhaXNRdWVzdGlvblxuICAgIH0pO1xuICAgIC8qKlxuICAgICAqIFByZXBhcmUgdW5pcXVlIGlkZW50aWZpZXIgZm9yIHRoZSBzdHJpbmcsIHdlIGFyZSBhcHBlbmRpbmcgdGhlIGNsYXNzbmFtZSBiZWNhdXNlIGlkcyBzaG91bGRcbiAgICAgKiBiZSB1bmlxdWUuXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICBjb25zdCBpZGVudGlmaWVyID0gYCR7Y2xhc3NOYW1lfS0tJHtpZH1gO1xuICAgIGNvbnN0IGVkaXRvciA9IHRoaXMuZWRpdG9yO1xuICAgIGNvbnN0IGhpZ2hsaWdodGVkRWxlbWVudCA9IGA8c3BhbiBjbGFzcz1cIiR7Y2xhc3NOYW1lfVwiIGlkPVwiJHtpZGVudGlmaWVyfVwiPiR7aHRtbH08L3NwYW4+YDtcbiAgICBlZGl0b3Iuc2VsZWN0aW9uLnNldENvbnRlbnQoaGlnaGxpZ2h0ZWRFbGVtZW50KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUaW55bWNlSGlnaGxpZ2h0SGFuZGxlcjtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///110\n')},148:function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var backbone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(23);\n/* harmony import */ var backbone__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(backbone__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _tinymce_toolbar_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(109);\n/* harmony import */ var _tinymce_highlight_handler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(110);\n/**\n * This file is automatically loaded by the tinymce via registering in backend.\n * It emits events captured by the faq event handler class.\n * @since 3.26.0\n * @author Naveen Muthusamy <naveen@wordlift.io>\n */\n\n/**\n * External dependencies.\n */\n\n/**\n * Internal dependencies.\n */\n\n\n\nconst FAQ_TINYMCE_PLUGIN_NAME = "wl_faq_tinymce";\nconst tinymce = global["tinymce"];\ntinymce.PluginManager.add(FAQ_TINYMCE_PLUGIN_NAME, function (editor) {\n  const highlightHandler = new _tinymce_highlight_handler__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"](editor);\n  const toolBarHandler = new _tinymce_toolbar_handler__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"](editor, highlightHandler);\n  toolBarHandler.addButtonToToolBar();\n});\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(24)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvZmFxL2hvb2tzL3RpbnltY2UvdGlueW1jZS1mYXEtcGx1Z2luLmpzPzQ1YmEiXSwibmFtZXMiOlsiRkFRX1RJTllNQ0VfUExVR0lOX05BTUUiLCJ0aW55bWNlIiwiZ2xvYmFsIiwiUGx1Z2luTWFuYWdlciIsImFkZCIsImVkaXRvciIsImhpZ2hsaWdodEhhbmRsZXIiLCJUaW55bWNlSGlnaGxpZ2h0SGFuZGxlciIsInRvb2xCYXJIYW5kbGVyIiwiVGlueW1jZVRvb2xiYXJIYW5kbGVyIiwiYWRkQnV0dG9uVG9Ub29sQmFyIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7Ozs7QUFPQTs7O0FBR0E7QUFFQTs7OztBQUdBO0FBQ0E7QUFHQSxNQUFNQSx1QkFBdUIsR0FBRyxnQkFBaEM7QUFDQSxNQUFNQyxPQUFPLEdBQUdDLE1BQU0sQ0FBQyxTQUFELENBQXRCO0FBQ0FELE9BQU8sQ0FBQ0UsYUFBUixDQUFzQkMsR0FBdEIsQ0FBMEJKLHVCQUExQixFQUFtRCxVQUFTSyxNQUFULEVBQWlCO0FBQ2xFLFFBQU1DLGdCQUFnQixHQUFHLElBQUlDLDBFQUFKLENBQTRCRixNQUE1QixDQUF6QjtBQUNBLFFBQU1HLGNBQWMsR0FBRyxJQUFJQyx3RUFBSixDQUEwQkosTUFBMUIsRUFBa0NDLGdCQUFsQyxDQUF2QjtBQUNBRSxnQkFBYyxDQUFDRSxrQkFBZjtBQUNELENBSkQsRSIsImZpbGUiOiIxNDguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFRoaXMgZmlsZSBpcyBhdXRvbWF0aWNhbGx5IGxvYWRlZCBieSB0aGUgdGlueW1jZSB2aWEgcmVnaXN0ZXJpbmcgaW4gYmFja2VuZC5cbiAqIEl0IGVtaXRzIGV2ZW50cyBjYXB0dXJlZCBieSB0aGUgZmFxIGV2ZW50IGhhbmRsZXIgY2xhc3MuXG4gKiBAc2luY2UgMy4yNi4wXG4gKiBAYXV0aG9yIE5hdmVlbiBNdXRodXNhbXkgPG5hdmVlbkB3b3JkbGlmdC5pbz5cbiAqL1xuXG4vKipcbiAqIEV4dGVybmFsIGRlcGVuZGVuY2llcy5cbiAqL1xuaW1wb3J0IHsgdHJpZ2dlciB9IGZyb20gXCJiYWNrYm9uZVwiO1xuXG4vKipcbiAqIEludGVybmFsIGRlcGVuZGVuY2llcy5cbiAqL1xuaW1wb3J0IFRpbnltY2VUb29sYmFySGFuZGxlciBmcm9tIFwiLi90aW55bWNlLXRvb2xiYXItaGFuZGxlclwiO1xuaW1wb3J0IFRpbnltY2VIaWdobGlnaHRIYW5kbGVyIGZyb20gXCIuL3RpbnltY2UtaGlnaGxpZ2h0LWhhbmRsZXJcIjtcblxuXG5jb25zdCBGQVFfVElOWU1DRV9QTFVHSU5fTkFNRSA9IFwid2xfZmFxX3RpbnltY2VcIjtcbmNvbnN0IHRpbnltY2UgPSBnbG9iYWxbXCJ0aW55bWNlXCJdO1xudGlueW1jZS5QbHVnaW5NYW5hZ2VyLmFkZChGQVFfVElOWU1DRV9QTFVHSU5fTkFNRSwgZnVuY3Rpb24oZWRpdG9yKSB7XG4gIGNvbnN0IGhpZ2hsaWdodEhhbmRsZXIgPSBuZXcgVGlueW1jZUhpZ2hsaWdodEhhbmRsZXIoZWRpdG9yKTtcbiAgY29uc3QgdG9vbEJhckhhbmRsZXIgPSBuZXcgVGlueW1jZVRvb2xiYXJIYW5kbGVyKGVkaXRvciwgaGlnaGxpZ2h0SGFuZGxlcik7XG4gIHRvb2xCYXJIYW5kbGVyLmFkZEJ1dHRvblRvVG9vbEJhcigpO1xufSk7XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///148\n')},22:function(module,__webpack_exports__,__webpack_require__){"use strict";eval('/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return classExtractor; });\n/**\n * This file is used to provide helpers for styling.\n * @author Naveen Muthusamy <naveen@wordlift.io>\n * @since 3.25.0\n *\n */\n\n/**\n * classExtractor helps to return class name by applying boolean logic.\n * @param classConfig {Object} should be in format { "class-name": Boolean }\n * @returns {string} combined class name.\n */\nconst classExtractor = classConfig => {\n  let className = "";\n\n  for (let key of Object.keys(classConfig)) {\n    if (classConfig[key]) {\n      className += ` ${key}`;\n    }\n  }\n\n  return className;\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbWFwcGluZ3MvYmxvY2tzL2hlbHBlci5qcz82ZWYwIl0sIm5hbWVzIjpbImNsYXNzRXh0cmFjdG9yIiwiY2xhc3NDb25maWciLCJjbGFzc05hbWUiLCJrZXkiLCJPYmplY3QiLCJrZXlzIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBOzs7Ozs7O0FBT0E7Ozs7O0FBS08sTUFBTUEsY0FBYyxHQUFHQyxXQUFXLElBQUk7QUFDM0MsTUFBSUMsU0FBUyxHQUFHLEVBQWhCOztBQUNBLE9BQUssSUFBSUMsR0FBVCxJQUFnQkMsTUFBTSxDQUFDQyxJQUFQLENBQVlKLFdBQVosQ0FBaEIsRUFBMEM7QUFDeEMsUUFBSUEsV0FBVyxDQUFDRSxHQUFELENBQWYsRUFBc0I7QUFDcEJELGVBQVMsSUFBSyxJQUFHQyxHQUFJLEVBQXJCO0FBQ0Q7QUFDRjs7QUFDRCxTQUFPRCxTQUFQO0FBQ0QsQ0FSTSIsImZpbGUiOiIyMi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVGhpcyBmaWxlIGlzIHVzZWQgdG8gcHJvdmlkZSBoZWxwZXJzIGZvciBzdHlsaW5nLlxuICogQGF1dGhvciBOYXZlZW4gTXV0aHVzYW15IDxuYXZlZW5Ad29yZGxpZnQuaW8+XG4gKiBAc2luY2UgMy4yNS4wXG4gKlxuICovXG5cbi8qKlxuICogY2xhc3NFeHRyYWN0b3IgaGVscHMgdG8gcmV0dXJuIGNsYXNzIG5hbWUgYnkgYXBwbHlpbmcgYm9vbGVhbiBsb2dpYy5cbiAqIEBwYXJhbSBjbGFzc0NvbmZpZyB7T2JqZWN0fSBzaG91bGQgYmUgaW4gZm9ybWF0IHsgXCJjbGFzcy1uYW1lXCI6IEJvb2xlYW4gfVxuICogQHJldHVybnMge3N0cmluZ30gY29tYmluZWQgY2xhc3MgbmFtZS5cbiAqL1xuZXhwb3J0IGNvbnN0IGNsYXNzRXh0cmFjdG9yID0gY2xhc3NDb25maWcgPT4ge1xuICBsZXQgY2xhc3NOYW1lID0gXCJcIjtcbiAgZm9yIChsZXQga2V5IG9mIE9iamVjdC5rZXlzKGNsYXNzQ29uZmlnKSkge1xuICAgIGlmIChjbGFzc0NvbmZpZ1trZXldKSB7XG4gICAgICBjbGFzc05hbWUgKz0gYCAke2tleX1gO1xuICAgIH1cbiAgfVxuICByZXR1cm4gY2xhc3NOYW1lO1xufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///22\n')},23:function(module,exports){eval("module.exports = Backbone;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJCYWNrYm9uZVwiPzViYzAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoiMjMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IEJhY2tib25lOyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///23\n")},24:function(module,exports){eval('var g;\n\n// This works in non-strict mode\ng = (function() {\n\treturn this;\n})();\n\ntry {\n\t// This works if eval is allowed (see CSP)\n\tg = g || new Function("return this")();\n} catch (e) {\n\t// This works if the window reference is available\n\tif (typeof window === "object") g = window;\n}\n\n// g can still be undefined, but nothing to do about it...\n// We return undefined, instead of nothing here, so it\'s\n// easier to handle this case. if(!global) { ...}\n\nmodule.exports = g;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzP2NkMDAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw0Q0FBNEM7O0FBRTVDIiwiZmlsZSI6IjI0LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGc7XG5cbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXG5nID0gKGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcztcbn0pKCk7XG5cbnRyeSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxuXHRnID0gZyB8fCBuZXcgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1xufSBjYXRjaCAoZSkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikgZyA9IHdpbmRvdztcbn1cblxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3Ncbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cblxubW9kdWxlLmV4cG9ydHMgPSBnO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///24\n')},33:function(module,__webpack_exports__,__webpack_require__){"use strict";eval('/* unused harmony export FAQ_REQUEST_ADD_NEW_QUESTION */\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FAQ_EVENT_HANDLER_SELECTION_CHANGED; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return FAQ_ITEMS_CHANGED; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return FAQ_HIGHLIGHT_TEXT; });\n/**\n * Constants for the FAQ hooks.\n *\n * @since 3.26.0\n * @author Naveen Muthusamy <naveen@wordlift.io>\n */\n\n/**\n * Event name when the text selection changed in any of text editor, emitted\n * from the hooks.\n * @type {string}\n */\nconst FAQ_REQUEST_ADD_NEW_QUESTION = "FAQ_REQUEST_ADD_NEW_QUESTION";\n/**\n * Event emitted by hook when the text selection is changed.\n * @type {string}\n */\n\nconst FAQ_EVENT_HANDLER_SELECTION_CHANGED = "FAQ_EVENT_HANDLER_SELECTION_CHANGED";\n/**\n * Event emitted by the store when the faq items are changed\n * @type {string}\n */\n\nconst FAQ_ITEMS_CHANGED = "FAQ_ITEMS_CHANGED";\n/**\n * Event emitted by the store when a question or answer\n * is added by ui, asking the editor to highlight the text.\n */\n\nconst FAQ_HIGHLIGHT_TEXT = "FAQ_HIGHLIGHT_TEXT";//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvZmFxL2NvbnN0YW50cy9mYXEtaG9vay1jb25zdGFudHMuanM/MmQ5OCJdLCJuYW1lcyI6WyJGQVFfUkVRVUVTVF9BRERfTkVXX1FVRVNUSU9OIiwiRkFRX0VWRU5UX0hBTkRMRVJfU0VMRUNUSU9OX0NIQU5HRUQiLCJGQVFfSVRFTVNfQ0hBTkdFRCIsIkZBUV9ISUdITElHSFRfVEVYVCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7Ozs7OztBQU9BOzs7OztBQUtPLE1BQU1BLDRCQUE0QixHQUFHLDhCQUFyQztBQUVQOzs7OztBQUlPLE1BQU1DLG1DQUFtQyxHQUFHLHFDQUE1QztBQUVQOzs7OztBQUlPLE1BQU1DLGlCQUFpQixHQUFHLG1CQUExQjtBQUVQOzs7OztBQUlPLE1BQU1DLGtCQUFrQixHQUFHLG9CQUEzQiIsImZpbGUiOiIzMy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29uc3RhbnRzIGZvciB0aGUgRkFRIGhvb2tzLlxuICpcbiAqIEBzaW5jZSAzLjI2LjBcbiAqIEBhdXRob3IgTmF2ZWVuIE11dGh1c2FteSA8bmF2ZWVuQHdvcmRsaWZ0LmlvPlxuICovXG5cbi8qKlxuICogRXZlbnQgbmFtZSB3aGVuIHRoZSB0ZXh0IHNlbGVjdGlvbiBjaGFuZ2VkIGluIGFueSBvZiB0ZXh0IGVkaXRvciwgZW1pdHRlZFxuICogZnJvbSB0aGUgaG9va3MuXG4gKiBAdHlwZSB7c3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgRkFRX1JFUVVFU1RfQUREX05FV19RVUVTVElPTiA9IFwiRkFRX1JFUVVFU1RfQUREX05FV19RVUVTVElPTlwiO1xuXG4vKipcbiAqIEV2ZW50IGVtaXR0ZWQgYnkgaG9vayB3aGVuIHRoZSB0ZXh0IHNlbGVjdGlvbiBpcyBjaGFuZ2VkLlxuICogQHR5cGUge3N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IEZBUV9FVkVOVF9IQU5ETEVSX1NFTEVDVElPTl9DSEFOR0VEID0gXCJGQVFfRVZFTlRfSEFORExFUl9TRUxFQ1RJT05fQ0hBTkdFRFwiO1xuXG4vKipcbiAqIEV2ZW50IGVtaXR0ZWQgYnkgdGhlIHN0b3JlIHdoZW4gdGhlIGZhcSBpdGVtcyBhcmUgY2hhbmdlZFxuICogQHR5cGUge3N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IEZBUV9JVEVNU19DSEFOR0VEID0gXCJGQVFfSVRFTVNfQ0hBTkdFRFwiO1xuXG4vKipcbiAqIEV2ZW50IGVtaXR0ZWQgYnkgdGhlIHN0b3JlIHdoZW4gYSBxdWVzdGlvbiBvciBhbnN3ZXJcbiAqIGlzIGFkZGVkIGJ5IHVpLCBhc2tpbmcgdGhlIGVkaXRvciB0byBoaWdobGlnaHQgdGhlIHRleHQuXG4gKi9cbmV4cG9ydCBjb25zdCBGQVFfSElHSExJR0hUX1RFWFQgPSBcIkZBUV9ISUdITElHSFRfVEVYVFwiO1xuXG5cbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///33\n')},61:function(module,__webpack_exports__,__webpack_require__){"use strict";eval('/**\n * FaqValidator validates the text selected by user, determines if it is question\n * or answer.\n *\n * @since 3.26.0\n * @author Naveen Muthusamy <naveen@wordlift.io>\n */\nclass FaqValidator {\n  static isQuestion(text) {\n    return text.trim().endsWith("?");\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__["a"] = (FaqValidator);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvZmFxL2hvb2tzL3ZhbGlkYXRvcnMvZmFxLXZhbGlkYXRvci5qcz9lOTdmIl0sIm5hbWVzIjpbIkZhcVZhbGlkYXRvciIsImlzUXVlc3Rpb24iLCJ0ZXh0IiwidHJpbSIsImVuZHNXaXRoIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQU9BLE1BQU1BLFlBQU4sQ0FBbUI7QUFFZixTQUFPQyxVQUFQLENBQWtCQyxJQUFsQixFQUF3QjtBQUNwQixXQUFPQSxJQUFJLENBQUNDLElBQUwsR0FBWUMsUUFBWixDQUFxQixHQUFyQixDQUFQO0FBQ0g7O0FBSmM7O0FBUUpKLHFFQUFmIiwiZmlsZSI6IjYxLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBGYXFWYWxpZGF0b3IgdmFsaWRhdGVzIHRoZSB0ZXh0IHNlbGVjdGVkIGJ5IHVzZXIsIGRldGVybWluZXMgaWYgaXQgaXMgcXVlc3Rpb25cbiAqIG9yIGFuc3dlci5cbiAqXG4gKiBAc2luY2UgMy4yNi4wXG4gKiBAYXV0aG9yIE5hdmVlbiBNdXRodXNhbXkgPG5hdmVlbkB3b3JkbGlmdC5pbz5cbiAqL1xuY2xhc3MgRmFxVmFsaWRhdG9yIHtcblxuICAgIHN0YXRpYyBpc1F1ZXN0aW9uKHRleHQpIHtcbiAgICAgICAgcmV0dXJuIHRleHQudHJpbSgpLmVuZHNXaXRoKFwiP1wiKVxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBGYXFWYWxpZGF0b3IiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///61\n')}});