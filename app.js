document.querySelectorAll("[data-year]").forEach(function(el){
  el.textContent=new Date().getFullYear();
});

var menuButton=document.querySelector(".menu-button");
if(menuButton){
  menuButton.addEventListener("click",function(){
    var opened=document.body.classList.toggle("nav-open");
    menuButton.setAttribute("aria-expanded",opened?"true":"false");
  });
  document.querySelectorAll(".nav-links a").forEach(function(link){
    link.addEventListener("click",function(){
      document.body.classList.remove("nav-open");
      menuButton.setAttribute("aria-expanded","false");
    });
  });
}

var reduceMotion=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if(!document.querySelector(".landing-page")&&!reduceMotion){
  var progress=document.createElement("div");
  progress.className="scroll-progress";
  progress.setAttribute("aria-hidden","true");
  document.body.appendChild(progress);
}

var cardSelectors=[
  ".service-card",".service-overview",".audience-card",".case-card",".process-step"
];
cardSelectors.forEach(function(selector){
  document.querySelectorAll(selector).forEach(function(el,index){
    if(!el.classList.contains("reveal")) el.classList.add("reveal");
    var variants=["motion-left","motion-rise","motion-right","motion-scale","motion-tilt-left","motion-tilt-right"];
    el.classList.add(variants[index%variants.length]);
    el.style.setProperty("--card-delay",Math.min(index%6,5)*75+"ms");
  });
});

document.querySelectorAll(".section-heading").forEach(function(el,index){
  el.classList.add("reveal","motion-heading",index%2===0?"motion-left":"motion-right");
});

document.querySelectorAll(".h2,.display,.hero-copy h1").forEach(function(el){
  el.classList.add("motion-title");
});

document.querySelectorAll(".feature-photo,.image-stack,.project-card,.case-card").forEach(function(el){
  el.classList.add("media-reveal");
});

document.querySelectorAll(".feature-photo,.image-stack,.case-card").forEach(function(el){
  el.classList.add("parallax-media");
});

if("IntersectionObserver" in window&&!reduceMotion){
  var revealObserver=new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },{threshold:.12,rootMargin:"0px 0px -5% 0px"});

  document.querySelectorAll(".reveal").forEach(function(el){
    revealObserver.observe(el);
  });

  var titleObserver=new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add("title-visible");
        titleObserver.unobserve(entry.target);
      }
    });
  },{threshold:.35});
  document.querySelectorAll(".motion-title").forEach(function(el){titleObserver.observe(el);});

  var mediaObserver=new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add("media-visible");
        mediaObserver.unobserve(entry.target);
      }
    });
  },{threshold:.15});
  document.querySelectorAll(".media-reveal").forEach(function(el){mediaObserver.observe(el);});
}else{
  document.querySelectorAll(".reveal").forEach(function(el){el.classList.add("visible");});
  document.querySelectorAll(".motion-title").forEach(function(el){el.classList.add("title-visible");});
  document.querySelectorAll(".media-reveal").forEach(function(el){el.classList.add("media-visible");});
}

var ticking=false;
function updateScrollMotion(){
  ticking=false;
  var doc=document.documentElement;
  var max=Math.max(1,doc.scrollHeight-window.innerHeight);
  var ratio=Math.min(1,Math.max(0,window.scrollY/max));
  var progress=document.querySelector(".scroll-progress");
  if(progress) progress.style.transform="scaleX("+ratio+")";

  var hero=document.querySelector(".inner-hero>img");
  if(hero){
    var heroAmount=Math.max(-40,Math.min(80,window.scrollY*.12));
    hero.style.setProperty("--hero-parallax",heroAmount+"px");
  }

  document.querySelectorAll(".parallax-media").forEach(function(box){
    var rect=box.getBoundingClientRect();
    if(rect.bottom<0||rect.top>window.innerHeight) return;
    var center=rect.top+rect.height/2-window.innerHeight/2;
    var amount=Math.max(-24,Math.min(24,-center*.045));
    var img=box.querySelector("img");
    if(img) img.style.setProperty("--parallax-y",amount+"px");
  });

  var header=document.querySelector(".site-header");
  if(header) header.classList.toggle("nav-compact",window.scrollY>80);
}

if(!reduceMotion){
  window.addEventListener("scroll",function(){
    if(!ticking){
      ticking=true;
      window.requestAnimationFrame(updateScrollMotion);
    }
  },{passive:true});
  window.addEventListener("resize",updateScrollMotion,{passive:true});
  updateScrollMotion();
}

document.querySelectorAll("[data-demo-form]").forEach(function(form){
  form.addEventListener("submit",function(e){
    e.preventDefault();
    if(!form.reportValidity()) return;
    var toast=document.querySelector(".toast");
    if(toast){
      toast.classList.add("show");
      setTimeout(function(){toast.classList.remove("show");},4200);
    }
    form.reset();
  });
});
