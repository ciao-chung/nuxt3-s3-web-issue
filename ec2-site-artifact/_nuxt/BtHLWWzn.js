import{aS as ee,X as _,a2 as k,a5 as S,a9 as C,A as i,l as x,t as ke,aA as Ce,j as w,b as Ie,c as U,y as Ve,n as Pe,o as Ae,aO as M,aQ as te,F as q,I as ae,aa as xe,aP as Te,b5 as z,a4 as ne,a6 as ie,b0 as Be,a$ as we,H as se,W as le,m as re,bv as ze}from"./DxHezSxA.js";import{z as oe,B as ue,i as Q,t as Le,k as Re,n as X,M as $,$ as de,y as J,a3 as Ne,j as O,C as ce,a0 as ve,a5 as me,A as ge,a6 as $e,b as G,s as E,a7 as fe,g as Ee,v as Oe,a9 as je,aa as Fe,P as De,a4 as He,l as We,w as Ue,ab as Me,ac as qe,Q as Ge,L as Qe}from"./C1DMsIOY.js";function Xe(e,l){if(!ee)return;const a=l.modifiers||{},t=l.value,{handler:c,options:d}=typeof t=="object"?t:{handler:t,options:{}},n=new IntersectionObserver(function(){var g;let s=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],m=arguments.length>1?arguments[1]:void 0;const o=(g=e._observe)==null?void 0:g[l.instance.$.uid];if(!o)return;const r=s.some(b=>b.isIntersecting);c&&(!a.quiet||o.init)&&(!a.once||r||o.init)&&c(r,s,m),r&&a.once?ye(e,l):o.init=!0},d);e._observe=Object(e._observe),e._observe[l.instance.$.uid]={init:!1,observer:n},n.observe(e)}function ye(e,l){var t;const a=(t=e._observe)==null?void 0:t[l.instance.$.uid];a&&(a.observer.unobserve(e),delete e._observe[l.instance.$.uid])}const Je={mounted:Xe,unmounted:ye};function Ye(e){return{aspectStyles:x(()=>{const l=Number(e.aspectRatio);return l?{paddingBottom:String(1/l*100)+"%"}:void 0})}}const be=_({aspectRatio:[String,Number],contentClass:null,inline:Boolean,...k(),...oe()},"VResponsive"),Z=S()({name:"VResponsive",props:be(),setup(e,l){let{slots:a}=l;const{aspectStyles:t}=Ye(e),{dimensionStyles:c}=ue(e);return C(()=>{var d;return i("div",{class:["v-responsive",{"v-responsive--inline":e.inline},e.class],style:[c.value,e.style]},[i("div",{class:"v-responsive__sizer",style:t.value},null),(d=a.additional)==null?void 0:d.call(a),a.default&&i("div",{class:["v-responsive__content",e.contentClass]},[a.default()])])}),{}}}),Ke=_({absolute:Boolean,alt:String,cover:Boolean,color:String,draggable:{type:[Boolean,String],default:void 0},eager:Boolean,gradient:String,lazySrc:String,options:{type:Object,default:()=>({root:void 0,rootMargin:void 0,threshold:void 0})},sizes:String,src:{type:[String,Object],default:""},crossorigin:String,referrerpolicy:String,srcset:String,position:String,...be(),...k(),...Q(),...Le()},"VImg"),Se=S()({name:"VImg",directives:{intersect:Je},props:Ke(),emits:{loadstart:e=>!0,load:e=>!0,error:e=>!0},setup(e,l){let{emit:a,slots:t}=l;const{backgroundColorClasses:c,backgroundColorStyles:d}=Re(ke(e,"color")),{roundedClasses:n}=X(e),s=Ce("VImg"),m=w(""),o=Ie(),r=w(e.eager?"loading":"idle"),g=w(),b=w(),f=x(()=>e.src&&typeof e.src=="object"?{src:e.src.src,srcset:e.srcset||e.src.srcset,lazySrc:e.lazySrc||e.src.lazySrc,aspect:Number(e.aspectRatio||e.src.aspect||0)}:{src:e.src,srcset:e.srcset,lazySrc:e.lazySrc,aspect:Number(e.aspectRatio||0)}),I=x(()=>f.value.aspect||g.value/b.value||0);U(()=>e.src,()=>{T(r.value!=="idle")}),U(I,(u,v)=>{!u&&v&&o.value&&A(o.value)}),Ve(()=>T());function T(u){if(!(e.eager&&u)&&!(ee&&!u&&!e.eager)){if(r.value="loading",f.value.lazySrc){const v=new Image;v.src=f.value.lazySrc,A(v,null)}f.value.src&&Pe(()=>{var v;a("loadstart",((v=o.value)==null?void 0:v.currentSrc)||f.value.src),setTimeout(()=>{var h;if(!s.isUnmounted)if((h=o.value)!=null&&h.complete){if(o.value.naturalWidth||L(),r.value==="error")return;I.value||A(o.value,null),r.value==="loading"&&V()}else I.value||A(o.value),P()})})}}function V(){var u;s.isUnmounted||(P(),A(o.value),r.value="loaded",a("load",((u=o.value)==null?void 0:u.currentSrc)||f.value.src))}function L(){var u;s.isUnmounted||(r.value="error",a("error",((u=o.value)==null?void 0:u.currentSrc)||f.value.src))}function P(){const u=o.value;u&&(m.value=u.currentSrc||u.src)}let B=-1;Ae(()=>{clearTimeout(B)});function A(u){let v=arguments.length>1&&arguments[1]!==void 0?arguments[1]:100;const h=()=>{if(clearTimeout(B),s.isUnmounted)return;const{naturalHeight:Y,naturalWidth:K}=u;Y||K?(g.value=K,b.value=Y):!u.complete&&r.value==="loading"&&v!=null?B=window.setTimeout(h,v):(u.currentSrc.endsWith(".svg")||u.currentSrc.startsWith("data:image/svg+xml"))&&(g.value=1,b.value=1)};h()}const R=x(()=>({"v-img__img--cover":e.cover,"v-img__img--contain":!e.cover})),j=()=>{var h;if(!f.value.src||r.value==="idle")return null;const u=i("img",{class:["v-img__img",R.value],style:{objectPosition:e.position},src:f.value.src,srcset:f.value.srcset,alt:e.alt,crossorigin:e.crossorigin,referrerpolicy:e.referrerpolicy,draggable:e.draggable,sizes:e.sizes,ref:o,onLoad:V,onError:L},null),v=(h=t.sources)==null?void 0:h.call(t);return i($,{transition:e.transition,appear:!0},{default:()=>[M(v?i("picture",{class:"v-img__picture"},[v,u]):u,[[Te,r.value==="loaded"]])]})},F=()=>i($,{transition:e.transition},{default:()=>[f.value.lazySrc&&r.value!=="loaded"&&i("img",{class:["v-img__img","v-img__img--preload",R.value],style:{objectPosition:e.position},src:f.value.lazySrc,alt:e.alt,crossorigin:e.crossorigin,referrerpolicy:e.referrerpolicy,draggable:e.draggable},null)]}),D=()=>t.placeholder?i($,{transition:e.transition,appear:!0},{default:()=>[(r.value==="loading"||r.value==="error"&&!t.error)&&i("div",{class:"v-img__placeholder"},[t.placeholder()])]}):null,H=()=>t.error?i($,{transition:e.transition,appear:!0},{default:()=>[r.value==="error"&&i("div",{class:"v-img__error"},[t.error()])]}):null,W=()=>e.gradient?i("div",{class:"v-img__gradient",style:{backgroundImage:`linear-gradient(${e.gradient})`}},null):null,N=w(!1);{const u=U(I,v=>{v&&(requestAnimationFrame(()=>{requestAnimationFrame(()=>{N.value=!0})}),u())})}return C(()=>{const u=Z.filterProps(e);return M(i(Z,ae({class:["v-img",{"v-img--absolute":e.absolute,"v-img--booting":!N.value},c.value,n.value,e.class],style:[{width:xe(e.width==="auto"?g.value:e.width)},d.value,e.style]},u,{aspectRatio:I.value,"aria-label":e.alt,role:e.alt?"img":void 0}),{additional:()=>i(q,null,[i(j,null,null),i(F,null,null),i(W,null,null),i(D,null,null),i(H,null,null)]),default:t.default}),[[te("intersect"),{handler:T,options:e.options},null,{once:!0}]])}),{currentSrc:m,image:o,state:r,naturalWidth:g,naturalHeight:b}}}),Ze=_({start:Boolean,end:Boolean,icon:z,image:String,text:String,...de(),...k(),...J(),...Q(),...Ne(),...O(),...ne(),...ce({variant:"flat"})},"VAvatar"),p=S()({name:"VAvatar",props:Ze(),setup(e,l){let{slots:a}=l;const{themeClasses:t}=ie(e),{borderClasses:c}=ve(e),{colorClasses:d,colorStyles:n,variantClasses:s}=me(e),{densityClasses:m}=ge(e),{roundedClasses:o}=X(e),{sizeClasses:r,sizeStyles:g}=$e(e);return C(()=>i(e.tag,{class:["v-avatar",{"v-avatar--start":e.start,"v-avatar--end":e.end},t.value,c.value,d.value,m.value,o.value,r.value,s.value,e.class],style:[n.value,g.value,e.style]},{default:()=>[a.default?i(E,{key:"content-defaults",defaults:{VImg:{cover:!0,src:e.image},VIcon:{icon:e.icon}}},{default:()=>[a.default()]}):e.image?i(Se,{key:"image",src:e.image,alt:"",cover:!0},null):e.icon?i(G,{key:"icon",icon:e.icon},null):e.text,fe(!1,"v-avatar")]})),{}}}),pe=S()({name:"VCardActions",props:k(),setup(e,l){let{slots:a}=l;return Be({VBtn:{slim:!0,variant:"text"}}),C(()=>{var t;return i("div",{class:["v-card-actions",e.class],style:e.style},[(t=a.default)==null?void 0:t.call(a)])}),{}}}),et=_({opacity:[Number,String],...k(),...O()},"VCardSubtitle"),tt=S()({name:"VCardSubtitle",props:et(),setup(e,l){let{slots:a}=l;return C(()=>i(e.tag,{class:["v-card-subtitle",e.class],style:[{"--v-card-subtitle-opacity":e.opacity},e.style]},a)),{}}}),at=we("v-card-title"),nt=_({appendAvatar:String,appendIcon:z,prependAvatar:String,prependIcon:z,subtitle:[String,Number],title:[String,Number],...k(),...J()},"VCardItem"),it=S()({name:"VCardItem",props:nt(),setup(e,l){let{slots:a}=l;return C(()=>{var o;const t=!!(e.prependAvatar||e.prependIcon),c=!!(t||a.prepend),d=!!(e.appendAvatar||e.appendIcon),n=!!(d||a.append),s=!!(e.title!=null||a.title),m=!!(e.subtitle!=null||a.subtitle);return i("div",{class:["v-card-item",e.class],style:e.style},[c&&i("div",{key:"prepend",class:"v-card-item__prepend"},[a.prepend?i(E,{key:"prepend-defaults",disabled:!t,defaults:{VAvatar:{density:e.density,image:e.prependAvatar},VIcon:{density:e.density,icon:e.prependIcon}}},a.prepend):i(q,null,[e.prependAvatar&&i(p,{key:"prepend-avatar",density:e.density,image:e.prependAvatar},null),e.prependIcon&&i(G,{key:"prepend-icon",density:e.density,icon:e.prependIcon},null)])]),i("div",{class:"v-card-item__content"},[s&&i(at,{key:"title"},{default:()=>{var r;return[((r=a.title)==null?void 0:r.call(a))??e.title]}}),m&&i(tt,{key:"subtitle"},{default:()=>{var r;return[((r=a.subtitle)==null?void 0:r.call(a))??e.subtitle]}}),(o=a.default)==null?void 0:o.call(a)]),n&&i("div",{key:"append",class:"v-card-item__append"},[a.append?i(E,{key:"append-defaults",disabled:!d,defaults:{VAvatar:{density:e.density,image:e.appendAvatar},VIcon:{density:e.density,icon:e.appendIcon}}},a.append):i(q,null,[e.appendIcon&&i(G,{key:"append-icon",density:e.density,icon:e.appendIcon},null),e.appendAvatar&&i(p,{key:"append-avatar",density:e.density,image:e.appendAvatar},null)])])])}),{}}}),st=_({opacity:[Number,String],...k(),...O()},"VCardText"),lt=S()({name:"VCardText",props:st(),setup(e,l){let{slots:a}=l;return C(()=>i(e.tag,{class:["v-card-text",e.class],style:[{"--v-card-text-opacity":e.opacity},e.style]},a)),{}}}),rt=_({appendAvatar:String,appendIcon:z,disabled:Boolean,flat:Boolean,hover:Boolean,image:String,link:{type:Boolean,default:void 0},prependAvatar:String,prependIcon:z,ripple:{type:[Boolean,Object],default:!0},subtitle:[String,Number],text:[String,Number],title:[String,Number],...de(),...k(),...J(),...oe(),...Ee(),...Oe(),...je(),...Fe(),...Q(),...De(),...O(),...ne(),...ce({variant:"elevated"})},"VCard"),ct=S()({name:"VCard",directives:{Ripple:He},props:rt(),setup(e,l){let{attrs:a,slots:t}=l;const{themeClasses:c}=ie(e),{borderClasses:d}=ve(e),{colorClasses:n,colorStyles:s,variantClasses:m}=me(e),{densityClasses:o}=ge(e),{dimensionStyles:r}=ue(e),{elevationClasses:g}=We(e),{loaderClasses:b}=Ue(e),{locationStyles:f}=Me(e),{positionClasses:I}=qe(e),{roundedClasses:T}=X(e),V=Ge(e,a),L=x(()=>e.link!==!1&&V.isLink.value),P=x(()=>!e.disabled&&e.link!==!1&&(e.link||V.isClickable.value));return C(()=>{const B=L.value?"a":e.tag,A=!!(t.title||e.title!=null),R=!!(t.subtitle||e.subtitle!=null),j=A||R,F=!!(t.append||e.appendAvatar||e.appendIcon),D=!!(t.prepend||e.prependAvatar||e.prependIcon),H=!!(t.image||e.image),W=j||D||F,N=!!(t.text||e.text!=null);return M(i(B,ae({class:["v-card",{"v-card--disabled":e.disabled,"v-card--flat":e.flat,"v-card--hover":e.hover&&!(e.disabled||e.flat),"v-card--link":P.value},c.value,d.value,n.value,o.value,g.value,b.value,I.value,T.value,m.value,e.class],style:[s.value,r.value,f.value,e.style],onClick:P.value&&V.navigate,tabindex:e.disabled?-1:void 0},V.linkProps),{default:()=>{var u;return[H&&i("div",{key:"image",class:"v-card__image"},[t.image?i(E,{key:"image-defaults",disabled:!e.image,defaults:{VImg:{cover:!0,src:e.image}}},t.image):i(Se,{key:"image-img",cover:!0,src:e.image},null)]),i(Qe,{name:"v-card",active:!!e.loading,color:typeof e.loading=="boolean"?void 0:e.loading},{default:t.loader}),W&&i(it,{key:"item",prependAvatar:e.prependAvatar,prependIcon:e.prependIcon,title:e.title,subtitle:e.subtitle,appendAvatar:e.appendAvatar,appendIcon:e.appendIcon},{default:t.item,prepend:t.prepend,title:t.title,subtitle:t.subtitle,append:t.append}),N&&i(lt,{key:"text"},{default:()=>{var v;return[((v=t.text)==null?void 0:v.call(t))??e.text]}}),(u=t.default)==null?void 0:u.call(t),t.actions&&i(pe,null,{default:t.actions}),fe(P.value,"v-card")]}}),[[te("ripple"),P.value&&e.ripple]])}),{}}}),ot=_({disabled:Boolean,group:Boolean,hideOnLeave:Boolean,leaveAbsolute:Boolean,mode:String,origin:String},"transition");function y(e,l,a){return S()({name:e,props:ot({mode:a,origin:l}),setup(t,c){let{slots:d}=c;const n={onBeforeEnter(s){t.origin&&(s.style.transformOrigin=t.origin)},onLeave(s){if(t.leaveAbsolute){const{offsetTop:m,offsetLeft:o,offsetWidth:r,offsetHeight:g}=s;s._transitionInitialStyles={position:s.style.position,top:s.style.top,left:s.style.left,width:s.style.width,height:s.style.height},s.style.position="absolute",s.style.top=`${m}px`,s.style.left=`${o}px`,s.style.width=`${r}px`,s.style.height=`${g}px`}t.hideOnLeave&&s.style.setProperty("display","none","important")},onAfterLeave(s){if(t.leaveAbsolute&&(s!=null&&s._transitionInitialStyles)){const{position:m,top:o,left:r,width:g,height:b}=s._transitionInitialStyles;delete s._transitionInitialStyles,s.style.position=m||"",s.style.top=o||"",s.style.left=r||"",s.style.width=g||"",s.style.height=b||""}}};return()=>{const s=t.group?se:le;return re(s,{name:t.disabled?"":e,css:!t.disabled,...t.group?void 0:{mode:t.mode},...t.disabled?{}:n},d.default)}}})}function he(e,l){let a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:"in-out";return S()({name:e,props:{mode:{type:String,default:a},disabled:Boolean,group:Boolean},setup(t,c){let{slots:d}=c;const n=t.group?se:le;return()=>re(n,{name:t.disabled?"":e,css:!t.disabled,...t.disabled?{}:l},d.default)}})}function _e(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"";const a=(arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1)?"width":"height",t=ze(`offset-${a}`);return{onBeforeEnter(n){n._parent=n.parentNode,n._initialStyle={transition:n.style.transition,overflow:n.style.overflow,[a]:n.style[a]}},onEnter(n){const s=n._initialStyle;n.style.setProperty("transition","none","important"),n.style.overflow="hidden";const m=`${n[t]}px`;n.style[a]="0",n.offsetHeight,n.style.transition=s.transition,e&&n._parent&&n._parent.classList.add(e),requestAnimationFrame(()=>{n.style[a]=m})},onAfterEnter:d,onEnterCancelled:d,onLeave(n){n._initialStyle={transition:"",overflow:n.style.overflow,[a]:n.style[a]},n.style.overflow="hidden",n.style[a]=`${n[t]}px`,n.offsetHeight,requestAnimationFrame(()=>n.style[a]="0")},onAfterLeave:c,onLeaveCancelled:c};function c(n){e&&n._parent&&n._parent.classList.remove(e),d(n)}function d(n){const s=n._initialStyle[a];n.style.overflow=n._initialStyle.overflow,s!=null&&(n.style[a]=s),delete n._initialStyle}}y("fab-transition","center center","out-in");y("dialog-bottom-transition");y("dialog-top-transition");const vt=y("fade-transition");y("scale-transition");y("scroll-x-transition");y("scroll-x-reverse-transition");y("scroll-y-transition");y("scroll-y-reverse-transition");y("slide-x-transition");y("slide-x-reverse-transition");const mt=y("slide-y-transition");y("slide-y-reverse-transition");const gt=he("expand-transition",_e()),ft=he("expand-x-transition",_e("",!0));export{Je as I,ct as V,lt as a,mt as b,ft as c,pe as d,at as e,Se as f,vt as g,gt as h,p as i};