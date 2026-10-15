import type Answer from '../common/models/Answer';

declare module 'flarum/common/models/Discussion' {
  export default interface Discussion {
    masonAnswers: () => false | (Answer | undefined)[];
    canSeeMasonAnswers: () => boolean | undefined;
    canUpdateMasonAnswers: () => boolean | undefined;
  }
}

declare module 'flarum/common/models/Forum' {
  export default interface Forum {
    canFillMasonFields: () => boolean | undefined;
    canSkipRequiredMasonFields: () => boolean | undefined;
  }
}
