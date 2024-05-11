'use client';

import 'froala-editor/css/froala_editor.css';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const FroalaEditor = dynamic(
  async () => {
    const result = await Promise.all([
      import('react-froala-wysiwyg'),
      // @ts-ignore
      import('froala-editor/js/plugins/char_counter.min.js'),
      // @ts-ignore
      import('froala-editor/js/plugins/image.min.js'),
      // @ts-ignore
      import('froala-editor/js/plugins/markdown.min.js'),
      // @ts-ignore
      import('froala-editor/js/plugins/save.min.js'),
    ]);
    return result[0];
  },
  { ssr: false }
);
const FroalaEditorView = dynamic(() => import('react-froala-wysiwyg/FroalaEditorView'), { ssr: false });

export default function Home() {
  const [inZenMode, setInZenMode] = useState(false);
  const [model, setModel] = useState(() => {
    if (typeof window === 'undefined') return '';
    return localStorage.getItem('savedText') || '';
  });

  return (
    <main
      className={`min-h-screen flex flex-col items-center text-black p-24 ${inZenMode ? 'bg-zinc-400' : 'bg-zinc-200'}`}
    >
      <h1 className="text-5xl font-semibold">Zen 모드를 사용해보세요</h1>
      <p className="mt-2 mb-5 text-xl">
        Zen 모드를 사용하면 화면이 어두워지고 집중이 쉽습니다. Zen 모드를 사용해서 글쓰기에 몰입해보세요.
      </p>

      <button
        onClick={() => setInZenMode(!inZenMode)}
        className="px-4 py-2 mb-20 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded shadow-lg"
      >
        {inZenMode ? 'Zen 모드 끄기' : 'Zen 모드 켜기'}
      </button>
      <FroalaEditor
        model={model}
        onModelChange={(e: string) => setModel(e)}
        // @ts-ignore
        saveInterval={2000}
        config={{
          placeholderText: '글을 작성해보세요',
          charCounterCount: true,
          charCounMax: 10,
          events: {
            'charCounter.exceeded': function () {
              alert('글자 수가 초과되었습니다.');
            },
            'save.before': function (html: string) {
              localStorage.setItem('savedText', html);
            },
          },
        }}
        tag="textarea"
      />
      <FroalaEditorView model={model} />
    </main>
  );
}
