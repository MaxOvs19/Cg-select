class e{#e;#t;#s;#i;constructor(e={}){this.#n(e),this.#l(),this.#c(),this.#r(),this.#o()}#a(){this.#t.classList.toggle("open"),this.#i.classList.toggle("caret_rotate")}#n(e){this.#s=e;const t=document.querySelector(e.selector);if(!t)throw new Error(`Element with selector ${e.selector}`);this.#e=t}#l(){this.#e.innerHTML=`        \n            <div class="cg-select">\n                <span class="selected">${this.#s.selected}</span>\n                <div class="caret"></div>\n            </div>\n        `,this.#e.addEventListener("click",(()=>{this.#a()}))}#c(){const{amount:e}=this.#s;if(!e)return;let t="";for(let s=0;s<e;s++)t+=`<li class="list__item">${s+1}</li>`;this.#e.innerHTML+=`<ul class="list">${t}</ul>`}#r(){const{items:e}=this.#s;if(!Array.isArray(e))return;const t=e.map((e=>`<li class="list__item">${e}</li>`)).join("");this.#e.innerHTML+=`<ul class="list">${t}</ul>`;const s=this.#e.querySelectorAll(".list__item"),i=this.#e.querySelector(".selected");s.forEach((e=>{e.addEventListener("click",(()=>{i.innerText=e.innerText,s.forEach((e=>{e.classList.remove("active")})),e.classList.add("active")}))}))}#o(){const{event:e}=this.#s;this.#t=this.#e.querySelector(".list"),this.#i=this.#e.querySelector(".caret"),"mouseenter"===e&&(this.#e.addEventListener(e,(()=>{this.#t.classList.add("open"),this.#i.classList.add("caret_rotate")})),this.#e.addEventListener("mouseleave",(()=>{this.#t.classList.remove("open"),this.#i.classList.remove("caret_rotate")})))}}new e({selector:".cg-dropdown",selected:"BMW",items:["BMW","Opel","Mersedes","MAN","max"]}),new e({selector:".cg-dropdown2",selected:"Opel",items:["BMW","Opel","Mersedes","MAN","max"],event:"mouseenter"});
//# sourceMappingURL=index.df53f902.js.map