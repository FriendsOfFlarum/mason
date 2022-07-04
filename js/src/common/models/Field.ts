import Model from 'flarum/common/Model';
import computed from 'flarum/common/utils/computed';
import Answer from './Answer';

export default class Field extends Model {
    name = Model.attribute<string>('name');
    description = Model.attribute<string | null>('description');
    min_answers_count = Model.attribute<number>('min_answers_count');
    max_answers_count = Model.attribute<number>('max_answers_count');
    show_when_empty = Model.attribute<boolean>('show_when_empty');
    user_values_allowed = Model.attribute<boolean>('user_values_allowed');
    validation = Model.attribute<string | null>('validation');
    icon = Model.attribute<string | null>('icon');
    sort = Model.attribute<number | null>('sort');
    deleted_at = Model.attribute('deleted_at', Model.transformDate);
    allAnswers = Model.hasMany<Answer>('allAnswers');
    suggestedAnswers = Model.hasMany<Answer>('suggestedAnswers');
    required = computed<boolean>('min_answers_count', (min_answers_count) => min_answers_count > 0);
    multiple = computed<boolean>('max_answers_count', (max_answers_count) => max_answers_count > 1);

    apiEndpoint() {
        return '/fof/mason/fields' + (this.exists ? '/' + this.data.id : '');
    }
}
