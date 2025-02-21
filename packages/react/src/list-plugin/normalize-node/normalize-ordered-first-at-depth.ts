import { Editor, Element, Node, NodeEntry, Transforms } from "slate"

import { isElementType, normalizeSiblings } from "~/src/sink"

import { isListItem, OrderedListItemElement } from ".."

/**
 * Makes sure that when a list item is deeper than a preceding one, that we
 * reset the counter.
 *
 * How it works:
 *
 * If we have any two list item siblings where the second sibling is an
 * `ordered-list-item`, then the second sibling should have the property
 * `_firstOfType` be `true` if the depth of the second sibling is higher.
 *
 * Why we need it:
 *
 * We need to do this manually because our implementation of lists does not
 * actually nest lists within lists. We took the approach because the cost
 * of actually nesting lists is very high in terms of added complexity. It is
 * much easier to manually reset the counters than it is to implement
 * everything to W3C specifications, especially given that from a UI
 * perspective, users expect lists to behave similar to paragraphs and
 * headings.
 */

export function normalizeOrderedFirstAtDepth(
  editor: Editor,
  entry: NodeEntry<Node>
): boolean {
  const [node, path] = entry
  if (!Element.isElement(node)) return false
  return normalizeSiblings<Element>(editor, [node, path], (a, b) => {
    if (
      !isListItem(a[0]) ||
      !isElementType<OrderedListItemElement>(b[0], "ordered-list-item")
    )
      return false
    const __firstAtDepth = b[0].depth > a[0].depth
    if (b[0].__firstAtDepth !== __firstAtDepth) {
      Transforms.setNodes(editor, { __firstAtDepth }, { at: b[1] })
      return true
    }
    return false
  })
}
