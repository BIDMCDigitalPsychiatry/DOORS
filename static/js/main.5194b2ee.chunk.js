(this.webpackJsonpdoors=this.webpackJsonpdoors||[]).push([[0],{102:function(e,t,n){e.exports=n(115)},114:function(e,t,n){},115:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(11),i=n.n(o),c=n(21),l=n(176),s=n(8),u=n(79),d=n(80),m=n(6),p=n(90),b=Object(p.a)({}),h={palette:{type:"light",primary:{main:"#00A2EF",light:"#65C6F4",dark:"#005077"},secondary:{main:"#388e3c",light:"#6abf69",dark:"#00600f"}},layout:{toolbarheight:64,contentpadding:8,contentrowspacing:2,tablefooterheight:20,tablefilterbarheight:52,tabletoolbarheight:2*b.spacing(5.5),tableRowHeight:b.spacing(6),footerheight:24,progressSize:80,tabheight:116},overrides:{MuiTooltip:{tooltip:{maxWidth:700}},MuiTypography:{h6:{lineHeight:1.2},subtitle1:{lineHeight:1.4}},MuiDialogTitle:{root:{paddingLeft:16,paddingRight:16,paddingTop:12,paddingBottom:12}},MuiDialogActions:{root:{background:b.palette.grey[100],display:"flex",alignItems:"center",justifyContent:"flex-end",flex:"0 0 auto",margin:0,padding:"8px 4px"}},MuiListItemIcon:{root:{color:b.palette.grey[100]}}}},f=Object(p.a)(Object(m.a)({},h)),g=Object(p.a)(h),v={auth:void 0,width:0,height:0,appBarHeight:g.layout.toolbarheight,adminMode:!1},E=n(36);var y=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0;return"function"===typeof e?e(t):e};function O(e,t){return Object(m.a)(Object(m.a)({},e),t)}function w(e){return!e||0===e.length}function j(){window.dispatchEvent(new CustomEvent("resize")),setTimeout((function(){return window.dispatchEvent(new CustomEvent("resize"))}),200)}var k=function(e){return"/doors"+e};function C(e,t){var n=t.payload,a=t.id,r=y(n,e[a]),o=Object(m.a)({},e);return o[a]=r,e&&e[a]&&(o[a]=r),o}function x(e,t){return t.filter((function(t){return!e[t.id]})).map((function(t){return I(e,t)})).reduce(O,Object(m.a)({},e))}function I(e,t){var n=Object(m.a)({},e);return n[t.id]=t,e&&e[t.id]&&(n[t.id]=Object(m.a)(Object(m.a)({},e[t.id]),t)),n}var S=[];var T={"Getting Started":{open:!0}};var N={};var B={},A=n(23);function R(e,t){var n=t.table,a=t.id,r=t.payload,o="function"===typeof r?r(e[n]?e[n][a]:void 0):r;if(e[n]){if(e[n]&&!e[n][a])return Object(m.a)(Object(m.a)({},e),{},Object(A.a)({},n,Object(m.a)(Object(A.a)({},a,o),e[n])));var i=Object(m.a)({},e);return i[n][a]=o,i}return Object(m.a)(Object(m.a)({},e),{},Object(A.a)({},n,Object(A.a)({},a,o)))}var P={};var H={layout:function(e,t){switch(t.type){case"LOGIN":return Object(m.a)(Object(m.a)({},e),{},{auth:t.auth});case"LOGOUT":return Object(m.a)(Object(m.a)({},v),{},{auth:void 0,height:e.height,width:e.width});case"SET_USER":return Object(m.a)(Object(m.a)({},e),{},{user:t.user});case"RESIZE_APPBAR":return Object(m.a)(Object(m.a)({},e),{},{appBarHeight:t.height});case"RESIZE_VIEWPORT":return Object(m.a)(Object(m.a)({},e),{},{height:t.height,width:t.width});case"CHANGE_ADMIN_MODE":return Object(m.a)(Object(m.a)({},e),{},{adminMode:t.adminMode})}return e||Object(m.a)({},v)},dialog:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:T,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"UPDATE_DIALOG":return C(e,t);case"LOGOUT":return T;default:return e}},table:function(e,t){switch(t.type){case"TABLE_UPDATE":return I(e,t.table);case"persist/REHYDRATE":var n=t&&t.payload,a=n&&n.table;return x(a||[],S)}return x(e?Object(m.a)({},e):[],S)},selector:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:N,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"UPDATE_SELECTOR":return C(e,t);case"LOGOUT":return N;default:return e}},snackBar:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:B,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SNACKBAR":return Object(m.a)(Object(m.a)({},e),t.payload);default:return e}},database:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:P,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_DATABASE_TABLE":var n=Object(m.a)({},e);return n[t.table]=t.payload,n;case"UPDATE_DATABASE":return R(e,t);case"LOGOUT":return P;default:return e}}},L=n(77),z=n(50),_=n(24),D=n(62),W=n(48);W&&W.config&&W.config({driver:W.INDEXEDDB,name:"".concat(E.name,"-local-storage"),version:1,size:4980736,storeName:"keyvaluepairs",description:"".concat(E.name," application database")});var M={key:"app",storage:W};var U=n(26),G=n(57),F=n.n(G),Z=n(155),q=n(180),J=n(69),V=n.n(J),K=n(84),Y=n(14),Q=n(30),$=n(154),X=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"sm",t=Object(Q.a)();return Object($.a)(t.breakpoints.down(e))},ee=function(){var e=Object(s.f)((function(e){return void 0===e.layout.user}));return!(!Object(s.f)((function(e){return void 0!==e.layout.user}))||e)},te=function(){var e=ee(),t=Object(s.f)((function(e){var t,n;return null!==(t=null===(n=e.layout.user)||void 0===n?void 0:n.email)&&void 0!==t?t:""})),n=E.adminUsers.split(",");return!!(e&&n.findIndex((function(e){return e.trim().toLowerCase()===t.trim().toLowerCase()}))>-1)},ne=function(){return e="auth",Object(s.f)((function(t){return t.layout[e]}),s.d)||{};var e};var ae=function(e){var t=e.setState,n=void 0===t?void 0:t,r=e.onSuccess,o=void 0===r?void 0:r,i=Object(s.e)(),l=function(e){var t=e.url,n=e.setState,r=void 0===n?void 0:n,o=e.onSuccess,i=void 0===o?void 0:o,l=e.onError,s=void 0===l?void 0:l,u=e.method,d=void 0===u?"post":u,p=a.useState(),b=Object(c.a)(p,2),h=b[0],f=b[1],g=ne().access;return{handleRequest:a.useCallback((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0;function o(){return c.apply(this,arguments)}function c(){return(c=Object(K.a)(V.a.mark((function o(){var c,l,u,p,b,v;return V.a.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:f(void 0);try{console.log({access:g,method:d,url:t}),c={data:{success:!0,email:"test@test.com"}},console.log("Successful request."),console.log({response:c,values:e}),r&&r((function(e){return Object(m.a)(Object(m.a)({},e),{},{success:!0,disabled:!1,submitting:!1,errors:{},response:c})})),i&&i(c),n&&n(c)}catch(h){u=h.response,p=null!==(l=null===u||void 0===u?void 0:u.data)&&void 0!==l?l:{},b=p.error_text,v=void 0===b?"Unknown error":b,console.error({error_text:v,error:h,values:e}),f(v),r&&r((function(e){return Object(m.a)(Object(m.a)({},e),{},{success:!1,disabled:!1,submitting:!1,errors:{},response:u})})),s&&s(u),a&&a(u)}case 2:case"end":return o.stop()}}),o)})))).apply(this,arguments)}r&&r((function(e){return Object(m.a)(Object(m.a)({},e),{},{success:!1,disabled:!0,submitting:!0,response:void 0})})),o()}),[g,t,d,r,f,i,s]),error:h,setError:f}}({url:"/auth/login?debug=true",setState:n,onSuccess:a.useCallback((function(e){i({type:"LOGIN",auth:e.data}),console.log("Successfully logged in."),o&&o()}),[i,o])});return{handleLogin:l.handleRequest,error:l.error,setError:l.setError}},re=function(){return Object(s.f)((function(e){return e.layout.height}))},oe=function(){var e=a.useRef(null),t=F()(e).height,n=function(){var e=Object(s.e)();return a.useCallback((function(t){return e({type:"RESIZE_APPBAR",height:t})}),[e])}();return a.useEffect((function(){n(t)}),[n,t]),e},ie=function(){var e=Object(Y.f)().pathname,t=Object(Y.e)();return a.useCallback((function(n){return e!==n&&t&&t.push(n)}),[t,e])},ce={flexGrow:1,zIndex:1,overflow:"hidden",position:"fixed",display:"static",width:"100%",height:"100%"},le=Object(Z.a)((function(e){var t=e.layout;return Object(q.a)({root:{},dimensions:{overflow:"hidden",position:"fixed",width:"calc(100vw)",height:"calc(100vh)"},backdrop:Object(m.a)(Object(m.a)({},ce),{},{background:t.backdropColor}),viewport:function(e){return Object(m.a)(Object(m.a)({},ce),{},{height:e.height,width:e.width,background:t.backgroundColor})}})}));function se(e){var t=e.children,n=a.useRef(null),r=F()(n),o=r.height,i=r.width,c=le({height:o,width:i}),l=function(){var e=Object(s.e)();return a.useCallback((function(t){return e(Object(m.a)({type:"RESIZE_VIEWPORT"},t))}),[e])}();return a.useEffect((function(){l({height:o,width:i})}),[l,o,i]),a.createElement(a.Fragment,null,a.createElement("div",{ref:n,className:c.dimensions}),a.createElement("div",{id:"backdrop",className:c.backdrop},a.createElement("div",{id:"viewport",className:c.viewport},t)))}var ue=n(157),de=n(117);function me(){return a.createElement(ue.a,{container:!0,alignItems:"center"},a.createElement(ue.a,{item:!0},a.createElement(de.a,{variant:"h5"},"Playground Placeholder")))}function pe(){return a.createElement(ue.a,{container:!0,alignItems:"center"},a.createElement(ue.a,{item:!0},a.createElement(de.a,{variant:"h5"},"Sessions Placeholder")))}function be(){return a.createElement(ue.a,{container:!0,alignItems:"center"},a.createElement(ue.a,{item:!0},a.createElement(de.a,{variant:"h5"},"Instructors Placeholder")))}function he(){return a.createElement(ue.a,{container:!0,alignItems:"center"},a.createElement(ue.a,{item:!0},a.createElement(de.a,{variant:"h5"},"Profile Placeholder")))}function fe(){return a.createElement(ue.a,{container:!0,alignItems:"center"},a.createElement(ue.a,{item:!0},a.createElement(de.a,{variant:"h5"},"Calendar Placeholder")))}function ge(){return a.createElement(ue.a,{container:!0,alignItems:"center"},a.createElement(ue.a,{item:!0},a.createElement(de.a,{variant:"h5"},"Help Placeholder")))}var ve=function(){return a.createElement(Y.c,null,a.createElement(Y.a,{exact:!0,path:k("/Instructors"),component:be}),a.createElement(Y.a,{exact:!0,path:k("/Profile"),component:he}),a.createElement(Y.a,{exact:!0,path:k("/Calendar"),component:fe}),a.createElement(Y.a,{exact:!0,path:k("/Help"),component:ge}),a.createElement(Y.a,{exact:!0,path:k("/PlayGround"),component:me}),a.createElement(Y.a,{exact:!0,path:k("/Sessions"),component:pe}),a.createElement(Y.a,{path:"/",component:pe}))},Ee=n(167),ye=n(91),Oe=n(181),we=n(165),je=n(166),ke=n(60),Ce=n.n(ke),xe=n(158),Ie=n(178),Se=n(159),Te=function(e){var t=Object(s.e)();return[Object(s.f)((function(t){return t.selector[e]||N})),r.a.useCallback((function(n){return t(function(e,t){return{type:"UPDATE_SELECTOR",id:e,payload:t}}(e,n))}),[e,t])]},Ne=Object(Z.a)((function(e){var t=e.palette;return Object(q.a)({root:function(e){var n=e.rounded;return{background:t.common.white,color:t.text.primary,borderRadius:n?void 0:0,padding:0}},tabs:function(e){return{minHeight:e.minHeight,borderRadius:"inherit"}},indicator:{background:t.primary.main,color:t.common.white,"&:hover":{color:t.common.white},height:6,marginBottom:4,zIndex:0,borderRadius:25},labelIcon:function(e){return{zIndex:1,minHeight:e.minHeight,color:t.primary.dark}},selected:function(e){e.minHeight;return{color:t.primary.main}},tabroot:function(e){return{padding:0,zIndex:1,minWidth:0,minHeight:e.minHeight}},wrapper:{display:"inline-flex",alignItems:"center",justifyContent:"center",width:"100%",flexDirection:"column",borderRadius:"inherit"}})})),Be=function(e){var t,n=e.id,r=e.tabs,o=void 0===r?[]:r,i=e.orientation,l=e.wrapped,s=e.minHeight,u=void 0===s?64:s,d=e.rounded,m=void 0===d||d,p=e.onChange,b=Ne({minHeight:u,rounded:m}),h=Te(n),f=Object(c.a)(h,2),g=f[0],v=f[1],E=g.value,y=Object(Y.f)().pathname,O=o[0]&&o[0].id,k=null===(t=o.find((function(e){return e.id===E})))||void 0===t?void 0:t.route,C=y!==k&&o.find((function(e){return e.route===y}));a.useEffect((function(){w(E)&&v({value:O}),C&&v({value:C.id}),j()}),[v,E,O,C]),a.useEffect((function(){j()}),[i]);var x=a.useCallback((function(e,t){v({value:t}),p&&p(t)}),[v,p]),I=g.value,S=void 0===I?o[0].id:I;return a.createElement(xe.a,{className:b.root},a.createElement(Ie.a,{variant:"fullWidth",className:b.tabs,scrollButtons:"off",value:S,onChange:x,classes:{indicator:b.indicator}},o?o.map((function(e){return a.createElement(Se.a,{key:e.id,classes:{root:b.tabroot,labelIcon:b.labelIcon,wrapper:b.wrapper,wrapped:b.labelIcon,selected:b.selected},icon:e.icon&&a.createElement(e.icon,{style:{marginBottom:0}}),value:e.id,wrapped:l,label:a.createElement(de.a,{variant:"caption",style:{maxWidth:"calc(100% - ".concat(2,"px)")},noWrap:!l},e.label?e.label:e.id)})})):a.createElement(a.Fragment,null)))},Ae=n(168),Re=n(169),Pe=n(160),He=n(161),Le=n(162),ze=n(163),_e=n(164),De=[{id:"My Classes",icon:Pe.a,route:"/Sessions"},{id:"Instructors",icon:He.a,route:"/Instructors"},{id:"My Calendar",icon:Le.a,route:"/Calendar"},{id:"My Profile",icon:ze.a,route:"/Profile"},{id:"Help",icon:_e.a,route:"/Help"}],We=De.filter((function(e){return"Help"!==e.id})),Me=De.filter((function(e){return"Instructors"!==e.id})),Ue=De.filter((function(e){return"Instructors"!==e.id}));function Ge(){var e=te(),t=Object(s.f)((function(e){var t,n,a;return w(null!==(t=null===(n=e.layout)||void 0===n||null===(a=n.user)||void 0===a?void 0:a.isInstructor)&&void 0!==t&&t)})),n=e?We:t?Ue:Me,a=JSON.stringify(n.map((function(e){return{id:e.id,route:e.route}})));return{tabs:n,tabs_s:a}}var Fe=Object(Z.a)((function(e){var t,n=e.breakpoints,a=e.palette,r=e.layout;return Object(q.a)({appBar:{paddingTop:r.footerheight,color:a.primary.main,background:a.common.white,paddingLeft:r.contentpadding,paddingRight:r.contentpadding},appBarFullScreen:{paddingTop:r.footerheight,background:a.common.white,color:a.primary.dark},logo:(t={paddingLeft:8,paddingRight:16,height:r.toolbarheight-16},Object(A.a)(t,n.down("xs"),{display:"none"}),Object(A.a)(t,"cursor","pointer"),t),active:{backgroundColor:a.primary.dark},toolbar:{background:a.white}})})),Ze=function(e){var t=Ge().tabs;return a.createElement(Be,Object.assign({id:"AppBar",tabs:t},e))};function qe(){var e=Fe(),t=ee(),n=a.useState(null),r=Object(c.a)(n,2),o=r[0],i=r[1],l=Boolean(o),u=Ge(),d=u.tabs,m=u.tabs_s,p=Te("AppBar"),b=Object(c.a)(p,2)[1],h=function(){var e=Object(s.e)();return a.useCallback((function(t){return e({type:"SET_USER",user:t})}),[e])}(),f=function(){var e=Object(s.e)();return a.useCallback((function(){return e({type:"LOGOUT"})}),[e])}(),g=a.useCallback((function(){h(void 0),f(),i(null)}),[h,i,f]),v=ie(),E=a.useCallback((function(e){var t=JSON.parse(m).find((function(t){return t.id===e})).route;v(k(t))}),[v,m]),y=d[0].id,O=d[0].route,w=a.useCallback((function(){b(y),v(k(O))}),[b,v,y,O]),j=X("xs");return a.createElement(we.a,{ref:oe(),position:"fixed",color:"inherit",elevation:1,className:j?e.appBarFullScreen:e.appBar},a.createElement(je.a,{className:e.toolbar,disableGutters:!0},a.createElement(ue.a,{container:!0,alignItems:"center",spacing:0},a.createElement(ue.a,{item:!0},a.createElement("img",{className:e.logo,src:Ce.a,alt:"logo",onClick:w})),a.createElement(ue.a,{item:!0,xs:!0,style:{marginLeft:4,marginRight:4,minWidth:0}},a.createElement(Ze,{onChange:E})),a.createElement(ue.a,{item:!0},a.createElement(ue.a,{container:!0,justify:"flex-end",alignItems:"center"},a.createElement(ue.a,{item:!0},a.createElement(Ee.a,{color:"inherit","aria-label":"account of current user","aria-haspopup":"true",onClick:function(e){i(e.currentTarget)}},t?a.createElement(Ae.a,null):a.createElement(Re.a,null)),a.createElement(ye.a,{id:"menu-appbar",anchorEl:o,anchorOrigin:{vertical:"top",horizontal:"right"},keepMounted:!0,transformOrigin:{vertical:"top",horizontal:"right"},open:l,onClose:function(){i(null)},MenuListProps:{style:{paddingTop:t?0:void 0}}},[a.createElement(Oe.a,{key:"signout",onClick:g},"Sign Out")])))))))}var Je=n(170),Ve=Object(Z.a)((function(e){var t=e.palette,n=e.zIndex;return Object(q.a)({bottomAppBar:{top:"auto",bottom:0,zIndex:n.drawer+1,background:t.primary.dark,color:t.common.white},bottomAppBarBeta:{top:0,background:t.primary.main,color:t.common.white,zIndex:n.drawer+1},bottomToolBar:{minHeight:g.layout.footerheight}})}));function Ke(){var e=Ve({}),t=X(),n=Object(s.f)((function(e){var t,n,a,r,o;return null!==(t=null===(n=e.layout.user)||void 0===n||null===(a=n.signInUserSession)||void 0===a||null===(r=a.idToken)||void 0===r||null===(o=r.payload)||void 0===o?void 0:o.email)&&void 0!==t?t:"Username"}));return a.createElement(a.Fragment,null,a.createElement(we.a,{position:"fixed",color:"primary",className:e.bottomAppBar},a.createElement(je.a,{className:e.bottomToolBar},a.createElement(ue.a,{container:!0,justify:"flex-start"},a.createElement(ue.a,{item:!0,xs:t?5:2,zeroMinWidth:!0},a.createElement(de.a,{noWrap:!0,variant:"body2",align:"left"},a.createElement(Je.a,{href:"https://www.digitalpsych.org/",target:"_blank",variant:"body2",color:"inherit"},"Division of Digital Psychiatry"))),!t&&a.createElement(ue.a,{item:!0,xs:7,zeroMinWidth:!0},a.createElement(de.a,{noWrap:!0,variant:"body2",align:"center"},a.createElement(Je.a,{href:"https://www.bidmc.org/",target:"_blank",variant:"body2",color:"inherit"},"This website is made possible by support from ..."))),a.createElement(ue.a,{item:!0,xs:t?7:3,zeroMinWidth:!0},a.createElement(de.a,{noWrap:!0,variant:"body2",align:"right"},a.createElement(Je.a,{href:"https://www.bidmc.org/",target:"_blank",variant:"body2",color:"inherit"},"\xa92020 Beth Israel Deaconess Medical Center")))))),a.createElement(we.a,{elevation:1,position:"fixed",color:"secondary",className:e.bottomAppBarBeta},a.createElement(je.a,{className:e.bottomToolBar},a.createElement(ue.a,{container:!0,justify:"center",spacing:2},a.createElement(ue.a,{item:!0,xs:4},a.createElement(de.a,{noWrap:!0,variant:"body2"},"Under Construction")),a.createElement(ue.a,{item:!0,xs:8},a.createElement(ue.a,{container:!0,justify:"flex-end",spacing:1},a.createElement(ue.a,{item:!0},a.createElement(de.a,{noWrap:!0,variant:"body2",align:"right"},t?n:"Welcome, ".concat(n)))))))))}var Ye=n(92),Qe=n(3),$e=n(85),Xe=n.n($e),et=n(87),tt=n.n(et),nt=n(88),at=n.n(nt),rt=n(89),ot=n.n(rt),it=n(63),ct=n(171),lt=n(182),st=n(172),ut=n(86),dt=n.n(ut),mt={success:Xe.a,warning:dt.a,error:tt.a,info:at.a},pt=Object(Z.a)((function(e){return{success:{backgroundColor:it.a[600]},error:{backgroundColor:e.palette.error.dark},info:{backgroundColor:e.palette.primary.main},warning:{backgroundColor:ct.a[700]},icon:{fontSize:20},iconVariant:{opacity:.9,marginRight:e.spacing(1)},message:{display:"flex",alignItems:"center"}}}));function bt(e){var t=e.className,n=void 0===t?void 0:t,r=Object(Ye.a)(e,["className"]),o=pt({}),i=function(){var e=Object(s.e)();return[Object(s.f)((function(e){return e.snackBar}),s.d),a.useCallback((function(t){return e(function(e){return{type:"SNACKBAR",payload:e}}(t))}),[e])]}(),l=Object(c.a)(i,2),u=l[0],d=u.open,m=u.message,p=u.variant,b=void 0===p?"success":p,h=l[1],f=a.useCallback((function(e,t){return"clickaway"!==t&&h({open:!1})}),[h]),g=mt[b];return a.createElement(lt.a,{anchorOrigin:{vertical:"bottom",horizontal:"right"},open:d,autoHideDuration:3e3,onClose:f},a.createElement(st.a,Object.assign({className:Object(Qe.a)(o[b],n),"aria-describedby":"client-snackbar",message:a.createElement("span",{id:"client-snackbar",className:o.message},a.createElement(g,{className:Object(Qe.a)(o.icon,o.iconVariant)}),m),action:[a.createElement(Ee.a,{key:"close","aria-label":"close",color:"inherit",onClick:f},a.createElement(ot.a,{className:o.icon}))]},r)))}var ht=Object(Z.a)((function(e){var t=e.breakpoints,n=e.palette,a=e.layout;return Object(q.a)({root:{display:"static"},content:Object(A.a)({flexGrow:1,backgroundColor:n.common.white},t.down("sm"),{marginLeft:0,flexShrink:0}),innerContent:function(e){var t=e.overflow,n=void 0===t?"auto":t,r=e.contentHeight,o=e.padInnerContent,i=void 0===o||o;return{height:r-(i?2*a.contentpadding+1:0),overflow:n,padding:i?a.contentpadding:0}},toolbar:function(e){var t=e.appBarHeight;return{background:n.white,height:t}}})})),ft=["/"],gt=["/Home","/"];function vt(e){var t=e.children,n=re(),r=Object(s.f)((function(e){return e.layout.appBarHeight})),o=n-[r,Object(Q.a)().layout.footerheight].reduce((function(e,t){return e+t}),0),i=Object(Y.f)().pathname,c=ht({padInnerContent:!(gt.findIndex((function(e){return e===i}))>-1),overflow:ft.findIndex((function(e){return e===i}))>-1?"hidden":"auto",contentHeight:o,appBarHeight:r});return a.createElement("div",{"data-testid":"app-container",className:c.root},a.createElement("main",{className:c.content},a.createElement(qe,null),a.createElement("div",{className:c.toolbar}),a.createElement("div",{className:c.innerContent},t),a.createElement(Ke,null),a.createElement(bt,null)))}var Et=n(94),yt=n(173),Ot=n(177),wt=n(175),jt=n(174),kt=n(19),Ct=Object(Z.a)((function(e){var t=e.palette,n=e.mixins;return Object(q.a)({root:function(e){var n=e.height;return{background:t.common.white,color:t.primary.main,height:n,overflowY:"auto"}},paper:{marginTop:32,width:300},disclaimer:{marginTop:32,maxWidth:650},panelarea:{background:"#F5F5F5"},message:{color:"green"},button:{background:t.primary.main,color:t.common.white,"&:hover":{background:t.primary.dark,color:t.common.white},marginTop:8},toolbar:n.toolbar,wrapper:{width:224},buttonProgress:{position:"absolute",top:"50%",left:"50%",marginTop:-8,marginLeft:-12},container:{overflowY:"auto"}})})),xt=function(e){var t=e.email,n=e.password,a={};return w(t)&&(a.email="Required"),w(n)&&(a.password="Required"),function(e){return/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(e).toLowerCase())}(t)||(a.email="Invalid email format"),a};function It(){var e=re(),t=Ct({height:e}),n=a.useRef(null),r=a.useState({email:"",password:""}),o=Object(c.a)(r,2),i=o[0],l=o[1],u=i.email,d=i.password,p=a.useState({disabled:!1}),b=Object(c.a)(p,2),h=b[0].disabled,f=b[1],g=Object(s.e)(),v=ae({setState:f}),E=v.handleLogin,y=v.error,O=a.useState({}),j=Object(c.a)(O,2),k=j[0],C=j[1],x=a.useCallback((function(){g(Object(kt.d)("")),console.log(xt),E({email:u,password:d})}),[E,u,d,g]),I=function(e){return function(t){l(Object(m.a)(Object(m.a)({},i),{},Object(A.a)({},e,t.target.value))),C({})}},S=a.useCallback((function(){alert("To be completed")}),[]),T=a.useCallback((function(){alert("To be completed")}),[]);return a.createElement("div",{className:t.root,onKeyUp:function(e){13===e.keyCode&&n.current&&n.current.click()}},a.createElement("form",{autoComplete:"off"},a.createElement(ue.a,{container:!0,direction:"column",justify:"center",alignItems:"center"},a.createElement(ue.a,{item:!0},a.createElement(de.a,{align:"center",className:t.disclaimer},"")),a.createElement(ue.a,{item:!0,xs:12},a.createElement(Et.a,{className:t.paper},a.createElement(de.a,{align:"center",className:t.panelarea},a.createElement("img",{src:Ce.a,alt:"logo",style:{height:124}})),a.createElement(yt.a,null),a.createElement(ue.a,{container:!0,spacing:1,direction:"column",justify:"center",alignItems:"center",style:{padding:16}},a.createElement(ue.a,{item:!0},a.createElement(Ot.a,{autoComplete:"new-password",id:"email",label:"Email",disabled:h,value:i.email,onChange:I("email"),margin:"dense",variant:"outlined",error:!w(k.email),helperText:k.email,autoFocus:!0,InputLabelProps:{shrink:!0}})),a.createElement(ue.a,{item:!0},a.createElement(Ot.a,{autoComplete:"new-password",id:"password",label:"Password",disabled:h,type:"password",value:i.password,onChange:I("password"),margin:"dense",variant:"outlined",error:!w(k.password),helperText:k.password,fullWidth:!0,InputLabelProps:{shrink:!0}})),a.createElement(ue.a,{item:!0},a.createElement("div",{className:t.wrapper},a.createElement(jt.a,{ref:n,fullWidth:!0,disabled:h,variant:"contained",className:t.button,onClick:x},"Login"),h&&a.createElement(wt.a,{size:24,className:t.buttonProgress}))),a.createElement(ue.a,{item:!0},a.createElement("div",{style:{marginTop:16}},a.createElement(Je.a,{style:{marginLeft:8,cursor:"pointer"},underline:"always",color:"inherit",onClick:T},"Create New Account"))),a.createElement(ue.a,{item:!0},a.createElement("div",{style:{marginTop:16}},a.createElement(Je.a,{style:{marginLeft:8,cursor:"pointer"},underline:"always",color:"inherit",onClick:S},"Forgot Password")))),a.createElement(yt.a,null),a.createElement(de.a,{color:"error",align:"center",className:t.panelarea},y&&y))))))}function St(e){var t=e.children,n=Object(s.f)((function(e){return e.layout.auth}));return void 0!==n&&null!==n?t:a.createElement(It,null)}var Tt=Object(s.c)((function(e,t){var n=t.history,a=e&&e.router&&e.router.location;return n.location=a||n.location,{history:n}}))((function(e){var t=e.history;return a.createElement(z.a,{history:t},a.createElement(St,null,a.createElement(vt,null,a.createElement(ve,null))))})),Nt=Object(U.a)(),Bt=window.initialReduxState,At=function(e,t,n){"undefined"===typeof window||window;var a=!1,r=function(e,t){return Object(_.c)(Object.assign({},e,{router:Object(z.b)(t)}))}(H,e),o=Object(D.a)(M,r);return Object(_.d)(Object(_.a)(d.a,Object(L.a)(e)),a?a():function(e){return e})(_.e)(o,t)}(Nt,Bt),Rt=(At.getState,Object(D.b)(At));function Pt(e){var t=e.children,n=te(),o=function(){var e=Object(s.e)(),t=te(),n=a.useCallback((function(t){return e({type:"CHANGE_ADMIN_MODE",adminMode:t})}),[e]),r=Object(s.f)((function(e){return e.layout.adminMode}));return[t&&r,n]}(),i=Object(c.a)(o,1)[0];return r.a.createElement(l.a,{theme:n&&i?f:g},r.a.createElement(se,null,t))}function Ht(e){var t=e.children;return r.a.createElement(s.a,{store:At},r.a.createElement(u.a,{loading:null,persistor:Rt},r.a.createElement(Pt,null,t)))}var Lt=function(){return r.a.createElement(Ht,null,r.a.createElement(r.a.Suspense,{fallback:r.a.createElement(r.a.Fragment,null)},r.a.createElement(Tt,{history:Nt})))};n(114),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));!function(){var e;console.log("%c\n\n\u2588\u2588\u2588\u2588\u2588\u2588\u2557  \u2588\u2588\u2588\u2588\u2588\u2588\u2557  \u2588\u2588\u2588\u2588\u2588\u2588\u2557 \u2588\u2588\u2588\u2588\u2588\u2588\u2557 \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\n\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557\u2588\u2588\u2554\u2550\u2550\u2550\u2588\u2588\u2557\u2588\u2588\u2554\u2550\u2550\u2550\u2588\u2588\u2557\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557\u2588\u2588\u2554\u2550\u2550\u2550\u2550\u255d\n\u2588\u2588\u2551  \u2588\u2588\u2551\u2588\u2588\u2551   \u2588\u2588\u2551\u2588\u2588\u2551   \u2588\u2588\u2551\u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255d\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\n\u2588\u2588\u2551  \u2588\u2588\u2551\u2588\u2588\u2551   \u2588\u2588\u2551\u2588\u2588\u2551   \u2588\u2588\u2551\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557\u255a\u2550\u2550\u2550\u2550\u2588\u2588\u2551\n\u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255d\u255a\u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255d\u255a\u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255d\u2588\u2588\u2551  \u2588\u2588\u2551\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2551\n\u255a\u2550\u2550\u2550\u2550\u2550\u255d  \u255a\u2550\u2550\u2550\u2550\u2550\u255d  \u255a\u2550\u2550\u2550\u2550\u2550\u255d \u255a\u2550\u255d  \u255a\u2550\u255d\u255a\u2550\u2550\u2550\u2550\u2550\u2550\u255d \n\nHost: ".concat(window.location.protocol+"//"+window.location.hostname+(window.location.port?":"+window.location.port:"")+(void 0!==e?e:""),"\n\nEnvironment: ").concat("production","\nVersion: ").concat(E.version,"\n                         \n"),"font-family:monospace;color:"+g.palette.primary.main+";font-size:12px;")}(),i.a.render(r.a.createElement(Lt,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},36:function(e){e.exports=JSON.parse('{"name":"doors","version":"1.0.0","private":true,"homepage":"https://cvanem.github.io/doors","homepageNext":"https://doors.digitalpsych.org","adminUsers":"chris@greenlinkservices.com","identityPoolId":"","region":"us-east-1","dependencies":{"@material-ui/core":"4.11.0","@material-ui/icons":"4.9.1","@material-ui/lab":"4.0.0-alpha.56","@reactions/component":"2.0.2","@rehooks/component-size":"1.0.3","@types/classnames":"2.2.10","@types/history":"4.7.5","@types/node":"12.12.14","@types/react-redux":"7.1.9","@types/react-router":"5.1.8","@types/react-router-dom":"5.1.5","@types/webpack":"4.41.22","@types/webpack-env":"1.15.2","aws-amplify":"3.1.1","aws-sdk":"2.747.0","axios":"0.20.0","classnames":"2.2.6","connected-react-router":"6.8.0","deepmerge":"4.2.2","history":"4.10.1","localforage":"1.7.4","mui-virtualized-table":"3.0.0-6","react":"16.13.1","react-container-dimensions":"1.4.1","react-dom":"16.13.1","react-draggable":"4.4.3","react-number-format":"4.4.1","react-redux":"7.2.1","react-router":"5.2.0","react-scripts":"3.4.3","react-swipeable-views":"0.13.9","react-virtualized":"9.22.2","redux":"4.0.5","redux-persist":"6.0.0","redux-thunk":"2.3.0","typescript":"3.9.5"},"devDependencies":{"fs-extra":"9.0.0"},"scripts":{"start":"react-scripts start","build":"react-scripts build && node copy404","test":"react-scripts test","eject":"react-scripts eject","predeploy":"yarn build","deploy":"gh-pages -d build"},"eslintConfig":{"extends":"react-app"},"prettier":{"printWidth":160,"trailingComma":"none","tabWidth":2,"tabs":false,"semi":true,"singleQuote":true,"jsxSingleQuote":true,"bracketSpacing":true,"arrowParens":"avoid"},"browserslist":{"production":[">0.2%","not dead","not op_mini all"],"development":["last 1 chrome version","last 1 firefox version","last 1 safari version"]}}')},60:function(e,t,n){e.exports=n.p+"static/media/logo.83e76d20.png"}},[[102,1,2]]]);
//# sourceMappingURL=main.5194b2ee.chunk.js.map