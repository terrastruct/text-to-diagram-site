import * as React from "react";

import * as vscOniguruma from "vscode-oniguruma";
import * as vscTextMate from "vscode-textmate";
import onigWasm from "vscode-oniguruma/release/onig.wasm";

import d2Grammar from "@/d2-vscode/syntaxes/d2.tmLanguage.json";
import markdownGrammar from "@/d2-vscode/syntaxes/markdown.tmLanguage.json";
import lightTheme from "@/d2-vscode/themes/light-color-theme.json";
// import darkTheme from "@/d2-vscode/themes/dark-color-theme.json";

import metadataConsts from "./metadata-consts";

const tmGrammars = new Map();
let tmRegistry: any;

// TODO: clipboard copy button
export default function D2CodeBlock(props: any) {
  const scope = "source.d2";

  let [tmGrammar, setTMGrammar] = React.useState(getTextMateGrammar(scope));

  React.useEffect(() => {
    if (tmGrammar) {
      return;
    }
    (async () => {
      try {
        const g = await initTextMateGrammar(scope);
        setTMGrammar && setTMGrammar(g);
      } catch (e) {
        console.error(e);
      }
    })();
    return () => {};
  }, []);

  let theme: any;
  let preStyle: any = {
    lineHeight: "25px",
  };
  const colorMode = "light";
  switch (colorMode) {
    case "light":
      theme = lightTheme;
      preStyle.border = "solid #dee1eb 1px";
      break;
    // case "dark":
    //   theme = darkTheme;
    //   preStyle.border = "solid #606770 1px";
    //   break;
  }
  preStyle.backgroundColor = theme.colors["editor.background"];

  const children = [];
  if (tmGrammar) {
    // vscode-textmate expects "tokenColors" as "settings".
    theme.settings = theme.tokenColors;
    tmRegistry.setTheme(theme);
    tmRegistry.ruleStack = vscTextMate.INITIAL;
  }

  const lines = props.children.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (i == lines.length - 1 && line === "") {
      continue;
    }

    children.push(
      <span
        style={{
          color: theme.colors["editorLineNumber.foreground"],
          marginRight: "20px",
          userSelect: "none",
          textAlign: "right",
          width: lines.length > 9 ? "20px" : undefined,
          display: "inline-block",
        }}
        key={`ln-${i}`}
      >
        {i + 1}
      </span>
    );

    children.push(
      <span key={`line-${i}`}>
        {tmGrammar ? highlightLine(tmGrammar, line) : line}
      </span>
    );

    if (i < lines.length - 1) {
      children.push(<br key={`br-${i}`} />);
    }
  }

  return <pre style={preStyle}>{children}</pre>;
}

function getTextMateGrammar(scope: any) {
  const g = tmGrammars.get(scope);
  if (g && !(g instanceof Promise)) {
    return g;
  }
  return undefined;
}

async function initTextMateGrammar(scope: any) {
  let g = tmGrammars.get(scope);
  if (g) {
    return await g;
  }

  if (!tmRegistry) {
    tmRegistry = newTextMateRegistry();
  }
  tmRegistry = await tmRegistry;

  g = tmRegistry.loadGrammar(scope);
  tmGrammars.set(scope, g);
  g = await g;
  tmGrammars.set(scope, g);
  return g;
}

async function newTextMateRegistry() {
  const resp = await fetch(onigWasm);
  await vscOniguruma.loadWASM(resp);

  return new vscTextMate.Registry({
    onigLib: vscOniguruma,
    loadGrammar: async (scope) => {
      switch (scope) {
        case "source.d2":
          return parseRawGrammar(d2Grammar);
        case "text.html.markdown.d2":
          return parseRawGrammar(markdownGrammar);
      }

      console.warn(`unknown scope name: ${scope}`);
      return undefined;
    },
  });
}

async function parseRawGrammar(path: any) {
  const json = await (await fetch(path)).text();
  return vscTextMate.parseRawGrammar(json, path);
}

async function fetch(path: any) {
  const resp = await window.fetch(path);
  if (!resp.ok) {
    throw new Error(
      `fetching ${path} failed: ${resp.status} ${resp.statusText}`
    );
  }
  return resp;
}

const fontStyles: any = {
  "-1": "inherit",
  0: "normal",
  1: "italic",
  2: "bold",
  3: "underline",
};

function highlightLine(tmGrammar: any, line: any) {
  const children = [];
  const colorMap = tmRegistry.getColorMap();
  const res = tmGrammar.tokenizeLine2(line, tmRegistry.ruleStack);

  for (let j = 0; j < res.tokens.length; j += 2) {
    let style: any = {};
    const tokenStart = res.tokens[j];
    const tokenMeta = res.tokens[j + 1];

    let tokenEnd = line.length;
    if (j + 2 < res.tokens.length) {
      // The token ends at the beginning of the next token.
      tokenEnd = res.tokens[j + 2];
    }

    const token = line.substring(tokenStart, tokenEnd);
    const fontStyleIndex =
      (tokenMeta & metadataConsts.FONT_STYLE_MASK) >>>
      metadataConsts.FONT_STYLE_OFFSET;
    const foregroundIndex =
      (tokenMeta & metadataConsts.FOREGROUND_MASK) >>>
      metadataConsts.FOREGROUND_OFFSET;
    const backgroundIndex =
      (tokenMeta & metadataConsts.BACKGROUND_MASK) >>>
      metadataConsts.BACKGROUND_OFFSET;

    style.color = colorMap[foregroundIndex];
    style.backgroundColor = colorMap[backgroundIndex];

    const fontStyle = fontStyles[fontStyleIndex];
    switch (fontStyle) {
      case "bold":
        style.fontWeight = fontStyle;
        break;
      case "underline":
        style.textDecoration = fontStyle;
        break;
      default:
        style.fontStyle = fontStyle;
        break;
    }
    children.push(
      <span key={`token-${j}`} style={style}>
        {token}
      </span>
    );
  }
  tmRegistry.ruleStack = res.ruleStack;
  return children;
}
