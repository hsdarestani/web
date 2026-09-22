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
var canParallax=!reduceMotion&&window.matchMedia&&window.matchMedia("(min-width: 1025px) and (pointer: fine)").matches;

var progress=null;
if(!document.querySelector(".landing-page")&&!reduceMotion){
  progress=document.createElement("div");
  progress.className="scroll-progress";
  progress.setAttribute("aria-hidden","true");
  document.body.appendChild(progress);
}

var variants=["motion-left","motion-rise","motion-right","motion-scale","motion-tilt-left","motion-tilt-right"];
[".service-card",".service-overview",".audience-card",".case-card",".process-step"].forEach(function(selector){
  document.querySelectorAll(selector).forEach(function(el,index){
    el.classList.add("reveal",variants[index%variants.length]);
    el.style.setProperty("--card-delay",Math.min(index%4,3)*55+"ms");
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
if(canParallax){
  document.querySelectorAll(".feature-photo,.image-stack").forEach(function(el){
    el.classList.add("parallax-media");
  });
}

var animatedNodes=Array.prototype.slice.call(document.querySelectorAll(".reveal,.motion-title,.media-reveal"));
if("IntersectionObserver" in window&&!reduceMotion){
  var observer=new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(!entry.isIntersecting) return;
      var el=entry.target;
      if(el.classList.contains("reveal")) el.classList.add("visible");
      if(el.classList.contains("motion-title")) el.classList.add("title-visible");
      if(el.classList.contains("media-reveal")) el.classList.add("media-visible");
      observer.unobserve(el);
    });
  },{threshold:.08,rootMargin:"0px 0px -3% 0px"});
  animatedNodes.forEach(function(el){observer.observe(el);});
}else{
  animatedNodes.forEach(function(el){
    el.classList.add("visible","title-visible","media-visible");
  });
}

var hero=canParallax?document.querySelector(".inner-hero>img"):null;
var parallaxItems=canParallax?Array.prototype.slice.call(document.querySelectorAll(".parallax-media")):[];
var header=document.querySelector(".site-header");
var ticking=false;

function updateScrollMotion(){
  ticking=false;
  var y=window.scrollY||window.pageYOffset||0;

  if(progress){
    var max=Math.max(1,document.documentElement.scrollHeight-window.innerHeight);
    progress.style.transform="scaleX("+Math.min(1,Math.max(0,y/max))+")";
  }

  if(header){
    if(y>80) header.classList.add("nav-compact");
    else header.classList.remove("nav-compact");
  }

  if(!canParallax) return;

  if(hero&&y<window.innerHeight*1.15){
    hero.style.setProperty("--hero-parallax",Math.min(34,y*.055)+"px");
  }

  for(var i=0;i<parallaxItems.length;i++){
    var box=parallaxItems[i];
    var rect=box.getBoundingClientRect();
    if(rect.bottom<0||rect.top>window.innerHeight) continue;
    var center=rect.top+rect.height*.5-window.innerHeight*.5;
    var amount=Math.max(-14,Math.min(14,-center*.025));
    var img=box.querySelector("img");
    if(img) img.style.setProperty("--parallax-y",amount+"px");
  }
}

if(!reduceMotion){
  window.addEventListener("scroll",function(){
    if(!ticking){
      ticking=true;
      window.requestAnimationFrame(updateScrollMotion);
    }
  },{passive:true});
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
