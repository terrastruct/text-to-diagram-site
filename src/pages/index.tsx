import fs from 'fs';
import { GetStaticProps } from 'next';
import path from 'path';
import * as React from 'react';

import Comparisons from '@/components/Comparisons/Comparisons';
import FAQ from '@/components/faq';
import Layout from '@/components/layout/Layout';
import UnderlineLink from '@/components/links/UnderlineLink';
import Seo from '@/components/Seo';

import Hero from '~/images/hero.webp';
import GithubDark from '~/svg/github_dark.svg';
import Switch from '~/svg/Switch.svg';

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
                className='z-10 -mb-6 w-10/12 max-w-[1200px] sm:-mb-6 md:-mb-6 lg:-mb-6'
              />
              <div className='z-10 mt-auto h-[24px] w-full bg-hero-shadow' />
            </div>
            <div className='mt-12 flex flex-col items-center px-4'>
              <h2 className=''>Which diagramming tool is right for you?</h2>
              <div className='text-l mt-4 text-steel-800'>
                Compare the syntax and renders of various languages that produce
                diagrams from text.
              </div>
            </div>
            <div className='layout pt-8'>
              <Comparisons examples={props.examples} />
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
    let name = exampleName.replace(/[0-9]+_/g, '');
    name = name.charAt(0).toUpperCase() + name.slice(1);
    const example: any = {
      name,
      description,
      syntax: {},
      render: {},
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
      const lang = f.split('.')[0];
      example.render[lang] = `${lang}-${name}`;
    }
    examples.push(example);
  }

  return {
    props: {
      examples,
    },
  };
};
