<div align="center">
  <img
  src="https://github.com/terrastruct/text-to-diagram.com/blob/6e91e491a0ac913b1ac8b9f710d520cdee903057/public/svg/switch.svg"
  width="150px"
  height="150px"
  />
  <h1>Text to diagram comparisons</h1>
  <p>Compare syntax, layouts, outputs between languages for generating diagrams with text.</p>
</div>

## FAQ

- Why isn't [my favorite tool] on here?
  - The cross-table of examples and tools is big, and nobody's gotten around to it yet.
    The goal is to reach parity with
    [https://xosh.org/text-to-diagram/](https://xosh.org/text-to-diagram/), which is the
    current most comprehensive list on the web, and we're adding in order of popularity.
- Can I help?
  - Yes! If you'd like to help support your favorite tool, we welcome pull requests for
    language additions.

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
