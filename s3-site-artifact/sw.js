if(!self.define){let n,e={};const s=(s,i)=>(s=new URL(s+".js",i).href,e[s]||new Promise((e=>{if("document"in self){const n=document.createElement("script");n.src=s,n.onload=e,document.head.appendChild(n)}else n=s,importScripts(s),e()})).then((()=>{let n=e[s];if(!n)throw new Error(`Module ${s} didn’t register its module`);return n})));self.define=(i,l)=>{const u=n||("document"in self?document.currentScript.src:"")||location.href;if(e[u])return;let r={};const t=n=>s(n,u),o={module:{uri:u},exports:r,require:t};e[u]=Promise.all(i.map((n=>o[n]||t(n)))).then((n=>(l(...n),r)))}}define(["./workbox-970ac7a0"],(function(n){"use strict";self.skipWaiting(),n.clientsClaim(),n.precacheAndRoute([{url:"_nuxt/BduLK7P_.js",revision:null},{url:"_nuxt/BIHI7g3E.js",revision:null},{url:"_nuxt/BMSS4hxp.js",revision:null},{url:"_nuxt/BN9xGB5U.js",revision:null},{url:"_nuxt/C_6tkHdT.js",revision:null},{url:"_nuxt/D-vjCVL5.js",revision:null},{url:"_nuxt/D5gOYdM7.js",revision:null},{url:"_nuxt/default.CATrl8WF.css",revision:null},{url:"_nuxt/Dy7no0T-.js",revision:null},{url:"_nuxt/DZPsGlB4.js",revision:null},{url:"_nuxt/DzZcMUso.js",revision:null},{url:"_nuxt/entry.DNKTqep0.css",revision:null},{url:"_nuxt/U4uq_ba6.js",revision:null},{url:"images/icon-192x192.png",revision:"0e49a8991868791b94a62704809b6e83"},{url:"images/icon-512x512.png",revision:"f57dd5b27b960f79bd5d0b3892a1a50a"},{url:"_payload.json",revision:"c7c03904038325ea6731bc9547a29d6b"},{url:"_nuxt/builds/latest.json",revision:"5ac35aaadcb1f71f334a6b9bb5a5b35a"},{url:"_nuxt/builds/meta/471ca10e-cb2d-4efd-a8b7-c9c8466a7f8b.json",revision:null},{url:"manifest.webmanifest",revision:"85dd8151c664959dc7c1a61f708ee6cd"}],{}),n.cleanupOutdatedCaches(),n.registerRoute(new n.NavigationRoute(n.createHandlerBoundToURL("/"))),n.registerRoute((({request:n})=>!0),new n.NetworkOnly,"GET"),n.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new n.CacheFirst({cacheName:"google-fonts",plugins:[new n.ExpirationPlugin({maxEntries:30,maxAgeSeconds:31536e3}),new n.CacheableResponsePlugin({statuses:[0,200]})]}),"GET")}));