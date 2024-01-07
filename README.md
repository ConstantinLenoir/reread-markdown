
# reread-markdown

To turn markdown files into structured, queryable data. The input Markdown file is transformed into a special tree exposing the structure intended by the author of the file.


Markdown isn’t just text. It's a source of structured information.


**Heading nodes** are the primary focus of this library. They are retrieved, enriched and organized to form a new tree. The input document is crawled and indexed by headings. The other components of the input Markdown file are seen as heading attributes. Output heading nodes have two main attributes: their title and the related contents (raw text or tokens).

Agnostic. Versatile. Generic.

## Workflow

1. *mdast-util-from-markdown* is used for parsing the input Markdown text. The resulting *syntax tree* complies with the specification defined by [mdast](https://github.com/syntax-tree/mdast).
2. This syntax tree is visited (walked, traversed, crawled) by a *Visitor* object accumulating state in order to produce a new tree.
3. This new tree allows you to **reread** Markdown (AST transformation). It exposes the hierarchical structure of the document and enables you to extract parts for further processing.
4. You can optionally retrieve each part in the form of a list of *tokens*. Tokens are labelled fragments of text (strings of characters). They are suitable for natural language processing (NLP) or PDF generation.


## About Markdown

https://commonmark.org

https://commonmark.org/help

https://github.com/syntax-tree/unist

https://github.com/syntax-tree/mdast

