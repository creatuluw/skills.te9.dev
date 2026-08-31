# nomnoml Diagram Integration

nomnoml renders UML-style diagrams from a simple text syntax. Write `[Node] -> [Other]`
and it produces an SVG or canvas-rendered diagram. Two CDN script tags (graphre + nomnoml),
no build step.

## CDN Boilerplate

```html
<script src="https://unpkg.com/graphre/dist/graphre.js"></script>
<script src="https://unpkg.com/nomnoml/dist/nomnoml.js"></script>
<canvas id="diagram"></canvas>
<script>
  var source = '[nomnoml] is -> [awesome]';
  nomnoml.draw(document.getElementById('diagram'), source);
</script>
```

For SVG output (Node or inline):
```js
var svg = nomnoml.renderSvg(source);
```

## Relationship Types

```
-     association
->    association (directed)
<->   association (bidirectional)
-->   dependency
<-->  dependency (bidirectional)
-:>   generalization (inheritance)
<:-   generalization (reverse)
--:>  implementation
+:->  composition
+-    composition (undirected)
+->   composition (directed)
o-    aggregation (undirected)
o->   aggregation (directed)
--    note connector
-/-   hidden (invisible edge, for layout)
```

## Classifier Types

```
[name]                   standard class
[<abstract> name]        abstract (italic)
[<instance> name]        instance (underlined)
[<reference> name]       reference (dashed border)
[<note> name]            note (dog-eared)
[<package> name]         package (tab)
[<frame> name]           frame (border with title)
[<database> name]        database (cylinder)
[<start> name]           start (filled circle)
[<end> name]             end (double circle)
[<state> name]           state (rounded rect)
[<choice> name]          choice (diamond)
[<input> name]           input (parallelogram)
[<actor> name]           actor (stick figure)
[<usecase> name]         use case (ellipse)
[<label> name]           label (text only, no border)
[<hidden> name]          hidden (invisible, for layout)
[<table> name|col1|col2] table (grid with rows)
```

## Class Compartments

```
[name]                          name only
[name|attr1; attr2]             name + attributes
[name||method1(); method2()]    name + methods
[name|attr1; attr2|method1()]   all three
```

Pipe `|` separates compartments. Semicolons `;` separate items within a compartment.

Multi-line body:
```
[Engine|
  [Cylinder]->1[Piston]
  [Cylinder]->2[Valve]
]
```

## Directives

Place at the top of the source:

```
#arrowSize: 1          arrow head size
#bendSize: 0.3         curve radius for bent edges
#direction: right      flow direction (right | down)
#gutter: 5             margin around diagram
#gravity: 1            repulsion force between nodes
#edges: rounded        edge style (hard | rounded)
#fill: #eee8d5         fill color (hex)
#stroke: #33322E       stroke/line color
#fontSize: 12          font size in px
#lineWidth: 3          stroke width
#padding: 8            padding inside nodes
#spacing: 40           spacing between node ranks
#ranker: network-simplex  layout algorithm (network-simplex | tight-tree | longest-path)
```

## Custom Classifier Styles

```
#.mystyle: fill=#8f8 dashed visual=roundrect
[<mystyle> MyStyledBox]
```

Available modifiers: `dashed`
Key/value pairs: `fill`, `stroke`, `visual`, `align`, `direction`, `title`, `body`

## Pattern: Map User Data → nomnoml Source

```
User: "Draw the LMS database: sessions FK to users, diagrams FK to sessions,
       documents FK to sessions, document_blocks FK to documents."

→ nomnoml source:
  #direction: right
  #fill: #FAF9F5
  #stroke: #3D3D3A

  [<database> users]
  [<database> sessions] -> [<database> users]
  [<database> lms_sessions] -> [<database> users]
  [<database> lms_diagram_versions] -> [<database> lms_sessions]
  [<database> lms_documents] -> [<database> lms_sessions]
  [<database> lms_document_blocks] -> [<database> lms_documents]
```

## Tips

- **Long names** — use the `|` separator for multi-line labels: `[lms_diagram_versions|(session FK)]`
- **Layout direction** — `#direction: right` for left-to-right, `#direction: down` for top-to-bottom
- **Spacing** — `#spacing: 60` for more room between ranks, `#gutter: 10` for margin
- **Dark mode** — switch `#fill` and `#stroke` values via JS based on `prefers-color-scheme`
- **Invisible edges** — use `-/-` for layout alignment without drawing a line
- **Custom colors** — define styles like `#.lrs: fill=#EBEFF7 stroke=#5B6ABF` then `[<lrs> users]`
- **Line breaks in labels** — use `[multi\nline\nlabel]` within a node
