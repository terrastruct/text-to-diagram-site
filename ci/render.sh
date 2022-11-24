#!/bin/sh
cd -- "$(dirname "$0")/.."
examples=()


if [ -z "$1" ]
then
  # Rendering for all examples
  search_dir=./src/examples
  for f in "$search_dir"/*
  do
    filename=$(basename -- "$f")
    examples+=("$filename")
  done
else
  # Rendering for a specific example
  examples+=($1)
fi

for ex in ${examples[@]}
do
  D2_LAYOUT=tala d2 src/examples/$ex/syntax/d2 src/examples/$ex/render/d2_tala.svg
  D2_LAYOUT=dagre d2 src/examples/$ex/syntax/d2 src/examples/$ex/render/d2_dagre.svg
  D2_LAYOUT=elk d2 src/examples/$ex/syntax/d2 src/examples/$ex/render/d2_elk.svg
  # v9.2.2
  mmdc -i src/examples/$ex/syntax/mermaid -o src/examples/$ex/render/mermaid_dagre.svg
  dot -Tsvg src/examples/$ex/syntax/graphviz > src/examples/$ex/render/graphviz_dot.svg
  dot -Kneato -Tsvg src/examples/$ex/syntax/graphviz > src/examples/$ex/render/graphviz_neato.svg
  plantuml -Tsvg src/examples/$ex/syntax/plantuml -o ../render
  mv src/examples/$ex/render/plantuml.svg src/examples/$ex/render/plantuml_dot.svg
done
