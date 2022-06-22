class SimpleInput extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({
      mode: 'open',
      delegatesFocus: true,
    });

    const label = document.createElement('label');
    const labelText = document.createElement('span');
    const errorMssg = document.createElement('p');
    labelText.classList.add('label-text');
    labelText.textContent = this.getAttribute('label');
    errorMssg.setAttribute('id', 'input-error');
    errorMssg.classList.add('error-message');

    const input = document.createElement('input');
    input.setAttribute('aria-describedby', 'input-error');

    // set default value, if any
    if (this.hasAttribute('value')) {
      let val = this.getAttribute('value');
      if (val) input.value = val;
    }

    // check for required attr
    if (this.hasAttribute('required')) {
      // set corresponding input property
      input.required = true;
      // by default, the field is invalid until filled in
      this.setAttribute('invalid', true);
      // add indicator, styles
      labelText.innerHTML = labelText.innerHTML +=
        '<sup aria-hidden="true">*</sup>';
      labelText.classList.add('required');
    }

    this.isInvalid = () => {
      this.setAttribute('invalid', true);
      errorMssg.textContent = 'Please enter a value.';
      input.classList.add('invalid');
    };

    this.isValid = () => {
      this.removeAttribute('invalid');
      errorMssg.textContent = '';
      input.classList.remove('invalid');
    };

    input.addEventListener('change', (e) => {
      // sync value with attr
      this.setAttribute('value', input.value);

      // dispatch change event that bubbles from the input
      let changeEv = new Event('change', { bubbles: true });
      this.dispatchEvent(changeEv);
    });

    input.addEventListener('blur', (e) => {
      // run client-side validation
      if (input.validity.valueMissing) {
        this.isInvalid();
      } else {
        this.isValid();
      }
    });

    const style = document.createElement('style');
    style.textContent = `
      label {
        display: flex;
        flex-flow: row nowrap;
      }
      .label-text {
        flex: 0 0 8rem;
      }
      .label-text sup {
        color: red;
        font-size: 1.2em;
        vertical-align: unset;
        margin-top: -1em;
        display: inline-block;
      }
      .error-message {
        font-size: .9em;
        margin: .3rem 0 0 8rem;
        color: #b50000;
      }
      input {
        width: 100%;
        border: 1px solid #666;
        padding: .3rem;
        border-radius: 4px;
      }
      input.invalid {
        border-color: #b50000;
        outline-color: red;
      }
    `;

    this.classList.add('field');

    label.appendChild(labelText);
    label.appendChild(input);
    shadow.appendChild(style);
    shadow.appendChild(label);
    shadow.appendChild(errorMssg);
  }
}

customElements.define('simple-input', SimpleInput);
