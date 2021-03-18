import app from 'flarum/app';
import Model from 'flarum/Model';
import Discussion from 'flarum/models/Discussion';
import Forum from 'flarum/models/Forum';
import Answer from './../lib/models/Answer';
import Field from './../lib/models/Field';
import addComposerFields from './addComposerFields';
import addFieldUpdateControl from './addFieldUpdateControl';
import addFieldsOnDiscussionHero from './addFieldsOnDiscussionHero';
import addFieldsOnDiscussionPost from './addFieldsOnDiscussionPost';
import patchModelIdentifier from './patchModelIdentifier';

app.initializers.add('fof-mason', (app) => {
  app.store.models['mason-fields'] = Field;
  app.store.models['mason-answers'] = Answer;

  Discussion.prototype.masonAnswers = Model.hasMany('masonAnswers');
  Discussion.prototype.canSeeMasonAnswers = Model.attribute('canSeeMasonAnswers');
  Discussion.prototype.canUpdateMasonAnswers = Model.attribute('canUpdateMasonAnswers');
  Forum.prototype.canFillMasonFields = Model.attribute('canFillMasonFields');

  addComposerFields();
  addFieldsOnDiscussionHero();
  addFieldsOnDiscussionPost();
  addFieldUpdateControl();
  patchModelIdentifier();
});
