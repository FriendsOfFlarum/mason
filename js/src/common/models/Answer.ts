import Model from 'flarum/common/Model';
import Field from './Field';

export default class Answer extends Model {
    content = Model.attribute<string>('content');
    is_suggested = Model.attribute<boolean>('is_suggested');
    sort = Model.attribute<number | null>('sort');
    field = Model.hasOne<Field>('field');

    apiEndpoint() {
        return '/fof/mason/answers' + (this.exists ? '/' + this.data.id : '');
    }
}
