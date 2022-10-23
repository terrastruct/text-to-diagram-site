if [ -z "$1" ]
then
      echo "Usage: render.sh [example]. E.g. render.sh 0_basic"
fi

D2_LAYOUT=tala d2 src/examples/$1/syntax/d2 src/examples/$1/render/d2_tala.svg
D2_LAYOUT=dagre d2 src/examples/$1/syntax/d2 src/examples/$1/render/d2_dagre.svg
mmdc -i src/examples/$1/syntax/mermaid -o src/examples/$1/render/mermaid_dagre.svg
dot -Tsvg src/examples/$1/syntax/graphviz > src/examples/$1/render/graphviz_dot.svg
dot -Kneato -Tsvg src/examples/$1/syntax/graphviz > src/examples/$1/render/graphviz_neato.svg
plantuml -Tsvg src/examples/$1/syntax/plantuml -o ../render
mv src/examples/$1/render/plantuml.svg src/examples/$1/render/plantuml_dot.svg
