import axios from 'axios';
import TextActions from '../actions/text';
import ls from '../lib/localstorage';

const TextSource = {
    fetchText: {
        remote(state) {
            if (!state.reset) {
                const existing = ls.get();

                if (existing) {
                    return axios.get('/text/' + existing.text + '/' + existing.block).then((data) => {
                        return new Promise((resolve, reject) => {
                            resolve({
                                text: existing.text,
                                block: existing.block,
                                offset: existing.offset,
                                content: data.data.content
                            });
                        });
                    });
                }
            }

            return axios.get('/randomtext');
        },
        success: TextActions.fetchTextDone,
        error: TextActions.fetchTextDone
    }
}

export default TextSource;