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
              <div className='flex flex-col items-center justify-center mt-auto z-10'>
                <Switch className='text-9xl' />
                <h1 className='flex flex-col items-center text-5xl font-extrabold'>
                  <span>
                    Community list of comparisons
                  </span>
                  <span className='p-2 text-transparent bg-clip-text purple-gradient'>
                    between Text to Diagram tools
                  </span>
                </h1>
              </div>
              <div className="bg-hero-shadow h-[24px] w-full mt-auto" />
            </div>
            <div className='layout pt-8'>
              <Comparisons examples={props.examples} />
            </div>

            <footer className='mt-auto text-gray-700'>
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
    // 1v1ing nextJS's image serving:
    // - copy images on the fly to public
    // - resolve modules
    // - carry the src as props to load in Image elements
    const publicExampleDir = path.resolve(process.cwd(), "public/images/examples", exampleName, "render")
    if (!fs.existsSync(publicExampleDir )){
      fs.mkdirSync(publicExampleDir , { recursive: true });
    }
    for (const lang of fs.readdirSync(path.resolve(root, exampleName, "render"))) {
      fs.copyFile(path.resolve(root, exampleName, "render", lang), path.resolve(publicExampleDir, lang), err => {
        if (err) {
          console.log(err);
        }
      });
      const mod = require(`~/images/examples/${exampleName}/render/${lang}`);
      example.render[lang.split(".")[0]] = mod.default.src;
    }
    examples.push(example);
  }

  return {
    props: {
      examples
    },
  };
};
