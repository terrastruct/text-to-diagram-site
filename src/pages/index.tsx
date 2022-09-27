import * as React from 'react';

import fs from "fs";
import path from "path";

import Layout from '@/components/layout/Layout';
import UnderlineLink from '@/components/links/UnderlineLink';
import Seo from '@/components/Seo';
import Comparisons from '@/components/Comparisons/Comparisons';
import { GetStaticProps } from "next";

import Switch from '~/svg/Switch.svg';

export default function HomePage(props: any) {
  return (
    <Layout>
      <Seo />

      <main>
        <section className='bg-white'>
          <div className='flex flex-col items-center justify-center text-center'>
            <div className='flex flex-col items-center justify-center w-full h-96 dots-white relative' >
              <div className='absolute left-0 bottom-0 top-0 right-0 dots-blue' >
              </div>
              <div className='flex flex-col items-center justify-center z-10'>
                <h1 className='flex items-center text-5xl'>
                  Text
                  <Switch className='text-7xl' />
                  Diagrams
                </h1>

                <h2 className='font-extrabold text-transparent text-6xl p-2 bg-clip-text purple-gradient'>
                  Declarative Diagramming
                </h2>
                <p className='mt-4'>
                  Coming soon
                </p>
              </div>
            </div>
            <div className='layout'>
              <Comparisons comparisons={props.comparisons} langA={"d2"} langB={"plantuml"} />
            </div>

            <footer className='absolute bottom-2 text-gray-700'>
              © {new Date().getFullYear()} {' '}
              <UnderlineLink href='https://terrastruct.com?ref=text-to-diagram'>
                Terrastruct
              </UnderlineLink>
            </footer>
          </div>
        </section>
      </main>
    </Layout>
  );
}

const langs = [
  "d2",
  "plantuml",
];

export const getStaticProps: GetStaticProps = async () => {
  const root = path.resolve(process.cwd(), "src/comparisons");

  const comparisons: any = [];
  for (const comparisonName of fs.readdirSync(root)) {
    const description = fs.readFileSync(path.resolve(root, comparisonName, "description.txt"), { encoding: "utf8" });
    let name = comparisonName.replace(/[0-9]+_/g, "");
    name = name.charAt(0).toUpperCase() + name.slice(1)
    const comparison: any = {
      name,
      description,
      syntax: {},
      layout: {},
    };
    for (const lang of fs.readdirSync(path.resolve(root, comparisonName, "syntax"))) {
      const text = fs.readFileSync(path.resolve(root, comparisonName, "syntax", lang), { encoding: "utf8" });
      comparison.syntax[lang] = text;
    }
    comparisons.push(comparison);
  }

  return {
    props: {
      comparisons
    },
  };
};
