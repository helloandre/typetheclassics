import alt from '../alt';
import EditorActions from '../actions/editor';
import renderer from '../wysiwyg/renderer';

const LINE_HEIGHT = 55;

class EditorStore {
    constructor() {
        this.bindActions(EditorActions);

        this.state = {
            html: '',
            active: false,
            top: 0
        };
    }

    keyDown(e) {
        const data = renderer.keyDown(this.state.html, e);

        if (data.addedEnter) {
            this.state.top -= LINE_HEIGHT;
        }

        if (data.removedEnter) {
            this.state.top += LINE_HEIGHT;
        }

        this.state.html = data.html;
    }

    keyPress(e) {
        this.state.html = renderer.keyPress(this.state.html, e);
    }

    focus() {
        this.state.active = true;
    }

    blur() {
        this.state.active = false;
    }
}

export default alt.createStore(EditorStore, 'EditorStore');