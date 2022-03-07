var ht=Object.defineProperty;var p=(ae,le)=>ht(ae,"name",{value:le,configurable:!0});exports.id=457;exports.ids=[457];exports.modules={5186:(ae,le,M)=>{var O=M(3698),re=M(2505),W=M(6417),k=Function.bind,V=k.bind(k);function L(b,he,pe){var P=V(W,null).apply(null,pe?[he,pe]:[he]);b.api={remove:P},b.remove=P,["before","error","after","wrap"].forEach(function(me){var fe=pe?[he,me,pe]:[he,me];b[me]=b.api[me]=V(re,null).apply(null,fe)})}p(L,"bindApi");function de(){var b="h",he={registry:{}},pe=O.bind(null,he,b);return L(pe,he,b),pe}p(de,"HookSingular");function ge(){var b={registry:{}},he=O.bind(null,b);return L(he,b),he}p(ge,"HookCollection");var Me=!1;function ue(){return Me||(console.warn('[before-after-hook]: "Hook()" repurposing warning, use "Hook.Collection()". Read more: https://git.io/upgrade-before-after-hook-to-1.4'),Me=!0),ge()}p(ue,"Hook"),ue.Singular=de.bind(),ue.Collection=ge.bind(),ae.exports=ue,ae.exports.Hook=ue,ae.exports.Singular=ue.Singular,ae.exports.Collection=ue.Collection},2505:ae=>{ae.exports=le;function le(M,O,re,W){var k=W;M.registry[re]||(M.registry[re]=[]),O==="before"&&(W=p(function(V,L){return Promise.resolve().then(k.bind(null,L)).then(V.bind(null,L))},"hook")),O==="after"&&(W=p(function(V,L){var de;return Promise.resolve().then(V.bind(null,L)).then(function(ge){return de=ge,k(de,L)}).then(function(){return de})},"hook")),O==="error"&&(W=p(function(V,L){return Promise.resolve().then(V.bind(null,L)).catch(function(de){return k(de,L)})},"hook")),M.registry[re].push({hook:W,orig:k})}p(le,"addHook")},3698:ae=>{ae.exports=le;function le(M,O,re,W){if(typeof re!="function")throw new Error("method for before hook must be a function");return W||(W={}),Array.isArray(O)?O.reverse().reduce(function(k,V){return le.bind(null,M,V,k,W)},re)():Promise.resolve().then(function(){return M.registry[O]?M.registry[O].reduce(function(k,V){return V.hook.bind(null,k,W)},re)():re(W)})}p(le,"register")},6417:ae=>{ae.exports=le;function le(M,O,re){if(!!M.registry[O]){var W=M.registry[O].map(function(k){return k.orig}).indexOf(re);W!==-1&&M.registry[O].splice(W,1)}}p(le,"removeHook")},4578:(ae,le,M)=>{"use strict";M.r(le),M.d(le,{GitHubApi:()=>te,GitHubPullRequest:()=>Ge,fromCommitFileStatus:()=>dt});function O(){return typeof navigator=="object"&&"userAgent"in navigator?navigator.userAgent:typeof process=="object"&&"version"in process?`Node.js/${process.version.substr(1)} (${process.platform}; ${process.arch})`:"<environment undetectable>"}p(O,"getUserAgent");var re=M(5186);/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */function W(a){return Object.prototype.toString.call(a)==="[object Object]"}p(W,"isObject");function k(a){var n,i;return W(a)===!1?!1:(n=a.constructor,n===void 0?!0:(i=n.prototype,!(W(i)===!1||i.hasOwnProperty("isPrototypeOf")===!1)))}p(k,"isPlainObject");function V(a){return a?Object.keys(a).reduce((n,i)=>(n[i.toLowerCase()]=a[i],n),{}):{}}p(V,"lowercaseKeys");function L(a,n){const i=Object.assign({},a);return Object.keys(n).forEach(o=>{k(n[o])?o in a?i[o]=L(a[o],n[o]):Object.assign(i,{[o]:n[o]}):Object.assign(i,{[o]:n[o]})}),i}p(L,"mergeDeep");function de(a){for(const n in a)a[n]===void 0&&delete a[n];return a}p(de,"removeUndefinedProperties");function ge(a,n,i){if(typeof n=="string"){let[s,u]=n.split(" ");i=Object.assign(u?{method:s,url:u}:{url:s},i)}else i=Object.assign({},n);i.headers=V(i.headers),de(i),de(i.headers);const o=L(a||{},i);return a&&a.mediaType.previews.length&&(o.mediaType.previews=a.mediaType.previews.filter(s=>!o.mediaType.previews.includes(s)).concat(o.mediaType.previews)),o.mediaType.previews=o.mediaType.previews.map(s=>s.replace(/-preview/,"")),o}p(ge,"merge");function Me(a,n){const i=/\?/.test(a)?"&":"?",o=Object.keys(n);return o.length===0?a:a+i+o.map(s=>s==="q"?"q="+n.q.split("+").map(encodeURIComponent).join("+"):`${s}=${encodeURIComponent(n[s])}`).join("&")}p(Me,"addQueryParameters");const ue=/\{[^}]+\}/g;function b(a){return a.replace(/^\W+|\W+$/g,"").split(/,/)}p(b,"removeNonChars");function he(a){const n=a.match(ue);return n?n.map(b).reduce((i,o)=>i.concat(o),[]):[]}p(he,"extractUrlVariableNames");function pe(a,n){return Object.keys(a).filter(i=>!n.includes(i)).reduce((i,o)=>(i[o]=a[o],i),{})}p(pe,"omit");function P(a){return a.split(/(%[0-9A-Fa-f]{2})/g).map(function(n){return/%[0-9A-Fa-f]/.test(n)||(n=encodeURI(n).replace(/%5B/g,"[").replace(/%5D/g,"]")),n}).join("")}p(P,"encodeReserved");function me(a){return encodeURIComponent(a).replace(/[!'()*]/g,function(n){return"%"+n.charCodeAt(0).toString(16).toUpperCase()})}p(me,"encodeUnreserved");function fe(a,n,i){return n=a==="+"||a==="#"?P(n):me(n),i?me(i)+"="+n:n}p(fe,"encodeValue");function $(a){return a!=null}p($,"isDefined");function Re(a){return a===";"||a==="&"||a==="?"}p(Re,"isKeyOperator");function ve(a,n,i,o){var s=a[i],u=[];if($(s)&&s!=="")if(typeof s=="string"||typeof s=="number"||typeof s=="boolean")s=s.toString(),o&&o!=="*"&&(s=s.substring(0,parseInt(o,10))),u.push(fe(n,s,Re(n)?i:""));else if(o==="*")Array.isArray(s)?s.filter($).forEach(function(c){u.push(fe(n,c,Re(n)?i:""))}):Object.keys(s).forEach(function(c){$(s[c])&&u.push(fe(n,s[c],c))});else{const c=[];Array.isArray(s)?s.filter($).forEach(function(h){c.push(fe(n,h))}):Object.keys(s).forEach(function(h){$(s[h])&&(c.push(me(h)),c.push(fe(n,s[h].toString())))}),Re(n)?u.push(me(i)+"="+c.join(",")):c.length!==0&&u.push(c.join(","))}else n===";"?$(s)&&u.push(me(i)):s===""&&(n==="&"||n==="?")?u.push(me(i)+"="):s===""&&u.push("");return u}p(ve,"getValues");function Te(a){return{expand:Se.bind(null,a)}}p(Te,"parseUrl");function Se(a,n){var i=["+","#",".","/",";","?","&"];return a.replace(/\{([^\{\}]+)\}|([^\{\}]+)/g,function(o,s,u){if(s){let h="";const f=[];if(i.indexOf(s.charAt(0))!==-1&&(h=s.charAt(0),s=s.substr(1)),s.split(/,/g).forEach(function(y){var F=/([^:\*]*)(?::(\d+)|(\*))?/.exec(y);f.push(ve(n,h,F[1],F[2]||F[3]))}),h&&h!=="+"){var c=",";return h==="?"?c="&":h!=="#"&&(c=h),(f.length!==0?h:"")+f.join(c)}else return f.join(",")}else return P(u)})}p(Se,"expand");function Ue(a){let n=a.method.toUpperCase(),i=(a.url||"/").replace(/:([a-z]\w+)/g,"{$1}"),o=Object.assign({},a.headers),s,u=pe(a,["method","baseUrl","url","headers","request","mediaType"]);const c=he(i);i=Te(i).expand(u),/^http/.test(i)||(i=a.baseUrl+i);const h=Object.keys(a).filter(F=>c.includes(F)).concat("baseUrl"),f=pe(u,h);if(!/application\/octet-stream/i.test(o.accept)&&(a.mediaType.format&&(o.accept=o.accept.split(/,/).map(F=>F.replace(/application\/vnd(\.\w+)(\.v3)?(\.\w+)?(\+json)?$/,`application/vnd$1$2.${a.mediaType.format}`)).join(",")),a.mediaType.previews.length)){const F=o.accept.match(/[\w-]+(?=-preview)/g)||[];o.accept=F.concat(a.mediaType.previews).map(T=>{const Y=a.mediaType.format?`.${a.mediaType.format}`:"+json";return`application/vnd.github.${T}-preview${Y}`}).join(",")}return["GET","HEAD"].includes(n)?i=Me(i,f):"data"in f?s=f.data:Object.keys(f).length?s=f:o["content-length"]=0,!o["content-type"]&&typeof s<"u"&&(o["content-type"]="application/json; charset=utf-8"),["PATCH","PUT"].includes(n)&&typeof s>"u"&&(s=""),Object.assign({method:n,url:i,headers:o},typeof s<"u"?{body:s}:null,a.request?{request:a.request}:null)}p(Ue,"parse");function je(a,n,i){return Ue(ge(a,n,i))}p(je,"endpointWithDefaults");function Be(a,n){const i=ge(a,n),o=je.bind(null,i);return Object.assign(o,{DEFAULTS:i,defaults:Be.bind(null,i),merge:ge.bind(null,i),parse:Ue})}p(Be,"withDefaults");const ke=`octokit-endpoint.js/6.0.12 ${O()}`,He=Be(null,{method:"GET",baseUrl:"https://api.github.com",headers:{accept:"application/vnd.github.v3+json","user-agent":ke},mediaType:{format:"",previews:[]}});var Ie=M(3251);class qe extends Error{constructor(n){super(n);Error.captureStackTrace&&Error.captureStackTrace(this,this.constructor),this.name="Deprecation"}}p(qe,"Deprecation");var Ve=M(778),Ee=M.n(Ve);const ne=Ee()(a=>console.warn(a)),se=Ee()(a=>console.warn(a));class w extends Error{constructor(n,i,o){super(n);Error.captureStackTrace&&Error.captureStackTrace(this,this.constructor),this.name="HttpError",this.status=i;let s;"headers"in o&&typeof o.headers<"u"&&(s=o.headers),"response"in o&&(this.response=o.response,s=o.response.headers);const u=Object.assign({},o.request);o.request.headers.authorization&&(u.headers=Object.assign({},o.request.headers,{authorization:o.request.headers.authorization.replace(/ .*$/," [REDACTED]")})),u.url=u.url.replace(/\bclient_secret=\w+/g,"client_secret=[REDACTED]").replace(/\baccess_token=\w+/g,"access_token=[REDACTED]"),this.request=u,Object.defineProperty(this,"code",{get(){return ne(new qe("[@octokit/request-error] `error.code` is deprecated, use `error.status`.")),i}}),Object.defineProperty(this,"headers",{get(){return se(new qe("[@octokit/request-error] `error.headers` is deprecated, use `error.response.headers`.")),s||{}}})}}p(w,"RequestError");const ce="5.6.3";function Pe(a){return a.arrayBuffer()}p(Pe,"getBufferResponse");function Fe(a){const n=a.request&&a.request.log?a.request.log:console;(k(a.body)||Array.isArray(a.body))&&(a.body=JSON.stringify(a.body));let i={},o,s;return(a.request&&a.request.fetch||Ie.ZP)(a.url,Object.assign({method:a.method,body:a.body,headers:a.headers,redirect:a.redirect},a.request)).then(async c=>{s=c.url,o=c.status;for(const h of c.headers)i[h[0]]=h[1];if("deprecation"in i){const h=i.link&&i.link.match(/<([^>]+)>; rel="deprecation"/),f=h&&h.pop();n.warn(`[@octokit/request] "${a.method} ${a.url}" is deprecated. It is scheduled to be removed on ${i.sunset}${f?`. See ${f}`:""}`)}if(!(o===204||o===205)){if(a.method==="HEAD"){if(o<400)return;throw new w(c.statusText,o,{response:{url:s,status:o,headers:i,data:void 0},request:a})}if(o===304)throw new w("Not modified",o,{response:{url:s,status:o,headers:i,data:await Ae(c)},request:a});if(o>=400){const h=await Ae(c);throw new w(ze(h),o,{response:{url:s,status:o,headers:i,data:h},request:a})}return Ae(c)}}).then(c=>({status:o,url:s,headers:i,data:c})).catch(c=>{throw c instanceof w?c:new w(c.message,500,{request:a})})}p(Fe,"fetchWrapper");async function Ae(a){const n=a.headers.get("content-type");return/application\/json/.test(n)?a.json():!n||/^text\/|charset=utf-8$/.test(n)?a.text():Pe(a)}p(Ae,"getResponseData");function ze(a){return typeof a=="string"?a:"message"in a?Array.isArray(a.errors)?`${a.message}: ${a.errors.map(JSON.stringify).join(", ")}`:a.message:`Unknown error: ${JSON.stringify(a)}`}p(ze,"toErrorMessage");function C(a,n){const i=a.defaults(n);return Object.assign(p(function(s,u){const c=i.merge(s,u);if(!c.request||!c.request.hook)return Fe(i.parse(c));const h=p((f,y)=>Fe(i.parse(i.merge(f,y))),"request");return Object.assign(h,{endpoint:i,defaults:C.bind(null,i)}),c.request.hook(h,c)},"newApi"),{endpoint:i,defaults:C.bind(null,i)})}p(C,"dist_web_withDefaults");const Oe=C(He,{headers:{"user-agent":`octokit-request.js/${ce} ${O()}`}}),q="4.8.0";function e(a){return`Request failed due to following response errors:
`+a.errors.map(n=>` - ${n.message}`).join(`
`)}p(e,"_buildMessageForResponseErrors");class t extends Error{constructor(n,i,o){super(e(o));this.request=n,this.headers=i,this.response=o,this.name="GraphqlResponseError",this.errors=o.errors,this.data=o.data,Error.captureStackTrace&&Error.captureStackTrace(this,this.constructor)}}p(t,"GraphqlResponseError");const r=["method","baseUrl","url","headers","request","query","mediaType"],l=["query","method","url"],g=/\/api\/v3\/?$/;function d(a,n,i){if(i){if(typeof n=="string"&&"query"in i)return Promise.reject(new Error('[@octokit/graphql] "query" cannot be used as variable name'));for(const c in i)if(!!l.includes(c))return Promise.reject(new Error(`[@octokit/graphql] "${c}" cannot be used as variable name`))}const o=typeof n=="string"?Object.assign({query:n},i):n,s=Object.keys(o).reduce((c,h)=>r.includes(h)?(c[h]=o[h],c):(c.variables||(c.variables={}),c.variables[h]=o[h],c),{}),u=o.baseUrl||a.endpoint.DEFAULTS.baseUrl;return g.test(u)&&(s.url=u.replace(g,"/api/graphql")),a(s).then(c=>{if(c.data.errors){const h={};for(const f of Object.keys(c.headers))h[f]=c.headers[f];throw new t(s,h,c.data)}return c.data.data})}p(d,"graphql");function v(a,n){const i=a.defaults(n);return Object.assign(p((s,u)=>d(i,s,u),"newApi"),{defaults:v.bind(null,i),endpoint:Oe.endpoint})}p(v,"graphql_dist_web_withDefaults");const m=v(Oe,{headers:{"user-agent":`octokit-graphql.js/${q} ${O()}`},method:"POST",url:"/graphql"});function R(a){return v(a,{method:"POST",url:"/graphql"})}p(R,"withCustomRequest");const D=/^v1\./,E=/^ghs_/,S=/^ghu_/;async function x(a){const n=a.split(/\./).length===3,i=D.test(a)||E.test(a),o=S.test(a);return{type:"token",token:a,tokenType:n?"app":i?"installation":o?"user-to-server":"oauth"}}p(x,"auth");function j(a){return a.split(/\./).length===3?`bearer ${a}`:`token ${a}`}p(j,"withAuthorizationPrefix");async function J(a,n,i,o){const s=n.endpoint.merge(i,o);return s.headers.authorization=j(a),n(s)}p(J,"hook");const _=p(function(n){if(!n)throw new Error("[@octokit/auth-token] No token passed to createTokenAuth");if(typeof n!="string")throw new Error("[@octokit/auth-token] Token passed to createTokenAuth is not a string");return n=n.replace(/^(token|bearer) +/i,""),Object.assign(x.bind(null,n),{hook:J.bind(null,n)})},"createTokenAuth"),U="3.5.1";class B{constructor(n={}){const i=new re.Collection,o={baseUrl:Oe.endpoint.DEFAULTS.baseUrl,headers:{},request:Object.assign({},n.request,{hook:i.bind(null,"request")}),mediaType:{previews:[],format:""}};if(o.headers["user-agent"]=[n.userAgent,`octokit-core.js/${U} ${O()}`].filter(Boolean).join(" "),n.baseUrl&&(o.baseUrl=n.baseUrl),n.previews&&(o.mediaType.previews=n.previews),n.timeZone&&(o.headers["time-zone"]=n.timeZone),this.request=Oe.defaults(o),this.graphql=R(this.request).defaults(o),this.log=Object.assign({debug:()=>{},info:()=>{},warn:console.warn.bind(console),error:console.error.bind(console)},n.log),this.hook=i,n.authStrategy){const{authStrategy:u,...c}=n,h=u(Object.assign({request:this.request,log:this.log,octokit:this,octokitOptions:c},n.auth));i.wrap("request",h.hook),this.auth=h}else if(!n.auth)this.auth=async()=>({type:"unauthenticated"});else{const u=_(n.auth);i.wrap("request",u.hook),this.auth=u}this.constructor.plugins.forEach(u=>{Object.assign(this,u(this,n))})}static defaults(n){return p(class extends this{constructor(...o){const s=o[0]||{};if(typeof n=="function"){super(n(s));return}super(Object.assign({},n,s,s.userAgent&&n.userAgent?{userAgent:`${s.userAgent} ${n.userAgent}`}:null))}},"OctokitWithDefaults")}static plugin(...n){var i;const o=this.plugins;return i=p(class extends this{},"_a"),i.plugins=o.concat(n.filter(u=>!o.includes(u))),i}}p(B,"Octokit"),B.VERSION=U,B.plugins=[];var G=M(9496),A=M(1149),H=M(4673),Z=M(5396),N=M(5059),X=M(2833),z=M(2436),Q=M(7369),be=M(9417),xe=Object.defineProperty,ye=Object.defineProperties,lt=Object.getOwnPropertyDescriptor,ut=Object.getOwnPropertyDescriptors,Ye=Object.getOwnPropertySymbols,Xe=Object.prototype.hasOwnProperty,Qe=Object.prototype.propertyIsEnumerable,We=p((a,n,i)=>n in a?xe(a,n,{enumerable:!0,configurable:!0,writable:!0,value:i}):a[n]=i,"__defNormalProp"),_e=p((a,n)=>{for(var i in n||(n={}))Xe.call(n,i)&&We(a,i,n[i]);if(Ye)for(var i of Ye(n))Qe.call(n,i)&&We(a,i,n[i]);return a},"__spreadValues"),De=p((a,n)=>ye(a,ut(n)),"__spreadProps"),ct=p((a,n)=>{var i={};for(var o in a)Xe.call(a,o)&&n.indexOf(o)<0&&(i[o]=a[o]);if(a!=null&&Ye)for(var o of Ye(a))n.indexOf(o)<0&&Qe.call(a,o)&&(i[o]=a[o]);return i},"__objRest"),ie=p((a,n,i,o)=>{for(var s=o>1?void 0:o?lt(n,i):n,u=a.length-1,c;u>=0;u--)(c=a[u])&&(s=(o?c(n,i,s):c(s))||s);return o&&s&&xe(n,i,s),s},"__decorateClass"),Ke=p((a,n,i)=>(We(a,typeof n!="symbol"?n+"":n,i),i),"__publicField");const Ce=Object.freeze({values:[]}),Ze=Object.freeze({ranges:[]});class te{constructor(){Ke(this,"_onDidReauthenticate",new G.EventEmitter),Ke(this,"_octokits",new Map)}get onDidReauthenticate(){return this._onDidReauthenticate.event}async getAccountForCommit(n,i,o,s,u,c){var h,f;const y=z.Y.getCorrelationContext();try{const F=`query getAccountForCommit(
	$owner: String!
	$repo: String!
	$ref: GitObjectID!
	$avatarSize: Int
) {
	repository(name: $repo, owner: $owner) {
		object(oid: $ref) {
			... on Commit {
				author {
					name
					email
					avatarUrl(size: $avatarSize)
				}
			}
		}
	}
}`,T=await this.graphql(i,F,De(_e({},c),{owner:o,repo:s,ref:u})),Y=(f=(h=T==null?void 0:T.repository)==null?void 0:h.object)==null?void 0:f.author;return Y==null?void 0:{provider:n,name:Y.name??void 0,email:Y.email??void 0,avatarUrl:Y.avatarUrl}}catch(F){return this.handleException(F,y,void 0)}}async getAccountForEmail(n,i,o,s,u,c){var h,f;const y=z.Y.getCorrelationContext();try{const F=`query getAccountForEmail(
	$emailQuery: String!
	$avatarSize: Int
) {
	search(type: USER, query: $emailQuery, first: 1) {
		nodes {
			... on User {
				name
				email
				avatarUrl(size: $avatarSize)
			}
		}
	}
}`,T=await this.graphql(i,F,De(_e({},c),{owner:o,repo:s,emailQuery:`in:email ${u}`})),Y=(f=(h=T==null?void 0:T.search)==null?void 0:h.nodes)==null?void 0:f[0];return Y==null?void 0:{provider:n,name:Y.name??void 0,email:Y.email??void 0,avatarUrl:Y.avatarUrl}}catch(F){return this.handleException(F,y,void 0)}}async getDefaultBranch(n,i,o,s,u){var c,h;const f=z.Y.getCorrelationContext();try{const y=`query getDefaultBranch(
	$owner: String!
	$repo: String!
) {
	repository(name: $repo, owner: $owner) {
		defaultBranchRef {
			name
		}
	}
}`,F=await this.graphql(i,y,De(_e({},u),{owner:o,repo:s})),T=((h=(c=F==null?void 0:F.repository)==null?void 0:c.defaultBranchRef)==null?void 0:h.name)??void 0;return T==null?void 0:{provider:n,name:T}}catch(y){return this.handleException(y,f,void 0)}}async getIssueOrPullRequest(n,i,o,s,u,c){var h;const f=z.Y.getCorrelationContext();try{const y=`query getIssueOrPullRequest(
		$owner: String!
		$repo: String!
		$number: Int!
	) {
		repository(name: $repo, owner: $owner) {
			issueOrPullRequest(number: $number) {
				__typename
				... on Issue {
					createdAt
					closed
					closedAt
					title
					url
				}
				... on PullRequest {
					createdAt
					closed
					closedAt
					title
					url
				}
			}
		}
	}`,F=await this.graphql(i,y,De(_e({},c),{owner:o,repo:s,number:u})),T=(h=F==null?void 0:F.repository)==null?void 0:h.issueOrPullRequest;return T==null?void 0:{provider:n,type:T.type,id:String(u),date:new Date(T.createdAt),title:T.title,closed:T.closed,closedDate:T.closedAt==null?void 0:new Date(T.closedAt),url:T.url}}catch(y){return this.handleException(y,f,void 0)}}async getPullRequestForBranch(n,i,o,s,u,c){var h,f,y,F;const T=z.Y.getCorrelationContext();try{const Y=`query getPullRequestForBranch(
	$owner: String!
	$repo: String!
	$branch: String!
	$limit: Int!
	$include: [PullRequestState!]
	$avatarSize: Int
) {
	repository(name: $repo, owner: $owner) {
		refs(query: $branch, refPrefix: "refs/heads/", first: 1) {
			nodes {
				associatedPullRequests(first: $limit, orderBy: {field: UPDATED_AT, direction: DESC}, states: $include) {
					nodes {
						author {
							login
							avatarUrl(size: $avatarSize)
							url
						}
						permalink
						number
						title
						state
						updatedAt
						closedAt
						mergedAt
						repository {
							isFork
							owner {
								login
							}
						}
					}
				}
			}
		}
	}
}`,K=await this.graphql(i,Y,De(_e({},c),{owner:o,repo:s,branch:u,limit:10})),I=(F=(y=(f=(h=K==null?void 0:K.repository)==null?void 0:h.refs.nodes[0])==null?void 0:f.associatedPullRequests)==null?void 0:y.nodes)==null?void 0:F.filter(ee=>!ee.repository.isFork||ee.repository.owner.login===o);return I==null||I.length===0?void 0:(I.length>1&&I.sort((ee,oe)=>(ee.repository.owner.login===o?-1:1)-(oe.repository.owner.login===o?-1:1)||(ee.state==="OPEN"?-1:1)-(oe.state==="OPEN"?-1:1)||new Date(oe.updatedAt).getTime()-new Date(ee.updatedAt).getTime()),Ge.from(I[0],n))}catch(Y){return this.handleException(Y,T,void 0)}}async getPullRequestForCommit(n,i,o,s,u,c){var h,f,y,F;const T=z.Y.getCorrelationContext();try{const Y=`query getPullRequestForCommit(
	$owner: String!
	$repo: String!
	$ref: GitObjectID!
	$avatarSize: Int
) {
	repository(name: $repo, owner: $owner) {
		object(oid: $ref) {
			... on Commit {
				associatedPullRequests(first: 2, orderBy: {field: UPDATED_AT, direction: DESC}) {
					nodes {
						author {
							login
							avatarUrl(size: $avatarSize)
							url
						}
						permalink
						number
						title
						state
						updatedAt
						closedAt
						mergedAt
						repository {
							isFork
							owner {
								login
							}
						}
					}
				}
			}
		}
	}
}`,K=await this.graphql(i,Y,De(_e({},c),{owner:o,repo:s,ref:u})),I=(F=(y=(f=(h=K==null?void 0:K.repository)==null?void 0:h.object)==null?void 0:f.associatedPullRequests)==null?void 0:y.nodes)==null?void 0:F.filter(ee=>!ee.repository.isFork||ee.repository.owner.login===o);return I==null||I.length===0?void 0:(I.length>1&&I.sort((ee,oe)=>(ee.repository.owner.login===o?-1:1)-(oe.repository.owner.login===o?-1:1)||(ee.state==="OPEN"?-1:1)-(oe.state==="OPEN"?-1:1)||new Date(oe.updatedAt).getTime()-new Date(ee.updatedAt).getTime()),Ge.from(I[0],n))}catch(Y){return this.handleException(Y,T,void 0)}}async getBlame(n,i,o,s,u){var c,h,f,y,F;const T=z.Y.getCorrelationContext();try{const Y=`query getBlameRanges(
	$owner: String!
	$repo: String!
	$ref: String!
	$path: String!
) {
	viewer { name }
	repository(owner: $owner, name: $repo) {
		object(expression: $ref) {
			...on Commit {
				blame(path: $path) {
					ranges {
						startingLine
						endingLine
						commit {
							oid
							parents(first: 3) { nodes { oid } }
							message
							additions
							changedFiles
							deletions
							author {
								avatarUrl
								date
								email
								name
							}
							committer {
								date
								email
								name
							}
						}
					}
				}
			}
		}
	}
}`,K=await this.graphql(n,Y,{owner:i,repo:o,ref:s,path:u});if(K==null)return Ze;const I=(f=(h=(c=K.repository)==null?void 0:c.object)==null?void 0:h.blame)==null?void 0:f.ranges;return I==null||I.length===0?{ranges:[],viewer:(y=K.viewer)==null?void 0:y.name}:{ranges:I,viewer:(F=K.viewer)==null?void 0:F.name}}catch(Y){return this.handleException(Y,T,Ze)}}async getBranches(n,i,o,s){var u;const c=z.Y.getCorrelationContext();try{const h=`query getBranches(
	$owner: String!
	$repo: String!
	$branchQuery: String
	$cursor: String
	$limit: Int = 100
) {
	repository(owner: $owner, name: $repo) {
		refs(query: $branchQuery, refPrefix: "refs/heads/", first: $limit, after: $cursor, orderBy: { field: TAG_COMMIT_DATE, direction: DESC }) {
			pageInfo {
				endCursor
				hasNextPage
			}
			nodes {
				name
				target {
					oid
					commitUrl
					...on Commit {
						authoredDate
						committedDate
					}
				}
			}
		}
	}
}`,f=await this.graphql(n,h,{owner:i,repo:o,branchQuery:s==null?void 0:s.query,cursor:s==null?void 0:s.cursor,limit:Math.min(100,(s==null?void 0:s.limit)??100)});if(f==null)return Ce;const y=(u=f.repository)==null?void 0:u.refs;return y==null?Ce:{paging:{cursor:y.pageInfo.endCursor,more:y.pageInfo.hasNextPage},values:y.nodes}}catch(h){return this.handleException(h,c,Ce)}}async getCommit(n,i,o,s){var u,c,h,f,y,F,T,Y,K,I;const ee=z.Y.getCorrelationContext();try{const oe=await this.request(n,"GET /repos/{owner}/{repo}/commits/{ref}",{owner:i,repo:o,ref:s}),we=oe==null?void 0:oe.data;if(we==null)return;const{commit:$e}=we;return{oid:we.sha,parents:{nodes:we.parents.map(Le=>({oid:Le.sha}))},message:$e.message,additions:(u=we.stats)==null?void 0:u.additions,changedFiles:(c=we.files)==null?void 0:c.length,deletions:(h=we.stats)==null?void 0:h.deletions,author:{avatarUrl:((f=we.author)==null?void 0:f.avatar_url)??void 0,date:((y=$e.author)==null?void 0:y.date)??new Date().toString(),email:((F=$e.author)==null?void 0:F.email)??void 0,name:((T=$e.author)==null?void 0:T.name)??""},committer:{date:((Y=$e.committer)==null?void 0:Y.date)??new Date().toString(),email:((K=$e.committer)==null?void 0:K.email)??void 0,name:((I=$e.committer)==null?void 0:I.name)??""},files:we.files}}catch(oe){return this.handleException(oe,ee,void 0)}}async getCommitForFile(n,i,o,s,u){if(X.GitRevision.isSha(s))return this.getCommit(n,i,o,s);const c=await this.getCommits(n,i,o,s,{limit:1,path:u});if(c.values.length===0)return;const h=await this.getCommit(n,i,o,c.values[0].oid);return De(_e({},h??c.values[0]),{viewer:c.viewer})}async getCommitBranches(n,i,o,s,u){var c,h;const f=z.Y.getCorrelationContext();try{const y=`query getCommitBranches(
	$owner: String!
	$repo: String!
	$since: GitTimestamp!
	$until: GitTimestamp!
) {
	repository(owner: $owner, name: $repo) {
		refs(first: 20, refPrefix: "refs/heads/", orderBy: { field: TAG_COMMIT_DATE, direction: DESC }) {
			nodes {
				name
				target {
					... on Commit {
						history(first: 3, since: $since until: $until) {
							nodes { oid }
						}
					}
				}
			}
		}
	}
}`,F=await this.graphql(n,y,{owner:i,repo:o,since:u.toISOString(),until:u.toISOString()}),T=(h=(c=F==null?void 0:F.repository)==null?void 0:c.refs)==null?void 0:h.nodes;if(T==null)return[];const Y=[];for(const K of T)for(const I of K.target.history.nodes)if(I.oid===s){Y.push(K.name);break}return Y}catch(y){return this.handleException(y,f,[])}}async getCommitCount(n,i,o,s){var u,c;const h=z.Y.getCorrelationContext();try{const f=`query getCommitCount(
	$owner: String!
	$repo: String!
	$ref: String!
) {
	repository(owner: $owner, name: $repo) {
		ref(qualifiedName: $ref) {
			target {
				... on Commit {
					history(first: 1) {
						totalCount
					}
				}
			}
		}
	}
}`,y=await this.graphql(n,f,{owner:i,repo:o,ref:s});return(c=(u=y==null?void 0:y.repository)==null?void 0:u.ref)==null?void 0:c.target.history.totalCount}catch(f){return this.handleException(f,h,void 0)}}async getCommitOnBranch(n,i,o,s,u,c){var h;const f=z.Y.getCorrelationContext();try{const y=`query getCommitOnBranch(
	$owner: String!
	$repo: String!
	$ref: String!
	$since: GitTimestamp!
	$until: GitTimestamp!
) {
	repository(owner: $owner, name: $repo) {
		ref(qualifiedName: $ref) {
			target {
				... on Commit {
					history(first: 3, since: $since until: $until) {
						nodes { oid }
					}
				}
			}
		}
	}
}`,F=await this.graphql(n,y,{owner:i,repo:o,ref:`refs/heads/${s}`,since:c.toISOString(),until:c.toISOString()}),T=(h=F==null?void 0:F.repository)==null?void 0:h.ref.target.history.nodes;if(T==null)return[];const Y=[];for(const K of T)if(K.oid===u){Y.push(s);break}return Y}catch(y){return this.handleException(y,f,[])}}async getCommits(n,i,o,s,u){var c,h,f,y;const F=z.Y.getCorrelationContext();if((u==null?void 0:u.limit)===1&&(u==null?void 0:u.path)==null)return this.getCommitsCoreSingle(n,i,o,s);try{const T=`query getCommits(
	$owner: String!
	$repo: String!
	$ref: String!
	$path: String
	$author: CommitAuthor
	$after: String
	$before: String
	$limit: Int = 100
	$since: GitTimestamp
	$until: GitTimestamp
) {
	viewer { name }
	repository(name: $repo, owner: $owner) {
		object(expression: $ref) {
			... on Commit {
				history(first: $limit, author: $author, path: $path, after: $after, before: $before, since: $since, until: $until) {
					pageInfo {
						startCursor
						endCursor
						hasNextPage
						hasPreviousPage
					}
					nodes {
						... on Commit {
							oid
							message
							parents(first: 3) { nodes { oid } }
							additions
							changedFiles
							deletions
							author {
								avatarUrl
								date
								email
								name
							}
							committer {
								 date
								 email
								 name
							 }
						}
					}
				}
			}
		}
	}
}`;let Y;if((u==null?void 0:u.authors)!=null)if(u.authors.length===1){const[ee]=u.authors;Y={id:ee.id,emails:ee.email?[ee.email]:void 0}}else{const ee=u.authors.filter(oe=>oe.email).map(oe=>oe.email);Y=ee.length?{emails:ee}:void 0}const K=await this.graphql(n,T,{owner:i,repo:o,ref:s,after:u==null?void 0:u.after,before:u==null?void 0:u.before,path:u==null?void 0:u.path,author:Y,limit:Math.min(100,(u==null?void 0:u.limit)??100),since:typeof(u==null?void 0:u.since)=="string"?u==null?void 0:u.since:(c=u==null?void 0:u.since)==null?void 0:c.toISOString(),until:typeof(u==null?void 0:u.until)=="string"?u==null?void 0:u.until:(h=u==null?void 0:u.until)==null?void 0:h.toISOString()}),I=(y=(f=K==null?void 0:K.repository)==null?void 0:f.object)==null?void 0:y.history;return I==null?Ce:{paging:I.pageInfo.endCursor!=null?{cursor:I.pageInfo.endCursor??void 0,more:I.pageInfo.hasNextPage}:void 0,values:I.nodes,viewer:K==null?void 0:K.viewer.name}}catch(T){return this.handleException(T,F,Ce)}}async getCommitsCoreSingle(n,i,o,s){var u;const c=z.Y.getCorrelationContext();try{const h=`query getCommit(
	$owner: String!
	$repo: String!
	$ref: String!
) {
	viewer { name }
	repository(name: $repo owner: $owner) {
		object(expression: $ref) {
			...on Commit {
				oid
				parents(first: 3) { nodes { oid } }
				message
				additions
				changedFiles
				deletions
				author {
					avatarUrl
					date
					email
					name
				}
				committer {
					date
					email
					name
				}
			}
		}
	}
}`,f=await this.graphql(n,h,{owner:i,repo:o,ref:s});if(f==null)return Ce;const y=(u=f.repository)==null?void 0:u.object;return y!=null?{values:[y],viewer:f.viewer.name}:Ce}catch(h){return this.handleException(h,c,Ce)}}async getCommitRefs(n,i,o,s,u){var c,h;const f=z.Y.getCorrelationContext();try{const y=`query getCommitRefs(
	$owner: String!
	$repo: String!
	$ref: String!
	$after: String
	$before: String
	$first: Int
	$last: Int
	$path: String
	$since: GitTimestamp
	$until: GitTimestamp
) {
	repository(name: $repo, owner: $owner) {
		object(expression: $ref) {
			... on Commit {
				history(first: $first, last: $last, path: $path, since: $since, until: $until, after: $after, before: $before) {
					pageInfo { startCursor, endCursor, hasNextPage, hasPreviousPage }
					totalCount
					nodes { oid }
				}
			}
		}
	}
}`,F=await this.graphql(n,y,{owner:i,repo:o,ref:s,path:u==null?void 0:u.path,first:u==null?void 0:u.first,last:u==null?void 0:u.last,after:u==null?void 0:u.after,before:u==null?void 0:u.before,since:u==null?void 0:u.since,until:u==null?void 0:u.until}),T=(h=(c=F==null?void 0:F.repository)==null?void 0:c.object)==null?void 0:h.history;return T==null?void 0:{pageInfo:T.pageInfo,totalCount:T.totalCount,values:T.nodes}}catch(y){return this.handleException(y,f,void 0)}}async getNextCommitRefs(n,i,o,s,u,c){const h=await this.getCommitDate(n,i,o,c);if(h==null)return[];let f=await this.getCommitRefs(n,i,o,s,{path:u,first:1,since:h});if(f==null)return[];const y=`${f.pageInfo.startCursor.split(" ",1)[0]} ${f.totalCount}`;let F;if([,F]=y.split(" ",2),F=Math.min(parseInt(F,10),5),f=await this.getCommitRefs(n,i,o,s,{path:u,last:F,before:y}),f==null)return[];const T=[];for(const{oid:Y}of f.values){if(Y===c)break;T.push(Y)}return T.reverse()}async getCommitDate(n,i,o,s){var u,c;const h=z.Y.getCorrelationContext();try{const f=`query getCommitDate(
	$owner: String!
	$repo: String!
	$sha: GitObjectID!
) {
	repository(name: $repo, owner: $owner) {
		object(oid: $sha) {
			... on Commit { committer { date } }
		}
	}
}`,y=await this.graphql(n,f,{owner:i,repo:o,sha:s});return(c=(u=y==null?void 0:y.repository)==null?void 0:u.object)==null?void 0:c.committer.date}catch(f){return this.handleException(f,h,void 0)}}async getContributors(n,i,o){const s=z.Y.getCorrelationContext();try{const u=await this.request(n,"GET /repos/{owner}/{repo}/contributors",{owner:i,repo:o,per_page:100});return(u==null?void 0:u.data)==null?[]:u.data}catch(u){return this.handleException(u,s,[])}}async getDefaultBranchName(n,i,o){var s,u;const c=z.Y.getCorrelationContext();try{const h=`query getDefaultBranch(
	$owner: String!
	$repo: String!
) {
	repository(owner: $owner, name: $repo) {
		defaultBranchRef {
			name
		}
	}
}`,f=await this.graphql(n,h,{owner:i,repo:o});return f==null?void 0:((u=(s=f.repository)==null?void 0:s.defaultBranchRef)==null?void 0:u.name)??void 0}catch(h){return this.handleException(h,c,void 0)}}async getCurrentUser(n,i,o){var s,u,c,h;const f=z.Y.getCorrelationContext();try{const y=`query getCurrentUser(
	$owner: String!
	$repo: String!
) {
	viewer { name, email, login, id }
	repository(owner: $owner, name: $repo) { viewerPermission }
}`,F=await this.graphql(n,y,{owner:i,repo:o});return F==null?void 0:{name:(s=F.viewer)==null?void 0:s.name,email:(u=F.viewer)==null?void 0:u.email,username:(c=F.viewer)==null?void 0:c.login,id:(h=F.viewer)==null?void 0:h.id}}catch(y){return this.handleException(y,f,void 0)}}async getRepositoryVisibility(n,i,o){var s;const u=z.Y.getCorrelationContext();try{const c=`query getRepositoryVisibility(
	$owner: String!
	$repo: String!
) {
	repository(owner: $owner, name: $repo) {
		visibility
	}
}`,h=await this.graphql(n,c,{owner:i,repo:o});return((s=h==null?void 0:h.repository)==null?void 0:s.visibility)==null?void 0:h.repository.visibility==="PUBLIC"?N.q.Public:N.q.Private}catch(c){return this.handleException(c,u,void 0)}}async getTags(n,i,o,s){var u;const c=z.Y.getCorrelationContext();try{const h=`query getTags(
	$owner: String!
	$repo: String!
	$tagQuery: String
	$cursor: String
	$limit: Int = 100
) {
	repository(owner: $owner, name: $repo) {
		refs(query: $tagQuery, refPrefix: "refs/tags/", first: $limit, after: $cursor, orderBy: { field: TAG_COMMIT_DATE, direction: DESC }) {
			pageInfo {
				endCursor
				hasNextPage
			}
			nodes {
				name
				target {
					oid
					commitUrl
					...on Commit {
						authoredDate
						committedDate
						message
					}
					...on Tag {
						message
						tagger { date }
					}
				}
			}
		}
	}
}`,f=await this.graphql(n,h,{owner:i,repo:o,tagQuery:s==null?void 0:s.query,cursor:s==null?void 0:s.cursor,limit:Math.min(100,(s==null?void 0:s.limit)??100)});if(f==null)return Ce;const y=(u=f.repository)==null?void 0:u.refs;return y==null?Ce:{paging:{cursor:y.pageInfo.endCursor,more:y.pageInfo.hasNextPage},values:y.nodes}}catch(h){return this.handleException(h,c,Ce)}}async resolveReference(n,i,o,s,u){var c,h,f,y,F,T;const Y=z.Y.getCorrelationContext();try{if(!u){const ee=`query resolveReference(
	$owner: String!
	$repo: String!
	$ref: String!
) {
	repository(owner: $owner, name: $repo) {
		object(expression: $ref) {
			oid
		}
	}
}`,oe=await this.graphql(n,ee,{owner:i,repo:o,ref:s});return((h=(c=oe==null?void 0:oe.repository)==null?void 0:c.object)==null?void 0:h.oid)??void 0}const K=`query resolveReference(
	$owner: String!
	$repo: String!
	$ref: String!
	$path: String!
) {
	repository(owner: $owner, name: $repo) {
		object(expression: $ref) {
			... on Commit {
				history(first: 1, path: $path) {
					nodes { oid }
				}
			}
		}
	}
}`,I=await this.graphql(n,K,{owner:i,repo:o,ref:s,path:u});return((T=(F=(y=(f=I==null?void 0:I.repository)==null?void 0:f.object)==null?void 0:y.history.nodes)==null?void 0:F[0])==null?void 0:T.oid)??void 0}catch(K){return this.handleException(K,Y,void 0)}}async searchCommits(n,i,o){const s=z.Y.getCorrelationContext(),u=Math.min(100,(o==null?void 0:o.limit)??100);let c,h,f;(o==null?void 0:o.cursor)!=null?([c,h,f]=o.cursor.split(" ",3),c=parseInt(c,10),h=parseInt(h,10),f=parseInt(f,10)):(c=1,h=u,f=0);try{const y=await this.request(n,"GET /search/commits",{q:i,sort:o==null?void 0:o.sort,order:o==null?void 0:o.order,per_page:h,page:c}),F=y==null?void 0:y.data;if(F==null||F.items.length===0)return;const T=F.items.map(I=>{var ee,oe,we,$e,Le,et,tt,rt,nt,it,ot,st,at;return{oid:I.sha,parents:{nodes:I.parents.map(gt=>({oid:gt.sha}))},message:I.commit.message,author:{avatarUrl:((ee=I.author)==null?void 0:ee.avatar_url)??void 0,date:((oe=I.commit.author)==null?void 0:oe.date)??((we=I.commit.author)==null?void 0:we.date)??new Date().toString(),email:(($e=I.author)==null?void 0:$e.email)??((Le=I.commit.author)==null?void 0:Le.email)??void 0,name:((et=I.author)==null?void 0:et.name)??((tt=I.commit.author)==null?void 0:tt.name)??""},committer:{date:((rt=I.commit.committer)==null?void 0:rt.date)??((nt=I.committer)==null?void 0:nt.date)??new Date().toString(),email:((it=I.committer)==null?void 0:it.email)??((ot=I.commit.committer)==null?void 0:ot.email)??void 0,name:((st=I.committer)==null?void 0:st.name)??((at=I.commit.committer)==null?void 0:at.name)??""}}}),Y=f+F.items.length,K=F.incomplete_results||F.total_count>Y;return{pageInfo:{startCursor:`${c} ${h} ${f}`,endCursor:K?`${c+1} ${h} ${Y}`:void 0,hasPreviousPage:F.total_count>0&&c>1,hasNextPage:K},totalCount:F.total_count,values:T}}catch(y){return this.handleException(y,s,void 0)}}octokit(n,i){let o=this._octokits.get(n);if(o==null){let s;if(H.$L){let u=p(function(c,h){if(h.headers!=null){const f=h.headers,{"user-agent":y}=f,F=ct(f,["user-agent"]);y&&(h.headers=F)}return(0,A.h)(c,h)},"fetchCore");s=B.defaults({auth:`token ${n}`,request:{fetch:u}})}else s=B.defaults({auth:`token ${n}`});o=new s(i),this._octokits.set(n,o),(z.Y.logLevel===z.i.Debug||z.Y.isDebugging)&&o.hook.wrap("request",async(u,c)=>{const h=new be.u(`[GITHUB] ${c.method} ${c.url}`,{log:!1});try{return await u(c)}finally{let f;try{if(typeof c.query=="string"){const y=/(^[^({\n]+)/.exec(c.query);f=` ${(y==null?void 0:y[1].trim())??c.query}`}}catch{}h.stop({message:f})}})}return o}async graphql(n,i,o){var s,u,c,h;try{return await this.octokit(n).graphql(i,o)}catch(f){if(f instanceof t){switch((u=(s=f.errors)==null?void 0:s[0])==null?void 0:u.type){case"NOT_FOUND":throw new Z.Ww(f);case"FORBIDDEN":throw new Z._7("github",Z.Jx.Forbidden,f)}G.window.showErrorMessage(`GitHub request failed: ${((h=(c=f.errors)==null?void 0:c[0])==null?void 0:h.message)??f.message}`,"OK")}else f instanceof w?this.handleRequestError(f):G.window.showErrorMessage(`GitHub request failed: ${f.message}`,"OK");throw f}}async request(n,i,o){try{return await this.octokit(n).request(i,o)}catch(s){throw s instanceof w?this.handleRequestError(s):G.window.showErrorMessage(`GitHub request failed: ${s.message}`,"OK"),s}}handleRequestError(n){var i,o,s;switch(n.status){case 404:case 410:case 422:throw new Z.Ww(n);case 401:throw new Z._7("github",Z.Jx.Unauthorized,n);case 403:throw new Z._7("github",Z.Jx.Forbidden,n);case 500:n.response!=null&&G.window.showErrorMessage("GitHub failed to respond and might be experiencing issues. Please visit the [GitHub status page](https://githubstatus.com) for more information.","OK");break;case 502:if(n.message.includes("timeout")){G.window.showErrorMessage("GitHub request timed out","OK");return}break;default:if(n.status>=400&&n.status<500)throw new Z.Bn(n);break}G.window.showErrorMessage(`GitHub request failed: ${((s=(o=(i=n.response)==null?void 0:i.errors)==null?void 0:o[0])==null?void 0:s.message)??n.message}`,"OK")}handleException(n,i,o){if(n instanceof Z.Ww)return o;throw z.Y.error(n,i),n instanceof Z._7&&this.showAuthenticationErrorMessage(n),n}async showAuthenticationErrorMessage(n){if(n.reason===Z.Jx.Unauthorized||n.reason===Z.Jx.Forbidden){const i="Reauthenticate";await G.window.showErrorMessage(`${n.message}. Would you like to try reauthenticating${n.reason===Z.Jx.Forbidden?" to provide additional access":""}?`,i)===i&&this._onDidReauthenticate.fire()}else G.window.showErrorMessage(n.message,"OK")}}p(te,"GitHubApi"),ie([(0,Q.fF)({args:{0:a=>a.name,1:"<token>"}})],te.prototype,"getAccountForCommit",1),ie([(0,Q.fF)({args:{0:a=>a.name,1:"<token>"}})],te.prototype,"getAccountForEmail",1),ie([(0,Q.fF)({args:{0:a=>a.name,1:"<token>"}})],te.prototype,"getDefaultBranch",1),ie([(0,Q.fF)({args:{0:a=>a.name,1:"<token>"}})],te.prototype,"getIssueOrPullRequest",1),ie([(0,Q.fF)({args:{0:a=>a.name,1:"<token>"}})],te.prototype,"getPullRequestForBranch",1),ie([(0,Q.fF)({args:{0:a=>a.name,1:"<token>"}})],te.prototype,"getPullRequestForCommit",1),ie([(0,Q.fF)({args:{0:"<token>"}})],te.prototype,"getBlame",1),ie([(0,Q.fF)({args:{0:"<token>"}})],te.prototype,"getBranches",1),ie([(0,Q.fF)({args:{0:"<token>"}})],te.prototype,"getCommit",1),ie([(0,Q.fF)({args:{0:"<token>"}})],te.prototype,"getCommitForFile",1),ie([(0,Q.fF)({args:{0:"<token>"}})],te.prototype,"getCommitBranches",1),ie([(0,Q.fF)({args:{0:"<token>"}})],te.prototype,"getCommitCount",1),ie([(0,Q.fF)({args:{0:"<token>"}})],te.prototype,"getCommitOnBranch",1),ie([(0,Q.fF)({args:{0:"<token>"}})],te.prototype,"getCommits",1),ie([(0,Q.fF)({args:{0:"<token>"}})],te.prototype,"getCommitRefs",1),ie([(0,Q.fF)({args:{0:"<token>"}})],te.prototype,"getNextCommitRefs",1),ie([(0,Q.fF)({args:{0:"<token>"}})],te.prototype,"getContributors",1),ie([(0,Q.fF)({args:{0:"<token>"}})],te.prototype,"getDefaultBranchName",1),ie([(0,Q.fF)({args:{0:"<token>"}})],te.prototype,"getCurrentUser",1),ie([(0,Q.fF)({args:{0:"<token>"}})],te.prototype,"getRepositoryVisibility",1),ie([(0,Q.fF)({args:{0:"<token>"}})],te.prototype,"getTags",1),ie([(0,Q.fF)({args:{0:"<token>"}})],te.prototype,"resolveReference",1),ie([(0,Q.fF)({args:{0:"<token>"}})],te.prototype,"searchCommits",1);var Ge;(a=>{function n(s,u){return new X.PullRequest(u,{name:s.author.login,avatarUrl:s.author.avatarUrl,url:s.author.url},String(s.number),s.title,s.permalink,i(s.state),new Date(s.updatedAt),s.closedAt==null?void 0:new Date(s.closedAt),s.mergedAt==null?void 0:new Date(s.mergedAt))}p(n,"from"),a.from=n;function i(s){return s==="MERGED"?X.PullRequestState.Merged:s==="CLOSED"?X.PullRequestState.Closed:X.PullRequestState.Open}p(i,"fromState"),a.fromState=i;function o(s){return s===X.PullRequestState.Merged?"MERGED":s===X.PullRequestState.Closed?"CLOSED":"OPEN"}p(o,"toState"),a.toState=o})(Ge||(Ge={}));function dt(a){switch(a){case"added":return X.GitFileIndexStatus.Added;case"changed":case"modified":return X.GitFileIndexStatus.Modified;case"removed":return X.GitFileIndexStatus.Deleted;case"renamed":return X.GitFileIndexStatus.Renamed;case"copied":return X.GitFileIndexStatus.Copied}}p(dt,"fromCommitFileStatus")},3760:(ae,le,M)=>{"use strict";M.r(le),M.d(le,{GitHubGitProvider:()=>C});var O=M(9496),re=M(7267),W=M(9179),k=M(1045),V=M(313),L=M(5396),de=M(6532),ge=M(5059),Me=M(6643),ue=M(2324),b=M(2833),he=M(7358),pe=M(3969),P=M(2436),me=M(2062),fe=M(5861),$=M(7369),Re=M(2886),ve=M(516),Te=M(2378),Se=M(4578);async function Ue(q){try{const e=O.extensions.getExtension("GitHub.remotehub")??O.extensions.getExtension("GitHub.remotehub-insiders");if(e==null)throw P.Y.log("GitHub Repositories extension is not installed or enabled"),new L.R5("GitHub Repositories","GitHub.remotehub");return e.isActive?e.exports:await e.activate()}catch(e){if(P.Y.error(e,"Unable to get required api from the GitHub Repositories extension"),!(e instanceof L.R5),q)return;throw e}}p(Ue,"getRemoteHubApi");var je=(q=>(q[q.Branch=0]="Branch",q[q.RemoteBranch=1]="RemoteBranch",q[q.Tag=2]="Tag",q[q.Commit=3]="Commit",q))(je||{}),Be=(q=>(q[q.Branch=0]="Branch",q[q.Tag=1]="Tag",q[q.Commit=2]="Commit",q[q.PullRequest=3]="PullRequest",q[q.Tree=4]="Tree",q))(Be||{}),Ne=Object.defineProperty,ke=Object.defineProperties,Je=Object.getOwnPropertyDescriptor,He=Object.getOwnPropertyDescriptors,Ie=Object.getOwnPropertySymbols,qe=Object.prototype.hasOwnProperty,Ve=Object.prototype.propertyIsEnumerable,Ee=p((q,e,t)=>e in q?Ne(q,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):q[e]=t,"__defNormalProp"),ne=p((q,e)=>{for(var t in e||(e={}))qe.call(e,t)&&Ee(q,t,e[t]);if(Ie)for(var t of Ie(e))Ve.call(e,t)&&Ee(q,t,e[t]);return q},"__spreadValues"),se=p((q,e)=>ke(q,He(e)),"__spreadProps"),w=p((q,e,t,r)=>{for(var l=r>1?void 0:r?Je(e,t):e,g=q.length-1,d;g>=0;g--)(d=q[g])&&(l=(r?d(e,t,l):d(l))||l);return r&&l&&Ne(e,t,l),l},"__decorateClass"),ce=p((q,e,t)=>(Ee(q,typeof e!="symbol"?e+"":e,t),t),"__publicField");const Pe=Object.freeze({values:[]}),Fe=Promise.resolve(void 0),Ae=["repo","read:user","user:email"],ze=/^[^/](?!.*\/\.)(?!.*\.\.)(?!.*\/\/)(?!.*@\{)[^\000-\037\177 ~^:?*[\\]+[^./]$/;class C{constructor(e){this.container=e,ce(this,"descriptor",{id:ge.p.GitHub,name:"GitHub"}),ce(this,"supportedSchemes",new Set([k.sN.Virtual,k.sN.GitHub,k.sN.PRs])),ce(this,"_onDidChangeRepository",new O.EventEmitter),ce(this,"_onDidCloseRepository",new O.EventEmitter),ce(this,"_onDidOpenRepository",new O.EventEmitter),ce(this,"_branchesCache",new Map),ce(this,"_repoInfoCache",new Map),ce(this,"_tagsCache",new Map),ce(this,"_disposables",[]),ce(this,"_allowedFeatures",new Map),ce(this,"_github"),ce(this,"_remotehub"),ce(this,"_remotehubPromise"),ce(this,"_sessionPromise")}get onDidChangeRepository(){return this._onDidChangeRepository.event}get onDidCloseRepository(){return this._onDidCloseRepository.event}get onDidOpenRepository(){return this._onDidOpenRepository.event}dispose(){this._disposables.forEach(e=>e.dispose())}onRepositoryChanged(e,t){this._branchesCache.delete(e.path),this._tagsCache.delete(e.path),this._repoInfoCache.delete(e.path),this._onDidChangeRepository.fire(t)}async discoverRepositories(e){if(!this.supportedSchemes.has(e.scheme))return[];try{const{remotehub:t}=await this.ensureRepositoryContext(e.toString(),!0),r=t.getVirtualWorkspaceUri(e);return r==null?[]:[this.openRepository(void 0,r,!0)]}catch{return[]}}updateContext(){(0,V.v)(k.zf.HasVirtualFolders,this.container.git.hasOpenRepositories(this.descriptor.id))}openRepository(e,t,r,l,g){return new b.Repository(this.container,this.onRepositoryChanged.bind(this),this.descriptor,e,t,r,l??!O.window.state.focused,g)}async allows(e,t,r){var l;if(t===me.Cx.Free)return!1;if(t===me.Cx.Pro)return!0;if(r==null){const v=[...this.container.git.getOpenRepositories(this.descriptor.id)];return(await Promise.allSettled(v.map(R=>this.allows(e,t,R.path)))).every(R=>R.status==="fulfilled"&&R.value)}let g=this._allowedFeatures.get(r),d=g==null?void 0:g.get(e);return d!=null||(d=((l=Me.o.previewFeatures)==null?void 0:l.get(e))?!0:await this.visibility(r)===ge.q.Public,g==null&&(g=new Map,this._allowedFeatures.set(r,g)),g.set(e,d)),d}async supports(e){switch(e){case de.A.Worktrees:return!1;default:return!0}}async visibility(e){const t=await this.getRemotes(e);if(t.length===0)return ge.q.Private;const r=t.find(l=>l.name==="origin");return r!=null?this.getRemoteVisibility(r):ge.q.Private}async getRemoteVisibility(e){var t;switch((t=e.provider)==null?void 0:t.id){case"github":{const{github:r,metadata:l,session:g}=await this.ensureRepositoryContext(e.repoPath);return await r.getRepositoryVisibility(g.accessToken,l.repo.owner,l.repo.name)??ge.q.Private}default:return ge.q.Private}}async getOpenScmRepositories(){return[]}async getOrOpenScmRepository(e){}canHandlePathOrUri(e,t){if(!!this.supportedSchemes.has(e))return typeof t=="string"?t:t.toString()}getAbsoluteUri(e,t){if(typeof t=="string")if((0,ve.tE)(t))t=O.Uri.parse(t,!0);else throw O.window.showErrorMessage(`Unable to get absolute uri between ${typeof e=="string"?e:e.toString(!1)} and ${t}; Base path '${t}' must be a uri`),new Error(`Base path '${t}' must be a uri`);if(typeof e=="string"&&!(0,ve.tE)(e)&&!(0,ve.YP)(e))return O.Uri.joinPath(t,(0,ve.AH)(e));const r=this.getRelativePath(e,t);return O.Uri.joinPath(t,r)}async getBestRevisionUri(e,t,r){return r?this.createProviderUri(e,r,t):this.createVirtualUri(e,r,t)}getRelativePath(e,t){if(typeof t=="string")if((0,ve.tE)(t))t=O.Uri.parse(t,!0);else throw O.window.showErrorMessage(`Unable to get relative path between ${typeof e=="string"?e:e.toString(!1)} and ${t}; Base path '${t}' must be a uri`),new Error(`Base path '${t}' must be a uri`);let r;if(typeof e=="string")if((0,ve.tE)(e))e=O.Uri.parse(e,!0);else return e=(0,ve.AH)(e),r=(0,ve.YP)(e)&&e.startsWith(t.path)?e.slice(t.path.length):e,r.charCodeAt(0)===k.mN.Slash&&(r=r.slice(1)),r;return r=(0,ve.AH)((0,ve.Gf)(t.path.slice(1),e.path.slice(1))),r}getRevisionUri(e,t,r){const l=this.createProviderUri(e,r,t);return r===b.GitRevision.deletedOrMissing?l.with({query:"~"}):l}async getWorkingUri(e,t){return this.createVirtualUri(e,void 0,t.path)}async addRemote(e,t,r){}async pruneRemote(e,t){}async applyChangesToWorkingFile(e,t,r){}async branchContainsCommit(e,t,r){return!1}async checkout(e,t,r){}resetCaches(...e){(e.length===0||e.includes("branches"))&&this._branchesCache.clear(),(e.length===0||e.includes("tags"))&&this._tagsCache.clear(),e.length===0&&this._repoInfoCache.clear()}async excludeIgnoredUris(e,t){return t}async fetch(e,t){}async findRepositoryUri(e,t){const r=P.Y.getCorrelationContext();try{return(await this.ensureRemoteHubApi()).getProviderRootUri(e).with({scheme:k.sN.Virtual})}catch(l){!(l instanceof L.R5),P.Y.error(l,r);return}}async getAheadBehindCommitCount(e,t){}async getBlame(e,t){const r=P.Y.getCorrelationContext();if(t==null?void 0:t.isDirty)return;let l="blame";e.sha!=null&&(l+=`:${e.sha}`);const g=await this.container.tracker.getOrAdd(e);if(g.state!=null){const v=g.state.getBlame(l);if(v!=null)return P.Y.debug(r,`Cache hit: '${l}'`),v.item}P.Y.debug(r,`Cache miss: '${l}'`),g.state==null&&(g.state=new Te.p2(g.key));const d=this.getBlameCore(e,g,l,r);if(g.state!=null){P.Y.debug(r,`Cache add: '${l}'`);const v={item:d};g.state.setBlame(l,v)}return d}async getBlameCore(e,t,r,l){var g,d;try{const v=await this.ensureRepositoryContext(e.repoPath);if(v==null)return;const{metadata:m,github:R,remotehub:D,session:E}=v,S=D.getVirtualUri(D.getProviderRootUri(e)),x=this.getRelativePath(e,S);if(e.scheme===k.sN.Virtual){const[A,H]=await Promise.allSettled([O.workspace.fs.stat(e),O.workspace.fs.stat(e.with({scheme:k.sN.GitHub}))]);if(A.status!=="fulfilled"||H.status!=="fulfilled"||A.value.mtime!==H.value.mtime)return}const j=!e.sha||e.sha==="HEAD"?(await m.getRevision()).revision:e.sha,J=await R.getBlame(E.accessToken,m.repo.owner,m.repo.name,j,x),_=new Map,U=new Map,B=[];for(const A of J.ranges){const H=A.commit,{viewer:Z=E.account.label}=J,N=Z!=null&&H.author.name===Z?"You":H.author.name,X=Z!=null&&H.committer.name===Z?"You":H.committer.name;let z=_.get(N);z==null&&(z={name:N,lineCount:0},_.set(N,z)),z.lineCount+=A.endingLine-A.startingLine+1;let Q=U.get(H.oid);Q==null&&(Q=new b.GitCommit(this.container,e.repoPath,H.oid,new b.GitCommitIdentity(N,H.author.email,new Date(H.author.date),H.author.avatarUrl),new b.GitCommitIdentity(X,H.committer.email,new Date(H.author.date)),H.message.split(`
`,1)[0],((g=H.parents.nodes[0])==null?void 0:g.oid)?[(d=H.parents.nodes[0])==null?void 0:d.oid]:[],H.message,new b.GitFileChange(S.toString(),x,b.GitFileIndexStatus.Modified),{changedFiles:H.changedFiles??0,additions:H.additions??0,deletions:H.deletions??0},[]),U.set(H.oid,Q));for(let be=A.startingLine;be<=A.endingLine;be++){const xe={sha:H.oid,originalLine:be,line:be};Q.lines.push(xe),B[be-1]=xe}}const G=new Map([..._.entries()].sort((A,H)=>H[1].lineCount-A[1].lineCount));return{repoPath:e.repoPath,authors:G,commits:U,lines:B}}catch(v){if(t.state!=null&&!/No provider registered with/.test(String(v))){const m=(v==null?void 0:v.toString())??"";P.Y.debug(l,`Cache replace (with empty promise): '${r}'`);const R={item:Fe,errorMessage:m};return t.state.setBlame(r,R),t.setBlameFailure(),Fe}return}}async getBlameContents(e,t){}async getBlameForLine(e,t,r,l){var g,d;const v=P.Y.getCorrelationContext();if(!(r==null?void 0:r.isDirty)){if(!(l==null?void 0:l.forceSingleLine)){const m=await this.getBlame(e);if(m==null)return;let R=m.lines[t];if(R==null){if(m.lines.length!==t)return;R=m.lines[t-1]}const D=m.commits.get(R.sha);if(D==null)return;const E=m.authors.get(D.author.name);return{author:se(ne({},E),{lineCount:D.lines.length}),commit:D,line:R}}try{const m=await this.ensureRepositoryContext(e.repoPath);if(m==null)return;const{metadata:R,github:D,remotehub:E,session:S}=m,x=E.getVirtualUri(E.getProviderRootUri(e)),j=this.getRelativePath(e,x),J=!e.sha||e.sha==="HEAD"?(await R.getRevision()).revision:e.sha,_=await D.getBlame(S.accessToken,R.repo.owner,R.repo.name,J,j),U=t+1,B=_.ranges.find(X=>X.startingLine===U);if(B==null)return;const G=B.commit,{viewer:A=S.account.label}=_,H=A!=null&&G.author.name===A?"You":G.author.name,Z=A!=null&&G.committer.name===A?"You":G.committer.name,N=new b.GitCommit(this.container,e.repoPath,G.oid,new b.GitCommitIdentity(H,G.author.email,new Date(G.author.date),G.author.avatarUrl),new b.GitCommitIdentity(Z,G.committer.email,new Date(G.author.date)),G.message.split(`
`,1)[0],((g=G.parents.nodes[0])==null?void 0:g.oid)?[(d=G.parents.nodes[0])==null?void 0:d.oid]:[],G.message,new b.GitFileChange(x.toString(),j,b.GitFileIndexStatus.Modified),{changedFiles:G.changedFiles??0,additions:G.additions??0,deletions:G.deletions??0},[]);for(let X=B.startingLine;X<=B.endingLine;X++){const z={sha:G.oid,originalLine:X,line:X};N.lines.push(z)}return{author:{name:H,lineCount:B.endingLine-B.startingLine+1},commit:N,line:{sha:G.oid,originalLine:B.startingLine,line:B.startingLine}}}catch(m){P.Y.error(v,m);return}}}async getBlameForLineContents(e,t,r,l){}async getBlameForRange(e,t){const r=await this.getBlame(e);if(r!=null)return this.getBlameRange(r,e,t)}async getBlameForRangeContents(e,t,r){const l=await this.getBlameContents(e,r);if(l!=null)return this.getBlameRange(l,e,t)}getBlameRange(e,t,r){if(e.lines.length===0)return ne({allLines:e.lines},e);if(r.start.line===0&&r.end.line===e.lines.length-1)return ne({allLines:e.lines},e);const l=e.lines.slice(r.start.line,r.end.line+1),g=new Set(l.map(E=>E.sha)),d=r.start.line+1,v=r.end.line+1,m=new Map,R=new Map;for(const E of e.commits.values()){if(!g.has(E.sha))continue;const S=E.with({lines:E.lines.filter(j=>j.line>=d&&j.line<=v)});R.set(E.sha,S);let x=m.get(S.author.name);x==null&&(x={name:S.author.name,lineCount:0},m.set(x.name,x)),x.lineCount+=S.lines.length}const D=new Map([...m.entries()].sort((E,S)=>S[1].lineCount-E[1].lineCount));return{repoPath:t.repoPath,authors:D,commits:R,lines:l,allLines:e.lines}}async getBranch(e){const{values:[t]}=await this.getBranches(e,{filter:r=>r.current});return t}async getBranches(e,t){if(e==null)return Pe;const r=P.Y.getCorrelationContext();let l=(t==null?void 0:t.cursor)?void 0:this._branchesCache.get(e);if(l==null){async function d(){var v;try{const{metadata:m,github:R,session:D}=await this.ensureRepositoryContext(e),E=await m.getRevision(),S=E.type===0?E.name:void 0,x=[];let j=t==null?void 0:t.cursor;const J=j==null;for(;;){const _=await R.getBranches(D.accessToken,m.repo.owner,m.repo.name,{cursor:j});for(const U of _.values){const B=new Date(this.container.config.advanced.commitOrdering==="author-date"?U.target.authoredDate:U.target.committedDate),G=U.target.oid;x.push(new b.GitBranch(e,U.name,!1,U.name===S,B,G,{name:`origin/${U.name}`,missing:!1}),new b.GitBranch(e,`origin/${U.name}`,!0,!1,B,G))}if(!((v=_.paging)==null?void 0:v.more)||!J)return se(ne({},_),{values:x});j=_.paging.cursor}}catch(m){return P.Y.error(m,r),this._branchesCache.delete(e),Pe}}p(d,"load"),l=d.call(this),(t==null?void 0:t.cursor)==null&&this._branchesCache.set(e,l)}let g=await l;return(t==null?void 0:t.filter)!=null&&(g=se(ne({},g),{values:g.values.filter(t.filter)})),(t==null?void 0:t.sort)!=null&&b.GitBranch.sort(g.values,typeof t.sort=="boolean"?void 0:t.sort),g}async getChangedFilesCount(e,t){if(!t)return;const r=await this.getCommit(e,t);if((r==null?void 0:r.stats)==null)return;const{stats:l}=r,g=typeof l.changedFiles=="number"?l.changedFiles:l.changedFiles.added+l.changedFiles.changed+l.changedFiles.deleted;return{additions:l.additions,deletions:l.deletions,changedFiles:g}}async getCommit(e,t){var r;if(e==null)return;const l=P.Y.getCorrelationContext();try{const{metadata:g,github:d,session:v}=await this.ensureRepositoryContext(e),m=await d.getCommit(v.accessToken,g.repo.owner,g.repo.name,t);if(m==null)return;const{viewer:R=v.account.label}=m,D=R!=null&&m.author.name===R?"You":m.author.name,E=R!=null&&m.committer.name===R?"You":m.committer.name;return new b.GitCommit(this.container,e,m.oid,new b.GitCommitIdentity(D,m.author.email,new Date(m.author.date),m.author.avatarUrl),new b.GitCommitIdentity(E,m.committer.email,new Date(m.committer.date)),m.message.split(`
`,1)[0],m.parents.nodes.map(S=>S.oid),m.message,((r=m.files)==null?void 0:r.map(S=>new b.GitFileChange(e,S.filename??"",(0,Se.fromCommitFileStatus)(S.status)??b.GitFileIndexStatus.Modified,S.previous_filename,void 0,{additions:S.additions??0,deletions:S.deletions??0,changes:S.changes??0})))??[],{changedFiles:m.changedFiles??0,additions:m.additions??0,deletions:m.deletions??0},[])}catch(g){P.Y.error(g,l);return}}async getCommitBranches(e,t,r){if(e==null||(r==null?void 0:r.commitDate)==null)return[];const l=P.Y.getCorrelationContext();try{const{metadata:g,github:d,session:v}=await this.ensureRepositoryContext(e);let m;return(r==null?void 0:r.branch)?m=await d.getCommitOnBranch(v.accessToken,g.repo.owner,g.repo.name,r==null?void 0:r.branch,t,r==null?void 0:r.commitDate):m=await d.getCommitBranches(v.accessToken,g.repo.owner,g.repo.name,t,r==null?void 0:r.commitDate),m}catch(g){return P.Y.error(g,l),[]}}async getCommitCount(e,t){if(e==null)return;const r=P.Y.getCorrelationContext();try{const{metadata:l,github:g,session:d}=await this.ensureRepositoryContext(e);return await g.getCommitCount(d==null?void 0:d.accessToken,l.repo.owner,l.repo.name,t)}catch(l){P.Y.error(l,r);return}}async getCommitForFile(e,t,r){var l;if(e==null)return;const g=P.Y.getCorrelationContext();try{const{metadata:d,github:v,remotehub:m,session:R}=await this.ensureRepositoryContext(e),D=this.getRelativePath(t,m.getProviderRootUri(t)),E=!(r==null?void 0:r.ref)||r.ref==="HEAD"?(await d.getRevision()).revision:r.ref,S=await v.getCommitForFile(R.accessToken,d.repo.owner,d.repo.name,E,D);if(S==null)return;const{viewer:x=R.account.label}=S,j=x!=null&&S.author.name===x?"You":S.author.name,J=x!=null&&S.committer.name===x?"You":S.committer.name,_=(l=S.files)==null?void 0:l.map(B=>new b.GitFileChange(e,B.filename??"",(0,Se.fromCommitFileStatus)(B.status)??b.GitFileIndexStatus.Modified,B.previous_filename,void 0,{additions:B.additions??0,deletions:B.deletions??0,changes:B.changes??0})),U=_==null?void 0:_.find(B=>B.path===D);return new b.GitCommit(this.container,e,S.oid,new b.GitCommitIdentity(j,S.author.email,new Date(S.author.date),S.author.avatarUrl),new b.GitCommitIdentity(J,S.committer.email,new Date(S.committer.date)),S.message.split(`
`,1)[0],S.parents.nodes.map(B=>B.oid),S.message,{file:U,files:_},{changedFiles:S.changedFiles??0,additions:S.additions??0,deletions:S.deletions??0},[])}catch(d){P.Y.error(d,g);return}}async getOldestUnpushedRefForFile(e,t){}async getContributors(e,t){if(e==null)return[];const r=P.Y.getCorrelationContext();try{const{metadata:l,github:g,session:d}=await this.ensureRepositoryContext(e),v=await g.getContributors(d.accessToken,l.repo.owner,l.repo.name),m=await this.getCurrentUser(e),R=[];for(const D of v)D.type==="User"&&R.push(new b.GitContributor(e,D.name,D.email,D.contributions,void 0,(0,b.isUserMatch)(m,D.name,D.email,D.login),void 0,D.login,D.avatar_url,D.node_id));return R}catch(l){return P.Y.error(l,r),[]}}async getCurrentUser(e){if(!e)return;const t=P.Y.getCorrelationContext(),r=this._repoInfoCache.get(e);let l=r==null?void 0:r.user;if(l!=null)return l;if(l!==null)try{const{metadata:g,github:d,session:v}=await this.ensureRepositoryContext(e);return l=await d.getCurrentUser(v.accessToken,g.repo.owner,g.repo.name),this._repoInfoCache.set(e,se(ne({},r),{user:l??null})),l}catch(g){P.Y.error(g,t),this._repoInfoCache.set(e,se(ne({},r),{user:null}));return}}async getDefaultBranchName(e,t){if(e==null)return;const r=P.Y.getCorrelationContext();try{const{metadata:l,github:g,session:d}=await this.ensureRepositoryContext(e);return await g.getDefaultBranchName(d.accessToken,l.repo.owner,l.repo.name)}catch(l){P.Y.error(l,r);return}}async getDiffForFile(e,t,r){}async getDiffForFileContents(e,t,r){}async getDiffForLine(e,t,r,l){}async getDiffStatus(e,t,r,l){}async getFileStatusForCommit(e,t,r){if(r===b.GitRevision.deletedOrMissing||b.GitRevision.isUncommitted(r))return;const l=await this.getCommitForFile(e,t,{ref:r});if(l!=null)return l.findFile(t)}async getLastFetchedTimestamp(e){}async getLog(e,t){var r,l,g;if(e==null)return;const d=P.Y.getCorrelationContext(),v=this.getPagingLimit(t==null?void 0:t.limit);try{const{metadata:m,github:R,session:D}=await this.ensureRepositoryContext(e),E=!(t==null?void 0:t.ref)||t.ref==="HEAD"?(await m.getRevision()).revision:t.ref,S=await R.getCommits(D.accessToken,m.repo.owner,m.repo.name,E,{all:t==null?void 0:t.all,authors:t==null?void 0:t.authors,after:t==null?void 0:t.cursor,limit:v,since:(t==null?void 0:t.since)?new Date(t.since):void 0}),x=new Map,{viewer:j=D.account.label}=S;for(const _ of S.values){const U=j!=null&&_.author.name===j?"You":_.author.name,B=j!=null&&_.committer.name===j?"You":_.committer.name;let G=x.get(_.oid);G==null&&(G=new b.GitCommit(this.container,e,_.oid,new b.GitCommitIdentity(U,_.author.email,new Date(_.author.date),_.author.avatarUrl),new b.GitCommitIdentity(B,_.committer.email,new Date(_.committer.date)),_.message.split(`
`,1)[0],_.parents.nodes.map(A=>A.oid),_.message,(r=_.files)==null?void 0:r.map(A=>new b.GitFileChange(e,A.filename??"",(0,Se.fromCommitFileStatus)(A.status)??b.GitFileIndexStatus.Modified,A.previous_filename,void 0,{additions:A.additions??0,deletions:A.deletions??0,changes:A.changes??0})),{changedFiles:_.changedFiles??0,additions:_.additions??0,deletions:_.deletions??0},[]),x.set(_.oid,G))}const J={repoPath:e,commits:x,sha:E,range:void 0,count:x.size,limit:v,hasMore:((l=S.paging)==null?void 0:l.more)??!1,cursor:(g=S.paging)==null?void 0:g.cursor,query:_=>this.getLog(e,se(ne({},t),{limit:_}))};return J.hasMore&&(J.more=this.getLogMoreFn(J,t)),J}catch(m){P.Y.error(m,d);return}}async getLogRefsOnly(e,t){const r=await this.getLog(e,t);if(r!=null)return new Set([...r.commits.values()].map(l=>l.ref))}getLogMoreFn(e,t){return async r=>{const l=r!=null&&typeof r=="object"?r.until:void 0;let g=typeof r=="number"?r:void 0;if(l&&(0,Re.G)(e.commits.values(),R=>R.ref===l))return e;g=this.getPagingLimit(g);const d=await this.getLog(e.repoPath,se(ne({},t),{limit:g,cursor:e.cursor}));if(d==null)return se(ne({},e),{hasMore:!1});const v=new Map([...e.commits,...d.commits]),m={repoPath:e.repoPath,commits:v,sha:e.sha,range:void 0,count:v.size,limit:l==null?(e.limit??0)+g:void 0,hasMore:l==null?d.hasMore:!0,cursor:d.cursor,query:e.query};return m.more=this.getLogMoreFn(m,t),m}}async getLogForSearch(e,t,r){var l,g,d;if(e==null)return;const v=P.Y.getCorrelationContext(),m=pe.n.parseSearchOperations(t.pattern);let R,D=m.get("commit:");if(D!=null){const x=await this.getCommit(e,D[0]);return x==null?void 0:{repoPath:e,commits:new Map([[x.sha,x]]),sha:x.sha,range:void 0,count:1,limit:1,hasMore:!1}}const E=[];for([R,D]of m.entries())switch(R){case"message:":E.push(...D.map(x=>x.replace(/ /g,"+")));break;case"author:":E.push(...D.map(x=>(x=x.replace(/ /g,"+"),x.startsWith("@")?`author:${x.slice(1)}`:x.startsWith('"@')?`author:"${x.slice(2)}`:x.includes("@")?`author-email:${x}`:`author-name:${x}`)));break}if(E.length===0)return;const S=this.getPagingLimit(r==null?void 0:r.limit);try{const{metadata:x,github:j,session:J}=await this.ensureRepositoryContext(e),_=await j.searchCommits(J.accessToken,`repo:${x.repo.owner}/${x.repo.name}+${E.join("+").trim()}`,{cursor:r==null?void 0:r.cursor,limit:S,sort:(r==null?void 0:r.ordering)==="date"?"committer-date":(r==null?void 0:r.ordering)==="author-date"?"author-date":void 0});if(_==null)return;const U=new Map,B=J.account.label;for(const A of _.values){const H=B!=null&&A.author.name===B?"You":A.author.name,Z=B!=null&&A.committer.name===B?"You":A.committer.name;let N=U.get(A.oid);N==null&&(N=new b.GitCommit(this.container,e,A.oid,new b.GitCommitIdentity(H,A.author.email,new Date(A.author.date),A.author.avatarUrl),new b.GitCommitIdentity(Z,A.committer.email,new Date(A.committer.date)),A.message.split(`
`,1)[0],A.parents.nodes.map(X=>X.oid),A.message,(l=A.files)==null?void 0:l.map(X=>new b.GitFileChange(e,X.filename??"",(0,Se.fromCommitFileStatus)(X.status)??b.GitFileIndexStatus.Modified,X.previous_filename,void 0,{additions:X.additions??0,deletions:X.deletions??0,changes:X.changes??0})),{changedFiles:A.changedFiles??0,additions:A.additions??0,deletions:A.deletions??0},[]),U.set(A.oid,N))}const G={repoPath:e,commits:U,sha:void 0,range:void 0,count:U.size,limit:S,hasMore:((g=_.pageInfo)==null?void 0:g.hasNextPage)??!1,cursor:((d=_.pageInfo)==null?void 0:d.endCursor)??void 0,query:A=>this.getLog(e,se(ne({},r),{limit:A}))};return G.hasMore&&(G.more=this.getLogForSearchMoreFn(G,t,r)),G}catch(x){P.Y.error(x,v);return}}getLogForSearchMoreFn(e,t,r){return async l=>{l=this.getPagingLimit(l);const g=await this.getLogForSearch(e.repoPath,t,se(ne({},r),{limit:l,cursor:e.cursor}));if(g==null)return se(ne({},e),{hasMore:!1});const d=new Map([...e.commits,...g.commits]),v={repoPath:e.repoPath,commits:d,sha:e.sha,range:void 0,count:d.size,limit:(e.limit??0)+l,hasMore:g.hasMore,cursor:g.cursor,query:e.query};return v.more=this.getLogForSearchMoreFn(v,t,r),v}}async getLogForFile(e,t,r){if(e==null)return;const l=P.Y.getCorrelationContext(),g=this.getRelativePath(t,e);if(e!=null&&e===g)throw new Error(`File name cannot match the repository path; path=${g}`);r=ne({reverse:!1},r),r.renames=!1,r.all=!1;let d="log";r.ref!=null&&(d+=`:${r.ref}`),r.limit=this.getPagingLimit(r==null?void 0:r.limit),r.limit&&(d+=`:n${r.limit}`),r.renames&&(d+=":follow"),r.reverse&&(d+=":reverse"),r.since&&(d+=`:since=${r.since}`),r.skip&&(d+=`:skip${r.skip}`),r.cursor&&(d+=`:cursor=${r.cursor}`);const v=await this.container.tracker.getOrAdd(ue.YY.fromFile(g,e,r.ref));if(!r.force&&r.range==null){if(v.state!=null){const R=v.state.getLog(d);if(R!=null)return P.Y.debug(l,`Cache hit: '${d}'`),R.item;if(r.ref!=null||r.limit!=null){const D=v.state.getLog(`log${r.renames?":follow":""}${r.reverse?":reverse":""}`);if(D!=null){if(r.ref==null)return P.Y.debug(l,`Cache hit: ~'${d}'`),D.item;P.Y.debug(l,`Cache ?: '${d}'`);let E=await D.item;if(E!=null&&!E.hasMore&&E.commits.has(r.ref)){P.Y.debug(l,`Cache hit: '${d}'`);let S=!0,x=0;const j=new Map((0,Re.DZ)(E.commits.entries(),([_,U])=>{if(S){if(_!==(r==null?void 0:r.ref))return;S=!1}if(x++,!((r==null?void 0:r.limit)!=null&&x>r.limit))return[_,U]})),J=ne({},r);return E=se(ne({},E),{limit:r.limit,count:j.size,commits:j,query:_=>this.getLogForFile(e,t,se(ne({},J),{limit:_}))}),E}}}}P.Y.debug(l,`Cache miss: '${d}'`),v.state==null&&(v.state=new Te.p2(v.key))}const m=this.getLogForFileCore(e,g,v,d,l,r);if(v.state!=null&&r.range==null){P.Y.debug(l,`Cache add: '${d}'`);const R={item:m};v.state.setLog(d,R)}return m}async getLogForFileCore(e,t,r,l,g,d){var v,m,R;if(e==null)return;const D=this.getPagingLimit(d==null?void 0:d.limit);try{const E=await this.ensureRepositoryContext(e);if(E==null)return;const{metadata:S,github:x,remotehub:j,session:J}=E,_=this.getAbsoluteUri(t,e),U=this.getRelativePath(_,j.getProviderRootUri(_)),B=!(d==null?void 0:d.ref)||d.ref==="HEAD"?(await S.getRevision()).revision:d.ref,G=await x.getCommits(J.accessToken,S.repo.owner,S.repo.name,B,{all:d==null?void 0:d.all,after:d==null?void 0:d.cursor,path:U,limit:D,since:(d==null?void 0:d.since)?new Date(d.since):void 0}),A=new Map,{viewer:H=J.account.label}=G;for(const N of G.values){const X=H!=null&&N.author.name===H?"You":N.author.name,z=H!=null&&N.committer.name===H?"You":N.committer.name;let Q=A.get(N.oid);if(Q==null){const be=(v=N.files)==null?void 0:v.map(ye=>new b.GitFileChange(e,ye.filename??"",(0,Se.fromCommitFileStatus)(ye.status)??b.GitFileIndexStatus.Modified,ye.previous_filename,void 0,{additions:ye.additions??0,deletions:ye.deletions??0,changes:ye.changes??0})),xe=(0,ve.Mh)(U)?void 0:(be==null?void 0:be.find(ye=>ye.path===U))??new b.GitFileChange(e,U,b.GitFileIndexStatus.Modified,void 0,void 0,N.changedFiles===1?{additions:N.additions??0,deletions:N.deletions??0,changes:0}:void 0);Q=new b.GitCommit(this.container,e,N.oid,new b.GitCommitIdentity(X,N.author.email,new Date(N.author.date),N.author.avatarUrl),new b.GitCommitIdentity(z,N.committer.email,new Date(N.committer.date)),N.message.split(`
`,1)[0],N.parents.nodes.map(ye=>ye.oid),N.message,{file:xe,files:be},{changedFiles:N.changedFiles??0,additions:N.additions??0,deletions:N.deletions??0},[]),A.set(N.oid,Q)}}const Z={repoPath:e,commits:A,sha:B,range:void 0,count:A.size,limit:D,hasMore:((m=G.paging)==null?void 0:m.more)??!1,cursor:(R=G.paging)==null?void 0:R.cursor,query:N=>this.getLogForFile(e,t,se(ne({},d),{limit:N}))};return Z.hasMore&&(Z.more=this.getLogForFileMoreFn(Z,t,d)),Z}catch(E){if(r.state!=null&&(d==null?void 0:d.range)==null&&!(d==null?void 0:d.reverse)){const S=(E==null?void 0:E.toString())??"";P.Y.debug(g,`Cache replace (with empty promise): '${l}'`);const x={item:Fe,errorMessage:S};return r.state.setLog(l,x),Fe}return}}getLogForFileMoreFn(e,t,r){return async l=>{const g=l!=null&&typeof l=="object"?l.until:void 0;let d=typeof l=="number"?l:void 0;if(g&&(0,Re.G)(e.commits.values(),D=>D.ref===g))return e;d=this.getPagingLimit(d);const v=await this.getLogForFile(e.repoPath,t,se(ne({},r),{limit:g==null?d:0,cursor:e.cursor}));if(v==null)return se(ne({},e),{hasMore:!1});const m=new Map([...e.commits,...v.commits]),R={repoPath:e.repoPath,commits:m,sha:e.sha,range:e.range,count:m.size,limit:g==null?(e.limit??0)+d:void 0,hasMore:g==null?v.hasMore:!0,cursor:v.cursor,query:e.query};return R.more=this.getLogForFileMoreFn(R,t,r),R}}async getMergeBase(e,t,r,l){}async getMergeStatus(e){}async getRebaseStatus(e){}async getNextComparisonUris(e,t,r,l=0){if(!r)return;const g=P.Y.getCorrelationContext();try{const d=await this.ensureRepositoryContext(e);if(d==null)return;const{metadata:v,github:m,remotehub:R,session:D}=d,E=this.getRelativePath(t,R.getProviderRootUri(t)),S=(await v.getRevision()).revision;r==="HEAD"&&(r=S);const x=await m.getNextCommitRefs(D.accessToken,v.repo.owner,v.repo.name,S,E,r);return{current:l===0?ue.YY.fromFile(E,e,r):new ue.YY(await this.getBestRevisionUri(e,E,x[l-1])),next:new ue.YY(await this.getBestRevisionUri(e,E,x[l]))}}catch(d){throw P.Y.error(d,g),d}}async getPreviousComparisonUris(e,t,r,l=0,g=!1){var d,v;if(r===b.GitRevision.deletedOrMissing)return;const m=P.Y.getCorrelationContext();r===b.GitRevision.uncommitted&&(r=void 0);try{const R=await this.ensureRepositoryContext(e);if(R==null)return;const{metadata:D,github:E,remotehub:S,session:x}=R,j=this.getRelativePath(t,S.getProviderRootUri(t)),J=r!=null?1:0,_=await E.getCommitRefs(x.accessToken,D.repo.owner,D.repo.name,!r||r==="HEAD"?(await D.getRevision()).revision:r,{path:j,first:J+l+1});if(_==null)return;const U=l===0?ue.YY.fromFile(j,e,r):new ue.YY(await this.getBestRevisionUri(e,j,((d=_.values[J+l-1])==null?void 0:d.oid)??b.GitRevision.deletedOrMissing));return U==null||U.sha===b.GitRevision.deletedOrMissing?void 0:{current:U,previous:new ue.YY(await this.getBestRevisionUri(e,j,((v=_.values[J+l])==null?void 0:v.oid)??b.GitRevision.deletedOrMissing))}}catch(R){throw P.Y.error(R,m),R}}async getPreviousComparisonUrisForLine(e,t,r,l,g=0){var d,v;if(l===b.GitRevision.deletedOrMissing)return;const m=P.Y.getCorrelationContext();try{const R=await this.ensureRepositoryContext(e);if(R==null)return;const{remotehub:D}=R;let E=this.getRelativePath(t,D.getProviderRootUri(t)),S=ue.YY.fromFile(E,e,l),x=r,j,J=r,_=r;for(let U=0;U<Math.max(0,g)+2;U++){const B=await this.getBlameForLine(j??S,_,void 0,{forceSingleLine:!0});if(B==null)break;l=B.commit.sha,E=((d=B.commit.file)==null?void 0:d.path)??((v=B.commit.file)==null?void 0:v.originalPath)??E,_=B.line.originalLine-1;const G=ue.YY.fromFile(E,e,l);j==null?(j=G,J=_):(S=j,x=J,j=G,J=_)}return S==null?void 0:{current:S,previous:j,line:(x??r)+1}}catch(R){throw P.Y.error(R,m),R}}async getIncomingActivity(e,t){}async getRemotes(e,t){if(e==null)return[];const r=(t==null?void 0:t.providers)??he.c.loadProviders(W.DN.get("remotes",null)),l=O.Uri.parse(e,!0),[,g,d]=l.path.split("/",3),v=`https://github.com/${g}/${d}.git`,m="github.com",R=`${g}/${d}`;return[new b.GitRemote(e,`${m}/${R}`,"origin","https",m,R,he.c.factory(r)(v,m,R),[{type:b.GitRemoteType.Fetch,url:v},{type:b.GitRemoteType.Push,url:v}])]}async getRevisionContent(e,t,r){const l=r?this.createProviderUri(e,r,t):this.createVirtualUri(e,r,t);return O.workspace.fs.readFile(l)}async getStash(e){}async getStatusForFile(e,t){}async getStatusForFiles(e,t){}async getStatusForRepo(e){}async getTags(e,t){if(e==null)return Pe;const r=P.Y.getCorrelationContext();let l=(t==null?void 0:t.cursor)?void 0:this._tagsCache.get(e);if(l==null){async function d(){var v,m,R;try{const{metadata:D,github:E,session:S}=await this.ensureRepositoryContext(e),x=[];let j=t==null?void 0:t.cursor;const J=j==null;for(;;){const _=await E.getTags(S.accessToken,D.repo.owner,D.repo.name,{cursor:j});for(const U of _.values)x.push(new b.GitTag(e,U.name,U.target.oid,U.target.message??"",new Date(U.target.authoredDate??((v=U.target.tagger)==null?void 0:v.date)),new Date(U.target.committedDate??((m=U.target.tagger)==null?void 0:m.date))));if(!((R=_.paging)==null?void 0:R.more)||!J)return se(ne({},_),{values:x});j=_.paging.cursor}}catch(D){return P.Y.error(D,r),this._tagsCache.delete(e),Pe}}p(d,"load"),l=d.call(this),(t==null?void 0:t.cursor)==null&&this._tagsCache.set(e,l)}let g=await l;return(t==null?void 0:t.filter)!=null&&(g=se(ne({},g),{values:g.values.filter(t.filter)})),(t==null?void 0:t.sort)!=null&&b.GitTag.sort(g.values,typeof t.sort=="boolean"?void 0:t.sort),g}async getTreeEntryForRevision(e,t,r){if(e==null||!t)return;if(r==="HEAD"){const d=await this.ensureRepositoryContext(e);if(d==null)return;const v=await d.metadata.getRevision();r=v==null?void 0:v.revision}const l=r?this.createProviderUri(e,r,t):this.createVirtualUri(e,r,t),g=await O.workspace.fs.stat(l);if(g!=null)return{path:this.getRelativePath(l,e),commitSha:r,size:g.size,type:g.type===O.FileType.Directory?"tree":"blob"}}async getTreeForRevision(e,t){if(e==null)return[];if(t==="HEAD"){const d=await this.ensureRepositoryContext(e);if(d==null)return[];const v=await d.metadata.getRevision();t=v==null?void 0:v.revision}const r=t?this.createProviderUri(e,t):this.createVirtualUri(e,t),l=await O.workspace.fs.readDirectory(r);if(l==null)return[];const g=[];for(const[d,v]of l){const m=this.getAbsoluteUri(d,r);g.push({path:this.getRelativePath(d,m),commitSha:t,size:0,type:v===O.FileType.Directory?"tree":"blob"})}return[]}async hasBranchOrTag(e,t){var r,l;const[{values:g},{values:d}]=await Promise.all([this.getBranches(e,{filter:(r=t==null?void 0:t.filter)==null?void 0:r.branches,sort:!1}),this.getTags(e,{filter:(l=t==null?void 0:t.filter)==null?void 0:l.tags,sort:!1})]);return g.length!==0||d.length!==0}async hasCommitBeenPushed(e,t){return!0}isTrackable(e){return this.supportedSchemes.has(e.scheme)}async getDiffTool(e){}async openDiffTool(e,t,r){}async openDirectoryCompare(e,t,r,l){}async resolveReference(e,t,r,l){if(!t||t===b.GitRevision.deletedOrMissing||r==null&&b.GitRevision.isSha(t)||r!=null&&b.GitRevision.isUncommitted(t))return t;let g;if(r!=null)g=this.getRelativePath(r,e);else if(!b.GitRevision.isShaLike(t)||t.endsWith("^3"))return t;const d=await this.ensureRepositoryContext(e);if(d==null)return t;const{metadata:v,github:m,session:R}=d,D=await m.resolveReference(R.accessToken,v.repo.owner,v.repo.name,t,g);return D??(g?b.GitRevision.deletedOrMissing:t)}async validateBranchOrTagName(e,t){return ze.test(e)}async validateReference(e,t){return!0}async stageFile(e,t){}async stageDirectory(e,t){}async unStageFile(e,t){}async unStageDirectory(e,t){}async stashApply(e,t,r){}async stashDelete(e,t,r){}async stashSave(e,t,r,l){}async ensureRepositoryContext(e,t){let r=O.Uri.parse(e,!0);if(!/^github\+?/.test(r.authority))throw new L.kX(e,L.sh.NotAGitHubRepository);if(!t){const m=this.container.git.getRepository(r);if(m==null)throw new L.kX(e,L.sh.NotAGitHubRepository);r=m.uri}let l=this._remotehub;if(l==null)try{l=await this.ensureRemoteHubApi()}catch(m){throw!(m instanceof L.R5),new L.kX(e,L.sh.RemoteHubApiNotFound,m)}const g=await(l==null?void 0:l.getMetadata(r));if((g==null?void 0:g.provider.id)!=="github")throw new L.kX(e,L.sh.NotAGitHubRepository);let d,v;try{[d,v]=await Promise.all([this.ensureGitHub(),this.ensureSession()])}catch(m){throw m instanceof L._7?new L.kX(e,m.reason===L.Jx.UserDidNotConsent?L.sh.GitHubAuthenticationDenied:L.sh.GitHubAuthenticationNotFound,m):new L.kX(e)}if(d==null)throw new L.kX(e);return{github:d,metadata:g,remotehub:l,session:v}}async ensureGitHub(){if(this._github==null){const e=await this.container.github;e!=null&&this._disposables.push(e.onDidReauthenticate(()=>{this._sessionPromise=void 0,this.ensureSession(!0)})),this._github=e}return this._github}async ensureRemoteHubApi(e){if(this._remotehubPromise==null&&(this._remotehubPromise=Ue(),this._remotehubPromise.then(t=>this._remotehub=t,()=>this._remotehub=void 0)),!e)return this._remotehubPromise;try{return await this._remotehubPromise}catch{return}}async ensureSession(e=!1){if(this._sessionPromise==null){async function t(){try{return e?await O.authentication.getSession("github",Ae,{forceNewSession:!0}):await O.authentication.getSession("github",Ae,{createIfNone:!0})}catch(r){throw r instanceof Error&&r.message.includes("User did not consent")?new L._7("github",L.Jx.UserDidNotConsent):(P.Y.error(r),new L._7("github",void 0,r))}}p(t,"getSession"),this._sessionPromise=t()}return this._sessionPromise}createVirtualUri(e,t,r){let l;if(typeof t=="string")t&&(b.GitRevision.isSha(t)?l={v:1,ref:{id:t,type:2}}:l={v:1,ref:{id:t,type:4}});else switch(t==null?void 0:t.refType){case"revision":case"stash":l={v:1,ref:{id:t.ref,type:2}};break;case"branch":case"tag":l={v:1,ref:{id:t.name,type:4}};break}if(typeof e=="string"&&(e=O.Uri.parse(e,!0)),r){let g=e.path;g.endsWith("/")&&(g=g.slice(0,-1)),r=this.getRelativePath(r,e),r=`${g}/${r.startsWith("/")?r.slice(0,-1):r}`}return e.with({scheme:k.sN.Virtual,authority:Oe("github",l),path:r??e.path})}createProviderUri(e,t,r){const l=this.createVirtualUri(e,t,r);return this._remotehub==null?l.scheme!==k.sN.Virtual?l:l.with({scheme:k.sN.GitHub}):this._remotehub.getProviderUri(l)}getPagingLimit(e){return e=Math.min(100,e??this.container.config.advanced.maxListItems??100),e===0&&(e=100),e}async resolveReferenceCore(e,t,r){var l,g;if(r==null||r==="HEAD")return(await t.getRevision()).revision;if(b.GitRevision.isSha(r))return r;if(b.GitRevision.isRange(r))return;const[d,v]=await Promise.allSettled([this.getBranches(e,{filter:m=>m.name===r}),this.getTags(e,{filter:m=>m.name===r})]);return r=(d.status==="fulfilled"?(l=d.value.values[0])==null?void 0:l.sha:void 0)??(v.status==="fulfilled"?(g=v.value.values[0])==null?void 0:g.sha:void 0),r==null,r}}p(C,"GitHubGitProvider"),w([(0,$.cM)()],C.prototype,"getBestRevisionUri",1),w([(0,$.cM)()],C.prototype,"getWorkingUri",1),w([(0,$.cM)()],C.prototype,"addRemote",1),w([(0,$.cM)()],C.prototype,"pruneRemote",1),w([(0,$.cM)()],C.prototype,"applyChangesToWorkingFile",1),w([(0,$.cM)()],C.prototype,"branchContainsCommit",1),w([(0,$.cM)()],C.prototype,"checkout",1),w([(0,$.cM)()],C.prototype,"resetCaches",1),w([(0,$.cM)({args:{1:q=>q.length}})],C.prototype,"excludeIgnoredUris",1),w([(0,$.cM)()],C.prototype,"fetch",1),w([(0,fe.H)(),(0,$.fF)()],C.prototype,"findRepositoryUri",1),w([(0,$.cM)({args:{1:q=>q.join(",")}})],C.prototype,"getAheadBehindCommitCount",1),w([(0,fe.H)(),(0,$.cM)()],C.prototype,"getBlame",1),w([(0,$.cM)({args:{1:"<contents>"}})],C.prototype,"getBlameContents",1),w([(0,fe.H)(),(0,$.cM)()],C.prototype,"getBlameForLine",1),w([(0,$.cM)({args:{2:"<contents>"}})],C.prototype,"getBlameForLineContents",1),w([(0,$.cM)()],C.prototype,"getBlameForRange",1),w([(0,$.cM)({args:{2:"<contents>"}})],C.prototype,"getBlameForRangeContents",1),w([(0,$.cM)({args:{0:"<blame>"}})],C.prototype,"getBlameRange",1),w([(0,$.cM)()],C.prototype,"getBranch",1),w([(0,$.cM)({args:{1:!1}})],C.prototype,"getBranches",1),w([(0,$.cM)()],C.prototype,"getChangedFilesCount",1),w([(0,$.cM)()],C.prototype,"getCommit",1),w([(0,$.cM)()],C.prototype,"getCommitBranches",1),w([(0,$.cM)()],C.prototype,"getCommitCount",1),w([(0,$.cM)()],C.prototype,"getCommitForFile",1),w([(0,$.cM)()],C.prototype,"getOldestUnpushedRefForFile",1),w([(0,$.cM)()],C.prototype,"getContributors",1),w([(0,fe.H)(),(0,$.cM)()],C.prototype,"getCurrentUser",1),w([(0,$.cM)()],C.prototype,"getDefaultBranchName",1),w([(0,$.cM)()],C.prototype,"getDiffForFile",1),w([(0,$.cM)({args:{1:q=>"<contents>"}})],C.prototype,"getDiffForFileContents",1),w([(0,$.cM)()],C.prototype,"getDiffForLine",1),w([(0,$.cM)()],C.prototype,"getDiffStatus",1),w([(0,$.cM)()],C.prototype,"getFileStatusForCommit",1),w([(0,$.cM)()],C.prototype,"getLog",1),w([(0,$.cM)()],C.prototype,"getLogRefsOnly",1),w([(0,$.cM)()],C.prototype,"getLogForSearch",1),w([(0,$.cM)()],C.prototype,"getLogForFile",1),w([(0,$.cM)()],C.prototype,"getMergeBase",1),w([(0,$.cM)()],C.prototype,"getMergeStatus",1),w([(0,$.cM)()],C.prototype,"getRebaseStatus",1),w([(0,$.cM)()],C.prototype,"getNextComparisonUris",1),w([(0,$.cM)()],C.prototype,"getPreviousComparisonUris",1),w([(0,$.cM)()],C.prototype,"getPreviousComparisonUrisForLine",1),w([(0,$.cM)()],C.prototype,"getIncomingActivity",1),w([(0,$.cM)({args:{1:!1}})],C.prototype,"getRemotes",1),w([(0,$.cM)()],C.prototype,"getRevisionContent",1),w([(0,$.cM)()],C.prototype,"getStash",1),w([(0,$.cM)()],C.prototype,"getStatusForFile",1),w([(0,$.cM)()],C.prototype,"getStatusForFiles",1),w([(0,$.cM)()],C.prototype,"getStatusForRepo",1),w([(0,$.cM)({args:{1:!1}})],C.prototype,"getTags",1),w([(0,$.cM)()],C.prototype,"getTreeEntryForRevision",1),w([(0,$.cM)()],C.prototype,"getTreeForRevision",1),w([(0,$.cM)()],C.prototype,"hasBranchOrTag",1),w([(0,$.cM)()],C.prototype,"hasCommitBeenPushed",1),w([(0,$.cM)()],C.prototype,"getDiffTool",1),w([(0,$.cM)()],C.prototype,"openDiffTool",1),w([(0,$.cM)()],C.prototype,"openDirectoryCompare",1),w([(0,$.cM)()],C.prototype,"resolveReference",1),w([(0,$.cM)()],C.prototype,"validateBranchOrTagName",1),w([(0,$.cM)()],C.prototype,"validateReference",1),w([(0,$.cM)()],C.prototype,"stageFile",1),w([(0,$.cM)()],C.prototype,"stageDirectory",1),w([(0,$.cM)()],C.prototype,"unStageFile",1),w([(0,$.cM)()],C.prototype,"unStageDirectory",1),w([(0,$.cM)()],C.prototype,"stashApply",1),w([(0,$.cM)()],C.prototype,"stashDelete",1),w([(0,$.cM)({args:{2:q=>q==null?void 0:q.length}})],C.prototype,"stashSave",1),w([(0,fe.H)()],C.prototype,"ensureRepositoryContext",1),w([(0,fe.H)()],C.prototype,"ensureGitHub",1);function Oe(q,e){return`${q}${e!=null?`+${(0,re.e)(JSON.stringify(e))}`:""}`}p(Oe,"encodeAuthority")},778:(ae,le,M)=>{var O=M(2479);ae.exports=O(re),ae.exports.strict=O(W),re.proto=re(function(){Object.defineProperty(Function.prototype,"once",{value:function(){return re(this)},configurable:!0}),Object.defineProperty(Function.prototype,"onceStrict",{value:function(){return W(this)},configurable:!0})});function re(k){var V=p(function(){return V.called?V.value:(V.called=!0,V.value=k.apply(this,arguments))},"f");return V.called=!1,V}p(re,"once");function W(k){var V=p(function(){if(V.called)throw new Error(V.onceError);return V.called=!0,V.value=k.apply(this,arguments)},"f"),L=k.name||"Function wrapped with `once`";return V.onceError=L+" shouldn't be called more than once",V.called=!1,V}p(W,"onceStrict")},2479:ae=>{ae.exports=le;function le(M,O){if(M&&O)return le(M)(O);if(typeof M!="function")throw new TypeError("need wrapper function");return Object.keys(M).forEach(function(W){re[W]=M[W]}),re;function re(){for(var W=new Array(arguments.length),k=0;k<W.length;k++)W[k]=arguments[k];var V=M.apply(this,W),L=W[W.length-1];return typeof V=="function"&&V!==L&&Object.keys(L).forEach(function(de){V[de]=L[de]}),V}p(re,"wrapper")}p(le,"wrappy")}};

//# sourceMappingURL=feature-github.js.map