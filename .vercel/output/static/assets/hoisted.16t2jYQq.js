import{_ as p}from"./Swup.q7x037hd.js";const g=100,u=document.querySelectorAll('a[href^="#"]');u&&u.forEach(e=>{e.addEventListener("click",t=>{t.preventDefault();const s=e.getAttribute("href").replace("#",""),a=document.getElementById(s).getBoundingClientRect().top+window.pageYOffset;window.scrollTo({top:a-g,behavior:"smooth"})})});const o=document.querySelector(".c-pagetop"),m=document.querySelector(".p-header");o&&window.addEventListener("scroll",()=>{window.scrollY>100?(o.classList.add("is-active"),m.classList.add("is-active")):(o.classList.remove("is-active"),m.classList.remove("is-active"))});new p({containers:["#swup"]});window.fbAsyncInit=function(){FB.init({appId:"1330794567604263",xfbml:!0,version:"v19.0"}),FB.AppEvents.logPageView()};(function(e,t,s){var a,i=e.getElementsByTagName(t)[0];e.getElementById(s)||(a=e.createElement(t),a.id=s,a.src="https://connect.facebook.net/en_US/sdk.js",i.parentNode.insertBefore(a,i))})(document,"script","facebook-jssdk");(function(e){var t={kitId:"tph1piu",scriptTimeout:3e3,async:!0},s=e.documentElement,a=setTimeout(function(){s.className=s.className.replace(/\bwf-loading\b/g,"")+" wf-inactive"},t.scriptTimeout),i=e.createElement("script"),l=!1,d=e.getElementsByTagName("script")[0],n;s.className+=" wf-loading",i.src="https://use.typekit.net/"+t.kitId+".js",i.async=!0,i.onload=i.onreadystatechange=function(){if(n=this.readyState,!(l||n&&n!="complete"&&n!="loaded")){l=!0,clearTimeout(a);try{Typekit.load(t)}catch{}}},d.parentNode.insertBefore(i,d)})(document);const c=document.querySelector(".js-hamburgerButton"),r=document.querySelector(".p-header__navigation"),f=document.querySelectorAll(".p-header__decoration");c&&c.addEventListener("click",()=>{c.classList.toggle("is-active"),c.getAttribute("aria-expanded")==="true"?c.setAttribute("aria-expanded","false"):c.setAttribute("aria-expanded","true"),r&&(r.classList.toggle("is-active"),r.classList.contains("is-active")?setTimeout(()=>{f.forEach(e=>{e.classList.add("is-active")})},300):f.forEach(e=>{e.classList.remove("is-active")}))});
