import app from 'flarum/app';
import Answer from 'flagrow/mason/models/Answer';
import Field from 'flagrow/mason/models/Field';
import addMasonFieldsPane from 'flagrow/mason/addMasonFieldsPane';

app.initializers.add('flagrow-mason', app => {
    app.store.models['flagrow-mason-field'] = Field;
    app.store.models['flagrow-mason-answer'] = Answer;

    addMasonFieldsPane();
});
