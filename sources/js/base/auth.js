import SimpleEventer from 'simple-eventer';
import { auth } from './firebase';

const cookieObj = {
    name: 'scrum-poker',
    selected: false,
    types: {
        player: 'player',
        spectator: 'spectator',
        croupier: 'croupier'
    }
};
const classes = {
    show: 'show',
    error: 'error',
    prevent: 'prevent'
};

let singletonInstance = false;
let singInTimeout = false;

export default class AuthHandler {
    constructor($context = document.querySelector('.auth')) {
        if (!singletonInstance) {
            singletonInstance = true;

            // console.log(auth);

            this.initDOM($context);
            this.initAuthChangedHandler();

            singInTimeout = setTimeout(() => this.initSignInPanel(), 3000);
        }
    }

    initDOM($context) {
        this.dom = {
            $context,
            auth: {
                $form: $context.querySelector('#auth'),
                $email: $context.querySelector('#auth-email'),
                $password: $context.querySelector('#auth-password')
            },
            change: {
                $form: $context.querySelector('#auth-change'),
                $name: $context.querySelector('#change-name'),
                $pass: $context.querySelector('#change-password'),
                $confirm: $context.querySelector('#change-confirm-password')
            },
            type: {
                $form: $context.querySelector('#auth-type')
            }
        };
    }

    initAuthChangedHandler() {
        auth.onAuthStateChanged(user => {
            if (user) {
                if (singInTimeout) {
                    clearTimeout(singInTimeout);
                    singInTimeout = false;
                }

                this.dom.auth.$form.classList.remove(classes.show);

                if (!user.displayName) {
                    this.initChangePanel();
                } else {
                    this.initTypePanel();
                }
            } else {
                console.log('reload');
                // location.reload();
            }
        });
    }

    initSignInPanel() {
        const { $form } = this.dom.auth;

        $form.classList.add(classes.show);
        $form.addEventListener('submit', this.signInSubmit.bind(this));
    }

    signInSubmit(e) {
        e.preventDefault();

        const emailVal = this.dom.auth.$email.value.trim();
        const passVal = this.dom.auth.$password.value.trim();
        
        this.dom.auth.$form.classList.add(classes.prevent);

        auth.signInWithEmailAndPassword(emailVal, passVal)
        .catch(error => {
            this.dom.auth.$form.classList.remove(classes.prevent);
        });
    }

    initChangePanel() {
        const { $form } = this.dom.change;

        $form.classList.add(classes.show);
        $form.addEventListener('submit', this.changeSubmit.bind(this));
    }


    async changeSubmit(e) {
        e.preventDefault();

        const { $form, $name, $pass, $confirm } = this.dom.change;
        const promises = [];

        $form.classList.add(classes.prevent);

        promises.push(await this.checkChangeName());
        promises.push(this.checkChangePassword());

        Promise
        .all(promises)
        .then(() => {
            location.reload();
        })
        .catch(error => {
            alert(error);
            $form.classList.remove(classes.prevent);
        });
    }

    checkChangeName() {
        const { $form, $name } = this.dom.change;
        const nameVal = $name.value.trim();
        const errorFunc = () => {
            $name.classList.add(classes.error);
        };

        return new Promise((resolve, reject) => {
            if (!!nameVal) {
                $name.classList.remove(classes.error);
    
                auth.currentUser.updateProfile({
                    displayName: nameVal
                }).then(() => resolve(true))
                .catch(error => {
                    errorFunc();
                    reject(error.message);
                });
            } else {
                errorFunc();
                reject('Set your name.');
            }
        });
    }

    checkChangePassword() {
        const { $form, $pass, $confirm } = this.dom.change;
        const passVal = $pass.value.trim();
        const errorFunc = () => {
            $pass.classList.add(classes.error);
            $confirm.classList.add(classes.error);
        };

        return new Promise((resolve, reject) => {
            if (passVal === $confirm.value.trim()) {
                $pass.classList.remove(classes.error);
                $confirm.classList.remove(classes.error);

                auth.currentUser
                .updatePassword(passVal)
                .then(() => resolve())
                .catch(error => {
                    errorFunc();
                    reject(error.message);
                });
            } else {
                errorFunc();
                reject('Passwords are not the same.');
            }
        });
    }

    hideField($field) {

    }

    initTypePanel() {
        const { $form } = this.dom.type;
        const type = this.getUserType();

        if (!type) {
            $form.classList.add(classes.show);
            $form.addEventListener('submit', this.typeSubmit.bind(this));
        } else {
            cookieObj.selected = type;

            this.sendType();
        }
    }

    getUserType() {
        const { name, types } = cookieObj;
        const cookies = document.cookie.split('; ');
        let cookieType = false;

        for (let cookie of cookies) {
            if (cookie.indexOf(name) !== -1) {
                cookieType = cookie.split('=')[1];

                break;
            }
        }

        return cookieType ? types[cookieType] : false;
    }

    typeSubmit(e) {
        e.preventDefault();

        const { $form } = this.dom.type;
        const type = $form.querySelector('input:checked').value;

        $form.classList.add(classes.prevent);

        cookieObj.selected = cookieObj.types[type];
        document.cookie = `${cookieObj.name}=${cookieObj.selected}`;

        this.sendType();
    }

    sendType() {
        const { $form } = this.dom.type;

        this.dom.$context.classList.remove(classes.show);
        $form.classList.add(classes.prevent);
        $form.classList.remove(classes.show);

        SimpleEventer.fire('selected-type', cookieObj.selected);
    }
}