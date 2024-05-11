import { FroalaOptions } from 'froala-editor';

export const configHeading: Partial<FroalaOptions> = {
  //  toolbarInline: true,
  //  initOnClick: true,
  //  toolbarVisibleWithoutSelection: true,
  placeholderText: '제목을 입력하세요.',
  charCounterMax: 1000,
  moreText: {
    buttons: [
      'bold',
      'italic',
      'underline',
      '-',
      'fontFamily',
      'fontSize',
      '-',
      'textColor',
      'clearFormatting',
      'align',
    ],
  },
};
export const configText: Partial<FroalaOptions> = {
  initOnClick: true,
  toolbarInline: true,
  toolbarVisibleWithoutSelection: true,
  placeholderText: '내용을 입력하세요.',
  charCounterCount: false,
  charCounterMax: 500,
  events: {
    initialized: function () {
      this.$tb[0].style.maxWidth = '400px';
    },
    'charCounter.exceeded.exceeded': function () {
      alert('You have exceeded the maximum number of characters allowed');
    },
    contentChanged: function () {
      const text = this.html.get();
    },
  },
};

export const configImg: Partial<FroalaOptions> = {};
export const configButton: Partial<FroalaOptions> = {};
export const configCode: Partial<FroalaOptions> = {
  pluginsEnabled: ['codeView', 'codeBeautifier'],
  toolbarButtons: ['html'],
  events: {
    initialized: function () {
      if (!this.codeView?.isActive()) {
        this.codeView?.toggle();
      }
    },
    'codeView.update': function () {
      this.destroy();
    },
  },
};

export const configMarkdown: Partial<FroalaOptions> = {
  toolbarButtons: ['markdown'],
  events: {
    initialized: function () {
      // @ts-ignore
      if (!this.markdown && !this.markdown.isEnabled()) {
        // @ts-ignore
        this.markdown?.toggle();
      }
    },
    'markdown.update': function () {
      this.destroy();
    },
  },
};

export const configLink: Partial<FroalaOptions> = {
  linkStyles: {
    froalaLink1: 'Froala link 1',
    froalaLink2: 'Froala link 2',
  },
  linkMultipleStyles: false,
  linkAutoPrefix: 'https://',
};

/*
const froalaEditorConfig: Partial<FroalaOptions> = {
  toolbarInline: true,
  initOnClick: true,
  toolbarVisibleWithoutSelection: true,
  fontSize: ['10', '12', '14', '18', '30', '47'],
  charCounterMax: 1000,
  placeholderText: '제목을 입력하세요.',
  moreText: {
    buttons: ['bold', 'italic', 'underline', '-', 'fontFamily', 'fontSize', '-', 'textColor', 'clearFormatting'],
  },
  events: {
    'charCounter.update': function () {
      console.log(this.charCounter?.count());
    },
    'charCounter.exceeded': function () {
      alert('You have exceeded the maximum number of characters allowed');
    },
  },
};
*/
