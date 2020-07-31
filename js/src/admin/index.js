import app from 'flarum/app';
import Answer from './../lib/models/Answer';
import Field from './../lib/models/Field';
import addMasonFieldsPane from './addMasonFieldsPane';
import addPermissions from './addPermissions';

app.initializers.add('fof-mason', app => {
    app.store.models['mason-fields'] = Field;
    app.store.models['mason-answers'] = Answer;

    addMasonFieldsPane();
    addPermissions();
});
