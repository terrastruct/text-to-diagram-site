// This sucks. Tried a fair amount of ways to get dynamic image imports from just reading examples, but couldn't get it to work.
// Whenever an example is added, this file will also have to be updated

import d2_basic from '@/examples/0_basic/render/d2.png';
import plantuml_basic from '@/examples/0_basic/render/plantuml.png';
import mermaid_basic from '@/examples/0_basic/render/mermaid.png';
import graphviz_basic from '@/examples/0_basic/render/graphviz.png';

import d2_containers from '@/examples/1_containers/render/d2.png';
import plantuml_containers from '@/examples/1_containers/render/plantuml.png';
import mermaid_containers from '@/examples/1_containers/render/mermaid.png';
import graphviz_containers from '@/examples/1_containers/render/graphviz.png';

import d2_shapes from '@/examples/2_shapes/render/d2.png';
import plantuml_shapes from '@/examples/2_shapes/render/plantuml.png';
import mermaid_shapes from '@/examples/2_shapes/render/mermaid.png';
import graphviz_shapes from '@/examples/2_shapes/render/graphviz.png';

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

    case "d2-containers":
      return d2_containers;
    case "plantuml-containers":
      return plantuml_containers;
    case "mermaid-containers":
      return mermaid_containers;
    case "graphviz-containers":
      return graphviz_containers;

    case "d2-shapes":
      return d2_shapes;
    case "plantuml-shapes":
      return plantuml_shapes;
    case "mermaid-shapes":
      return mermaid_shapes;
    case "graphviz-shapes":
      return graphviz_shapes;
  }
}
