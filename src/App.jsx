import CodeHighlighter from './components/CodeHighlighter'
import CustomMd from './components/CustomMd'
import Markdown from './components/Markdown'

const md = `
# hello there!
\`\`\`custommd
coucou
\`\`\`

Another block?
\`\`\`custommd param1 param2
foo bar
\`\`\`

and now syntax highlight

\`\`\`jsx
const renderers = [
  {
    match: code => code === "custommd",
    render: (_, args, value) => <CustomMd args={args} value={value} />
  },
  {
    match: () => true,
    render: (code, args, value) => <CodeHighlighter language={code} args={args} value={value} />
  }
]
\`\`\`
`

const renderers = [
  {
    match: (code, args, value) => code === "custommd",
    render: (code, args, value) => <CustomMd args={args} value={value} />
  },
  {
    match: (code, args, value) => true,
    render: (code, args, value) => <CodeHighlighter language={code} args={args} value={value} />
  }
]

function App() {
  
  return (
      <div>
        <Markdown value={md} renderers={renderers} />
      </div>
  )
}

export default App
