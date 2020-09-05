(this.webpackJsonpdoors=this.webpackJsonpdoors||[]).push([[0],{101:function(e,t,a){e.exports=a(114)},113:function(e,t,a){},114:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(11),i=a.n(o),c=a(20),l=a(175),s=a(8),u=a(79),d=a(80),m=a(6),p=a(90),b=Object(p.a)({}),h={palette:{type:"light",primary:{main:"#00A2EF",light:"#65C6F4",dark:"#005077"},secondary:{main:"#388e3c",light:"#6abf69",dark:"#00600f"}},layout:{toolbarheight:64,contentpadding:8,contentrowspacing:2,tablefooterheight:20,tablefilterbarheight:52,tabletoolbarheight:2*b.spacing(5.5),tableRowHeight:b.spacing(6),footerheight:24,progressSize:80,tabheight:116},overrides:{MuiTooltip:{tooltip:{maxWidth:700}},MuiTypography:{h6:{lineHeight:1.2},subtitle1:{lineHeight:1.4}},MuiDialogTitle:{root:{paddingLeft:16,paddingRight:16,paddingTop:12,paddingBottom:12}},MuiDialogActions:{root:{background:b.palette.grey[100],display:"flex",alignItems:"center",justifyContent:"flex-end",flex:"0 0 auto",margin:0,padding:"8px 4px"}},MuiListItemIcon:{root:{color:b.palette.grey[100]}}}},f=Object(p.a)(Object(m.a)({},h)),g=Object(p.a)(h),v={auth:void 0,width:0,height:0,appBarHeight:g.layout.toolbarheight,adminMode:!1},E=a(36);var y=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0;return"function"===typeof e?e(t):e};function O(e,t){return Object(m.a)(Object(m.a)({},e),t)}function w(e){return!e||0===e.length}function j(){window.dispatchEvent(new CustomEvent("resize")),setTimeout((function(){return window.dispatchEvent(new CustomEvent("resize"))}),200)}var k=function(e){return"/doors"+e};function C(e,t){var a=t.payload,n=t.id,r=y(a,e[n]),o=Object(m.a)({},e);return o[n]=r,e&&e[n]&&(o[n]=r),o}function x(e,t){return t.filter((function(t){return!e[t.id]})).map((function(t){return I(e,t)})).reduce(O,Object(m.a)({},e))}function I(e,t){var a=Object(m.a)({},e);return a[t.id]=t,e&&e[t.id]&&(a[t.id]=Object(m.a)(Object(m.a)({},e[t.id]),t)),a}var T=[];var S={"Getting Started":{open:!0}};var N={};var B={},A=a(21);function R(e,t){var a=t.table,n=t.id,r=t.payload,o="function"===typeof r?r(e[a]?e[a][n]:void 0):r;if(e[a]){if(e[a]&&!e[a][n])return Object(m.a)(Object(m.a)({},e),{},Object(A.a)({},a,Object(m.a)(Object(A.a)({},n,o),e[a])));var i=Object(m.a)({},e);return i[a][n]=o,i}return Object(m.a)(Object(m.a)({},e),{},Object(A.a)({},a,Object(A.a)({},n,o)))}var L={};var H={layout:function(e,t){switch(t.type){case"LOGIN":return Object(m.a)(Object(m.a)({},e),{},{auth:t.auth});case"LOGOUT":return Object(m.a)(Object(m.a)({},v),{},{auth:void 0,height:e.height,width:e.width});case"SET_USER":return Object(m.a)(Object(m.a)({},e),{},{user:t.user});case"RESIZE_APPBAR":return Object(m.a)(Object(m.a)({},e),{},{appBarHeight:t.height});case"RESIZE_VIEWPORT":return Object(m.a)(Object(m.a)({},e),{},{height:t.height,width:t.width});case"CHANGE_ADMIN_MODE":return Object(m.a)(Object(m.a)({},e),{},{adminMode:t.adminMode})}return e||Object(m.a)({},v)},dialog:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:S,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"UPDATE_DIALOG":return C(e,t);case"LOGOUT":return S;default:return e}},table:function(e,t){switch(t.type){case"TABLE_UPDATE":return I(e,t.table);case"persist/REHYDRATE":var a=t&&t.payload,n=a&&a.table;return x(n||[],T)}return x(e?Object(m.a)({},e):[],T)},selector:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:N,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"UPDATE_SELECTOR":return C(e,t);case"LOGOUT":return N;default:return e}},snackBar:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:B,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SNACKBAR":return Object(m.a)(Object(m.a)({},e),t.payload);default:return e}},database:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:L,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_DATABASE_TABLE":var a=Object(m.a)({},e);return a[t.table]=t.payload,a;case"UPDATE_DATABASE":return R(e,t);case"LOGOUT":return L;default:return e}}},P=a(77),z=a(50),D=a(24),W=a(62),M=a(48);M&&M.config&&M.config({driver:M.INDEXEDDB,name:"".concat(E.name,"-local-storage"),version:1,size:4980736,storeName:"keyvaluepairs",description:"".concat(E.name," application database")});var _={key:"app",storage:M};var U=a(26),G=a(57),F=a.n(G),Z=a(155),q=a(179),V=a(69),J=a.n(V),K=a(84),Y=a(19),Q=a(30),$=a(154),X=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"sm",t=Object(Q.a)();return Object($.a)(t.breakpoints.down(e))},ee=function(){var e=Object(s.f)((function(e){return void 0===e.layout.user}));return!(!Object(s.f)((function(e){return void 0!==e.layout.user}))||e)},te=function(){var e=ee(),t=Object(s.f)((function(e){var t,a,n,r,o;return null!==(t=null===(a=e.layout.user)||void 0===a||null===(n=a.signInUserSession)||void 0===n||null===(r=n.idToken)||void 0===r||null===(o=r.payload)||void 0===o?void 0:o.email)&&void 0!==t?t:""})),a=E.adminUsers.split(",");return!!(e&&a.findIndex((function(e){return e.trim().toLowerCase()===t.trim().toLowerCase()}))>-1)},ae=function(){return e="auth",Object(s.f)((function(t){return t.layout[e]}),s.d)||{};var e};var ne=function(e){var t=e.setState,a=void 0===t?void 0:t,r=e.onSuccess,o=void 0===r?void 0:r,i=Object(s.e)(),l=function(e){var t=e.url,a=e.setState,r=void 0===a?void 0:a,o=e.onSuccess,i=void 0===o?void 0:o,l=e.onError,s=void 0===l?void 0:l,u=e.method,d=void 0===u?"post":u,p=n.useState(),b=Object(c.a)(p,2),h=b[0],f=b[1],g=ae().access;return{handleRequest:n.useCallback((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0;function o(){return c.apply(this,arguments)}function c(){return(c=Object(K.a)(J.a.mark((function o(){var c,l,u,p,b,v;return J.a.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:f(void 0);try{console.log({access:g,method:d,url:t}),c={data:{success:!0,email:"test@test.com"}},console.log("Successful request."),console.log({response:c,values:e}),r&&r((function(e){return Object(m.a)(Object(m.a)({},e),{},{success:!0,disabled:!1,submitting:!1,errors:{},response:c})})),i&&i(c),a&&a(c)}catch(h){u=h.response,p=null!==(l=null===u||void 0===u?void 0:u.data)&&void 0!==l?l:{},b=p.error_text,v=void 0===b?"Unknown error":b,console.error({error_text:v,error:h,values:e}),f(v),r&&r((function(e){return Object(m.a)(Object(m.a)({},e),{},{success:!1,disabled:!1,submitting:!1,errors:{},response:u})})),s&&s(u),n&&n(u)}case 2:case"end":return o.stop()}}),o)})))).apply(this,arguments)}r&&r((function(e){return Object(m.a)(Object(m.a)({},e),{},{success:!1,disabled:!0,submitting:!0,response:void 0})})),o()}),[g,t,d,r,f,i,s]),error:h,setError:f}}({url:"/auth/login?debug=true",setState:a,onSuccess:n.useCallback((function(e){i({type:"LOGIN",auth:e.data}),console.log("Successfully logged in."),o&&o()}),[i,o])});return{handleLogin:l.handleRequest,error:l.error,setError:l.setError}},re=function(){return Object(s.f)((function(e){return e.layout.height}))},oe=function(){var e=n.useRef(null),t=F()(e).height,a=function(){var e=Object(s.e)();return n.useCallback((function(t){return e({type:"RESIZE_APPBAR",height:t})}),[e])}();return n.useEffect((function(){a(t)}),[a,t]),e},ie=function(){var e=Object(Y.f)().pathname,t=Object(Y.e)();return n.useCallback((function(a){return e!==a&&t&&t.push(a)}),[t,e])},ce={flexGrow:1,zIndex:1,overflow:"hidden",position:"fixed",display:"static",width:"100%",height:"100%"},le=Object(Z.a)((function(e){var t=e.layout;return Object(q.a)({root:{},dimensions:{overflow:"hidden",position:"fixed",width:"calc(100vw)",height:"calc(100vh)"},backdrop:Object(m.a)(Object(m.a)({},ce),{},{background:t.backdropColor}),viewport:function(e){return Object(m.a)(Object(m.a)({},ce),{},{height:e.height,width:e.width,background:t.backgroundColor})}})}));function se(e){var t=e.children,a=n.useRef(null),r=F()(a),o=r.height,i=r.width,c=le({height:o,width:i}),l=function(){var e=Object(s.e)();return n.useCallback((function(t){return e(Object(m.a)({type:"RESIZE_VIEWPORT"},t))}),[e])}();return n.useEffect((function(){l({height:o,width:i})}),[l,o,i]),n.createElement(n.Fragment,null,n.createElement("div",{ref:a,className:c.dimensions}),n.createElement("div",{id:"backdrop",className:c.backdrop},n.createElement("div",{id:"viewport",className:c.viewport},t)))}var ue=a(157),de=a(116);function me(){return n.createElement(ue.a,{container:!0,alignItems:"center"},n.createElement(ue.a,{item:!0},n.createElement(de.a,{variant:"h5"},"Playground Placeholder")))}function pe(){return n.createElement(ue.a,{container:!0,alignItems:"center"},n.createElement(ue.a,{item:!0},n.createElement(de.a,{variant:"h5"},"Home Placeholder")))}var be=function(){return n.createElement(Y.c,null,n.createElement(Y.a,{exact:!0,path:"/",component:pe}),n.createElement(Y.a,{exact:!0,path:k("/"),component:pe}),n.createElement(Y.a,{exact:!0,path:k("/PlayGround"),component:me}))},he=a(166),fe=a(91),ge=a(180),ve=a(164),Ee=a(165),ye=a(60),Oe=a.n(ye),we=a(158),je=a(177),ke=a(159),Ce=function(e){var t=Object(s.e)();return[Object(s.f)((function(t){return t.selector[e]||N})),r.a.useCallback((function(a){return t(function(e,t){return{type:"UPDATE_SELECTOR",id:e,payload:t}}(e,a))}),[e,t])]},xe=Object(Z.a)((function(e){var t=e.palette;return Object(q.a)({root:function(e){var a=e.rounded;return{background:t.common.white,color:t.text.primary,borderRadius:a?void 0:0,padding:0}},tabs:function(e){return{minHeight:e.minHeight,borderRadius:"inherit"}},indicator:{background:t.primary.main,color:t.common.white,"&:hover":{color:t.common.white},height:6,marginBottom:4,zIndex:0,borderRadius:25},labelIcon:function(e){return{zIndex:1,minHeight:e.minHeight,color:t.primary.dark}},selected:function(e){e.minHeight;return{color:t.primary.main}},tabroot:function(e){return{padding:0,zIndex:1,minWidth:0,minHeight:e.minHeight}},wrapper:{display:"inline-flex",alignItems:"center",justifyContent:"center",width:"100%",flexDirection:"column",borderRadius:"inherit"}})})),Ie=function(e){var t,a=e.id,r=e.tabs,o=void 0===r?[]:r,i=e.orientation,l=e.wrapped,s=e.minHeight,u=void 0===s?64:s,d=e.rounded,m=void 0===d||d,p=e.onChange,b=xe({minHeight:u,rounded:m}),h=Ce(a),f=Object(c.a)(h,2),g=f[0],v=f[1],E=g.value,y=Object(Y.f)().pathname,O=o[0]&&o[0].id,k=null===(t=o.find((function(e){return e.id===E})))||void 0===t?void 0:t.route,C=y!==k&&o.find((function(e){return e.route===y}));n.useEffect((function(){w(E)&&v({value:O}),C&&v({value:C.id}),j()}),[v,E,O,C]),n.useEffect((function(){j()}),[i]);var x=n.useCallback((function(e,t){v({value:t}),p&&p(t)}),[v,p]),I=g.value,T=void 0===I?o[0].id:I;return n.createElement(we.a,{className:b.root},n.createElement(je.a,{variant:"fullWidth",className:b.tabs,scrollButtons:"off",value:T,onChange:x,classes:{indicator:b.indicator}},o?o.map((function(e){return n.createElement(ke.a,{key:e.id,classes:{root:b.tabroot,labelIcon:b.labelIcon,wrapper:b.wrapper,wrapped:b.labelIcon,selected:b.selected},icon:e.icon&&n.createElement(e.icon,{style:{marginBottom:0}}),value:e.id,wrapped:l,label:n.createElement(de.a,{variant:"caption",style:{maxWidth:"calc(100% - ".concat(2,"px)")},noWrap:!l},e.label?e.label:e.id)})})):n.createElement(n.Fragment,null)))},Te=a(160),Se=a(161),Ne=a(162),Be=a(163),Ae=a(167),Re=a(168),Le=Object(Z.a)((function(e){var t,a=e.breakpoints,n=e.palette,r=e.layout;return Object(q.a)({appBar:{paddingTop:r.footerheight,color:n.primary.main,background:n.common.white,paddingLeft:r.contentpadding,paddingRight:r.contentpadding},appBarFullScreen:{paddingTop:r.footerheight,background:n.common.white,color:n.primary.dark},logo:(t={paddingLeft:8,paddingRight:16,height:r.toolbarheight-16},Object(A.a)(t,a.down("xs"),{display:"none"}),Object(A.a)(t,"cursor","pointer"),t),active:{backgroundColor:n.primary.dark},toolbar:{background:n.white}})})),He=[{id:"My Classes",icon:Te.a,route:"/Classes"},{id:"My Calendar",icon:Se.a,route:"/Calendar"},{id:"My Profile",icon:Ne.a,route:"/Profile"},{id:"Help",icon:Be.a,route:"/Help"}],Pe=function(e){return n.createElement(Ie,Object.assign({id:"AppBar",tabs:He},e))};function ze(){var e=Le(),t=function(){var e=ie();return n.useCallback((function(t){return function(a){return e(t)}}),[e])}(),a=ee(),r=n.useState(null),o=Object(c.a)(r,2),i=o[0],l=o[1],u=Boolean(i),d=function(){var e=Object(s.e)();return n.useCallback((function(t){return e({type:"SET_USER",user:t})}),[e])}(),m=function(){var e=Object(s.e)();return n.useCallback((function(){return e({type:"LOGOUT"})}),[e])}(),p=n.useCallback((function(){d(void 0),m(),l(null)}),[d,l,m]),b=ie(),h=n.useCallback((function(e){var t=He.find((function(t){return t.id===e})).route;b(k(t))}),[b]),f=X("xs");return n.createElement(ve.a,{ref:oe(),position:"fixed",color:"inherit",elevation:1,className:f?e.appBarFullScreen:e.appBar},n.createElement(Ee.a,{className:e.toolbar,disableGutters:!0},n.createElement(ue.a,{container:!0,alignItems:"center",spacing:0},n.createElement(ue.a,{item:!0},n.createElement("img",{className:e.logo,src:Oe.a,alt:"logo",onClick:t(k("/"))})),n.createElement(ue.a,{item:!0,xs:!0,style:{marginLeft:4,marginRight:4,minWidth:0}},n.createElement(Pe,{onChange:h})),n.createElement(ue.a,{item:!0},n.createElement(ue.a,{container:!0,justify:"flex-end",alignItems:"center"},n.createElement(ue.a,{item:!0},n.createElement(he.a,{color:"inherit","aria-label":"account of current user","aria-haspopup":"true",onClick:function(e){l(e.currentTarget)}},a?n.createElement(Ae.a,null):n.createElement(Re.a,null)),n.createElement(fe.a,{id:"menu-appbar",anchorEl:i,anchorOrigin:{vertical:"top",horizontal:"right"},keepMounted:!0,transformOrigin:{vertical:"top",horizontal:"right"},open:u,onClose:function(){l(null)},MenuListProps:{style:{paddingTop:a?0:void 0}}},[n.createElement(ge.a,{key:"signout",onClick:p},"Sign Out")])))))))}var De=a(169),We=Object(Z.a)((function(e){var t=e.palette,a=e.zIndex;return Object(q.a)({bottomAppBar:{top:"auto",bottom:0,zIndex:a.drawer+1,background:t.primary.dark,color:t.common.white},bottomAppBarBeta:{top:0,background:t.primary.main,color:t.common.white,zIndex:a.drawer+1},bottomToolBar:{minHeight:g.layout.footerheight}})}));function Me(){var e=We({}),t=X(),a=Object(s.f)((function(e){var t,a,n,r,o;return null!==(t=null===(a=e.layout.user)||void 0===a||null===(n=a.signInUserSession)||void 0===n||null===(r=n.idToken)||void 0===r||null===(o=r.payload)||void 0===o?void 0:o.email)&&void 0!==t?t:"Username"}));return n.createElement(n.Fragment,null,n.createElement(ve.a,{position:"fixed",color:"primary",className:e.bottomAppBar},n.createElement(Ee.a,{className:e.bottomToolBar},n.createElement(ue.a,{container:!0,justify:"flex-start"},n.createElement(ue.a,{item:!0,xs:t?5:2,zeroMinWidth:!0},n.createElement(de.a,{noWrap:!0,variant:"body2",align:"left"},n.createElement(De.a,{href:"https://www.digitalpsych.org/",target:"_blank",variant:"body2",color:"inherit"},"Division of Digital Psychiatry"))),!t&&n.createElement(ue.a,{item:!0,xs:7,zeroMinWidth:!0},n.createElement(de.a,{noWrap:!0,variant:"body2",align:"center"},n.createElement(De.a,{href:"https://www.bidmc.org/",target:"_blank",variant:"body2",color:"inherit"},"This website is made possible by support from ..."))),n.createElement(ue.a,{item:!0,xs:t?7:3,zeroMinWidth:!0},n.createElement(de.a,{noWrap:!0,variant:"body2",align:"right"},n.createElement(De.a,{href:"https://www.bidmc.org/",target:"_blank",variant:"body2",color:"inherit"},"\xa92020 Beth Israel Deaconess Medical Center")))))),n.createElement(ve.a,{elevation:1,position:"fixed",color:"secondary",className:e.bottomAppBarBeta},n.createElement(Ee.a,{className:e.bottomToolBar},n.createElement(ue.a,{container:!0,justify:"center",spacing:2},n.createElement(ue.a,{item:!0,xs:4},n.createElement(de.a,{noWrap:!0,variant:"body2"},"Under Construction")),n.createElement(ue.a,{item:!0,xs:8},n.createElement(ue.a,{container:!0,justify:"flex-end",spacing:1},n.createElement(ue.a,{item:!0},n.createElement(de.a,{noWrap:!0,variant:"body2",align:"right"},t?a:"Welcome, ".concat(a)))))))))}var _e=a(92),Ue=a(3),Ge=a(85),Fe=a.n(Ge),Ze=a(87),qe=a.n(Ze),Ve=a(88),Je=a.n(Ve),Ke=a(89),Ye=a.n(Ke),Qe=a(63),$e=a(170),Xe=a(181),et=a(171),tt=a(86),at=a.n(tt),nt={success:Fe.a,warning:at.a,error:qe.a,info:Je.a},rt=Object(Z.a)((function(e){return{success:{backgroundColor:Qe.a[600]},error:{backgroundColor:e.palette.error.dark},info:{backgroundColor:e.palette.primary.main},warning:{backgroundColor:$e.a[700]},icon:{fontSize:20},iconVariant:{opacity:.9,marginRight:e.spacing(1)},message:{display:"flex",alignItems:"center"}}}));function ot(e){var t=e.className,a=void 0===t?void 0:t,r=Object(_e.a)(e,["className"]),o=rt({}),i=function(){var e=Object(s.e)();return[Object(s.f)((function(e){return e.snackBar}),s.d),n.useCallback((function(t){return e(function(e){return{type:"SNACKBAR",payload:e}}(t))}),[e])]}(),l=Object(c.a)(i,2),u=l[0],d=u.open,m=u.message,p=u.variant,b=void 0===p?"success":p,h=l[1],f=n.useCallback((function(e,t){return"clickaway"!==t&&h({open:!1})}),[h]),g=nt[b];return n.createElement(Xe.a,{anchorOrigin:{vertical:"bottom",horizontal:"right"},open:d,autoHideDuration:3e3,onClose:f},n.createElement(et.a,Object.assign({className:Object(Ue.a)(o[b],a),"aria-describedby":"client-snackbar",message:n.createElement("span",{id:"client-snackbar",className:o.message},n.createElement(g,{className:Object(Ue.a)(o.icon,o.iconVariant)}),m),action:[n.createElement(he.a,{key:"close","aria-label":"close",color:"inherit",onClick:f},n.createElement(Ye.a,{className:o.icon}))]},r)))}var it=Object(Z.a)((function(e){var t=e.breakpoints,a=e.palette,n=e.layout;return Object(q.a)({root:{display:"static"},content:Object(A.a)({flexGrow:1,backgroundColor:a.common.white},t.down("sm"),{marginLeft:0,flexShrink:0}),innerContent:function(e){var t=e.overflow,a=void 0===t?"auto":t,r=e.contentHeight,o=e.padInnerContent,i=void 0===o||o;return{height:r-(i?2*n.contentpadding+1:0),overflow:a,padding:i?n.contentpadding:0}},toolbar:function(e){var t=e.appBarHeight;return{background:a.white,height:t}}})})),ct=["/"],lt=["/Home","/"];function st(e){var t=e.children,a=re(),r=Object(s.f)((function(e){return e.layout.appBarHeight})),o=a-[r,Object(Q.a)().layout.footerheight].reduce((function(e,t){return e+t}),0),i=Object(Y.f)().pathname,c=it({padInnerContent:!(lt.findIndex((function(e){return e===i}))>-1),overflow:ct.findIndex((function(e){return e===i}))>-1?"hidden":"auto",contentHeight:o,appBarHeight:r});return n.createElement("div",{"data-testid":"app-container",className:c.root},n.createElement("main",{className:c.content},n.createElement(ze,null),n.createElement("div",{className:c.toolbar}),n.createElement("div",{className:c.innerContent},t),n.createElement(Me,null),n.createElement(ot,null)))}var ut=a(94),dt=a(172),mt=a(176),pt=a(174),bt=a(173),ht=a(18),ft=Object(Z.a)((function(e){var t=e.palette,a=e.mixins;return Object(q.a)({root:function(e){var a=e.height;return{background:t.common.white,color:t.primary.main,height:a,overflowY:"auto"}},paper:{marginTop:32,width:300},disclaimer:{marginTop:32,maxWidth:650},panelarea:{background:"#F5F5F5"},message:{color:"green"},button:{background:t.primary.main,color:t.common.white,"&:hover":{background:t.primary.dark,color:t.common.white},marginTop:8},toolbar:a.toolbar,wrapper:{width:224},buttonProgress:{position:"absolute",top:"50%",left:"50%",marginTop:-8,marginLeft:-12},container:{overflowY:"auto"}})})),gt=function(e){var t=e.email,a=e.password,n={};return w(t)&&(n.email="Required"),w(a)&&(n.password="Required"),function(e){return/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(e).toLowerCase())}(t)||(n.email="Invalid email format"),n};function vt(){var e=re(),t=ft({height:e}),a=n.useRef(null),r=n.useState({email:"",password:""}),o=Object(c.a)(r,2),i=o[0],l=o[1],u=i.email,d=i.password,p=n.useState({disabled:!1}),b=Object(c.a)(p,2),h=b[0].disabled,f=b[1],g=Object(s.e)(),v=ne({setState:f}),E=v.handleLogin,y=v.error,O=n.useState({}),j=Object(c.a)(O,2),k=j[0],C=j[1],x=n.useCallback((function(){g(Object(ht.d)("")),console.log(gt),E({email:u,password:d})}),[E,u,d,g]),I=function(e){return function(t){l(Object(m.a)(Object(m.a)({},i),{},Object(A.a)({},e,t.target.value))),C({})}},T=n.useCallback((function(){alert("To be completed")}),[]),S=n.useCallback((function(){alert("To be completed")}),[]);return n.createElement("div",{className:t.root,onKeyUp:function(e){13===e.keyCode&&a.current&&a.current.click()}},n.createElement("form",{autoComplete:"off"},n.createElement(ue.a,{container:!0,direction:"column",justify:"center",alignItems:"center"},n.createElement(ue.a,{item:!0},n.createElement(de.a,{align:"center",className:t.disclaimer},"")),n.createElement(ue.a,{item:!0,xs:12},n.createElement(ut.a,{className:t.paper},n.createElement(de.a,{align:"center",className:t.panelarea},n.createElement("img",{src:Oe.a,alt:"logo",style:{height:124}})),n.createElement(dt.a,null),n.createElement(ue.a,{container:!0,spacing:1,direction:"column",justify:"center",alignItems:"center",style:{padding:16}},n.createElement(ue.a,{item:!0},n.createElement(mt.a,{autoComplete:"new-password",id:"email",label:"Email",disabled:h,value:i.email,onChange:I("email"),margin:"dense",variant:"outlined",error:!w(k.email),helperText:k.email,autoFocus:!0,InputLabelProps:{shrink:!0}})),n.createElement(ue.a,{item:!0},n.createElement(mt.a,{autoComplete:"new-password",id:"password",label:"Password",disabled:h,type:"password",value:i.password,onChange:I("password"),margin:"dense",variant:"outlined",error:!w(k.password),helperText:k.password,fullWidth:!0,InputLabelProps:{shrink:!0}})),n.createElement(ue.a,{item:!0},n.createElement("div",{className:t.wrapper},n.createElement(bt.a,{ref:a,fullWidth:!0,disabled:h,variant:"contained",className:t.button,onClick:x},"Login"),h&&n.createElement(pt.a,{size:24,className:t.buttonProgress}))),n.createElement(ue.a,{item:!0},n.createElement("div",{style:{marginTop:16}},n.createElement(De.a,{style:{marginLeft:8,cursor:"pointer"},underline:"always",color:"inherit",onClick:S},"Create New Account"))),n.createElement(ue.a,{item:!0},n.createElement("div",{style:{marginTop:16}},n.createElement(De.a,{style:{marginLeft:8,cursor:"pointer"},underline:"always",color:"inherit",onClick:T},"Forgot Password")))),n.createElement(dt.a,null),n.createElement(de.a,{color:"error",align:"center",className:t.panelarea},y&&y))))))}function Et(e){var t=e.children,a=Object(s.f)((function(e){return e.layout.auth}));return void 0!==a&&null!==a?t:n.createElement(vt,null)}var yt=Object(s.c)((function(e,t){var a=t.history,n=e&&e.router&&e.router.location;return a.location=n||a.location,{history:a}}))((function(e){var t=e.history;return n.createElement(z.a,{history:t},n.createElement(Et,null,n.createElement(st,null,n.createElement(be,null))))})),Ot=Object(U.a)(),wt=window.initialReduxState,jt=function(e,t,a){"undefined"===typeof window||window;var n=!1,r=function(e,t){return Object(D.c)(Object.assign({},e,{router:Object(z.b)(t)}))}(H,e),o=Object(W.a)(_,r);return Object(D.d)(Object(D.a)(d.a,Object(P.a)(e)),n?n():function(e){return e})(D.e)(o,t)}(Ot,wt),kt=(jt.getState,Object(W.b)(jt));function Ct(e){var t=e.children,a=te(),o=function(){var e=Object(s.e)(),t=te(),a=n.useCallback((function(t){return e({type:"CHANGE_ADMIN_MODE",adminMode:t})}),[e]),r=Object(s.f)((function(e){return e.layout.adminMode}));return[t&&r,a]}(),i=Object(c.a)(o,1)[0];return r.a.createElement(l.a,{theme:a&&i?f:g},r.a.createElement(se,null,t))}function xt(e){var t=e.children;return r.a.createElement(s.a,{store:jt},r.a.createElement(u.a,{loading:null,persistor:kt},r.a.createElement(Ct,null,t)))}var It=function(){return r.a.createElement(xt,null,r.a.createElement(r.a.Suspense,{fallback:r.a.createElement(r.a.Fragment,null)},r.a.createElement(yt,{history:Ot})))};a(113),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));!function(){var e;console.log("%c\n\n\u2588\u2588\u2588\u2588\u2588\u2588\u2557  \u2588\u2588\u2588\u2588\u2588\u2588\u2557  \u2588\u2588\u2588\u2588\u2588\u2588\u2557 \u2588\u2588\u2588\u2588\u2588\u2588\u2557 \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\n\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557\u2588\u2588\u2554\u2550\u2550\u2550\u2588\u2588\u2557\u2588\u2588\u2554\u2550\u2550\u2550\u2588\u2588\u2557\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557\u2588\u2588\u2554\u2550\u2550\u2550\u2550\u255d\n\u2588\u2588\u2551  \u2588\u2588\u2551\u2588\u2588\u2551   \u2588\u2588\u2551\u2588\u2588\u2551   \u2588\u2588\u2551\u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255d\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\n\u2588\u2588\u2551  \u2588\u2588\u2551\u2588\u2588\u2551   \u2588\u2588\u2551\u2588\u2588\u2551   \u2588\u2588\u2551\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557\u255a\u2550\u2550\u2550\u2550\u2588\u2588\u2551\n\u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255d\u255a\u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255d\u255a\u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255d\u2588\u2588\u2551  \u2588\u2588\u2551\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2551\n\u255a\u2550\u2550\u2550\u2550\u2550\u255d  \u255a\u2550\u2550\u2550\u2550\u2550\u255d  \u255a\u2550\u2550\u2550\u2550\u2550\u255d \u255a\u2550\u255d  \u255a\u2550\u255d\u255a\u2550\u2550\u2550\u2550\u2550\u2550\u255d \n\nHost: ".concat(window.location.protocol+"//"+window.location.hostname+(window.location.port?":"+window.location.port:"")+(void 0!==e?e:""),"\n\nEnvironment: ").concat("production","\nVersion: ").concat(E.version,"\n                         \n"),"font-family:monospace;color:"+g.palette.primary.main+";font-size:12px;")}(),i.a.render(r.a.createElement(It,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},36:function(e){e.exports=JSON.parse('{"name":"doors","version":"1.0.0","private":true,"homepage":"https://cvanem.github.io/doors","homepageNext":"https://doors.digitalpsych.org","adminUsers":"chris@greenlinkservices.com","identityPoolId":"","region":"us-east-1","dependencies":{"@material-ui/core":"4.11.0","@material-ui/icons":"4.9.1","@material-ui/lab":"4.0.0-alpha.56","@reactions/component":"2.0.2","@rehooks/component-size":"1.0.3","@types/classnames":"2.2.10","@types/history":"4.7.5","@types/node":"12.12.14","@types/react-redux":"7.1.9","@types/react-router":"5.1.8","@types/react-router-dom":"5.1.5","@types/webpack":"4.41.22","@types/webpack-env":"1.15.2","aws-amplify":"3.1.1","aws-sdk":"2.747.0","axios":"0.20.0","classnames":"2.2.6","connected-react-router":"6.8.0","deepmerge":"4.2.2","history":"4.10.1","localforage":"1.7.4","mui-virtualized-table":"3.0.0-6","react":"16.13.1","react-container-dimensions":"1.4.1","react-dom":"16.13.1","react-draggable":"4.4.3","react-number-format":"4.4.1","react-redux":"7.2.1","react-router":"5.2.0","react-scripts":"3.4.3","react-swipeable-views":"0.13.9","react-virtualized":"9.22.2","redux":"4.0.5","redux-persist":"6.0.0","redux-thunk":"2.3.0","typescript":"3.9.5"},"devDependencies":{"fs-extra":"9.0.0"},"scripts":{"start":"react-scripts start","build":"react-scripts build && node copy404","test":"react-scripts test","eject":"react-scripts eject","predeploy":"yarn build","deploy":"gh-pages -d build"},"eslintConfig":{"extends":"react-app"},"prettier":{"printWidth":160,"trailingComma":"none","tabWidth":2,"tabs":false,"semi":true,"singleQuote":true,"jsxSingleQuote":true,"bracketSpacing":true,"arrowParens":"avoid"},"browserslist":{"production":[">0.2%","not dead","not op_mini all"],"development":["last 1 chrome version","last 1 firefox version","last 1 safari version"]}}')},60:function(e,t,a){e.exports=a.p+"static/media/logo.83e76d20.png"}},[[101,1,2]]]);
//# sourceMappingURL=main.04522dd2.chunk.js.map