import Editor from './components/editor.jsx';
import Text from './components/text.jsx';
import TextActions from './actions/text';
import React from 'react';
import { render } from 'react-dom';

render(<Editor />, document.getElementById('editor-container'));
render(<Text />, document.getElementById('text-container'));

TextActions.initText();

const focus = (e) => {
    let target = e ? e.target : null;
    while (target) {
        if (target.classList.contains('nav')) {
            return;
        }
        target = target.parentElement;
    }

    document.getElementById('editor-input').focus();
}

document.body.addEventListener('click', focus);
document.querySelector('#refresh').addEventListener('click', () => {
    TextActions.refreshText();
    focus();
});

focus();
