import Extend from 'flarum/common/extenders';
import Answer from './models/Answer';
import Field from './models/Field';

export default [
  new Extend.Store() //
    .add('mason-fields', Field)
    .add('mason-answers', Answer),
] satisfies object[];
