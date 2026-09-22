document.querySelectorAll("[data-year]").forEach(el=>el.textContent=new Date().getFullYear());

const toggle=document.querySelector(".menu-toggle");
const nav=document.querySelector(".site-nav");
if(toggle&&nav){
  toggle.addEventListener("click",()=>{const open=nav.classList.toggle("is-open");toggle.setAttribute("aria-expanded",open)});
  nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("is-open");toggle.setAttribute("aria-expanded","false")}));
}

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("is-visible");observer.unobserve(entry.target)}}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const form=document.querySelector("[data-demo-form]");
const toast=document.querySelector(".toast");
if(form){
  form.addEventListener("submit",e=>{
    e.preventDefault();
    if(!form.reportValidity()) return;
    if(toast){toast.classList.add("show");setTimeout(()=>toast.classList.remove("show"),4500)}
    form.reset();
  });
}
