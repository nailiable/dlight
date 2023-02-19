"use strict";var le=Object.create;var D=Object.defineProperty;var pe=Object.getOwnPropertyDescriptor;var ce=Object.getOwnPropertyNames;var ue=Object.getPrototypeOf,fe=Object.prototype.hasOwnProperty;var ge=(t,e)=>{for(var r in e)D(t,r,{get:e[r],enumerable:!0})},V=(t,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of ce(e))!fe.call(t,s)&&s!==r&&D(t,s,{get:()=>e[s],enumerable:!(n=pe(e,s))||n.enumerable});return t};var _=(t,e,r)=>(r=t!=null?le(ue(t)):{},V(e||!t||!t.__esModule?D(r,"default",{value:t,enumerable:!0}):r,t)),me=t=>V(D({},"__esModule",{value:!0}),t);var Je={};ge(Je,{parseDlightFile:()=>de});module.exports=me(Je);var u=_(require("@babel/types"));var A=_(require("@babel/core")),W=_(require("@babel/generator")),d={traverse:A.traverse,generate:t=>(0,W.default)(t).code,parse:t=>A.parse(t,{plugins:[["@babel/plugin-syntax-typescript",{isTSX:!0}],"@babel/plugin-syntax-jsx","@babel/plugin-syntax-do-expressions",["@babel/plugin-proposal-decorators",{legacy:!0}]]})};function O(t,e,r,n){n.body.includes(r)||n.body.unshift(r),r.value.properties.push(u.objectProperty(u.identifier(t),u.arrayExpression(e.map(s=>u.stringLiteral(s)))))}function B(t,e,r){r.body.includes(e)||r.body.unshift(e),!e.value.properties.map(n=>n.key.name).includes(t)&&e.value.properties.push(u.objectProperty(u.identifier(t),u.newExpression(u.identifier("Map"),[])))}function L(t,e){let r=!1,n=t.parentPath;for(;n&&n.node!==e;){if(u.isArrowFunctionExpression(n.node)){r=!0;break}n=n.parentPath}return r}function ye(t){let e=t.parentPath.node;return u.isAssignmentExpression(e)&&e.left===t.node}function $e(t,e){let r=t.node,n=!1,s=t.parentPath;for(;s&&s.node!==e;){if(u.isAssignmentExpression(s.node)){let o=s.node.left,i=r.type===o.type,a=r.property.name===o.property.name;n=i&&a}s=s.parentPath}return n}function F(t,e){return!L(t,e)&&!ye(t)&&!$e(t,e)}function E(t){return d.parse(t).program.body[0].body}function z(t,e,r){return[u.classMethod("get",u.identifier(t),[],e),u.classMethod("set",u.identifier(t),[u.identifier("value")],r)]}function H(t){let e=t.value;t.value={type:"ArrowFunctionExpression",params:[],body:e}}var l=_(require("@babel/types"));function U(t){let e=t.tag,r=/html\((.+)\)/;return r.test(t.tag)?(t.tag=t.tag.replace(r,"$1"),!0):/^[a-z][a-z0-9]*$/.test(e)?(t.tag=`"${t.tag}"`,!0):!1}function q(t){return`${t}
`}function Z(t){return"["+t.map((e,r)=>e.attr.isSubView?`..._$node${r}`:`_$node${r}`).join(", ")+"]"}var y=class{value="";add(e){this.value+=q(e)}shift(e){this.value=q(e)+this.value}addBody(e){this.value+=e.value}};var $=_(require("@babel/types"));function b(t){return"["+t.map(e=>e.startsWith("...")?e:'"'+e+'"').join(", ")+"]"}function N(){return Math.random().toString(20).slice(2,8)}function K(t,e,r=[]){let n=d.parse(`(${t})`),s=[];return d.traverse(n,{MemberExpression(o){e.includes(o.node.property.name)&&F(o)&&s.push(o.node.property.name)}}),s=[...new Set([...s,...r])],s}function R(t,e,r=[]){let n=d.parse(`(${t})`),s=[];return d.traverse(n,{Identifier(o){for(let{ids:i,propNames:a}of e)i.includes(o.node.name)&&(L(o)||s.push(...a))}}),s=[...new Set([...s,...r])],s}function G(t){return t.match(/[_$a-zA-Z][_$a-zA-Z0-9]*/g)??[]}function J(t){let e=d.parse(`(${t})`);return $.isMemberExpression(e.program.body[0].expression)}function Q(t,e,r){let n=[],s=d.parse(e);d.traverse(s,{Identifier(i){n.push(i.node.name)}});let o=d.parse(`function tempFunc() {${t}}`);return d.traverse(o,{Identifier(i){if(n.includes(i.node.name)&&!$.isMemberExpression(i.parentPath.node)){let a=$.memberExpression($.identifier(r),$.identifier(i.node.name));i.replaceWith(a),i.skip()}}}),d.generate(o.program.body[0].body).trim().replace(/(^\{)|(\}$)/g,"")}function Y(t){let e=d.parse(`let _ = ${t}`).program.body[0].declarations[0].init;return!!($.isArrowFunctionExpression(e)||$.isFunctionExpression(e))}var w=class{depChain;subViews;idDepsArr=[];constructor(e,r,n=[]){this.depChain=e,this.subViews=r,this.idDepsArr=n}generate(e){let r=new y;for(let[n,s]of e.entries())r.addBody(this.resolveParserNode(s,n));return r.add(`return ${Z(e)}`),r.value}geneDeps(e){return[...new Set([...K(e,this.depChain),...R(e,this.idDepsArr)])]}resolveParserNode(e,r){return this.subViews.includes(e.tag)?this.resolveSubView(e,r):e.tag==="env"?this.resolveEnv(e,r):e.tag==="_"?this.resolveExpression(e,r):e.tag==="if"?this.resolveIf(e,r):e.tag==="for"?this.resolveFor(e,r):e.tag==="_$text"?this.resolveText(e,r):U(e)?this.resolveHTML(e,r):this.resolveCustom(e,r)}resolveIf(e,r){let n=new y,s=`_$node${r}`;n.add(`const ${s} = new _$.IfNode()`);for(let o of e.attr.conditions){n.add(`${s}._$addCond(() => ${o.condition}, () => {`),n.add(this.generate(o.parserNodes));let i=this.geneDeps(o.condition);if(i.length>0){n.add(`}, this, ${b(i)})`);continue}n.add("})")}return n}resolveFor(e,r){let n=new y,s=e.attr.key,o=e.attr.item,i=e.attr.array,a=`_$node${r}`;n.add(`const ${a} = new _$.ForNode()`);let p=this.geneDeps(i);if(p.length>0){n.add(`${a}._$addNodeFunc((_$key, _$idx, node_for) => {`);let m=o.match(/[_$a-zA-Z][_$a-zA-Z0-9]*/g)??[];n.add(`const ${o} = node_for._$getItem(_$key, _$idx)`);let c=`_$valuedItem${N()}`;n.add(`const ${c} = {}`);for(let g of m)n.add(`${c}.${g} = ${g}`);n.add(`node_for._$listen(this, ()=>node_for._$getItem(_$key, _$idx),             ${b(p)}, (_$item) => {`),n.add(`const ${o} = _$item`);for(let g of m)n.add(`${c}.${g} = ${g}`);n.add("})");let v=new w(this.depChain,this.subViews,[...this.idDepsArr,{ids:G(o),propNames:p}]).generate(e.children);v=Q(v,o,c),n.add(v),n.add("})"),s&&(n.add(`${a}._$addKeyFunc(() => {`),n.add("const keys = []"),n.add(`for (let ${o} of ${i}) {`),n.add(`keys.push(${s})`),n.add("}"),n.add("return keys"),n.add("})")),n.add(`${a}._$addArrayFunc(this, () => (${i}), ${b(p)})`)}else n.add(`${a}._$addNodess(() => Array.from(${i}).map((${o}) => (() => {`),n.add(this.generate(e.children)),n.add("})()))");return n}resolveText(e,r){let n=new y,s=e.attr._$content,o=this.geneDeps(`${s}`),i=`_$node${r}`;return o.length>0?n.add(`const ${i} = new _$.TextNode(() => ${s}, this, ${b(o)})`):n.add(`const ${i} = new _$.TextNode(${s}, )`),n}resolveHTML(e,r){let n=new y,s=`_$node${r}`;n.add(`const ${s} = new _$.HtmlNode(${e.tag}, )`);for(let{key:o,value:i,nodes:a}of e.attr.props){if(i=this.parsePropNodes(i,a),o==="element"){n.add(`${i} = ${s}._$el`);continue}if(["willAppear","didAppear","willDisappear","didDisappear"].includes(o)){n.add(`${s}._$addLifeCycle(${i}, "${o}")`);continue}o==="_$content"&&(o="innerText");let p=this.geneDeps(i);if(p.length>0){n.add(`${s}._$addProp("${o}", () => (${i}), this, ${b(p)})`);continue}n.add(`${s}._$addProp("${o}", ${i})`)}return e.children.length>0&&(n.add(`${s}._$addNodes((() => {`),n.add(this.generate(e.children)),n.add("})())")),n}resolveCustom(e,r){let n=new y,s=`_$node${r}`;n.add(`const ${s} = new (${e.tag})()`);for(let{key:o,value:i,nodes:a}of e.attr.props){if(i=this.parsePropNodes(i,a),o==="element"){Y(i)?n.add(`${s}._$addAfterset(() => (${i})(${s}._$el))`):n.add(`${s}._$addAfterset(() => ${i} = ${s}._$el)`);continue}if(["willMount","didMount","willUnmount","didUnmount"].includes(o)){n.add(`${s}._$addLifeCycle(${i}, "${o}")`);continue}let p=this.geneDeps(i);if(p.length>0){n.add(`${s}._$addProp("${o}", () => (${i}), this, ${b(p)}, ${J(i)})`);continue}n.add(`${s}._$addProp("${o}", ${i})`)}return e.children.length>0&&(n.add(`${s}._$addChildren((() => {`),n.add(this.generate(e.children)),n.add("})())")),n}resolveSubView(e,r){e.attr.isSubView=!0;let n=new y,s=e.attr.props.map(({key:a,value:p,nodes:m})=>({key:a,value:this.parsePropNodes(p,m)})),o=N(),i=[];for(let{key:a,value:p}of s){let m=`${a}_${o}`,h=b(this.geneDeps(p));n.add(`const ${m} = {value: ${p}, deps: ${h}}`),n.add(`this._$addDeps(${h}, {}, () => {${m}.value = ${p}})`),i.push({key:a,keyWithId:m})}return n.add(`const _$node${r} = ${e.tag}({${i.map(({key:a,keyWithId:p})=>`${a}: ${p}`).join(", ")}})`),n}resolveEnv(e,r){let n=new y,s=`_$node${r}`;n.add(`const ${s} = new _$.EnvNode()`),e.children.length>0&&(n.add(`${s}._$addNodes((() => {`),n.add(this.generate(e.children)),n.add("})())"));for(let{key:o,value:i,nodes:a}of e.attr.props){i=this.parsePropNodes(i,a);let p=this.geneDeps(i);if(p.length>0){n.add(`${s}._$addProp("${o}", () => (${i}), this, ${b(p)}, ${J(i)})`);continue}n.add(`${s}._$addProp("${o}", ${i})`)}return n}resolveExpression(e,r){let n=new y,s=`_$node${r}`;for(let{key:o,value:i,nodes:a}of e.attr.props){if(i=this.parsePropNodes(i,a),o==="_$content"){let m=this.geneDeps(i);m.length>0?n.add(`const ${s} = new _$.ExpressionNode(() => ${i}, this, ${b(m)})`):n.add(`const ${s} = new _$.ExpressionNode(${i}, )`);continue}if(o==="onUpdateNodes"){n.add(`${s}._$onUpdateNodes(${i})`);continue}let p=this.geneDeps(i);if(p.length>0){n.add(`${s}._$addProp("${o}", () => (${i}), this, ${b(p)}, ${J(i)})`);continue}n.add(`${s}._$addProp("${o}", ${i})`)}return n}parsePropNodes(e,r){for(let[n,s]of Object.entries(r)){let o=new y;o.add("((()=>{"),o.add(this.generate(s)),o.add("})())"),e=e.replace('"'+n+'"',o.value)}return e}};function k(t,e,r,n=[]){return new w(e,r,n).generate(t)}var f=_(require("@babel/types"));function he(){return Math.random().toString(32).slice(2)}function ee(t,e){if(!e)return{key:t,value:!0,nodes:{}};let r=d.parse(`let _ = ${d.generate(e)}`),n={};return d.traverse(r,{DoExpression(s){let o=s.node,i=he();n[i]=re(o.body.body),s.replaceWith(f.stringLiteral(i))}}),{key:t,value:d.generate(r.program.body[0].declarations[0].init),nodes:n}}function be(t){let e={tag:"",attr:{props:[]},children:[]},r=t;for(;r&&r.callee?.object&&!f.isThisExpression(r.callee?.object);){let n=r.arguments[0],s=r.callee.property.name;e.attr.props.unshift(ee(s,n)),r=r.callee.object}return r.arguments.length>0&&e.attr.props.unshift(ee("_$content",r.arguments[0])),r.callee?.callee?.name==="tag"?e.tag=d.generate(r.callee.arguments[0]):e.tag=d.generate(r.callee),e}function xe(t){return{tag:"_$text",attr:{_$content:d.generate(t)},children:[]}}function ve(t){let e=te(t.tag);Array.isArray(e)||(e=[e]);let r={tag:"_$text",attr:{_$content:d.generate(t.quasi)},children:[]};return[...e,r]}function te(t){return f.isCallExpression(t)?be(t):f.isStringLiteral(t)||f.isTemplateLiteral(t)?xe(t):f.isTaggedTemplateExpression(t)?ve(t):{}}function _e(t){let e=d.generate(t.left.declarations[0]),r=d.generate(t.right),n={tag:"for",attr:{item:e,array:r},children:[]},s=t.body.body;return f.isArrayExpression(s[0].expression)&&(n.attr.key=d.generate(s[0].expression.elements[0]),s=s.slice(1)),n.children=C(s),n}function Pe(t){return{tag:"if",attr:{conditions:ne(t)},children:[]}}function ne(t){let e=[],r=d.generate(t.test),n=C(t.consequent.body);return e.push({condition:r,parserNodes:n}),f.isIfStatement(t.alternate)?e.push(...ne(t.alternate)):t.alternate&&e.push({condition:!0,parserNodes:C(t.alternate.body)}),e}function C(t){let e=[];for(let r of t)if(f.isExpressionStatement(r)){let n=te(r.expression);Array.isArray(n)||(n=[n]),e.push(...n)}else f.isBlockStatement(r)?e[e.length-1].children=C(r.body):f.isForOfStatement(r)?e.push(_e(r)):f.isIfStatement(r)&&e.push(Pe(r));return e}function re(t){return C(t)}var T=re;var x=_(require("@babel/types"));function se(t,e){if(!e)return{key:t,value:!0,nodes:{}};let r=d.parse(d.generate(e)),n={};d.traverse(r,{JSXElement(o){let i=N();n[i]=P([o.node]),o.replaceWith(x.stringLiteral(i))}});let s=d.generate(e);return x.isJSXExpressionContainer(e)&&(s=s.replace(/^\{(.+)\}$/,"$1")),s.trim()===""&&(s='""'),{key:t,value:s,nodes:n}}function Ee(t){let e=t.openingElement.name.name,r=[];for(let n of t.openingElement.attributes)n=n,r.push(se(n.name.name,n.value));return{tag:e,attr:{props:r},children:P(t.children)}}function Se(t){let e=t.value.trim();return e===""?void 0:{tag:"_$text",attr:{_$content:`"${e}"`},children:[]}}function I(t,e){let r=t.openingElement.attributes.find(o=>o.name.name===e);if(!r)return r;let n="",s=r.value;return n=x.isJSXExpressionContainer(s)?d.generate(s.expression):d.generate(s),n}function Ne(t){return{tag:"if",attr:{conditions:[{condition:I(t,"cond"),parserNodes:P(t.children)}]},children:[]}}function we(t,e){e.attr.conditions.push({condition:I(t,"cond"),parserNodes:P(t.children)})}function ke(t,e){e.attr.conditions.push({condition:"true",parserNodes:P(t.children)})}function Ce(t){return{tag:"for",attr:{item:I(t,"let"),array:I(t,"of"),key:I(t,"key")},children:P(t.children)}}function Ie(t){return{tag:"_",attr:{props:[se("_$content",t)]},children:[]}}function P(t){let e=[];for(let r of t){if(x.isJSXText(r)){let s=Se(r);s&&e.push(s);continue}if(x.isJSXExpressionContainer(r)){e.push(Ie(r));continue}if(x.isJSXFragment(r)){e.push(...P(r.children));continue}let n=r.openingElement.name.name;if(n==="if"){e.push(Ne(r));continue}if(n==="else-if"){we(r,e[e.length-1]);continue}if(n==="else"){ke(r,e[e.length-1]);continue}if(n==="for"){e.push(Ce(r));continue}e.push(Ee(r))}return e}function De(t){return P([t])}var oe=De;var S=_(require("@babel/types"));function ie(t,e){let r=t.key.name;t.key.name=`_$$${r}`;let n=e.body.indexOf(t),s=E(`
    function ${r}() {
        return this._$$${r}
    }`),o=E(`
    function ${r}(value) {
        if (this._$$${r} === value) return
        this._$$${r} = value
        this._$runDeps("${r}")
    }`),[i,a]=z(r,s,o);e.body.splice(n+1,0,i,a)}function ae(t,e,r){let n=t.key.name,s=e.body.indexOf(t),o=r.toLowerCase(),i=S.classProperty(S.identifier(`_$$${n}`),S.stringLiteral(`_$${o}`));e.body.splice(s,0,i)}function Ae(t,e,r,n=!1){let s;if(n){let o=t.params[0];if(!o||!l.isObjectPattern(o))s=k(T(t.body.body),e,r);else{let a=o.properties.map(p=>p.key.name).map(p=>({ids:[p],propNames:[`...${p}.deps`]}));s=k(T(t.body.body),e,r,a)}}else s=k(T(t.body.body),e,r);t.body=E(`function tmp() { ${s} }`)}function Be(t,e,r){let n=k(oe(t.value),e,r);t.value=l.arrowFunctionExpression([],E(`function tmp() { ${n} }`))}function Fe(t){let e=t.params[0];if(!e||!l.isObjectPattern(e))return;let r=[];for(let s of e.properties){let o=s.key.name;r.push(o),l.isAssignmentPattern(s.value)&&(s.value.right=l.objectExpression([l.objectProperty(l.identifier("value"),s.value.right),l.objectProperty(l.identifier("deps"),l.arrayExpression())]))}let n=d.parse(`function tmp() ${d.generate(t.body)}`);d.traverse(n,{Identifier(s){r.includes(s.node.name)&&!l.isMemberExpression(s.parentPath.node)&&(s.replaceWith(l.memberExpression(l.identifier(s.node.name),l.identifier("value"))),s.skip())}}),t.body=n.program.body[0].body}function j(t,e,r){let n=r==="jsd"?Ae:Be,s,o=[];for(let a of t.body)a.decorators?.find(p=>l.isIdentifier(p.expression)&&p.expression.name==="View")?(a.decorators=void 0,o.push(a)):a.key.name==="Body"&&(s=a);let i=o.map(a=>"this."+a.key.name);for(let a of o)n(a,e,i,!0),Fe(a);n(s,e,i)}function de(t,e){let r=d.parse(t),n=null,s=null,o=null,i=null,a=[];return d.traverse(r,{ClassDeclaration(h){let c=h.node;if(l.isIdentifier(c.superClass,{name:"View"})){n=c,s=n.body,s.body.unshift(l.classProperty(l.identifier("_$tag"),l.stringLiteral(n.id.name))),i=l.classProperty(l.identifier("_$derivedPairs"),l.objectExpression([])),o=l.classProperty(l.identifier("_$deps"),l.objectExpression([])),a=[];return}},ClassMethod(h){!n||s.body.indexOf(h.node)===s.body.length-1&&j(s,a,e)},ClassProperty(h){if(!n)return;let c=h.node,X=s.body.indexOf(h.node)===s.body.length-1;if(c.decorators?.find(g=>l.isIdentifier(g.expression)&&g.expression.name==="View")||c.key.name==="Body"){X&&j(s,a,e);return}let v=[];if(h.scope.traverse(c,{MemberExpression(g){a.includes(g.node.property.name)&&F(g,n)&&v.push(g.node.property.name)}}),v=[...new Set(v)],v.length>0&&(O(c.key.name,v,i,s),B(c.key.name,o,s),H(c),a.push(c.key.name)),c.decorators){for(let g of c.decorators){let M=g.expression.name??g.expression.callee.name;if(["EnvState","PropState","State"].includes(M)){a.push(c.key.name),B(c.key.name,o,s),ie(c,s);break}if(["Prop","Env"].includes(M)){a.push(c.key.name),B(c.key.name,o,s),ae(c,s,M);break}}c.decorators=null}X&&j(s,a,e)}}),`import * as _$ from '@dlightjs/dlight';
`+d.generate(r)}0&&(module.exports={parseDlightFile});
