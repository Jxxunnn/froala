'use client';

import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import {
  configButton,
  configCode,
  configHeading,
  configImg,
  configLink,
  configMarkdown,
  configText,
} from '../_lib/configs';
import DeleteButton from './DeleteButton';

const FroalaEditorComponent = dynamic(
  async () => {
    // @ts-ignore
    const result = await Promise.all([import('react-froala-wysiwyg'), import('froala-editor/js/plugins.pkgd.min.js')]);
    return result[0];
  },
  {
    ssr: false,
  }
);

const FroalaEditogImg = dynamic(() => import('react-froala-wysiwyg/FroalaEditorImg'), { ssr: false });
const FroalaEditorButton = dynamic(() => import('react-froala-wysiwyg/FroalaEditorButton'), { ssr: false });
const FroalaEditorA = dynamic(() => import('react-froala-wysiwyg/FroalaEditorA'), { ssr: false });
const FroalaEditorView = dynamic(() => import('react-froala-wysiwyg/FroalaEditorView'), { ssr: false });

// Import all Froala Editor plugins;
// import 'froala-editor/js/plugins.pkgd.min.js';

// Import a single Froala Editor plugin.
// import 'froala-editor/js/plugins/align.min.js';

// Import a language file.
// import 'froala-editor/js/languages/de.js';

// Import a third-party plugin.
// import 'froala-editor/js/third_party/image_tui.min.js';
// import 'froala-editor/js/third_party/embedly.min.js';
// import 'froala-editor/js/third_party/spell_checker.min.js';

// Include font-awesome css if required.
// install using "npm install font-awesome --save"
// import 'font-awesome/css/font-awesome.css';
// import 'froala-editor/js/third_party/font_awesome.min.js';

// Include special components if required.
// import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
// import FroalaEditorA from 'react-froala-wysiwyg/FroalaEditorA';
// import FroalaEditorButton from 'react-froala-wysiwyg/FroalaEditorButton';
// import FroalaEditorImg from 'react-froala-wysiwyg/FroalaEditorImg';
// import FroalaEditorInput from 'react-froala-wysiwyg/FroalaEditorInput';

export default function EditingArea({
  contentBlocks,
  handleRemoveBlock,
}: {
  contentBlocks: string[];
  handleRemoveBlock: (index: number) => void;
}) {
  const [inPreviewMode, setInPreviewMode] = useState(false);
  const [model, setModel] = useState('제목을 입력하세요');

  return (
    <section className="w-[800px] mx-auto h-[800px] my-12 bg-white border border-black/[15%] text-black">
      <FroalaEditorA />
      {contentBlocks.map((block, i) => {
        switch (block) {
          case 'Heading':
            return (
              <div className="heading content-block">
                {inPreviewMode ? (
                  <FroalaEditorView model={model} />
                ) : (
                  <FroalaEditorComponent
                    key={block + i}
                    config={configHeading}
                    model={model}
                    onModelChange={setModel}
                  />
                )}
                <DeleteButton onDelete={() => handleRemoveBlock(i)} />
              </div>
            );
          case 'Text':
            return <FroalaEditorComponent key={block + i} tag="textarea" config={configText} />;
          case 'Image':
            return (
              <div className="content-block">
                <FroalaEditogImg
                  model={{
                    src: 'https://fakeimg.pl/350x200/?text=World&font=lobster',
                    alt: 'Froala Editor',
                    title: 'Froala Editor',
                    width: 400,
                  }}
                  key={block + i}
                  config={configImg}
                />
                <DeleteButton onDelete={() => handleRemoveBlock(i)} />
              </div>
            );
          case 'Button':
            return (
              <div className="content-block">
                <FroalaEditorButton
                  key={block + i}
                  config={configButton}
                  model={{
                    innerHTML: 'Click me',
                    style: 'background-color: #007bff; color: white; padding: 10px 20px; border-radius: 5px;',
                  }}
                />
                <DeleteButton onDelete={() => handleRemoveBlock(i)} />
              </div>
            );
          case 'Link':
            return (
              <div className="content-block">
                <FroalaEditorA
                  key={block + i}
                  config={configLink}
                  model={{
                    innerHTML: 'Link text',
                    style: 'padding: 10px; background-color: #007bff; color: white; text-align: center;',
                  }}
                />
                <DeleteButton onDelete={() => handleRemoveBlock(i)} />
              </div>
            );
          case 'Code':
            return (
              <div className="content-block">
                <FroalaEditorComponent key={block + i} config={configCode} />
                <DeleteButton onDelete={() => handleRemoveBlock(i)} />
              </div>
            );

          case 'Markdown':
            return (
              <div className="content-block">
                <FroalaEditorComponent key={block + i} config={configMarkdown} />
                <DeleteButton onDelete={() => handleRemoveBlock(i)} />
              </div>
            );

          default:
            return null;
        }
      })}
    </section>
  );
}
