import app from 'flarum/forum/app';
import icon from 'flarum/common/helpers/icon';
import ItemList from 'flarum/common/utils/ItemList';
import Component from 'flarum/common/Component';
import Button from 'flarum/common/components/Button';
import FieldsEditorModal from './FieldsEditorModal';
import FieldGrid from './FieldGrid';
import sortByAttribute from '@common/helpers/sortByAttribute';

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
            return <div />;
        }

        return (
            <div className="Mason-Fields Mason-Fields--viewer">
                {head}
                <FieldGrid items={fields} />
            </div>
        );
    }

    headItems() {
        const items = new ItemList();

        if (this.discussion.canUpdateMasonAnswers()) {
            items.add(
                'edit',
                <Button
                    className="Button Mason-Fields--edit"
                    icon="fas fa-pen"
                    onclick={() =>
                        app.modal.show(FieldsEditorModal, {
                            discussion: this.discussion,
                        })
                    }
                >
                    {app.translator.trans('fof-mason.forum.discussion-controls.edit-answers')}
                </Button>
            );
        }

        if (app.forum.attribute('fof-mason.fields-section-title')) {
            items.add('title', <h5 className="Mason-Field--title">{app.forum.attribute('fof-mason.fields-section-title')}</h5>);
        }

        return items;
    }

    fieldsItems() {
        const items = new ItemList();

        this.fields.forEach((field) => {
            // Discussion answers to this field
            const answers = sortByAttribute(
                (this.discussion.masonAnswers() || []).filter((answer) => {
                    // It's necessary to compare the field() relationship
                    // Because field.suggested_answers() won't contain new and user answers
                    return answer.field() && answer.field().id() === field.id();
                })
            );

            let answer_list = answers.map((answer) => <span className="Mason-Inline-Answer">{answer.content()}</span>);

            if (answers.length === 0) {
                if (field.show_when_empty()) {
                    answer_list.push(<em className="Mason-Inline-Answer">{app.translator.trans('fof-mason.forum.post-answers.no-answer')}</em>);
                } else {
                    // If the field has no answer and the setting is off we don't show it
                    return;
                }
            }

            items.add(
                `field-${field.id()}`,
                <div className="Mason-Field Form-group">
                    <label>
                        {field.icon() ? <>{icon(field.icon())} </> : null}
                        {field.name()}
                    </label>
                    ,<div className="FormControl Mason-Inline-Answers">{answer_list}</div>,
                </div>
            );
        });

        return items;
    }
}
