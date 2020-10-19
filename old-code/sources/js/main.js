import SimpleEventer from 'simple-eventer';
import AuthHandler from './base/auth';
import { db, auth } from './base/firebase';
import DefaultRole from './components/default-role';
import PlayerRole from './components/player-role';

const $body = document.body;
let userRole = false;

class App {
    constructor() {
        this.initAuth();
        this.initEvents();
    }

    initAuth() {
        this.authHandler = new AuthHandler();
    }

    initEvents() {
        SimpleEventer.on('selected-type', e => this.typeHandler(e.target));
    }

    typeHandler(type) {
        const { uid, displayName } = auth.currentUser;
        userRole = type;
        
        db.ref('session/' + uid).set({
            role: type,
            name: displayName,
            points: false
        });

        switch (type) {
            case 'player':
                this.initDefaultRole();
                this.initPlayerRole();
                break;
            case 'croupier':
                this.initDefaultRole(true);
                break;
            default:
                this.initDefaultRole();
        }
    }

    initPlayerRole() {
        this.playerRole = new PlayerRole();
    }

    initDefaultRole(role = false) {
        this.defaultRole = new DefaultRole(role);
    }

}

document.addEventListener('DOMContentLoaded', () => new App());
