import alt from '../alt';
import EditorActions from '../actions/editor';
import renderer from '../wysiwyg/renderer';

class EditorStore {
    constructor() {
        this.bindActions(EditorActions);

        this.state = {
            html: '',
            active: false
        };
    }

    keyDown(e) {
        this.state.html = renderer.keyDown(this.state.html, e);
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