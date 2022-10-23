<div align="center">
  <br />
  <div align="center">
    <img src="https://raw.githubusercontent.com/terrastruct/d2-vscode/master/docs/assets/header.png" alt="D2" />
  </div>
  <br />
</div>

# VSCode extension for [D2](https://d2-lang.com) files.

Currently only supports syntax highlighting of `.d2` files.

```d2
x -> y

# d2-vscode can syntax highlight nested markdown correctly.
y: |`md
  # d2-vscode
  VSCode extension for [D2](https://d2-lang.com) files.
`|
```

## Contributing

To package and install the extension locally, run:

```sh
npm install -g vsce
npm run dev
```

You can run rerun `npm run dev` after any change to install the updated extension.

Sometimes VS Code will not pick up the new extension without being restarted so you
can also run the following on macOS:

```sh
# Where d2-testing is some folder in which you want to test the extension.
osascript -e 'quit app "Visual Studio Code"'; yarn dev && code ~/d2-testing
```

### launch.json

We have a `.vscode/launch.json` that enables starting a separate debug VS Code with the
extension installed without affecting your existing VS Code instance. To use, open
`d2-vscode` with VS Code and hit `F5`. Press `CMD+R` after making changes to restart the
debug VS Code with the updated extension.

### Generating tmLanguage.json

To regenerate `d2.tmLanguage.json` after updating `d2.tmLanguage.yaml`:

```sh
brew install yq
npm run gen
```

note: `npm run dev` will regenerate for you.

### Debugging Keybind

Highly recommend the following keybind for inspecting the textmate scopes under the cursor.

```json
{
  "key": "cmd+i",
  "command": "editor.action.inspectTMScopes"
}
```

### Offline Distribution

See https://code.visualstudio.com/docs/editor/extension-marketplace#_install-from-a-vsix

```sh
npm install -g vsce
npm run pkg
# To install:
# code --install-extension d2.vsix
# To uninstall:
# code --uninstall-extension terrastruct.d2
```

### markdown.tmLanguage.json

Syntax file used for markdown embedded within d2 block strings.

1. Copied from VS Code's markdown-basics extension.
2. Renamed to `markdown.d2` and scope to `text.html.markdown.d2`
3. Then with vim:
   ```
   %s/\(?:\)\?\^|\\\\G/\1(?!.*`\\\\|)(?:\^|\\\\G)/g
   ```

- This replacement ensures the markdown syntax never matches on block string
  terminators.

4. Then with sed:
   ```sh
   gsed -i -E 's/\[ \]\{[^}]*?\}/\\\\s*/' markdown.tmLanguage.json
   ```

- This replacement ensures that the markdown syntax doesn't consider leading spaces to be
  the beginning of an indented code block as in d2, block strings are indented for
  readability without the indentation being part of the string contents.

5. Now delete the `list` from `#block`. Lists for some reason eat the block string
   terminator. e.g. with them enabled the following syntax after the terminating `|`
   will remain markdown:

   ```d2
   my shape: |md
     1. first
   |

   should be d2 but VS Code highlights as markdown.
   ```

6. Add `fenced_code_block_d2` based on `fenced_code_block_css` to allow embedding markdown
   with d2 within d2.
