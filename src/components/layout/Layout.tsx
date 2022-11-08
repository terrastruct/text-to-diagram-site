import * as React from 'react';

import Button from '@/components/Button';

import Github from '~/svg/github.svg';

export default function Layout({ children }: { children: React.ReactNode }) {
  const contributeButtonLabel = () => {
    return (
      <div className='flex items-center justify-center gap-1 px-4'>
        <Github />
        Contribute
      </div>
    );
  };
  return (
    <>
      <div className='layout flex h-16 w-full items-center justify-between'>
        <Button
          onClick={() =>
            window.open('https://github.com/terrastruct/text-to-diagram.com', '_blank')
          }
          className='ml-auto mr-8 h-8'
          isPrimaryOutline
          label={contributeButtonLabel()}
        />
      </div>
      <div className='h-[4px] w-screen bg-header-gradient' />
      {children}
    </>
  );
}
