import Model from 'flarum/common/Model';
import type Field from './Field';

export default class Answer extends Model {
  content() {
    return Model.attribute<string>('content').call(this);
  }
  is_suggested() {
    return Model.attribute<boolean>('is_suggested').call(this);
  }
  sort() {
    return Model.attribute<number | null>('sort').call(this);
  }

  field() {
    return Model.hasOne<Field>('field').call(this);
  }
}
