function e(e,s,i){s&&(e.innerHTML=`\n      <div class="cg-select">\n         <p class="selected">${s}</p>\n          <div class="caret"></div>\n       </div>\n      `),i&&(t(e,i),e.innerHTML=`\n      <div class="cg-select" style = "${i}">\n          <p class="selected" style = "${i}">${s}</p>\n          <div class="caret" style = "${i}"></div>\n      </div>\n    `)}function t(e,t){if(!t)return;const{head:i,caret:l,placeholder:c,lable:n}=t,d=e.querySelector(".cg-select"),r=e.querySelector(".caret"),o=e.querySelector(".selected"),a=e.parentElement.querySelector("h1.label");s(i,d),s(l,r),s(n,a),o&&s(c,o)}function s(e,t){e&&Object.entries(e).forEach((([e,s])=>{t.style[e]=s}))}function i(e,t){const{placeholder:s,selected:i}=e;return t.innerText=s||(i||"Select..."),t}function l(e,t){const s=Math.random().toString(36).substring(2,10);let i={};return i=function(e){return(!e||"object"==typeof e)&&e.hasOwnProperty("id")&&e.hasOwnProperty("title")&&e.hasOwnProperty("value")}(e)?{id:e.id,title:e.title,value:t}:{id:s,title:e,value:t},i}function c(e,t){e.forEach((e=>{e.removeAttribute("selected"),e.textContent===t&&e.setAttribute("selected","selected")}))}function n(e,t,s){e.forEach((e=>{if(1==s)e.textContent===t&&e.setAttribute("selected","selected");else{if(0!=s)return;e.textContent===t&&e.removeAttribute("selected")}}))}function d(e,t,s){const{selectedItems:l,indexes:c,darkTheme:n,multiselectTag:d}=s,r=t.querySelectorAll(".list__item"),o=(t.querySelector(".multiselect-tag"),document.createElementNS("http://www.w3.org/2000/svg","svg")),a=document.createElementNS("http://www.w3.org/2000/svg","path"),h=document.createElementNS("http://www.w3.org/2000/svg","path"),p=t.querySelectorAll("li input");o.setAttribute("viewBox","0 0 10 10"),a.setAttribute("d","M2,8 L8,2"),h.setAttribute("d","M2,2 L8,8"),o.appendChild(a),o.appendChild(h),d&&1==d||(!0!==n&&n||(a.classList.add("pathWhite"),h.classList.add("pathWhite")),!1===n&&(a.classList.add("pathBlack"),h.classList.add("pathBlack")),o.classList.add("svg-icon"),o.classList.add("svg-clear"),e.appendChild(o),o.addEventListener("click",(()=>{e.innerText="",Array.isArray(l)&&(l.splice(0),c.splice(0)),p.forEach((e=>{e.checked=!1})),i(s,e),r.forEach((e=>{e.classList.remove("active")}))})))}function r(e,t,i,l){const{element:c,option:d,indexes:r,selectedItems:o}=e,{placeholder:a,styles:h}=d,p=c.querySelector(".selected"),m=c.querySelectorAll(".nativSelect__nativOption"),u=document.createElement("li"),g=document.createTextNode(t),y=document.createElementNS("http://www.w3.org/2000/svg","svg"),v=document.createElementNS("http://www.w3.org/2000/svg","path"),b=document.createElementNS("http://www.w3.org/2000/svg","path");if(y.setAttribute("viewBox","0 0 10 10"),v.setAttribute("d","M3,7 L7,3"),b.setAttribute("d","M3,3 L7,7"),u.setAttribute("id",`tag-${i}-${l}`),y.classList.add("svg-icon"),y.appendChild(v),y.appendChild(b),u.appendChild(g),u.appendChild(y),h){const{chips:e}=h;s(e,u)}return y.addEventListener("click",(e=>{e.preventDefault(),e.stopPropagation(),n(m,t,!1);const s=r.indexOf(i);let c="";r.splice(s,1),o.splice(s,1),c=l?document.getElementById(`chbox-${l}`):document.getElementById(`chbox-${i}`),c.checked=!1,c.parentElement.classList.remove("active"),o.length||(p.innerText=a),u.parentElement.removeChild(u)})),u}function o(){const e=document.createElement("select");return e.setAttribute("name","dataSelect"),e.classList.add("nativSelect"),e}function a(){const e=document.createElement("option");return e.classList.add("nativSelect__nativOption"),e}function h(e,t){const s=document.createElement("input");return s.type="text",s.classList.add("inputSearch"),s.setAttribute("id",`searchSelect-${e}`),t?s.setAttribute("placeholder",`${t}`):s.setAttribute("placeholder","Search..."),s.addEventListener("click",(e=>{e.preventDefault()})),s}const p={placeholder:"Поиск...",textInListSearch:"Совпадений нет..."},m={placeholder:"Search...",textInListSearch:"No matches..."};class u{#e;#t;#s;#i;#l;#c;#n;#d=[];get value(){return this.#n??null}get indexes(){return this.#d??[]}constructor(e={}){this.#r(e),this.#o(),this.#a(),this.#h()}addItem(e){if(this.#c)return void console.log("can`t add item to category");if(!e)return!1;const t=this.#l.length;this.#l.push(l(e,t)),this.#o()}deleteItem(e){if(this.#c)return void console.log("can`t add item to category");this.#l[e];this.#l.splice(e,1),this.#o()}deleteItemAll(){this.#l.splice(0,this.#l.length),this.#o()}selectIndex(e){if(this.#c)return void console.log("can`t add item to category");const t=this.#e.querySelectorAll(".list__item");if(e>t.length)return;const s=t[e].innerText;this.#o(s)}getElement(e){if(!(e>this.#l.length))return this.#l[e]}disabled(e){if("boolean"!=typeof e)return;const t=this.#e.querySelector(".cg-select"),s=this.#e.querySelector(".nativSelect");!0===e?(this.#e.setAttribute("disabled",!0),s.setAttribute("disabled",!0),t.classList.add("disabled")):(this.#e.removeAttribute("disabled"),s.removeAttribute("disabled"),t.classList.remove("disabled"))}buttonControl(e,t){this.btn=e,e.addEventListener("click",(()=>{if("open"===t)this.#p(!0);else{if("close"!==t)return;this.#m()}}))}addLenguage(e){const{placeholder:t,textInListSearch:s}=e,{searchMode:i}=this.#s;if(i&&1==i){const e=this.#e.querySelector(".inputSearch"),i=this.#e.querySelector(".noRezult"),l=document.createTextNode(s);e.setAttribute("placeholder",t),e.setAttribute("placeholder",t),i.innerText="",i.appendChild(l)}}#r(e){this.#s=e;const{items:t,multiselect:s,url:i}=this.#s,c=document.querySelector(e.selector);if(!c)throw new Error(`Element with selector ${e.selector}`);this.#e=c,this.#e.addEventListener("click",(e=>{e.preventDefault(),this.#p()})),this.#l=[],s&&1==s&&(this.#n=[]),t||!i?t.forEach(((e,t)=>{e.category&&e.categoryItems?(this.#c=e.category,this.#l.push(this.#c),e.categoryItems.forEach(((e,t)=>{this.#l.push(l(e,t))}))):this.#l.push(l(e,t))})):this.#u()}#g(s){const{styles:i,selected:l,placeholder:c,lable:n}=this.#s;if(e(this.#e,l||(c||"Select...")),s&&e(this.#e,s,i),n){const e=document.createElement("h1"),t=document.createTextNode(n);e.appendChild(t),e.classList.add("label"),this.#e.insertAdjacentElement("beforebegin",e)}i&&t(this.#e,i)}#o(e){const{styles:i,multiselect:l,searchMode:c,multiselectTag:n,darkTheme:d,lenguage:r}=this.#s,{list:u,search:g}=i,y=Math.random().toString(36).substring(2,10);e||e&&i?(this.#g(e),t(this.#e,i)):this.#g();const v=document.createElement("ul"),b=o();let f="";this.random=y,c&&(f=h(y,"ru"===r?p.placeholder:m.placeholder),s(g,f),v.appendChild(f)),v.classList.add("list"),i&&s(u,v),this.#e.appendChild(v),this.#l.forEach((e=>{this.#e.appendChild(b);const t=document.createElement("li"),s=a(),i=document.createElement("strong");if(t.classList.add("list__item"),i.classList.add("category"),l&&1==l){const s=document.createElement("input");s.type="checkbox",s.setAttribute("id",`chbox-${e.id}`),t.appendChild(s),n&&1==n&&s.classList.add("displayHide"),b.setAttribute("multiple","multiple")}let c="";e.title?(s.text=e.title,s.value=e.title,c=document.createTextNode(e.title),b.appendChild(s),t.appendChild(c),v.appendChild(t)):(c=document.createTextNode(e),i.appendChild(c),v.appendChild(i))})),this.#l.filter(((e,t)=>("object"!=typeof e&&this.#l.splice(t,1),e))),0==d&&this.#y(),this.#t=this.#e.querySelector(".list"),this.#i=this.#e.querySelector(".caret"),this.#v()}#y(){const{darkTheme:e,searchMode:t}=this.#s,s=this.#e.querySelector(".cg-select"),i=this.#e.querySelector(".caret"),l=this.#e.querySelector("ul.list"),c=this.#e.querySelector(".inputSearch");if(0==e)s.classList.add("selectWhite"),i.classList.add("caretWhite"),l.classList.add("listWhite"),1==t&&c.classList.add("inputWhite");else if(1!=e&&e)throw new Error("Styles error or invalid value entered!")}async#u(){const{url:e,items:t,multiselect:s,multiselectTag:i}=this.#s;if(t)return;if(!e)return;const l=await fetch(e),c=await l.json(),n=o();c.forEach(((e,t)=>{const l={id:e.id,title:e.name,value:t},c=this.#e.querySelector(".list"),d=a(),r=document.createElement("li"),o=document.createTextNode(l.title);if(s&&1==s){const e=document.createElement("input");e.type="checkbox",i&&1==i&&e.classList.add("displayHide"),e.setAttribute("id",`chbox-${l.id}`),n.setAttribute("multiple","multiple"),r.appendChild(e)}r.classList.add("list__item"),d.value=l.title,d.text=l.title,n.appendChild(d),r.appendChild(o),c.appendChild(r),this.#l.push(l)})),this.#e.appendChild(n),this.#l.filter(((e,t)=>("object"!=typeof e&&this.#l.splice(t,1),e))),this.#v()}#p(e){!0===e?(this.#t.classList.add("open"),this.#i.classList.add("caret_rotate")):(this.#t.classList.toggle("open"),this.#i.classList.toggle("caret_rotate"))}#m(){this.#t.classList.remove("open"),this.#i.classList.remove("caret_rotate")}#v(){const{multiselect:e,placeholder:t,selected:s,multiselectTag:l,searchMode:o,closeOnSelect:a,darkTheme:h}=this.#s,p=this.#e.querySelectorAll(".list__item"),m=this.#e.querySelector(".selected"),u=this.#e.querySelectorAll(".nativSelect__nativOption"),g=document.createElement("ul");e&&1==e&&(g.classList.add("multiselect-tag"),m.classList.add("overflow-hidden")),o&&!0===o&&this.#b(this.random),p.forEach(((o,y)=>{o.addEventListener("click",(v=>{const b={placeholder:t,selected:s,selectedItems:this.#n,indexes:this.#d,darkTheme:h,multiselectTag:l},f=this.#l[y];(0==a||e&&1==e)&&(v.stopPropagation(),v.preventDefault());const x=this.#d.indexOf(y);if(e&&1==e){o.classList.toggle("active");const e=o.querySelector('input[type="checkbox"]');if(e){if(v.target instanceof HTMLInputElement||(e.checked=!e.checked),-1===x)if(n(u,f.title,!0),this.#d.push(y),m.innerText="",l&&1==l){this.#n.push(f),m.appendChild(g);const e={option:this.#s,element:this.#e,indexes:this.#d,selectedItems:this.#n};g.appendChild(r(e,f.title,y,f.id))}else this.#n.push(f.title),m.innerText=this.#n;else{if(l&&1==l){const e=document.getElementById(`tag-${y}-${f.id}`);g.removeChild(e)}this.#d.splice(x,1),this.#n.splice(x,1),n(u,f.title,!1)}this.#n.length?l&&1==l?m.appendChild(g):m.innerText=this.#n:i(b,m)}}else m.innerText=f.title,this.#n=f,c(u,f.title),p.forEach((e=>{e.classList.remove("active")})),o.classList.add("active");d(m,this.#e,b)}))}))}#b(e){const{lenguage:t}=this.#s,s=this.#e.querySelector(`#searchSelect-${e}`),i=this.#e.querySelectorAll(".list__item"),l=document.createElement("p");let c="";c="ru"===t?document.createTextNode(`${p.textInListSearch}`):document.createTextNode(`${m.textInListSearch}`),l.appendChild(c),l.classList.add("displayHide"),l.classList.add("noRezult"),s.parentElement.appendChild(l),s.addEventListener("click",(e=>{e.stopPropagation()})),s.oninput=function(){let e=this.value.trim().toLowerCase(),t=!1;""!=e?(i.forEach((s=>{let i=new RegExp(e,"gi").test(s.textContent);t=t||i,-1==s.textContent.toLowerCase().search(e)?s.classList.add("displayHide"):s.classList.remove("displayHide")})),l.classList.toggle("displayHide",t)):i.forEach((e=>{e.classList.remove("displayHide"),l.classList.add("displayHide")}))}}#a(){const{event:e}=this.#s;e&&e&&"mouseenter"===e&&(this.#e.addEventListener(e,(()=>{this.#p()})),this.#e.addEventListener("mouseleave",(()=>{this.#m()})))}#h(){const e=document.querySelector(`${this.#s.selector}`);document.addEventListener("click",(t=>{if(!t.composedPath().includes(e)){if(this.btn)return;this.#m()}}))}}new u({selector:".cg-dropdown_one",placeholder:"Выберите авто",lable:"EXAMPLE",items:["BMW",{id:"213sade",title:"Opel",value:1},"Mersedes","MAN","Ferari"],styles:{head:{width:"830px"},list:{width:"824px"}}}),new u({selector:".cg-dropdown_three",placeholder:"URL",url:"https://jsonplaceholder.typicode.com/users",searchMode:!0,darkTheme:!1,lenguage:"ru",styles:{head:{width:"830px"},list:{width:"824px"}}}),new u({selector:".cg-dropdown_categories",placeholder:"Выберите регион",searchMode:!0,items:[{category:"Russia",categoryItems:[{id:"28qwds",title:"Москва",value:0},,"Ростов-на-дону","Саратов","Волгоград","Донецк"]},{category:"USA",categoryItems:["Alabama","Texas","Colorado","Klirens","Los-Angeles"]},{category:"France",categoryItems:["Paris"]}],styles:{head:{width:"830px"},list:{width:"824px"},placeholder:{maxWidth:"500px "}},multiselect:!0,multiselectTag:!0});const g=new u({selector:".cg-dropdown_usedBtn",placeholder:"Выберите авто",searchMode:!0,items:["BMW",{id:"213sade",title:"Opel",value:1},"Mersedes","MAN","max"],styles:{head:{width:"830px",color:"black",backgroundColor:"rgb(176 223 167)"},list:{width:"824px",color:"black",backgroundColor:"rgb(176 223 167)"},caret:{borderTop:"6px solid black"},search:{backgroundColor:"#d7ffff",borderRadius:"5px",borderBottom:"none",width:"95%",color:"black"}},multiselect:!0}),y=document.querySelector(".button__open"),v=document.querySelector(".button__close");g.buttonControl(y,"open"),g.buttonControl(v,"close");const b=new u({selector:".cg-dropdown_checkboxDisable",placeholder:"Выберите авто",searchMode:!0,items:["BMW",{id:"213sade",title:"Opel",value:1},"Mersedes","MAN","max"],styles:{head:{width:"830px"},list:{width:"824px"},placeholder:{maxWidth:"500px "}},multiselect:!0});b.disabled(!0);let f=document.getElementById("checkboxDisable");f.addEventListener("click",(()=>{1==f.checked?b.disabled(!1):b.disabled(!0)}));
//# sourceMappingURL=index.320be838.js.map
