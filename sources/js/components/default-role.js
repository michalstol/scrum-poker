const $body = document.body;
const buildElement = (name = '', points = 0) => {
    return `<li class="results__el">
    <div class="results-name">
        ${name}
    </div>
    
    <div class="results-points">
        ${points}
    </div>
</li>`;
};

export default class DefaultRole {
    constructor(croupier = false) {
        if (croupier) {
            this.initCroupier();
        }

        this.initDOM();
    }

    initCroupier() {
        $body.classList.add('croupier-role');
    }

    initDOM($context = document.querySelector('.results')) {
        this.dom = {
            $context,
            $list: $context.querySelector('.results__list')
        }
    }
}