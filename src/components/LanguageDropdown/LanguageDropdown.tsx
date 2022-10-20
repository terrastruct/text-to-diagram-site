import classnames from 'classnames';
import React from 'react';

import { LangNames } from '@/constant/langs';

import D2Logo from '~/svg/d2.svg';
import GraphvizLogo from '~/svg/graphviz.svg';
import MermaidLogo from '~/svg/mermaid.svg';
import PlantUMLLogo from '~/svg/plantuml.svg';

type LanguageDropdownProps = {
  activeLang: string;
  setActive: (x: string) => void;
  index: number;
};

const LanguageDropdown = (props: LanguageDropdownProps) => {
  const [menuShown, setMenuShown] = React.useState<boolean>(false);

  const onClick = (name: string) => {
    setMenuShown(false);
    if (name !== props.activeLang) {
      props.setActive(name);
    }
  };

  const langEls = LangNames.map((langName) => (
    <Lang
      name={langName}
      key={langName}
      active={langName === props.activeLang}
      select={onClick}
      isMenu
    />
  ));

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

export function getCanonicalName(name: string) {
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

export function getLogo(name: string, size: string) {
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

type LangProps = {
  name: string;
  active: boolean;
  select: (x: string) => void;
  isMenu?: boolean;
};

const Lang = (props: LangProps) => {
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
};

export default LanguageDropdown;
