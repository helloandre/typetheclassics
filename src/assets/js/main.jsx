import Editor from './components/editor.jsx';
import React from 'react';
import { render } from 'react-dom';

render(<Editor />, document.getElementById('editor-container'));

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

focus()

