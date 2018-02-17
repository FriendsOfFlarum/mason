import app from 'flarum/app';
import Component from 'flarum/Component';
import Button from 'flarum/components/Button';
import FieldsEditor from 'flagrow/mason/components/FieldsEditor';
import FieldsEditorModalComposer from 'flagrow/mason/components/FieldsEditorModalComposer';

class ComposerFields extends Component {
    init() {
        this.fieldsEditorComponent = null;
        this.uniqueFieldsKey = 0;

        this.reloadFormFields();

        this.requiredFieldsCount = 0;
        this.optionalFieldsCount = 0;

        this.countRequiredAndOptionalFields();
    }

    view() {
        if (this.props.viewMode() === ComposerFields.ViewModeEnum.FORM) {
            return this.fieldsEditorComponent;
        } else {
            return Button.component({
                icon: 'pencil',
                className: 'Button Mason-Composer-Button',
                children: app.translator.trans('flagrow-mason.forum.composer-button.fill-' + this.buttonTranslationKey(), {
                    count_required: this.requiredFieldsCount,
                    count_optional: this.optionalFieldsCount,
                }),
                onclick: () => {
                    app.modal.show(
                        new FieldsEditorModalComposer({
                            answers: this.props.answers(),
                            onchange: this.onModalAnswerChange.bind(this),
                            ontagchange: this.onModalTagChange.bind(this),
                        })
                    );
                },
            });
        }
    }

    onModalAnswerChange(answers) {
        this.props.onchange(answers);

        this.reloadFormFields();
    }

    onModalTagChange(tags) {
        this.props.ontagchange(tags);

        this.reloadFormFields();
    }

    reloadFormFields() {
        this.fieldsEditorComponent = FieldsEditor.component({
            key: ++this.uniqueFieldsKey,
            answers: this.props.answers(),
            onchange: this.props.onchange,
            ontagchange: this.props.ontagchange,
        });
    }

    countRequiredAndOptionalFields() {
        app.store.all('flagrow-mason-field').forEach(field => {
            if (field.required()) {
                this.requiredFieldsCount++;
            } else {
                this.optionalFieldsCount++;
            }
        });

        if (app.forum.attribute('flagrow.mason.tags-as-fields')) {
            if (app.forum.attribute('minPrimaryTags') > 0 || app.forum.attribute('minSecondaryTags') > 0) {
                this.requiredFieldsCount++;
            } else {
                this.optionalFieldsCount++;
            }
        }
    }

    buttonTranslationKey() {
        if (this.requiredFieldsCount && this.optionalFieldsCount) {
            return 'required-and-optional';
        } else if (this.requiredFieldsCount) {
            return 'required';
        }

        return 'optional';
    }
}

ComposerFields.ViewModeEnum = {
    FORM: 'form',
    MODAL: 'modal',
};

export default ComposerFields;
