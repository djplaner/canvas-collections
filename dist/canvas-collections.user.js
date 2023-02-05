// ==UserScript==
// @name        canvas-collections
// @description Modify Canvas LMS' modules view to support collections of modules and alternate representations
// @namespace   https://djon.es/
// @version     1.0.1
// @homepage    https://github.com/djplaner/canvas-collections#readme
// @author      David Jones
// @updateURL   https://github.com/djplaner/canvas-collections/raw/main/dist/canvas-collections.user.js
// @downloadURL https://github.com/djplaner/canvas-collections/raw/main/dist/canvas-collections.user.js
// @supportURL  https://github.com/djplaner/canvas-collections/issues
// @resource    css https://raw.githubusercontent.com/djplaner/canvas-collections/main/dist/canvas-collections.css
// @match       https://*/courses/*
// @run-at      document-idle
// @grant       GM_addStyle
// @grant       GM_getResourceText
// @grant       GM_xmlhttpRequest
// ==/UserScript==
GM_addStyle(GM_getResourceText("css"));var app=function(){"use strict";function t(){}function e(t){return t()}function o(){return Object.create(null)}function n(t){t.forEach(e)}function r(t){return"function"==typeof t}function i(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}let s,a;function l(t,e){return s||(s=document.createElement("a")),s.href=e,t===s.href}function c(e,...o){if(null==e)return t;const n=e.subscribe(...o);return n.unsubscribe?()=>n.unsubscribe():n}function d(t){let e;return c(t,(t=>e=t))(),e}function u(t,e,o){t.$$.on_destroy.push(c(e,o))}function h(t){return null==t?"":t}function p(t,e,o){return t.set(o),e}function f(t,e){t.appendChild(e)}function m(t,e,o){t.insertBefore(e,o||null)}function g(t){t.parentNode&&t.parentNode.removeChild(t)}function b(t,e){for(let o=0;o<t.length;o+=1)t[o]&&t[o].d(e)}function v(t){return document.createElement(t)}function y(t){return document.createTextNode(t)}function w(){return y(" ")}function x(){return y("")}function k(t,e,o,n){return t.addEventListener(e,o,n),()=>t.removeEventListener(e,o,n)}function C(t){return function(e){return e.stopPropagation(),t.call(this,e)}}function S(t,e,o){null==o?t.removeAttribute(e):t.getAttribute(e)!==o&&t.setAttribute(e,o)}function E(t,e,o){e in t?t[e]="boolean"==typeof t[e]&&""===o||o:S(t,e,o)}function _(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function O(t,e){t.value=null==e?"":e}function L(t,e,o,n){null===o?t.style.removeProperty(e):t.style.setProperty(e,o,n?"important":"")}function T(t,e){for(let o=0;o<t.options.length;o+=1){const n=t.options[o];if(n.__value===e)return void(n.selected=!0)}t.selectedIndex=-1}function $(t){const e=t.querySelector(":checked")||t.options[0];return e&&e.__value}function M(t,e,o){t.classList[o?"add":"remove"](e)}class D{constructor(t=!1){this.is_svg=!1,this.is_svg=t,this.e=this.n=null}c(t){this.h(t)}m(t,e,o=null){var n;this.e||(this.is_svg?this.e=(n=e.nodeName,document.createElementNS("http://www.w3.org/2000/svg",n)):this.e=v(e.nodeName),this.t=e,this.c(t)),this.i(o)}h(t){this.e.innerHTML=t,this.n=Array.from(this.e.childNodes)}i(t){for(let e=0;e<this.n.length;e+=1)m(this.t,this.n[e],t)}p(t){this.d(),this.h(t),this.i(this.a)}d(){this.n.forEach(g)}}function A(t,e){return new t(e)}function I(t){a=t}function P(){if(!a)throw new Error("Function called outside component initialization");return a}function N(t){P().$$.on_mount.push(t)}function U(){const t=P();return(e,o,{cancelable:n=!1}={})=>{const r=t.$$.callbacks[e];if(r){const i=function(t,e,{bubbles:o=!1,cancelable:n=!1}={}){const r=document.createEvent("CustomEvent");return r.initCustomEvent(t,o,n,e),r}(e,o,{cancelable:n});return r.slice().forEach((e=>{e.call(t,i)})),!i.defaultPrevented}return!0}}function H(t,e){const o=t.$$.callbacks[e.type];o&&o.slice().forEach((t=>t.call(this,e)))}const q=[],z=[],R=[],j=[],B=Promise.resolve();let F=!1;function V(t){R.push(t)}function W(t){j.push(t)}const G=new Set;let K=0;function X(){const t=a;do{for(;K<q.length;){const t=q[K];K++,I(t),J(t.$$)}for(I(null),q.length=0,K=0;z.length;)z.pop()();for(let t=0;t<R.length;t+=1){const e=R[t];G.has(e)||(G.add(e),e())}R.length=0}while(q.length);for(;j.length;)j.pop()();F=!1,G.clear(),I(t)}function J(t){if(null!==t.fragment){t.update(),n(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(V)}}const Y=new Set;let Q;function Z(){Q={r:0,c:[],p:Q}}function tt(){Q.r||n(Q.c),Q=Q.p}function et(t,e){t&&t.i&&(Y.delete(t),t.i(e))}function ot(t,e,o,n){if(t&&t.o){if(Y.has(t))return;Y.add(t),Q.c.push((()=>{Y.delete(t),n&&(o&&t.d(1),n())})),t.o(e)}else n&&n()}function nt(t,e,o,n){const r=t.$$.props[e];void 0!==r&&(t.$$.bound[r]=o,void 0===n&&o(t.$$.ctx[r]))}function rt(t){t&&t.c()}function it(t,o,i,s){const{fragment:a,after_update:l}=t.$$;a&&a.m(o,i),s||V((()=>{const o=t.$$.on_mount.map(e).filter(r);t.$$.on_destroy?t.$$.on_destroy.push(...o):n(o),t.$$.on_mount=[]})),l.forEach(V)}function st(t,e){const o=t.$$;null!==o.fragment&&(n(o.on_destroy),o.fragment&&o.fragment.d(e),o.on_destroy=o.fragment=null,o.ctx=[])}function at(t,e){-1===t.$$.dirty[0]&&(q.push(t),F||(F=!0,B.then(X)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function lt(e,r,i,s,l,c,d,u=[-1]){const h=a;I(e);const p=e.$$={fragment:null,ctx:[],props:c,update:t,not_equal:l,bound:o(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(r.context||(h?h.$$.context:[])),callbacks:o(),dirty:u,skip_bound:!1,root:r.target||h.$$.root};d&&d(p.root);let f=!1;if(p.ctx=i?i(e,r.props||{},((t,o,...n)=>{const r=n.length?n[0]:o;return p.ctx&&l(p.ctx[t],p.ctx[t]=r)&&(!p.skip_bound&&p.bound[t]&&p.bound[t](r),f&&at(e,t)),o})):[],p.update(),f=!0,n(p.before_update),p.fragment=!!s&&s(p.ctx),r.target){if(r.hydrate){const t=function(t){return Array.from(t.childNodes)}(r.target);p.fragment&&p.fragment.l(t),t.forEach(g)}else p.fragment&&p.fragment.c();r.intro&&et(e.$$.fragment),it(e,r.target,r.anchor,r.customElement),X()}I(h)}class ct{$destroy(){st(this,1),this.$destroy=t}$on(e,o){if(!r(o))return t;const n=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return n.push(o),()=>{const t=n.indexOf(o);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const dt=[];function ut(e,o=t){let n;const r=new Set;function s(t){if(i(e,t)&&(e=t,n)){const t=!dt.length;for(const t of r)t[1](),dt.push(t,e);if(t){for(let t=0;t<dt.length;t+=2)dt[t][0](dt[t+1]);dt.length=0}}}return{set:s,update:function(t){s(t(e))},subscribe:function(i,a=t){const l=[i,a];return r.add(l),1===r.size&&(n=o(s)||t),i(e),()=>{r.delete(l),0===r.size&&(n(),n=null)}}}}
/**
     * @license
     * Copyright 2019 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */class ht{constructor(t=pt){t&&gt[t]&&(this.defaultPeriod=t)}setStudyPeriod(t){this.defaultPeriod=t}getStudyPeriod(){return this.defaultPeriod}getHumanReadableStudyPeriod(){const t=this.defaultPeriod[0],e=this.defaultPeriod.slice(1,3),o=this.defaultPeriod[3];return`${{2:{1:"Study Period 1",2:"Session 1",3:"Study Period 2",4:"Session 2",5:"Study Period 3",6:"Session 3",7:"Study Period 4"},3:{1:"Trimester 1",5:"Trimester 2",8:"Trimester 3"},6:{1:"Teaching Period 1",2:"Teaching Period 2",3:"Teaching Period 3",4:"Teaching Period 4",5:"Teaching Period 5",6:"Teaching Period 6"}}[t][o]} 20${e}`}getWeekDetails(t="all",e=this.defaultPeriod){return"all"===t?gt[e]:("string"==typeof t&&t.startsWith("Week")&&(t=t.substring(4)),e in gt&&t in gt[e]?gt[e][t]:null)}getDaysOfWeek(){return ft}getDate(t,e=!0,o="Monday"){let n={day:"",date:"",month:"",week:t,year:0};o=o.toLowerCase();let r=this.getWeekDetails(t);if(null===r)return n;let i=new Date(r.start);const s={tuesday:1,tue:1,wednesday:2,wed:2,thursday:3,thu:3,friday:4,fri:4,saturday:5,sat:5,sunday:6,sun:6};return"monday"!==o&&(n.day=o.charAt(0).toUpperCase()+o.substring(1,3),o in s&&i.setDate(i.getDate()+s[o.toLowerCase()])),n.month=mt[i.getMonth()],n.date=i.getDate().toString(),n.year=i.getFullYear(),n}getFirstDayOfWeek(t=1,e=this.defaultPeriod){return"Monday"}getCurrentPeriod(t){if(t.match(/^DEV_/)&&(t=`(${t})`),!t.match(/\(.*\)/))return this.defaultPeriod;const e=t.match(/\([^()]+\)(?=[^()]*$)/,"")[0].replace(/[\(\)]/g,"").split("/");let o=[];for(let t of e){let e=t.split("_"),n={};for(let t of e){let e=t.match(/^[0-9][0-9][0-9][0-9][A-Z][A-Z][A-Z]$/);e?n.courseCode=e[0]:(e=t.match(/^[0-9][0-9][0-9][0-9]$/),e&&(n.STRM=e[0]))}o.push(n)}let n=o.map((t=>t.STRM));return n=[...new Set(n)],0===n.length?this.defaultPeriod:(n.length>1&&console.error(`Multiple STRMs found in courseCode: ${t}`),n[0])}}const pt="3231",ft=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],mt=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],gt={3238:{0:{start:"2023-10-30",stop:"2023-11-05"},1:{start:"2023-11-06",stop:"2023-11-12"},2:{start:"2023-11-13",stop:"2023-11-19"},3:{start:"2023-11-20",stop:"2023-11-26"},4:{start:"2023-11-27",stop:"2023-12-03"},5:{start:"2023-12-04",stop:"2023-12-10"},6:{start:"2023-12-11",stop:"2023-12-17"},7:{start:"2023-12-18",stop:"2023-12-24"},8:{start:"2024-01-08",stop:"2024-01-15"},9:{start:"2024-01-15",stop:"2024-01-21"},10:{start:"2024-01-22",stop:"2024-01-28"},11:{start:"2024-01-29",stop:"2024-02-04"},12:{start:"2024-02-05",stop:"2024-02-11"},13:{start:"2024-02-12",stop:"2024-02-18"},14:{start:"2024-02-19",stop:"2024-02-25"},15:{start:"2024-02-26",stop:"2024-03-03"}},3235:{0:{start:"2023-07-10",stop:"2023-07-16"},1:{start:"2023-07-17",stop:"2023-07-23"},2:{start:"2023-07-24",stop:"2023-07-30"},3:{start:"2023-07-31",stop:"2023-08-06"},4:{start:"2023-08-07",stop:"2023-08-13"},5:{start:"2023-08-21",stop:"2023-08-27"},6:{start:"2023-08-28",stop:"2023-09-03"},7:{start:"2023-09-04",stop:"2023-09-10"},8:{start:"2023-09-11",stop:"2023-09-17"},9:{start:"2023-09-18",stop:"2023-09-24"},10:{start:"2023-09-25",stop:"2023-10-01"},11:{start:"2023-10-02",stop:"2023-10-09"},12:{start:"2023-10-09",stop:"2023-10-15"},13:{start:"2023-10-16",stop:"2023-10-22"},14:{start:"2023-10-23",stop:"2023-10-29"},15:{start:"2023-10-30",stop:"2023-11-05"},exam:{start:"2023-10-19",stop:"2023-10-28"}},3231:{0:{start:"2023-02-27",stop:"2023-03-03"},1:{start:"2023-03-06",stop:"2023-03-12"},2:{start:"2023-03-13",stop:"2023-03-19"},3:{start:"2023-03-20",stop:"2023-03-26"},4:{start:"2023-03-27",stop:"2023-04-09"},5:{start:"2023-04-10",stop:"2023-04-16"},6:{start:"2023-04-17",stop:"2023-04-23"},7:{start:"2023-04-24",stop:"2023-04-30"},8:{start:"2023-05-01",stop:"2023-05-07"},9:{start:"2023-05-08",stop:"2023-05-14"},10:{start:"2023-05-15",stop:"2023-05-21"},11:{start:"2023-05-22",stop:"2023-05-28"},12:{start:"2023-05-29",stop:"2023-06-04"},13:{start:"2023-06-05",stop:"2023-06-11"},14:{start:"2023-06-12",stop:"2023-06-18"},15:{start:"2023-06-19",stop:"2023-07-25"},exam:{start:"2023-06-08",stop:"2023-06-17"}},3221:{0:{start:"2022-03-07",stop:"2022-03-13"},1:{start:"2022-03-14",stop:"2022-03-20"},2:{start:"2022-03-21",stop:"2022-03-28"},3:{start:"2022-03-28",stop:"2022-04-03"},4:{start:"2022-04-04",stop:"2022-04-10"},5:{start:"2022-04-18",stop:"2022-04-24"},6:{start:"2022-04-25",stop:"2022-05-01"},7:{start:"2022-05-02",stop:"2022-05-08"},8:{start:"2022-05-09",stop:"2022-05-15"},9:{start:"2022-05-16",stop:"2022-05-22"},10:{start:"2022-05-23",stop:"2022-05-29"},11:{start:"2022-05-30",stop:"2022-06-05"},12:{start:"2022-06-06",stop:"2022-06-12"},13:{start:"2022-06-13",stop:"2022-06-19"},14:{start:"2022-06-20",stop:"2022-06-26"},15:{start:"2022-06-27",stop:"2022-07-03"},exam:{start:"2022-06-13",stop:"2022-06-25"}},2222:{0:{start:"2022-03-07",stop:"2022-03-13"},1:{start:"2022-03-14",stop:"2022-03-20"},2:{start:"2022-03-21",stop:"2022-03-28"},3:{start:"2022-03-28",stop:"2022-04-03"},4:{start:"2022-04-04",stop:"2022-04-10"},5:{start:"2022-04-18",stop:"2022-04-24"},6:{start:"2022-04-25",stop:"2022-05-01"},7:{start:"2022-05-02",stop:"2022-05-08"},8:{start:"2022-05-09",stop:"2022-05-15"},9:{start:"2022-05-16",stop:"2022-05-22"},10:{start:"2022-05-23",stop:"2022-05-29"},11:{start:"2022-05-30",stop:"2022-06-05"},12:{start:"2022-06-06",stop:"2022-06-12"},13:{start:"2022-06-13",stop:"2022-06-19"},14:{start:"2022-06-20",stop:"2022-06-26"},15:{start:"2022-06-27",stop:"2022-07-03"},exam:{start:"2022-06-13",stop:"2022-06-25"}},"3221QCM":{0:{start:"2022-02-21",stop:"2022-02-27"},1:{start:"2022-02-28",stop:"2022-03-06"},2:{start:"2022-03-07",stop:"2022-03-13"},3:{start:"2022-03-14",stop:"2022-03-20"},4:{start:"2022-03-21",stop:"2022-03-27"},5:{start:"2022-03-28",stop:"2022-04-03"},6:{start:"2022-04-04",stop:"2022-04-10"},7:{start:"2022-04-18",stop:"2022-04-24"},8:{start:"2022-04-25",stop:"2022-05-01"},9:{start:"2022-05-09",stop:"2022-05-15"},10:{start:"2022-05-16",stop:"2022-05-22"},11:{start:"2022-05-23",stop:"2022-05-29"},12:{start:"2022-05-30",stop:"2022-06-05"},13:{start:"2022-06-06",stop:"2022-06-12"},14:{start:"2022-06-13",stop:"2022-06-19"},15:{start:"2022-06-20",stop:"2022-07-26"},exam:{start:"2022-06-13",stop:"2022-06-25"}},3225:{0:{start:"2022-07-11",stop:"2022-07-17"},1:{start:"2022-07-18",stop:"2022-07-24"},2:{start:"2022-07-25",stop:"2022-07-31"},3:{start:"2022-08-01",stop:"2022-08-07"},4:{start:"2022-08-08",stop:"2022-08-14"},5:{start:"2022-08-22",stop:"2022-08-28"},6:{start:"2022-08-29",stop:"2022-09-04"},7:{start:"2022-09-05",stop:"2022-09-11"},8:{start:"2022-09-12",stop:"2022-09-18"},9:{start:"2022-09-19",stop:"2022-09-25"},10:{start:"2022-09-26",stop:"2022-10-02"},11:{start:"2022-10-03",stop:"2022-10-09"},12:{start:"2022-10-10",stop:"2022-10-16"},13:{start:"2022-10-17",stop:"2022-10-23"},14:{start:"2022-10-24",stop:"2022-10-30"},15:{start:"2022-10-31",stop:"2022-11-06"},exam:{start:"2022-10-20",stop:"2022-10-29"}},2224:{0:{start:"2022-07-11",stop:"2022-07-17"},1:{start:"2022-07-18",stop:"2022-07-24"},2:{start:"2022-07-25",stop:"2022-07-31"},3:{start:"2022-08-01",stop:"2022-08-07"},4:{start:"2022-08-08",stop:"2022-08-14"},5:{start:"2022-08-22",stop:"2022-08-28"},6:{start:"2022-08-29",stop:"2022-09-04"},7:{start:"2022-09-05",stop:"2022-09-11"},8:{start:"2022-09-12",stop:"2022-09-18"},9:{start:"2022-09-19",stop:"2022-09-25"},10:{start:"2022-09-26",stop:"2022-10-02"},11:{start:"2022-10-03",stop:"2022-10-09"},12:{start:"2022-10-10",stop:"2022-10-16"},13:{start:"2022-10-17",stop:"2022-10-23"},14:{start:"2022-10-24",stop:"2022-10-30"},15:{start:"2022-10-31",stop:"2022-11-06"},exam:{start:"2022-10-20",stop:"2022-10-29"}},"3225QCM":{0:{start:"2022-07-18",stop:"2022-07-24"},1:{start:"2022-07-25",stop:"2022-07-31"},2:{start:"2022-08-01",stop:"2022-08-07"},3:{start:"2022-08-08",stop:"2022-08-14"},4:{start:"2022-08-15",stop:"2022-08-21"},5:{start:"2022-08-22",stop:"2022-08-28"},6:{start:"2022-09-05",stop:"2022-09-11"},7:{start:"2022-09-12",stop:"2022-09-18"},8:{start:"2022-09-19",stop:"2022-09-25"},9:{start:"2022-10-03",stop:"2022-10-09"},10:{start:"2022-10-10",stop:"2022-10-16"},11:{start:"2022-10-17",stop:"2022-10-23"},12:{start:"2022-10-24",stop:"2022-10-30"},13:{start:"2022-10-31",stop:"2022-11-06"},14:{start:"2022-11-07",stop:"2022-11-13"},15:{start:"2022-11-14",stop:"2022-07-20"},exam:{start:"2022-11-07",stop:"2022-11-19"}},3228:{0:{start:"2022-10-31",stop:"2022-11-06"},1:{start:"2022-11-07",stop:"2022-11-13"},2:{start:"2022-11-14",stop:"2022-11-20"},3:{start:"2022-11-21",stop:"2022-11-27"},4:{start:"2022-11-28",stop:"2022-12-04"},5:{start:"2022-12-05",stop:"2022-12-11"},6:{start:"2022-12-12",stop:"2022-12-18"},7:{start:"2022-12-19",stop:"2022-12-25"},8:{start:"2023-01-09",stop:"2023-01-15"},9:{start:"2023-01-16",stop:"2023-01-22"},10:{start:"2023-01-23",stop:"2023-01-29"},11:{start:"2023-01-30",stop:"2023-02-05"},12:{start:"2023-02-06",stop:"2023-02-12"},13:{start:"2023-02-13",stop:"2023-02-19"},14:{start:"2023-02-20",stop:"2023-02-26"},15:{start:"2023-02-27",stop:"2023-03-05"}},2226:{0:{start:"2022-10-31",stop:"2022-11-06"},1:{start:"2022-11-07",stop:"2022-11-13"},2:{start:"2022-11-14",stop:"2022-11-20"},3:{start:"2022-11-21",stop:"2022-11-27"},4:{start:"2022-11-28",stop:"2022-12-04"},5:{start:"2022-12-05",stop:"2022-12-11"},6:{start:"2022-12-12",stop:"2022-12-18"},7:{start:"2022-12-19",stop:"2022-12-25"},8:{start:"2023-01-09",stop:"2023-01-15"},9:{start:"2023-01-16",stop:"2023-01-22"},10:{start:"2023-01-23",stop:"2023-01-29"},11:{start:"2023-01-30",stop:"2023-02-05"},12:{start:"2023-02-06",stop:"2023-02-12"},13:{start:"2023-02-13",stop:"2023-02-19"},14:{start:"2023-02-20",stop:"2023-02-26"},15:{start:"2023-02-27",stop:"2023-03-05"}},2211:{0:{start:"2021-02-22",stop:"2021-02-28"},1:{start:"2021-03-01",stop:"2021-03-07"},2:{start:"2021-03-08",stop:"2021-03-14"},3:{start:"2021-03-15",stop:"2021-03-21"},4:{start:"2021-03-22",stop:"2021-03-28"},5:{start:"2021-03-29",stop:"2021-04-04"},6:{start:"2021-04-05",stop:"2021-04-11"},7:{start:"2021-04-12",stop:"2021-04-18"},8:{start:"2021-04-19",stop:"2021-04-25"},9:{start:"2021-04-26",stop:"2021-05-02"},10:{start:"2021-05-03",stop:"2021-05-09"},11:{start:"2021-05-10",stop:"2021-05-16"},12:{start:"2021-05-17",stop:"2021-05-23"},13:{start:"2021-05-24",stop:"2021-05-30"},14:{start:"2021-05-31",stop:"2021-06-06"},exam:{start:"2021-05-31",stop:"2021-06-06"}},2213:{1:{start:"2021-05-31",stop:"2021-06-06"},2:{start:"2021-06-07",stop:"2021-06-13"},3:{start:"2021-06-14",stop:"2021-06-20"},4:{start:"2021-06-21",stop:"2021-06-27"},5:{start:"2021-06-28",stop:"2021-07-04"},6:{start:"2021-07-05",stop:"2021-07-11"},7:{start:"2021-07-12",stop:"2021-07-18"},8:{start:"2021-07-19",stop:"2021-07-25"},9:{start:"2021-07-26",stop:"2021-08-01"},10:{start:"2021-08-02",stop:"2021-08-08"},11:{start:"2021-08-09",stop:"2021-08-15"},12:{start:"2021-08-16",stop:"2021-08-22"},13:{start:"2021-08-23",stop:"2021-08-29"},exam:{start:"2021-08-30",stop:"2021-09-05"}},2215:{0:{start:"2021-08-23",stop:"2021-08-29"},1:{start:"2021-08-30",stop:"2021-09-05"},2:{start:"2021-09-06",stop:"2021-09-12"},3:{start:"2021-09-13",stop:"2021-09-19"},4:{start:"2021-09-20",stop:"2021-09-26"},5:{start:"2021-09-27",stop:"2021-10-03"},6:{start:"2021-10-04",stop:"2021-10-10"},7:{start:"2021-10-11",stop:"2021-10-17"},8:{start:"2021-10-18",stop:"2021-10-24"},9:{start:"2021-10-25",stop:"2021-10-31"},10:{start:"2021-11-01",stop:"2021-11-07"},11:{start:"2021-11-08",stop:"2021-11-14"},12:{start:"2021-11-15",stop:"2021-11-21"},13:{start:"2021-11-22",stop:"2021-11-28"},exam:{start:"2021-11-29",stop:"2021-12-05"}},2217:{0:{start:"2021-11-22",stop:"2021-11-28"},1:{start:"2021-11-29",stop:"2021-12-05"},2:{start:"2021-12-06",stop:"2021-12-12"},3:{start:"2021-12-13",stop:"2021-12-19"},4:{start:"2021-12-20",stop:"2021-12-26"},5:{start:"2021-12-27",stop:"2022-01-02"},6:{start:"2022-01-03",stop:"2022-01-09"},7:{start:"2022-01-10",stop:"2022-01-16"},8:{start:"2022-01-17",stop:"2022-01-23"},9:{start:"2022-01-24",stop:"2022-01-30"},10:{start:"2022-01-31",stop:"2022-02-06"},11:{start:"2022-02-07",stop:"2022-02-13"},12:{start:"2022-02-14",stop:"2022-02-20"},13:{start:"2022-02-21",stop:"2022-02-27"},exam:{start:"2022-02-28",stop:"2022-03-04"}},3218:{0:{start:"2021-11-01",stop:"2021-11-07"},1:{start:"2021-11-08",stop:"2021-11-14"},2:{start:"2021-11-15",stop:"2021-11-21"},3:{start:"2021-11-22",stop:"2021-11-28"},4:{start:"2021-11-29",stop:"2021-12-05"},5:{start:"2021-12-06",stop:"2021-12-12"},6:{start:"2021-12-13",stop:"2021-12-19"},7:{start:"2021-12-20",stop:"2021-12-26"},8:{start:"2022-01-10",stop:"2022-01-16"},9:{start:"2022-01-17",stop:"2022-01-23"},10:{start:"2022-01-24",stop:"2022-01-30"},11:{start:"2022-01-31",stop:"2022-02-06"},12:{start:"2022-02-07",stop:"2022-02-13"},13:{start:"2022-02-14",stop:"2022-02-20"},14:{start:"2022-02-21",stop:"2022-02-27"},15:{start:"2022-02-28",stop:"2022-03-06"},exam:{start:"2022-02-17",stop:"2022-02-26"}},3215:{0:{start:"2021-07-12",stop:"2021-07-18"},1:{start:"2021-07-19",stop:"2021-07-25"},2:{start:"2021-07-26",stop:"2021-08-01"},3:{start:"2021-08-02",stop:"2021-08-08"},4:{start:"2021-08-16",stop:"2021-08-22"},5:{start:"2021-08-23",stop:"2021-08-29"},6:{start:"2021-08-30",stop:"2021-09-05"},7:{start:"2021-09-06",stop:"2021-09-12"},8:{start:"2021-09-13",stop:"2021-09-19"},9:{start:"2021-09-20",stop:"2021-09-26"},10:{start:"2021-09-27",stop:"2021-10-03"},11:{start:"2021-10-04",stop:"2021-10-10"},12:{start:"2021-10-11",stop:"2021-10-17"},13:{start:"2021-10-18",stop:"2021-10-24"},14:{start:"2021-10-25",stop:"2021-10-31"},15:{start:"2021-11-01",stop:"2021-11-07"},exam:{start:"2021-10-21",stop:"2021-10-31"}},3211:{0:{start:"2021-03-01",stop:"2021-03-07"},1:{start:"2021-03-08",stop:"2021-03-14"},2:{start:"2021-03-15",stop:"2021-03-21"},3:{start:"2021-03-22",stop:"2021-03-28"},4:{start:"2021-03-29",stop:"2021-04-04"},5:{start:"2021-04-12",stop:"2021-04-18"},6:{start:"2021-04-19",stop:"2021-04-25"},7:{start:"2021-04-26",stop:"2021-05-02"},8:{start:"2021-05-03",stop:"2021-05-09"},9:{start:"2021-05-10",stop:"2021-05-16"},10:{start:"2021-05-17",stop:"2021-05-23"},11:{start:"2021-05-24",stop:"2021-05-30"},12:{start:"2021-05-31",stop:"2021-06-06"},13:{start:"2021-06-07",stop:"2021-06-13"},14:{start:"2021-06-14",stop:"2021-06-20"},15:{start:"2021-06-21",stop:"2021-06-27"},exam:{start:"2021-06-10",stop:"2021-06-19"}},"3215QCM":{0:{start:"2021-07-12",stop:"2021-07-18"},1:{start:"2021-07-19",stop:"2021-07-25"},2:{start:"2021-07-26",stop:"2021-08-01"},3:{start:"2021-08-02",stop:"2021-08-08"},4:{start:"2021-08-09",stop:"2021-08-15"},5:{start:"2021-08-16",stop:"2021-08-22"},6:{start:"2021-08-30",stop:"2021-09-05"},7:{start:"2021-09-06",stop:"2021-09-12"},8:{start:"2021-09-13",stop:"2021-09-19"},9:{start:"2021-09-20",stop:"2021-09-26"},10:{start:"2021-10-04",stop:"2021-10-10"},11:{start:"2021-10-11",stop:"2021-10-17"},12:{start:"2021-10-18",stop:"2021-10-24"},13:{start:"2021-10-25",stop:"2021-10-31"},14:{start:"2021-11-01",stop:"2021-11-07"},15:{start:"2021-11-08",stop:"2021-11-14"},exam:{start:"2021-10-30",stop:"2021-11-13"}},"3211QCM":{0:{start:"2021-02-22",stop:"2021-02-28"},1:{start:"2021-03-01",stop:"2021-03-07"},2:{start:"2021-03-08",stop:"2021-03-14"},3:{start:"2021-03-15",stop:"2021-03-21"},4:{start:"2021-03-22",stop:"2021-03-29"},5:{start:"2021-03-29",stop:"2021-04-04"},6:{start:"2021-04-12",stop:"2021-04-18"},7:{start:"2021-04-19",stop:"2021-04-25"},8:{start:"2021-04-26",stop:"2021-05-02"},9:{start:"2021-05-10",stop:"2021-05-16"},10:{start:"2021-05-17",stop:"2021-05-23"},11:{start:"2021-05-24",stop:"2021-05-30"},12:{start:"2021-05-31",stop:"2021-06-06"},13:{start:"2021-06-07",stop:"2021-03-13"},14:{start:"2021-06-14",stop:"2021-03-20"},15:{start:"2021-06-21",stop:"2021-03-26"},exam:{start:"2021-06-12",stop:"2021-06-26"}},2201:{0:{start:"2020-02-24",stop:"2020-03-01"},1:{start:"2020-03-02",stop:"2020-03-08"},2:{start:"2020-03-09",stop:"2020-03-15"},3:{start:"2020-03-16",stCop:"2020-03-22"},4:{start:"2020-03-23",stop:"2020-03-29"},5:{start:"2020-03-30",stop:"2020-04-05"},6:{start:"2020-04-06",stop:"2020-04-12"},7:{start:"2020-04-13",stop:"2020-04-19"},8:{start:"2020-04-20",stop:"2020-04-26"},9:{start:"2020-04-27",stop:"2020-05-03"},10:{start:"2020-05-04",stop:"2020-05-10"},11:{start:"2020-05-11",stop:"2020-05-17"},12:{start:"2020-05-18",stop:"2020-05-24"},13:{start:"2020-05-25",stop:"2020-05-31"},14:{start:"2020-06-01",stop:"2020-06-05"},exam:{start:"2020-06-01",stop:"2020-06-05"}},2203:{0:{start:"2020-05-25",stop:"2020-05-31"},1:{start:"2020-06-01",stop:"2020-06-07"},2:{start:"2020-06-08",stop:"2020-06-14"},3:{start:"2020-06-15",stop:"2020-06-21"},4:{start:"2020-06-22",stop:"2020-06-28"},5:{start:"2020-06-29",stop:"2020-07-05"},6:{start:"2020-07-06",stop:"2020-07-12"},7:{start:"2020-07-13",stop:"2020-07-19"},8:{start:"2020-07-20",stop:"2020-07-26"},9:{start:"2020-07-27",stop:"2020-08-02"},10:{start:"2020-08-03",stop:"2020-08-09"},11:{start:"2020-08-10",stop:"2020-05-17"},12:{start:"2020-08-17",stop:"2020-05-24"},13:{start:"2020-08-24",stop:"2020-05-31"},14:{start:"2020-08-31",stop:"2020-09-06"},exam:{start:"2020-08-31",stop:"2020-09-04"}},2205:{0:{start:"2020-08-24",stop:"2020-09-30"},1:{start:"2020-08-31",stop:"2020-09-06"},2:{start:"2020-09-07",stop:"2020-09-13"},3:{start:"2020-09-14",stop:"2020-09-20"},4:{start:"2020-09-21",stop:"2020-09-27"},5:{start:"2020-09-28",stop:"2020-10-04"},6:{start:"2020-10-05",stop:"2020-10-11"},7:{start:"2020-10-12",stop:"2020-10-19"},8:{start:"2020-10-19",stop:"2020-10-25"},9:{start:"2020-10-26",stop:"2020-11-01"},10:{start:"2020-11-02",stop:"2020-11-08"},11:{start:"2020-11-09",stop:"2020-11-15"},12:{start:"2020-11-16",stop:"2020-11-22"},13:{start:"2020-11-23",stop:"2020-11-29"},14:{start:"2020-11-30",stop:"2020-12-06"},15:{start:"2020-12-07",stop:"2020-12-13"},exam:{start:"2020-12-07",stop:"2020-12-13"}},2207:{0:{start:"2020-11-23",stop:"2020-11-29"},1:{start:"2020-11-30",stop:"2020-12-06"},2:{start:"2020-12-07",stop:"2020-12-13"},3:{start:"2020-12-14",stop:"2020-12-20"},4:{start:"2020-12-21",stop:"2020-12-27"},5:{start:"2020-12-28",stop:"2021-01-03"},6:{start:"2021-01-04",stop:"2021-01-10"},7:{start:"2021-01-11",stop:"2021-01-17"},8:{start:"2021-01-18",stop:"2021-01-24"},9:{start:"2021-01-25",stop:"2021-01-31"},10:{start:"2021-02-01",stop:"2021-02-07"},11:{start:"2021-02-08",stop:"2021-02-14"},12:{start:"2021-02-15",stop:"2021-02-21"},13:{start:"2021-02-22",stop:"2021-02-28"},14:{start:"2021-03-01",stop:"2021-03-07"},15:{start:"2021-03-08",stop:"2021-03-14"},exam:{start:"2021-03-01",stop:"2021-03-07"}},3208:{0:{start:"2020-10-26",stop:"2020-11-01"},1:{start:"2020-11-02",stop:"2020-11-08"},2:{start:"2020-11-09",stop:"2020-11-15"},3:{start:"2020-11-16",stop:"2020-11-22"},4:{start:"2020-11-23",stop:"2020-11-29"},5:{start:"2020-11-30",stop:"2020-12-06"},6:{start:"2020-12-07",stop:"2020-12-13"},7:{start:"2020-12-14",stop:"2020-12-20"},8:{start:"2021-01-04",stop:"2021-01-10"},9:{start:"2021-01-11",stop:"2021-01-17"},10:{start:"2021-01-18",stop:"2021-01-24"},11:{start:"2021-01-25",stop:"2021-01-31"},12:{start:"2021-02-01",stop:"2021-02-07"},13:{start:"2021-02-08",stop:"2021-02-14"},exam:{start:"2021-02-08",stop:"2021-02-20"}},3205:{0:{start:"2020-07-06",stop:"2020-07-12"},1:{start:"2020-07-13",stop:"2020-07-19"},2:{start:"2020-07-20",stop:"2020-08-26"},3:{start:"2020-07-27",stop:"2020-08-02"},4:{start:"2020-08-03",stop:"2020-08-16"},5:{start:"2020-08-17",stop:"2020-08-23"},6:{start:"2020-08-24",stop:"2020-08-30"},7:{start:"2020-08-31",stop:"2020-09-06"},8:{start:"2020-09-07",stop:"2020-09-13"},9:{start:"2020-09-14",stop:"2020-09-20"},10:{start:"2020-09-21",stop:"2020-09-27"},11:{start:"2020-09-28",stop:"2020-10-04"},12:{start:"2020-10-05",stop:"2020-10-11"},13:{start:"2020-10-12",stop:"2020-10-18"},14:{start:"2020-10-19",stop:"2020-10-25"},15:{start:"2020-10-27",stop:"2020-11-01"},exam:{start:"2020-10-12",stop:"2020-10-18"}},3201:{0:{start:"2020-02-17",stop:"2020-02-23"},1:{start:"2020-02-24",stop:"2020-03-01"},2:{start:"2020-03-02",stop:"2020-03-08"},3:{start:"2020-03-09",stop:"2020-03-15"},4:{start:"2020-03-16",stop:"2020-03-22"},5:{start:"2020-03-23",stop:"2020-03-29"},6:{start:"2020-03-30",stop:"2020-04-05"},7:{start:"2020-04-13",stop:"2020-04-19"},8:{start:"2020-04-20",stop:"2020-04-26"},9:{start:"2020-04-27",stop:"2020-05-03"},10:{start:"2020-05-04",stop:"2020-05-10"},11:{start:"2020-05-11",stop:"2020-05-17"},12:{start:"2020-05-18",stop:"2020-05-24"},13:{start:"2020-05-25",stop:"2020-05-31"},exam:{start:"2020-06-01",stop:"2020-06-07"}},3198:{0:{start:"2019-10-21",stop:"2019-10-27"},1:{start:"2019-10-28",stop:"2019-11-03"},2:{start:"2019-11-04",stop:"2019-11-10"},3:{start:"2019-11-11",stop:"2019-11-17"},4:{start:"2019-11-18",stop:"2019-11-24"},5:{start:"2019-11-25",stop:"2019-12-1"},6:{start:"2019-12-02",stop:"2019-12-08"},7:{start:"2019-12-09",stop:"2019-12-15"},8:{start:"2019-12-16",stop:"2019-12-22"},9:{start:"2020-01-06",stop:"2020-01-12"},10:{start:"2020-01-13",stop:"2020-01-19"},11:{start:"2020-01-20",stop:"2020-01-26"},12:{start:"2020-01-27",stop:"2020-02-02"},13:{start:"2020-02-03",stop:"2020-02-09"},exam:{start:"2020-02-06",stop:"2020-02-15"}},2197:{0:{start:"2019-11-18",stop:"2019-11-24"},1:{start:"2019-11-25",stop:"2019-12-01"},2:{start:"2019-12-02",stop:"2019-12-08"},3:{start:"2019-12-09",stop:"2019-12-15"},4:{start:"2019-12-16",stop:"2019-12-22"},5:{start:"2019-12-23",stop:"2019-09-29"},6:{start:"2019-12-30",stop:"2020-01-05"},7:{start:"2020-01-06",stop:"2020-01-12"},8:{start:"2020-01-13",stop:"2020-01-19"},9:{start:"2020-01-20",stop:"2020-01-26"},10:{start:"2020-01-27",stop:"2020-02-02"},11:{start:"2020-02-03",stop:"2020-02-09"},12:{start:"2020-02-10",stop:"2020-02-16"},13:{start:"2019-02-17",stop:"2020-02-23"},14:{start:"2020-02-24",stop:"2020-03-01"},15:{start:"2020-03-02",stop:"2020-03-08"}},2195:{0:{start:"2019-08-19",stop:"2019-09-25"},1:{start:"2019-08-26",stop:"2019-09-01"},2:{start:"2019-09-02",stop:"2019-09-18"},3:{start:"2019-09-09",stop:"2019-09-15"},4:{start:"2019-09-16",stop:"2019-09-22"},5:{start:"2019-09-23",stop:"2019-09-29"},6:{start:"2019-09-30",stop:"2019-10-06"},7:{start:"2019-10-07",stop:"2019-10-13"},8:{start:"2019-10-14",stop:"2019-08-20"},9:{start:"2019-10-21",stop:"2019-10-27"},10:{start:"2019-10-28",stop:"2019-11-03"},11:{start:"2019-11-04",stop:"2019-11-10"},12:{start:"2019-11-11",stop:"2019-11-17"},13:{start:"2019-11-18",stop:"2019-11-24"},14:{start:"2019-11-25",stop:"2019-12-01"},15:{start:"2019-10-07",stop:"2019-10-13"}},3195:{0:{start:"2019-07-01",stop:"2019-07-07"},1:{start:"2019-07-08",stop:"2019-07-14"},2:{start:"2019-07-15",stop:"2019-07-21"},3:{start:"2019-07-22",stop:"2019-07-28"},4:{start:"2019-07-29",stop:"2019-08-04"},5:{start:"2019-08-05",stop:"2019-08-11"},6:{start:"2019-08-19",stop:"2019-08-25"},7:{start:"2019-08-26",stop:"2019-09-01"},8:{start:"2019-09-02",stop:"2019-09-08"},9:{start:"2019-09-09",stop:"2019-09-15"},10:{start:"2019-09-16",stop:"2019-09-22"},11:{start:"2019-09-23",stop:"2019-09-29"},12:{start:"2019-09-30",stop:"2019-10-06"},13:{start:"2019-10-07",stop:"2019-10-13"},14:{start:"2019-10-14",stop:"2019-10-20"},15:{start:"2019-10-21",stop:"2019-10-27"},exam:{start:"2019-10-10",stop:"2019-10-19"}},3191:{0:{start:"2019-02-18",stop:"2019-02-24"},1:{start:"2019-02-25",stop:"2019-03-03"},2:{start:"2019-03-04",stop:"2019-03-10"},3:{start:"2019-03-11",stop:"2019-03-17"},4:{start:"2019-03-18",stop:"2019-03-24"},5:{start:"2019-03-25",stop:"2019-03-31"},6:{start:"2019-04-01",stop:"2019-04-07"},7:{start:"2019-04-08",stop:"2019-04-14"},8:{start:"2019-04-22",stop:"2019-04-28"},9:{start:"2019-04-29",stop:"2019-05-05"},10:{start:"2019-05-06",stop:"2019-05-12"},11:{start:"2019-05-13",stop:"2019-05-19"},12:{start:"2019-05-20",stop:"2019-05-26"},13:{start:"2019-05-27",stop:"2019-06-02"},14:{start:"2019-06-03",stop:"2019-06-09"},15:{start:"2019-06-10",stop:"2019-06-17"},exam:{start:"2019-05-30",stop:"2019-06-08"}}};function bt(t,e,o){const n=t.slice();return n[34]=e[o],n}function vt(t,e,o){const n=t.slice();return n[37]=e[o],n}function yt(t,e,o){const n=t.slice();return n[34]=e[o],n}function wt(t,e,o){const n=t.slice();return n[37]=e[o],n}function xt(t){let e,o;return{c(){e=v("input"),S(e,"type","text"),S(e,"id",o="cc-module-config-"+t[0]+"-date-label"),L(e,"width","10rem"),e.value="",S(e,"class","svelte-pfzwkh")},m(t,o){m(t,e,o)},p(t,n){17&n[0]&&o!==(o="cc-module-config-"+t[0]+"-date-label")&&S(e,"id",o)},d(t){t&&g(e)}}}function kt(t){let e,o,r,i;return{c(){e=v("input"),S(e,"type","text"),S(e,"id",o="cc-module-config-"+t[0]+"-date-label"),L(e,"width","10rem"),S(e,"class","svelte-pfzwkh")},m(o,n){m(o,e,n),O(e,t[1].MODULES[t[0]].date.label),r||(i=[k(e,"keydown",C(t[13])),k(e,"input",t[14])],r=!0)},p(t,n){17&n[0]&&o!==(o="cc-module-config-"+t[0]+"-date-label")&&S(e,"id",o),19&n[0]&&e.value!==t[1].MODULES[t[0]].date.label&&O(e,t[1].MODULES[t[0]].date.label)},d(t){t&&g(e),r=!1,n(i)}}}function Ct(e){let o,n,r=e[37]+"";return{c(){o=v("option"),n=y(r),o.__value=e[37],o.value=o.__value},m(t,e){m(t,o,e),f(o,n)},p:t,d(t){t&&g(o)}}}function St(e){let o,n,r=e[34]+"";return{c(){o=v("option"),n=y(r),o.__value=e[34].toString(),o.value=o.__value},m(t,e){m(t,o,e),f(o,n)},p:t,d(t){t&&g(o)}}}function Et(e){let o,n,r=e[37]+"";return{c(){o=v("option"),n=y(r),o.__value=e[37],o.value=o.__value},m(t,e){m(t,o,e),f(o,n)},p:t,d(t){t&&g(o)}}}function _t(e){let o,n,r=e[34]+"";return{c(){o=v("option"),n=y(r),o.__value=e[34].toString(),o.value=o.__value},m(t,e){m(t,o,e),f(o,n)},p:t,d(t){t&&g(o)}}}function Ot(e){let o,r,i,s,a,l,c,d,u,h,p,x,$,M,D,A,I,P,N,U,H,q,z,R,j,B,F,W,G,K,X,J,Y,Q,Z,tt,et,ot,nt,rt,it,st,at,lt,ct,dt,ut,ht,pt,ft,mt,gt,Ot,Lt,Tt,$t,Mt,Dt,At,It,Pt,Nt,Ut,Ht,qt,zt,Rt,jt,Bt,Ft,Vt,Wt,Gt,Kt,Xt,Jt,Yt,Qt,Zt,te,ee,oe,ne,re,ie,se,ae,le,ce,de,ue,he,pe,fe,me,ge,be,ve,ye,we,xe,ke,Ce,Se,Ee,_e,Oe,Le,Te,$e,Me,De,Ae,Ie,Pe,Ne,Ue,He,qe,ze,Re,je,Be,Fe,Ve,We,Ge,Ke,Xe,Je,Ye,Qe,Ze,to,eo,oo,no,ro,io,so,ao,lo,co,uo,ho,po,fo,mo,go,bo,vo,yo,wo,xo,ko,Co,So,Eo,_o,Oo,Lo,To,$o,Mo,Do,Ao,Io,Po,No,Uo,Ho,qo,zo,Ro,jo,Bo=e[8].studyPeriod.tooltip+"",Fo=e[8].calculatedDate.tooltip+"",Vo=e[6](e[1].MODULES[e[0]].date)+"",Wo=e[8].dateStart.tooltip+"",Go=e[8].hideDate.tooltip+"",Ko=e[8].hideDate.tooltip+"",Xo=e[8].hideDate.tooltip+"",Jo=e[8].hideDate.tooltip+"",Yo=e[8].calendarDate.tooltip+"",Qo=e[8].stopDate.tooltip+"",Zo=e[8].calendarDate.tooltip+"";function tn(t,e){return 3&e[0]&&(st=null),null==st&&(st=!(!t[1].MODULES[t[0]].hasOwnProperty("date")||!t[1].MODULES[t[0]].date.hasOwnProperty("label"))),st?kt:xt}let en=tn(e,[-1,-1]),on=en(e),nn=e[4],rn=[];for(let t=0;t<nn.length;t+=1)rn[t]=Ct(wt(e,nn,t));let sn=e[5],an=[];for(let t=0;t<sn.length;t+=1)an[t]=St(yt(e,sn,t));let ln=e[4],cn=[];for(let t=0;t<ln.length;t+=1)cn[t]=Et(vt(e,ln,t));let dn=e[5],un=[];for(let t=0;t<dn.length;t+=1)un[t]=_t(bt(e,dn,t));return{c(){o=v("div"),r=v("p"),i=v("strong"),i.textContent="Current Term:",s=w(),a=v("sl-tooltip"),l=v("div"),c=w(),d=v("a"),u=v("i"),h=w(),p=y(e[3]),x=w(),$=v("div"),M=v("p"),D=v("strong"),D.textContent="Current Date:",A=w(),I=v("sl-tooltip"),P=v("div"),N=w(),U=v("a"),H=v("i"),q=w(),z=y(Vo),R=w(),j=v("div"),B=v("div"),F=v("div"),W=y("Start date\r\n      "),G=v("sl-tooltip"),K=v("div"),X=w(),J=v("a"),Y=v("i"),Q=w(),Z=v("div"),tt=v("span"),et=v("label"),ot=y("Date label"),rt=w(),it=v("span"),on.c(),at=w(),lt=v("div"),ct=v("span"),dt=v("label"),ut=y("Day of week"),pt=w(),ft=v("sl-tooltip"),mt=v("div"),gt=w(),Ot=v("input"),Lt=w(),Tt=v("span"),$t=v("select"),Mt=v("option"),Mt.textContent="Not chosen";for(let t=0;t<rn.length;t+=1)rn[t].c();At=w(),It=v("div"),Pt=v("span"),Nt=v("label"),Ut=y("Week"),qt=w(),zt=v("sl-tooltip"),Rt=v("div"),jt=w(),Bt=v("input"),Ft=w(),Vt=v("span"),Wt=v("select"),Gt=v("option"),Gt.textContent="Not chosen";for(let t=0;t<an.length;t+=1)an[t].c();Xt=w(),Jt=v("div"),Yt=v("span"),Qt=v("label"),Zt=y("Time"),ee=w(),oe=v("sl-tooltip"),ne=v("div"),re=w(),ie=v("input"),se=w(),ae=v("span"),le=v("style"),le.textContent="input[readonly] {\r\n            display: none;\r\n          }",ce=w(),de=v("aeon-datepicker"),ue=v("input"),pe=w(),fe=v("div"),me=v("span"),ge=v("label"),be=y("Date"),ye=w(),we=v("sl-tooltip"),xe=v("div"),ke=w(),Ce=v("input"),Se=w(),Ee=v("span"),_e=v("sl-tooltip"),Oe=v("div"),Le=w(),Te=v("input"),Ae=w(),Ie=v("div"),Pe=v("div"),Ne=y("Stop date\r\n      "),Ue=v("sl-tooltip"),He=v("div"),qe=w(),ze=v("a"),Re=v("i"),je=w(),Be=v("div"),Fe=w(),Ve=v("div"),We=v("span"),Ge=v("label"),Ke=y("Day of week"),Je=w(),Ye=v("span"),Qe=v("select"),Ze=v("option"),Ze.textContent="Not chosen";for(let t=0;t<cn.length;t+=1)cn[t].c();eo=w(),oo=v("div"),no=v("span"),ro=v("label"),io=y("Week"),ao=w(),lo=v("span"),co=v("select"),uo=v("option"),uo.textContent="Not chosen";for(let t=0;t<un.length;t+=1)un[t].c();po=w(),fo=v("div"),mo=v("span"),go=v("label"),bo=y("Time"),yo=w(),wo=v("span"),xo=v("style"),xo.textContent="input[readonly] {\r\n            display: none;\r\n          }",ko=w(),Co=v("aeon-datepicker"),So=v("input"),_o=w(),Oo=v("div"),Lo=v("span"),To=v("label"),$o=y("Date"),Do=w(),Ao=v("span"),Io=v("sl-tooltip"),Po=v("div"),No=w(),Uo=v("input"),S(l,"slot","content"),S(u,"class","icon-question cc-module-icon"),S(d,"target","_blank"),S(d,"rel","noreferrer"),S(d,"href",e[8].studyPeriod.href),E(a,"class","cc-about-module-studyPeriod svelte-pfzwkh"),S(o,"class","cc-current-studyPeriod svelte-pfzwkh"),S(P,"slot","content"),S(H,"class","icon-question cc-module-icon"),S(U,"href",e[8].calculatedDate.href),S(U,"target","_blank"),S(U,"rel","noreferrer"),E(I,"class","svelte-pfzwkh"),S($,"class","cc-calculated-date svelte-pfzwkh"),S(K,"slot","content"),S(Y,"class","icon-question cc-module-icon"),S(J,"target","_blank"),S(J,"rel","noreferrer"),S(J,"href",e[8].dateStart.href),E(G,"id","cc-about-module-date-start"),E(G,"class","svelte-pfzwkh"),S(F,"class","cc-date-heading svelte-pfzwkh"),S(et,"for",nt="cc-module-config-"+e[0]+"-date-label"),S(tt,"class","cc-module-label svelte-pfzwkh"),S(it,"class","cc-module-input svelte-pfzwkh"),S(Z,"class","cc-module-form svelte-pfzwkh"),S(dt,"for",ht="cc-module-config-"+e[0]+"-day"),S(mt,"slot","content"),S(Ot,"type","checkbox"),E(ft,"id","cc-about-module-date-stop"),E(ft,"class","svelte-pfzwkh"),S(ct,"class","cc-module-label svelte-pfzwkh"),Mt.__value="",Mt.value=Mt.__value,S($t,"id",Dt="cc-module-config-"+e[0]+"-day"),S($t,"class","svelte-pfzwkh"),void 0===e[1].MODULES[e[0]].date.day&&V((()=>e[17].call($t))),S(Tt,"class","cc-module-input svelte-pfzwkh"),S(lt,"class","cc-module-form svelte-pfzwkh"),S(Nt,"for",Ht="cc-module-config-"+e[0]+"-week"),S(Rt,"slot","content"),S(Bt,"type","checkbox"),E(zt,"id","cc-about-module-date-stop"),E(zt,"class","svelte-pfzwkh"),S(Pt,"class","cc-module-label svelte-pfzwkh"),Gt.__value="",Gt.value=Gt.__value,S(Wt,"id",Kt="cc-module-config-"+e[0]+"-week"),S(Wt,"class","svelte-pfzwkh"),void 0===e[1].MODULES[e[0]].date.week&&V((()=>e[20].call(Wt))),S(Vt,"class","cc-module-input svelte-pfzwkh"),S(It,"class","cc-module-form svelte-pfzwkh"),S(Qt,"for",te="cc-module-config-"+e[0]+"-time"),S(ne,"slot","content"),S(ie,"type","checkbox"),E(oe,"id","cc-about-module-date-stop"),E(oe,"class","svelte-pfzwkh"),S(Yt,"class","cc-module-label svelte-pfzwkh"),S(ue,"type","time"),S(ue,"id",he="cc-module-config-"+e[0]+"-time"),S(ue,"name","time"),S(ue,"class","svelte-pfzwkh"),E(de,"local","en-au"),S(ae,"class","cc-module-input svelte-pfzwkh"),S(Jt,"class","cc-module-form svelte-pfzwkh"),S(ge,"for",ve="cc-module-config-"+e[0]+"-calendar-date"),S(xe,"slot","content"),S(Ce,"type","checkbox"),E(we,"id","cc-about-module-date-stop"),E(we,"class","svelte-pfzwkh"),S(me,"class","cc-module-label svelte-pfzwkh"),S(Oe,"slot","content"),S(Te,"id",$e="cc-module-config-"+e[0]+"-calendar-date"),S(Te,"type","text"),Te.disabled=!0,Te.value=Me=e[1].MODULES[e[0]].date.date+" "+e[1].MODULES[e[0]].date.month,S(Te,"class","svelte-pfzwkh"),E(_e,"class","cc-about-module-studyPeriod svelte-pfzwkh"),S(Ee,"class","cc-module-input svelte-pfzwkh"),S(fe,"class","cc-module-form svelte-pfzwkh"),S(B,"class","cc-date-col svelte-pfzwkh"),S(B,"id",De="cc-module-config-"+e[0]+"-date-start"),S(He,"slot","content"),S(Re,"class","icon-question cc-module-icon"),S(ze,"target","_blank"),S(ze,"rel","noreferrer"),S(ze,"href",e[8].stopDate.href),E(Ue,"id","cc-about-module-date-stop"),E(Ue,"class","svelte-pfzwkh"),S(Pe,"class","cc-date-heading svelte-pfzwkh"),S(Be,"class","cc-module-form svelte-pfzwkh"),L(Be,"height","2.375rem"),S(Ge,"for",Xe="cc-module-config-"+e[0]+"-day-to"),S(We,"class","cc-module-label svelte-pfzwkh"),Ze.__value="",Ze.value=Ze.__value,S(Qe,"id",to="cc-module-config-"+e[0]+"-day-to"),S(Qe,"class","svelte-pfzwkh"),void 0===e[1].MODULES[e[0]].date.to.day&&V((()=>e[26].call(Qe))),S(Ye,"class","cc-module-input svelte-pfzwkh"),S(Ve,"class","cc-module-form svelte-pfzwkh"),S(ro,"for",so="cc-module-config-"+e[0]+"-week-to"),S(no,"class","cc-module-label svelte-pfzwkh"),uo.__value="",uo.value=uo.__value,S(co,"id",ho="cc-module-config-"+e[0]+"-week-to"),S(co,"class","svelte-pfzwkh"),void 0===e[1].MODULES[e[0]].date.to.week&&V((()=>e[27].call(co))),S(lo,"class","cc-module-input svelte-pfzwkh"),S(oo,"class","cc-module-form svelte-pfzwkh"),S(go,"for",vo="cc-module-config-"+e[0]+"-time-to"),S(mo,"class","cc-module-label svelte-pfzwkh"),S(So,"type","time"),S(So,"id",Eo="cc-module-config-"+e[0]+"-time-to"),S(So,"name","time"),S(So,"class","svelte-pfzwkh"),E(Co,"local","en-au"),S(wo,"class","cc-module-input svelte-pfzwkh"),S(fo,"class","cc-module-form svelte-pfzwkh"),S(To,"for",Mo="cc-module-config-"+e[0]+"-calendar-date-to"),S(Lo,"class","cc-module-label svelte-pfzwkh"),S(Po,"slot","content"),S(Uo,"id",Ho="cc-module-config-"+e[0]+"-calendar-date-to"),S(Uo,"type","text"),Uo.disabled=!0,Uo.value=qo=e[1].MODULES[e[0]].date.to.date+" "+e[1].MODULES[e[0]].date.to.month,S(Uo,"class","svelte-pfzwkh"),E(Io,"class","cc-about-module-studyPeriod svelte-pfzwkh"),S(Ao,"class","cc-module-input svelte-pfzwkh"),S(Oo,"class","cc-module-form svelte-pfzwkh"),S(Ie,"class","cc-date-col svelte-pfzwkh"),S(Ie,"id",zo="cc-module-config-"+e[0]+"-date-stop"),S(j,"class","cc-date-row svelte-pfzwkh")},m(t,n){m(t,o,n),f(o,r),f(r,i),f(r,s),f(r,a),f(a,l),l.innerHTML=Bo,f(a,c),f(a,d),f(d,u),f(r,h),f(r,p),m(t,x,n),m(t,$,n),f($,M),f(M,D),f(M,A),f(M,I),f(I,P),P.innerHTML=Fo,f(I,N),f(I,U),f(U,H),f(M,q),f(M,z),m(t,R,n),m(t,j,n),f(j,B),f(B,F),f(F,W),f(F,G),f(G,K),K.innerHTML=Wo,f(G,X),f(G,J),f(J,Y),f(B,Q),f(B,Z),f(Z,tt),f(tt,et),f(et,ot),f(Z,rt),f(Z,it),on.m(it,null),f(B,at),f(B,lt),f(lt,ct),f(ct,dt),f(dt,ut),f(ct,pt),f(ct,ft),f(ft,mt),mt.innerHTML=Go,f(ft,gt),f(ft,Ot),Ot.checked=e[1].MODULES[e[0]].dateHide.day,f(lt,Lt),f(lt,Tt),f(Tt,$t),f($t,Mt);for(let t=0;t<rn.length;t+=1)rn[t].m($t,null);T($t,e[1].MODULES[e[0]].date.day),f(B,At),f(B,It),f(It,Pt),f(Pt,Nt),f(Nt,Ut),f(Pt,qt),f(Pt,zt),f(zt,Rt),Rt.innerHTML=Ko,f(zt,jt),f(zt,Bt),Bt.checked=e[1].MODULES[e[0]].dateHide.week,f(It,Ft),f(It,Vt),f(Vt,Wt),f(Wt,Gt);for(let t=0;t<an.length;t+=1)an[t].m(Wt,null);T(Wt,e[1].MODULES[e[0]].date.week),f(B,Xt),f(B,Jt),f(Jt,Yt),f(Yt,Qt),f(Qt,Zt),f(Yt,ee),f(Yt,oe),f(oe,ne),ne.innerHTML=Xo,f(oe,re),f(oe,ie),ie.checked=e[1].MODULES[e[0]].dateHide.time,f(Jt,se),f(Jt,ae),f(ae,le),f(ae,ce),f(ae,de),f(de,ue),O(ue,e[1].MODULES[e[0]].date.time),f(B,pe),f(B,fe),f(fe,me),f(me,ge),f(ge,be),f(me,ye),f(me,we),f(we,xe),xe.innerHTML=Jo,f(we,ke),f(we,Ce),Ce.checked=e[1].MODULES[e[0]].dateHide.calendarDate,f(fe,Se),f(fe,Ee),f(Ee,_e),f(_e,Oe),Oe.innerHTML=Yo,f(_e,Le),f(_e,Te),f(j,Ae),f(j,Ie),f(Ie,Pe),f(Pe,Ne),f(Pe,Ue),f(Ue,He),He.innerHTML=Qo,f(Ue,qe),f(Ue,ze),f(ze,Re),f(Ie,je),f(Ie,Be),f(Ie,Fe),f(Ie,Ve),f(Ve,We),f(We,Ge),f(Ge,Ke),f(Ve,Je),f(Ve,Ye),f(Ye,Qe),f(Qe,Ze);for(let t=0;t<cn.length;t+=1)cn[t].m(Qe,null);T(Qe,e[1].MODULES[e[0]].date.to.day),f(Ie,eo),f(Ie,oo),f(oo,no),f(no,ro),f(ro,io),f(oo,ao),f(oo,lo),f(lo,co),f(co,uo);for(let t=0;t<un.length;t+=1)un[t].m(co,null);T(co,e[1].MODULES[e[0]].date.to.week),f(Ie,po),f(Ie,fo),f(fo,mo),f(mo,go),f(go,bo),f(fo,yo),f(fo,wo),f(wo,xo),f(wo,ko),f(wo,Co),f(Co,So),O(So,e[1].MODULES[e[0]].date.to.time),f(Ie,_o),f(Ie,Oo),f(Oo,Lo),f(Lo,To),f(To,$o),f(Oo,Do),f(Oo,Ao),f(Ao,Io),f(Io,Po),Po.innerHTML=Zo,f(Io,No),f(Io,Uo),Ro||(jo=[k(Ot,"keydown",C(e[12])),k(Ot,"change",e[15]),k(Ot,"click",e[16]),k($t,"change",e[17]),k($t,"change",e[7]),k(Bt,"keydown",C(e[11])),k(Bt,"change",e[18]),k(Bt,"click",e[19]),k(Wt,"change",e[20]),k(Wt,"change",e[7]),k(ie,"keydown",C(e[10])),k(ie,"change",e[21]),k(ie,"click",e[22]),k(ue,"input",e[23]),k(ue,"change",e[7]),k(Ce,"keydown",C(e[9])),k(Ce,"change",e[24]),k(Ce,"click",e[25]),k(Qe,"change",e[26]),k(Qe,"change",e[7]),k(co,"change",e[27]),k(co,"change",e[7]),k(So,"input",e[28]),k(So,"change",e[7])],Ro=!0)},p(t,e){if(3&e[0]&&Vo!==(Vo=t[6](t[1].MODULES[t[0]].date)+"")&&_(z,Vo),17&e[0]&&nt!==(nt="cc-module-config-"+t[0]+"-date-label")&&S(et,"for",nt),en===(en=tn(t,e))&&on?on.p(t,e):(on.d(1),on=en(t),on&&(on.c(),on.m(it,null))),17&e[0]&&ht!==(ht="cc-module-config-"+t[0]+"-day")&&S(dt,"for",ht),19&e[0]&&(Ot.checked=t[1].MODULES[t[0]].dateHide.day),16&e[0]){let o;for(nn=t[4],o=0;o<nn.length;o+=1){const n=wt(t,nn,o);rn[o]?rn[o].p(n,e):(rn[o]=Ct(n),rn[o].c(),rn[o].m($t,null))}for(;o<rn.length;o+=1)rn[o].d(1);rn.length=nn.length}if(17&e[0]&&Dt!==(Dt="cc-module-config-"+t[0]+"-day")&&S($t,"id",Dt),19&e[0]&&T($t,t[1].MODULES[t[0]].date.day),17&e[0]&&Ht!==(Ht="cc-module-config-"+t[0]+"-week")&&S(Nt,"for",Ht),19&e[0]&&(Bt.checked=t[1].MODULES[t[0]].dateHide.week),32&e[0]){let o;for(sn=t[5],o=0;o<sn.length;o+=1){const n=yt(t,sn,o);an[o]?an[o].p(n,e):(an[o]=St(n),an[o].c(),an[o].m(Wt,null))}for(;o<an.length;o+=1)an[o].d(1);an.length=sn.length}if(17&e[0]&&Kt!==(Kt="cc-module-config-"+t[0]+"-week")&&S(Wt,"id",Kt),19&e[0]&&T(Wt,t[1].MODULES[t[0]].date.week),17&e[0]&&te!==(te="cc-module-config-"+t[0]+"-time")&&S(Qt,"for",te),19&e[0]&&(ie.checked=t[1].MODULES[t[0]].dateHide.time),17&e[0]&&he!==(he="cc-module-config-"+t[0]+"-time")&&S(ue,"id",he),19&e[0]&&O(ue,t[1].MODULES[t[0]].date.time),17&e[0]&&ve!==(ve="cc-module-config-"+t[0]+"-calendar-date")&&S(ge,"for",ve),19&e[0]&&(Ce.checked=t[1].MODULES[t[0]].dateHide.calendarDate),17&e[0]&&$e!==($e="cc-module-config-"+t[0]+"-calendar-date")&&S(Te,"id",$e),19&e[0]&&Me!==(Me=t[1].MODULES[t[0]].date.date+" "+t[1].MODULES[t[0]].date.month)&&Te.value!==Me&&(Te.value=Me),17&e[0]&&De!==(De="cc-module-config-"+t[0]+"-date-start")&&S(B,"id",De),17&e[0]&&Xe!==(Xe="cc-module-config-"+t[0]+"-day-to")&&S(Ge,"for",Xe),16&e[0]){let o;for(ln=t[4],o=0;o<ln.length;o+=1){const n=vt(t,ln,o);cn[o]?cn[o].p(n,e):(cn[o]=Et(n),cn[o].c(),cn[o].m(Qe,null))}for(;o<cn.length;o+=1)cn[o].d(1);cn.length=ln.length}if(17&e[0]&&to!==(to="cc-module-config-"+t[0]+"-day-to")&&S(Qe,"id",to),19&e[0]&&T(Qe,t[1].MODULES[t[0]].date.to.day),17&e[0]&&so!==(so="cc-module-config-"+t[0]+"-week-to")&&S(ro,"for",so),32&e[0]){let o;for(dn=t[5],o=0;o<dn.length;o+=1){const n=bt(t,dn,o);un[o]?un[o].p(n,e):(un[o]=_t(n),un[o].c(),un[o].m(co,null))}for(;o<un.length;o+=1)un[o].d(1);un.length=dn.length}17&e[0]&&ho!==(ho="cc-module-config-"+t[0]+"-week-to")&&S(co,"id",ho),19&e[0]&&T(co,t[1].MODULES[t[0]].date.to.week),17&e[0]&&vo!==(vo="cc-module-config-"+t[0]+"-time-to")&&S(go,"for",vo),17&e[0]&&Eo!==(Eo="cc-module-config-"+t[0]+"-time-to")&&S(So,"id",Eo),19&e[0]&&O(So,t[1].MODULES[t[0]].date.to.time),17&e[0]&&Mo!==(Mo="cc-module-config-"+t[0]+"-calendar-date-to")&&S(To,"for",Mo),17&e[0]&&Ho!==(Ho="cc-module-config-"+t[0]+"-calendar-date-to")&&S(Uo,"id",Ho),19&e[0]&&qo!==(qo=t[1].MODULES[t[0]].date.to.date+" "+t[1].MODULES[t[0]].date.to.month)&&Uo.value!==qo&&(Uo.value=qo),17&e[0]&&zo!==(zo="cc-module-config-"+t[0]+"-date-stop")&&S(Ie,"id",zo)},i:t,o:t,d(t){t&&g(o),t&&g(x),t&&g($),t&&g(R),t&&g(j),on.d(),b(rn,t),b(an,t),b(cn,t),b(un,t),Ro=!1,n(jo)}}}function Lt(t,e,o){let n,r;u(t,ca,(t=>o(1,n=t))),u(t,ua,(t=>o(2,r=t)));let{moduleId:i}=e,s=new ht(r.studyPeriod),a=`${s.getHumanReadableStudyPeriod()} (${s.getStudyPeriod()})`;d(n.MODULES[i].date);let l=n.MODULES[i].date;const c=s.getDaysOfWeek();function d(t){if(""===t.week)return"No date set";let e=h(t);return t.hasOwnProperty("to")&&""!==t.to.week&&(e=`${e} to ${h(t.to)}`),e}function h(t){let e={};e=""===t.day?s.getDate(t.week):s.getDate(t.week,!1,t.day);let o=`${e.date} ${e.month} ${e.year}`;return e.hasOwnProperty("day")&&(o=`${e.day} ${o}`),""!==t.time&&(o=`${t.time} ${o}`),t.hasOwnProperty("label")&&""!==t.label&&(o=`${t.label} ${o}`),o}const f={studyPeriod:{tooltip:"The term is automatically identified from the course site. The academic\n\t\tcalendar for this term will be used to translate the generic date <em>Monday Week 1</em> into a calendar date.",href:"https://djplaner.github.io/canvas-collections/reference/objects/overview/#study-period"},dateStart:{tooltip:'Specify a single date, or becomes the start date in a date range when used \n\t\twith "stop" date.',href:"https://djplaner.github.io/canvas-collections/reference/objects/overview/#start-date"},stopDate:{tooltip:"Specify the 'stop' date for a date range. Date is relative to the specific study period.",href:"https://djplaner.github.io/canvas-collections/reference/objects/overview/#stop-date"},calculatedDate:{tooltip:"Representation of the date as configured by <em>Start Date</em> and possible <em>Stop Date</em>.",href:"https://djplaner.github.io/canvas-collections/reference/objects/overview/#start-date"},hideDate:{tooltip:"Select to hide this portion of the date in the representation."},calendarDate:{tooltip:"<p>Calculated automatically based on the academic calendar and the current term.<p>\n        <p>Use the above to change.</p>"}};return t.$$set=t=>{"moduleId"in t&&o(0,i=t.moduleId)},[i,n,r,a,c,[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,"exam"],d,function(){!function(){let t={};t=""===n.MODULES[i].date.day?s.getDate(n.MODULES[i].date.week):s.getDate(n.MODULES[i].date.week,!1,n.MODULES[i].date.day);let e={};n.MODULES[i].date.hasOwnProperty("to")&&(e=""===n.MODULES[i].date.to.day?s.getDate(n.MODULES[i].date.to.week):s.getDate(n.MODULES[i].date.to.week,!1,n.MODULES[i].date.to.day));["date","month"].forEach((o=>{t[o]!==l[o]&&p(ca,n.MODULES[i].date[o]=t[o],n),e[o]!==l.to[o]&&p(ca,n.MODULES[i].date.to[o]=e[o],n)}))}(),p(ua,r.needToSaveCollections=!0,r)},f,function(e){H.call(this,t,e)},function(e){H.call(this,t,e)},function(e){H.call(this,t,e)},function(e){H.call(this,t,e)},function(e){H.call(this,t,e)},function(){n.MODULES[i].date.label=this.value,ca.set(n),o(4,c)},function(){n.MODULES[i].dateHide.day=this.checked,ca.set(n),o(4,c)},()=>{p(ua,r.needToSaveCollections=!0,r)},function(){n.MODULES[i].date.day=$(this),ca.set(n),o(4,c)},function(){n.MODULES[i].dateHide.week=this.checked,ca.set(n),o(4,c)},()=>{p(ua,r.needToSaveCollections=!0,r)},function(){n.MODULES[i].date.week=$(this),ca.set(n),o(4,c)},function(){n.MODULES[i].dateHide.time=this.checked,ca.set(n),o(4,c)},()=>{p(ua,r.needToSaveCollections=!0,r)},function(){n.MODULES[i].date.time=this.value,ca.set(n),o(4,c)},function(){n.MODULES[i].dateHide.calendarDate=this.checked,ca.set(n),o(4,c)},()=>{p(ua,r.needToSaveCollections=!0,r)},function(){n.MODULES[i].date.to.day=$(this),ca.set(n),o(4,c)},function(){n.MODULES[i].date.to.week=$(this),ca.set(n),o(4,c)},function(){n.MODULES[i].date.to.time=this.value,ca.set(n),o(4,c)}]}class Tt extends ct{constructor(t){super(),lt(this,t,Lt,Ot,i,{moduleId:0},null,[-1,-1])}}const $t=async t=>{const e=t;try{const t=await fetch(e),o=await t.json();return{status:t.status,res:t,body:o}}catch(t){console.error(`Could not fetch requested information: ${t}`)}};function Mt(t,e,o){if(void 0===t)return console.trace(),void alert("getPageName: pageName is undefined");if(""!==t){String.prototype.slugify=function(t="-"){return this.toString().normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim().replace("@","at").replace(/[^a-z0-9 ]/g,"").replace(/\s+/g,t)};const n=t.slugify(),r=`https://${document.location.hostname}/api/v1/courses/${e}/pages/${n}`;$t(r).then((e=>{o(t,e.body)}))}}var Dt="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function At(t){if(t.__esModule)return t;var e=Object.defineProperty({},"__esModule",{value:!0});return Object.keys(t).forEach((function(o){var n=Object.getOwnPropertyDescriptor(t,o);Object.defineProperty(e,o,n.get?n:{enumerable:!0,get:function(){return t[o]}})})),e}function It(t){var e={exports:{}};return t(e,e.exports),e.exports}var Pt=new Uint16Array('ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'.split("").map((function(t){return t.charCodeAt(0)}))),Nt=Object.defineProperty({default:Pt},"__esModule",{value:!0}),Ut=new Uint16Array("Ȁaglq\tɭ\0\0p;䀦os;䀧t;䀾t;䀼uot;䀢".split("").map((function(t){return t.charCodeAt(0)}))),Ht=Object.defineProperty({default:Ut},"__esModule",{value:!0}),qt=It((function(t,e){var o;Object.defineProperty(e,"__esModule",{value:!0}),e.replaceCodePoint=e.fromCodePoint=void 0;var n=new Map([[0,65533],[128,8364],[130,8218],[131,402],[132,8222],[133,8230],[134,8224],[135,8225],[136,710],[137,8240],[138,352],[139,8249],[140,338],[142,381],[145,8216],[146,8217],[147,8220],[148,8221],[149,8226],[150,8211],[151,8212],[152,732],[153,8482],[154,353],[155,8250],[156,339],[158,382],[159,376]]);function r(t){var e;return t>=55296&&t<=57343||t>1114111?65533:null!==(e=n.get(t))&&void 0!==e?e:t}e.fromCodePoint=null!==(o=String.fromCodePoint)&&void 0!==o?o:function(t){var e="";return t>65535&&(t-=65536,e+=String.fromCharCode(t>>>10&1023|55296),t=56320|1023&t),e+=String.fromCharCode(t)},e.replaceCodePoint=r,e.default=function(t){return(0,e.fromCodePoint)(r(t))}})),zt=It((function(t,e){var o=Dt&&Dt.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0}),e.decodeXML=e.decodeHTMLStrict=e.decodeHTML=e.determineBranch=e.BinTrieFlags=e.fromCodePoint=e.replaceCodePoint=e.decodeCodePoint=e.xmlDecodeTree=e.htmlDecodeTree=void 0;var n=o(Nt);e.htmlDecodeTree=n.default;var r=o(Ht);e.xmlDecodeTree=r.default;var i,s,a=o(qt);function l(t){return function(e,o){for(var n="",r=0,l=0;(l=e.indexOf("&",l))>=0;)if(n+=e.slice(r,l),r=l,l+=1,e.charCodeAt(l)!==i.NUM){for(var d=0,u=1,h=0,p=t[h];l<e.length&&!((h=c(t,p,h+1,e.charCodeAt(l)))<0);l++,u++){var f=(p=t[h])&s.VALUE_LENGTH;if(f){var m;if(o&&e.charCodeAt(l)!==i.SEMI||(d=h,u=0),0===(m=(f>>14)-1))break;h+=m}}if(0!==d)n+=1===(m=(t[d]&s.VALUE_LENGTH)>>14)?String.fromCharCode(t[d]&~s.VALUE_LENGTH):2===m?String.fromCharCode(t[d+1]):String.fromCharCode(t[d+1],t[d+2]),r=l-u+1}else{var g=l+1,b=10,v=e.charCodeAt(g);(v|i.To_LOWER_BIT)===i.LOWER_X&&(b=16,l+=1,g+=1);do{v=e.charCodeAt(++l)}while(v>=i.ZERO&&v<=i.NINE||16===b&&(v|i.To_LOWER_BIT)>=i.LOWER_A&&(v|i.To_LOWER_BIT)<=i.LOWER_F);if(g!==l){var y=e.substring(g,l),w=parseInt(y,b);if(e.charCodeAt(l)===i.SEMI)l+=1;else if(o)continue;n+=(0,a.default)(w),r=l}}return n+e.slice(r)}}function c(t,e,o,n){var r=(e&s.BRANCH_LENGTH)>>7,i=e&s.JUMP_TABLE;if(0===r)return 0!==i&&n===i?o:-1;if(i){var a=n-i;return a<0||a>=r?-1:t[o+a]-1}for(var l=o,c=l+r-1;l<=c;){var d=l+c>>>1,u=t[d];if(u<n)l=d+1;else{if(!(u>n))return t[d+r];c=d-1}}return-1}e.decodeCodePoint=a.default,Object.defineProperty(e,"replaceCodePoint",{enumerable:!0,get:function(){return qt.replaceCodePoint}}),Object.defineProperty(e,"fromCodePoint",{enumerable:!0,get:function(){return qt.fromCodePoint}}),function(t){t[t.NUM=35]="NUM",t[t.SEMI=59]="SEMI",t[t.ZERO=48]="ZERO",t[t.NINE=57]="NINE",t[t.LOWER_A=97]="LOWER_A",t[t.LOWER_F=102]="LOWER_F",t[t.LOWER_X=120]="LOWER_X",t[t.To_LOWER_BIT=32]="To_LOWER_BIT"}(i||(i={})),function(t){t[t.VALUE_LENGTH=49152]="VALUE_LENGTH",t[t.BRANCH_LENGTH=16256]="BRANCH_LENGTH",t[t.JUMP_TABLE=127]="JUMP_TABLE"}(s=e.BinTrieFlags||(e.BinTrieFlags={})),e.determineBranch=c;var d=l(n.default),u=l(r.default);e.decodeHTML=function(t){return d(t,!1)},e.decodeHTMLStrict=function(t){return d(t,!0)},e.decodeXML=function(t){return u(t,!0)}})),Rt=It((function(t,e){var o,n,r;function i(t){return t===o.Space||t===o.NewLine||t===o.Tab||t===o.FormFeed||t===o.CarriageReturn}function s(t){return t===o.Slash||t===o.Gt||i(t)}function a(t){return t>=o.Zero&&t<=o.Nine}Object.defineProperty(e,"__esModule",{value:!0}),e.QuoteType=void 0,function(t){t[t.Tab=9]="Tab",t[t.NewLine=10]="NewLine",t[t.FormFeed=12]="FormFeed",t[t.CarriageReturn=13]="CarriageReturn",t[t.Space=32]="Space",t[t.ExclamationMark=33]="ExclamationMark",t[t.Num=35]="Num",t[t.Amp=38]="Amp",t[t.SingleQuote=39]="SingleQuote",t[t.DoubleQuote=34]="DoubleQuote",t[t.Dash=45]="Dash",t[t.Slash=47]="Slash",t[t.Zero=48]="Zero",t[t.Nine=57]="Nine",t[t.Semi=59]="Semi",t[t.Lt=60]="Lt",t[t.Eq=61]="Eq",t[t.Gt=62]="Gt",t[t.Questionmark=63]="Questionmark",t[t.UpperA=65]="UpperA",t[t.LowerA=97]="LowerA",t[t.UpperF=70]="UpperF",t[t.LowerF=102]="LowerF",t[t.UpperZ=90]="UpperZ",t[t.LowerZ=122]="LowerZ",t[t.LowerX=120]="LowerX",t[t.OpeningSquareBracket=91]="OpeningSquareBracket"}(o||(o={})),function(t){t[t.Text=1]="Text",t[t.BeforeTagName=2]="BeforeTagName",t[t.InTagName=3]="InTagName",t[t.InSelfClosingTag=4]="InSelfClosingTag",t[t.BeforeClosingTagName=5]="BeforeClosingTagName",t[t.InClosingTagName=6]="InClosingTagName",t[t.AfterClosingTagName=7]="AfterClosingTagName",t[t.BeforeAttributeName=8]="BeforeAttributeName",t[t.InAttributeName=9]="InAttributeName",t[t.AfterAttributeName=10]="AfterAttributeName",t[t.BeforeAttributeValue=11]="BeforeAttributeValue",t[t.InAttributeValueDq=12]="InAttributeValueDq",t[t.InAttributeValueSq=13]="InAttributeValueSq",t[t.InAttributeValueNq=14]="InAttributeValueNq",t[t.BeforeDeclaration=15]="BeforeDeclaration",t[t.InDeclaration=16]="InDeclaration",t[t.InProcessingInstruction=17]="InProcessingInstruction",t[t.BeforeComment=18]="BeforeComment",t[t.CDATASequence=19]="CDATASequence",t[t.InSpecialComment=20]="InSpecialComment",t[t.InCommentLike=21]="InCommentLike",t[t.BeforeSpecialS=22]="BeforeSpecialS",t[t.SpecialStartSequence=23]="SpecialStartSequence",t[t.InSpecialTag=24]="InSpecialTag",t[t.BeforeEntity=25]="BeforeEntity",t[t.BeforeNumericEntity=26]="BeforeNumericEntity",t[t.InNamedEntity=27]="InNamedEntity",t[t.InNumericEntity=28]="InNumericEntity",t[t.InHexEntity=29]="InHexEntity"}(n||(n={})),function(t){t[t.NoValue=0]="NoValue",t[t.Unquoted=1]="Unquoted",t[t.Single=2]="Single",t[t.Double=3]="Double"}(r=e.QuoteType||(e.QuoteType={}));var l={Cdata:new Uint8Array([67,68,65,84,65,91]),CdataEnd:new Uint8Array([93,93,62]),CommentEnd:new Uint8Array([45,45,62]),ScriptEnd:new Uint8Array([60,47,115,99,114,105,112,116]),StyleEnd:new Uint8Array([60,47,115,116,121,108,101]),TitleEnd:new Uint8Array([60,47,116,105,116,108,101])},c=function(){function t(t,e){var o=t.xmlMode,r=void 0!==o&&o,i=t.decodeEntities,s=void 0===i||i;this.cbs=e,this.state=n.Text,this.buffer="",this.sectionStart=0,this.index=0,this.baseState=n.Text,this.isSpecial=!1,this.running=!0,this.offset=0,this.sequenceIndex=0,this.trieIndex=0,this.trieCurrent=0,this.entityResult=0,this.entityExcess=0,this.xmlMode=r,this.decodeEntities=s,this.entityTrie=r?zt.xmlDecodeTree:zt.htmlDecodeTree}return t.prototype.reset=function(){this.state=n.Text,this.buffer="",this.sectionStart=0,this.index=0,this.baseState=n.Text,this.currentSequence=void 0,this.running=!0,this.offset=0},t.prototype.write=function(t){this.offset+=this.buffer.length,this.buffer=t,this.parse()},t.prototype.end=function(){this.running&&this.finish()},t.prototype.pause=function(){this.running=!1},t.prototype.resume=function(){this.running=!0,this.index<this.buffer.length+this.offset&&this.parse()},t.prototype.getIndex=function(){return this.index},t.prototype.getSectionStart=function(){return this.sectionStart},t.prototype.stateText=function(t){t===o.Lt||!this.decodeEntities&&this.fastForwardTo(o.Lt)?(this.index>this.sectionStart&&this.cbs.ontext(this.sectionStart,this.index),this.state=n.BeforeTagName,this.sectionStart=this.index):this.decodeEntities&&t===o.Amp&&(this.state=n.BeforeEntity)},t.prototype.stateSpecialStartSequence=function(t){var e=this.sequenceIndex===this.currentSequence.length;if(e?s(t):(32|t)===this.currentSequence[this.sequenceIndex]){if(!e)return void this.sequenceIndex++}else this.isSpecial=!1;this.sequenceIndex=0,this.state=n.InTagName,this.stateInTagName(t)},t.prototype.stateInSpecialTag=function(t){if(this.sequenceIndex===this.currentSequence.length){if(t===o.Gt||i(t)){var e=this.index-this.currentSequence.length;if(this.sectionStart<e){var r=this.index;this.index=e,this.cbs.ontext(this.sectionStart,e),this.index=r}return this.isSpecial=!1,this.sectionStart=e+2,void this.stateInClosingTagName(t)}this.sequenceIndex=0}(32|t)===this.currentSequence[this.sequenceIndex]?this.sequenceIndex+=1:0===this.sequenceIndex?this.currentSequence===l.TitleEnd?this.decodeEntities&&t===o.Amp&&(this.state=n.BeforeEntity):this.fastForwardTo(o.Lt)&&(this.sequenceIndex=1):this.sequenceIndex=Number(t===o.Lt)},t.prototype.stateCDATASequence=function(t){t===l.Cdata[this.sequenceIndex]?++this.sequenceIndex===l.Cdata.length&&(this.state=n.InCommentLike,this.currentSequence=l.CdataEnd,this.sequenceIndex=0,this.sectionStart=this.index+1):(this.sequenceIndex=0,this.state=n.InDeclaration,this.stateInDeclaration(t))},t.prototype.fastForwardTo=function(t){for(;++this.index<this.buffer.length+this.offset;)if(this.buffer.charCodeAt(this.index-this.offset)===t)return!0;return this.index=this.buffer.length+this.offset-1,!1},t.prototype.stateInCommentLike=function(t){t===this.currentSequence[this.sequenceIndex]?++this.sequenceIndex===this.currentSequence.length&&(this.currentSequence===l.CdataEnd?this.cbs.oncdata(this.sectionStart,this.index,2):this.cbs.oncomment(this.sectionStart,this.index,2),this.sequenceIndex=0,this.sectionStart=this.index+1,this.state=n.Text):0===this.sequenceIndex?this.fastForwardTo(this.currentSequence[0])&&(this.sequenceIndex=1):t!==this.currentSequence[this.sequenceIndex-1]&&(this.sequenceIndex=0)},t.prototype.isTagStartChar=function(t){return this.xmlMode?!s(t):function(t){return t>=o.LowerA&&t<=o.LowerZ||t>=o.UpperA&&t<=o.UpperZ}(t)},t.prototype.startSpecial=function(t,e){this.isSpecial=!0,this.currentSequence=t,this.sequenceIndex=e,this.state=n.SpecialStartSequence},t.prototype.stateBeforeTagName=function(t){if(t===o.ExclamationMark)this.state=n.BeforeDeclaration,this.sectionStart=this.index+1;else if(t===o.Questionmark)this.state=n.InProcessingInstruction,this.sectionStart=this.index+1;else if(this.isTagStartChar(t)){var e=32|t;this.sectionStart=this.index,this.xmlMode||e!==l.TitleEnd[2]?this.state=this.xmlMode||e!==l.ScriptEnd[2]?n.InTagName:n.BeforeSpecialS:this.startSpecial(l.TitleEnd,3)}else t===o.Slash?this.state=n.BeforeClosingTagName:(this.state=n.Text,this.stateText(t))},t.prototype.stateInTagName=function(t){s(t)&&(this.cbs.onopentagname(this.sectionStart,this.index),this.sectionStart=-1,this.state=n.BeforeAttributeName,this.stateBeforeAttributeName(t))},t.prototype.stateBeforeClosingTagName=function(t){i(t)||(t===o.Gt?this.state=n.Text:(this.state=this.isTagStartChar(t)?n.InClosingTagName:n.InSpecialComment,this.sectionStart=this.index))},t.prototype.stateInClosingTagName=function(t){(t===o.Gt||i(t))&&(this.cbs.onclosetag(this.sectionStart,this.index),this.sectionStart=-1,this.state=n.AfterClosingTagName,this.stateAfterClosingTagName(t))},t.prototype.stateAfterClosingTagName=function(t){(t===o.Gt||this.fastForwardTo(o.Gt))&&(this.state=n.Text,this.sectionStart=this.index+1)},t.prototype.stateBeforeAttributeName=function(t){t===o.Gt?(this.cbs.onopentagend(this.index),this.isSpecial?(this.state=n.InSpecialTag,this.sequenceIndex=0):this.state=n.Text,this.baseState=this.state,this.sectionStart=this.index+1):t===o.Slash?this.state=n.InSelfClosingTag:i(t)||(this.state=n.InAttributeName,this.sectionStart=this.index)},t.prototype.stateInSelfClosingTag=function(t){t===o.Gt?(this.cbs.onselfclosingtag(this.index),this.state=n.Text,this.baseState=n.Text,this.sectionStart=this.index+1,this.isSpecial=!1):i(t)||(this.state=n.BeforeAttributeName,this.stateBeforeAttributeName(t))},t.prototype.stateInAttributeName=function(t){(t===o.Eq||s(t))&&(this.cbs.onattribname(this.sectionStart,this.index),this.sectionStart=-1,this.state=n.AfterAttributeName,this.stateAfterAttributeName(t))},t.prototype.stateAfterAttributeName=function(t){t===o.Eq?this.state=n.BeforeAttributeValue:t===o.Slash||t===o.Gt?(this.cbs.onattribend(r.NoValue,this.index),this.state=n.BeforeAttributeName,this.stateBeforeAttributeName(t)):i(t)||(this.cbs.onattribend(r.NoValue,this.index),this.state=n.InAttributeName,this.sectionStart=this.index)},t.prototype.stateBeforeAttributeValue=function(t){t===o.DoubleQuote?(this.state=n.InAttributeValueDq,this.sectionStart=this.index+1):t===o.SingleQuote?(this.state=n.InAttributeValueSq,this.sectionStart=this.index+1):i(t)||(this.sectionStart=this.index,this.state=n.InAttributeValueNq,this.stateInAttributeValueNoQuotes(t))},t.prototype.handleInAttributeValue=function(t,e){t===e||!this.decodeEntities&&this.fastForwardTo(e)?(this.cbs.onattribdata(this.sectionStart,this.index),this.sectionStart=-1,this.cbs.onattribend(e===o.DoubleQuote?r.Double:r.Single,this.index),this.state=n.BeforeAttributeName):this.decodeEntities&&t===o.Amp&&(this.baseState=this.state,this.state=n.BeforeEntity)},t.prototype.stateInAttributeValueDoubleQuotes=function(t){this.handleInAttributeValue(t,o.DoubleQuote)},t.prototype.stateInAttributeValueSingleQuotes=function(t){this.handleInAttributeValue(t,o.SingleQuote)},t.prototype.stateInAttributeValueNoQuotes=function(t){i(t)||t===o.Gt?(this.cbs.onattribdata(this.sectionStart,this.index),this.sectionStart=-1,this.cbs.onattribend(r.Unquoted,this.index),this.state=n.BeforeAttributeName,this.stateBeforeAttributeName(t)):this.decodeEntities&&t===o.Amp&&(this.baseState=this.state,this.state=n.BeforeEntity)},t.prototype.stateBeforeDeclaration=function(t){t===o.OpeningSquareBracket?(this.state=n.CDATASequence,this.sequenceIndex=0):this.state=t===o.Dash?n.BeforeComment:n.InDeclaration},t.prototype.stateInDeclaration=function(t){(t===o.Gt||this.fastForwardTo(o.Gt))&&(this.cbs.ondeclaration(this.sectionStart,this.index),this.state=n.Text,this.sectionStart=this.index+1)},t.prototype.stateInProcessingInstruction=function(t){(t===o.Gt||this.fastForwardTo(o.Gt))&&(this.cbs.onprocessinginstruction(this.sectionStart,this.index),this.state=n.Text,this.sectionStart=this.index+1)},t.prototype.stateBeforeComment=function(t){t===o.Dash?(this.state=n.InCommentLike,this.currentSequence=l.CommentEnd,this.sequenceIndex=2,this.sectionStart=this.index+1):this.state=n.InDeclaration},t.prototype.stateInSpecialComment=function(t){(t===o.Gt||this.fastForwardTo(o.Gt))&&(this.cbs.oncomment(this.sectionStart,this.index,0),this.state=n.Text,this.sectionStart=this.index+1)},t.prototype.stateBeforeSpecialS=function(t){var e=32|t;e===l.ScriptEnd[3]?this.startSpecial(l.ScriptEnd,4):e===l.StyleEnd[3]?this.startSpecial(l.StyleEnd,4):(this.state=n.InTagName,this.stateInTagName(t))},t.prototype.stateBeforeEntity=function(t){this.entityExcess=1,this.entityResult=0,t===o.Num?this.state=n.BeforeNumericEntity:t===o.Amp||(this.trieIndex=0,this.trieCurrent=this.entityTrie[0],this.state=n.InNamedEntity,this.stateInNamedEntity(t))},t.prototype.stateInNamedEntity=function(t){if(this.entityExcess+=1,this.trieIndex=(0,zt.determineBranch)(this.entityTrie,this.trieCurrent,this.trieIndex+1,t),this.trieIndex<0)return this.emitNamedEntity(),void this.index--;this.trieCurrent=this.entityTrie[this.trieIndex];var e=this.trieCurrent&zt.BinTrieFlags.VALUE_LENGTH;if(e){var n=(e>>14)-1;if(this.allowLegacyEntity()||t===o.Semi){var r=this.index-this.entityExcess+1;r>this.sectionStart&&this.emitPartial(this.sectionStart,r),this.entityResult=this.trieIndex,this.trieIndex+=n,this.entityExcess=0,this.sectionStart=this.index+1,0===n&&this.emitNamedEntity()}else this.trieIndex+=n}},t.prototype.emitNamedEntity=function(){if(this.state=this.baseState,0!==this.entityResult)switch((this.entityTrie[this.entityResult]&zt.BinTrieFlags.VALUE_LENGTH)>>14){case 1:this.emitCodePoint(this.entityTrie[this.entityResult]&~zt.BinTrieFlags.VALUE_LENGTH);break;case 2:this.emitCodePoint(this.entityTrie[this.entityResult+1]);break;case 3:this.emitCodePoint(this.entityTrie[this.entityResult+1]),this.emitCodePoint(this.entityTrie[this.entityResult+2])}},t.prototype.stateBeforeNumericEntity=function(t){(32|t)===o.LowerX?(this.entityExcess++,this.state=n.InHexEntity):(this.state=n.InNumericEntity,this.stateInNumericEntity(t))},t.prototype.emitNumericEntity=function(t){var e=this.index-this.entityExcess-1;e+2+Number(this.state===n.InHexEntity)!==this.index&&(e>this.sectionStart&&this.emitPartial(this.sectionStart,e),this.sectionStart=this.index+Number(t),this.emitCodePoint((0,zt.replaceCodePoint)(this.entityResult))),this.state=this.baseState},t.prototype.stateInNumericEntity=function(t){t===o.Semi?this.emitNumericEntity(!0):a(t)?(this.entityResult=10*this.entityResult+(t-o.Zero),this.entityExcess++):(this.allowLegacyEntity()?this.emitNumericEntity(!1):this.state=this.baseState,this.index--)},t.prototype.stateInHexEntity=function(t){t===o.Semi?this.emitNumericEntity(!0):a(t)?(this.entityResult=16*this.entityResult+(t-o.Zero),this.entityExcess++):!function(t){return t>=o.UpperA&&t<=o.UpperF||t>=o.LowerA&&t<=o.LowerF}(t)?(this.allowLegacyEntity()?this.emitNumericEntity(!1):this.state=this.baseState,this.index--):(this.entityResult=16*this.entityResult+((32|t)-o.LowerA+10),this.entityExcess++)},t.prototype.allowLegacyEntity=function(){return!this.xmlMode&&(this.baseState===n.Text||this.baseState===n.InSpecialTag)},t.prototype.cleanup=function(){this.running&&this.sectionStart!==this.index&&(this.state===n.Text||this.state===n.InSpecialTag&&0===this.sequenceIndex?(this.cbs.ontext(this.sectionStart,this.index),this.sectionStart=this.index):this.state!==n.InAttributeValueDq&&this.state!==n.InAttributeValueSq&&this.state!==n.InAttributeValueNq||(this.cbs.onattribdata(this.sectionStart,this.index),this.sectionStart=this.index))},t.prototype.shouldContinue=function(){return this.index<this.buffer.length+this.offset&&this.running},t.prototype.parse=function(){for(;this.shouldContinue();){var t=this.buffer.charCodeAt(this.index-this.offset);this.state===n.Text?this.stateText(t):this.state===n.SpecialStartSequence?this.stateSpecialStartSequence(t):this.state===n.InSpecialTag?this.stateInSpecialTag(t):this.state===n.CDATASequence?this.stateCDATASequence(t):this.state===n.InAttributeValueDq?this.stateInAttributeValueDoubleQuotes(t):this.state===n.InAttributeName?this.stateInAttributeName(t):this.state===n.InCommentLike?this.stateInCommentLike(t):this.state===n.InSpecialComment?this.stateInSpecialComment(t):this.state===n.BeforeAttributeName?this.stateBeforeAttributeName(t):this.state===n.InTagName?this.stateInTagName(t):this.state===n.InClosingTagName?this.stateInClosingTagName(t):this.state===n.BeforeTagName?this.stateBeforeTagName(t):this.state===n.AfterAttributeName?this.stateAfterAttributeName(t):this.state===n.InAttributeValueSq?this.stateInAttributeValueSingleQuotes(t):this.state===n.BeforeAttributeValue?this.stateBeforeAttributeValue(t):this.state===n.BeforeClosingTagName?this.stateBeforeClosingTagName(t):this.state===n.AfterClosingTagName?this.stateAfterClosingTagName(t):this.state===n.BeforeSpecialS?this.stateBeforeSpecialS(t):this.state===n.InAttributeValueNq?this.stateInAttributeValueNoQuotes(t):this.state===n.InSelfClosingTag?this.stateInSelfClosingTag(t):this.state===n.InDeclaration?this.stateInDeclaration(t):this.state===n.BeforeDeclaration?this.stateBeforeDeclaration(t):this.state===n.BeforeComment?this.stateBeforeComment(t):this.state===n.InProcessingInstruction?this.stateInProcessingInstruction(t):this.state===n.InNamedEntity?this.stateInNamedEntity(t):this.state===n.BeforeEntity?this.stateBeforeEntity(t):this.state===n.InHexEntity?this.stateInHexEntity(t):this.state===n.InNumericEntity?this.stateInNumericEntity(t):this.stateBeforeNumericEntity(t),this.index++}this.cleanup()},t.prototype.finish=function(){this.state===n.InNamedEntity&&this.emitNamedEntity(),this.sectionStart<this.index&&this.handleTrailingData(),this.cbs.onend()},t.prototype.handleTrailingData=function(){var t=this.buffer.length+this.offset;this.state===n.InCommentLike?this.currentSequence===l.CdataEnd?this.cbs.oncdata(this.sectionStart,t,0):this.cbs.oncomment(this.sectionStart,t,0):this.state===n.InNumericEntity&&this.allowLegacyEntity()||this.state===n.InHexEntity&&this.allowLegacyEntity()?this.emitNumericEntity(!1):this.state===n.InTagName||this.state===n.BeforeAttributeName||this.state===n.BeforeAttributeValue||this.state===n.AfterAttributeName||this.state===n.InAttributeName||this.state===n.InAttributeValueSq||this.state===n.InAttributeValueDq||this.state===n.InAttributeValueNq||this.state===n.InClosingTagName||this.cbs.ontext(this.sectionStart,t)},t.prototype.emitPartial=function(t,e){this.baseState!==n.Text&&this.baseState!==n.InSpecialTag?this.cbs.onattribdata(t,e):this.cbs.ontext(t,e)},t.prototype.emitCodePoint=function(t){this.baseState!==n.Text&&this.baseState!==n.InSpecialTag?this.cbs.onattribentity(t):this.cbs.ontextentity(t)},t}();e.default=c})),jt=It((function(t,e){var o=Dt&&Dt.__createBinding||(Object.create?function(t,e,o,n){void 0===n&&(n=o);var r=Object.getOwnPropertyDescriptor(e,o);r&&!("get"in r?!e.__esModule:r.writable||r.configurable)||(r={enumerable:!0,get:function(){return e[o]}}),Object.defineProperty(t,n,r)}:function(t,e,o,n){void 0===n&&(n=o),t[n]=e[o]}),n=Dt&&Dt.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),r=Dt&&Dt.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)"default"!==r&&Object.prototype.hasOwnProperty.call(t,r)&&o(e,t,r);return n(e,t),e};Object.defineProperty(e,"__esModule",{value:!0}),e.Parser=void 0;var i=r(Rt),s=new Set(["input","option","optgroup","select","button","datalist","textarea"]),a=new Set(["p"]),l=new Set(["thead","tbody"]),c=new Set(["dd","dt"]),d=new Set(["rt","rp"]),u=new Map([["tr",new Set(["tr","th","td"])],["th",new Set(["th"])],["td",new Set(["thead","th","td"])],["body",new Set(["head","link","script"])],["li",new Set(["li"])],["p",a],["h1",a],["h2",a],["h3",a],["h4",a],["h5",a],["h6",a],["select",s],["input",s],["output",s],["button",s],["datalist",s],["textarea",s],["option",new Set(["option"])],["optgroup",new Set(["optgroup","option"])],["dd",c],["dt",c],["address",a],["article",a],["aside",a],["blockquote",a],["details",a],["div",a],["dl",a],["fieldset",a],["figcaption",a],["figure",a],["footer",a],["form",a],["header",a],["hr",a],["main",a],["nav",a],["ol",a],["pre",a],["section",a],["table",a],["ul",a],["rt",d],["rp",d],["tbody",l],["tfoot",l]]),h=new Set(["area","base","basefont","br","col","command","embed","frame","hr","img","input","isindex","keygen","link","meta","param","source","track","wbr"]),p=new Set(["math","svg"]),f=new Set(["mi","mo","mn","ms","mtext","annotation-xml","foreignobject","desc","title"]),m=/\s|\//,g=function(){function t(t,e){var o,n,r,s,a;void 0===e&&(e={}),this.options=e,this.startIndex=0,this.endIndex=0,this.openTagStart=0,this.tagname="",this.attribname="",this.attribvalue="",this.attribs=null,this.stack=[],this.foreignContext=[],this.buffers=[],this.bufferOffset=0,this.writeIndex=0,this.ended=!1,this.cbs=null!=t?t:{},this.lowerCaseTagNames=null!==(o=e.lowerCaseTags)&&void 0!==o?o:!e.xmlMode,this.lowerCaseAttributeNames=null!==(n=e.lowerCaseAttributeNames)&&void 0!==n?n:!e.xmlMode,this.tokenizer=new(null!==(r=e.Tokenizer)&&void 0!==r?r:i.default)(this.options,this),null===(a=(s=this.cbs).onparserinit)||void 0===a||a.call(s,this)}return t.prototype.ontext=function(t,e){var o,n,r=this.getSlice(t,e);this.endIndex=e-1,null===(n=(o=this.cbs).ontext)||void 0===n||n.call(o,r),this.startIndex=e},t.prototype.ontextentity=function(t){var e,o,n=this.tokenizer.getSectionStart();this.endIndex=n-1,null===(o=(e=this.cbs).ontext)||void 0===o||o.call(e,(0,zt.fromCodePoint)(t)),this.startIndex=n},t.prototype.isVoidElement=function(t){return!this.options.xmlMode&&h.has(t)},t.prototype.onopentagname=function(t,e){this.endIndex=e;var o=this.getSlice(t,e);this.lowerCaseTagNames&&(o=o.toLowerCase()),this.emitOpenTag(o)},t.prototype.emitOpenTag=function(t){var e,o,n,r;this.openTagStart=this.startIndex,this.tagname=t;var i=!this.options.xmlMode&&u.get(t);if(i)for(;this.stack.length>0&&i.has(this.stack[this.stack.length-1]);){var s=this.stack.pop();null===(o=(e=this.cbs).onclosetag)||void 0===o||o.call(e,s,!0)}this.isVoidElement(t)||(this.stack.push(t),p.has(t)?this.foreignContext.push(!0):f.has(t)&&this.foreignContext.push(!1)),null===(r=(n=this.cbs).onopentagname)||void 0===r||r.call(n,t),this.cbs.onopentag&&(this.attribs={})},t.prototype.endOpenTag=function(t){var e,o;this.startIndex=this.openTagStart,this.attribs&&(null===(o=(e=this.cbs).onopentag)||void 0===o||o.call(e,this.tagname,this.attribs,t),this.attribs=null),this.cbs.onclosetag&&this.isVoidElement(this.tagname)&&this.cbs.onclosetag(this.tagname,!0),this.tagname=""},t.prototype.onopentagend=function(t){this.endIndex=t,this.endOpenTag(!1),this.startIndex=t+1},t.prototype.onclosetag=function(t,e){var o,n,r,i,s,a;this.endIndex=e;var l=this.getSlice(t,e);if(this.lowerCaseTagNames&&(l=l.toLowerCase()),(p.has(l)||f.has(l))&&this.foreignContext.pop(),this.isVoidElement(l))this.options.xmlMode||"br"!==l||(null===(n=(o=this.cbs).onopentagname)||void 0===n||n.call(o,"br"),null===(i=(r=this.cbs).onopentag)||void 0===i||i.call(r,"br",{},!0),null===(a=(s=this.cbs).onclosetag)||void 0===a||a.call(s,"br",!1));else{var c=this.stack.lastIndexOf(l);if(-1!==c)if(this.cbs.onclosetag)for(var d=this.stack.length-c;d--;)this.cbs.onclosetag(this.stack.pop(),0!==d);else this.stack.length=c;else this.options.xmlMode||"p"!==l||(this.emitOpenTag("p"),this.closeCurrentTag(!0))}this.startIndex=e+1},t.prototype.onselfclosingtag=function(t){this.endIndex=t,this.options.xmlMode||this.options.recognizeSelfClosing||this.foreignContext[this.foreignContext.length-1]?(this.closeCurrentTag(!1),this.startIndex=t+1):this.onopentagend(t)},t.prototype.closeCurrentTag=function(t){var e,o,n=this.tagname;this.endOpenTag(t),this.stack[this.stack.length-1]===n&&(null===(o=(e=this.cbs).onclosetag)||void 0===o||o.call(e,n,!t),this.stack.pop())},t.prototype.onattribname=function(t,e){this.startIndex=t;var o=this.getSlice(t,e);this.attribname=this.lowerCaseAttributeNames?o.toLowerCase():o},t.prototype.onattribdata=function(t,e){this.attribvalue+=this.getSlice(t,e)},t.prototype.onattribentity=function(t){this.attribvalue+=(0,zt.fromCodePoint)(t)},t.prototype.onattribend=function(t,e){var o,n;this.endIndex=e,null===(n=(o=this.cbs).onattribute)||void 0===n||n.call(o,this.attribname,this.attribvalue,t===i.QuoteType.Double?'"':t===i.QuoteType.Single?"'":t===i.QuoteType.NoValue?void 0:null),this.attribs&&!Object.prototype.hasOwnProperty.call(this.attribs,this.attribname)&&(this.attribs[this.attribname]=this.attribvalue),this.attribvalue=""},t.prototype.getInstructionName=function(t){var e=t.search(m),o=e<0?t:t.substr(0,e);return this.lowerCaseTagNames&&(o=o.toLowerCase()),o},t.prototype.ondeclaration=function(t,e){this.endIndex=e;var o=this.getSlice(t,e);if(this.cbs.onprocessinginstruction){var n=this.getInstructionName(o);this.cbs.onprocessinginstruction("!".concat(n),"!".concat(o))}this.startIndex=e+1},t.prototype.onprocessinginstruction=function(t,e){this.endIndex=e;var o=this.getSlice(t,e);if(this.cbs.onprocessinginstruction){var n=this.getInstructionName(o);this.cbs.onprocessinginstruction("?".concat(n),"?".concat(o))}this.startIndex=e+1},t.prototype.oncomment=function(t,e,o){var n,r,i,s;this.endIndex=e,null===(r=(n=this.cbs).oncomment)||void 0===r||r.call(n,this.getSlice(t,e-o)),null===(s=(i=this.cbs).oncommentend)||void 0===s||s.call(i),this.startIndex=e+1},t.prototype.oncdata=function(t,e,o){var n,r,i,s,a,l,c,d,u,h;this.endIndex=e;var p=this.getSlice(t,e-o);this.options.xmlMode||this.options.recognizeCDATA?(null===(r=(n=this.cbs).oncdatastart)||void 0===r||r.call(n),null===(s=(i=this.cbs).ontext)||void 0===s||s.call(i,p),null===(l=(a=this.cbs).oncdataend)||void 0===l||l.call(a)):(null===(d=(c=this.cbs).oncomment)||void 0===d||d.call(c,"[CDATA[".concat(p,"]]")),null===(h=(u=this.cbs).oncommentend)||void 0===h||h.call(u)),this.startIndex=e+1},t.prototype.onend=function(){var t,e;if(this.cbs.onclosetag){this.endIndex=this.startIndex;for(var o=this.stack.length;o>0;this.cbs.onclosetag(this.stack[--o],!0));}null===(e=(t=this.cbs).onend)||void 0===e||e.call(t)},t.prototype.reset=function(){var t,e,o,n;null===(e=(t=this.cbs).onreset)||void 0===e||e.call(t),this.tokenizer.reset(),this.tagname="",this.attribname="",this.attribs=null,this.stack.length=0,this.startIndex=0,this.endIndex=0,null===(n=(o=this.cbs).onparserinit)||void 0===n||n.call(o,this),this.buffers.length=0,this.bufferOffset=0,this.writeIndex=0,this.ended=!1},t.prototype.parseComplete=function(t){this.reset(),this.end(t)},t.prototype.getSlice=function(t,e){for(;t-this.bufferOffset>=this.buffers[0].length;)this.shiftBuffer();for(var o=this.buffers[0].slice(t-this.bufferOffset,e-this.bufferOffset);e-this.bufferOffset>this.buffers[0].length;)this.shiftBuffer(),o+=this.buffers[0].slice(0,e-this.bufferOffset);return o},t.prototype.shiftBuffer=function(){this.bufferOffset+=this.buffers[0].length,this.writeIndex--,this.buffers.shift()},t.prototype.write=function(t){var e,o;this.ended?null===(o=(e=this.cbs).onerror)||void 0===o||o.call(e,new Error(".write() after done!")):(this.buffers.push(t),this.tokenizer.running&&(this.tokenizer.write(t),this.writeIndex++))},t.prototype.end=function(t){var e,o;this.ended?null===(o=(e=this.cbs).onerror)||void 0===o||o.call(e,Error(".end() after done!")):(t&&this.write(t),this.ended=!0,this.tokenizer.end())},t.prototype.pause=function(){this.tokenizer.pause()},t.prototype.resume=function(){for(this.tokenizer.resume();this.tokenizer.running&&this.writeIndex<this.buffers.length;)this.tokenizer.write(this.buffers[this.writeIndex++]);this.ended&&this.tokenizer.end()},t.prototype.parseChunk=function(t){this.write(t)},t.prototype.done=function(t){this.end(t)},t}();e.Parser=g})),Bt=It((function(t,e){var o;Object.defineProperty(e,"__esModule",{value:!0}),e.Doctype=e.CDATA=e.Tag=e.Style=e.Script=e.Comment=e.Directive=e.Text=e.Root=e.isTag=e.ElementType=void 0,function(t){t.Root="root",t.Text="text",t.Directive="directive",t.Comment="comment",t.Script="script",t.Style="style",t.Tag="tag",t.CDATA="cdata",t.Doctype="doctype"}(o=e.ElementType||(e.ElementType={})),e.isTag=function(t){return t.type===o.Tag||t.type===o.Script||t.type===o.Style},e.Root=o.Root,e.Text=o.Text,e.Directive=o.Directive,e.Comment=o.Comment,e.Script=o.Script,e.Style=o.Style,e.Tag=o.Tag,e.CDATA=o.CDATA,e.Doctype=o.Doctype})),Ft=It((function(t,e){var o,n=Dt&&Dt.__extends||(o=function(t,e){return o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])},o(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),r=Dt&&Dt.__assign||function(){return r=Object.assign||function(t){for(var e,o=1,n=arguments.length;o<n;o++)for(var r in e=arguments[o])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t},r.apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0}),e.cloneNode=e.hasChildren=e.isDocument=e.isDirective=e.isComment=e.isText=e.isCDATA=e.isTag=e.Element=e.Document=e.CDATA=e.NodeWithChildren=e.ProcessingInstruction=e.Comment=e.Text=e.DataNode=e.Node=void 0;var i=function(){function t(){this.parent=null,this.prev=null,this.next=null,this.startIndex=null,this.endIndex=null}return Object.defineProperty(t.prototype,"parentNode",{get:function(){return this.parent},set:function(t){this.parent=t},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"previousSibling",{get:function(){return this.prev},set:function(t){this.prev=t},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"nextSibling",{get:function(){return this.next},set:function(t){this.next=t},enumerable:!1,configurable:!0}),t.prototype.cloneNode=function(t){return void 0===t&&(t=!1),w(this,t)},t}();e.Node=i;var s=function(t){function e(e){var o=t.call(this)||this;return o.data=e,o}return n(e,t),Object.defineProperty(e.prototype,"nodeValue",{get:function(){return this.data},set:function(t){this.data=t},enumerable:!1,configurable:!0}),e}(i);e.DataNode=s;var a=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.type=Bt.ElementType.Text,e}return n(e,t),Object.defineProperty(e.prototype,"nodeType",{get:function(){return 3},enumerable:!1,configurable:!0}),e}(s);e.Text=a;var l=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.type=Bt.ElementType.Comment,e}return n(e,t),Object.defineProperty(e.prototype,"nodeType",{get:function(){return 8},enumerable:!1,configurable:!0}),e}(s);e.Comment=l;var c=function(t){function e(e,o){var n=t.call(this,o)||this;return n.name=e,n.type=Bt.ElementType.Directive,n}return n(e,t),Object.defineProperty(e.prototype,"nodeType",{get:function(){return 1},enumerable:!1,configurable:!0}),e}(s);e.ProcessingInstruction=c;var d=function(t){function e(e){var o=t.call(this)||this;return o.children=e,o}return n(e,t),Object.defineProperty(e.prototype,"firstChild",{get:function(){var t;return null!==(t=this.children[0])&&void 0!==t?t:null},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"lastChild",{get:function(){return this.children.length>0?this.children[this.children.length-1]:null},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"childNodes",{get:function(){return this.children},set:function(t){this.children=t},enumerable:!1,configurable:!0}),e}(i);e.NodeWithChildren=d;var u=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.type=Bt.ElementType.CDATA,e}return n(e,t),Object.defineProperty(e.prototype,"nodeType",{get:function(){return 4},enumerable:!1,configurable:!0}),e}(d);e.CDATA=u;var h=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.type=Bt.ElementType.Root,e}return n(e,t),Object.defineProperty(e.prototype,"nodeType",{get:function(){return 9},enumerable:!1,configurable:!0}),e}(d);e.Document=h;var p=function(t){function e(e,o,n,r){void 0===n&&(n=[]),void 0===r&&(r="script"===e?Bt.ElementType.Script:"style"===e?Bt.ElementType.Style:Bt.ElementType.Tag);var i=t.call(this,n)||this;return i.name=e,i.attribs=o,i.type=r,i}return n(e,t),Object.defineProperty(e.prototype,"nodeType",{get:function(){return 1},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"tagName",{get:function(){return this.name},set:function(t){this.name=t},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"attributes",{get:function(){var t=this;return Object.keys(this.attribs).map((function(e){var o,n;return{name:e,value:t.attribs[e],namespace:null===(o=t["x-attribsNamespace"])||void 0===o?void 0:o[e],prefix:null===(n=t["x-attribsPrefix"])||void 0===n?void 0:n[e]}}))},enumerable:!1,configurable:!0}),e}(d);function f(t){return(0,Bt.isTag)(t)}function m(t){return t.type===Bt.ElementType.CDATA}function g(t){return t.type===Bt.ElementType.Text}function b(t){return t.type===Bt.ElementType.Comment}function v(t){return t.type===Bt.ElementType.Directive}function y(t){return t.type===Bt.ElementType.Root}function w(t,e){var o;if(void 0===e&&(e=!1),g(t))o=new a(t.data);else if(b(t))o=new l(t.data);else if(f(t)){var n=e?x(t.children):[],i=new p(t.name,r({},t.attribs),n);n.forEach((function(t){return t.parent=i})),null!=t.namespace&&(i.namespace=t.namespace),t["x-attribsNamespace"]&&(i["x-attribsNamespace"]=r({},t["x-attribsNamespace"])),t["x-attribsPrefix"]&&(i["x-attribsPrefix"]=r({},t["x-attribsPrefix"])),o=i}else if(m(t)){n=e?x(t.children):[];var s=new u(n);n.forEach((function(t){return t.parent=s})),o=s}else if(y(t)){n=e?x(t.children):[];var d=new h(n);n.forEach((function(t){return t.parent=d})),t["x-mode"]&&(d["x-mode"]=t["x-mode"]),o=d}else{if(!v(t))throw new Error("Not implemented yet: ".concat(t.type));var w=new c(t.name,t.data);null!=t["x-name"]&&(w["x-name"]=t["x-name"],w["x-publicId"]=t["x-publicId"],w["x-systemId"]=t["x-systemId"]),o=w}return o.startIndex=t.startIndex,o.endIndex=t.endIndex,null!=t.sourceCodeLocation&&(o.sourceCodeLocation=t.sourceCodeLocation),o}function x(t){for(var e=t.map((function(t){return w(t,!0)})),o=1;o<e.length;o++)e[o].prev=e[o-1],e[o-1].next=e[o];return e}e.Element=p,e.isTag=f,e.isCDATA=m,e.isText=g,e.isComment=b,e.isDirective=v,e.isDocument=y,e.hasChildren=function(t){return Object.prototype.hasOwnProperty.call(t,"children")},e.cloneNode=w})),Vt=It((function(t,e){var o=Dt&&Dt.__createBinding||(Object.create?function(t,e,o,n){void 0===n&&(n=o);var r=Object.getOwnPropertyDescriptor(e,o);r&&!("get"in r?!e.__esModule:r.writable||r.configurable)||(r={enumerable:!0,get:function(){return e[o]}}),Object.defineProperty(t,n,r)}:function(t,e,o,n){void 0===n&&(n=o),t[n]=e[o]}),n=Dt&&Dt.__exportStar||function(t,e){for(var n in t)"default"===n||Object.prototype.hasOwnProperty.call(e,n)||o(e,t,n)};Object.defineProperty(e,"__esModule",{value:!0}),e.DomHandler=void 0,n(Ft,e);var r={withStartIndices:!1,withEndIndices:!1,xmlMode:!1},i=function(){function t(t,e,o){this.dom=[],this.root=new Ft.Document(this.dom),this.done=!1,this.tagStack=[this.root],this.lastNode=null,this.parser=null,"function"==typeof e&&(o=e,e=r),"object"==typeof t&&(e=t,t=void 0),this.callback=null!=t?t:null,this.options=null!=e?e:r,this.elementCB=null!=o?o:null}return t.prototype.onparserinit=function(t){this.parser=t},t.prototype.onreset=function(){this.dom=[],this.root=new Ft.Document(this.dom),this.done=!1,this.tagStack=[this.root],this.lastNode=null,this.parser=null},t.prototype.onend=function(){this.done||(this.done=!0,this.parser=null,this.handleCallback(null))},t.prototype.onerror=function(t){this.handleCallback(t)},t.prototype.onclosetag=function(){this.lastNode=null;var t=this.tagStack.pop();this.options.withEndIndices&&(t.endIndex=this.parser.endIndex),this.elementCB&&this.elementCB(t)},t.prototype.onopentag=function(t,e){var o=this.options.xmlMode?Bt.ElementType.Tag:void 0,n=new Ft.Element(t,e,void 0,o);this.addNode(n),this.tagStack.push(n)},t.prototype.ontext=function(t){var e=this.lastNode;if(e&&e.type===Bt.ElementType.Text)e.data+=t,this.options.withEndIndices&&(e.endIndex=this.parser.endIndex);else{var o=new Ft.Text(t);this.addNode(o),this.lastNode=o}},t.prototype.oncomment=function(t){if(this.lastNode&&this.lastNode.type===Bt.ElementType.Comment)this.lastNode.data+=t;else{var e=new Ft.Comment(t);this.addNode(e),this.lastNode=e}},t.prototype.oncommentend=function(){this.lastNode=null},t.prototype.oncdatastart=function(){var t=new Ft.Text(""),e=new Ft.CDATA([t]);this.addNode(e),t.parent=e,this.lastNode=t},t.prototype.oncdataend=function(){this.lastNode=null},t.prototype.onprocessinginstruction=function(t,e){var o=new Ft.ProcessingInstruction(t,e);this.addNode(o)},t.prototype.handleCallback=function(t){if("function"==typeof this.callback)this.callback(t,this.dom);else if(t)throw t},t.prototype.addNode=function(t){var e=this.tagStack[this.tagStack.length-1],o=e.children[e.children.length-1];this.options.withStartIndices&&(t.startIndex=this.parser.startIndex),this.options.withEndIndices&&(t.endIndex=this.parser.endIndex),e.children.push(t),o&&(t.prev=o,o.next=t),t.parent=e,this.lastNode=null},t}();e.DomHandler=i,e.default=i}));function Wt(t){for(var e=1;e<t.length;e++)t[e][0]+=t[e-1][0]+1;return t}var Gt=new Map(Wt([[9,"&Tab;"],[0,"&NewLine;"],[22,"&excl;"],[0,"&quot;"],[0,"&num;"],[0,"&dollar;"],[0,"&percnt;"],[0,"&amp;"],[0,"&apos;"],[0,"&lpar;"],[0,"&rpar;"],[0,"&ast;"],[0,"&plus;"],[0,"&comma;"],[1,"&period;"],[0,"&sol;"],[10,"&colon;"],[0,"&semi;"],[0,{v:"&lt;",n:8402,o:"&nvlt;"}],[0,{v:"&equals;",n:8421,o:"&bne;"}],[0,{v:"&gt;",n:8402,o:"&nvgt;"}],[0,"&quest;"],[0,"&commat;"],[26,"&lbrack;"],[0,"&bsol;"],[0,"&rbrack;"],[0,"&Hat;"],[0,"&lowbar;"],[0,"&DiacriticalGrave;"],[5,{n:106,o:"&fjlig;"}],[20,"&lbrace;"],[0,"&verbar;"],[0,"&rbrace;"],[34,"&nbsp;"],[0,"&iexcl;"],[0,"&cent;"],[0,"&pound;"],[0,"&curren;"],[0,"&yen;"],[0,"&brvbar;"],[0,"&sect;"],[0,"&die;"],[0,"&copy;"],[0,"&ordf;"],[0,"&laquo;"],[0,"&not;"],[0,"&shy;"],[0,"&circledR;"],[0,"&macr;"],[0,"&deg;"],[0,"&PlusMinus;"],[0,"&sup2;"],[0,"&sup3;"],[0,"&acute;"],[0,"&micro;"],[0,"&para;"],[0,"&centerdot;"],[0,"&cedil;"],[0,"&sup1;"],[0,"&ordm;"],[0,"&raquo;"],[0,"&frac14;"],[0,"&frac12;"],[0,"&frac34;"],[0,"&iquest;"],[0,"&Agrave;"],[0,"&Aacute;"],[0,"&Acirc;"],[0,"&Atilde;"],[0,"&Auml;"],[0,"&angst;"],[0,"&AElig;"],[0,"&Ccedil;"],[0,"&Egrave;"],[0,"&Eacute;"],[0,"&Ecirc;"],[0,"&Euml;"],[0,"&Igrave;"],[0,"&Iacute;"],[0,"&Icirc;"],[0,"&Iuml;"],[0,"&ETH;"],[0,"&Ntilde;"],[0,"&Ograve;"],[0,"&Oacute;"],[0,"&Ocirc;"],[0,"&Otilde;"],[0,"&Ouml;"],[0,"&times;"],[0,"&Oslash;"],[0,"&Ugrave;"],[0,"&Uacute;"],[0,"&Ucirc;"],[0,"&Uuml;"],[0,"&Yacute;"],[0,"&THORN;"],[0,"&szlig;"],[0,"&agrave;"],[0,"&aacute;"],[0,"&acirc;"],[0,"&atilde;"],[0,"&auml;"],[0,"&aring;"],[0,"&aelig;"],[0,"&ccedil;"],[0,"&egrave;"],[0,"&eacute;"],[0,"&ecirc;"],[0,"&euml;"],[0,"&igrave;"],[0,"&iacute;"],[0,"&icirc;"],[0,"&iuml;"],[0,"&eth;"],[0,"&ntilde;"],[0,"&ograve;"],[0,"&oacute;"],[0,"&ocirc;"],[0,"&otilde;"],[0,"&ouml;"],[0,"&div;"],[0,"&oslash;"],[0,"&ugrave;"],[0,"&uacute;"],[0,"&ucirc;"],[0,"&uuml;"],[0,"&yacute;"],[0,"&thorn;"],[0,"&yuml;"],[0,"&Amacr;"],[0,"&amacr;"],[0,"&Abreve;"],[0,"&abreve;"],[0,"&Aogon;"],[0,"&aogon;"],[0,"&Cacute;"],[0,"&cacute;"],[0,"&Ccirc;"],[0,"&ccirc;"],[0,"&Cdot;"],[0,"&cdot;"],[0,"&Ccaron;"],[0,"&ccaron;"],[0,"&Dcaron;"],[0,"&dcaron;"],[0,"&Dstrok;"],[0,"&dstrok;"],[0,"&Emacr;"],[0,"&emacr;"],[2,"&Edot;"],[0,"&edot;"],[0,"&Eogon;"],[0,"&eogon;"],[0,"&Ecaron;"],[0,"&ecaron;"],[0,"&Gcirc;"],[0,"&gcirc;"],[0,"&Gbreve;"],[0,"&gbreve;"],[0,"&Gdot;"],[0,"&gdot;"],[0,"&Gcedil;"],[1,"&Hcirc;"],[0,"&hcirc;"],[0,"&Hstrok;"],[0,"&hstrok;"],[0,"&Itilde;"],[0,"&itilde;"],[0,"&Imacr;"],[0,"&imacr;"],[2,"&Iogon;"],[0,"&iogon;"],[0,"&Idot;"],[0,"&imath;"],[0,"&IJlig;"],[0,"&ijlig;"],[0,"&Jcirc;"],[0,"&jcirc;"],[0,"&Kcedil;"],[0,"&kcedil;"],[0,"&kgreen;"],[0,"&Lacute;"],[0,"&lacute;"],[0,"&Lcedil;"],[0,"&lcedil;"],[0,"&Lcaron;"],[0,"&lcaron;"],[0,"&Lmidot;"],[0,"&lmidot;"],[0,"&Lstrok;"],[0,"&lstrok;"],[0,"&Nacute;"],[0,"&nacute;"],[0,"&Ncedil;"],[0,"&ncedil;"],[0,"&Ncaron;"],[0,"&ncaron;"],[0,"&napos;"],[0,"&ENG;"],[0,"&eng;"],[0,"&Omacr;"],[0,"&omacr;"],[2,"&Odblac;"],[0,"&odblac;"],[0,"&OElig;"],[0,"&oelig;"],[0,"&Racute;"],[0,"&racute;"],[0,"&Rcedil;"],[0,"&rcedil;"],[0,"&Rcaron;"],[0,"&rcaron;"],[0,"&Sacute;"],[0,"&sacute;"],[0,"&Scirc;"],[0,"&scirc;"],[0,"&Scedil;"],[0,"&scedil;"],[0,"&Scaron;"],[0,"&scaron;"],[0,"&Tcedil;"],[0,"&tcedil;"],[0,"&Tcaron;"],[0,"&tcaron;"],[0,"&Tstrok;"],[0,"&tstrok;"],[0,"&Utilde;"],[0,"&utilde;"],[0,"&Umacr;"],[0,"&umacr;"],[0,"&Ubreve;"],[0,"&ubreve;"],[0,"&Uring;"],[0,"&uring;"],[0,"&Udblac;"],[0,"&udblac;"],[0,"&Uogon;"],[0,"&uogon;"],[0,"&Wcirc;"],[0,"&wcirc;"],[0,"&Ycirc;"],[0,"&ycirc;"],[0,"&Yuml;"],[0,"&Zacute;"],[0,"&zacute;"],[0,"&Zdot;"],[0,"&zdot;"],[0,"&Zcaron;"],[0,"&zcaron;"],[19,"&fnof;"],[34,"&imped;"],[63,"&gacute;"],[65,"&jmath;"],[142,"&circ;"],[0,"&caron;"],[16,"&breve;"],[0,"&DiacriticalDot;"],[0,"&ring;"],[0,"&ogon;"],[0,"&DiacriticalTilde;"],[0,"&dblac;"],[51,"&DownBreve;"],[127,"&Alpha;"],[0,"&Beta;"],[0,"&Gamma;"],[0,"&Delta;"],[0,"&Epsilon;"],[0,"&Zeta;"],[0,"&Eta;"],[0,"&Theta;"],[0,"&Iota;"],[0,"&Kappa;"],[0,"&Lambda;"],[0,"&Mu;"],[0,"&Nu;"],[0,"&Xi;"],[0,"&Omicron;"],[0,"&Pi;"],[0,"&Rho;"],[1,"&Sigma;"],[0,"&Tau;"],[0,"&Upsilon;"],[0,"&Phi;"],[0,"&Chi;"],[0,"&Psi;"],[0,"&ohm;"],[7,"&alpha;"],[0,"&beta;"],[0,"&gamma;"],[0,"&delta;"],[0,"&epsi;"],[0,"&zeta;"],[0,"&eta;"],[0,"&theta;"],[0,"&iota;"],[0,"&kappa;"],[0,"&lambda;"],[0,"&mu;"],[0,"&nu;"],[0,"&xi;"],[0,"&omicron;"],[0,"&pi;"],[0,"&rho;"],[0,"&sigmaf;"],[0,"&sigma;"],[0,"&tau;"],[0,"&upsi;"],[0,"&phi;"],[0,"&chi;"],[0,"&psi;"],[0,"&omega;"],[7,"&thetasym;"],[0,"&Upsi;"],[2,"&phiv;"],[0,"&piv;"],[5,"&Gammad;"],[0,"&digamma;"],[18,"&kappav;"],[0,"&rhov;"],[3,"&epsiv;"],[0,"&backepsilon;"],[10,"&IOcy;"],[0,"&DJcy;"],[0,"&GJcy;"],[0,"&Jukcy;"],[0,"&DScy;"],[0,"&Iukcy;"],[0,"&YIcy;"],[0,"&Jsercy;"],[0,"&LJcy;"],[0,"&NJcy;"],[0,"&TSHcy;"],[0,"&KJcy;"],[1,"&Ubrcy;"],[0,"&DZcy;"],[0,"&Acy;"],[0,"&Bcy;"],[0,"&Vcy;"],[0,"&Gcy;"],[0,"&Dcy;"],[0,"&IEcy;"],[0,"&ZHcy;"],[0,"&Zcy;"],[0,"&Icy;"],[0,"&Jcy;"],[0,"&Kcy;"],[0,"&Lcy;"],[0,"&Mcy;"],[0,"&Ncy;"],[0,"&Ocy;"],[0,"&Pcy;"],[0,"&Rcy;"],[0,"&Scy;"],[0,"&Tcy;"],[0,"&Ucy;"],[0,"&Fcy;"],[0,"&KHcy;"],[0,"&TScy;"],[0,"&CHcy;"],[0,"&SHcy;"],[0,"&SHCHcy;"],[0,"&HARDcy;"],[0,"&Ycy;"],[0,"&SOFTcy;"],[0,"&Ecy;"],[0,"&YUcy;"],[0,"&YAcy;"],[0,"&acy;"],[0,"&bcy;"],[0,"&vcy;"],[0,"&gcy;"],[0,"&dcy;"],[0,"&iecy;"],[0,"&zhcy;"],[0,"&zcy;"],[0,"&icy;"],[0,"&jcy;"],[0,"&kcy;"],[0,"&lcy;"],[0,"&mcy;"],[0,"&ncy;"],[0,"&ocy;"],[0,"&pcy;"],[0,"&rcy;"],[0,"&scy;"],[0,"&tcy;"],[0,"&ucy;"],[0,"&fcy;"],[0,"&khcy;"],[0,"&tscy;"],[0,"&chcy;"],[0,"&shcy;"],[0,"&shchcy;"],[0,"&hardcy;"],[0,"&ycy;"],[0,"&softcy;"],[0,"&ecy;"],[0,"&yucy;"],[0,"&yacy;"],[1,"&iocy;"],[0,"&djcy;"],[0,"&gjcy;"],[0,"&jukcy;"],[0,"&dscy;"],[0,"&iukcy;"],[0,"&yicy;"],[0,"&jsercy;"],[0,"&ljcy;"],[0,"&njcy;"],[0,"&tshcy;"],[0,"&kjcy;"],[1,"&ubrcy;"],[0,"&dzcy;"],[7074,"&ensp;"],[0,"&emsp;"],[0,"&emsp13;"],[0,"&emsp14;"],[1,"&numsp;"],[0,"&puncsp;"],[0,"&ThinSpace;"],[0,"&hairsp;"],[0,"&NegativeMediumSpace;"],[0,"&zwnj;"],[0,"&zwj;"],[0,"&lrm;"],[0,"&rlm;"],[0,"&dash;"],[2,"&ndash;"],[0,"&mdash;"],[0,"&horbar;"],[0,"&Verbar;"],[1,"&lsquo;"],[0,"&CloseCurlyQuote;"],[0,"&lsquor;"],[1,"&ldquo;"],[0,"&CloseCurlyDoubleQuote;"],[0,"&bdquo;"],[1,"&dagger;"],[0,"&Dagger;"],[0,"&bull;"],[2,"&nldr;"],[0,"&hellip;"],[9,"&permil;"],[0,"&pertenk;"],[0,"&prime;"],[0,"&Prime;"],[0,"&tprime;"],[0,"&backprime;"],[3,"&lsaquo;"],[0,"&rsaquo;"],[3,"&oline;"],[2,"&caret;"],[1,"&hybull;"],[0,"&frasl;"],[10,"&bsemi;"],[7,"&qprime;"],[7,{v:"&MediumSpace;",n:8202,o:"&ThickSpace;"}],[0,"&NoBreak;"],[0,"&af;"],[0,"&InvisibleTimes;"],[0,"&ic;"],[72,"&euro;"],[46,"&tdot;"],[0,"&DotDot;"],[37,"&complexes;"],[2,"&incare;"],[4,"&gscr;"],[0,"&hamilt;"],[0,"&Hfr;"],[0,"&Hopf;"],[0,"&planckh;"],[0,"&hbar;"],[0,"&imagline;"],[0,"&Ifr;"],[0,"&lagran;"],[0,"&ell;"],[1,"&naturals;"],[0,"&numero;"],[0,"&copysr;"],[0,"&weierp;"],[0,"&Popf;"],[0,"&Qopf;"],[0,"&realine;"],[0,"&real;"],[0,"&reals;"],[0,"&rx;"],[3,"&trade;"],[1,"&integers;"],[2,"&mho;"],[0,"&zeetrf;"],[0,"&iiota;"],[2,"&bernou;"],[0,"&Cayleys;"],[1,"&escr;"],[0,"&Escr;"],[0,"&Fouriertrf;"],[1,"&Mellintrf;"],[0,"&order;"],[0,"&alefsym;"],[0,"&beth;"],[0,"&gimel;"],[0,"&daleth;"],[12,"&CapitalDifferentialD;"],[0,"&dd;"],[0,"&ee;"],[0,"&ii;"],[10,"&frac13;"],[0,"&frac23;"],[0,"&frac15;"],[0,"&frac25;"],[0,"&frac35;"],[0,"&frac45;"],[0,"&frac16;"],[0,"&frac56;"],[0,"&frac18;"],[0,"&frac38;"],[0,"&frac58;"],[0,"&frac78;"],[49,"&larr;"],[0,"&ShortUpArrow;"],[0,"&rarr;"],[0,"&darr;"],[0,"&harr;"],[0,"&updownarrow;"],[0,"&nwarr;"],[0,"&nearr;"],[0,"&LowerRightArrow;"],[0,"&LowerLeftArrow;"],[0,"&nlarr;"],[0,"&nrarr;"],[1,{v:"&rarrw;",n:824,o:"&nrarrw;"}],[0,"&Larr;"],[0,"&Uarr;"],[0,"&Rarr;"],[0,"&Darr;"],[0,"&larrtl;"],[0,"&rarrtl;"],[0,"&LeftTeeArrow;"],[0,"&mapstoup;"],[0,"&map;"],[0,"&DownTeeArrow;"],[1,"&hookleftarrow;"],[0,"&hookrightarrow;"],[0,"&larrlp;"],[0,"&looparrowright;"],[0,"&harrw;"],[0,"&nharr;"],[1,"&lsh;"],[0,"&rsh;"],[0,"&ldsh;"],[0,"&rdsh;"],[1,"&crarr;"],[0,"&cularr;"],[0,"&curarr;"],[2,"&circlearrowleft;"],[0,"&circlearrowright;"],[0,"&leftharpoonup;"],[0,"&DownLeftVector;"],[0,"&RightUpVector;"],[0,"&LeftUpVector;"],[0,"&rharu;"],[0,"&DownRightVector;"],[0,"&dharr;"],[0,"&dharl;"],[0,"&RightArrowLeftArrow;"],[0,"&udarr;"],[0,"&LeftArrowRightArrow;"],[0,"&leftleftarrows;"],[0,"&upuparrows;"],[0,"&rightrightarrows;"],[0,"&ddarr;"],[0,"&leftrightharpoons;"],[0,"&Equilibrium;"],[0,"&nlArr;"],[0,"&nhArr;"],[0,"&nrArr;"],[0,"&DoubleLeftArrow;"],[0,"&DoubleUpArrow;"],[0,"&DoubleRightArrow;"],[0,"&dArr;"],[0,"&DoubleLeftRightArrow;"],[0,"&DoubleUpDownArrow;"],[0,"&nwArr;"],[0,"&neArr;"],[0,"&seArr;"],[0,"&swArr;"],[0,"&lAarr;"],[0,"&rAarr;"],[1,"&zigrarr;"],[6,"&larrb;"],[0,"&rarrb;"],[15,"&DownArrowUpArrow;"],[7,"&loarr;"],[0,"&roarr;"],[0,"&hoarr;"],[0,"&forall;"],[0,"&comp;"],[0,{v:"&part;",n:824,o:"&npart;"}],[0,"&exist;"],[0,"&nexist;"],[0,"&empty;"],[1,"&Del;"],[0,"&Element;"],[0,"&NotElement;"],[1,"&ni;"],[0,"&notni;"],[2,"&prod;"],[0,"&coprod;"],[0,"&sum;"],[0,"&minus;"],[0,"&MinusPlus;"],[0,"&dotplus;"],[1,"&Backslash;"],[0,"&lowast;"],[0,"&compfn;"],[1,"&radic;"],[2,"&prop;"],[0,"&infin;"],[0,"&angrt;"],[0,{v:"&ang;",n:8402,o:"&nang;"}],[0,"&angmsd;"],[0,"&angsph;"],[0,"&mid;"],[0,"&nmid;"],[0,"&DoubleVerticalBar;"],[0,"&NotDoubleVerticalBar;"],[0,"&and;"],[0,"&or;"],[0,{v:"&cap;",n:65024,o:"&caps;"}],[0,{v:"&cup;",n:65024,o:"&cups;"}],[0,"&int;"],[0,"&Int;"],[0,"&iiint;"],[0,"&conint;"],[0,"&Conint;"],[0,"&Cconint;"],[0,"&cwint;"],[0,"&ClockwiseContourIntegral;"],[0,"&awconint;"],[0,"&there4;"],[0,"&becaus;"],[0,"&ratio;"],[0,"&Colon;"],[0,"&dotminus;"],[1,"&mDDot;"],[0,"&homtht;"],[0,{v:"&sim;",n:8402,o:"&nvsim;"}],[0,{v:"&backsim;",n:817,o:"&race;"}],[0,{v:"&ac;",n:819,o:"&acE;"}],[0,"&acd;"],[0,"&VerticalTilde;"],[0,"&NotTilde;"],[0,{v:"&eqsim;",n:824,o:"&nesim;"}],[0,"&sime;"],[0,"&NotTildeEqual;"],[0,"&cong;"],[0,"&simne;"],[0,"&ncong;"],[0,"&ap;"],[0,"&nap;"],[0,"&ape;"],[0,{v:"&apid;",n:824,o:"&napid;"}],[0,"&backcong;"],[0,{v:"&asympeq;",n:8402,o:"&nvap;"}],[0,{v:"&bump;",n:824,o:"&nbump;"}],[0,{v:"&bumpe;",n:824,o:"&nbumpe;"}],[0,{v:"&doteq;",n:824,o:"&nedot;"}],[0,"&doteqdot;"],[0,"&efDot;"],[0,"&erDot;"],[0,"&Assign;"],[0,"&ecolon;"],[0,"&ecir;"],[0,"&circeq;"],[1,"&wedgeq;"],[0,"&veeeq;"],[1,"&triangleq;"],[2,"&equest;"],[0,"&ne;"],[0,{v:"&Congruent;",n:8421,o:"&bnequiv;"}],[0,"&nequiv;"],[1,{v:"&le;",n:8402,o:"&nvle;"}],[0,{v:"&ge;",n:8402,o:"&nvge;"}],[0,{v:"&lE;",n:824,o:"&nlE;"}],[0,{v:"&gE;",n:824,o:"&ngE;"}],[0,{v:"&lnE;",n:65024,o:"&lvertneqq;"}],[0,{v:"&gnE;",n:65024,o:"&gvertneqq;"}],[0,{v:"&ll;",n:new Map(Wt([[824,"&nLtv;"],[7577,"&nLt;"]]))}],[0,{v:"&gg;",n:new Map(Wt([[824,"&nGtv;"],[7577,"&nGt;"]]))}],[0,"&between;"],[0,"&NotCupCap;"],[0,"&nless;"],[0,"&ngt;"],[0,"&nle;"],[0,"&nge;"],[0,"&lesssim;"],[0,"&GreaterTilde;"],[0,"&nlsim;"],[0,"&ngsim;"],[0,"&LessGreater;"],[0,"&gl;"],[0,"&NotLessGreater;"],[0,"&NotGreaterLess;"],[0,"&pr;"],[0,"&sc;"],[0,"&prcue;"],[0,"&sccue;"],[0,"&PrecedesTilde;"],[0,{v:"&scsim;",n:824,o:"&NotSucceedsTilde;"}],[0,"&NotPrecedes;"],[0,"&NotSucceeds;"],[0,{v:"&sub;",n:8402,o:"&NotSubset;"}],[0,{v:"&sup;",n:8402,o:"&NotSuperset;"}],[0,"&nsub;"],[0,"&nsup;"],[0,"&sube;"],[0,"&supe;"],[0,"&NotSubsetEqual;"],[0,"&NotSupersetEqual;"],[0,{v:"&subne;",n:65024,o:"&varsubsetneq;"}],[0,{v:"&supne;",n:65024,o:"&varsupsetneq;"}],[1,"&cupdot;"],[0,"&UnionPlus;"],[0,{v:"&sqsub;",n:824,o:"&NotSquareSubset;"}],[0,{v:"&sqsup;",n:824,o:"&NotSquareSuperset;"}],[0,"&sqsube;"],[0,"&sqsupe;"],[0,{v:"&sqcap;",n:65024,o:"&sqcaps;"}],[0,{v:"&sqcup;",n:65024,o:"&sqcups;"}],[0,"&CirclePlus;"],[0,"&CircleMinus;"],[0,"&CircleTimes;"],[0,"&osol;"],[0,"&CircleDot;"],[0,"&circledcirc;"],[0,"&circledast;"],[1,"&circleddash;"],[0,"&boxplus;"],[0,"&boxminus;"],[0,"&boxtimes;"],[0,"&dotsquare;"],[0,"&RightTee;"],[0,"&dashv;"],[0,"&DownTee;"],[0,"&bot;"],[1,"&models;"],[0,"&DoubleRightTee;"],[0,"&Vdash;"],[0,"&Vvdash;"],[0,"&VDash;"],[0,"&nvdash;"],[0,"&nvDash;"],[0,"&nVdash;"],[0,"&nVDash;"],[0,"&prurel;"],[1,"&LeftTriangle;"],[0,"&RightTriangle;"],[0,{v:"&LeftTriangleEqual;",n:8402,o:"&nvltrie;"}],[0,{v:"&RightTriangleEqual;",n:8402,o:"&nvrtrie;"}],[0,"&origof;"],[0,"&imof;"],[0,"&multimap;"],[0,"&hercon;"],[0,"&intcal;"],[0,"&veebar;"],[1,"&barvee;"],[0,"&angrtvb;"],[0,"&lrtri;"],[0,"&bigwedge;"],[0,"&bigvee;"],[0,"&bigcap;"],[0,"&bigcup;"],[0,"&diam;"],[0,"&sdot;"],[0,"&sstarf;"],[0,"&divideontimes;"],[0,"&bowtie;"],[0,"&ltimes;"],[0,"&rtimes;"],[0,"&leftthreetimes;"],[0,"&rightthreetimes;"],[0,"&backsimeq;"],[0,"&curlyvee;"],[0,"&curlywedge;"],[0,"&Sub;"],[0,"&Sup;"],[0,"&Cap;"],[0,"&Cup;"],[0,"&fork;"],[0,"&epar;"],[0,"&lessdot;"],[0,"&gtdot;"],[0,{v:"&Ll;",n:824,o:"&nLl;"}],[0,{v:"&Gg;",n:824,o:"&nGg;"}],[0,{v:"&leg;",n:65024,o:"&lesg;"}],[0,{v:"&gel;",n:65024,o:"&gesl;"}],[2,"&cuepr;"],[0,"&cuesc;"],[0,"&NotPrecedesSlantEqual;"],[0,"&NotSucceedsSlantEqual;"],[0,"&NotSquareSubsetEqual;"],[0,"&NotSquareSupersetEqual;"],[2,"&lnsim;"],[0,"&gnsim;"],[0,"&precnsim;"],[0,"&scnsim;"],[0,"&nltri;"],[0,"&NotRightTriangle;"],[0,"&nltrie;"],[0,"&NotRightTriangleEqual;"],[0,"&vellip;"],[0,"&ctdot;"],[0,"&utdot;"],[0,"&dtdot;"],[0,"&disin;"],[0,"&isinsv;"],[0,"&isins;"],[0,{v:"&isindot;",n:824,o:"&notindot;"}],[0,"&notinvc;"],[0,"&notinvb;"],[1,{v:"&isinE;",n:824,o:"&notinE;"}],[0,"&nisd;"],[0,"&xnis;"],[0,"&nis;"],[0,"&notnivc;"],[0,"&notnivb;"],[6,"&barwed;"],[0,"&Barwed;"],[1,"&lceil;"],[0,"&rceil;"],[0,"&LeftFloor;"],[0,"&rfloor;"],[0,"&drcrop;"],[0,"&dlcrop;"],[0,"&urcrop;"],[0,"&ulcrop;"],[0,"&bnot;"],[1,"&profline;"],[0,"&profsurf;"],[1,"&telrec;"],[0,"&target;"],[5,"&ulcorn;"],[0,"&urcorn;"],[0,"&dlcorn;"],[0,"&drcorn;"],[2,"&frown;"],[0,"&smile;"],[9,"&cylcty;"],[0,"&profalar;"],[7,"&topbot;"],[6,"&ovbar;"],[1,"&solbar;"],[60,"&angzarr;"],[51,"&lmoustache;"],[0,"&rmoustache;"],[2,"&OverBracket;"],[0,"&bbrk;"],[0,"&bbrktbrk;"],[37,"&OverParenthesis;"],[0,"&UnderParenthesis;"],[0,"&OverBrace;"],[0,"&UnderBrace;"],[2,"&trpezium;"],[4,"&elinters;"],[59,"&blank;"],[164,"&circledS;"],[55,"&boxh;"],[1,"&boxv;"],[9,"&boxdr;"],[3,"&boxdl;"],[3,"&boxur;"],[3,"&boxul;"],[3,"&boxvr;"],[7,"&boxvl;"],[7,"&boxhd;"],[7,"&boxhu;"],[7,"&boxvh;"],[19,"&boxH;"],[0,"&boxV;"],[0,"&boxdR;"],[0,"&boxDr;"],[0,"&boxDR;"],[0,"&boxdL;"],[0,"&boxDl;"],[0,"&boxDL;"],[0,"&boxuR;"],[0,"&boxUr;"],[0,"&boxUR;"],[0,"&boxuL;"],[0,"&boxUl;"],[0,"&boxUL;"],[0,"&boxvR;"],[0,"&boxVr;"],[0,"&boxVR;"],[0,"&boxvL;"],[0,"&boxVl;"],[0,"&boxVL;"],[0,"&boxHd;"],[0,"&boxhD;"],[0,"&boxHD;"],[0,"&boxHu;"],[0,"&boxhU;"],[0,"&boxHU;"],[0,"&boxvH;"],[0,"&boxVh;"],[0,"&boxVH;"],[19,"&uhblk;"],[3,"&lhblk;"],[3,"&block;"],[8,"&blk14;"],[0,"&blk12;"],[0,"&blk34;"],[13,"&square;"],[8,"&blacksquare;"],[0,"&EmptyVerySmallSquare;"],[1,"&rect;"],[0,"&marker;"],[2,"&fltns;"],[1,"&bigtriangleup;"],[0,"&blacktriangle;"],[0,"&triangle;"],[2,"&blacktriangleright;"],[0,"&rtri;"],[3,"&bigtriangledown;"],[0,"&blacktriangledown;"],[0,"&dtri;"],[2,"&blacktriangleleft;"],[0,"&ltri;"],[6,"&loz;"],[0,"&cir;"],[32,"&tridot;"],[2,"&bigcirc;"],[8,"&ultri;"],[0,"&urtri;"],[0,"&lltri;"],[0,"&EmptySmallSquare;"],[0,"&FilledSmallSquare;"],[8,"&bigstar;"],[0,"&star;"],[7,"&phone;"],[49,"&female;"],[1,"&male;"],[29,"&spades;"],[2,"&clubs;"],[1,"&hearts;"],[0,"&diamondsuit;"],[3,"&sung;"],[2,"&flat;"],[0,"&natural;"],[0,"&sharp;"],[163,"&check;"],[3,"&cross;"],[8,"&malt;"],[21,"&sext;"],[33,"&VerticalSeparator;"],[25,"&lbbrk;"],[0,"&rbbrk;"],[84,"&bsolhsub;"],[0,"&suphsol;"],[28,"&LeftDoubleBracket;"],[0,"&RightDoubleBracket;"],[0,"&lang;"],[0,"&rang;"],[0,"&Lang;"],[0,"&Rang;"],[0,"&loang;"],[0,"&roang;"],[7,"&longleftarrow;"],[0,"&longrightarrow;"],[0,"&longleftrightarrow;"],[0,"&DoubleLongLeftArrow;"],[0,"&DoubleLongRightArrow;"],[0,"&DoubleLongLeftRightArrow;"],[1,"&longmapsto;"],[2,"&dzigrarr;"],[258,"&nvlArr;"],[0,"&nvrArr;"],[0,"&nvHarr;"],[0,"&Map;"],[6,"&lbarr;"],[0,"&bkarow;"],[0,"&lBarr;"],[0,"&dbkarow;"],[0,"&drbkarow;"],[0,"&DDotrahd;"],[0,"&UpArrowBar;"],[0,"&DownArrowBar;"],[2,"&Rarrtl;"],[2,"&latail;"],[0,"&ratail;"],[0,"&lAtail;"],[0,"&rAtail;"],[0,"&larrfs;"],[0,"&rarrfs;"],[0,"&larrbfs;"],[0,"&rarrbfs;"],[2,"&nwarhk;"],[0,"&nearhk;"],[0,"&hksearow;"],[0,"&hkswarow;"],[0,"&nwnear;"],[0,"&nesear;"],[0,"&seswar;"],[0,"&swnwar;"],[8,{v:"&rarrc;",n:824,o:"&nrarrc;"}],[1,"&cudarrr;"],[0,"&ldca;"],[0,"&rdca;"],[0,"&cudarrl;"],[0,"&larrpl;"],[2,"&curarrm;"],[0,"&cularrp;"],[7,"&rarrpl;"],[2,"&harrcir;"],[0,"&Uarrocir;"],[0,"&lurdshar;"],[0,"&ldrushar;"],[2,"&LeftRightVector;"],[0,"&RightUpDownVector;"],[0,"&DownLeftRightVector;"],[0,"&LeftUpDownVector;"],[0,"&LeftVectorBar;"],[0,"&RightVectorBar;"],[0,"&RightUpVectorBar;"],[0,"&RightDownVectorBar;"],[0,"&DownLeftVectorBar;"],[0,"&DownRightVectorBar;"],[0,"&LeftUpVectorBar;"],[0,"&LeftDownVectorBar;"],[0,"&LeftTeeVector;"],[0,"&RightTeeVector;"],[0,"&RightUpTeeVector;"],[0,"&RightDownTeeVector;"],[0,"&DownLeftTeeVector;"],[0,"&DownRightTeeVector;"],[0,"&LeftUpTeeVector;"],[0,"&LeftDownTeeVector;"],[0,"&lHar;"],[0,"&uHar;"],[0,"&rHar;"],[0,"&dHar;"],[0,"&luruhar;"],[0,"&ldrdhar;"],[0,"&ruluhar;"],[0,"&rdldhar;"],[0,"&lharul;"],[0,"&llhard;"],[0,"&rharul;"],[0,"&lrhard;"],[0,"&udhar;"],[0,"&duhar;"],[0,"&RoundImplies;"],[0,"&erarr;"],[0,"&simrarr;"],[0,"&larrsim;"],[0,"&rarrsim;"],[0,"&rarrap;"],[0,"&ltlarr;"],[1,"&gtrarr;"],[0,"&subrarr;"],[1,"&suplarr;"],[0,"&lfisht;"],[0,"&rfisht;"],[0,"&ufisht;"],[0,"&dfisht;"],[5,"&lopar;"],[0,"&ropar;"],[4,"&lbrke;"],[0,"&rbrke;"],[0,"&lbrkslu;"],[0,"&rbrksld;"],[0,"&lbrksld;"],[0,"&rbrkslu;"],[0,"&langd;"],[0,"&rangd;"],[0,"&lparlt;"],[0,"&rpargt;"],[0,"&gtlPar;"],[0,"&ltrPar;"],[3,"&vzigzag;"],[1,"&vangrt;"],[0,"&angrtvbd;"],[6,"&ange;"],[0,"&range;"],[0,"&dwangle;"],[0,"&uwangle;"],[0,"&angmsdaa;"],[0,"&angmsdab;"],[0,"&angmsdac;"],[0,"&angmsdad;"],[0,"&angmsdae;"],[0,"&angmsdaf;"],[0,"&angmsdag;"],[0,"&angmsdah;"],[0,"&bemptyv;"],[0,"&demptyv;"],[0,"&cemptyv;"],[0,"&raemptyv;"],[0,"&laemptyv;"],[0,"&ohbar;"],[0,"&omid;"],[0,"&opar;"],[1,"&operp;"],[1,"&olcross;"],[0,"&odsold;"],[1,"&olcir;"],[0,"&ofcir;"],[0,"&olt;"],[0,"&ogt;"],[0,"&cirscir;"],[0,"&cirE;"],[0,"&solb;"],[0,"&bsolb;"],[3,"&boxbox;"],[3,"&trisb;"],[0,"&rtriltri;"],[0,{v:"&LeftTriangleBar;",n:824,o:"&NotLeftTriangleBar;"}],[0,{v:"&RightTriangleBar;",n:824,o:"&NotRightTriangleBar;"}],[11,"&iinfin;"],[0,"&infintie;"],[0,"&nvinfin;"],[4,"&eparsl;"],[0,"&smeparsl;"],[0,"&eqvparsl;"],[5,"&blacklozenge;"],[8,"&RuleDelayed;"],[1,"&dsol;"],[9,"&bigodot;"],[0,"&bigoplus;"],[0,"&bigotimes;"],[1,"&biguplus;"],[1,"&bigsqcup;"],[5,"&iiiint;"],[0,"&fpartint;"],[2,"&cirfnint;"],[0,"&awint;"],[0,"&rppolint;"],[0,"&scpolint;"],[0,"&npolint;"],[0,"&pointint;"],[0,"&quatint;"],[0,"&intlarhk;"],[10,"&pluscir;"],[0,"&plusacir;"],[0,"&simplus;"],[0,"&plusdu;"],[0,"&plussim;"],[0,"&plustwo;"],[1,"&mcomma;"],[0,"&minusdu;"],[2,"&loplus;"],[0,"&roplus;"],[0,"&Cross;"],[0,"&timesd;"],[0,"&timesbar;"],[1,"&smashp;"],[0,"&lotimes;"],[0,"&rotimes;"],[0,"&otimesas;"],[0,"&Otimes;"],[0,"&odiv;"],[0,"&triplus;"],[0,"&triminus;"],[0,"&tritime;"],[0,"&intprod;"],[2,"&amalg;"],[0,"&capdot;"],[1,"&ncup;"],[0,"&ncap;"],[0,"&capand;"],[0,"&cupor;"],[0,"&cupcap;"],[0,"&capcup;"],[0,"&cupbrcap;"],[0,"&capbrcup;"],[0,"&cupcup;"],[0,"&capcap;"],[0,"&ccups;"],[0,"&ccaps;"],[2,"&ccupssm;"],[2,"&And;"],[0,"&Or;"],[0,"&andand;"],[0,"&oror;"],[0,"&orslope;"],[0,"&andslope;"],[1,"&andv;"],[0,"&orv;"],[0,"&andd;"],[0,"&ord;"],[1,"&wedbar;"],[6,"&sdote;"],[3,"&simdot;"],[2,{v:"&congdot;",n:824,o:"&ncongdot;"}],[0,"&easter;"],[0,"&apacir;"],[0,{v:"&apE;",n:824,o:"&napE;"}],[0,"&eplus;"],[0,"&pluse;"],[0,"&Esim;"],[0,"&Colone;"],[0,"&Equal;"],[1,"&ddotseq;"],[0,"&equivDD;"],[0,"&ltcir;"],[0,"&gtcir;"],[0,"&ltquest;"],[0,"&gtquest;"],[0,{v:"&leqslant;",n:824,o:"&nleqslant;"}],[0,{v:"&geqslant;",n:824,o:"&ngeqslant;"}],[0,"&lesdot;"],[0,"&gesdot;"],[0,"&lesdoto;"],[0,"&gesdoto;"],[0,"&lesdotor;"],[0,"&gesdotol;"],[0,"&lap;"],[0,"&gap;"],[0,"&lne;"],[0,"&gne;"],[0,"&lnap;"],[0,"&gnap;"],[0,"&lEg;"],[0,"&gEl;"],[0,"&lsime;"],[0,"&gsime;"],[0,"&lsimg;"],[0,"&gsiml;"],[0,"&lgE;"],[0,"&glE;"],[0,"&lesges;"],[0,"&gesles;"],[0,"&els;"],[0,"&egs;"],[0,"&elsdot;"],[0,"&egsdot;"],[0,"&el;"],[0,"&eg;"],[2,"&siml;"],[0,"&simg;"],[0,"&simlE;"],[0,"&simgE;"],[0,{v:"&LessLess;",n:824,o:"&NotNestedLessLess;"}],[0,{v:"&GreaterGreater;",n:824,o:"&NotNestedGreaterGreater;"}],[1,"&glj;"],[0,"&gla;"],[0,"&ltcc;"],[0,"&gtcc;"],[0,"&lescc;"],[0,"&gescc;"],[0,"&smt;"],[0,"&lat;"],[0,{v:"&smte;",n:65024,o:"&smtes;"}],[0,{v:"&late;",n:65024,o:"&lates;"}],[0,"&bumpE;"],[0,{v:"&PrecedesEqual;",n:824,o:"&NotPrecedesEqual;"}],[0,{v:"&sce;",n:824,o:"&NotSucceedsEqual;"}],[2,"&prE;"],[0,"&scE;"],[0,"&precneqq;"],[0,"&scnE;"],[0,"&prap;"],[0,"&scap;"],[0,"&precnapprox;"],[0,"&scnap;"],[0,"&Pr;"],[0,"&Sc;"],[0,"&subdot;"],[0,"&supdot;"],[0,"&subplus;"],[0,"&supplus;"],[0,"&submult;"],[0,"&supmult;"],[0,"&subedot;"],[0,"&supedot;"],[0,{v:"&subE;",n:824,o:"&nsubE;"}],[0,{v:"&supE;",n:824,o:"&nsupE;"}],[0,"&subsim;"],[0,"&supsim;"],[2,{v:"&subnE;",n:65024,o:"&varsubsetneqq;"}],[0,{v:"&supnE;",n:65024,o:"&varsupsetneqq;"}],[2,"&csub;"],[0,"&csup;"],[0,"&csube;"],[0,"&csupe;"],[0,"&subsup;"],[0,"&supsub;"],[0,"&subsub;"],[0,"&supsup;"],[0,"&suphsub;"],[0,"&supdsub;"],[0,"&forkv;"],[0,"&topfork;"],[0,"&mlcp;"],[8,"&Dashv;"],[1,"&Vdashl;"],[0,"&Barv;"],[0,"&vBar;"],[0,"&vBarv;"],[1,"&Vbar;"],[0,"&Not;"],[0,"&bNot;"],[0,"&rnmid;"],[0,"&cirmid;"],[0,"&midcir;"],[0,"&topcir;"],[0,"&nhpar;"],[0,"&parsim;"],[9,{v:"&parsl;",n:8421,o:"&nparsl;"}],[44343,{n:new Map(Wt([[56476,"&Ascr;"],[1,"&Cscr;"],[0,"&Dscr;"],[2,"&Gscr;"],[2,"&Jscr;"],[0,"&Kscr;"],[2,"&Nscr;"],[0,"&Oscr;"],[0,"&Pscr;"],[0,"&Qscr;"],[1,"&Sscr;"],[0,"&Tscr;"],[0,"&Uscr;"],[0,"&Vscr;"],[0,"&Wscr;"],[0,"&Xscr;"],[0,"&Yscr;"],[0,"&Zscr;"],[0,"&ascr;"],[0,"&bscr;"],[0,"&cscr;"],[0,"&dscr;"],[1,"&fscr;"],[1,"&hscr;"],[0,"&iscr;"],[0,"&jscr;"],[0,"&kscr;"],[0,"&lscr;"],[0,"&mscr;"],[0,"&nscr;"],[1,"&pscr;"],[0,"&qscr;"],[0,"&rscr;"],[0,"&sscr;"],[0,"&tscr;"],[0,"&uscr;"],[0,"&vscr;"],[0,"&wscr;"],[0,"&xscr;"],[0,"&yscr;"],[0,"&zscr;"],[52,"&Afr;"],[0,"&Bfr;"],[1,"&Dfr;"],[0,"&Efr;"],[0,"&Ffr;"],[0,"&Gfr;"],[2,"&Jfr;"],[0,"&Kfr;"],[0,"&Lfr;"],[0,"&Mfr;"],[0,"&Nfr;"],[0,"&Ofr;"],[0,"&Pfr;"],[0,"&Qfr;"],[1,"&Sfr;"],[0,"&Tfr;"],[0,"&Ufr;"],[0,"&Vfr;"],[0,"&Wfr;"],[0,"&Xfr;"],[0,"&Yfr;"],[1,"&afr;"],[0,"&bfr;"],[0,"&cfr;"],[0,"&dfr;"],[0,"&efr;"],[0,"&ffr;"],[0,"&gfr;"],[0,"&hfr;"],[0,"&ifr;"],[0,"&jfr;"],[0,"&kfr;"],[0,"&lfr;"],[0,"&mfr;"],[0,"&nfr;"],[0,"&ofr;"],[0,"&pfr;"],[0,"&qfr;"],[0,"&rfr;"],[0,"&sfr;"],[0,"&tfr;"],[0,"&ufr;"],[0,"&vfr;"],[0,"&wfr;"],[0,"&xfr;"],[0,"&yfr;"],[0,"&zfr;"],[0,"&Aopf;"],[0,"&Bopf;"],[1,"&Dopf;"],[0,"&Eopf;"],[0,"&Fopf;"],[0,"&Gopf;"],[1,"&Iopf;"],[0,"&Jopf;"],[0,"&Kopf;"],[0,"&Lopf;"],[0,"&Mopf;"],[1,"&Oopf;"],[3,"&Sopf;"],[0,"&Topf;"],[0,"&Uopf;"],[0,"&Vopf;"],[0,"&Wopf;"],[0,"&Xopf;"],[0,"&Yopf;"],[1,"&aopf;"],[0,"&bopf;"],[0,"&copf;"],[0,"&dopf;"],[0,"&eopf;"],[0,"&fopf;"],[0,"&gopf;"],[0,"&hopf;"],[0,"&iopf;"],[0,"&jopf;"],[0,"&kopf;"],[0,"&lopf;"],[0,"&mopf;"],[0,"&nopf;"],[0,"&oopf;"],[0,"&popf;"],[0,"&qopf;"],[0,"&ropf;"],[0,"&sopf;"],[0,"&topf;"],[0,"&uopf;"],[0,"&vopf;"],[0,"&wopf;"],[0,"&xopf;"],[0,"&yopf;"],[0,"&zopf;"]]))}],[8906,"&fflig;"],[0,"&filig;"],[0,"&fllig;"],[0,"&ffilig;"],[0,"&ffllig;"]])),Kt=Object.defineProperty({default:Gt},"__esModule",{value:!0}),Xt=It((function(t,e){Object.defineProperty(e,"__esModule",{value:!0}),e.escapeText=e.escapeAttribute=e.escapeUTF8=e.escape=e.encodeXML=e.getCodePoint=e.xmlReplacer=void 0,e.xmlReplacer=/["&'<>$\x80-\uFFFF]/g;var o=new Map([[34,"&quot;"],[38,"&amp;"],[39,"&apos;"],[60,"&lt;"],[62,"&gt;"]]);function n(t){for(var n,r="",i=0;null!==(n=e.xmlReplacer.exec(t));){var s=n.index,a=t.charCodeAt(s),l=o.get(a);void 0!==l?(r+=t.substring(i,s)+l,i=s+1):(r+="".concat(t.substring(i,s),"&#x").concat((0,e.getCodePoint)(t,s).toString(16),";"),i=e.xmlReplacer.lastIndex+=Number(55296==(64512&a)))}return r+t.substr(i)}function r(t,e){return function(o){for(var n,r=0,i="";n=t.exec(o);)r!==n.index&&(i+=o.substring(r,n.index)),i+=e.get(n[0].charCodeAt(0)),r=n.index+1;return i+o.substring(r)}}e.getCodePoint=null!=String.prototype.codePointAt?function(t,e){return t.codePointAt(e)}:function(t,e){return 55296==(64512&t.charCodeAt(e))?1024*(t.charCodeAt(e)-55296)+t.charCodeAt(e+1)-56320+65536:t.charCodeAt(e)},e.encodeXML=n,e.escape=n,e.escapeUTF8=r(/[&<>'"]/g,o),e.escapeAttribute=r(/["&\u00A0]/g,new Map([[34,"&quot;"],[38,"&amp;"],[160,"&nbsp;"]])),e.escapeText=r(/[&<>\u00A0]/g,new Map([[38,"&amp;"],[60,"&lt;"],[62,"&gt;"],[160,"&nbsp;"]]))})),Jt=It((function(t,e){var o=Dt&&Dt.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0}),e.encodeNonAsciiHTML=e.encodeHTML=void 0;var n=o(Kt),r=/[\t\n!-,./:-@[-`\f{-}$\x80-\uFFFF]/g;function i(t,e){for(var o,r="",i=0;null!==(o=t.exec(e));){var s=o.index;r+=e.substring(i,s);var a=e.charCodeAt(s),l=n.default.get(a);if("object"==typeof l){if(s+1<e.length){var c=e.charCodeAt(s+1),d="number"==typeof l.n?l.n===c?l.o:void 0:l.n.get(c);if(void 0!==d){r+=d,i=t.lastIndex+=1;continue}}l=l.v}if(void 0!==l)r+=l,i=s+1;else{var u=(0,Xt.getCodePoint)(e,s);r+="&#x".concat(u.toString(16),";"),i=t.lastIndex+=Number(u!==a)}}return r+e.substr(i)}e.encodeHTML=function(t){return i(r,t)},e.encodeNonAsciiHTML=function(t){return i(Xt.xmlReplacer,t)}})),Yt=It((function(t,e){var o,n,r;Object.defineProperty(e,"__esModule",{value:!0}),e.decodeXMLStrict=e.decodeHTML5Strict=e.decodeHTML4Strict=e.decodeHTML5=e.decodeHTML4=e.decodeHTMLStrict=e.decodeHTML=e.decodeXML=e.encodeHTML5=e.encodeHTML4=e.encodeNonAsciiHTML=e.encodeHTML=e.escapeText=e.escapeAttribute=e.escapeUTF8=e.escape=e.encodeXML=e.encode=e.decodeStrict=e.decode=e.EncodingMode=e.DecodingMode=e.EntityLevel=void 0,function(t){t[t.XML=0]="XML",t[t.HTML=1]="HTML"}(o=e.EntityLevel||(e.EntityLevel={})),function(t){t[t.Legacy=0]="Legacy",t[t.Strict=1]="Strict"}(n=e.DecodingMode||(e.DecodingMode={})),function(t){t[t.UTF8=0]="UTF8",t[t.ASCII=1]="ASCII",t[t.Extensive=2]="Extensive",t[t.Attribute=3]="Attribute",t[t.Text=4]="Text"}(r=e.EncodingMode||(e.EncodingMode={})),e.decode=function(t,e){void 0===e&&(e=o.XML);var r="number"==typeof e?{level:e}:e;return r.level===o.HTML?r.mode===n.Strict?(0,zt.decodeHTMLStrict)(t):(0,zt.decodeHTML)(t):(0,zt.decodeXML)(t)},e.decodeStrict=function(t,e){void 0===e&&(e=o.XML);var r="number"==typeof e?{level:e}:e;return r.level===o.HTML?r.mode===n.Legacy?(0,zt.decodeHTML)(t):(0,zt.decodeHTMLStrict)(t):(0,zt.decodeXML)(t)},e.encode=function(t,e){void 0===e&&(e=o.XML);var n="number"==typeof e?{level:e}:e;return n.mode===r.UTF8?(0,Xt.escapeUTF8)(t):n.mode===r.Attribute?(0,Xt.escapeAttribute)(t):n.mode===r.Text?(0,Xt.escapeText)(t):n.level===o.HTML?n.mode===r.ASCII?(0,Jt.encodeNonAsciiHTML)(t):(0,Jt.encodeHTML)(t):(0,Xt.encodeXML)(t)};var i=Xt;Object.defineProperty(e,"encodeXML",{enumerable:!0,get:function(){return i.encodeXML}}),Object.defineProperty(e,"escape",{enumerable:!0,get:function(){return i.escape}}),Object.defineProperty(e,"escapeUTF8",{enumerable:!0,get:function(){return i.escapeUTF8}}),Object.defineProperty(e,"escapeAttribute",{enumerable:!0,get:function(){return i.escapeAttribute}}),Object.defineProperty(e,"escapeText",{enumerable:!0,get:function(){return i.escapeText}});var s=Jt;Object.defineProperty(e,"encodeHTML",{enumerable:!0,get:function(){return s.encodeHTML}}),Object.defineProperty(e,"encodeNonAsciiHTML",{enumerable:!0,get:function(){return s.encodeNonAsciiHTML}}),Object.defineProperty(e,"encodeHTML4",{enumerable:!0,get:function(){return s.encodeHTML}}),Object.defineProperty(e,"encodeHTML5",{enumerable:!0,get:function(){return s.encodeHTML}});var a=zt;Object.defineProperty(e,"decodeXML",{enumerable:!0,get:function(){return a.decodeXML}}),Object.defineProperty(e,"decodeHTML",{enumerable:!0,get:function(){return a.decodeHTML}}),Object.defineProperty(e,"decodeHTMLStrict",{enumerable:!0,get:function(){return a.decodeHTMLStrict}}),Object.defineProperty(e,"decodeHTML4",{enumerable:!0,get:function(){return a.decodeHTML}}),Object.defineProperty(e,"decodeHTML5",{enumerable:!0,get:function(){return a.decodeHTML}}),Object.defineProperty(e,"decodeHTML4Strict",{enumerable:!0,get:function(){return a.decodeHTMLStrict}}),Object.defineProperty(e,"decodeHTML5Strict",{enumerable:!0,get:function(){return a.decodeHTMLStrict}}),Object.defineProperty(e,"decodeXMLStrict",{enumerable:!0,get:function(){return a.decodeXML}})})),Qt=It((function(t,e){Object.defineProperty(e,"__esModule",{value:!0}),e.attributeNames=e.elementNames=void 0,e.elementNames=new Map(["altGlyph","altGlyphDef","altGlyphItem","animateColor","animateMotion","animateTransform","clipPath","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","foreignObject","glyphRef","linearGradient","radialGradient","textPath"].map((function(t){return[t.toLowerCase(),t]}))),e.attributeNames=new Map(["definitionURL","attributeName","attributeType","baseFrequency","baseProfile","calcMode","clipPathUnits","diffuseConstant","edgeMode","filterUnits","glyphRef","gradientTransform","gradientUnits","kernelMatrix","kernelUnitLength","keyPoints","keySplines","keyTimes","lengthAdjust","limitingConeAngle","markerHeight","markerUnits","markerWidth","maskContentUnits","maskUnits","numOctaves","pathLength","patternContentUnits","patternTransform","patternUnits","pointsAtX","pointsAtY","pointsAtZ","preserveAlpha","preserveAspectRatio","primitiveUnits","refX","refY","repeatCount","repeatDur","requiredExtensions","requiredFeatures","specularConstant","specularExponent","spreadMethod","startOffset","stdDeviation","stitchTiles","surfaceScale","systemLanguage","tableValues","targetX","targetY","textLength","viewBox","viewTarget","xChannelSelector","yChannelSelector","zoomAndPan"].map((function(t){return[t.toLowerCase(),t]})))})),Zt=It((function(t,e){var o=Dt&&Dt.__assign||function(){return o=Object.assign||function(t){for(var e,o=1,n=arguments.length;o<n;o++)for(var r in e=arguments[o])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t},o.apply(this,arguments)},n=Dt&&Dt.__createBinding||(Object.create?function(t,e,o,n){void 0===n&&(n=o);var r=Object.getOwnPropertyDescriptor(e,o);r&&!("get"in r?!e.__esModule:r.writable||r.configurable)||(r={enumerable:!0,get:function(){return e[o]}}),Object.defineProperty(t,n,r)}:function(t,e,o,n){void 0===n&&(n=o),t[n]=e[o]}),r=Dt&&Dt.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),i=Dt&&Dt.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var o in t)"default"!==o&&Object.prototype.hasOwnProperty.call(t,o)&&n(e,t,o);return r(e,t),e};Object.defineProperty(e,"__esModule",{value:!0}),e.render=void 0;var s=i(Bt),a=new Set(["style","script","xmp","iframe","noembed","noframes","plaintext","noscript"]);function l(t){return t.replace(/"/g,"&quot;")}var c=new Set(["area","base","basefont","br","col","command","embed","frame","hr","img","input","isindex","keygen","link","meta","param","source","track","wbr"]);function d(t,e){void 0===e&&(e={});for(var o=("length"in t?t:[t]),n="",r=0;r<o.length;r++)n+=u(o[r],e);return n}function u(t,e){switch(t.type){case s.Root:return d(t.children,e);case s.Doctype:case s.Directive:return"<".concat(t.data,">");case s.Comment:return function(t){return"\x3c!--".concat(t.data,"--\x3e")}(t);case s.CDATA:return function(t){return"<![CDATA[".concat(t.children[0].data,"]]>")}(t);case s.Script:case s.Style:case s.Tag:return function(t,e){var n;"foreign"===e.xmlMode&&(t.name=null!==(n=Qt.elementNames.get(t.name))&&void 0!==n?n:t.name,t.parent&&h.has(t.parent.name)&&(e=o(o({},e),{xmlMode:!1})));!e.xmlMode&&p.has(t.name)&&(e=o(o({},e),{xmlMode:"foreign"}));var r="<".concat(t.name),i=function(t,e){var o;if(t){var n=!1===(null!==(o=e.encodeEntities)&&void 0!==o?o:e.decodeEntities)?l:e.xmlMode||"utf8"!==e.encodeEntities?Yt.encodeXML:Yt.escapeAttribute;return Object.keys(t).map((function(o){var r,i,s=null!==(r=t[o])&&void 0!==r?r:"";return"foreign"===e.xmlMode&&(o=null!==(i=Qt.attributeNames.get(o))&&void 0!==i?i:o),e.emptyAttrs||e.xmlMode||""!==s?"".concat(o,'="').concat(n(s),'"'):o})).join(" ")}}(t.attribs,e);i&&(r+=" ".concat(i));0===t.children.length&&(e.xmlMode?!1!==e.selfClosingTags:e.selfClosingTags&&c.has(t.name))?(e.xmlMode||(r+=" "),r+="/>"):(r+=">",t.children.length>0&&(r+=d(t.children,e)),!e.xmlMode&&c.has(t.name)||(r+="</".concat(t.name,">")));return r}(t,e);case s.Text:return function(t,e){var o,n=t.data||"";!1===(null!==(o=e.encodeEntities)&&void 0!==o?o:e.decodeEntities)||!e.xmlMode&&t.parent&&a.has(t.parent.name)||(n=e.xmlMode||"utf8"!==e.encodeEntities?(0,Yt.encodeXML)(n):(0,Yt.escapeText)(n));return n}(t,e)}}e.render=d,e.default=d;var h=new Set(["mi","mo","mn","ms","mtext","annotation-xml","foreignObject","desc","title"]),p=new Set(["svg","math"])})),te=It((function(t,e){var o=Dt&&Dt.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0}),e.innerText=e.textContent=e.getText=e.getInnerHTML=e.getOuterHTML=void 0;var n=o(Zt);function r(t,e){return(0,n.default)(t,e)}e.getOuterHTML=r,e.getInnerHTML=function(t,e){return(0,Vt.hasChildren)(t)?t.children.map((function(t){return r(t,e)})).join(""):""},e.getText=function t(e){return Array.isArray(e)?e.map(t).join(""):(0,Vt.isTag)(e)?"br"===e.name?"\n":t(e.children):(0,Vt.isCDATA)(e)?t(e.children):(0,Vt.isText)(e)?e.data:""},e.textContent=function t(e){return Array.isArray(e)?e.map(t).join(""):(0,Vt.hasChildren)(e)&&!(0,Vt.isComment)(e)?t(e.children):(0,Vt.isText)(e)?e.data:""},e.innerText=function t(e){return Array.isArray(e)?e.map(t).join(""):(0,Vt.hasChildren)(e)&&(e.type===Bt.ElementType.Tag||(0,Vt.isCDATA)(e))?t(e.children):(0,Vt.isText)(e)?e.data:""}})),ee=It((function(t,e){function o(t){return(0,Vt.hasChildren)(t)?t.children:[]}function n(t){return t.parent||null}Object.defineProperty(e,"__esModule",{value:!0}),e.prevElementSibling=e.nextElementSibling=e.getName=e.hasAttrib=e.getAttributeValue=e.getSiblings=e.getParent=e.getChildren=void 0,e.getChildren=o,e.getParent=n,e.getSiblings=function(t){var e=n(t);if(null!=e)return o(e);for(var r=[t],i=t.prev,s=t.next;null!=i;)r.unshift(i),i=i.prev;for(;null!=s;)r.push(s),s=s.next;return r},e.getAttributeValue=function(t,e){var o;return null===(o=t.attribs)||void 0===o?void 0:o[e]},e.hasAttrib=function(t,e){return null!=t.attribs&&Object.prototype.hasOwnProperty.call(t.attribs,e)&&null!=t.attribs[e]},e.getName=function(t){return t.name},e.nextElementSibling=function(t){for(var e=t.next;null!==e&&!(0,Vt.isTag)(e);)e=e.next;return e},e.prevElementSibling=function(t){for(var e=t.prev;null!==e&&!(0,Vt.isTag)(e);)e=e.prev;return e}})),oe=It((function(t,e){function o(t){if(t.prev&&(t.prev.next=t.next),t.next&&(t.next.prev=t.prev),t.parent){var e=t.parent.children;e.splice(e.lastIndexOf(t),1)}}Object.defineProperty(e,"__esModule",{value:!0}),e.prepend=e.prependChild=e.append=e.appendChild=e.replaceElement=e.removeElement=void 0,e.removeElement=o,e.replaceElement=function(t,e){var o=e.prev=t.prev;o&&(o.next=e);var n=e.next=t.next;n&&(n.prev=e);var r=e.parent=t.parent;if(r){var i=r.children;i[i.lastIndexOf(t)]=e,t.parent=null}},e.appendChild=function(t,e){if(o(e),e.next=null,e.parent=t,t.children.push(e)>1){var n=t.children[t.children.length-2];n.next=e,e.prev=n}else e.prev=null},e.append=function(t,e){o(e);var n=t.parent,r=t.next;if(e.next=r,e.prev=t,t.next=e,e.parent=n,r){if(r.prev=e,n){var i=n.children;i.splice(i.lastIndexOf(r),0,e)}}else n&&n.children.push(e)},e.prependChild=function(t,e){if(o(e),e.parent=t,e.prev=null,1!==t.children.unshift(e)){var n=t.children[1];n.prev=e,e.next=n}else e.next=null},e.prepend=function(t,e){o(e);var n=t.parent;if(n){var r=n.children;r.splice(r.indexOf(t),0,e)}t.prev&&(t.prev.next=e),e.parent=n,e.prev=t.prev,e.next=t,t.prev=e}})),ne=It((function(t,e){function o(t,e,n,r){for(var i=[],s=0,a=e;s<a.length;s++){var l=a[s];if(t(l)&&(i.push(l),--r<=0))break;if(n&&(0,Vt.hasChildren)(l)&&l.children.length>0){var c=o(t,l.children,n,r);if(i.push.apply(i,c),(r-=c.length)<=0)break}}return i}Object.defineProperty(e,"__esModule",{value:!0}),e.findAll=e.existsOne=e.findOne=e.findOneChild=e.find=e.filter=void 0,e.filter=function(t,e,n,r){return void 0===n&&(n=!0),void 0===r&&(r=1/0),Array.isArray(e)||(e=[e]),o(t,e,n,r)},e.find=o,e.findOneChild=function(t,e){return e.find(t)},e.findOne=function t(e,o,n){void 0===n&&(n=!0);for(var r=null,i=0;i<o.length&&!r;i++){var s=o[i];(0,Vt.isTag)(s)&&(e(s)?r=s:n&&s.children.length>0&&(r=t(e,s.children,!0)))}return r},e.existsOne=function t(e,o){return o.some((function(o){return(0,Vt.isTag)(o)&&(e(o)||o.children.length>0&&t(e,o.children))}))},e.findAll=function(t,e){for(var o,n,r=[],i=e.filter(Vt.isTag);n=i.shift();){var s=null===(o=n.children)||void 0===o?void 0:o.filter(Vt.isTag);s&&s.length>0&&i.unshift.apply(i,s),t(n)&&r.push(n)}return r}})),re=It((function(t,e){Object.defineProperty(e,"__esModule",{value:!0}),e.getElementsByTagType=e.getElementsByTagName=e.getElementById=e.getElements=e.testElement=void 0;var o={tag_name:function(t){return"function"==typeof t?function(e){return(0,Vt.isTag)(e)&&t(e.name)}:"*"===t?Vt.isTag:function(e){return(0,Vt.isTag)(e)&&e.name===t}},tag_type:function(t){return"function"==typeof t?function(e){return t(e.type)}:function(e){return e.type===t}},tag_contains:function(t){return"function"==typeof t?function(e){return(0,Vt.isText)(e)&&t(e.data)}:function(e){return(0,Vt.isText)(e)&&e.data===t}}};function n(t,e){return"function"==typeof e?function(o){return(0,Vt.isTag)(o)&&e(o.attribs[t])}:function(o){return(0,Vt.isTag)(o)&&o.attribs[t]===e}}function r(t,e){return function(o){return t(o)||e(o)}}function i(t){var e=Object.keys(t).map((function(e){var r=t[e];return Object.prototype.hasOwnProperty.call(o,e)?o[e](r):n(e,r)}));return 0===e.length?null:e.reduce(r)}e.testElement=function(t,e){var o=i(t);return!o||o(e)},e.getElements=function(t,e,o,n){void 0===n&&(n=1/0);var r=i(t);return r?(0,ne.filter)(r,e,o,n):[]},e.getElementById=function(t,e,o){return void 0===o&&(o=!0),Array.isArray(e)||(e=[e]),(0,ne.findOne)(n("id",t),e,o)},e.getElementsByTagName=function(t,e,n,r){return void 0===n&&(n=!0),void 0===r&&(r=1/0),(0,ne.filter)(o.tag_name(t),e,n,r)},e.getElementsByTagType=function(t,e,n,r){return void 0===n&&(n=!0),void 0===r&&(r=1/0),(0,ne.filter)(o.tag_type(t),e,n,r)}})),ie=It((function(t,e){var o;function n(t,e){var n=[],r=[];if(t===e)return 0;for(var i=(0,Vt.hasChildren)(t)?t:t.parent;i;)n.unshift(i),i=i.parent;for(i=(0,Vt.hasChildren)(e)?e:e.parent;i;)r.unshift(i),i=i.parent;for(var s=Math.min(n.length,r.length),a=0;a<s&&n[a]===r[a];)a++;if(0===a)return o.DISCONNECTED;var l=n[a-1],c=l.children,d=n[a],u=r[a];return c.indexOf(d)>c.indexOf(u)?l===e?o.FOLLOWING|o.CONTAINED_BY:o.FOLLOWING:l===t?o.PRECEDING|o.CONTAINS:o.PRECEDING}Object.defineProperty(e,"__esModule",{value:!0}),e.uniqueSort=e.compareDocumentPosition=e.DocumentPosition=e.removeSubsets=void 0,e.removeSubsets=function(t){for(var e=t.length;--e>=0;){var o=t[e];if(e>0&&t.lastIndexOf(o,e-1)>=0)t.splice(e,1);else for(var n=o.parent;n;n=n.parent)if(t.includes(n)){t.splice(e,1);break}}return t},function(t){t[t.DISCONNECTED=1]="DISCONNECTED",t[t.PRECEDING=2]="PRECEDING",t[t.FOLLOWING=4]="FOLLOWING",t[t.CONTAINS=8]="CONTAINS",t[t.CONTAINED_BY=16]="CONTAINED_BY"}(o=e.DocumentPosition||(e.DocumentPosition={})),e.compareDocumentPosition=n,e.uniqueSort=function(t){return t=t.filter((function(t,e,o){return!o.includes(t,e+1)})),t.sort((function(t,e){var r=n(t,e);return r&o.PRECEDING?-1:r&o.FOLLOWING?1:0})),t}})),se=It((function(t,e){Object.defineProperty(e,"__esModule",{value:!0}),e.getFeed=void 0,e.getFeed=function(t){var e=i(l,t);return e?"feed"===e.name?function(t){var e,o=t.children,n={type:"atom",items:(0,re.getElementsByTagName)("entry",o).map((function(t){var e,o=t.children,n={media:r(o)};a(n,"id","id",o),a(n,"title","title",o);var l=null===(e=i("link",o))||void 0===e?void 0:e.attribs.href;l&&(n.link=l);var c=s("summary",o)||s("content",o);c&&(n.description=c);var d=s("updated",o);return d&&(n.pubDate=new Date(d)),n}))};a(n,"id","id",o),a(n,"title","title",o);var l=null===(e=i("link",o))||void 0===e?void 0:e.attribs.href;l&&(n.link=l);a(n,"description","subtitle",o);var c=s("updated",o);c&&(n.updated=new Date(c));return a(n,"author","email",o,!0),n}(e):function(t){var e,o,n=null!==(o=null===(e=i("channel",t.children))||void 0===e?void 0:e.children)&&void 0!==o?o:[],l={type:t.name.substr(0,3),id:"",items:(0,re.getElementsByTagName)("item",t.children).map((function(t){var e=t.children,o={media:r(e)};a(o,"id","guid",e),a(o,"title","title",e),a(o,"link","link",e),a(o,"description","description",e);var n=s("pubDate",e);return n&&(o.pubDate=new Date(n)),o}))};a(l,"title","title",n),a(l,"link","link",n),a(l,"description","description",n);var c=s("lastBuildDate",n);c&&(l.updated=new Date(c));return a(l,"author","managingEditor",n,!0),l}(e):null};var o=["url","type","lang"],n=["fileSize","bitrate","framerate","samplingrate","channels","duration","height","width"];function r(t){return(0,re.getElementsByTagName)("media:content",t).map((function(t){for(var e=t.attribs,r={medium:e.medium,isDefault:!!e.isDefault},i=0,s=o;i<s.length;i++){e[c=s[i]]&&(r[c]=e[c])}for(var a=0,l=n;a<l.length;a++){var c;e[c=l[a]]&&(r[c]=parseInt(e[c],10))}return e.expression&&(r.expression=e.expression),r}))}function i(t,e){return(0,re.getElementsByTagName)(t,e,!0,1)[0]}function s(t,e,o){return void 0===o&&(o=!1),(0,te.textContent)((0,re.getElementsByTagName)(t,e,o,1)).trim()}function a(t,e,o,n,r){void 0===r&&(r=!1);var i=s(o,n,r);i&&(t[e]=i)}function l(t){return"rss"===t||"feed"===t||"rdf:RDF"===t}})),ae=It((function(t,e){var o=Dt&&Dt.__createBinding||(Object.create?function(t,e,o,n){void 0===n&&(n=o);var r=Object.getOwnPropertyDescriptor(e,o);r&&!("get"in r?!e.__esModule:r.writable||r.configurable)||(r={enumerable:!0,get:function(){return e[o]}}),Object.defineProperty(t,n,r)}:function(t,e,o,n){void 0===n&&(n=o),t[n]=e[o]}),n=Dt&&Dt.__exportStar||function(t,e){for(var n in t)"default"===n||Object.prototype.hasOwnProperty.call(e,n)||o(e,t,n)};Object.defineProperty(e,"__esModule",{value:!0}),e.hasChildren=e.isDocument=e.isComment=e.isText=e.isCDATA=e.isTag=void 0,n(te,e),n(ee,e),n(oe,e),n(ne,e),n(re,e),n(ie,e),n(se,e),Object.defineProperty(e,"isTag",{enumerable:!0,get:function(){return Vt.isTag}}),Object.defineProperty(e,"isCDATA",{enumerable:!0,get:function(){return Vt.isCDATA}}),Object.defineProperty(e,"isText",{enumerable:!0,get:function(){return Vt.isText}}),Object.defineProperty(e,"isComment",{enumerable:!0,get:function(){return Vt.isComment}}),Object.defineProperty(e,"isDocument",{enumerable:!0,get:function(){return Vt.isDocument}}),Object.defineProperty(e,"hasChildren",{enumerable:!0,get:function(){return Vt.hasChildren}})})),le=It((function(t,e){var o=Dt&&Dt.__createBinding||(Object.create?function(t,e,o,n){void 0===n&&(n=o);var r=Object.getOwnPropertyDescriptor(e,o);r&&!("get"in r?!e.__esModule:r.writable||r.configurable)||(r={enumerable:!0,get:function(){return e[o]}}),Object.defineProperty(t,n,r)}:function(t,e,o,n){void 0===n&&(n=o),t[n]=e[o]}),n=Dt&&Dt.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),r=Dt&&Dt.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)"default"!==r&&Object.prototype.hasOwnProperty.call(t,r)&&o(e,t,r);return n(e,t),e},i=Dt&&Dt.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};function s(t,e){var o=new Vt.DomHandler(void 0,e);return new jt.Parser(o,e).end(t),o.root}function a(t,e){return s(t,e).children}Object.defineProperty(e,"__esModule",{value:!0}),e.DefaultHandler=e.DomUtils=e.parseFeed=e.getFeed=e.ElementType=e.Tokenizer=e.createDomStream=e.parseDOM=e.parseDocument=e.DomHandler=e.Parser=void 0,Object.defineProperty(e,"Parser",{enumerable:!0,get:function(){return jt.Parser}}),Object.defineProperty(e,"DomHandler",{enumerable:!0,get:function(){return Vt.DomHandler}}),Object.defineProperty(e,"DefaultHandler",{enumerable:!0,get:function(){return Vt.DomHandler}}),e.parseDocument=s,e.parseDOM=a,e.createDomStream=function(t,e,o){var n=new Vt.DomHandler(t,e,o);return new jt.Parser(n,e)},Object.defineProperty(e,"Tokenizer",{enumerable:!0,get:function(){return i(Rt).default}});var l=r(Bt);e.ElementType=l,Object.defineProperty(e,"getFeed",{enumerable:!0,get:function(){return ae.getFeed}}),e.parseFeed=function(t,e){return void 0===e&&(e={xmlMode:!0}),(0,ae.getFeed)(a(t,e))},e.DomUtils=r(ae)})),ce=t=>{if("string"!=typeof t)throw new TypeError("Expected a string");return t.replace(/[|\\{}()[\]^$+*?.]/g,"\\$&").replace(/-/g,"\\x2d")};
/*!
     * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
     *
     * Copyright (c) 2014-2017, Jon Schlinkert.
     * Released under the MIT License.
     */
function de(t){return"[object Object]"===Object.prototype.toString.call(t)}var ue=function(t){var e,o;return!1!==de(t)&&(void 0===(e=t.constructor)||!1!==de(o=e.prototype)&&!1!==o.hasOwnProperty("isPrototypeOf"))},he=Object.defineProperty({isPlainObject:ue},"__esModule",{value:!0}),pe=function(t){return function(t){return!!t&&"object"==typeof t}(t)&&!function(t){var e=Object.prototype.toString.call(t);return"[object RegExp]"===e||"[object Date]"===e||function(t){return t.$$typeof===fe}(t)}(t)};var fe="function"==typeof Symbol&&Symbol.for?Symbol.for("react.element"):60103;function me(t,e){return!1!==e.clone&&e.isMergeableObject(t)?we((o=t,Array.isArray(o)?[]:{}),t,e):t;var o}function ge(t,e,o){return t.concat(e).map((function(t){return me(t,o)}))}function be(t){return Object.keys(t).concat(function(t){return Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t).filter((function(e){return t.propertyIsEnumerable(e)})):[]}(t))}function ve(t,e){try{return e in t}catch(t){return!1}}function ye(t,e,o){var n={};return o.isMergeableObject(t)&&be(t).forEach((function(e){n[e]=me(t[e],o)})),be(e).forEach((function(r){(function(t,e){return ve(t,e)&&!(Object.hasOwnProperty.call(t,e)&&Object.propertyIsEnumerable.call(t,e))})(t,r)||(ve(t,r)&&o.isMergeableObject(e[r])?n[r]=function(t,e){if(!e.customMerge)return we;var o=e.customMerge(t);return"function"==typeof o?o:we}(r,o)(t[r],e[r],o):n[r]=me(e[r],o))})),n}function we(t,e,o){(o=o||{}).arrayMerge=o.arrayMerge||ge,o.isMergeableObject=o.isMergeableObject||pe,o.cloneUnlessOtherwiseSpecified=me;var n=Array.isArray(e);return n===Array.isArray(t)?n?o.arrayMerge(t,e,o):ye(t,e,o):me(e,o)}we.all=function(t,e){if(!Array.isArray(t))throw new Error("first argument should be an array");return t.reduce((function(t,o){return we(t,o,e)}),{})};var xe=we,ke=It((function(t){!function(e,o){t.exports?t.exports=o():e.parseSrcset=o()}(Dt,(function(){return function(t){function e(t){return" "===t||"\t"===t||"\n"===t||"\f"===t||"\r"===t}function o(e){var o,n=e.exec(t.substring(m));if(n)return o=n[0],m+=o.length,o}for(var n,r,i,s,a,l=t.length,c=/^[ \t\n\r\u000c]+/,d=/^[, \t\n\r\u000c]+/,u=/^[^ \t\n\r\u000c]+/,h=/[,]+$/,p=/^\d+$/,f=/^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/,m=0,g=[];;){if(o(d),m>=l)return g;n=o(u),r=[],","===n.slice(-1)?(n=n.replace(h,""),v()):b()}function b(){for(o(c),i="",s="in descriptor";;){if(a=t.charAt(m),"in descriptor"===s)if(e(a))i&&(r.push(i),i="",s="after descriptor");else{if(","===a)return m+=1,i&&r.push(i),void v();if("("===a)i+=a,s="in parens";else{if(""===a)return i&&r.push(i),void v();i+=a}}else if("in parens"===s)if(")"===a)i+=a,s="in descriptor";else{if(""===a)return r.push(i),void v();i+=a}else if("after descriptor"===s)if(e(a));else{if(""===a)return void v();s="in descriptor",m-=1}m+=1}}function v(){var e,o,i,s,a,l,c,d,u,h=!1,m={};for(s=0;s<r.length;s++)l=(a=r[s])[a.length-1],c=a.substring(0,a.length-1),d=parseInt(c,10),u=parseFloat(c),p.test(c)&&"w"===l?((e||o)&&(h=!0),0===d?h=!0:e=d):f.test(c)&&"x"===l?((e||o||i)&&(h=!0),u<0?h=!0:o=u):p.test(c)&&"h"===l?((i||o)&&(h=!0),0===d?h=!0:i=d):h=!0;h?console&&console.log&&console.log("Invalid srcset descriptor found in '"+t+"' at '"+a+"'."):(m.url=n,e&&(m.w=e),o&&(m.d=o),i&&(m.h=i),g.push(m))}}}))})),Ce=String,Se=function(){return{isColorSupported:!1,reset:Ce,bold:Ce,dim:Ce,italic:Ce,underline:Ce,inverse:Ce,hidden:Ce,strikethrough:Ce,black:Ce,red:Ce,green:Ce,yellow:Ce,blue:Ce,magenta:Ce,cyan:Ce,white:Ce,gray:Ce,bgBlack:Ce,bgRed:Ce,bgGreen:Ce,bgYellow:Ce,bgBlue:Ce,bgMagenta:Ce,bgCyan:Ce,bgWhite:Ce}},Ee=Se(),_e=Se;Ee.createColors=_e;var Oe=At(Object.freeze({__proto__:null,default:{}}));class Le extends Error{constructor(t,e,o,n,r,i){super(t),this.name="CssSyntaxError",this.reason=t,r&&(this.file=r),n&&(this.source=n),i&&(this.plugin=i),void 0!==e&&void 0!==o&&("number"==typeof e?(this.line=e,this.column=o):(this.line=e.line,this.column=e.column,this.endLine=o.line,this.endColumn=o.column)),this.setMessage(),Error.captureStackTrace&&Error.captureStackTrace(this,Le)}setMessage(){this.message=this.plugin?this.plugin+": ":"",this.message+=this.file?this.file:"<css input>",void 0!==this.line&&(this.message+=":"+this.line+":"+this.column),this.message+=": "+this.reason}showSourceCode(t){if(!this.source)return"";let e=this.source;null==t&&(t=Ee.isColorSupported),Oe&&t&&(e=Oe(e));let o,n,r=e.split(/\r?\n/),i=Math.max(this.line-3,0),s=Math.min(this.line+2,r.length),a=String(s).length;if(t){let{bold:t,red:e,gray:r}=Ee.createColors(!0);o=o=>t(e(o)),n=t=>r(t)}else o=n=t=>t;return r.slice(i,s).map(((t,e)=>{let r=i+1+e,s=" "+(" "+r).slice(-a)+" | ";if(r===this.line){let e=n(s.replace(/\d/g," "))+t.slice(0,this.column-1).replace(/[^\t]/g," ");return o(">")+n(s)+t+"\n "+e+o("^")}return" "+n(s)+t})).join("\n")}toString(){let t=this.showSourceCode();return t&&(t="\n\n"+t+"\n"),this.name+": "+this.message+t}}var Te=Le;Le.default=Le;var $e={isClean:Symbol("isClean"),my:Symbol("my")};const Me={colon:": ",indent:"    ",beforeDecl:"\n",beforeRule:"\n",beforeOpen:" ",beforeClose:"\n",beforeComment:"\n",after:"\n",emptyBody:"",commentLeft:" ",commentRight:" ",semicolon:!1};class De{constructor(t){this.builder=t}stringify(t,e){if(!this[t.type])throw new Error("Unknown AST node type "+t.type+". Maybe you need to change PostCSS stringifier.");this[t.type](t,e)}document(t){this.body(t)}root(t){this.body(t),t.raws.after&&this.builder(t.raws.after)}comment(t){let e=this.raw(t,"left","commentLeft"),o=this.raw(t,"right","commentRight");this.builder("/*"+e+t.text+o+"*/",t)}decl(t,e){let o=this.raw(t,"between","colon"),n=t.prop+o+this.rawValue(t,"value");t.important&&(n+=t.raws.important||" !important"),e&&(n+=";"),this.builder(n,t)}rule(t){this.block(t,this.rawValue(t,"selector")),t.raws.ownSemicolon&&this.builder(t.raws.ownSemicolon,t,"end")}atrule(t,e){let o="@"+t.name,n=t.params?this.rawValue(t,"params"):"";if(void 0!==t.raws.afterName?o+=t.raws.afterName:n&&(o+=" "),t.nodes)this.block(t,o+n);else{let r=(t.raws.between||"")+(e?";":"");this.builder(o+n+r,t)}}body(t){let e=t.nodes.length-1;for(;e>0&&"comment"===t.nodes[e].type;)e-=1;let o=this.raw(t,"semicolon");for(let n=0;n<t.nodes.length;n++){let r=t.nodes[n],i=this.raw(r,"before");i&&this.builder(i),this.stringify(r,e!==n||o)}}block(t,e){let o,n=this.raw(t,"between","beforeOpen");this.builder(e+n+"{",t,"start"),t.nodes&&t.nodes.length?(this.body(t),o=this.raw(t,"after")):o=this.raw(t,"after","emptyBody"),o&&this.builder(o),this.builder("}",t,"end")}raw(t,e,o){let n;if(o||(o=e),e&&(n=t.raws[e],void 0!==n))return n;let r=t.parent;if("before"===o){if(!r||"root"===r.type&&r.first===t)return"";if(r&&"document"===r.type)return""}if(!r)return Me[o];let i=t.root();if(i.rawCache||(i.rawCache={}),void 0!==i.rawCache[o])return i.rawCache[o];if("before"===o||"after"===o)return this.beforeAfter(t,o);{let r="raw"+((s=o)[0].toUpperCase()+s.slice(1));this[r]?n=this[r](i,t):i.walk((t=>{if(n=t.raws[e],void 0!==n)return!1}))}var s;return void 0===n&&(n=Me[o]),i.rawCache[o]=n,n}rawSemicolon(t){let e;return t.walk((t=>{if(t.nodes&&t.nodes.length&&"decl"===t.last.type&&(e=t.raws.semicolon,void 0!==e))return!1})),e}rawEmptyBody(t){let e;return t.walk((t=>{if(t.nodes&&0===t.nodes.length&&(e=t.raws.after,void 0!==e))return!1})),e}rawIndent(t){if(t.raws.indent)return t.raws.indent;let e;return t.walk((o=>{let n=o.parent;if(n&&n!==t&&n.parent&&n.parent===t&&void 0!==o.raws.before){let t=o.raws.before.split("\n");return e=t[t.length-1],e=e.replace(/\S/g,""),!1}})),e}rawBeforeComment(t,e){let o;return t.walkComments((t=>{if(void 0!==t.raws.before)return o=t.raws.before,o.includes("\n")&&(o=o.replace(/[^\n]+$/,"")),!1})),void 0===o?o=this.raw(e,null,"beforeDecl"):o&&(o=o.replace(/\S/g,"")),o}rawBeforeDecl(t,e){let o;return t.walkDecls((t=>{if(void 0!==t.raws.before)return o=t.raws.before,o.includes("\n")&&(o=o.replace(/[^\n]+$/,"")),!1})),void 0===o?o=this.raw(e,null,"beforeRule"):o&&(o=o.replace(/\S/g,"")),o}rawBeforeRule(t){let e;return t.walk((o=>{if(o.nodes&&(o.parent!==t||t.first!==o)&&void 0!==o.raws.before)return e=o.raws.before,e.includes("\n")&&(e=e.replace(/[^\n]+$/,"")),!1})),e&&(e=e.replace(/\S/g,"")),e}rawBeforeClose(t){let e;return t.walk((t=>{if(t.nodes&&t.nodes.length>0&&void 0!==t.raws.after)return e=t.raws.after,e.includes("\n")&&(e=e.replace(/[^\n]+$/,"")),!1})),e&&(e=e.replace(/\S/g,"")),e}rawBeforeOpen(t){let e;return t.walk((t=>{if("decl"!==t.type&&(e=t.raws.between,void 0!==e))return!1})),e}rawColon(t){let e;return t.walkDecls((t=>{if(void 0!==t.raws.between)return e=t.raws.between.replace(/[^\s:]/g,""),!1})),e}beforeAfter(t,e){let o;o="decl"===t.type?this.raw(t,null,"beforeDecl"):"comment"===t.type?this.raw(t,null,"beforeComment"):"before"===e?this.raw(t,null,"beforeRule"):this.raw(t,null,"beforeClose");let n=t.parent,r=0;for(;n&&"root"!==n.type;)r+=1,n=n.parent;if(o.includes("\n")){let e=this.raw(t,null,"indent");if(e.length)for(let t=0;t<r;t++)o+=e}return o}rawValue(t,e){let o=t[e],n=t.raws[e];return n&&n.value===o?n.raw:o}}var Ae=De;function Ie(t,e){new Ae(e).stringify(t)}De.default=De;var Pe=Ie;Ie.default=Ie;let{isClean:Ne,my:Ue}=$e;function He(t,e){let o=new t.constructor;for(let n in t){if(!Object.prototype.hasOwnProperty.call(t,n))continue;if("proxyCache"===n)continue;let r=t[n],i=typeof r;"parent"===n&&"object"===i?e&&(o[n]=e):"source"===n?o[n]=r:Array.isArray(r)?o[n]=r.map((t=>He(t,o))):("object"===i&&null!==r&&(r=He(r)),o[n]=r)}return o}class qe{constructor(t={}){this.raws={},this[Ne]=!1,this[Ue]=!0;for(let e in t)if("nodes"===e){this.nodes=[];for(let o of t[e])"function"==typeof o.clone?this.append(o.clone()):this.append(o)}else this[e]=t[e]}error(t,e={}){if(this.source){let{start:o,end:n}=this.rangeBy(e);return this.source.input.error(t,{line:o.line,column:o.column},{line:n.line,column:n.column},e)}return new Te(t)}warn(t,e,o){let n={node:this};for(let t in o)n[t]=o[t];return t.warn(e,n)}remove(){return this.parent&&this.parent.removeChild(this),this.parent=void 0,this}toString(t=Pe){t.stringify&&(t=t.stringify);let e="";return t(this,(t=>{e+=t})),e}assign(t={}){for(let e in t)this[e]=t[e];return this}clone(t={}){let e=He(this);for(let o in t)e[o]=t[o];return e}cloneBefore(t={}){let e=this.clone(t);return this.parent.insertBefore(this,e),e}cloneAfter(t={}){let e=this.clone(t);return this.parent.insertAfter(this,e),e}replaceWith(...t){if(this.parent){let e=this,o=!1;for(let n of t)n===this?o=!0:o?(this.parent.insertAfter(e,n),e=n):this.parent.insertBefore(e,n);o||this.remove()}return this}next(){if(!this.parent)return;let t=this.parent.index(this);return this.parent.nodes[t+1]}prev(){if(!this.parent)return;let t=this.parent.index(this);return this.parent.nodes[t-1]}before(t){return this.parent.insertBefore(this,t),this}after(t){return this.parent.insertAfter(this,t),this}root(){let t=this;for(;t.parent&&"document"!==t.parent.type;)t=t.parent;return t}raw(t,e){return(new Ae).raw(this,t,e)}cleanRaws(t){delete this.raws.before,delete this.raws.after,t||delete this.raws.between}toJSON(t,e){let o={},n=null==e;e=e||new Map;let r=0;for(let t in this){if(!Object.prototype.hasOwnProperty.call(this,t))continue;if("parent"===t||"proxyCache"===t)continue;let n=this[t];if(Array.isArray(n))o[t]=n.map((t=>"object"==typeof t&&t.toJSON?t.toJSON(null,e):t));else if("object"==typeof n&&n.toJSON)o[t]=n.toJSON(null,e);else if("source"===t){let i=e.get(n.input);null==i&&(i=r,e.set(n.input,r),r++),o[t]={inputId:i,start:n.start,end:n.end}}else o[t]=n}return n&&(o.inputs=[...e.keys()].map((t=>t.toJSON()))),o}positionInside(t){let e=this.toString(),o=this.source.start.column,n=this.source.start.line;for(let r=0;r<t;r++)"\n"===e[r]?(o=1,n+=1):o+=1;return{line:n,column:o}}positionBy(t){let e=this.source.start;if(t.index)e=this.positionInside(t.index);else if(t.word){let o=this.toString().indexOf(t.word);-1!==o&&(e=this.positionInside(o))}return e}rangeBy(t){let e={line:this.source.start.line,column:this.source.start.column},o=this.source.end?{line:this.source.end.line,column:this.source.end.column+1}:{line:e.line,column:e.column+1};if(t.word){let n=this.toString().indexOf(t.word);-1!==n&&(e=this.positionInside(n),o=this.positionInside(n+t.word.length))}else t.start?e={line:t.start.line,column:t.start.column}:t.index&&(e=this.positionInside(t.index)),t.end?o={line:t.end.line,column:t.end.column}:t.endIndex?o=this.positionInside(t.endIndex):t.index&&(o=this.positionInside(t.index+1));return(o.line<e.line||o.line===e.line&&o.column<=e.column)&&(o={line:e.line,column:e.column+1}),{start:e,end:o}}getProxyProcessor(){return{set:(t,e,o)=>(t[e]===o||(t[e]=o,"prop"!==e&&"value"!==e&&"name"!==e&&"params"!==e&&"important"!==e&&"text"!==e||t.markDirty()),!0),get:(t,e)=>"proxyOf"===e?t:"root"===e?()=>t.root().toProxy():t[e]}}toProxy(){return this.proxyCache||(this.proxyCache=new Proxy(this,this.getProxyProcessor())),this.proxyCache}addToError(t){if(t.postcssNode=this,t.stack&&this.source&&/\n\s{4}at /.test(t.stack)){let e=this.source;t.stack=t.stack.replace(/\n\s{4}at /,`$&${e.input.from}:${e.start.line}:${e.start.column}$&`)}return t}markDirty(){if(this[Ne]){this[Ne]=!1;let t=this;for(;t=t.parent;)t[Ne]=!1}}get proxyOf(){return this}}var ze=qe;qe.default=qe;class Re extends ze{constructor(t){t&&void 0!==t.value&&"string"!=typeof t.value&&(t={...t,value:String(t.value)}),super(t),this.type="decl"}get variable(){return this.prop.startsWith("--")||"$"===this.prop[0]}}var je=Re;Re.default=Re;var Be={nanoid:(t=21)=>{let e="",o=t;for(;o--;)e+="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict"[64*Math.random()|0];return e},customAlphabet:(t,e=21)=>(o=e)=>{let n="",r=o;for(;r--;)n+=t[Math.random()*t.length|0];return n}};let{SourceMapConsumer:Fe,SourceMapGenerator:Ve}=Oe,{existsSync:We,readFileSync:Ge}=Oe,{dirname:Ke,join:Xe}=Oe;class Je{constructor(t,e){if(!1===e.map)return;this.loadAnnotation(t),this.inline=this.startWith(this.annotation,"data:");let o=e.map?e.map.prev:void 0,n=this.loadMap(e.from,o);!this.mapFile&&e.from&&(this.mapFile=e.from),this.mapFile&&(this.root=Ke(this.mapFile)),n&&(this.text=n)}consumer(){return this.consumerCache||(this.consumerCache=new Fe(this.text)),this.consumerCache}withContent(){return!!(this.consumer().sourcesContent&&this.consumer().sourcesContent.length>0)}startWith(t,e){return!!t&&t.substr(0,e.length)===e}getAnnotationURL(t){return t.replace(/^\/\*\s*# sourceMappingURL=/,"").trim()}loadAnnotation(t){let e=t.match(/\/\*\s*# sourceMappingURL=/gm);if(!e)return;let o=t.lastIndexOf(e.pop()),n=t.indexOf("*/",o);o>-1&&n>-1&&(this.annotation=this.getAnnotationURL(t.substring(o,n)))}decodeInline(t){if(/^data:application\/json;charset=utf-?8,/.test(t)||/^data:application\/json,/.test(t))return decodeURIComponent(t.substr(RegExp.lastMatch.length));if(/^data:application\/json;charset=utf-?8;base64,/.test(t)||/^data:application\/json;base64,/.test(t))return e=t.substr(RegExp.lastMatch.length),Buffer?Buffer.from(e,"base64").toString():window.atob(e);var e;let o=t.match(/data:application\/json;([^,]+),/)[1];throw new Error("Unsupported source map encoding "+o)}loadFile(t){if(this.root=Ke(t),We(t))return this.mapFile=t,Ge(t,"utf-8").toString().trim()}loadMap(t,e){if(!1===e)return!1;if(e){if("string"==typeof e)return e;if("function"!=typeof e){if(e instanceof Fe)return Ve.fromSourceMap(e).toString();if(e instanceof Ve)return e.toString();if(this.isMap(e))return JSON.stringify(e);throw new Error("Unsupported previous source map format: "+e.toString())}{let o=e(t);if(o){let t=this.loadFile(o);if(!t)throw new Error("Unable to load previous source map: "+o.toString());return t}}}else{if(this.inline)return this.decodeInline(this.annotation);if(this.annotation){let e=this.annotation;return t&&(e=Xe(Ke(t),e)),this.loadFile(e)}}}isMap(t){return"object"==typeof t&&("string"==typeof t.mappings||"string"==typeof t._mappings||Array.isArray(t.sections))}}var Ye=Je;Je.default=Je;let{SourceMapConsumer:Qe,SourceMapGenerator:Ze}=Oe,{fileURLToPath:to,pathToFileURL:eo}=Oe,{resolve:oo,isAbsolute:no}=Oe,{nanoid:ro}=Be,io=Symbol("fromOffsetCache"),so=Boolean(Qe&&Ze),ao=Boolean(oo&&no);class lo{constructor(t,e={}){if(null==t||"object"==typeof t&&!t.toString)throw new Error(`PostCSS received ${t} instead of CSS string`);if(this.css=t.toString(),"\ufeff"===this.css[0]||"￾"===this.css[0]?(this.hasBOM=!0,this.css=this.css.slice(1)):this.hasBOM=!1,e.from&&(!ao||/^\w+:\/\//.test(e.from)||no(e.from)?this.file=e.from:this.file=oo(e.from)),ao&&so){let t=new Ye(this.css,e);if(t.text){this.map=t;let e=t.consumer().file;!this.file&&e&&(this.file=this.mapResolve(e))}}this.file||(this.id="<input css "+ro(6)+">"),this.map&&(this.map.file=this.from)}fromOffset(t){let e,o;if(this[io])o=this[io];else{let t=this.css.split("\n");o=new Array(t.length);let e=0;for(let n=0,r=t.length;n<r;n++)o[n]=e,e+=t[n].length+1;this[io]=o}e=o[o.length-1];let n=0;if(t>=e)n=o.length-1;else{let e,r=o.length-2;for(;n<r;)if(e=n+(r-n>>1),t<o[e])r=e-1;else{if(!(t>=o[e+1])){n=e;break}n=e+1}}return{line:n+1,col:t-o[n]+1}}error(t,e,o,n={}){let r,i,s;if(e&&"object"==typeof e){let t=e,n=o;if("number"==typeof e.offset){let n=this.fromOffset(t.offset);e=n.line,o=n.col}else e=t.line,o=t.column;if("number"==typeof n.offset){let t=this.fromOffset(n.offset);i=t.line,s=t.col}else i=n.line,s=n.column}else if(!o){let t=this.fromOffset(e);e=t.line,o=t.col}let a=this.origin(e,o,i,s);return r=a?new Te(t,void 0===a.endLine?a.line:{line:a.line,column:a.column},void 0===a.endLine?a.column:{line:a.endLine,column:a.endColumn},a.source,a.file,n.plugin):new Te(t,void 0===i?e:{line:e,column:o},void 0===i?o:{line:i,column:s},this.css,this.file,n.plugin),r.input={line:e,column:o,endLine:i,endColumn:s,source:this.css},this.file&&(eo&&(r.input.url=eo(this.file).toString()),r.input.file=this.file),r}origin(t,e,o,n){if(!this.map)return!1;let r,i,s=this.map.consumer(),a=s.originalPositionFor({line:t,column:e});if(!a.source)return!1;"number"==typeof o&&(r=s.originalPositionFor({line:o,column:n})),i=no(a.source)?eo(a.source):new URL(a.source,this.map.consumer().sourceRoot||eo(this.map.mapFile));let l={url:i.toString(),line:a.line,column:a.column,endLine:r&&r.line,endColumn:r&&r.column};if("file:"===i.protocol){if(!to)throw new Error("file: protocol is not available in this PostCSS build");l.file=to(i)}let c=s.sourceContentFor(a.source);return c&&(l.source=c),l}mapResolve(t){return/^\w+:\/\//.test(t)?t:oo(this.map.consumer().sourceRoot||this.map.root||".",t)}get from(){return this.file||this.id}toJSON(){let t={};for(let e of["hasBOM","css","file","id"])null!=this[e]&&(t[e]=this[e]);return this.map&&(t.map={...this.map},t.map.consumerCache&&(t.map.consumerCache=void 0)),t}}var co=lo;lo.default=lo,Oe&&Oe.registerInput&&Oe.registerInput(lo);let{SourceMapConsumer:uo,SourceMapGenerator:ho}=Oe,{dirname:po,resolve:fo,relative:mo,sep:go}=Oe,{pathToFileURL:bo}=Oe,vo=Boolean(uo&&ho),yo=Boolean(po&&fo&&mo&&go);var wo=class{constructor(t,e,o,n){this.stringify=t,this.mapOpts=o.map||{},this.root=e,this.opts=o,this.css=n,this.usesFileUrls=!this.mapOpts.from&&this.mapOpts.absolute}isMap(){return void 0!==this.opts.map?!!this.opts.map:this.previous().length>0}previous(){if(!this.previousMaps)if(this.previousMaps=[],this.root)this.root.walk((t=>{if(t.source&&t.source.input.map){let e=t.source.input.map;this.previousMaps.includes(e)||this.previousMaps.push(e)}}));else{let t=new co(this.css,this.opts);t.map&&this.previousMaps.push(t.map)}return this.previousMaps}isInline(){if(void 0!==this.mapOpts.inline)return this.mapOpts.inline;let t=this.mapOpts.annotation;return(void 0===t||!0===t)&&(!this.previous().length||this.previous().some((t=>t.inline)))}isSourcesContent(){return void 0!==this.mapOpts.sourcesContent?this.mapOpts.sourcesContent:!this.previous().length||this.previous().some((t=>t.withContent()))}clearAnnotation(){if(!1!==this.mapOpts.annotation)if(this.root){let t;for(let e=this.root.nodes.length-1;e>=0;e--)t=this.root.nodes[e],"comment"===t.type&&0===t.text.indexOf("# sourceMappingURL=")&&this.root.removeChild(e)}else this.css&&(this.css=this.css.replace(/(\n)?\/\*#[\S\s]*?\*\/$/gm,""))}setSourcesContent(){let t={};if(this.root)this.root.walk((e=>{if(e.source){let o=e.source.input.from;if(o&&!t[o]){t[o]=!0;let n=this.usesFileUrls?this.toFileUrl(o):this.toUrl(this.path(o));this.map.setSourceContent(n,e.source.input.css)}}}));else if(this.css){let t=this.opts.from?this.toUrl(this.path(this.opts.from)):"<no source>";this.map.setSourceContent(t,this.css)}}applyPrevMaps(){for(let t of this.previous()){let e,o=this.toUrl(this.path(t.file)),n=t.root||po(t.file);!1===this.mapOpts.sourcesContent?(e=new uo(t.text),e.sourcesContent&&(e.sourcesContent=e.sourcesContent.map((()=>null)))):e=t.consumer(),this.map.applySourceMap(e,o,this.toUrl(this.path(n)))}}isAnnotation(){return!!this.isInline()||(void 0!==this.mapOpts.annotation?this.mapOpts.annotation:!this.previous().length||this.previous().some((t=>t.annotation)))}toBase64(t){return Buffer?Buffer.from(t).toString("base64"):window.btoa(unescape(encodeURIComponent(t)))}addAnnotation(){let t;t=this.isInline()?"data:application/json;base64,"+this.toBase64(this.map.toString()):"string"==typeof this.mapOpts.annotation?this.mapOpts.annotation:"function"==typeof this.mapOpts.annotation?this.mapOpts.annotation(this.opts.to,this.root):this.outputFile()+".map";let e="\n";this.css.includes("\r\n")&&(e="\r\n"),this.css+=e+"/*# sourceMappingURL="+t+" */"}outputFile(){return this.opts.to?this.path(this.opts.to):this.opts.from?this.path(this.opts.from):"to.css"}generateMap(){if(this.root)this.generateString();else if(1===this.previous().length){let t=this.previous()[0].consumer();t.file=this.outputFile(),this.map=ho.fromSourceMap(t)}else this.map=new ho({file:this.outputFile()}),this.map.addMapping({source:this.opts.from?this.toUrl(this.path(this.opts.from)):"<no source>",generated:{line:1,column:0},original:{line:1,column:0}});return this.isSourcesContent()&&this.setSourcesContent(),this.root&&this.previous().length>0&&this.applyPrevMaps(),this.isAnnotation()&&this.addAnnotation(),this.isInline()?[this.css]:[this.css,this.map]}path(t){if(0===t.indexOf("<"))return t;if(/^\w+:\/\//.test(t))return t;if(this.mapOpts.absolute)return t;let e=this.opts.to?po(this.opts.to):".";return"string"==typeof this.mapOpts.annotation&&(e=po(fo(e,this.mapOpts.annotation))),t=mo(e,t)}toUrl(t){return"\\"===go&&(t=t.replace(/\\/g,"/")),encodeURI(t).replace(/[#?]/g,encodeURIComponent)}toFileUrl(t){if(bo)return bo(t).toString();throw new Error("`map.absolute` option is not available in this PostCSS build")}sourcePath(t){return this.mapOpts.from?this.toUrl(this.mapOpts.from):this.usesFileUrls?this.toFileUrl(t.source.input.from):this.toUrl(this.path(t.source.input.from))}generateString(){this.css="",this.map=new ho({file:this.outputFile()});let t,e,o=1,n=1,r="<no source>",i={source:"",generated:{line:0,column:0},original:{line:0,column:0}};this.stringify(this.root,((s,a,l)=>{if(this.css+=s,a&&"end"!==l&&(i.generated.line=o,i.generated.column=n-1,a.source&&a.source.start?(i.source=this.sourcePath(a),i.original.line=a.source.start.line,i.original.column=a.source.start.column-1,this.map.addMapping(i)):(i.source=r,i.original.line=1,i.original.column=0,this.map.addMapping(i))),t=s.match(/\n/g),t?(o+=t.length,e=s.lastIndexOf("\n"),n=s.length-e):n+=s.length,a&&"start"!==l){let t=a.parent||{raws:{}};("decl"===a.type||"atrule"===a.type&&!a.nodes)&&a===t.last&&!t.raws.semicolon||(a.source&&a.source.end?(i.source=this.sourcePath(a),i.original.line=a.source.end.line,i.original.column=a.source.end.column-1,i.generated.line=o,i.generated.column=n-2,this.map.addMapping(i)):(i.source=r,i.original.line=1,i.original.column=0,i.generated.line=o,i.generated.column=n-1,this.map.addMapping(i)))}}))}generate(){if(this.clearAnnotation(),yo&&vo&&this.isMap())return this.generateMap();{let t="";return this.stringify(this.root,(e=>{t+=e})),[t]}}};class xo extends ze{constructor(t){super(t),this.type="comment"}}var ko=xo;xo.default=xo;let Co,So,Eo,_o,{isClean:Oo,my:Lo}=$e;function To(t){return t.map((t=>(t.nodes&&(t.nodes=To(t.nodes)),delete t.source,t)))}function $o(t){if(t[Oo]=!1,t.proxyOf.nodes)for(let e of t.proxyOf.nodes)$o(e)}class Mo extends ze{push(t){return t.parent=this,this.proxyOf.nodes.push(t),this}each(t){if(!this.proxyOf.nodes)return;let e,o,n=this.getIterator();for(;this.indexes[n]<this.proxyOf.nodes.length&&(e=this.indexes[n],o=t(this.proxyOf.nodes[e],e),!1!==o);)this.indexes[n]+=1;return delete this.indexes[n],o}walk(t){return this.each(((e,o)=>{let n;try{n=t(e,o)}catch(t){throw e.addToError(t)}return!1!==n&&e.walk&&(n=e.walk(t)),n}))}walkDecls(t,e){return e?t instanceof RegExp?this.walk(((o,n)=>{if("decl"===o.type&&t.test(o.prop))return e(o,n)})):this.walk(((o,n)=>{if("decl"===o.type&&o.prop===t)return e(o,n)})):(e=t,this.walk(((t,o)=>{if("decl"===t.type)return e(t,o)})))}walkRules(t,e){return e?t instanceof RegExp?this.walk(((o,n)=>{if("rule"===o.type&&t.test(o.selector))return e(o,n)})):this.walk(((o,n)=>{if("rule"===o.type&&o.selector===t)return e(o,n)})):(e=t,this.walk(((t,o)=>{if("rule"===t.type)return e(t,o)})))}walkAtRules(t,e){return e?t instanceof RegExp?this.walk(((o,n)=>{if("atrule"===o.type&&t.test(o.name))return e(o,n)})):this.walk(((o,n)=>{if("atrule"===o.type&&o.name===t)return e(o,n)})):(e=t,this.walk(((t,o)=>{if("atrule"===t.type)return e(t,o)})))}walkComments(t){return this.walk(((e,o)=>{if("comment"===e.type)return t(e,o)}))}append(...t){for(let e of t){let t=this.normalize(e,this.last);for(let e of t)this.proxyOf.nodes.push(e)}return this.markDirty(),this}prepend(...t){t=t.reverse();for(let e of t){let t=this.normalize(e,this.first,"prepend").reverse();for(let e of t)this.proxyOf.nodes.unshift(e);for(let e in this.indexes)this.indexes[e]=this.indexes[e]+t.length}return this.markDirty(),this}cleanRaws(t){if(super.cleanRaws(t),this.nodes)for(let e of this.nodes)e.cleanRaws(t)}insertBefore(t,e){let o,n=this.index(t),r=0===n&&"prepend",i=this.normalize(e,this.proxyOf.nodes[n],r).reverse();n=this.index(t);for(let t of i)this.proxyOf.nodes.splice(n,0,t);for(let t in this.indexes)o=this.indexes[t],n<=o&&(this.indexes[t]=o+i.length);return this.markDirty(),this}insertAfter(t,e){let o,n=this.index(t),r=this.normalize(e,this.proxyOf.nodes[n]).reverse();n=this.index(t);for(let t of r)this.proxyOf.nodes.splice(n+1,0,t);for(let t in this.indexes)o=this.indexes[t],n<o&&(this.indexes[t]=o+r.length);return this.markDirty(),this}removeChild(t){let e;t=this.index(t),this.proxyOf.nodes[t].parent=void 0,this.proxyOf.nodes.splice(t,1);for(let o in this.indexes)e=this.indexes[o],e>=t&&(this.indexes[o]=e-1);return this.markDirty(),this}removeAll(){for(let t of this.proxyOf.nodes)t.parent=void 0;return this.proxyOf.nodes=[],this.markDirty(),this}replaceValues(t,e,o){return o||(o=e,e={}),this.walkDecls((n=>{e.props&&!e.props.includes(n.prop)||e.fast&&!n.value.includes(e.fast)||(n.value=n.value.replace(t,o))})),this.markDirty(),this}every(t){return this.nodes.every(t)}some(t){return this.nodes.some(t)}index(t){return"number"==typeof t?t:(t.proxyOf&&(t=t.proxyOf),this.proxyOf.nodes.indexOf(t))}get first(){if(this.proxyOf.nodes)return this.proxyOf.nodes[0]}get last(){if(this.proxyOf.nodes)return this.proxyOf.nodes[this.proxyOf.nodes.length-1]}normalize(t,e){if("string"==typeof t)t=To(Co(t).nodes);else if(Array.isArray(t)){t=t.slice(0);for(let e of t)e.parent&&e.parent.removeChild(e,"ignore")}else if("root"===t.type&&"document"!==this.type){t=t.nodes.slice(0);for(let e of t)e.parent&&e.parent.removeChild(e,"ignore")}else if(t.type)t=[t];else if(t.prop){if(void 0===t.value)throw new Error("Value field is missed in node creation");"string"!=typeof t.value&&(t.value=String(t.value)),t=[new je(t)]}else if(t.selector)t=[new So(t)];else if(t.name)t=[new Eo(t)];else{if(!t.text)throw new Error("Unknown node type in node creation");t=[new ko(t)]}let o=t.map((t=>(t[Lo]||Mo.rebuild(t),(t=t.proxyOf).parent&&t.parent.removeChild(t),t[Oo]&&$o(t),void 0===t.raws.before&&e&&void 0!==e.raws.before&&(t.raws.before=e.raws.before.replace(/\S/g,"")),t.parent=this.proxyOf,t)));return o}getProxyProcessor(){return{set:(t,e,o)=>(t[e]===o||(t[e]=o,"name"!==e&&"params"!==e&&"selector"!==e||t.markDirty()),!0),get:(t,e)=>"proxyOf"===e?t:t[e]?"each"===e||"string"==typeof e&&e.startsWith("walk")?(...o)=>t[e](...o.map((t=>"function"==typeof t?(e,o)=>t(e.toProxy(),o):t))):"every"===e||"some"===e?o=>t[e](((t,...e)=>o(t.toProxy(),...e))):"root"===e?()=>t.root().toProxy():"nodes"===e?t.nodes.map((t=>t.toProxy())):"first"===e||"last"===e?t[e].toProxy():t[e]:t[e]}}getIterator(){this.lastEach||(this.lastEach=0),this.indexes||(this.indexes={}),this.lastEach+=1;let t=this.lastEach;return this.indexes[t]=0,t}}Mo.registerParse=t=>{Co=t},Mo.registerRule=t=>{So=t},Mo.registerAtRule=t=>{Eo=t},Mo.registerRoot=t=>{_o=t};var Do=Mo;let Ao,Io;Mo.default=Mo,Mo.rebuild=t=>{"atrule"===t.type?Object.setPrototypeOf(t,Eo.prototype):"rule"===t.type?Object.setPrototypeOf(t,So.prototype):"decl"===t.type?Object.setPrototypeOf(t,je.prototype):"comment"===t.type?Object.setPrototypeOf(t,ko.prototype):"root"===t.type&&Object.setPrototypeOf(t,_o.prototype),t[Lo]=!0,t.nodes&&t.nodes.forEach((t=>{Mo.rebuild(t)}))};class Po extends Do{constructor(t){super({type:"document",...t}),this.nodes||(this.nodes=[])}toResult(t={}){return new Ao(new Io,this,t).stringify()}}Po.registerLazyResult=t=>{Ao=t},Po.registerProcessor=t=>{Io=t};var No=Po;Po.default=Po;let Uo={};var Ho=function(t){Uo[t]||(Uo[t]=!0,"undefined"!=typeof console&&console.warn&&console.warn(t))};class qo{constructor(t,e={}){if(this.type="warning",this.text=t,e.node&&e.node.source){let t=e.node.rangeBy(e);this.line=t.start.line,this.column=t.start.column,this.endLine=t.end.line,this.endColumn=t.end.column}for(let t in e)this[t]=e[t]}toString(){return this.node?this.node.error(this.text,{plugin:this.plugin,index:this.index,word:this.word}).message:this.plugin?this.plugin+": "+this.text:this.text}}var zo=qo;qo.default=qo;class Ro{constructor(t,e,o){this.processor=t,this.messages=[],this.root=e,this.opts=o,this.css=void 0,this.map=void 0}toString(){return this.css}warn(t,e={}){e.plugin||this.lastPlugin&&this.lastPlugin.postcssPlugin&&(e.plugin=this.lastPlugin.postcssPlugin);let o=new zo(t,e);return this.messages.push(o),o}warnings(){return this.messages.filter((t=>"warning"===t.type))}get content(){return this.css}}var jo=Ro;Ro.default=Ro;const Bo="'".charCodeAt(0),Fo='"'.charCodeAt(0),Vo="\\".charCodeAt(0),Wo="/".charCodeAt(0),Go="\n".charCodeAt(0),Ko=" ".charCodeAt(0),Xo="\f".charCodeAt(0),Jo="\t".charCodeAt(0),Yo="\r".charCodeAt(0),Qo="[".charCodeAt(0),Zo="]".charCodeAt(0),tn="(".charCodeAt(0),en=")".charCodeAt(0),on="{".charCodeAt(0),nn="}".charCodeAt(0),rn=";".charCodeAt(0),sn="*".charCodeAt(0),an=":".charCodeAt(0),ln="@".charCodeAt(0),cn=/[\t\n\f\r "#'()/;[\\\]{}]/g,dn=/[\t\n\f\r !"#'():;@[\\\]{}]|\/(?=\*)/g,un=/.[\n"'(/\\]/,hn=/[\da-f]/i;class pn extends Do{constructor(t){super(t),this.type="atrule"}append(...t){return this.proxyOf.nodes||(this.nodes=[]),super.append(...t)}prepend(...t){return this.proxyOf.nodes||(this.nodes=[]),super.prepend(...t)}}var fn=pn;let mn,gn;pn.default=pn,Do.registerAtRule(pn);class bn extends Do{constructor(t){super(t),this.type="root",this.nodes||(this.nodes=[])}removeChild(t,e){let o=this.index(t);return!e&&0===o&&this.nodes.length>1&&(this.nodes[1].raws.before=this.nodes[o].raws.before),super.removeChild(t)}normalize(t,e,o){let n=super.normalize(t);if(e)if("prepend"===o)this.nodes.length>1?e.raws.before=this.nodes[1].raws.before:delete e.raws.before;else if(this.first!==e)for(let t of n)t.raws.before=e.raws.before;return n}toResult(t={}){return new mn(new gn,this,t).stringify()}}bn.registerLazyResult=t=>{mn=t},bn.registerProcessor=t=>{gn=t};var vn=bn;bn.default=bn,Do.registerRoot(bn);let yn={split(t,e,o){let n=[],r="",i=!1,s=0,a=!1,l="",c=!1;for(let o of t)c?c=!1:"\\"===o?c=!0:a?o===l&&(a=!1):'"'===o||"'"===o?(a=!0,l=o):"("===o?s+=1:")"===o?s>0&&(s-=1):0===s&&e.includes(o)&&(i=!0),i?(""!==r&&n.push(r.trim()),r="",i=!1):r+=o;return(o||""!==r)&&n.push(r.trim()),n},space:t=>yn.split(t,[" ","\n","\t"]),comma:t=>yn.split(t,[","],!0)};var wn=yn;yn.default=yn;class xn extends Do{constructor(t){super(t),this.type="rule",this.nodes||(this.nodes=[])}get selectors(){return wn.comma(this.selector)}set selectors(t){let e=this.selector?this.selector.match(/,\s*/):null,o=e?e[0]:","+this.raw("between","beforeOpen");this.selector=t.join(o)}}var kn=xn;xn.default=xn,Do.registerRule(xn);const Cn={empty:!0,space:!0};var Sn=class{constructor(t){this.input=t,this.root=new vn,this.current=this.root,this.spaces="",this.semicolon=!1,this.customProperty=!1,this.createTokenizer(),this.root.source={input:t,start:{offset:0,line:1,column:1}}}createTokenizer(){this.tokenizer=function(t,e={}){let o,n,r,i,s,a,l,c,d,u,h=t.css.valueOf(),p=e.ignoreErrors,f=h.length,m=0,g=[],b=[];function v(e){throw t.error("Unclosed "+e,m)}return{back:function(t){b.push(t)},nextToken:function(t){if(b.length)return b.pop();if(m>=f)return;let e=!!t&&t.ignoreUnclosed;switch(o=h.charCodeAt(m),o){case Go:case Ko:case Jo:case Yo:case Xo:n=m;do{n+=1,o=h.charCodeAt(n)}while(o===Ko||o===Go||o===Jo||o===Yo||o===Xo);u=["space",h.slice(m,n)],m=n-1;break;case Qo:case Zo:case on:case nn:case an:case rn:case en:{let t=String.fromCharCode(o);u=[t,t,m];break}case tn:if(c=g.length?g.pop()[1]:"",d=h.charCodeAt(m+1),"url"===c&&d!==Bo&&d!==Fo&&d!==Ko&&d!==Go&&d!==Jo&&d!==Xo&&d!==Yo){n=m;do{if(a=!1,n=h.indexOf(")",n+1),-1===n){if(p||e){n=m;break}v("bracket")}for(l=n;h.charCodeAt(l-1)===Vo;)l-=1,a=!a}while(a);u=["brackets",h.slice(m,n+1),m,n],m=n}else n=h.indexOf(")",m+1),i=h.slice(m,n+1),-1===n||un.test(i)?u=["(","(",m]:(u=["brackets",i,m,n],m=n);break;case Bo:case Fo:r=o===Bo?"'":'"',n=m;do{if(a=!1,n=h.indexOf(r,n+1),-1===n){if(p||e){n=m+1;break}v("string")}for(l=n;h.charCodeAt(l-1)===Vo;)l-=1,a=!a}while(a);u=["string",h.slice(m,n+1),m,n],m=n;break;case ln:cn.lastIndex=m+1,cn.test(h),n=0===cn.lastIndex?h.length-1:cn.lastIndex-2,u=["at-word",h.slice(m,n+1),m,n],m=n;break;case Vo:for(n=m,s=!0;h.charCodeAt(n+1)===Vo;)n+=1,s=!s;if(o=h.charCodeAt(n+1),s&&o!==Wo&&o!==Ko&&o!==Go&&o!==Jo&&o!==Yo&&o!==Xo&&(n+=1,hn.test(h.charAt(n)))){for(;hn.test(h.charAt(n+1));)n+=1;h.charCodeAt(n+1)===Ko&&(n+=1)}u=["word",h.slice(m,n+1),m,n],m=n;break;default:o===Wo&&h.charCodeAt(m+1)===sn?(n=h.indexOf("*/",m+2)+1,0===n&&(p||e?n=h.length:v("comment")),u=["comment",h.slice(m,n+1),m,n],m=n):(dn.lastIndex=m+1,dn.test(h),n=0===dn.lastIndex?h.length-1:dn.lastIndex-2,u=["word",h.slice(m,n+1),m,n],g.push(u),m=n)}return m++,u},endOfFile:function(){return 0===b.length&&m>=f},position:function(){return m}}}(this.input)}parse(){let t;for(;!this.tokenizer.endOfFile();)switch(t=this.tokenizer.nextToken(),t[0]){case"space":this.spaces+=t[1];break;case";":this.freeSemicolon(t);break;case"}":this.end(t);break;case"comment":this.comment(t);break;case"at-word":this.atrule(t);break;case"{":this.emptyRule(t);break;default:this.other(t)}this.endFile()}comment(t){let e=new ko;this.init(e,t[2]),e.source.end=this.getPosition(t[3]||t[2]);let o=t[1].slice(2,-2);if(/^\s*$/.test(o))e.text="",e.raws.left=o,e.raws.right="";else{let t=o.match(/^(\s*)([^]*\S)(\s*)$/);e.text=t[2],e.raws.left=t[1],e.raws.right=t[3]}}emptyRule(t){let e=new kn;this.init(e,t[2]),e.selector="",e.raws.between="",this.current=e}other(t){let e=!1,o=null,n=!1,r=null,i=[],s=t[1].startsWith("--"),a=[],l=t;for(;l;){if(o=l[0],a.push(l),"("===o||"["===o)r||(r=l),i.push("("===o?")":"]");else if(s&&n&&"{"===o)r||(r=l),i.push("}");else if(0===i.length){if(";"===o){if(n)return void this.decl(a,s);break}if("{"===o)return void this.rule(a);if("}"===o){this.tokenizer.back(a.pop()),e=!0;break}":"===o&&(n=!0)}else o===i[i.length-1]&&(i.pop(),0===i.length&&(r=null));l=this.tokenizer.nextToken()}if(this.tokenizer.endOfFile()&&(e=!0),i.length>0&&this.unclosedBracket(r),e&&n){if(!s)for(;a.length&&(l=a[a.length-1][0],"space"===l||"comment"===l);)this.tokenizer.back(a.pop());this.decl(a,s)}else this.unknownWord(a)}rule(t){t.pop();let e=new kn;this.init(e,t[0][2]),e.raws.between=this.spacesAndCommentsFromEnd(t),this.raw(e,"selector",t),this.current=e}decl(t,e){let o=new je;this.init(o,t[0][2]);let n,r=t[t.length-1];for(";"===r[0]&&(this.semicolon=!0,t.pop()),o.source.end=this.getPosition(r[3]||r[2]||function(t){for(let e=t.length-1;e>=0;e--){let o=t[e],n=o[3]||o[2];if(n)return n}}(t));"word"!==t[0][0];)1===t.length&&this.unknownWord(t),o.raws.before+=t.shift()[1];for(o.source.start=this.getPosition(t[0][2]),o.prop="";t.length;){let e=t[0][0];if(":"===e||"space"===e||"comment"===e)break;o.prop+=t.shift()[1]}for(o.raws.between="";t.length;){if(n=t.shift(),":"===n[0]){o.raws.between+=n[1];break}"word"===n[0]&&/\w/.test(n[1])&&this.unknownWord([n]),o.raws.between+=n[1]}"_"!==o.prop[0]&&"*"!==o.prop[0]||(o.raws.before+=o.prop[0],o.prop=o.prop.slice(1));let i,s=[];for(;t.length&&(i=t[0][0],"space"===i||"comment"===i);)s.push(t.shift());this.precheckMissedSemicolon(t);for(let e=t.length-1;e>=0;e--){if(n=t[e],"!important"===n[1].toLowerCase()){o.important=!0;let n=this.stringFrom(t,e);n=this.spacesFromEnd(t)+n," !important"!==n&&(o.raws.important=n);break}if("important"===n[1].toLowerCase()){let n=t.slice(0),r="";for(let t=e;t>0;t--){let e=n[t][0];if(0===r.trim().indexOf("!")&&"space"!==e)break;r=n.pop()[1]+r}0===r.trim().indexOf("!")&&(o.important=!0,o.raws.important=r,t=n)}if("space"!==n[0]&&"comment"!==n[0])break}let a=t.some((t=>"space"!==t[0]&&"comment"!==t[0]));a&&(o.raws.between+=s.map((t=>t[1])).join(""),s=[]),this.raw(o,"value",s.concat(t),e),o.value.includes(":")&&!e&&this.checkMissedSemicolon(t)}atrule(t){let e,o,n,r=new fn;r.name=t[1].slice(1),""===r.name&&this.unnamedAtrule(r,t),this.init(r,t[2]);let i=!1,s=!1,a=[],l=[];for(;!this.tokenizer.endOfFile();){if(e=(t=this.tokenizer.nextToken())[0],"("===e||"["===e?l.push("("===e?")":"]"):"{"===e&&l.length>0?l.push("}"):e===l[l.length-1]&&l.pop(),0===l.length){if(";"===e){r.source.end=this.getPosition(t[2]),this.semicolon=!0;break}if("{"===e){s=!0;break}if("}"===e){if(a.length>0){for(n=a.length-1,o=a[n];o&&"space"===o[0];)o=a[--n];o&&(r.source.end=this.getPosition(o[3]||o[2]))}this.end(t);break}a.push(t)}else a.push(t);if(this.tokenizer.endOfFile()){i=!0;break}}r.raws.between=this.spacesAndCommentsFromEnd(a),a.length?(r.raws.afterName=this.spacesAndCommentsFromStart(a),this.raw(r,"params",a),i&&(t=a[a.length-1],r.source.end=this.getPosition(t[3]||t[2]),this.spaces=r.raws.between,r.raws.between="")):(r.raws.afterName="",r.params=""),s&&(r.nodes=[],this.current=r)}end(t){this.current.nodes&&this.current.nodes.length&&(this.current.raws.semicolon=this.semicolon),this.semicolon=!1,this.current.raws.after=(this.current.raws.after||"")+this.spaces,this.spaces="",this.current.parent?(this.current.source.end=this.getPosition(t[2]),this.current=this.current.parent):this.unexpectedClose(t)}endFile(){this.current.parent&&this.unclosedBlock(),this.current.nodes&&this.current.nodes.length&&(this.current.raws.semicolon=this.semicolon),this.current.raws.after=(this.current.raws.after||"")+this.spaces}freeSemicolon(t){if(this.spaces+=t[1],this.current.nodes){let t=this.current.nodes[this.current.nodes.length-1];t&&"rule"===t.type&&!t.raws.ownSemicolon&&(t.raws.ownSemicolon=this.spaces,this.spaces="")}}getPosition(t){let e=this.input.fromOffset(t);return{offset:t,line:e.line,column:e.col}}init(t,e){this.current.push(t),t.source={start:this.getPosition(e),input:this.input},t.raws.before=this.spaces,this.spaces="","comment"!==t.type&&(this.semicolon=!1)}raw(t,e,o,n){let r,i,s,a,l=o.length,c="",d=!0;for(let t=0;t<l;t+=1)r=o[t],i=r[0],"space"!==i||t!==l-1||n?"comment"===i?(a=o[t-1]?o[t-1][0]:"empty",s=o[t+1]?o[t+1][0]:"empty",Cn[a]||Cn[s]||","===c.slice(-1)?d=!1:c+=r[1]):c+=r[1]:d=!1;if(!d){let n=o.reduce(((t,e)=>t+e[1]),"");t.raws[e]={value:c,raw:n}}t[e]=c}spacesAndCommentsFromEnd(t){let e,o="";for(;t.length&&(e=t[t.length-1][0],"space"===e||"comment"===e);)o=t.pop()[1]+o;return o}spacesAndCommentsFromStart(t){let e,o="";for(;t.length&&(e=t[0][0],"space"===e||"comment"===e);)o+=t.shift()[1];return o}spacesFromEnd(t){let e,o="";for(;t.length&&(e=t[t.length-1][0],"space"===e);)o=t.pop()[1]+o;return o}stringFrom(t,e){let o="";for(let n=e;n<t.length;n++)o+=t[n][1];return t.splice(e,t.length-e),o}colon(t){let e,o,n,r=0;for(let[i,s]of t.entries()){if(e=s,o=e[0],"("===o&&(r+=1),")"===o&&(r-=1),0===r&&":"===o){if(n){if("word"===n[0]&&"progid"===n[1])continue;return i}this.doubleColon(e)}n=e}return!1}unclosedBracket(t){throw this.input.error("Unclosed bracket",{offset:t[2]},{offset:t[2]+1})}unknownWord(t){throw this.input.error("Unknown word",{offset:t[0][2]},{offset:t[0][2]+t[0][1].length})}unexpectedClose(t){throw this.input.error("Unexpected }",{offset:t[2]},{offset:t[2]+1})}unclosedBlock(){let t=this.current.source.start;throw this.input.error("Unclosed block",t.line,t.column)}doubleColon(t){throw this.input.error("Double colon",{offset:t[2]},{offset:t[2]+t[1].length})}unnamedAtrule(t,e){throw this.input.error("At-rule without name",{offset:e[2]},{offset:e[2]+e[1].length})}precheckMissedSemicolon(){}checkMissedSemicolon(t){let e=this.colon(t);if(!1===e)return;let o,n=0;for(let r=e-1;r>=0&&(o=t[r],"space"===o[0]||(n+=1,2!==n));r--);throw this.input.error("Missed semicolon","word"===o[0]?o[3]+1:o[2])}};function En(t,e){let o=new co(t,e),n=new Sn(o);try{n.parse()}catch(t){throw"production"!==process.env.NODE_ENV&&"CssSyntaxError"===t.name&&e&&e.from&&(/\.scss$/i.test(e.from)?t.message+="\nYou tried to parse SCSS with the standard CSS parser; try again with the postcss-scss parser":/\.sass/i.test(e.from)?t.message+="\nYou tried to parse Sass with the standard CSS parser; try again with the postcss-sass parser":/\.less$/i.test(e.from)&&(t.message+="\nYou tried to parse Less with the standard CSS parser; try again with the postcss-less parser")),t}return n.root}var _n=En;En.default=En,Do.registerParse(En);let{isClean:On,my:Ln}=$e;const Tn={document:"Document",root:"Root",atrule:"AtRule",rule:"Rule",decl:"Declaration",comment:"Comment"},$n={postcssPlugin:!0,prepare:!0,Once:!0,Document:!0,Root:!0,Declaration:!0,Rule:!0,AtRule:!0,Comment:!0,DeclarationExit:!0,RuleExit:!0,AtRuleExit:!0,CommentExit:!0,RootExit:!0,DocumentExit:!0,OnceExit:!0},Mn={postcssPlugin:!0,prepare:!0,Once:!0};function Dn(t){return"object"==typeof t&&"function"==typeof t.then}function An(t){let e=!1,o=Tn[t.type];return"decl"===t.type?e=t.prop.toLowerCase():"atrule"===t.type&&(e=t.name.toLowerCase()),e&&t.append?[o,o+"-"+e,0,o+"Exit",o+"Exit-"+e]:e?[o,o+"-"+e,o+"Exit",o+"Exit-"+e]:t.append?[o,0,o+"Exit"]:[o,o+"Exit"]}function In(t){let e;return e="document"===t.type?["Document",0,"DocumentExit"]:"root"===t.type?["Root",0,"RootExit"]:An(t),{node:t,events:e,eventIndex:0,visitors:[],visitorIndex:0,iterator:0}}function Pn(t){return t[On]=!1,t.nodes&&t.nodes.forEach((t=>Pn(t))),t}let Nn={};class Un{constructor(t,e,o){let n;if(this.stringified=!1,this.processed=!1,"object"!=typeof e||null===e||"root"!==e.type&&"document"!==e.type)if(e instanceof Un||e instanceof jo)n=Pn(e.root),e.map&&(void 0===o.map&&(o.map={}),o.map.inline||(o.map.inline=!1),o.map.prev=e.map);else{let t=_n;o.syntax&&(t=o.syntax.parse),o.parser&&(t=o.parser),t.parse&&(t=t.parse);try{n=t(e,o)}catch(t){this.processed=!0,this.error=t}n&&!n[Ln]&&Do.rebuild(n)}else n=Pn(e);this.result=new jo(t,n,o),this.helpers={...Nn,result:this.result,postcss:Nn},this.plugins=this.processor.plugins.map((t=>"object"==typeof t&&t.prepare?{...t,...t.prepare(this.result)}:t))}get[Symbol.toStringTag](){return"LazyResult"}get processor(){return this.result.processor}get opts(){return this.result.opts}get css(){return this.stringify().css}get content(){return this.stringify().content}get map(){return this.stringify().map}get root(){return this.sync().root}get messages(){return this.sync().messages}warnings(){return this.sync().warnings()}toString(){return this.css}then(t,e){return"production"!==process.env.NODE_ENV&&("from"in this.opts||Ho("Without `from` option PostCSS could generate wrong source map and will not find Browserslist config. Set it to CSS file path or to `undefined` to prevent this warning.")),this.async().then(t,e)}catch(t){return this.async().catch(t)}finally(t){return this.async().then(t,t)}async(){return this.error?Promise.reject(this.error):this.processed?Promise.resolve(this.result):(this.processing||(this.processing=this.runAsync()),this.processing)}sync(){if(this.error)throw this.error;if(this.processed)return this.result;if(this.processed=!0,this.processing)throw this.getAsyncError();for(let t of this.plugins){if(Dn(this.runOnRoot(t)))throw this.getAsyncError()}if(this.prepareVisitors(),this.hasListener){let t=this.result.root;for(;!t[On];)t[On]=!0,this.walkSync(t);if(this.listeners.OnceExit)if("document"===t.type)for(let e of t.nodes)this.visitSync(this.listeners.OnceExit,e);else this.visitSync(this.listeners.OnceExit,t)}return this.result}stringify(){if(this.error)throw this.error;if(this.stringified)return this.result;this.stringified=!0,this.sync();let t=this.result.opts,e=Pe;t.syntax&&(e=t.syntax.stringify),t.stringifier&&(e=t.stringifier),e.stringify&&(e=e.stringify);let o=new wo(e,this.result.root,this.result.opts).generate();return this.result.css=o[0],this.result.map=o[1],this.result}walkSync(t){t[On]=!0;let e=An(t);for(let o of e)if(0===o)t.nodes&&t.each((t=>{t[On]||this.walkSync(t)}));else{let e=this.listeners[o];if(e&&this.visitSync(e,t.toProxy()))return}}visitSync(t,e){for(let[o,n]of t){let t;this.result.lastPlugin=o;try{t=n(e,this.helpers)}catch(t){throw this.handleError(t,e.proxyOf)}if("root"!==e.type&&"document"!==e.type&&!e.parent)return!0;if(Dn(t))throw this.getAsyncError()}}runOnRoot(t){this.result.lastPlugin=t;try{if("object"==typeof t&&t.Once){if("document"===this.result.root.type){let e=this.result.root.nodes.map((e=>t.Once(e,this.helpers)));return Dn(e[0])?Promise.all(e):e}return t.Once(this.result.root,this.helpers)}if("function"==typeof t)return t(this.result.root,this.result)}catch(t){throw this.handleError(t)}}getAsyncError(){throw new Error("Use process(css).then(cb) to work with async plugins")}handleError(t,e){let o=this.result.lastPlugin;try{if(e&&e.addToError(t),this.error=t,"CssSyntaxError"!==t.name||t.plugin){if(o.postcssVersion&&"production"!==process.env.NODE_ENV){let t=o.postcssPlugin,e=o.postcssVersion,n=this.result.processor.version,r=e.split("."),i=n.split(".");(r[0]!==i[0]||parseInt(r[1])>parseInt(i[1]))&&console.error("Unknown error from PostCSS plugin. Your current PostCSS version is "+n+", but "+t+" uses "+e+". Perhaps this is the source of the error below.")}}else t.plugin=o.postcssPlugin,t.setMessage()}catch(t){console&&console.error&&console.error(t)}return t}async runAsync(){this.plugin=0;for(let t=0;t<this.plugins.length;t++){let e=this.plugins[t],o=this.runOnRoot(e);if(Dn(o))try{await o}catch(t){throw this.handleError(t)}}if(this.prepareVisitors(),this.hasListener){let t=this.result.root;for(;!t[On];){t[On]=!0;let e=[In(t)];for(;e.length>0;){let t=this.visitTick(e);if(Dn(t))try{await t}catch(t){let o=e[e.length-1].node;throw this.handleError(t,o)}}}if(this.listeners.OnceExit)for(let[e,o]of this.listeners.OnceExit){this.result.lastPlugin=e;try{if("document"===t.type){let e=t.nodes.map((t=>o(t,this.helpers)));await Promise.all(e)}else await o(t,this.helpers)}catch(t){throw this.handleError(t)}}}return this.processed=!0,this.stringify()}prepareVisitors(){this.listeners={};let t=(t,e,o)=>{this.listeners[e]||(this.listeners[e]=[]),this.listeners[e].push([t,o])};for(let e of this.plugins)if("object"==typeof e)for(let o in e){if(!$n[o]&&/^[A-Z]/.test(o))throw new Error(`Unknown event ${o} in ${e.postcssPlugin}. Try to update PostCSS (${this.processor.version} now).`);if(!Mn[o])if("object"==typeof e[o])for(let n in e[o])t(e,"*"===n?o:o+"-"+n.toLowerCase(),e[o][n]);else"function"==typeof e[o]&&t(e,o,e[o])}this.hasListener=Object.keys(this.listeners).length>0}visitTick(t){let e=t[t.length-1],{node:o,visitors:n}=e;if("root"!==o.type&&"document"!==o.type&&!o.parent)return void t.pop();if(n.length>0&&e.visitorIndex<n.length){let[t,r]=n[e.visitorIndex];e.visitorIndex+=1,e.visitorIndex===n.length&&(e.visitors=[],e.visitorIndex=0),this.result.lastPlugin=t;try{return r(o.toProxy(),this.helpers)}catch(t){throw this.handleError(t,o)}}if(0!==e.iterator){let n,r=e.iterator;for(;n=o.nodes[o.indexes[r]];)if(o.indexes[r]+=1,!n[On])return n[On]=!0,void t.push(In(n));e.iterator=0,delete o.indexes[r]}let r=e.events;for(;e.eventIndex<r.length;){let t=r[e.eventIndex];if(e.eventIndex+=1,0===t)return void(o.nodes&&o.nodes.length&&(o[On]=!0,e.iterator=o.getIterator()));if(this.listeners[t])return void(e.visitors=this.listeners[t])}t.pop()}}Un.registerPostcss=t=>{Nn=t};var Hn=Un;Un.default=Un,vn.registerLazyResult(Un),No.registerLazyResult(Un);class qn{constructor(t,e,o){let n;e=e.toString(),this.stringified=!1,this._processor=t,this._css=e,this._opts=o,this._map=void 0;let r=Pe;this.result=new jo(this._processor,n,this._opts),this.result.css=e;let i=this;Object.defineProperty(this.result,"root",{get:()=>i.root});let s=new wo(r,n,this._opts,e);if(s.isMap()){let[t,e]=s.generate();t&&(this.result.css=t),e&&(this.result.map=e)}}get[Symbol.toStringTag](){return"NoWorkResult"}get processor(){return this.result.processor}get opts(){return this.result.opts}get css(){return this.result.css}get content(){return this.result.css}get map(){return this.result.map}get root(){if(this._root)return this._root;let t,e=_n;try{t=e(this._css,this._opts)}catch(t){this.error=t}if(this.error)throw this.error;return this._root=t,t}get messages(){return[]}warnings(){return[]}toString(){return this._css}then(t,e){return"production"!==process.env.NODE_ENV&&("from"in this._opts||Ho("Without `from` option PostCSS could generate wrong source map and will not find Browserslist config. Set it to CSS file path or to `undefined` to prevent this warning.")),this.async().then(t,e)}catch(t){return this.async().catch(t)}finally(t){return this.async().then(t,t)}async(){return this.error?Promise.reject(this.error):Promise.resolve(this.result)}sync(){if(this.error)throw this.error;return this.result}}var zn=qn;qn.default=qn;class Rn{constructor(t=[]){this.version="8.4.20",this.plugins=this.normalize(t)}use(t){return this.plugins=this.plugins.concat(this.normalize([t])),this}process(t,e={}){return 0===this.plugins.length&&void 0===e.parser&&void 0===e.stringifier&&void 0===e.syntax?new zn(this,t,e):new Hn(this,t,e)}normalize(t){let e=[];for(let o of t)if(!0===o.postcss?o=o():o.postcss&&(o=o.postcss),"object"==typeof o&&Array.isArray(o.plugins))e=e.concat(o.plugins);else if("object"==typeof o&&o.postcssPlugin)e.push(o);else if("function"==typeof o)e.push(o);else{if("object"!=typeof o||!o.parse&&!o.stringify)throw new Error(o+" is not a PostCSS plugin");if("production"!==process.env.NODE_ENV)throw new Error("PostCSS syntaxes cannot be used as plugins. Instead, please use one of the syntax/parser/stringifier options as outlined in your PostCSS runner documentation.")}return e}}var jn=Rn;function Bn(t,e){if(Array.isArray(t))return t.map((t=>Bn(t)));let{inputs:o,...n}=t;if(o){e=[];for(let t of o){let o={...t,__proto__:co.prototype};o.map&&(o.map={...o.map,__proto__:Ye.prototype}),e.push(o)}}if(n.nodes&&(n.nodes=t.nodes.map((t=>Bn(t,e)))),n.source){let{inputId:t,...o}=n.source;n.source=o,null!=t&&(n.source.input=e[t])}if("root"===n.type)return new vn(n);if("decl"===n.type)return new je(n);if("rule"===n.type)return new kn(n);if("comment"===n.type)return new ko(n);if("atrule"===n.type)return new fn(n);throw new Error("Unknown node type: "+t.type)}Rn.default=Rn,vn.registerProcessor(Rn),No.registerProcessor(Rn);var Fn=Bn;function Vn(...t){return 1===t.length&&Array.isArray(t[0])&&(t=t[0]),new jn(t)}Bn.default=Bn,Vn.plugin=function(t,e){let o,n=!1;function r(...o){console&&console.warn&&!n&&(n=!0,console.warn(t+": postcss.plugin was deprecated. Migration guide:\nhttps://evilmartians.com/chronicles/postcss-8-plugin-migration"),process.env.LANG&&process.env.LANG.startsWith("cn")&&console.warn(t+": 里面 postcss.plugin 被弃用. 迁移指南:\nhttps://www.w3ctech.com/topic/2226"));let r=e(...o);return r.postcssPlugin=t,r.postcssVersion=(new jn).version,r}return Object.defineProperty(r,"postcss",{get:()=>(o||(o=r()),o)}),r.process=function(t,e,o){return Vn([r(o)]).process(t,e)},r},Vn.stringify=Pe,Vn.parse=_n,Vn.fromJSON=Fn,Vn.list=wn,Vn.comment=t=>new ko(t),Vn.atRule=t=>new fn(t),Vn.decl=t=>new je(t),Vn.rule=t=>new kn(t),Vn.root=t=>new vn(t),Vn.document=t=>new No(t),Vn.CssSyntaxError=Te,Vn.Declaration=je,Vn.Container=Do,Vn.Processor=jn,Vn.Document=No,Vn.Comment=ko,Vn.Warning=zo,Vn.AtRule=fn,Vn.Result=jo,Vn.Input=co,Vn.Rule=kn,Vn.Root=vn,Vn.Node=ze,Hn.registerPostcss(Vn);var Wn=Vn;Vn.default=Vn;const{isPlainObject:Gn}=he,{parse:Kn}=Wn,Xn=["img","audio","video","picture","svg","object","map","iframe","embed"],Jn=["script","style"];function Yn(t,e){t&&Object.keys(t).forEach((function(o){e(t[o],o)}))}function Qn(t,e){return{}.hasOwnProperty.call(t,e)}function Zn(t,e){const o=[];return Yn(t,(function(t){e(t)&&o.push(t)})),o}var tr=or;const er=/^[^\0\t\n\f\r /<=>]+$/;function or(t,e,o){if(null==t)return"";"number"==typeof t&&(t=t.toString());let n="",r="";function i(t,e){const o=this;this.tag=t,this.attribs=e||{},this.tagPosition=n.length,this.text="",this.mediaChildren=[],this.updateParentNodeText=function(){if(m.length){m[m.length-1].text+=o.text}},this.updateParentNodeMediaChildren=function(){if(m.length&&Xn.includes(this.tag)){m[m.length-1].mediaChildren.push(this.tag)}}}(e=Object.assign({},or.defaults,e)).parser=Object.assign({},nr,e.parser),Jn.forEach((function(t){!1!==e.allowedTags&&(e.allowedTags||[]).indexOf(t)>-1&&!e.allowVulnerableTags&&console.warn(`\n\n⚠️ Your \`allowedTags\` option includes, \`${t}\`, which is inherently\nvulnerable to XSS attacks. Please remove it from \`allowedTags\`.\nOr, to disable this warning, add the \`allowVulnerableTags\` option\nand ensure you are accounting for this risk.\n\n`)}));const s=e.nonTextTags||["script","style","textarea","option"];let a,l;e.allowedAttributes&&(a={},l={},Yn(e.allowedAttributes,(function(t,e){a[e]=[];const o=[];t.forEach((function(t){"string"==typeof t&&t.indexOf("*")>=0?o.push(ce(t).replace(/\\\*/g,".*")):a[e].push(t)})),o.length&&(l[e]=new RegExp("^("+o.join("|")+")$"))})));const c={},d={},u={};Yn(e.allowedClasses,(function(t,e){a&&(Qn(a,e)||(a[e]=[]),a[e].push("class")),c[e]=[],u[e]=[];const o=[];t.forEach((function(t){"string"==typeof t&&t.indexOf("*")>=0?o.push(ce(t).replace(/\\\*/g,".*")):t instanceof RegExp?u[e].push(t):c[e].push(t)})),o.length&&(d[e]=new RegExp("^("+o.join("|")+")$"))}));const h={};let p,f,m,g,b,v,y;Yn(e.transformTags,(function(t,e){let o;"function"==typeof t?o=t:"string"==typeof t&&(o=or.simpleTransform(t)),"*"===e?p=o:h[e]=o}));let w=!1;k();const x=new le.Parser({onopentag:function(t,o){if(e.enforceHtmlBoundary&&"html"===t&&k(),v)return void y++;const x=new i(t,o);m.push(x);let O=!1;const L=!!x.text;let T;if(Qn(h,t)&&(T=h[t](t,o),x.attribs=o=T.attribs,void 0!==T.text&&(x.innerText=T.text),t!==T.tagName&&(x.name=t=T.tagName,b[f]=T.tagName)),p&&(T=p(t,o),x.attribs=o=T.attribs,t!==T.tagName&&(x.name=t=T.tagName,b[f]=T.tagName)),(!1!==e.allowedTags&&-1===(e.allowedTags||[]).indexOf(t)||"recursiveEscape"===e.disallowedTagsMode&&!function(t){for(const e in t)if(Qn(t,e))return!1;return!0}(g)||null!=e.nestingLimit&&f>=e.nestingLimit)&&(O=!0,g[f]=!0,"discard"===e.disallowedTagsMode&&-1!==s.indexOf(t)&&(v=!0,y=1),g[f]=!0),f++,O){if("discard"===e.disallowedTagsMode)return;r=n,n=""}n+="<"+t,"script"===t&&(e.allowedScriptHostnames||e.allowedScriptDomains)&&(x.innerText=""),(!a||Qn(a,t)||a["*"])&&Yn(o,(function(o,r){if(!er.test(r))return void delete x.attribs[r];let i=!1;if(!a||Qn(a,t)&&-1!==a[t].indexOf(r)||a["*"]&&-1!==a["*"].indexOf(r)||Qn(l,t)&&l[t].test(r)||l["*"]&&l["*"].test(r))i=!0;else if(a&&a[t])for(const e of a[t])if(Gn(e)&&e.name&&e.name===r){i=!0;let t="";if(!0===e.multiple){const n=o.split(" ");for(const o of n)-1!==e.values.indexOf(o)&&(""===t?t=o:t+=" "+o)}else e.values.indexOf(o)>=0&&(t=o);o=t}if(i){if(-1!==e.allowedSchemesAppliedToAttributes.indexOf(r)&&S(t,o))return void delete x.attribs[r];if("script"===t&&"src"===r){let t=!0;try{const n=E(o);if(e.allowedScriptHostnames||e.allowedScriptDomains){const o=(e.allowedScriptHostnames||[]).find((function(t){return t===n.url.hostname})),r=(e.allowedScriptDomains||[]).find((function(t){return n.url.hostname===t||n.url.hostname.endsWith(`.${t}`)}));t=o||r}}catch(e){t=!1}if(!t)return void delete x.attribs[r]}if("iframe"===t&&"src"===r){let t=!0;try{const n=E(o);if(n.isRelativeUrl)t=Qn(e,"allowIframeRelativeUrls")?e.allowIframeRelativeUrls:!e.allowedIframeHostnames&&!e.allowedIframeDomains;else if(e.allowedIframeHostnames||e.allowedIframeDomains){const o=(e.allowedIframeHostnames||[]).find((function(t){return t===n.url.hostname})),r=(e.allowedIframeDomains||[]).find((function(t){return n.url.hostname===t||n.url.hostname.endsWith(`.${t}`)}));t=o||r}}catch(e){t=!1}if(!t)return void delete x.attribs[r]}if("srcset"===r)try{let t=ke(o);if(t.forEach((function(t){S("srcset",t.url)&&(t.evil=!0)})),t=Zn(t,(function(t){return!t.evil})),!t.length)return void delete x.attribs[r];s=Zn(t,(function(t){return!t.evil})),o=s.map((function(t){if(!t.url)throw new Error("URL missing");return t.url+(t.w?` ${t.w}w`:"")+(t.h?` ${t.h}h`:"")+(t.d?` ${t.d}x`:"")})).join(", "),x.attribs[r]=o}catch(t){return void delete x.attribs[r]}if("class"===r){const e=c[t],n=c["*"],i=d[t],s=u[t],a=[i,d["*"]].concat(s).filter((function(t){return t}));if(!(o=_(o,e&&n?xe(e,n):e||n,a)).length)return void delete x.attribs[r]}if("style"===r)try{const n=function(t,e){if(!e)return t;const o=t.nodes[0];let n;n=e[o.selector]&&e["*"]?xe(e[o.selector],e["*"]):e[o.selector]||e["*"];n&&(t.nodes[0].nodes=o.nodes.reduce(function(t){return function(e,o){if(Qn(t,o.prop)){t[o.prop].some((function(t){return t.test(o.value)}))&&e.push(o)}return e}}(n),[]));return t}(Kn(t+" {"+o+"}"),e.allowedStyles);if(o=function(t){return t.nodes[0].nodes.reduce((function(t,e){return t.push(`${e.prop}:${e.value}${e.important?" !important":""}`),t}),[]).join(";")}(n),0===o.length)return void delete x.attribs[r]}catch(t){return void delete x.attribs[r]}n+=" "+r,o&&o.length&&(n+='="'+C(o,!0)+'"')}else delete x.attribs[r];var s})),-1!==e.selfClosing.indexOf(t)?n+=" />":(n+=">",!x.innerText||L||e.textFilter||(n+=C(x.innerText),w=!0)),O&&(n=r+C(n),r="")},ontext:function(t){if(v)return;const o=m[m.length-1];let r;if(o&&(r=o.tag,t=void 0!==o.innerText?o.innerText:t),"discard"!==e.disallowedTagsMode||"script"!==r&&"style"!==r){const o=C(t,!1);e.textFilter&&!w?n+=e.textFilter(o,r):w||(n+=o)}else n+=t;if(m.length){m[m.length-1].text+=t}},onclosetag:function(t){if(v){if(y--,y)return;v=!1}const o=m.pop();if(!o)return;if(o.tag!==t)return void m.push(o);v=!!e.enforceHtmlBoundary&&"html"===t,f--;const i=g[f];if(i){if(delete g[f],"discard"===e.disallowedTagsMode)return void o.updateParentNodeText();r=n,n=""}b[f]&&(t=b[f],delete b[f]),e.exclusiveFilter&&e.exclusiveFilter(o)?n=n.substr(0,o.tagPosition):(o.updateParentNodeMediaChildren(),o.updateParentNodeText(),-1===e.selfClosing.indexOf(t)?(n+="</"+t+">",i&&(n=r+C(n),r=""),w=!1):i&&(n=r,r=""))}},e.parser);return x.write(t),x.end(),n;function k(){n="",f=0,m=[],g={},b={},v=!1,y=0}function C(t,o){return"string"!=typeof t&&(t+=""),e.parser.decodeEntities&&(t=t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),o&&(t=t.replace(/"/g,"&quot;"))),t=t.replace(/&(?![a-zA-Z0-9#]{1,20};)/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),o&&(t=t.replace(/"/g,"&quot;")),t}function S(t,o){for(o=o.replace(/[\x00-\x20]+/g,"");;){const t=o.indexOf("\x3c!--");if(-1===t)break;const e=o.indexOf("--\x3e",t+4);if(-1===e)break;o=o.substring(0,t)+o.substring(e+3)}const n=o.match(/^([a-zA-Z][a-zA-Z0-9.\-+]*):/);if(!n)return!!o.match(/^[/\\]{2}/)&&!e.allowProtocolRelative;const r=n[1].toLowerCase();return Qn(e.allowedSchemesByTag,t)?-1===e.allowedSchemesByTag[t].indexOf(r):!e.allowedSchemes||-1===e.allowedSchemes.indexOf(r)}function E(t){if((t=t.replace(/^(\w+:)?\s*[\\/]\s*[\\/]/,"$1//")).startsWith("relative:"))throw new Error("relative: exploit attempt");let e="relative://relative-site";for(let t=0;t<100;t++)e+=`/${t}`;const o=new URL(t,e);return{isRelativeUrl:o&&"relative-site"===o.hostname&&"relative:"===o.protocol,url:o}}function _(t,e,o){return e?(t=t.split(/\s+/)).filter((function(t){return-1!==e.indexOf(t)||o.some((function(e){return e.test(t)}))})).join(" "):t}}const nr={decodeEntities:!0};or.defaults={allowedTags:["address","article","aside","footer","header","h1","h2","h3","h4","h5","h6","hgroup","main","nav","section","blockquote","dd","div","dl","dt","figcaption","figure","hr","li","main","ol","p","pre","ul","a","abbr","b","bdi","bdo","br","cite","code","data","dfn","em","i","kbd","mark","q","rb","rp","rt","rtc","ruby","s","samp","small","span","strong","sub","sup","time","u","var","wbr","caption","col","colgroup","table","tbody","td","tfoot","th","thead","tr"],disallowedTagsMode:"discard",allowedAttributes:{a:["href","name","target"],img:["src","srcset","alt","title","width","height","loading"]},selfClosing:["img","br","hr","area","base","basefont","input","link","meta"],allowedSchemes:["http","https","ftp","mailto","tel"],allowedSchemesByTag:{},allowedSchemesAppliedToAttributes:["href","src","cite"],allowProtocolRelative:!0,enforceHtmlBoundary:!1},or.simpleTransform=function(t,e,o){return o=void 0===o||o,e=e||{},function(n,r){let i;if(o)for(i in e)r[i]=e[i];else r=e;return{tagName:t,attribs:r}}};class rr{constructor(t,e){this.importedCourseId=null,this.finishedCallBack=t,this.config=e,this.configStore=d(ua),this.collectionsPageResponse=null,this.collections=null,this.ccOn=!1,this.ccPublished=!0,this.currentHostName=document.location.hostname,this.baseApiUrl=`https://${this.currentHostName}/api/v1`,this.config.courseId=parseInt(this.config.courseId),this.requestCollectionsPage()}requestCollectionsPage(){$t(`${this.baseApiUrl}/courses/${this.config.courseId}/pages/canvas-collections-configuration`).then((t=>{200===t.status?(this.collectionsPageResponse=t.body,this.parseCollectionsPage()):this.finishedCallBack("no collections config")}))}parseCollectionsPage(){if(!this.collectionsPageResponse.hasOwnProperty("body")){if(!this.collectionsPageResponse.hasOwnProperty("status"))throw new Error("No body in collectionsPageResponse");if("unauthorized"===this.collectionsPageResponse.status)return this.ccOn=!1,this.ccPublished=!1,this.finishedCallBack(),null}const t=this.collectionsPageResponse.body,e=(new DOMParser).parseFromString(t,"text/html");let o=e.querySelector("div.cc_json");if(!o)throw new Error("CollectionsDetails: parseCollectionsPage: no div.cc_json found in page");this.collections=JSON.parse(o.innerHTML),this.decodeCollections(),this.updateCollections();const n=e.querySelector("div.cc-card-images");this.checkForImportedCollections(n),this.ccPublished=this.collectionsPageResponse.published,this.finishedCallBack(),this.collections.hasOwnProperty("COLLECTIONS_ORDER")||(this.collections.COLLECTIONS_ORDER=Object.keys(this.collections.COLLECTIONS))}checkForImportedCollections(t){const e=parseInt(t.id.replace("cc-course-",""));this.config.courseId!==e&&(this.courseImages=t,this.importedCourseId=e,this.convertCourseImagesDiv())}convertCourseImagesDiv(){this.importedImages=[];this.courseImages.querySelectorAll("img.cc-moduleImage").forEach((t=>{let e=t.id.replace("cc-moduleImage-",""),o="<em>not found</em>";this.collections.MODULES[parseInt(e)]&&(o=this.collections.MODULES[parseInt(e)].name),this.importedImages.push({moduleId:e,moduleName:o,src:t.src,details:!1})}))}initialiseModules(t){this.importedModuleIds=Object.keys(this.collections.MODULES),this.currentModuleIds=t.map((t=>t.id)),this.importModuleDetails={},this.currentModuleDetails={},this.importedModuleIds.forEach((t=>{this.importModuleDetails[t]={matched:!1,importedModuleId:parseInt(t),currentModuleId:null}})),this.currentModuleIds.forEach((t=>{this.currentModuleDetails[t]={matched:!1,importedModuleId:null,currentModuleId:parseInt(t)}}))}matchModuleNames(t){const e={};t.forEach((t=>{e[t.id]=t})),this.importedModuleIds.forEach((t=>{let o=this.collections.MODULES[t].name;this.currentModuleIds.forEach((n=>{let r=e[n].name;o===r&&(this.importModuleDetails[t].matched=!0,this.importModuleDetails[t].currentModuleId=n,this.currentModuleDetails[n].matched=!0,this.currentModuleDetails[n].importedModuleId=t)}))})),this.numImportsMatched=Object.keys(this.importModuleDetails).reduce(((t,e)=>this.importModuleDetails[e].matched?t+1:t),0),this.numCurrentMatched=Object.keys(this.currentModuleDetails).reduce(((t,e)=>this.currentModuleDetails[e].matched?t+1:t),0)}migrateCollectionsConfiguration(){let t=this.collections.MODULES;this.importedModuleIds.forEach((e=>{if(this.importModuleDetails[e].matched){let o=this.importModuleDetails[e].currentModuleId;t[o]=JSON.parse(JSON.stringify(t[e])),t[o].id=o,delete t[e]}})),this.importedImages.forEach((e=>{if(this.importModuleDetails[e.moduleId].matched){let o=this.importModuleDetails[e.moduleId].currentModuleId,n=t[o];n&&n.hasOwnProperty("image")&&(n.image=e.src)}}))}getImportedModuleIds(){return this.importedModuleIds}getImportModuleDetails(){return this.importModuleDetails}getCurrentModuleDetails(){return this.currentModuleDetails}getImportedCourseId(){return this.importedCourseId}getNumCurrentModules(){return this.currentModuleIds.length}getNumCurrentMatched(){return this.numCurrentMatched}getNumCurrentNotMatched(){return this.getNumCurrentModules()-this.numCurrentMatched}getNumImportsMatched(){return this.numImportsMatched}getNumImportsNotMatched(){return this.getNumImportedModules()-this.numImportsMatched}getNumImportedModules(){return this.importedModuleIds.length}getCourseImages(){return this.courseImages}getImportedImages(){return this.importedImages}resetImport(){this.importedCourseId=null,this.importedModuleIds=[],this.importModuleDetails={},this.currentModuleIds=[],this.currentModuleDetails={},this.numImportsMatched=0,this.numCurrentMatched=0,this.courseImages=[],this.importedImages=[]}isImportedCollection(){return null!==this.importedCourseId}decodeCollections(){if(this.collections.hasOwnProperty("MODULES")){const t=this.collections.MODULES;for(let e in t){const o=t[e];o.description=this.decodeHTML(o.description),o.collection=this.decodeHTML(o.collection),o.name=this.decodeHTML(o.name),o.hasOwnProperty("iframe")&&""!==o.iframe&&(o.iframe=this.decodeHTML(o.iframe,!0)),o.hasOwnProperty("image")&&o.image.startsWith("/")&&(o.image=`https://${window.location.hostname}${o.image}`);for(let t in o.metadata)o.metadata[t]=this.decodeHTML(o.metadata[t])}}}updateCollections(){if(this.collections.hasOwnProperty("STATUS")&&(this.collections.VISIBILITY="no-one","on"===this.collections.STATUS&&(this.collections.VISIBILITY="all"),delete this.collections.STATUS),this.collections.hasOwnProperty("COLLECTIONS"))for(let t in this.collections.COLLECTIONS){const e=this.collections.COLLECTIONS[t];e.hasOwnProperty("unallocated")||(e.unallocated=!1),["includePage","outputPage"].forEach((t=>{e.hasOwnProperty(t)||(e[t]="")})),e.hasOwnProperty("dateHide")&&delete e.dateHide}if(this.collections.hasOwnProperty("MODULES")){const t=this.collections.MODULES;for(let e in t){const o=t[e];""===o.collection&&(o.collection=null),o.hasOwnProperty("configVisible")||(o.configVisible=!1),o.hasOwnProperty("actualNum")||(o.actualNum=""),o.hasOwnProperty("label")||(o.label=""),o.hasOwnProperty("banner")&&""!==o.banner||(o.banner="image"),o.hasOwnProperty("metadata")||(o.metadata={}),this.handleModuleDate(o),this.removeCanvasModuleDetails(o)}}}removeCanvasModuleDetails(t){const e=["position","unlock_at","require_sequential_progress","published","items_url","prerequisite_module_ids","completion_requirements"];for(let o of e)t.hasOwnProperty(o)&&delete t[o]}handleModuleDate(t){if(t.hasOwnProperty("dateHide")?["date","month"].forEach((e=>{t.dateHide.hasOwnProperty(e)&&(delete t.dateHide[e],t.dateHide.calendarDate=!1)})):t.dateHide={day:!1,week:!1,time:!1,calendarDate:!1},t.hasOwnProperty("date")){const e=["label","day","week","time","date","month","year"];for(let o=0;o<e.length;o++){const n=e[o];t.date.hasOwnProperty(n)||(t.date[n]="")}t.date.hasOwnProperty("to")||(t.date.to={day:"",week:"",time:""})}else t.date={label:"",day:"",week:"",time:"",to:{day:"",week:"",time:""},date:"",month:"",year:""}}decodeHTML(t,e=!1){let o=document.createElement("textarea");o.innerHTML=t;let n=o.value,r=tr.defaults.allowedTags,i={};return e&&(r=r.concat("iframe"),i={iframe:["src","width","height","frameborder","allowfullscreen"]}),n=tr(n,{allowedTags:r,allowedAttributes:i}),n}encodeHTML(t,e=!0){let o=document.createElement("textarea");return o.innerHTML=t,o.innerHTML}saveCollections(t,e,o,n){if(e&&o){let e=`/api/v1/courses/${this.config.courseId}/pages/canvas-collections-configuration`;let o={wiki_page:{title:"Canvas Collections Configuration",body:this.generateConfigPageContent(t)}},r="put";(async(t,e,o,n="POST")=>{try{const r=await fetch(t,{method:n,credentials:"include",headers:{"Content-Type":"application/json; charset=UTF-8",Accept:"application/json; charset=UTF-8","X-CSRF-Token":o},body:e});return 404===r.status||401===r.status?null:await r.json()}catch(t){console.error(`Could not post requested information: ${t}`)}})(e,JSON.stringify(o),this.config.csrfToken,r).then((t=>{n(null!==t)}))}}generateConfigPageContent(t){let e=sr;const o=`${window.location.hostname}/files/`,n=`${window.location.hostname}/courses/${this.config.courseId}/files/`;let r="";const i=t.MODULES;for(let t in i){const e=i[t];e.image&&(e.image.startsWith("/")&&(e.image=`https://${window.location.hostname}${e.image}`),(e.image.includes(n)||e.image.includes(o))&&(r+=`\n\t\t\t\t\t<img src="${e.image}" id="cc-moduleImage-${t}" class="cc-moduleImage" />\n\t\t\t\t\t`))}e=e.replace("{{COURSE_IMAGES}}",r);for(let t in i){const e=i[t];e.description=this.encodeHTML(e.description),e.collection=this.encodeHTML(e.collection),e.hasOwnProperty("iframe")&&""!==e.iframe&&(e.iframe=this.encodeHTML(e.iframe)),e.name=this.encodeHTML(e.name);for(let t in e.metadata)e.metadata[t]=this.encodeHTML(e.metadata[t])}let s=JSON.stringify(this.collections);s&&(e=e.replace("{{CONFIG}}",s));for(let t in i){const e=i[t];e.description=this.decodeHTML(e.description,!0),e.collection=this.decodeHTML(e.collection),e.name=this.decodeHTML(e.name),e.hasOwnProperty("iframe")&&""!==e.iframe&&(e.iframe=this.decodeHTML(e.iframe,!0));for(let t in e.metadata)e.metadata[t]=this.decodeHTML(e.metadata[t])}let a=(new Date).toLocaleString();return e=e.replace("{{VISIBLE_TEXT}}",`<p>saved at ${a}</p>`),e=e.replace("{{COURSE_ID}}",this.config.courseId),e}saveLastCollectionViewed(t){let e=window.location.hostname;localStorage.setItem(`cc-${e}-${this.config.courseId}-last-collection`,t)}getCurrentCollection(){const t=this.getUrlHashCollection();if(t)return t;let e=window.location.hostname;const o=localStorage.getItem(`cc-${e}-${this.config.courseId}-last-collection`);if(o&&this.collections.COLLECTIONS.hasOwnProperty(o))return o;const n=this.collections.DEFAULT_ACTIVE_COLLECTION;return n||""}getUrlHashCollection(){let t=new URL(window.location.href).hash;if(t){let e=t.match(/cc-collection-(\d+)/);if(e){const t=parseInt(e[1]);if(t>=0&&t<this.collections.COLLECTIONS_ORDER.length)return this.collections.COLLECTIONS_ORDER[t]}}return null}addCanvasModuleData(t,e){let o=this.collections.MODULES;const n=["published","name"];for(let e=0;e<t.length;e++){const r=t[e].id;o.hasOwnProperty(r)||(o[r]=this.addNewModule(t[e])),n.forEach((n=>{t[e].hasOwnProperty(n)&&o.hasOwnProperty(r)&&(o[r][n]=t[e][n])}))}const r=t.map((t=>t.id));let i=!1;for(const t in o)e?r.includes(parseInt(t))||(delete o[t],i=!0):r.includes(parseInt(t))&&(o[t].published=!0);i&&(this.configStore.needToSaveCollections=!0)}addNewModule(t){return{name:t.name,id:t.id,published:t.published,description:"",collection:"",label:"",autonum:!1,actualNum:"",configVisible:!1,num:"",metadata:{},date:{label:"",day:"",week:"",time:"",to:{day:"",week:"",time:""}},dateHide:{day:!1,week:!1,time:!1,month:!1,date:!1},banner:"image",image:"",imageSize:"",includePage:"",includePageAfter:!1,outputPage:"",iframe:"",bannerColour:"#ffffff",engage:!0,engageText:"Engage",fyi:!1,fyiText:""}}initialiseCollectionsConfig(){this.collections=ir,this.ccPublished=!1}}const ir={VISIBILITY:"teachers",DEFAULT_ACTIVE_COLLECTION:"",COLLECTIONS:{},COLLECTIONS_ORDER:[],MODULES:{}},sr='\n<div class="cc-config-explanation">\n<div style="float:left;padding:0.5em">\n  <img src="https://repository-images.githubusercontent.com/444951314/ca609cdf-d4ce-4294-aac1-27067209a10d"\n      alt="canvas-collections logo" width="120" height="68" />\n</div>\n<div style="padding:0.5em">\n  <h3>Canvas Collections Configuration page</h3>\n  <p>This page is used to configure <a href="https://djplaner.github.io/canvas-collections/">Canvas Collections</a>.  \n  Avoid direct modification to this page, instead use the Canvas Collections configuration interface.  </p>\n  {{VISIBLE_TEXT}}\n </div>\n </div>\n <p style="clear:both"></p>\n<div class="cc_json" style="display:none">\n {{CONFIG}}\n </div>\n<div class="cc-card-images" id="cc-course-{{COURSE_ID}}" style="display:none">\n {{COURSE_IMAGES}}\n</div>\n';function ar(t,e){let o={};t.forEach((t=>{const n=t.id,r=e[n];if(r)if(r.autonum){if(r.hasOwnProperty("label")&&""!==r.label){const t=r.collection,e=r.label;o.hasOwnProperty(t)||(o[t]={}),o[t].hasOwnProperty(e)||(o[t][e]=0),o[t][e]=++o[t][e],r.actualNum=o[t][e]}}else r.hasOwnProperty("num")&&(r.actualNum=r.num)}))}let lr={};const cr=(t,e=null)=>{document.execCommand(t,!1,e)},dr=(t,e)=>{if(e=e||(t&&t.tagName?[t.tagName]:[]),!t||!t.parentNode)return e;const o=(t=t.parentNode).tagName;return t.style&&t.getAttribute&&[t.style.textAlign||t.getAttribute("align"),t.style.color||"FONT"===o&&"forecolor",t.style.backgroundColor&&"backcolor"].filter((t=>t)).forEach((t=>e.push(t))),"DIV"===o?e:(e.push(o),dr(t,e).filter((t=>null!=t)))},ur=t=>{const e=document.getSelection();if(lr.range=null,e.rangeCount){let o,n=lr.range=e.getRangeAt(0),r=document.createRange();r.selectNodeContents(t),r.setEnd(n.startContainer,n.startOffset),o=(r+"").length,lr.metaRange={start:o,end:o+(n+"").length}}},hr=t=>{let e,o=lr.metaRange,n=lr.range,r=document.getSelection();if(n){if(o&&o.start!==o.end){let n,r=0,i=[t],s=!1,a=!1;for(e=document.createRange();!a&&(n=i.pop());)if(3===n.nodeType){let t=r+n.length;!s&&o.start>=r&&o.start<=t&&(e.setStart(n,o.start-r),s=!0),s&&o.end>=r&&o.end<=t&&(e.setEnd(n,o.end-r),a=!0),r=t}else{let t=n.childNodes,e=t.length;for(;e>0;)e-=1,i.push(t[e])}}r.removeAllRanges(),r.addRange(e||n)}},pr=(t,e)=>{Array.from(t).forEach((t=>{e.some((e=>e===t.tagName.toLowerCase()))&&(t.children.length&&pr(t.children,e),(t=>{const e=document.createDocumentFragment();for(;t.firstChild;){const o=t.removeChild(t.firstChild);e.appendChild(o)}t.parentNode.replaceChild(e,t)})(t))}))},fr=t=>Object.keys(t).map((e=>t[e])),mr=t=>(["style","script","applet","embed","noframes","noscript"].forEach((e=>{t=t.replace(new RegExp(`<${e}.*?${e}(.*?)>`,"gi"),"")})),t),gr=(t,e)=>t===e||!!t.parentElement&&gr(t.parentElement,e),br='<svg viewBox="0 0 72 72" width="17px" height="100%"><path d="M31.1 48.9l-6.7 6.7c-.8.8-1.6.9-2.1.9s-1.4-.1-2.1-.9L15 50.4c-1.1-1.1-1.1-3.1 0-4.2l6.1-6.1.2-.2 6.5-6.5c-1.2-.6-2.5-.9-3.8-.9-2.3 0-4.6.9-6.3 2.6L11 41.8c-3.5 3.5-3.5 9.2 0 12.7l5.2 5.2c1.7 1.7 4 2.6 6.3 2.6s4.6-.9 6.3-2.6l6.7-6.7c2.5-2.6 3.1-6.7 1.5-10l-5.9 5.9zM38.7 22.5l6.7-6.7c.8-.8 1.6-.9 2.1-.9s1.4.1 2.1.9l5.2 5.2c1.1 1.1 1.1 3.1 0 4.2l-6.1 6.1-.2.2L42 38c1.2.6 2.5.9 3.8.9 2.3 0 4.6-.9 6.3-2.6l6.7-6.7c3.5-3.5 3.5-9.2 0-12.7l-5.2-5.2c-1.7-1.7-4-2.6-6.3-2.6s-4.6.9-6.3 2.6l-6.7 6.7c-2.7 2.7-3.3 6.9-1.7 10.2l6.1-6.1c0 .1 0 .1 0 0z"></path><path d="M44.2 30.5c.2-.2.4-.6.4-.9 0-.3-.1-.6-.4-.9l-2.3-2.3c-.3-.2-.6-.4-.9-.4-.3 0-.6.1-.9.4L25.9 40.6c-.2.2-.4.6-.4.9 0 .3.1.6.4.9l2.3 2.3c.2.2.6.4.9.4.3 0 .6-.1.9-.4l14.2-14.2zM49.9 55.4h-8.5v-5h8.5v-8.9h5.2v8.9h8.5v5h-8.5v8.9h-5.2v-8.9z"></path></svg>';var vr={viewHtml:{icon:'<svg viewBox="0 0 72 72" width="17px" height="100%"><path fill="none" stroke="currentColor" stroke-width="8" stroke-miterlimit="10" d="M26.9 17.9L9 36.2 26.9 54M45 54l17.9-18.3L45 17.9"></path></svg>',title:"View HTML",result:function(){let t=d(this.references),e=d(this.state).actionObj,o=d(this.helper);o.showEditor=!o.showEditor,t.editor.style.display=o.showEditor?"block":"none",t.raw.style.display=o.showEditor?"none":"block",o.showEditor?t.editor.innerHTML=t.raw.value:t.raw.value=t.editor.innerHTML,setTimeout((()=>{Object.keys(e).forEach((t=>e[t].disabled=!o.showEditor)),e.viewHtml.disabled=!1,e.viewHtml.active=!o.showEditor,this.state.update((t=>(t.actionBtns=fr(e),t.actionObj=e,t)))}))}},undo:{icon:'<svg viewBox="0 0 72 72" width="17px" height="100%"><path d="M61.2 51.2c0-5.1-2.1-9.7-5.4-13.1-3.3-3.3-8-5.4-13.1-5.4H26.1v-12L10.8 36l15.3 15.3V39.1h16.7c3.3 0 6.4 1.3 8.5 3.5 2.2 2.2 3.5 5.2 3.5 8.5h6.4z"></path></svg>',title:"Undo",result:()=>cr("undo")},redo:{icon:'<svg viewBox="0 0 72 72" width="17px" height="100%"><path d="M10.8 51.2c0-5.1 2.1-9.7 5.4-13.1 3.3-3.3 8-5.4 13.1-5.4H46v-12L61.3 36 45.9 51.3V39.1H29.3c-3.3 0-6.4 1.3-8.5 3.5-2.2 2.2-3.5 5.2-3.5 8.5h-6.5z"></path></svg>',title:"Redo",result:()=>cr("redo")},b:{icon:"<b>B</b>",title:"Bold",result:()=>cr("bold")},i:{icon:"<i>I</i>",title:"Italic",result:()=>cr("italic")},u:{icon:"<u>U</u>",title:"Underline",result:()=>cr("underline")},strike:{icon:"<strike>S</strike>",title:"Strike-through",result:()=>cr("strikeThrough")},sup:{icon:"A<sup>2</sup>",title:"Superscript",result:()=>cr("superscript")},sub:{icon:"A<sub>2</sub>",title:"Subscript",result:()=>cr("subscript")},h1:{icon:"<b>H<sub>1</sub></b>",title:"Heading 1",result:()=>cr("formatBlock","<H1>")},h2:{icon:"<b>H<sub>2</sub></b>",title:"Heading 2",result:()=>cr("formatBlock","<H2>")},p:{icon:"&#182;",title:"Paragraph",result:()=>cr("formatBlock","<P>")},blockquote:{icon:"&#8220; &#8221;",title:"Quote",result:()=>cr("formatBlock","<BLOCKQUOTE>")},ol:{icon:'<svg viewBox="0 0 72 72" width="17px" height="100%"><path d="M27 14h36v8H27zM27 50h36v8H27zM27 32h36v8H27zM11.8 15.8V22h1.8v-7.8h-1.5l-2.1 1 .3 1.3zM12.1 38.5l.7-.6c1.1-1 2.1-2.1 2.1-3.4 0-1.4-1-2.4-2.7-2.4-1.1 0-2 .4-2.6.8l.5 1.3c.4-.3 1-.6 1.7-.6.9 0 1.3.5 1.3 1.1 0 .9-.9 1.8-2.6 3.3l-1 .9V40H15v-1.5h-2.9zM13.3 53.9c1-.4 1.4-1 1.4-1.8 0-1.1-.9-1.9-2.6-1.9-1 0-1.9.3-2.4.6l.4 1.3c.3-.2 1-.5 1.6-.5.8 0 1.2.3 1.2.8 0 .7-.8.9-1.4.9h-.7v1.3h.7c.8 0 1.6.3 1.6 1.1 0 .6-.5 1-1.4 1-.7 0-1.5-.3-1.8-.5l-.4 1.4c.5.3 1.3.6 2.3.6 2 0 3.2-1 3.2-2.4 0-1.1-.8-1.8-1.7-1.9z"></path></svg>',title:"Ordered List",result:()=>cr("insertOrderedList")},ul:{icon:'<svg viewBox="0 0 72 72" width="17px" height="100%"><path d="M27 14h36v8H27zM27 50h36v8H27zM9 50h9v8H9zM9 32h9v8H9zM9 14h9v8H9zM27 32h36v8H27z"></path></svg>',title:"Unordered List",result:()=>cr("insertUnorderedList")},hr:{icon:"&#8213;",title:"Horizontal Line",result:()=>cr("insertHorizontalRule")},left:{icon:'<svg viewBox="0 0 72 72" width="17px" height="100%"><path d="M9 14h54v8H9zM9 50h54v8H9zM9 32h36v8H9z"></path></svg>',title:"Justify left",result:()=>cr("justifyLeft")},right:{icon:'<svg viewBox="0 0 72 72" width="17px" height="100%"><path d="M9 14h54v8H9zM9 50h54v8H9zM27 32h36v8H27z"></path></svg>',title:"Justify right",result:()=>cr("justifyRight")},center:{icon:'<svg viewBox="0 0 72 72" width="17px" height="100%"><path d="M9 14h54v8H9zM9 50h54v8H9zM18 32h36v8H18z"></path></svg>',title:"Justify center",result:()=>cr("justifyCenter")},justify:{icon:'<svg viewBox="0 0 72 72" width="17px" height="100%"><path d="M9 14h54v8H9zM9 50h54v8H9zM9 32h54v8H9z"></path></svg>',title:"Justify full",result:()=>cr("justifyFull")},a:{icon:br,title:"Insert link",result:function(){const t=d(this.state).actionObj,e=d(this.references);if(t.a.active){const e=window.getSelection(),o=document.createRange();o.selectNodeContents(document.getSelection().focusNode),e.removeAllRanges(),e.addRange(o),cr("unlink"),t.a.title="Insert link",t.a.icon=br,this.state.update((e=>(e.actionBtn=fr(t),e.actionObj=t,e)))}else ur(e.editor),e.modal.$set({show:!0,event:"linkUrl",title:"Insert link",label:"Url"}),d(this.helper).link||(this.helper.update((t=>(t.link=!0,t))),e.modal.$on("linkUrl",(o=>{hr(e.editor),cr("createLink",o.detail),t.a.title="Unlink",t.a.icon='<svg viewBox="0 0 72 72" width="17px" height="100%"><path d="M30.9 49.1l-6.7 6.7c-.8.8-1.6.9-2.1.9s-1.4-.1-2.1-.9l-5.2-5.2c-1.1-1.1-1.1-3.1 0-4.2l6.1-6.1.2-.2 6.5-6.5c-1.2-.6-2.5-.9-3.8-.9-2.3 0-4.6.9-6.3 2.6L10.8 42c-3.5 3.5-3.5 9.2 0 12.7l5.2 5.2c1.7 1.7 4 2.6 6.3 2.6s4.6-.9 6.3-2.6l6.7-6.7C38 50.5 38.6 46.3 37 43l-6.1 6.1zM38.5 22.7l6.7-6.7c.8-.8 1.6-.9 2.1-.9s1.4.1 2.1.9l5.2 5.2c1.1 1.1 1.1 3.1 0 4.2l-6.1 6.1-.2.2-6.5 6.5c1.2.6 2.5.9 3.8.9 2.3 0 4.6-.9 6.3-2.6l6.7-6.7c3.5-3.5 3.5-9.2 0-12.7l-5.2-5.2c-1.7-1.7-4-2.6-6.3-2.6s-4.6.9-6.3 2.6l-6.7 6.7c-2.7 2.7-3.3 6.9-1.7 10.2l6.1-6.1z"></path><path d="M44.1 30.7c.2-.2.4-.6.4-.9 0-.3-.1-.6-.4-.9l-2.3-2.3c-.2-.2-.6-.4-.9-.4-.3 0-.6.1-.9.4L25.8 40.8c-.2.2-.4.6-.4.9 0 .3.1.6.4.9l2.3 2.3c.2.2.6.4.9.4.3 0 .6-.1.9-.4l14.2-14.2zM41.3 55.8v-5h22.2v5H41.3z"></path></svg>',this.state.update((e=>(e.actionBtn=fr(t),e.actionObj=t,e)))})))}},image:{icon:'<svg viewBox="0 0 72 72" width="17px" height="100%"><path d="M64 17v38H8V17h56m8-8H0v54h72V9z"></path><path d="M17.5 22C15 22 13 24 13 26.5s2 4.5 4.5 4.5 4.5-2 4.5-4.5-2-4.5-4.5-4.5zM16 50h27L29.5 32zM36 36.2l8.9-8.5L60.2 50H45.9S35.6 35.9 36 36.2z"></path></svg>',title:"Image",result:function(){const t=d(this.references);ur(t.editor),t.modal.$set({show:!0,event:"imageUrl",title:"Insert image",label:"Url"}),d(this.helper).image||(this.helper.update((t=>(t.image=!0,t))),t.modal.$on("imageUrl",(e=>{hr(t.editor),cr("insertImage",e.detail)})))}},forecolor:{icon:'<svg viewBox="0 0 72 72" width="17px" height="100%"><path d="M32 15h7.8L56 57.1h-7.9l-4-11.1H27.4l-4 11.1h-7.6L32 15zm-2.5 25.4h12.9L36 22.3h-.2l-6.3 18.1z"></path></svg>',title:"Text color",colorPicker:!0,result:function(){yr.call(this,"foreColor")}},backcolor:{icon:'<svg viewBox="0 0 72 72" width="17px" height="100%"><path d="M36.5 22.3l-6.3 18.1H43l-6.3-18.1z"></path><path d="M9 8.9v54.2h54.1V8.9H9zm39.9 48.2L45 46H28.2l-3.9 11.1h-7.6L32.8 15h7.8l16.2 42.1h-7.9z"></path></svg>',title:"Background color",colorPicker:!0,result:function(){yr.call(this,"backColor")}},removeFormat:{icon:'<svg viewBox="0 0 72 72" width="17px" height="100%"><path d="M58.2 54.6L52 48.5l3.6-3.6 6.1 6.1 6.4-6.4 3.8 3.8-6.4 6.4 6.1 6.1-3.6 3.6-6.1-6.1-6.4 6.4-3.7-3.8 6.4-6.4zM21.7 52.1H50V57H21.7zM18.8 15.2h34.1v6.4H39.5v24.2h-7.4V21.5H18.8v-6.3z"></path></svg>',title:"Remove format",result:function(){const t=d(this.references),e=window.getSelection();if(!e.toString().length){pr(t.editor.children,this.removeFormatTags);const o=document.createRange();o.selectNodeContents(t.editor),e.removeAllRanges(),e.addRange(o)}cr("removeFormat"),e.removeAllRanges()}}};const yr=function(t){const e=d(this.references);ur(e.editor),e.colorPicker.$set({show:!0,event:t}),d(this.helper)[t]||(this.helper.update((e=>(e[t]=!0,e))),e.colorPicker.$on(t,(o=>{let n=o.detail;if(n.modal){e.modal.$set({show:!0,event:`${t}Changed`,title:"Text color",label:"foreColor"===t?"Text color":"Background color"});const o=t;d(this.helper)[`${o}Modal`]||(d(this.helper)[`${o}Modal`]=!0,e.modal.$on(`${o}Changed`,(t=>{let n=t.detail;hr(e.editor),cr(o,n)})))}else hr(e.editor),cr(t,n.color)})))};function wr(e){let o,i,s,a,l,c,d,u,h,p,b,x,C,E,L,T,$,D,A,I,P,N=e[2]&&xr();return{c(){o=v("div"),i=w(),s=v("div"),a=v("div"),l=v("span"),c=y(e[3]),d=w(),u=v("form"),h=v("label"),p=v("input"),b=w(),x=v("span"),C=v("span"),E=y(e[4]),L=w(),N&&N.c(),T=w(),$=v("button"),$.textContent="Confirm",D=w(),A=v("button"),A.textContent="Cancel",S(o,"class","cl-editor-overlay svelte-42yfje"),S(l,"class","modal-title svelte-42yfje"),S(p,"name","text"),S(p,"class","svelte-42yfje"),S(C,"class","svelte-42yfje"),S(x,"class","input-info svelte-42yfje"),S(h,"class","modal-label svelte-42yfje"),M(h,"input-error",e[2]),S($,"class","modal-button modal-submit svelte-42yfje"),S($,"type","submit"),S(A,"class","modal-button modal-reset svelte-42yfje"),S(A,"type","reset"),S(a,"class","modal-box svelte-42yfje"),S(s,"class","cl-editor-modal svelte-42yfje")},m(n,g){var v,y;m(n,o,g),m(n,i,g),m(n,s,g),f(s,a),f(a,l),f(l,c),f(a,d),f(a,u),f(u,h),f(h,p),e[11](p),O(p,e[1]),f(h,b),f(h,x),f(x,C),f(C,E),f(x,L),N&&N.m(x,null),f(u,T),f(u,$),f(u,D),f(u,A),I||(P=[k(o,"click",e[8]),k(p,"keyup",e[9]),(y=e[6].call(null,p),y&&r(y.destroy)?y.destroy:t),k(p,"input",e[12]),k(A,"click",e[8]),k(u,"submit",(v=e[13],function(t){return t.preventDefault(),v.call(this,t)}))],I=!0)},p(t,e){8&e&&_(c,t[3]),2&e&&p.value!==t[1]&&O(p,t[1]),16&e&&_(E,t[4]),t[2]?N||(N=xr(),N.c(),N.m(x,null)):N&&(N.d(1),N=null),4&e&&M(h,"input-error",t[2])},d(t){t&&g(o),t&&g(i),t&&g(s),e[11](null),N&&N.d(),I=!1,n(P)}}}function xr(t){let e;return{c(){e=v("span"),e.textContent="Required",S(e,"class","msg-error svelte-42yfje")},m(t,o){m(t,e,o)},d(t){t&&g(e)}}}function kr(e){let o,n=e[0]&&wr(e);return{c(){n&&n.c(),o=x()},m(t,e){n&&n.m(t,e),m(t,o,e)},p(t,[e]){t[0]?n?n.p(t,e):(n=wr(t),n.c(),n.m(o.parentNode,o)):n&&(n.d(1),n=null)},i:t,o:t,d(t){n&&n.d(t),t&&g(o)}}}function Cr(t,e,o){let n=new U,{show:r=!1}=e,{text:i=""}=e,{event:s=""}=e,{title:a=""}=e,{label:l=""}=e,{error:c=!1}=e,d={};function u(){i?(n(s,i),h()):(o(2,c=!0),d.text.focus())}function h(){o(0,r=!1),o(1,i=""),o(2,c=!1)}return t.$$set=t=>{"show"in t&&o(0,r=t.show),"text"in t&&o(1,i=t.text),"event"in t&&o(10,s=t.event),"title"in t&&o(3,a=t.title),"label"in t&&o(4,l=t.label),"error"in t&&o(2,c=t.error)},t.$$.update=()=>{33&t.$$.dirty&&r&&setTimeout((()=>{d.text.focus()}))},[r,i,c,a,l,d,t=>{t.type=s.includes("Color")?"color":"text"},u,h,function(){o(2,c=!1)},s,function(t){z[t?"unshift":"push"]((()=>{d.text=t,o(5,d)}))},function(){i=this.value,o(1,i)},t=>u()]}class Sr extends ct{constructor(t){super(),lt(this,t,Cr,kr,i,{show:0,text:1,event:10,title:3,label:4,error:2})}get show(){return this.$$.ctx[0]}set show(t){this.$$set({show:t}),X()}get text(){return this.$$.ctx[1]}set text(t){this.$$set({text:t}),X()}get event(){return this.$$.ctx[10]}set event(t){this.$$set({event:t}),X()}get title(){return this.$$.ctx[3]}set title(t){this.$$set({title:t}),X()}get label(){return this.$$.ctx[4]}set label(t){this.$$set({label:t}),X()}get error(){return this.$$.ctx[2]}set error(t){this.$$set({error:t}),X()}}function Er(t,e,o){const n=t.slice();return n[8]=e[o],n}function _r(t){let e,o,n,r,i=(t[8].text||"")+"";function s(...e){return t[6](t[8],...e)}return{c(){e=v("button"),o=y(i),S(e,"type","button"),S(e,"class","color-picker-btn svelte-njq4pk"),L(e,"background-color",t[8].color)},m(t,i){m(t,e,i),f(e,o),n||(r=k(e,"click",s),n=!0)},p(n,r){t=n,2&r&&i!==(i=(t[8].text||"")+"")&&_(o,i),2&r&&L(e,"background-color",t[8].color)},d(t){t&&g(e),n=!1,r()}}}function Or(e){let o,n,r,i,s,a,l=e[1],c=[];for(let t=0;t<l.length;t+=1)c[t]=_r(Er(e,l,t));return{c(){o=v("div"),n=v("div"),r=w(),i=v("div");for(let t=0;t<c.length;t+=1)c[t].c();S(n,"class","color-picker-overlay svelte-njq4pk"),S(i,"class","color-picker-wrapper svelte-njq4pk"),L(o,"display",e[0]?"block":"none")},m(t,l){m(t,o,l),f(o,n),f(o,r),f(o,i);for(let t=0;t<c.length;t+=1)c[t].m(i,null);s||(a=k(n,"click",e[2]),s=!0)},p(t,[e]){if(10&e){let o;for(l=t[1],o=0;o<l.length;o+=1){const n=Er(t,l,o);c[o]?c[o].p(n,e):(c[o]=_r(n),c[o].c(),c[o].m(i,null))}for(;o<c.length;o+=1)c[o].d(1);c.length=l.length}1&e&&L(o,"display",t[0]?"block":"none")},i:t,o:t,d(t){t&&g(o),b(c,t),s=!1,a()}}}function Lr(t,e,o){const n=new U;let{show:r=!1}=e,{btns:i=[]}=e,{event:s=""}=e,{colors:a=[]}=e;function l(){o(0,r=!1)}function c(t){n(s,t),l()}return t.$$set=t=>{"show"in t&&o(0,r=t.show),"btns"in t&&o(1,i=t.btns),"event"in t&&o(4,s=t.event),"colors"in t&&o(5,a=t.colors)},t.$$.update=()=>{32&t.$$.dirty&&o(1,i=a.map((t=>({color:t}))).concat([{text:"#",modal:!0}]))},[r,i,l,c,s,a,(t,e)=>c(t)]}class Tr extends ct{constructor(t){super(),lt(this,t,Lr,Or,i,{show:0,btns:1,event:4,colors:5})}}const $r=function(t){const{subscribe:e,set:o,update:n}=ut({actionBtns:[],actionObj:{}});return{name:t,set:o,update:n,subscribe:e}};function Mr(t,e,o){const n=t.slice();return n[38]=e[o],n}function Dr(t){let e,o,n,r,i,s,a,l,c=t[38].icon+"";function d(...e){return t[24](t[38],...e)}return{c(){e=v("button"),o=new D(!1),n=w(),o.a=n,S(e,"type","button"),S(e,"class",r="cl-button "+(t[38].active?"active":"")+" svelte-1a534py"),S(e,"title",i=t[38].title),e.disabled=s=t[38].disabled},m(t,r){m(t,e,r),o.m(c,e),f(e,n),a||(l=k(e,"click",d),a=!0)},p(n,a){t=n,16&a[0]&&c!==(c=t[38].icon+"")&&o.p(c),16&a[0]&&r!==(r="cl-button "+(t[38].active?"active":"")+" svelte-1a534py")&&S(e,"class",r),16&a[0]&&i!==(i=t[38].title)&&S(e,"title",i),16&a[0]&&s!==(s=t[38].disabled)&&(e.disabled=s)},d(t){t&&g(e),a=!1,l()}}}function Ar(t){let e,o,r,i,s,a,l,c,d,u,h,p,y,x=t[4].actionBtns,C=[];for(let e=0;e<x.length;e+=1)C[e]=Dr(Mr(t,x,e));c=new Sr({props:{}}),t[31](c);let E={colors:t[2]};return u=new Tr({props:E}),t[32](u),{c(){e=v("div"),o=v("div");for(let t=0;t<C.length;t+=1)C[t].c();r=w(),i=v("div"),s=w(),a=v("textarea"),l=w(),rt(c.$$.fragment),d=w(),rt(u.$$.fragment),S(o,"class","cl-actionbar svelte-1a534py"),S(i,"id",t[1]),S(i,"class","cl-content svelte-1a534py"),L(i,"height",t[0]),S(i,"contenteditable","true"),S(a,"class","cl-textarea svelte-1a534py"),L(a,"max-height",t[0]),L(a,"min-height",t[0]),S(e,"class","cl svelte-1a534py")},m(n,g){m(n,e,g),f(e,o);for(let t=0;t<C.length;t+=1)C[t].m(o,null);f(e,r),f(e,i),t[25](i),f(e,s),f(e,a),t[30](a),f(e,l),it(c,e,null),f(e,d),it(u,e,null),t[33](e),h=!0,p||(y=[k(window,"click",t[23]),k(i,"input",t[26]),k(i,"mouseup",t[27]),k(i,"keyup",t[28]),k(i,"paste",t[29])],p=!0)},p(t,e){if(272&e[0]){let n;for(x=t[4].actionBtns,n=0;n<x.length;n+=1){const r=Mr(t,x,n);C[n]?C[n].p(r,e):(C[n]=Dr(r),C[n].c(),C[n].m(o,null))}for(;n<C.length;n+=1)C[n].d(1);C.length=x.length}(!h||2&e[0])&&S(i,"id",t[1]),(!h||1&e[0])&&L(i,"height",t[0]),(!h||1&e[0])&&L(a,"max-height",t[0]),(!h||1&e[0])&&L(a,"min-height",t[0]);c.$set({});const n={};4&e[0]&&(n.colors=t[2]),u.$set(n)},i(t){h||(et(c.$$.fragment,t),et(u.$$.fragment,t),h=!0)},o(t){ot(c.$$.fragment,t),ot(u.$$.fragment,t),h=!1},d(o){o&&g(e),b(C,o),t[25](null),t[30](null),t[31](null),st(c),t[32](null),st(u),t[33](null),p=!1,n(y)}}}const Ir=[];function Pr(t,e,o){let n,r,i,s=new U,{actions:a=[]}=e,{height:l="300px"}=e,{html:c=""}=e,{contentId:d=""}=e,{colors:h=["#ffffff","#000000","#eeece1","#1f497d","#4f81bd","#c0504d","#9bbb59","#8064a2","#4bacc6","#f79646","#ffff00","#f2f2f2","#7f7f7f","#ddd9c3","#c6d9f0","#dbe5f1","#f2dcdb","#ebf1dd","#e5e0ec","#dbeef3","#fdeada","#fff2ca","#d8d8d8","#595959","#c4bd97","#8db3e2","#b8cce4","#e5b9b7","#d7e3bc","#ccc1d9","#b7dde8","#fbd5b5","#ffe694","#bfbfbf","#3f3f3f","#938953","#548dd4","#95b3d7","#d99694","#c3d69b","#b2a2c7","#b7dde8","#fac08f","#f2c314","#a5a5a5","#262626","#494429","#17365d","#366092","#953734","#76923c","#5f497a","#92cddc","#e36c09","#c09100","#7f7f7f","#0c0c0c","#1d1b10","#0f243e","#244061","#632423","#4f6128","#3f3151","#31859b","#974806","#7f6000"]}=e,{removeFormatTags:f=["h1","h2","blockquote"]}=e,m=ut({foreColor:!1,backColor:!1,foreColorModal:!1,backColorModal:!1,image:!1,link:!1,showEditor:!0,blurActive:!1});u(t,m,(t=>o(34,r=t))),Ir.push({});let g="editor_"+Ir.length,b=$r(g);u(t,b,(t=>o(4,i=t)));let v=ut({});u(t,v,(t=>o(3,n=t))),p(b,i.actionObj=((t,e=[])=>{if(e&&e.length){const o={};return e.forEach((e=>{"string"==typeof e?o[e]=Object.assign({},t[e]):t[e.name]?o[e.name]=Object.assign(t[e.name],e):o[e.name]=Object.assign({},e)})),o}return t})(vr,a),i);let y={exec:E,getHtml:_,getText:O,setHtml:L,saveRange:T,restoreRange:$,helper:m,references:v,state:b,removeFormatTags:f};function w(t){n.editor.focus(),T(n.editor),$(n.editor),t.result.call(y),x()}function x(t){const e=t?[]:dr(document.getSelection().focusNode);Object.keys(i.actionObj).forEach((t=>p(b,i.actionObj[t].active=!1,i))),e.forEach((t=>(i.actionObj[t.toLowerCase()]||{}).active=!0)),p(b,i.actionBtns=fr(i.actionObj),i),b.set(i)}function k(t){t.preventDefault(),E("insertHTML",t.clipboardData.getData("text/html")?(t=>{const e=t.match(/<!--StartFragment-->(.*?)<!--EndFragment-->/);let o=e&&e[1]||t;return o=o.replace(/\r?\n|\r/g," ").replace(/<!--(.*?)-->/g,"").replace(new RegExp("<(/)*(meta|link|span|\\?xml:|st1:|o:|font|w:sdt)(.*?)>","gi"),"").replace(/<!\[if !supportLists\]>(.*?)<!\[endif\]>/gi,"").replace(/style="[^"]*"/gi,"").replace(/style='[^']*'/gi,"").replace(/&nbsp;/gi," ").replace(/>(\s+)</g,"><").replace(/class="[^"]*"/gi,"").replace(/class='[^']*'/gi,"").replace(/<[^/].*?>/g,(t=>t.split(/[ >]/g)[0]+">")).trim(),o=mr(o),o})(t.clipboardData.getData("text/html")):t.clipboardData.getData("text"))}function C(t){s("change",t)}function S(t){!gr(t.target,n.editorWrapper)&&r.blurActive&&s("blur",t),p(m,r.blurActive=!0,r)}function E(t,e){cr(t,e)}function _(t){return t?mr(n.editor.innerHTML):n.editor.innerHTML}function O(){return n.editor.innerText}function L(t,e){const o=e?mr(t):t||"";p(v,n.editor.innerHTML=o,n),p(v,n.raw.value=o,n)}function T(){ur(n.editor)}function $(){hr(n.editor)}!function(t,e){P().$$.context.set(t,e)}(g,y),N((()=>{p(b,i.actionBtns=fr(i.actionObj),i),L(c)}));const M=n;return t.$$set=t=>{"actions"in t&&o(13,a=t.actions),"height"in t&&o(0,l=t.height),"html"in t&&o(14,c=t.html),"contentId"in t&&o(1,d=t.contentId),"colors"in t&&o(2,h=t.colors),"removeFormatTags"in t&&o(15,f=t.removeFormatTags)},[l,d,h,n,i,m,b,v,w,x,k,C,S,a,c,f,E,_,O,L,T,$,M,t=>S(t),(t,e)=>w(t),function(t){z[t?"unshift":"push"]((()=>{n.editor=t,v.set(n)}))},t=>C(t.target.innerHTML),()=>x(),()=>x(),t=>k(t),function(t){z[t?"unshift":"push"]((()=>{n.raw=t,v.set(n)}))},function(t){z[t?"unshift":"push"]((()=>{n.modal=t,v.set(n)}))},function(t){z[t?"unshift":"push"]((()=>{n.colorPicker=t,v.set(n)}))},function(t){z[t?"unshift":"push"]((()=>{n.editorWrapper=t,v.set(n)}))}]}class Nr extends ct{constructor(t){super(),lt(this,t,Pr,Ar,i,{actions:13,height:0,html:14,contentId:1,colors:2,removeFormatTags:15,exec:16,getHtml:17,getText:18,setHtml:19,saveRange:20,restoreRange:21,refs:22},null,[-1,-1])}get actions(){return this.$$.ctx[13]}set actions(t){this.$$set({actions:t}),X()}get height(){return this.$$.ctx[0]}set height(t){this.$$set({height:t}),X()}get html(){return this.$$.ctx[14]}set html(t){this.$$set({html:t}),X()}get contentId(){return this.$$.ctx[1]}set contentId(t){this.$$set({contentId:t}),X()}get colors(){return this.$$.ctx[2]}set colors(t){this.$$set({colors:t}),X()}get removeFormatTags(){return this.$$.ctx[15]}set removeFormatTags(t){this.$$set({removeFormatTags:t}),X()}get exec(){return this.$$.ctx[16]}get getHtml(){return this.$$.ctx[17]}get getText(){return this.$$.ctx[18]}get setHtml(){return this.$$.ctx[19]}get saveRange(){return this.$$.ctx[20]}get restoreRange(){return this.$$.ctx[21]}get refs(){return this.$$.ctx[22]}}function Ur(t,e,o){const n=t.slice();return n[34]=e[o],n}function Hr(t){let e,o,n,r=t[34]+"";return{c(){e=v("option"),o=y(r),e.__value=n=t[34],e.value=e.__value},m(t,n){m(t,e,n),f(e,o)},p(t,i){4&i[0]&&r!==(r=t[34]+"")&&_(o,r),4&i[0]&&n!==(n=t[34])&&(e.__value=n,e.value=e.__value)},d(t){t&&g(e)}}}function qr(t){let e,o,n,r;return{c(){e=v("input"),S(e,"type","text"),S(e,"id",o="cc-module-config-"+t[0]+"-fyiText"),L(e,"width","10rem"),e.disabled=!0,S(e,"class","svelte-1dijw55")},m(o,i){m(o,e,i),O(e,t[2].MODULES[t[0]].fyiText),n||(r=k(e,"input",t[15]),n=!0)},p(t,n){5&n[0]&&o!==(o="cc-module-config-"+t[0]+"-fyiText")&&S(e,"id",o),5&n[0]&&e.value!==t[2].MODULES[t[0]].fyiText&&O(e,t[2].MODULES[t[0]].fyiText)},d(t){t&&g(e),n=!1,r()}}}function zr(t){let e,o,r,i;return{c(){e=v("input"),S(e,"type","text"),S(e,"id",o="cc-module-config-"+t[0]+"-fyiText"),L(e,"width","10rem"),S(e,"class","svelte-1dijw55")},m(o,n){m(o,e,n),O(e,t[2].MODULES[t[0]].fyiText),r||(i=[k(e,"input",t[12]),k(e,"click",t[13]),k(e,"keydown",C(t[14]))],r=!0)},p(t,n){5&n[0]&&o!==(o="cc-module-config-"+t[0]+"-fyiText")&&S(e,"id",o),5&n[0]&&e.value!==t[2].MODULES[t[0]].fyiText&&O(e,t[2].MODULES[t[0]].fyiText)},d(t){t&&g(e),r=!1,n(i)}}}function Rr(t){let e,o,r,i;return{c(){e=v("input"),S(e,"type","text"),S(e,"id",o="cc-module-config-"+t[0]+"-num"),L(e,"width","3rem")},m(o,n){m(o,e,n),O(e,t[2].MODULES[t[0]].actualNum),r||(i=[k(e,"input",t[22]),k(e,"click",t[23]),k(e,"keydown",C(t[24]))],r=!0)},p(t,n){5&n[0]&&o!==(o="cc-module-config-"+t[0]+"-num")&&S(e,"id",o),5&n[0]&&e.value!==t[2].MODULES[t[0]].actualNum&&O(e,t[2].MODULES[t[0]].actualNum)},d(t){t&&g(e),r=!1,n(i)}}}function jr(t){let e,o,r,i;return{c(){e=v("input"),S(e,"type","text"),S(e,"id",o="cc-module-config-"+t[0]+"-num"),L(e,"width","3rem"),e.disabled=!0},m(o,n){m(o,e,n),O(e,t[2].MODULES[t[0]].actualNum),r||(i=[k(e,"input",t[19]),k(e,"click",t[20]),k(e,"keydown",C(t[21]))],r=!0)},p(t,n){5&n[0]&&o!==(o="cc-module-config-"+t[0]+"-num")&&S(e,"id",o),5&n[0]&&e.value!==t[2].MODULES[t[0]].actualNum&&O(e,t[2].MODULES[t[0]].actualNum)},d(t){t&&g(e),r=!1,n(i)}}}function Br(t){let e,o,r,i;return{c(){e=v("input"),S(e,"type","text"),S(e,"class","cc-module-config-engageText svelte-1dijw55"),S(e,"id",o="cc-module-config-"+t[0]+"-engageText"),L(e,"width","10rem")},m(o,n){m(o,e,n),O(e,t[2].MODULES[t[0]].engageText),r||(i=[k(e,"input",t[29]),k(e,"click",t[30]),k(e,"keydown",C(t[31]))],r=!0)},p(t,n){5&n[0]&&o!==(o="cc-module-config-"+t[0]+"-engageText")&&S(e,"id",o),5&n[0]&&e.value!==t[2].MODULES[t[0]].engageText&&O(e,t[2].MODULES[t[0]].engageText)},d(t){t&&g(e),r=!1,n(i)}}}function Fr(t){let e,o,n,r;return{c(){e=v("input"),S(e,"type","text"),S(e,"id",o="cc-module-config-"+t[0]+"-engageText"),L(e,"width","10rem"),e.disabled=!0,S(e,"class","svelte-1dijw55")},m(o,i){m(o,e,i),O(e,t[2].MODULES[t[0]].engageText),n||(r=k(e,"input",t[28]),n=!0)},p(t,n){5&n[0]&&o!==(o="cc-module-config-"+t[0]+"-engageText")&&S(e,"id",o),5&n[0]&&e.value!==t[2].MODULES[t[0]].engageText&&O(e,t[2].MODULES[t[0]].engageText)},d(t){t&&g(e),n=!1,r()}}}function Vr(t){let e,o,r,i,s,a,l,c,d,u,h,p,x,_,$,M,D,A,I,P,N,U,H,q,z,R,j,B,F,V,W,G,K,X,J,Y,Q,Z,tt,nt,at,lt,ct,dt,ut,ht,pt,ft,mt,gt,bt,vt,yt,wt,xt,kt,Ct,St,Et,_t,Ot,Lt,Tt,$t,Mt,Dt,At,It,Pt,Nt,Ut,Ht,qt,zt,Rt,jt,Bt,Ft,Vt,Wt,Gt,Kt,Xt,Jt,Yt,Qt,Zt,te,ee,oe,ne,re,ie,se,ae,le,ce,de,ue,he,pe,fe,me,ge,be,ve,ye,we,xe,ke,Ce,Se,Ee,_e,Oe,Le=t[6].configCollection.tooltip+"",Te=t[6].configFYI.tooltip+"",$e=t[6].configLabel.tooltip+"",Me=t[6].configAutoNum.tooltip+"",De=t[6].configEngage.tooltip+"",Ae=t[6].configDescription.tooltip+"",Ie=t[2].COLLECTIONS_ORDER,Pe=[];for(let e=0;e<Ie.length;e+=1)Pe[e]=Hr(Ur(t,Ie,e));function Ne(t,e){return t[2].MODULES[t[0]].fyi?zr:qr}let Ue=Ne(t),He=Ue(t);function qe(t,e){return t[2].MODULES[t[0]].autonum?jr:Rr}let ze=qe(t),Re=ze(t);function je(t,e){return t[2].MODULES[t[0]].engage?Br:Fr}let Be=je(t),Fe=Be(t);return Se=new Nr({props:{html:t[3],contentId:"cc-module-config-"+t[0]+"-description-editor"}}),Se.$on("change",t[32]),{c(){e=v("div"),o=v("div"),r=v("div"),i=v("span"),s=v("label"),a=y("Collection"),c=w(),d=v("sl-tooltip"),u=v("div"),h=w(),p=v("a"),x=v("i"),_=w(),$=v("span"),M=v("select"),D=v("option"),D.textContent="Unallocated";for(let t=0;t<Pe.length;t+=1)Pe[t].c();P=w(),N=v("div"),U=v("div"),H=v("span"),q=v("label"),z=y("FYI"),j=w(),B=v("sl-tooltip"),F=v("div"),V=w(),W=v("a"),G=v("i"),K=w(),X=v("span"),J=v("input"),Q=w(),Z=v("span"),He.c(),tt=w(),nt=v("div"),at=v("div"),lt=v("div"),ct=v("span"),dt=v("label"),ut=y("Label"),pt=w(),ft=v("sl-tooltip"),mt=v("div"),gt=w(),bt=v("a"),vt=v("i"),yt=w(),wt=v("span"),xt=v("input"),Ct=w(),St=v("div"),Et=v("div"),_t=v("span"),Ot=v("label"),Lt=y("Number"),$t=w(),Mt=v("sl-tooltip"),Dt=v("div"),At=w(),It=v("a"),Pt=v("i"),Nt=w(),Ut=v("span"),Ht=y("auto:\r\n          "),qt=v("input"),jt=w(),Bt=v("span"),Re.c(),Ft=w(),Vt=v("div"),Wt=v("div"),Gt=v("div"),Kt=v("span"),Xt=v("label"),Jt=y("Engage"),Qt=w(),Zt=v("sl-tooltip"),te=v("div"),ee=w(),oe=v("a"),ne=v("i"),re=w(),ie=v("span"),se=v("input"),le=w(),ce=v("span"),Fe.c(),de=w(),ue=v("div"),he=w(),pe=v("div"),fe=v("label"),me=y("Description"),be=w(),ve=v("sl-tooltip"),ye=v("div"),we=w(),xe=v("a"),ke=v("i"),Ce=w(),rt(Se.$$.fragment),S(s,"for",l="cc-module-config-"+t[0]+"-collection"),S(u,"slot","content"),S(x,"class","icon-question cc-module-icon"),S(p,"id","cc-about-basic-module-collection"),S(p,"href",t[6].configCollection.url),S(p,"target","_blank"),S(p,"rel","noreferrer"),S(p,"class","cc-module-link"),E(d,"class","svelte-1dijw55"),S(i,"class","cc-module-label svelte-1dijw55"),D.__value="",D.value=D.__value,S(M,"id",A="cc-module-config-"+t[0]+"-collection"),S(M,"class","svelte-1dijw55"),S($,"class","cc-module-input svelte-1dijw55"),S(r,"class","cc-module-form svelte-1dijw55"),S(o,"class","cc-module-col svelte-1dijw55"),S(q,"for",R="cc-module-config-"+t[0]+"-fyi"),S(F,"slot","content"),S(G,"class","icon-question cc-module-icon"),S(W,"target","_blank"),S(W,"rel","noreferrer"),S(W,"href",t[6].configFYI.url),S(W,"class","cc-module-link"),E(B,"class","svelte-1dijw55"),S(J,"type","checkbox"),S(J,"id",Y="cc-module-config-"+t[0]+"-fyi"),L(J,"position","relative"),L(J,"top","-0.25rem"),S(X,"class","cc-config-autonum svelte-1dijw55"),S(H,"class","cc-module-label svelte-1dijw55"),S(Z,"class","cc-module-input svelte-1dijw55"),S(U,"class","cc-module-form svelte-1dijw55"),S(N,"class","cc-module-col svelte-1dijw55"),S(e,"class","cc-module-row svelte-1dijw55"),S(dt,"for",ht="cc-module-config-"+t[0]+"-label"),S(mt,"slot","content"),S(vt,"class","icon-question cc-module-icon"),S(bt,"target","_blank"),S(bt,"href",t[6].configLabel.url),S(bt,"rel","noreferrer"),E(ft,"id","cc-about-module-label"),E(ft,"class","svelte-1dijw55"),S(ct,"class","cc-module-label svelte-1dijw55"),S(xt,"type","text"),S(xt,"id",kt="cc-module-config-"+t[0]+"-label"),L(xt,"width","10rem"),S(wt,"class","cc-module-form-input"),S(lt,"class","cc-module-form svelte-1dijw55"),S(at,"class","cc-module-col svelte-1dijw55"),S(Ot,"for",Tt="cc-module-config-"+t[0]+"-num"),S(Dt,"slot","content"),S(Pt,"class","icon-question cc-module-icon"),S(It,"target","_blank"),S(It,"href",t[6].configAutoNum.url),S(It,"rel","noreferrer"),E(Mt,"class","svelte-1dijw55"),S(qt,"type","checkbox"),qt.checked=zt=t[2].MODULES[t[0]].autonum,S(qt,"id",Rt="cc-module-config-"+t[0]+"-autonum"),L(qt,"position","relative"),L(qt,"top","-0.25rem"),S(Ut,"class","cc-config-autonum svelte-1dijw55"),S(_t,"class","cc-module-label svelte-1dijw55"),S(Bt,"class","cc-module-form-input"),S(Et,"class","cc-module-form svelte-1dijw55"),S(St,"class","cc-module-col svelte-1dijw55"),S(nt,"class","cc-module-row svelte-1dijw55"),S(Xt,"for",Yt="cc-module-config-"+t[0]+"-engage"),S(te,"slot","content"),S(ne,"class","icon-question cc-module-icon"),S(oe,"target","_blank"),S(oe,"rel","noreferrer"),S(oe,"href",t[6].configEngage.url),S(oe,"class","cc-module-link"),E(Zt,"class","svelte-1dijw55"),S(se,"type","checkbox"),S(se,"id",ae="cc-module-config-"+t[0]+"-engage"),L(se,"position","relative"),L(se,"top","-0.25rem"),S(ie,"class","cc-config-autonum svelte-1dijw55"),S(Kt,"class","cc-module-label svelte-1dijw55"),S(ce,"class","cc-module-input svelte-1dijw55"),S(Gt,"class","cc-module-form svelte-1dijw55"),S(Wt,"class","cc-module-col svelte-1dijw55"),S(ue,"class","cc-module-col svelte-1dijw55"),S(Vt,"class","cc-module-row svelte-1dijw55"),S(fe,"for",ge="cc-module-config-"+t[0]+"-description"),S(ye,"slot","content"),S(ke,"class","icon-question cc-module-icon"),S(xe,"id","cc-about-module-description"),S(xe,"href",t[6].configDescription.url),S(xe,"target","_blank"),S(xe,"rel","noreferrer"),S(xe,"class","cc-module-link"),E(ve,"class","svelte-1dijw55"),S(pe,"class","cc-module-config-description svelte-1dijw55")},m(n,l){m(n,e,l),f(e,o),f(o,r),f(r,i),f(i,s),f(s,a),f(i,c),f(i,d),f(d,u),u.innerHTML=Le,f(d,h),f(d,p),f(p,x),f(r,_),f(r,$),f($,M),f(M,D);for(let t=0;t<Pe.length;t+=1)Pe[t].m(M,null);T(M,t[2].MODULES[t[0]].collection),f(e,P),f(e,N),f(N,U),f(U,H),f(H,q),f(q,z),f(H,j),f(H,B),f(B,F),F.innerHTML=Te,f(B,V),f(B,W),f(W,G),f(H,K),f(H,X),f(X,J),J.checked=t[2].MODULES[t[0]].fyi,f(U,Q),f(U,Z),He.m(Z,null),m(n,tt,l),m(n,nt,l),f(nt,at),f(at,lt),f(lt,ct),f(ct,dt),f(dt,ut),f(ct,pt),f(ct,ft),f(ft,mt),mt.innerHTML=$e,f(ft,gt),f(ft,bt),f(bt,vt),f(lt,yt),f(lt,wt),f(wt,xt),O(xt,t[2].MODULES[t[0]].label),f(nt,Ct),f(nt,St),f(St,Et),f(Et,_t),f(_t,Ot),f(Ot,Lt),f(_t,$t),f(_t,Mt),f(Mt,Dt),Dt.innerHTML=Me,f(Mt,At),f(Mt,It),f(It,Pt),f(_t,Nt),f(_t,Ut),f(Ut,Ht),f(Ut,qt),f(Et,jt),f(Et,Bt),Re.m(Bt,null),m(n,Ft,l),m(n,Vt,l),f(Vt,Wt),f(Wt,Gt),f(Gt,Kt),f(Kt,Xt),f(Xt,Jt),f(Kt,Qt),f(Kt,Zt),f(Zt,te),te.innerHTML=De,f(Zt,ee),f(Zt,oe),f(oe,ne),f(Kt,re),f(Kt,ie),f(ie,se),se.checked=t[2].MODULES[t[0]].engage,f(Gt,le),f(Gt,ce),Fe.m(ce,null),f(Vt,de),f(Vt,ue),m(n,he,l),m(n,pe,l),f(pe,fe),f(fe,me),f(pe,be),f(pe,ve),f(ve,ye),ye.innerHTML=Ae,f(ve,we),f(ve,xe),f(xe,ke),m(n,Ce,l),it(Se,n,l),Ee=!0,_e||(Oe=[k(M,"change",t[10]),k(J,"keydown",C(t[9])),k(J,"change",t[11]),k(xt,"input",t[16]),k(xt,"click",t[17]),k(xt,"keydown",C(t[18])),k(qt,"change",C(t[4])),k(qt,"keydown",C(t[8])),k(se,"keydown",C(t[7])),k(se,"change",t[25]),k(se,"click",t[26]),k(se,"keydown",t[27])],_e=!0)},p(t,e){if((!Ee||5&e[0]&&l!==(l="cc-module-config-"+t[0]+"-collection"))&&S(s,"for",l),4&e[0]){let o;for(Ie=t[2].COLLECTIONS_ORDER,o=0;o<Ie.length;o+=1){const n=Ur(t,Ie,o);Pe[o]?Pe[o].p(n,e):(Pe[o]=Hr(n),Pe[o].c(),Pe[o].m(M,null))}for(;o<Pe.length;o+=1)Pe[o].d(1);Pe.length=Ie.length}(!Ee||5&e[0]&&A!==(A="cc-module-config-"+t[0]+"-collection"))&&S(M,"id",A),(!Ee||5&e[0]&&I!==(I=t[2].MODULES[t[0]].collection))&&T(M,t[2].MODULES[t[0]].collection),(!Ee||5&e[0]&&R!==(R="cc-module-config-"+t[0]+"-fyi"))&&S(q,"for",R),(!Ee||5&e[0]&&Y!==(Y="cc-module-config-"+t[0]+"-fyi"))&&S(J,"id",Y),5&e[0]&&(J.checked=t[2].MODULES[t[0]].fyi),Ue===(Ue=Ne(t))&&He?He.p(t,e):(He.d(1),He=Ue(t),He&&(He.c(),He.m(Z,null))),(!Ee||5&e[0]&&ht!==(ht="cc-module-config-"+t[0]+"-label"))&&S(dt,"for",ht),(!Ee||5&e[0]&&kt!==(kt="cc-module-config-"+t[0]+"-label"))&&S(xt,"id",kt),5&e[0]&&xt.value!==t[2].MODULES[t[0]].label&&O(xt,t[2].MODULES[t[0]].label),(!Ee||5&e[0]&&Tt!==(Tt="cc-module-config-"+t[0]+"-num"))&&S(Ot,"for",Tt),(!Ee||5&e[0]&&zt!==(zt=t[2].MODULES[t[0]].autonum))&&(qt.checked=zt),(!Ee||5&e[0]&&Rt!==(Rt="cc-module-config-"+t[0]+"-autonum"))&&S(qt,"id",Rt),ze===(ze=qe(t))&&Re?Re.p(t,e):(Re.d(1),Re=ze(t),Re&&(Re.c(),Re.m(Bt,null))),(!Ee||5&e[0]&&Yt!==(Yt="cc-module-config-"+t[0]+"-engage"))&&S(Xt,"for",Yt),(!Ee||5&e[0]&&ae!==(ae="cc-module-config-"+t[0]+"-engage"))&&S(se,"id",ae),5&e[0]&&(se.checked=t[2].MODULES[t[0]].engage),Be===(Be=je(t))&&Fe?Fe.p(t,e):(Fe.d(1),Fe=Be(t),Fe&&(Fe.c(),Fe.m(ce,null))),(!Ee||5&e[0]&&ge!==(ge="cc-module-config-"+t[0]+"-description"))&&S(fe,"for",ge);const o={};1&e[0]&&(o.contentId="cc-module-config-"+t[0]+"-description-editor"),Se.$set(o)},i(t){Ee||(et(Se.$$.fragment,t),Ee=!0)},o(t){ot(Se.$$.fragment,t),Ee=!1},d(t){t&&g(e),b(Pe,t),He.d(),t&&g(tt),t&&g(nt),Re.d(),t&&g(Ft),t&&g(Vt),Fe.d(),t&&g(he),t&&g(pe),t&&g(Ce),st(Se,t),_e=!1,n(Oe)}}}function Wr(t,e,o){let n,r,i;u(t,ua,(t=>o(1,n=t))),u(t,ca,(t=>o(2,r=t))),u(t,da,(t=>o(33,i=t)));let{moduleId:s}=e,a=r.MODULES[s].description;function l(t){p(ca,r.MODULES[s].collection=t.target.value,r),ar(i,r.MODULES),p(ua,n.currentCollectionChanged=!0,n),p(ua,n.needToSaveCollections=!0,n)}N((()=>{const t=`cc-module-config-${s}-description-editor`;let e=document.getElementById(t);if(e){e.onkeydown=t=>{t.stopPropagation()};let t=e.nextElementSibling;t&&(t.onkeydown=t=>{t.stopPropagation()})}}));const c={configCollection:{tooltip:"To which of the available collections does this module belong?",url:"https://djplaner.github.io/canvas-collections/getting-started/configure/modules/#module-properties"},configFYI:{tooltip:'<p>Represent the module as a "for your information" (fyi) object. Only display collection related information.\n\t\tDisplay no information about the corresponding module. Always display the object, even when the module is unpublished.</p>\n\t\t<p>Optionally, provide some text to add to the representation.</p>',url:"https://djplaner.github.io/canvas-collections/reference/objects/overview/#fyi-objects"},configDescription:{tooltip:"Describe why, what or how the module relates to the students' learning",url:"https://djplaner.github.io/canvas-collections/reference/objects/overview/#description"},configEngage:{tooltip:'For cards representations, specify <ol> <li> if there will be an "engage" button; and, </li> <li> what the button text will be. </li> </ol>',url:"https://djplaner.github.io/canvas-collections/reference/objects/overview/#enage-button"},configLabel:{tooltip:"Describe the type of object the module represents (e.g. lecture, theme etc.)",url:"https://djplaner.github.io/canvas-collections/reference/objects/overview/#enage-button"},configAutoNum:{tooltip:"If and how a label specific number will be calculated for the module \n\t\t(e.g. <em>Lecture 1</em> or <em>Workshop 5</em>)<p>Auto number or specify a value.</p>",url:"https://djplaner.github.io/canvas-collections/reference/objects/overview/#labels-and-numbers"}};return t.$$set=t=>{"moduleId"in t&&o(0,s=t.moduleId)},[s,n,r,a,function(){p(ca,r.MODULES[s].autonum=!r.MODULES[s].autonum,r),ar(i,r.MODULES),p(ua,n.needToSaveCollections=!0,n)},l,c,function(e){H.call(this,t,e)},function(e){H.call(this,t,e)},function(e){H.call(this,t,e)},t=>l(t),function(){r.MODULES[s].fyi=this.checked,ca.set(r)},function(){r.MODULES[s].fyiText=this.value,ca.set(r)},()=>p(ua,n.needToSaveCollections=!0,n),()=>p(ua,n.needToSaveCollections=!0,n),function(){r.MODULES[s].fyiText=this.value,ca.set(r)},function(){r.MODULES[s].label=this.value,ca.set(r)},()=>p(ua,n.needToSaveCollections=!0,n),()=>p(ua,n.needToSaveCollections=!0,n),function(){r.MODULES[s].actualNum=this.value,ca.set(r)},()=>p(ua,n.needToSaveCollections=!0,n),()=>p(ua,n.needToSaveCollections=!0,n),function(){r.MODULES[s].actualNum=this.value,ca.set(r)},()=>p(ua,n.needToSaveCollections=!0,n),()=>p(ua,n.needToSaveCollections=!0,n),function(){r.MODULES[s].engage=this.checked,ca.set(r)},()=>p(ua,n.needToSaveCollections=!0,n),()=>p(ua,n.needToSaveCollections=!0,n),function(){r.MODULES[s].engageText=this.value,ca.set(r)},function(){r.MODULES[s].engageText=this.value,ca.set(r)},()=>p(ua,n.needToSaveCollections=!0,n),()=>p(ua,n.needToSaveCollections=!0,n),t=>{p(ca,r.MODULES[s].description=t.detail,r),p(ua,n.needToSaveCollections=!0,n)}]}class Gr extends ct{constructor(t){super(),lt(this,t,Wr,Vr,i,{moduleId:0},null,[-1,-1])}}function Kr(t,e="primary",o=null){const n=document.createElement("sl-alert");n.setAttribute("variant",e),n.setAttribute("closable","true"),o&&n.setAttribute("duration",o),n.innerHTML=`\n    <sl-icon slot="icon" name="${{primary:"info-circle",success:"check2-circle",neutral:"gear",warning:"exclamation-triangle",danger:"exclamation-octagon"}[e]}"></sl-icon>\n    ${t}\n    `,n.toast()}const Xr=t=>new Promise(((e,o)=>{const n=document.createElement("div");n.innerHTML=`\n      <sl-dialog label="Confirm">\n        ${t}\n        <sl-button slot="footer">Cancel</sl-button>\n        <sl-button slot="footer" type="primary">OK</sl-button>\n      </sl-dialog>    \n    `;const r=n.querySelector("sl-dialog"),i=n.querySelector("sl-button"),s=i.nextElementSibling;document.body.appendChild(r),customElements.whenDefined("sl-dialog").then((()=>{r.show(),s.addEventListener("click",(()=>{e(!0),r.hide()})),i.addEventListener("click",(()=>{e(!1),r.hide()})),r.addEventListener("sl-hide",(()=>{e(!1)}))}))}));function Jr(t,e,o){const n=t.slice();return n[15]=e[o],n}function Yr(e){let o,n,r=e[15]+"";return{c(){o=v("option"),n=y(r),o.__value=e[15],o.value=o.__value},m(t,e){m(t,o,e),f(o,n)},p:t,d(t){t&&g(o)}}}function Qr(e){let o,r,i,s,a,l,c,d,u,h,p,x,_,$,M,D,A,I,P,N,U,H,q,z,R,j,B,F,W,G,K,X,J,Y,Q,Z,tt,et,ot,nt,rt,it,st,at,lt,ct,dt,ut,ht,pt,ft,mt,gt,bt,vt,yt,wt,xt,kt,Ct,St,Et,_t,Ot,Lt,Tt,$t,Mt,Dt,At,It,Pt,Nt,Ut,Ht,qt,zt,Rt,jt,Bt,Ft,Vt,Wt,Gt,Kt,Xt,Jt,Yt,Qt,Zt,te,ee,oe,ne=e[7].moduleBanner.tooltip+"",re=e[7].moduleImageScale.tooltip+"",ie=e[7].moduleImageUrl.tooltip+"",se=e[7].moduleIframe.tooltip+"",ae=e[7].moduleColour.tooltip+"",le=e[3],ce=[];for(let t=0;t<le.length;t+=1)ce[t]=Yr(Jr(e,le,t));return{c(){o=v("sl-tooltip"),r=v("div"),i=w(),s=v("a"),a=v("i"),l=w(),c=v("strong"),c.textContent="Banner",d=w(),u=v("sl-tab-group"),h=v("sl-tab"),p=y("Image"),$=w(),M=v("sl-tab"),D=y("Iframe"),P=w(),N=v("sl-tab"),U=y("Colour"),z=w(),R=v("sl-tab-panel"),j=v("div"),B=v("span"),F=v("label"),W=y("Image scale"),K=w(),X=v("sl-tooltip"),J=v("div"),Y=w(),Q=v("a"),Z=v("i"),tt=w(),et=v("span"),ot=v("select");for(let t=0;t<ce.length;t+=1)ce[t].c();rt=w(),it=v("div"),st=v("span"),at=v("label"),lt=y("Image URL"),dt=w(),ut=v("sl-tooltip"),ht=v("div"),pt=w(),ft=v("a"),mt=v("i"),gt=w(),bt=v("span"),vt=v("input"),xt=w(),kt=v("sl-tab-panel"),Ct=v("div"),St=v("label"),Et=y("iframe:"),Ot=w(),Lt=v("sl-tooltip"),Tt=v("div"),$t=w(),Mt=v("a"),Dt=v("i"),At=w(),It=v("textarea"),Ht=w(),qt=v("sl-tab-panel"),zt=v("div"),Rt=v("label"),jt=y("Colour:"),Ft=w(),Vt=v("sl-tooltip"),Wt=v("div"),Gt=w(),Kt=v("a"),Xt=v("i"),Jt=w(),Yt=v("sl-color-picker"),S(r,"slot","content"),S(a,"class","icon-question cc-module-icon"),S(s,"target","_blank"),S(s,"href",e[7].moduleBanner.href),S(s,"rel","noreferrer"),E(o,"id","cc-about-module-banner"),E(o,"class","svelte-m81ypa"),E(h,"class","cc-banner-tab"),E(h,"name","image"),E(h,"slot","nav"),E(h,"active",x="image"===e[2].MODULES[e[0]].banner),E(h,"panel",_="cc-module-config-"+e[0]+"-image"),E(M,"class","cc-banner-tab"),E(M,"name","iframe"),E(M,"slot","nav"),E(M,"active",A="iframe"===e[2].MODULES[e[0]].banner),E(M,"panel",I="cc-module-config-"+e[0]+"-iframe"),E(N,"class","cc-banner-tab"),E(N,"name","colour"),E(N,"slot","nav"),E(N,"active",H="colour"===e[2].MODULES[e[0]].banner),E(N,"panel",q="cc-module-config-"+e[0]+"-colour"),S(F,"for",G="cc-collection-representation-"+e[0]+"-imageSize"),S(J,"slot","content"),S(Z,"class","icon-question cc-module-icon"),S(Q,"target","_blank"),S(Q,"href",e[7].moduleImageScale.href),S(Q,"rel","noreferrer"),E(X,"class","svelte-m81ypa"),S(B,"class","cc-module-label svelte-m81ypa"),S(ot,"id",nt="cc-module-config-"+e[0]+"-imageSize"),void 0===e[2].MODULES[e[0]].imageSize&&V((()=>e[9].call(ot))),S(et,"class","cc-module-input svelte-m81ypa"),S(j,"class","cc-module-form svelte-m81ypa"),S(at,"for",ct="cc-module-config-collection-representation-"+e[0]+"-image"),S(ht,"slot","content"),S(mt,"class","icon-question cc-module-icon"),S(ft,"target","_blank"),S(ft,"href",e[7].moduleImageUrl.href),S(ft,"rel","noreferrer"),E(ut,"id","cc-about-module-image-url"),E(ut,"class","svelte-m81ypa"),S(st,"class","cc-module-label svelte-m81ypa"),S(vt,"class","cc-module-config-input svelte-m81ypa"),S(vt,"type","text"),S(vt,"id",yt="cc-module-config-"+e[0]+"-image"),S(bt,"class","cc-module-input svelte-m81ypa"),S(it,"class","cc-module-form svelte-m81ypa"),E(R,"name",wt="cc-module-config-"+e[0]+"-image"),S(St,"for",_t="cc-collection-representation-"+e[0]+"-iframe"),L(St,"padding-top","0.8rem"),S(Tt,"slot","content"),S(Dt,"class","icon-question cc-module-icon"),S(Mt,"target","_blank"),S(Mt,"href",e[7].moduleIframe.href),S(Mt,"rel","noreferrer"),E(Lt,"id","cc-about-module-iframe"),E(Lt,"class","svelte-m81ypa"),S(It,"class","cc-module-iframe svelte-m81ypa"),S(It,"cols","60"),S(It,"rows","10"),S(It,"id",Pt="cc-module-config-"+e[0]+"-iframe"),It.value=Nt=e[2].MODULES[e[0]].iframe,S(Ct,"class","cc-module-config-collection-representation"),E(kt,"name",Ut="cc-module-config-"+e[0]+"-iframe"),S(Rt,"for",Bt="cc-collection-representation-"+e[0]+"-color"),L(Rt,"padding-top","0.8rem"),S(Wt,"slot","content"),S(Xt,"class","icon-question cc-module-icon"),S(Kt,"target","_blank"),S(Kt,"href",e[7].moduleColour.href),S(Kt,"rel","noreferrer"),E(Vt,"id","cc-about-module-color"),E(Vt,"class","svelte-m81ypa"),E(Yt,"id",Qt="cc-module-config-"+e[0]+"-color"),E(Yt,"value",Zt=e[2].MODULES[e[0]].bannerColour),E(Yt,"label","Select a color"),S(zt,"class","cc-module-config-collection-representation"),E(qt,"name",te="cc-module-config-"+e[0]+"-colour")},m(t,n){m(t,o,n),f(o,r),r.innerHTML=ne,f(o,i),f(o,s),f(s,a),m(t,l,n),m(t,c,n),m(t,d,n),m(t,u,n),f(u,h),f(h,p),f(u,$),f(u,M),f(M,D),f(u,P),f(u,N),f(N,U),f(u,z),f(u,R),f(R,j),f(j,B),f(B,F),f(F,W),f(B,K),f(B,X),f(X,J),J.innerHTML=re,f(X,Y),f(X,Q),f(Q,Z),f(j,tt),f(j,et),f(et,ot);for(let t=0;t<ce.length;t+=1)ce[t].m(ot,null);T(ot,e[2].MODULES[e[0]].imageSize),f(R,rt),f(R,it),f(it,st),f(st,at),f(at,lt),f(st,dt),f(st,ut),f(ut,ht),ht.innerHTML=ie,f(ut,pt),f(ut,ft),f(ft,mt),f(it,gt),f(it,bt),f(bt,vt),O(vt,e[2].MODULES[e[0]].image),f(u,xt),f(u,kt),f(kt,Ct),f(Ct,St),f(St,Et),f(Ct,Ot),f(Ct,Lt),f(Lt,Tt),Tt.innerHTML=se,f(Lt,$t),f(Lt,Mt),f(Mt,Dt),f(Ct,At),f(Ct,It),f(u,Ht),f(u,qt),f(qt,zt),f(zt,Rt),f(Rt,jt),f(zt,Ft),f(zt,Vt),f(Vt,Wt),Wt.innerHTML=ae,f(Vt,Gt),f(Vt,Kt),f(Kt,Xt),f(zt,Jt),f(zt,Yt),ee||(oe=[k(ot,"change",e[9]),k(vt,"click",e[10]),k(vt,"keydown",C(e[11])),k(vt,"input",e[12]),k(It,"keydown",C(e[8])),k(It,"focusout",e[6]),k(Yt,"sl-change",e[4]),k(u,"sl-tab-show",e[13])],ee=!0)},p(t,[e]){if(13&e&&x!==(x="image"===t[2].MODULES[t[0]].banner)&&E(h,"active",x),9&e&&_!==(_="cc-module-config-"+t[0]+"-image")&&E(h,"panel",_),13&e&&A!==(A="iframe"===t[2].MODULES[t[0]].banner)&&E(M,"active",A),9&e&&I!==(I="cc-module-config-"+t[0]+"-iframe")&&E(M,"panel",I),13&e&&H!==(H="colour"===t[2].MODULES[t[0]].banner)&&E(N,"active",H),9&e&&q!==(q="cc-module-config-"+t[0]+"-colour")&&E(N,"panel",q),9&e&&G!==(G="cc-collection-representation-"+t[0]+"-imageSize")&&S(F,"for",G),8&e){let o;for(le=t[3],o=0;o<le.length;o+=1){const n=Jr(t,le,o);ce[o]?ce[o].p(n,e):(ce[o]=Yr(n),ce[o].c(),ce[o].m(ot,null))}for(;o<ce.length;o+=1)ce[o].d(1);ce.length=le.length}9&e&&nt!==(nt="cc-module-config-"+t[0]+"-imageSize")&&S(ot,"id",nt),13&e&&T(ot,t[2].MODULES[t[0]].imageSize),9&e&&ct!==(ct="cc-module-config-collection-representation-"+t[0]+"-image")&&S(at,"for",ct),9&e&&yt!==(yt="cc-module-config-"+t[0]+"-image")&&S(vt,"id",yt),13&e&&vt.value!==t[2].MODULES[t[0]].image&&O(vt,t[2].MODULES[t[0]].image),9&e&&wt!==(wt="cc-module-config-"+t[0]+"-image")&&E(R,"name",wt),9&e&&_t!==(_t="cc-collection-representation-"+t[0]+"-iframe")&&S(St,"for",_t),9&e&&Pt!==(Pt="cc-module-config-"+t[0]+"-iframe")&&S(It,"id",Pt),13&e&&Nt!==(Nt=t[2].MODULES[t[0]].iframe)&&(It.value=Nt),9&e&&Ut!==(Ut="cc-module-config-"+t[0]+"-iframe")&&E(kt,"name",Ut),9&e&&Bt!==(Bt="cc-collection-representation-"+t[0]+"-color")&&S(Rt,"for",Bt),9&e&&Qt!==(Qt="cc-module-config-"+t[0]+"-color")&&E(Yt,"id",Qt),13&e&&Zt!==(Zt=t[2].MODULES[t[0]].bannerColour)&&E(Yt,"value",Zt),9&e&&te!==(te="cc-module-config-"+t[0]+"-colour")&&E(qt,"name",te)},i:t,o:t,d(t){t&&g(o),t&&g(l),t&&g(c),t&&g(d),t&&g(u),b(ce,t),ee=!1,n(oe)}}}function Zr(t,e=!0){let o=document.createElement("textarea");return o.innerHTML=t,o.innerHTML}function ti(t,e,o){let n,r;u(t,ua,(t=>o(1,n=t))),u(t,ca,(t=>o(2,r=t)));let{moduleId:i}=e;const s=["none","contain","cover","fill","scale-down","auto"];function a(t){const e=t.detail.name.split("-").pop();p(ca,r.MODULES[i].banner=e,r),p(ua,n.needToSaveCollections=!0,n)}const l={moduleBanner:{tooltip:"<p>Choose one of three possible banner types (for Card representations) and configure it. Options are:</p> \n\t\t<ol>\n\t\t  <li> <strong>Image</strong> - a banner image</li>\n\t\t  <li> <strong>Colour</strong> - a solid colour</li>\n\t\t  <li> <strong>Iframe</strong> - HTML embed code (e.g. YouTube video)</li>\n\t\t  </ol>",href:"https://djplaner.github.io/canvas-collections/reference/objects/overview/#dates"},moduleImageScale:{tooltip:"Specify how the image will be scaled to fit the available space.",href:"https://djplaner.github.io/canvas-collections/reference/objects/overview/#image-scale"},moduleImageUrl:{tooltip:"Provide the URL for an image to associate with this module.",href:"https://djplaner.github.io/canvas-collections/reference/objects/overview/#image-url"},moduleIframe:{tooltip:"<p>Provide an iframe (embed HTML) to place in a card's banner section.</p> <p>Notes:</p>\n        <ol>\n            <li> <em>height</em> and <em>width</em> will be removed to fit the available space</li>\n            <li> any change will only take effect after you click outside the iframe box</li>\n            </ol>\n        ",href:"https://djplaner.github.io/canvas-collections/reference/objects/overview/#iframe"},moduleColour:{tooltip:"<p>Choose a background colour for the card's banner section by clicking on the circle.",href:"https://djplaner.github.io/canvas-collections/reference/objects/overview/#iframe"}};return t.$$set=t=>{"moduleId"in t&&o(0,i=t.moduleId)},[i,n,r,s,function(){const t=document.getElementById(`cc-module-config-${i}-color`);p(ca,r.MODULES[i].bannerColour=t.value,r),p(ua,n.needToSaveCollections=!0,n)},a,function(){const t=document.getElementById(`cc-module-config-${i}-iframe`),e=t.value;let o=function(t){let e={};return e={iframe:["src","frameborder","allowfullscreen","allow","title"]},tr(t,{allowedTags:["iframe"],allowedAttributes:e})}(e);if(o=o.replace(/.*(<iframe.*<\/iframe>).*/,"$1"),e!==o){let s=Zr(e),a=Zr(o);Xr(`The iframe value you provided appears to contain unnecessary, perhaps forbidden characters.  (NOTE: width and height will be removed to ensure the iframe is responsive.)\n\nYou provided\n    <p style="font-family: monospace; font-size:small">${s}</p>\nonly the following is allowed\n    <p style="font-family: monospace; font-size:small">${a}</p>\n    \nDo you wish to proceed?`).then((e=>{e&&(t.value=o,p(ca,r.MODULES[i].iframe=o,r),p(ua,n.needToSaveCollections=!0,n))}))}else p(ca,r.MODULES[i].iframe=o,r),p(ua,n.needToSaveCollections=!0,n)},l,function(e){H.call(this,t,e)},function(){r.MODULES[i].imageSize=$(this),ca.set(r),o(3,s)},()=>p(ua,n.needToSaveCollections=!0,n),()=>p(ua,n.needToSaveCollections=!0,n),function(){r.MODULES[i].image=this.value,ca.set(r),o(3,s)},t=>a(t)]}class ei extends ct{constructor(t){super(),lt(this,t,ti,Qr,i,{moduleId:0})}}function oi(t,e,o){const n=t.slice();return n[22]=e[o][0],n[23]=e[o][1],n}function ni(t){let e,o,r,i,s,a,l,c,d,u,h,p,b,y,x,E,_;function O(){return t[15](t[22])}function L(){return t[16](t[22])}function T(){return t[17](t[22])}function $(){return t[18](t[22])}return{c(){e=v("tr"),o=v("td"),r=v("input"),a=w(),l=v("td"),c=v("input"),h=w(),p=v("td"),b=v("i"),x=w(),S(r,"type","text"),S(r,"id",i="cc-module-config-"+t[0]+"-metadata-"+t[22]+"-name"),r.value=s=t[22],S(r,"pattern",String.raw`[^<>"]`),S(o,"class","svelte-fm8enw"),S(c,"type","text"),S(c,"id",d="cc-module-config-"+t[0]+"-metadata-"+t[22]+"-value"),c.value=u=t[2].MODULES[t[0]].metadata[t[22]],S(l,"class","svelte-fm8enw"),S(b,"class","icon-trash cc-delete-metadata svelte-fm8enw"),S(b,"id",y="cc-module-config-"+t[0]+"-metadata-"+t[22]+"-delete"),S(p,"class","svelte-fm8enw")},m(n,i){m(n,e,i),f(e,o),f(o,r),f(e,a),f(e,l),f(l,c),f(e,h),f(e,p),f(p,b),f(e,x),E||(_=[k(r,"keydown",C(t[10])),k(r,"focusout",O),k(c,"focusout",L),k(c,"keydown",C(t[9])),k(b,"click",T),k(b,"keydown",$)],E=!0)},p(e,o){t=e,5&o&&i!==(i="cc-module-config-"+t[0]+"-metadata-"+t[22]+"-name")&&S(r,"id",i),5&o&&s!==(s=t[22])&&r.value!==s&&(r.value=s),5&o&&d!==(d="cc-module-config-"+t[0]+"-metadata-"+t[22]+"-value")&&S(c,"id",d),5&o&&u!==(u=t[2].MODULES[t[0]].metadata[t[22]])&&c.value!==u&&(c.value=u),5&o&&y!==(y="cc-module-config-"+t[0]+"-metadata-"+t[22]+"-delete")&&S(b,"id",y)},d(t){t&&g(e),E=!1,n(_)}}}function ri(e){let o,r,i,s,a,l,c,d,u,h,p,x,_,O,L,T,$,M,D,A,I,P,N,U,H,q,z,R,j,B,F,V,W,G,K,X,J,Y=e[8].name.tooltip+"",Q=e[8].value.tooltip+"",Z=Object.entries(e[2].MODULES[e[0]].metadata),tt=[];for(let t=0;t<Z.length;t+=1)tt[t]=ni(oi(e,Z,t));return{c(){o=v("div"),r=v("table"),i=v("thead"),s=v("tr"),a=v("th"),l=y("Name\r\n          "),c=v("sl-tooltip"),d=v("div"),u=w(),h=v("i"),p=w(),x=v("th"),_=y("Value\r\n          "),O=v("sl-tooltip"),L=v("div"),T=w(),$=v("i"),M=w(),D=v("th"),D.textContent="Action",A=w(),I=v("tbody"),P=v("tr"),N=v("td"),U=v("input"),q=w(),z=v("td"),R=v("input"),B=w(),F=v("td"),V=v("button"),W=y("Add"),K=w();for(let t=0;t<tt.length;t+=1)tt[t].c();S(d,"slot","content"),S(h,"class","icon-question cc-module-icon"),E(c,"class","svelte-fm8enw"),S(a,"class","svelte-fm8enw"),S(L,"slot","content"),S($,"class","icon-question cc-module-icon"),E(O,"class","svelte-fm8enw"),S(x,"class","svelte-fm8enw"),S(D,"class","svelte-fm8enw"),S(U,"type","text"),S(U,"id",H="cc-module-config-"+e[0]+"-metadata-add-name"),S(N,"class","svelte-fm8enw"),S(R,"type","text"),S(R,"id",j="cc-module-config-"+e[0]+"-metadata-add-value"),S(z,"class","svelte-fm8enw"),V.disabled=e[1],S(V,"id",G="cc-module-config-"+e[0]+"-metadata-add"),S(V,"class","cc-module-config-metadata-add"),S(F,"class","svelte-fm8enw"),S(o,"class","cc-module-config-additional-metadata border border-trbl svelte-fm8enw")},m(t,n){m(t,o,n),f(o,r),f(r,i),f(i,s),f(s,a),f(a,l),f(a,c),f(c,d),d.innerHTML=Y,f(c,u),f(c,h),f(s,p),f(s,x),f(x,_),f(x,O),f(O,L),L.innerHTML=Q,f(O,T),f(O,$),f(s,M),f(s,D),f(r,A),f(r,I),f(I,P),f(P,N),f(N,U),f(P,q),f(P,z),f(z,R),f(P,B),f(P,F),f(F,V),f(V,W),f(I,K);for(let t=0;t<tt.length;t+=1)tt[t].m(I,null);X||(J=[k(U,"keydown",C(e[12])),k(U,"keyup",e[13]),k(R,"keydown",C(e[11])),k(R,"keyup",e[14]),k(V,"click",e[3])],X=!0)},p(t,[e]){if(1&e&&H!==(H="cc-module-config-"+t[0]+"-metadata-add-name")&&S(U,"id",H),1&e&&j!==(j="cc-module-config-"+t[0]+"-metadata-add-value")&&S(R,"id",j),2&e&&(V.disabled=t[1]),1&e&&G!==(G="cc-module-config-"+t[0]+"-metadata-add")&&S(V,"id",G),229&e){let o;for(Z=Object.entries(t[2].MODULES[t[0]].metadata),o=0;o<Z.length;o+=1){const n=oi(t,Z,o);tt[o]?tt[o].p(n,e):(tt[o]=ni(n),tt[o].c(),tt[o].m(I,null))}for(;o<tt.length;o+=1)tt[o].d(1);tt.length=Z.length}},i:t,o:t,d(t){t&&g(o),b(tt,t),X=!1,n(J)}}}function ii(t,e,o){let n,r;u(t,ua,(t=>o(19,n=t))),u(t,ca,(t=>o(2,r=t)));let{moduleId:i}=e,s=!0;function a(t,e,o,s){if(r.MODULES[i].metadata.hasOwnProperty([t.value]))return Kr(`<p>There already exists a metadata entry with the name</p>\n        <p style="margin-left: 1em">${t.value}</p>`,"danger"),void(t.value="");p(ca,r.MODULES[i].metadata[o]=s,r),p(ua,n.needToSaveCollections=!0,n),t.value="",e.value="",t.focus()}function l(t,e=!0){let o=tr.defaults.allowedTags,n={};return o=o.concat("iframe"),n={iframe:["src","width","height","frameborder","allowfullscreen"]},e||(o=[],n={}),tr(t,{allowedTags:o,allowedAttributes:n})}function c(){const t=document.getElementById(`cc-module-config-${i}-metadata-add-name`),e=document.getElementById(`cc-module-config-${i}-metadata-add-value`);return""===t.value||""===e.value}function d(t){const e=r.MODULES[i].name;Xr(`<p>About to delete the metadata entry<br /> \n        <span style="margin:1em">${t}</span><br /> for the module <br />\n    <span style="margin:1em">${e}<span></p>\n      <p>Proceed?</p>`).then((e=>{if(e){let e=r.MODULES[i].metadata;delete e[t],p(ca,r.MODULES[i].metadata=e,r),p(ua,n.needToSaveCollections=!0,n)}}))}function h(t){const e=document.getElementById(`cc-module-config-${i}-metadata-${t}-name`);if(t===e.value)return;if(r.MODULES[i].metadata.hasOwnProperty([e.value]))return Kr(`<p>There already exists a metadata entry with the name</p>\n    <div style="margin-left: 1em">${e.value}</div>\n    <p>Please choose a different name.</p>`,"danger"),void(e.value=t);let o=r.MODULES[i].metadata;o[e.value]=o[t],delete o[t],p(ca,r.MODULES[i].metadata=o,r),p(ua,n.needToSaveCollections=!0,n)}function f(t){const e=document.getElementById(`cc-module-config-${i}-metadata-${t}-value`),o=l(e.value);o!==e.value?Xr(`<p>The new metadata item value</p> \n    <div style="margin-left:1em"><xmp>${e.value}</xmp></div>\n<p>has been sanitised to</p>\n    <div style="margin-left:1em"><xmp>${o}</xmp></div>\n    <p>Do you want to use the sanitised value?</p>`).then((e=>{e&&(p(ca,r.MODULES[i].metadata[t]=o,r),p(ua,n.needToSaveCollections=!0,n))})):(p(ca,r.MODULES[i].metadata[t]=o,r),p(ua,n.needToSaveCollections=!0,n))}const m={name:{tooltip:"<p>Each metadata value is given a name. Only certain characters can be used. No HTML tags allowed.<p>\n\t\t\t<p>Changes will only take effect when you move focus away from the name field.</p>"},value:{tooltip:"<p>The value for the metadata element. HTML tags are allowed.</p>"}};return t.$$set=t=>{"moduleId"in t&&o(0,i=t.moduleId)},[i,s,r,function(t){const e=document.getElementById(`cc-module-config-${i}-metadata-add-name`),o=document.getElementById(`cc-module-config-${i}-metadata-add-value`),n=l(e.value,!1),r=l(o.value);n!==e.value||""===n?Xr(`<p>The new metadata name <xmp>${e.value}</xmp> has been sanitised \n          (removing/replacing forbidden characters) to <xmp>${n}</xmp> \n(If the sanitised name is empty, the metadata item will not be added.)</p>\n <p>Are you happy to use the sanitised name?</p>`).then((t=>{t&&""!==n&&a(e,o,n,r)})):a(e,o,n,r)},c,d,h,f,m,function(e){H.call(this,t,e)},function(e){H.call(this,t,e)},function(e){H.call(this,t,e)},function(e){H.call(this,t,e)},()=>o(1,s=c()),()=>o(1,s=c()),t=>h(t),t=>f(t),t=>d(t),t=>d(t)]}class si extends ct{constructor(t){super(),lt(this,t,ii,ri,i,{moduleId:0})}}function ai(t){let e,o,n;return{c(){e=v("div"),o=y("No collection allocated"),S(e,"class","cc-module-no-collection svelte-1s0ihn8"),S(e,"id",n="cc-module-config-no-collection-"+t[0])},m(t,n){m(t,e,n),f(e,o)},p(t,o){1&o&&n!==(n="cc-module-config-no-collection-"+t[0])&&S(e,"id",n)},d(t){t&&g(e)}}}function li(t){let e,o,n,r,i,s,a,l,c,d,u,h,p,b,x,k,C,_,O,T,$,M,D,A,I,P,N,U,H,q,z,R,j,B,F,V,W,G,K,X,J,Y,Q,Z,tt,nt,at,lt=t[4].generalTab.tooltip+"",ct=t[4].moduleDates.tooltip+"",dt=t[4].moduleBanner.tooltip+"",ut=t[4].moduleMetaData.tooltip+"";return W=new Gr({props:{moduleId:t[0]}}),X=new Tt({props:{moduleId:t[0]}}),Q=new ei({props:{moduleId:t[0]}}),nt=new si({props:{moduleId:t[0]}}),{c(){e=v("div"),o=v("sl-tab-group"),n=v("sl-tab"),r=y("General  \r\n        "),i=v("sl-tooltip"),s=v("div"),a=w(),l=v("a"),c=v("i"),d=w(),u=v("sl-tab"),h=y("Dates  \r\n        "),p=v("sl-tooltip"),b=v("div"),x=w(),k=v("a"),C=v("i"),_=w(),O=v("sl-tab"),T=y("Banner  \r\n        "),$=v("sl-tooltip"),M=v("div"),D=w(),A=v("a"),I=v("i"),P=w(),N=v("sl-tab"),U=v("div"),H=y("Metadata \r\n          "),q=v("sl-tooltip"),z=v("div"),R=w(),j=v("a"),B=v("i"),F=w(),V=v("sl-tab-panel"),rt(W.$$.fragment),G=w(),K=v("sl-tab-panel"),rt(X.$$.fragment),J=w(),Y=v("sl-tab-panel"),rt(Q.$$.fragment),Z=w(),tt=v("sl-tab-panel"),rt(nt.$$.fragment),S(s,"slot","content"),S(c,"class","icon-question"),S(l,"href",t[4].generalTab.url),S(l,"target","_blank"),S(l,"rel","noreferrer"),S(l,"class","cc-module-link"),E(i,"hoist",""),E(i,"class","svelte-1s0ihn8"),E(n,"slot","nav"),E(n,"panel","general"),L(n,"text-align","right"),E(n,"class","svelte-1s0ihn8"),S(b,"slot","content"),S(C,"class","icon-question"),S(k,"href",t[4].moduleDates.url),S(k,"target","_blank"),S(k,"rel","noreferrer"),S(k,"class","cc-module-link"),E(p,"class","svelte-1s0ihn8"),E(u,"slot","nav"),E(u,"panel","dates"),L(u,"text-align","right"),E(u,"class","svelte-1s0ihn8"),S(M,"slot","content"),S(I,"class","icon-question"),S(A,"href",t[4].moduleBanner.url),S(A,"target","_blank"),S(A,"rel","noreferrer"),E($,"class","svelte-1s0ihn8"),E(O,"slot","nav"),E(O,"panel","banner"),L(O,"text-align","right"),E(O,"class","svelte-1s0ihn8"),S(z,"slot","content"),S(B,"class","icon-question"),S(j,"href",t[4].moduleMetaData.url),S(j,"target","_blank"),S(j,"rel","noreferrer"),E(q,"class","svelte-1s0ihn8"),E(N,"slot","nav"),E(N,"panel","metadata"),L(N,"text-align","right"),E(N,"class","svelte-1s0ihn8"),E(V,"name","general"),E(K,"name","dates"),E(Y,"name","banner"),E(tt,"name","metadata"),E(o,"placement","start"),S(e,"class","cc-module-config-tabs border border-trbl svelte-1s0ihn8")},m(t,g){m(t,e,g),f(e,o),f(o,n),f(n,r),f(n,i),f(i,s),s.innerHTML=lt,f(i,a),f(i,l),f(l,c),f(o,d),f(o,u),f(u,h),f(u,p),f(p,b),b.innerHTML=ct,f(p,x),f(p,k),f(k,C),f(o,_),f(o,O),f(O,T),f(O,$),f($,M),M.innerHTML=dt,f($,D),f($,A),f(A,I),f(o,P),f(o,N),f(N,U),f(U,H),f(U,q),f(q,z),z.innerHTML=ut,f(q,R),f(q,j),f(j,B),f(o,F),f(o,V),it(W,V,null),f(o,G),f(o,K),it(X,K,null),f(o,J),f(o,Y),it(Q,Y,null),f(o,Z),f(o,tt),it(nt,tt,null),at=!0},p(t,e){const o={};1&e&&(o.moduleId=t[0]),W.$set(o);const n={};1&e&&(n.moduleId=t[0]),X.$set(n);const r={};1&e&&(r.moduleId=t[0]),Q.$set(r);const i={};1&e&&(i.moduleId=t[0]),nt.$set(i)},i(t){at||(et(W.$$.fragment,t),et(X.$$.fragment,t),et(Q.$$.fragment,t),et(nt.$$.fragment,t),at=!0)},o(t){ot(W.$$.fragment,t),ot(X.$$.fragment,t),ot(Q.$$.fragment,t),ot(nt.$$.fragment,t),at=!1},d(t){t&&g(e),st(W),st(X),st(Q),st(nt)}}}function ci(t){let e,o,r,i,s,a,l,c,d,u,h,p,b,C,_,O,L,T,$,M,D=t[1].MODULES[t[0]].name+"",A=!t[2]&&ai(t),I=t[1].MODULES[t[0]].configVisible&&li(t);return{c(){e=v("div"),A&&A.c(),o=w(),r=v("span"),i=v("i"),l=y("\r\n\r\n    Configure Collections for\r\n    "),c=v("em"),d=w(),u=v("sl-tooltip"),h=v("div"),h.textContent=`${t[4].moduleConfiguration.tooltip}`,p=w(),b=v("a"),C=v("i"),O=w(),I&&I.c(),L=x(),S(i,"id",s="cc-module-config-"+t[0]+"-switch"),S(i,"class",a=t[1].MODULES[t[0]].configVisible?"icon-mini-arrow-down":"icon-mini-arrow-right"),S(h,"slot","content"),S(C,"class","icon-question"),S(b,"href",t[4].moduleConfiguration.url),S(b,"target","_blank"),S(b,"rel","noreferrer"),S(b,"class","cc-module-link"),E(u,"class","svelte-1s0ihn8"),S(e,"class","cc-module-config border border-trbl svelte-1s0ihn8"),S(e,"id",_="cc-module-config-"+t[0])},m(n,s){m(n,e,s),A&&A.m(e,null),f(e,o),f(e,r),f(r,i),f(r,l),f(r,c),c.innerHTML=D,f(r,d),f(r,u),f(u,h),f(u,p),f(u,b),f(b,C),m(n,O,s),I&&I.m(n,s),m(n,L,s),T=!0,$||(M=[k(i,"click",t[3]),k(i,"keydown",t[3])],$=!0)},p(t,[n]){t[2]?A&&(A.d(1),A=null):A?A.p(t,n):(A=ai(t),A.c(),A.m(e,o)),(!T||1&n&&s!==(s="cc-module-config-"+t[0]+"-switch"))&&S(i,"id",s),(!T||3&n&&a!==(a=t[1].MODULES[t[0]].configVisible?"icon-mini-arrow-down":"icon-mini-arrow-right"))&&S(i,"class",a),(!T||3&n)&&D!==(D=t[1].MODULES[t[0]].name+"")&&(c.innerHTML=D),(!T||1&n&&_!==(_="cc-module-config-"+t[0]))&&S(e,"id",_),t[1].MODULES[t[0]].configVisible?I?(I.p(t,n),3&n&&et(I,1)):(I=li(t),I.c(),et(I,1),I.m(L.parentNode,L)):I&&(Z(),ot(I,1,1,(()=>{I=null})),tt())},i(t){T||(et(I),T=!0)},o(t){ot(I),T=!1},d(t){t&&g(e),A&&A.d(),t&&g(O),I&&I.d(t),t&&g(L),$=!1,n(M)}}}function di(t,e,o){let n,r,i;u(t,ua,(t=>o(5,r=t))),u(t,ca,(t=>o(1,i=t)));let{module:s}=e;const a={moduleConfiguration:{tooltip:"Click the arrow to open/close the Collections interface to configure data about this module",url:"https://djplaner.github.io/canvas-collections/walk-throughs/new/configure-modules/"},generalTab:{tooltip:"Configure common collections settings: collections, description, label, engage button etc."},moduleDates:{tooltip:'<p>Choose from the three supported "date types" and configure it. Options include:</p> <ol> <li> <strong>Single date</strong> - a specific date (and time) </li>\n\t\t  <li> <strong>Date range</strong> - a start and end date (and time) </li>\n\t\t  <li> 🏗 <strong>Coming soon</strong> 🏗 - (soon you\'ll be able to) specify a single date (and time) when the module will be available.</li>\n\t\t</ol>\n\t\t<p><em>Coming Soon</em> will be able to be used with one of the other options</em></p>\n\t\t',url:"https://djplaner.github.io/canvas-collections/reference/objects/overview/#dates"},moduleBanner:{tooltip:"<p>Choose one of three possible banner types (for Card representations) and configure it. Options are:</p> <ol> <li> <strong>Image</strong> - a banner image</li> <li> <strong>Colour</strong> - a solid colour</li> <li> <strong>Iframe</strong> - HTML embed code (e.g. YouTube video)</li> </ol>\n\t\t",url:"https://djplaner.github.io/canvas-collections/reference/objects/overview/#dates"},moduleMetaData:{tooltip:"Flexibly add, delete, and modify additional information about this module, which\n\t\tmay be used by collections and representations - or for your own purposes.",url:"https://djplaner.github.io/canvas-collections/reference/objects/overview/#additional-metadata"}};return t.$$set=t=>{"module"in t&&o(0,s=t.module)},t.$$.update=()=>{3&t.$$.dirty&&o(2,n=null!==i.MODULES[s].collection&&""!==i.MODULES[s].collection)},[s,i,n,function(){p(ca,i.MODULES[s].configVisible=!i.MODULES[s].configVisible,i),p(ua,r.needToSaveCollections=!0,r)},a]}class ui extends ct{constructor(t){super(),lt(this,t,di,ci,i,{module:0})}}function hi(t){let e=[];const o=d(ca),n=d(ua).editMode,r=o.MODULES,i=d(da);let s=[];if(i.forEach((o=>{const n=o.id;r[n].collection===t&&(e.push(o),s.push(n))})),!n)for(const o in r)r[o].collection===t&&!s.includes(parseInt(o))&&r[o].fyi&&e.push(r[o]);return e}function pi(t,e){const o=t.map((t=>t.id)),n=d(ca).MODULES;for(const r in n)null!==n[r].collection&&""!==n[r].collection||(e||n[r].published)&&(o.includes(r)||t.push(n[r]));return t}function fi(t,e,o){let n=[];const r=d(ua).editMode;return n=hi(t),r?o&&!e&&(n=pi(n,r)):o&&(n=pi(n,r)),n}function mi(t,e,o,n=!1){return t.hasOwnProperty("metadata")&&t.metadata.hasOwnProperty(e)?t.metadata[e]:o&&!n?`{${e}}`:""}function gi(t){let e=`${t.date.label}: `;return vi(t.date)&&(e+=bi(t.date,t.dateHide)),vi(t.date.to)&&(e+=` to ${bi(t.date.to,t.dateHide)}`),e}function bi(t,e){let o="";return e.day||(o+=` ${t.day}`),e.week||(o+=` Week ${t.week}`),e.calendarDate||(e.week?o+=` ${t.date} ${t.month}`:o+=` (${t.date} ${t.month})`),e.time||""===t.time||(o+=` ${t.time}`),o}function vi(t){return t.hasOwnProperty("week")&&""!==t.week||t.hasOwnProperty("month")&&""!==t.month||t.hasOwnProperty("date")&&""!==t.date||t.hasOwnProperty("day")&&""!==t.day||t.hasOwnProperty("time")&&""!==t.time}function yi(t){const e=document.getElementById(`context_module_${t}`);e&&(e.style.display="block");const o=document.getElementById(`${t}`);if(o&&!document.getElementById(`cc-module-config-${t}`)){const e=document.createElement("div");e.id=`cc-module-config-${t}`,o.parentNode.insertBefore(e,o.nextSibling),new ui({target:e,props:{module:t}})}}function wi(t){let e=new URL(document.URL);return e.search="",e.hash=`module_${t}`,e.toString()}function xi(t){const e=t.name;let o="";t.label&&(o=t.label);let n=new RegExp(`^${o}\\s*[:->]\\s*`);t.actualNum&&(n=new RegExp(`^${o}\\s*${t.actualNum}\\s*[:>-]\\s*`),o+=` ${t.actualNum}`," "===o.charAt(0)&&(o=o.substring(1))),o=`${o}: `;let r=e;return": "!==o&&(r=e.replace(n,"").trim()),r}function ki(t,e){if(t.hasOwnProperty("week")&&""!==t.week){t.hasOwnProperty("day")&&""!==t.day||(t.day=e.getFirstDayOfWeek());const o=e.getDate(t.week,!1,t.day),n=["date","month","year"];for(let e=0;e<n.length;e++)o.hasOwnProperty(n[e])&&(t[n[e]]=o[n[e]])}return t}function Ci(t){let e,o=t[3].editMode&&_i();return{c(){e=v("div"),o&&o.c(),S(e,"class","cc-banner-colour svelte-nx2v6h")},m(t,n){m(t,e,n),o&&o.m(e,null)},p(t,n){t[3].editMode?o||(o=_i(),o.c(),o.m(e,null)):o&&(o.d(1),o=null)},d(t){t&&g(e),o&&o.d()}}}function Si(t){let e,o=t[3].editMode&&Oi();return{c(){e=v("div"),o&&o.c(),S(e,"class","claytons-banner-colour"),L(e,"width","100%"),L(e,"height","10rem"),L(e,"background-color","#ffffff")},m(t,n){m(t,e,n),o&&o.m(e,null)},p(t,n){t[3].editMode?o||(o=Oi(),o.c(),o.m(e,null)):o&&(o.d(1),o=null)},d(t){t&&g(e),o&&o.d()}}}function Ei(t){let e,o,n=t[2].MODULES[t[1]].iframe+"";return{c(){e=new D(!1),o=x(),e.a=o},m(t,r){e.m(n,t,r),m(t,o,r)},p(t,o){6&o&&n!==(n=t[2].MODULES[t[1]].iframe+"")&&e.p(n)},d(t){t&&g(o),t&&e.d()}}}function _i(t){let e;return{c(){e=v("p"),e.innerHTML="(<em>No iframe specified</em>)"},m(t,o){m(t,e,o)},d(t){t&&g(e)}}}function Oi(t){let e;return{c(){e=v("p"),e.innerHTML="(<em>No iframe specified</em>)"},m(t,o){m(t,e,o)},d(t){t&&g(e)}}}function Li(e){let o,n;function r(t,e){return 6&e&&(o=null),null==o&&(o=!!t[4](t[2].MODULES[t[1]].iframe)),o?Ei:t[0]?Si:Ci}let i=r(e,-1),s=i(e);return{c(){s.c(),n=x()},m(t,e){s.m(t,e),m(t,n,e)},p(t,[e]){i===(i=r(t,e))&&s?s.p(t,e):(s.d(1),s=i(t),s&&(s.c(),s.m(n.parentNode,n)))},i:t,o:t,d(t){s.d(t),t&&g(n)}}}function Ti(t,e,o){let n,r;u(t,ca,(t=>o(2,n=t))),u(t,ua,(t=>o(3,r=t)));let{moduleId:i}=e,{claytons:s}=e;return s||(s=!1),t.$$set=t=>{"moduleId"in t&&o(1,i=t.moduleId),"claytons"in t&&o(0,s=t.claytons)},[s,i,n,r,function(t){return n.MODULES[i].iframe.match(/^<iframe.*src="(.*)".*>.*<\/iframe>$/)}]}class $i extends ct{constructor(t){super(),lt(this,t,Ti,Li,i,{moduleId:1,claytons:0})}}function Mi(t){let e,o;return{c(){e=v("div"),o=y(" "),S(e,"class","cc-banner-colour svelte-in430l"),L(e,"background-color",t[2].MODULES[t[1]].bannerColour)},m(t,n){m(t,e,n),f(e,o)},p(t,o){6&o&&L(e,"background-color",t[2].MODULES[t[1]].bannerColour)},d(t){t&&g(e)}}}function Di(t){let e,o;return{c(){e=v("div"),o=y(" "),S(e,"class","claytons-banner-colour"),L(e,"width","100%"),L(e,"height","10rem"),L(e,"background-color",t[2].MODULES[t[1]].bannerColour)},m(t,n){m(t,e,n),f(e,o)},p(t,o){6&o&&L(e,"background-color",t[2].MODULES[t[1]].bannerColour)},d(t){t&&g(e)}}}function Ai(e){let o;function n(t,e){return t[0]?Di:Mi}let r=n(e),i=r(e);return{c(){i.c(),o=x()},m(t,e){i.m(t,e),m(t,o,e)},p(t,[e]){r===(r=n(t))&&i?i.p(t,e):(i.d(1),i=r(t),i&&(i.c(),i.m(o.parentNode,o)))},i:t,o:t,d(t){i.d(t),t&&g(o)}}}function Ii(t,e,o){let n;u(t,ca,(t=>o(2,n=t)));let{moduleId:r}=e,{claytons:i}=e;return i||(i=!1),t.$$set=t=>{"moduleId"in t&&o(1,r=t.moduleId),"claytons"in t&&o(0,i=t.claytons)},[i,r,n]}class Pi extends ct{constructor(t){super(),lt(this,t,Ii,Ai,i,{moduleId:1,claytons:0})}}function Ni(t){let e,o,n;return{c(){e=v("img"),S(e,"class","cc-card-image svelte-1emj5tc"),l(e.src,o="https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png")||S(e,"src","https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png"),S(e,"data-moduleid",t[1]),S(e,"alt",n="Image representing '"+t[2].MODULES[t[1]].name.replace(/(["'])/g,"\\$1")+"'")},m(t,o){m(t,e,o)},p(t,o){2&o&&S(e,"data-moduleid",t[1]),6&o&&n!==(n="Image representing '"+t[2].MODULES[t[1]].name.replace(/(["'])/g,"\\$1")+"'")&&S(e,"alt",n)},d(t){t&&g(e)}}}function Ui(t){let e,o,n,r,i;return{c(){e=v("img"),S(e,"class",o="cc-card-image "+zi(t[2].MODULES[t[1]].imageSize)+" svelte-1emj5tc"),L(e,"height","10rem"),L(e,"width","100%"),l(e.src,n=t[2].MODULES[t[1]].image)||S(e,"src",n),S(e,"data-moduleid",r="$"+t[1]),S(e,"alt",i="Image representing '"+t[2].MODULES[t[1]].name.replace(/(["'])/g,"\\$1")+"\r\n\t'")},m(t,o){m(t,e,o)},p(t,s){6&s&&o!==(o="cc-card-image "+zi(t[2].MODULES[t[1]].imageSize)+" svelte-1emj5tc")&&S(e,"class",o),6&s&&!l(e.src,n=t[2].MODULES[t[1]].image)&&S(e,"src",n),2&s&&r!==(r="$"+t[1])&&S(e,"data-moduleid",r),6&s&&i!==(i="Image representing '"+t[2].MODULES[t[1]].name.replace(/(["'])/g,"\\$1")+"\r\n\t'")&&S(e,"alt",i)},d(t){t&&g(e)}}}function Hi(t){let e,o,n,r,i;return{c(){e=v("img"),S(e,"class",o="cc-card-image "+zi(t[2].MODULES[t[1]].imageSize)+" svelte-1emj5tc"),l(e.src,n=t[2].MODULES[t[1]].image)||S(e,"src",n),S(e,"data-moduleid",r="$"+t[1]),S(e,"alt",i="Image representing '"+t[2].MODULES[t[1]].name.replace(/(["'])/g,"\\$1")+"\r\n\t'")},m(t,o){m(t,e,o)},p(t,s){6&s&&o!==(o="cc-card-image "+zi(t[2].MODULES[t[1]].imageSize)+" svelte-1emj5tc")&&S(e,"class",o),6&s&&!l(e.src,n=t[2].MODULES[t[1]].image)&&S(e,"src",n),2&s&&r!==(r="$"+t[1])&&S(e,"data-moduleid",r),6&s&&i!==(i="Image representing '"+t[2].MODULES[t[1]].name.replace(/(["'])/g,"\\$1")+"\r\n\t'")&&S(e,"alt",i)},d(t){t&&g(e)}}}function qi(e){let o;function n(t,e){return t[2].MODULES[t[1]].image&&t[0]?Hi:t[2].MODULES[t[1]].image&&!t[0]?Ui:Ni}let r=n(e),i=r(e);return{c(){i.c(),o=x()},m(t,e){i.m(t,e),m(t,o,e)},p(t,[e]){r===(r=n(t))&&i?i.p(t,e):(i.d(1),i=r(t),i&&(i.c(),i.m(o.parentNode,o)))},i:t,o:t,d(t){i.d(t),t&&g(o)}}}function zi(t){let e="";return"bg-contain"===t?e="cc-object-fit-old-kludge":["contain","cover","scale-down","fill"].includes(t)&&(e=`cc-object-fit-${t}`),e}function Ri(t,e,o){let n;u(t,ca,(t=>o(2,n=t)));let{moduleId:r}=e,{claytons:i}=e;return i||(i=!1),t.$$set=t=>{"moduleId"in t&&o(1,r=t.moduleId),"claytons"in t&&o(0,i=t.claytons)},[i,r,n]}class ji extends ct{constructor(t){super(),lt(this,t,Ri,qi,i,{moduleId:1,claytons:0})}}function Bi(t){let e,o;function n(t,o){return 1&o&&(e=null),null==e&&(e=!(!t[0].to||!vi(t[0].to))),e?Vi:Fi}let r=n(t,-1),i=r(t);return{c(){i.c(),o=x()},m(t,e){i.m(t,e),m(t,o,e)},p(t,e){r===(r=n(t,e))&&i?i.p(t,e):(i.d(1),i=r(t),i&&(i.c(),i.m(o.parentNode,o)))},d(t){i.d(t),t&&g(o)}}}function Fi(t){let e,o,n,r,i,s,a=vi(t[0])&&t[0].label,l=a&&Wi(t),c=!t[1].week&&t[0].week&&!t[1].week&&Gi(t),d=!t[1].time&&t[0].time&&Ki(t),u=!t[1].day&&t[0].day&&Xi(t),h=!t[1].calendarDate&&t[0].month&&Ji(t),p=!t[1].calendarDate&&t[0].date&&Yi(t);return{c(){e=v("div"),l&&l.c(),o=w(),c&&c.c(),n=w(),d&&d.c(),r=w(),u&&u.c(),i=w(),h&&h.c(),s=w(),p&&p.c(),S(e,"class","cc-card-date svelte-y8dnrn")},m(t,a){m(t,e,a),l&&l.m(e,null),f(e,o),c&&c.m(e,null),f(e,n),d&&d.m(e,null),f(e,r),u&&u.m(e,null),f(e,i),h&&h.m(e,null),f(e,s),p&&p.m(e,null)},p(t,f){1&f&&(a=vi(t[0])&&t[0].label),a?l?l.p(t,f):(l=Wi(t),l.c(),l.m(e,o)):l&&(l.d(1),l=null),t[1].week||!t[0].week||t[1].week?c&&(c.d(1),c=null):c?c.p(t,f):(c=Gi(t),c.c(),c.m(e,n)),!t[1].time&&t[0].time?d?d.p(t,f):(d=Ki(t),d.c(),d.m(e,r)):d&&(d.d(1),d=null),!t[1].day&&t[0].day?u?u.p(t,f):(u=Xi(t),u.c(),u.m(e,i)):u&&(u.d(1),u=null),!t[1].calendarDate&&t[0].month?h?h.p(t,f):(h=Ji(t),h.c(),h.m(e,s)):h&&(h.d(1),h=null),!t[1].calendarDate&&t[0].date?p?p.p(t,f):(p=Yi(t),p.c(),p.m(e,null)):p&&(p.d(1),p=null)},d(t){t&&g(e),l&&l.d(),c&&c.d(),d&&d.d(),u&&u.d(),h&&h.d(),p&&p.d()}}}function Vi(t){let e,o,n,r,i,s,a=vi(t[0])&&t[0].label,l=a&&Qi(t),c=(!t[1].week&&t[0].week&&""!==t[0].week||t[0].to.week)&&Zi(t),d=(!t[1].time&&t[0].time||t[0].to.time)&&ns(t),u=(t[0].day||t[0].to.day)&&ss(t),h=(t[0].month||t[0].to.month)&&cs(t),p=(t[0].date||t[0].to.date)&&hs(t);return{c(){e=v("div"),l&&l.c(),o=w(),c&&c.c(),n=w(),d&&d.c(),r=w(),u&&u.c(),i=w(),h&&h.c(),s=w(),p&&p.c(),S(e,"class","cc-card-date svelte-y8dnrn")},m(t,a){m(t,e,a),l&&l.m(e,null),f(e,o),c&&c.m(e,null),f(e,n),d&&d.m(e,null),f(e,r),u&&u.m(e,null),f(e,i),h&&h.m(e,null),f(e,s),p&&p.m(e,null)},p(t,f){1&f&&(a=vi(t[0])&&t[0].label),a?l?l.p(t,f):(l=Qi(t),l.c(),l.m(e,o)):l&&(l.d(1),l=null),!t[1].week&&t[0].week&&""!==t[0].week||t[0].to.week?c?c.p(t,f):(c=Zi(t),c.c(),c.m(e,n)):c&&(c.d(1),c=null),!t[1].time&&t[0].time||t[0].to.time?d?d.p(t,f):(d=ns(t),d.c(),d.m(e,r)):d&&(d.d(1),d=null),t[0].day||t[0].to.day?u?u.p(t,f):(u=ss(t),u.c(),u.m(e,i)):u&&(u.d(1),u=null),t[0].month||t[0].to.month?h?h.p(t,f):(h=cs(t),h.c(),h.m(e,s)):h&&(h.d(1),h=null),t[0].date||t[0].to.date?p?p.p(t,f):(p=hs(t),p.c(),p.m(e,null)):p&&(p.d(1),p=null)},d(t){t&&g(e),l&&l.d(),c&&c.d(),d&&d.d(),u&&u.d(),h&&h.d(),p&&p.d()}}}function Wi(t){let e,o,n=t[0].label+"";return{c(){e=v("div"),o=y(n),S(e,"class","cc-card-date-label svelte-y8dnrn")},m(t,n){m(t,e,n),f(e,o)},p(t,e){1&e&&n!==(n=t[0].label+"")&&_(o,n)},d(t){t&&g(e)}}}function Gi(t){let e,o,n,r=t[0].week+"";return{c(){e=v("div"),o=y("Week "),n=y(r),S(e,"class","cc-card-date-week svelte-y8dnrn")},m(t,r){m(t,e,r),f(e,o),f(e,n)},p(t,e){1&e&&r!==(r=t[0].week+"")&&_(n,r)},d(t){t&&g(e)}}}function Ki(t){let e,o,n=t[0].time+"";return{c(){e=v("div"),o=y(n),S(e,"class","cc-card-date-time svelte-y8dnrn")},m(t,n){m(t,e,n),f(e,o)},p(t,e){1&e&&n!==(n=t[0].time+"")&&_(o,n)},d(t){t&&g(e)}}}function Xi(t){let e,o,n=t[0].day+"";return{c(){e=v("div"),o=y(n),S(e,"class","cc-card-date-day svelte-y8dnrn")},m(t,n){m(t,e,n),f(e,o)},p(t,e){1&e&&n!==(n=t[0].day+"")&&_(o,n)},d(t){t&&g(e)}}}function Ji(t){let e,o,n=t[0].month+"";return{c(){e=v("div"),o=y(n),S(e,"class","cc-card-date-month svelte-y8dnrn")},m(t,n){m(t,e,n),f(e,o)},p(t,e){1&e&&n!==(n=t[0].month+"")&&_(o,n)},d(t){t&&g(e)}}}function Yi(t){let e,o,n=t[0].date+"";return{c(){e=v("div"),o=y(n),S(e,"class","cc-card-date-date svelte-y8dnrn")},m(t,n){m(t,e,n),f(e,o)},p(t,e){1&e&&n!==(n=t[0].date+"")&&_(o,n)},d(t){t&&g(e)}}}function Qi(t){let e,o,n=t[0].label+"";return{c(){e=v("div"),o=y(n),S(e,"class","cc-card-date-label svelte-y8dnrn")},m(t,n){m(t,e,n),f(e,o)},p(t,e){1&e&&n!==(n=t[0].label+"")&&_(o,n)},d(t){t&&g(e)}}}function Zi(t){let e,o,n,r,i=t[0].week+"";function s(t,e){return t[0].week&&t[0].to.week&&t[0].week!==t[0].to.week?es:ts}let a=s(t),l=a(t),c=t[0].week&&t[0].to.week&&t[0].week!==t[0].to.week&&os(t);return{c(){e=v("div"),l.c(),o=w(),n=y(i),r=w(),c&&c.c(),S(e,"class","cc-card-date-week svelte-y8dnrn")},m(t,i){m(t,e,i),l.m(e,null),f(e,o),f(e,n),f(e,r),c&&c.m(e,null)},p(t,r){a!==(a=s(t))&&(l.d(1),l=a(t),l&&(l.c(),l.m(e,o))),1&r&&i!==(i=t[0].week+"")&&_(n,i),t[0].week&&t[0].to.week&&t[0].week!==t[0].to.week?c?c.p(t,r):(c=os(t),c.c(),c.m(e,null)):c&&(c.d(1),c=null)},d(t){t&&g(e),l.d(),c&&c.d()}}}function ts(t){let e;return{c(){e=y("Week")},m(t,o){m(t,e,o)},d(t){t&&g(e)}}}function es(t){let e;return{c(){e=y("Weeks")},m(t,o){m(t,e,o)},d(t){t&&g(e)}}}function os(t){let e,o,n=t[0].to.week+"";return{c(){e=y("- "),o=y(n)},m(t,n){m(t,e,n),m(t,o,n)},p(t,e){1&e&&n!==(n=t[0].to.week+"")&&_(o,n)},d(t){t&&g(e),t&&g(o)}}}function ns(t){let e,o,n,r,i=t[0].time&&rs(t),s=t[0].to.time&&is(t);return{c(){e=v("div"),o=v("div"),i&&i.c(),n=w(),r=v("div"),s&&s.c(),S(o,"class","cc-card-date-time-from svelte-y8dnrn"),S(r,"class","cc-card-date-time-to svelte-y8dnrn"),S(e,"class","cc-card-date-dual-time svelte-y8dnrn")},m(t,a){m(t,e,a),f(e,o),i&&i.m(o,null),f(e,n),f(e,r),s&&s.m(r,null)},p(t,e){t[0].time?i?i.p(t,e):(i=rs(t),i.c(),i.m(o,null)):i&&(i.d(1),i=null),t[0].to.time?s?s.p(t,e):(s=is(t),s.c(),s.m(r,null)):s&&(s.d(1),s=null)},d(t){t&&g(e),i&&i.d(),s&&s.d()}}}function rs(t){let e,o=t[0].time+"";return{c(){e=y(o)},m(t,o){m(t,e,o)},p(t,n){1&n&&o!==(o=t[0].time+"")&&_(e,o)},d(t){t&&g(e)}}}function is(t){let e,o=t[0].to.time+"";return{c(){e=y(o)},m(t,o){m(t,e,o)},p(t,n){1&n&&o!==(o=t[0].to.time+"")&&_(e,o)},d(t){t&&g(e)}}}function ss(t){let e,o,n,r,i=t[0].day&&as(t),s=t[0].to.day&&ls(t);return{c(){e=v("div"),o=v("div"),i&&i.c(),n=w(),r=v("div"),s&&s.c(),S(o,"class","cc-card-date-day-from svelte-y8dnrn"),S(r,"class","cc-card-date-day-to svelte-y8dnrn"),S(e,"class","cc-card-date-dual-day svelte-y8dnrn")},m(t,a){m(t,e,a),f(e,o),i&&i.m(o,null),f(e,n),f(e,r),s&&s.m(r,null)},p(t,e){t[0].day?i?i.p(t,e):(i=as(t),i.c(),i.m(o,null)):i&&(i.d(1),i=null),t[0].to.day?s?s.p(t,e):(s=ls(t),s.c(),s.m(r,null)):s&&(s.d(1),s=null)},d(t){t&&g(e),i&&i.d(),s&&s.d()}}}function as(t){let e,o=t[0].day.substring(0,3)+"";return{c(){e=y(o)},m(t,o){m(t,e,o)},p(t,n){1&n&&o!==(o=t[0].day.substring(0,3)+"")&&_(e,o)},d(t){t&&g(e)}}}function ls(t){let e,o=t[0].to.day.substring(0,3)+"";return{c(){e=y(o)},m(t,o){m(t,e,o)},p(t,n){1&n&&o!==(o=t[0].to.day.substring(0,3)+"")&&_(e,o)},d(t){t&&g(e)}}}function cs(t){let e,o,n,r,i=t[0].month&&ds(t),s=t[0].to.month&&us(t);return{c(){e=v("div"),o=v("div"),i&&i.c(),n=w(),r=v("div"),s&&s.c(),S(o,"class","cc-card-date-month-from svelte-y8dnrn"),S(r,"class","cc-card-date-month-to svelte-y8dnrn"),S(e,"class","cc-card-date-dual-month svelte-y8dnrn")},m(t,a){m(t,e,a),f(e,o),i&&i.m(o,null),f(e,n),f(e,r),s&&s.m(r,null)},p(t,e){t[0].month?i?i.p(t,e):(i=ds(t),i.c(),i.m(o,null)):i&&(i.d(1),i=null),t[0].to.month?s?s.p(t,e):(s=us(t),s.c(),s.m(r,null)):s&&(s.d(1),s=null)},d(t){t&&g(e),i&&i.d(),s&&s.d()}}}function ds(t){let e,o=t[0].month+"";return{c(){e=y(o)},m(t,o){m(t,e,o)},p(t,n){1&n&&o!==(o=t[0].month+"")&&_(e,o)},d(t){t&&g(e)}}}function us(t){let e,o=t[0].to.month+"";return{c(){e=y(o)},m(t,o){m(t,e,o)},p(t,n){1&n&&o!==(o=t[0].to.month+"")&&_(e,o)},d(t){t&&g(e)}}}function hs(t){let e,o,n,r,i=t[0].date&&ps(t),s=t[0].to.date&&fs(t);return{c(){e=v("div"),o=v("div"),i&&i.c(),n=w(),r=v("div"),s&&s.c(),S(o,"class","cc-card-date-date-from svelte-y8dnrn"),S(r,"class","cc-card-date-date-to svelte-y8dnrn"),S(e,"class","cc-card-date-dual-date svelte-y8dnrn")},m(t,a){m(t,e,a),f(e,o),i&&i.m(o,null),f(e,n),f(e,r),s&&s.m(r,null)},p(t,e){t[0].date?i?i.p(t,e):(i=ps(t),i.c(),i.m(o,null)):i&&(i.d(1),i=null),t[0].to.date?s?s.p(t,e):(s=fs(t),s.c(),s.m(r,null)):s&&(s.d(1),s=null)},d(t){t&&g(e),i&&i.d(),s&&s.d()}}}function ps(t){let e,o=t[0].date+"";return{c(){e=y(o)},m(t,o){m(t,e,o)},p(t,n){1&n&&o!==(o=t[0].date+"")&&_(e,o)},d(t){t&&g(e)}}}function fs(t){let e,o=t[0].to.date+"";return{c(){e=y(o)},m(t,o){m(t,e,o)},p(t,n){1&n&&o!==(o=t[0].to.date+"")&&_(e,o)},d(t){t&&g(e)}}}function ms(e){let o,n=e[0]&&Bi(e);return{c(){n&&n.c(),o=x()},m(t,e){n&&n.m(t,e),m(t,o,e)},p(t,[e]){t[0]?n?n.p(t,e):(n=Bi(t),n.c(),n.m(o.parentNode,o)):n&&(n.d(1),n=null)},i:t,o:t,d(t){n&&n.d(t),t&&g(o)}}}function gs(t,e,o){let n;u(t,ua,(t=>o(2,n=t)));let{date:r}=e,{dateHide:i}=e,s=new ht(n.studyPeriod);return r&&(r.week||r.month&&r.date)&&(r=function(t,e){return(t=ki(t,e)).hasOwnProperty("to")&&vi(t.to)&&(t.to=ki(t.to,e)),t}(r,s)),t.$$set=t=>{"date"in t&&o(0,r=t.date),"dateHide"in t&&o(1,i=t.dateHide)},[r,i]}class bs extends ct{constructor(t){super(),lt(this,t,gs,ms,i,{date:0,dateHide:1})}}function vs(t,e,o){const n=t.slice();return n[9]=e[o],n}function ys(t,e,o){const n=t.slice();return n[9]=e[o],n}function ws(t){let e,o,n=t[3],r=[];for(let e=0;e<n.length;e+=1)r[e]=$s(vs(t,n,e));const i=t=>ot(r[t],1,1,(()=>{r[t]=null}));return{c(){e=v("div");for(let t=0;t<r.length;t+=1)r[t].c();S(e,"class","cc-card-interface cc-representation svelte-19lirdr")},m(t,n){m(t,e,n);for(let t=0;t<r.length;t+=1)r[t].m(e,null);o=!0},p(t,o){if(126&o){let s;for(n=t[3],s=0;s<n.length;s+=1){const i=vs(t,n,s);r[s]?(r[s].p(i,o),et(r[s],1)):(r[s]=$s(i),r[s].c(),et(r[s],1),r[s].m(e,null))}for(Z(),s=n.length;s<r.length;s+=1)i(s);tt()}},i(t){if(!o){for(let t=0;t<n.length;t+=1)et(r[t]);o=!0}},o(t){r=r.filter(Boolean);for(let t=0;t<r.length;t+=1)ot(r[t]);o=!1},d(t){t&&g(e),b(r,t)}}}function xs(t){let e,o,n=t[3],r=[];for(let e=0;e<n.length;e+=1)r[e]=qs(ys(t,n,e));const i=t=>ot(r[t],1,1,(()=>{r[t]=null}));return{c(){e=v("div");for(let t=0;t<r.length;t+=1)r[t].c();L(e,"flex-wrap","wrap"),L(e,"display","flex"),L(e,"margin-top","0.5em")},m(t,n){m(t,e,n);for(let t=0;t<r.length;t+=1)r[t].m(e,null);o=!0},p(t,o){if(57&o){let s;for(n=t[3],s=0;s<n.length;s+=1){const i=ys(t,n,s);r[s]?(r[s].p(i,o),et(r[s],1)):(r[s]=qs(i),r[s].c(),et(r[s],1),r[s].m(e,null))}for(Z(),s=n.length;s<r.length;s+=1)i(s);tt()}},i(t){if(!o){for(let t=0;t<n.length;t+=1)et(r[t]);o=!0}},o(t){r=r.filter(Boolean);for(let t=0;t<r.length;t+=1)ot(r[t]);o=!1},d(t){t&&g(e),b(r,t)}}}function ks(t){let e,o,n;return{c(){e=v("a"),o=y(" "),S(e,"class","cc-card-link svelte-19lirdr"),S(e,"href",n=wi(t[9].id)),S(e,"style","")},m(t,n){m(t,e,n),f(e,o)},p(t,o){8&o&&n!==(n=wi(t[9].id))&&S(e,"href",n)},d(t){t&&g(e)}}}function Cs(t){let e,o;function n(t,e){return t[4].MODULES[t[9].id].fyiText?Es:Ss}let r=n(t),i=r(t);return{c(){e=v("div"),o=v("span"),i.c(),S(o,"class","cc-fyi-text"),S(e,"class","cc-card-fyi svelte-19lirdr")},m(t,n){m(t,e,n),f(e,o),i.m(o,null)},p(t,e){r===(r=n(t))&&i?i.p(t,e):(i.d(1),i=r(t),i&&(i.c(),i.m(o,null)))},d(t){t&&g(e),i.d()}}}function Ss(e){let o;return{c(){o=y(" ")},m(t,e){m(t,o,e)},p:t,d(t){t&&g(o)}}}function Es(t){let e,o,n=t[4].MODULES[t[9].id].fyiText+"";return{c(){e=new D(!1),o=x(),e.a=o},m(t,r){e.m(n,t,r),m(t,o,r)},p(t,o){24&o&&n!==(n=t[4].MODULES[t[9].id].fyiText+"")&&e.p(n)},d(t){t&&g(o),t&&e.d()}}}function _s(t){let e,o,n=!t[4].MODULES[t[9].id].published&&Os(),r=t[2].editMode&&t[4].MODULES[t[9].id].collection!==t[1]&&Ls();return{c(){e=v("div"),n&&n.c(),o=w(),r&&r.c(),S(e,"class","cc-card-published svelte-19lirdr")},m(t,i){m(t,e,i),n&&n.m(e,null),f(e,o),r&&r.m(e,null)},p(t,i){t[4].MODULES[t[9].id].published?n&&(n.d(1),n=null):n||(n=Os(),n.c(),n.m(e,o)),t[2].editMode&&t[4].MODULES[t[9].id].collection!==t[1]?r||(r=Ls(),r.c(),r.m(e,null)):r&&(r.d(1),r=null)},d(t){t&&g(e),n&&n.d(),r&&r.d()}}}function Os(t){let e;return{c(){e=y("Unpublished.")},m(t,o){m(t,e,o)},d(t){t&&g(e)}}}function Ls(t){let e;return{c(){e=y("No collection allocated.")},m(t,o){m(t,e,o)},d(t){t&&g(e)}}}function Ts(t){let e,o,n,r,i,s,a,l=t[4].MODULES[t[9].id].engageText+"";return{c(){e=v("div"),o=v("div"),n=v("a"),r=y(" "),s=w(),a=y(l),S(n,"href",i=wi(t[9].id)),S(n,"class","gu-engage svelte-19lirdr"),S(o,"class","cc-card-engage-button svelte-19lirdr"),S(e,"class","cc-card-engage svelte-19lirdr")},m(t,i){m(t,e,i),f(e,o),f(o,n),f(n,r),f(o,s),f(o,a)},p(t,e){8&e&&i!==(i=wi(t[9].id))&&S(n,"href",i),24&e&&l!==(l=t[4].MODULES[t[9].id].engageText+"")&&_(a,l)},d(t){t&&g(e)}}}function $s(t){let e,o,r,i,s,a,l,c,d,u,p,b,x,C,E,O,L,T,$,M,I,P,N,U,H,q,z,R,j,B,F,V,W,G,K,X,J=t[6](t[9].id),Y=t[4].MODULES[t[9].id].label+"",Q=t[4].MODULES[t[9].id].actualNum+"",nt=xi(t[4].MODULES[t[9].id])+"",at=t[4].MODULES[t[9].id].description+"",lt=!t[4].MODULES[t[9].id].fyi&&ks(t);var ct=t[5][t[4].MODULES[t[9].id].banner];function dt(t){return{props:{moduleId:t[9].id}}}ct&&(a=A(ct,dt(t))),c=new bs({props:{date:t[4].MODULES[t[9].id].date,dateHide:t[4].MODULES[t[9].id].dateHide}});let ut=t[4].MODULES[t[9].id].fyi&&""!==t[4].MODULES[t[9].id].fyiText&&Cs(t),ht=J&&_s(t),pt=t[4].MODULES[t[9].id].engage&&!t[4].MODULES[t[9].id].fyi&&Ts(t);return{c(){e=v("div"),o=v("div"),r=v("div"),i=v("div"),lt&&lt.c(),s=w(),a&&rt(a.$$.fragment),l=w(),rt(c.$$.fragment),d=w(),ut&&ut.c(),u=w(),ht&&ht.c(),b=w(),x=v("div"),C=v("div"),E=v("div"),O=v("span"),L=new D(!1),T=w(),$=y(Q),M=w(),I=v("h3"),N=w(),U=v("div"),q=w(),z=v("div"),pt&&pt.c(),R=w(),j=v("div"),F=w(),S(i,"class","cc-card-banner-container svelte-19lirdr"),S(i,"data-moduleid",p=t[9].id),L.a=T,S(O,"class","cc-card-label svelte-19lirdr"),S(I,"class","cc-card-title svelte-19lirdr"),S(I,"data-moduleid",P=t[9].id),S(E,"class","cc-card-label svelte-19lirdr"),S(U,"class","cc-card-description svelte-19lirdr"),S(C,"class",H=h(t[4].MODULES[t[9].id].fyi?"cc-card-content":"cc-unclickable-card-content")+" svelte-19lirdr"),S(x,"class","cc-card-content-height svelte-19lirdr"),S(j,"class","cc-progress svelte-19lirdr"),S(z,"class","cc-card-footer svelte-19lirdr"),S(r,"class","cc-card-flex svelte-19lirdr"),S(o,"id",B="cc_module_"+t[9].id),S(o,"class","cc-card svelte-19lirdr"),S(e,"id",V="cc_module_"+t[9].id),S(e,"class",W=h(t[4].MODULES[t[9].id].fyi?"cc-unclickable-card":"cc-clickable-card")+" svelte-19lirdr")},m(t,n){m(t,e,n),f(e,o),f(o,r),f(r,i),lt&&lt.m(i,null),f(i,s),a&&it(a,i,null),f(i,l),it(c,i,null),f(i,d),ut&&ut.m(i,null),f(i,u),ht&&ht.m(i,null),f(r,b),f(r,x),f(x,C),f(C,E),f(E,O),L.m(Y,O),f(O,T),f(O,$),f(E,M),f(E,I),I.innerHTML=nt,f(C,N),f(C,U),U.innerHTML=at,f(r,q),f(r,z),pt&&pt.m(z,null),f(z,R),f(z,j),f(e,F),G=!0,K||(X=[k(e,"click",Rs,{once:!0}),k(e,"keydown",Rs,{once:!0})],K=!0)},p(t,n){t[4].MODULES[t[9].id].fyi?lt&&(lt.d(1),lt=null):lt?lt.p(t,n):(lt=ks(t),lt.c(),lt.m(i,s));const r={};if(8&n&&(r.moduleId=t[9].id),ct!==(ct=t[5][t[4].MODULES[t[9].id].banner])){if(a){Z();const t=a;ot(t.$$.fragment,1,0,(()=>{st(t,1)})),tt()}ct?(a=A(ct,dt(t)),rt(a.$$.fragment),et(a.$$.fragment,1),it(a,i,l)):a=null}else ct&&a.$set(r);const d={};24&n&&(d.date=t[4].MODULES[t[9].id].date),24&n&&(d.dateHide=t[4].MODULES[t[9].id].dateHide),c.$set(d),t[4].MODULES[t[9].id].fyi&&""!==t[4].MODULES[t[9].id].fyiText?ut?ut.p(t,n):(ut=Cs(t),ut.c(),ut.m(i,u)):ut&&(ut.d(1),ut=null),8&n&&(J=t[6](t[9].id)),J?ht?ht.p(t,n):(ht=_s(t),ht.c(),ht.m(i,null)):ht&&(ht.d(1),ht=null),(!G||8&n&&p!==(p=t[9].id))&&S(i,"data-moduleid",p),(!G||24&n)&&Y!==(Y=t[4].MODULES[t[9].id].label+"")&&L.p(Y),(!G||24&n)&&Q!==(Q=t[4].MODULES[t[9].id].actualNum+"")&&_($,Q),(!G||24&n)&&nt!==(nt=xi(t[4].MODULES[t[9].id])+"")&&(I.innerHTML=nt),(!G||8&n&&P!==(P=t[9].id))&&S(I,"data-moduleid",P),(!G||24&n)&&at!==(at=t[4].MODULES[t[9].id].description+"")&&(U.innerHTML=at),(!G||24&n&&H!==(H=h(t[4].MODULES[t[9].id].fyi?"cc-card-content":"cc-unclickable-card-content")+" svelte-19lirdr"))&&S(C,"class",H),t[4].MODULES[t[9].id].engage&&!t[4].MODULES[t[9].id].fyi?pt?pt.p(t,n):(pt=Ts(t),pt.c(),pt.m(z,R)):pt&&(pt.d(1),pt=null),(!G||8&n&&B!==(B="cc_module_"+t[9].id))&&S(o,"id",B),(!G||8&n&&V!==(V="cc_module_"+t[9].id))&&S(e,"id",V),(!G||24&n&&W!==(W=h(t[4].MODULES[t[9].id].fyi?"cc-unclickable-card":"cc-clickable-card")+" svelte-19lirdr"))&&S(e,"class",W)},i(t){G||(a&&et(a.$$.fragment,t),et(c.$$.fragment,t),G=!0)},o(t){a&&ot(a.$$.fragment,t),ot(c.$$.fragment,t),G=!1},d(t){t&&g(e),lt&&lt.d(),a&&st(a),st(c),ut&&ut.d(),ht&&ht.d(),pt&&pt.d(),K=!1,n(X)}}}function Ms(t){let e,o,n;return{c(){e=v("a"),o=y(" "),S(e,"class","claytons-card-link"),S(e,"href",n=wi(t[9].id)),S(e,"style","position:absolute;:width:100%;height:100%;top:0;left:0;z-index:1;text-decoration:none;")},m(t,n){m(t,e,n),f(e,o)},p(t,o){8&o&&n!==(n=wi(t[9].id))&&S(e,"href",n)},d(t){t&&g(e)}}}function Ds(t){let e,o;function n(t,e){return t[4].MODULES[t[9].id].fyiText?Is:As}let r=n(t),i=r(t);return{c(){e=v("div"),o=v("span"),i.c(),S(o,"class","claytons-fyi-text"),S(e,"class","claytons-card-fyi"),L(e,"position","absolute"),L(e,"background","rgba(0,0,0,0.75)"),L(e,"color","white"),L(e,"width","100%"),L(e,"padding","0.25rem"),L(e,"font-size","x-small"),L(e,"text-align","center")},m(t,n){m(t,e,n),f(e,o),i.m(o,null)},p(t,e){r===(r=n(t))&&i?i.p(t,e):(i.d(1),i=r(t),i&&(i.c(),i.m(o,null)))},d(t){t&&g(e),i.d()}}}function As(e){let o;return{c(){o=y(" ")},m(t,e){m(t,o,e)},p:t,d(t){t&&g(o)}}}function Is(t){let e,o,n=t[4].MODULES[t[9].id].fyiText+"";return{c(){e=new D(!1),o=x(),e.a=o},m(t,r){e.m(n,t,r),m(t,o,r)},p(t,o){24&o&&n!==(n=t[4].MODULES[t[9].id].fyiText+"")&&e.p(n)},d(t){t&&g(o),t&&e.d()}}}function Ps(t){let e,o,n;return{c(){e=v("a"),o=y(" "),S(e,"class","claytons-card-link"),S(e,"href",n=wi(t[9].id)),S(e,"style","position:absolute;:width:100%;height:100%;top:0;left:0;z-index:1;text-decoration:none;")},m(t,n){m(t,e,n),f(e,o)},p(t,o){8&o&&n!==(n=wi(t[9].id))&&S(e,"href",n)},d(t){t&&g(e)}}}function Ns(t){let e,o,n=xi(t[4].MODULES[t[9].id])+"";return{c(){e=new D(!1),o=x(),e.a=o},m(t,r){e.m(n,t,r),m(t,o,r)},p(t,o){24&o&&n!==(n=xi(t[4].MODULES[t[9].id])+"")&&e.p(n)},d(t){t&&g(o),t&&e.d()}}}function Us(t){let e,o,n=xi(t[4].MODULES[t[9].id])+"";return{c(){e=v("a"),S(e,"class","claytons-card-link"),S(e,"href",o=wi(t[9].id)),L(e,"text-decoration","none")},m(t,o){m(t,e,o),e.innerHTML=n},p(t,r){24&r&&n!==(n=xi(t[4].MODULES[t[9].id])+"")&&(e.innerHTML=n),8&r&&o!==(o=wi(t[9].id))&&S(e,"href",o)},d(t){t&&g(e)}}}function Hs(t){let e,o,n,r,i,s=t[4].MODULES[t[9].id].engageText+"";return{c(){e=v("div"),o=v("div"),n=v("a"),r=y(s),S(n,"href",i=wi(t[9].id)),S(n,"class","claytons-gu-engage"),L(n,"text-decoration","none"),S(o,"class","claytons-card-engage-button"),L(o,"float","right"),L(o,"position","relative"),L(o,"color","rgba(30,58,138,1)"),L(o,"border-radius","0.25rem"),L(o,"padding","0.5rem 1rem 0.5rem 1rem"),L(o,"border","1px solid rgba(30,58,138,1)"),S(e,"class","claytons-card-engage"),L(e,"padding-right","1rem")},m(t,i){m(t,e,i),f(e,o),f(o,n),f(n,r)},p(t,e){24&e&&s!==(s=t[4].MODULES[t[9].id].engageText+"")&&_(r,s),8&e&&i!==(i=wi(t[9].id))&&S(n,"href",i)},d(t){t&&g(e)}}}function qs(t){let e,o,n,r,i,s,a,l,c,d,u,h,p,b,x,k,C,E,O,T,$,M,I,P,N,U,H,q,z,R,j,B=t[4].MODULES[t[9].id].label+"",F=t[4].MODULES[t[9].id].actualNum+"",V=t[4].MODULES[t[9].id].description+"",W=!t[4].MODULES[t[9].id].fyi&&Ms(t);var G=t[5][t[4].MODULES[t[9].id].banner];function K(t){return{props:{moduleId:t[9].id,claytons:t[0]}}}G&&(s=A(G,K(t))),l=new bs({props:{date:t[4].MODULES[t[9].id].date,dateHide:t[4].MODULES[t[9].id].dateHide}});let X=t[4].MODULES[t[9].id].fyi&&""!==t[4].MODULES[t[9].id].fyiText&&Ds(t),J=!t[4].MODULES[t[9].id].fyi&&Ps(t);function Y(t,e){return t[4].MODULES[t[9].id].fyi?Ns:Us}let Q=Y(t),nt=Q(t),at=t[4].MODULES[t[9].id].engage&&!t[4].MODULES[t[9].id].fyi&&Hs(t);return{c(){e=v("div"),o=v("div"),n=v("div"),r=v("div"),W&&W.c(),i=w(),s&&rt(s.$$.fragment),a=w(),rt(l.$$.fragment),c=w(),X&&X.c(),u=w(),h=v("div"),J&&J.c(),p=w(),b=v("div"),x=v("div"),k=v("span"),C=new D(!1),E=w(),O=y(F),T=w(),$=v("h3"),nt.c(),I=w(),P=v("div"),U=w(),H=v("div"),at&&at.c(),z=w(),S(r,"class","claytons-card-banner-container"),S(r,"data-moduleid",d=t[9].id),L(r,"position","relative"),C.a=E,S(k,"class","claytons-card-label"),L(k,"font-size","0.9rem"),S($,"class","claytons-card-title"),S($,"data-moduleid",M=t[9].id),L($,"font-size","1rem"),L($,"font-weight","strong"),S(x,"class","claytons-card-label"),L(x,"font-size","0.9rem"),S(P,"class","claytons-card-description"),L(P,"font-size","0.75rem"),S(b,"class",N=t[4].MODULES[t[9].id].fyi?"claytons-card-content":"claytons-unclickable-card-content"),L(b,"padding","0.5rem"),L(b,"flex","1 1 0%"),L(b,"display","flex"),L(b,"flex-direction","column"),S(h,"class","claytons-card-content-height"),L(h,"height","12rem"),L(h,"overflow","auto"),L(h,"position","relative"),S(H,"class","claytons-card-footer"),L(H,"height","4rem"),L(H,"position","relative"),S(n,"class","claytons-card-flex"),L(n,"overflow","hidden"),L(n,"flex-direction","column"),L(n,"flex","1 1 0%"),L(n,"display","flex"),L(n,"position","relative"),L(n,"border-style","outset"),L(n,"border-radius","1em"),S(o,"id",q="cc_module_"+t[9].id),S(o,"class","claytons-card svelte-19lirdr"),L(o,"background-color","#fff"),L(o,"border-radius","1em"),S(e,"id",R="cc_module_"+t[9].id),L(e,"padding","0.75rem"),L(e,"flex-direction","column"),L(e,"display","flex"),L(e,"width","30%"),S(e,"class","svelte-19lirdr")},m(t,d){m(t,e,d),f(e,o),f(o,n),f(n,r),W&&W.m(r,null),f(r,i),s&&it(s,r,null),f(r,a),it(l,r,null),f(r,c),X&&X.m(r,null),f(n,u),f(n,h),J&&J.m(h,null),f(h,p),f(h,b),f(b,x),f(x,k),C.m(B,k),f(k,E),f(k,O),f(x,T),f(x,$),nt.m($,null),f(b,I),f(b,P),P.innerHTML=V,f(n,U),f(n,H),at&&at.m(H,null),f(e,z),j=!0},p(t,n){t[4].MODULES[t[9].id].fyi?W&&(W.d(1),W=null):W?W.p(t,n):(W=Ms(t),W.c(),W.m(r,i));const c={};if(8&n&&(c.moduleId=t[9].id),1&n&&(c.claytons=t[0]),G!==(G=t[5][t[4].MODULES[t[9].id].banner])){if(s){Z();const t=s;ot(t.$$.fragment,1,0,(()=>{st(t,1)})),tt()}G?(s=A(G,K(t)),rt(s.$$.fragment),et(s.$$.fragment,1),it(s,r,a)):s=null}else G&&s.$set(c);const u={};24&n&&(u.date=t[4].MODULES[t[9].id].date),24&n&&(u.dateHide=t[4].MODULES[t[9].id].dateHide),l.$set(u),t[4].MODULES[t[9].id].fyi&&""!==t[4].MODULES[t[9].id].fyiText?X?X.p(t,n):(X=Ds(t),X.c(),X.m(r,null)):X&&(X.d(1),X=null),(!j||8&n&&d!==(d=t[9].id))&&S(r,"data-moduleid",d),t[4].MODULES[t[9].id].fyi?J&&(J.d(1),J=null):J?J.p(t,n):(J=Ps(t),J.c(),J.m(h,p)),(!j||24&n)&&B!==(B=t[4].MODULES[t[9].id].label+"")&&C.p(B),(!j||24&n)&&F!==(F=t[4].MODULES[t[9].id].actualNum+"")&&_(O,F),Q===(Q=Y(t))&&nt?nt.p(t,n):(nt.d(1),nt=Q(t),nt&&(nt.c(),nt.m($,null))),(!j||8&n&&M!==(M=t[9].id))&&S($,"data-moduleid",M),(!j||24&n)&&V!==(V=t[4].MODULES[t[9].id].description+"")&&(P.innerHTML=V),(!j||24&n&&N!==(N=t[4].MODULES[t[9].id].fyi?"claytons-card-content":"claytons-unclickable-card-content"))&&S(b,"class",N),t[4].MODULES[t[9].id].engage&&!t[4].MODULES[t[9].id].fyi?at?at.p(t,n):(at=Hs(t),at.c(),at.m(H,null)):at&&(at.d(1),at=null),(!j||8&n&&q!==(q="cc_module_"+t[9].id))&&S(o,"id",q),(!j||8&n&&R!==(R="cc_module_"+t[9].id))&&S(e,"id",R)},i(t){j||(s&&et(s.$$.fragment,t),et(l.$$.fragment,t),j=!0)},o(t){s&&ot(s.$$.fragment,t),ot(l.$$.fragment,t),j=!1},d(t){t&&g(e),W&&W.d(),s&&st(s),st(l),X&&X.d(),J&&J.d(),nt.d(),at&&at.d()}}}function zs(t){let e,o,n,r;const i=[xs,ws],s=[];function a(t,e){return t[0]?0:1}return e=a(t),o=s[e]=i[e](t),{c(){o.c(),n=x()},m(t,o){s[e].m(t,o),m(t,n,o),r=!0},p(t,[r]){let l=e;e=a(t),e===l?s[e].p(t,r):(Z(),ot(s[l],1,1,(()=>{s[l]=null})),tt(),o=s[e],o?o.p(t,r):(o=s[e]=i[e](t),o.c()),et(o,1),o.m(n.parentNode,n))},i(t){r||(et(o),r=!0)},o(t){ot(o),r=!1},d(t){s[e].d(t),t&&g(n)}}}function Rs(t){let e=t.target.closest("div.cc-clickable-card");if(e){let t=e.querySelector("a.cc-card-link");t&&t.click()}}function js(t,e,o){let n,r;u(t,ca,(t=>o(4,n=t))),u(t,ua,(t=>o(2,r=t)));let{collection:i}=e,{claytons:s}=e;s||(s=!1);const a={image:ji,colour:Pi,iframe:$i};let l=c();function c(){return fi(i,s,n.COLLECTIONS[i].unallocated)}return t.$$set=t=>{"collection"in t&&o(1,i=t.collection),"claytons"in t&&o(0,s=t.claytons)},t.$$.update=()=>{if(6&t.$$.dirty&&i===r.currentCollection){r.currentCollectionChanged&&p(ua,r.currentCollectionChanged=!1,r),o(3,l=c())}},[s,i,r,l,n,a,function(t){return!!r.editMode&&(!n.MODULES[t].published||n.MODULES[t].collection!==i)}]}function Bs(t,e,o){const n=t.slice();return n[8]=e[o],n}function Fs(t,e,o){const n=t.slice();return n[8]=e[o],n}function Vs(t){let e,o,n,r,i,s,a,l,c,d,u,h,p,y=t[3]>0&&Gs(),x=t[4]>0&&Ks(),k=t[5],C=[];for(let e=0;e<k.length;e+=1)C[e]=Zs(Bs(t,k,e));return{c(){e=v("div"),o=v("table"),n=v("thead"),r=v("tr"),i=v("th"),i.innerHTML='<span class="cc-table-header-text svelte-1rwwqdv">Title</span>',s=w(),a=v("th"),a.innerHTML='<span class="cc-table-header-text svelte-1rwwqdv">Description</span>',l=w(),y&&y.c(),c=w(),d=v("th"),d.innerHTML='<span class="cc-table-header-text svelte-1rwwqdv">Due Date</span>',u=w(),x&&x.c(),h=w(),p=v("tbody");for(let t=0;t<C.length;t+=1)C[t].c();S(i,"role","columnheader"),S(i,"scope","col"),S(i,"class","svelte-1rwwqdv"),S(a,"role","columnheader"),S(a,"scope","col"),S(a,"class","svelte-1rwwqdv"),S(d,"role","columnheader"),S(d,"scope","col"),S(d,"class","svelte-1rwwqdv"),S(r,"role","row"),S(r,"class","svelte-1rwwqdv"),S(n,"role","rowgroup"),S(n,"class","svelte-1rwwqdv"),S(p,"class","svelte-1rwwqdv"),S(o,"class","cc-responsive-table svelte-1rwwqdv"),S(o,"role","table"),S(e,"id","cc-assessment-table"),S(e,"class","cc-assessment-container cc-representation svelte-1rwwqdv")},m(t,g){m(t,e,g),f(e,o),f(o,n),f(n,r),f(r,i),f(r,s),f(r,a),f(r,l),y&&y.m(r,null),f(r,c),f(r,d),f(r,u),x&&x.m(r,null),f(o,h),f(o,p);for(let t=0;t<C.length;t+=1)C[t].m(p,null)},p(t,e){if(t[3]>0?y||(y=Gs(),y.c(),y.m(r,c)):y&&(y.d(1),y=null),t[4]>0?x||(x=Ks(),x.c(),x.m(r,null)):x&&(x.d(1),x=null),126&e){let o;for(k=t[5],o=0;o<k.length;o+=1){const n=Bs(t,k,o);C[o]?C[o].p(n,e):(C[o]=Zs(n),C[o].c(),C[o].m(p,null))}for(;o<C.length;o+=1)C[o].d(1);C.length=k.length}},d(t){t&&g(e),y&&y.d(),x&&x.d(),b(C,t)}}}function Ws(t){let e,o,n,r,i,s,a,l,c,d,u,h,p,y=t[3]>0&&ta(),x=t[4]&&ea(),k=t[5],C=[];for(let e=0;e<k.length;e+=1)C[e]=sa(Fs(t,k,e));return{c(){e=v("div"),o=v("table"),n=v("thead"),r=v("tr"),i=v("th"),i.innerHTML='<span style="color: #ffffff;">Title</span>',s=w(),a=v("th"),a.innerHTML='<span style="color: #ffffff;">Description</span>',l=w(),y&&y.c(),c=w(),d=v("th"),d.innerHTML='<span style="color: #ffffff;">Due Date</span>',u=w(),x&&x.c(),h=w(),p=v("tbody");for(let t=0;t<C.length;t+=1)C[t].c();S(i,"role","columnheader"),S(i,"scope","col"),L(i,"background-color","#c02123"),S(a,"role","columnheader"),S(a,"scope","col"),L(a,"background-color","#c02123"),L(a,"width","20rem"),S(d,"role","columnheader"),S(d,"scope","col"),L(d,"background-color","#c02123"),S(p,"class","svelte-1rwwqdv"),S(o,"class","ic-Table--hover-row ic-Table ic-Table--striped -ic-Table-condensed"),S(e,"id","cc-assessment-table"),S(e,"class","svelte-1rwwqdv")},m(t,g){m(t,e,g),f(e,o),f(o,n),f(n,r),f(r,i),f(r,s),f(r,a),f(r,l),y&&y.m(r,null),f(r,c),f(r,d),f(r,u),x&&x.m(r,null),f(o,h),f(o,p);for(let t=0;t<C.length;t+=1)C[t].m(p,null)},p(t,e){if(t[3]>0?y||(y=ta(),y.c(),y.m(r,c)):y&&(y.d(1),y=null),t[4]?x||(x=ea(),x.c(),x.m(r,null)):x&&(x.d(1),x=null),127&e){let o;for(k=t[5],o=0;o<k.length;o+=1){const n=Fs(t,k,o);C[o]?C[o].p(n,e):(C[o]=sa(n),C[o].c(),C[o].m(p,null))}for(;o<C.length;o+=1)C[o].d(1);C.length=k.length}},d(t){t&&g(e),y&&y.d(),x&&x.d(),b(C,t)}}}function Gs(t){let e;return{c(){e=v("th"),e.innerHTML='<span class="cc-table-header-text svelte-1rwwqdv">Weighting</span>',S(e,"role","columnheader"),S(e,"scope","col"),S(e,"class","svelte-1rwwqdv")},m(t,o){m(t,e,o)},d(t){t&&g(e)}}}function Ks(t){let e;return{c(){e=v("th"),e.innerHTML='<span class="cc-table-header-text svelte-1rwwqdv">Learning Outcomes</span>',S(e,"role","columnheader"),S(e,"scope","col"),S(e,"class","svelte-1rwwqdv")},m(t,o){m(t,e,o)},d(t){t&&g(e)}}}function Xs(t){let e;return{c(){e=v("div"),e.textContent="Unpublished",S(e,"class","cc-published svelte-1rwwqdv")},m(t,o){m(t,e,o)},d(t){t&&g(e)}}}function Js(t){let e;return{c(){e=v("div"),e.textContent="No collection allocated",S(e,"class","cc-unallocated svelte-1rwwqdv")},m(t,o){m(t,e,o)},d(t){t&&g(e)}}}function Ys(t){let e,o,n,r,i,s,a=mi(t[6].MODULES[t[8].id],"weighting",t[2].editMode)+"";return{c(){e=v("td"),o=v("span"),o.textContent="Weighting",n=w(),r=v("div"),i=v("p"),s=y(a),S(o,"class","cc-responsive-table__heading svelte-1rwwqdv"),S(o,"aria-hidden","true"),S(i,"class","svelte-1rwwqdv"),S(r,"class","cc-table-cell-text svelte-1rwwqdv"),S(e,"role","cell"),S(e,"class","svelte-1rwwqdv")},m(t,a){m(t,e,a),f(e,o),f(e,n),f(e,r),f(r,i),f(i,s)},p(t,e){100&e&&a!==(a=mi(t[6].MODULES[t[8].id],"weighting",t[2].editMode)+"")&&_(s,a)},d(t){t&&g(e)}}}function Qs(t){let e,o,n,r,i,s,a=mi(t[6].MODULES[t[8].id],"learning outcomes",t[2].editMode)+"";return{c(){e=v("td"),o=v("span"),o.textContent="Learning Outcomes",n=w(),r=v("div"),i=v("p"),s=y(a),S(o,"class","cc-responsive-table__heading svelte-1rwwqdv"),S(o,"aria-hidden","true"),S(i,"class","svelte-1rwwqdv"),S(r,"class","cc-table-cell-text svelte-1rwwqdv"),S(e,"role","cell"),S(e,"class","svelte-1rwwqdv")},m(t,a){m(t,e,a),f(e,o),f(e,n),f(e,r),f(r,i),f(i,s)},p(t,e){100&e&&a!==(a=mi(t[6].MODULES[t[8].id],"learning outcomes",t[2].editMode)+"")&&_(s,a)},d(t){t&&g(e)}}}function Zs(t){let e,o,n,r,i,s,a,l,c,d,u,h,p,b,x,k,C,E,O,L,T,$,M,D,A,I,P,N=t[6].MODULES[t[8].id].name+"",U=t[6].MODULES[t[8].id].description+"",H=gi(t[6].MODULES[t[8].id])+"",q=t[2].editMode&&!t[6].MODULES[t[8].id].published&&Xs(),z=t[2].editMode&&t[6].MODULES[t[8].id].collection!==t[1]&&Js(),R=t[3]>0&&Ys(t),j=t[4]>0&&Qs(t);return{c(){e=v("tr"),o=v("td"),n=v("span"),n.textContent="Title",r=w(),i=v("div"),s=v("p"),a=v("a"),l=y(N),d=w(),u=v("td"),h=v("span"),h.textContent="Description",p=w(),q&&q.c(),b=w(),z&&z.c(),x=w(),k=v("div"),C=v("p"),E=w(),R&&R.c(),O=w(),L=v("td"),T=v("span"),T.textContent="Due Date",$=w(),M=v("div"),D=v("p"),A=y(H),I=w(),j&&j.c(),P=w(),S(n,"class","cc-responsive-table__heading svelte-1rwwqdv"),S(n,"aria-hidden","true"),S(a,"href",c=wi(t[8].id)),S(s,"class","svelte-1rwwqdv"),S(i,"class","cc-table-cell-text svelte-1rwwqdv"),S(o,"role","cell"),S(o,"class","svelte-1rwwqdv"),S(h,"class","cc-responsive-table__heading svelte-1rwwqdv"),S(h,"aria-hidden","true"),S(C,"class","svelte-1rwwqdv"),S(k,"class","cc-table-cell-text svelte-1rwwqdv"),S(u,"role","cell"),S(u,"class","descriptionCell svelte-1rwwqdv"),S(T,"class","cc-responsive-table__heading svelte-1rwwqdv"),S(T,"aria-hidden","true"),S(D,"class","svelte-1rwwqdv"),S(M,"class","cc-table-cell-text svelte-1rwwqdv"),S(L,"role","cell"),S(L,"class","svelte-1rwwqdv"),S(e,"role","row"),S(e,"class","svelte-1rwwqdv")},m(t,c){m(t,e,c),f(e,o),f(o,n),f(o,r),f(o,i),f(i,s),f(s,a),f(a,l),f(e,d),f(e,u),f(u,h),f(u,p),q&&q.m(u,null),f(u,b),z&&z.m(u,null),f(u,x),f(u,k),f(k,C),C.innerHTML=U,f(e,E),R&&R.m(e,null),f(e,O),f(e,L),f(L,T),f(L,$),f(L,M),f(M,D),f(D,A),f(e,I),j&&j.m(e,null),f(e,P)},p(t,o){96&o&&N!==(N=t[6].MODULES[t[8].id].name+"")&&_(l,N),32&o&&c!==(c=wi(t[8].id))&&S(a,"href",c),t[2].editMode&&!t[6].MODULES[t[8].id].published?q||(q=Xs(),q.c(),q.m(u,b)):q&&(q.d(1),q=null),t[2].editMode&&t[6].MODULES[t[8].id].collection!==t[1]?z||(z=Js(),z.c(),z.m(u,x)):z&&(z.d(1),z=null),96&o&&U!==(U=t[6].MODULES[t[8].id].description+"")&&(C.innerHTML=U),t[3]>0?R?R.p(t,o):(R=Ys(t),R.c(),R.m(e,O)):R&&(R.d(1),R=null),96&o&&H!==(H=gi(t[6].MODULES[t[8].id])+"")&&_(A,H),t[4]>0?j?j.p(t,o):(j=Qs(t),j.c(),j.m(e,P)):j&&(j.d(1),j=null)},d(t){t&&g(e),q&&q.d(),z&&z.d(),R&&R.d(),j&&j.d()}}}function ta(t){let e;return{c(){e=v("th"),e.innerHTML='<span style="color: #ffffff;">Weighting</span>',S(e,"role","columnheader"),S(e,"scope","col"),L(e,"background-color","#c02123")},m(t,o){m(t,e,o)},d(t){t&&g(e)}}}function ea(t){let e;return{c(){e=v("th"),e.innerHTML='<span style="color: #ffffff;">Learning Outcomes</span>',S(e,"role","columnheader"),S(e,"scope","col"),L(e,"background-color","#c02123")},m(t,o){m(t,e,o)},d(t){t&&g(e)}}}function oa(t){let e;return{c(){e=v("div"),e.textContent="Unpublished",S(e,"class","cc-published svelte-1rwwqdv")},m(t,o){m(t,e,o)},d(t){t&&g(e)}}}function na(t){let e;return{c(){e=v("div"),e.textContent="No collection allocated",S(e,"class","cc-unallocated svelte-1rwwqdv")},m(t,o){m(t,e,o)},d(t){t&&g(e)}}}function ra(t){let e,o,n,r,i=mi(t[6].MODULES[t[8].id],"weighting",t[2].editMode,t[0])+"";return{c(){e=v("td"),o=v("div"),n=v("p"),r=y(i),L(o,"margin","0"),L(o,"font-size","0.8rem"),S(e,"role","cell"),L(e,"display","table-cell"),L(e,"text-align","left"),L(e,"vertical-align","top"),S(e,"class","svelte-1rwwqdv")},m(t,i){m(t,e,i),f(e,o),f(o,n),f(n,r)},p(t,e){101&e&&i!==(i=mi(t[6].MODULES[t[8].id],"weighting",t[2].editMode,t[0])+"")&&_(r,i)},d(t){t&&g(e)}}}function ia(t){let e,o,n,r,i=mi(t[6].MODULES[t[8].id],"learning outcomes",t[2].editMode,t[0])+"";return{c(){e=v("td"),o=v("div"),n=v("p"),r=y(i),L(o,"margin","0"),L(o,"font-size","0.8rem"),S(e,"role","cell"),L(e,"display","table-cell"),L(e,"text-align","left"),L(e,"vertical-align","top"),S(e,"class","svelte-1rwwqdv")},m(t,i){m(t,e,i),f(e,o),f(o,n),f(n,r)},p(t,e){101&e&&i!==(i=mi(t[6].MODULES[t[8].id],"learning outcomes",t[2].editMode,t[0])+"")&&_(r,i)},d(t){t&&g(e)}}}function sa(t){let e,o,n,r,i,s,a,l,c,d,u,h,p,b,y,x,k,C,E,_=t[6].MODULES[t[8].id].name+"",O=t[6].MODULES[t[8].id].description+"",T=gi(t[6].MODULES[t[8].id])+"",$=t[2].editMode&&!t[0]&&!t[6].MODULES[t[8].id].published&&oa(),M=t[2].editMode&&!t[0]&&t[6].MODULES[t[8].id].collection!==t[1]&&na(),D=t[3]>0&&ra(t),A=t[4]&&ia(t);return{c(){e=v("tr"),o=v("td"),n=v("div"),r=v("p"),i=v("a"),a=w(),l=v("td"),$&&$.c(),c=w(),M&&M.c(),d=w(),u=v("div"),h=v("p"),p=w(),D&&D.c(),b=w(),y=v("td"),x=v("div"),k=v("p"),C=w(),A&&A.c(),E=w(),S(i,"href",s=wi(t[8].id)),L(n,"margin","0"),L(n,"font-size","0.8rem"),S(o,"role","cell"),L(o,"display","table-cell"),L(o,"text-align","left"),L(o,"vertical-align","top"),S(o,"class","svelte-1rwwqdv"),L(u,"margin","0"),L(u,"font-size","0.8rem"),S(l,"role","cell"),L(l,"display","table-cell"),L(l,"text-align","left"),L(l,"vertical-align","top"),S(l,"class","svelte-1rwwqdv"),L(x,"margin","0"),L(x,"font-size","0.8rem"),S(y,"role","cell"),L(y,"display","table-cell"),L(y,"text-align","left"),L(y,"vertical-align","top"),S(y,"class","svelte-1rwwqdv"),S(e,"class","svelte-1rwwqdv")},m(t,s){m(t,e,s),f(e,o),f(o,n),f(n,r),f(r,i),i.innerHTML=_,f(e,a),f(e,l),$&&$.m(l,null),f(l,c),M&&M.m(l,null),f(l,d),f(l,u),f(u,h),h.innerHTML=O,f(e,p),D&&D.m(e,null),f(e,b),f(e,y),f(y,x),f(x,k),k.innerHTML=T,f(e,C),A&&A.m(e,null),f(e,E)},p(t,o){96&o&&_!==(_=t[6].MODULES[t[8].id].name+"")&&(i.innerHTML=_),32&o&&s!==(s=wi(t[8].id))&&S(i,"href",s),!t[2].editMode||t[0]||t[6].MODULES[t[8].id].published?$&&($.d(1),$=null):$||($=oa(),$.c(),$.m(l,c)),t[2].editMode&&!t[0]&&t[6].MODULES[t[8].id].collection!==t[1]?M||(M=na(),M.c(),M.m(l,d)):M&&(M.d(1),M=null),96&o&&O!==(O=t[6].MODULES[t[8].id].description+"")&&(h.innerHTML=O),t[3]>0?D?D.p(t,o):(D=ra(t),D.c(),D.m(e,b)):D&&(D.d(1),D=null),96&o&&T!==(T=gi(t[6].MODULES[t[8].id])+"")&&(k.innerHTML=T),t[4]?A?A.p(t,o):(A=ia(t),A.c(),A.m(e,E)):A&&(A.d(1),A=null)},d(t){t&&g(e),$&&$.d(),M&&M.d(),D&&D.d(),A&&A.d()}}}function aa(e){let o;function n(t,e){return t[0]?Ws:Vs}let r=n(e),i=r(e);return{c(){i.c(),o=x()},m(t,e){i.m(t,e),m(t,o,e)},p(t,[e]){r===(r=n(t))&&i?i.p(t,e):(i.d(1),i=r(t),i&&(i.c(),i.m(o.parentNode,o)))},i:t,o:t,d(t){i.d(t),t&&g(o)}}}function la(t,e,o){let n,r;u(t,ca,(t=>o(6,n=t))),u(t,ua,(t=>o(2,r=t)));let{collection:i}=e,{claytons:s}=e;s||(s=!1);let a=0,l=0,c=d(i,s);function d(t,e){let r=fi(t,e,n.COLLECTIONS[t].unallocated);return r.forEach((t=>{n.MODULES[t.id].hasOwnProperty("metadata")&&n.MODULES[t.id].metadata.hasOwnProperty("weighting")&&""!==n.MODULES[t.id].metadata.weighting&&o(3,a++,a),n.MODULES[t.id].hasOwnProperty("metadata")&&n.MODULES[t.id].metadata.hasOwnProperty("learning outcomes")&&""!==n.MODULES[t.id].metadata["learning outcomes"]&&o(4,l++,l)})),r}return t.$$set=t=>{"collection"in t&&o(1,i=t.collection),"claytons"in t&&o(0,s=t.claytons)},t.$$.update=()=>{if(7&t.$$.dirty&&i===r.currentCollection){r.currentCollectionChanged&&p(ua,r.currentCollectionChanged=!1,r),o(5,c=d(i,s))}},[s,i,r,a,l,c,n]}const ca=ut({}),da=ut([]),ua=ut({}),ha=ut({GriffithCards:class extends ct{constructor(t){super(),lt(this,t,js,zs,i,{collection:1,claytons:0})}},CollectionOnly:class extends ct{constructor(t){super(),lt(this,t,null,null,i,{})}},AssessmentTable:class extends ct{constructor(t){super(),lt(this,t,la,aa,i,{collection:1,claytons:0})}}});function pa(t,e,o){const n=t.slice();return n[16]=e[o],n}function fa(t,e,o){const n=t.slice();return n[16]=e[o],n}function ma(t,e,o){const n=t.slice();return n[21]=e[o],n}function ga(e){let o;return{c(){o=v("sl-tab"),o.textContent=`Imported modules matched (n=${e[6]})`,E(o,"slot","nav"),E(o,"panel","importedMatched")},m(t,e){m(t,o,e)},p:t,d(t){t&&g(o)}}}function ba(e){let o;return{c(){o=v("sl-tab"),o.textContent="Imported modules matched (n=0})",E(o,"slot","nav"),E(o,"panel","importedMatched"),E(o,"disabled","")},m(t,e){m(t,o,e)},p:t,d(t){t&&g(o)}}}function va(e){let o;return{c(){o=v("sl-tab"),o.textContent=`Imported modules not matched (n=${e[8].length-e[6]})`,E(o,"slot","nav"),E(o,"panel","importedNotMatched")},m(t,e){m(t,o,e)},p:t,d(t){t&&g(o)}}}function ya(e){let o;return{c(){o=v("sl-tab"),o.textContent="Imported modules not matched (n=0)",E(o,"slot","nav"),E(o,"panel","importedNotMatched"),E(o,"disabled","")},m(t,e){m(t,o,e)},p:t,d(t){t&&g(o)}}}function wa(e){let o;return{c(){o=v("sl-tab"),o.textContent=`Current modules not matched (n=${currentModuleIds.length-e[7]})`,E(o,"slot","nav"),E(o,"panel","currentNotMatched")},m(t,e){m(t,o,e)},p:t,d(t){t&&g(o)}}}function xa(e){let o;return{c(){o=v("sl-tab"),o.textContent="Current modules not matched (n=0)",E(o,"slot","nav"),E(o,"panel","currentNotMatched"),E(o,"disabled","")},m(t,e){m(t,o,e)},p:t,d(t){t&&g(o)}}}function ka(t){let e,o=t[9][t[21]].matched&&function(t){let e,o,n,r,i,s,a,l,c,d,u=t[2].collections.MODULES[t[21]].name+"",h=t[3][t[9][t[21]].currentModuleId].name+"";return{c(){e=v("tr"),o=v("td"),n=v("a"),r=y(u),s=w(),a=v("a"),l=y(h),d=w(),S(n,"target","_blank"),S(n,"rel","noreferrer"),S(n,"href",i="/courses/"+t[1]+"/modules/#module_"+t[21]),S(o,"class","svelte-o99kza"),S(a,"target","_blank"),S(a,"rel","noreferrer"),S(a,"href",c="/courses/"+t[0]+"/modules/#module_"+t[9][t[21]].currentModuleId),S(e,"class","svelte-o99kza")},m(t,i){m(t,e,i),f(e,o),f(o,n),f(n,r),f(e,s),f(e,a),f(a,l),f(e,d)},p(t,e){4&e&&u!==(u=t[2].collections.MODULES[t[21]].name+"")&&_(r,u),2&e&&i!==(i="/courses/"+t[1]+"/modules/#module_"+t[21])&&S(n,"href",i),8&e&&h!==(h=t[3][t[9][t[21]].currentModuleId].name+"")&&_(l,h),1&e&&c!==(c="/courses/"+t[0]+"/modules/#module_"+t[9][t[21]].currentModuleId)&&S(a,"href",c)},d(t){t&&g(e)}}}(t);return{c(){o&&o.c(),e=x()},m(t,n){o&&o.m(t,n),m(t,e,n)},p(t,e){t[9][t[21]].matched&&o.p(t,e)},d(t){o&&o.d(t),t&&g(e)}}}function Ca(e){let o,n=!e[16].matched&&function(e){let o,n,r=e[16].importedModuleId+"";return{c(){o=v("p"),n=y(r)},m(t,e){m(t,o,e),f(o,n)},p:t,d(t){t&&g(o)}}}(e);return{c(){n&&n.c(),o=x()},m(t,e){n&&n.m(t,e),m(t,o,e)},p(t,e){t[16].matched||n.p(t,e)},d(t){n&&n.d(t),t&&g(o)}}}function Sa(e){let o,n=!e[16].matched&&function(e){let o,n,r=e[16].currentModuleId+"";return{c(){o=v("p"),n=y(r)},m(t,e){m(t,o,e),f(o,n)},p:t,d(t){t&&g(o)}}}(e);return{c(){n&&n.c(),o=x()},m(t,e){n&&n.m(t,e),m(t,o,e)},p(t,e){t[16].matched||n.p(t,e)},d(t){n&&n.d(t),t&&g(o)}}}function Ea(e){let o,n,r,i,s,a,l,c,d,u,h=e[4]!==e[5]&&function(e){let o,n,r,i,s,a;return{c(){o=v("p"),o.textContent="Warning: the number of modules does not match:",n=w(),r=v("ol"),i=v("li"),i.textContent=`# current modules: ${e[4]}`,s=w(),a=v("li"),a.textContent=`# import modules: ${e[5]}`},m(t,e){m(t,o,e),m(t,n,e),m(t,r,e),f(r,i),f(r,s),f(r,a)},p:t,d(t){t&&g(o),t&&g(n),t&&g(r)}}}(e);let p=function(t,e){return 0===t[6]?ba:ga}(e),y=p(e);let x=function(t,e){return t[5]-t[6]==0?ya:va}(e),k=x(e);let C=function(t,e){return 0!==t[7]?xa:wa}(e),_=C(e),O=e[6]>0&&function(t){let e,o,n,r=t[8],i=[];for(let e=0;e<r.length;e+=1)i[e]=ka(ma(t,r,e));return{c(){e=v("table"),o=v("tr"),o.innerHTML="<th>Imported module</th> \n          <th>Current Module</th>",n=w();for(let t=0;t<i.length;t+=1)i[t].c();S(o,"class","svelte-o99kza"),S(e,"class","cc-import-table svelte-o99kza")},m(t,r){m(t,e,r),f(e,o),f(e,n);for(let t=0;t<i.length;t+=1)i[t].m(e,null)},p(t,o){if(783&o){let n;for(r=t[8],n=0;n<r.length;n+=1){const s=ma(t,r,n);i[n]?i[n].p(s,o):(i[n]=ka(s),i[n].c(),i[n].m(e,null))}for(;n<i.length;n+=1)i[n].d(1);i.length=r.length}},d(t){t&&g(e),b(i,t)}}}(e),L=Object.values(e[9]),T=[];for(let t=0;t<L.length;t+=1)T[t]=Ca(fa(e,L,t));let $=Object.values(e[10]),M=[];for(let t=0;t<$.length;t+=1)M[t]=Sa(pa(e,$,t));return{c(){h&&h.c(),o=w(),n=v("sl-tab-group"),y.c(),r=w(),k.c(),i=w(),_.c(),s=w(),a=v("sl-tab-panel"),O&&O.c(),l=w(),c=v("sl-tab-panel");for(let t=0;t<T.length;t+=1)T[t].c();d=w(),u=v("sl-tab-panel");for(let t=0;t<M.length;t+=1)M[t].c();E(a,"name","importedMatched"),E(c,"name","importedNotMatched"),E(u,"name","currentNotMatched")},m(t,e){h&&h.m(t,e),m(t,o,e),m(t,n,e),y.m(n,null),f(n,r),k.m(n,null),f(n,i),_.m(n,null),f(n,s),f(n,a),O&&O.m(a,null),f(n,l),f(n,c);for(let t=0;t<T.length;t+=1)T[t].m(c,null);f(n,d),f(n,u);for(let t=0;t<M.length;t+=1)M[t].m(u,null)},p(t,[e]){if(t[4]!==t[5]&&h.p(t,e),y.p(t,e),k.p(t,e),_.p(t,e),t[6]>0&&O.p(t,e),512&e){let o;for(L=Object.values(t[9]),o=0;o<L.length;o+=1){const n=fa(t,L,o);T[o]?T[o].p(n,e):(T[o]=Ca(n),T[o].c(),T[o].m(c,null))}for(;o<T.length;o+=1)T[o].d(1);T.length=L.length}if(1024&e){let o;for($=Object.values(t[10]),o=0;o<$.length;o+=1){const n=pa(t,$,o);M[o]?M[o].p(n,e):(M[o]=Sa(n),M[o].c(),M[o].m(u,null))}for(;o<M.length;o+=1)M[o].d(1);M.length=$.length}},i:t,o:t,d(t){h&&h.d(t),t&&g(o),t&&g(n),y.d(),k.d(),_.d(),O&&O.d(),b(T,t),b(M,t)}}}function _a(t,e,o){let n;u(t,da,(t=>o(12,n=t)));let{modulesCompleteStatus:r=!1}=e,{currentCourseId:i=null}=e,{importCourseId:s=null}=e,{collectionsDetails:a=null}=e,l={};n.forEach((t=>{o(3,l[t.id]=t,l)})),a.initialiseModules(n),a.matchModuleNames(n);let c=a.getNumCurrentModules(),d=a.getNumImportedModules(),h=a.getNumImportsMatched(),p=a.getNumCurrentMatched();const f=a.getImportedModuleIds(),m=a.getImportModuleDetails(),g=a.getCurrentModuleDetails();let b=h===a.getNumImportedModules()?"disabled":"",v=a.getNumImportedModules()-h==0?"disabled":"";return a.getNumCurrentMatched(),!b&&v&&disableCurrentNotMatched&&(r=!0),r=!0,t.$$set=t=>{"modulesCompleteStatus"in t&&o(11,r=t.modulesCompleteStatus),"currentCourseId"in t&&o(0,i=t.currentCourseId),"importCourseId"in t&&o(1,s=t.importCourseId),"collectionsDetails"in t&&o(2,a=t.collectionsDetails)},[i,s,a,l,c,d,h,p,f,m,g,r]}class Oa extends ct{constructor(t){super(),lt(this,t,_a,Ea,i,{modulesCompleteStatus:11,currentCourseId:0,importCourseId:1,collectionsDetails:2})}}function La(t,e,o){const n=t.slice();return n[10]=e[o],n}function Ta(t){let e,o=t[1],n=[];for(let e=0;e<o.length;e+=1)n[e]=Ma(La(t,o,e));return{c(){for(let t=0;t<n.length;t+=1)n[t].c();e=x()},m(t,o){for(let e=0;e<n.length;e+=1)n[e].m(t,o);m(t,e,o)},p(t,r){if(2&r){let i;for(o=t[1],i=0;i<o.length;i+=1){const s=La(t,o,i);n[i]?n[i].p(s,r):(n[i]=Ma(s),n[i].c(),n[i].m(e.parentNode,e))}for(;i<n.length;i+=1)n[i].d(1);n.length=o.length}},d(t){b(n,t),t&&g(e)}}}function $a(e){let o;return{c(){o=v("tr"),o.innerHTML='<td colspan="5" class="svelte-vcb9m3"><sl-spinner class="svelte-vcb9m3"></sl-spinner></td>',S(o,"class","svelte-vcb9m3")},m(t,e){m(t,o,e)},p:t,d(t){t&&g(o)}}}function Ma(e){let o,n,r,i,s,a,l,c,d,u,h,p,b,x,k,C,E=e[10].moduleName+"",_=e[10].display_name+"",O=e[10].size+"",L=e[10]["content-type"]+"",T=e[10].courseImage&&function(t){let e;return{c(){e=v("td"),e.innerHTML='<sl-icon name="check-circle"></sl-icon>',S(e,"class","cc-success svelte-vcb9m3")},m(t,o){m(t,e,o)},d(t){t&&g(e)}}}(),$=e[10].otherCourse&&function(t){let e;return{c(){e=v("td"),e.innerHTML='<sl-icon name="exclamation-triangle"></sl-icon> Other course',S(e,"class","cc-error svelte-vcb9m3")},m(t,o){m(t,e,o)},d(t){t&&g(e)}}}();return{c(){o=v("tr"),T&&T.c(),n=w(),$&&$.c(),r=w(),i=v("td"),s=y(E),a=w(),l=v("td"),c=v("a"),d=y(_),u=w(),h=v("td"),p=y(O),b=w(),x=v("td"),k=y(L),C=w(),S(i,"class","svelte-vcb9m3"),S(c,"href",e[10].src),S(c,"target","_blank"),S(c,"rel","noreferrer"),S(l,"class","svelte-vcb9m3"),S(h,"class","svelte-vcb9m3"),S(x,"class","svelte-vcb9m3"),S(o,"class","svelte-vcb9m3")},m(t,e){m(t,o,e),T&&T.m(o,null),f(o,n),$&&$.m(o,null),f(o,r),f(o,i),f(i,s),f(o,a),f(o,l),f(l,c),f(c,d),f(o,u),f(o,h),f(h,p),f(o,b),f(o,x),f(x,k),f(o,C)},p:t,d(t){t&&g(o),T&&T.d(),$&&$.d()}}}function Da(e){let o,n,r;function i(t,e){return t[0]?Ta:$a}let s=i(e),a=s(e);return{c(){o=v("table"),n=v("tr"),n.innerHTML="<th>Status</th> \n    <th>Module Name</th> \n    <th>Image</th> \n    <th>Size</th> \n    <th>Type</th>",r=w(),a.c(),S(n,"class","svelte-vcb9m3"),S(o,"class","cc-import-table svelte-vcb9m3")},m(t,e){m(t,o,e),f(o,n),f(o,r),a.m(o,null)},p(t,[e]){s===(s=i(t))&&a?a.p(t,e):(a.d(1),a=s(t),a&&(a.c(),a.m(o,null)))},i:t,o:t,d(t){t&&g(o),a.d()}}}function Aa(t,e,o){let{imagesCompleteStatus:n=!1}=e,{currentCourseId:r}=e,{importCourseId:i}=e,{collectionsDetails:s}=e,a=!1,l=0;const c=document.location.hostname,d=`https://${c}/api/v1`;let u=s.getImportedImages();return u.forEach((t=>{t.otherCourse=null;let e=t.src;const n=new RegExp(`${c}/courses/([0-9]+)/files/([0-9]+)/`);let i=e.match(n);if(i){const e=i[1];t.fileId=i[2],t.courseImage=!0,e!==r?t.otherCourse=parseInt(e):$t(`${d}/courses/${r}/files/${t.fileId}`).then((e=>{200===e.status&&(["size","content-type","display_name"].forEach((o=>{t[o]=e.body[o]})),t.details=!0),o(6,l++,l)}))}else t.courseImage=!1})),t.$$set=t=>{"imagesCompleteStatus"in t&&o(2,n=t.imagesCompleteStatus),"currentCourseId"in t&&o(3,r=t.currentCourseId),"importCourseId"in t&&o(4,i=t.importCourseId),"collectionsDetails"in t&&o(5,s=t.collectionsDetails)},t.$$.update=()=>{65&t.$$.dirty&&(o(0,a=l===u.length),a&&o(2,n=!0))},[a,u,n,r,i,s,l]}class Ia extends ct{constructor(t){super(),lt(this,t,Aa,Da,i,{imagesCompleteStatus:2,currentCourseId:3,importCourseId:4,collectionsDetails:5})}}function Pa(t){let e;return{c(){e=v("sl-spinner")},m(t,o){m(t,e,o)},d(t){t&&g(e)}}}function Na(t){let e;return{c(){e=v("sl-badge"),e.textContent="Ok",E(e,"variant","success")},m(t,o){m(t,e,o)},d(t){t&&g(e)}}}function Ua(t){let e;return{c(){e=v("sl-spinner")},m(t,o){m(t,e,o)},d(t){t&&g(e)}}}function Ha(t){let e;return{c(){e=v("sl-badge"),e.textContent="Ok",E(e,"variant","success")},m(t,o){m(t,e,o)},d(t){t&&g(e)}}}function qa(t){let e,o,n,r,i,s,a=t[3].course_code+"",l=t[3].name+"";return{c(){e=y("(\r\n              "),o=v("a"),n=y(a),r=y(" - "),i=y(l),s=y("\r\n              )\r\n            "),S(o,"href","/courses/"+t[5]+"/"),S(o,"target","_blank"),S(o,"rel","noreferrer")},m(t,a){m(t,e,a),m(t,o,a),f(o,n),f(o,r),f(o,i),m(t,s,a)},p(t,e){8&e&&a!==(a=t[3].course_code+"")&&_(n,a),8&e&&l!==(l=t[3].name+"")&&_(i,l)},d(t){t&&g(e),t&&g(o),t&&g(s)}}}function za(t){let e,o,r,i,s,a,l,c,d,u,h,p,b,x,C,_,O,T,$,M,D,A,I,P,N,U,H,q,R,j,B,F,V,G,K,X,J,Y,Q,Z,tt,at,lt,ct,dt,ut,ht,pt,ft,mt,gt,bt,vt,yt,wt,xt,kt,Ct,St,Et,_t,Ot,Lt,Tt,$t,Mt,Dt,At,It,Pt,Nt,Ut,Ht,qt,zt,Rt,jt,Bt,Ft,Vt=t[7].summary.tooltip+"",Wt=t[7].modules.tooltip+"",Gt=t[7].images.tooltip+"",Kt=t[7].proceed.tooltip+"",Xt=t[7].cancel.tooltip+"",Jt=t[7].refresh.tooltip+"";function Yt(t,e){return t[1]?Na:Pa}let Qt=Yt(t),Zt=Qt(t);function te(t,e){return t[2]?Ha:Ua}let ee=te(t),oe=ee(t),ne=t[3]&&qa(t);function re(e){t[14](e)}let ie={currentCourseId:t[4],importCourseId:t[5],collectionsDetails:t[0]};function se(e){t[15](e)}void 0!==t[1]&&(ie.modulesCompleteStatus=t[1]),Nt=new Oa({props:ie}),z.push((()=>nt(Nt,"modulesCompleteStatus",re,t[1])));let ae={currentCourseId:t[4],importCourseId:t[5],collectionsDetails:t[0]};return void 0!==t[2]&&(ae.imagesCompleteStatus=t[2]),zt=new Ia({props:ae}),z.push((()=>nt(zt,"imagesCompleteStatus",se,t[2]))),{c(){e=v("sl-dialog"),o=v("div"),r=v("sl-tab-group"),i=v("sl-tab"),s=v("sl-tooltip"),a=v("div"),l=w(),c=v("a"),d=v("i"),u=y("   Summary"),h=w(),p=v("sl-tab"),b=v("sl-tooltip"),x=v("div"),C=w(),_=v("a"),O=v("i"),T=y("\r\n          Modules  \r\n        "),Zt.c(),$=w(),M=v("sl-tab"),D=v("sl-tooltip"),A=v("div"),I=w(),P=v("a"),N=v("i"),U=y("\r\n          Images  \r\n        "),oe.c(),H=w(),q=v("sl-tab-panel"),R=v("div"),j=v("p"),B=v("a"),F=y("Collections configuration page"),V=y("\r\n            has been imported from another course\r\n            "),ne&&ne.c(),G=y(". Check the status and details here and choose whether to"),K=w(),X=v("ul"),J=v("li"),Y=v("sl-tooltip"),Q=v("div"),Z=w(),tt=v("a"),at=v("i"),lt=y("\r\n                Proceed"),ct=w(),dt=v("li"),ut=v("sl-tooltip"),ht=v("div"),pt=w(),ft=v("a"),mt=v("i"),gt=y("\r\n                Cancel"),bt=w(),vt=v("li"),yt=v("sl-tooltip"),wt=v("div"),xt=w(),kt=v("a"),Ct=v("i"),St=y("\r\n                Refresh"),Et=w(),_t=v("div"),Ot=v("sl-button"),Ot.textContent="Proceed",Lt=w(),Tt=v("sl-button"),Tt.textContent="Cancel",$t=w(),Mt=v("sl-button"),Mt.textContent="Refresh",Dt=w(),At=v("p"),It=w(),Pt=v("sl-tab-panel"),rt(Nt.$$.fragment),Ht=w(),qt=v("sl-tab-panel"),rt(zt.$$.fragment),S(a,"slot","content"),S(d,"class","icon-question cc-module-icon"),S(c,"target","_blank"),S(c,"rel","noreferrer"),S(c,"href",t[7].summary.url),E(i,"slot","nav"),E(i,"panel","summary"),S(x,"slot","content"),S(O,"class","icon-question cc-module-icon"),S(_,"target","_blank"),S(_,"rel","noreferrer"),S(_,"href",t[7].modules.url),E(p,"slot","nav"),E(p,"panel","modules"),S(A,"slot","content"),S(N,"class","icon-question cc-module-icon"),S(P,"target","_blank"),S(P,"rel","noreferrer"),S(P,"href",t[7].images.url),E(M,"slot","nav"),E(M,"panel","images"),S(B,"href","/courses/"+t[4]+"/pages/canvas-collections-configuration"),S(B,"target","_blank"),S(B,"rel","noreferrer"),S(Q,"slot","content"),S(at,"class","icon-question cc-module-icon"),S(tt,"target","_blank"),S(tt,"rel","noreferrer"),S(tt,"href",t[7].proceed.url),S(J,"class","svelte-1jkvh5a"),S(ht,"slot","content"),S(mt,"class","icon-question cc-module-icon"),S(ft,"target","_blank"),S(ft,"rel","noreferrer"),S(ft,"href",t[7].cancel.url),S(dt,"class","svelte-1jkvh5a"),S(wt,"slot","content"),S(Ct,"class","icon-question cc-module-icon"),S(kt,"target","_blank"),S(kt,"rel","noreferrer"),S(kt,"href",t[7].refresh.url),S(vt,"class","svelte-1jkvh5a"),S(X,"class","cc-horizontal-list svelte-1jkvh5a"),E(Ot,"slot","footer"),E(Ot,"variant","success"),E(Ot,"type","submit"),E(Tt,"slot","footer"),E(Tt,"variant","warning"),E(Tt,"type","submit"),E(Mt,"slot","footer"),E(Mt,"variant","danger"),E(Mt,"type","submit"),S(_t,"class","cc-footer svelte-1jkvh5a"),S(R,"class","cc-import-intro svelte-1jkvh5a"),E(q,"name","summary"),E(Pt,"name","modules"),E(qt,"name","images"),E(r,"placement","start"),S(o,"class","cc-process-import svelte-1jkvh5a"),E(e,"class","cc-dialog svelte-1jkvh5a"),L(e,"--width","75vw"),E(e,"label","How to proceed with the import of Canvas Collections configuration?"),E(e,"open","")},m(n,g){m(n,e,g),f(e,o),f(o,r),f(r,i),f(i,s),f(s,a),a.innerHTML=Vt,f(s,l),f(s,c),f(c,d),f(i,u),f(r,h),f(r,p),f(p,b),f(b,x),x.innerHTML=Wt,f(b,C),f(b,_),f(_,O),f(p,T),Zt.m(p,null),f(r,$),f(r,M),f(M,D),f(D,A),A.innerHTML=Gt,f(D,I),f(D,P),f(P,N),f(M,U),oe.m(M,null),f(r,H),f(r,q),f(q,R),f(R,j),f(j,B),f(B,F),f(j,V),ne&&ne.m(j,null),f(j,G),f(R,K),f(R,X),f(X,J),f(J,Y),f(Y,Q),Q.innerHTML=Kt,f(Y,Z),f(Y,tt),f(tt,at),f(J,lt),f(X,ct),f(X,dt),f(dt,ut),f(ut,ht),ht.innerHTML=Xt,f(ut,pt),f(ut,ft),f(ft,mt),f(dt,gt),f(X,bt),f(X,vt),f(vt,yt),f(yt,wt),wt.innerHTML=Jt,f(yt,xt),f(yt,kt),f(kt,Ct),f(vt,St),f(R,Et),f(R,_t),f(_t,Ot),f(_t,Lt),f(_t,Tt),f(_t,$t),f(_t,Mt),f(q,Dt),f(q,At),f(r,It),f(r,Pt),it(Nt,Pt,null),f(r,Ht),f(r,qt),it(zt,qt,null),jt=!0,Bt||(Ft=[k(Ot,"click",t[8]),k(Ot,"keydown",t[9]),k(Tt,"click",t[10]),k(Tt,"keydown",t[11]),k(Mt,"click",t[12]),k(Mt,"keydown",t[13])],Bt=!0)},p(t,[e]){Qt!==(Qt=Yt(t))&&(Zt.d(1),Zt=Qt(t),Zt&&(Zt.c(),Zt.m(p,null))),ee!==(ee=te(t))&&(oe.d(1),oe=ee(t),oe&&(oe.c(),oe.m(M,null))),t[3]?ne?ne.p(t,e):(ne=qa(t),ne.c(),ne.m(j,G)):ne&&(ne.d(1),ne=null);const o={};1&e&&(o.collectionsDetails=t[0]),!Ut&&2&e&&(Ut=!0,o.modulesCompleteStatus=t[1],W((()=>Ut=!1))),Nt.$set(o);const n={};1&e&&(n.collectionsDetails=t[0]),!Rt&&4&e&&(Rt=!0,n.imagesCompleteStatus=t[2],W((()=>Rt=!1))),zt.$set(n)},i(t){jt||(et(Nt.$$.fragment,t),et(zt.$$.fragment,t),jt=!0)},o(t){ot(Nt.$$.fragment,t),ot(zt.$$.fragment,t),jt=!1},d(t){t&&g(e),Zt.d(),oe.d(),ne&&ne.d(),st(Nt),st(zt),Bt=!1,n(Ft)}}}function Ra(t,e,o){let n;u(t,ua,(t=>o(17,n=t)));let{collectionsDetails:r}=e;const i=`https://${document.location.hostname}/api/v1`;let s,a,l=n.courseId,c=r.getImportedCourseId(),d=null;function h(t){document.querySelector(".cc-dialog").remove(),p(ua,n.migrationOutcome=t,n)}$t(`${i}/courses/${l}`).then((t=>{t.status})),$t(`${i}/courses/${c}`).then((t=>{200===t.status&&o(3,d=t.body)}));const f={copy:{tooltip:"<p>Collections configuration copied from another course will need to be modified.</p>",url:"https://djplaner.github.io/canvas-collections/walk-throughs/course-copy/process/"},summary:{tooltip:"<p>What was found? What might you do next?",url:"https://djplaner.github.io/canvas-collections/walk-throughs/course-copy/process/"},modules:{tooltip:"<p>Changes required for module configuration in Collections</p>",url:"https://djplaner.github.io/canvas-collections/walk-throughs/course-copy/process/#modules"},images:{tooltip:"<p>Status of any course-based module module images in Collections configuration</p>",url:"https://djplaner.github.io/canvas-collections/walk-throughs/course-copy/process/#images"},proceed:{tooltip:"<p>Collections will update its configuration and you can proceed using Canvas Collections</p>",url:"https://djplaner.github.io/canvas-collections/walk-throughs/course-copy/process/#proceed"},cancel:{tooltip:'<p>Cancel the import, return to the course make any changes, and then recommence the import.</p>\n\t  <p><sl-icon name="info-circle"></sl-icon> You cannot use Collections in this courses until the migration process\n\t\tis complete.</p>',url:"https://djplaner.github.io/canvas-collections/walk-throughs/course-copy/process/#cancel"},refresh:{tooltip:"<p>Refresh Collections configuration to a blank state. Allowing you to start fresh \n\t\t\tand use the Collections interface to customise design for the new course.</p>",url:"https://djplaner.github.io/canvas-collections/walk-throughs/course-copy/process/#refresh"}};return t.$$set=t=>{"collectionsDetails"in t&&o(0,r=t.collectionsDetails)},[r,s,a,d,l,c,h,f,()=>h("proceed"),()=>h("proceed"),()=>h("cancel"),()=>h("cancel"),()=>h("refresh"),()=>h("refresh"),function(t){s=t,o(1,s)},function(t){a=t,o(2,a)}]}class ja extends ct{constructor(t){super(),lt(this,t,Ra,za,i,{collectionsDetails:0})}}function Ba(t){let e,o,n,r;function i(e){t[6](e)}var s=t[2];function a(t){let e={claytons:t[1]};return void 0!==t[0]&&(e.collection=t[0]),{props:e}}return s&&(e=A(s,a(t)),z.push((()=>nt(e,"collection",i,t[0])))),{c(){e&&rt(e.$$.fragment),n=x()},m(t,o){e&&it(e,t,o),m(t,n,o),r=!0},p(t,[r]){const l={};if(2&r&&(l.claytons=t[1]),!o&&1&r&&(o=!0,l.collection=t[0],W((()=>o=!1))),s!==(s=t[2])){if(e){Z();const t=e;ot(t.$$.fragment,1,0,(()=>{st(t,1)})),tt()}s?(e=A(s,a(t)),z.push((()=>nt(e,"collection",i,t[0]))),rt(e.$$.fragment),et(e.$$.fragment,1),it(e,n.parentNode,n)):e=null}else s&&e.$set(l)},i(t){r||(e&&et(e.$$.fragment,t),r=!0)},o(t){e&&ot(e.$$.fragment,t),r=!1},d(t){t&&g(n),e&&st(e,t)}}}function Fa(t,e,o){let n,r,i;u(t,ua,(t=>o(3,n=t))),u(t,ca,(t=>o(4,r=t))),u(t,ha,(t=>o(5,i=t)));let s,{collectionName:a}=e,{claytons:l}=e;if(l||(l=!1),console.log(`---------- CollectionRepresentation.svelte: collectionName=${a} claytons=${l} ----------`),!a)throw new Error("CollectionRepresentation component requires a collection prop");return t.$$set=t=>{"collectionName"in t&&o(0,a=t.collectionName),"claytons"in t&&o(1,l=t.claytons)},t.$$.update=()=>{if(57&t.$$.dirty){const t=r.COLLECTIONS[a].representation;i.hasOwnProperty(t)||alert(`CollectionRepresentation component requires a valid representation prop. ${t} is not valid`),o(2,s=i[t]),n.ccOn&&"CollectionsTable"!==r.COLLECTIONS[n.currentCollection].representation&&function(t,e){const o=d(ca).MODULES,n=d(ua).editMode,r=hi(t).map((t=>parseInt(t.id,10)));Object.keys(o).filter((t=>!r.includes(parseInt(t,10)))).forEach((t=>{const r=document.getElementById(`context_module_${t}`);r&&(null!==o[t].collection&&""!==o[t].collection?r.style.display="none":n?(r.style.display="block",yi(parseInt(t,10))):r.style.display=e?"block":"none")})),r.forEach((t=>{n&&yi(t);const e=document.getElementById(`context_module_${t}`);e&&(o[t].fyi&&!n?e.style.display="none":e.style.display="block")}))}(n.currentCollection,r.COLLECTIONS[n.currentCollection].unallocated)}},[a,l,s,n,r,i,function(t){a=t,o(0,a)}]}class Va extends ct{constructor(t){super(),lt(this,t,Fa,Ba,i,{collectionName:0,claytons:1})}}function Wa(t,e,o){const n=t.slice();return n[7]=e[o],n[9]=o,n}function Ga(t){let e,o,n,r,i,s,a,l,c=t[7]+"";function d(){return t[6](t[7])}let u=t[1].COLLECTIONS[t[7]].hide&&Ka();return{c(){e=v("li"),o=v("a"),n=y(c),r=w(),u&&u.c(),i=w(),S(o,"href","#cc-collection-"+t[9]),S(o,"class","svelte-yoz1j"),S(e,"class",s="cc-nav "+t[2][t[7]]+" svelte-yoz1j")},m(t,s){m(t,e,s),f(e,o),f(o,n),f(e,r),u&&u.m(e,null),f(e,i),a||(l=k(o,"click",C(d)),a=!0)},p(o,r){t=o,1&r&&c!==(c=t[7]+"")&&_(n,c),t[1].COLLECTIONS[t[7]].hide?u||(u=Ka(),u.c(),u.m(e,i)):u&&(u.d(1),u=null),5&r&&s!==(s="cc-nav "+t[2][t[7]]+" svelte-yoz1j")&&S(e,"class",s)},d(t){t&&g(e),u&&u.d(),a=!1,l()}}}function Ka(t){let e;return{c(){e=v("div"),e.textContent="Hidden",S(e,"class","cc-collection-hidden svelte-yoz1j")},m(t,o){m(t,e,o)},d(t){t&&g(e)}}}function Xa(t){let e,o=!(t[1].COLLECTIONS[t[7]].hide&&!t[3].editMode)&&Ga(t);return{c(){o&&o.c(),e=x()},m(t,n){o&&o.m(t,n),m(t,e,n)},p(t,n){!t[1].COLLECTIONS[t[7]].hide||t[3].editMode?o?o.p(t,n):(o=Ga(t),o.c(),o.m(e.parentNode,e)):o&&(o.d(1),o=null)},d(t){o&&o.d(t),t&&g(e)}}}function Ja(e){let o,n,r=e[0],i=[];for(let t=0;t<r.length;t+=1)i[t]=Xa(Wa(e,r,t));return{c(){o=v("div"),n=v("ul");for(let t=0;t<i.length;t+=1)i[t].c();S(n,"class","svelte-yoz1j"),S(o,"class","cc-nav svelte-yoz1j")},m(t,e){m(t,o,e),f(o,n);for(let t=0;t<i.length;t+=1)i[t].m(n,null)},p(t,[e]){if(31&e){let o;for(r=t[0],o=0;o<r.length;o+=1){const s=Wa(t,r,o);i[o]?i[o].p(s,e):(i[o]=Xa(s),i[o].c(),i[o].m(n,null))}for(;o<i.length;o+=1)i[o].d(1);i.length=r.length}},i:t,o:t,d(t){t&&g(o),b(i,t)}}}function Ya(t,e,o){let n,r;u(t,ua,(t=>o(3,n=t))),u(t,ca,(t=>o(1,r=t)));let{activeCollectionName:i}=e,s=[],a={};function l(t){o(2,a[i]="",a),p(ua,n.currentCollection=t,n),o(2,a[t]="cc-active",a),o(5,i=t)}return t.$$set=t=>{"activeCollectionName"in t&&o(5,i=t.activeCollectionName)},t.$$.update=()=>{35&t.$$.dirty&&(o(0,s=r.COLLECTIONS_ORDER),s.forEach((t=>{o(2,a[t]=t===i?"cc-active":"",a)})),o(5,i),o(1,r),o(0,s))},[s,r,a,n,l,i,t=>l(t)]}class Qa extends ct{constructor(t){super(),lt(this,t,Ya,Ja,i,{activeCollectionName:5})}}function Za(e){let o;return{c(){o=v("div"),S(o,"class","cc-include-page"),S(o,"id","cc-include-page")},m(t,n){m(t,o,n),o.innerHTML=e[0]},p(t,[e]){1&e&&(o.innerHTML=t[0])},i:t,o:t,d(t){t&&g(o)}}}function tl(t,e,o){let n,r;u(t,ua,(t=>o(3,n=t))),u(t,ca,(t=>o(4,r=t)));let{collectionName:i=""}=e,s="",a="";function l(t,e){o(0,a=e&&e.body||"")}return t.$$set=t=>{"collectionName"in t&&o(1,i=t.collectionName)},t.$$.update=()=>{30&t.$$.dirty&&(o(2,s=r.COLLECTIONS[i].includePage),""!==s?Mt(s,n.courseId,l):o(0,a=""))},[a,i,s,n,r]}class el extends ct{constructor(t){super(),lt(this,t,tl,Za,i,{collectionName:1})}}function ol(t){let e,o,n,r,i,s,a,l,c;function d(e){t[2](e)}let u={};void 0!==t[0].currentCollection&&(u.activeCollectionName=t[0].currentCollection),e=new Qa({props:u}),z.push((()=>nt(e,"activeCollectionName",d,t[0].currentCollection)));let h=!t[1].COLLECTIONS[t[0].currentCollection].includeAfter&&nl(t);function p(e){t[3](e)}let f={claytons:!1};void 0!==t[0].currentCollection&&(f.collectionName=t[0].currentCollection),i=new Va({props:f}),z.push((()=>nt(i,"collectionName",p,t[0].currentCollection)));let b=t[1].COLLECTIONS[t[0].currentCollection].includeAfter&&rl(t);return{c(){rt(e.$$.fragment),n=w(),h&&h.c(),r=w(),rt(i.$$.fragment),a=w(),b&&b.c(),l=x()},m(t,o){it(e,t,o),m(t,n,o),h&&h.m(t,o),m(t,r,o),it(i,t,o),m(t,a,o),b&&b.m(t,o),m(t,l,o),c=!0},p(t,n){const a={};!o&&1&n&&(o=!0,a.activeCollectionName=t[0].currentCollection,W((()=>o=!1))),e.$set(a),t[1].COLLECTIONS[t[0].currentCollection].includeAfter?h&&(Z(),ot(h,1,1,(()=>{h=null})),tt()):h?(h.p(t,n),3&n&&et(h,1)):(h=nl(t),h.c(),et(h,1),h.m(r.parentNode,r));const c={};!s&&1&n&&(s=!0,c.collectionName=t[0].currentCollection,W((()=>s=!1))),i.$set(c),t[1].COLLECTIONS[t[0].currentCollection].includeAfter?b?(b.p(t,n),3&n&&et(b,1)):(b=rl(t),b.c(),et(b,1),b.m(l.parentNode,l)):b&&(Z(),ot(b,1,1,(()=>{b=null})),tt())},i(t){c||(et(e.$$.fragment,t),et(h),et(i.$$.fragment,t),et(b),c=!0)},o(t){ot(e.$$.fragment,t),ot(h),ot(i.$$.fragment,t),ot(b),c=!1},d(t){st(e,t),t&&g(n),h&&h.d(t),t&&g(r),st(i,t),t&&g(a),b&&b.d(t),t&&g(l)}}}function nl(t){let e,o;return e=new el({props:{collectionName:t[0].currentCollection}}),{c(){rt(e.$$.fragment)},m(t,n){it(e,t,n),o=!0},p(t,o){const n={};1&o&&(n.collectionName=t[0].currentCollection),e.$set(n)},i(t){o||(et(e.$$.fragment,t),o=!0)},o(t){ot(e.$$.fragment,t),o=!1},d(t){st(e,t)}}}function rl(t){let e,o;return e=new el({props:{collectionName:t[0].currentCollection}}),{c(){rt(e.$$.fragment)},m(t,n){it(e,t,n),o=!0},p(t,o){const n={};1&o&&(n.collectionName=t[0].currentCollection),e.$set(n)},i(t){o||(et(e.$$.fragment,t),o=!0)},o(t){ot(e.$$.fragment,t),o=!1},d(t){st(e,t)}}}function il(t){let e,o,n=t[1].COLLECTIONS_ORDER.length>0&&ol(t);return{c(){n&&n.c(),e=x()},m(t,r){n&&n.m(t,r),m(t,e,r),o=!0},p(t,[o]){t[1].COLLECTIONS_ORDER.length>0?n?(n.p(t,o),2&o&&et(n,1)):(n=ol(t),n.c(),et(n,1),n.m(e.parentNode,e)):n&&(Z(),ot(n,1,1,(()=>{n=null})),tt())},i(t){o||(et(n),o=!0)},o(t){ot(n),o=!1},d(t){n&&n.d(t),t&&g(e)}}}function sl(t,e,o){let n,r;u(t,ua,(t=>o(0,n=t))),u(t,ca,(t=>o(1,r=t)));let i=!1;var s;return s=()=>{i||function(){const t=window.location.hash.match(/^#module_(\d+)$/);if(t){const e=t[1],o=r.MODULES[e].collection;if(o!==n.currentCollection)return void p(ua,n.currentCollection=o,n);const i=document.getElementById(e);i&&"none"!==i.style.display&&i.scrollIntoView()}i=!0}()},P().$$.after_update.push(s),t.$$.update=()=>{3&t.$$.dirty&&(n.currentCollection||r.COLLECTIONS_ORDER.length>0&&p(ua,n.currentCollection=r.COLLECTIONS_ORDER[0],n))},[n,r,function(e){t.$$.not_equal(n.currentCollection,e)&&(n.currentCollection=e,ua.set(n))},function(e){t.$$.not_equal(n.currentCollection,e)&&(n.currentCollection=e,ua.set(n))}]}class al extends ct{constructor(t){super(),lt(this,t,sl,il,i,{})}}class ll{constructor(t,e,o){this.navOption=o,this.singleCollectionName=t,this.completedCallback=e,this.configStore=d(ua),this.collectionsStore=d(ca),this.tasks=[],this.completedTasks=[],this.errors=[],this.createTaskLists(),this.checkTaskList()}getNumErrors(){this.errors=[];for(let t of this.completedTasks)t.error&&(this.errors=this.errors.concat(t.errors));return this.errors.length}execute(){0!==this.errors.length?this.complete():this.startUpdate()}complete(){this.completedCallback&&this.completedCallback(this)}getCollectionNamesUpdated(){let t=[];for(let e of this.completedTasks)e.collection&&t.push(e.collection);return t}getPageNamesUpdated(){let t={};for(let e of this.completedTasks)e.outputPage&&(t[e.outputPage]=e.outputPage);return Object.keys(t)}createTaskLists(){if(this.singleCollectionName){const t=this.collectionsStore.COLLECTIONS[this.singleCollectionName],e=t.outputPage,o=t.representation,n=e.toLowerCase().replace(/ /g,"-");return this.navOption=1,void this.tasks.push({collection:this.singleCollectionName,outputPage:e,outputPageUrl:n,representation:o,pageObject:null,completed:!1,error:!1,errors:[]})}const t=this.collectionsStore.COLLECTIONS_ORDER.filter((t=>{if(this.collectionsStore.COLLECTIONS[t].hasOwnProperty("outputPage")&&""!==this.collectionsStore.COLLECTIONS[t].outputPage)return t}));for(let e of t){const t=this.collectionsStore.COLLECTIONS[e],o=t.outputPage,n=t.representation,r=o.toLowerCase().replace(/ /g,"-");this.tasks.push({collection:e,outputPage:o,outputPageUrl:r,representation:n,completed:!1,error:!1,errors:[]})}if(3!==this.navOption)return;const e=this.getPagesWithMultipleCollections();for(let t in e){const o=e[t],n=t.toLowerCase().replace(/ /g,"-");this.tasks.push({collections:o,outputPage:t,outputPageUrl:n,completed:!1,error:!1,errors:[]})}}getPagesWithMultipleCollections(){const t=this.collectionsStore.COLLECTIONS_ORDER,e=this.collectionsStore.COLLECTIONS,o={};t.forEach((t=>{e[t].hasOwnProperty("outputPage")&&""!==e[t].outputPage&&(o.hasOwnProperty(e[t].outputPage)?o[e[t].outputPage].push(t):o[e[t].outputPage]=[t])}));for(let t in o)o[t].length<2&&delete o[t];return o}checkTaskList(){if(2===this.navOption&&this.tasks.length>1){const t=this.tasks.map((t=>t.outputPage)),e=[...new Set(t)];t.length!==e.length&&(this.errors.push(`"Pages" nav option doesn't work with pages used by multiple collections\nPage(s) used multiple times include: ${e.toString()}`),this.completedTasks=this.tasks,this.tasks=[])}}startUpdate(){if(0!==this.tasks.length)if(this.tasks[0].hasOwnProperty("collection")&&this.collectionsStore.COLLECTIONS[this.tasks[0].collection].hasOwnProperty("includePage")&&""!==this.collectionsStore.COLLECTIONS[this.tasks[0].collection].includePage){let t=this.collectionsStore.COLLECTIONS[this.tasks[0].collection].includePage;t=t.toLowerCase().replace(/ /g,"-"),this.getIncludePageContent(t)}else this.getOutputPage();else this.complete()}errorFirstTask(t){let e=this.tasks.shift();e.error=!0,e.errors.push(t),this.completedTasks.push(e),this.startUpdate()}generateOutcomesString(t){let e=this.completedTasks.length,o=this.completedTasks.filter((t=>!0===t.completed)).length,n=this.completedTasks.filter((t=>!0===t.error)).length,r="";n>0&&(r=` with ${n} errors`);let i=`${t} completed ${o} of ${e} tasks${r}.`;this.completedTasks.length>0&&(i+="<ul>");for(let t of this.completedTasks)t.error?i+=`<li> ${t.collection} - ${t.outputPageUrl} - errors - ${t.errors.join("\n     ")} </li>`:t.completed&&(t.hasOwnProperty("collection")?i+=`<li> <em>${t.collection}</em> - \n\t\t  <a href="/courses/${this.configStore.courseId}/pages/${t.outputPageUrl}" \n\t\t  target="_blank" rel="noreferrer">${t.outputPage}</a> - \n\t\t  <span style="color:rgb(1,101,1);">success</span>\n\t\t  </li>`:t.hasOwnProperty("collections")&&(i+=`<li> Tab navigation -\n\t\t  <a href="/courses/${this.configStore.courseId}/pages/${t.outputPageUrl}" \n\t\t  target="_blank" rel="noreferrer">${t.outputPage}</a> - \n\t\t  <span style="color:rgb(1,101,1);">success</span></li>`));if(this.completedTasks.length>0&&(i+="</ul>"),this.errors.length>0){i+='<p style="color: red">Errors:</p><ul>';for(let t of this.errors)i+=`<li>${t}</li>`;i+="</ul>"}return i}async getIncludePageContent(t){let e=`/api/v1/courses/${this.configStore.courseId}/pages/${t}`;const o=await fetch(e,{method:"GET",credentials:"include",headers:{"Content-Type":"application/json",Accept:"application/json","X-CSRF-Token":this.configStore.csrfToken}});if(!o.ok)return;const n=await o.json();this.tasks[0].includePageContent=`\n\t\t<div id="cc-${this.tasks[0].collection}-includePage" class="cc-includePage">\n\t\t  ${n.body}\n\t\t</div>`,this.getOutputPage()}async getOutputPage(){let t=`/api/v1/courses/${this.configStore.courseId}/pages/${this.tasks[0].outputPageUrl}`,e=await fetch(t,{method:"GET",credentials:"include",headers:{"Content-Type":"application/json",Accept:"application/json","X-CSRF-Token":this.configStore.csrfToken}});if(200===e.status||404===e.status){const t=await e.json();this.tasks[0].pageObject=t,this.tasks[0].hasOwnProperty("collection")?this.updateOutputContent():this.updateTabContent()}}updateTabContent(){if(!this.tasks[0].hasOwnProperty("pageObject"))return void this.errorFirstTask(`No pageObject for ${this.tasks[0].outputPageUrl}`);const t=this.tasks[0].pageObject,e=this.tasks[0].collections,o=e.map((t=>t.replace(/ /g,"-"))),n=t.body,r=(new DOMParser).parseFromString(n,"text/html");let i="";for(let t=0;t<o.length;t++){const e=`cc-output-${o[t]}`,n=r.getElementById(e);n&&(i+=n.outerHTML,n.remove())}const s=r.getElementsByClassName("cc-includePage");for(let t=0;t<s.length;t++)s[t].remove();let a=this.generateTabHtml(e,i);const l=r.getElementById("cc-nav");l?l.innerHTML=a:r.body.insertAdjacentHTML("beforeend",a),this.tasks[0].newContent=r.body.innerHTML,this.writeOutputPage()}generateTabHtml(t,e){let o="";for(let e of t){o=`${o}\n<li style="display: table-cell; width: 100%; float: none;">\n    <a style="float: none;text-decoration: none; display: block; text-align: center; padding: 1.5em 1em; font-size: 1.3em;white-space:break-spaces;" \n        href="#cc-output-${e.replace(/ /g,"-")}">${e}</a></li>`}return`\n<div id="cc-nav" class="enhanceable_content tabs" style="font-size: small;">\n  <ul class="cc-nav" style="list-style-type: none; margin: 0; padding: 0; overflow: hidden; background-color: #eeeeee; display: table; table-layout: fixed; width: 100%;">\n    ${o}\n  </ul>\n\n  ${e}\n</div>`}updateOutputContent(){if(!this.tasks[0].hasOwnProperty("pageObject"))return void this.errorFirstTask(`No pageObject for ${this.tasks[0].outputPageUrl}`);let t="";this.tasks[0].pageObject.hasOwnProperty("message")||"page not found"===this.tasks[0].pageObject.message||(t=this.tasks[0].pageObject.body);let e=this.tasks[0].collection;const o=e.replace(/ /g,"-"),n=this.generateClaytons(e),r=`cc-output-${o}`,i=(new DOMParser).parseFromString(t,"text/html"),s=i.getElementById(r);if(s)s.innerHTML=n;else{const t=i.createElement("div");t.id=r,t.innerHTML=n,i.body.appendChild(t)}if(this.tasks[0].hasOwnProperty("includePageContent")&&this.tasks[0].includePageContent){const t=i.getElementById(r),o=t.getElementsByClassName("cc-includePage");for(let t=0;t<o.length;t++)o[t].remove();let n=!1;this.collectionsStore.COLLECTIONS[e].hasOwnProperty("includeAfter")&&(n=this.collectionsStore.COLLECTIONS[e].includeAfter),n?t.insertAdjacentHTML("beforeend",this.tasks[0].includePageContent):t.insertAdjacentHTML("afterbegin",this.tasks[0].includePageContent)}if(1===this.navOption){const t=i.querySelector("ul.cc-nav");t&&t.remove();const e=i.getElementById("cc-nav");e&&(e.outerHTML=e.innerHTML)}let a=i.body.innerHTML;this.tasks[0].newContent=a,this.writeOutputPage()}generateClaytons(t){const e=document.createElement("div");return new Va({target:e,props:{collectionName:t,claytons:!0}}),e.innerHTML}async writeOutputPage(){if(!this.tasks[0].hasOwnProperty("newContent"))return void this.errorFirstTask(`No newContent for ${this.tasks[0].outputPageUrl}`);let t=this.tasks[0].newContent;const e=this.configStore.courseId,o=this.tasks[0].outputPageUrl;let n=`/api/v1/courses/${e}/pages`;n=this.tasks[0].hasOwnProperty("pageObject")&&this.tasks[0].pageObject.hasOwnProperty("page_id")?`${n}/${this.tasks[0].pageObject.page_id}`:`${n}/${this.tasks[0].outputPageUrl}`;const r='\n\t\t<div id="kl_custom_css">&nbsp;</div>\n\t\t';-1===t.indexOf(r)&&(t+=r);let i={wiki_page:{body:t,title:this.tasks[0].outputPage}};const s=JSON.stringify(i);let a=await fetch(n,{method:"put",credentials:"include",headers:{"Content-type":"application/json; charset=UTF-8",Accept:"application/json; charset=UTF-8","X-CSRF-Token":this.configStore.csrfToken},body:s});if(a.ok)if(0!==(await a.json()).length){if(this.tasks[0].hasOwnProperty("collection")){Kr(`<p>Updated \n\t\t<a href="/courses/${this.configStore.courseId}/pages/${o}" target="_blank" rel="noreferrer">\n\t\t<em>${this.tasks[0].outputPage}</em></a>\n\t\tfor the collection <em>${this.tasks[0].collection}</em></p>`,"success")}else if(3===this.navOption&&this.tasks[0].hasOwnProperty("collections")){Kr(`<p>Added tab navigation to \n\t\t<a href="/courses/${this.configStore.courseId}/pages/${o}" target="_blank" rel="noreferrer">\n\t\t<em>${this.tasks[0].outputPage}</em></a></p>`,"success")}let t=this.tasks.shift();t.completed=!0,this.completedTasks.push(t),this.startUpdate()}else this.errorFirstTask(`No data provided for page ${o}`);else this.errorFirstTask(`Unable to update page ${o} in Canvas`)}}function cl(t,e,o){const n=t.slice();return n[32]=e[o],n}function dl(t){let e,o,r,i;return{c(){e=v("i"),S(e,"class","icon-arrow-up cc-move-collection svelte-wokm59"),S(e,"id",o="cc-collection-$"+t[0]+"-up")},m(o,n){m(o,e,n),r||(i=[k(e,"click",t[12]),k(e,"keydown",t[12])],r=!0)},p(t,n){513&n[0]&&o!==(o="cc-collection-$"+t[0]+"-up")&&S(e,"id",o)},d(t){t&&g(e),r=!1,n(i)}}}function ul(t){let e,o,r,i;return{c(){e=v("i"),S(e,"class","icon-arrow-down cc-move-collection svelte-wokm59"),S(e,"id",o="cc-collection-$"+t[0]+"-down")},m(o,n){m(o,e,n),r||(i=[k(e,"click",t[13]),k(e,"keydown",t[13])],r=!0)},p(t,n){513&n[0]&&o!==(o="cc-collection-$"+t[0]+"-down")&&S(e,"id",o)},d(t){t&&g(e),r=!1,n(i)}}}function hl(e){let o,n,r=e[32]+"";return{c(){o=v("option"),n=y(r),o.__value=e[32],o.value=o.__value},m(t,e){m(t,o,e),f(o,n)},p:t,d(t){t&&g(o)}}}function pl(t){let e,o,n,r,i,s=t[6].COLLECTIONS[t[0]].includePage+"";return{c(){e=v("div"),o=y("Page "),n=v("strong"),r=y(s),i=y(" does not exist"),S(e,"class","cc-collection-two-line-error svelte-wokm59")},m(t,s){m(t,e,s),f(e,o),f(e,n),f(n,r),f(e,i)},p(t,e){65&e[0]&&s!==(s=t[6].COLLECTIONS[t[0]].includePage+"")&&_(r,s)},d(t){t&&g(e)}}}function fl(t){let e,o,n,r,i=t[6].COLLECTIONS[t[0]].outputPage+"";return{c(){e=v("div"),o=y("Will create a new page named "),n=v("strong"),r=y(i),S(e,"class","cc-collection-two-line-warning svelte-wokm59")},m(t,i){m(t,e,i),f(e,o),f(e,n),f(n,r)},p(t,e){65&e[0]&&i!==(i=t[6].COLLECTIONS[t[0]].outputPage+"")&&_(r,i)},d(t){t&&g(e)}}}function ml(e){let o,r,i,s,a,l,c,d,u,h,p,x,C,O,L,$,M,D,A,I,P,N,U,H,q,z,R,j,B,F,W,G,K,X,J,Y,Q,Z,tt,et,ot,nt,rt,it,st,at,lt,ct,dt,ut,ht,pt,ft,mt,gt,bt,vt,yt,wt,xt,kt,Ct,St,Et,_t,Ot,Lt,Tt,$t,Mt,Dt,At,It,Pt,Nt,Ut,Ht,qt,zt,Rt,jt,Bt,Ft,Vt,Wt,Gt,Kt,Xt,Jt,Yt,Qt,Zt,te,ee,oe,ne,re,ie,se,ae,le,ce,de,ue,he,pe,fe,me,ge,be,ve,ye,we,xe,ke,Ce,Se,Ee,_e,Oe,Le,Te,$e,Me,De,Ae,Ie,Pe,Ne,Ue,He,qe,ze,Re,je,Be,Fe,Ve,We,Ge,Ke,Xe,Je,Ye,Qe,Ze,to,eo,oo,no,ro,io,so=e[17].configName.tooltip+"",ao=e[17].configRepresentation.tooltip+"",lo=e[17].configDefault.tooltip+"",co=e[17].configHide.tooltip+"",uo=e[17].configUnallocated.tooltip+"",ho=e[17].configIncludePage.tooltip+"",po=e[17].configIncludePageAfter.tooltip+"",fo=e[17].configOutputPage.tooltip+"",mo=e[3]>0&&dl(e),go=e[3]<e[4]-1&&ul(e),bo=e[9],vo=[];for(let t=0;t<bo.length;t+=1)vo[t]=hl(cl(e,bo,t));let yo=!e[1]&&e[6].COLLECTIONS[e[0]].includePage&&pl(e),wo=!e[2]&&""!==e[6].COLLECTIONS[e[0]].outputPage&&fl(e);return{c(){o=v("div"),r=v("p"),i=y(e[0]),s=y(" - ("),a=y(e[7]),l=w(),c=y(e[8]),d=y(")\r\n    "),u=v("span"),mo&&mo.c(),h=w(),go&&go.c(),p=w(),x=v("i"),O=w(),L=v("div"),$=v("span"),M=v("label"),D=y("Name"),I=w(),P=v("sl-tooltip"),N=v("div"),U=w(),H=v("a"),q=v("i"),z=w(),R=v("span"),j=v("input"),F=w(),W=v("div"),G=v("span"),K=v("label"),X=y("Representation"),Y=w(),Q=v("sl-tooltip"),Z=v("div"),tt=w(),et=v("a"),ot=v("i"),nt=w(),rt=v("span"),it=v("select"),st=y(">\r\n        ");for(let t=0;t<vo.length;t+=1)vo[t].c();lt=w(),ct=v("div"),dt=v("div"),ut=v("label"),ht=y("Default"),ft=w(),mt=v("sl-tooltip"),gt=v("div"),bt=w(),vt=v("a"),yt=v("i"),wt=w(),xt=v("input"),St=w(),Et=v("div"),_t=v("label"),Ot=y("Hide"),Tt=w(),$t=v("sl-tooltip"),Mt=v("div"),Dt=w(),At=v("a"),It=v("i"),Pt=w(),Nt=v("input"),Ht=w(),qt=v("div"),zt=v("label"),Rt=y("Add unallocated"),Bt=w(),Ft=v("sl-tooltip"),Vt=v("div"),Wt=w(),Gt=v("a"),Kt=v("i"),Xt=w(),Jt=v("input"),Qt=w(),Zt=v("div"),te=v("div"),ee=v("label"),oe=y("Include page"),re=w(),ie=v("sl-tooltip"),se=v("div"),ae=w(),le=v("a"),ce=v("i"),de=w(),ue=v("div"),ue.textContent=" ",he=w(),pe=v("div"),fe=v("input"),be=w(),ve=v("span"),ye=v("label"),we=y("After?"),ke=w(),Ce=v("sl-tooltip"),Se=v("div"),Ee=w(),_e=v("a"),Oe=v("i"),Le=w(),Te=v("input"),Me=w(),yo&&yo.c(),De=w(),Ae=v("div"),Ie=v("div"),Pe=v("label"),Ne=y("Output page"),He=w(),qe=v("sl-tooltip"),ze=v("div"),Re=w(),je=v("a"),Be=v("i"),Fe=w(),Ve=v("div"),Ve.textContent=" ",We=w(),Ge=v("div"),Ke=v("input"),Ye=w(),Qe=v("button"),Ze=y("Update"),oo=w(),wo&&wo.c(),S(x,"class","icon-trash cc-delete-collection svelte-wokm59"),S(x,"id",C="cc-collection-$"+e[0]+"-delete"),S(u,"class","cc-collection-move svelte-wokm59"),S(r,"class","svelte-wokm59"),S(M,"for",A="cc-collection-"+e[0]+"-collectionName"),S(M,"class","svelte-wokm59"),S(N,"slot","content"),S(q,"class","icon-question cc-module-icon svelte-wokm59"),S(H,"href",e[17].configName.url),S(H,"rel","noreferrer"),S(H,"target","_blank"),E(P,"class","svelte-wokm59"),S($,"class","cc-collection-label svelte-wokm59"),S(j,"type","text"),S(j,"id",B="cc-collection-"+e[0]+"-collectionName"),j.value=e[0],S(j,"class","svelte-wokm59"),S(R,"class","cc-collection-input svelte-wokm59"),S(L,"class","cc-collection-form svelte-wokm59"),S(K,"for",J="cc-collection-"+e[0]+"-representation"),S(K,"class","svelte-wokm59"),S(Z,"slot","content"),S(ot,"class","icon-question cc-module-icon svelte-wokm59"),S(et,"href",e[17].configRepresentation.url),S(et,"rel","noreferrer"),S(et,"target","_blank"),E(Q,"class","svelte-wokm59"),S(G,"class","cc-collection-label svelte-wokm59"),S(it,"id",at="cc-collection-"+e[0]+"-representation"),S(it,"class","cc-collection-representation svelte-wokm59"),void 0===e[6].COLLECTIONS[e[0]].representation&&V((()=>e[18].call(it))),S(rt,"class","cc-collection-input svelte-wokm59"),S(W,"class","cc-collection-form svelte-wokm59"),S(ut,"for",pt="cc-config-collection-"+e[0]+"-default"),S(ut,"class","svelte-wokm59"),S(gt,"slot","content"),S(yt,"class","icon-question cc-module-icon svelte-wokm59"),S(vt,"href",e[17].configDefault.url),S(vt,"target","_blank"),S(vt,"rel","noreferrer"),E(mt,"class","svelte-wokm59"),S(xt,"type","checkbox"),S(xt,"id",kt="cc-config-collection-"+e[0]+"-default"),xt.checked=Ct=e[6].DEFAULT_ACTIVE_COLLECTION===e[0],S(xt,"class","svelte-wokm59"),S(_t,"for",Lt="cc-config-collection-"+e[0]+"-hide"),S(_t,"class","svelte-wokm59"),S(Mt,"slot","content"),S(It,"class","icon-question cc-module-icon svelte-wokm59"),S(At,"target","_blank"),S(At,"href",e[17].configHide.url),S(At,"rel","noreferrer"),E($t,"class","svelte-wokm59"),S(Nt,"type","checkbox"),S(Nt,"class","cc-config-collection-hide svelte-wokm59"),Nt.disabled=Ut=e[6].DEFAULT_ACTIVE_COLLECTION===e[0],S(Et,"class","cc-collection-double-center svelte-wokm59"),S(zt,"for",jt="cc-config-collection-"+e[0]+"-unallocated"),S(zt,"class","svelte-wokm59"),S(Vt,"slot","content"),S(Kt,"class","icon-question cc-module-icon svelte-wokm59"),S(Gt,"href",e[17].configUnallocated.url),S(Gt,"target","_blank"),S(Gt,"rel","noreferrer"),E(Ft,"class","svelte-wokm59"),S(Jt,"type","checkbox"),S(Jt,"id",Yt="cc-config-collection-"+e[0]+"-unallocated"),S(Jt,"class","svelte-wokm59"),S(ct,"class","cc-collection-double svelte-wokm59"),S(ee,"for",ne="cc-collection-"+e[0]+"-include-page"),S(ee,"class","svelte-wokm59"),S(se,"slot","content"),S(ce,"class","icon-question cc-module-icon svelte-wokm59"),S(le,"id","cc-about-include-page"),S(le,"rel","noreferrer"),S(le,"target","_blank"),S(le,"href",e[17].configIncludePage.url),E(ie,"class","svelte-wokm59"),S(te,"class","cc-collection-two-line-header svelte-wokm59"),S(fe,"id",me="cc-collection-"+e[0]+"-includePage"),fe.value=ge=e[6].COLLECTIONS[e[0]].includePage,S(fe,"class","svelte-wokm59"),S(ye,"for",xe="cc-config-collection-"+e[0]+"-include-after"),S(ye,"class","svelte-wokm59"),S(Se,"slot","content"),S(Oe,"class","icon-question cc-module-icon svelte-wokm59"),S(_e,"id","cc-about-include-after"),S(_e,"href",e[17].configIncludePageAfter.url),S(_e,"target","_blank"),S(_e,"rel","noreferrer"),E(Ce,"class","svelte-wokm59"),S(Te,"type","checkbox"),S(Te,"id",$e="cc-config-collection-"+e[0]+"-include-after"),S(Te,"class","cc-config-collection-include-after svelte-wokm59"),S(ve,"class","cc-collection-label svelte-wokm59"),S(pe,"class","cc-collection-two-line-body svelte-wokm59"),S(Zt,"class","cc-collection-two-line svelte-wokm59"),S(Pe,"for",Ue="cc-collection-"+e[0]+"-output-page"),S(Pe,"class","svelte-wokm59"),S(ze,"slot","content"),S(Be,"class","icon-question cc-module-icon svelte-wokm59"),S(je,"id","cc-about-update-output-page"),S(je,"target","_blank"),S(je,"href",e[17].configOutputPage.url),S(je,"rel","noreferrer"),E(qe,"class","svelte-wokm59"),S(Ie,"class","cc-collection-two-line-header svelte-wokm59"),S(Ke,"id",Xe="cc-collection-"+e[0]+"-outputPage"),Ke.value=Je=e[6].COLLECTIONS[e[0]].outputPage,S(Ke,"class","svelte-wokm59"),S(Qe,"id",to="cc-collection-"+e[0]+"-output-page-update"),S(Qe,"class","btn svelte-wokm59"),Qe.disabled=eo=""===e[6].COLLECTIONS[e[0]].outputPage,S(Ge,"class","cc-collection-two-line-body svelte-wokm59"),S(Ae,"class","cc-collection-two-line svelte-wokm59"),S(o,"class","cc-existing-collection border border-trbl svelte-wokm59"),S(o,"id",no="cc-collection-"+e[0])},m(t,n){m(t,o,n),f(o,r),f(r,i),f(r,s),f(r,a),f(r,l),f(r,c),f(r,d),f(r,u),mo&&mo.m(u,null),f(u,h),go&&go.m(u,null),f(u,p),f(u,x),f(o,O),f(o,L),f(L,$),f($,M),f(M,D),f($,I),f($,P),f(P,N),N.innerHTML=so,f(P,U),f(P,H),f(H,q),f(L,z),f(L,R),f(R,j),f(o,F),f(o,W),f(W,G),f(G,K),f(K,X),f(G,Y),f(G,Q),f(Q,Z),Z.innerHTML=ao,f(Q,tt),f(Q,et),f(et,ot),f(W,nt),f(W,rt),f(rt,it),f(it,st);for(let t=0;t<vo.length;t+=1)vo[t].m(it,null);T(it,e[6].COLLECTIONS[e[0]].representation),f(o,lt),f(o,ct),f(ct,dt),f(dt,ut),f(ut,ht),f(dt,ft),f(dt,mt),f(mt,gt),gt.innerHTML=lo,f(mt,bt),f(mt,vt),f(vt,yt),f(dt,wt),f(dt,xt),f(ct,St),f(ct,Et),f(Et,_t),f(_t,Ot),f(Et,Tt),f(Et,$t),f($t,Mt),Mt.innerHTML=co,f($t,Dt),f($t,At),f(At,It),f(Et,Pt),f(Et,Nt),Nt.checked=e[6].COLLECTIONS[e[0]].hide,f(ct,Ht),f(ct,qt),f(qt,zt),f(zt,Rt),f(qt,Bt),f(qt,Ft),f(Ft,Vt),Vt.innerHTML=uo,f(Ft,Wt),f(Ft,Gt),f(Gt,Kt),f(qt,Xt),f(qt,Jt),Jt.checked=e[6].COLLECTIONS[e[0]].unallocated,f(o,Qt),f(o,Zt),f(Zt,te),f(te,ee),f(ee,oe),f(te,re),f(te,ie),f(ie,se),se.innerHTML=ho,f(ie,ae),f(ie,le),f(le,ce),f(Zt,de),f(Zt,ue),f(Zt,he),f(Zt,pe),f(pe,fe),f(pe,be),f(pe,ve),f(ve,ye),f(ye,we),f(ve,ke),f(ve,Ce),f(Ce,Se),Se.innerHTML=po,f(Ce,Ee),f(Ce,_e),f(_e,Oe),f(ve,Le),f(ve,Te),Te.checked=e[6].COLLECTIONS[e[0]].includeAfter,f(Zt,Me),yo&&yo.m(Zt,null),f(o,De),f(o,Ae),f(Ae,Ie),f(Ie,Pe),f(Pe,Ne),f(Ie,He),f(Ie,qe),f(qe,ze),ze.innerHTML=fo,f(qe,Re),f(qe,je),f(je,Be),f(Ae,Fe),f(Ae,Ve),f(Ae,We),f(Ae,Ge),f(Ge,Ke),f(Ge,Ye),f(Ge,Qe),f(Qe,Ze),f(Ae,oo),wo&&wo.m(Ae,null),ro||(io=[k(x,"click",e[14]),k(x,"keydown",e[14]),k(j,"change",e[15]),k(it,"change",e[18]),k(it,"change",e[19]),k(xt,"click",e[11]),k(Nt,"change",e[20]),k(Nt,"change",e[21]),k(Jt,"change",e[22]),k(Jt,"change",e[23]),k(fe,"focusout",e[10]),k(Te,"click",e[24]),k(Te,"keydown",e[25]),k(Te,"change",e[26]),k(Ke,"focusout",e[10]),k(Qe,"click",e[27])],ro=!0)},p(t,e){if(1&e[0]&&_(i,t[0]),t[3]>0?mo?mo.p(t,e):(mo=dl(t),mo.c(),mo.m(u,h)):mo&&(mo.d(1),mo=null),t[3]<t[4]-1?go?go.p(t,e):(go=ul(t),go.c(),go.m(u,p)):go&&(go.d(1),go=null),513&e[0]&&C!==(C="cc-collection-$"+t[0]+"-delete")&&S(x,"id",C),513&e[0]&&A!==(A="cc-collection-"+t[0]+"-collectionName")&&S(M,"for",A),513&e[0]&&B!==(B="cc-collection-"+t[0]+"-collectionName")&&S(j,"id",B),513&e[0]&&j.value!==t[0]&&(j.value=t[0]),513&e[0]&&J!==(J="cc-collection-"+t[0]+"-representation")&&S(K,"for",J),512&e[0]){let o;for(bo=t[9],o=0;o<bo.length;o+=1){const n=cl(t,bo,o);vo[o]?vo[o].p(n,e):(vo[o]=hl(n),vo[o].c(),vo[o].m(it,null))}for(;o<vo.length;o+=1)vo[o].d(1);vo.length=bo.length}513&e[0]&&at!==(at="cc-collection-"+t[0]+"-representation")&&S(it,"id",at),577&e[0]&&T(it,t[6].COLLECTIONS[t[0]].representation),513&e[0]&&pt!==(pt="cc-config-collection-"+t[0]+"-default")&&S(ut,"for",pt),513&e[0]&&kt!==(kt="cc-config-collection-"+t[0]+"-default")&&S(xt,"id",kt),577&e[0]&&Ct!==(Ct=t[6].DEFAULT_ACTIVE_COLLECTION===t[0])&&(xt.checked=Ct),513&e[0]&&Lt!==(Lt="cc-config-collection-"+t[0]+"-hide")&&S(_t,"for",Lt),577&e[0]&&Ut!==(Ut=t[6].DEFAULT_ACTIVE_COLLECTION===t[0])&&(Nt.disabled=Ut),577&e[0]&&(Nt.checked=t[6].COLLECTIONS[t[0]].hide),513&e[0]&&jt!==(jt="cc-config-collection-"+t[0]+"-unallocated")&&S(zt,"for",jt),513&e[0]&&Yt!==(Yt="cc-config-collection-"+t[0]+"-unallocated")&&S(Jt,"id",Yt),577&e[0]&&(Jt.checked=t[6].COLLECTIONS[t[0]].unallocated),513&e[0]&&ne!==(ne="cc-collection-"+t[0]+"-include-page")&&S(ee,"for",ne),513&e[0]&&me!==(me="cc-collection-"+t[0]+"-includePage")&&S(fe,"id",me),577&e[0]&&ge!==(ge=t[6].COLLECTIONS[t[0]].includePage)&&fe.value!==ge&&(fe.value=ge),513&e[0]&&xe!==(xe="cc-config-collection-"+t[0]+"-include-after")&&S(ye,"for",xe),513&e[0]&&$e!==($e="cc-config-collection-"+t[0]+"-include-after")&&S(Te,"id",$e),577&e[0]&&(Te.checked=t[6].COLLECTIONS[t[0]].includeAfter),!t[1]&&t[6].COLLECTIONS[t[0]].includePage?yo?yo.p(t,e):(yo=pl(t),yo.c(),yo.m(Zt,null)):yo&&(yo.d(1),yo=null),513&e[0]&&Ue!==(Ue="cc-collection-"+t[0]+"-output-page")&&S(Pe,"for",Ue),513&e[0]&&Xe!==(Xe="cc-collection-"+t[0]+"-outputPage")&&S(Ke,"id",Xe),577&e[0]&&Je!==(Je=t[6].COLLECTIONS[t[0]].outputPage)&&Ke.value!==Je&&(Ke.value=Je),513&e[0]&&to!==(to="cc-collection-"+t[0]+"-output-page-update")&&S(Qe,"id",to),577&e[0]&&eo!==(eo=""===t[6].COLLECTIONS[t[0]].outputPage)&&(Qe.disabled=eo),t[2]||""===t[6].COLLECTIONS[t[0]].outputPage?wo&&(wo.d(1),wo=null):wo?wo.p(t,e):(wo=fl(t),wo.c(),wo.m(Ae,null)),513&e[0]&&no!==(no="cc-collection-"+t[0])&&S(o,"id",no)},i:t,o:t,d(t){t&&g(o),mo&&mo.d(),go&&go.d(),b(vo,t),yo&&yo.d(),wo&&wo.d(),ro=!1,n(io)}}}function gl(t,e,o){let n,r,i;u(t,ua,(t=>o(5,n=t))),u(t,ca,(t=>o(6,r=t))),u(t,ha,(t=>o(28,i=t)));let{collectionName:s}=e,{includePageExists:a}=e,{outputPageExists:l}=e,{order:c}=e,{numCollections:d}=e;const h=U();["includePage","outputPage"].forEach((t=>{r.COLLECTIONS[s].hasOwnProperty(t)||p(ca,r.COLLECTIONS[s][t]="",r)}));let f=hi(s).length,m=1===f?"module":"modules",g=Object.getOwnPropertyNames(i);function b(t){new ll(t,v).execute()}function v(t){const e=t.getPageNamesUpdated();e.forEach((t=>{h("message",{msgType:"updatePage",pageType:"outputPage",pageName:t})})),Kr(`<p>Updating the following pages</p>\n      ${e.map((t=>`<p style="margin-left: 1em">${t}</p>`)).join("")}`)}const y={configName:{tooltip:"A collection's name will be used to navigate between collections",url:"https://djplaner.github.io/canvas-collections/getting-started/configure/collections/#collection-properties"},configRepresentation:{tooltip:"Specify how the collection will be displayed by choosing one of the available representations. Representations can be changed at any time.",url:"https://djplaner.github.io/canvas-collections/reference/representations/overview/"},configDefault:{tooltip:"The default collection will be the first people see when the visit for the first time.",url:"https://djplaner.github.io/canvas-collections/getting-started/configure/collections/#collection-properties"},configHide:{tooltip:"<p>Make collection invisible to students. \n\t\t(Note: can't hide the default collection)</p>\n\t\t<p><i class=\"icon-warning\"></i> Also unpublish all the collection's modules to be ensure they are hidden.",url:"https://djplaner.github.io/canvas-collections/getting-started/configure/collections/#collection-properties"},configUnallocated:{tooltip:"<p>When students view this collection, include modules not allocated to any collection.</p>",url:"https://djplaner.github.io/canvas-collections/reference/collections/overview/#hide-a-collection"},configIncludePage:{tooltip:"Specify the name of an existing Canvas page and the content of that page\n\t\twill be displayed before the current collection's representation \n\t\t(it is <strong>included</strong>)",url:"https://djplaner.github.io/canvas-collections/reference/collections/overview/#include-page"},configIncludePageAfter:{tooltip:"<p>By default, include page contents placed <em>before</em> the collection. When selected\n\t\twill place the include page contents <em>after</em> the collection.</p>",url:"https://djplaner.github.io/canvas-collections/reference/collections/overview/#include-page"},configOutputPage:{tooltip:"Update the <em>output page</em> with the collection's current representation.\n\t\t<p><strong>Note:</strong> This is how you can use Collections with students without it being\n\t\tinstalled by your institution.</p>\n\t\t",url:"https://djplaner.github.io/canvas-collections/reference/collections/overview/#output-page"},configApplyLabels:{tooltip:"<p>🚧🧪☠️ <strong>Warning:</strong> This feature is experimental, under construction, and\n\t\tpotentially destructive. Only use as suggested and if you're certain.</p>\n\t\t<p>Modify the names of Canvas modules by apply the Collection's label/number</p>\n\t\t",url:"https://djplaner.github.io/canvas-collections/reference/collections/overview/#apply-module-labels"}};return t.$$set=t=>{"collectionName"in t&&o(0,s=t.collectionName),"includePageExists"in t&&o(1,a=t.includePageExists),"outputPageExists"in t&&o(2,l=t.outputPageExists),"order"in t&&o(3,c=t.order),"numCollections"in t&&o(4,d=t.numCollections)},[s,a,l,c,d,n,r,f,m,g,function(t){const e=t.target.value;let o=t.target.id.split("-")[3];const n=r.COLLECTIONS[s][o]||"";["includePage","outputPage"].includes(o)?e!==n&&h("message",{msgType:"changeName",pageType:o,collectionName:s,pageName:e}):Kr(`Unknown page type ${o}`,"error")},function(t){if(!t.srcElement.checked)return t.preventDefault(),Kr("<p>There must always be a default collection. \n        Change the default collection by selecting another collection as the new default.</p>","warning"),!1;p(ua,n.needToSaveCollections=!0,n),p(ca,r.DEFAULT_ACTIVE_COLLECTION=s,r)},function(){let t=r.COLLECTIONS_ORDER.indexOf(s);r.COLLECTIONS_ORDER.splice(t,1),r.COLLECTIONS_ORDER.splice(t-1,0,s),ca.set(r),p(ca,r.DEFAULT_ACTIVE_COLLECTION=s,r),p(ua,n.needToSaveCollections=!0,n)},function(){let t=r.COLLECTIONS_ORDER.indexOf(s);r.COLLECTIONS_ORDER.splice(t,1),r.COLLECTIONS_ORDER.splice(t+1,0,s),ca.set(r),p(ca,r.DEFAULT_ACTIVE_COLLECTION=s,r),p(ua,n.needToSaveCollections=!0,n)},function(){Xr(`<p>Are you sure you want to delete the collection <em>${s}</em>?</p>`).then((t=>{if(t){let t=r.COLLECTIONS_ORDER.indexOf(s);r.COLLECTIONS_ORDER.splice(t,1),ca.set(r),r.DEFAULT_ACTIVE_COLLECTION===s&&p(ca,r.DEFAULT_ACTIVE_COLLECTION=r.COLLECTIONS_ORDER[0],r),n.currentCollection===s&&p(ua,n.currentCollection=r.DEFAULT_ACTIVE_COLLECTION,n);for(const t in r.MODULES)r.MODULES[t].collection===s&&p(ca,r.MODULES[t].collection=null,r);delete r.COLLECTIONS[s],p(ua,n.needToSaveCollections=!0,n)}}))},function(t){const e=t.target.value;Xr(`<p>Are you sure you want to change the collection's name from \n          <em>${s}</em> to <em>${e}</em></p>`).then((o=>{if(o){let t=r.COLLECTIONS_ORDER.indexOf(s);p(ca,r.COLLECTIONS_ORDER[t]=e,r),r.DEFAULT_ACTIVE_COLLECTION===s&&p(ca,r.DEFAULT_ACTIVE_COLLECTION=e,r),n.currentCollection===s&&p(ua,n.currentCollection=r.DEFAULT_ACTIVE_COLLECTION,n);for(const t in r.MODULES)r.MODULES[t].collection===s&&p(ca,r.MODULES[t].collection=e,r);p(ca,r.COLLECTIONS[e]=r.COLLECTIONS[s],r),delete r.COLLECTIONS[s],p(ua,n.needToSaveCollections=!0,n)}else t.target.value=s}))},b,y,function(){r.COLLECTIONS[s].representation=$(this),ca.set(r),o(9,g)},()=>p(ua,n.needToSaveCollections=!0,n),function(){r.COLLECTIONS[s].hide=this.checked,ca.set(r),o(9,g)},()=>p(ua,n.needToSaveCollections=!0,n),function(){r.COLLECTIONS[s].unallocated=this.checked,ca.set(r),o(9,g)},()=>p(ua,n.needToSaveCollections=!0,n),()=>p(ua,n.needToSaveCollections=!0,n),()=>p(ua,n.needToSaveCollections=!0,n),function(){r.COLLECTIONS[s].includeAfter=this.checked,ca.set(r),o(9,g)},()=>{b(s)}]}class bl extends ct{constructor(t){super(),lt(this,t,gl,ml,i,{collectionName:0,includePageExists:1,outputPageExists:2,order:3,numCollections:4},null,[-1,-1])}}function vl(t,e,o){const n=t.slice();return n[7]=e[o],n[8]=e,n[9]=o,n}function yl(t){let e;return{c(){e=v("p"),e.textContent="No collections have been defined",S(e,"class","svelte-hus6yv")},m(t,o){m(t,e,o)},d(t){t&&g(e)}}}function wl(t){let e,o,n,r;function i(e){t[4](e,t[7])}function s(e){t[5](e,t[7])}let a={collectionName:t[7],order:t[9],numCollections:t[2].COLLECTIONS_ORDER.length};return void 0!==t[0][t[7]]&&(a.includePageExists=t[0][t[7]]),void 0!==t[1][t[7]]&&(a.outputPageExists=t[1][t[7]]),e=new bl({props:a}),z.push((()=>nt(e,"includePageExists",i,t[0][t[7]]))),z.push((()=>nt(e,"outputPageExists",s,t[1][t[7]]))),e.$on("message",t[6]),{c(){rt(e.$$.fragment)},m(t,o){it(e,t,o),r=!0},p(r,i){t=r;const s={};4&i&&(s.collectionName=t[7]),4&i&&(s.numCollections=t[2].COLLECTIONS_ORDER.length),!o&&5&i&&(o=!0,s.includePageExists=t[0][t[7]],W((()=>o=!1))),!n&&6&i&&(n=!0,s.outputPageExists=t[1][t[7]],W((()=>n=!1))),e.$set(s)},i(t){r||(et(e.$$.fragment,t),r=!0)},o(t){ot(e.$$.fragment,t),r=!1},d(t){st(e,t)}}}function xl(t){let e,o,n,r,i,s,a,l,c,d,u,h=t[3].existing.tooltip+"",p=0===t[2].COLLECTIONS_ORDER.length&&yl(),y=t[2].COLLECTIONS_ORDER,k=[];for(let e=0;e<y.length;e+=1)k[e]=wl(vl(t,y,e));const C=t=>ot(k[t],1,1,(()=>{k[t]=null}));return{c(){e=v("strong"),e.textContent="Existing Collections",o=w(),n=v("sl-tooltip"),r=v("div"),i=w(),s=v("a"),a=v("i"),l=w(),p&&p.c(),c=w();for(let t=0;t<k.length;t+=1)k[t].c();d=x(),S(r,"slot","content"),S(a,"class","icon-question cc-module-icon"),S(s,"href",t[3].existing.url),S(s,"rel","noreferrer"),S(s,"target","_blank")},m(t,g){m(t,e,g),m(t,o,g),m(t,n,g),f(n,r),r.innerHTML=h,f(n,i),f(n,s),f(s,a),m(t,l,g),p&&p.m(t,g),m(t,c,g);for(let e=0;e<k.length;e+=1)k[e].m(t,g);m(t,d,g),u=!0},p(t,[e]){if(0===t[2].COLLECTIONS_ORDER.length?p||(p=yl(),p.c(),p.m(c.parentNode,c)):p&&(p.d(1),p=null),7&e){let o;for(y=t[2].COLLECTIONS_ORDER,o=0;o<y.length;o+=1){const n=vl(t,y,o);k[o]?(k[o].p(n,e),et(k[o],1)):(k[o]=wl(n),k[o].c(),et(k[o],1),k[o].m(d.parentNode,d))}for(Z(),o=y.length;o<k.length;o+=1)C(o);tt()}},i(t){if(!u){for(let t=0;t<y.length;t+=1)et(k[t]);u=!0}},o(t){k=k.filter(Boolean);for(let t=0;t<k.length;t+=1)ot(k[t]);u=!1},d(t){t&&g(e),t&&g(o),t&&g(n),t&&g(l),p&&p.d(t),t&&g(c),b(k,t),t&&g(d)}}}function kl(t,e,o){let n;u(t,ca,(t=>o(2,n=t)));let{includePageExists:r={}}=e,{outputPageExists:i={}}=e;return t.$$set=t=>{"includePageExists"in t&&o(0,r=t.includePageExists),"outputPageExists"in t&&o(1,i=t.outputPageExists)},[r,i,n,{existing:{url:"https://djplaner.github.io/canvas-collections/reference/collections/overview/#existing-collections",tooltip:"<p>The collections already defined for this course.</p>"}},function(e,n){t.$$.not_equal(r[n],e)&&(r[n]=e,o(0,r))},function(e,n){t.$$.not_equal(i[n],e)&&(i[n]=e,o(1,i))},function(e){H.call(this,t,e)}]}class Cl extends ct{constructor(t){super(),lt(this,t,kl,xl,i,{includePageExists:0,outputPageExists:1})}}function Sl(t,e,o){const n=t.slice();return n[1]=e[o],n}function El(e){let o,n,r=e[1]+"";return{c(){o=v("option"),n=y(r),o.__value=e[1],o.value=o.__value},m(t,e){m(t,o,e),f(o,n)},p:t,d(t){t&&g(o)}}}function _l(e){let o,r,i,s,a,l,c,d,u,h,p,y,x,E,_,$,M,D,A,I,P,N,U,H,q,z,R,j=e[4].newCollection.tooltip+"",B=e[4].representation.tooltip+"",F=e[2],W=[];for(let t=0;t<F.length;t+=1)W[t]=El(Sl(e,F,t));return{c(){o=v("strong"),o.textContent="Add a new Collection",r=w(),i=v("sl-tooltip"),s=v("div"),a=w(),l=v("a"),c=v("i"),d=w(),u=v("div"),h=v("div"),p=v("input"),y=w(),x=v("div"),E=v("label"),E.textContent="Representation",_=w(),$=v("sl-tooltip"),M=v("div"),D=w(),A=v("a"),I=v("i"),P=w(),N=v("select");for(let t=0;t<W.length;t+=1)W[t].c();U=w(),H=v("fieldset"),q=v("button"),q.textContent="Add",S(s,"slot","content"),S(c,"class","icon-question cc-module-icon"),S(l,"href",e[4].newCollection.url),S(l,"target","_blank"),S(l,"rel","noreferrer"),S(p,"type","text"),S(p,"id","cc-config-new-collection-name"),S(p,"placeholder","Name for new collection"),S(p,"class","svelte-ngt5p6"),S(h,"class","ic-Form-control"),L(h,"margin-bottom","0px"),S(E,"for","cc-config-new-collection-representation"),S(E,"class","svelte-ngt5p6"),S(M,"slot","content"),S(I,"class","icon-question cc-module-icon"),S(A,"href",e[4].representation.url),S(A,"target","_blank"),S(A,"rel","noreferrer"),S(N,"id","cc-config-new-collection-representation"),S(N,"class","cc-collection-representation svelte-ngt5p6"),void 0===e[1]&&V((()=>e[6].call(N))),S(x,"class","cc-collection-representation svelte-ngt5p6"),S(q,"class","btn btn-primary svelte-ngt5p6"),S(q,"id","cc-config-new-collection-button"),S(H,"class","ic-Fieldset ic-Fieldset--radio-checkbox"),S(u,"class","cc-config-collection border border-trbl svelte-ngt5p6")},m(t,n){m(t,o,n),m(t,r,n),m(t,i,n),f(i,s),s.innerHTML=j,f(i,a),f(i,l),f(l,c),m(t,d,n),m(t,u,n),f(u,h),f(h,p),O(p,e[0]),f(u,y),f(u,x),f(x,E),f(x,_),f(x,$),f($,M),M.innerHTML=B,f($,D),f($,A),f(A,I),f(x,P),f(x,N);for(let t=0;t<W.length;t+=1)W[t].m(N,null);T(N,e[1]),f(u,U),f(u,H),f(H,q),z||(R=[k(p,"input",e[5]),k(N,"change",e[6]),k(q,"click",C(e[3]))],z=!0)},p(t,[e]){if(1&e&&p.value!==t[0]&&O(p,t[0]),4&e){let o;for(F=t[2],o=0;o<F.length;o+=1){const n=Sl(t,F,o);W[o]?W[o].p(n,e):(W[o]=El(n),W[o].c(),W[o].m(N,null))}for(;o<W.length;o+=1)W[o].d(1);W.length=F.length}6&e&&T(N,t[1])},i:t,o:t,d(t){t&&g(o),t&&g(r),t&&g(i),t&&g(d),t&&g(u),b(W,t),z=!1,n(R)}}}function Ol(t,e,o){let n,r,i;u(t,ua,(t=>o(7,n=t))),u(t,ca,(t=>o(8,r=t))),u(t,ha,(t=>o(9,i=t)));let s="",a="",l=Object.getOwnPropertyNames(i);const c={name:"",representation:"",outputPage:"",hide:!1,includePage:"",includeAfter:!1};return[s,a,l,function(){if(""===s||""===a)return""===s&&Kr("<p>Please enter a name for the new collection</p>","danger"),void(""===a&&Kr("<p>Please select a representation for the new collection</p>","danger"));if(r.COLLECTIONS[s])return void Kr(`<p>Collection name <strong>${s}</strong> already exists</p>`,"danger");let t=Object.assign({},c);t.name=s,t.representation=a,p(ca,r.COLLECTIONS[s]=t,r),""===r.DEFAULT_ACTIVE_COLLECTION&&p(ca,r.DEFAULT_ACTIVE_COLLECTION=s,r),r.COLLECTIONS_ORDER.push(s),o(0,s=""),o(1,a=""),p(ua,n.needToSaveCollections=!0,n)},{newCollection:{url:"https://djplaner.github.io/canvas-collections/reference/collections/overview/#add-a-new-collection",tooltip:"<p>Create a new collection</p>"},representation:{url:"https://djplaner.github.io/canvas-collections/reference/representations/overview/",tooltip:"<p>Choose an initial representation. Can be changed later.</p>"}},function(){s=this.value,o(0,s)},function(){a=$(this),o(1,a),o(2,l)}]}class Ll extends ct{constructor(t){super(),lt(this,t,Ol,_l,i,{})}}function Tl(e){let o,r,i,s,a,l,c,d,u,h,p,b,y,x,C,E,_,O,T,$,M,D,A,I,P,N,U,H=e[1].fullClaytons.tooltip+"",q=e[1].navBarOptions.tooltip+"";return{c(){o=v("div"),r=v("div"),i=v("strong"),i.textContent='Full "Claytons"',s=w(),a=v("sl-tooltip"),l=v("div"),c=w(),d=v("a"),u=v("i"),h=w(),p=v("div"),b=v("label"),b.textContent="Navigation Bar Options",y=w(),x=v("sl-tooltip"),C=v("div"),E=w(),_=v("a"),O=v("i"),T=w(),$=v("div"),M=v("button"),M.textContent="None",D=w(),A=v("button"),A.textContent="Pages",I=w(),P=v("button"),P.textContent="Tabs",S(l,"slot","content"),S(u,"class","icon-question cc-module-icon"),S(d,"target","_blank"),S(d,"rel","noreferrer"),S(d,"href",e[1].fullClaytons.url),S(b,"for","cc-config-full-claytons-navigation-option"),S(C,"slot","content"),S(O,"class","icon-question cc-module-icon"),S(_,"target","_blank"),S(_,"rel","noreferrer"),S(_,"href",e[1].navBarOptions.url),S(M,"class","btn svelte-9blo5x"),S(A,"class","btn svelte-9blo5x"),S(P,"class","btn svelte-9blo5x"),S($,"class","cc-config-full-claytons-navigation-option svelte-9blo5x"),S(p,"class","border border-trbl"),L(p,"padding","0.5em"),L(o,"margin-top","0.5em")},m(t,n){m(t,o,n),f(o,r),f(r,i),f(r,s),f(r,a),f(a,l),l.innerHTML=H,f(a,c),f(a,d),f(d,u),f(o,h),f(o,p),f(p,b),f(p,y),f(p,x),f(x,C),C.innerHTML=q,f(x,E),f(x,_),f(_,O),f(p,T),f(p,$),f($,M),f($,D),f($,A),f($,I),f($,P),N||(U=[k(M,"click",e[2]),k(A,"click",e[3]),k(P,"click",e[4])],N=!0)},p:t,i:t,o:t,d(t){t&&g(o),N=!1,n(U)}}}function $l(t){const e=U();function o(t){const e=["none","pages","tabs"].indexOf(t)+1;new ll(void 0,n,e).execute()}function n(t){let o=t.generateOutcomesString("Full Claytons update");if(t.getPageNamesUpdated().forEach((t=>{e("message",{msgType:"updatePage",pageType:"outputPage",pageName:t})})),!t.singleCollection){Kr(o,t.getNumErrors()>0?"danger":"success")}}return[o,{fullClaytons:{tooltip:"<p>Update all the specified output pages with static representations of each collection using the selected navigation options.</p>",url:"https://djplaner.github.io/canvas-collections/reference/representations/claytons/overview"},navBarOptions:{tooltip:"<p>There are three navigation bar options:</p>\n\t\t<ol>\n\t\t  <li> None - no navigation between pages/collections. </li>\n\t\t  <li> Pages - collections on separate pages with navigation between. </li>\n\t\t  <li> Tabs - multiple collections on a page with tab navigation. </li>\n\t\t</ol>",url:"https://djplaner.github.io/canvas-collections/reference/representations/claytons/overview/#navigation-bar-options"}},()=>o("none"),()=>o("pages"),()=>o("tabs")]}class Ml extends ct{constructor(t){super(),lt(this,t,$l,Tl,i,{})}}function Dl(t,e,o){const n=t.slice();return n[14]=e[o],n}function Al(e){let o,n,r=e[14]+"";return{c(){o=v("option"),n=y(r),o.__value=e[14],o.value=o.__value},m(t,e){m(t,o,e),f(o,n)},p:t,d(t){t&&g(o)}}}function Il(t){let e,o,r,i,s,a,l,c,d,u,h,p,x,C,E,_,O,L,$,M,D,A,I,P,N,U,H,q,R,j,B,F=t[6].visibility.tooltip+"",G=t[4],K=[];for(let e=0;e<G.length;e+=1)K[e]=Al(Dl(t,G,e));function X(e){t[9](e)}function J(e){t[10](e)}let Y={};return void 0!==t[0]&&(Y.includePageExists=t[0]),void 0!==t[1]&&(Y.outputPageExists=t[1]),D=new Cl({props:Y}),z.push((()=>nt(D,"includePageExists",X,t[0]))),z.push((()=>nt(D,"outputPageExists",J,t[1]))),D.$on("message",t[5]),U=new Ll({}),q=new Ml({}),q.$on("message",t[5]),{c(){e=v("div"),o=v("div"),r=v("p"),i=y("Configure Canvas Collections\r\n      "),s=v("span"),s.textContent=`${Pl}`,a=w(),l=v("div"),c=v("small"),c.textContent="Visibility",d=w(),u=v("sl-tooltip"),h=v("div"),p=w(),x=v("a"),C=v("i"),E=w(),_=v("select");for(let t=0;t<K.length;t+=1)K[t].c();O=w(),L=v("div"),$=v("div"),M=v("div"),rt(D.$$.fragment),P=w(),N=v("div"),rt(U.$$.fragment),H=w(),rt(q.$$.fragment),S(s,"class","cc-version svelte-c0xrn2"),S(r,"class","svelte-c0xrn2"),S(o,"class","cc-header cc-collections-label svelte-c0xrn2"),S(h,"slot","content"),S(C,"class","icon-question cc-module-icon"),S(x,"target","_blank"),S(x,"rel","noreferrer"),S(x,"href",t[6].visibility.url),S(_,"id","cc-collection-visibility"),S(_,"class","cc-collection-representation svelte-c0xrn2"),void 0===t[3].VISIBILITY&&V((()=>t[7].call(_))),S(l,"class","cc-collections-input"),S(e,"class","cc-header-grid svelte-c0xrn2"),S(M,"id","cc-config-existing-collections"),S(N,"id","cc-config-new-collection"),S($,"id","cc-config-body"),S($,"class","svelte-c0xrn2"),S(L,"class","cc-box-body svelte-c0xrn2")},m(n,g){m(n,e,g),f(e,o),f(o,r),f(r,i),f(r,s),f(e,a),f(e,l),f(l,c),f(l,d),f(l,u),f(u,h),h.innerHTML=F,f(u,p),f(u,x),f(x,C),f(l,E),f(l,_);for(let t=0;t<K.length;t+=1)K[t].m(_,null);T(_,t[3].VISIBILITY),m(n,O,g),m(n,L,g),f(L,$),f($,M),it(D,M,null),f($,P),f($,N),it(U,N,null),f(N,H),it(q,N,null),R=!0,j||(B=[k(_,"change",t[7]),k(_,"change",t[8])],j=!0)},p(t,[e]){if(16&e){let o;for(G=t[4],o=0;o<G.length;o+=1){const n=Dl(t,G,o);K[o]?K[o].p(n,e):(K[o]=Al(n),K[o].c(),K[o].m(_,null))}for(;o<K.length;o+=1)K[o].d(1);K.length=G.length}24&e&&T(_,t[3].VISIBILITY);const o={};!A&&1&e&&(A=!0,o.includePageExists=t[0],W((()=>A=!1))),!I&&2&e&&(I=!0,o.outputPageExists=t[1],W((()=>I=!1))),D.$set(o)},i(t){R||(et(D.$$.fragment,t),et(U.$$.fragment,t),et(q.$$.fragment,t),R=!0)},o(t){ot(D.$$.fragment,t),ot(U.$$.fragment,t),ot(q.$$.fragment,t),R=!1},d(t){t&&g(e),b(K,t),t&&g(O),t&&g(L),st(D),st(U),st(q),j=!1,n(B)}}}const Pl="1.0.1b";function Nl(t,e,o){let n,r;u(t,ua,(t=>o(2,n=t))),u(t,ca,(t=>o(3,r=t)));const i=["no-one","students","teachers","all"];let s={},a={};r.COLLECTIONS_ORDER.forEach((t=>{o(0,s[t]=!0,s),o(1,a[t]=!0,a)}));let l=c();function c(){let t={};return r.COLLECTIONS_ORDER.forEach((e=>{["includePage","outputPage"].forEach((o=>{const n=r.COLLECTIONS[e][o],i={pageType:o,collectionName:e};n&&""!==n&&(t.hasOwnProperty(n)||(t[n]=[]),t[n].push(i))}))})),t}function d(t,e){const n=e.body;let r=!1;n&&(r=!0),l[t].forEach((t=>{const e=t.pageType,n=t.collectionName;"includePage"===e?o(0,s[n]=r,s):o(1,a[n]=r,a)}))}Object.keys(l).forEach((t=>{Mt(t,n.courseId,d)}));return[s,a,n,r,i,function(t){"changeName"===t.detail.msgType&&(p(ca,r.COLLECTIONS[t.detail.collectionName][t.detail.pageType]=t.detail.pageName,r),p(ua,n.needToSaveCollections=!0,n),l=c()),Mt(t.detail.pageName,n.courseId,d)},{visibility:{tooltip:"<p>Who can see Collections modification of the modules page.</p>",url:"https://djplaner.github.io/canvas-collections/reference/visibility/"}},function(){r.VISIBILITY=$(this),ca.set(r),o(4,i)},()=>p(ua,n.needToSaveCollections=!0,n),function(t){s=t,o(0,s)},function(t){a=t,o(1,a)}]}class Ul extends ct{constructor(t){super(),lt(this,t,Nl,Il,i,{})}}class Hl{constructor(t,e){this.finishedCallBack=t,this.config=e,this.currentHostName=document.location.hostname,this.baseApiUrl=`https://${this.currentHostName}/api/v1`,this.config.courseId=parseInt(this.config.courseId),this.requestCourseObject()}refreshCanvasDetails(t){this.finishedCallBack=t,this.requestCourseObject()}requestCourseObject(){$t(`${this.baseApiUrl}/courses/${this.config.courseId}`).then((t=>{200===t.status&&(this.courseObject=t.body,this.generateSTRM(),this.requestModuleInformation())}))}generateSTRM(){this.hasOwnProperty("calendar")||(this.calendar=new ht),this.studyPeriod=this.calendar.getCurrentPeriod(this.courseObject.course_code),this.calendar.setStudyPeriod(this.studyPeriod),this.parseStrm()}parseStrm(){if(this.type=void 0,this.year=void 0,this.period=void 0,void 0===this.strm)return;const t=this.strm.split("");if(t.length>4)return void console.error(`cc_Controller: parseStrm: strm too long: ${this.strm}`);for(let e=0;e<t.length;e++)if(isNaN(t[e]))return void console.error(`cc_Controller: parseStrm: strm not numeric: ${this.strm}`);this.type=t[0],this.year=`20${t[1]}${t[2]}`,this.period=t[3];let e={1:1,5:2,8:3};2===this.type&&(e={1:1,2:1,3:2,4:2,5:3,6:3,7:4}),this.period=e[this.period]}requestModuleInformation(){$t(`${this.baseApiUrl}/courses/${this.config.courseId}/modules?include=content_details&per_page=500`).then((t=>{200===t.status&&(this.courseModules=t.body,this.finishedCallBack())}))}}function ql(t,e){return new Promise((o=>{t.addEventListener(e,(function n(r){r.target===t&&(t.removeEventListener(e,n),o())}))}))}var zl=Object.defineProperty,Rl=Object.defineProperties,jl=Object.getOwnPropertyDescriptor,Bl=Object.getOwnPropertyDescriptors,Fl=Object.getOwnPropertySymbols,Vl=Object.prototype.hasOwnProperty,Wl=Object.prototype.propertyIsEnumerable,Gl=(t,e,o)=>e in t?zl(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,Kl=(t,e)=>{for(var o in e||(e={}))Vl.call(e,o)&&Gl(t,o,e[o]);if(Fl)for(var o of Fl(e))Wl.call(e,o)&&Gl(t,o,e[o]);return t},Xl=(t,e)=>Rl(t,Bl(e)),Jl=(t,e)=>{var o={};for(var n in t)Vl.call(t,n)&&e.indexOf(n)<0&&(o[n]=t[n]);if(null!=t&&Fl)for(var n of Fl(t))e.indexOf(n)<0&&Wl.call(t,n)&&(o[n]=t[n]);return o},Yl=(t,e,o,n)=>{for(var r,i=n>1?void 0:n?jl(e,o):e,s=t.length-1;s>=0;s--)(r=t[s])&&(i=(n?r(e,o,i):r(i))||i);return n&&i&&zl(e,o,i),i};function Ql(t,e,o){return new Promise((n=>{if((null==o?void 0:o.duration)===1/0)throw new Error("Promise-based animations must be finite.");const r=t.animate(e,Xl(Kl({},o),{duration:tc()?0:o.duration}));r.addEventListener("cancel",n,{once:!0}),r.addEventListener("finish",n,{once:!0})}))}function Zl(t){return(t=t.toString().toLowerCase()).indexOf("ms")>-1?parseFloat(t):t.indexOf("s")>-1?1e3*parseFloat(t):parseFloat(t)}function tc(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}function ec(t){return Promise.all(t.getAnimations().map((t=>new Promise((e=>{const o=requestAnimationFrame(e);t.addEventListener("cancel",(()=>o),{once:!0}),t.addEventListener("finish",(()=>o),{once:!0}),t.cancel()})))))}var oc=new Map,nc=new WeakMap;function rc(t,e){return"rtl"===e.toLowerCase()?{keyframes:t.rtlKeyframes||t.keyframes,options:t.options}:t}function ic(t,e){oc.set(t,function(t){return null!=t?t:{keyframes:[],options:{duration:0}}}(e))}function sc(t,e,o){const n=nc.get(t);if(null==n?void 0:n[e])return rc(n[e],o.dir);const r=oc.get(e);return r?rc(r,o.dir):{keyframes:[],options:{duration:0}}}var ac,lc=new Set,cc=new MutationObserver(pc),dc=new Map,uc=document.documentElement.dir||"ltr",hc=document.documentElement.lang||navigator.language;function pc(){uc=document.documentElement.dir||"ltr",hc=document.documentElement.lang||navigator.language,[...lc.keys()].map((t=>{"function"==typeof t.requestUpdate&&t.requestUpdate()}))}cc.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]});var fc=class{constructor(t){this.host=t,this.host.addController(this)}hostConnected(){lc.add(this.host)}hostDisconnected(){lc.delete(this.host)}dir(){return`${this.host.dir||uc}`.toLowerCase()}lang(){return`${this.host.lang||hc}`.toLowerCase()}term(t,...e){var o,n;const r=new Intl.Locale(this.lang()),i=null==r?void 0:r.language.toLowerCase(),s=null!==(n=null===(o=null==r?void 0:r.region)||void 0===o?void 0:o.toLowerCase())&&void 0!==n?n:"",a=dc.get(`${i}-${s}`),l=dc.get(i);let c;if(a&&a[t])c=a[t];else if(l&&l[t])c=l[t];else{if(!ac||!ac[t])return console.error(`No translation found for: ${String(t)}`),String(t);c=ac[t]}return"function"==typeof c?c(...e):c}date(t,e){return t=new Date(t),new Intl.DateTimeFormat(this.lang(),e).format(t)}number(t,e){return t=Number(t),isNaN(t)?"":new Intl.NumberFormat(this.lang(),e).format(t)}relativeTime(t,e,o){return new Intl.RelativeTimeFormat(this.lang(),o).format(t,e)}},mc=class extends fc{};!function(...t){t.map((t=>{const e=t.$code.toLowerCase();dc.has(e)?dc.set(e,Object.assign(Object.assign({},dc.get(e)),t)):dc.set(e,t),ac||(ac=t)})),pc()}({$code:"en",$name:"English",$dir:"ltr",clearEntry:"Clear entry",close:"Close",copy:"Copy",numOptionsSelected:t=>0===t?"No options selected":1===t?"1 option selected":`${t} options selected`,currentValue:"Current value",hidePassword:"Hide password",loading:"Loading",progress:"Progress",remove:"Remove",resize:"Resize",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",toggleColorFormat:"Toggle color format"});var gc=class{constructor(t,...e){this.slotNames=[],(this.host=t).addController(this),this.slotNames=e,this.handleSlotChange=this.handleSlotChange.bind(this)}hasDefaultSlot(){return[...this.host.childNodes].some((t=>{if(t.nodeType===t.TEXT_NODE&&""!==t.textContent.trim())return!0;if(t.nodeType===t.ELEMENT_NODE){const e=t;if("sl-visually-hidden"===e.tagName.toLowerCase())return!1;if(!e.hasAttribute("slot"))return!0}return!1}))}hasNamedSlot(t){return null!==this.host.querySelector(`:scope > [slot="${t}"]`)}test(t){return"[default]"===t?this.hasDefaultSlot():this.hasNamedSlot(t)}hostConnected(){this.host.shadowRoot.addEventListener("slotchange",this.handleSlotChange)}hostDisconnected(){this.host.shadowRoot.removeEventListener("slotchange",this.handleSlotChange)}handleSlotChange(t){const e=t.target;(this.slotNames.includes("[default]")&&!e.name||e.name&&this.slotNames.includes(e.name))&&this.host.requestUpdate()}};function bc(t,e){const o=Kl({waitUntilFirstUpdate:!1},e);return(e,n)=>{const{update:r}=e,i=Array.isArray(t)?t:[t];e.update=function(t){i.forEach((e=>{const r=e;if(t.has(r)){const e=t.get(r),i=this[r];e!==i&&(o.waitUntilFirstUpdate&&!this.hasUpdated||this[n](e,i))}})),r.call(this,t)}}}var vc,yc,wc=window,xc=wc.ShadowRoot&&(void 0===wc.ShadyCSS||wc.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,kc=Symbol(),Cc=new WeakMap,Sc=class{constructor(t,e,o){if(this._$cssResult$=!0,o!==kc)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(xc&&void 0===t){const o=void 0!==e&&1===e.length;o&&(t=Cc.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),o&&Cc.set(e,t))}return t}toString(){return this.cssText}},Ec=(t,...e)=>{const o=1===t.length?t[0]:e.reduce(((e,o,n)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+t[n+1]),t[0]);return new Sc(o,t,kc)},_c=xc?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const o of t.cssRules)e+=o.cssText;return(t=>new Sc("string"==typeof t?t:t+"",void 0,kc))(e)})(t):t,Oc=window,Lc=Oc.trustedTypes,Tc=Lc?Lc.emptyScript:"",$c=Oc.reactiveElementPolyfillSupport,Mc={toAttribute(t,e){switch(e){case Boolean:t=t?Tc:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let o=t;switch(e){case Boolean:o=null!==t;break;case Number:o=null===t?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch(t){o=null}}return o}},Dc=(t,e)=>e!==t&&(e==e||t==t),Ac={attribute:!0,type:String,converter:Mc,reflect:!1,hasChanged:Dc},Ic=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,o)=>{const n=this._$Ep(o,e);void 0!==n&&(this._$Ev.set(n,o),t.push(n))})),t}static createProperty(t,e=Ac){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const o="symbol"==typeof t?Symbol():"__"+t,n=this.getPropertyDescriptor(t,o,e);void 0!==n&&Object.defineProperty(this.prototype,t,n)}}static getPropertyDescriptor(t,e,o){return{get(){return this[e]},set(n){const r=this[t];this[e]=n,this.requestUpdate(t,r,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||Ac}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const o of e)this.createProperty(o,t[o])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const o=new Set(t.flat(1/0).reverse());for(const t of o)e.unshift(_c(t))}else void 0!==t&&e.push(_c(t));return e}static _$Ep(t,e){const o=e.attribute;return!1===o?void 0:"string"==typeof o?o:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,o;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(o=t.hostConnected)||void 0===o||o.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const e=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{xc?t.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):e.forEach((e=>{const o=document.createElement("style"),n=wc.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,t.appendChild(o)}))})(e,this.constructor.elementStyles),e}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,o){this._$AK(t,o)}_$EO(t,e,o=Ac){var n;const r=this.constructor._$Ep(t,o);if(void 0!==r&&!0===o.reflect){const i=(void 0!==(null===(n=o.converter)||void 0===n?void 0:n.toAttribute)?o.converter:Mc).toAttribute(e,o.type);this._$El=t,null==i?this.removeAttribute(r):this.setAttribute(r,i),this._$El=null}}_$AK(t,e){var o;const n=this.constructor,r=n._$Ev.get(t);if(void 0!==r&&this._$El!==r){const t=n.getPropertyOptions(r),i="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(o=t.converter)||void 0===o?void 0:o.fromAttribute)?t.converter:Mc;this._$El=r,this[r]=i.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,o){let n=!0;void 0!==t&&(((o=o||this.constructor.getPropertyOptions(t)).hasChanged||Dc)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===o.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,o))):n=!1),!this.isUpdatePending&&n&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,e)=>this[e]=t)),this._$Ei=void 0);let e=!1;const o=this._$AL;try{e=this.shouldUpdate(o),e?(this.willUpdate(o),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(o)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(o)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,e)=>this._$EO(e,this[e],t))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};Ic.finalized=!0,Ic.elementProperties=new Map,Ic.elementStyles=[],Ic.shadowRootOptions={mode:"open"},null==$c||$c({ReactiveElement:Ic}),(null!==(vc=Oc.reactiveElementVersions)&&void 0!==vc?vc:Oc.reactiveElementVersions=[]).push("1.6.1");var Pc=window,Nc=Pc.trustedTypes,Uc=Nc?Nc.createPolicy("lit-html",{createHTML:t=>t}):void 0,Hc=`lit$${(Math.random()+"").slice(9)}$`,qc="?"+Hc,zc=`<${qc}>`,Rc=document,jc=(t="")=>Rc.createComment(t),Bc=t=>null===t||"object"!=typeof t&&"function"!=typeof t,Fc=Array.isArray,Vc=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Wc=/-->/g,Gc=/>/g,Kc=RegExp(">|[ \t\n\f\r](?:([^\\s\"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)","g"),Xc=/'/g,Jc=/"/g,Yc=/^(?:script|style|textarea|title)$/i,Qc=(t=>(e,...o)=>({_$litType$:t,strings:e,values:o}))(1),Zc=Symbol.for("lit-noChange"),td=Symbol.for("lit-nothing"),ed=new WeakMap,od=Rc.createTreeWalker(Rc,129,null,!1),nd=class{constructor({strings:t,_$litType$:e},o){let n;this.parts=[];let r=0,i=0;const s=t.length-1,a=this.parts,[l,c]=((t,e)=>{const o=t.length-1,n=[];let r,i=2===e?"<svg>":"",s=Vc;for(let e=0;e<o;e++){const o=t[e];let a,l,c=-1,d=0;for(;d<o.length&&(s.lastIndex=d,l=s.exec(o),null!==l);)d=s.lastIndex,s===Vc?"!--"===l[1]?s=Wc:void 0!==l[1]?s=Gc:void 0!==l[2]?(Yc.test(l[2])&&(r=RegExp("</"+l[2],"g")),s=Kc):void 0!==l[3]&&(s=Kc):s===Kc?">"===l[0]?(s=null!=r?r:Vc,c=-1):void 0===l[1]?c=-2:(c=s.lastIndex-l[2].length,a=l[1],s=void 0===l[3]?Kc:'"'===l[3]?Jc:Xc):s===Jc||s===Xc?s=Kc:s===Wc||s===Gc?s=Vc:(s=Kc,r=void 0);const u=s===Kc&&t[e+1].startsWith("/>")?" ":"";i+=s===Vc?o+zc:c>=0?(n.push(a),o.slice(0,c)+"$lit$"+o.slice(c)+Hc+u):o+Hc+(-2===c?(n.push(void 0),e):u)}const a=i+(t[o]||"<?>")+(2===e?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==Uc?Uc.createHTML(a):a,n]})(t,e);if(this.el=nd.createElement(l,o),od.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(n=od.nextNode())&&a.length<s;){if(1===n.nodeType){if(n.hasAttributes()){const t=[];for(const e of n.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(Hc)){const o=c[i++];if(t.push(e),void 0!==o){const t=n.getAttribute(o.toLowerCase()+"$lit$").split(Hc),e=/([.?@])?(.*)/.exec(o);a.push({type:1,index:r,name:e[2],strings:t,ctor:"."===e[1]?ad:"?"===e[1]?cd:"@"===e[1]?dd:sd})}else a.push({type:6,index:r})}for(const e of t)n.removeAttribute(e)}if(Yc.test(n.tagName)){const t=n.textContent.split(Hc),e=t.length-1;if(e>0){n.textContent=Nc?Nc.emptyScript:"";for(let o=0;o<e;o++)n.append(t[o],jc()),od.nextNode(),a.push({type:2,index:++r});n.append(t[e],jc())}}}else if(8===n.nodeType)if(n.data===qc)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=n.data.indexOf(Hc,t+1));)a.push({type:7,index:r}),t+=Hc.length-1}r++}}static createElement(t,e){const o=Rc.createElement("template");return o.innerHTML=t,o}};function rd(t,e,o=t,n){var r,i,s,a;if(e===Zc)return e;let l=void 0!==n?null===(r=o._$Co)||void 0===r?void 0:r[n]:o._$Cl;const c=Bc(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==c&&(null===(i=null==l?void 0:l._$AO)||void 0===i||i.call(l,!1),void 0===c?l=void 0:(l=new c(t),l._$AT(t,o,n)),void 0!==n?(null!==(s=(a=o)._$Co)&&void 0!==s?s:a._$Co=[])[n]=l:o._$Cl=l),void 0!==l&&(e=rd(t,l._$AS(t,e.values),l,n)),e}var id=class{constructor(t,e,o,n){var r;this.type=2,this._$AH=td,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=o,this.options=n,this._$Cm=null===(r=null==n?void 0:n.isConnected)||void 0===r||r}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cm}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=rd(this,t,e),Bc(t)?t===td||null==t||""===t?(this._$AH!==td&&this._$AR(),this._$AH=td):t!==this._$AH&&t!==Zc&&this.g(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>Fc(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.k(t):this.g(t)}O(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}g(t){this._$AH!==td&&Bc(this._$AH)?this._$AA.nextSibling.data=t:this.T(Rc.createTextNode(t)),this._$AH=t}$(t){var e;const{values:o,_$litType$:n}=t,r="number"==typeof n?this._$AC(t):(void 0===n.el&&(n.el=nd.createElement(n.h,this.options)),n);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===r)this._$AH.p(o);else{const t=new class{constructor(t,e){this.u=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}v(t){var e;const{el:{content:o},parts:n}=this._$AD,r=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:Rc).importNode(o,!0);od.currentNode=r;let i=od.nextNode(),s=0,a=0,l=n[0];for(;void 0!==l;){if(s===l.index){let e;2===l.type?e=new id(i,i.nextSibling,this,t):1===l.type?e=new l.ctor(i,l.name,l.strings,this,t):6===l.type&&(e=new ud(i,this,t)),this.u.push(e),l=n[++a]}s!==(null==l?void 0:l.index)&&(i=od.nextNode(),s++)}return r}p(t){let e=0;for(const o of this.u)void 0!==o&&(void 0!==o.strings?(o._$AI(t,o,e),e+=o.strings.length-2):o._$AI(t[e])),e++}}(r,this),e=t.v(this.options);t.p(o),this.T(e),this._$AH=t}}_$AC(t){let e=ed.get(t.strings);return void 0===e&&ed.set(t.strings,e=new nd(t)),e}k(t){Fc(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let o,n=0;for(const r of t)n===e.length?e.push(o=new id(this.O(jc()),this.O(jc()),this,this.options)):o=e[n],o._$AI(r),n++;n<e.length&&(this._$AR(o&&o._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){var o;for(null===(o=this._$AP)||void 0===o||o.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cm=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}},sd=class{constructor(t,e,o,n,r){this.type=1,this._$AH=td,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=r,o.length>2||""!==o[0]||""!==o[1]?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=td}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,o,n){const r=this.strings;let i=!1;if(void 0===r)t=rd(this,t,e,0),i=!Bc(t)||t!==this._$AH&&t!==Zc,i&&(this._$AH=t);else{const n=t;let s,a;for(t=r[0],s=0;s<r.length-1;s++)a=rd(this,n[o+s],e,s),a===Zc&&(a=this._$AH[s]),i||(i=!Bc(a)||a!==this._$AH[s]),a===td?t=td:t!==td&&(t+=(null!=a?a:"")+r[s+1]),this._$AH[s]=a}i&&!n&&this.j(t)}j(t){t===td?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}},ad=class extends sd{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===td?void 0:t}},ld=Nc?Nc.emptyScript:"",cd=class extends sd{constructor(){super(...arguments),this.type=4}j(t){t&&t!==td?this.element.setAttribute(this.name,ld):this.element.removeAttribute(this.name)}},dd=class extends sd{constructor(t,e,o,n,r){super(t,e,o,n,r),this.type=5}_$AI(t,e=this){var o;if((t=null!==(o=rd(this,t,e,0))&&void 0!==o?o:td)===Zc)return;const n=this._$AH,r=t===td&&n!==td||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,i=t!==td&&(n===td||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,o;"function"==typeof this._$AH?this._$AH.call(null!==(o=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==o?o:this.element,t):this._$AH.handleEvent(t)}},ud=class{constructor(t,e,o){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(t){rd(this,t)}},hd=Pc.litHtmlPolyfillSupport;null==hd||hd(nd,id),(null!==(yc=Pc.litHtmlVersions)&&void 0!==yc?yc:Pc.litHtmlVersions=[]).push("2.6.1");var pd,fd,md=class extends Ic{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var t,e;const o=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=o.firstChild),o}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Dt=((t,e,o)=>{var n,r;const i=null!==(n=null==o?void 0:o.renderBefore)&&void 0!==n?n:e;let s=i._$litPart$;if(void 0===s){const t=null!==(r=null==o?void 0:o.renderBefore)&&void 0!==r?r:null;i._$litPart$=s=new id(e.insertBefore(jc(),t),t,void 0,null!=o?o:{})}return s._$AI(t),s})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!1)}render(){return Zc}};md.finalized=!0,md._$litElement$=!0,null===(pd=globalThis.litElementHydrateSupport)||void 0===pd||pd.call(globalThis,{LitElement:md});var gd=globalThis.litElementPolyfillSupport;null==gd||gd({LitElement:md}),(null!==(fd=globalThis.litElementVersions)&&void 0!==fd?fd:globalThis.litElementVersions=[]).push("3.2.0");
/*! Bundled license information:

    @lit/reactive-element/css-tag.js:
      (**
       * @license
       * Copyright 2019 Google LLC
       * SPDX-License-Identifier: BSD-3-Clause
       *)

    @lit/reactive-element/reactive-element.js:
      (**
       * @license
       * Copyright 2017 Google LLC
       * SPDX-License-Identifier: BSD-3-Clause
       *)

    lit-html/lit-html.js:
      (**
       * @license
       * Copyright 2017 Google LLC
       * SPDX-License-Identifier: BSD-3-Clause
       *)

    lit-element/lit-element.js:
      (**
       * @license
       * Copyright 2017 Google LLC
       * SPDX-License-Identifier: BSD-3-Clause
       *)

    lit-html/is-server.js:
      (**
       * @license
       * Copyright 2022 Google LLC
       * SPDX-License-Identifier: BSD-3-Clause
       *)
    */
var bd=Ec`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }
`,vd=Ec`
  ${bd}

  :host {
    display: contents;

    /* For better DX, we'll reset the margin here so the base part can inherit it */
    margin: 0;
  }

  .alert {
    position: relative;
    display: flex;
    align-items: stretch;
    background-color: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-top-width: calc(var(--sl-panel-border-width) * 3);
    border-radius: var(--sl-border-radius-medium);
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-normal);
    line-height: 1.6;
    color: var(--sl-color-neutral-700);
    margin: inherit;
  }

  .alert:not(.alert--has-icon) .alert__icon,
  .alert:not(.alert--closable) .alert__close-button {
    display: none;
  }

  .alert__icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-large);
    padding-inline-start: var(--sl-spacing-large);
  }

  .alert--primary {
    border-top-color: var(--sl-color-primary-600);
  }

  .alert--primary .alert__icon {
    color: var(--sl-color-primary-600);
  }

  .alert--success {
    border-top-color: var(--sl-color-success-600);
  }

  .alert--success .alert__icon {
    color: var(--sl-color-success-600);
  }

  .alert--neutral {
    border-top-color: var(--sl-color-neutral-600);
  }

  .alert--neutral .alert__icon {
    color: var(--sl-color-neutral-600);
  }

  .alert--warning {
    border-top-color: var(--sl-color-warning-600);
  }

  .alert--warning .alert__icon {
    color: var(--sl-color-warning-600);
  }

  .alert--danger {
    border-top-color: var(--sl-color-danger-600);
  }

  .alert--danger .alert__icon {
    color: var(--sl-color-danger-600);
  }

  .alert__message {
    flex: 1 1 auto;
    display: block;
    padding: var(--sl-spacing-large);
    overflow: hidden;
  }

  .alert__close-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-medium);
    padding-inline-end: var(--sl-spacing-medium);
  }
`,yd=1,wd=2,xd=3,kd=4,Cd=t=>(...e)=>({_$litDirective$:t,values:e}),Sd=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,o){this._$Ct=t,this._$AM=e,this._$Ci=o}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}},Ed=Cd(class extends Sd{constructor(t){var e;if(super(t),t.type!==yd||"class"!==t.name||(null===(e=t.strings)||void 0===e?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter((e=>t[e])).join(" ")+" "}update(t,[e]){var o,n;if(void 0===this.nt){this.nt=new Set,void 0!==t.strings&&(this.st=new Set(t.strings.join(" ").split(/\s/).filter((t=>""!==t))));for(const t in e)e[t]&&!(null===(o=this.st)||void 0===o?void 0:o.has(t))&&this.nt.add(t);return this.render(e)}const r=t.element.classList;this.nt.forEach((t=>{t in e||(r.remove(t),this.nt.delete(t))}));for(const t in e){const o=!!e[t];o===this.nt.has(t)||(null===(n=this.st)||void 0===n?void 0:n.has(t))||(o?(r.add(t),this.nt.add(t)):(r.remove(t),this.nt.delete(t)))}return Zc}}),_d=t=>e=>"function"==typeof e?((t,e)=>(customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:o,elements:n}=e;return{kind:o,elements:n,finisher(e){customElements.define(t,e)}}})(t,e),Od=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?Xl(Kl({},e),{finisher(o){o.createProperty(e.key,t)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(o){o.createProperty(e.key,t)}};function Ld(t){return(e,o)=>void 0!==o?((t,e,o)=>{e.constructor.createProperty(o,t)})(t,e,o):Od(t,e)}function Td(t){return Ld(Xl(Kl({},t),{state:!0}))}var $d;function Md(t,e){return(({finisher:t,descriptor:e})=>(o,n)=>{var r;if(void 0===n){const n=null!==(r=o.originalKey)&&void 0!==r?r:o.key,i=null!=e?{kind:"method",placement:"prototype",key:n,descriptor:e(o.key)}:Xl(Kl({},o),{key:n});return null!=t&&(i.finisher=function(e){t(e,n)}),i}{const r=o.constructor;void 0!==e&&Object.defineProperty(o,n,e(n)),null==t||t(r,n)}})({descriptor:o=>{const n={get(){var e,o;return null!==(o=null===(e=this.renderRoot)||void 0===e?void 0:e.querySelector(t))&&void 0!==o?o:null},enumerable:!0,configurable:!0};if(e){const e="symbol"==typeof o?Symbol():"__"+o;n.get=function(){var o,n;return void 0===this[e]&&(this[e]=null!==(n=null===(o=this.renderRoot)||void 0===o?void 0:o.querySelector(t))&&void 0!==n?n:null),this[e]}}return n}})}null===($d=window.HTMLSlotElement)||void 0===$d||$d.prototype.assignedElements;var Dd=class extends md{emit(t,e){const o=new CustomEvent(t,Kl({bubbles:!0,cancelable:!1,composed:!0,detail:{}},e));return this.dispatchEvent(o),o}};Yl([Ld()],Dd.prototype,"dir",2),Yl([Ld()],Dd.prototype,"lang",2);
/*! Bundled license information:

    @lit/reactive-element/decorators/custom-element.js:
      (**
       * @license
       * Copyright 2017 Google LLC
       * SPDX-License-Identifier: BSD-3-Clause
       *)

    @lit/reactive-element/decorators/property.js:
      (**
       * @license
       * Copyright 2017 Google LLC
       * SPDX-License-Identifier: BSD-3-Clause
       *)

    @lit/reactive-element/decorators/state.js:
      (**
       * @license
       * Copyright 2017 Google LLC
       * SPDX-License-Identifier: BSD-3-Clause
       *)

    @lit/reactive-element/decorators/base.js:
      (**
       * @license
       * Copyright 2017 Google LLC
       * SPDX-License-Identifier: BSD-3-Clause
       *)

    @lit/reactive-element/decorators/query.js:
      (**
       * @license
       * Copyright 2017 Google LLC
       * SPDX-License-Identifier: BSD-3-Clause
       *)

    @lit/reactive-element/decorators/query-async.js:
      (**
       * @license
       * Copyright 2017 Google LLC
       * SPDX-License-Identifier: BSD-3-Clause
       *)

    @lit/reactive-element/decorators/event-options.js:
      (**
       * @license
       * Copyright 2017 Google LLC
       * SPDX-License-Identifier: BSD-3-Clause
       *)

    @lit/reactive-element/decorators/query-all.js:
      (**
       * @license
       * Copyright 2017 Google LLC
       * SPDX-License-Identifier: BSD-3-Clause
       *)

    @lit/reactive-element/decorators/query-assigned-elements.js:
      (**
       * @license
       * Copyright 2021 Google LLC
       * SPDX-License-Identifier: BSD-3-Clause
       *)

    @lit/reactive-element/decorators/query-assigned-nodes.js:
      (**
       * @license
       * Copyright 2017 Google LLC
       * SPDX-License-Identifier: BSD-3-Clause
       *)
    */
var Ad=Object.assign(document.createElement("div"),{className:"sl-toast-stack"}),Id=class extends Dd{constructor(){super(...arguments),this.hasSlotController=new gc(this,"icon","suffix"),this.localize=new mc(this),this.open=!1,this.closable=!1,this.variant="primary",this.duration=1/0}firstUpdated(){this.base.hidden=!this.open}restartAutoHide(){clearTimeout(this.autoHideTimeout),this.open&&this.duration<1/0&&(this.autoHideTimeout=window.setTimeout((()=>this.hide()),this.duration))}handleCloseClick(){this.hide()}handleMouseMove(){this.restartAutoHide()}async handleOpenChange(){if(this.open){this.emit("sl-show"),this.duration<1/0&&this.restartAutoHide(),await ec(this.base),this.base.hidden=!1;const{keyframes:t,options:e}=sc(this,"alert.show",{dir:this.localize.dir()});await Ql(this.base,t,e),this.emit("sl-after-show")}else{this.emit("sl-hide"),clearTimeout(this.autoHideTimeout),await ec(this.base);const{keyframes:t,options:e}=sc(this,"alert.hide",{dir:this.localize.dir()});await Ql(this.base,t,e),this.base.hidden=!0,this.emit("sl-after-hide")}}handleDurationChange(){this.restartAutoHide()}async show(){if(!this.open)return this.open=!0,ql(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,ql(this,"sl-after-hide")}async toast(){return new Promise((t=>{null===Ad.parentElement&&document.body.append(Ad),Ad.appendChild(this),requestAnimationFrame((()=>{this.clientWidth,this.show()})),this.addEventListener("sl-after-hide",(()=>{Ad.removeChild(this),t(),null===Ad.querySelector("sl-alert")&&Ad.remove()}),{once:!0})}))}render(){return Qc`
      <div
        part="base"
        class=${Ed({alert:!0,"alert--open":this.open,"alert--closable":this.closable,"alert--has-icon":this.hasSlotController.test("icon"),"alert--primary":"primary"===this.variant,"alert--success":"success"===this.variant,"alert--neutral":"neutral"===this.variant,"alert--warning":"warning"===this.variant,"alert--danger":"danger"===this.variant})}
        role="alert"
        aria-hidden=${this.open?"false":"true"}
        @mousemove=${this.handleMouseMove}
      >
        <slot name="icon" part="icon" class="alert__icon"></slot>

        <slot part="message" class="alert__message" aria-live="polite"></slot>

        ${this.closable?Qc`
              <sl-icon-button
                part="close-button"
                exportparts="base:close-button__base"
                class="alert__close-button"
                name="x-lg"
                library="system"
                label=${this.localize.term("close")}
                @click=${this.handleCloseClick}
              ></sl-icon-button>
            `:""}
      </div>
    `}};Id.styles=vd,Yl([Md('[part~="base"]')],Id.prototype,"base",2),Yl([Ld({type:Boolean,reflect:!0})],Id.prototype,"open",2),Yl([Ld({type:Boolean,reflect:!0})],Id.prototype,"closable",2),Yl([Ld({reflect:!0})],Id.prototype,"variant",2),Yl([Ld({type:Number})],Id.prototype,"duration",2),Yl([bc("open",{waitUntilFirstUpdate:!0})],Id.prototype,"handleOpenChange",1),Yl([bc("duration")],Id.prototype,"handleDurationChange",1),Id=Yl([_d("sl-alert")],Id),ic("alert.show",{keyframes:[{opacity:0,scale:.8},{opacity:1,scale:1}],options:{duration:250,easing:"ease"}}),ic("alert.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.8}],options:{duration:250,easing:"ease"}});var Pd=Ec`
  ${bd}

  :host {
    display: inline-block;
    color: var(--sl-color-neutral-600);
  }

  .icon-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-medium);
    font-size: inherit;
    color: inherit;
    padding: var(--sl-spacing-x-small);
    cursor: pointer;
    transition: var(--sl-transition-x-fast) color;
    -webkit-appearance: none;
  }

  .icon-button:hover:not(.icon-button--disabled),
  .icon-button:focus-visible:not(.icon-button--disabled) {
    color: var(--sl-color-primary-600);
  }

  .icon-button:active:not(.icon-button--disabled) {
    color: var(--sl-color-primary-700);
  }

  .icon-button:focus {
    outline: none;
  }

  .icon-button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .icon-button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .icon-button__icon {
    pointer-events: none;
  }
`,Nd=Symbol.for(""),Ud=t=>{if((null==t?void 0:t.r)===Nd)return null==t?void 0:t._$litStatic$},Hd=(t,...e)=>({_$litStatic$:e.reduce(((e,o,n)=>e+(t=>{if(void 0!==t._$litStatic$)return t._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${t}. Use 'unsafeStatic' to pass non-literal values, but\n            take care to ensure page security.`)})(o)+t[n+1]),t[0]),r:Nd}),qd=new Map,zd=(t=>(e,...o)=>{const n=o.length;let r,i;const s=[],a=[];let l,c=0,d=!1;for(;c<n;){for(l=e[c];c<n&&void 0!==(i=o[c],r=Ud(i));)l+=r+e[++c],d=!0;a.push(i),s.push(l),c++}if(c===n&&s.push(e[n]),d){const t=s.join("$$lit$$");void 0===(e=qd.get(t))&&(s.raw=s,qd.set(t,e=s)),o=a}return t(e,...o)})(Qc),Rd=t=>null!=t?t:td
/*! Bundled license information:

    lit-html/directives/if-defined.js:
      (**
       * @license
       * Copyright 2018 Google LLC
       * SPDX-License-Identifier: BSD-3-Clause
       *)
    */,jd=class extends Dd{constructor(){super(...arguments),this.hasFocus=!1,this.label="",this.disabled=!1}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleClick(t){this.disabled&&(t.preventDefault(),t.stopPropagation())}click(){this.button.click()}focus(t){this.button.focus(t)}blur(){this.button.blur()}render(){const t=!!this.href,e=t?Hd`a`:Hd`button`;return zd`
      <${e}
        part="base"
        class=${Ed({"icon-button":!0,"icon-button--disabled":!t&&this.disabled,"icon-button--focused":this.hasFocus})}
        ?disabled=${Rd(t?void 0:this.disabled)}
        type=${Rd(t?void 0:"button")}
        href=${Rd(t?this.href:void 0)}
        target=${Rd(t?this.target:void 0)}
        download=${Rd(t?this.download:void 0)}
        rel=${Rd(t&&this.target?"noreferrer noopener":void 0)}
        role=${Rd(t?void 0:"button")}
        aria-disabled=${this.disabled?"true":"false"}
        aria-label="${this.label}"
        tabindex=${this.disabled?"-1":"0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        <sl-icon
          class="icon-button__icon"
          name=${Rd(this.name)}
          library=${Rd(this.library)}
          src=${Rd(this.src)}
          aria-hidden="true"
        ></sl-icon>
      </${e}>
    `}};jd.styles=Pd,Yl([Md(".icon-button")],jd.prototype,"button",2),Yl([Td()],jd.prototype,"hasFocus",2),Yl([Ld()],jd.prototype,"name",2),Yl([Ld()],jd.prototype,"library",2),Yl([Ld()],jd.prototype,"src",2),Yl([Ld()],jd.prototype,"href",2),Yl([Ld()],jd.prototype,"target",2),Yl([Ld()],jd.prototype,"download",2),Yl([Ld()],jd.prototype,"label",2),Yl([Ld({type:Boolean,reflect:!0})],jd.prototype,"disabled",2),jd=Yl([_d("sl-icon-button")],jd);var Bd="";function Fd(t){Bd=t}var Vd={name:"default",resolver:t=>`${function(){if(!Bd){const t=[...document.getElementsByTagName("script")],e=t.find((t=>t.hasAttribute("data-shoelace")));if(e)Fd(e.getAttribute("data-shoelace"));else{const e=t.find((t=>/shoelace(\.min)?\.js($|\?)/.test(t.src)));let o="";e&&(o=e.getAttribute("src")),Fd(o.split("/").slice(0,-1).join("/"))}}return Bd.replace(/\/$/,"")}()}/assets/icons/${t}.svg`},Wd={caret:'\n    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n      <polyline points="6 9 12 15 18 9"></polyline>\n    </svg>\n  ',check:'\n    <svg part="checked-icon" class="checkbox__icon" viewBox="0 0 16 16">\n      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">\n        <g stroke="currentColor" stroke-width="2">\n          <g transform="translate(3.428571, 3.428571)">\n            <path d="M0,5.71428571 L3.42857143,9.14285714"></path>\n            <path d="M9.14285714,0 L3.42857143,9.14285714"></path>\n          </g>\n        </g>\n      </g>\n    </svg>\n  ',"chevron-down":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">\n      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>\n    </svg>\n  ',"chevron-left":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">\n      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>\n    </svg>\n  ',"chevron-right":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">\n      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>\n    </svg>\n  ',eye:'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">\n      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>\n      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>\n    </svg>\n  ',"eye-slash":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">\n      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>\n      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>\n      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>\n    </svg>\n  ',eyedropper:'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyedropper" viewBox="0 0 16 16">\n      <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.853a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z"></path>\n    </svg>\n  ',"grip-vertical":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grip-vertical" viewBox="0 0 16 16">\n      <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>\n    </svg>\n  ',indeterminate:'\n    <svg part="indeterminate-icon" class="checkbox__icon" viewBox="0 0 16 16">\n      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">\n        <g stroke="currentColor" stroke-width="2">\n          <g transform="translate(2.285714, 6.857143)">\n            <path d="M10.2857143,1.14285714 L1.14285714,1.14285714"></path>\n          </g>\n        </g>\n      </g>\n    </svg>\n  ',"person-fill":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">\n      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>\n    </svg>\n  ',"play-fill":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">\n      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>\n    </svg>\n  ',"pause-fill":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">\n      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"></path>\n    </svg>\n  ',radio:'\n    <svg part="checked-icon" class="radio__icon" viewBox="0 0 16 16">\n      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n        <g fill="currentColor">\n          <circle cx="8" cy="8" r="3.42857143"></circle>\n        </g>\n      </g>\n    </svg>\n  ',"star-fill":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">\n      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>\n    </svg>\n  ',"x-lg":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">\n      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>\n    </svg>\n  ',"x-circle-fill":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">\n      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>\n    </svg>\n  '},Gd=[Vd,{name:"system",resolver:t=>t in Wd?`data:image/svg+xml,${encodeURIComponent(Wd[t])}`:""}],Kd=[];function Xd(t){return Gd.find((e=>e.name===t))}var Jd=new Map;var Yd=new Map;async function Qd(t){if(Yd.has(t))return Yd.get(t);const e=await function(t,e="cors"){if(Jd.has(t))return Jd.get(t);const o=fetch(t,{mode:e}).then((async t=>({ok:t.ok,status:t.status,html:await t.text()})));return Jd.set(t,o),o}(t),o={ok:e.ok,status:e.status,svg:null};if(e.ok){const t=document.createElement("div");t.innerHTML=e.html;const n=t.firstElementChild;o.svg="svg"===(null==n?void 0:n.tagName.toLowerCase())?n.outerHTML:""}return Yd.set(t,o),o}var Zd=Ec`
  ${bd}

  :host {
    display: inline-block;
    width: 1em;
    height: 1em;
    box-sizing: content-box !important;
  }

  svg {
    display: block;
    height: 100%;
    width: 100%;
  }
`,tu=class extends Sd{constructor(t){if(super(t),this.it=td,t.type!==wd)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===td||null==t)return this._t=void 0,this.it=t;if(t===Zc)return t;if("string"!=typeof t)throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const e=[t];return e.raw=e,this._t={_$litType$:this.constructor.resultType,strings:e,values:[]}}};tu.directiveName="unsafeHTML",tu.resultType=1;var eu=class extends tu{};eu.directiveName="unsafeSVG",eu.resultType=2;var ou,nu=Cd(eu),ru=class extends Dd{constructor(){super(...arguments),this.svg="",this.label="",this.library="default"}connectedCallback(){var t;super.connectedCallback(),t=this,Kd.push(t)}firstUpdated(){this.setIcon()}disconnectedCallback(){var t;super.disconnectedCallback(),t=this,Kd=Kd.filter((e=>e!==t))}getUrl(){const t=Xd(this.library);return this.name&&t?t.resolver(this.name):this.src}handleLabelChange(){"string"==typeof this.label&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"))}async setIcon(){var t;const e=Xd(this.library),o=this.getUrl();if(ou||(ou=new DOMParser),o)try{const n=await Qd(o);if(o!==this.getUrl())return;if(n.ok){const o=ou.parseFromString(n.svg,"text/html").body.querySelector("svg");null!==o?(null==(t=null==e?void 0:e.mutator)||t.call(e,o),this.svg=o.outerHTML,this.emit("sl-load")):(this.svg="",this.emit("sl-error"))}else this.svg="",this.emit("sl-error")}catch(t){this.emit("sl-error")}else this.svg.length>0&&(this.svg="")}render(){return Qc` ${nu(this.svg)} `}};ru.styles=Zd,Yl([Td()],ru.prototype,"svg",2),Yl([Ld({reflect:!0})],ru.prototype,"name",2),Yl([Ld()],ru.prototype,"src",2),Yl([Ld()],ru.prototype,"label",2),Yl([Ld({reflect:!0})],ru.prototype,"library",2),Yl([bc("label")],ru.prototype,"handleLabelChange",1),Yl([bc(["name","src","library"])],ru.prototype,"setIcon",1),ru=Yl([_d("sl-icon")],ru);
/*! Bundled license information:

    lit-html/directives/unsafe-html.js:
      (**
       * @license
       * Copyright 2017 Google LLC
       * SPDX-License-Identifier: BSD-3-Clause
       *)

    lit-html/directives/unsafe-svg.js:
      (**
       * @license
       * Copyright 2017 Google LLC
       * SPDX-License-Identifier: BSD-3-Clause
       *)
    */
var iu=Ec`
  ${bd}

  :host {
    display: inline-flex;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: max(12px, 0.75em);
    font-weight: var(--sl-font-weight-semibold);
    letter-spacing: var(--sl-letter-spacing-normal);
    line-height: 1;
    border-radius: var(--sl-border-radius-small);
    border: solid 1px var(--sl-color-neutral-0);
    white-space: nowrap;
    padding: 0.35em 0.6em;
    user-select: none;
    cursor: inherit;
  }

  /* Variant modifiers */
  .badge--primary {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--success {
    background-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--neutral {
    background-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--warning {
    background-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--danger {
    background-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  /* Pill modifier */
  .badge--pill {
    border-radius: var(--sl-border-radius-pill);
  }

  /* Pulse modifier */
  .badge--pulse {
    animation: pulse 1.5s infinite;
  }

  .badge--pulse.badge--primary {
    --pulse-color: var(--sl-color-primary-600);
  }

  .badge--pulse.badge--success {
    --pulse-color: var(--sl-color-success-600);
  }

  .badge--pulse.badge--neutral {
    --pulse-color: var(--sl-color-neutral-600);
  }

  .badge--pulse.badge--warning {
    --pulse-color: var(--sl-color-warning-600);
  }

  .badge--pulse.badge--danger {
    --pulse-color: var(--sl-color-danger-600);
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 var(--pulse-color);
    }
    70% {
      box-shadow: 0 0 0 0.5rem transparent;
    }
    100% {
      box-shadow: 0 0 0 0 transparent;
    }
  }
`,su=class extends Dd{constructor(){super(...arguments),this.variant="primary",this.pill=!1,this.pulse=!1}render(){return Qc`
      <slot
        part="base"
        class=${Ed({badge:!0,"badge--primary":"primary"===this.variant,"badge--success":"success"===this.variant,"badge--neutral":"neutral"===this.variant,"badge--warning":"warning"===this.variant,"badge--danger":"danger"===this.variant,"badge--pill":this.pill,"badge--pulse":this.pulse})}
        role="status"
      ></slot>
    `}};su.styles=iu,Yl([Ld({reflect:!0})],su.prototype,"variant",2),Yl([Ld({type:Boolean,reflect:!0})],su.prototype,"pill",2),Yl([Ld({type:Boolean,reflect:!0})],su.prototype,"pulse",2),su=Yl([_d("sl-badge")],su);var au=new WeakMap,lu=new WeakMap,cu=new WeakMap,du=class{constructor(t,e){(this.host=t).addController(this),this.options=Kl({form:t=>{if(t.hasAttribute("form")&&""!==t.getAttribute("form")){const e=t.getRootNode(),o=t.getAttribute("form");if(o)return e.getElementById(o)}return t.closest("form")},name:t=>t.name,value:t=>t.value,defaultValue:t=>t.defaultValue,disabled:t=>{var e;return null!=(e=t.disabled)&&e},reportValidity:t=>"function"!=typeof t.reportValidity||t.reportValidity(),setValue:(t,e)=>t.value=e},e),this.handleFormData=this.handleFormData.bind(this),this.handleFormSubmit=this.handleFormSubmit.bind(this),this.handleFormReset=this.handleFormReset.bind(this),this.reportFormValidity=this.reportFormValidity.bind(this),this.handleUserInput=this.handleUserInput.bind(this)}hostConnected(){const t=this.options.form(this.host);t&&this.attachForm(t),this.host.addEventListener("sl-input",this.handleUserInput)}hostDisconnected(){this.detachForm(),this.host.removeEventListener("sl-input",this.handleUserInput)}hostUpdated(){const t=this.options.form(this.host);t||this.detachForm(),t&&this.form!==t&&(this.detachForm(),this.attachForm(t)),this.host.hasUpdated&&this.setValidity(this.host.checkValidity())}attachForm(t){t?(this.form=t,au.has(this.form)?au.get(this.form).add(this.host):au.set(this.form,new Set([this.host])),this.form.addEventListener("formdata",this.handleFormData),this.form.addEventListener("submit",this.handleFormSubmit),this.form.addEventListener("reset",this.handleFormReset),cu.has(this.form)||(cu.set(this.form,this.form.reportValidity),this.form.reportValidity=()=>this.reportFormValidity())):this.form=void 0}detachForm(){var t;this.form&&(null==(t=au.get(this.form))||t.delete(this.host),this.form.removeEventListener("formdata",this.handleFormData),this.form.removeEventListener("submit",this.handleFormSubmit),this.form.removeEventListener("reset",this.handleFormReset),cu.has(this.form)&&(this.form.reportValidity=cu.get(this.form),cu.delete(this.form))),this.form=void 0}handleFormData(t){const e=this.options.disabled(this.host),o=this.options.name(this.host),n=this.options.value(this.host),r="sl-button"===this.host.tagName.toLowerCase();!e&&!r&&"string"==typeof o&&o.length>0&&void 0!==n&&(Array.isArray(n)?n.forEach((e=>{t.formData.append(o,e.toString())})):t.formData.append(o,n.toString()))}handleFormSubmit(t){var e;const o=this.options.disabled(this.host),n=this.options.reportValidity;this.form&&!this.form.noValidate&&(null==(e=au.get(this.form))||e.forEach((t=>{this.setUserInteracted(t,!0)}))),!this.form||this.form.noValidate||o||n(this.host)||(t.preventDefault(),t.stopImmediatePropagation())}handleFormReset(){this.options.setValue(this.host,this.options.defaultValue(this.host)),this.setUserInteracted(this.host,!1)}async handleUserInput(){await this.host.updateComplete,this.setUserInteracted(this.host,!0)}reportFormValidity(){if(this.form&&!this.form.noValidate){const t=this.form.querySelectorAll("*");for(const e of t)if("function"==typeof e.reportValidity&&!e.reportValidity())return!1}return!0}setUserInteracted(t,e){lu.set(t,e),t.requestUpdate()}doAction(t,e){if(this.form){const o=document.createElement("button");o.type=t,o.style.position="absolute",o.style.width="0",o.style.height="0",o.style.clipPath="inset(50%)",o.style.overflow="hidden",o.style.whiteSpace="nowrap",e&&(o.name=e.name,o.value=e.value,["formaction","formenctype","formmethod","formnovalidate","formtarget"].forEach((t=>{e.hasAttribute(t)&&o.setAttribute(t,e.getAttribute(t))}))),this.form.append(o),o.click(),o.remove()}}reset(t){this.doAction("reset",t)}submit(t){this.doAction("submit",t)}setValidity(t){var e;const o=this.host,n=Boolean(lu.get(o)),r=Boolean(o.required);(null==(e=this.form)?void 0:e.noValidate)?(o.removeAttribute("data-required"),o.removeAttribute("data-optional"),o.removeAttribute("data-invalid"),o.removeAttribute("data-valid"),o.removeAttribute("data-user-invalid"),o.removeAttribute("data-user-valid")):(o.toggleAttribute("data-required",r),o.toggleAttribute("data-optional",!r),o.toggleAttribute("data-invalid",!t),o.toggleAttribute("data-valid",t),o.toggleAttribute("data-user-invalid",!t&&n),o.toggleAttribute("data-user-valid",t&&n))}updateValidity(){const t=this.host;this.setValidity(t.checkValidity())}},uu=Ec`
  ${bd}

  :host {
    display: inline-block;
    position: relative;
    width: auto;
    cursor: pointer;
  }

  .button {
    display: inline-flex;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    border-style: solid;
    border-width: var(--sl-input-border-width);
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-font-weight-semibold);
    text-decoration: none;
    user-select: none;
    white-space: nowrap;
    vertical-align: middle;
    padding: 0;
    transition: var(--sl-transition-x-fast) background-color, var(--sl-transition-x-fast) color,
      var(--sl-transition-x-fast) border, var(--sl-transition-x-fast) box-shadow;
    cursor: inherit;
  }

  .button::-moz-focus-inner {
    border: 0;
  }

  .button:focus {
    outline: none;
  }

  .button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* When disabled, prevent mouse events from bubbling up */
  .button--disabled * {
    pointer-events: none;
  }

  .button__prefix,
  .button__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  .button__label {
    display: inline-block;
  }

  .button__label::slotted(sl-icon) {
    vertical-align: -2px;
  }

  /*
   * Standard buttons
   */

  /* Default */
  .button--standard.button--default {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-neutral-300);
    color: var(--sl-color-neutral-700);
  }

  .button--standard.button--default:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-300);
    color: var(--sl-color-primary-700);
  }

  .button--standard.button--default:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-100);
    border-color: var(--sl-color-primary-400);
    color: var(--sl-color-primary-700);
  }

  /* Primary */
  .button--standard.button--primary {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--standard.button--success {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:hover:not(.button--disabled) {
    background-color: var(--sl-color-success-500);
    border-color: var(--sl-color-success-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:active:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--standard.button--neutral {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:hover:not(.button--disabled) {
    background-color: var(--sl-color-neutral-500);
    border-color: var(--sl-color-neutral-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:active:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--standard.button--warning {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }
  .button--standard.button--warning:hover:not(.button--disabled) {
    background-color: var(--sl-color-warning-500);
    border-color: var(--sl-color-warning-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--warning:active:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--standard.button--danger {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:hover:not(.button--disabled) {
    background-color: var(--sl-color-danger-500);
    border-color: var(--sl-color-danger-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:active:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  /*
   * Outline buttons
   */

  .button--outline {
    background: none;
    border: solid 1px;
  }

  /* Default */
  .button--outline.button--default {
    border-color: var(--sl-color-neutral-300);
    color: var(--sl-color-neutral-700);
  }

  .button--outline.button--default:hover:not(.button--disabled),
  .button--outline.button--default.button--checked:not(.button--disabled) {
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--default:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Primary */
  .button--outline.button--primary {
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-primary-600);
  }

  .button--outline.button--primary:hover:not(.button--disabled),
  .button--outline.button--primary.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--primary:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--outline.button--success {
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-success-600);
  }

  .button--outline.button--success:hover:not(.button--disabled),
  .button--outline.button--success.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--success:active:not(.button--disabled) {
    border-color: var(--sl-color-success-700);
    background-color: var(--sl-color-success-700);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--outline.button--neutral {
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-600);
  }

  .button--outline.button--neutral:hover:not(.button--disabled),
  .button--outline.button--neutral.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--neutral:active:not(.button--disabled) {
    border-color: var(--sl-color-neutral-700);
    background-color: var(--sl-color-neutral-700);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--outline.button--warning {
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-warning-600);
  }

  .button--outline.button--warning:hover:not(.button--disabled),
  .button--outline.button--warning.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--warning:active:not(.button--disabled) {
    border-color: var(--sl-color-warning-700);
    background-color: var(--sl-color-warning-700);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--outline.button--danger {
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-danger-600);
  }

  .button--outline.button--danger:hover:not(.button--disabled),
  .button--outline.button--danger.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--danger:active:not(.button--disabled) {
    border-color: var(--sl-color-danger-700);
    background-color: var(--sl-color-danger-700);
    color: var(--sl-color-neutral-0);
  }

  @media (forced-colors: active) {
    .button.button--outline.button--checked:not(.button--disabled) {
      outline: solid 2px transparent;
    }
  }

  /*
   * Text buttons
   */

  .button--text {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-600);
  }

  .button--text:hover:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:focus-visible:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:active:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-700);
  }

  /*
   * Size modifiers
   */

  .button--small {
    font-size: var(--sl-button-font-size-small);
    height: var(--sl-input-height-small);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
  }

  .button--medium {
    font-size: var(--sl-button-font-size-medium);
    height: var(--sl-input-height-medium);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
  }

  .button--large {
    font-size: var(--sl-button-font-size-large);
    height: var(--sl-input-height-large);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
  }

  /*
   * Pill modifier
   */

  .button--pill.button--small {
    border-radius: var(--sl-input-height-small);
  }

  .button--pill.button--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .button--pill.button--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Circle modifier
   */

  .button--circle {
    padding-left: 0;
    padding-right: 0;
  }

  .button--circle.button--small {
    width: var(--sl-input-height-small);
    border-radius: 50%;
  }

  .button--circle.button--medium {
    width: var(--sl-input-height-medium);
    border-radius: 50%;
  }

  .button--circle.button--large {
    width: var(--sl-input-height-large);
    border-radius: 50%;
  }

  .button--circle .button__prefix,
  .button--circle .button__suffix,
  .button--circle .button__caret {
    display: none;
  }

  /*
   * Caret modifier
   */

  .button--caret .button__suffix {
    display: none;
  }

  .button--caret .button__caret {
    height: auto;
  }

  /*
   * Loading modifier
   */

  .button--loading {
    position: relative;
    cursor: wait;
  }

  .button--loading .button__prefix,
  .button--loading .button__label,
  .button--loading .button__suffix,
  .button--loading .button__caret {
    visibility: hidden;
  }

  .button--loading sl-spinner {
    --indicator-color: currentColor;
    position: absolute;
    font-size: 1em;
    height: 1em;
    width: 1em;
    top: calc(50% - 0.5em);
    left: calc(50% - 0.5em);
  }

  /*
   * Badges
   */

  .button ::slotted(sl-badge) {
    position: absolute;
    top: 0;
    right: 0;
    translate: 50% -50%;
    pointer-events: none;
  }

  .button--rtl ::slotted(sl-badge) {
    right: auto;
    left: 0;
    translate: -50% -50%;
  }

  /*
   * Button spacing
   */

  .button--has-label.button--small .button__label {
    padding: 0 var(--sl-spacing-small);
  }

  .button--has-label.button--medium .button__label {
    padding: 0 var(--sl-spacing-medium);
  }

  .button--has-label.button--large .button__label {
    padding: 0 var(--sl-spacing-large);
  }

  .button--has-prefix.button--small {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--small .button__label {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--medium {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--medium .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-suffix.button--small,
  .button--caret.button--small {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--small .button__label,
  .button--caret.button--small .button__label {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--medium,
  .button--caret.button--medium {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--medium .button__label,
  .button--caret.button--medium .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large,
  .button--caret.button--large {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large .button__label,
  .button--caret.button--large .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  /*
   * Button groups support a variety of button types (e.g. buttons with tooltips, buttons as dropdown triggers, etc.).
   * This means buttons aren't always direct descendants of the button group, thus we can't target them with the
   * ::slotted selector. To work around this, the button group component does some magic to add these special classes to
   * buttons and we style them here instead.
   */

  :host(.sl-button-group__button--first:not(.sl-button-group__button--last)) .button {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }

  :host(.sl-button-group__button--inner) .button {
    border-radius: 0;
  }

  :host(.sl-button-group__button--last:not(.sl-button-group__button--first)) .button {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }

  /* All except the first */
  :host(.sl-button-group__button:not(.sl-button-group__button--first)) {
    margin-inline-start: calc(-1 * var(--sl-input-border-width));
  }

  /* Add a visual separator between solid buttons */
  :host(
      .sl-button-group__button:not(
          .sl-button-group__button--first,
          .sl-button-group__button--radio,
          [variant='default']
        ):not(:hover)
    )
    .button:after {
    content: '';
    position: absolute;
    top: 0;
    inset-inline-start: 0;
    bottom: 0;
    border-left: solid 1px rgb(128 128 128 / 33%);
    mix-blend-mode: multiply;
  }

  /* Bump hovered, focused, and checked buttons up so their focus ring isn't clipped */
  :host(.sl-button-group__button--hover) {
    z-index: 1;
  }

  /* Focus and checked are always on top */
  :host(.sl-button-group__button--focus),
  :host(.sl-button-group__button[checked]) {
    z-index: 2;
  }
`,hu=class extends Dd{constructor(){super(...arguments),this.formControlController=new du(this,{form:t=>{if(t.hasAttribute("form")){const e=t.getRootNode(),o=t.getAttribute("form");return e.getElementById(o)}return t.closest("form")}}),this.hasSlotController=new gc(this,"[default]","prefix","suffix"),this.localize=new mc(this),this.hasFocus=!1,this.invalid=!1,this.title="",this.variant="default",this.size="medium",this.caret=!1,this.disabled=!1,this.loading=!1,this.outline=!1,this.pill=!1,this.circle=!1,this.type="button",this.name="",this.value="",this.href=""}firstUpdated(){this.isButton()&&this.formControlController.updateValidity()}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleClick(t){if(this.disabled||this.loading)return t.preventDefault(),void t.stopPropagation();"submit"===this.type&&this.formControlController.submit(this),"reset"===this.type&&this.formControlController.reset(this)}isButton(){return!this.href}isLink(){return!!this.href}handleDisabledChange(){this.isButton()&&this.formControlController.setValidity(this.disabled)}click(){this.button.click()}focus(t){this.button.focus(t)}blur(){this.button.blur()}checkValidity(){return!this.isButton()||this.button.checkValidity()}reportValidity(){return!this.isButton()||this.button.reportValidity()}setCustomValidity(t){this.isButton()&&(this.button.setCustomValidity(t),this.formControlController.updateValidity())}render(){const t=this.isLink(),e=t?Hd`a`:Hd`button`;return zd`
      <${e}
        part="base"
        class=${Ed({button:!0,"button--default":"default"===this.variant,"button--primary":"primary"===this.variant,"button--success":"success"===this.variant,"button--neutral":"neutral"===this.variant,"button--warning":"warning"===this.variant,"button--danger":"danger"===this.variant,"button--text":"text"===this.variant,"button--small":"small"===this.size,"button--medium":"medium"===this.size,"button--large":"large"===this.size,"button--caret":this.caret,"button--circle":this.circle,"button--disabled":this.disabled,"button--focused":this.hasFocus,"button--loading":this.loading,"button--standard":!this.outline,"button--outline":this.outline,"button--pill":this.pill,"button--rtl":"rtl"===this.localize.dir(),"button--has-label":this.hasSlotController.test("[default]"),"button--has-prefix":this.hasSlotController.test("prefix"),"button--has-suffix":this.hasSlotController.test("suffix")})}
        ?disabled=${Rd(t?void 0:this.disabled)}
        type=${Rd(t?void 0:this.type)}
        title=${this.title}
        name=${Rd(t?void 0:this.name)}
        value=${Rd(t?void 0:this.value)}
        href=${Rd(t?this.href:void 0)}
        target=${Rd(t?this.target:void 0)}
        download=${Rd(t?this.download:void 0)}
        rel=${Rd(t&&this.target?"noreferrer noopener":void 0)}
        role=${Rd(t?void 0:"button")}
        aria-disabled=${this.disabled?"true":"false"}
        tabindex=${this.disabled?"-1":"0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        <slot name="prefix" part="prefix" class="button__prefix"></slot>
        <slot part="label" class="button__label"></slot>
        <slot name="suffix" part="suffix" class="button__suffix"></slot>
        ${this.caret?zd` <sl-icon part="caret" class="button__caret" library="system" name="caret"></sl-icon> `:""}
        ${this.loading?zd`<sl-spinner></sl-spinner>`:""}
      </${e}>
    `}};hu.styles=uu,Yl([Md(".button")],hu.prototype,"button",2),Yl([Td()],hu.prototype,"hasFocus",2),Yl([Td()],hu.prototype,"invalid",2),Yl([Ld()],hu.prototype,"title",2),Yl([Ld({reflect:!0})],hu.prototype,"variant",2),Yl([Ld({reflect:!0})],hu.prototype,"size",2),Yl([Ld({type:Boolean,reflect:!0})],hu.prototype,"caret",2),Yl([Ld({type:Boolean,reflect:!0})],hu.prototype,"disabled",2),Yl([Ld({type:Boolean,reflect:!0})],hu.prototype,"loading",2),Yl([Ld({type:Boolean,reflect:!0})],hu.prototype,"outline",2),Yl([Ld({type:Boolean,reflect:!0})],hu.prototype,"pill",2),Yl([Ld({type:Boolean,reflect:!0})],hu.prototype,"circle",2),Yl([Ld()],hu.prototype,"type",2),Yl([Ld()],hu.prototype,"name",2),Yl([Ld()],hu.prototype,"value",2),Yl([Ld()],hu.prototype,"href",2),Yl([Ld()],hu.prototype,"target",2),Yl([Ld()],hu.prototype,"download",2),Yl([Ld()],hu.prototype,"form",2),Yl([Ld({attribute:"formaction"})],hu.prototype,"formAction",2),Yl([Ld({attribute:"formenctype"})],hu.prototype,"formEnctype",2),Yl([Ld({attribute:"formmethod"})],hu.prototype,"formMethod",2),Yl([Ld({attribute:"formnovalidate",type:Boolean})],hu.prototype,"formNoValidate",2),Yl([Ld({attribute:"formtarget"})],hu.prototype,"formTarget",2),Yl([bc("disabled",{waitUntilFirstUpdate:!0})],hu.prototype,"handleDisabledChange",1),hu=Yl([_d("sl-button")],hu);var pu=Ec`
  ${bd}

  :host {
    --track-width: 2px;
    --track-color: rgb(128 128 128 / 25%);
    --indicator-color: var(--sl-color-primary-600);
    --speed: 2s;

    display: inline-flex;
    width: 1em;
    height: 1em;
  }

  .spinner {
    flex: 1 1 auto;
    height: 100%;
    width: 100%;
  }

  .spinner__track,
  .spinner__indicator {
    fill: none;
    stroke-width: var(--track-width);
    r: calc(0.5em - var(--track-width) / 2);
    cx: 0.5em;
    cy: 0.5em;
    transform-origin: 50% 50%;
  }

  .spinner__track {
    stroke: var(--track-color);
    transform-origin: 0% 0%;
    mix-blend-mode: multiply;
  }

  .spinner__indicator {
    stroke: var(--indicator-color);
    stroke-linecap: round;
    stroke-dasharray: 150% 75%;
    animation: spin var(--speed) linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
      stroke-dasharray: 0.01em, 2.75em;
    }

    50% {
      transform: rotate(450deg);
      stroke-dasharray: 1.375em, 1.375em;
    }

    100% {
      transform: rotate(1080deg);
      stroke-dasharray: 0.01em, 2.75em;
    }
  }
`,fu=class extends Dd{constructor(){super(...arguments),this.localize=new mc(this)}render(){return Qc`
      <svg part="base" class="spinner" role="progressbar" aria-valuetext=${this.localize.term("loading")}>
        <circle class="spinner__track"></circle>
        <circle class="spinner__indicator"></circle>
      </svg>
    `}};function mu(t){const e=t.tagName.toLowerCase();return"-1"!==t.getAttribute("tabindex")&&(!t.hasAttribute("disabled")&&((!t.hasAttribute("aria-disabled")||"false"===t.getAttribute("aria-disabled"))&&(!("input"===e&&"radio"===t.getAttribute("type")&&!t.hasAttribute("checked"))&&(null!==t.offsetParent&&("hidden"!==window.getComputedStyle(t).visibility&&(!("audio"!==e&&"video"!==e||!t.hasAttribute("controls"))||(!!t.hasAttribute("tabindex")||(!(!t.hasAttribute("contenteditable")||"false"===t.getAttribute("contenteditable"))||["button","input","select","textarea","a","audio","video","summary"].includes(e)))))))))}function gu(t){var e,o;const n=[];!function t(e){e instanceof HTMLElement&&(n.push(e),null!==e.shadowRoot&&"open"===e.shadowRoot.mode&&t(e.shadowRoot)),[...e.children].forEach((e=>t(e)))}(t);return{start:null!=(e=n.find((t=>mu(t))))?e:null,end:null!=(o=n.reverse().find((t=>mu(t))))?o:null}}fu.styles=pu,fu=Yl([_d("sl-spinner")],fu);var bu=[];var vu=new Set;function yu(t){if(vu.add(t),!document.body.classList.contains("sl-scroll-lock")){const t=function(){const t=document.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}();document.body.classList.add("sl-scroll-lock"),document.body.style.setProperty("--sl-scroll-lock-size",`${t}px`)}}function wu(t){vu.delete(t),0===vu.size&&(document.body.classList.remove("sl-scroll-lock"),document.body.style.removeProperty("--sl-scrollbar-width"))}function xu(t,e,o="vertical",n="smooth"){const r=function(t,e){return{top:Math.round(t.getBoundingClientRect().top-e.getBoundingClientRect().top),left:Math.round(t.getBoundingClientRect().left-e.getBoundingClientRect().left)}}(t,e),i=r.top+e.scrollTop,s=r.left+e.scrollLeft,a=e.scrollLeft,l=e.scrollLeft+e.offsetWidth,c=e.scrollTop,d=e.scrollTop+e.offsetHeight;"horizontal"!==o&&"both"!==o||(s<a?e.scrollTo({left:s,behavior:n}):s+t.clientWidth>l&&e.scrollTo({left:s-e.offsetWidth+t.clientWidth,behavior:n})),"vertical"!==o&&"both"!==o||(i<c?e.scrollTo({top:i,behavior:n}):i+t.clientHeight>d&&e.scrollTo({top:i-e.offsetHeight+t.clientHeight,behavior:n}))}var ku=Ec`
  ${bd}

  :host {
    --width: 31rem;
    --header-spacing: var(--sl-spacing-large);
    --body-spacing: var(--sl-spacing-large);
    --footer-spacing: var(--sl-spacing-large);

    display: contents;
  }

  .dialog {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: var(--sl-z-index-dialog);
  }

  .dialog__panel {
    display: flex;
    flex-direction: column;
    z-index: 2;
    width: var(--width);
    max-width: calc(100% - var(--sl-spacing-2x-large));
    max-height: calc(100% - var(--sl-spacing-2x-large));
    background-color: var(--sl-panel-background-color);
    border-radius: var(--sl-border-radius-medium);
    box-shadow: var(--sl-shadow-x-large);
  }

  .dialog__panel:focus {
    outline: none;
  }

  /* Ensure there's enough vertical padding for phones that don't update vh when chrome appears (e.g. iPhone) */
  @media screen and (max-width: 420px) {
    .dialog__panel {
      max-height: 80vh;
    }
  }

  .dialog--open .dialog__panel {
    display: flex;
    opacity: 1;
  }

  .dialog__header {
    flex: 0 0 auto;
    display: flex;
  }

  .dialog__title {
    flex: 1 1 auto;
    font: inherit;
    font-size: var(--sl-font-size-large);
    line-height: var(--sl-line-height-dense);
    padding: var(--header-spacing);
    margin: 0;
  }

  .dialog__header-actions {
    flex-shrink: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: end;
    gap: var(--sl-spacing-2x-small);
    padding: 0 var(--header-spacing);
  }

  .dialog__header-actions sl-icon-button,
  .dialog__header-actions ::slotted(sl-icon-button) {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-medium);
  }

  .dialog__body {
    flex: 1 1 auto;
    display: block;
    padding: var(--body-spacing);
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .dialog__footer {
    flex: 0 0 auto;
    text-align: right;
    padding: var(--footer-spacing);
  }

  .dialog__footer ::slotted(sl-button:not(:first-of-type)) {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  .dialog:not(.dialog--has-footer) .dialog__footer {
    display: none;
  }

  .dialog__overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: var(--sl-overlay-background-color);
  }

  @media (forced-colors: active) {
    .dialog__panel {
      border: solid 1px var(--sl-color-neutral-0);
    }
  }
`,Cu=class extends Dd{constructor(){super(...arguments),this.hasSlotController=new gc(this,"footer"),this.localize=new mc(this),this.open=!1,this.label="",this.noHeader=!1}connectedCallback(){super.connectedCallback(),this.handleDocumentKeyDown=this.handleDocumentKeyDown.bind(this),this.modal=new class{constructor(t){this.tabDirection="forward",this.element=t,this.handleFocusIn=this.handleFocusIn.bind(this),this.handleKeyDown=this.handleKeyDown.bind(this),this.handleKeyUp=this.handleKeyUp.bind(this)}activate(){bu.push(this.element),document.addEventListener("focusin",this.handleFocusIn),document.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keyup",this.handleKeyUp)}deactivate(){bu=bu.filter((t=>t!==this.element)),document.removeEventListener("focusin",this.handleFocusIn),document.removeEventListener("keydown",this.handleKeyDown),document.removeEventListener("keyup",this.handleKeyUp)}isActive(){return bu[bu.length-1]===this.element}checkFocus(){if(this.isActive()&&!this.element.matches(":focus-within")){const{start:t,end:e}=gu(this.element),o="forward"===this.tabDirection?t:e;"function"==typeof(null==o?void 0:o.focus)&&o.focus({preventScroll:!0})}}handleFocusIn(){this.checkFocus()}handleKeyDown(t){"Tab"===t.key&&t.shiftKey&&(this.tabDirection="backward",requestAnimationFrame((()=>this.checkFocus())))}handleKeyUp(){this.tabDirection="forward"}}(this)}firstUpdated(){this.dialog.hidden=!this.open,this.open&&(this.addOpenListeners(),this.modal.activate(),yu(this))}disconnectedCallback(){super.disconnectedCallback(),wu(this)}requestClose(t){if(this.emit("sl-request-close",{cancelable:!0,detail:{source:t}}).defaultPrevented){const t=sc(this,"dialog.denyClose",{dir:this.localize.dir()});Ql(this.panel,t.keyframes,t.options)}else this.hide()}addOpenListeners(){document.addEventListener("keydown",this.handleDocumentKeyDown)}removeOpenListeners(){document.removeEventListener("keydown",this.handleDocumentKeyDown)}handleDocumentKeyDown(t){this.open&&"Escape"===t.key&&(t.stopPropagation(),this.requestClose("keyboard"))}async handleOpenChange(){if(this.open){this.emit("sl-show"),this.addOpenListeners(),this.originalTrigger=document.activeElement,this.modal.activate(),yu(this);const t=this.querySelector("[autofocus]");t&&t.removeAttribute("autofocus"),await Promise.all([ec(this.dialog),ec(this.overlay)]),this.dialog.hidden=!1,requestAnimationFrame((()=>{this.emit("sl-initial-focus",{cancelable:!0}).defaultPrevented||(t?t.focus({preventScroll:!0}):this.panel.focus({preventScroll:!0})),t&&t.setAttribute("autofocus","")}));const e=sc(this,"dialog.show",{dir:this.localize.dir()}),o=sc(this,"dialog.overlay.show",{dir:this.localize.dir()});await Promise.all([Ql(this.panel,e.keyframes,e.options),Ql(this.overlay,o.keyframes,o.options)]),this.emit("sl-after-show")}else{this.emit("sl-hide"),this.removeOpenListeners(),this.modal.deactivate(),await Promise.all([ec(this.dialog),ec(this.overlay)]);const t=sc(this,"dialog.hide",{dir:this.localize.dir()}),e=sc(this,"dialog.overlay.hide",{dir:this.localize.dir()});await Promise.all([Ql(this.overlay,e.keyframes,e.options).then((()=>{this.overlay.hidden=!0})),Ql(this.panel,t.keyframes,t.options).then((()=>{this.panel.hidden=!0}))]),this.dialog.hidden=!0,this.overlay.hidden=!1,this.panel.hidden=!1,wu(this);const o=this.originalTrigger;"function"==typeof(null==o?void 0:o.focus)&&setTimeout((()=>o.focus())),this.emit("sl-after-hide")}}async show(){if(!this.open)return this.open=!0,ql(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,ql(this,"sl-after-hide")}render(){return Qc`
      <div
        part="base"
        class=${Ed({dialog:!0,"dialog--open":this.open,"dialog--has-footer":this.hasSlotController.test("footer")})}
      >
        <div part="overlay" class="dialog__overlay" @click=${()=>this.requestClose("overlay")} tabindex="-1"></div>

        <div
          part="panel"
          class="dialog__panel"
          role="dialog"
          aria-modal="true"
          aria-hidden=${this.open?"false":"true"}
          aria-label=${Rd(this.noHeader?this.label:void 0)}
          aria-labelledby=${Rd(this.noHeader?void 0:"title")}
          tabindex="0"
        >
          ${this.noHeader?"":Qc`
                <header part="header" class="dialog__header">
                  <h2 part="title" class="dialog__title" id="title">
                    <slot name="label"> ${this.label.length>0?this.label:String.fromCharCode(65279)} </slot>
                  </h2>
                  <div part="header-actions" class="dialog__header-actions">
                    <slot name="header-actions"></slot>
                    <sl-icon-button
                      part="close-button"
                      exportparts="base:close-button__base"
                      class="dialog__close"
                      name="x-lg"
                      label=${this.localize.term("close")}
                      library="system"
                      @click="${()=>this.requestClose("close-button")}"
                    ></sl-icon-button>
                  </div>
                </header>
              `}

          <slot part="body" class="dialog__body"></slot>

          <footer part="footer" class="dialog__footer">
            <slot name="footer"></slot>
          </footer>
        </div>
      </div>
    `}};function Su(t,e){function o(o){const n=t.getBoundingClientRect(),r=t.ownerDocument.defaultView,i=n.left+r.pageXOffset,s=n.top+r.pageYOffset,a=o.pageX-i,l=o.pageY-s;(null==e?void 0:e.onMove)&&e.onMove(a,l)}document.addEventListener("pointermove",o,{passive:!0}),document.addEventListener("pointerup",(function t(){document.removeEventListener("pointermove",o),document.removeEventListener("pointerup",t),(null==e?void 0:e.onStop)&&e.onStop()})),(null==e?void 0:e.initialEvent)instanceof PointerEvent&&o(e.initialEvent)}function Eu(t,e,o){const n=t=>Object.is(t,-0)?0:t;return n(t<e?e:t>o?o:t)}Cu.styles=ku,Yl([Md(".dialog")],Cu.prototype,"dialog",2),Yl([Md(".dialog__panel")],Cu.prototype,"panel",2),Yl([Md(".dialog__overlay")],Cu.prototype,"overlay",2),Yl([Ld({type:Boolean,reflect:!0})],Cu.prototype,"open",2),Yl([Ld({reflect:!0})],Cu.prototype,"label",2),Yl([Ld({attribute:"no-header",type:Boolean,reflect:!0})],Cu.prototype,"noHeader",2),Yl([bc("open",{waitUntilFirstUpdate:!0})],Cu.prototype,"handleOpenChange",1),Cu=Yl([_d("sl-dialog")],Cu),ic("dialog.show",{keyframes:[{opacity:0,scale:.8},{opacity:1,scale:1}],options:{duration:250,easing:"ease"}}),ic("dialog.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.8}],options:{duration:250,easing:"ease"}}),ic("dialog.denyClose",{keyframes:[{scale:1},{scale:1.02},{scale:1}],options:{duration:250}}),ic("dialog.overlay.show",{keyframes:[{opacity:0},{opacity:1}],options:{duration:250}}),ic("dialog.overlay.hide",{keyframes:[{opacity:1},{opacity:0}],options:{duration:250}});var _u=Cd(class extends Sd{constructor(t){var e;if(super(t),t.type!==yd||"style"!==t.name||(null===(e=t.strings)||void 0===e?void 0:e.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce(((e,o)=>{const n=t[o];return null==n?e:e+`${o=o.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${n};`}),"")}update(t,[e]){const{style:o}=t.element;if(void 0===this.vt){this.vt=new Set;for(const t in e)this.vt.add(t);return this.render(e)}this.vt.forEach((t=>{null==e[t]&&(this.vt.delete(t),t.includes("-")?o.removeProperty(t):o[t]="")}));for(const t in e){const n=e[t];null!=n&&(this.vt.add(t),t.includes("-")?o.setProperty(t,n):o[t]=n)}return Zc}}),Ou=Ec`
  ${bd}

  :host {
    --grid-width: 280px;
    --grid-height: 200px;
    --grid-handle-size: 16px;
    --slider-height: 15px;
    --slider-handle-size: 17px;
    --swatch-size: 25px;

    display: inline-block;
  }

  .color-picker {
    width: var(--grid-width);
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    color: var(--color);
    background-color: var(--sl-panel-background-color);
    border-radius: var(--sl-border-radius-medium);
    user-select: none;
  }

  .color-picker--inline {
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
  }

  .color-picker--inline:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .color-picker__grid {
    position: relative;
    height: var(--grid-height);
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%),
      linear-gradient(to right, #fff 0%, rgba(255, 255, 255, 0) 100%);
    border-top-left-radius: var(--sl-border-radius-medium);
    border-top-right-radius: var(--sl-border-radius-medium);
    cursor: crosshair;
    forced-color-adjust: none;
  }

  .color-picker__grid-handle {
    position: absolute;
    width: var(--grid-handle-size);
    height: var(--grid-handle-size);
    border-radius: 50%;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25);
    border: solid 2px white;
    margin-top: calc(var(--grid-handle-size) / -2);
    margin-left: calc(var(--grid-handle-size) / -2);
    transition: var(--sl-transition-fast) scale;
  }

  .color-picker__grid-handle--dragging {
    cursor: none;
    scale: 1.5;
  }

  .color-picker__grid-handle:focus-visible {
    outline: var(--sl-focus-ring);
  }

  .color-picker__controls {
    padding: var(--sl-spacing-small);
    display: flex;
    align-items: center;
  }

  .color-picker__sliders {
    flex: 1 1 auto;
  }

  .color-picker__slider {
    position: relative;
    height: var(--slider-height);
    border-radius: var(--sl-border-radius-pill);
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2);
    forced-color-adjust: none;
  }

  .color-picker__slider:not(:last-of-type) {
    margin-bottom: var(--sl-spacing-small);
  }

  .color-picker__slider-handle {
    position: absolute;
    top: calc(50% - var(--slider-handle-size) / 2);
    width: var(--slider-handle-size);
    height: var(--slider-handle-size);
    background-color: white;
    border-radius: 50%;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25);
    margin-left: calc(var(--slider-handle-size) / -2);
  }

  .color-picker__slider-handle:focus-visible {
    outline: var(--sl-focus-ring);
  }

  .color-picker__hue {
    background-image: linear-gradient(
      to right,
      rgb(255, 0, 0) 0%,
      rgb(255, 255, 0) 17%,
      rgb(0, 255, 0) 33%,
      rgb(0, 255, 255) 50%,
      rgb(0, 0, 255) 67%,
      rgb(255, 0, 255) 83%,
      rgb(255, 0, 0) 100%
    );
  }

  .color-picker__alpha .color-picker__alpha-gradient {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
  }

  .color-picker__preview {
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 2.25rem;
    height: 2.25rem;
    border: none;
    border-radius: var(--sl-border-radius-circle);
    background: none;
    margin-left: var(--sl-spacing-small);
    cursor: copy;
    forced-color-adjust: none;
  }

  .color-picker__preview:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2);

    /* We use a custom property in lieu of currentColor because of https://bugs.webkit.org/show_bug.cgi?id=216780 */
    background-color: var(--preview-color);
  }

  .color-picker__preview:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .color-picker__preview-color {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: solid 1px rgba(0, 0, 0, 0.125);
  }

  .color-picker__preview-color--copied {
    animation: pulse 0.75s;
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 var(--sl-color-primary-500);
    }
    70% {
      box-shadow: 0 0 0 0.5rem transparent;
    }
    100% {
      box-shadow: 0 0 0 0 transparent;
    }
  }

  .color-picker__user-input {
    display: flex;
    padding: 0 var(--sl-spacing-small) var(--sl-spacing-small) var(--sl-spacing-small);
  }

  .color-picker__user-input sl-input {
    min-width: 0; /* fix input width in Safari */
    flex: 1 1 auto;
  }

  .color-picker__user-input sl-button-group {
    margin-left: var(--sl-spacing-small);
  }

  .color-picker__user-input sl-button {
    min-width: 3.25rem;
    max-width: 3.25rem;
    font-size: 1rem;
  }

  .color-picker__swatches {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-gap: 0.5rem;
    justify-items: center;
    border-top: solid 1px var(--sl-color-neutral-200);
    padding: var(--sl-spacing-small);
    forced-color-adjust: none;
  }

  .color-picker__swatch {
    position: relative;
    width: var(--swatch-size);
    height: var(--swatch-size);
    border-radius: var(--sl-border-radius-small);
  }

  .color-picker__swatch .color-picker__swatch-color {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: solid 1px rgba(0, 0, 0, 0.125);
    border-radius: inherit;
    cursor: pointer;
  }

  .color-picker__swatch:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .color-picker__transparent-bg {
    background-image: linear-gradient(45deg, var(--sl-color-neutral-300) 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, var(--sl-color-neutral-300) 75%),
      linear-gradient(45deg, transparent 75%, var(--sl-color-neutral-300) 75%),
      linear-gradient(45deg, var(--sl-color-neutral-300) 25%, transparent 25%);
    background-size: 10px 10px;
    background-position: 0 0, 0 0, -5px -5px, 5px 5px;
  }

  .color-picker--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .color-picker--disabled .color-picker__grid,
  .color-picker--disabled .color-picker__grid-handle,
  .color-picker--disabled .color-picker__slider,
  .color-picker--disabled .color-picker__slider-handle,
  .color-picker--disabled .color-picker__preview,
  .color-picker--disabled .color-picker__swatch,
  .color-picker--disabled .color-picker__swatch-color {
    pointer-events: none;
  }

  /*
   * Color dropdown
   */

  .color-dropdown::part(panel) {
    max-height: none;
    background-color: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-radius: var(--sl-border-radius-medium);
    overflow: visible;
  }

  .color-dropdown__trigger {
    display: inline-block;
    position: relative;
    background-color: transparent;
    border: none;
    cursor: pointer;
    forced-color-adjust: none;
  }

  .color-dropdown__trigger.color-dropdown__trigger--small {
    width: var(--sl-input-height-small);
    height: var(--sl-input-height-small);
    border-radius: var(--sl-border-radius-circle);
  }

  .color-dropdown__trigger.color-dropdown__trigger--medium {
    width: var(--sl-input-height-medium);
    height: var(--sl-input-height-medium);
    border-radius: var(--sl-border-radius-circle);
  }

  .color-dropdown__trigger.color-dropdown__trigger--large {
    width: var(--sl-input-height-large);
    height: var(--sl-input-height-large);
    border-radius: var(--sl-border-radius-circle);
  }

  .color-dropdown__trigger:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    background-color: currentColor;
    box-shadow: inset 0 0 0 2px var(--sl-input-border-color), inset 0 0 0 4px var(--sl-color-neutral-0);
  }

  .color-dropdown__trigger--empty:before {
    background-color: transparent;
  }

  .color-dropdown__trigger:focus-visible {
    outline: none;
  }

  .color-dropdown__trigger:focus-visible:not(.color-dropdown__trigger--disabled) {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .color-dropdown__trigger.color-dropdown__trigger--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,Lu=(t="value")=>(e,o)=>{const n=e.constructor,r=n.prototype.attributeChangedCallback;n.prototype.attributeChangedCallback=function(e,i,s){var a;const l=n.getPropertyOptions(t);if(e===("string"==typeof l.attribute?l.attribute:t)){const e=l.converter||Mc,n=("function"==typeof e?e:null!=(a=null==e?void 0:e.fromAttribute)?a:Mc.fromAttribute)(s,l.type);this[t]!==n&&(this[o]=n)}r.call(this,e,i,s)}};
/*! Bundled license information:

    lit-html/directives/style-map.js:
      (**
       * @license
       * Copyright 2018 Google LLC
       * SPDX-License-Identifier: BSD-3-Clause
       *)
    */function Tu(t,e){(function(t){return"string"==typeof t&&-1!==t.indexOf(".")&&1===parseFloat(t)})(t)&&(t="100%");var o=function(t){return"string"==typeof t&&-1!==t.indexOf("%")}(t);return t=360===e?t:Math.min(e,Math.max(0,parseFloat(t))),o&&(t=parseInt(String(t*e),10)/100),Math.abs(t-e)<1e-6?1:t=360===e?(t<0?t%e+e:t%e)/parseFloat(String(e)):t%e/parseFloat(String(e))}function $u(t){return Math.min(1,Math.max(0,t))}function Mu(t){return t=parseFloat(t),(isNaN(t)||t<0||t>1)&&(t=1),t}function Du(t){return t<=1?"".concat(100*Number(t),"%"):t}function Au(t){return 1===t.length?"0"+t:String(t)}function Iu(t,e,o){t=Tu(t,255),e=Tu(e,255),o=Tu(o,255);var n=Math.max(t,e,o),r=Math.min(t,e,o),i=0,s=0,a=(n+r)/2;if(n===r)s=0,i=0;else{var l=n-r;switch(s=a>.5?l/(2-n-r):l/(n+r),n){case t:i=(e-o)/l+(e<o?6:0);break;case e:i=(o-t)/l+2;break;case o:i=(t-e)/l+4}i/=6}return{h:i,s:s,l:a}}function Pu(t,e,o){return o<0&&(o+=1),o>1&&(o-=1),o<1/6?t+6*o*(e-t):o<.5?e:o<2/3?t+(e-t)*(2/3-o)*6:t}function Nu(t,e,o){t=Tu(t,255),e=Tu(e,255),o=Tu(o,255);var n=Math.max(t,e,o),r=Math.min(t,e,o),i=0,s=n,a=n-r,l=0===n?0:a/n;if(n===r)i=0;else{switch(n){case t:i=(e-o)/a+(e<o?6:0);break;case e:i=(o-t)/a+2;break;case o:i=(t-e)/a+4}i/=6}return{h:i,s:l,v:s}}function Uu(t,e,o,n){var r=[Au(Math.round(t).toString(16)),Au(Math.round(e).toString(16)),Au(Math.round(o).toString(16))];return n&&r[0].startsWith(r[0].charAt(1))&&r[1].startsWith(r[1].charAt(1))&&r[2].startsWith(r[2].charAt(1))?r[0].charAt(0)+r[1].charAt(0)+r[2].charAt(0):r.join("")}function Hu(t){return Math.round(255*parseFloat(t)).toString(16)}function qu(t){return zu(t)/255}function zu(t){return parseInt(t,16)}var Ru={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",goldenrod:"#daa520",gold:"#ffd700",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavenderblush:"#fff0f5",lavender:"#e6e6fa",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",rebeccapurple:"#663399",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"};function ju(t){var e={r:0,g:0,b:0},o=1,n=null,r=null,i=null,s=!1,a=!1;return"string"==typeof t&&(t=function(t){if(t=t.trim().toLowerCase(),0===t.length)return!1;var e=!1;if(Ru[t])t=Ru[t],e=!0;else if("transparent"===t)return{r:0,g:0,b:0,a:0,format:"name"};var o=Wu.rgb.exec(t);if(o)return{r:o[1],g:o[2],b:o[3]};if(o=Wu.rgba.exec(t),o)return{r:o[1],g:o[2],b:o[3],a:o[4]};if(o=Wu.hsl.exec(t),o)return{h:o[1],s:o[2],l:o[3]};if(o=Wu.hsla.exec(t),o)return{h:o[1],s:o[2],l:o[3],a:o[4]};if(o=Wu.hsv.exec(t),o)return{h:o[1],s:o[2],v:o[3]};if(o=Wu.hsva.exec(t),o)return{h:o[1],s:o[2],v:o[3],a:o[4]};if(o=Wu.hex8.exec(t),o)return{r:zu(o[1]),g:zu(o[2]),b:zu(o[3]),a:qu(o[4]),format:e?"name":"hex8"};if(o=Wu.hex6.exec(t),o)return{r:zu(o[1]),g:zu(o[2]),b:zu(o[3]),format:e?"name":"hex"};if(o=Wu.hex4.exec(t),o)return{r:zu(o[1]+o[1]),g:zu(o[2]+o[2]),b:zu(o[3]+o[3]),a:qu(o[4]+o[4]),format:e?"name":"hex8"};if(o=Wu.hex3.exec(t),o)return{r:zu(o[1]+o[1]),g:zu(o[2]+o[2]),b:zu(o[3]+o[3]),format:e?"name":"hex"};return!1}(t)),"object"==typeof t&&(Gu(t.r)&&Gu(t.g)&&Gu(t.b)?(e=function(t,e,o){return{r:255*Tu(t,255),g:255*Tu(e,255),b:255*Tu(o,255)}}(t.r,t.g,t.b),s=!0,a="%"===String(t.r).substr(-1)?"prgb":"rgb"):Gu(t.h)&&Gu(t.s)&&Gu(t.v)?(n=Du(t.s),r=Du(t.v),e=function(t,e,o){t=6*Tu(t,360),e=Tu(e,100),o=Tu(o,100);var n=Math.floor(t),r=t-n,i=o*(1-e),s=o*(1-r*e),a=o*(1-(1-r)*e),l=n%6;return{r:255*[o,s,i,i,a,o][l],g:255*[a,o,o,s,i,i][l],b:255*[i,i,a,o,o,s][l]}}(t.h,n,r),s=!0,a="hsv"):Gu(t.h)&&Gu(t.s)&&Gu(t.l)&&(n=Du(t.s),i=Du(t.l),e=function(t,e,o){var n,r,i;if(t=Tu(t,360),e=Tu(e,100),o=Tu(o,100),0===e)r=o,i=o,n=o;else{var s=o<.5?o*(1+e):o+e-o*e,a=2*o-s;n=Pu(a,s,t+1/3),r=Pu(a,s,t),i=Pu(a,s,t-1/3)}return{r:255*n,g:255*r,b:255*i}}(t.h,n,i),s=!0,a="hsl"),Object.prototype.hasOwnProperty.call(t,"a")&&(o=t.a)),o=Mu(o),{ok:s,format:t.format||a,r:Math.min(255,Math.max(e.r,0)),g:Math.min(255,Math.max(e.g,0)),b:Math.min(255,Math.max(e.b,0)),a:o}}var Bu="(?:".concat("[-\\+]?\\d*\\.\\d+%?",")|(?:").concat("[-\\+]?\\d+%?",")"),Fu="[\\s|\\(]+(".concat(Bu,")[,|\\s]+(").concat(Bu,")[,|\\s]+(").concat(Bu,")\\s*\\)?"),Vu="[\\s|\\(]+(".concat(Bu,")[,|\\s]+(").concat(Bu,")[,|\\s]+(").concat(Bu,")[,|\\s]+(").concat(Bu,")\\s*\\)?"),Wu={CSS_UNIT:new RegExp(Bu),rgb:new RegExp("rgb"+Fu),rgba:new RegExp("rgba"+Vu),hsl:new RegExp("hsl"+Fu),hsla:new RegExp("hsla"+Vu),hsv:new RegExp("hsv"+Fu),hsva:new RegExp("hsva"+Vu),hex3:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex4:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex8:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/};function Gu(t){return Boolean(Wu.CSS_UNIT.exec(String(t)))}var Ku=function(){function t(e,o){var n;if(void 0===e&&(e=""),void 0===o&&(o={}),e instanceof t)return e;"number"==typeof e&&(e=function(t){return{r:t>>16,g:(65280&t)>>8,b:255&t}}(e)),this.originalInput=e;var r=ju(e);this.originalInput=e,this.r=r.r,this.g=r.g,this.b=r.b,this.a=r.a,this.roundA=Math.round(100*this.a)/100,this.format=null!==(n=o.format)&&void 0!==n?n:r.format,this.gradientType=o.gradientType,this.r<1&&(this.r=Math.round(this.r)),this.g<1&&(this.g=Math.round(this.g)),this.b<1&&(this.b=Math.round(this.b)),this.isValid=r.ok}return t.prototype.isDark=function(){return this.getBrightness()<128},t.prototype.isLight=function(){return!this.isDark()},t.prototype.getBrightness=function(){var t=this.toRgb();return(299*t.r+587*t.g+114*t.b)/1e3},t.prototype.getLuminance=function(){var t=this.toRgb(),e=t.r/255,o=t.g/255,n=t.b/255;return.2126*(e<=.03928?e/12.92:Math.pow((e+.055)/1.055,2.4))+.7152*(o<=.03928?o/12.92:Math.pow((o+.055)/1.055,2.4))+.0722*(n<=.03928?n/12.92:Math.pow((n+.055)/1.055,2.4))},t.prototype.getAlpha=function(){return this.a},t.prototype.setAlpha=function(t){return this.a=Mu(t),this.roundA=Math.round(100*this.a)/100,this},t.prototype.isMonochrome=function(){return 0===this.toHsl().s},t.prototype.toHsv=function(){var t=Nu(this.r,this.g,this.b);return{h:360*t.h,s:t.s,v:t.v,a:this.a}},t.prototype.toHsvString=function(){var t=Nu(this.r,this.g,this.b),e=Math.round(360*t.h),o=Math.round(100*t.s),n=Math.round(100*t.v);return 1===this.a?"hsv(".concat(e,", ").concat(o,"%, ").concat(n,"%)"):"hsva(".concat(e,", ").concat(o,"%, ").concat(n,"%, ").concat(this.roundA,")")},t.prototype.toHsl=function(){var t=Iu(this.r,this.g,this.b);return{h:360*t.h,s:t.s,l:t.l,a:this.a}},t.prototype.toHslString=function(){var t=Iu(this.r,this.g,this.b),e=Math.round(360*t.h),o=Math.round(100*t.s),n=Math.round(100*t.l);return 1===this.a?"hsl(".concat(e,", ").concat(o,"%, ").concat(n,"%)"):"hsla(".concat(e,", ").concat(o,"%, ").concat(n,"%, ").concat(this.roundA,")")},t.prototype.toHex=function(t){return void 0===t&&(t=!1),Uu(this.r,this.g,this.b,t)},t.prototype.toHexString=function(t){return void 0===t&&(t=!1),"#"+this.toHex(t)},t.prototype.toHex8=function(t){return void 0===t&&(t=!1),function(t,e,o,n,r){var i=[Au(Math.round(t).toString(16)),Au(Math.round(e).toString(16)),Au(Math.round(o).toString(16)),Au(Hu(n))];return r&&i[0].startsWith(i[0].charAt(1))&&i[1].startsWith(i[1].charAt(1))&&i[2].startsWith(i[2].charAt(1))&&i[3].startsWith(i[3].charAt(1))?i[0].charAt(0)+i[1].charAt(0)+i[2].charAt(0)+i[3].charAt(0):i.join("")}(this.r,this.g,this.b,this.a,t)},t.prototype.toHex8String=function(t){return void 0===t&&(t=!1),"#"+this.toHex8(t)},t.prototype.toRgb=function(){return{r:Math.round(this.r),g:Math.round(this.g),b:Math.round(this.b),a:this.a}},t.prototype.toRgbString=function(){var t=Math.round(this.r),e=Math.round(this.g),o=Math.round(this.b);return 1===this.a?"rgb(".concat(t,", ").concat(e,", ").concat(o,")"):"rgba(".concat(t,", ").concat(e,", ").concat(o,", ").concat(this.roundA,")")},t.prototype.toPercentageRgb=function(){var t=function(t){return"".concat(Math.round(100*Tu(t,255)),"%")};return{r:t(this.r),g:t(this.g),b:t(this.b),a:this.a}},t.prototype.toPercentageRgbString=function(){var t=function(t){return Math.round(100*Tu(t,255))};return 1===this.a?"rgb(".concat(t(this.r),"%, ").concat(t(this.g),"%, ").concat(t(this.b),"%)"):"rgba(".concat(t(this.r),"%, ").concat(t(this.g),"%, ").concat(t(this.b),"%, ").concat(this.roundA,")")},t.prototype.toName=function(){if(0===this.a)return"transparent";if(this.a<1)return!1;for(var t="#"+Uu(this.r,this.g,this.b,!1),e=0,o=Object.entries(Ru);e<o.length;e++){var n=o[e],r=n[0];if(t===n[1])return r}return!1},t.prototype.toString=function(t){var e=Boolean(t);t=null!=t?t:this.format;var o=!1,n=this.a<1&&this.a>=0;return e||!n||!t.startsWith("hex")&&"name"!==t?("rgb"===t&&(o=this.toRgbString()),"prgb"===t&&(o=this.toPercentageRgbString()),"hex"!==t&&"hex6"!==t||(o=this.toHexString()),"hex3"===t&&(o=this.toHexString(!0)),"hex4"===t&&(o=this.toHex8String(!0)),"hex8"===t&&(o=this.toHex8String()),"name"===t&&(o=this.toName()),"hsl"===t&&(o=this.toHslString()),"hsv"===t&&(o=this.toHsvString()),o||this.toHexString()):"name"===t&&0===this.a?this.toName():this.toRgbString()},t.prototype.toNumber=function(){return(Math.round(this.r)<<16)+(Math.round(this.g)<<8)+Math.round(this.b)},t.prototype.clone=function(){return new t(this.toString())},t.prototype.lighten=function(e){void 0===e&&(e=10);var o=this.toHsl();return o.l+=e/100,o.l=$u(o.l),new t(o)},t.prototype.brighten=function(e){void 0===e&&(e=10);var o=this.toRgb();return o.r=Math.max(0,Math.min(255,o.r-Math.round(-e/100*255))),o.g=Math.max(0,Math.min(255,o.g-Math.round(-e/100*255))),o.b=Math.max(0,Math.min(255,o.b-Math.round(-e/100*255))),new t(o)},t.prototype.darken=function(e){void 0===e&&(e=10);var o=this.toHsl();return o.l-=e/100,o.l=$u(o.l),new t(o)},t.prototype.tint=function(t){return void 0===t&&(t=10),this.mix("white",t)},t.prototype.shade=function(t){return void 0===t&&(t=10),this.mix("black",t)},t.prototype.desaturate=function(e){void 0===e&&(e=10);var o=this.toHsl();return o.s-=e/100,o.s=$u(o.s),new t(o)},t.prototype.saturate=function(e){void 0===e&&(e=10);var o=this.toHsl();return o.s+=e/100,o.s=$u(o.s),new t(o)},t.prototype.greyscale=function(){return this.desaturate(100)},t.prototype.spin=function(e){var o=this.toHsl(),n=(o.h+e)%360;return o.h=n<0?360+n:n,new t(o)},t.prototype.mix=function(e,o){void 0===o&&(o=50);var n=this.toRgb(),r=new t(e).toRgb(),i=o/100;return new t({r:(r.r-n.r)*i+n.r,g:(r.g-n.g)*i+n.g,b:(r.b-n.b)*i+n.b,a:(r.a-n.a)*i+n.a})},t.prototype.analogous=function(e,o){void 0===e&&(e=6),void 0===o&&(o=30);var n=this.toHsl(),r=360/o,i=[this];for(n.h=(n.h-(r*e>>1)+720)%360;--e;)n.h=(n.h+r)%360,i.push(new t(n));return i},t.prototype.complement=function(){var e=this.toHsl();return e.h=(e.h+180)%360,new t(e)},t.prototype.monochromatic=function(e){void 0===e&&(e=6);for(var o=this.toHsv(),n=o.h,r=o.s,i=o.v,s=[],a=1/e;e--;)s.push(new t({h:n,s:r,v:i})),i=(i+a)%1;return s},t.prototype.splitcomplement=function(){var e=this.toHsl(),o=e.h;return[this,new t({h:(o+72)%360,s:e.s,l:e.l}),new t({h:(o+216)%360,s:e.s,l:e.l})]},t.prototype.onBackground=function(e){var o=this.toRgb(),n=new t(e).toRgb();return new t({r:n.r+(o.r-n.r)*o.a,g:n.g+(o.g-n.g)*o.a,b:n.b+(o.b-n.b)*o.a})},t.prototype.triad=function(){return this.polyad(3)},t.prototype.tetrad=function(){return this.polyad(4)},t.prototype.polyad=function(e){for(var o=this.toHsl(),n=o.h,r=[this],i=360/e,s=1;s<e;s++)r.push(new t({h:(n+s*i)%360,s:o.s,l:o.l}));return r},t.prototype.equals=function(e){return this.toRgbString()===new t(e).toRgbString()},t}(),Xu="EyeDropper"in window,Ju=class extends Dd{constructor(){super(...arguments),this.formControlController=new du(this),this.isSafeValue=!1,this.localize=new mc(this),this.isDraggingGridHandle=!1,this.isEmpty=!1,this.inputValue="",this.hue=0,this.saturation=100,this.brightness=100,this.alpha=100,this.value="",this.defaultValue="",this.label="",this.format="hex",this.inline=!1,this.size="medium",this.noFormatToggle=!1,this.name="",this.disabled=!1,this.hoist=!1,this.opacity=!1,this.uppercase=!1,this.swatches="",this.form=""}handleCopy(){this.input.select(),document.execCommand("copy"),this.previewButton.focus(),this.previewButton.classList.add("color-picker__preview-color--copied"),this.previewButton.addEventListener("animationend",(()=>{this.previewButton.classList.remove("color-picker__preview-color--copied")}))}handleFormatToggle(){const t=["hex","rgb","hsl","hsv"],e=(t.indexOf(this.format)+1)%t.length;this.format=t[e],this.setColor(this.value),this.emit("sl-change"),this.emit("sl-input")}handleAlphaDrag(t){const e=this.shadowRoot.querySelector(".color-picker__slider.color-picker__alpha"),o=e.querySelector(".color-picker__slider-handle"),{width:n}=e.getBoundingClientRect();let r=this.value;o.focus(),t.preventDefault(),Su(e,{onMove:t=>{this.alpha=Eu(t/n*100,0,100),this.syncValues(),this.value!==r&&(r=this.value,this.emit("sl-change"),this.emit("sl-input"))},initialEvent:t})}handleHueDrag(t){const e=this.shadowRoot.querySelector(".color-picker__slider.color-picker__hue"),o=e.querySelector(".color-picker__slider-handle"),{width:n}=e.getBoundingClientRect();let r=this.value;o.focus(),t.preventDefault(),Su(e,{onMove:t=>{this.hue=Eu(t/n*360,0,360),this.syncValues(),this.value!==r&&(r=this.value,this.emit("sl-change"),this.emit("sl-input"))},initialEvent:t})}handleGridDrag(t){const e=this.shadowRoot.querySelector(".color-picker__grid"),o=e.querySelector(".color-picker__grid-handle"),{width:n,height:r}=e.getBoundingClientRect();let i=this.value;o.focus(),t.preventDefault(),this.isDraggingGridHandle=!0,Su(e,{onMove:(t,e)=>{this.saturation=Eu(t/n*100,0,100),this.brightness=Eu(100-e/r*100,0,100),this.syncValues(),this.value!==i&&(i=this.value,this.emit("sl-change"),this.emit("sl-input"))},onStop:()=>this.isDraggingGridHandle=!1,initialEvent:t})}handleAlphaKeyDown(t){const e=t.shiftKey?10:1,o=this.value;"ArrowLeft"===t.key&&(t.preventDefault(),this.alpha=Eu(this.alpha-e,0,100),this.syncValues()),"ArrowRight"===t.key&&(t.preventDefault(),this.alpha=Eu(this.alpha+e,0,100),this.syncValues()),"Home"===t.key&&(t.preventDefault(),this.alpha=0,this.syncValues()),"End"===t.key&&(t.preventDefault(),this.alpha=100,this.syncValues()),this.value!==o&&(this.emit("sl-change"),this.emit("sl-input"))}handleHueKeyDown(t){const e=t.shiftKey?10:1,o=this.value;"ArrowLeft"===t.key&&(t.preventDefault(),this.hue=Eu(this.hue-e,0,360),this.syncValues()),"ArrowRight"===t.key&&(t.preventDefault(),this.hue=Eu(this.hue+e,0,360),this.syncValues()),"Home"===t.key&&(t.preventDefault(),this.hue=0,this.syncValues()),"End"===t.key&&(t.preventDefault(),this.hue=360,this.syncValues()),this.value!==o&&(this.emit("sl-change"),this.emit("sl-input"))}handleGridKeyDown(t){const e=t.shiftKey?10:1,o=this.value;"ArrowLeft"===t.key&&(t.preventDefault(),this.saturation=Eu(this.saturation-e,0,100),this.syncValues()),"ArrowRight"===t.key&&(t.preventDefault(),this.saturation=Eu(this.saturation+e,0,100),this.syncValues()),"ArrowUp"===t.key&&(t.preventDefault(),this.brightness=Eu(this.brightness+e,0,100),this.syncValues()),"ArrowDown"===t.key&&(t.preventDefault(),this.brightness=Eu(this.brightness-e,0,100),this.syncValues()),this.value!==o&&(this.emit("sl-change"),this.emit("sl-input"))}handleInputChange(t){const e=t.target,o=this.value;t.stopPropagation(),this.input.value?(this.setColor(e.value),e.value=this.value):this.value="",this.value!==o&&(this.emit("sl-change"),this.emit("sl-input"))}handleInputInput(t){t.stopPropagation()}handleInputKeyDown(t){if("Enter"===t.key){const t=this.value;this.input.value?(this.setColor(this.input.value),this.input.value=this.value,this.value!==t&&(this.emit("sl-change"),this.emit("sl-input")),setTimeout((()=>this.input.select()))):this.hue=0}}handleTouchMove(t){t.preventDefault()}parseColor(t){const e=new Ku(t);if(!e.isValid)return null;const o=e.toHsl(),n={h:o.h,s:100*o.s,l:100*o.l,a:o.a},r=e.toRgb(),i=e.toHexString(),s=e.toHex8String(),a=e.toHsv(),l={h:a.h,s:100*a.s,v:100*a.v,a:a.a};return{hsl:{h:n.h,s:n.s,l:n.l,string:this.setLetterCase(`hsl(${Math.round(n.h)}, ${Math.round(n.s)}%, ${Math.round(n.l)}%)`)},hsla:{h:n.h,s:n.s,l:n.l,a:n.a,string:this.setLetterCase(`hsla(${Math.round(n.h)}, ${Math.round(n.s)}%, ${Math.round(n.l)}%, ${n.a.toFixed(2).toString()})`)},hsv:{h:l.h,s:l.s,v:l.v,string:this.setLetterCase(`hsv(${Math.round(l.h)}, ${Math.round(l.s)}%, ${Math.round(l.v)}%)`)},hsva:{h:l.h,s:l.s,v:l.v,a:l.a,string:this.setLetterCase(`hsva(${Math.round(l.h)}, ${Math.round(l.s)}%, ${Math.round(l.v)}%, ${l.a.toFixed(2).toString()})`)},rgb:{r:r.r,g:r.g,b:r.b,string:this.setLetterCase(`rgb(${Math.round(r.r)}, ${Math.round(r.g)}, ${Math.round(r.b)})`)},rgba:{r:r.r,g:r.g,b:r.b,a:r.a,string:this.setLetterCase(`rgba(${Math.round(r.r)}, ${Math.round(r.g)}, ${Math.round(r.b)}, ${r.a.toFixed(2).toString()})`)},hex:this.setLetterCase(i),hexa:this.setLetterCase(s)}}setColor(t){const e=this.parseColor(t);return null!==e&&(this.hue=e.hsva.h,this.saturation=e.hsva.s,this.brightness=e.hsva.v,this.alpha=this.opacity?100*e.hsva.a:100,this.syncValues(),!0)}setLetterCase(t){return"string"!=typeof t?"":this.uppercase?t.toUpperCase():t.toLowerCase()}async syncValues(){const t=this.parseColor(`hsva(${this.hue}, ${this.saturation}%, ${this.brightness}%, ${this.alpha/100})`);null!==t&&("hsl"===this.format?this.inputValue=this.opacity?t.hsla.string:t.hsl.string:"rgb"===this.format?this.inputValue=this.opacity?t.rgba.string:t.rgb.string:"hsv"===this.format?this.inputValue=this.opacity?t.hsva.string:t.hsv.string:this.inputValue=this.opacity?t.hexa:t.hex,this.isSafeValue=!0,this.value=this.inputValue,await this.updateComplete,this.isSafeValue=!1)}handleAfterHide(){this.previewButton.classList.remove("color-picker__preview-color--copied")}handleEyeDropper(){if(!Xu)return;(new EyeDropper).open().then((t=>this.setColor(t.sRGBHex))).catch((()=>{}))}selectSwatch(t){const e=this.value;this.disabled||(this.setColor(t),this.value!==e&&(this.emit("sl-change"),this.emit("sl-input")))}getHexString(t,e,o,n=100){const r=new Ku(`hsva(${t}, ${e}, ${o}, ${n/100})`);return r.isValid?r.toHex8String():""}handleFormatChange(){this.syncValues()}handleOpacityChange(){this.alpha=100}handleValueChange(t,e){if(this.isEmpty=!e,e||(this.hue=0,this.saturation=0,this.brightness=100,this.alpha=100),!this.isSafeValue){const o=this.parseColor(e);null!==o?(this.inputValue=this.value,this.hue=o.hsva.h,this.saturation=o.hsva.s,this.brightness=o.hsva.v,this.alpha=100*o.hsva.a,this.syncValues()):this.inputValue=null!=t?t:""}}getFormattedValue(t="hex"){const e=this.parseColor(`hsva(${this.hue}, ${this.saturation}%, ${this.brightness}%, ${this.alpha/100})`);if(null===e)return"";switch(t){case"hex":return e.hex;case"hexa":return e.hexa;case"rgb":return e.rgb.string;case"rgba":return e.rgba.string;case"hsl":return e.hsl.string;case"hsla":return e.hsla.string;case"hsv":return e.hsv.string;case"hsva":return e.hsva.string;default:return""}}checkValidity(){return this.input.checkValidity()}reportValidity(){return this.inline||this.checkValidity()?this.input.reportValidity():(this.dropdown.show(),this.addEventListener("sl-after-show",(()=>this.input.reportValidity()),{once:!0}),this.checkValidity())}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity()}render(){const t=this.saturation,e=100-this.brightness,o=Array.isArray(this.swatches)?this.swatches:this.swatches.split(";").filter((t=>""!==t.trim())),n=Qc`
      <div
        part="base"
        class=${Ed({"color-picker":!0,"color-picker--inline":this.inline,"color-picker--disabled":this.disabled})}
        aria-disabled=${this.disabled?"true":"false"}
        aria-labelledby="label"
        tabindex=${this.inline?"0":"-1"}
      >
        ${this.inline?Qc`
              <sl-visually-hidden id="label">
                <slot name="label">${this.label}</slot>
              </sl-visually-hidden>
            `:null}

        <div
          part="grid"
          class="color-picker__grid"
          style=${_u({backgroundColor:this.getHexString(this.hue,100,100)})}
          @pointerdown=${this.handleGridDrag}
          @touchmove=${this.handleTouchMove}
        >
          <span
            part="grid-handle"
            class=${Ed({"color-picker__grid-handle":!0,"color-picker__grid-handle--dragging":this.isDraggingGridHandle})}
            style=${_u({top:`${e}%`,left:`${t}%`,backgroundColor:this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
            role="application"
            aria-label="HSV"
            tabindex=${Rd(this.disabled?void 0:"0")}
            @keydown=${this.handleGridKeyDown}
          ></span>
        </div>

        <div class="color-picker__controls">
          <div class="color-picker__sliders">
            <div
              part="slider hue-slider"
              class="color-picker__hue color-picker__slider"
              @pointerdown=${this.handleHueDrag}
              @touchmove=${this.handleTouchMove}
            >
              <span
                part="slider-handle hue-slider-handle"
                class="color-picker__slider-handle"
                style=${_u({left:(0===this.hue?0:100/(360/this.hue))+"%"})}
                role="slider"
                aria-label="hue"
                aria-orientation="horizontal"
                aria-valuemin="0"
                aria-valuemax="360"
                aria-valuenow=${`${Math.round(this.hue)}`}
                tabindex=${Rd(this.disabled?void 0:"0")}
                @keydown=${this.handleHueKeyDown}
              ></span>
            </div>

            ${this.opacity?Qc`
                  <div
                    part="slider opacity-slider"
                    class="color-picker__alpha color-picker__slider color-picker__transparent-bg"
                    @pointerdown="${this.handleAlphaDrag}"
                    @touchmove=${this.handleTouchMove}
                  >
                    <div
                      class="color-picker__alpha-gradient"
                      style=${_u({backgroundImage:`linear-gradient(\n                          to right,\n                          ${this.getHexString(this.hue,this.saturation,this.brightness,0)} 0%\n                          ${this.getHexString(this.hue,this.saturation,this.brightness,100)} 100%\n                        )`})}
                    ></div>
                    <span
                      part="slider-handle opacity-slider-handle"
                      class="color-picker__slider-handle"
                      style=${_u({left:`${this.alpha}%`})}
                      role="slider"
                      aria-label="alpha"
                      aria-orientation="horizontal"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      aria-valuenow=${Math.round(this.alpha)}
                      tabindex=${Rd(this.disabled?void 0:"0")}
                      @keydown=${this.handleAlphaKeyDown}
                    ></span>
                  </div>
                `:""}
          </div>

          <button
            type="button"
            part="preview"
            class="color-picker__preview color-picker__transparent-bg"
            aria-label=${this.localize.term("copy")}
            style=${_u({"--preview-color":this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
            @click=${this.handleCopy}
          ></button>
        </div>

        <div class="color-picker__user-input" aria-live="polite">
          <sl-input
            part="input"
            type="text"
            name=${this.name}
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            value=${this.isEmpty?"":this.inputValue}
            ?disabled=${this.disabled}
            aria-label=${this.localize.term("currentValue")}
            @keydown=${this.handleInputKeyDown}
            @sl-change=${this.handleInputChange}
            @sl-input=${this.handleInputInput}
          ></sl-input>

          <sl-button-group>
            ${this.noFormatToggle?"":Qc`
                  <sl-button
                    part="format-button"
                    aria-label=${this.localize.term("toggleColorFormat")}
                    exportparts="
                      base:format-button__base,
                      prefix:format-button__prefix,
                      label:format-button__label,
                      suffix:format-button__suffix,
                      caret:format-button__caret
                    "
                    @click=${this.handleFormatToggle}
                  >
                    ${this.setLetterCase(this.format)}
                  </sl-button>
                `}
            ${Xu?Qc`
                  <sl-button
                    part="eye-dropper-button"
                    exportparts="
                      base:eye-dropper-button__base,
                      prefix:eye-dropper-button__prefix,
                      label:eye-dropper-button__label,
                      suffix:eye-dropper-button__suffix,
                      caret:eye-dropper-button__caret
                    "
                    @click=${this.handleEyeDropper}
                  >
                    <sl-icon
                      library="system"
                      name="eyedropper"
                      label=${this.localize.term("selectAColorFromTheScreen")}
                    ></sl-icon>
                  </sl-button>
                `:""}
          </sl-button-group>
        </div>

        ${o.length>0?Qc`
              <div part="swatches" class="color-picker__swatches">
                ${o.map((t=>{const e=this.parseColor(t);return e?Qc`
                    <div
                      part="swatch"
                      class="color-picker__swatch color-picker__transparent-bg"
                      tabindex=${Rd(this.disabled?void 0:"0")}
                      role="button"
                      aria-label=${t}
                      @click=${()=>this.selectSwatch(t)}
                      @keydown=${t=>!this.disabled&&"Enter"===t.key&&this.setColor(e.hexa)}
                    >
                      <div
                        class="color-picker__swatch-color"
                        style=${_u({backgroundColor:e.hexa})}
                      ></div>
                    </div>
                  `:(console.error(`Unable to parse swatch color: "${t}"`,this),"")}))}
              </div>
            `:""}
      </div>
    `;return this.inline?n:Qc`
      <sl-dropdown
        class="color-dropdown"
        aria-disabled=${this.disabled?"true":"false"}
        .containing-element=${this}
        ?disabled=${this.disabled}
        ?hoist=${this.hoist}
        @sl-after-hide=${this.handleAfterHide}
      >
        <button
          part="trigger"
          slot="trigger"
          class=${Ed({"color-dropdown__trigger":!0,"color-dropdown__trigger--disabled":this.disabled,"color-dropdown__trigger--small":"small"===this.size,"color-dropdown__trigger--medium":"medium"===this.size,"color-dropdown__trigger--large":"large"===this.size,"color-dropdown__trigger--empty":this.isEmpty,"color-picker__transparent-bg":!0})}
          style=${_u({color:this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
          type="button"
        >
          <sl-visually-hidden>
            <slot name="label">${this.label}</slot>
          </sl-visually-hidden>
        </button>
        ${n}
      </sl-dropdown>
    `}};Ju.styles=Ou,Yl([Md('[part~="input"]')],Ju.prototype,"input",2),Yl([Md('[part~="preview"]')],Ju.prototype,"previewButton",2),Yl([Md(".color-dropdown")],Ju.prototype,"dropdown",2),Yl([Td()],Ju.prototype,"isDraggingGridHandle",2),Yl([Td()],Ju.prototype,"isEmpty",2),Yl([Td()],Ju.prototype,"inputValue",2),Yl([Td()],Ju.prototype,"hue",2),Yl([Td()],Ju.prototype,"saturation",2),Yl([Td()],Ju.prototype,"brightness",2),Yl([Td()],Ju.prototype,"alpha",2),Yl([Ld()],Ju.prototype,"value",2),Yl([Lu()],Ju.prototype,"defaultValue",2),Yl([Ld()],Ju.prototype,"label",2),Yl([Ld()],Ju.prototype,"format",2),Yl([Ld({type:Boolean,reflect:!0})],Ju.prototype,"inline",2),Yl([Ld()],Ju.prototype,"size",2),Yl([Ld({attribute:"no-format-toggle",type:Boolean})],Ju.prototype,"noFormatToggle",2),Yl([Ld()],Ju.prototype,"name",2),Yl([Ld({type:Boolean,reflect:!0})],Ju.prototype,"disabled",2),Yl([Ld({type:Boolean})],Ju.prototype,"hoist",2),Yl([Ld({type:Boolean})],Ju.prototype,"opacity",2),Yl([Ld({type:Boolean})],Ju.prototype,"uppercase",2),Yl([Ld()],Ju.prototype,"swatches",2),Yl([Ld({reflect:!0})],Ju.prototype,"form",2),Yl([bc("format",{waitUntilFirstUpdate:!0})],Ju.prototype,"handleFormatChange",1),Yl([bc("opacity",{waitUntilFirstUpdate:!0})],Ju.prototype,"handleOpacityChange",1),Yl([bc("value")],Ju.prototype,"handleValueChange",1),Ju=Yl([_d("sl-color-picker")],Ju);var Yu=Ec`
  ${bd}

  :host(:not(:focus-within)) {
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    clip: rect(0 0 0 0) !important;
    clip-path: inset(50%) !important;
    border: none !important;
    overflow: hidden !important;
    white-space: nowrap !important;
    padding: 0 !important;
  }
`,Qu=class extends Dd{render(){return Qc` <slot></slot> `}};Qu.styles=Yu,Qu=Yl([_d("sl-visually-hidden")],Qu);var Zu,th=Ec`
  ${bd}
  ${Ec`
  .form-control .form-control__label {
    display: none;
  }

  .form-control .form-control__help-text {
    display: none;
  }

  /* Label */
  .form-control--has-label .form-control__label {
    display: inline-block;
    color: var(--sl-input-label-color);
    margin-bottom: var(--sl-spacing-3x-small);
  }

  .form-control--has-label.form-control--small .form-control__label {
    font-size: var(--sl-input-label-font-size-small);
  }

  .form-control--has-label.form-control--medium .form-control__label {
    font-size: var(--sl-input-label-font-size-medium);
  }

  .form-control--has-label.form-control--large .form-control_label {
    font-size: var(--sl-input-label-font-size-large);
  }

  :host([required]) .form-control--has-label .form-control__label::after {
    content: var(--sl-input-required-content);
    margin-inline-start: var(--sl-input-required-content-offset);
    color: var(--sl-input-required-content-color);
  }

  /* Help text */
  .form-control--has-help-text .form-control__help-text {
    display: block;
    color: var(--sl-input-help-text-color);
    margin-top: var(--sl-spacing-3x-small);
  }

  .form-control--has-help-text.form-control--small .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-small);
  }

  .form-control--has-help-text.form-control--medium .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-medium);
  }

  .form-control--has-help-text.form-control--large .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-large);
  }

  .form-control--has-help-text.form-control--radio-group .form-control__help-text {
    margin-top: var(--sl-spacing-2x-small);
  }
`}

  :host {
    display: block;
  }

  .input {
    flex: 1 1 auto;
    display: inline-flex;
    align-items: stretch;
    justify-content: start;
    position: relative;
    width: 100%;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    overflow: hidden;
    cursor: text;
    transition: var(--sl-transition-fast) color, var(--sl-transition-fast) border, var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
  }

  /* Standard inputs */
  .input--standard {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .input--standard:hover:not(.input--disabled) {
    background-color: var(--sl-input-background-color-hover);
    border-color: var(--sl-input-border-color-hover);
  }

  .input--standard.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color);
  }

  .input--standard.input--focused:not(.input--disabled) .input__control {
    color: var(--sl-input-color-focus);
  }

  .input--standard.input--disabled {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input--standard.input--disabled .input__control {
    color: var(--sl-input-color-disabled);
  }

  .input--standard.input--disabled .input__control::placeholder {
    color: var(--sl-input-placeholder-color-disabled);
  }

  /* Filled inputs */
  .input--filled {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .input--filled:hover:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .input--filled.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-focus);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .input--filled.input--disabled {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input__control {
    flex: 1 1 auto;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    min-width: 0;
    height: 100%;
    color: var(--sl-input-color);
    border: none;
    background: none;
    box-shadow: none;
    padding: 0;
    margin: 0;
    cursor: inherit;
    -webkit-appearance: none;
  }

  .input__control::-webkit-search-decoration,
  .input__control::-webkit-search-cancel-button,
  .input__control::-webkit-search-results-button,
  .input__control::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  .input__control:-webkit-autofill,
  .input__control:-webkit-autofill:hover,
  .input__control:-webkit-autofill:focus,
  .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-background-color-hover) inset !important;
    -webkit-text-fill-color: var(--sl-color-primary-500);
    caret-color: var(--sl-input-color);
  }

  .input--filled .input__control:-webkit-autofill,
  .input--filled .input__control:-webkit-autofill:hover,
  .input--filled .input__control:-webkit-autofill:focus,
  .input--filled .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-filled-background-color) inset !important;
  }

  .input__control::placeholder {
    color: var(--sl-input-placeholder-color);
    user-select: none;
  }

  .input:hover:not(.input--disabled) .input__control {
    color: var(--sl-input-color-hover);
  }

  .input__control:focus {
    outline: none;
  }

  .input__prefix,
  .input__suffix {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    cursor: default;
  }

  .input__prefix::slotted(sl-icon),
  .input__suffix::slotted(sl-icon) {
    color: var(--sl-input-icon-color);
  }

  /*
   * Size modifiers
   */

  .input--small {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
    height: var(--sl-input-height-small);
  }

  .input--small .input__control {
    height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-small);
  }

  .input--small .input__clear,
  .input--small .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-small) * 2);
  }

  .input--small .input__prefix::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-small);
  }

  .input--small .input__suffix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-small);
  }

  .input--medium {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
    height: var(--sl-input-height-medium);
  }

  .input--medium .input__control {
    height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-medium);
  }

  .input--medium .input__clear,
  .input--medium .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-medium) * 2);
  }

  .input--medium .input__prefix::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-medium);
  }

  .input--medium .input__suffix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-medium);
  }

  .input--large {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
    height: var(--sl-input-height-large);
  }

  .input--large .input__control {
    height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-large);
  }

  .input--large .input__clear,
  .input--large .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-large) * 2);
  }

  .input--large .input__prefix::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-large);
  }

  .input--large .input__suffix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-large);
  }

  /*
   * Pill modifier
   */

  .input--pill.input--small {
    border-radius: var(--sl-input-height-small);
  }

  .input--pill.input--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .input--pill.input--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Clearable + Password Toggle
   */

  .input__clear,
  .input__password-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    color: var(--sl-input-icon-color);
    border: none;
    background: none;
    padding: 0;
    transition: var(--sl-transition-fast) color;
    cursor: pointer;
  }

  .input__clear:hover,
  .input__password-toggle:hover {
    color: var(--sl-input-icon-color-hover);
  }

  .input__clear:focus,
  .input__password-toggle:focus {
    outline: none;
  }

  .input--empty .input__clear {
    visibility: hidden;
  }

  /* Don't show the browser's password toggle in Edge */
  ::-ms-reveal {
    display: none;
  }

  /* Hide Firefox's clear button on date and time inputs */
  .input--is-firefox input[type='date'],
  .input--is-firefox input[type='time'] {
    clip-path: inset(0 2em 0 0);
  }

  /* Hide the built-in number spinner */
  .input--no-spin-buttons input[type='number']::-webkit-outer-spin-button,
  .input--no-spin-buttons input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    display: none;
  }

  .input--no-spin-buttons input[type='number'] {
    -moz-appearance: textfield;
  }
`,eh={},oh=Cd(class extends Sd{constructor(t){if(super(t),t.type!==xd&&t.type!==yd&&t.type!==kd)throw Error("The `live` directive is not allowed on child or event bindings");if(!(t=>void 0===t.strings)(t))throw Error("`live` bindings can only contain a single expression")}render(t){return t}update(t,[e]){if(e===Zc||e===td)return e;const o=t.element,n=t.name;if(t.type===xd){if(e===o[n])return Zc}else if(t.type===kd){if(!!e===o.hasAttribute(n))return Zc}else if(t.type===yd&&o.getAttribute(n)===e+"")return Zc;return((t,e=eh)=>{t._$AH=e})(t),e}}),nh=null==(Zu=navigator.userAgentData)?void 0:Zu.brands.some((t=>t.brand.includes("Chromium"))),rh=!nh&&navigator.userAgent.includes("Firefox"),ih=class extends Dd{constructor(){super(...arguments),this.formControlController=new du(this),this.hasSlotController=new gc(this,"help-text","label"),this.localize=new mc(this),this.hasFocus=!1,this.title="",this.type="text",this.name="",this.value="",this.defaultValue="",this.size="medium",this.filled=!1,this.pill=!1,this.label="",this.helpText="",this.clearable=!1,this.disabled=!1,this.placeholder="",this.readonly=!1,this.passwordToggle=!1,this.passwordVisible=!1,this.noSpinButtons=!1,this.form="",this.required=!1,this.spellcheck=!0}get valueAsDate(){var t,e;return null!=(e=null==(t=this.input)?void 0:t.valueAsDate)?e:null}set valueAsDate(t){const e=document.createElement("input");e.type="date",e.valueAsDate=t,this.value=e.value}get valueAsNumber(){var t,e;return null!=(e=null==(t=this.input)?void 0:t.valueAsNumber)?e:parseFloat(this.value)}set valueAsNumber(t){const e=document.createElement("input");e.type="number",e.valueAsNumber=t,this.value=e.value}firstUpdated(){this.formControlController.updateValidity()}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleChange(){this.value=this.input.value,this.emit("sl-change")}handleClearClick(t){this.value="",this.emit("sl-clear"),this.emit("sl-input"),this.emit("sl-change"),this.input.focus(),t.stopPropagation()}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleInput(){this.value=this.input.value,this.formControlController.updateValidity(),this.emit("sl-input")}handleInvalid(){this.formControlController.setValidity(!1)}handleKeyDown(t){const e=t.metaKey||t.ctrlKey||t.shiftKey||t.altKey;"Enter"!==t.key||e||setTimeout((()=>{t.defaultPrevented||t.isComposing||this.formControlController.submit()}))}handlePasswordToggle(){this.passwordVisible=!this.passwordVisible}handleDisabledChange(){this.formControlController.setValidity(this.disabled)}handleStepChange(){this.input.step=String(this.step),this.formControlController.updateValidity()}async handleValueChange(){await this.updateComplete,this.formControlController.updateValidity()}focus(t){this.input.focus(t)}blur(){this.input.blur()}select(){this.input.select()}setSelectionRange(t,e,o="none"){this.input.setSelectionRange(t,e,o)}setRangeText(t,e,o,n){this.input.setRangeText(t,e,o,n),this.value!==this.input.value&&(this.value=this.input.value)}showPicker(){"showPicker"in HTMLInputElement.prototype&&this.input.showPicker()}stepUp(){this.input.stepUp(),this.value!==this.input.value&&(this.value=this.input.value)}stepDown(){this.input.stepDown(),this.value!==this.input.value&&(this.value=this.input.value)}checkValidity(){return this.input.checkValidity()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity()}render(){const t=this.hasSlotController.test("label"),e=this.hasSlotController.test("help-text"),o=!!this.label||!!t,n=!!this.helpText||!!e,r=this.clearable&&!this.disabled&&!this.readonly&&("number"==typeof this.value||this.value.length>0);return Qc`
      <div
        part="form-control"
        class=${Ed({"form-control":!0,"form-control--small":"small"===this.size,"form-control--medium":"medium"===this.size,"form-control--large":"large"===this.size,"form-control--has-label":o,"form-control--has-help-text":n})}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${o?"false":"true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${Ed({input:!0,"input--small":"small"===this.size,"input--medium":"medium"===this.size,"input--large":"large"===this.size,"input--pill":this.pill,"input--standard":!this.filled,"input--filled":this.filled,"input--disabled":this.disabled,"input--focused":this.hasFocus,"input--empty":!this.value,"input--no-spin-buttons":this.noSpinButtons,"input--is-firefox":rh})}
          >
            <slot name="prefix" part="prefix" class="input__prefix"></slot>
            <input
              part="input"
              id="input"
              class="input__control"
              type=${"password"===this.type&&this.passwordVisible?"text":this.type}
              title=${this.title}
              name=${Rd(this.name)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${Rd(this.placeholder)}
              minlength=${Rd(this.minlength)}
              maxlength=${Rd(this.maxlength)}
              min=${Rd(this.min)}
              max=${Rd(this.max)}
              step=${Rd(this.step)}
              .value=${oh(this.value)}
              autocapitalize=${Rd("password"===this.type?"off":this.autocapitalize)}
              autocomplete=${Rd("password"===this.type?"off":this.autocomplete)}
              autocorrect=${Rd("password"===this.type?"off":this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${this.spellcheck}
              pattern=${Rd(this.pattern)}
              enterkeyhint=${Rd(this.enterkeyhint)}
              inputmode=${Rd(this.inputmode)}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @keydown=${this.handleKeyDown}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            />

            ${r?Qc`
                    <button
                      part="clear-button"
                      class="input__clear"
                      type="button"
                      aria-label=${this.localize.term("clearEntry")}
                      @click=${this.handleClearClick}
                      tabindex="-1"
                    >
                      <slot name="clear-icon">
                        <sl-icon name="x-circle-fill" library="system"></sl-icon>
                      </slot>
                    </button>
                  `:""}
            ${this.passwordToggle&&!this.disabled?Qc`
                    <button
                      part="password-toggle-button"
                      class="input__password-toggle"
                      type="button"
                      aria-label=${this.localize.term(this.passwordVisible?"hidePassword":"showPassword")}
                      @click=${this.handlePasswordToggle}
                      tabindex="-1"
                    >
                      ${this.passwordVisible?Qc`
                            <slot name="show-password-icon">
                              <sl-icon name="eye-slash" library="system"></sl-icon>
                            </slot>
                          `:Qc`
                            <slot name="hide-password-icon">
                              <sl-icon name="eye" library="system"></sl-icon>
                            </slot>
                          `}
                    </button>
                  `:""}

            <slot name="suffix" part="suffix" class="input__suffix"></slot>
          </div>
        </div>

        <slot
          name="help-text"
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${n?"false":"true"}
        >
          ${this.helpText}
        </slot>
        </div>
      </div>
    `}};ih.styles=th,Yl([Md(".input__control")],ih.prototype,"input",2),Yl([Td()],ih.prototype,"hasFocus",2),Yl([Ld()],ih.prototype,"title",2),Yl([Ld({reflect:!0})],ih.prototype,"type",2),Yl([Ld()],ih.prototype,"name",2),Yl([Ld()],ih.prototype,"value",2),Yl([Lu()],ih.prototype,"defaultValue",2),Yl([Ld({reflect:!0})],ih.prototype,"size",2),Yl([Ld({type:Boolean,reflect:!0})],ih.prototype,"filled",2),Yl([Ld({type:Boolean,reflect:!0})],ih.prototype,"pill",2),Yl([Ld()],ih.prototype,"label",2),Yl([Ld({attribute:"help-text"})],ih.prototype,"helpText",2),Yl([Ld({type:Boolean})],ih.prototype,"clearable",2),Yl([Ld({type:Boolean,reflect:!0})],ih.prototype,"disabled",2),Yl([Ld()],ih.prototype,"placeholder",2),Yl([Ld({type:Boolean,reflect:!0})],ih.prototype,"readonly",2),Yl([Ld({attribute:"password-toggle",type:Boolean})],ih.prototype,"passwordToggle",2),Yl([Ld({attribute:"password-visible",type:Boolean})],ih.prototype,"passwordVisible",2),Yl([Ld({attribute:"no-spin-buttons",type:Boolean})],ih.prototype,"noSpinButtons",2),Yl([Ld({reflect:!0})],ih.prototype,"form",2),Yl([Ld({type:Boolean,reflect:!0})],ih.prototype,"required",2),Yl([Ld()],ih.prototype,"pattern",2),Yl([Ld({type:Number})],ih.prototype,"minlength",2),Yl([Ld({type:Number})],ih.prototype,"maxlength",2),Yl([Ld({type:Number})],ih.prototype,"min",2),Yl([Ld({type:Number})],ih.prototype,"max",2),Yl([Ld()],ih.prototype,"step",2),Yl([Ld()],ih.prototype,"autocapitalize",2),Yl([Ld()],ih.prototype,"autocorrect",2),Yl([Ld()],ih.prototype,"autocomplete",2),Yl([Ld({type:Boolean})],ih.prototype,"autofocus",2),Yl([Ld()],ih.prototype,"enterkeyhint",2),Yl([Ld({type:Boolean,converter:{fromAttribute:t=>!(!t||"false"===t),toAttribute:t=>t?"true":"false"}})],ih.prototype,"spellcheck",2),Yl([Ld()],ih.prototype,"inputmode",2),Yl([bc("disabled",{waitUntilFirstUpdate:!0})],ih.prototype,"handleDisabledChange",1),Yl([bc("step",{waitUntilFirstUpdate:!0})],ih.prototype,"handleStepChange",1),Yl([bc("value",{waitUntilFirstUpdate:!0})],ih.prototype,"handleValueChange",1),ih=Yl([_d("sl-input")],ih);var sh=Ec`
  ${bd}

  :host {
    display: inline-block;
  }

  .dropdown::part(popup) {
    z-index: var(--sl-z-index-dropdown);
  }

  .dropdown[data-current-placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .dropdown[data-current-placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  .dropdown[data-current-placement^='left']::part(popup) {
    transform-origin: right;
  }

  .dropdown[data-current-placement^='right']::part(popup) {
    transform-origin: left;
  }

  .dropdown__trigger {
    display: block;
  }

  .dropdown__panel {
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    box-shadow: var(--sl-shadow-large);
    border-radius: var(--sl-border-radius-medium);
    pointer-events: none;
  }

  .dropdown--open .dropdown__panel {
    display: block;
    pointer-events: all;
  }

  /* When users slot a menu, make sure it conforms to the popup's auto-size */
  ::slotted(sl-menu) {
    max-width: var(--auto-size-available-width) !important;
    max-height: var(--auto-size-available-height) !important;
  }
`,ah=class extends Dd{constructor(){super(...arguments),this.localize=new mc(this),this.open=!1,this.placement="bottom-start",this.disabled=!1,this.stayOpenOnSelect=!1,this.distance=0,this.skidding=0,this.hoist=!1}connectedCallback(){super.connectedCallback(),this.handleMenuItemActivate=this.handleMenuItemActivate.bind(this),this.handlePanelSelect=this.handlePanelSelect.bind(this),this.handleKeyDown=this.handleKeyDown.bind(this),this.handleDocumentKeyDown=this.handleDocumentKeyDown.bind(this),this.handleDocumentMouseDown=this.handleDocumentMouseDown.bind(this),this.containingElement||(this.containingElement=this)}firstUpdated(){this.panel.hidden=!this.open,this.open&&(this.addOpenListeners(),this.popup.active=!0)}disconnectedCallback(){super.disconnectedCallback(),this.removeOpenListeners(),this.hide()}focusOnTrigger(){const t=this.trigger.assignedElements({flatten:!0})[0];"function"==typeof(null==t?void 0:t.focus)&&t.focus()}getMenu(){return this.panel.assignedElements({flatten:!0}).find((t=>"sl-menu"===t.tagName.toLowerCase()))}handleKeyDown(t){this.open&&"Escape"===t.key&&(t.stopPropagation(),this.hide(),this.focusOnTrigger())}handleDocumentKeyDown(t){var e;if("Tab"===t.key){if(this.open&&"sl-menu-item"===(null==(e=document.activeElement)?void 0:e.tagName.toLowerCase()))return t.preventDefault(),this.hide(),void this.focusOnTrigger();setTimeout((()=>{var t,e,o;const n=(null==(t=this.containingElement)?void 0:t.getRootNode())instanceof ShadowRoot?null==(o=null==(e=document.activeElement)?void 0:e.shadowRoot)?void 0:o.activeElement:document.activeElement;this.containingElement&&(null==n?void 0:n.closest(this.containingElement.tagName.toLowerCase()))===this.containingElement||this.hide()}))}}handleDocumentMouseDown(t){const e=t.composedPath();this.containingElement&&!e.includes(this.containingElement)&&this.hide()}handleMenuItemActivate(t){xu(t.target,this.panel)}handlePanelSelect(t){const e=t.target;this.stayOpenOnSelect||"sl-menu"!==e.tagName.toLowerCase()||(this.hide(),this.focusOnTrigger())}handleTriggerClick(){this.open?this.hide():this.show()}handleTriggerKeyDown(t){if("Escape"===t.key&&this.open)return t.stopPropagation(),this.focusOnTrigger(),void this.hide();if([" ","Enter"].includes(t.key))return t.preventDefault(),void this.handleTriggerClick();const e=this.getMenu();if(e){const o=e.defaultSlot.assignedElements({flatten:!0}),n=o[0],r=o[o.length-1];["ArrowDown","ArrowUp","Home","End"].includes(t.key)&&(t.preventDefault(),this.open||this.show(),o.length>0&&requestAnimationFrame((()=>{"ArrowDown"!==t.key&&"Home"!==t.key||(e.setCurrentItem(n),n.focus()),"ArrowUp"!==t.key&&"End"!==t.key||(e.setCurrentItem(r),r.focus())})))}}handleTriggerKeyUp(t){" "===t.key&&t.preventDefault()}handleTriggerSlotChange(){this.updateAccessibleTrigger()}updateAccessibleTrigger(){const t=this.trigger.assignedElements({flatten:!0}).find((t=>gu(t).start));let e;if(t){switch(t.tagName.toLowerCase()){case"sl-button":case"sl-icon-button":e=t.button;break;default:e=t}e.setAttribute("aria-haspopup","true"),e.setAttribute("aria-expanded",this.open?"true":"false")}}async show(){if(!this.open)return this.open=!0,ql(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,ql(this,"sl-after-hide")}reposition(){this.popup.reposition()}addOpenListeners(){this.panel.addEventListener("sl-activate",this.handleMenuItemActivate),this.panel.addEventListener("sl-select",this.handlePanelSelect),this.panel.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown)}removeOpenListeners(){this.panel&&(this.panel.removeEventListener("sl-activate",this.handleMenuItemActivate),this.panel.removeEventListener("sl-select",this.handlePanelSelect),this.panel.removeEventListener("keydown",this.handleKeyDown)),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown)}async handleOpenChange(){if(this.disabled)this.open=!1;else if(this.updateAccessibleTrigger(),this.open){this.emit("sl-show"),this.addOpenListeners(),await ec(this),this.panel.hidden=!1,this.popup.active=!0;const{keyframes:t,options:e}=sc(this,"dropdown.show",{dir:this.localize.dir()});await Ql(this.popup.popup,t,e),this.emit("sl-after-show")}else{this.emit("sl-hide"),this.removeOpenListeners(),await ec(this);const{keyframes:t,options:e}=sc(this,"dropdown.hide",{dir:this.localize.dir()});await Ql(this.popup.popup,t,e),this.panel.hidden=!0,this.popup.active=!1,this.emit("sl-after-hide")}}render(){return Qc`
      <sl-popup
        part="base"
        id="dropdown"
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        strategy=${this.hoist?"fixed":"absolute"}
        flip
        shift
        auto-size="vertical"
        auto-size-padding="10"
        class=${Ed({dropdown:!0,"dropdown--open":this.open})}
      >
        <slot
          name="trigger"
          slot="anchor"
          part="trigger"
          class="dropdown__trigger"
          @click=${this.handleTriggerClick}
          @keydown=${this.handleTriggerKeyDown}
          @keyup=${this.handleTriggerKeyUp}
          @slotchange=${this.handleTriggerSlotChange}
        ></slot>

        <slot
          part="panel"
          class="dropdown__panel"
          aria-hidden=${this.open?"false":"true"}
          aria-labelledby="dropdown"
        ></slot>
      </sl-popup>
    `}};ah.styles=sh,Yl([Md(".dropdown")],ah.prototype,"popup",2),Yl([Md(".dropdown__trigger")],ah.prototype,"trigger",2),Yl([Md(".dropdown__panel")],ah.prototype,"panel",2),Yl([Ld({type:Boolean,reflect:!0})],ah.prototype,"open",2),Yl([Ld({reflect:!0})],ah.prototype,"placement",2),Yl([Ld({type:Boolean,reflect:!0})],ah.prototype,"disabled",2),Yl([Ld({attribute:"stay-open-on-select",type:Boolean,reflect:!0})],ah.prototype,"stayOpenOnSelect",2),Yl([Ld({attribute:!1})],ah.prototype,"containingElement",2),Yl([Ld({type:Number})],ah.prototype,"distance",2),Yl([Ld({type:Number})],ah.prototype,"skidding",2),Yl([Ld({type:Boolean})],ah.prototype,"hoist",2),Yl([bc("open",{waitUntilFirstUpdate:!0})],ah.prototype,"handleOpenChange",1),ah=Yl([_d("sl-dropdown")],ah),ic("dropdown.show",{keyframes:[{opacity:0,scale:.9},{opacity:1,scale:1}],options:{duration:100,easing:"ease"}}),ic("dropdown.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.9}],options:{duration:100,easing:"ease"}});var lh=Ec`
  ${bd}

  :host {
    --arrow-color: var(--sl-color-neutral-1000);
    --arrow-size: 6px;

    /*
     * These properties are computed to account for the arrow's dimensions after being rotated 45º. The constant
     * 0.7071 is derived from sin(45), which is the diagonal size of the arrow's container after rotating.
     */
    --arrow-size-diagonal: calc(var(--arrow-size) * 0.7071);
    --arrow-padding-offset: calc(var(--arrow-size-diagonal) - var(--arrow-size));

    display: contents;
  }

  .popup {
    position: absolute;
    isolation: isolate;
    max-width: var(--auto-size-available-width, none);
    max-height: var(--auto-size-available-height, none);
  }

  .popup--fixed {
    position: fixed;
  }

  .popup:not(.popup--active) {
    display: none;
  }

  .popup__arrow {
    position: absolute;
    width: calc(var(--arrow-size-diagonal) * 2);
    height: calc(var(--arrow-size-diagonal) * 2);
    rotate: 45deg;
    background: var(--arrow-color);
    z-index: -1;
  }
`;function ch(t){return t.split("-")[1]}function dh(t){return"y"===t?"height":"width"}function uh(t){return t.split("-")[0]}function hh(t){return["top","bottom"].includes(uh(t))?"x":"y"}function ph(t,e,o){let{reference:n,floating:r}=t;const i=n.x+n.width/2-r.width/2,s=n.y+n.height/2-r.height/2,a=hh(e),l=dh(a),c=n[l]/2-r[l]/2,d="x"===a;let u;switch(uh(e)){case"top":u={x:i,y:n.y-r.height};break;case"bottom":u={x:i,y:n.y+n.height};break;case"right":u={x:n.x+n.width,y:s};break;case"left":u={x:n.x-r.width,y:s};break;default:u={x:n.x,y:n.y}}switch(ch(e)){case"start":u[a]-=c*(o&&d?-1:1);break;case"end":u[a]+=c*(o&&d?-1:1)}return u}function fh(t){return"number"!=typeof t?function(t){return Kl({top:0,right:0,bottom:0,left:0},t)}(t):{top:t,right:t,bottom:t,left:t}}function mh(t){return Xl(Kl({},t),{top:t.y,left:t.x,right:t.x+t.width,bottom:t.y+t.height})}async function gh(t,e){var o;void 0===e&&(e={});const{x:n,y:r,platform:i,rects:s,elements:a,strategy:l}=t,{boundary:c="clippingAncestors",rootBoundary:d="viewport",elementContext:u="floating",altBoundary:h=!1,padding:p=0}=e,f=fh(p),m=a[h?"floating"===u?"reference":"floating":u],g=mh(await i.getClippingRect({element:null==(o=await(null==i.isElement?void 0:i.isElement(m)))||o?m:m.contextElement||await(null==i.getDocumentElement?void 0:i.getDocumentElement(a.floating)),boundary:c,rootBoundary:d,strategy:l})),b="floating"===u?Xl(Kl({},s.floating),{x:n,y:r}):s.reference,v=await(null==i.getOffsetParent?void 0:i.getOffsetParent(a.floating)),y=await(null==i.isElement?void 0:i.isElement(v))&&await(null==i.getScale?void 0:i.getScale(v))||{x:1,y:1},w=mh(i.convertOffsetParentRelativeRectToViewportRelativeRect?await i.convertOffsetParentRelativeRectToViewportRelativeRect({rect:b,offsetParent:v,strategy:l}):b);return{top:(g.top-w.top+f.top)/y.y,bottom:(w.bottom-g.bottom+f.bottom)/y.y,left:(g.left-w.left+f.left)/y.x,right:(w.right-g.right+f.right)/y.x}}var bh=Math.min,vh=Math.max;function yh(t,e,o){return vh(t,bh(e,o))}["top","right","bottom","left"].reduce(((t,e)=>t.concat(e,e+"-start",e+"-end")),[]);var wh={left:"right",right:"left",bottom:"top",top:"bottom"};function xh(t){return t.replace(/left|right|bottom|top/g,(t=>wh[t]))}var kh={start:"end",end:"start"};function Ch(t){return t.replace(/start|end/g,(t=>kh[t]))}var Sh=function(t){return void 0===t&&(t={}),{name:"flip",options:t,async fn(e){var o;const{placement:n,middlewareData:r,rects:i,initialPlacement:s,platform:a,elements:l}=e,c=t,{mainAxis:d=!0,crossAxis:u=!0,fallbackPlacements:h,fallbackStrategy:p="bestFit",fallbackAxisSideDirection:f="none",flipAlignment:m=!0}=c,g=Jl(c,["mainAxis","crossAxis","fallbackPlacements","fallbackStrategy","fallbackAxisSideDirection","flipAlignment"]),b=uh(n),v=uh(s)===s,y=await(null==a.isRTL?void 0:a.isRTL(l.floating)),w=h||(v||!m?[xh(s)]:function(t){const e=xh(t);return[Ch(t),e,Ch(e)]}(s));h||"none"===f||w.push(...function(t,e,o,n){const r=ch(t);let i=function(t,e,o){const n=["left","right"],r=["right","left"],i=["top","bottom"],s=["bottom","top"];switch(t){case"top":case"bottom":return o?e?r:n:e?n:r;case"left":case"right":return e?i:s;default:return[]}}(uh(t),"start"===o,n);return r&&(i=i.map((t=>t+"-"+r)),e&&(i=i.concat(i.map(Ch)))),i}(s,m,f,y));const x=[s,...w],k=await gh(e,g),C=[];let S=(null==(o=r.flip)?void 0:o.overflows)||[];if(d&&C.push(k[b]),u){const{main:t,cross:e}=function(t,e,o){void 0===o&&(o=!1);const n=ch(t),r=hh(t),i=dh(r);let s="x"===r?n===(o?"end":"start")?"right":"left":"start"===n?"bottom":"top";return e.reference[i]>e.floating[i]&&(s=xh(s)),{main:s,cross:xh(s)}}(n,i,y);C.push(k[t],k[e])}if(S=[...S,{placement:n,overflows:C}],!C.every((t=>t<=0))){var E;const t=((null==(E=r.flip)?void 0:E.index)||0)+1,e=x[t];if(e)return{data:{index:t,overflows:S},reset:{placement:e}};let o="bottom";switch(p){case"bestFit":{var _;const t=null==(_=S.map((t=>[t,t.overflows.filter((t=>t>0)).reduce(((t,e)=>t+e),0)])).sort(((t,e)=>t[1]-e[1]))[0])?void 0:_[0].placement;t&&(o=t);break}case"initialPlacement":o=s}if(n!==o)return{reset:{placement:o}}}return{}}}},Eh=function(t){return void 0===t&&(t=0),{name:"offset",options:t,async fn(e){const{x:o,y:n}=e,r=await async function(t,e){const{placement:o,platform:n,elements:r}=t,i=await(null==n.isRTL?void 0:n.isRTL(r.floating)),s=uh(o),a=ch(o),l="x"===hh(o),c=["left","top"].includes(s)?-1:1,d=i&&l?-1:1,u="function"==typeof e?e(t):e;let{mainAxis:h,crossAxis:p,alignmentAxis:f}="number"==typeof u?{mainAxis:u,crossAxis:0,alignmentAxis:null}:Kl({mainAxis:0,crossAxis:0,alignmentAxis:null},u);return a&&"number"==typeof f&&(p="end"===a?-1*f:f),l?{x:p*d,y:h*c}:{x:h*c,y:p*d}}(e,t);return{x:o+r.x,y:n+r.y,data:r}}}};var _h,Oh=function(t){return void 0===t&&(t={}),{name:"size",options:t,async fn(e){const{placement:o,rects:n,platform:r,elements:i}=e,s=t,{apply:a=(()=>{})}=s,l=Jl(s,["apply"]),c=await gh(e,l),d=uh(o),u=ch(o);let h,p;"top"===d||"bottom"===d?(h=d,p=u===(await(null==r.isRTL?void 0:r.isRTL(i.floating))?"start":"end")?"left":"right"):(p=d,h="end"===u?"top":"bottom");const f=vh(c.left,0),m=vh(c.right,0),g=vh(c.top,0),b=vh(c.bottom,0),v={availableHeight:n.floating.height-(["left","right"].includes(o)?2*(0!==g||0!==b?g+b:vh(c.top,c.bottom)):c[h]),availableWidth:n.floating.width-(["top","bottom"].includes(o)?2*(0!==f||0!==m?f+m:vh(c.left,c.right)):c[p])};await a(Kl(Kl({},e),v));const y=await r.getDimensions(i.floating);return n.floating.width!==y.width||n.floating.height!==y.height?{reset:{rects:!0}}:{}}}};function Lh(t){var e;return(null==(e=t.ownerDocument)?void 0:e.defaultView)||window}function Th(t){return Lh(t).getComputedStyle(t)}function $h(t){return Ih(t)?(t.nodeName||"").toLowerCase():""}function Mh(){if(_h)return _h;const t=navigator.userAgentData;return t&&Array.isArray(t.brands)?(_h=t.brands.map((t=>t.brand+"/"+t.version)).join(" "),_h):navigator.userAgent}function Dh(t){return t instanceof Lh(t).HTMLElement}function Ah(t){return t instanceof Lh(t).Element}function Ih(t){return t instanceof Lh(t).Node}function Ph(t){return"undefined"!=typeof ShadowRoot&&(t instanceof Lh(t).ShadowRoot||t instanceof ShadowRoot)}function Nh(t){const{overflow:e,overflowX:o,overflowY:n,display:r}=Th(t);return/auto|scroll|overlay|hidden|clip/.test(e+n+o)&&!["inline","contents"].includes(r)}function Uh(t){return["table","td","th"].includes($h(t))}function Hh(t){const e=/firefox/i.test(Mh()),o=Th(t),n=o.backdropFilter||o.WebkitBackdropFilter;return"none"!==o.transform||"none"!==o.perspective||!!n&&"none"!==n||e&&"filter"===o.willChange||e&&!!o.filter&&"none"!==o.filter||["transform","perspective"].some((t=>o.willChange.includes(t)))||["paint","layout","strict","content"].some((t=>{const e=o.contain;return null!=e&&e.includes(t)}))}function qh(){return!/^((?!chrome|android).)*safari/i.test(Mh())}function zh(t){return["html","body","#document"].includes($h(t))}var Rh=Math.min,jh=Math.max,Bh=Math.round;function Fh(t){const e=Th(t);let o=parseFloat(e.width),n=parseFloat(e.height);const r=t.offsetWidth,i=t.offsetHeight,s=Bh(o)!==r||Bh(n)!==i;return s&&(o=r,n=i),{width:o,height:n,fallback:s}}function Vh(t){return Ah(t)?t:t.contextElement}var Wh={x:1,y:1};function Gh(t){const e=Vh(t);if(!Dh(e))return Wh;const o=e.getBoundingClientRect(),{width:n,height:r,fallback:i}=Fh(e);let s=(i?Bh(o.width):o.width)/n,a=(i?Bh(o.height):o.height)/r;return s&&Number.isFinite(s)||(s=1),a&&Number.isFinite(a)||(a=1),{x:s,y:a}}function Kh(t,e,o,n){var r,i;void 0===e&&(e=!1),void 0===o&&(o=!1);const s=t.getBoundingClientRect(),a=Vh(t);let l=Wh;e&&(n?Ah(n)&&(l=Gh(n)):l=Gh(t));const c=a?Lh(a):window,d=!qh()&&o;let u=(s.left+(d&&(null==(r=c.visualViewport)?void 0:r.offsetLeft)||0))/l.x,h=(s.top+(d&&(null==(i=c.visualViewport)?void 0:i.offsetTop)||0))/l.y,p=s.width/l.x,f=s.height/l.y;if(a){const t=Lh(a),e=n&&Ah(n)?Lh(n):n;let o=t.frameElement;for(;o&&n&&e!==t;){const t=Gh(o),e=o.getBoundingClientRect(),n=getComputedStyle(o);e.x+=(o.clientLeft+parseFloat(n.paddingLeft))*t.x,e.y+=(o.clientTop+parseFloat(n.paddingTop))*t.y,u*=t.x,h*=t.y,p*=t.x,f*=t.y,u+=e.x,h+=e.y,o=Lh(o).frameElement}}return{width:p,height:f,top:h,right:u+p,bottom:h+f,left:u,x:u,y:h}}function Xh(t){return((Ih(t)?t.ownerDocument:t.document)||window.document).documentElement}function Jh(t){return Ah(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}}function Yh(t){return Kh(Xh(t)).left+Jh(t).scrollLeft}function Qh(t,e,o){const n=Dh(e),r=Xh(e),i=Kh(t,!0,"fixed"===o,e);let s={scrollLeft:0,scrollTop:0};const a={x:0,y:0};if(n||!n&&"fixed"!==o)if(("body"!==$h(e)||Nh(r))&&(s=Jh(e)),Dh(e)){const t=Kh(e,!0);a.x=t.x+e.clientLeft,a.y=t.y+e.clientTop}else r&&(a.x=Yh(r));return{x:i.left+s.scrollLeft-a.x,y:i.top+s.scrollTop-a.y,width:i.width,height:i.height}}function Zh(t){if("html"===$h(t))return t;const e=t.assignedSlot||t.parentNode||(Ph(t)?t.host:null)||Xh(t);return Ph(e)?e.host:e}function tp(t){return Dh(t)&&"fixed"!==Th(t).position?t.offsetParent:null}function ep(t){const e=Lh(t);let o=tp(t);for(;o&&Uh(o)&&"static"===Th(o).position;)o=tp(o);return o&&("html"===$h(o)||"body"===$h(o)&&"static"===Th(o).position&&!Hh(o))?e:o||function(t){let e=Zh(t);for(;Dh(e)&&!zh(e);){if(Hh(e))return e;e=Zh(e)}return null}(t)||e}function op(t){const e=Zh(t);return zh(e)?t.ownerDocument.body:Dh(e)&&Nh(e)?e:op(e)}function np(t,e){var o;void 0===e&&(e=[]);const n=op(t),r=n===(null==(o=t.ownerDocument)?void 0:o.body),i=Lh(n);return r?e.concat(i,i.visualViewport||[],Nh(n)?n:[]):e.concat(n,np(n))}function rp(t,e,o){return"viewport"===e?mh(function(t,e){const o=Lh(t),n=Xh(t),r=o.visualViewport;let i=n.clientWidth,s=n.clientHeight,a=0,l=0;if(r){i=r.width,s=r.height;const t=qh();(t||!t&&"fixed"===e)&&(a=r.offsetLeft,l=r.offsetTop)}return{width:i,height:s,x:a,y:l}}(t,o)):Ah(e)?function(t,e){const o=Kh(t,!0,"fixed"===e),n=o.top+t.clientTop,r=o.left+t.clientLeft,i=Dh(t)?Gh(t):{x:1,y:1},s=t.clientWidth*i.x,a=t.clientHeight*i.y,l=r*i.x,c=n*i.y;return{top:c,left:l,right:l+s,bottom:c+a,x:l,y:c,width:s,height:a}}(e,o):mh(function(t){var e;const o=Xh(t),n=Jh(t),r=null==(e=t.ownerDocument)?void 0:e.body,i=jh(o.scrollWidth,o.clientWidth,r?r.scrollWidth:0,r?r.clientWidth:0),s=jh(o.scrollHeight,o.clientHeight,r?r.scrollHeight:0,r?r.clientHeight:0);let a=-n.scrollLeft+Yh(t);const l=-n.scrollTop;return"rtl"===Th(r||o).direction&&(a+=jh(o.clientWidth,r?r.clientWidth:0)-i),{width:i,height:s,x:a,y:l}}(Xh(t)))}var ip={getClippingRect:function(t){let{element:e,boundary:o,rootBoundary:n,strategy:r}=t;const i="clippingAncestors"===o?function(t,e){const o=e.get(t);if(o)return o;let n=np(t).filter((t=>Ah(t)&&"body"!==$h(t))),r=null;const i="fixed"===Th(t).position;let s=i?Zh(t):t;for(;Ah(s)&&!zh(s);){const t=Th(s),e=Hh(s);(i?e||r:e||"static"!==t.position||!r||!["absolute","fixed"].includes(r.position))?r=t:n=n.filter((t=>t!==s)),s=Zh(s)}return e.set(t,n),n}(e,this._c):[].concat(o),s=[...i,n],a=s[0],l=s.reduce(((t,o)=>{const n=rp(e,o,r);return t.top=jh(n.top,t.top),t.right=Rh(n.right,t.right),t.bottom=Rh(n.bottom,t.bottom),t.left=jh(n.left,t.left),t}),rp(e,a,r));return{width:l.right-l.left,height:l.bottom-l.top,x:l.left,y:l.top}},convertOffsetParentRelativeRectToViewportRelativeRect:function(t){let{rect:e,offsetParent:o,strategy:n}=t;const r=Dh(o),i=Xh(o);if(o===i)return e;let s={scrollLeft:0,scrollTop:0},a={x:1,y:1};const l={x:0,y:0};if((r||!r&&"fixed"!==n)&&(("body"!==$h(o)||Nh(i))&&(s=Jh(o)),Dh(o))){const t=Kh(o);a=Gh(o),l.x=t.x+o.clientLeft,l.y=t.y+o.clientTop}return{width:e.width*a.x,height:e.height*a.y,x:e.x*a.x-s.scrollLeft*a.x+l.x,y:e.y*a.y-s.scrollTop*a.y+l.y}},isElement:Ah,getDimensions:function(t){return Fh(t)},getOffsetParent:ep,getDocumentElement:Xh,getScale:Gh,async getElementRects(t){let{reference:e,floating:o,strategy:n}=t;const r=this.getOffsetParent||ep,i=this.getDimensions;return{reference:Qh(e,await r(o),n),floating:Kl({x:0,y:0},await i(o))}},getClientRects:t=>Array.from(t.getClientRects()),isRTL:t=>"rtl"===Th(t).direction};var sp=(t,e,o)=>{const n=new Map,r=Kl({platform:ip},o),i=Xl(Kl({},r.platform),{_c:n});return(async(t,e,o)=>{const{placement:n="bottom",strategy:r="absolute",middleware:i=[],platform:s}=o,a=i.filter(Boolean),l=await(null==s.isRTL?void 0:s.isRTL(e));let c=await s.getElementRects({reference:t,floating:e,strategy:r}),{x:d,y:u}=ph(c,n,l),h=n,p={},f=0;for(let o=0;o<a.length;o++){const{name:i,fn:m}=a[o],{x:g,y:b,data:v,reset:y}=await m({x:d,y:u,initialPlacement:n,placement:h,strategy:r,middlewareData:p,rects:c,platform:s,elements:{reference:t,floating:e}});d=null!=g?g:d,u=null!=b?b:u,p=Xl(Kl({},p),{[i]:Kl(Kl({},p[i]),v)}),y&&f<=50&&(f++,"object"==typeof y&&(y.placement&&(h=y.placement),y.rects&&(c=!0===y.rects?await s.getElementRects({reference:t,floating:e,strategy:r}):y.rects),({x:d,y:u}=ph(c,h,l))),o=-1)}return{x:d,y:u,placement:h,strategy:r,middlewareData:p}})(t,e,Xl(Kl({},r),{platform:i}))},ap=class extends Dd{constructor(){super(...arguments),this.active=!1,this.placement="top",this.strategy="absolute",this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start()}disconnectedCallback(){this.stop()}async updated(t){super.updated(t),t.has("active")&&(this.active?this.start():this.stop()),t.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&"string"==typeof this.anchor){const t=this.getRootNode();this.anchorEl=t.getElementById(this.anchor)}else this.anchor instanceof HTMLElement?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');if(this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),!this.anchorEl)throw new Error("Invalid anchor element: no anchor could be found using the anchor slot or the anchor attribute.");this.start()}start(){this.anchorEl&&(this.cleanup=function(t,e,o,n){void 0===n&&(n={});const{ancestorScroll:r=!0,ancestorResize:i=!0,elementResize:s=!0,animationFrame:a=!1}=n,l=r&&!a,c=l||i?[...Ah(t)?np(t):t.contextElement?np(t.contextElement):[],...np(e)]:[];c.forEach((t=>{l&&t.addEventListener("scroll",o,{passive:!0}),i&&t.addEventListener("resize",o)}));let d,u=null;if(s){let n=!0;u=new ResizeObserver((()=>{n||o(),n=!1})),Ah(t)&&!a&&u.observe(t),Ah(t)||!t.contextElement||a||u.observe(t.contextElement),u.observe(e)}let h=a?Kh(t):null;return a&&function e(){const n=Kh(t);!h||n.x===h.x&&n.y===h.y&&n.width===h.width&&n.height===h.height||o(),h=n,d=requestAnimationFrame(e)}(),o(),()=>{var t;c.forEach((t=>{l&&t.removeEventListener("scroll",o),i&&t.removeEventListener("resize",o)})),null==(t=u)||t.disconnect(),u=null,a&&cancelAnimationFrame(d)}}(this.anchorEl,this.popup,(()=>{this.reposition()})))}async stop(){return new Promise((t=>{this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame((()=>t()))):t()}))}reposition(){if(!this.active||!this.anchorEl)return;const t=[Eh({mainAxis:this.distance,crossAxis:this.skidding})];this.sync?t.push(Oh({apply:({rects:t})=>{const e="width"===this.sync||"both"===this.sync,o="height"===this.sync||"both"===this.sync;this.popup.style.width=e?`${t.reference.width}px`:"",this.popup.style.height=o?`${t.reference.height}px`:""}})):(this.popup.style.width="",this.popup.style.height=""),this.flip&&t.push(Sh({boundary:this.flipBoundary,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:"best-fit"===this.flipFallbackStrategy?"bestFit":"initialPlacement",padding:this.flipPadding})),this.shift&&t.push(function(t){return void 0===t&&(t={}),{name:"shift",options:t,async fn(e){const{x:o,y:n,placement:r}=e,i=t,{mainAxis:s=!0,crossAxis:a=!1,limiter:l={fn:t=>{let{x:e,y:o}=t;return{x:e,y:o}}}}=i,c=Jl(i,["mainAxis","crossAxis","limiter"]),d={x:o,y:n},u=await gh(e,c),h=hh(uh(r)),p=function(t){return"x"===t?"y":"x"}(h);let f=d[h],m=d[p];if(s){const t="y"===h?"bottom":"right";f=yh(f+u["y"===h?"top":"left"],f,f-u[t])}if(a){const t="y"===p?"bottom":"right";m=yh(m+u["y"===p?"top":"left"],m,m-u[t])}const g=l.fn(Xl(Kl({},e),{[h]:f,[p]:m}));return Xl(Kl({},g),{data:{x:g.x-o,y:g.y-n}})}}}({boundary:this.shiftBoundary,padding:this.shiftPadding})),this.autoSize?t.push(Oh({boundary:this.autoSizeBoundary,padding:this.autoSizePadding,apply:({availableWidth:t,availableHeight:e})=>{"vertical"===this.autoSize||"both"===this.autoSize?this.style.setProperty("--auto-size-available-height",`${e}px`):this.style.removeProperty("--auto-size-available-height"),"horizontal"===this.autoSize||"both"===this.autoSize?this.style.setProperty("--auto-size-available-width",`${t}px`):this.style.removeProperty("--auto-size-available-width")}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&t.push((t=>({name:"arrow",options:t,async fn(e){const{element:o,padding:n=0}=t||{},{x:r,y:i,placement:s,rects:a,platform:l}=e;if(null==o)return{};const c=fh(n),d={x:r,y:i},u=hh(s),h=dh(u),p=await l.getDimensions(o),f="y"===u?"top":"left",m="y"===u?"bottom":"right",g=a.reference[h]+a.reference[u]-d[u]-a.floating[h],b=d[u]-a.reference[u],v=await(null==l.getOffsetParent?void 0:l.getOffsetParent(o));let y=v?"y"===u?v.clientHeight||0:v.clientWidth||0:0;0===y&&(y=a.floating[h]);const w=g/2-b/2,x=c[f],k=y-p[h]-c[m],C=y/2-p[h]/2+w,S=yh(x,C,k),E=null!=ch(s)&&C!=S&&a.reference[h]/2-(C<x?c[f]:c[m])-p[h]/2<0;return{[u]:d[u]-(E?C<x?x-C:k-C:0),data:{[u]:S,centerOffset:C-S}}}}))({element:this.arrowEl,padding:this.arrowPadding})),sp(this.anchorEl,this.popup,{placement:this.placement,middleware:t,strategy:this.strategy}).then((({x:t,y:e,middlewareData:o,placement:n})=>{const r="rtl"===getComputedStyle(this).direction,i={top:"bottom",right:"left",bottom:"top",left:"right"}[n.split("-")[0]];if(this.setAttribute("data-current-placement",n),Object.assign(this.popup.style,{left:`${t}px`,top:`${e}px`}),this.arrow){const t=o.arrow.x,e=o.arrow.y;let n="",s="",a="",l="";if("start"===this.arrowPlacement){const o="number"==typeof t?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";n="number"==typeof e?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",s=r?o:"",l=r?"":o}else if("end"===this.arrowPlacement){const o="number"==typeof t?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";s=r?"":o,l=r?o:"",a="number"==typeof e?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:""}else"center"===this.arrowPlacement?(l="number"==typeof t?"calc(50% - var(--arrow-size-diagonal))":"",n="number"==typeof e?"calc(50% - var(--arrow-size-diagonal))":""):(l="number"==typeof t?`${t}px`:"",n="number"==typeof e?`${e}px`:"");Object.assign(this.arrowEl.style,{top:n,right:s,bottom:a,left:l,[i]:"calc(var(--arrow-size-diagonal) * -1)"})}})),this.emit("sl-reposition")}render(){return Qc`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <div
        part="popup"
        class=${Ed({popup:!0,"popup--active":this.active,"popup--fixed":"fixed"===this.strategy,"popup--has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?Qc`<div part="arrow" class="popup__arrow" role="presentation"></div>`:""}
      </div>
    `}};ap.styles=lh,Yl([Md(".popup")],ap.prototype,"popup",2),Yl([Md(".popup__arrow")],ap.prototype,"arrowEl",2),Yl([Ld()],ap.prototype,"anchor",2),Yl([Ld({type:Boolean,reflect:!0})],ap.prototype,"active",2),Yl([Ld({reflect:!0})],ap.prototype,"placement",2),Yl([Ld({reflect:!0})],ap.prototype,"strategy",2),Yl([Ld({type:Number})],ap.prototype,"distance",2),Yl([Ld({type:Number})],ap.prototype,"skidding",2),Yl([Ld({type:Boolean})],ap.prototype,"arrow",2),Yl([Ld({attribute:"arrow-placement"})],ap.prototype,"arrowPlacement",2),Yl([Ld({attribute:"arrow-padding",type:Number})],ap.prototype,"arrowPadding",2),Yl([Ld({type:Boolean})],ap.prototype,"flip",2),Yl([Ld({attribute:"flip-fallback-placements",converter:{fromAttribute:t=>t.split(" ").map((t=>t.trim())).filter((t=>""!==t)),toAttribute:t=>t.join(" ")}})],ap.prototype,"flipFallbackPlacements",2),Yl([Ld({attribute:"flip-fallback-strategy"})],ap.prototype,"flipFallbackStrategy",2),Yl([Ld({type:Object})],ap.prototype,"flipBoundary",2),Yl([Ld({attribute:"flip-padding",type:Number})],ap.prototype,"flipPadding",2),Yl([Ld({type:Boolean})],ap.prototype,"shift",2),Yl([Ld({type:Object})],ap.prototype,"shiftBoundary",2),Yl([Ld({attribute:"shift-padding",type:Number})],ap.prototype,"shiftPadding",2),Yl([Ld({attribute:"auto-size"})],ap.prototype,"autoSize",2),Yl([Ld()],ap.prototype,"sync",2),Yl([Ld({type:Object})],ap.prototype,"autoSizeBoundary",2),Yl([Ld({attribute:"auto-size-padding",type:Number})],ap.prototype,"autoSizePadding",2),ap=Yl([_d("sl-popup")],ap);var lp=Ec`
  ${bd}

  :host {
    display: inline-block;
  }

  .button-group {
    display: flex;
    flex-wrap: nowrap;
  }
`,cp=class extends Dd{constructor(){super(...arguments),this.disableRole=!1,this.label=""}handleFocus(t){const e=dp(t.target);null==e||e.classList.add("sl-button-group__button--focus")}handleBlur(t){const e=dp(t.target);null==e||e.classList.remove("sl-button-group__button--focus")}handleMouseOver(t){const e=dp(t.target);null==e||e.classList.add("sl-button-group__button--hover")}handleMouseOut(t){const e=dp(t.target);null==e||e.classList.remove("sl-button-group__button--hover")}handleSlotChange(){const t=[...this.defaultSlot.assignedElements({flatten:!0})];t.forEach((e=>{const o=t.indexOf(e),n=dp(e);null!==n&&(n.classList.add("sl-button-group__button"),n.classList.toggle("sl-button-group__button--first",0===o),n.classList.toggle("sl-button-group__button--inner",o>0&&o<t.length-1),n.classList.toggle("sl-button-group__button--last",o===t.length-1),n.classList.toggle("sl-button-group__button--radio","sl-radio-button"===n.tagName.toLowerCase()))}))}render(){return Qc`
      <slot
        part="base"
        class="button-group"
        role="${this.disableRole?"presentation":"group"}"
        aria-label=${this.label}
        @focusout=${this.handleBlur}
        @focusin=${this.handleFocus}
        @mouseover=${this.handleMouseOver}
        @mouseout=${this.handleMouseOut}
        @slotchange=${this.handleSlotChange}
      ></slot>
    `}};function dp(t){var e;const o="sl-button, sl-radio-button";return null!=(e=t.closest(o))?e:t.querySelector(o)}cp.styles=lp,Yl([Md("slot")],cp.prototype,"defaultSlot",2),Yl([Td()],cp.prototype,"disableRole",2),Yl([Ld()],cp.prototype,"label",2),cp=Yl([_d("sl-button-group")],cp);var up=Ec`
  ${bd}

  :host {
    --indicator-color: var(--sl-color-primary-600);
    --track-color: var(--sl-color-neutral-200);
    --track-width: 2px;

    display: block;
  }

  .tab-group {
    display: flex;
    border-radius: 0;
  }

  .tab-group__tabs {
    display: flex;
    position: relative;
  }

  .tab-group__indicator {
    position: absolute;
    transition: var(--sl-transition-fast) translate ease, var(--sl-transition-fast) width ease;
  }

  .tab-group--has-scroll-controls .tab-group__nav-container {
    position: relative;
    padding: 0 var(--sl-spacing-x-large);
  }

  .tab-group__body {
    display: block;
    overflow: auto;
  }

  .tab-group__scroll-button {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    width: var(--sl-spacing-x-large);
  }

  .tab-group__scroll-button--start {
    left: 0;
  }

  .tab-group__scroll-button--end {
    right: 0;
  }

  .tab-group--rtl .tab-group__scroll-button--start {
    left: auto;
    right: 0;
  }

  .tab-group--rtl .tab-group__scroll-button--end {
    left: 0;
    right: auto;
  }

  /*
   * Top
   */

  .tab-group--top {
    flex-direction: column;
  }

  .tab-group--top .tab-group__nav-container {
    order: 1;
  }

  .tab-group--top .tab-group__nav {
    display: flex;
    overflow-x: auto;

    /* Hide scrollbar in Firefox */
    scrollbar-width: none;
  }

  /* Hide scrollbar in Chrome/Safari */
  .tab-group--top .tab-group__nav::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .tab-group--top .tab-group__tabs {
    flex: 1 1 auto;
    position: relative;
    flex-direction: row;
    border-bottom: solid var(--track-width) var(--track-color);
  }

  .tab-group--top .tab-group__indicator {
    bottom: calc(-1 * var(--track-width));
    border-bottom: solid var(--track-width) var(--indicator-color);
  }

  .tab-group--top .tab-group__body {
    order: 2;
  }

  .tab-group--top ::slotted(sl-tab-panel) {
    --padding: var(--sl-spacing-medium) 0;
  }

  /*
   * Bottom
   */

  .tab-group--bottom {
    flex-direction: column;
  }

  .tab-group--bottom .tab-group__nav-container {
    order: 2;
  }

  .tab-group--bottom .tab-group__nav {
    display: flex;
    overflow-x: auto;

    /* Hide scrollbar in Firefox */
    scrollbar-width: none;
  }

  /* Hide scrollbar in Chrome/Safari */
  .tab-group--bottom .tab-group__nav::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .tab-group--bottom .tab-group__tabs {
    flex: 1 1 auto;
    position: relative;
    flex-direction: row;
    border-top: solid var(--track-width) var(--track-color);
  }

  .tab-group--bottom .tab-group__indicator {
    top: calc(-1 * var(--track-width));
    border-top: solid var(--track-width) var(--indicator-color);
  }

  .tab-group--bottom .tab-group__body {
    order: 1;
  }

  .tab-group--bottom ::slotted(sl-tab-panel) {
    --padding: var(--sl-spacing-medium) 0;
  }

  /*
   * Start
   */

  .tab-group--start {
    flex-direction: row;
  }

  .tab-group--start .tab-group__nav-container {
    order: 1;
  }

  .tab-group--start .tab-group__tabs {
    flex: 0 0 auto;
    flex-direction: column;
    border-inline-end: solid var(--track-width) var(--track-color);
  }

  .tab-group--start .tab-group__indicator {
    right: calc(-1 * var(--track-width));
    border-right: solid var(--track-width) var(--indicator-color);
  }

  .tab-group--start.tab-group--rtl .tab-group__indicator {
    right: auto;
    left: calc(-1 * var(--track-width));
  }

  .tab-group--start .tab-group__body {
    flex: 1 1 auto;
    order: 2;
  }

  .tab-group--start ::slotted(sl-tab-panel) {
    --padding: 0 var(--sl-spacing-medium);
  }

  /*
   * End
   */

  .tab-group--end {
    flex-direction: row;
  }

  .tab-group--end .tab-group__nav-container {
    order: 2;
  }

  .tab-group--end .tab-group__tabs {
    flex: 0 0 auto;
    flex-direction: column;
    border-left: solid var(--track-width) var(--track-color);
  }

  .tab-group--end .tab-group__indicator {
    left: calc(-1 * var(--track-width));
    border-inline-start: solid var(--track-width) var(--indicator-color);
  }

  .tab-group--end.tab-group--rtl .tab-group__indicator {
    right: calc(-1 * var(--track-width));
    left: auto;
  }

  .tab-group--end .tab-group__body {
    flex: 1 1 auto;
    order: 1;
  }

  .tab-group--end ::slotted(sl-tab-panel) {
    --padding: 0 var(--sl-spacing-medium);
  }
`,hp=class extends Dd{constructor(){super(...arguments),this.localize=new mc(this),this.tabs=[],this.panels=[],this.hasScrollControls=!1,this.placement="top",this.activation="auto",this.noScrollControls=!1}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver((()=>{this.repositionIndicator(),this.updateScrollControls()})),this.mutationObserver=new MutationObserver((t=>{t.some((t=>!["aria-labelledby","aria-controls"].includes(t.attributeName)))&&setTimeout((()=>this.setAriaLabels())),t.some((t=>"disabled"===t.attributeName))&&this.syncTabsAndPanels()})),this.updateComplete.then((()=>{this.syncTabsAndPanels(),this.mutationObserver.observe(this,{attributes:!0,childList:!0,subtree:!0}),this.resizeObserver.observe(this.nav);const t=new IntersectionObserver(((t,e)=>{var o;t[0].intersectionRatio>0&&(this.setAriaLabels(),this.setActiveTab(null!=(o=this.getActiveTab())?o:this.tabs[0],{emitEvents:!1}),e.unobserve(t[0].target))}));t.observe(this.tabGroup)}))}disconnectedCallback(){this.mutationObserver.disconnect(),this.resizeObserver.unobserve(this.nav)}getAllTabs(t={includeDisabled:!0}){return[...this.shadowRoot.querySelector('slot[name="nav"]').assignedElements()].filter((e=>t.includeDisabled?"sl-tab"===e.tagName.toLowerCase():"sl-tab"===e.tagName.toLowerCase()&&!e.disabled))}getAllPanels(){return[...this.body.assignedElements()].filter((t=>"sl-tab-panel"===t.tagName.toLowerCase()))}getActiveTab(){return this.tabs.find((t=>t.active))}handleClick(t){const e=t.target.closest("sl-tab");(null==e?void 0:e.closest("sl-tab-group"))===this&&null!==e&&this.setActiveTab(e,{scrollBehavior:"smooth"})}handleKeyDown(t){const e=t.target.closest("sl-tab");if((null==e?void 0:e.closest("sl-tab-group"))===this&&(["Enter"," "].includes(t.key)&&null!==e&&(this.setActiveTab(e,{scrollBehavior:"smooth"}),t.preventDefault()),["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(t.key))){const e=this.tabs.find((t=>t.matches(":focus"))),o="rtl"===this.localize.dir();if("sl-tab"===(null==e?void 0:e.tagName.toLowerCase())){let n=this.tabs.indexOf(e);"Home"===t.key?n=0:"End"===t.key?n=this.tabs.length-1:["top","bottom"].includes(this.placement)&&t.key===(o?"ArrowRight":"ArrowLeft")||["start","end"].includes(this.placement)&&"ArrowUp"===t.key?n--:(["top","bottom"].includes(this.placement)&&t.key===(o?"ArrowLeft":"ArrowRight")||["start","end"].includes(this.placement)&&"ArrowDown"===t.key)&&n++,n<0&&(n=this.tabs.length-1),n>this.tabs.length-1&&(n=0),this.tabs[n].focus({preventScroll:!0}),"auto"===this.activation&&this.setActiveTab(this.tabs[n],{scrollBehavior:"smooth"}),["top","bottom"].includes(this.placement)&&xu(this.tabs[n],this.nav,"horizontal"),t.preventDefault()}}}handleScrollToStart(){this.nav.scroll({left:"rtl"===this.localize.dir()?this.nav.scrollLeft+this.nav.clientWidth:this.nav.scrollLeft-this.nav.clientWidth,behavior:"smooth"})}handleScrollToEnd(){this.nav.scroll({left:"rtl"===this.localize.dir()?this.nav.scrollLeft-this.nav.clientWidth:this.nav.scrollLeft+this.nav.clientWidth,behavior:"smooth"})}setActiveTab(t,e){if(e=Kl({emitEvents:!0,scrollBehavior:"auto"},e),t!==this.activeTab&&!t.disabled){const o=this.activeTab;this.activeTab=t,this.tabs.map((t=>t.active=t===this.activeTab)),this.panels.map((t=>{var e;return t.active=t.name===(null==(e=this.activeTab)?void 0:e.panel)})),this.syncIndicator(),["top","bottom"].includes(this.placement)&&xu(this.activeTab,this.nav,"horizontal",e.scrollBehavior),e.emitEvents&&(o&&this.emit("sl-tab-hide",{detail:{name:o.panel}}),this.emit("sl-tab-show",{detail:{name:this.activeTab.panel}}))}}setAriaLabels(){this.tabs.forEach((t=>{const e=this.panels.find((e=>e.name===t.panel));e&&(t.setAttribute("aria-controls",e.getAttribute("id")),e.setAttribute("aria-labelledby",t.getAttribute("id")))}))}repositionIndicator(){const t=this.getActiveTab();if(!t)return;const e=t.clientWidth,o=t.clientHeight,n="rtl"===this.localize.dir(),r=this.getAllTabs(),i=r.slice(0,r.indexOf(t)).reduce(((t,e)=>({left:t.left+e.clientWidth,top:t.top+e.clientHeight})),{left:0,top:0});switch(this.placement){case"top":case"bottom":this.indicator.style.width=`${e}px`,this.indicator.style.height="auto",this.indicator.style.translate=n?-1*i.left+"px":`${i.left}px`;break;case"start":case"end":this.indicator.style.width="auto",this.indicator.style.height=`${o}px`,this.indicator.style.translate=`0 ${i.top}px`}}syncTabsAndPanels(){this.tabs=this.getAllTabs({includeDisabled:!1}),this.panels=this.getAllPanels(),this.syncIndicator()}updateScrollControls(){this.noScrollControls?this.hasScrollControls=!1:this.hasScrollControls=["top","bottom"].includes(this.placement)&&this.nav.scrollWidth>this.nav.clientWidth}syncIndicator(){this.getActiveTab()?(this.indicator.style.display="block",this.repositionIndicator()):this.indicator.style.display="none"}show(t){const e=this.tabs.find((e=>e.panel===t));e&&this.setActiveTab(e,{scrollBehavior:"smooth"})}render(){const t="rtl"===this.localize.dir();return Qc`
      <div
        part="base"
        class=${Ed({"tab-group":!0,"tab-group--top":"top"===this.placement,"tab-group--bottom":"bottom"===this.placement,"tab-group--start":"start"===this.placement,"tab-group--end":"end"===this.placement,"tab-group--rtl":"rtl"===this.localize.dir(),"tab-group--has-scroll-controls":this.hasScrollControls})}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
      >
        <div class="tab-group__nav-container" part="nav">
          ${this.hasScrollControls?Qc`
                <sl-icon-button
                  part="scroll-button scroll-button--start"
                  exportparts="base:scroll-button__base"
                  class="tab-group__scroll-button tab-group__scroll-button--start"
                  name=${t?"chevron-right":"chevron-left"}
                  library="system"
                  label=${this.localize.term("scrollToStart")}
                  @click=${this.handleScrollToStart}
                ></sl-icon-button>
              `:""}

          <div class="tab-group__nav">
            <div part="tabs" class="tab-group__tabs" role="tablist">
              <div part="active-tab-indicator" class="tab-group__indicator"></div>
              <slot name="nav" @slotchange=${this.syncTabsAndPanels}></slot>
            </div>
          </div>

          ${this.hasScrollControls?Qc`
                <sl-icon-button
                  part="scroll-button scroll-button--end"
                  exportparts="base:scroll-button__base"
                  class="tab-group__scroll-button tab-group__scroll-button--end"
                  name=${t?"chevron-left":"chevron-right"}
                  library="system"
                  label=${this.localize.term("scrollToEnd")}
                  @click=${this.handleScrollToEnd}
                ></sl-icon-button>
              `:""}
        </div>

        <slot part="body" class="tab-group__body" @slotchange=${this.syncTabsAndPanels}></slot>
      </div>
    `}};hp.styles=up,Yl([Md(".tab-group")],hp.prototype,"tabGroup",2),Yl([Md(".tab-group__body")],hp.prototype,"body",2),Yl([Md(".tab-group__nav")],hp.prototype,"nav",2),Yl([Md(".tab-group__indicator")],hp.prototype,"indicator",2),Yl([Td()],hp.prototype,"hasScrollControls",2),Yl([Ld()],hp.prototype,"placement",2),Yl([Ld()],hp.prototype,"activation",2),Yl([Ld({attribute:"no-scroll-controls",type:Boolean})],hp.prototype,"noScrollControls",2),Yl([bc("noScrollControls",{waitUntilFirstUpdate:!0})],hp.prototype,"updateScrollControls",1),Yl([bc("placement",{waitUntilFirstUpdate:!0})],hp.prototype,"syncIndicator",1),hp=Yl([_d("sl-tab-group")],hp);var pp=Ec`
  ${bd}

  :host {
    display: inline-block;
  }

  .tab {
    display: inline-flex;
    align-items: center;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-semibold);
    border-radius: var(--sl-border-radius-medium);
    color: var(--sl-color-neutral-600);
    padding: var(--sl-spacing-medium) var(--sl-spacing-large);
    white-space: nowrap;
    user-select: none;
    cursor: pointer;
    transition: var(--transition-speed) box-shadow, var(--transition-speed) color;
  }

  .tab:hover:not(.tab--disabled) {
    color: var(--sl-color-primary-600);
  }

  .tab:focus {
    outline: none;
  }

  .tab:focus-visible:not(.tab--disabled) {
    color: var(--sl-color-primary-600);
  }

  .tab:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: calc(-1 * var(--sl-focus-ring-width) - var(--sl-focus-ring-offset));
  }

  .tab.tab--active:not(.tab--disabled) {
    color: var(--sl-color-primary-600);
  }

  .tab.tab--closable {
    padding-inline-end: var(--sl-spacing-small);
  }

  .tab.tab--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .tab__close-button {
    font-size: var(--sl-font-size-small);
    margin-inline-start: var(--sl-spacing-small);
  }

  .tab__close-button::part(base) {
    padding: var(--sl-spacing-3x-small);
  }

  @media (forced-colors: active) {
    .tab.tab--active:not(.tab--disabled) {
      outline: solid 1px transparent;
      outline-offset: -3px;
    }
  }
`,fp=0,mp=class extends Dd{constructor(){super(...arguments),this.localize=new mc(this),this.attrId=++fp,this.componentId=`sl-tab-${this.attrId}`,this.panel="",this.active=!1,this.closable=!1,this.disabled=!1}connectedCallback(){super.connectedCallback(),this.setAttribute("role","tab")}handleCloseClick(){this.emit("sl-close")}handleActiveChange(){this.setAttribute("aria-selected",this.active?"true":"false")}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false")}focus(t){this.tab.focus(t)}blur(){this.tab.blur()}render(){return this.id=this.id.length>0?this.id:this.componentId,Qc`
      <div
        part="base"
        class=${Ed({tab:!0,"tab--active":this.active,"tab--closable":this.closable,"tab--disabled":this.disabled})}
        tabindex=${this.disabled?"-1":"0"}
      >
        <slot></slot>
        ${this.closable?Qc`
              <sl-icon-button
                part="close-button"
                exportparts="base:close-button__base"
                name="x-lg"
                library="system"
                label=${this.localize.term("close")}
                class="tab__close-button"
                @click=${this.handleCloseClick}
                tabindex="-1"
              ></sl-icon-button>
            `:""}
      </div>
    `}};mp.styles=pp,Yl([Md(".tab")],mp.prototype,"tab",2),Yl([Ld({reflect:!0})],mp.prototype,"panel",2),Yl([Ld({type:Boolean,reflect:!0})],mp.prototype,"active",2),Yl([Ld({type:Boolean})],mp.prototype,"closable",2),Yl([Ld({type:Boolean,reflect:!0})],mp.prototype,"disabled",2),Yl([bc("active")],mp.prototype,"handleActiveChange",1),Yl([bc("disabled")],mp.prototype,"handleDisabledChange",1),mp=Yl([_d("sl-tab")],mp);var gp=Ec`
  ${bd}

  :host {
    --padding: 0;

    display: none;
  }

  :host([active]) {
    display: block;
  }

  .tab-panel {
    display: block;
    padding: var(--padding);
  }
`,bp=0,vp=class extends Dd{constructor(){super(...arguments),this.attrId=++bp,this.componentId=`sl-tab-panel-${this.attrId}`,this.name="",this.active=!1}connectedCallback(){super.connectedCallback(),this.id=this.id.length>0?this.id:this.componentId,this.setAttribute("role","tabpanel")}handleActiveChange(){this.setAttribute("aria-hidden",this.active?"false":"true")}render(){return Qc`
      <slot
        part="base"
        class=${Ed({"tab-panel":!0,"tab-panel--active":this.active})}
      ></slot>
    `}};vp.styles=gp,Yl([Ld({reflect:!0})],vp.prototype,"name",2),Yl([Ld({type:Boolean,reflect:!0})],vp.prototype,"active",2),Yl([bc("active")],vp.prototype,"handleActiveChange",1),vp=Yl([_d("sl-tab-panel")],vp);var yp=Ec`
  ${bd}

  :host {
    --max-width: 20rem;
    --hide-delay: 0ms;
    --show-delay: 150ms;

    display: contents;
  }

  .tooltip {
    --arrow-size: var(--sl-tooltip-arrow-size);
    --arrow-color: var(--sl-tooltip-background-color);
  }

  .tooltip::part(popup) {
    pointer-events: none;
    z-index: var(--sl-z-index-tooltip);
  }

  .tooltip[placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .tooltip[placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  .tooltip[placement^='left']::part(popup) {
    transform-origin: right;
  }

  .tooltip[placement^='right']::part(popup) {
    transform-origin: left;
  }

  .tooltip__body {
    display: block;
    width: max-content;
    max-width: var(--max-width);
    border-radius: var(--sl-tooltip-border-radius);
    background-color: var(--sl-tooltip-background-color);
    font-family: var(--sl-tooltip-font-family);
    font-size: var(--sl-tooltip-font-size);
    font-weight: var(--sl-tooltip-font-weight);
    line-height: var(--sl-tooltip-line-height);
    color: var(--sl-tooltip-color);
    padding: var(--sl-tooltip-padding);
    pointer-events: none;
  }
`,wp=class extends Dd{constructor(){super(...arguments),this.localize=new mc(this),this.content="",this.placement="top",this.disabled=!1,this.distance=8,this.open=!1,this.skidding=0,this.trigger="hover focus",this.hoist=!1}connectedCallback(){super.connectedCallback(),this.handleBlur=this.handleBlur.bind(this),this.handleClick=this.handleClick.bind(this),this.handleFocus=this.handleFocus.bind(this),this.handleKeyDown=this.handleKeyDown.bind(this),this.handleMouseOver=this.handleMouseOver.bind(this),this.handleMouseOut=this.handleMouseOut.bind(this),this.updateComplete.then((()=>{this.addEventListener("blur",this.handleBlur,!0),this.addEventListener("focus",this.handleFocus,!0),this.addEventListener("click",this.handleClick),this.addEventListener("keydown",this.handleKeyDown),this.addEventListener("mouseover",this.handleMouseOver),this.addEventListener("mouseout",this.handleMouseOut)}))}firstUpdated(){this.body.hidden=!this.open,this.open&&(this.popup.active=!0,this.popup.reposition())}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("blur",this.handleBlur,!0),this.removeEventListener("focus",this.handleFocus,!0),this.removeEventListener("click",this.handleClick),this.removeEventListener("keydown",this.handleKeyDown),this.removeEventListener("mouseover",this.handleMouseOver),this.removeEventListener("mouseout",this.handleMouseOut)}handleBlur(){this.hasTrigger("focus")&&this.hide()}handleClick(){this.hasTrigger("click")&&(this.open?this.hide():this.show())}handleFocus(){this.hasTrigger("focus")&&this.show()}handleKeyDown(t){this.open&&"Escape"===t.key&&(t.stopPropagation(),this.hide())}handleMouseOver(){if(this.hasTrigger("hover")){const t=Zl(getComputedStyle(this).getPropertyValue("--show-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout((()=>this.show()),t)}}handleMouseOut(){if(this.hasTrigger("hover")){const t=Zl(getComputedStyle(this).getPropertyValue("--hide-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout((()=>this.hide()),t)}}hasTrigger(t){return this.trigger.split(" ").includes(t)}async handleOpenChange(){if(this.open){if(this.disabled)return;this.emit("sl-show"),await ec(this.body),this.body.hidden=!1,this.popup.active=!0;const{keyframes:t,options:e}=sc(this,"tooltip.show",{dir:this.localize.dir()});await Ql(this.popup.popup,t,e),this.emit("sl-after-show")}else{this.emit("sl-hide"),await ec(this.body);const{keyframes:t,options:e}=sc(this,"tooltip.hide",{dir:this.localize.dir()});await Ql(this.popup.popup,t,e),this.popup.active=!1,this.body.hidden=!0,this.emit("sl-after-hide")}}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}handleDisabledChange(){this.disabled&&this.open&&this.hide()}async show(){if(!this.open)return this.open=!0,ql(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,ql(this,"sl-after-hide")}render(){return Qc`
      <sl-popup
        part="base"
        exportparts="
          popup:base__popup,
          arrow:base__arrow
        "
        class=${Ed({tooltip:!0,"tooltip--open":this.open})}
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        strategy=${this.hoist?"fixed":"absolute"}
        flip
        shift
        arrow
      >
        <slot slot="anchor" aria-describedby="tooltip"></slot>

        <slot
          name="content"
          part="body"
          id="tooltip"
          class="tooltip__body"
          role="tooltip"
          aria-live=${this.open?"polite":"off"}
        >
          ${this.content}
        </slot>
      </sl-popup>
    `}};wp.styles=yp,Yl([Md("slot:not([name])")],wp.prototype,"defaultSlot",2),Yl([Md(".tooltip__body")],wp.prototype,"body",2),Yl([Md("sl-popup")],wp.prototype,"popup",2),Yl([Ld()],wp.prototype,"content",2),Yl([Ld()],wp.prototype,"placement",2),Yl([Ld({type:Boolean,reflect:!0})],wp.prototype,"disabled",2),Yl([Ld({type:Number})],wp.prototype,"distance",2),Yl([Ld({type:Boolean,reflect:!0})],wp.prototype,"open",2),Yl([Ld({type:Number})],wp.prototype,"skidding",2),Yl([Ld()],wp.prototype,"trigger",2),Yl([Ld({type:Boolean})],wp.prototype,"hoist",2),Yl([bc("open",{waitUntilFirstUpdate:!0})],wp.prototype,"handleOpenChange",1),Yl([bc(["content","distance","hoist","placement","skidding"])],wp.prototype,"handleOptionsChange",1),Yl([bc("disabled")],wp.prototype,"handleDisabledChange",1),wp=Yl([_d("sl-tooltip")],wp),ic("tooltip.show",{keyframes:[{opacity:0,scale:.8},{opacity:1,scale:1}],options:{duration:150,easing:"ease"}}),ic("tooltip.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.8}],options:{duration:150,easing:"ease"}});var xp=Ec`
  ${bd}

  :host {
    display: inline-block;
  }

  :host([size='small']) {
    --height: var(--sl-toggle-size-small);
    --thumb-size: calc(var(--sl-toggle-size-small) + 4px);
    --width: calc(var(--height) * 2);

    font-size: var(--sl-input-font-size-small);
  }

  :host([size='medium']) {
    --height: var(--sl-toggle-size-medium);
    --thumb-size: calc(var(--sl-toggle-size-medium) + 4px);
    --width: calc(var(--height) * 2);

    font-size: var(--sl-input-font-size-medium);
  }

  :host([size='large']) {
    --height: var(--sl-toggle-size-large);
    --thumb-size: calc(var(--sl-toggle-size-large) + 4px);
    --width: calc(var(--height) * 2);

    font-size: var(--sl-input-font-size-large);
  }

  .switch {
    display: inline-flex;
    align-items: center;
    font-family: var(--sl-input-font-family);
    font-size: inherit;
    font-weight: var(--sl-input-font-weight);
    color: var(--sl-input-label-color);
    vertical-align: middle;
    cursor: pointer;
  }

  .switch__control {
    flex: 0 0 auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--width);
    height: var(--height);
    background-color: var(--sl-color-neutral-400);
    border: solid var(--sl-input-border-width) var(--sl-color-neutral-400);
    border-radius: var(--height);
    transition: var(--sl-transition-fast) border-color, var(--sl-transition-fast) background-color;
  }

  .switch__control .switch__thumb {
    width: var(--thumb-size);
    height: var(--thumb-size);
    background-color: var(--sl-color-neutral-0);
    border-radius: 50%;
    border: solid var(--sl-input-border-width) var(--sl-color-neutral-400);
    translate: calc((var(--width) - var(--height)) / -2);
    transition: var(--sl-transition-fast) translate ease, var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) border-color, var(--sl-transition-fast) box-shadow;
  }

  .switch__input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  /* Hover */
  .switch:not(.switch--checked):not(.switch--disabled) .switch__control:hover {
    background-color: var(--sl-color-neutral-400);
    border-color: var(--sl-color-neutral-400);
  }

  .switch:not(.switch--checked):not(.switch--disabled) .switch__control:hover .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-neutral-400);
  }

  /* Focus */
  .switch:not(.switch--checked):not(.switch--disabled) .switch__input:focus-visible ~ .switch__control {
    background-color: var(--sl-color-neutral-400);
    border-color: var(--sl-color-neutral-400);
  }

  .switch:not(.switch--checked):not(.switch--disabled) .switch__input:focus-visible ~ .switch__control .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Checked */
  .switch--checked .switch__control {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
  }

  .switch--checked .switch__control .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    translate: calc((var(--width) - var(--height)) / 2);
  }

  /* Checked + hover */
  .switch.switch--checked:not(.switch--disabled) .switch__control:hover {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
  }

  .switch.switch--checked:not(.switch--disabled) .switch__control:hover .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
  }

  /* Checked + focus */
  .switch.switch--checked:not(.switch--disabled) .switch__input:focus-visible ~ .switch__control {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
  }

  .switch.switch--checked:not(.switch--disabled) .switch__input:focus-visible ~ .switch__control .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Disabled */
  .switch--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .switch__label {
    display: inline-block;
    line-height: var(--height);
    margin-inline-start: 0.5em;
    user-select: none;
  }

  :host([required]) .switch__label::after {
    content: var(--sl-input-required-content);
    margin-inline-start: var(--sl-input-required-content-offset);
  }
`,kp=class extends Dd{constructor(){super(...arguments),this.formControlController=new du(this,{value:t=>t.checked?t.value||"on":void 0,defaultValue:t=>t.defaultChecked,setValue:(t,e)=>t.checked=e}),this.hasFocus=!1,this.title="",this.name="",this.size="medium",this.disabled=!1,this.checked=!1,this.defaultChecked=!1,this.form="",this.required=!1}firstUpdated(){this.formControlController.updateValidity()}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleInput(){this.emit("sl-input")}handleClick(){this.checked=!this.checked,this.emit("sl-change")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleKeyDown(t){"ArrowLeft"===t.key&&(t.preventDefault(),this.checked=!1,this.emit("sl-change"),this.emit("sl-input")),"ArrowRight"===t.key&&(t.preventDefault(),this.checked=!0,this.emit("sl-change"),this.emit("sl-input"))}handleCheckedChange(){this.input.checked=this.checked,this.formControlController.updateValidity()}handleDisabledChange(){this.formControlController.setValidity(!0)}click(){this.input.click()}focus(t){this.input.focus(t)}blur(){this.input.blur()}checkValidity(){return this.input.checkValidity()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity()}render(){return Qc`
      <label
        part="base"
        class=${Ed({switch:!0,"switch--checked":this.checked,"switch--disabled":this.disabled,"switch--focused":this.hasFocus,"switch--small":"small"===this.size,"switch--medium":"medium"===this.size,"switch--large":"large"===this.size})}
      >
        <input
          class="switch__input"
          type="checkbox"
          title=${this.title}
          name=${this.name}
          value=${Rd(this.value)}
          .checked=${oh(this.checked)}
          .disabled=${this.disabled}
          .required=${this.required}
          role="switch"
          aria-checked=${this.checked?"true":"false"}
          @click=${this.handleClick}
          @input=${this.handleInput}
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
          @keydown=${this.handleKeyDown}
        />

        <span part="control" class="switch__control">
          <span part="thumb" class="switch__thumb"></span>
        </span>

        <slot part="label" class="switch__label"></slot>
      </label>
    `}};function Cp(t){let e,o,n,r,i,s,a,l,c,d,u,h,p,b,y,x,k,C,_=t[7].switchTitle.tooltip+"",O=t[4]&&!t[3]&&Sp(t);function L(t,e){return 512&e[0]&&(u=null),null==u&&(u=!!Dp(!1,t[9].VISIBILITY)),u?_p:Ep}let T=L(t,[-1,-1]),$=T(t),M=t[3]&&Op(t),D=t[4]&&t[8].editMode&&Lp(t),A=!t[11]&&!t[3]&&Tp(t),I=t[0]&&$p();return{c(){e=v("div"),o=v("div"),n=v("sl-tooltip"),r=v("div"),i=w(),s=v("a"),a=v("i"),c=w(),O&&O.c(),d=w(),$.c(),h=w(),p=v("small"),p.textContent="Collections",b=w(),M&&M.c(),y=w(),D&&D.c(),x=w(),A&&A.c(),k=w(),I&&I.c(),S(r,"slot","content"),S(a,"class","icon-question cc-module-icon"),S(s,"target","_blank"),S(s,"rel","noreferrer"),S(s,"href",l=t[7].switchTitle.url),E(n,"class","svelte-q8r2lr"),S(o,"class","cc-switch-title svelte-q8r2lr"),S(e,"class","cc-switch-container svelte-q8r2lr")},m(t,l){m(t,e,l),f(e,o),f(o,n),f(n,r),r.innerHTML=_,f(n,i),f(n,s),f(s,a),f(o,c),O&&O.m(o,null),f(o,d),$.m(o,null),f(o,h),f(o,p),f(e,b),M&&M.m(e,null),f(e,y),D&&D.m(e,null),f(e,x),A&&A.m(e,null),f(e,k),I&&I.m(e,null),C=!0},p(t,n){(!C||128&n[0])&&_!==(_=t[7].switchTitle.tooltip+"")&&(r.innerHTML=_),(!C||128&n[0]&&l!==(l=t[7].switchTitle.url))&&S(s,"href",l),t[4]&&!t[3]?O?O.p(t,n):(O=Sp(t),O.c(),O.m(o,d)):O&&(O.d(1),O=null),T===(T=L(t,n))&&$?$.p(t,n):($.d(1),$=T(t),$&&($.c(),$.m(o,h))),t[3]?M?M.p(t,n):(M=Op(t),M.c(),M.m(e,y)):M&&(M.d(1),M=null),t[4]&&t[8].editMode?D?D.p(t,n):(D=Lp(t),D.c(),D.m(e,x)):D&&(D.d(1),D=null),t[11]||t[3]?A&&(A.d(1),A=null):A?A.p(t,n):(A=Tp(t),A.c(),A.m(e,k)),t[0]?I?1&n[0]&&et(I,1):(I=$p(),I.c(),et(I,1),I.m(e,null)):I&&(Z(),ot(I,1,1,(()=>{I=null})),tt())},i(t){C||(et(I),C=!0)},o(t){ot(I),C=!1},d(t){t&&g(e),O&&O.d(),$.d(),M&&M.d(),D&&D.d(),A&&A.d(),I&&I.d()}}}function Sp(t){let e,o,r,i;return{c(){e=v("i"),S(e,"id","configShowSwitch"),S(e,"class",o=(t[0]?"icon-mini-arrow-down":"icon-mini-arrow-right")+" cc-module-icon")},m(o,n){m(o,e,n),r||(i=[k(e,"click",t[14]),k(e,"keydown",t[14])],r=!0)},p(t,n){1&n[0]&&o!==(o=(t[0]?"icon-mini-arrow-down":"icon-mini-arrow-right")+" cc-module-icon")&&S(e,"class",o)},d(t){t&&g(e),r=!1,n(i)}}}function Ep(t){let e,o,n,r,i=t[7].studentInvisible.tooltip+"";return{c(){e=v("sl-tooltip"),o=v("div"),n=w(),r=v("i"),S(o,"slot","content"),S(r,"class","icon-unpublish"),E(e,"class","svelte-q8r2lr")},m(t,s){m(t,e,s),f(e,o),o.innerHTML=i,f(e,n),f(e,r)},p(t,e){128&e[0]&&i!==(i=t[7].studentInvisible.tooltip+"")&&(o.innerHTML=i)},d(t){t&&g(e)}}}function _p(t){let e,o,n,r,i=t[7].studentVisible.tooltip+"";return{c(){e=v("sl-tooltip"),o=v("div"),n=w(),r=v("i"),S(o,"slot","content"),S(r,"class","icon-Solid icon-publish svelte-q8r2lr"),E(e,"class","svelte-q8r2lr")},m(t,s){m(t,e,s),f(e,o),o.innerHTML=i,f(e,n),f(e,r)},p(t,e){128&e[0]&&i!==(i=t[7].studentVisible.tooltip+"")&&(o.innerHTML=i)},d(t){t&&g(e)}}}function Op(e){let o,n,r,i;return{c(){o=v("label"),n=v("sl-switch"),E(n,"id","cc-switch"),E(n,"class","svelte-q8r2lr"),S(o,"class","cc-switch svelte-q8r2lr"),S(o,"for","cc-switch")},m(t,s){m(t,o,s),f(o,n),r||(i=k(n,"sl-change",e[15]),r=!0)},p:t,d(t){t&&g(o),r=!1,i()}}}function Lp(t){let e,o,n,i,s,a,l;return{c(){e=v("div"),o=v("button"),n=y("Save"),S(o,"class",i=h(t[8].needToSaveCollections?"cc-active-save-button":"cc-save-button")+" svelte-q8r2lr"),S(o,"id","cc-save-button"),o.disabled=s=!t[8].needToSaveCollections,S(e,"class","cc-save svelte-q8r2lr")},m(i,s){m(i,e,s),f(e,o),f(o,n),a||(l=k(o,"click",(function(){r(t[6].saveCollections(t[9],t[8].editMode,t[8].needToSaveCollections,t[13]))&&t[6].saveCollections(t[9],t[8].editMode,t[8].needToSaveCollections,t[13]).apply(this,arguments)})),a=!0)},p(e,n){t=e,256&n[0]&&i!==(i=h(t[8].needToSaveCollections?"cc-active-save-button":"cc-save-button")+" svelte-q8r2lr")&&S(o,"class",i),256&n[0]&&s!==(s=!t[8].needToSaveCollections)&&(o.disabled=s)},d(t){t&&g(e),a=!1,l()}}}function Tp(t){let e,o,n,r,i,s,a,l,c,d,u=t[7].unpublished.tooltip+"";return{c(){e=v("div"),o=v("sl-tooltip"),n=v("div"),r=w(),i=v("a"),s=v("i"),l=w(),c=v("a"),d=v("sl-button"),d.textContent="unpublished",S(n,"slot","content"),S(s,"class","icon-question cc-module-icon"),S(i,"id","cc-about-unpublished"),S(i,"target","_blank"),S(i,"rel","noreferrer"),S(i,"href",a=t[7].unpublished.url),E(o,"trigger","hover focus"),E(o,"class","svelte-q8r2lr"),E(d,"pill",""),E(d,"size","small"),E(d,"variant","warning"),S(c,"href",t[12]),S(c,"target","_blank"),S(c,"rel","noreferrer"),S(e,"class","cc-unpublished svelte-q8r2lr")},m(t,a){m(t,e,a),f(e,o),f(o,n),n.innerHTML=u,f(o,r),f(o,i),f(i,s),f(e,l),f(e,c),f(c,d)},p(t,e){128&e[0]&&u!==(u=t[7].unpublished.tooltip+"")&&(n.innerHTML=u),128&e[0]&&a!==(a=t[7].unpublished.url)&&S(i,"href",a)},d(t){t&&g(e)}}}function $p(t){let e,o,n;return o=new Ul({}),{c(){e=v("div"),rt(o.$$.fragment),S(e,"id","cc-config"),S(e,"class","border border-trbl svelte-q8r2lr")},m(t,r){m(t,e,r),it(o,e,null),n=!0},i(t){n||(et(o.$$.fragment,t),n=!0)},o(t){ot(o.$$.fragment,t),n=!1},d(t){t&&g(e),st(o)}}}function Mp(t){let e,o,n,r,i=t[1]&&t[2]&&t[10]&&!t[5]&&Cp(t);return{c(){i&&i.c(),e=x()},m(s,a){i&&i.m(s,a),m(s,e,a),o=!0,n||(r=k(window,"beforeunload",t[16]),n=!0)},p(t,o){t[1]&&t[2]&&t[10]&&!t[5]?i?(i.p(t,o),1062&o[0]&&et(i,1)):(i=Cp(t),i.c(),et(i,1),i.m(e.parentNode,e)):i&&(Z(),ot(i,1,1,(()=>{i=null})),tt())},i(t){o||(et(i),o=!0)},o(t){ot(i),o=!1},d(t){i&&i.d(t),t&&g(e),n=!1,r()}}}kp.styles=xp,Yl([Md('input[type="checkbox"]')],kp.prototype,"input",2),Yl([Td()],kp.prototype,"hasFocus",2),Yl([Ld()],kp.prototype,"title",2),Yl([Ld()],kp.prototype,"name",2),Yl([Ld()],kp.prototype,"value",2),Yl([Ld({reflect:!0})],kp.prototype,"size",2),Yl([Ld({type:Boolean,reflect:!0})],kp.prototype,"disabled",2),Yl([Ld({type:Boolean,reflect:!0})],kp.prototype,"checked",2),Yl([Lu("checked")],kp.prototype,"defaultChecked",2),Yl([Ld({reflect:!0})],kp.prototype,"form",2),Yl([Ld({type:Boolean,reflect:!0})],kp.prototype,"required",2),Yl([bc("checked",{waitUntilFirstUpdate:!0})],kp.prototype,"handleCheckedChange",1),Yl([bc("disabled",{waitUntilFirstUpdate:!0})],kp.prototype,"handleDisabledChange",1),kp=Yl([_d("sl-switch")],kp);function Dp(t,e){return"no-one"!==e&&(t?"teachers"===e||"all"===e:"students"===e||"all"===e)}function Ap(t,e,o){let n,r,i;u(t,ua,(t=>o(8,n=t))),u(t,ca,(t=>o(9,r=t))),u(t,da,(t=>o(28,i=t)));var s=this&&this.__awaiter||function(t,e,o,n){return new(o||(o=Promise))((function(r,i){function s(t){try{l(n.next(t))}catch(t){i(t)}}function a(t){try{l(n.throw(t))}catch(t){i(t)}}function l(t){var e;t.done?r(t.value):(e=t.value,e instanceof o?e:new o((function(t){t(e)}))).then(s,a)}l((n=n.apply(t,e||[])).next())}))};Fd("../node_modules/@shoelace-style/shoelace/dist/");let a=false,l=true,{courseId:c}=e,{editMode:d}=e,{csrfToken:h}=e,{modulesPage:f}=e,{showConfig:m}=e;p(ua,n={courseId:c,editMode:d,csrfToken:h,modulesPage:f,currentCollection:"",currentCollectionChanged:!1,needToSaveCollections:!1,ccOn:!1,studyPeriod:null},n);let g=`/courses/${n.courseId}/pages/canvas-collections-configuration`,b=!0,v=!1,y=!1,w=!1,x=!1,k=!1,C=!1,S=null,E=null,_=null,O=null,L=!0;function T(){o(10,w=!0),p(da,i=S.courseModules,i),p(ua,n.studyPeriod=S.studyPeriod,n),M()}function $(t=""){""===t&&(o(3,b=!1),p(ua,n.ccOn=Dp(n.editMode,E.collections.VISIBILITY),n),o(11,L=E.ccPublished),p(ua,n.currentCollection=E.getCurrentCollection(),n),E.isImportedCollection()&&o(5,C=!0),(n.ccOn||n.editMode)&&(p(ua,n.currentCollectionChanged=!0,n),x=!0,M()))}function M(){w&&x&&(E.isImportedCollection()?function(){const t=document.getElementById("context_modules");t?new ja({target:t,props:{collectionsDetails:E}}):alert("Unable to find div#context_modules")}():b||(E.addCanvasModuleData(S.courseModules,n.editMode),p(ca,r=E.collections,r),ar(S.courseModules,r.MODULES),n.ccOn&&(H(),n.editMode&&a&&!v&&(v=!0,_=setInterval((()=>{console.log("save is running"),E.saveCollections(r,n.editMode,n.needToSaveCollections,A)}),1e4)),y||(y=!0,O=setInterval((()=>{console.log("refresh is running"),S.refreshCanvasDetails(T),p(ua,n.currentCollectionChanged=!0,n)}),15e3)))),o(4,k=!0))}function D(t){t&&Kr(`<p>The import of Collection's \n        <a href="/courses/${c}}/pages/canvas-collections-configuration" target="_blank" rel="noreferrer">\n          configuration</a> has been successful.</p>`,"success")}function A(t){t&&p(ua,n.needToSaveCollections=!1,n)}function I(){E.initialiseCollectionsConfig(),o(3,b=!1),$(""),E.saveCollections(r,!0,!0,U)}function U(t){t?Kr(`<p>Canvas Collections is now on.</p>\n        <p>A new <a target="_blank" rel="noreferrer" \n      href="/courses/${c}/pages/canvas-collections-configuration">\n      Canvas Collections Configuration page</a> created. It will be used to store\n      Collections data. </p>\n      <p>The page needs to be published before students can see Collections.\n      <p>Removing this page will turn collections off.</p>`,"success"):Kr("<p>Failed to create new Canvas Collections Configuration page</p>","danger")}function H(){const t=function(){if(document.querySelector("div#canvas-collections-representation"))return null;const t=document.querySelector("div#context_modules");if(!t)return null;let e=document.createElement("div");return e.id="canvas-collections-representation",t.prepend(e),e}();t&&new al({target:t})}function q(){var t;!function(){const t=document.querySelector("div#canvas-collections-representation");t&&t.remove()}(),t=r.MODULES,Object.keys(t).forEach((t=>{const e=document.querySelector(`div#cc-module-config-${t}`);e&&e.remove();const o=document.getElementById(`context_module_${t}`);o&&(o.style.display="block")}))}var z;N((()=>s(void 0,void 0,void 0,(function*(){f&&(S=new Hl(T,{courseId:c,csrfToken:h}),o(6,E=new rr($,{courseId:c,csrfToken:h})))})))),z=()=>{_&&clearInterval(_),O&&clearInterval(O)},P().$$.on_destroy.push(z);let R={ABOUT:{tooltip:"<p>Use Canvas Collections to customise the modules page to better\n          fit your design, by:</p>\n          <ol>\n             <li> Grouping modules into different collections. </li>\n             <li> Using different representations for each collection. </li>\n             <li> Adding more contextual information about each module. </li>\n          </ol>"},studentVisible:{tooltip:'<p>Students can see Collections.</p>\n      <p>To change, click the <i class="icon-mini-arrow-right"></i> icon to the right\n        and use the <em>visibility</em> dropdown to select <em>teachers</em> or <em>none</em>.</p>'},studentInvisible:{tooltip:'<p>Students <strong>cannot</strong> see Collections.</p>\n      <p>To change, click the <i class="icon-mini-arrow-right"></i> icon to the right\n        and use the <em>visibility</em> dropdown to select <em>students</em> or <em>all</em>.</p>'},switchTitle:{tooltip:"",url:"https://djplaner.github.io/canvas-collections/"},unpublished:{tooltip:'<p>The <em>Canvas Collections Configuration</em> page</a> is unpublished.\n        (Click the <em>unpublished</em> button to publish the page) </p> \n        <p>Meaning live Collections will <strong>not</strong> be visible in \n          "Student View" or for students.</p> \n          <p>Any Claytons Collections will be visible, if the relevant pages are published.</p>',url:"https://djplaner.github.io/canvas-collections/reference/visibility/"}};return t.$$set=t=>{"courseId"in t&&o(17,c=t.courseId),"editMode"in t&&o(1,d=t.editMode),"csrfToken"in t&&o(18,h=t.csrfToken),"modulesPage"in t&&o(2,f=t.modulesPage),"showConfig"in t&&o(0,m=t.showConfig)},t.$$.update=()=>{if(816&t.$$.dirty[0]&&k&&!C&&(p(ua,n.ccOn=Dp(n.editMode,r.VISIBILITY),n),n.ccOn&&k&&r.COLLECTIONS_ORDER.length>0?H():q()),256&t.$$.dirty[0]&&(n.editMode?(a=false,l=true):(a=!1,l=!1)),392&t.$$.dirty[0]&&(n.hasOwnProperty("migrationOutcome")&&function(){const t=n.migrationOutcome;p(ua,n.lastMigrationOutcome=t,n),delete n.migrationOutcome,"cancel"!==t&&("refresh"===t?(o(5,C=!1),E.resetImport(),I()):"proceed"===t&&(E.migrateCollectionsConfiguration(),E.resetImport(),o(5,C=!1),$(""),E.saveCollections(r,!0,!0,D)))}(),o(7,R.switchTitle.tooltip=b?`${R.ABOUT.tooltip} <p>Click on the</p>\n      <ul> <li> question mark to learn more.</li>\n          <li> switch to turn Collections on.</li></ul>`:R.ABOUT.tooltip,R)),368&t.$$.dirty[0]){let t=n.currentCollection;k&&!C&&E.saveLastCollectionViewed(t)}},[m,d,f,b,k,C,E,R,n,r,w,L,g,A,function(t){o(0,m=!m)},I,function(){return console.log("--------- beforeUnload"),console.log(`EXIT_SAVE: ${l} needToSave ${n.needToSaveCollections} editMode ${n.editMode}`),l&&n.needToSaveCollections&&n.editMode&&E.saveCollections(r,n.editMode,n.needToSaveCollections,A),"..."},c,h]}class Ip extends ct{constructor(t){super(),lt(this,t,Ap,Mp,i,{courseId:17,editMode:1,csrfToken:18,modulesPage:2,showConfig:0},null,[-1,-1])}}const Pp=function(){let t={editMode:!1,courseId:null,modulesPage:!1,csrfToken:null,currentCollection:0,showConfig:!1},e=new URL(window.location.href);e.hash="";const o=e.href;if(ENV.COURSE_ID&&ENV.COURSE_ID.match(/^\d+$/))t.courseId=ENV.COURSE_ID;else{let e=o.split("courses/")[1];if(e){const o=e.split("/")[0];o.match(/^\d+$/)&&(t.courseId=o)}}if(!t.courseId)throw new Error("No courseId found");let n=new RegExp(`courses/${t.courseId}/modules(/*|#*|#[^/]+)$`);return t.modulesPage=n.test(o),t.modulesPage||(n=new RegExp(`courses/${t.courseId}$`),t.modulesPage=n.test(o)&&null!==document.getElementById("context_modules")),t.editMode=null!==document.getElementById("easy_student_view"),t.csrfToken=function(){let t=new RegExp("^_csrf_token=(.*)$"),e=document.cookie.split(";");for(let o=0;o<e.length;o++){let n=e[o].trim(),r=t.exec(n);if(r)return decodeURIComponent(r[1])}return null}(),t}();let Np=null;if(Pp.modulesPage){const t=document.querySelector(".right-of-crumbs");if(!t)throw new Error("div.right-of-crumbs not found");const e=document.createElement("div");e.className="canvas-collections",e.style.display="flex",t.appendChild(e),Np=new Ip({target:e,props:Pp})}return Np}();
