import * as React from 'react';

import Layout from '@/components/layout/Layout';
import UnderlineLink from '@/components/links/UnderlineLink';
import CodeBlock from '@/components/CodeBlock';
import Seo from '@/components/Seo';

import Switch from '~/svg/Switch.svg';

export default function HomePage() {
  return (
    <Layout>
      <Seo />

      <main>
        <section className='bg-white'>
          <div className='layout flex min-h-screen flex-col items-center justify-center text-center'>
            <CodeBlock>
              {`a -> x: hello`}
            </CodeBlock>

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
