import Model from 'flarum/common/Model';
import computed from 'flarum/common/utils/computed';

export default class Field extends Model {
    name = Model.attribute('name');
    description = Model.attribute('description');
    min_answers_count = Model.attribute('min_answers_count');
    max_answers_count = Model.attribute('max_answers_count');
    show_when_empty = Model.attribute('show_when_empty');
    user_values_allowed = Model.attribute('user_values_allowed');
    validation = Model.attribute('validation');
    icon = Model.attribute('icon');
    sort = Model.attribute('sort');
    deleted_at = Model.attribute('deleted_at', Model.transformDate);
    all_answers = Model.hasMany('all_answers');
    suggested_answers = Model.hasMany('suggested_answers');
    required = computed('min_answers_count', (min_answers_count) => min_answers_count > 0);
    multiple = computed('max_answers_count', (max_answers_count) => max_answers_count > 1);

    apiEndpoint() {
        return '/fof/mason/fields' + (this.exists ? '/' + this.data.id : '');
    }
}
