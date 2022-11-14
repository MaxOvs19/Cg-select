import {
  createSelected,
  customStyles,
  getFormatItem,
  getSelectText,
  customStylesFormat,
  nativOptionMultiple,
  nativOptionOrdinary,
  clearSelect,
} from './components/utils';
import {
  createBreadcrumb,
  createInputSearch,
  createNativSelectOption,
  createNativeSelect,
} from './components/create-element';
import { ru, en } from './language/language';

/**
 * @class Описание класса DropDown
 * @description Этот класс реализовывает функционал кастомного селекта, с возможностями кастомизации.
 *@author Овсяников Максим
 */
export class DropDown {
  /**
   * Созданный HTML елемент
   * @type {HTMLElement}
   */
  #element;
  /**
   * Созданный список(ul), с классом list
   * @type {HTMLElement}
   */
  #list;
  /**
   * Настройки селекта передаваемые при создании экземпляра класса
   * @type {object}
   */
  #options;
  /**
   * Переменная для управления каретки
   * @type {HTMLElement}
   */
  #caret;
  /**
   * Массив переданных элементов
   * @type {object[]}
   */
  #items;
  /**
   * Переданные категории
   * @type {string}
   */
  #category;
  /**
   * Выбранный или массив выбранных элементов из списка
   * @type {object[] | object}
   */
  #selectedItems;
  /**
   * Массив индексов выбранных элементов
   * @type {number[]}
   */
  #indexes = [];

  /**
   * Метод экземпляра класса DropDown
   * @returns {string[] | string | null} Возвращает выбранные элемент(ы) в виде массива/элемента/null
   * @description Геттер возвращающий выбранные элемент(ы) селекта
   */
  get value() {
    return this.#selectedItems ?? null;
  }

  /**
   * Метод экземпляра класса DropDown
   * @returns {number | number[]}Возвращает индексы выбранных элемента(ов) в виде массива/пустой массив
   * @description Геттер возвращающий индексы выбранных элемента(ов) селекта
   */
  get indexes() {
    return this.#indexes ?? [];
  }

  /**
   *
   * @param {object} options Объект принимающий настройки селекта
   * @constructor Конструктор класса DropDown
   * @description  Конструктор принимает объект и рендерит селект.
   * @example
   * options = {
   *  selector: 'Уникальный селектор',
      selected: 'Выбранный элемент',
      placeholder: '...',
      items: [string|number|object],
      darkTheme: true/false,
      searchMode: true/false,
      closeOnSelect:  true/false,
      lenguage: 'ru/en',
      styles: {
        head: {
          background: '...',
        },
        list: {...},
        chips: {...},
        caret: {...},
        placeholder: {...},
        lable: {..},
      },
      event: '...',
      url: 'http/...',
      multiselect: true/false,
      multiselectTag: true/false,
   * }
     
   */
  constructor(options = {}) {
    this.#init(options);
    this.#render();
    this.#initEvent();
    this.#closeSelectClick();
  }

  /**
   * Метод экземпляра класса DropDown
   * @param {string | object} item добавляемый елемент
   * @description добавляет переданный элемент в конец списка и перерисовывает список. Не может использоваться при передачи элементов с категорями
   * @method addItem
   */
  addItem(item) {
    if (this.#category) {
      console.log('can`t add item to category');
      return;
    }

    if (!item) {
      return false;
    }

    const index = this.#items.length;

    this.#items.push(getFormatItem(item, index));
    this.#render();
  }

  /**
   * Метод экземпляра класса DropDown
   * @param {number} index индекс удаляемого элемента
   * @description удаляет елемент по индексу из списка и перерисовывает его. Не может использоваться при передачи элементов с категорями.
   * @method deleteItem
   */
  deleteItem(index) {
    if (this.#category) {
      console.log('can`t add item to category');
      return;
    }

    const item = this.#items[index];

    this.#items.splice(index, 1);
    this.#render();
  }

  /**
   * Метод экземпляра класса DropDown
   * @description удаляет все елементы из списка и перерисовывает его.
   * @method deleteItemAll
   */
  deleteItemAll() {
    this.#items.splice(0, this.#items.length);
    this.#render();
  }

  /**
   * Метод экземпляра класса DropDown
   * @param {number} index индекс выбранного элемента
   * @description  выбирает элемент который будет изначально отрисовываться в селекте
   * @method selectIndex
   */
  selectIndex(index) {
    if (this.#category) {
      console.log('can`t add item to category');
      return;
    }

    const options = this.#element.querySelectorAll('.list__item');

    if (index > options.length) {
      return;
    }

    const select = options[index].innerText;
    this.#render(select);
  }

  /**
   * Метод экземпляра класса DropDown
   * @param {number} numberItem номер возвращаемого элемента
   * @returns {HTMLElement} возвращает ссылку на выбранный HTML элемент
   * @method getElement
   */
  getElement(numberItem) {
    if (numberItem > this.#items.length) {
      return;
    }
    return this.#items[numberItem];
  }

  /**
   * Метод экземпляра класса DropDown
   * @param {boolean} value - Передаваемый параметр для добавления атрибута disabled;
   * @description Метод позволяющий переключать состояние селекта disabled,
   * @method disabled
   */
  disabled(value) {
    if (typeof value !== 'boolean') {
      return;
    }

    const select = this.#element.querySelector('.cg-select');
    const nativSelect = this.#element.querySelector('.nativSelect');
    if (value === true) {
      this.#element.setAttribute('disabled', true);
      nativSelect.setAttribute('disabled', true);
      select.classList.add('disabled');
    } else {
      this.#element.removeAttribute('disabled');
      nativSelect.removeAttribute('disabled');
      select.classList.remove('disabled');
    }
  }

  /**
   * Метод экземпляра класса DropDown
   * @param {HTMLInputElement} button - HTML кнопка
   * @param {string} method - метод открытия open/close
   * @description Метод позволяющий открывать/закрывать селект с помощью кнопок
   * @method buttonControl
   */
  buttonControl(button, method) {
    this.btn = button;
    button.addEventListener('click', () => {
      if (method === 'open') {
        this.#open(true);
      } else if (method === 'close') {
        this.#close();
      } else {
        return;
      }
    });
  }

  /**
   * Метод экземпляра класса DropDown
   * @param {object} lenguage объект в котором находятся поля для подключения языка имеет два обязательных поля placeholder, textInListSearch
   * @description метод позволяющий заменить плейсхолдер в поиске и текст который выводится если нет результата
   * @method addLenguage
   */
  addLenguage(lenguage) {
    const { placeholder, textInListSearch } = lenguage;
    const { searchMode } = this.#options;

    if (searchMode && searchMode == true) {
      const search = this.#element.querySelector('.inputSearch');
      const textNoRezult = this.#element.querySelector('.noRezult');
      const textNode = document.createTextNode(textInListSearch);

      search.setAttribute('placeholder', placeholder);
      search.setAttribute('placeholder', placeholder);

      textNoRezult.innerText = '';
      textNoRezult.appendChild(textNode);
    }
  }

  /**
   * Приватный метод инициализации экземпляра класса DropDown
   * @method #init
   * @member
   * @protected
   * @param {object} options передаваемые настройки селекта
   * @description Приватный метод. Общая инициализация селекта. Получение настоек и преобразвание элементов селекта.
   * @example
   *  {
        selector: '.cg-dropdown_one',
        placeholder: 'Выберите авто',
        items: [
          'BMW',
          {
            id: '213sade',
            title: 'Opel',
            value: 1,
          },
          'Mersedes',
          'MAN',
          'max',
        ],
        darkTheme: true,
        multiselect: true,
        multiselectTag: true,
      }
   */
  #init(options) {
    this.#options = options;
    const { items, multiselect, url } = this.#options;

    const elem = document.querySelector(options.selector);

    if (!elem) {
      throw new Error(`Element with selector ${options.selector}`);
    }

    this.#element = elem;

    this.#element.addEventListener('click', (e) => {
      e.preventDefault();
      this.#open();
    });

    this.#items = [];

    if (multiselect && multiselect == true) {
      this.#selectedItems = [];
    }

    if (!items && url) {
      this.#renderUrl();
      return;
    }

    items.forEach((dataItem, index) => {
      if (dataItem.category && dataItem.categoryItems) {
        this.#category = dataItem.category;

        this.#items.push(this.#category);
        dataItem.categoryItems.forEach((categoryItem, indexCategory) => {
          this.#items.push(getFormatItem(categoryItem, indexCategory));
        });
      } else {
        this.#items.push(getFormatItem(dataItem, index));
      }
    });
  }

  /**
   * Привaтный метод экземпляра класса DropDown
   *
   * @method #initSelected
   * @param {string} select необязательный елемент. Используется в методе selectIndex
   * @description Отрисовывает и стилизует селект
   * @protected
   */
  #initSelected(select) {
    const { styles, selected, placeholder, lable } = this.#options;

    if (selected) {
      createSelected(this.#element, selected);
    } else if (placeholder) {
      createSelected(this.#element, placeholder);
    } else {
      createSelected(this.#element, 'Select...');
    }

    if (select) {
      createSelected(this.#element, select, styles);
    }

    if (lable) {
      const lableItem = document.createElement('h1');
      const textLable = document.createTextNode(lable);

      lableItem.appendChild(textLable);
      lableItem.classList.add('label');

      this.#element.insertAdjacentElement('beforebegin', lableItem);
    }

    if (styles) {
      customStyles(this.#element, styles);
    }
  }

  /**
   * Приватный метод рендера экземпляра класса DropDown
   *@protected
   * @method #render
   * @param {string} select  необязательный елемент. Передаеться в метод initSelected
   * @description Рендер елементов в селекте.
   */
  #render(select) {
    const { styles, multiselect, searchMode, multiselectTag, darkTheme, lenguage } = this.#options;
    const random = Math.random().toString(36).substring(2, 10);

    if (select || (select && styles)) {
      this.#initSelected(select);
      customStyles(this.#element, styles);
    } else {
      this.#initSelected();
    }

    const ulList = document.createElement('ul');
    const nativSelect = createNativeSelect();

    let intputSearch = '';
    this.random = random;

    if (searchMode) {
      if (lenguage === 'ru') {
        intputSearch = createInputSearch(random, ru.placeholder);
      } else {
        intputSearch = createInputSearch(random, en.placeholder);
      }

      ulList.appendChild(intputSearch);
    }

    ulList.classList.add('list');

    if (styles) {
      const { list } = styles;
      customStylesFormat(list, ulList);
    }

    this.#element.appendChild(ulList);

    this.#items.forEach((dataItem) => {
      this.#element.appendChild(nativSelect);

      const liItem = document.createElement('li');
      const nativOption = createNativSelectOption();
      const strongItem = document.createElement('strong');

      liItem.classList.add('list__item');
      strongItem.classList.add('category');

      if (multiselect && multiselect == true) {
        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.setAttribute('id', `chbox-${dataItem.id}`);
        liItem.appendChild(checkBox);

        if (multiselectTag && multiselectTag == true) {
          checkBox.classList.add('displayHide');
        }

        nativSelect.setAttribute('multiple', 'multiple');
      }

      let textNode = '';

      if (dataItem.title) {
        nativOption.text = dataItem.title;
        nativOption.value = dataItem.title;
        textNode = document.createTextNode(dataItem.title);

        nativSelect.appendChild(nativOption);
        liItem.appendChild(textNode);
        ulList.appendChild(liItem);
      } else {
        textNode = document.createTextNode(dataItem);
        strongItem.appendChild(textNode);
        ulList.appendChild(strongItem);
      }
    });

    this.#items.filter((item, index) => {
      if (typeof item !== 'object') {
        this.#items.splice(index, 1);
      }
      return item;
    });

    if (darkTheme == false) {
      this.#checkTheme();
    }

    this.#list = this.#element.querySelector('.list');
    this.#caret = this.#element.querySelector('.caret');

    this.#addOptionsBehaviour();
  }

  /**
   * Приватный метод рендера экземпляра класса DropDown
   * @protected
   * @method #checkTheme
   * @description Изменяет цветовую схему с темной на светлую.
   */
  #checkTheme() {
    const { darkTheme, searchMode } = this.#options;

    const select = this.#element.querySelector('.cg-select');
    const caret = this.#element.querySelector('.caret');
    const list = this.#element.querySelector('ul.list');
    const search = this.#element.querySelector('.inputSearch');

    if (darkTheme == false) {
      select.classList.add('selectWhite');
      caret.classList.add('caretWhite');
      list.classList.add('listWhite');

      if (searchMode == true) {
        search.classList.add('inputWhite');
      }
    } else if (darkTheme == true || !darkTheme) {
      return;
    } else {
      throw new Error('Styles error or invalid value entered!');
    }
  }

  /**
   * Приватный метод рендера экземпляра класса DropDown
   *@protected
   * @method #renderUrl
   * @description Рендер елементов в селекте переданных с URL и их настойка
   */
  async #renderUrl() {
    const { url, items, multiselect, multiselectTag } = this.#options;

    if (items) {
      return;
    }

    if (!url) {
      return;
    }

    const response = await fetch(url);
    const dataUrl = await response.json();

    const nativSelect = createNativeSelect();

    dataUrl.forEach((dataItem, index) => {
      const item = {
        id: dataItem.id,
        title: dataItem.name,
        value: index,
      };
      const ulUrl = this.#element.querySelector('.list');

      const nativOption = createNativSelectOption();
      const liUrl = document.createElement('li');
      const textUrl = document.createTextNode(item.title);

      if (multiselect && multiselect == true) {
        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        if (multiselectTag && multiselectTag == true) {
          checkBox.classList.add('displayHide');
        }

        checkBox.setAttribute('id', `chbox-${item.id}`);
        nativSelect.setAttribute('multiple', 'multiple');

        liUrl.appendChild(checkBox);
      }

      liUrl.classList.add('list__item');
      nativOption.value = item.title;
      nativOption.text = item.title;

      nativSelect.appendChild(nativOption);
      liUrl.appendChild(textUrl);
      ulUrl.appendChild(liUrl);

      this.#items.push(item);
    });

    this.#element.appendChild(nativSelect);

    this.#items.filter((item, index) => {
      if (typeof item !== 'object') {
        this.#items.splice(index, 1);
      }
      return item;
    });

    this.#addOptionsBehaviour();
  }

  /**
   * Приватный метод экземпляра класса DropDown
   * @protected
   * @param {boolean} oneClick необязательный параметр передаваемый из функции buttonControl
   * @description Открывает список для выбора элемента
   * @method #open
   */
  #open(oneClick) {
    if (oneClick === true) {
      this.#list.classList.add('open');
      this.#caret.classList.add('caret_rotate');
    } else {
      this.#list.classList.toggle('open');
      this.#caret.classList.toggle('caret_rotate');
    }
  }

  /**
   * Приватный метод экземпляра класса DropDown
   * @protected
   * @description Закрывает список
   * @method #close
   */
  #close() {
    this.#list.classList.remove('open');
    this.#caret.classList.remove('caret_rotate');
  }

  /**
   * Приватный метод экземпляра класса DropDown
   * @protected
   * @description Метод реализовывающий выбор элементов в разных режимах. Обычный/Мультиселект/Мультиселект + Мультиселект Таг.
   * @method #addOptionsBehaviour
   */
  #addOptionsBehaviour() {
    const {
      multiselect,
      placeholder,
      selected,
      multiselectTag,
      searchMode,
      closeOnSelect,
      darkTheme,
    } = this.#options;

    const options = this.#element.querySelectorAll('.list__item');
    const select = this.#element.querySelector('.selected');
    const nativOption = this.#element.querySelectorAll('.nativSelect__nativOption');

    const ulMultipul = document.createElement('ul');

    if (multiselect && multiselect == true) {
      ulMultipul.classList.add('multiselect-tag');
      select.classList.add('overflow-hidden');
    }

    if (searchMode && searchMode === true) {
      this.#searchMode(this.random);
    }

    options.forEach((option, index) => {
      option.addEventListener('click', (event) => {
        const dataSelectText = {
          placeholder,
          selected,
          selectedItems: this.#selectedItems,
          indexes: this.#indexes,
          darkTheme,
          multiselectTag,
        };

        const item = this.#items[index];

        if (closeOnSelect == false || (multiselect && multiselect == true)) {
          event.stopPropagation();
          event.preventDefault();
        }

        const checkIndex = this.#indexes.indexOf(index);

        if (multiselect && multiselect == true) {
          option.classList.toggle('active');
          const checkBox = option.querySelector('input[type="checkbox"]');

          if (checkBox) {
            if (!(event.target instanceof HTMLInputElement)) {
              checkBox.checked = !checkBox.checked;
            }

            if (checkIndex === -1) {
              nativOptionMultiple(nativOption, item.title, true);
              this.#indexes.push(index);
              select.innerText = '';

              if (multiselectTag && multiselectTag == true) {
                this.#selectedItems.push(item);
                select.appendChild(ulMultipul);

                const data = {
                  option: this.#options,
                  element: this.#element,
                  indexes: this.#indexes,
                  selectedItems: this.#selectedItems,
                };

                ulMultipul.appendChild(createBreadcrumb(data, item.title, index, item.id));
              } else {
                this.#selectedItems.push(item.title);
                select.innerText = this.#selectedItems;
              }
            } else {
              if (multiselectTag && multiselectTag == true) {
                const tagItem = document.getElementById(`tag-${index}-${item.id}`);
                ulMultipul.removeChild(tagItem);
              }

              this.#indexes.splice(checkIndex, 1);
              this.#selectedItems.splice(checkIndex, 1);
              nativOptionMultiple(nativOption, item.title, false);
            }

            if (!this.#selectedItems.length) {
              getSelectText(dataSelectText, select);
            } else {
              if (multiselectTag && multiselectTag == true) {
                select.appendChild(ulMultipul);
              } else {
                select.innerText = this.#selectedItems;
              }
            }
          }
        } else {
          select.innerText = item.title;
          this.#selectedItems = item;

          nativOptionOrdinary(nativOption, item.title);

          options.forEach((option) => {
            option.classList.remove('active');
          });
          option.classList.add('active');
        }

        clearSelect(select, this.#element, dataSelectText);
      });
    });
  }

  /**
   * Метод который реализует поиск элементов в селекте
   * @protected
   * @param {string} random уникальное значение для input элемента.
   * @method #searchMode
   */
  #searchMode(random) {
    const { lenguage } = this.#options;

    const input = this.#element.querySelector(`#searchSelect-${random}`);
    const searchSelect = this.#element.querySelectorAll('.list__item');
    const result = document.createElement('p');

    let textNode = '';
    if (lenguage === 'ru') {
      textNode = document.createTextNode(`${ru.textInListSearch}`);
    } else {
      textNode = document.createTextNode(`${en.textInListSearch}`);
    }

    result.appendChild(textNode);
    result.classList.add('displayHide');
    result.classList.add('noRezult');
    input.parentElement.appendChild(result);

    input.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    input.oninput = function () {
      let val = this.value.trim();

      if (val != '') {
        searchSelect.forEach((elem) => {
          if (elem.innerText.search(val) == -1) {
            elem.classList.add('displayHide');
            result.classList.remove('displayHide');
          } else {
            elem.classList.remove('displayHide');
          }
        });
      } else {
        searchSelect.forEach((elem) => {
          elem.classList.remove('displayHide');
          result.classList.add('displayHide');
        });
      }
    };
  }

  /**
   * Приватный метод экземпляра класса DropDown
   * @protected
   * @description Открывает и закрывает список по переданному эвенту
   * @method #initEvent
   */
  #initEvent() {
    const { event } = this.#options;
    if (!event) {
      return;
    }

    if (event) {
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

  /**
   * Приватный метод экземпляра класса DropDown
   * @protected
   * @description Закрывает список по клику вне элемента
   * @method #closeSelectClick
   */
  #closeSelectClick() {
    const dropdown = document.querySelector(`${this.#options.selector}`);

    document.addEventListener('click', (e) => {
      const withinBoundaries = e.composedPath().includes(dropdown);
      if (!withinBoundaries) {
        if (this.btn) {
          return;
        } else {
          this.#close();
        }
      }
    });
  }
}
