set -eu

D2_LAYOUT=tala d2 src/examples/$1/syntax/d2 src/examples/$1/render/d2_tala.svg
D2_LAYOUT=dagre d2 src/examples/$1/syntax/d2 src/examples/$1/render/d2_dagre.svg
mmdc -i src/examples/$1/syntax/mermaid -o src/examples/$1/render/mermaid_dagre.svg
