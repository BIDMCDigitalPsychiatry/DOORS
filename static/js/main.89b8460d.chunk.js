(this.webpackJsonpdoors=this.webpackJsonpdoors||[]).push([[0],{102:function(e,t,a){e.exports=a(115)},114:function(e,t,a){},115:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(11),i=a.n(o),c=a(20),l=a(176),s=a(8),u=a(78),d=a(79),m=a(6),p=a(91),b=Object(p.a)({}),g={palette:{type:"light",primary:{main:"#00A2EF",light:"#65C6F4",dark:"#005077"},secondary:{main:"#388e3c",light:"#6abf69",dark:"#00600f"}},layout:{toolbarheight:64,contentpadding:8,contentrowspacing:2,tablefooterheight:20,tablefilterbarheight:52,tabletoolbarheight:2*b.spacing(5.5),tableRowHeight:b.spacing(6),footerheight:24,progressSize:80,tabheight:116},overrides:{MuiTooltip:{tooltip:{maxWidth:700}},MuiTypography:{h6:{lineHeight:1.2},subtitle1:{lineHeight:1.4}},MuiDialogTitle:{root:{paddingLeft:16,paddingRight:16,paddingTop:12,paddingBottom:12}},MuiDialogActions:{root:{background:b.palette.grey[100],display:"flex",alignItems:"center",justifyContent:"flex-end",flex:"0 0 auto",margin:0,padding:"8px 4px"}},MuiListItemIcon:{root:{color:b.palette.grey[100]}}}},h=Object(p.a)(Object(m.a)({},g)),f=Object(p.a)(g),v={auth:void 0,width:0,height:0,appBarHeight:f.layout.toolbarheight,adminMode:!1},E=a(36);var y=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0;return"function"===typeof e?e(t):e};function O(e,t){return Object(m.a)(Object(m.a)({},e),t)}function j(e){return!e||0===e.length}function w(){window.dispatchEvent(new CustomEvent("resize")),setTimeout((function(){return window.dispatchEvent(new CustomEvent("resize"))}),200)}var k=function(e){return"/doors"+e};function A(e,t){var a=t.payload,n=t.id,r=y(a,e[n]),o=Object(m.a)({},e);return o[n]=r,e&&e[n]&&(o[n]=r),o}function C(e,t){return t.filter((function(t){return!e[t.id]})).map((function(t){return x(e,t)})).reduce(O,Object(m.a)({},e))}function x(e,t){var a=Object(m.a)({},e);return a[t.id]=t,e&&e[t.id]&&(a[t.id]=Object(m.a)(Object(m.a)({},e[t.id]),t)),a}var I=[];var S={"Getting Started":{open:!0}};var B={};var N={},H=a(21);function T(e,t){var a=t.table,n=t.id,r=t.payload,o="function"===typeof r?r(e[a]?e[a][n]:void 0):r;if(e[a]){if(e[a]&&!e[a][n])return Object(m.a)(Object(m.a)({},e),{},Object(H.a)({},a,Object(m.a)(Object(H.a)({},n,o),e[a])));var i=Object(m.a)({},e);return i[a][n]=o,i}return Object(m.a)(Object(m.a)({},e),{},Object(H.a)({},a,Object(H.a)({},n,o)))}var R={};var D={layout:function(e,t){switch(t.type){case"LOGIN":return Object(m.a)(Object(m.a)({},e),{},{auth:t.auth});case"SET_USER":return Object(m.a)(Object(m.a)({},e),{},{user:t.user});case"RESIZE_APPBAR":return Object(m.a)(Object(m.a)({},e),{},{appBarHeight:t.height});case"RESIZE_VIEWPORT":return Object(m.a)(Object(m.a)({},e),{},{height:t.height,width:t.width});case"CHANGE_ADMIN_MODE":return Object(m.a)(Object(m.a)({},e),{},{adminMode:t.adminMode})}return e||Object(m.a)({},v)},dialog:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:S,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"UPDATE_DIALOG":return A(e,t);case"LOGOUT":return S;default:return e}},table:function(e,t){switch(t.type){case"TABLE_UPDATE":return x(e,t.table);case"persist/REHYDRATE":var a=t&&t.payload,n=a&&a.table;return C(n||[],I)}return C(e?Object(m.a)({},e):[],I)},selector:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:B,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"UPDATE_SELECTOR":return A(e,t);case"LOGOUT":return B;default:return e}},snackBar:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:N,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SNACKBAR":return Object(m.a)(Object(m.a)({},e),t.payload);default:return e}},database:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:R,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_DATABASE_TABLE":var a=Object(m.a)({},e);return a[t.table]=t.payload,a;case"UPDATE_DATABASE":return T(e,t);case"LOGOUT":return R;default:return e}}},M=a(76),L=a(50),z=a(24),P=a(61),W=a(48);W&&W.config&&W.config({driver:W.INDEXEDDB,name:"".concat(E.name,"-local-storage"),version:1,size:4980736,storeName:"keyvaluepairs",description:"".concat(E.name," application database")});var X={key:"app",storage:W};var G=a(26),U=a(57),Y=a.n(U),F=a(156),J=a(180),V=a(68),Z=a.n(V),K=a(83),q=a(19),Q=a(30),_=a(155),$=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"sm",t=Object(Q.a)();return Object(_.a)(t.breakpoints.down(e))},ee=function(){var e=Object(s.f)((function(e){return void 0===e.layout.user}));return!(!Object(s.f)((function(e){return void 0!==e.layout.user}))||e)},te=function(){var e=ee(),t=Object(s.f)((function(e){var t,a,n,r,o;return null!==(t=null===(a=e.layout.user)||void 0===a||null===(n=a.signInUserSession)||void 0===n||null===(r=n.idToken)||void 0===r||null===(o=r.payload)||void 0===o?void 0:o.email)&&void 0!==t?t:""})),a=E.adminUsers.split(",");return!!(e&&a.findIndex((function(e){return e.trim().toLowerCase()===t.trim().toLowerCase()}))>-1)},ae=function(){return e="auth",Object(s.f)((function(t){return t.layout[e]}),s.d)||{};var e};var ne=function(e){var t=e.setState,a=void 0===t?void 0:t,r=e.onSuccess,o=void 0===r?void 0:r,i=Object(s.e)(),l=function(e){var t=e.url,a=e.setState,r=void 0===a?void 0:a,o=e.onSuccess,i=void 0===o?void 0:o,l=e.onError,s=void 0===l?void 0:l,u=e.method,d=void 0===u?"post":u,p=n.useState(),b=Object(c.a)(p,2),g=b[0],h=b[1],f=ae().access;return{handleRequest:n.useCallback((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0;function o(){return c.apply(this,arguments)}function c(){return(c=Object(K.a)(Z.a.mark((function o(){var c,l,u,p,b,v;return Z.a.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:h(void 0);try{console.log({access:f,method:d,url:t}),c={data:{success:!0,email:"test@test.com"}},console.log("Successful request."),console.log({response:c,values:e}),r&&r((function(e){return Object(m.a)(Object(m.a)({},e),{},{success:!0,disabled:!1,submitting:!1,errors:{},response:c})})),i&&i(c),a&&a(c)}catch(g){u=g.response,p=null!==(l=null===u||void 0===u?void 0:u.data)&&void 0!==l?l:{},b=p.error_text,v=void 0===b?"Unknown error":b,console.error({error_text:v,error:g,values:e}),h(v),r&&r((function(e){return Object(m.a)(Object(m.a)({},e),{},{success:!1,disabled:!1,submitting:!1,errors:{},response:u})})),s&&s(u),n&&n(u)}case 2:case"end":return o.stop()}}),o)})))).apply(this,arguments)}r&&r((function(e){return Object(m.a)(Object(m.a)({},e),{},{success:!1,disabled:!0,submitting:!0,response:void 0})})),o()}),[f,t,d,r,h,i,s]),error:g,setError:h}}({url:"/auth/login?debug=true",setState:a,onSuccess:n.useCallback((function(e){i({type:"LOGIN",auth:e.data}),console.log("Successfully logged in."),o&&o()}),[i,o])});return{handleLogin:l.handleRequest,error:l.error,setError:l.setError}},re=function(){return Object(s.f)((function(e){return e.layout.height}))},oe=function(){var e=n.useRef(null),t=Y()(e).height,a=function(){var e=Object(s.e)();return n.useCallback((function(t){return e({type:"RESIZE_APPBAR",height:t})}),[e])}();return n.useEffect((function(){a(t)}),[a,t]),e},ie=function(){var e=Object(q.f)().pathname,t=Object(q.e)();return n.useCallback((function(a){return e!==a&&t&&t.push(a)}),[t,e])},ce={flexGrow:1,zIndex:1,overflow:"hidden",position:"fixed",display:"static",width:"100%",height:"100%"},le=Object(F.a)((function(e){var t=e.layout;return Object(J.a)({root:{},dimensions:{overflow:"hidden",position:"fixed",width:"calc(100vw)",height:"calc(100vh)"},backdrop:Object(m.a)(Object(m.a)({},ce),{},{background:t.backdropColor}),viewport:function(e){return Object(m.a)(Object(m.a)({},ce),{},{height:e.height,width:e.width,background:t.backgroundColor})}})}));function se(e){var t=e.children,a=n.useRef(null),r=Y()(a),o=r.height,i=r.width,c=le({height:o,width:i}),l=function(){var e=Object(s.e)();return n.useCallback((function(t){return e(Object(m.a)({type:"RESIZE_VIEWPORT"},t))}),[e])}();return n.useEffect((function(){l({height:o,width:i})}),[l,o,i]),n.createElement(n.Fragment,null,n.createElement("div",{ref:a,className:c.dimensions}),n.createElement("div",{id:"backdrop",className:c.backdrop},n.createElement("div",{id:"viewport",className:c.viewport},t)))}var ue=a(158),de=a(117);function me(){return n.createElement(ue.a,{container:!0,alignItems:"center"},n.createElement(ue.a,{item:!0},n.createElement(de.a,{variant:"h5"},"Playground Placeholder")))}function pe(){return n.createElement(ue.a,{container:!0,alignItems:"center"},n.createElement(ue.a,{item:!0},n.createElement(de.a,{variant:"h5"},"Home Placeholder")))}var be=function(){return n.createElement(q.c,null,n.createElement(q.a,{exact:!0,path:"/",component:pe}),n.createElement(q.a,{exact:!0,path:k("/"),component:pe}),n.createElement(q.a,{exact:!0,path:k("/PlayGround"),component:me}))},ge=a(167),he=a(92),fe=a(181),ve=a(165),Ee=a(166),ye=a(84),Oe=a.n(ye),je=a(159),we=a(178),ke=a(160),Ae=function(e){var t=Object(s.e)();return[Object(s.f)((function(t){return t.selector[e]||B})),r.a.useCallback((function(a){return t(function(e,t){return{type:"UPDATE_SELECTOR",id:e,payload:t}}(e,a))}),[e,t])]},Ce=Object(F.a)((function(e){var t=e.palette;return Object(J.a)({root:function(e){var a=e.rounded;return{background:t.primary.dark,borderRadius:a?void 0:0,padding:0}},tabs:function(e){return{minHeight:e.minHeight,borderRadius:"inherit"}},indicator:{background:t.primary.main,"&:hover":{color:t.common.white},height:"100%",zIndex:0,borderRadius:"inherit"},labelIcon:function(e){return{zIndex:1,minHeight:e.minHeight}},tabroot:function(e){return{padding:0,zIndex:1,minWidth:0,minHeight:e.minHeight}},wrapper:{display:"inline-flex",alignItems:"center",justifyContent:"center",width:"100%",flexDirection:"column",borderRadius:"inherit"}})})),xe=function(e){var t,a=e.id,r=e.tabs,o=void 0===r?[]:r,i=e.orientation,l=e.wrapped,s=e.minHeight,u=void 0===s?64:s,d=e.rounded,m=void 0===d||d,p=e.onChange,b=Ce({minHeight:u,rounded:m}),g=Ae(a),h=Object(c.a)(g,2),f=h[0],v=h[1],E=f.value,y=Object(q.f)().pathname,O=o[0]&&o[0].id,k=null===(t=o.find((function(e){return e.id===E})))||void 0===t?void 0:t.route,A=y!==k&&o.find((function(e){return e.route===y}));n.useEffect((function(){j(E)&&v({value:O}),A&&v({value:A.id}),w()}),[v,E,O,A]),n.useEffect((function(){w()}),[i]);var C=n.useCallback((function(e,t){v({value:t}),p&&p(t)}),[v,p]),x=f.value,I=void 0===x?o[0].id:x;return n.createElement(je.a,{className:b.root},n.createElement(we.a,{variant:"fullWidth",className:b.tabs,scrollButtons:"off",value:I,onChange:C,classes:{indicator:b.indicator}},o?o.map((function(e){return n.createElement(ke.a,{key:e.id,classes:{root:b.tabroot,labelIcon:b.labelIcon,wrapper:b.wrapper,wrapped:b.labelIcon},icon:e.icon&&n.createElement(e.icon,{style:{marginBottom:0}}),value:e.id,wrapped:l,label:n.createElement(de.a,{variant:"caption",style:{maxWidth:"calc(100% - ".concat(2,"px)")},noWrap:!l},e.label?e.label:e.id)})})):n.createElement(n.Fragment,null)))},Ie=a(161),Se=a(162),Be=a(163),Ne=a(164),He=a(168),Te=a(169),Re=Object(F.a)((function(e){var t,a=e.breakpoints,n=e.palette,r=e.layout;return Object(J.a)({appBar:{paddingTop:r.footerheight,background:n.primary.dark,color:n.common.white,paddingLeft:r.contentpadding,paddingRight:r.contentpadding},appBarFullScreen:{paddingTop:r.footerheight,background:n.primary.dark,color:n.common.white},logo:(t={paddingLeft:8,paddingRight:16,height:r.toolbarheight-16},Object(H.a)(t,a.down("xs"),{display:"none"}),Object(H.a)(t,"cursor","pointer"),t),active:{backgroundColor:n.primary.dark},toolbar:{background:n.white},accountMenuItem:{pointerEvents:"none",background:n.primary.light,color:n.common.white}})})),De=[{id:"My Classes",icon:Ie.a,route:"/Classes"},{id:"My Calendar",icon:Se.a,route:"/Calendar"},{id:"My Profile",icon:Be.a,route:"/Profile"},{id:"Help",icon:Ne.a,route:"/Help"}],Me=function(e){return n.createElement(xe,Object.assign({id:"AppBar",tabs:De},e))};function Le(){var e=Re(),t=function(){var e=ie();return n.useCallback((function(t){return function(a){return e(t)}}),[e])}(),a=ee(),r=n.useState(null),o=Object(c.a)(r,2),i=o[0],l=o[1],u=Boolean(i),d=function(){var e=Object(s.e)();return n.useCallback((function(t){return e({type:"SET_USER",user:t})}),[e])}(),m=n.useCallback((function(){d(void 0),l(null)}),[d,l]),p=ie(),b=n.useCallback((function(e){var t=De.find((function(t){return t.id===e})).route;p(k(t))}),[p]),g=$("xs");return n.createElement(ve.a,{ref:oe(),position:"fixed",color:"inherit",elevation:4,className:g?e.appBarFullScreen:e.appBar},n.createElement(Ee.a,{className:e.toolbar,disableGutters:!0},n.createElement(ue.a,{container:!0,alignItems:"center",spacing:0},n.createElement(ue.a,{item:!0},n.createElement("img",{className:e.logo,src:Oe.a,alt:"logo",onClick:t(k("/"))})),n.createElement(ue.a,{item:!0,xs:!0,style:{minWidth:0}},n.createElement(Me,{onChange:b})),n.createElement(ue.a,{item:!0},n.createElement(ue.a,{container:!0,justify:"flex-end",alignItems:"center"},n.createElement(ue.a,{item:!0},n.createElement(ge.a,{color:"inherit","aria-label":"account of current user","aria-haspopup":"true",onClick:function(e){l(e.currentTarget)}},a?n.createElement(He.a,null):n.createElement(Te.a,null)),n.createElement(he.a,{id:"menu-appbar",anchorEl:i,anchorOrigin:{vertical:"top",horizontal:"right"},keepMounted:!0,transformOrigin:{vertical:"top",horizontal:"right"},open:u,onClose:function(){l(null)},MenuListProps:{style:{paddingTop:a?0:void 0}}},[n.createElement(fe.a,{key:"signout",onClick:m},"Sign Out")])))))))}var ze=a(170),Pe=Object(F.a)((function(e){var t=e.palette,a=e.zIndex;return Object(J.a)({bottomAppBar:{top:"auto",bottom:0,zIndex:a.drawer+1,background:t.primary.dark,color:t.common.white},bottomAppBarBeta:{top:0,background:t.primary.main,color:t.common.white,zIndex:a.drawer+1},bottomToolBar:{minHeight:f.layout.footerheight}})}));function We(){var e=Pe({}),t=$(),a=Object(s.f)((function(e){var t,a,n,r,o;return null!==(t=null===(a=e.layout.user)||void 0===a||null===(n=a.signInUserSession)||void 0===n||null===(r=n.idToken)||void 0===r||null===(o=r.payload)||void 0===o?void 0:o.email)&&void 0!==t?t:"Username"}));return n.createElement(n.Fragment,null,n.createElement(ve.a,{position:"fixed",color:"primary",className:e.bottomAppBar},n.createElement(Ee.a,{className:e.bottomToolBar},n.createElement(ue.a,{container:!0,justify:"flex-start"},n.createElement(ue.a,{item:!0,xs:t?5:2,zeroMinWidth:!0},n.createElement(de.a,{noWrap:!0,variant:"body2",align:"left"},n.createElement(ze.a,{href:"https://www.digitalpsych.org/",target:"_blank",variant:"body2",color:"inherit"},"Division of Digital Psychiatry"))),!t&&n.createElement(ue.a,{item:!0,xs:7,zeroMinWidth:!0},n.createElement(de.a,{noWrap:!0,variant:"body2",align:"center"},n.createElement(ze.a,{href:"https://www.bidmc.org/",target:"_blank",variant:"body2",color:"inherit"},"This website is made possible by support from ..."))),n.createElement(ue.a,{item:!0,xs:t?7:3,zeroMinWidth:!0},n.createElement(de.a,{noWrap:!0,variant:"body2",align:"right"},n.createElement(ze.a,{href:"https://www.bidmc.org/",target:"_blank",variant:"body2",color:"inherit"},"\xa92020 Beth Israel Deaconess Medical Center")))))),n.createElement(ve.a,{elevation:1,position:"fixed",color:"secondary",className:e.bottomAppBarBeta},n.createElement(Ee.a,{className:e.bottomToolBar},n.createElement(ue.a,{container:!0,justify:"center",spacing:2},n.createElement(ue.a,{item:!0,xs:4},n.createElement(de.a,{noWrap:!0,variant:"body2"},"Under Construction")),n.createElement(ue.a,{item:!0,xs:8},n.createElement(ue.a,{container:!0,justify:"flex-end",spacing:1},n.createElement(ue.a,{item:!0},n.createElement(de.a,{noWrap:!0,variant:"body2",align:"right"},t?a:"Welcome, ".concat(a)))))))))}var Xe=a(93),Ge=a(3),Ue=a(85),Ye=a.n(Ue),Fe=a(87),Je=a.n(Fe),Ve=a(88),Ze=a.n(Ve),Ke=a(89),qe=a.n(Ke),Qe=a(62),_e=a(171),$e=a(182),et=a(172),tt=a(86),at=a.n(tt),nt={success:Ye.a,warning:at.a,error:Je.a,info:Ze.a},rt=Object(F.a)((function(e){return{success:{backgroundColor:Qe.a[600]},error:{backgroundColor:e.palette.error.dark},info:{backgroundColor:e.palette.primary.main},warning:{backgroundColor:_e.a[700]},icon:{fontSize:20},iconVariant:{opacity:.9,marginRight:e.spacing(1)},message:{display:"flex",alignItems:"center"}}}));function ot(e){var t=e.className,a=void 0===t?void 0:t,r=Object(Xe.a)(e,["className"]),o=rt({}),i=function(){var e=Object(s.e)();return[Object(s.f)((function(e){return e.snackBar}),s.d),n.useCallback((function(t){return e(function(e){return{type:"SNACKBAR",payload:e}}(t))}),[e])]}(),l=Object(c.a)(i,2),u=l[0],d=u.open,m=u.message,p=u.variant,b=void 0===p?"success":p,g=l[1],h=n.useCallback((function(e,t){return"clickaway"!==t&&g({open:!1})}),[g]),f=nt[b];return n.createElement($e.a,{anchorOrigin:{vertical:"bottom",horizontal:"right"},open:d,autoHideDuration:3e3,onClose:h},n.createElement(et.a,Object.assign({className:Object(Ge.a)(o[b],a),"aria-describedby":"client-snackbar",message:n.createElement("span",{id:"client-snackbar",className:o.message},n.createElement(f,{className:Object(Ge.a)(o.icon,o.iconVariant)}),m),action:[n.createElement(ge.a,{key:"close","aria-label":"close",color:"inherit",onClick:h},n.createElement(qe.a,{className:o.icon}))]},r)))}var it=Object(F.a)((function(e){var t=e.breakpoints,a=e.palette,n=e.layout;return Object(J.a)({root:{display:"static"},content:Object(H.a)({flexGrow:1,backgroundColor:a.common.white},t.down("sm"),{marginLeft:0,flexShrink:0}),innerContent:function(e){var t=e.overflow,a=void 0===t?"auto":t,r=e.contentHeight,o=e.padInnerContent,i=void 0===o||o;return{height:r-(i?2*n.contentpadding+1:0),overflow:a,padding:i?n.contentpadding:0}},toolbar:function(e){var t=e.appBarHeight;return{background:a.white,height:t}}})})),ct=["/"],lt=["/Home","/"];function st(e){var t=e.children,a=re(),r=Object(s.f)((function(e){return e.layout.appBarHeight})),o=a-[r,Object(Q.a)().layout.footerheight].reduce((function(e,t){return e+t}),0),i=Object(q.f)().pathname,c=it({padInnerContent:!(lt.findIndex((function(e){return e===i}))>-1),overflow:ct.findIndex((function(e){return e===i}))>-1?"hidden":"auto",contentHeight:o,appBarHeight:r});return n.createElement("div",{"data-testid":"app-container",className:c.root},n.createElement("main",{className:c.content},n.createElement(Le,null),n.createElement("div",{className:c.toolbar}),n.createElement("div",{className:c.innerContent},t),n.createElement(We,null),n.createElement(ot,null)))}var ut=a(95),dt=a(173),mt=a(177),pt=a(175),bt=a(174),gt=a(90),ht=a.n(gt),ft=a(18),vt=Object(F.a)((function(e){var t=e.palette,a=e.mixins;return Object(J.a)({root:{background:t.common.white,color:t.primary.main,height:"100vh"},paper:{marginTop:32,width:300},disclaimer:{marginTop:32,maxWidth:650},panelarea:{background:"#F5F5F5"},message:{color:"green"},button:{background:t.primary.main,color:t.common.white,"&:hover":{background:t.primary.dark,color:t.common.white},marginTop:8},toolbar:a.toolbar,wrapper:{width:224},buttonProgress:{position:"absolute",top:"50%",left:"50%",marginTop:-8,marginLeft:-12}})})),Et=function(e){var t=e.email,a=e.password,n={};return j(t)&&(n.email="Required"),j(a)&&(n.password="Required"),function(e){return/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(e).toLowerCase())}(t)||(n.email="Invalid email format"),n};function yt(){var e=vt(),t=n.useRef(null),a=n.useState({email:"",password:""}),r=Object(c.a)(a,2),o=r[0],i=r[1],l=o.email,u=o.password,d=n.useState({disabled:!1}),p=Object(c.a)(d,2),b=p[0].disabled,g=p[1],h=Object(s.e)(),f=ne({setState:g}),v=f.handleLogin,E=f.error,y=n.useState({}),O=Object(c.a)(y,2),w=O[0],k=O[1],A=n.useCallback((function(){h(Object(ft.d)("")),console.log(Et),v({email:l,password:u})}),[v,l,u,h]),C=function(e){return function(t){i(Object(m.a)(Object(m.a)({},o),{},Object(H.a)({},e,t.target.value))),k({})}},x=n.useCallback((function(){alert("To be completed")}),[]),I=n.useCallback((function(){alert("To be completed")}),[]);return n.createElement("div",{className:e.root,onKeyUp:function(e){13===e.keyCode&&t.current&&t.current.click()}},n.createElement("div",{className:e.toolbar}),n.createElement("form",{autoComplete:"off"},n.createElement(ue.a,{container:!0,direction:"column",justify:"center",alignItems:"center"},n.createElement(ue.a,{item:!0},n.createElement(de.a,{align:"center",className:e.disclaimer},"")),n.createElement(ue.a,{item:!0,xs:12},n.createElement(ut.a,{className:e.paper},n.createElement(de.a,{align:"center",className:e.panelarea},n.createElement("img",{src:ht.a,alt:"logo",style:{height:124}})),n.createElement(dt.a,null),n.createElement(ue.a,{container:!0,spacing:1,direction:"column",justify:"center",alignItems:"center",style:{padding:16}},n.createElement(ue.a,{item:!0},n.createElement(mt.a,{autoComplete:"new-password",id:"email",label:"Email",disabled:b,value:o.email,onChange:C("email"),margin:"dense",variant:"outlined",error:!j(w.email),helperText:w.email,autoFocus:!0,InputLabelProps:{shrink:!0}})),n.createElement(ue.a,{item:!0},n.createElement(mt.a,{autoComplete:"new-password",id:"password",label:"Password",disabled:b,type:"password",value:o.password,onChange:C("password"),margin:"dense",variant:"outlined",error:!j(w.password),helperText:w.password,fullWidth:!0,InputLabelProps:{shrink:!0}})),n.createElement(ue.a,{item:!0},n.createElement("div",{className:e.wrapper},n.createElement(bt.a,{ref:t,fullWidth:!0,disabled:b,variant:"contained",className:e.button,onClick:A},"Login"),b&&n.createElement(pt.a,{size:24,className:e.buttonProgress}))),n.createElement(ue.a,{item:!0},n.createElement("div",{style:{marginTop:16}},n.createElement(ze.a,{style:{marginLeft:8,cursor:"pointer"},underline:"always",color:"inherit",onClick:I},"Create New Account"))),n.createElement(ue.a,{item:!0},n.createElement("div",{style:{marginTop:16}},n.createElement(ze.a,{style:{marginLeft:8,cursor:"pointer"},underline:"always",color:"inherit",onClick:x},"Forgot Password")))),n.createElement(dt.a,null),n.createElement(de.a,{color:"error",align:"center",className:e.panelarea},E&&E))))))}function Ot(e){var t=e.children,a=Object(s.f)((function(e){return e.layout.auth}));return console.log({auth:a}),void 0!==a&&null!==a?t:n.createElement(yt,null)}var jt=Object(s.c)((function(e,t){var a=t.history,n=e&&e.router&&e.router.location;return a.location=n||a.location,{history:a}}))((function(e){var t=e.history;return n.createElement(L.a,{history:t},n.createElement(Ot,null,n.createElement(st,null,n.createElement(be,null))))})),wt=Object(G.a)(),kt=window.initialReduxState,At=function(e,t,a){"undefined"===typeof window||window;var n=!1,r=function(e,t){return Object(z.c)(Object.assign({},e,{router:Object(L.b)(t)}))}(D,e),o=Object(P.a)(X,r);return Object(z.d)(Object(z.a)(d.a,Object(M.a)(e)),n?n():function(e){return e})(z.e)(o,t)}(wt,kt),Ct=(At.getState,Object(P.b)(At));function xt(e){var t=e.children,a=te(),o=function(){var e=Object(s.e)(),t=te(),a=n.useCallback((function(t){return e({type:"CHANGE_ADMIN_MODE",adminMode:t})}),[e]),r=Object(s.f)((function(e){return e.layout.adminMode}));return[t&&r,a]}(),i=Object(c.a)(o,1)[0];return r.a.createElement(l.a,{theme:a&&i?h:f},r.a.createElement(se,null,t))}function It(e){var t=e.children;return r.a.createElement(s.a,{store:At},r.a.createElement(u.a,{loading:null,persistor:Ct},r.a.createElement(xt,null,t)))}var St=function(){return r.a.createElement(It,null,r.a.createElement(r.a.Suspense,{fallback:r.a.createElement(r.a.Fragment,null)},r.a.createElement(jt,{history:wt})))};a(114),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));!function(){var e;console.log("%c\n\n\u2588\u2588\u2588\u2588\u2588\u2588\u2557  \u2588\u2588\u2588\u2588\u2588\u2588\u2557  \u2588\u2588\u2588\u2588\u2588\u2588\u2557 \u2588\u2588\u2588\u2588\u2588\u2588\u2557 \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\n\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557\u2588\u2588\u2554\u2550\u2550\u2550\u2588\u2588\u2557\u2588\u2588\u2554\u2550\u2550\u2550\u2588\u2588\u2557\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557\u2588\u2588\u2554\u2550\u2550\u2550\u2550\u255d\n\u2588\u2588\u2551  \u2588\u2588\u2551\u2588\u2588\u2551   \u2588\u2588\u2551\u2588\u2588\u2551   \u2588\u2588\u2551\u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255d\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\n\u2588\u2588\u2551  \u2588\u2588\u2551\u2588\u2588\u2551   \u2588\u2588\u2551\u2588\u2588\u2551   \u2588\u2588\u2551\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557\u255a\u2550\u2550\u2550\u2550\u2588\u2588\u2551\n\u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255d\u255a\u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255d\u255a\u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255d\u2588\u2588\u2551  \u2588\u2588\u2551\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2551\n\u255a\u2550\u2550\u2550\u2550\u2550\u255d  \u255a\u2550\u2550\u2550\u2550\u2550\u255d  \u255a\u2550\u2550\u2550\u2550\u2550\u255d \u255a\u2550\u255d  \u255a\u2550\u255d\u255a\u2550\u2550\u2550\u2550\u2550\u2550\u255d \n\nHost: ".concat(window.location.protocol+"//"+window.location.hostname+(window.location.port?":"+window.location.port:"")+(void 0!==e?e:""),"\n\nEnvironment: ").concat("production","\nVersion: ").concat(E.version,"\n                         \n"),"font-family:monospace;color:"+f.palette.primary.main+";font-size:12px;")}(),i.a.render(r.a.createElement(St,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},36:function(e){e.exports=JSON.parse('{"name":"doors","version":"1.0.0","private":true,"homepage":"https://cvanem.github.io/doors","homepageNext":"https://doors.digitalpsych.org","adminUsers":"chris@greenlinkservices.com","identityPoolId":"","region":"us-east-1","dependencies":{"@material-ui/core":"4.11.0","@material-ui/icons":"4.9.1","@material-ui/lab":"4.0.0-alpha.56","@reactions/component":"2.0.2","@rehooks/component-size":"1.0.3","@types/classnames":"2.2.10","@types/history":"4.7.5","@types/node":"12.12.14","@types/react-redux":"7.1.9","@types/react-router":"5.1.8","@types/react-router-dom":"5.1.5","@types/webpack":"4.41.22","@types/webpack-env":"1.15.2","aws-amplify":"3.1.1","aws-sdk":"2.747.0","axios":"0.20.0","classnames":"2.2.6","connected-react-router":"6.8.0","deepmerge":"4.2.2","history":"4.10.1","localforage":"1.7.4","mui-virtualized-table":"3.0.0-6","react":"16.13.1","react-container-dimensions":"1.4.1","react-dom":"16.13.1","react-draggable":"4.4.3","react-number-format":"4.4.1","react-redux":"7.2.1","react-router":"5.2.0","react-scripts":"3.4.3","react-swipeable-views":"0.13.9","react-virtualized":"9.22.2","redux":"4.0.5","redux-persist":"6.0.0","redux-thunk":"2.3.0","typescript":"3.9.5"},"devDependencies":{"fs-extra":"9.0.0"},"scripts":{"start":"react-scripts start","build":"react-scripts build && node copy404","test":"react-scripts test","eject":"react-scripts eject","predeploy":"yarn build","deploy":"gh-pages -d build"},"eslintConfig":{"extends":"react-app"},"prettier":{"printWidth":160,"trailingComma":"none","tabWidth":2,"tabs":false,"semi":true,"singleQuote":true,"jsxSingleQuote":true,"bracketSpacing":true,"arrowParens":"avoid"},"browserslist":{"production":[">0.2%","not dead","not op_mini all"],"development":["last 1 chrome version","last 1 firefox version","last 1 safari version"]}}')},84:function(e,t){e.exports="data:image/png;base64,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"},90:function(e,t,a){e.exports=a.p+"static/media/logo.83e76d20.png"}},[[102,1,2]]]);
//# sourceMappingURL=main.89b8460d.chunk.js.map