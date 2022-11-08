import fs from 'fs';
import { GetStaticProps } from 'next';
import path from 'path';
import * as React from 'react';

import Comparisons from '@/components/Comparisons';
import FAQ from '@/components/faq';
import Features from '@/components/Features';
import Layout from '@/components/layout/Layout';
import UnderlineLink from '@/components/links/UnderlineLink';
import Seo from '@/components/Seo';

import Hero from '~/images/hero.webp';
import Hero1024 from '~/images/hero_1024.webp';
import Hero1280 from '~/images/hero_1280.webp';
import GithubDark from '~/svg/github_dark.svg';
import Switch from '~/svg/switch.svg';

// <img src={Hero.src} className='w-auto lg:h-[400px] md:h-[350px] sm:h-[250px] h-[150px] lg:-mb-6 z-10 md:-mb-6 sm:-mb-6 -mb-6'/>
export default function HomePage(props: any) {
  return (
    <Layout>
      <Seo />

      <main>
        <section className='bg-white'>
          <div className='flex flex-col items-center justify-center text-center'>
            <div className='dots-white relative flex w-full flex-col items-center justify-center'>
              <div className='dots-blue absolute left-0 bottom-0 top-0 right-0'></div>
              <div className='z-10 mt-auto flex flex-col items-center justify-center'>
                <Switch className='text-9xl' />
                <h1 className='flex flex-col items-center text-2xl font-extrabold sm:text-4xl lg:text-5xl'>
                  <span>Community list of comparisons</span>
                  <span className='p-2'>
                    between{' '}
                    <span className='purple-gradient bg-clip-text text-transparent'>
                      Text to Diagram
                    </span>{' '}
                    tools
                  </span>
                </h1>
              </div>
              <img
                src={Hero.src}
                className='z-10 -mb-6 mt-4 w-10/12 max-w-[1280px] sm:-mb-6 md:-mb-6 lg:-mb-6 lg:hidden'
                alt='hero'
              />
              <img
                src={Hero1280.src}
                className='z-10 -mb-6 mt-4 hidden w-10/12 max-w-[1280px] sm:-mb-6 md:-mb-6 lg:-mb-6 xl:block'
                alt='hero'
              />
              <img
                src={Hero1024.src}
                className='z-10 -mb-6 mt-4 hidden w-10/12 max-w-[1280px] sm:-mb-6 md:-mb-6 lg:-mb-6 lg:block xl:hidden'
                alt='hero'
              />
              <div className='z-10 mt-auto h-[24px] w-full bg-hero-shadow' />
            </div>
            <div className='layout pt-8'>
              <Comparisons examples={props.examples} />
            </div>
            <div className='layout pt-8'>
              <Features />
            </div>
          </div>
          <div className='w-full bg-steel-800 pt-8'>
            <FAQ />
          </div>

          <footer className='mt-auto bg-steel-900 text-white'>
            <div className='layout flex justify-between py-4'>
              <div>
                © {new Date().getFullYear()}{' '}
                <UnderlineLink href='https://terrastruct.com?ref=text-to-diagram'>
                  Terrastruct
                </UnderlineLink>
              </div>
              <div>
                <GithubDark
                  className='cursor-pointer text-2xl'
                  onClick={() =>
                    window.open(
                      'https://github.com/terrastruct/text-to-diagram.com',
                      '_blank'
                    )
                  }
                />
              </div>
            </div>
          </footer>
        </section>
      </main>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const root = path.resolve(process.cwd(), 'src/examples');

  const examples: any = [];
  for (const exampleName of fs.readdirSync(root)) {
    const description = fs.readFileSync(
      path.resolve(root, exampleName, 'description.txt'),
      { encoding: 'utf8' }
    );
    const name = exampleName.replace(/[0-9]+_/g, '');
    const example: any = {
      name,
      description,
      syntax: {},
      render: {},
      error: {},
    };
    for (const lang of fs.readdirSync(
      path.resolve(root, exampleName, 'syntax')
    )) {
      const text = fs.readFileSync(
        path.resolve(root, exampleName, 'syntax', lang),
        { encoding: 'utf8' }
      );
      example.syntax[lang] = text;
    }
    for (const f of fs.readdirSync(path.resolve(root, exampleName, 'render'))) {
      const lang = f.split('_')[0];
      const layout = f.split('_')[1].split('.')[0];
      if (!Object.keys(example.render).includes(lang)) {
        example.render[lang] = {};
      }
      example.render[lang][layout] = `${lang}-${name}-${layout}`;
    }
    if (fs.existsSync(path.resolve(root, exampleName, 'error'))) {
      for (const lang of fs.readdirSync(
        path.resolve(root, exampleName, 'error')
      )) {
        const text = fs.readFileSync(
          path.resolve(root, exampleName, 'error', lang),
          { encoding: 'utf8' }
        );
        example.error[lang] = text;
      }
    }
    examples.push(example);
  }

  return {
    props: {
      examples,
    },
  };
};
