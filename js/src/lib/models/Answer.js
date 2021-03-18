import Model from 'flarum/Model';

export default class Answer extends Model {
  content = Model.attribute('content');
  is_suggested = Model.attribute('is_suggested');
  sort = Model.attribute('sort');
  field = Model.hasOne('field');

  apiEndpoint() {
    return '/fof/mason/answers' + (this.exists ? '/' + this.data.id : '');
  }
}
