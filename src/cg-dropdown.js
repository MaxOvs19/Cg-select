export class DropDown {
  #element;
  #list;
  #options;
  #caret;

  //ToDo: Added  url

  constructor(options = {}) {
    this.#init(options);
    this.#initAmount();
    this.#render();
    this.#initEvent();
  }

  #init(options) {
    this.#options = options;
    const elem = document.querySelector(options.selector);

    if (!elem) {
      throw new Error(`Element with selector ${options.selector}`);
    }

    this.#element = elem;

    this.#element.addEventListener('click', () => {
      this.#selectItem();
      this.#open();
    });

    this.#list = this.#element.querySelector('.list');
    this.#caret = this.#element.querySelector('.caret');
  }

  #initSelected() {
    const { styles } = this.#options;

    if (this.#options.selected) {
      this.#createSelected(this.#options.selected);
    } else {
      this.#createSelected('Select...');
    }

    if (!this.#options.selected && this.#options.placeholder) {
      this.#createSelected(this.#options.placeholder);
    }

    if ((styles && this.#options.placeholder) || (styles && this.#options.selected)) {
      this.#createSelected(this.#options.placeholder);
      this.#customStyles(styles);
    } else {
      this.#createSelected('Select...');
      this.#customStyles(styles);
    }
  }

  #initAmount() {
    const { amount } = this.#options;

    if (!amount) {
      return;
    }

    let templete = '';

    for (let i = 0; i < amount; i++) {
      templete += `<li class="list__item">${i + 1}</li>`;
    }
    this.#element.innerHTML += `<ul class="list">${templete}</ul>`;
  }

  #render() {
    const { items, styles } = this.#options;

    this.#initSelected();
    this.#element.querySelector(this.#options.selector);

    let ul = document.createElement('ul');

    if (styles) {
      const { list } = styles;

      console.log(styles);
      ul.classList.add('list');

      if (ul) {
        if (list) {
          Object.entries(list).forEach(([key, value]) => {
            ul.style[key] = value;
          });
        }
      }
      this.#element.appendChild(ul);
    } else {
      ul.classList.add('list');
      this.#element.appendChild(ul);
    }

    items.map((item) => {
      let li = document.createElement('li');
      const text = document.createTextNode(item);
      li.classList.add('list__item');

      li.appendChild(text);
      ul.appendChild(li);
    });
  }

  #open() {
    this.#list = this.#element.querySelector('.list');
    this.#caret = this.#element.querySelector('.caret');

    this.#list.classList.toggle('open');
    this.#caret.classList.toggle('caret_rotate');
  }

  #close() {
    this.#list.classList.remove('open');
    this.#caret.classList.remove('caret_rotate');
  }

  #selectItem() {
    const options = this.#element.querySelectorAll('.list__item');
    const selected = this.#element.querySelector('.selected');

    options.forEach((option) => {
      option.addEventListener('click', () => {
        selected.innerText = option.innerText;

        options.forEach((option) => {
          option.classList.remove('active');
        });
        option.classList.add('active');
      });
    });
  }

  #initEvent() {
    const { event } = this.#options;
    if (!event) {
      return;
    }

    this.#list = this.#element.querySelectorAll('.list');
    this.#caret = this.#element.querySelector('.caret');

    if (event) {
      let list = this.#element.querySelectorAll('.list');
      console.log(list);

      if (event === 'mouseenter') {
        this.#element.addEventListener(event, () => {
          this.#open();
        });

        this.#element.addEventListener('mouseleave', () => {
          this.#close();
        });
      }
    }
  }

  #customStyles(styles) {
    if (!styles) {
      return;
    }

    const { head, caret, placeholder } = styles;
    const select = this.#element.querySelector('.cg-select');
    const crt = this.#element.querySelector('.caret');

    const placeh = this.#element.querySelector('.selected');

    if (head) {
      Object.entries(head).forEach(([key, value]) => {
        select.style[key] = value;
      });
    }

    if (caret) {
      Object.entries(caret).forEach(([key, value]) => {
        crt.style[key] = value;
      });
    }

    if (placeh) {
      if (placeholder) {
        Object.entries(placeholder).forEach(([key, value]) => {
          placeh.style[key] = value;
        });
      }
    }
  }

  #createSelected(content, styles) {
    if (content) {
      this.#element.innerHTML = `
      <div class="cg-select">
          <span class="selected">${content}</span>
          <div class="caret"></div>
      </div>
      `;
    }

    if (styles) {
      this.#customStyles(styles);

      this.#element.innerHTML = `
            <div class="cg-select" style = "${styles}">
                <span class="selected" style = "${styles}">${content}</span>
                <div class="caret" style = "${styles}"></div>
            </div>
    `;
    }
  }

  addItem(item) {
    const { items } = this.#options;

    items.push(item);
    this.#render();
  }
}
