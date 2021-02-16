import app from 'flarum/app';
import icon from 'flarum/helpers/icon';
import ItemList from 'flarum/utils/ItemList';
import Component from 'flarum/Component';
import Button from 'flarum/components/Button';
import FieldsEditorModal from './FieldsEditorModal';
import FieldGrid from './FieldGrid';
import sortByAttribute from './../../lib/helpers/sortByAttribute';

/* global m */

export default class FieldsViewer extends Component {
    oninit(vnode) {
        super.oninit(vnode);

        this.fields = sortByAttribute(app.store.all('mason-fields'));
        this.discussion = this.attrs.discussion;
    }

    view() {
        const head = this.headItems().toArray();
        const fields = this.fieldsItems().toArray();

        // If all fields are hidden
        // And either no controls are shown or the setting hides them
        // We don't show the viewer
        if (!fields.length && (!head.length || app.forum.attribute('fof-mason.hide-empty-fields-section'))) {
            // We need to return an actual dom element or Flarum does not like it
            return m('div');
        }

        return m('.Mason-Fields.Mason-Fields--viewer', [
            head,
            FieldGrid.component({
                items: fields,
            }),
        ]);
    }

    headItems() {
        const items = new ItemList();

        if (this.discussion.canUpdateMasonAnswers()) {
            items.add('edit', Button.component({
                className: 'Button Mason-Fields--edit',
                icon: 'fas fa-pen',
                onclick: () => app.modal.show(FieldsEditorModal, {
                    discussion: this.discussion,
                }),
            }, app.translator.trans('fof-mason.forum.discussion-controls.edit-answers')));
        }

        if (app.forum.attribute('fof-mason.fields-section-title')) {
            items.add('title', m('h5.Mason-Field--title', app.forum.attribute('fof-mason.fields-section-title')));
        }

        return items;
    }

    fieldsItems() {
        const items = new ItemList();

        this.fields.forEach(field => {
            // Discussion answers to this field
            const answers = sortByAttribute((this.discussion.masonAnswers() || []).filter(answer => {
                // It's necessary to compare the field() relationship
                // Because field.suggested_answers() won't contain new and user answers
                return answer.field() && answer.field().id() === field.id();
            }));

            let answer_list = answers.map(answer => m('span.Mason-Inline-Answer', answer.content()));

            if (answers.length === 0) {
                if (field.show_when_empty()) {
                    answer_list.push(m('em.Mason-Inline-Answer', app.translator.trans('fof-mason.forum.post-answers.no-answer')));
                } else {
                    // If the field has no answer and the setting is off we don't show it
                    return;
                }
            }

            items.add('field-' + field.id(), m('.Mason-Field.Form-group', [
                m('label', [
                    (field.icon() ? [icon(field.icon()), ' '] : null),
                    field.name(),
                ]),
                m('.FormControl.Mason-Inline-Answers', answer_list),
            ]));
        });

        return items;
    }
}
