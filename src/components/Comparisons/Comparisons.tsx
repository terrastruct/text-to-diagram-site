import Tippy from '@tippyjs/react';
import classnames from 'classnames';
import React from 'react';

import 'tippy.js/dist/tippy.css';

import { getImage } from '@/lib/imgImports';

import CodeBlock from '@/components/CodeBlock';

import { LangNames } from '@/constant/langs';

import D2Logo from '~/svg/d2.svg';
import GearIcon from '~/svg/gear.svg';
import GraphvizLogo from '~/svg/graphviz.svg';
import Info from '~/svg/info.svg';
import Link from '~/svg/link.svg';
import MermaidLogo from '~/svg/mermaid.svg';
import PlantUMLLogo from '~/svg/plantuml.svg';

type LangProps = {
  name: string;
  active: boolean;
  select: (x: string) => void;
  isMenu?: boolean;
};

function getCanonicalName(name: string) {
  switch (name) {
    case 'd2':
      return 'D2';
    case 'plantuml':
      return 'PlantUML';
    case 'mermaid':
      return 'MermaidJS';
    case 'graphviz':
      return 'GraphViz';
  }
  return 'Unknown';
}

function getLogo(name: string, size: string) {
  switch (name) {
    case 'd2':
      return <D2Logo className={size} />;
    case 'plantuml':
      return <PlantUMLLogo className={size} />;
    case 'mermaid':
      return <MermaidLogo className={size} />;
    case 'graphviz':
      return <GraphvizLogo className={size} />;
  }
  return 'Unknown';
}

function Lang(props: LangProps) {
  const canonicalName = getCanonicalName(props.name);
  const logo = getLogo(props.name, 'text-xl');
  const onClick = () => {
    props.select(props.name);
  };
  return (
    <div
      onClick={onClick}
      className={classnames(
        'text-l block flex items-center justify-start gap-2 px-4 py-2 font-primary-medium text-steel-900',
        {
          'cursor-pointer hover:bg-steel-50': !props.active,
          'bg-blue-50': props.active && props?.isMenu,
        }
      )}
      role='menuitem'
      tabIndex={-1}
    >
      {logo} {canonicalName}
    </div>
  );
}

type LangsProps = {
  activeLang: string;
  inactiveLang: string;
  setActive: (x: string) => void;
  index: number;
};

function Langs(props: LangsProps) {
  const [menuShown, setMenuShown] = React.useState<boolean>(false);
  const [layoutEngineShown, setLayoutEngineShown] =
    React.useState<boolean>(false);

  const onClick = (name: string) => {
    setMenuShown(false);
    if (name !== props.activeLang) {
      props.setActive(name);
    }
  };

  const langEls: JSX.Element[] = [];
  for (const langName of LangNames) {
    langEls.push(
      <Lang
        name={langName}
        key={langName}
        active={langName === props.activeLang}
        select={onClick}
        isMenu
      />
    );
  }

  let link: string;
  switch (props.activeLang) {
    case 'd2':
      link = 'https://d2-lang.com';
      break;
    case 'plantuml':
      link = 'https://plantuml.com';
      break;
    case 'mermaid':
      link = 'https://mermaid-js.github.io/mermaid';
      break;
    case 'graphviz':
      link = 'https://graphviz.org/';
      break;
  }

  const renderLink = () => {
    return <span>{link}</span>;
  };

  const renderInfo = () => {
    const renderDescription = () => {
      switch (props.activeLang) {
        case 'd2':
          return 'D2 is a Go-based language released in 2022 by Terrastruct, Inc. It is focused on flowchart-style software architecture diagrams, with support for SQL tables, classes, icons, markdown text, code snippets, and more. D2 can be used with open source layout engines, as well as a proprietary layout engine developed by Terrastruct.';
        case 'plantuml':
          return "PlantUML is a Java-based language released in 2009 primarily for creating UML diagrams. It's specification, at 416 pages, is rigorous, closely aligning with the specification of UML. It has since grown to support non-UML diagrams as well, such as network diagrams, Gantt charts, and mind maps.";
        case 'mermaid':
          return 'Mermaid, or MermaidJS, is a Javascript-based diagramming tool released in 2014 by Knut Sveidqvist. It renders Markdown-inspired text definitions to create and modify diagrams dynamically. One of its goals is to allow even non-programmers to easily create detailed diagrams. Mermaid has distinct syntax for a variety of diagrams, and leverages open-source layout engines for client-side rendering. Recently, Github has adopted native support for Mermaid diagrams in Markdown.';
        case 'graphviz':
          return 'Graphviz is a C-based graph visualization software born at AT&T Bell Labs in 1991. It uses a variety of layout algorithms to cover a wide breadth of domains such as UML diagrams, code dependency graphs, network maps, mind maps, and more.';
      }
    };

    const description = renderDescription();
    return (
      <div className='bg-white p-4'>
        <div className='flex flex-col justify-start text-steel-900'>
          <h2 className='flex items-center justify-start gap-2 pb-2 font-primary-regular'>
            {getLogo(props.activeLang, 'text-3xl')}{' '}
            {getCanonicalName(props.activeLang)}
          </h2>
          <div className='text-steel-800'>{description}</div>
        </div>
      </div>
    );
  };

  const renderLanguageDropdown = () => {
    return (
      <div
        className='relative mt-2 inline-block grow pb-2 text-left'
        onMouseLeave={() => {
          setMenuShown(false);
        }}
      >
        <button
          type='button'
          className='w-full rounded-md border border-steel-200 bg-white py-0 pr-4 text-sm font-medium text-gray-700 shadow-sm'
          id='menu-button'
          aria-expanded='true'
          aria-haspopup='true'
          onClick={() => setMenuShown(!menuShown)}
        >
          <div className='flex w-full items-center justify-between text-left'>
            <div className='flex flex-col items-start justify-start'>
              <span className='-mb-2 pl-4 text-sm text-steel-500'>
                {props.index === 1 ? '1st' : '2nd'} language
              </span>
              <Lang
                name={props.activeLang}
                key='active'
                active={true}
                select={() => {}}
              />
            </div>
            <svg
              className='-mr-1 ml-2 h-5 w-5'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              aria-hidden='true'
            >
              <path
                fillRule='evenodd'
                d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z'
                clipRule='evenodd'
              />
            </svg>
          </div>
        </button>
        {menuShown && (
          <div
            className='absolute left-0 z-10 mt-1 w-full origin-top-left overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
            role='menu'
            aria-orientation='vertical'
            aria-labelledby='menu-button'
            tabIndex={-1}
          >
            {langEls}
          </div>
        )}
      </div>
    );
  };

  type LayoutProps = {
    name: string;
    active: boolean;
    setLayout: (layout: string) => void;
  };

  const Layout = (props: LayoutProps) => {
    return (
      <div
        className={classnames(
          'flex items-center gap-2 px-4 py-2 text-sm text-steel-900',
          {
            'cursor-pointer hover:bg-steel-50': !props.active,
          }
        )}
        onClick={() => props.setLayout(props.name)}
      >
        <input type='radio' checked={props.active} readOnly />
        {props.name}
      </div>
    );
  };

  const layouts = ['TALA', 'Dagre', 'Dot'];

  const Layouts = () => {
    const [layout, setLayout] = React.useState<string>(layouts[0]);

    return (
      <>
        <div className='px-2 pt-3 text-sm text-steel-900'>Layout engine: </div>
        {layouts.map((lo) => {
          return (
            <Layout
              key={lo}
              name={lo}
              setLayout={setLayout}
              active={layout === lo}
            />
          );
        })}
      </>
    );
  };

  const renderLayoutDropdown = () => {
    return (
      <div
        className='relative mt-2 inline-block pb-2 text-left'
        onMouseLeave={() => {
          setLayoutEngineShown(false);
        }}
      >
        <button
          type='button'
          className={classnames(
            'flex h-6 w-6 items-center justify-center rounded-md p-0 hover:bg-blue-50',
            {
              'bg-blue-50 shadow-sm': layoutEngineShown,
            }
          )}
          id='menu-button'
          aria-expanded='true'
          aria-haspopup='true'
          onClick={() => setLayoutEngineShown(!menuShown)}
        >
          <GearIcon
            className={classnames('h-4 w-4', {
              'filter-blue-600': layoutEngineShown,
            })}
          />
        </button>
        {layoutEngineShown && (
          <div
            className='absolute left-0 z-10 mt-1 w-32 origin-top-left overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
            role='menu'
            aria-orientation='vertical'
            aria-labelledby='menu-button'
            tabIndex={-1}
          >
            <Layouts />
          </div>
        )}
      </div>
    );
  };

  const ReffedInfo = React.forwardRef(
    (_, ref: React.ForwardedRef<HTMLDivElement>) => {
      return (
        <div ref={ref} className='flex h-6 w-6 items-center justify-center'>
          <Info className='h-4 w-4 text-xl' />
        </div>
      );
    }
  );

  const ReffedLink = React.forwardRef(
    (_, ref: React.ForwardedRef<HTMLDivElement>) => {
      return (
        <div
          ref={ref}
          onClick={() => window.open(link, '_blank')}
          className='flex h-6 w-6 items-center justify-center'
        >
          <Link className='h-4 w-4 cursor-pointer text-xl' />
        </div>
      );
    }
  );

  // https://tailwindui.com/components/application-ui/elements/dropdowns
  return (
    <div className='flex items-center justify-start gap-2 rounded-t-md border-b border-solid border-steel-200 bg-steel-25 px-4'>
      {renderLanguageDropdown()}
      {renderLayoutDropdown()}
      <Tippy content={renderInfo()} arrow={false}>
        <ReffedInfo />
      </Tippy>
      <Tippy content={renderLink()} arrow={false}>
        <ReffedLink />
      </Tippy>
    </div>
  );
}

type ExampleProps = {
  name: string;
  active: boolean;
  setExample: (x: string) => void;
};

function Example(props: ExampleProps) {
  return (
    <div
      className={classnames(
        'flex h-20 flex-col items-center justify-center rounded-md font-primary-medium text-steel-900 shadow-light',
        {
          'border border-solid border-steel-200': props.active,
          'cursor-pointer': !props.active,
          'opacity-50': !props.active,
          'bg-steel-100': !props.active,
        }
      )}
      onClick={() => !props.active && props.setExample(props.name)}
    >
      {props.active && (
        <div className='border border-solid border-blue-300 px-1 text-xs tracking-wider text-violet-900'>
          SELECTED
        </div>
      )}
      {props.name}
    </div>
  );
}

type ComparisonProps = {
  lang: string;
  otherLang: string;
  text: string | undefined;
  renderID: string | undefined;
  setLang: (x: string) => void;
  index: number;

  upperRef: React.RefObject<HTMLDivElement>;
  otherUpperRef: React.RefObject<HTMLDivElement>;
};

function Comparison(props: ComparisonProps) {
  const [height, setHeight] = React.useState<string>('unset');

  React.useEffect(() => {
    setHeight('unset');
    return () => {};
  }, [props.lang, props.otherLang, props.text]);

  React.useEffect(() => {
    if (!props.upperRef.current || !props.otherUpperRef.current) {
      return;
    }
    const myHeight = props.upperRef.current.getBoundingClientRect().height;
    const otherHeight =
      props.otherUpperRef.current.getBoundingClientRect().height;
    setHeight(Math.max(myHeight, otherHeight) + 'px');
    return () => {};
  }, [props.upperRef, props.otherUpperRef, height]);

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
      <div className='relative flex w-full items-center justify-center'>
        <img
          src={img.src}
          className='min-h-[100px] object-contain'
          alt={`Example of ${props.lang}`}
        />
      </div>
    );
  };

  const upperStyle: React.CSSProperties = {};
  if (props.upperRef.current && props.otherUpperRef.current) {
    upperStyle.height = height;
  }

  return (
    <div className='flex w-full flex-1 flex-col rounded-md border border-solid border-steel-200 text-left sm:w-1/2'>
      <Langs
        index={props.index}
        activeLang={props.lang}
        inactiveLang={props.otherLang}
        setActive={props.setLang}
      />
      <div className='flex grow flex-col border-solid border-steel-200 shadow-light'>
        <div
          className='border-b border-solid border-steel-200 p-4 pb-2'
          ref={props.upperRef}
          style={upperStyle}
        >
          <CodeBlock source={props.lang}>{props.text}</CodeBlock>
        </div>
        <div
          className={classnames(
            'mt-1 flex grow flex-col items-center justify-center border-t border-solid border-steel-200',
            {
              // Prevent jank effect when changing layouts
              'opacity-0': upperStyle.height === 'unset',
            }
          )}
        >
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
};

type ComparisonsProps = {
  examples: Example[];
};

export default function Comparisons(props: ComparisonsProps) {
  const [langA, setLangA] = React.useState(LangNames[0]);
  const [langB, setLangB] = React.useState(LangNames[1]);
  const [exampleName, setExampleName] = React.useState('Basic');

  const langAUpperRef = React.useRef<HTMLDivElement>(null);
  const langBUpperRef = React.useRef<HTMLDivElement>(null);

  const example = props.examples.find((c) => c.name === exampleName);
  if (!example) {
    return null;
  }

  const langASyntax = example.syntax[langA];
  const langBSyntax = example.syntax[langB];

  const langARenderID = example.render[langA];
  const langBRenderID = example.render[langB];

  return (
    <div className=''>
      <div id='choices' className='grid grid-cols-3 gap-4'>
        {props.examples.map((e) => (
          <Example
            name={e.name}
            key={e.name}
            active={exampleName === e.name}
            setExample={setExampleName}
          />
        ))}
      </div>
      <p id='description' className='text-l my-8 text-left text-steel-800'>
        {example.description}
      </p>
      <div className='mb-16'>
        <div
          id='comparisons'
          className='flex flex-col justify-center gap-12 sm:flex-row'
        >
          <Comparison
            index={1}
            lang={langA}
            otherLang={langB}
            text={langASyntax}
            upperRef={langAUpperRef}
            otherUpperRef={langBUpperRef}
            renderID={langARenderID}
            setLang={setLangA}
          />
          <Comparison
            index={2}
            lang={langB}
            otherLang={langA}
            text={langBSyntax}
            upperRef={langBUpperRef}
            otherUpperRef={langAUpperRef}
            renderID={langBRenderID}
            setLang={setLangB}
          />
        </div>
      </div>
    </div>
  );
}
