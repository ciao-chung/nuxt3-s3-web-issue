if(!self.define){let e,n={};const s=(s,i)=>(s=new URL(s+".js",i).href,n[s]||new Promise((n=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=n,document.head.appendChild(e)}else e=s,importScripts(s),n()})).then((()=>{let e=n[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(i,u)=>{const l=e||("document"in self?document.currentScript.src:"")||location.href;if(n[l])return;let r={};const t=e=>s(e,l),o={module:{uri:l},exports:r,require:t};n[l]=Promise.all(i.map((e=>o[e]||t(e)))).then((e=>(u(...e),r)))}}define(["./workbox-970ac7a0"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"_nuxt/404.5a750995.js",revision:null},{url:"_nuxt/default.30f5fa01.css",revision:null},{url:"_nuxt/default.760fba0f.js",revision:null},{url:"_nuxt/en-US.350b5046.js",revision:null},{url:"_nuxt/en-US.b25bb000.js",revision:null},{url:"_nuxt/entry.5b7e79fe.js",revision:null},{url:"_nuxt/entry.e00465e1.css",revision:null},{url:"_nuxt/home.95f88ece.js",revision:null},{url:"_nuxt/lodash.6114c6d4.js",revision:null},{url:"_nuxt/vuetify.7affcc24.js",revision:null},{url:"_nuxt/workbox-window.prod.es5.c46a1faa.js",revision:null},{url:"_nuxt/zh-TW.07ad772c.js",revision:null},{url:"_nuxt/zh-TW.1ebf1f19.js",revision:null},{url:"images/icon-192x192.png",revision:"0e49a8991868791b94a62704809b6e83"},{url:"images/icon-512x512.png",revision:"f57dd5b27b960f79bd5d0b3892a1a50a"},{url:"manifest.webmanifest",revision:"85dd8151c664959dc7c1a61f708ee6cd"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("/"))),e.registerRoute((({request:e})=>!0),new e.NetworkOnly,"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:30,maxAgeSeconds:31536e3}),new e.CacheableResponsePlugin({statuses:[0,200]})]}),"GET")}));
