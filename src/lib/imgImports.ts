// Tried a fair amount of ways to get dynamic image imports from just reading examples, but couldn't get it to work.
// Whenever an example is added, this file will also have to be updated

import d2_basic_tala from '@/examples/0_basic/render/d2_tala.svg';
import d2_basic_dagre from '@/examples/0_basic/render/d2_dagre.svg';
import graphviz_basic_dot from '@/examples/0_basic/render/graphviz_dot.svg';
import graphviz_basic_neato from '@/examples/0_basic/render/graphviz_neato.svg';
import mermaid_basic_dagre from '@/examples/0_basic/render/mermaid_dagre.svg';
import plantuml_basic_dot from '@/examples/0_basic/render/plantuml_dot.svg';

import d2_containers_tala from '@/examples/1_containers/render/d2_tala.svg';
import d2_containers_dagre from '@/examples/1_containers/render/d2_dagre.svg';
import graphviz_containers_dot from '@/examples/1_containers/render/graphviz_dot.svg';
import graphviz_containers_neato from '@/examples/1_containers/render/graphviz_neato.svg';
import mermaid_containers_dagre from '@/examples/1_containers/render/mermaid_dagre.svg';
import plantuml_containers_dot from '@/examples/1_containers/render/plantuml_dot.svg';

import d2_shapes_tala from '@/examples/2_shapes/render/d2_tala.svg';
import d2_shapes_dagre from '@/examples/2_shapes/render/d2_dagre.svg';
import graphviz_shapes_dot from '@/examples/2_shapes/render/graphviz_dot.svg';
import graphviz_shapes_neato from '@/examples/2_shapes/render/graphviz_neato.svg';
import mermaid_shapes_dagre from '@/examples/2_shapes/render/mermaid_dagre.svg';
import plantuml_shapes_dot from '@/examples/2_shapes/render/plantuml_dot.svg';

import d2_trees_tala from '@/examples/3_trees/render/d2_tala.svg';
import d2_trees_dagre from '@/examples/3_trees/render/d2_dagre.svg';
import graphviz_trees_dot from '@/examples/3_trees/render/graphviz_dot.svg';
import graphviz_trees_neato from '@/examples/3_trees/render/graphviz_neato.svg';
import mermaid_trees_dagre from '@/examples/3_trees/render/mermaid_dagre.svg';
import plantuml_trees_dot from '@/examples/3_trees/render/plantuml_dot.svg';

import d2_chess_tala from '@/examples/4_chess/render/d2_tala.svg';
import d2_chess_dagre from '@/examples/4_chess/render/d2_dagre.svg';
import graphviz_chess_dot from '@/examples/4_chess/render/graphviz_dot.svg';
import graphviz_chess_neato from '@/examples/4_chess/render/graphviz_neato.svg';
import plantuml_chess_dot from '@/examples/4_chess/render/plantuml_dot.svg';

import d2_icons_tala from '@/examples/5_icons/render/d2_tala.svg';
import d2_icons_dagre from '@/examples/5_icons/render/d2_dagre.svg';
import mermaid_icons_dagre from '@/examples/5_icons/render/mermaid_dagre.svg';
import plantuml_icons_dot from '@/examples/5_icons/render/plantuml_dot.svg';

import d2_tables_tala from '@/examples/6_tables/render/d2_tala.svg';
import d2_tables_dagre from '@/examples/6_tables/render/d2_dagre.svg';
import graphviz_tables_dot from '@/examples/6_tables/render/graphviz_dot.svg';
import graphviz_tables_neato from '@/examples/6_tables/render/graphviz_neato.svg';
import mermaid_tables_dagre from '@/examples/6_tables/render/mermaid_dagre.svg';
import plantuml_tables_dot from '@/examples/6_tables/render/plantuml_dot.svg';

import mermaid_sequence_dagre from '@/examples/7_sequence/render/mermaid_dagre.svg';
import plantuml_sequence_dot from '@/examples/7_sequence/render/plantuml_dot.svg';

export function getImage(id: string) {
  switch (id.toLowerCase()) {
    case 'd2-basic-tala':
      return d2_basic_tala;
    case 'd2-basic-dagre':
      return d2_basic_dagre;
    case 'plantuml-basic-dot':
      return plantuml_basic_dot;
    case 'mermaid-basic-dagre':
      return mermaid_basic_dagre;
    case 'graphviz-basic-dot':
      return graphviz_basic_dot;
    case 'graphviz-basic-neato':
      return graphviz_basic_neato;

    case 'd2-containers-tala':
      return d2_containers_tala;
    case 'd2-containers-dagre':
      return d2_containers_dagre;
    case 'plantuml-containers-dot':
      return plantuml_containers_dot;
    case 'mermaid-containers-dagre':
      return mermaid_containers_dagre;
    case 'graphviz-containers-dot':
      return graphviz_containers_dot;
    case 'graphviz-containers-neato':
      return graphviz_containers_neato;

    case 'd2-shapes-tala':
      return d2_shapes_tala;
    case 'd2-shapes-dagre':
      return d2_shapes_dagre;
    case 'plantuml-shapes-dot':
      return plantuml_shapes_dot;
    case 'mermaid-shapes-dagre':
      return mermaid_shapes_dagre;
    case 'graphviz-shapes-dot':
      return graphviz_shapes_dot;
    case 'graphviz-shapes-neato':
      return graphviz_shapes_neato;

    case 'd2-trees-tala':
      return d2_trees_tala;
    case 'd2-trees-dagre':
      return d2_trees_dagre;
    case 'plantuml-trees-dot':
      return plantuml_trees_dot;
    case 'mermaid-trees-dagre':
      return mermaid_trees_dagre;
    case 'graphviz-trees-dot':
      return graphviz_trees_dot;
    case 'graphviz-trees-neato':
      return graphviz_trees_neato;

    case 'd2-chess-tala':
      return d2_chess_tala;
    case 'd2-chess-dagre':
      return d2_chess_dagre;
    case 'plantuml-chess-dot':
      return plantuml_chess_dot;
    case 'graphviz-chess-dot':
      return graphviz_chess_dot;
    case 'graphviz-chess-neato':
      return graphviz_chess_neato;

    case 'd2-icons-tala':
      return d2_icons_tala;
    case 'd2-icons-dagre':
      return d2_icons_dagre;
    case 'plantuml-icons-dot':
      return plantuml_icons_dot;
    case 'mermaid-icons-dagre':
      return mermaid_icons_dagre;

    case 'd2-tables-tala':
      return d2_tables_tala;
    case 'd2-tables-dagre':
      return d2_tables_dagre;
    case 'plantuml-tables-dot':
      return plantuml_tables_dot;
    case 'mermaid-tables-dagre':
      return mermaid_tables_dagre;
    case 'graphviz-tables-dot':
      return graphviz_tables_dot;
    case 'graphviz-tables-neato':
      return graphviz_tables_neato;

    case 'mermaid-sequence-dagre':
      return mermaid_sequence_dagre;
    case 'plantuml-sequence-dot':
      return plantuml_sequence_dot;
  }
}
