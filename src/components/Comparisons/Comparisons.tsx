import * as React from 'react';

import CodeBlock from '@/components/CodeBlock';

type ComparisonProps = {
  name: string;
  setComparison: (x: string) => void;
}

function Comparison(props: ComparisonProps) {
  return (
    <div>
      <div className='flex flex-col justify-center align-center text-steel-900 shadow-light border border-solid border-steel-200 rounded-md w-32 h-16 font-primary-medium'>
          {props.name}
      </div>
    </div>
  );
}

type DisplayProps = {
  lang: string;
  text: string|undefined;
}

function Display(props: DisplayProps) {
  return (
    <div id='display' className='text-left grow'>
      <h3 className=''>
        {props.lang}
      </h3>
      <CodeBlock source={props.lang}>
        {props.text}
      </CodeBlock>
    </div>
  );
}

type Comparison = {
  name: string;
  description: string;
  syntax: {
    [key: string]: string;
  };
}

type ComparisonsProps = {
  comparisons: Comparison[];
  langA: string;
  langB: string;
}

export default function Comparisons(props: ComparisonsProps) {
  const [comparisonName, setComparisonName] = React.useState("Basic");

  const comparison = props.comparisons.find(c => c.name === comparisonName);
  if (!comparison) {
    return null;
  }

  const langASyntax = comparison.syntax[props.langA];
  const langBSyntax = comparison.syntax[props.langB];

  return (
    <div
      className=""
    >
      <div id='choices'>
        {props.comparisons.map(c => <Comparison name={c.name} key={c.name} setComparison={setComparisonName} />)}
      </div>
      <h2 id='choice'>
        {comparisonName}
      </h2>
      <p id='description' className='m-4 text-steel-900'>
        {comparison.description}
      </p>
      <div id='display' className='flex gap-12 justify-center'>
        <Display lang={props.langA} text={langASyntax} />
        <Display lang={props.langB} text={langBSyntax} />
      </div>
    </div>
  );
}
