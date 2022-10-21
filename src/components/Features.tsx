import Tippy from '@tippyjs/react';
import classnames from 'classnames';
import React from 'react';

import LanguageDropdown from '@/components/LanguageDropdown';

import { LangNames } from '@/constant/langs';

import CheckIcon from '~/svg/checkcircle.svg';
import InfoIcon from '~/svg/info.svg';
import XIcon from '~/svg/x.svg';

type Feature = {
  title: string;
  description: string;
  availability: {
    [name: typeof LangNames[number]]: boolean;
  };
};

const features: Feature[] = [
  {
    title: 'Feature one',
    description: 'This is a description',
    availability: {
      [LangNames[0]]: true,
      [LangNames[1]]: false,
      [LangNames[2]]: false,
      [LangNames[3]]: false,
    },
  },
  {
    title: 'Feature two',
    description: 'This is a description',
    availability: {
      [LangNames[0]]: true,
      [LangNames[1]]: true,
      [LangNames[2]]: false,
      [LangNames[3]]: false,
    },
  },
  {
    title: 'Feature three',
    description: 'This is a description',
    availability: {
      [LangNames[0]]: true,
      [LangNames[1]]: false,
      [LangNames[2]]: false,
      [LangNames[3]]: false,
    },
  },
  {
    title: 'Feature four',
    description: 'This is a description',
    availability: {
      [LangNames[0]]: true,
      [LangNames[1]]: false,
      [LangNames[2]]: true,
      [LangNames[3]]: false,
    },
  },
];

const FeatureAvailable = (props: {
  isAvailable: boolean;
  className?: string;
}) => {
  return (
    <div
      className={classnames(
        'flex h-full w-full items-center justify-center',
        props.className
      )}
    >
      {props.isAvailable ? (
        <CheckIcon className='h-8 w-8' />
      ) : (
        <XIcon className='h-8 w-8' />
      )}
    </div>
  );
};

const Features = () => {
  const [featureLanguage1, setFeatureLanguage1] = React.useState<
    typeof LangNames[number]
  >(LangNames[0]);
  const [featureLanguage2, setFeatureLanguage2] = React.useState<
    typeof LangNames[number]
  >(LangNames[1]);

  const renderFeature = (
    feature: Feature,
    language1: typeof LangNames[number],
    language2: typeof LangNames[number],
    isMobile?: boolean
  ) => {
    if (isMobile) {
      return (
        <div
          className='flex w-full flex-col p-4 odd:bg-steel-100 even:bg-white'
          key={feature.title}
        >
          <span className='flex items-center justify-center gap-2'>
            <span className='mb-2 font-primary-medium text-lg'>
              {feature.title}
            </span>
            <Tippy content={feature.description} arrow={false}>
              <div>
                <InfoIcon />
              </div>
            </Tippy>
          </span>
          <div className='relative flex items-stretch'>
            <FeatureAvailable
              className='border-r border-dashed border-steel-300'
              isAvailable={feature.availability[language1]}
            />
            <FeatureAvailable isAvailable={feature.availability[language2]} />
          </div>
        </div>
      );
    }

    return (
      <tr className='odd:bg-blue-50 even:bg-white' key={feature.title}>
        <td className='rounded-l border-r border-dashed border-steel-300 p-4 text-left'>
          <span className='flex hidden items-baseline md:inline-block'>
            <span className='font-primary-medium'>{feature.title}:</span>{' '}
            {feature.description}
          </span>
          <span className='flex items-center gap-2 md:hidden'>
            <span className='font-primary-medium'>{feature.title}</span>
            <Tippy content={feature.description} arrow={false}>
              <div>
                <InfoIcon />
              </div>
            </Tippy>
          </span>
        </td>
        <td className='border-r border-dashed border-steel-300 p-4'>
          <FeatureAvailable isAvailable={feature.availability[language1]} />
        </td>
        <td className='rounded-r p-4'>
          <FeatureAvailable isAvailable={feature.availability[language2]} />
        </td>
      </tr>
    );
  };

  const renderDesktop = () => {
    return (
      <table className='mb-16 hidden w-full mobile:table'>
        <thead>
          <tr>
            <th className='mr-2 border-r border-dashed border-steel-300 text-left font-primary-medium text-lg'>
              Features
            </th>
            <th className='w-40 border-r border-dashed border-steel-300 px-4 lg:w-64'>
              <LanguageDropdown
                className='w-40 lg:w-64'
                index={1}
                activeLang={featureLanguage1}
                setActive={setFeatureLanguage1}
              />
            </th>
            <th className='w-40 pl-4 lg:w-64'>
              <LanguageDropdown
                className='w-40 lg:w-64'
                index={2}
                activeLang={featureLanguage2}
                setActive={setFeatureLanguage2}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {features.map((feature) =>
            renderFeature(feature, featureLanguage1, featureLanguage2)
          )}
        </tbody>
        <tfoot>
          <tr>
            <td className='h-2 border-r border-dashed' />
            <td className='border-r border-dashed' />
            <td />
          </tr>
        </tfoot>
      </table>
    );
  };

  const renderMobile = () => {
    return (
      <div className='relative mb-8 flex w-full flex-col items-center mobile:hidden'>
        <div className='mb-3 font-primary-medium text-lg'>Features</div>
        <div className='mb-2 flex w-full gap-2'>
          <div className='w-1/2'>
            <LanguageDropdown
              className='w-full'
              index={1}
              activeLang={featureLanguage1}
              setActive={setFeatureLanguage1}
            />
          </div>
          <div className='w-1/2'>
            <LanguageDropdown
              className='w-full'
              index={2}
              activeLang={featureLanguage2}
              setActive={setFeatureLanguage2}
            />
          </div>
        </div>
        {features.map((feature) =>
          renderFeature(feature, featureLanguage1, featureLanguage2, true)
        )}
      </div>
    );
  };

  return (
    <div id='features'>
      {renderMobile()}
      {renderDesktop()}
    </div>
  );
};

export default Features;
