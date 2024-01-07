
# reread-markdown

To turn markdown files into structured, queryable data. The input Markdown file is transformed into a special tree exposing the structure intended by the author of the file.


Markdown isn’t just text. It's a source of structured information.


**Heading nodes** are the primary focus of this library. They are retrieved, enriched and organized to form a new tree. The input document is crawled and indexed by headings. The other components of the input Markdown file are seen as heading attributes. Output heading nodes have two main attributes: their title and the related contents (raw text or tokens).

Agnostic. Versatile. Generic.

## Examples in the Node environment

example.md

    This is the *introduction*.

    # Part One

    Bla bla.

    ## *Title*

    1, 2, 3.

    ### Chapter

    A, B, C.

    ###### Section

    i, ii, iii.

    A code example with `#` characters..

    ```python

    # This is a comment
    def reread():
        print("Detect patterns.")

    ```

    # **Part** *Two*
    ## Another Title

    Last but not least.
    

```javascript
import { readFileSync } from 'node:fs';
import {reread} from "reread-markdown"

const text = readFileSync("./example.md", "utf8")

console.log(reread(text).toJSON())

```

Output
```json
{
  "data": {
    "title": "",
    "depth": 0,
    "contents": "\nThis is the *introduction*.\n\n"
  },
  "children": [
    {
      "data": {
        "title": "# Part One",
        "depth": 1,
        "contents": "\n\nBla bla.\n\n"
      },
      "children": [
        {
          "data": {
            "title": "## *Title*",
            "depth": 2,
            "contents": "\n\n1, 2, 3.\n\n"
          },
          "children": [
            {
              "data": {
                "title": "### Chapter",
                "depth": 3,
                "contents": "\n\nA, B, C.\n\n"
              },
              "children": [
                {
                  "data": {
                    "title": "###### Section",
                    "depth": 6,
                    "contents": "\n\ni, ii, iii.\n\nA code example with `#` characters..\n\n```python\n\n# This is a comment\ndef reread():\n    print(\"Detect patterns.\")\n\n```\n\n"
                  },
                  "children": []
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "data": {
        "title": "# **Part** *Two*",
        "depth": 1,
        "contents": "\n"
      },
      "children": [
        {
          "data": {
            "title": "## Another Title",
            "depth": 2,
            "contents": "\n\nLast but not least.\n"
          },
          "children": []
        }
      ]
    }
  ]
}

```


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

