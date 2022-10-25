import classNames from 'classnames';
import { useState } from 'react';

import Down from '~/svg/down.svg';
import Up from '~/svg/up.svg';

const Collapsible = (props: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <div className='flex flex-col overflow-hidden bg-white first:rounded-t-lg last:rounded-b-lg'>
      <div
        className='flex cursor-pointer items-center justify-start pl-4'
        onClick={() => props.onClick()}
      >
        {props.isOpen ? (
          <Up className='text-3xl' />
        ) : (
          <Down className='text-3xl' />
        )}
        <span className='px-4 py-4 font-primary-medium sm:px-8 sm:py-6'>
          {props.question}
        </span>
      </div>
      {props.isOpen && (
        <div className='bg-steel-50 p-4 sm:p-8'>{props.answer}</div>
      )}
    </div>
  );
};

const items = [
  {
    question: 'Where do the renders come from?',
    answer: `As much as possible, renders are out-of-the-box. If a language has themes, we use the default one. If a language offers styling, we don't add any (unless the example calls for it). For example, Graphviz renders nodes as ovals by default, and PlantUML renders containers as 3d. We don't upscale or crop the images. We don't change fonts to match. If you run any of these examples in the language's CLI, you will get the same render.`,
  },
  {
    question: 'Where does the syntax-highlighting come from?',
    answer: `This site is using the best VSCode syntax highlighter that can be found online for each of the languages. Any odd-ness or differences should be reported upstream (you can find their repositories in this Github).`,
  },
  {
    question: 'Who made this?',
    answer: `This is created and maintained by Terrastruct. We created D2, and it's in our interest to provide anyone evaluating us with an objective comparison against others in the space. The only favor granted to D2 is that it shows up as the first comparison. We welcome contributions, and if any examples potentially make D2 look bad, we will include them without bias (and then furiously improve D2 so the example looks better, a right other tools have as well).`,
  },
  {
    question: "Why isn't [my favorite underground language] here?",
    answer: `The cross-table of examples and languages is big, and nobody's gotten around to it yet. We're seeding and adding languages in order of perceived popularity. If you'd like to help support your favorite one, feel free to submit a PR -- we'll merge.`,
  },
  {
    question: 'Future plans?',
    answer: `We'll include a live-runner where you can try out any of the tools/languages. After D2 is more stable, we plan to write transpilers to and from all popular languages for easy imports and exports. When that becomes a reality, you'll be able to write one example and compare the equivalent syntax across languages.`,
  },
  {
    question: `I'd like to make a correction/addition.`,
    answer: `Contributions are welcome -- the Github repository for this is public.`,
  },
];

export default function FAQ() {
  const [openQuestion, setOpenQuestion] = useState<number>(-1);

  return (
    <div className='px-4'>
      <div className='w-full'>
        <div className='my-8 flex w-full flex-col items-center sm:my-12'>
          <h1
            className='font-primary-bold text-2xl text-white sm:text-4xl'
            id='faq'
          >
            Frequently asked questions
          </h1>
        </div>
      </div>
      <div
        className={classNames('layout min-h-[32rem] w-full', {
          'h-[40rem]': openQuestion !== -1,
        })}
      >
        <div className='w-full divide-y divide-steel-200 rounded-lg border border-steel-200'>
          {items.map((item: any, i: number) => (
            <Collapsible
              key={item.question}
              question={item.question}
              answer={item.answer}
              onClick={() => {
                if (openQuestion === i) {
                  setOpenQuestion(-1);
                } else {
                  setOpenQuestion(i);
                }
              }}
              isOpen={openQuestion === i}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
