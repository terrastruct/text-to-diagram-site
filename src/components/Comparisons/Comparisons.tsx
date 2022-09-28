import * as React from 'react';
import classnames from 'classnames';

import PlantUMLLogo from '~/svg/plantuml.svg';
import D2Logo from '~/svg/d2.svg';

import { LangNames } from '@/constant/langs';

import CodeBlock from '@/components/CodeBlock';

import {getImage} from '@/lib/imgImports';

type LangProps = {
  name: string;
  active: boolean;
  select: (x: string) => void;
}

function Lang(props: LangProps) {
  let canonicalName;
  let logo;
  const className = "text-xl";
  switch (props.name) {
    case "d2":
      logo = <D2Logo className={className} />;
      canonicalName = "D2";
      break;
    case "plantuml":
      canonicalName = "PlantUML";
      logo = <PlantUMLLogo className={className} />;
      break;
  }
  const onClick = () => {
    if (props.active) {
      return;
    }
    props.select(props.name);
  }
  return (
    <div>
      <div
        className={classnames('flex flex-col justify-center items-center text-steel-900 w-32 h-10 rounded-md', {
          'bg-white': props.active,
          'cursor-pointer': !props.active,
        })}
        onClick={onClick}
      >
        <div className='flex justify-center items-center gap-2'>
          {logo}
          {canonicalName}
        </div>
      </div>
    </div>
  );
}

type LangsProps = {
  activeLang: string;
  inactiveLang: string;
  setActive: (x: string) => void;
}

function Langs(props: LangsProps) {
  const langEls = [];
  for (const langName of LangNames) {
    langEls.push(
      <Lang name={langName} key={langName} active={langName === props.activeLang} select={props.setActive} />
    );
  }
  return (
    <div>
      <div className='flex justify-start items-center bg-steel-50 p-1 mb-4 rounded-md'>
        {langEls}
      </div>
    </div>
  );
}

type ExampleProps = {
  name: string;
  setExample: (x: string) => void;
}

function Example(props: ExampleProps) {
  return (
    <div>
      <div className='flex flex-col justify-center items-center text-steel-900 shadow-light border border-solid border-steel-200 rounded-md w-32 h-16 font-primary-medium'>
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
}

function Comparison(props: ComparisonProps) {
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
        <img src={img.src} className='object-contain' alt={`Example of ${props.lang}`}/>
      </div>
    );
  }

  return (
    <div className='text-left w-1/2'>
      <Langs activeLang={props.lang} inactiveLang={props.otherLang} setActive={props.setLang} />
      <div className='h-96 border border-solid border-steel-200 rounded-md shadow-light'>
        <div className='m-4 flex flex-col'>
          <div className='h-48'>
            <CodeBlock source={props.lang}>
              {props.text}
            </CodeBlock>
          </div>
          <div className='flex flex-col justify-center items-center h-48'>
            {renderRender()}
          </div>
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
  const [langA, setLangA] = React.useState("d2");
  const [langB, setLangB] = React.useState("plantuml");
  const [exampleName, setExampleName] = React.useState("Basic");

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
      <div id='choices'>
        {props.examples.map(e => <Example name={e.name} key={e.name} setExample={setExampleName} />)}
      </div>
      <h2 id='choice'>
        {exampleName}
      </h2>
      <p id='description' className='m-4 text-steel-900'>
        {example.description}
      </p>
      <div id='comparisons' className='flex gap-12 justify-center'>
        <Comparison lang={langA} otherLang={langB} text={langASyntax} renderID={langARenderID} setLang={setLangA} />
        <Comparison lang={langB} otherLang={langA} text={langBSyntax} renderID={langBRenderID} setLang={setLangB} />
      </div>
    </div>
  );
}
