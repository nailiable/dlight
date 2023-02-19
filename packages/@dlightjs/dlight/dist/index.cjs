"use strict";var v=Object.defineProperty;var B=Object.getOwnPropertyDescriptor;var q=Object.getOwnPropertyNames;var z=Object.prototype.hasOwnProperty;var G=(n,e)=>{for(var t in e)v(n,t,{get:e[t],enumerable:!0})},J=(n,e,t,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of q(e))!z.call(n,o)&&o!==t&&v(n,o,{get:()=>e[o],enumerable:!(s=B(e,o))||s.enumerable});return n};var Q=n=>J(v({},"__esModule",{value:!0}),n);var de={};G(de,{CustomNode:()=>H,DLNode:()=>h,DLNodeType:()=>c,EnvNode:()=>U,ExpressionNode:()=>S,ForNode:()=>j,HtmlNode:()=>w,IfNode:()=>O,TextNode:()=>C,View:()=>oe,bindParentNode:()=>g,initNodes:()=>T,loopEls:()=>_,loopNodes:()=>p,render:()=>ne,toEls:()=>F});module.exports=Q(de);function T(n){for(let e of n){if(Array.isArray(e)){T(e);continue}e._$init()}}function g(n,e){for(let t of n){if(Array.isArray(t)){g(t,e);continue}t._$parentNode=e}}function p(n,e){for(let t of n)e(t)&&p(t._$nodes,e)}function _(n,e,t=!0){for(let s of n)[0,1].includes(s._$nodeType)?(e(s._$el,s),t&&_(s._$nodes,e)):_(s._$nodes,e,t)}function F(n){let e=[];return _(n,(t,s)=>{s._$nodeType===0&&e.push(t)},!1),e}var c=(r=>(r[r.HTML=0]="HTML",r[r.Text=1]="Text",r[r.Custom=2]="Custom",r[r.For=3]="For",r[r.If=4]="If",r[r.Env=5]="Env",r[r.Expression=6]="Expression",r))(c||{}),h=class{_$nodeType;__$el;get _$el(){return this.__$el??F(this._$nodes)}set _$el(e){this.__$el=e}_$parentNode;_$nodes=[];_$depObjectIds=[];_$detach(){this._$parentNode=void 0,this._$nodes=[],this._$depObjectIds=[],[1,0].includes(this._$nodeType)||(this.__$el=void 0),this._$beforeInitSubNodes=function(){}}_$beforeInitSubNodes(){}_$addBeforeInitSubNodes(e){let t=this._$beforeInitSubNodes;this._$beforeInitSubNodes=function(){t.call(this),e.call(this)}}_$bindNodes(){g(this._$nodes,this),this._$beforeInitSubNodes(),T(this._$nodes)}constructor(e){this._$nodeType=e}_$init(){}};function I(n,e,t,s,o,d,i){if(t in n){if(!d){n[t]=s;return}if(!(n[`_$$${t}`]!==`_$${e}`&&!(`_$$${t}`in n))){if(n[`_$$${t}`]===`_$${e}`){R(o,n,t,s,d);return}if(i&&`_$$${d[0]}`in o){X(o,n,t,s,d);return}Y(o,n,t,s,d)}}}function R(n,e,t,s,o){let d={};e._$depObjectIds.push(d),e[t]=s(),n._$addDeps(o,d,()=>{e[t]=s(),e._$runDeps(t)})}function X(n,e,t,s,o){let d={};e._$depObjectIds.push(d);for(let i of o){let r=()=>n[i]=e[t];e._$addDeps([t],d,r),e[t]=s(),n._$addDeps(o,d,()=>{e._$deleteDep(t,d),e[t]=s(),e._$addDeps([t],d,r)})}}function Y(n,e,t,s,o){let d={};e._$depObjectIds.push(d),e[`_$${t}`]=s(),n._$addDeps(o,d,()=>{e[`_$${t}`]=s(),e._$runDeps(t)})}function A(n,e){p(e,t=>{switch(t._$nodeType){case 1:case 0:n._$el.appendChild(t._$el);break;default:A(n,t._$nodes);break}return!1})}function y(n){te(n),_(n,(e,t)=>{!document.body.contains(e)||(t._$nodeType===0&&t.willDisappear(e,t),e.remove(),t._$nodeType===0&&t.didDisappear(e,t))}),se(n)}function N(n){for(let e of n)e._$detach()}function $(n,e){p(n,t=>{for(let s of t._$depObjectIds)e._$deleteDeps(s);return t._$nodeType===2&&$(t._$children,e),!0})}function L(n,e,t,s){let o=s??t.childNodes.length;return Z(n),_(n,(d,i)=>{let r=document.body.contains(d);[0].includes(i._$nodeType)&&!r&&i.willAppear(d,i),e===o?t.appendChild(d):t.insertBefore(d,t.childNodes[e]),[0].includes(i._$nodeType)&&!r&&i.didAppear(d,i),e++,o++},!1),ee(n),[e,o]}function x(n,e){return W(n._$nodes,e)}function E(n){return W(n,void 0)}function W(n,e){let t=0,s=!1;return p(n,o=>s?!1:o===e?(s=!0,!1):[1,0].includes(o._$nodeType)?(t++,!1):!0),t}function P(n,e){p(n,t=>([2].includes(t._$nodeType)&&t[e](t),!0))}function Z(n){P(n,"willMount")}function ee(n){P(n,"didMount")}function te(n){P(n,"willUnmount")}function se(n){P(n,"didUnmount")}var H=class extends h{_$deps={};_$envNodes;_$derivedPairs;_$tag="";constructor(){super(2)}_$addAfterset(e){let t=this.Afterset.bind(this);this.Afterset=function(){t(),e()}.bind(this)}_$runDeps(e){if(this._$deps[e]===void 0){console.warn(`${e} is not a dependency in ${this.constructor.name}`);return}for(let t of this._$deps[e].values())t.call(this)}_$children=[];_$addChildren(e){this._$children=e}_$resetChildren(){for(let e of this._$children)e._$nodes=[]}_$initDecorators(){if(this._$derivedPairs)for(let[e,t]of Object.entries(this._$derivedPairs)){let s=this[e];if(typeof s!="function")return;this[e]=this[e]();let o=this[e];this._$addDeps(t,{},()=>{let d=s();d!==o&&(this[e]=d,o=d,this._$runDeps(e))})}}_$addDeps(e,t,s){for(let o of e)this._$deps[o].set(t,s)}_$deleteDep(e,t){this._$deps[e].delete(t)}_$deleteDeps(e){for(let t in this._$deps)this._$deleteDep(t,e)}AfterConstruct(){}Preset(){}Afterset(){}_$init(){this.AfterConstruct(),this._$initDecorators(),this.Preset(),this._$nodes=(this.Body.bind(this)??(()=>[]))(),this.Afterset(),this._$bindNodes()}_$addProp(e,t,s,o,d){I(this,"prop",e,t,s,o,d)}willMount(e,t){}didMount(e,t){}willUnmount(e,t){}didUnmount(e,t){}_$addLifeCycle(e,t){let s=this[t];this[t]=function(o,d){e.call(this,this._$el,this),s.call(this,this._$el,this)}}render(e){let t=new w("div");t._$addNodes([this]),t._$addProp("id",typeof e=="string"?e:e.id),t._$init(),this.willMount(this._$el,this),p(this._$nodes,s=>{switch(s._$nodeType){case 0:s.willAppear(s._$el,s);break;case 2:s.willMount(s._$el,s);break}return!0}),typeof e=="string"&&(e=document.getElementById(e)),e.replaceWith(t._$el),p(this._$nodes,s=>{switch(s._$nodeType){case 0:s.didAppear(s._$el,s);break;case 2:s.didMount(s._$el,s);break}return!0}),this.didMount(this._$el,this)}_$detach(){super._$detach(),N(this._$children)}};var w=class extends h{_$envNodes=[];constructor(e){super(0),this._$el=document.createElement(e)}_$init(){this._$bindNodes(),A(this,this._$nodes)}_$addNodes(e){this._$nodes=e}_$addProp(e,t,s,o){let d;if(e[0]==="_"?d=a=>this._$el.style[e.slice(1)]=a:e==="className"?d=a=>this._$el.className=`${this._$el.className} ${a}`.trim():d=a=>this._$el[e]=a,!o){d(t);return}let i=t();d(i);let r=()=>{let a=t();i!==a&&(d(a),i=a)},u={};this._$depObjectIds.push(u),s._$addDeps(o,u,r)}willAppear(e,t){}didAppear(e,t){}willDisappear(e,t){}didDisappear(e,t){}_$addLifeCycle(e,t){let s=this[t];this[t]=function(o,d,...i){return s.call(this,o,d),e.call(this,o,d)}}};var D=class extends h{afterUpdateNewNodes(e){}addAfterUpdateNewNodesFunc(e){let t=this.afterUpdateNewNodes;this.afterUpdateNewNodes=function(s){e.call(this,s),t.call(this,s)}}onUpdateNodes(e,t){}addOnUpdateNodesFunc(e){let t=this.onUpdateNodes;this.onUpdateNodes=function(s,o){e.call(this,s,o),t.call(this,s,o)}}_$bindNewNodes(e){g(e,this),this._$beforeInitSubNodes(),T(e),this.afterUpdateNewNodes(e)}_$detach(){super._$detach()}};var j=class extends D{keys=[];array=[];_$nodess=[];nodeFunc;keyFunc;arrayFunc;dlScope;listenDeps;nodesFunc;constructor(){super(3)}duplicatedOrNoKey=!1;_$getItem(e,t){let s=this.duplicatedOrNoKey?t:this.keys.indexOf(e);return this.array[s]}_$addNodeFunc(e){this.nodeFunc=e}_$addKeyFunc(e){this.keyFunc=e}_$addArrayFunc(e,t,s){this.dlScope=e,this.arrayFunc=t,this.listenDeps=s}_$addNodess(e){this.nodesFunc=e}setArray(){this.array=[...this.arrayFunc()]}setKeys(){if(!this.keyFunc){this.duplicatedOrNoKey=!0;return}let e=[...this.keyFunc()];if(e.length===[...new Set(e)].length){this.keys=e;return}this.keys=[...Array(this.array.length).keys()],console.warn("\u91CD\u590Dkey\u4E86"),this.duplicatedOrNoKey=!0}_$init(){if(!this.listenDeps){this._$nodess=this.nodesFunc(),this._$nodes=this._$nodess.flat(1),this._$bindNodes();return}let e=this._$parentNode;for(;e&&e._$nodeType!==0;)e=e._$parentNode;if(!e)return;let t=this.keyFunc?()=>this.updateWithKey(e):()=>this.updateWithOutKey(e),s={};if(this._$depObjectIds.push(s),this.dlScope._$addDeps(this.listenDeps,s,t),this.setArray(),this.setKeys(),this.duplicatedOrNoKey)for(let o of this.array.keys())this._$nodess.push(this.nodeFunc(null,o,this));else for(let[o,d]of this.keys.entries())this._$nodess.push(this.nodeFunc(d,o,this));this._$nodes=this._$nodess.flat(1),this._$bindNodes()}getNewNodes(e,t){let s=this.nodeFunc(e,t,this);return this._$bindNewNodes(s),s}updateWithOutKey(e){let t=e._$el,s=this.array.length;this.setArray();let o=this.array.length;if(s!==o){if(s<o){let d=x(e,this),i=t.childNodes.length;for(let r=0;r<o;r++){if(r<s){d+=E(this._$nodess[r]);continue}let u=this.getNewNodes(null,r);[d,i]=L(u,d,t,i),this._$nodess.push(u)}this._$nodes=this._$nodess.flat(1);return}for(let d=o;d<s;d++)$(this._$nodess[d],this.dlScope),y(this._$nodess[d]),N(this._$nodess[d]);this._$nodess=this._$nodess.slice(0,o),this._$nodes=this._$nodess.flat(1)}}updateWithKey(e){let t=e._$el,s=x(e,this),o=this.keys,d=[...this.array],i=[...this._$nodess],r=[...this._$nodes];this.setArray(),this.setKeys(),this.duplicatedOrNoKey&&(o=[...Array(d.length).keys()]);let u=[],a=[],V=[];for(let[l,f]of o.entries()){if(this.keys.includes(f)){u.push(f),a.push(i[l]);continue}$(i[l],this.dlScope),y(i[l]),N(i[l]),V.push(l)}o=u;let b=s,M=t.childNodes.length;for(let[l,f]of this.keys.entries()){if(o.includes(f)){b+=E(a[o.indexOf(f)]);continue}let m=this.getNewNodes(f,l);[b,M]=L(m,b,t,M),a.splice(l,0,m),o.splice(l,0,f)}b=s;for(let[l,f]of this.keys.entries()){let m=o.indexOf(f);if(m===l){b+=E(a[l]);continue}let K=a[m],k=o[m];[b,M]=L(K,b,t,M),a.splice(m,1),o.splice(m,1),a.splice(l+1,0,K),o.splice(l+1,0,k)}this._$nodess=a,this._$nodes=this._$nodess.flat(1),this.onUpdateNodes(r,this._$nodes)}_$listen(e,t,s,o){let d={};e._$depObjectIds.push(d),e._$addDeps(s,d,()=>{let i=t();if(i===void 0){e._$deleteDeps(d);return}o(i)})}_$detach(){super._$detach(),this._$nodess=[]}};var O=class extends D{conditionPairs=[];condition;listenDeps=[];dlScope;_$envNodes=[];constructor(){super(4)}_$addCond(e,t,s,o){this.conditionPairs.push({condition:e,node:t}),o&&(this.dlScope||(this.dlScope=s),this.listenDeps.push(...o))}_$init(){let e=[];for(let s of this.conditionPairs)if(s.condition()){this.condition=s.condition.toString(),e=s.node();break}this._$nodes=e;let t=this._$parentNode;for(;t&&t._$nodeType!==0;)t=t._$parentNode;if(t){let s={};this._$depObjectIds.push(s),this.dlScope?._$addDeps(this.listenDeps,s,()=>this.update(t))}this._$bindNodes()}update(e){let t=this._$nodes,s=this.condition;this._$nodes=[];for(let i of this.conditionPairs)if(i.condition()){this.condition!==i.condition.toString()?($(t,this.dlScope),y(t),this.condition=i.condition.toString(),this._$nodes=i.node(),this._$bindNewNodes(this._$nodes)):this._$nodes=t;break}if(t.length!==0&&this._$nodes.length===0&&(this.condition="[none]",$(t,this.dlScope),y(t)),s===this.condition)return;let o=x(e,this),d=e._$el;L(this._$nodes,o,d,d.childNodes.length),N(t),this.onUpdateNodes(t,this._$nodes)}};var C=class extends h{constructor(e,t,s){if(super(1),!s){this._$el=document.createTextNode(e);return}e=e;let o=e();this._$el=document.createTextNode(o);let d=()=>{let r=e();o!==r&&(this._$el.nodeValue=r,o=r)},i={};this._$depObjectIds.push(i),t._$addDeps(s,i,d)}};var U=class extends h{addPropFuncs=[];constructor(){super(5)}_$addNodes(e){this._$nodes=e}_$addProp(e,t,s,o){this.addPropFuncs.push(d=>I(d,"env",e,t,s,o))}addProps(e){for(let t of this.addPropFuncs)t(e)}addPropsToNodes(e){p(e._$nodes,t=>(t._$addBeforeInitSubNodes(()=>{this.addPropsToNodes(t)}),t._$nodeType===2&&this.addProps(t),!1))}_$init(){this.addPropsToNodes(this),this._$bindNodes()}};var S=class extends D{nodeOrFunc;listenDeps;dlScope;propFuncs=[];constructor(e,t,s){if(super(6),!s){this._$nodes=this.formatNodes(e);return}this.nodeOrFunc=e,this.listenDeps=s,this.dlScope=t,this._$nodes=this.formatNodes(this.nodeOrFunc())}_$onUpdateNodes(e){p(this._$nodes,t=>([4,3,6].includes(t._$nodeType)&&t.addOnUpdateNodesFunc(e),!0))}_$addProp(e,t,s,o){let d=i=>{if(["willAppear","didAppear","willDisappear","didDisappear"].includes(e)){i._$addLifeCycle(t,e);return}e[0]==="_"&&(i._$el.style[e.slice(1)]??"").trim()!==""||!["className"].includes(e)&&e[0]!=="_"&&i._$el[e]!==void 0||i._$addProp(e,t,s,o)};this.propFuncs.push(()=>{for(let i of this._$nodes)switch(i._$nodeType){case 0:d(i);break;case 3:case 4:case 6:i.addAfterUpdateNewNodesFunc(r=>{_(r,(u,a)=>{a._$nodeType===0&&d(a)},!1)});default:_(i._$nodes,(r,u)=>{u._$nodeType===0&&d(u)},!1)}})}formatNodes(e){return Array.isArray(e)||(e=[e]),e=e.flat(1),e=e.filter(t=>t!=null&&typeof t!="boolean").map(t=>t._$nodeType!==void 0?t:new C(t)),e}_$init(){if(this.listenDeps===void 0){this._$bindNodes();for(let s of this.propFuncs)s();return}let e=this._$parentNode;for(;e&&e._$nodeType!==0;)e=e._$parentNode;if(!e)return;let t={};this._$depObjectIds.push(t),this.dlScope._$addDeps(this.listenDeps,t,()=>this.update(e)),this._$bindNodes();for(let s of this.propFuncs){s();let o={};this._$depObjectIds.push(o),this.dlScope._$addDeps(this.listenDeps,o,s)}}update(e){let t=this._$nodes;$(this._$nodes,this.dlScope),y(this._$nodes),this._$nodes=this.formatNodes(this.nodeOrFunc()),this._$bindNewNodes(this._$nodes);let s=e._$el,o=x(e,this);L(this._$nodes,o,s,s.childNodes.length),N(t),this.onUpdateNodes(t,this._$nodes)}};var oe=H;function ne(n,e){new e().render(n)}0&&(module.exports={CustomNode,DLNode,DLNodeType,EnvNode,ExpressionNode,ForNode,HtmlNode,IfNode,TextNode,View,bindParentNode,initNodes,loopEls,loopNodes,render,toEls});
