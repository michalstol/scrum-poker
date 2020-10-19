import { db, auth } from './../base/firebase';
import CardHandler from './card-handler';

const $body = document.body;
let userData = {};

export default class PlayerRole {
    constructor() {
        this.initPanel();
        this.initCard();
        this.watchReset();
    }
    
    initPanel() {
        $body.classList.add('player-role');
        this.dbUser = db.ref('session/' + auth.currentUser.uid);
    }
    
    initCard() {
        this.cardHandler = new CardHandler();
        
        this.cardHandler.on('save-points', e => this.savePoints(e.target));
    }
    
    savePoints(amount) {
        if (amount !== undefined) {
            this.dbUser.set({
                ...userData,
                points: amount
            });
        }
    }
    
    watchReset() {
        let afterFirstTrigger = false;
    
        this.dbUser.on('value', snapshot => {
            const data = snapshot.val();
            
            if (data.points === false) {
                if (afterFirstTrigger) {
                    this.cardHandler.reset();
                } else {
                    afterFirstTrigger = true;
                    userData = data;
                }
            }
        });
    }
}