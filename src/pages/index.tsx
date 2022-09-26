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
          <div className='layout flex min-h-screen flex-col items-center justify-center text-center'>
            <h1 className='flex items-center'>
              Text
              <Switch className='text-7xl' />
              Diagrams
            </h1>

            <h2 className='font-extrabold text-transparent text-4xl bg-clip-text purple-gradient'>
              Declarative Diagramming
            </h2>
            <p className='mt-4'>
              Turning text into diagrams
            </p>

            <Comparisons comparisons={props.comparisons} langA={"d2"} langB={"plantuml"} />

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
    const comparison: any = {
      name: comparisonName.replace(/[0-9]+_/g, ""),
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
