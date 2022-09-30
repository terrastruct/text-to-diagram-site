import * as React from 'react';
import classnames from 'classnames';

import PlantUMLLogo from '~/svg/plantuml.svg';
import D2Logo from '~/svg/d2.svg';
import MermaidLogo from '~/svg/mermaid.svg';
import GraphvizLogo from '~/svg/graphviz.svg';

import Info from '~/svg/info.svg';
import Link from '~/svg/link.svg';

import { LangNames } from '@/constant/langs';

import CodeBlock from '@/components/CodeBlock';

import {getImage} from '@/lib/imgImports';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

type LangProps = {
  name: string;
  active: boolean;
  select: (x: string) => void;
}

function getCanonicalName(name: string) {
  switch (name) {
    case "d2":
      return "D2";
    case "plantuml":
      return "PlantUML";
    case "mermaid":
      return "MermaidJS";
    case "graphviz":
      return "GraphViz";
  }
  return "Unknown";
}

function getLogo(name: string, size: string) {
  switch (name) {
    case "d2":
      return <D2Logo className={size} />;
    case "plantuml":
      return <PlantUMLLogo className={size} />;
    case "mermaid":
      return <MermaidLogo className={size} />;
    case "graphviz":
      return <GraphvizLogo className={size} />;
  }
  return "Unknown";
}

function Lang(props: LangProps) {
  const canonicalName = getCanonicalName(props.name);
  const logo = getLogo(props.name, "text-xl");
  const onClick = () => {
    props.select(props.name);
  }
  return (
    <div
      onClick={onClick}
      className={classnames("text-steel-900 block px-4 py-2 flex justify-start items-center gap-2 font-primary-medium text-l", {
        'cursor-pointer': !props.active,
        'hover:bg-steel-50': !props.active,
      })} role="menuitem" tabIndex={-1}>{logo} {canonicalName}</div>
  );
}

type LangsProps = {
  activeLang: string;
  inactiveLang: string;
  setActive: (x: string) => void;
  index: number;
}

function Langs(props: LangsProps) {
  const [menuShown, setMenuShown] = React.useState<boolean>(false);

  const onClick = (name: string) => {
    setMenuShown(false);
    if (name !== props.activeLang) {
      props.setActive(name);
    }
  }

  const langEls = [];
  for (const langName of LangNames) {
    langEls.push(
      <Lang name={langName} key={langName} active={langName === props.activeLang} select={onClick} />
    );
  }

  let link: string;
  switch (props.activeLang) {
    case 'd2': link = "https://d2-lang.com"; break;
    case 'plantuml': link = "https://plantuml.com"; break;
    case 'mermaid': link = "https://mermaid-js.github.io/mermaid"; break;
    case 'graphviz': link = "https://graphviz.org/"; break;
  }

  const renderLink = () => {
    return (
      <span>
        {link}
      </span>
    );
  }

  const renderInfo = () => {
    const renderDescription = () => {
      switch (props.activeLang) {
        case 'd2':
          return "D2 is written in Go and released in 2022 by Terrastruct, Inc. It is focused on flowchart-style software architecture diagrams. It has native support for icons";
        case 'plantuml':
          return "PlantUML is a Java-based tool released in 2009 primarily for creating UML diagrams. It's specification, at 416 pages, is rigorous, closely aligning with the specification of UML. It has since grown to support non-UML diagrams as well, such as network diagrams, Gantt charts, and mind maps.";
        case 'mermaid':
          return "Mermaid, or MermaidJS, is a Javascript-based diagramming tool first released in 2014 by Knut Sveidqvist. It renders Markdown-inspired text definitions to create and modify diagrams dynamically. One of its goals is to allow even non-programmers to easily create detailed diagrams. Mermaid has distinct syntax for a variety of diagrams, and leverages open-source layout engines for client-side rendering. Recently, Github has adopted native support for Mermaid diagrams in Markdown."
        case 'graphviz':
          return "Graphviz is a graph visualization software for abstract graphs and networks born at AT&T Bell Labs in 1991. It uses a variety of layout algorithms to cover a wide breadth of domains such as UML diagrams, code dependency graphs, network maps, mind maps, and more."
      }
    }

    const description = renderDescription();
    return (
      <div className='bg-white p-4'>
        <div className='flex flex-col justify-start text-steel-900'>
          <h2 className='font-primary-regular flex items-center justify-start gap-2 pb-2'>{getLogo(props.activeLang, "text-3xl")} {getCanonicalName(props.activeLang)}</h2>
          <div className="text-steel-800">
          {description}
          </div>
        </div>
      </div>
    );
  }


  const ReffedInfo = React.forwardRef((props, ref: any) => {
    return <div ref={ref}><Info className='text-xl' /></div>
  });

  const ReffedLink = React.forwardRef((props, ref: any) => {
    return <div ref={ref} onClick={() => window.open(link, "_blank")}><Link className='text-xl cursor-pointer' /></div>
  });


  // https://tailwindui.com/components/application-ui/elements/dropdowns
  return (
    <div
      onMouseLeave={() => setMenuShown(false)}
    >
      <div className='flex justify-start items-center bg-steel-25 rounded-t-md border-b border-solid border-steel-200 gap-4 px-4 py-2'>
        <div className="relative inline-block text-left grow">
          <button type="button" className="w-full rounded-md border border-steel-200 bg-white pr-4 py-0 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100" id="menu-button" aria-expanded="true" aria-haspopup="true"
            onClick={() => setMenuShown(!menuShown)}
          >
            <div className='flex justify-between items-center w-full text-left'>
              <div className='flex flex-col justify-start items-start'>
                <span className="text-sm text-steel-500 pl-4 -mb-2">
                  {props.index === 1 ? "1st" : "2nd"} language
                </span>
                <Lang name={props.activeLang} key="active" active={true} select={() => {}} />
              </div>

              <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            </div>
          </button>
          {menuShown &&
          <div className="absolute left-0 z-10 mt-2 w-full origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
            <div className="py-1" role="none">
              {langEls}
            </div>
          </div>
          }
        </div>
        <Tippy content={renderInfo()} arrow={false}>
          <ReffedInfo />
        </Tippy>
        <Tippy content={renderLink()} arrow={false}>
          <ReffedLink />
        </Tippy>
      </div>
    </div>
  );
}

type ExampleProps = {
  name: string;
  active: boolean;
  setExample: (x: string) => void;
}

function Example(props: ExampleProps) {
  return (
    <div>
      <div className={classnames('flex flex-col justify-center items-center text-steel-900 shadow-light rounded-md w-32 sm:w-48 h-20 font-primary-medium', {
        'border border-solid border-steel-200': props.active,
          'cursor-pointer': !props.active,
          'opacity-50': !props.active,
          'bg-steel-100': !props.active,
        })}
        onClick={() => !props.active && props.setExample(props.name)}
      >
        {props.active &&
        <div className='border border-solid border-blue-300 px-1 text-xs tracking-wider text-violet-900'>
          SELECTED
        </div>
        }
        {props.name}
      </div>
    </div>
  );
}

type ComparisonProps = {
  lang: string;
  otherLang: string;
  text: string|undefined;
  renderID: string|undefined;
  setLang: (x: string) => void;
  index: number;

  upperRef: any;
  otherUpperRef: any;
}

function Comparison(props: ComparisonProps) {
  const [height, setHeight] = React.useState<string>("unset");

  React.useEffect(() => {
    setHeight("unset");
    return () => {};
  }, [props.lang, props.otherLang, props.text]);

  React.useEffect(() => {
    const myHeight = props.upperRef.current.getBoundingClientRect().height;
    const otherHeight = props.otherUpperRef.current.getBoundingClientRect().height;
    setHeight(Math.max(myHeight, otherHeight) + "px");
    return () => {};
  }, [height]);

  const renderRender = () => {
    if (!props.renderID) {
      return null;
    }
    const img = getImage(props.renderID);
    // TODO add some placeholder for when a language can't render
    if (!img) {
      return null;
    }
    return (
      <div className='w-full flex justify-center items-center'>
        <img src={img.src} className='object-contain min-h-[100px]' alt={`Example of ${props.lang}`}/>
      </div>
    );
  }

  const upperStyle: any = {};
  if (props.upperRef.current && props.otherUpperRef.current) {
    upperStyle.height = height;
  }

  return (
    <div className='flex flex-col text-left w-full sm:w-1/2 flex-1 border border-solid border-steel-200 rounded-md'
    >
      <Langs index={props.index} activeLang={props.lang} inactiveLang={props.otherLang} setActive={props.setLang} />
      <div className='flex flex-col grow border-solid border-steel-200 shadow-light'>
        <div className='border-b border-solid border-steel-200 p-4 pb-2' ref={props.upperRef} style={upperStyle} >
          <CodeBlock source={props.lang}>
            {props.text}
          </CodeBlock>
        </div>
        <div className={classnames('border-t border-solid border-steel-200 mt-1 grow flex flex-col justify-center items-center', {
          // Prevent jank effect when changing layouts
            'opacity-0': upperStyle.height === 'unset',
          })}>
          {renderRender()}
        </div>
      </div>
    </div>
  );
}

type Example = {
  name: string;
  description: string;
  syntax: {
    [key: string]: string;
  };
  render: {
    [key: string]: string;
  };
}

type ComparisonsProps = {
  examples: Example[];
}

export default function Comparisons(props: ComparisonsProps) {
  const [langA, setLangA] = React.useState(LangNames[0]);
  const [langB, setLangB] = React.useState(LangNames[1]);
  const [exampleName, setExampleName] = React.useState("Basic");

  const langAUpperRef = React.useRef<HTMLDivElement>(null);
  const langBUpperRef = React.useRef<HTMLDivElement>(null);

  const example = props.examples.find(c => c.name === exampleName);
  if (!example) {
    return null;
  }

  const langASyntax = example.syntax[langA];
  const langBSyntax = example.syntax[langB];

  const langARenderID = example.render[langA];
  const langBRenderID = example.render[langB];

  return (
    <div
      className=""
    >
      <div id='choices' className="flex gap-4">
        {props.examples.map(e => <Example name={e.name} key={e.name} active={exampleName === e.name} setExample={setExampleName} />)}
      </div>
      <p id='description' className='my-8 text-steel-800 text-left text-l'>
        {example.description}
      </p>
      <div className='mb-16'>
        <div id='comparisons' className='flex gap-12 justify-center flex-col sm:flex-row'>
          <Comparison index={1} lang={langA} otherLang={langB} text={langASyntax} upperRef={langAUpperRef} otherUpperRef={langBUpperRef} renderID={langARenderID} setLang={setLangA} />
          <Comparison index={2} lang={langB} otherLang={langA} text={langBSyntax} upperRef={langBUpperRef} otherUpperRef={langAUpperRef} renderID={langBRenderID} setLang={setLangB} />
        </div>
      </div>
    </div>
  );
}
