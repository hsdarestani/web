
document.querySelectorAll("[data-year]").forEach(function(el){el.textContent=new Date().getFullYear();});

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

if("IntersectionObserver" in window){
  var observer=new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },{threshold:.1});
  document.querySelectorAll(".reveal").forEach(function(el){observer.observe(el);});
}else{
  document.querySelectorAll(".reveal").forEach(function(el){el.classList.add("visible");});
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
