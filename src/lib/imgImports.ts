// This sucks. Tried a fair amount of ways to get dynamic image imports from just reading examples, but couldn't get it to work.
// Whenever an example is added, this file will also have to be updated

import d2_basic from '@/examples/0_basic/render/d2.png';
import plantuml_basic from '@/examples/0_basic/render/plantuml.png';
import mermaid_basic from '@/examples/0_basic/render/mermaid.png';
import graphviz_basic from '@/examples/0_basic/render/graphviz.png';

export function getImage(id: string) {
  switch (id.toLowerCase()) {
    case "d2-basic":
      return d2_basic;
    case "plantuml-basic":
      return plantuml_basic;
    case "mermaid-basic":
      return mermaid_basic;
    case "graphviz-basic":
      return graphviz_basic;
  }
}
