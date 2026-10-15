import { extend } from 'flarum/common/extend';
import app from 'flarum/forum/app';
import FieldsEditor from './components/FieldsEditor';

export default function () {
  extend('flarum/common/components/DiscussionComposer', 'headerItems', function (items) {
    if (!app.forum.canFillMasonFields()) {
      return;
    }

    items.add(
      'mason-fields',
      <FieldsEditor
        answers={this.composer.fields.masonAnswers || []}
        onchange={(answers) => {
          this.composer.fields.masonAnswers = answers;
        }}
        ontagchange={(tags) => {
          this.composer.fields.tags = tags;
        }}
      />
    );
  });

  extend('flarum/common/components/DiscussionComposer', 'data', function (data) {
    if (!app.forum.canFillMasonFields() || !this.composer.fields.masonAnswers) {
      return;
    }

    data.relationships = data.relationships || {};
    data.relationships.masonAnswers = this.composer.fields.masonAnswers;
  });
}
