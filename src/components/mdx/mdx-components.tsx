import { MDXComponents } from 'mdx/types';
import Link from 'next/link';
import Image from 'next/image';

// Custom components for MDX
const components: MDXComponents = {
  // Headings with custom styling
  h1: ({ children, ...props }) => (
    <h1
      className="text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-6 mt-8 first:mt-0"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2
      className="text-3xl font-semibold text-neutral-800 dark:text-neutral-200 mb-4 mt-8"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3
      className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200 mb-3 mt-6"
      {...props}
    >
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4
      className="text-xl font-medium text-neutral-700 dark:text-neutral-300 mb-2 mt-4"
      {...props}
    >
      {children}
    </h4>
  ),

  // Paragraphs
  p: ({ children, ...props }) => (
    <p
      className="text-neutral-700 dark:text-neutral-300 mb-4 leading-relaxed"
      {...props}
    >
      {children}
    </p>
  ),

  // Links
  a: ({ href, children, ...props }) => {
    const isExternal = href?.startsWith('http');

    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 underline transition-colors"
          {...props}
        >
          {children}
        </a>
      );
    }

    return (
      <Link
        href={(href || '#') as any}
        className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 underline transition-colors"
      >
        {children}
      </Link>
    );
  },

  // Lists
  ul: ({ children, ...props }) => (
    <ul
      className="list-disc list-inside mb-4 space-y-2 text-neutral-700 dark:text-neutral-300"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol
      className="list-decimal list-inside mb-4 space-y-2 text-neutral-700 dark:text-neutral-300"
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="leading-relaxed" {...props}>
      {children}
    </li>
  ),

  // Code blocks
  pre: ({ children, ...props }) => (
    <pre
      className="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-4 mb-4 overflow-x-auto text-sm border border-neutral-200 dark:border-neutral-700"
      {...props}
    >
      {children}
    </pre>
  ),
  code: ({ children, ...props }) => (
    <code
      className="bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded text-sm font-mono text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700"
      {...props}
    >
      {children}
    </code>
  ),

  // Blockquotes
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="border-l-4 border-primary-500 pl-4 py-2 mb-4 italic text-neutral-600 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-800/50 rounded-r"
      {...props}
    >
      {children}
    </blockquote>
  ),

  // Images
  img: ({ src, alt, ...props }) => (
    <div className="mb-4">
      <Image
        src={src || ''}
        alt={alt || ''}
        width={800}
        height={400}
        className="rounded-lg border border-neutral-200 dark:border-neutral-700"
      />
    </div>
  ),

  // Tables
  table: ({ children, ...props }) => (
    <div className="overflow-x-auto mb-4">
      <table
        className="min-w-full border-collapse border border-neutral-200 dark:border-neutral-700"
        {...props}
      >
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }) => (
    <th
      className="border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 px-4 py-2 text-left font-semibold text-neutral-800 dark:text-neutral-200"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td
      className="border border-neutral-200 dark:border-neutral-700 px-4 py-2 text-neutral-700 dark:text-neutral-300"
      {...props}
    >
      {children}
    </td>
  ),

  // Horizontal rule
  hr: props => (
    <hr
      className="border-neutral-200 dark:border-neutral-700 my-8"
      {...props}
    />
  ),
};

export default components;
