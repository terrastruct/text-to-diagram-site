import Tippy from '@tippyjs/react';
import classnames from 'classnames';
import Capitalize from 'lodash/capitalize';
import { NextRouter, useRouter } from 'next/router';
import React from 'react';

import 'tippy.js/dist/tippy.css';

import { getImage } from '@/lib/imgImports';

import CodeBlock from '@/components/CodeBlock';
import LanguageDropdown, {
  getCanonicalName,
  getLogo,
} from '@/components/LanguageDropdown';

import {
  LangNames,
  LayoutCapitalizedNames,
  LayoutOrder,
} from '@/constant/langs';

import GearIcon from '~/svg/gear.svg';
import Info from '~/svg/info.svg';
import Link from '~/svg/link.svg';
import Sad from '~/svg/sad.svg';

const setQueryParam = (
  router: NextRouter,
  param: { [key: string]: string | undefined }
) => {
  const query = { ...router.query, ...param };
  router.replace(
    {
      query,
    },
    undefined,
    { shallow: true }
  );
};

const removeQueryParam = (router: NextRouter, key: string) => {
  if (!router.isReady) {
    return;
  }
  const query = { ...router.query };
  if (!query) {
    return;
  }
  delete query[key];
  router.replace(
    {
      query,
    },
    undefined,
    { shallow: true }
  );
};

type LangsProps = {
  layoutChoices: string[];
  activeLayout: string;
  setActiveLayout: (x: string) => void;
  activeLang: string;
  setActiveLang: (x: string) => void;
  index: number;
  comparisonName: string;
};

function Langs(props: LangsProps) {
  const [layoutEngineShown, setLayoutEngineShown] =
    React.useState<boolean>(false);

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
            {getLogo(props.activeLang, true)}{' '}
            {getCanonicalName(props.activeLang)}
          </h2>
          <div className='text-steel-800'>{description}</div>
        </div>
      </div>
    );
  };

  type LayoutProps = {
    name: string;
    active: boolean;
    setLayout: (layout: string) => void;
    comparisonName: string;
  };

  const Layout = (props: LayoutProps) => {
    const router = useRouter();

    return (
      <div
        className={classnames(
          'flex items-center gap-2 px-4 py-2 text-sm text-steel-900',
          {
            'cursor-pointer hover:bg-steel-50': !props.active,
          }
        )}
        onClick={() => {
          setQueryParam(router, { [props.comparisonName]: props.name });
        }}
      >
        <input type='radio' checked={props.active} readOnly />
        {LayoutCapitalizedNames[props.name]}
      </div>
    );
  };

  const Layouts = () => {
    return (
      <>
        <div className='px-2 pt-3 text-sm text-steel-900'>Layout engine: </div>
        {props.layoutChoices.map((lo) => {
          return (
            <Layout
              key={lo}
              name={lo}
              setLayout={props.setActiveLayout}
              active={props.activeLayout === lo}
              comparisonName={props.comparisonName}
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
            'flex h-6 w-6 items-center justify-center rounded-md p-0',
            {
              'bg-blue-50 shadow-sm': layoutEngineShown,
              'hover:bg-blue-50': props.layoutChoices.length > 0,
              'cursor-default opacity-50': props.layoutChoices.length === 0,
            }
          )}
          id='menu-button'
          aria-expanded='true'
          aria-haspopup='true'
          onClick={() => setLayoutEngineShown(!layoutEngineShown)}
        >
          <GearIcon
            className={classnames('h-4 w-4', {
              'filter-blue-600': layoutEngineShown,
            })}
          />
        </button>
        {props.layoutChoices.length > 0 && layoutEngineShown && (
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

  return (
    <div className='flex items-center justify-start gap-2 rounded-t-md border-b border-solid border-steel-200 bg-steel-25 px-4'>
      <LanguageDropdown
        activeLang={props.activeLang}
        setActive={props.setActiveLang}
        index={props.index}
      />
      {renderLayoutDropdown()}
      <Tippy content={renderInfo()} arrow={false}>
        <div className='flex h-6 w-6 items-center justify-center'>
          <Info className='h-4 w-4 text-xl' />
        </div>
      </Tippy>
      <Tippy content={renderLink()} arrow={false}>
        <div
          onClick={() => window.open(link, '_blank')}
          className='flex h-6 w-6 items-center justify-center'
        >
          <Link className='h-4 w-4 cursor-pointer text-xl' />
        </div>
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
        'flex h-12 flex-col items-center justify-center rounded-md bg-white font-primary-medium text-steel-900',
        {
          'border border-solid border-blue-300 drop-shadow-card-small':
            props.active,
          'cursor-pointer bg-steel-100 text-steel-550': !props.active,
        }
      )}
      onClick={() => !props.active && props.setExample(props.name)}
    >
      {Capitalize(props.name)}
    </div>
  );
}

type ComparisonProps = {
  lang: string;
  otherLang: string;
  name: string;
  text: string | undefined;
  renderIDs: any;
  error: string | undefined;
  setLang: (x: string) => void;
  index: number;

  upperRef: React.RefObject<HTMLDivElement>;
  otherUpperRef: React.RefObject<HTMLDivElement>;
};

function Comparison(props: ComparisonProps) {
  const router = useRouter();

  const [layoutChoices, setLayoutChoices] = React.useState<string[]>([]);
  const [layout, setLayout] = React.useState<string>('');
  const [height, setHeight] = React.useState<string>('unset');

  React.useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const layoutParam = searchParams.get(props.name);
    if (!layoutParam) {
      return;
    }
    const index = layoutChoices.findIndex(
      (lo) => lo.toLowerCase() === layoutParam.toLowerCase()
    );
    if (index !== -1) {
      setLayout(layoutChoices[index]);
    } else {
      removeQueryParam(router, props.name);
    }
  }, [router, props.name, layoutChoices]);

  React.useEffect(() => {
    if (!props.renderIDs) {
      if (layoutChoices.length > 0) {
        setLayoutChoices([]);
        setLayout('');
      }
      return;
    }
    const newLayoutChoices = Object.keys(props.renderIDs);
    newLayoutChoices.sort((a, b) => {
      if (LayoutOrder.indexOf(a) < LayoutOrder.indexOf(b)) {
        return -1;
      } else {
        return 1;
      }
    });
    if (
      newLayoutChoices.length === layoutChoices.length &&
      newLayoutChoices.every((x) => layoutChoices.includes(x))
    ) {
      return;
    }
    setLayoutChoices(newLayoutChoices);
    setLayout(newLayoutChoices[0]);
  }, [props.renderIDs, layoutChoices]);

  React.useEffect(() => {
    setHeight('unset');
  }, [props.lang, props.otherLang, props.text]);

  React.useEffect(() => {
    setTimeout(() => {
      if (!props.upperRef.current || !props.otherUpperRef.current) {
        return;
      }
      const myHeight = props.upperRef.current.getBoundingClientRect().height;
      const otherHeight =
        props.otherUpperRef.current.getBoundingClientRect().height;
      setHeight(Math.max(myHeight, otherHeight) + 'px');
    });
  }, [props.upperRef, props.otherUpperRef, height]);

  const renderRender = () => {
    if (!props.renderIDs) {
      return null;
    }
    if (!props.renderIDs[layout]) {
      return null;
    }
    const img = getImage(props.renderIDs[layout]);
    // TODO add some placeholder for when a language can't render
    if (!img) {
      return null;
    }
    let src = img;
    // PNG (loaded as object) vs SVG (loaded as asset string)
    if (typeof img == 'object') {
      src = img.src;
    }

    return (
      <div className='relative flex w-full items-center justify-center'>
        <embed
          width='100%'
          src={src}
          className=''
          // alt={`Example of ${props.lang}`}
        />
      </div>
    );
  };

  const upperStyle: React.CSSProperties = {};
  if (props.upperRef.current && props.otherUpperRef.current) {
    upperStyle.height = height;
  }

  return (
    <div className='flex flex-col rounded-md border border-solid border-steel-200 text-left'>
      <Langs
        index={props.index}
        activeLang={props.lang}
        setActiveLang={props.setLang}
        layoutChoices={layoutChoices}
        activeLayout={layout}
        setActiveLayout={setLayout}
        comparisonName={props.name}
      />
      <div className='flex grow flex-col border-solid border-steel-200 shadow-light'>
        <div
          className='border-b border-solid border-steel-200 p-4 pb-2'
          ref={props.upperRef}
          style={upperStyle}
        >
          <div className='h-full overflow-scroll'>
            <CodeBlock source={props.lang}>{props.text}</CodeBlock>
          </div>
        </div>
        <div
          className={classnames(
            'mt-1 flex grow flex-col items-center justify-center border-t border-solid border-steel-200 p-4',
            {
              // Prevent jank effect when changing layouts
              'opacity-0': upperStyle.height === 'unset',
            }
          )}
        >
          {props.error ? <Sad width='8rem' height='8rem' /> : renderRender()}
          {props.error && (
            <div className='mt-8 px-8 text-center text-steel-800'>
              {'Compile error: '}
              {props.error}
            </div>
          )}
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
  error: {
    [key: string]: string;
  };
};

type ComparisonsProps = {
  examples: Example[];
};

export default function Comparisons(props: ComparisonsProps) {
  const router = useRouter();

  const [langA, setLangA] = React.useState(LangNames[0]);
  const [langB, setLangB] = React.useState(LangNames[1]);
  const [exampleName, setExampleName] = React.useState('basic');

  const comparisonsRef = React.useRef<HTMLDivElement>(null);
  const langAUpperRef = React.useRef<HTMLDivElement>(null);
  const langBUpperRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const example = searchParams.get('example');
    if (!example) {
      return;
    }
    const ex = props.examples.find(
      (ex) => ex.name.toLowerCase() === example.toLowerCase()
    );
    if (!ex) {
      removeQueryParam(router, 'example');
    }
  }, [props.examples, router]);

  React.useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const example = searchParams.get('example');
    if (example) {
      const ex = props.examples.find(
        (ex) => ex.name.toLowerCase() === example.toLowerCase()
      );
      if (ex) {
        setExampleName(ex.name);
        if (!comparisonsRef.current) {
          return;
        }
        comparisonsRef.current.scrollIntoView({
          behavior: 'smooth',
        });
      }
    }
  }, [props.examples]);

  React.useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const a = searchParams.get('a');
    if (a) {
      const index = LangNames.findIndex(
        (lang) => lang.toLowerCase() === a.toLowerCase()
      );
      if (index !== -1) {
        setLangA(LangNames[index]);
      } else {
        removeQueryParam(router, 'a');
      }
    }
    const b = searchParams.get('b');
    if (b) {
      const index = LangNames.findIndex(
        (lang) => lang.toLowerCase() === b.toLowerCase()
      );
      if (index !== -1) {
        setLangB(LangNames[index]);
      } else {
        removeQueryParam(router, 'b');
      }
    }
  }, [router]);

  const example = props.examples.find((c) => c.name === exampleName);
  if (!example) {
    return null;
  }

  const langASyntax = example.syntax[langA];
  const langBSyntax = example.syntax[langB];

  const langARenderIDs = example.render[langA];
  const langBRenderIDs = example.render[langB];

  const langAError = example.error[langA];
  const langBError = example.error[langB];

  return (
    <div ref={comparisonsRef}>
      <div className='mt-4 mb-4 flex flex-col items-center'>
        <h2 className=''>Which diagramming tool is right for you?</h2>
        <div className='text-l mt-4 text-steel-800'>
          Compare the syntax and renders of various languages that produce
          diagrams from text.
        </div>
      </div>
      <div className='mb-8 rounded-md bg-steel-50 p-4'>
        <div id='choices' className='grid grid-cols-3 gap-2 mobile:grid-cols-4'>
          {props.examples.map((e) => (
            <Example
              name={e.name}
              key={e.name}
              active={exampleName === e.name}
              setExample={(ex) => {
                if (!router) {
                  return;
                }
                setExampleName(ex);
                setQueryParam(router, { example: ex });
              }}
            />
          ))}
        </div>
        <p id='description' className='text-l mt-4 text-left text-steel-800'>
          <strong>{Capitalize(example.name)}</strong>: {example.description}
        </p>
      </div>
      <div className='mb-16'>
        <div id='comparisons' className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
          <Comparison
            index={1}
            lang={langA}
            otherLang={langB}
            text={langASyntax}
            upperRef={langAUpperRef}
            otherUpperRef={langBUpperRef}
            renderIDs={langARenderIDs}
            error={langAError}
            setLang={(lang) => {
              removeQueryParam(router, 'layout_a');
              setQueryParam(router, { a: lang });
            }}
            name='layout_a'
          />
          <Comparison
            index={2}
            lang={langB}
            otherLang={langA}
            text={langBSyntax}
            upperRef={langBUpperRef}
            otherUpperRef={langAUpperRef}
            renderIDs={langBRenderIDs}
            error={langBError}
            setLang={(lang) => {
              removeQueryParam(router, 'layout_b');
              setQueryParam(router, { b: lang });
            }}
            name='layout_b'
          />
        </div>
      </div>
    </div>
  );
}
