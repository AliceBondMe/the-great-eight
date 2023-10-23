import{s as p,o as h}from"./modal-exercise-fb064d2f.js";(()=>{const t=document.querySelector(".js-menu-container"),e=document.querySelector(".js-open-menu"),s=document.querySelector(".js-close-menu"),o=()=>{const i=e.getAttribute("aria-expanded")==="true"||!1;e.setAttribute("aria-expanded",!i),t.classList.toggle("is-open")};e.addEventListener("click",o),s.addEventListener("click",o),window.matchMedia("(min-width: 768px)").addEventListener("change",i=>{i.matches&&(t.classList.remove("is-open"),e.setAttribute("aria-expanded",!1))})})();const b=document.querySelector(".favorites-sidebar-quote-text-quotetext"),y=document.querySelector(".favorites-sidebar-quote-text-author"),g=new Date().toDateString();document.addEventListener("DOMContentLoaded",S);function S(){JSON.parse(localStorage.getItem("date"))?JSON.parse(localStorage.getItem("date"))!==g&&p().then(t=>{const e=t.quote,s=t.author;localStorage.setItem("quote",JSON.stringify(e)),localStorage.setItem("author",JSON.stringify(s)),localStorage.setItem("date",JSON.stringify(g))}):p().then(t=>{const e=t.quote,s=t.author;localStorage.setItem("quote",JSON.stringify(e)),localStorage.setItem("author",JSON.stringify(s)),localStorage.setItem("date",JSON.stringify(g))}).catch(t=>{console.error(t)}),b.innerHTML=`${JSON.parse(localStorage.getItem("quote"))}`,y.innerHTML=`${JSON.parse(localStorage.getItem("author"))}`}const r=JSON.parse(localStorage.getItem("favorites")),w=document.querySelector(".favorites-exercises-none");r&&(w.style.display="none");if(r){let e=function(){let s=1;function o(n,a,l){const u=document.querySelector("#favorites-container-js");u.innerHTML="",l--;const c=a*l,f=c+a;n.slice(c,f).forEach(d=>{const v=document.createElement("div");v.classList.add("favorites-workout-container"),v.innerHTML=`<ul class="favorites-rating_list">
                  <li class="favorites-rating_item">
                    <div class="favorites-rating_item_wrap">
                      <h1 class="favorites-rating-title">Workout</h1>
                      <button
                        type="button"
                        class="favorites-rating-title-button"
                        data-about="${d.id}"
                      >
                        <svg width="16" height="16">
                          <use
                            class="favorites-icon-bin"
                            id="favorites-icon-bin"
                            href="../img/symbol-defs.svg#icon-trash"
                          ></use>
                        </svg>
                      </button>
                        <button type="button" data-modal-open class="favorites-workouts-arrow-button favorites-workouts-arrow">
                          <p class="favorites-workouts-subtext">Start</p>
                            <svg width="16" height="16">
                              <use class="favorites-icon-arrow" href="../img/symbol-defs.svg#icon-arrow" stroke="black"></use>
                            </svg>
                      </button>
                    </div>
                    <div class="favorites-icon-wrapper">
                      <div class="favorites-icon-circle">
                        <svg width="20" height="20">
                          <use
                            class="favorites-icon-runner"
                            href="../img/symbol-defs.svg#icon-running"
                            stroke="black"
                          ></use>
                        </svg>
                      </div>
                      <h2 class="favorites-icon-title">${d.name}</h2>
                    </div>
                    <div class="favorites-workout-description">
                      <p class="favorites-description-light">
                        Burned calories:<span class="favorites-description-dark"
                          >${d.burnedCalories} / 3 min</span
                        >
                      </p>
                      <p class="favorites-description-light">
                        Body part:<span class="favorites-description-dark"
                          >${d.bodyPart}</span
                        >
                      </p>
                      <p class="favorites-description-light">
                        Target:<span class="favorites-description-dark"
                          >${d.target}</span
                        >
                      </p>
                    </div>
                  </li>
                </ul>
    `,u.appendChild(v)})}function i(n,a){const l=Math.ceil(n.length/a),u=document.querySelector(".favorites-pages-list");for(let c=0;c<l;c++){const f=m(c+1);u.appendChild(f)}}function m(n){const a=document.createElement("li");return a.classList.add("favorites-pages-button"),a.innerHTML=n,s==n&&a.classList.add("favorites-current-page"),a.addEventListener("click",()=>{s=n,o(r,t,s),document.querySelector("li.favorites-current-page").classList.remove("favorites-current-page"),a.classList.add("favorites-current-page")}),a}o(r,t,s),i(r,t)},t;window.innerWidth<768&&(t=8,e()),window.innerWidth>=768&&window.innerWidth<1440&&(t=10,e())}if(r){let e=function(s){s.forEach(o=>{const i=document.createElement("div");i.classList.add("favorites-workout-container"),i.innerHTML=`<ul class="favorites-rating_list">
                  <li class="favorites-rating_item">
                    <div class="favorites-rating_item_wrap">
                      <h1 class="favorites-rating-title">Workout</h1>
                      <button
                        type="button"
                        class="favorites-rating-title-button"
                        data-about="${o.id}"
                      >
                        <svg width="16" height="16">
                          <use
                            class="favorites-icon-bin"
                            id="favorites-icon-bin"
                            href="../img/symbol-defs.svg#icon-trash"
                          ></use>
                        </svg>
                      </button>
                        <button type="button" data-modal-open class="favorites-workouts-arrow-button favorites-workouts-arrow">
                          <p class="favorites-workouts-subtext">Start</p>
                            <svg width="16" height="16">
                              <use class="favorites-icon-arrow" href="../img/symbol-defs.svg#icon-arrow" stroke="black"></use>
                            </svg>
                      </button>
                    </div>
                    <div class="favorites-icon-wrapper">
                      <div class="favorites-icon-circle">
                        <svg width="20" height="20">
                          <use
                            class="favorites-icon-runner"
                            href="../img/symbol-defs.svg#icon-running"
                            stroke="black"
                          ></use>
                        </svg>
                      </div>
                      <h2 class="favorites-icon-title">${o.name}</h2>
                    </div>
                    <div class="favorites-workout-description">
                      <p class="favorites-description-light">
                        Burned calories:<span class="favorites-description-dark"
                          >${o.burnedCalories} / 3 min</span
                        >
                      </p>
                      <p class="favorites-description-light">
                        Body part:<span class="favorites-description-dark"
                          >${o.bodyPart}</span
                        >
                      </p>
                      <p class="favorites-description-light">
                        Target:<span class="favorites-description-dark"
                          >${o.target}</span
                        >
                      </p>
                    </div>
                  </li>
                </ul>
    `,t.appendChild(i)})};window.innerWidth>=1440&&e(r);const t=document.getElementById("favorites-container-js")}if(r){let e=function(s){const o=s.target.closest("#favorites-icon-bin").getAttribute("data-about");r.forEach(i=>{(i.id=o)&&r.splice(i)}),localStorage.removeItem("favorites"),localStorage.setItem("favorites",JSON.stringify(r))};document.querySelectorAll("#favorites-icon-bin").addEventListener("click",e())}const k=document.querySelectorAll("[data-modal-open]");k.forEach(t=>{t.addEventListener("click",h)});
