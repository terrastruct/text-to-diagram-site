import * as React from "react";

import * as vscOniguruma from "vscode-oniguruma";
import * as vscTextMate from "vscode-textmate";
// @ts-ignore
import onigWasm from "vscode-oniguruma/release/onig.wasm";

import d2Grammar from "@/extensions/d2-vscode/syntaxes/d2.tmLanguage.json";
import plantumlGrammar from "@/extensions/vscode-plantuml/syntaxes/plantuml.tmLanguage.json";
// import mermaidGrammar from "@/extensions/mermaid-vscode/syntaxes/mermaid.tmLanguage.json";
import mermaidGrammar from "shiki/languages/mermaid.tmLanguage.json";
// import graphvizGrammar from "@/extensions/graphviz-vscode/syntaxes/graphviz.tmLanguage";
import graphvizGrammar from "@/extensions/graphviz-vscode/syntaxes/dot.tmLanguage";

import markdownGrammar from "@/extensions/d2-vscode/syntaxes/markdown.tmLanguage.json";
import lightTheme from "@/extensions/d2-vscode/themes/light-color-theme.json";
// import darkTheme from "@/d2-vscode/themes/dark-color-theme.json";

import metadataConsts from "./metadata-consts";
import tm from "@/lib/tm";

// TODO: clipboard copy button
export default function D2CodeBlock(props: any) {
  let source = props.source;
  if (source === "plantuml") {
    source = "wsd";
  } else if (source === "graphviz") {
    source = "dot";
  }
  const scope = "source." + source;

  const [tmGrammar, setTMGrammar] = React.useState(getTextMateGrammar(scope));

  React.useEffect(() => {
    (async () => {
      try {
        const g = await initTextMateGrammar(scope);
        setTMGrammar && setTMGrammar(g);
      } catch (e) {
        console.error(e);
      }
    })();
    return () => {};
  }, [props.source]);

  let theme: any;
  const preStyle: any = {
    lineHeight: "20px",
  };
  const colorMode = "light";
  switch (colorMode) {
    case "light":
      theme = lightTheme;
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
    tm.tmRegistry.setTheme(theme);
    tm.tmRegistry.ruleStack = vscTextMate.INITIAL;
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
  const g = tm.tmGrammars.get(scope);
  if (g && !(g instanceof Promise)) {
    return g;
  }
  return undefined;
}

async function initTextMateGrammar(scope: any) {
  let g = tm.tmGrammars.get(scope);
  if (g) {
    return await g;
  }

  if (!tm.tmRegistry) {
    tm.tmRegistry = newTextMateRegistry();
  }
  tm.tmRegistry = await tm.tmRegistry;

  g = tm.tmRegistry.loadGrammar(scope);
  tm.tmGrammars.set(scope, g);
  g = await g;
  tm.tmGrammars.set(scope, g);
  return g;
}

async function newTextMateRegistry() {
  const resp = await fetch(onigWasm);
  await vscOniguruma.loadWASM(resp);

  return new vscTextMate.Registry({
    // @ts-ignore
    onigLib: vscOniguruma,
    loadGrammar: async (scope) => {
      switch (scope) {
        case "source.d2":
          return parseRawGrammar(d2Grammar);
        case "source.wsd":
          return parseRawGrammar(plantumlGrammar);
        case "source.mermaid":
          return parseRawGrammar(mermaidGrammar);
        case "source.dot":
          return parseRawGrammar(graphvizGrammar);
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
  const colorMap = tm.tmRegistry.getColorMap();
  const res = tmGrammar.tokenizeLine2(line, tm.tmRegistry.ruleStack);

  for (let j = 0; j < res.tokens.length; j += 2) {
    const style: any = {};
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
  tm.tmRegistry.ruleStack = res.ruleStack;
  return children;
}
