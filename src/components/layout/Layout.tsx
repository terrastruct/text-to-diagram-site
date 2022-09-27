import * as React from 'react';
import Button from '@/components/Button';
import Github from '~/svg/Github.svg';

export default function Layout({ children }: { children: React.ReactNode }) {
  const contributeButtonLabel = () => {
    return (
      <div className='flex items-center justify-center gap-1 px-4'>
        <Github />
        Contribute
      </div>
    );
  }
  return (
    <>
      <div className='layout flex items-center justify-between w-full h-16'>
        <Button
          onClick={() => window.open("https://github.com/terrastruct/text-to-diagram.com", "_blank")}
          className='ml-auto mr-8 h-8'
          isPrimaryOutline
          label={contributeButtonLabel()}
        />
      </div>
      <div className="bg-header-gradient h-[4px] w-screen" />
      {children}
    </>
  );
}
