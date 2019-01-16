import app from 'flarum/app';
import Answer from './../lib/models/Answer';
import Field from './../lib/models/Field';
import addMasonFieldsPane from './addMasonFieldsPane';
import addPermissions from './addPermissions';

app.initializers.add('flagrow-mason', app => {
    app.store.models['flagrow-mason-field'] = Field;
    app.store.models['flagrow-mason-answer'] = Answer;

    addMasonFieldsPane();
    addPermissions();
});
