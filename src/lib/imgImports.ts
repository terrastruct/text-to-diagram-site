import d2_basic from '@/examples/0_basic/render/d2.png';
import plantuml_basic from '@/examples/0_basic/render/plantuml.png';

// This sucks. Tried a fair amount of ways to get dynamic image imports from just reading examples, but couldn't get it to work.
// Whenever an example is added, this file will also have to be updated

export function getImage(id: string) {
  switch (id.toLowerCase()) {
    case "d2-basic":
      return d2_basic;
    case "plantuml-basic":
      return plantuml_basic;
  }
}
