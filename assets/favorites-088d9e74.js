import{s as g,a as p,o as w}from"./modal-rating-2c7641f5.js";function h(t){return t.map(({_id:e,bodyPart:o,name:a,target:l,burnedCalories:d})=>`<li class="favorites-rating_item js-workout-card" data-id="${e}">
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
                  >${o}</span>
              </p>
              <p class="favorites-description-light">
                Target:<span class="favorites-description-dark">${l}</span>
              </p>
            </div>
        </li>`).join("")}const L=document.querySelector(".favorites-sidebar-quote-text-quotetext"),k=document.querySelector(".favorites-sidebar-quote-text-author"),v=new Date().toDateString();document.addEventListener("DOMContentLoaded",q);function q(){JSON.parse(localStorage.getItem("date"))?JSON.parse(localStorage.getItem("date"))!==v&&p().then(t=>{const e=t.quote,o=t.author;localStorage.setItem("quote",JSON.stringify(e)),localStorage.setItem("author",JSON.stringify(o)),localStorage.setItem("date",JSON.stringify(v))}):p().then(t=>{const e=t.quote,o=t.author;localStorage.setItem("quote",JSON.stringify(e)),localStorage.setItem("author",JSON.stringify(o)),localStorage.setItem("date",JSON.stringify(v))}).catch(t=>{console.error(t)}),L.innerHTML=`${JSON.parse(localStorage.getItem("quote"))}`,k.innerHTML=`${JSON.parse(localStorage.getItem("author"))}`}const r=JSON.parse(localStorage.getItem("favorites")),b=document.querySelector(".favorites-exercises-none");r.length&&(b.style.display="none");if(r.length){let e=function(){let o=1;function a(i,s,n){const u=document.querySelector(".favorites-rating_list");u.innerHTML="",n--;const c=s*n,f=c+s,y=i.slice(c,f);u.innerHTML=h(y)}function l(i,s){const n=Math.ceil(i.length/s),u=document.querySelector(".favorites-pages-list");if(n!==1)for(let c=0;c<n;c++){const f=d(c+1);u.appendChild(f)}}function d(i){const s=document.createElement("li");return s.classList.add("favorites-pages-button"),s.innerHTML=i,o==i&&s.classList.add("favorites-current-page"),s.addEventListener("click",()=>{o=i,a(r,t,o),m(),S(),document.querySelector("li.favorites-current-page").classList.remove("favorites-current-page"),s.classList.add("favorites-current-page")}),s}a(r,t,o),l(r,t)},t;window.innerWidth<768&&(t=8,e()),window.innerWidth>=768&&window.innerWidth<1440&&(t=10,e())}if(r.length&&window.innerWidth>=1440){const t=document.querySelector(".favorites-rating_list");t.innerHTML=h(r)}function m(){if(r.length){let o=function(a){const l=a.target.closest(".js-workout-card").dataset.id;r.forEach(d=>{e=r.findIndex(({_id:i})=>i===l)}),r.splice(e,1),localStorage.removeItem("favorites"),localStorage.setItem("favorites",JSON.stringify(r)),location.reload()};document.querySelectorAll("#favorites-icon-bin").forEach(a=>{a.addEventListener("click",o)});let e}}m();function S(){document.querySelectorAll("[data-modal-open]").forEach(e=>{e.addEventListener("click",w)})}S();
