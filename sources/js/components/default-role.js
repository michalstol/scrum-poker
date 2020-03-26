import { db } from './../base/firebase';

const dbSession = db.ref('session/');
const $body = document.body;
const buildElement = (id = '', name = '', points = false) => {
    return `<li id="${id}" class="results__el">
    <div class="results-name">
        ${name}
    </div>
    
    
    <div class="results-points">
        ${points !== false ? points : 'X'}
    </div>
</li>`;
};

let currentValue = {};

export default class DefaultRole {
    constructor(croupier = false) {
        if (croupier) {
            this.initCroupier();
        }

        this.initDOM();
        this.initDBObserver();
        this.initClearButton();
    }
    
    initCroupier() {
        $body.classList.add('croupier-role');
    }

    initDOM($context = document.querySelector('.results')) {
        this.dom = {
            $context,
            $list: $context.querySelector('.results__list'),
            $btn: $context.querySelector('.results-btn')
        }
    }
    
    initDBObserver() {
        const { $list } = this.dom;
    
        dbSession.on('value', snapshot => {
            const data = snapshot.val();
            const html = [];
    
            currentValue = data;
            $list.innerHTML = '';
            
            for (const key in data) {
                const { name, points, role } = data[key];
                
                if (role === 'player') {
                    html.push(buildElement(key, name, points));
                }
            }
            
            if (html.length) {
                $list.innerHTML = html.join('');
            }
        });
    }
    
    initClearButton() {
        this.dom.$btn.addEventListener('click', () => {
            const newObj = {};
            
            for (const key in currentValue) {
                newObj[key] = { ...currentValue[key], points: false};
            }
            
            dbSession.set(newObj);
        });
    }
}