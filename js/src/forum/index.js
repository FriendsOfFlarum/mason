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
import patchModelIdentifier from "./patchModelIdentifier";

app.initializers.add('flagrow-mason', app => {
    app.store.models['flagrow-mason-field'] = Field;
    app.store.models['flagrow-mason-answer'] = Answer;

    Discussion.prototype.flagrowMasonAnswers = Model.hasMany('flagrowMasonAnswers');
    Discussion.prototype.canSeeFlagrowMasonAnswers = Model.attribute('canSeeFlagrowMasonAnswers');
    Discussion.prototype.canUpdateFlagrowMasonAnswers = Model.attribute('canUpdateFlagrowMasonAnswers');
    Forum.prototype.canFillFlagrowMasonFields = Model.attribute('canFillFlagrowMasonFields');

    addComposerFields();
    addFieldsOnDiscussionHero();
    addFieldsOnDiscussionPost();
    addFieldUpdateControl();
    patchModelIdentifier();
});
