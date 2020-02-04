/**
 * TinyMceFaqHook implements the editor hook, and handles the tinymce text editor.
 * NOTE: this hooks is called when the tinymce editor is used, so there is no need
 * to check for edge cases since we will have an activeEditor
 * @since ???
 * @author Naveen Muthusamy <naveen@wordlift.io>
 */

import FaqTextEditorHook from "./faq-text-editor-hook";
import { FAQ_EVENT_HANDLER_SELECTION_CHANGED } from "../constants/faq-hook-constants";
import { trigger } from "backbone";
export const FAQ_TINY_MCE_PLUGIN_NAME = "wl_faq";

class TinyMceFaqHook extends FaqTextEditorHook {
  constructor() {
    super();
    this._lastEmittedSelection = "";
  }

  listenForTextSelection() {
    const editor = global["tinymce"].activeEditor;
    editor.on("NodeChange", e => {

      /**
       * To prevent the multiple events getting emitted for the same
       * selected text, we are checking if the same text was posted last time
       */
      const selectedText = editor.selection.getContent({ format: "text" });
      if (selectedText !== this._lastEmittedSelection) {
        this._lastEmittedSelection = selectedText;
        trigger(FAQ_EVENT_HANDLER_SELECTION_CHANGED, selectedText);
      }

    });
  }
}

export default TinyMceFaqHook;
