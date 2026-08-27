'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Note } from '@/components/mdx/note'

interface MarkdownProps {
  children: string
  className?: string
}

export function Markdown({ children, className }: MarkdownProps) {
  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children }) => (
            <a
              href={href}
              className="font-medium text-accent underline decoration-dotted underline-offset-4 transition hover:text-accent/80"
              target="_blank"
              rel="noreferrer"
            >
              {children}
            </a>
          ),
          p: ({ children }) => <p className="leading-relaxed">{children}</p>,
          blockquote: ({ children }) => (
            <Note
              type="note"
              className="[&_pre]:max-w-full [&_pre]:whitespace-pre-wrap [&_code]:break-all"
            >
              {children}
            </Note>
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  )
}

export default Markdown
