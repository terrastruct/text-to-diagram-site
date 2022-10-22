<div align="center">
  <img
  src="https://github.com/terrastruct/text-to-diagram.com/blob/6e91e491a0ac913b1ac8b9f710d520cdee903057/public/svg/switch.svg"
  width="150px"
  height="150px"
  />
  <h1>Text to diagram comparisons</h1>
  <p>Compare syntax, layouts, outputs between languages for generating diagrams with text.</p>
</div>

<p align="center">
  <img align="center" width="754" alt="Screen Shot 2022-10-22 at 3 57 45 PM" src="https://user-images.githubusercontent.com/3120367/197365340-9d4ab821-acd9-4a64-9c9b-035da7f7a6bb.png">
</p>

*Full disclosure: This is created and maintained by Terrastruct. We created D2, and it's
in our interest to provide anyone evaluating us with an objective comparison against
others in the space. The only favor granted to D2 is that it shows up as the first
comparison. We welcome contributions, and if any examples potentially make D2 look bad, we
will include them without bias (and then furiously improve D2 so the example looks better,
a right other tools have as well).*

### Currently supported comparisons

High-quality comparisons take a lot of work, which will only get more as the number of
examples grows. Other than D2, the currently supported set are what seem to be the most
popular tools for text-to-diagram.

- D2
- Mermaid
- GraphViz
- PlantUML

For completeness, you may want to also evaluate less popular tools/languages. The best
catalog we've found is
[https://xosh.org/text-to-diagram/](https://xosh.org/text-to-diagram/).

## FAQ

- See [https://text-to-diagram.com#faq](https://text-to-diagram.com#faq)

## Contributing

### Run locally

`yarn && yarn dev`

### Adding examples

Please follow the examples in `src/examples`.

1. Create a folder in `src/examples` with a short name of the example
1. Add in that folder:
  - `description.txt` to describe what the example aims to demonstrate.
  - `render/` for SVG renders
  - `syntax/` for texts
1. Create the text for as many languages as you can. It's okay if not totally complete. We
   or others can fill.
1. Run `./render.sh` (with the respective tools installed)

### Adding features

If you think there's a significant feature that people want to compare against, feel free
to add a line in `src/components/Features.tsx`.

### Adding languages

If you wish to add a new language, please fill out as many of the examples and features as
possible. It's a lot of work, but if there's enough interest in the language, perhaps
others will help out.
