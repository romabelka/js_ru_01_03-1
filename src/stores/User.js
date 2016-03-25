import AppDispatcher from '../dispatcher'
import { SIGN_IN } from '../actions/constants'
import SimpleStore from './SimpleStore'

class Comment extends SimpleStore {
    constructor(stores, initialState) {
        super(stores, initialState)

        this.dispatchToken = AppDispatcher.register((action) => {
            const { type, data, response } = action

            switch (type) {
                case SIGN_IN:
                    this.currentUser = data.name
                    break;

                default: return
            }

            this.emitChange()
        })
    }

}

export default Comment