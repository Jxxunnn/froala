import {
  ArrowDownIcon,
  ButtonIcon,
  CodeIcon,
  HeadingIcon,
  ImageIcon,
  Link1Icon,
  TextIcon,
} from '@radix-ui/react-icons';

const tools = [
  {
    name: 'Heading',
    icon: <HeadingIcon width={24} height={24} />,
  },
  {
    name: 'Text',
    icon: <TextIcon width={24} height={24} />,
  },
  {
    name: 'Image',
    icon: <ImageIcon width={24} height={24} />,
  },
  {
    name: 'Button',
    icon: <ButtonIcon width={24} height={24} />,
  },
  {
    name: 'Link',
    icon: <Link1Icon width={24} height={24} />,
  },
  {
    name: 'Code',
    icon: <CodeIcon width={24} height={24} />,
  },
  {
    name: 'Markdown',
    icon: <ArrowDownIcon width={24} height={24} />,
  },
];

export default function Toolbar({ handleAddBlock }: { handleAddBlock: (block: string) => void }) {
  return (
    <section className="bg-zinc-900 w-full h-full flex gap-2 flex-wrap content-start p-10">
      {tools.map((tool) => (
        <button
          key={tool.name}
          className="bg-zinc-800 rounded hovder:bg-zinc-700 transition text-white/50 hover:text-white h-[150px] w-[150px] flex flex-col items-center justify-center p-4"
          onClick={() => handleAddBlock(tool.name)}
        >
          <span className="mb-2">{tool.icon}</span>
          <p>{tool.name}</p>
        </button>
      ))}
    </section>
  );
}
