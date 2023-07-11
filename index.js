const inputList = document.querySelectorAll('.form__item input');
const submitBtn = document.querySelector('.btn');
class Validator {
    constructor(input) {
        this.input = input;
        this.valid = true;
    }
    isRequired() {
        if (this.valid && this.input.trim() === '') {
            this.valid = false;
        }

        return this;
    }
    isEmail() {
        const regex =
            /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (this.valid && !regex.test(this.input)) {
            this.valid = false;
        }
        return this;
    }
    isMatch(value) {
        if (this.valid && value !== this.input) {
            this.valid = false;
        }
        return this;
    }

    isPassword() {
        if (this.valid && this.input.length < 8) {
            this.valid = false;
        }
        return this;
    }

    minLength(value) {
        if (this.valid && this.input.length < value) {
            this.valid = false;
        }
        return this;
    }
}

const handleOnChange = (e) => {
    e.target.parentElement
        .getElementsByClassName('form__item__error-msg')[0]
        .classList.remove('visible');
};

const validate = (element) => {
    const passwordInput = document.getElementById('password');
    const name = element.name;
    let validate;
    switch (name) {
        case 'email':
            validate = new Validator(element.value)
                .isRequired()
                .isEmail().valid;
            break;
        case 'name':
            validate = new Validator(element.value).isRequired().valid;
            break;
        case 'password':
            validate = new Validator(element.value)
                .isRequired()
                .minLength(8).valid;
            break;
        case 'passwordConfirm':
            validate = new Validator(element.value)
                .isRequired()
                .isMatch(passwordInput.value).valid;
            break;
        default:
            break;
    }

    if (!validate) {
        element.parentElement
            .getElementsByClassName('form__item__error-msg')[0]
            .classList.add('visible');
    }
};

const handleBlur = (e) => {
    validate(e.target);
};

const validateAll = () => {
    inputList.forEach((el) => validate(el));
};

inputList.forEach((el) => {
    el.addEventListener('blur', handleBlur);
    el.addEventListener('input', handleOnChange);
});

submitBtn.addEventListener('click', validateAll);
