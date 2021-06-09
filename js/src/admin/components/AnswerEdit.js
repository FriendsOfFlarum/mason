import app from 'flarum/admin/app';
import icon from 'flarum/common/helpers/icon';
import extractText from 'flarum/common/utils/extractText';
import Component from 'flarum/common/Component';
import Button from 'flarum/common/components/Button';
import Switch from 'flarum/common/components/Switch';

export default class FieldEdit extends Component {
    oninit(vnode) {
        super.oninit(vnode);

        this.answer = this.attrs.answer;
        this.dirty = false;
        this.processing = false;
    }

    view() {
        return (
            <div className="Mason-Box">
                {/* Only suggested answers can be reordered */}
                {this.answer.is_suggested() && [<span className="fas fa-arrows-alt Mason-Box--handle js-answer-handle" />, ' ']}
                <span
                    onclick={() => {
                        const newContent = prompt(
                            extractText(app.translator.trans('fof-mason.admin.buttons.edit-answer-prompt')),
                            this.answer.content()
                        );

                        if (newContent) {
                            this.updateAttribute('content', newContent);
                        }
                    }}
                    title={extractText(app.translator.trans('fof-mason.admin.buttons.edit-answer'))}
                >
                    {this.answer.content()} {icon('fas fa-pen')}
                </span>
                <Switch
                    state={this.answer.is_suggested()}
                    onchange={(value) => {
                        this.updateAttribute('is_suggested', value);

                        // Save right away, because updating the model with immediately trigger a redraw of the UI
                        // And the unsaved state won't be preserved because the AnswerEdit component changes its place
                        this.saveAnswer();
                    }}
                >
                    {app.translator.trans('fof-mason.admin.fields.is_suggested')}
                </Switch>
                <div className="ButtonGroup">
                    <Button
                        className="Button Button--primary"
                        loading={this.processing}
                        disabled={!this.readyToSave()}
                        onclick={this.saveAnswer.bind(this)}
                    >
                        {app.translator.trans('fof-mason.admin.buttons.save-answer')}
                    </Button>
                    <Button className="Button Button--danger" loading={this.processing} onclick={this.deleteAnswer.bind(this)}>
                        {app.translator.trans('fof-mason.admin.buttons.delete-answer')}
                    </Button>
                </div>
            </div>
        );
    }

    updateAttribute(attribute, value) {
        this.answer.pushAttributes({
            [attribute]: value,
        });

        this.dirty = true;
    }

    readyToSave() {
        return this.dirty;
    }

    saveAnswer() {
        this.processing = true;

        this.answer
            .save(this.answer.data.attributes)
            .then(() => {
                this.processing = false;
                this.dirty = false;

                m.redraw();
            })
            .catch((err) => {
                this.processing = false;

                throw err;
            });
    }

    deleteAnswer() {
        if (
            !confirm(
                extractText(
                    app.translator.trans('fof-mason.admin.messages.delete-answer-confirmation', {
                        content: this.answer.content(),
                    })
                )
            )
        ) {
            return;
        }

        this.processing = true;

        this.answer
            .delete()
            .then(() => {
                this.processing = false;

                m.redraw();
            })
            .catch((err) => {
                this.processing = false;

                throw err;
            });
    }
}
