import{u as R,V as _}from"./HF3ZDi0N.js";import{d as v,e as q,f as p,K as y,N as g,O as V,q as w}from"./C1DMsIOY.js";import{V as h,a as k,e as L}from"./BtHLWWzn.js";import{k as T,b as $,l as j,q as E,ag as F,P as C,u as a,ac as l,ad as e,aU as r,F as O,O as o,ae as S,A as t,Q as A,ba as b,af as n}from"./DxHezSxA.js";import"./BlJ7m-N0.js";import"./DS_ixwaV.js";import"./C-GTDzx5.js";import"./DtId5drI.js";import"./BduLK7P_.js";const D={class:"container"},K={key:0,class:"mt-16"},Y=T({__name:"nonLogin",props:{errorMode:{type:Boolean,default:!1}},setup(i){const c=$("nonLogin"),{isMember:s,application:d,userEmail:x}=R(),B=v(),f=q(),m=j(()=>f.query.path?{path:f.query.path}:{name:"member-profile"}),M=()=>{s.value&&B.replace(m.value)};return E(()=>{M()}),(u,P)=>{const N=F("RouterView");return o(),C(O,null,[a(s)?r("",!0):(o(),l(_,{key:0,"eagle-layout":a(c),class:"fill-height"},{default:e(()=>[a(d)?(o(),l(p,{key:0},{default:e(()=>[S("div",D,[i.errorMode?r("",!0):(o(),C("div",K,[t(V,{class:"fill-height",fluid:""},{default:e(()=>[t(y,{align:"center",justify:"center"},{default:e(()=>[t(g,{cols:"12",sm:"10",md:"8",lg:"6",xl:"6",xxl:"6"},{default:e(()=>[t(N)]),_:1})]),_:1})]),_:1})])),i.errorMode?(o(),l(h,{key:1},{default:e(()=>[t(k,null,{default:e(()=>[A(u.$slots,"error")]),_:3})]),_:3})):r("",!0)])]),_:3})):r("",!0)]),_:3},8,["eagle-layout"])),a(s)?(o(),l(_,{key:1,"eagle-layout":a(c),class:"fill-height"},{default:e(()=>[a(d)?(o(),l(p,{key:0},{default:e(()=>[t(V,{class:"fill-height"},{default:e(()=>[t(y,{align:"center",justify:"center"},{default:e(()=>[t(g,{cols:"12",sm:"10",md:"10",lg:"10",xl:"8"},{default:e(()=>[t(h,null,{default:e(()=>[t(L,{class:"mb-4"},{default:e(()=>[b(n(u.$t("notify.has_login_as_member"))+" ("+n(a(x))+") ",1)]),_:1}),t(k,null,{default:e(()=>[t(w,{color:"primary",to:a(m)},{default:e(()=>[b(n(u.$t("action.redirect_to_console")),1)]),_:1},8,["to"])]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})):r("",!0)]),_:1},8,["eagle-layout"])):r("",!0)],64)}}});export{Y as default};