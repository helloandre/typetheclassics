import alt from '../alt';
import sa from 'superagent';

class TextActions {
    constructor() {
        this.generateActions('initText', 'fetchTextDone', 'determineTextDone');
    }
}

export default alt.createActions(TextActions);