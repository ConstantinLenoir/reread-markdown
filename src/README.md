Two alternative options:

- use position information for slicing the original Markdown text,
- convert the syntax tree into Mardown text.

The frontmatter header...

Compare different formats: md, html, json, yaml, rst, configparser.py (INI).

Compare with spreadsheets, complex web forms for populating databases.

**Some text labels are semantic, related to the structure, the meaning (HTML, Markdown). Others are presentational, related to the look-and-feel (CSS classes).**

Two alternative views:

- a tree,
- a flat list of pairs (leaf, ancestors).


The frontmatter header...

MDX (Markdown + React).

Faire la même chose avec les *headings* du HTML.

_mdast-util-to-string_ doesn't use new lines... SEE ALSO _mdast-util-to-markdown_.

https://github.com/remarkjs/remark/pull/536

A rewrite of the parsing algorithm : stepping away from regexes and getting closer to a real algorithmic tokeniser (state machine).

Pouvoir s'écarter de la norme Markdown sur le traitement des espaces : tenir compte des retours à la ligne en créant autant de blocs que nécessaire. Pour rester fidèle à la mise en page originelle.

Pour identifier les titres, une autre méthode serait d'utiliser des expressions régulières. Parcourir dans l'ordre la liste des motifs trouvés. Utiliser les informations de position dans la chaîne de caractère. Reconstituer la hiérarchie et découper le texte entre les titres consécutifs... Pas besoin d'arbre syntaxique dans cette méthode. Mais cette méthode a des limites. https://stackoverflow.com/questions/590747/using-regular-expressions-to-parse-html-why-not

https://github.com/adam-p/markdown-here

import { inspect } from "unist-util-inspect";

Terminal nodes (leaves).

https://flowershow.app/ Turn your markdown notes into an elegant website and tailor it to your needs. https://www.datopian.com/ https://github.com/datopian/markdowndb


src/index.js https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules#aggregating_modules

## Potential improvements

Improve release managing.

Improve package.json. SEE best practices. The "module" entry...

https://github.com/motdotla/dotenv

Add methods on the three returned by reread().

Integrate this library with the remark ecosystem.

comment-mark

Prettier.

The Flyweight design pattern and cache techniques for compressing format information.

For communicating traversal signals, three techniques :

- returned value,
- raised exception,
- mutated global context.

SQL trees.
https://www.ibase.ru/files/articles/programming/dbmstrees/sqltrees.html
MPTT is a technique for storing hierarchical data in a database. The aim is to make retrieval operations very efficient.

Represent node name as enum-like items.
A protective level of indirection in case of name changes.

Using various selectors for querying a tree-like objects (keys). CSS-like selectors or JSONPath.

https://stackoverflow.com/a/76348306

https://code.visualstudio.com/docs/languages/markdown Outline functionality. Parts can be hidden.

remark-breaks

https://github.com/syntax-tree/unist-util-select CSS-like selectors.

Graph data structures

- graphlib
- graphology
- https://github.com/fkling/JSNetworkX
- https://github.com/ngryman/tree-crawl
- https://github.com/joaonuno/tree-model-js
- Deepdash
- https://github.com/dabbott/tree-visit
- https://github.com/tckerr/walk
- https://github.com/rsandor/traversal
- https://github.com/andrejewski/paul
- https://github.com/lammas/tree-traversal
- https://github.com/mkdoc/mkql#example

https://rust-lang.github.io/mdBook/

`docutils.Node.walkabout()` (python)
`lxml.etree.iterwalk` (python)

Many _mdast-util_ or _unist-util_ utilities. unist-util-visit-parents.

For creating _mdast_ trees: https://github.com/syntax-tree/unist-builder.

Docutils is a modular system for processing documentation into useful formats, such as HTML, XML, and LaTeX. For input, Docutils supports reStructuredText, an easy-to-read, what-you-see-is-what-you-get plaintext markup syntax.

## Code snippets

JSON.stringify(tree, null, 2)

console.dir(tree, { depth: 7 })
