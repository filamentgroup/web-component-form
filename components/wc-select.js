class SimpleSelect extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({
      mode: "open",
      delegatesFocus: true,
    });

    const label = document.createElement("label");
    const labelText = document.createElement("span");
    labelText.classList.add("label-text");
    labelText.textContent = this.getAttribute("label");

    const select = document.createElement("select");

    // options could also be passed in with a slot
    const options = [
      { label: "Boston", value: "boston" },
      { label: "Chicago", value: "chicago", selected: "true" },
      { label: "New York", value: "new york" },
    ];

    options.forEach((opt, index) => {
      let option = document.createElement("option");
      option.setAttribute("value", opt.value);
      option.textContent = opt.label;
      if (opt.selected) {
        option.setAttribute("selected", true);
        this.setAttribute("value", opt.value);
      }
      select.appendChild(option);
    });

    select.addEventListener("change", (e) => {
      // sync value with attr
      this.setAttribute("value", select.value);

      // dispatch change event that bubbles from the input
      let changeEv = new Event("change", { bubbles: true });
      this.dispatchEvent(changeEv);
    });

    const style = document.createElement("style");
    style.textContent = `
      label {
        display: flex;
        flex-flow: row nowrap;
      }
      .label-text {
        flex: 0 0 8rem;
      }
      select {
        width: 100%;
        border: 1px solid #666;
        padding: .3rem;
        border-radius: 4px;
      }
    `;

    this.classList.add("field");

    label.appendChild(labelText);
    label.appendChild(select);
    shadow.appendChild(style);
    shadow.appendChild(label);
  }
}

customElements.define("simple-select", SimpleSelect);
