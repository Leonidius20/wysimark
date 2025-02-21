import { Editor } from "slate"

import { curryOne } from "~/src/sink"

import { createCodeBlock } from "./create-code-block"
import { setCodeBlockLanguage } from "./setCodeBlockLanguage"

export function createCodeBlockMethods(editor: Editor) {
  return {
    createCodeBlock: curryOne(createCodeBlock, editor),
    setCodeBlockLanguage: curryOne(setCodeBlockLanguage, editor),
  }
}
