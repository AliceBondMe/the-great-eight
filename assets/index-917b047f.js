import"./header-menu-3d20c22f.js";function o(s,i,t,r,e,a){return`
   <li class="workout_item">
      <div class="rating_item_wrap">
         <h1 class="workout-title">${s}</h1>
         <div class="workout-info">
            <div class="rating">${i}</div>
            <div class="workout-info-stars">
               <div class="workout-info-items">
                  <svg width="18" height="18">
                     <use class="icon-star" href="../img/symbol-defs.svg#icon-star"></use>
                  </svg>
               </div>
            </div>
         </div>
         <div class="workout_arrow">
            <p class="workout_subtext">Start</p>
            <svg width="16" height="16">
   <use class="icon-arrow" href="../img/symbol-defs.svg#icon-arrow" stroke="black"></use>
            </svg>
         </div>
      </div>
      <div class="icon-wrapper">
         <div class="icon-circle">
            <svg width="20" height="20">
               <use class="icon-runner" href="../img/symbol-defs.svg#icon-running" stroke="black"></use>
            </svg>
         </div>
         <h2 class="icon-title">${a}</h2>
      </div>
      <div class="workout-description">
         <p class="description-light">Burned calories: <span class="description-dark">${t}</span></p>
         <p class="description-light">Body part: <span class="description-dark">${r}</span> </p>
         <p class="description-light">Target: <span class="description-dark">${e}</span></p>
      </div>
   </li>
   `}const l=document.getElementById("workout-list"),c=[200,250,300,180,220,320,270,240,280],n=["Waist","Waist","Waist","Waist","Waist","Waist","Waist","Waist","Waist"],d=["Abs","Abs","Abs","Biceps","Abs","Quads","Abs","Quads","Abs"],u=["5.0","5.0","4.0","3.0","5.0","4.0","4.0","5.0","3.0"],p=["3/4 sit-up","45° side bend","Barbell reverse preacher curl","Barbell rollerout","Barbell side split squat v. 2","Barbell rollerout","Barbell side split squat v. 2","45° side bend","Barbell reverse preacher curl"];for(let s=0;s<9;s++){const i=document.createElement("li");i.className="workout_item",i.innerHTML=o("Workout",u[s],c[s]+" / 3 min",n[s],d[s],p[s]),l.appendChild(i)}
