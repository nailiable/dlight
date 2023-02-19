(function($,m){typeof exports=="object"&&typeof module<"u"?m(exports,require("@dlightjs/dlight")):typeof define=="function"&&define.amd?define(["exports","@dlightjs/dlight"],m):($=typeof globalThis<"u"?globalThis:$||self,m($.component={},$._$))})(this,function($,m){"use strict";var Jt=Object.defineProperty;var Xt=($,m,L)=>m in $?Jt($,m,{enumerable:!0,configurable:!0,writable:!0,value:L}):$[m]=L;var o=($,m,L)=>(Xt($,typeof m!="symbol"?m+"":m,L),L);function L(e){const t=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const r in e)if(r!=="default"){const n=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(t,r,n.get?n:{enumerable:!0,get:()=>e[r]})}}return t.default=e,Object.freeze(t)}const _=L(m);function We(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]}function qe(e){var t=document.createElement("style");return t.setAttribute("data-emotion",e.key),e.nonce!==void 0&&t.setAttribute("nonce",e.nonce),t.appendChild(document.createTextNode("")),t.setAttribute("data-s",""),t}var Ge=function(){function e(r){var n=this;this._insertTag=function(s){var i;n.tags.length===0?n.insertionPoint?i=n.insertionPoint.nextSibling:n.prepend?i=n.container.firstChild:i=n.before:i=n.tags[n.tags.length-1].nextSibling,n.container.insertBefore(s,i),n.tags.push(s)},this.isSpeedy=r.speedy===void 0?process.env.NODE_ENV==="production":r.speedy,this.tags=[],this.ctr=0,this.nonce=r.nonce,this.key=r.key,this.container=r.container,this.prepend=r.prepend,this.insertionPoint=r.insertionPoint,this.before=null}var t=e.prototype;return t.hydrate=function(n){n.forEach(this._insertTag)},t.insert=function(n){this.ctr%(this.isSpeedy?65e3:1)===0&&this._insertTag(qe(this));var s=this.tags[this.tags.length-1];if(process.env.NODE_ENV!=="production"){var i=n.charCodeAt(0)===64&&n.charCodeAt(1)===105;i&&this._alreadyInsertedOrderInsensitiveRule&&console.error(`You're attempting to insert the following rule:
`+n+"\n\n`@import` rules must be before all other types of rules in a stylesheet but other rules have already been inserted. Please ensure that `@import` rules are before all other rules."),this._alreadyInsertedOrderInsensitiveRule=this._alreadyInsertedOrderInsensitiveRule||!i}if(this.isSpeedy){var a=We(s);try{a.insertRule(n,a.cssRules.length)}catch(c){process.env.NODE_ENV!=="production"&&!/:(-moz-placeholder|-moz-focus-inner|-moz-focusring|-ms-input-placeholder|-moz-read-write|-moz-read-only|-ms-clear|-ms-expand|-ms-reveal){/.test(n)&&console.error('There was a problem inserting the following rule: "'+n+'"',c)}}else s.appendChild(document.createTextNode(n));this.ctr++},t.flush=function(){this.tags.forEach(function(n){return n.parentNode&&n.parentNode.removeChild(n)}),this.tags=[],this.ctr=0,process.env.NODE_ENV!=="production"&&(this._alreadyInsertedOrderInsensitiveRule=!1)},e}(),S="-ms-",K="-moz-",h="-webkit-",se="comm",ie="rule",ae="decl",He="@import",me="@keyframes",ze=Math.abs,Z=String.fromCharCode,Ye=Object.assign;function Ke(e,t){return x(e,0)^45?(((t<<2^x(e,0))<<2^x(e,1))<<2^x(e,2))<<2^x(e,3):0}function $e(e){return e.trim()}function Ze(e,t){return(e=t.exec(e))?e[0]:e}function g(e,t,r){return e.replace(t,r)}function oe(e,t){return e.indexOf(t)}function x(e,t){return e.charCodeAt(t)|0}function W(e,t,r){return e.slice(t,r)}function P(e){return e.length}function ce(e){return e.length}function J(e,t){return t.push(e),e}function Je(e,t){return e.map(t).join("")}var X=1,U=1,ye=0,A=0,b=0,j="";function Q(e,t,r,n,s,i,a){return{value:e,root:t,parent:r,type:n,props:s,children:i,line:X,column:U,length:a,return:""}}function q(e,t){return Ye(Q("",null,null,"",null,null,0),e,{length:-e.length},t)}function Xe(){return b}function Qe(){return b=A>0?x(j,--A):0,U--,b===10&&(U=1,X--),b}function R(){return b=A<ye?x(j,A++):0,U++,b===10&&(U=1,X++),b}function T(){return x(j,A)}function ee(){return A}function G(e,t){return W(j,e,t)}function H(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function ve(e){return X=U=1,ye=P(j=e),A=0,[]}function we(e){return j="",e}function te(e){return $e(G(A-1,de(e===91?e+2:e===40?e+1:e)))}function et(e){for(;(b=T())&&b<33;)R();return H(e)>2||H(b)>3?"":" "}function tt(e,t){for(;--t&&R()&&!(b<48||b>102||b>57&&b<65||b>70&&b<97););return G(e,ee()+(t<6&&T()==32&&R()==32))}function de(e){for(;R();)switch(b){case e:return A;case 34:case 39:e!==34&&e!==39&&de(b);break;case 40:e===41&&de(e);break;case 92:R();break}return A}function rt(e,t){for(;R()&&e+b!==47+10;)if(e+b===42+42&&T()===47)break;return"/*"+G(t,A-1)+"*"+Z(e===47?e:R())}function nt(e){for(;!H(T());)R();return G(e,A)}function st(e){return we(re("",null,null,null,[""],e=ve(e),0,[0],e))}function re(e,t,r,n,s,i,a,c,d){for(var f=0,u=0,p=a,v=0,O=0,E=0,l=1,C=1,w=1,N=0,M="",Y=s,I=i,D=n,y=M;C;)switch(E=N,N=R()){case 40:if(E!=108&&x(y,p-1)==58){oe(y+=g(te(N),"&","&\f"),"&\f")!=-1&&(w=-1);break}case 34:case 39:case 91:y+=te(N);break;case 9:case 10:case 13:case 32:y+=et(E);break;case 92:y+=tt(ee()-1,7);continue;case 47:switch(T()){case 42:case 47:J(it(rt(R(),ee()),t,r),d);break;default:y+="/"}break;case 123*l:c[f++]=P(y)*w;case 125*l:case 59:case 0:switch(N){case 0:case 125:C=0;case 59+u:O>0&&P(y)-p&&J(O>32?be(y+";",n,r,p-1):be(g(y," ","")+";",n,r,p-2),d);break;case 59:y+=";";default:if(J(D=_e(y,t,r,f,u,s,c,M,Y=[],I=[],p),i),N===123)if(u===0)re(y,t,D,D,Y,i,p,c,I);else switch(v===99&&x(y,3)===110?100:v){case 100:case 109:case 115:re(e,D,D,n&&J(_e(e,D,D,0,0,s,c,M,s,Y=[],p),I),s,I,p,c,n?Y:I);break;default:re(y,D,D,D,[""],I,0,c,I)}}f=u=O=0,l=w=1,M=y="",p=a;break;case 58:p=1+P(y),O=E;default:if(l<1){if(N==123)--l;else if(N==125&&l++==0&&Qe()==125)continue}switch(y+=Z(N),N*l){case 38:w=u>0?1:(y+="\f",-1);break;case 44:c[f++]=(P(y)-1)*w,w=1;break;case 64:T()===45&&(y+=te(R())),v=T(),u=p=P(M=y+=nt(ee())),N++;break;case 45:E===45&&P(y)==2&&(l=0)}}return i}function _e(e,t,r,n,s,i,a,c,d,f,u){for(var p=s-1,v=s===0?i:[""],O=ce(v),E=0,l=0,C=0;E<n;++E)for(var w=0,N=W(e,p+1,p=ze(l=a[E])),M=e;w<O;++w)(M=$e(l>0?v[w]+" "+N:g(N,/&\f/g,v[w])))&&(d[C++]=M);return Q(e,t,r,s===0?ie:c,d,f,u)}function it(e,t,r){return Q(e,t,r,se,Z(Xe()),W(e,2,-2),0)}function be(e,t,r,n){return Q(e,t,r,ae,W(e,0,n),W(e,n+1,-1),n)}function B(e,t){for(var r="",n=ce(e),s=0;s<n;s++)r+=t(e[s],s,e,t)||"";return r}function at(e,t,r,n){switch(e.type){case He:case ae:return e.return=e.return||e.value;case se:return"";case me:return e.return=e.value+"{"+B(e.children,n)+"}";case ie:e.value=e.props.join(",")}return P(r=B(e.children,n))?e.return=e.value+"{"+r+"}":""}function ot(e){var t=ce(e);return function(r,n,s,i){for(var a="",c=0;c<t;c++)a+=e[c](r,n,s,i)||"";return a}}function ct(e){return function(t){t.root||(t=t.return)&&e(t)}}function dt(e){var t=Object.create(null);return function(r){return t[r]===void 0&&(t[r]=e(r)),t[r]}}var ut=function(t,r,n){for(var s=0,i=0;s=i,i=T(),s===38&&i===12&&(r[n]=1),!H(i);)R();return G(t,A)},ft=function(t,r){var n=-1,s=44;do switch(H(s)){case 0:s===38&&T()===12&&(r[n]=1),t[n]+=ut(A-1,r,n);break;case 2:t[n]+=te(s);break;case 4:if(s===44){t[++n]=T()===58?"&\f":"",r[n]=t[n].length;break}default:t[n]+=Z(s)}while(s=R());return t},pt=function(t,r){return we(ft(ve(t),r))},Ee=new WeakMap,ht=function(t){if(!(t.type!=="rule"||!t.parent||t.length<1)){for(var r=t.value,n=t.parent,s=t.column===n.column&&t.line===n.line;n.type!=="rule";)if(n=n.parent,!n)return;if(!(t.props.length===1&&r.charCodeAt(0)!==58&&!Ee.get(n))&&!s){Ee.set(t,!0);for(var i=[],a=pt(r,i),c=n.props,d=0,f=0;d<a.length;d++)for(var u=0;u<c.length;u++,f++)t.props[f]=i[d]?a[d].replace(/&\f/g,c[u]):c[u]+" "+a[d]}}},lt=function(t){if(t.type==="decl"){var r=t.value;r.charCodeAt(0)===108&&r.charCodeAt(2)===98&&(t.return="",t.value="")}},gt="emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason",mt=function(t){return t.type==="comm"&&t.children.indexOf(gt)>-1},$t=function(t){return function(r,n,s){if(!(r.type!=="rule"||t.compat)){var i=r.value.match(/(:first|:nth|:nth-last)-child/g);if(i){for(var a=r.parent===s[0],c=a?s[0].children:s,d=c.length-1;d>=0;d--){var f=c[d];if(f.line<r.line)break;if(f.column<r.column){if(mt(f))return;break}}i.forEach(function(u){console.error('The pseudo class "'+u+'" is potentially unsafe when doing server-side rendering. Try changing it to "'+u.split("-child")[0]+'-of-type".')})}}}},xe=function(t){return t.type.charCodeAt(1)===105&&t.type.charCodeAt(0)===64},yt=function(t,r){for(var n=t-1;n>=0;n--)if(!xe(r[n]))return!0;return!1},Ne=function(t){t.type="",t.value="",t.return="",t.children="",t.props=""},vt=function(t,r,n){xe(t)&&(t.parent?(console.error("`@import` rules can't be nested inside other rules. Please move it to the top level and put it before regular rules. Keep in mind that they can only be used within global styles."),Ne(t)):yt(r,n)&&(console.error("`@import` rules can't be after other rules. Please put your `@import` rules before your other rules."),Ne(t)))};function Se(e,t){switch(Ke(e,t)){case 5103:return h+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return h+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return h+e+K+e+S+e+e;case 6828:case 4268:return h+e+S+e+e;case 6165:return h+e+S+"flex-"+e+e;case 5187:return h+e+g(e,/(\w+).+(:[^]+)/,h+"box-$1$2"+S+"flex-$1$2")+e;case 5443:return h+e+S+"flex-item-"+g(e,/flex-|-self/,"")+e;case 4675:return h+e+S+"flex-line-pack"+g(e,/align-content|flex-|-self/,"")+e;case 5548:return h+e+S+g(e,"shrink","negative")+e;case 5292:return h+e+S+g(e,"basis","preferred-size")+e;case 6060:return h+"box-"+g(e,"-grow","")+h+e+S+g(e,"grow","positive")+e;case 4554:return h+g(e,/([^-])(transform)/g,"$1"+h+"$2")+e;case 6187:return g(g(g(e,/(zoom-|grab)/,h+"$1"),/(image-set)/,h+"$1"),e,"")+e;case 5495:case 3959:return g(e,/(image-set\([^]*)/,h+"$1$`$1");case 4968:return g(g(e,/(.+:)(flex-)?(.*)/,h+"box-pack:$3"+S+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+h+e+e;case 4095:case 3583:case 4068:case 2532:return g(e,/(.+)-inline(.+)/,h+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(P(e)-1-t>6)switch(x(e,t+1)){case 109:if(x(e,t+4)!==45)break;case 102:return g(e,/(.+:)(.+)-([^]+)/,"$1"+h+"$2-$3$1"+K+(x(e,t+3)==108?"$3":"$2-$3"))+e;case 115:return~oe(e,"stretch")?Se(g(e,"stretch","fill-available"),t)+e:e}break;case 4949:if(x(e,t+1)!==115)break;case 6444:switch(x(e,P(e)-3-(~oe(e,"!important")&&10))){case 107:return g(e,":",":"+h)+e;case 101:return g(e,/(.+:)([^;!]+)(;|!.+)?/,"$1"+h+(x(e,14)===45?"inline-":"")+"box$3$1"+h+"$2$3$1"+S+"$2box$3")+e}break;case 5936:switch(x(e,t+11)){case 114:return h+e+S+g(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return h+e+S+g(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return h+e+S+g(e,/[svh]\w+-[tblr]{2}/,"lr")+e}return h+e+S+e+e}return e}var wt=function(t,r,n,s){if(t.length>-1&&!t.return)switch(t.type){case ae:t.return=Se(t.value,t.length);break;case me:return B([q(t,{value:g(t.value,"@","@"+h)})],s);case ie:if(t.length)return Je(t.props,function(i){switch(Ze(i,/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":return B([q(t,{props:[g(i,/:(read-\w+)/,":"+K+"$1")]})],s);case"::placeholder":return B([q(t,{props:[g(i,/:(plac\w+)/,":"+h+"input-$1")]}),q(t,{props:[g(i,/:(plac\w+)/,":"+K+"$1")]}),q(t,{props:[g(i,/:(plac\w+)/,S+"input-$1")]})],s)}return""})}},_t=[wt],bt=function(t){var r=t.key;if(process.env.NODE_ENV!=="production"&&!r)throw new Error(`You have to configure \`key\` for your cache. Please make sure it's unique (and not equal to 'css') as it's used for linking styles to your cache.
If multiple caches share the same key they might "fight" for each other's style elements.`);if(r==="css"){var n=document.querySelectorAll("style[data-emotion]:not([data-s])");Array.prototype.forEach.call(n,function(l){var C=l.getAttribute("data-emotion");C.indexOf(" ")!==-1&&(document.head.appendChild(l),l.setAttribute("data-s",""))})}var s=t.stylisPlugins||_t;if(process.env.NODE_ENV!=="production"&&/[^a-z-]/.test(r))throw new Error('Emotion key must only contain lower case alphabetical characters and - but "'+r+'" was passed');var i={},a,c=[];a=t.container||document.head,Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="'+r+' "]'),function(l){for(var C=l.getAttribute("data-emotion").split(" "),w=1;w<C.length;w++)i[C[w]]=!0;c.push(l)});var d,f=[ht,lt];process.env.NODE_ENV!=="production"&&f.push($t({get compat(){return E.compat}}),vt);{var u,p=[at,process.env.NODE_ENV!=="production"?function(l){l.root||(l.return?u.insert(l.return):l.value&&l.type!==se&&u.insert(l.value+"{}"))}:ct(function(l){u.insert(l)})],v=ot(f.concat(s,p)),O=function(C){return B(st(C),v)};d=function(C,w,N,M){u=N,process.env.NODE_ENV!=="production"&&w.map!==void 0&&(u={insert:function(I){N.insert(I+w.map)}}),O(C?C+"{"+w.styles+"}":w.styles),M&&(E.inserted[w.name]=!0)}}var E={key:r,sheet:new Ge({key:r,container:a,nonce:t.nonce,speedy:t.speedy,prepend:t.prepend,insertionPoint:t.insertionPoint}),nonce:t.nonce,inserted:i,registered:{},insert:d};return E.sheet.hydrate(c),E};function Et(e){for(var t=0,r,n=0,s=e.length;s>=4;++n,s-=4)r=e.charCodeAt(n)&255|(e.charCodeAt(++n)&255)<<8|(e.charCodeAt(++n)&255)<<16|(e.charCodeAt(++n)&255)<<24,r=(r&65535)*1540483477+((r>>>16)*59797<<16),r^=r>>>24,t=(r&65535)*1540483477+((r>>>16)*59797<<16)^(t&65535)*1540483477+((t>>>16)*59797<<16);switch(s){case 3:t^=(e.charCodeAt(n+2)&255)<<16;case 2:t^=(e.charCodeAt(n+1)&255)<<8;case 1:t^=e.charCodeAt(n)&255,t=(t&65535)*1540483477+((t>>>16)*59797<<16)}return t^=t>>>13,t=(t&65535)*1540483477+((t>>>16)*59797<<16),((t^t>>>15)>>>0).toString(36)}var xt={animationIterationCount:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},Ce=`You have illegal escape sequence in your template literal, most likely inside content's property value.
Because you write your CSS inside a JavaScript string you actually have to do double escaping, so for example "content: '\\00d7';" should become "content: '\\\\00d7';".
You can read more about this here:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences`,Nt="You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key).",St=/[A-Z]|^ms/g,Ae=/_EMO_([^_]+?)_([^]*?)_EMO_/g,ue=function(t){return t.charCodeAt(1)===45},Re=function(t){return t!=null&&typeof t!="boolean"},fe=dt(function(e){return ue(e)?e:e.replace(St,"-$&").toLowerCase()}),ne=function(t,r){switch(t){case"animation":case"animationName":if(typeof r=="string")return r.replace(Ae,function(n,s,i){return k={name:s,styles:i,next:k},s})}return xt[t]!==1&&!ue(t)&&typeof r=="number"&&r!==0?r+"px":r};if(process.env.NODE_ENV!=="production"){var Ct=/(var|attr|counters?|url|element|(((repeating-)?(linear|radial))|conic)-gradient)\(|(no-)?(open|close)-quote/,At=["normal","none","initial","inherit","unset"],Rt=ne,Ot=/^-ms-/,kt=/-(.)/g,Oe={};ne=function(t,r){if(t==="content"&&(typeof r!="string"||At.indexOf(r)===-1&&!Ct.test(r)&&(r.charAt(0)!==r.charAt(r.length-1)||r.charAt(0)!=='"'&&r.charAt(0)!=="'")))throw new Error("You seem to be using a value for 'content' without quotes, try replacing it with `content: '\""+r+"\"'`");var n=Rt(t,r);return n!==""&&!ue(t)&&t.indexOf("-")!==-1&&Oe[t]===void 0&&(Oe[t]=!0,console.error("Using kebab-case for css properties in objects is not supported. Did you mean "+t.replace(Ot,"ms-").replace(kt,function(s,i){return i.toUpperCase()})+"?")),n}}var ke="Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.";function z(e,t,r){if(r==null)return"";if(r.__emotion_styles!==void 0){if(process.env.NODE_ENV!=="production"&&r.toString()==="NO_COMPONENT_SELECTOR")throw new Error(ke);return r}switch(typeof r){case"boolean":return"";case"object":{if(r.anim===1)return k={name:r.name,styles:r.styles,next:k},r.name;if(r.styles!==void 0){var n=r.next;if(n!==void 0)for(;n!==void 0;)k={name:n.name,styles:n.styles,next:k},n=n.next;var s=r.styles+";";return process.env.NODE_ENV!=="production"&&r.map!==void 0&&(s+=r.map),s}return Pt(e,t,r)}case"function":{if(e!==void 0){var i=k,a=r(e);return k=i,z(e,t,a)}else process.env.NODE_ENV!=="production"&&console.error("Functions that are interpolated in css calls will be stringified.\nIf you want to have a css call based on props, create a function that returns a css call like this\nlet dynamicStyle = (props) => css`color: ${props.color}`\nIt can be called directly with props or interpolated in a styled call like this\nlet SomeComponent = styled('div')`${dynamicStyle}`");break}case"string":if(process.env.NODE_ENV!=="production"){var c=[],d=r.replace(Ae,function(u,p,v){var O="animation"+c.length;return c.push("const "+O+" = keyframes`"+v.replace(/^@keyframes animation-\w+/,"")+"`"),"${"+O+"}"});c.length&&console.error("`keyframes` output got interpolated into plain string, please wrap it with `css`.\n\nInstead of doing this:\n\n"+[].concat(c,["`"+d+"`"]).join(`
`)+`

You should wrap it with \`css\` like this:

`+("css`"+d+"`"))}break}if(t==null)return r;var f=t[r];return f!==void 0?f:r}function Pt(e,t,r){var n="";if(Array.isArray(r))for(var s=0;s<r.length;s++)n+=z(e,t,r[s])+";";else for(var i in r){var a=r[i];if(typeof a!="object")t!=null&&t[a]!==void 0?n+=i+"{"+t[a]+"}":Re(a)&&(n+=fe(i)+":"+ne(i,a)+";");else{if(i==="NO_COMPONENT_SELECTOR"&&process.env.NODE_ENV!=="production")throw new Error(ke);if(Array.isArray(a)&&typeof a[0]=="string"&&(t==null||t[a[0]]===void 0))for(var c=0;c<a.length;c++)Re(a[c])&&(n+=fe(i)+":"+ne(i,a[c])+";");else{var d=z(e,t,a);switch(i){case"animation":case"animationName":{n+=fe(i)+":"+d+";";break}default:process.env.NODE_ENV!=="production"&&i==="undefined"&&console.error(Nt),n+=i+"{"+d+"}"}}}}return n}var Pe=/label:\s*([^\s;\n{]+)\s*(;|$)/g,Te;process.env.NODE_ENV!=="production"&&(Te=/\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//g);var k,pe=function(t,r,n){if(t.length===1&&typeof t[0]=="object"&&t[0]!==null&&t[0].styles!==void 0)return t[0];var s=!0,i="";k=void 0;var a=t[0];a==null||a.raw===void 0?(s=!1,i+=z(n,r,a)):(process.env.NODE_ENV!=="production"&&a[0]===void 0&&console.error(Ce),i+=a[0]);for(var c=1;c<t.length;c++)i+=z(n,r,t[c]),s&&(process.env.NODE_ENV!=="production"&&a[c]===void 0&&console.error(Ce),i+=a[c]);var d;process.env.NODE_ENV!=="production"&&(i=i.replace(Te,function(v){return d=v,""})),Pe.lastIndex=0;for(var f="",u;(u=Pe.exec(i))!==null;)f+="-"+u[1];var p=Et(i)+f;return process.env.NODE_ENV!=="production"?{name:p,styles:i,map:d,next:k,toString:function(){return"You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."}}:{name:p,styles:i,next:k}},Tt=!0;function Me(e,t,r){var n="";return r.split(" ").forEach(function(s){e[s]!==void 0?t.push(e[s]+";"):n+=s+" "}),n}var Mt=function(t,r,n){var s=t.key+"-"+r.name;(n===!1||Tt===!1)&&t.registered[s]===void 0&&(t.registered[s]=r.styles)},Dt=function(t,r,n){Mt(t,r,n);var s=t.key+"-"+r.name;if(t.inserted[r.name]===void 0){var i=r;do t.insert(r===i?"."+s:"",i,t.sheet,!0),i=i.next;while(i!==void 0)}};function De(e,t){if(e.inserted[t.name]===void 0)return e.insert("",t,e.sheet,!0)}function Ie(e,t,r){var n=[],s=Me(e,n,r);return n.length<2?r:s+t(n)}var It=function(t){var r=bt(t);r.sheet.speedy=function(c){if(process.env.NODE_ENV!=="production"&&this.ctr!==0)throw new Error("speedy must be changed before any rules are inserted");this.isSpeedy=c},r.compat=!0;var n=function(){for(var d=arguments.length,f=new Array(d),u=0;u<d;u++)f[u]=arguments[u];var p=pe(f,r.registered,void 0);return Dt(r,p,!1),r.key+"-"+p.name},s=function(){for(var d=arguments.length,f=new Array(d),u=0;u<d;u++)f[u]=arguments[u];var p=pe(f,r.registered),v="animation-"+p.name;return De(r,{name:p.name,styles:"@keyframes "+v+"{"+p.styles+"}"}),v},i=function(){for(var d=arguments.length,f=new Array(d),u=0;u<d;u++)f[u]=arguments[u];var p=pe(f,r.registered);De(r,p)},a=function(){for(var d=arguments.length,f=new Array(d),u=0;u<d;u++)f[u]=arguments[u];return Ie(r.registered,n,Vt(f))};return{css:n,cx:a,injectGlobal:i,keyframes:s,hydrate:function(d){d.forEach(function(f){r.inserted[f]=!0})},flush:function(){r.registered={},r.inserted={},r.sheet.flush()},sheet:r.sheet,cache:r,getRegisteredStyles:Me.bind(null,r.registered),merge:Ie.bind(null,r.registered,n)}},Vt=function e(t){for(var r="",n=0;n<t.length;n++){var s=t[n];if(s!=null){var i=void 0;switch(typeof s){case"boolean":break;case"object":{if(Array.isArray(s))i=e(s);else{i="";for(var a in s)s[a]&&a&&(i&&(i+=" "),i+=a)}break}default:i=s}i&&(r&&(r+=" "),r+=i)}}return r},Lt=It({key:"css"}),V=Lt.css;class Ut extends m.View{constructor(){super(...arguments);o(this,"_$tag","Spacer")}Body(){const r=new _.HtmlNode("div");return r._$addProp("className",V`
              flex-grow: 1;
            `),[r]}}function he(e){if(![m.DLNodeType.HTML,m.DLNodeType.Text].includes(e._$nodeType)){if(e._$tag==="Spacer")return!0;for(let t of e._$nodes??[])if(he(t))return!0}return!1}class jt extends m.View{constructor(){super(...arguments);o(this,"_$derivedPairs",{margin:["alignment"]});o(this,"_$deps",{spacing:new Map,alignment:new Map,width:new Map,height:new Map,margin:new Map});o(this,"_$tag","HStack");o(this,"_$$spacing","_$prop");o(this,"spacing",10);o(this,"_$$alignment","_$prop");o(this,"alignment","top");o(this,"_$$width","_$prop");o(this,"width","100%");o(this,"_$$height","_$prop");o(this,"height","max-content");o(this,"margin",()=>function(){switch(this.alignment){case"top":return"0 0 auto 0";case"bottom":return"auto 0 0 0";case"center":return"auto 0";default:return""}}.call(this))}Body(){const r=new _.HtmlNode("div");return r._$addProp("className",()=>V`
              height: ${this.height};
              width: ${this.width};
              column-gap: ${this.spacing}px;
              display: flex;
              flex-direction: row;
            `,this,["height","width","spacing"]),r._$addNodes((()=>{const n=new _.ForNode;return n._$addNodess(()=>Array.from(this._$children).map(s=>(()=>{const i=new _.IfNode;return i._$addCond(()=>he(s),()=>[new _.ExpressionNode(s)]),i._$addCond(()=>!0,()=>{const a=new _.ExpressionNode(s);return a._$addProp("className",()=>V`
                           flex-shrink: 0;
                           margin: ${this.margin};
                        `,this,["margin"],!1),[a]}),[i]})())),[n]})()),[r]}}class Bt extends m.View{constructor(){super(...arguments);o(this,"_$derivedPairs",{margin:["alignment"]});o(this,"_$deps",{spacing:new Map,alignment:new Map,width:new Map,height:new Map,margin:new Map});o(this,"_$tag","VStack");o(this,"_$$spacing","_$prop");o(this,"spacing",10);o(this,"_$$alignment","_$prop");o(this,"alignment","leading");o(this,"_$$width","_$prop");o(this,"width","max-content");o(this,"_$$height","_$prop");o(this,"height","100%");o(this,"margin",()=>function(){switch(this.alignment){case"leading":return"0 auto 0 0";case"tailing":return"0 0 0 auto";case"center":return"0 auto";default:return""}}.call(this))}Body(){const r=new _.HtmlNode("div");return r._$addProp("className",()=>V`
              height: ${this.height};
              width: ${this.width};
              row-gap: ${this.spacing}px;
              display: flex;
              flex-direction: column;
            `,this,["height","width","spacing"]),r._$addNodes((()=>{const n=new _.ForNode;return n._$addNodess(()=>Array.from(this._$children).map(s=>(()=>{const i=new _.IfNode;return i._$addCond(()=>he(s),()=>[new _.ExpressionNode(s)]),i._$addCond(()=>!0,()=>{const a=new _.ExpressionNode(s);return a._$addProp("className",()=>V`
                           flex-shrink: 0;
                           margin: ${this.margin};
                        `,this,["margin"],!1),[a]}),[i]})())),[n]})()),[r]}}class Ft extends m.View{constructor(){super(...arguments);o(this,"_$deps",{hAlignment:new Map,vAlignment:new Map,width:new Map,height:new Map});o(this,"_$tag","ZStack");o(this,"_$$hAlignment","_$prop");o(this,"hAlignment","center");o(this,"_$$vAlignment","_$prop");o(this,"vAlignment","center");o(this,"_$$width","_$prop");o(this,"width","max-content");o(this,"_$$height","_$prop");o(this,"height","max-content")}Body(){const r=new _.HtmlNode("div");return r._$addProp("className",()=>V`
              height: ${this.height};
              width: ${this.width};
              display: grid;
              align-items: ${{top:"flex-start",center:"center",bottom:"flex-end"}[this.vAlignment]};
              justify-items: ${{leading:"left",center:"center",tailing:"right"}[this.hAlignment]};
            `,this,["height","width","vAlignment","hAlignment"]),r._$addNodes((()=>{const n=new _.ForNode;return n._$addNodess(()=>Array.from(this._$children).map(s=>(()=>{const i=new _.ExpressionNode(s);return i._$addProp("className",V`
                      position: relative;
                      grid-area: 1 / 1/ 1 / 1;
                    `),[i]})())),[n]})()),[r]}}function Ve(){return location.hash.slice(2)}function Le(){return location.pathname.slice(1)}function Ue(e,t){let r;if(e[0]==="/")r=e;else{e[0]!=="."&&(e="./"+e);const n=t==="history"?window.location.pathname:window.location.hash.replace(/^#/,""),s=e.split("/"),i=n.split("/").filter(c=>c);let a=0;for(let c of s){if(![".",".."].includes(c))break;c===".."&&(i.length===0&&console.warn(`no ../ in ${e}`),i.pop()),a++}r="/"+[...i,...s.slice(a)].join("/")}return r}class je{constructor(){o(this,"mode","hash")}hashTo(t){window.location.href="#"+Ue(t,this.mode)}historyTo(t){window.history.pushState({},"",Ue(t,this.mode))}to(t){if(this.mode==="hash"){this.hashTo(t);return}this.historyTo(t)}}class Wt extends m.View{constructor(){super(...arguments);o(this,"_$deps",{_$content:new Map});o(this,"_$tag","Route");o(this,"_$$_$content","_$prop");o(this,"_$content"," none")}Body(){return[new _.ExpressionNode(this._$children)]}}const le=history.pushState;let F=[];class qt extends m.View{constructor(){super(...arguments);o(this,"_$derivedPairs",{currUrl:["mode"],showedRoute:["currUrl"]});o(this,"_$deps",{mode:new Map,navigator:new Map,currUrl:new Map,showedRoute:new Map});o(this,"_$tag","RouterSpace");o(this,"_$$mode","_$prop");o(this,"mode","history");o(this,"_$$navigator");o(this,"_$$currUrl",()=>this.mode==="hash"?Ve():Le());o(this,"baseUrl","");o(this,"prevPathCondition","");o(this,"prevRoutes",[]);o(this,"showedRoute",()=>function(){const r=this.prevPathCondition;this.prevPathCondition="";const n=this.currUrl.replace(new RegExp(`^${this.baseUrl}`),"");let s=[];for(let i of this._$children){if(i._$tag!=="Route"){s.push(i);continue}let a=i._$content,c=!1;if(typeof i._$content=="string"){a=a.replace(/^(\.\/)+/,"");const d=a==="."&&n==="",f=(n+"/").startsWith(a+"/");c=d||f||a===" none"}else a instanceof RegExp&&(c=a.test(n));if(c){if(a===r)return this.prevPathCondition=r,this.prevRoutes;s.push(i),this.prevPathCondition=a;break}}return this.prevRoutes=s,s}.call(this));o(this,"historyChangeListen",()=>{this.currUrl=Le()});o(this,"hashChangeListen",()=>{this.currUrl=Ve()})}get navigator(){return this._$$navigator}set navigator(r){this._$$navigator!==r&&(this._$$navigator=r,this._$runDeps("navigator"))}get currUrl(){return this._$$currUrl}set currUrl(r){this._$$currUrl!==r&&(this._$$currUrl=r,this._$runDeps("currUrl"))}didMount(){if(this.mode==="hash"){addEventListener("load",this.hashChangeListen),addEventListener("hashchange",this.hashChangeListen);return}addEventListener("load",this.historyChangeListen),addEventListener("popstate",this.historyChangeListen),F.push(this.historyChangeListen),history.pushState=new Proxy(le,{apply:(r,n,s)=>{const i=r.apply(n,s);for(let a of F)a();return i}})}willUnmount(){if(this.mode==="hash"){removeEventListener("load",this.hashChangeListen),removeEventListener("hashchange",this.hashChangeListen);return}removeEventListener("load",this.historyChangeListen),removeEventListener("popstate",this.historyChangeListen),F=F.filter(r=>r!==this.historyChangeListen),F.length>0?history.pushState=new Proxy(le,{apply:(r,n,s)=>{const i=r.apply(n,s);for(let a of F)a();return i}}):history.pushState=le}AfterConstruct(){let r=this._$parentNode;for(;r;)r._$tag==="Route"&&(this.baseUrl=r._$content+"/"+this.baseUrl),r=r._$parentNode}Preset(){const r=new je;r.mode=this.mode,r.baseUrl=this.baseUrl,this.navigator=r}Body(){const r=new _.EnvNode;return r._$addNodes((()=>[new _.ExpressionNode(()=>this.showedRoute,this,["showedRoute"])])()),r._$addProp("RouteParam",()=>({path:this.currUrl,navigator:this.navigator}),this,["currUrl","navigator"],!1),[r]}}class Gt extends m.View{constructor(){super(...arguments);o(this,"_$deps",{duration:new Map,easing:new Map,delay:new Map});o(this,"_$tag","Transition");o(this,"_$$duration","_$prop");o(this,"duration",.5);o(this,"_$$easing","_$prop");o(this,"easing","ease-in-out");o(this,"_$$delay","_$prop");o(this,"delay",0)}Body(){const r=new _.ExpressionNode(this._$children);return r._$addProp("className",()=>V`
              transition: all ${this.duration}s ${this.easing} ${this.delay}s;
            `,this,["duration","easing","delay"],!1),[r]}}class Ht extends m.View{constructor(){super(...arguments);o(this,"_$deps",{duration:new Map,easing:new Map,delay:new Map,appearWith:new Map,disappearWith:new Map,movable:new Map});o(this,"_$tag","TransitionGroup");o(this,"_$duration",.5);o(this,"_$easing","ease-in-out");o(this,"_$delay",0);o(this,"_$$duration","_$prop");o(this,"duration",this._$duration);o(this,"_$$easing","_$prop");o(this,"easing",this._$easing);o(this,"_$$delay","_$prop");o(this,"delay",this._$delay);o(this,"_duration",r=>this.parseProp(r,"duration"));o(this,"_easing",r=>this.parseProp(r,"easing"));o(this,"_delay",r=>this.parseProp(r,"delay"));o(this,"firstRender",!0);o(this,"transition",(r,n)=>`all ${this._duration(r)[n]}s ${this._easing(r)[n]} ${this._delay(r)[n]}s`);o(this,"_$$appearWith","_$prop");o(this,"appearWith",{opacity:0});o(this,"_$$disappearWith","_$prop");o(this,"disappearWith",{opacity:0});o(this,"_$$movable","_$prop");o(this,"movable",!0);o(this,"prevElInfos",new Map);o(this,"removeStore");o(this,"lastDisappear",!1);o(this,"removeStores")}parseProp(r,n){let s={};const i=this[`_$${n}`],a=this[n];typeof a=="object"?(s.appear=a.appear??i,s.firstAppear=a.firstAppear??s.appear,s.disappear=a.disappear??i,s.lastDisappear=a.lastDisappear??s.disappear,s.move=a.move??i):(s.firstAppear=a,s.appear=a,s.disappear=a,s.lastDisappear=a,s.move=a);const c=d=>typeof d=="function"?d(r):d;return s.appear=c(s.appear)??i,s.firstAppear=c(s.firstAppear)??s.appear,s.disappear=c(s.disappear)??i,s.lastDisappear=c(s.lastDisappear)??s.disappear,s.move=c(s.move)??i,s}resolveDisappear(r){const{el:n,parentNode:s,rect:i,idx:a}=r;n.style.position="absolute",n.style.transition=this.lastDisappear?this.transition(n,"lastDisappear"):this.transition(n,"disappear"),n.style.margin="",n.style.transform="",ge(n,c=>{c.style.margin="",c.style.transform=""}),n.style.top=`${i.top}px`,n.style.left=`${i.left}px`,s.childNodes.length>=a?s.appendChild(n):s.insertBefore(n,s.childNodes[a]),requestAnimationFrame(()=>{const c=()=>{n.removeEventListener("transitionend",c),n.remove()};n.addEventListener("transitionend",c),Fe(n,this.disappearWith)})}willUnmount(){this.lastDisappear=!0;const r=this._$el;this.removeStores=[];for(let n of r)this.removeStores.push(Be(n))}didUnmount(){for(let r of this.removeStores)this.resolveDisappear(r)}Body(){const r=new _.ExpressionNode(this._$children);return r._$onUpdateNodes(()=>{for(let[n,s]of this.prevElInfos.entries())if(this.movable){n.style.transform="";const i={rect:n.getBoundingClientRect(),stopTrigger:s.stopTrigger};if(this.prevElInfos.set(n,i),i.stopTrigger)continue;s.stopTrigger=!0;const a=s.rect.x-i.rect.x,c=s.rect.y-i.rect.y;zt(n,this._duration(n).move,this._easing(n).move,this._delay(n).move,a,c,i)}}),r._$addProp("didAppear",n=>{if(n.style.transition=this.firstRender?this.transition(n,"firstAppear"):this.transition(n,"appear"),ge(n,a=>{a.style.transition=this.firstRender?this.transition(a,"firstAppear"):this.transition(a,"appear")}),requestAnimationFrame(()=>{this.prevElInfos.set(n,{rect:n.getBoundingClientRect(),stopTrigger:!0})}),!this.appearWith)return;const s=n.style.cssText;Fe(n,this.appearWith);const i=this.firstRender;requestAnimationFrame(()=>{n.setAttribute("style",s);const a=()=>{const c=this.prevElInfos.get(n);c.rect=n.getBoundingClientRect(),c.stopTrigger=!1,n.removeEventListener("transitionend",a)};n.addEventListener("transitionend",a),this.firstRender&&(this.firstRender=!1),setTimeout(()=>{this.prevElInfos.get(n).stopTrigger=!1},this._duration(n).appear*1e3),i&&requestAnimationFrame(()=>{n.style.transition=this.transition(n,"appear")})})}),r._$addProp("willDisappear",n=>{this.lastDisappear||(this.removeStore=Be(n),this.prevElInfos.delete(n))}),r._$addProp("didDisappear",()=>{this.lastDisappear||this.resolveDisappear(this.removeStore)}),[r]}}function Be(e){var t;return{el:e.cloneNode(!0),parentNode:e.parentNode,rect:{top:e.offsetTop,left:e.offsetLeft},idx:Array.from(((t=e.parentNode)==null?void 0:t.childNodes)??[]).indexOf(e)}}function ge(e,t){e.nodeType!==Node.TEXT_NODE&&(t(e),e.childNodes.forEach(r=>ge(r,t)))}function Fe(e,t){typeof t=="function"&&(t=t(e));const r=e.style.cssText;if(typeof t=="string")e.setAttribute("style",r+t);else for(let[n,s]of Object.entries(t))e.style[n]=s}function zt(e,t,r,n,s,i,a){let c,d,f=!1;const u=`all ${t}s ${r} ${n}s`;function p(v){c===void 0&&(c=v,e.style.transition=u+", transform 0s");const O=v-c;if(d!==v){const E=Math.max(O/(t*1e3)-n,0),l=E*s,C=E*i;E>=1?(e.style.transform="",f=!0):e.style.transform=`translate(${s-l}px, ${i-C}px)`,a.rect=e.getBoundingClientRect()}d=v,!f&&!a.stopTrigger?requestAnimationFrame(p):e.style.transition=u}requestAnimationFrame(p)}class Yt extends m.View{constructor(){super(...arguments);o(this,"_$deps",{_$content:new Map});o(this,"_$tag","Case");o(this,"_$$_$content","_$prop");o(this,"_$content"," default")}Body(){return[]}}var Kt=void 0;class Zt extends m.View{constructor(){super(...arguments);o(this,"_$derivedPairs",{caseChildren:["_$content"]});o(this,"_$deps",{_$content:new Map,caseChildren:new Map});o(this,"_$tag","Switch");o(this,"_$$_$content","_$prop");o(this,"_$content",Kt);o(this,"caseChildren",()=>function(){let r=[];for(let n of this._$children){if(n._$tag!=="Case"){r.push(n);continue}if(this._$content===n._$content||n._$content===" default"){r.push(...n._$children);break}}return r}.call(this))}Body(){return[new _.ExpressionNode(()=>this.caseChildren,this,["caseChildren"])]}}$.Case=Yt,$.HStack=jt,$.Navigator=je,$.Route=Wt,$.RouterSpace=qt,$.Spacer=Ut,$.Switch=Zt,$.Transition=Gt,$.TransitionGroup=Ht,$.VStack=Bt,$.ZStack=Ft,Object.defineProperty($,Symbol.toStringTag,{value:"Module"})});
