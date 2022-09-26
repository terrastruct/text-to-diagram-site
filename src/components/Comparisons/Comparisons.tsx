import * as React from 'react';

import CodeBlock from '@/components/CodeBlock';

type ComparisonProps = {
  name: string;
  setComparison: (x: string) => void;
}

function Comparison(props: ComparisonProps) {
  return (
    <div>
      <div className=''>{props.name.charAt(0).toUpperCase() + props.name.slice(1)}</div>
    </div>
  );
}

type Comparison = {
  name: string;
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
  const [comparison, setComparison] = React.useState("basic");

  const langASyntax = props.comparisons.find(c => c.name === comparison)?.syntax[props.langA];
  const langBSyntax = props.comparisons.find(c => c.name === comparison)?.syntax[props.langB];

  return (
    <div
      className=""
    >
      <div id='choices'>
        {props.comparisons.map(c => <Comparison name={c.name} key={c.name} setComparison={setComparison} />)}
      </div>
      <div id='display' className='flex'>
        <div id='display_left' className='text-left'>
          <CodeBlock source={props.langA}>
            {langASyntax}
          </CodeBlock>
        </div>

        <div id='display_right' className='text-left'>
          <CodeBlock source={props.langB}>
            {langBSyntax}
          </CodeBlock>
        </div>
      </div>
    </div>
  );
}
