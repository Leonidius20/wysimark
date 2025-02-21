import { useCallback, useState } from "react"

import { Editable, useEditor } from "../../../packages/react/src/entry"

// import content from "../content/basic.md"

const initialMarkdown = "# Hello World"

export default function Page() {
  const [markdown, setMarkdown] = useState(initialMarkdown)

  const editor = useEditor({
    initialMarkdown,
    // authToken: process.env.NEXT_PUBLIC_PORTIVE_AUTH_TOKEN,
    minHeight: 240,
    maxHeight: 720,
  })

  const getMarkdown = useCallback(() => {
    const markdown = editor.getMarkdown()
    console.log(markdown)
    setMarkdown(markdown)
  }, [editor])

  const resetMarkdown = useCallback(() => {
    editor.resetMarkdown(`# This is a reset with the reset button
    
And this is a paragraph`)
  }, [editor])

  return (
    <div style={{ maxWidth: 720, margin: "2em auto" }}>
      <div className="mb-2">
        <button className="btn btn-primary me-1" onClick={getMarkdown}>
          Get Markdown
        </button>
        <button className="btn btn-primary" onClick={resetMarkdown}>
          Set Markdown
        </button>
      </div>
      <Editable
        editor={editor}
        onChange={() => {
          setMarkdown(editor.getMarkdown())
        }}
      />
      <textarea
        className="mt-4 form-control"
        rows={10}
        value={markdown}
        readOnly
      />
    </div>
  )
}
