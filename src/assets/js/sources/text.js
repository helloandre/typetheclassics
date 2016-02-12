import axios from 'axios';
import TextActions from '../actions/text';
import ls from '../lib/localstorage';

const TextSource = {
    fetchText: {
        remote(state) {
            if (!state.refresh) {
                const existing = ls.get();

                if (existing) {
                    return axios.get('/text/' + existing.text + '/' + existing.block).then((data) => {
                        existing.content = data.data.content;
                        return existing;
                    });
                }
            }

            return axios.get('/randomtext').then((data) => {
                return data.data
            });
        },
        success: TextActions.fetchTextDone,
        error: TextActions.fetchTextDone
    }
}

export default TextSource;