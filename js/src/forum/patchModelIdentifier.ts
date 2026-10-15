import { override } from 'flarum/common/extend';
import Model from 'flarum/common/Model';
import Answer from '../common/models/Answer';

/**
 * Model.save() serializes relationships only through the static Model.getIdentifier(), so this is the one
 * seam for sending unsaved free-text answers inline; the API creates them along with the discussion.
 */
export default function patchModelIdentifier() {
  // getIdentifier is protected; the cast only gives override() a key it can see.
  override(
    Model as unknown as { getIdentifier(model?: Model): unknown },
    'getIdentifier',
    function (original: (model?: Model) => unknown, model?: Model) {
      if (model instanceof Answer && !model.exists) {
        return {
          type: 'mason-answers',
          attributes: { content: model.content() },
          relationships: { field: model.data.relationships?.field },
        };
      }

      return original(model);
    }
  );
}
