import app from 'flarum/app';
import Answer from 'flagrow/mason/models/Answer';
import Field from 'flagrow/mason/models/Field';
import addComposerFields from 'flagrow/mason/addComposerFields';

app.initializers.add('flagrow-masquerade', app => {
    app.store.models['flagrow-mason-field'] = Field;
    app.store.models['flagrow-mason-answer'] = Answer;

    addComposerFields();
});
