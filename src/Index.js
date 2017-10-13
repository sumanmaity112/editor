import React from 'react';
import ReactDOM from 'react-dom';
import Tree from './components/Tree'
import {getTree} from "./services/configService";

getTree().then((data) => {
    ReactDOM.render(<Tree data={JSON.parse(data)}/>, document.getElementById('folder-structure'));
});
