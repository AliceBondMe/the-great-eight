import{s as p,a as g,o as S}from"./modal-exercise-66ec90ef.js";(()=>{const t=document.querySelector(".js-menu-container"),o=document.querySelector(".js-open-menu"),e=document.querySelector(".js-close-menu"),a=()=>{const i=o.getAttribute("aria-expanded")==="true"||!1;o.setAttribute("aria-expanded",!i),t.classList.toggle("is-open")};o.addEventListener("click",a),e.addEventListener("click",a),window.matchMedia("(min-width: 768px)").addEventListener("change",i=>{i.matches&&(t.classList.remove("is-open"),o.setAttribute("aria-expanded",!1))})})();const y=document.querySelector(".favorites-sidebar-quote-text-quotetext"),w=document.querySelector(".favorites-sidebar-quote-text-author"),v=new Date().toDateString();document.addEventListener("DOMContentLoaded",L);function L(){JSON.parse(localStorage.getItem("date"))?JSON.parse(localStorage.getItem("date"))!==v&&p().then(t=>{const o=t.quote,e=t.author;localStorage.setItem("quote",JSON.stringify(o)),localStorage.setItem("author",JSON.stringify(e)),localStorage.setItem("date",JSON.stringify(v))}):p().then(t=>{const o=t.quote,e=t.author;localStorage.setItem("quote",JSON.stringify(o)),localStorage.setItem("author",JSON.stringify(e)),localStorage.setItem("date",JSON.stringify(v))}).catch(t=>{console.error(t)}),y.innerHTML=`${JSON.parse(localStorage.getItem("quote"))}`,w.innerHTML=`${JSON.parse(localStorage.getItem("author"))}`}const r=JSON.parse(localStorage.getItem("favorites")),b=document.querySelector(".favorites-exercises-none");r&&(b.style.display="none");if(r){let o=function(){let e=1;function a(n,s,l){const u=document.querySelector(".favorites-rating_list");u.innerHTML="",l--;const c=s*l,f=c+s,h=n.slice(c,f);u.innerHTML=m(h)}function i(n,s){const l=Math.ceil(n.length/s),u=document.querySelector(".favorites-pages-list");for(let c=0;c<l;c++){const f=d(c+1);u.appendChild(f)}}function d(n){const s=document.createElement("li");return s.classList.add("favorites-pages-button"),s.innerHTML=n,e==n&&s.classList.add("favorites-current-page"),s.addEventListener("click",()=>{e=n,a(r,t,e),document.querySelector("li.favorites-current-page").classList.remove("favorites-current-page"),s.classList.add("favorites-current-page")}),s}a(r,t,e),i(r,t)},t;window.innerWidth<768&&(t=8,o()),window.innerWidth>=768&&window.innerWidth<1440&&(t=10,o())}if(r&&window.innerWidth>=1440){const t=document.querySelector(".favorites-rating_list");t.innerHTML=m(r)}function m(t){return t.map(({_id:o,bodyPart:e,name:a,target:i,burnedCalories:d})=>`<li class="favorites-rating_item js-workout-card" data-id="${o}">
            <div class="favorites-rating_item_wrap">
              <h2 class="favorites-rating-title">Workout</h2>
                <button type="button" class="favorites-rating-title-button" data-about="${o}">
                  <svg width="16" height="16">
                    <use class="favorites-icon-bin" id="favorites-icon-bin"
                      href="${g}#icon-trash"></use>
                  </svg>
                </button>
                <button type="button" data-modal-open class="favorites-workouts-arrow-button favorites-workouts-arrow">
                    <p class="favorites-workouts-subtext">Start</p>
                      <svg width="16" height="16">
                        <use class="favorites-icon-arrow"
                        href="${g}#icon-arrow" stroke="black"></use>
                      </svg>
                </button>
            </div>
            <div class="favorites-icon-wrapper">
              <div class="favorites-icon-circle">
                <svg width="20" height="20">
                  <use class="favorites-icon-runner" 
                  href="${g}#icon-running" stroke="black"></use>
                </svg>
              </div>
              <h2 class="favorites-icon-title">${a}</h2>
            </div>
            <div class="favorites-workout-description">
              <p class="favorites-description-light">
                Burned calories:<span class="favorites-description-dark">${d} / 3 min</span>
              </p>
              <p class="favorites-description-light">
                Body part:<span class="favorites-description-dark"
                  >${e}</span>
              </p>
              <p class="favorites-description-light">
                Target:<span class="favorites-description-dark">${i}</span>
              </p>
            </div>
        </li>`).join("")}if(r.length){let o=function(e){console.log(e.target);const a=e.target.closest(".js-workout-card").dataset.id;console.log(a),r.forEach(i=>{(i.id=a)&&r.splice(i)}),localStorage.removeItem("favorites"),localStorage.setItem("favorites",JSON.stringify(r))};document.querySelectorAll("#favorites-icon-bin").forEach(e=>{e.addEventListener("click",o)})}const q=document.querySelectorAll("[data-modal-open]");q.forEach(t=>{t.addEventListener("click",S)});
