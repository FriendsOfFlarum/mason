import Extend from 'flarum/common/extenders';
import Discussion from 'flarum/common/models/Discussion';
import Forum from 'flarum/common/models/Forum';
import type Answer from '../common/models/Answer';

import commonExtend from '../common/extend';

export default [
  ...commonExtend,

  new Extend.Model(Discussion) //
    .hasMany<Answer>('masonAnswers')
    .attribute<boolean>('canSeeMasonAnswers')
    .attribute<boolean>('canUpdateMasonAnswers'),

  new Extend.Model(Forum) //
    .attribute<boolean>('canFillMasonFields')
    .attribute<boolean>('canSkipRequiredMasonFields'),
] satisfies object[];
