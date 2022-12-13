#!/bin/sh
set -eu
. "$(dirname "$0")/../ci/sub/lib.sh"
cd -- "$(dirname "$0")/.."

_d2() {
  sh_c D2_LAYOUT=tala hide d2 ./src/examples/"$ex"/syntax/d2 ./src/examples/"$ex"/render/d2_tala.svg
  sh_c D2_LAYOUT=dagre hide d2 ./src/examples/"$ex"/syntax/d2 ./src/examples/"$ex"/render/d2_dagre.svg
  sh_c D2_LAYOUT=elk hide d2 ./src/examples/"$ex"/syntax/d2 ./src/examples/"$ex"/render/d2_elk.svg
}

mmdc() {
  npx --package @mermaid-js/mermaid-cli@9.2.2 -- mmdc "$@"
}

_mmdc() {
  sh_c mmdc -i ./src/examples/"$ex"/syntax/mermaid -o ./src/examples/"$ex"/render/mermaid_dagre.svg
}

_dot() {
  sh_c dot -Tsvg ./src/examples/"$ex"/syntax/graphviz >src/examples/"$ex"/render/graphviz_dot.svg
  sh_c dot -Kneato -Tsvg ./src/examples/"$ex"/syntax/graphviz >src/examples/"$ex"/render/graphviz_neato.svg
}

_plantuml() {
  sh_c plantuml -Tsvg ./src/examples/"$ex"/syntax/plantuml -o ../render
  mv ./src/examples/"$ex"/render/plantuml.svg ./src/examples/"$ex"/render/plantuml_dot.svg
}

main() {
  job_parseflags "$@"
  for ex in $(find ./src/examples -mindepth 1 -maxdepth 1 | sort -V); do
    ex=${ex#./src/examples/}
    export JOBNAME=$ex
    if ! runjob_filter; then
      continue
    fi

    FGCOLOR=5 bigheader "$ex"
    if [ -f ./src/examples/"$ex"/syntax/d2 ]; then
      runjob _d2 &
    fi
    if [ -f ./src/examples/"$ex"/syntax/mermaid ]; then
      runjob _mmdc &
    fi
    if [ -f ./src/examples/"$ex"/syntax/graphviz ]; then
      [ "$ex" != 8_text ] && runjob _dot &
    fi
    if [ -f ./src/examples/"$ex"/syntax/plantuml ]; then
      runjob _plantuml &
    fi
    waitjobs
  done
}

main "$@"
