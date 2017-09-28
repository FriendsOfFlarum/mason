import app from 'flarum/app';
import Model from 'flarum/Model';
import mixin from 'flarum/utils/mixin';

export default class Field extends mixin(Model, {
    name: Model.attribute('name'),
    description: Model.attribute('description'),
    min_answers_count: Model.attribute('min_answers_count'),
    max_answers_count: Model.attribute('max_answers_count'),
    user_values_allowed: Model.attribute('user_values_allowed'),
    validation: Model.attribute('validation'),
    icon: Model.attribute('icon'),
    sort: Model.attribute('sort'),
    deleted_at: Model.attribute('deleted_at', Model.transformDate),
    answer: Model.hasMany('answers'),
}) {
    /**
     * Construct a path to the API endpoint for this resource.
     *
     * @return {String}
     * @protected
     */
    apiEndpoint() {
        return app.forum.attribute('apiUrl') + '/flagrow/mason/fields' + (this.exists ? '/' + this.data.id : '');
    }
}
