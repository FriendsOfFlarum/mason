import { override } from 'flarum/common/extend';
import Model from 'flarum/common/Model';
import Answer from '@common/models/Answer';

export default function () {
    override(Model, 'getIdentifier', function (original, model) {
        // For Answers that don't yet exist, we include the content and the field relationship when calling the API
        // That way they can be created server-side without making individual API requests for each answer
        if (model instanceof Answer && !model.exists) {
            return {
                type: model.data.type,
                attributes: {
                    content: model.data.attributes.content,
                },
                relationships: {
                    field: {
                        data: Model.getIdentifier(model.data.relationships.field),
                    },
                },
            };
        }

        // Default behaviour
        return original(model);
    });
}
