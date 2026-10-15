import Model from 'flarum/common/Model';
import computed from 'flarum/common/utils/computed';
import type Answer from './Answer';

export default class Field extends Model {
  name() {
    return Model.attribute<string>('name').call(this);
  }
  description() {
    return Model.attribute<string | null>('description').call(this);
  }
  min_answers_count() {
    return Model.attribute<number>('min_answers_count').call(this);
  }
  max_answers_count() {
    return Model.attribute<number>('max_answers_count').call(this);
  }
  show_when_empty() {
    return Model.attribute<boolean>('show_when_empty').call(this);
  }
  user_values_allowed() {
    return Model.attribute<boolean>('user_values_allowed').call(this);
  }
  validation() {
    return Model.attribute<string | null>('validation').call(this);
  }
  icon() {
    return Model.attribute<string | null>('icon').call(this);
  }
  sort() {
    return Model.attribute<number | null>('sort').call(this);
  }

  allAnswers() {
    return Model.hasMany<Answer>('allAnswers').call(this);
  }
  suggestedAnswers() {
    return Model.hasMany<Answer>('suggestedAnswers').call(this);
  }

  required() {
    return computed<boolean, this>('min_answers_count', (min_answers_count) => (min_answers_count as number) > 0).call(this);
  }
  multiple() {
    return computed<boolean, this>('max_answers_count', (max_answers_count) => (max_answers_count as number) > 1).call(this);
  }
}
