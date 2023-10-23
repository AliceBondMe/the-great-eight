import{s as g,a as p,o as S}from"./modal-rating-025a640d.js";function h(t){return t.map(({_id:o,bodyPart:s,name:a,target:n,burnedCalories:d})=>`<li class="favorites-rating_item js-workout-card" data-id="${o}">
            <div class="favorites-rating_item_wrap">
              <h2 class="favorites-rating-title">Workout</h2>
                <button type="button" class="favorites-rating-title-button">
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
                  >${s}</span>
              </p>
              <p class="favorites-description-light">
                Target:<span class="favorites-description-dark">${n}</span>
              </p>
            </div>
        </li>`).join("")}const y=document.querySelector(".favorites-sidebar-quote-text-quotetext"),w=document.querySelector(".favorites-sidebar-quote-text-author"),v=new Date().toDateString();document.addEventListener("DOMContentLoaded",L);function L(){JSON.parse(localStorage.getItem("date"))?JSON.parse(localStorage.getItem("date"))!==v&&p().then(t=>{const o=t.quote,s=t.author;localStorage.setItem("quote",JSON.stringify(o)),localStorage.setItem("author",JSON.stringify(s)),localStorage.setItem("date",JSON.stringify(v))}):p().then(t=>{const o=t.quote,s=t.author;localStorage.setItem("quote",JSON.stringify(o)),localStorage.setItem("author",JSON.stringify(s)),localStorage.setItem("date",JSON.stringify(v))}).catch(t=>{console.error(t)}),y.innerHTML=`${JSON.parse(localStorage.getItem("quote"))}`,w.innerHTML=`${JSON.parse(localStorage.getItem("author"))}`}const e=JSON.parse(localStorage.getItem("favorites")),k=document.querySelector(".favorites-exercises-none");e.length&&(k.style.display="none");if(e.length){let o=function(){let s=1;function a(i,r,l){const u=document.querySelector(".favorites-rating_list");u.innerHTML="",l--;const c=r*l,f=c+r,m=i.slice(c,f);u.innerHTML=h(m)}function n(i,r){const l=Math.ceil(i.length/r),u=document.querySelector(".favorites-pages-list");for(let c=0;c<l;c++){const f=d(c+1);u.appendChild(f)}}function d(i){const r=document.createElement("li");return r.classList.add("favorites-pages-button"),r.innerHTML=i,s==i&&r.classList.add("favorites-current-page"),r.addEventListener("click",()=>{s=i,a(e,t,s),document.querySelector("li.favorites-current-page").classList.remove("favorites-current-page"),r.classList.add("favorites-current-page")}),r}a(e,t,s),n(e,t)},t;window.innerWidth<768&&(t=8,o()),window.innerWidth>=768&&window.innerWidth<1440&&(t=10,o())}if(e.length&&window.innerWidth>=1440){const t=document.querySelector(".favorites-rating_list");t.innerHTML=h(e)}if(e.length){let s=function(a){const n=a.target.closest(".js-workout-card").dataset.id;e.forEach(d=>{o=e.findIndex(({_id:i})=>i===n)}),e.splice(o,1),console.log(e),console.log(n),console.log(o),localStorage.removeItem("favorites"),localStorage.setItem("favorites",JSON.stringify(e)),location.reload()};document.querySelectorAll("#favorites-icon-bin").forEach(a=>{a.addEventListener("click",s)});let o;console.log(e)}const q=document.querySelectorAll("[data-modal-open]");q.forEach(t=>{t.addEventListener("click",S)});
