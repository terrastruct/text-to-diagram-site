import * as React from 'react';

import fs from "fs";
import path from "path";

import Layout from '@/components/layout/Layout';
import UnderlineLink from '@/components/links/UnderlineLink';
import Seo from '@/components/Seo';
import FAQ from '@/components/faq';
import Comparisons from '@/components/Comparisons/Comparisons';
import { GetStaticProps } from "next";

import Switch from '~/svg/Switch.svg';
import GithubDark from '~/svg/github_dark.svg';
import Hero from '~/images/hero.webp';

              // <img src={Hero.src} className='w-auto lg:h-[400px] md:h-[350px] sm:h-[250px] h-[150px] lg:-mb-6 z-10 md:-mb-6 sm:-mb-6 -mb-6'/>
export default function HomePage(props: any) {
  return (
    <Layout>
      <Seo />

      <main>
        <section className='bg-white'>
          <div className='flex flex-col items-center justify-center text-center'>
            <div className='flex flex-col items-center justify-center w-full dots-white relative' >
              <div className='absolute left-0 bottom-0 top-0 right-0 dots-blue' >
              </div>
              <div className='flex flex-col items-center justify-center mt-auto z-10'>
                <Switch className='text-9xl' />
                <h1 className='flex flex-col items-center lg:text-5xl font-extrabold sm:text-4xl text-2xl'>
                  <span>
                    Community list of comparisons
                  </span>
                  <span className='p-2'>
                    between <span className='text-transparent bg-clip-text purple-gradient'>Text to Diagram</span> tools
                  </span>
                </h1>
              </div>
              <img src={Hero.src} className='w-10/12 max-w-[1200px] lg:-mb-6 z-10 md:-mb-6 sm:-mb-6 -mb-6'/>
              <div className="bg-hero-shadow h-[24px] w-full mt-auto z-10" />
            </div>
            <div className='flex flex-col items-center mt-12 px-4'>
              <h2 className=''>
                Which diagramming tool is right for you?
              </h2>
              <div className='text-l mt-4 text-steel-800'>
                Compare the syntax and renders of various languages that produce diagrams from text.
              </div>
            </div>
            <div className='layout pt-8'>
              <Comparisons examples={props.examples} />
            </div>

          </div>
          <div className='pt-8 bg-steel-800 w-full'>
            <FAQ />
          </div>

          <footer className='mt-auto bg-steel-900 text-white'>
            <div className='layout py-4 flex justify-between'>
              <div>
                © {new Date().getFullYear()} {' '}
                <UnderlineLink href='https://terrastruct.com?ref=text-to-diagram'>
                  Terrastruct
                </UnderlineLink>
              </div>
              <div>
                <GithubDark className='text-2xl cursor-pointer' onClick={() => window.open("https://github.com/terrastruct/text-to-diagram.com", "_blank")} />
              </div>
            </div>
          </footer>
        </section>
      </main>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const root = path.resolve(process.cwd(), "src/examples");

  const examples: any = [];
  for (const exampleName of fs.readdirSync(root)) {
    const description = fs.readFileSync(path.resolve(root, exampleName, "description.txt"), { encoding: "utf8" });
    let name = exampleName.replace(/[0-9]+_/g, "");
    name = name.charAt(0).toUpperCase() + name.slice(1)
    const example: any = {
      name,
      description,
      syntax: {},
      render: {},
    };
    for (const lang of fs.readdirSync(path.resolve(root, exampleName, "syntax"))) {
      const text = fs.readFileSync(path.resolve(root, exampleName, "syntax", lang), { encoding: "utf8" });
      example.syntax[lang] = text;
    }
    for (const f of fs.readdirSync(path.resolve(root, exampleName, "render"))) {
      const lang = f.split(".")[0]
      example.render[lang] = `${lang}-${name}`;
    }
    examples.push(example);
  }

  return {
    props: {
      examples
    },
  };
};
