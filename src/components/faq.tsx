import { useState } from "react";

import Down from '~/svg/down.svg';
import Up from '~/svg/up.svg';

const Collapsible = (props: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <div className="flex flex-col bg-white first:rounded-t-lg last:rounded-b-lg overflow-hidden">
      <div
        className="flex items-center justify-start cursor-pointer pl-4"
        onClick={() => props.onClick()}
      >
          {
            props.isOpen
              ? <Up className='text-3xl'/>
              : <Down className='text-3xl' />
          }
        <span className="sm:px-8 px-4 sm:py-6 py-4 font-primary-medium">{props.question}</span>
      </div>
      {props.isOpen && <div className="sm:p-8 p-4 bg-steel-50">{props.answer}</div>}
    </div>
  );
};

const items = [
  {
    question: "Where do the renders come from?",
    answer: `As much as possible, renders are out-of-the-box. If a language has themes, we use the default one. If a language offers styling, we don't add any (unless the example calls for it). For example, Graphviz renders nodes as ovals by default, and PlantUML renders containers as 3d. We don't upscale or crop the images. We don't change fonts to match. If you copy-paste the text into any online-hosted versions of the languages, you should get the same thing.`,
  },
  {
    question: "Who made this?",
    answer: `This is created and maintained by Terrastruct. We created D2, and it's in our interest to provide anyone evaluating us with an objective comparison against others in the space. The only favor granted to D2 is that it shows up as the first comparison. We welcome contributions, and if any examples potentially make D2 look bad, we will include them without bias (and then furiously improve D2 so the example looks better, a right other tools have as well).`
  },
  {
    question: "Why isn't [my favorite underground language] here?",
    answer: `The cross-table of examples and languages is big, and nobody's gotten around to it yet. We're seeding and adding languages in order of perceived popularity. If you'd like to help support your favorite one, feel free to submit a PR -- we'll merge.`
  },
  {
    question: "Future plans?",
    answer: `We'd like this to be the go-to source of comparisons for text-to-diagram tools and languages. We plan to include tables of feature comparisons, and a live-runner where you can try out any of the tools/languages. After D2 is more stable, we plan to write transpilers to all popular languages for easy imports and exports. When that becomes a reality, you'll be able to write one example and compare across languages.`
  },
];

export default function FAQ(props: any) {
  const [openQuestion, setOpenQuestion] = useState<number>();
  return (
    <div className="px-4">
      <div className="w-full">
        <div className="w-full sm:my-12 my-8 flex flex-col items-center">
          <h1 className="text-2xl text-white font-primary-bold sm:text-4xl">
            Frequently asked questions
          </h1>
        </div>
      </div>
      <div className="min-h-[30rem] layout w-full">
        <div className="divide-y divide-steel-200 border border-steel-200 rounded-lg w-full">
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
