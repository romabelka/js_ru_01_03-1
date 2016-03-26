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
                    this.addUserToStorageIfNotExists();
                    break;

                default: return
            }

            this.emitChange()
        })
    }

    addUserToStorageIfNotExists() {
        let users = localStorage.getItem('users');

        if ( !users ) {
            let ar = [];
            ar.push(this.currentUser);
            localStorage.setItem('users', JSON.stringify(ar));
            return;
        }

        users = JSON.parse(users);

        if ( !users.includes(this.currentUser) ) {
            users.push(this.currentUser);
            localStorage.setItem('users', JSON.stringify(users));
        }
    }

    getCurrentUser() {
        return this.currentUser;
    }

    getUsers() {
        return JSON.parse(localStorage.getItem('users')) || [];
    }
}

export default Comment