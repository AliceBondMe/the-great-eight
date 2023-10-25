import{s as g,a as p,o as S}from"./modal-rating-fff9e272.js";function h(t){return t.map(({_id:s,bodyPart:e,name:a,target:c,burnedCalories:d})=>`<li class="favorites-rating_item js-workout-card" data-id="${s}">
            <div class="favorites-rating_item_wrap">
              <h2 class="favorites-rating-title">Workout</h2>
                <button type="button" class="favorites-rating-title-button">
                  <svg width="16" height="16" class="favorites-icon-bin">
                    <use id="favorites-icon-bin"
                      href="${g}#icon-trash"></use>
                  </svg>
                </button>
                <button type="button" data-modal-open class="favorites-workouts-arrow-button favorites-workouts-arrow">
                    <p class="favorites-workouts-subtext">Start</p>
                      <svg width="16" height="16" class="favorites-icon-arrow">
                        <use
                        href="${g}#icon-arrow" stroke="black"></use>
                      </svg>
                </button>
            </div>
            <div class="favorites-icon-wrapper">
              <div class="favorites-icon-circle">
                <svg width="14" height="14" class="favorites-icon-runner">
                  <use 
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
                Target:<span class="favorites-description-dark">${c}</span>
              </p>
            </div>
        </li>`).join("")}const y=document.querySelector(".favorites-sidebar-quote-text-quotetext"),w=document.querySelector(".favorites-sidebar-quote-text-author"),v=new Date().toDateString();document.addEventListener("DOMContentLoaded",L);function L(){JSON.parse(localStorage.getItem("date"))?JSON.parse(localStorage.getItem("date"))!==v&&p().then(t=>{const s=t.quote,e=t.author;localStorage.setItem("quote",JSON.stringify(s)),localStorage.setItem("author",JSON.stringify(e)),localStorage.setItem("date",JSON.stringify(v))}):p().then(t=>{const s=t.quote,e=t.author;localStorage.setItem("quote",JSON.stringify(s)),localStorage.setItem("author",JSON.stringify(e)),localStorage.setItem("date",JSON.stringify(v))}).catch(t=>{console.error(t)}),y.innerHTML=`${JSON.parse(localStorage.getItem("quote"))}`,w.innerHTML=`${JSON.parse(localStorage.getItem("author"))}`}const o=JSON.parse(localStorage.getItem("favorites")),k=document.querySelector(".favorites-exercises-none");o.length&&(k.style.display="none");if(o.length){let s=function(){let e=1;function a(i,r,l){const u=document.querySelector(".favorites-rating_list");u.innerHTML="",l--;const n=r*l,f=n+r,m=i.slice(n,f);u.innerHTML=h(m)}function c(i,r){const l=Math.ceil(i.length/r),u=document.querySelector(".favorites-pages-list");for(let n=0;n<l;n++){const f=d(n+1);u.appendChild(f)}}function d(i){const r=document.createElement("li");return r.classList.add("favorites-pages-button"),r.innerHTML=i,e==i&&r.classList.add("favorites-current-page"),r.addEventListener("click",()=>{e=i,a(o,t,e),document.querySelector("li.favorites-current-page").classList.remove("favorites-current-page"),r.classList.add("favorites-current-page")}),r}a(o,t,e),c(o,t)},t;window.innerWidth<768&&(t=8,s()),window.innerWidth>=768&&window.innerWidth<1440&&(t=10,s())}if(o.length&&window.innerWidth>=1440){const t=document.querySelector(".favorites-rating_list");t.innerHTML=h(o)}if(o.length){let e=function(a){const c=a.target.closest(".js-workout-card").dataset.id;o.forEach(d=>{s=o.findIndex(({_id:i})=>i===c)}),o.splice(s,1),localStorage.removeItem("favorites"),localStorage.setItem("favorites",JSON.stringify(o)),location.reload()};document.querySelectorAll("#favorites-icon-bin").forEach(a=>{a.addEventListener("click",e)});let s}const q=document.querySelectorAll("[data-modal-open]");q.forEach(t=>{t.addEventListener("click",S)});
