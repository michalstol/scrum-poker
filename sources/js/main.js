import SimpleEventer from 'simple-eventer';
import AuthHandler from './base/auth';
import DefaultRole from './components/default-role';
import CardHandler from './components/card-handler';

const $body = document.body;
let userRole = false;

class App {
    constructor() {
        this.initAuth();
        this.initEvents();

        // SimpleEventer.fire('selected-type', 'player');
    }

    initAuth() {
        this.authHandler = new AuthHandler();
    }

    initEvents() {
        SimpleEventer.on('selected-type', e => this.typeHandler(e.target));
    }

    typeHandler(type) {
        userRole = type;

        switch (type) {
            case type === 'player':
                this.initPlayerType();
                break;
            case type === 'croupier':
                this.initDefaultRole(true);
                break;
            default:
                this.initDefaultRole();
        }
    }

    initPlayerType() {
        // new CardHandler();
    }

    initDefaultRole(role = false) {
        this.defaultRole = new DefaultRole(role);
    }

}

document.addEventListener('DOMContentLoaded', () => new App());
