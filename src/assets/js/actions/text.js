import alt from '../alt';

class TextActions {
    constructor() {
        this.generateActions('initText', 'fetchTextDone', 'determineTextDone');
    }
}

export default alt.createActions(TextActions);