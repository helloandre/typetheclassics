import React, { Component } from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import EditorStore from '../stores/editor';
import EditorActions from '../actions/editor';
import Classnames from 'classnames';
import renderer from '../wysiwyg/renderer';

class Editor extends Component {
    static getStores() {
        return [EditorStore];
    }

    static getPropsFromStores() {
        return EditorStore.getState();
    }

    onKeyUp(e) {
        EditorActions.keyUp(e);
    }

    onKeyPress(e) {
        EditorActions.keyPress(e);
    }

    onFocus() {
        EditorActions.focus();
    }

    onBlur() {
        EditorActions.blur();
    }

    render() {
        // only add the cursor on render
        const html = this.props.html + renderer.cursor();

        return (
            <div id="editor" className={Classnames({ active: this.props.active })}>
                <input 
                    id="editor-input"
                    onKeyPress={this.onKeyPress}
                    onKeyUp={this.onKeyUp}
                    onBlur={this.onBlur}
                    onFocus={this.onFocus}
                />
                <div 
                    id="editor-display"
                    dangerouslySetInnerHTML={{__html: html}}>
                </div>
            </div>
        );
    }
}

export default connectToStores(Editor);