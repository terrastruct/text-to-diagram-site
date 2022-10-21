// This sucks. Tried a fair amount of ways to get dynamic image imports from just reading examples, but couldn't get it to work.
// Whenever an example is added, this file will also have to be updated

import d2_basic_tala from '@/examples/0_basic/render/d2_tala.png';
import d2_basic_dagre from '@/examples/0_basic/render/d2_dagre.png';
import graphviz_basic_dot from '@/examples/0_basic/render/graphviz_dot.png';
import mermaid_basic_dagre from '@/examples/0_basic/render/mermaid_dagre.png';
import plantuml_basic_dot from '@/examples/0_basic/render/plantuml_dot.png';

import d2_containers_tala from '@/examples/1_containers/render/d2_tala.png';
import d2_containers_dagre from '@/examples/1_containers/render/d2_dagre.png';
import graphviz_containers_dot from '@/examples/1_containers/render/graphviz_dot.png';
import mermaid_containers_dagre from '@/examples/1_containers/render/mermaid_dagre.png';
import plantuml_containers_dot from '@/examples/1_containers/render/plantuml_dot.png';

import d2_shapes_tala from '@/examples/2_shapes/render/d2_tala.png';
import d2_shapes_dagre from '@/examples/2_shapes/render/d2_dagre.png';
import graphviz_shapes_dot from '@/examples/2_shapes/render/graphviz_dot.png';
import mermaid_shapes_dagre from '@/examples/2_shapes/render/mermaid_dagre.png';
import plantuml_shapes_dot from '@/examples/2_shapes/render/plantuml_dot.png';

export function getImage(id: string) {
  switch (id.toLowerCase()) {
    case "d2-basic-tala":
      return d2_basic_tala;
    case "d2-basic-dagre":
      return d2_basic_dagre;
    case "plantuml-basic-dot":
      return plantuml_basic_dot;
    case "mermaid-basic-dagre":
      return mermaid_basic_dagre;
    case "graphviz-basic-dot":
      return graphviz_basic_dot;

    case "d2-containers-tala":
      return d2_containers_tala;
    case "d2-containers-dagre":
      return d2_containers_dagre;
    case "plantuml-containers-dot":
      return plantuml_containers_dot;
    case "mermaid-containers-dagre":
      return mermaid_containers_dagre;
    case "graphviz-containers-dot":
      return graphviz_containers_dot;

    case "d2-shapes-tala":
      return d2_shapes_tala;
    case "d2-shapes-dagre":
      return d2_shapes_dagre;
    case "plantuml-shapes-dot":
      return plantuml_shapes_dot;
    case "mermaid-shapes-dagre":
      return mermaid_shapes_dagre;
    case "graphviz-shapes-dot":
      return graphviz_shapes_dot;
  }
}
