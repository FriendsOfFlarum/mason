import app from 'flarum/forum/app';
import Component, { type ComponentAttrs } from 'flarum/common/Component';
import type Answer from '../../common/models/Answer';
import type Field from '../../common/models/Field';

export interface IFieldEditTextAttrs extends ComponentAttrs {
  field: Field;
  /** This field's current answers; free-text fields hold at most one. */
  answers: Answer[];
  onchange: (answers: Answer[]) => void;
  inputId: string;
}

export default class FieldEditText extends Component<IFieldEditTextAttrs> {
  view() {
    const { field, answers, onchange, inputId } = this.attrs;

    return (
      <input
        id={inputId}
        className="FormControl"
        value={answers[0]?.content() ?? ''}
        placeholder={app.forum.attribute('fof-mason.labels-as-placeholders') ? `${field.name()}${field.required() ? ' *' : ''}` : ''}
        oninput={(event: InputEvent) => {
          const content = (event.target as HTMLInputElement).value;

          // An unsaved answer: patchModelIdentifier sends it inline so the server creates it with the discussion.
          onchange(
            content === ''
              ? []
              : [
                  app.store.createRecord('mason-answers', {
                    attributes: { content },
                    relationships: {
                      field: {
                        data: {
                          type: 'mason-fields',
                          id: field.id()!,
                        },
                      },
                    },
                  }),
                ]
          );
        }}
      />
    );
  }
}
