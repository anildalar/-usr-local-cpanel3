"use strict";(self["webpackJsonpother-root"]=self["webpackJsonpother-root"]||[]).push([["src_app_core_client_module_ts"],{31336:(e,t,n)=>{n.d(t,{Q:()=>a});const a={path:"proactive-defense",loadChildren:()=>n.e("src_app_components_proactive-defense_proactive-defense_module_ts").then(n.bind(n,56490)).then((e=>e.ProactiveDefenseModule)),canActivate:[n(53624).qX],runGuardsAndResolvers:"always"}},48600:(e,t,n)=>{n.r(t),n.d(t,{ClientModule:()=>ne});var a=n(52191),i=n(50509),r=n(91792),o=n(53850),s=n(63358),p=n(72986),l=n(6009),c=n(63417),d=n(3594),u=n(92240),m=n(60136),g=n(67765),f=n(15815),h=n(29639),_=n(45837),v=n(50872),b=n(53530),x=n(39881),C=n(94564),y=n(33530),S=n(45271),M=n(17602),O=n(14633),E=n(38699),A=n(58160),I=n(58603);const N=function(e,t){return[e,t]};function P(e,t){1&e&&(o["\u0275\u0275elementStart"](0,"i360-settings-field",22),o["\u0275\u0275pipe"](1,"translate"),o["\u0275\u0275pipe"](2,"translate"),o["\u0275\u0275pipe"](3,"translate"),o["\u0275\u0275element"](4,"mat-checkbox",23),o["\u0275\u0275elementEnd"]()),2&e&&(o["\u0275\u0275propertyInterpolate"]("inputTitle",o["\u0275\u0275pipeBind1"](1,2,"settings.malware.general.tryToRestore.label")),o["\u0275\u0275property"]("description",o["\u0275\u0275pureFunction2"](8,N,o["\u0275\u0275pipeBind1"](2,4,"settings.malware.general.tryToRestore.descriptions.ifExists"),o["\u0275\u0275pipeBind1"](3,6,"settings.malware.general.tryToRestore.descriptions.otherwise"))))}function w(e,t){if(1&e&&(o["\u0275\u0275elementStart"](0,"mat-option",25),o["\u0275\u0275text"](1),o["\u0275\u0275pipe"](2,"translate"),o["\u0275\u0275elementEnd"]()),2&e){const e=o["\u0275\u0275nextContext"]().$implicit;o["\u0275\u0275property"]("value",e.value),o["\u0275\u0275advance"](1),o["\u0275\u0275textInterpolate1"](" ",o["\u0275\u0275pipeBind1"](2,2,e.title)," ")}}function R(e,t){if(1&e&&(o["\u0275\u0275elementContainerStart"](0),o["\u0275\u0275template"](1,w,3,4,"mat-option",24),o["\u0275\u0275pipe"](2,"async"),o["\u0275\u0275elementContainerEnd"]()),2&e){const e=t.$implicit,n=o["\u0275\u0275nextContext"](2);o["\u0275\u0275advance"](1),o["\u0275\u0275property"]("ngIf","cleanup"!==e.value||o["\u0275\u0275pipeBind1"](2,1,n.requestsState.hasAvFull))}}function T(e,t){1&e&&(o["\u0275\u0275elementContainerStart"](0,26),o["\u0275\u0275elementStart"](1,"i360-settings-field",27),o["\u0275\u0275pipe"](2,"translate"),o["\u0275\u0275element"](3,"input",28),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementContainerEnd"]()),2&e&&(o["\u0275\u0275advance"](1),o["\u0275\u0275propertyInterpolate"]("inputTitle",o["\u0275\u0275pipeBind1"](2,1,"settings.malware.general.backupMaxDays")))}const k=function(){return[]};function F(e,t){if(1&e&&(o["\u0275\u0275elementStart"](0,"div",5)(1,"div",6),o["\u0275\u0275text"](2,"settings.menu.malware"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementContainerStart"](3,15),o["\u0275\u0275template"](4,P,5,11,"i360-settings-field",16),o["\u0275\u0275elementStart"](5,"i360-settings-field",17),o["\u0275\u0275pipe"](6,"async"),o["\u0275\u0275pipe"](7,"async"),o["\u0275\u0275pipe"](8,"translate"),o["\u0275\u0275elementStart"](9,"mat-form-field")(10,"mat-select",18,19),o["\u0275\u0275pipe"](12,"translate"),o["\u0275\u0275template"](13,R,3,3,"ng-container",20),o["\u0275\u0275elementEnd"]()()(),o["\u0275\u0275elementContainerEnd"](),o["\u0275\u0275template"](14,T,4,3,"ng-container",21),o["\u0275\u0275elementEnd"]()),2&e){const e=o["\u0275\u0275nextContext"]();o["\u0275\u0275advance"](4),o["\u0275\u0275property"]("ngIf",e.restoreEnabled),o["\u0275\u0275advance"](1),o["\u0275\u0275propertyInterpolate"]("inputTitle",o["\u0275\u0275pipeBind1"](8,11,"settings.malware.general.defaultAction.label")),o["\u0275\u0275property"]("disabled",!o["\u0275\u0275pipeBind1"](6,7,e.permissions.MS_CONFIG_DEFAULT_ACTION_EDIT))("warning",!o["\u0275\u0275pipeBind1"](7,9,e.permissions.MS_CONFIG_DEFAULT_ACTION_EDIT)&&"warning.set_by_admin"),o["\u0275\u0275advance"](5),o["\u0275\u0275property"]("placeholder",o["\u0275\u0275pipeBind1"](12,13,"settings.malware.general.defaultAction.placeholder")),o["\u0275\u0275advance"](3),o["\u0275\u0275property"]("ngForOf",o["\u0275\u0275pureFunction0"](15,k)),o["\u0275\u0275advance"](1),o["\u0275\u0275property"]("ngIf",e.restoreEnabled)}}let j=(()=>{class e{constructor(e,t,n,a,i){this.backupSystemsService=e,this.authState=t,this.requestsState=n,this.permissions=a,this.config=i,this.restoreEnabled=!1,this.moreLink="https://blog.imunify360.com/how-to-manage-imunify-security-notifications",this.backupSystemsService.narrowStatus().pipe((0,r.take)(1)).subscribe((e=>{this.restoreEnabled=e.data.items.enabled}))}}return e.\u0275fac=function(t){return new(t||e)(o["\u0275\u0275directiveInject"](s.w),o["\u0275\u0275directiveInject"](p.j),o["\u0275\u0275directiveInject"](l.x),o["\u0275\u0275directiveInject"](c.q),o["\u0275\u0275directiveInject"](d.p))},e.\u0275cmp=o["\u0275\u0275defineComponent"]({type:e,selectors:[["i360-settings"]],decls:29,vars:21,consts:[[1,"card-container"],[1,"hidden-xs"],["i360Config","",1,"card-container","settings-container",3,"formGroup"],["config","i360Config"],["i360Loader","",1,"canvas","i360-visible-save-button"],[1,"input_group"],["translate","",1,"group_name"],["formGroupName","CONTROL_PANEL"],[3,"inputTitle","isLongTitle"],["description",""],["target","_blank",3,"href"],["formControlName","generic_user_notifications"],["class","input_group",4,"ngIf"],[1,"tools"],["id","update-config","mat-raised-button","","type","submit"],["formGroupName","MALWARE_SCANNING"],[3,"inputTitle","description",4,"ngIf"],[3,"disabled","warning","inputTitle"],["formControlName","default_action",3,"placeholder"],["defaultActionSelect",""],[4,"ngFor","ngForOf"],["formGroupName","BACKUP_RESTORE",4,"ngIf"],[3,"inputTitle","description"],["formControlName","try_restore_from_backup_first"],[3,"value",4,"ngIf"],[3,"value"],["formGroupName","BACKUP_RESTORE"],[3,"inputTitle"],["formControlName","max_days_in_backup"]],template:function(e,t){if(1&e&&(o["\u0275\u0275elementStart"](0,"div",0)(1,"i360-header")(2,"mat-icon",1),o["\u0275\u0275text"](3,"settings"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275text"](4),o["\u0275\u0275pipe"](5,"translate"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](6,"form",2,3)(8,"div",4)(9,"div",5)(10,"div",6),o["\u0275\u0275text"](11,"settings.menu.general"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementContainerStart"](12,7),o["\u0275\u0275elementStart"](13,"i360-settings-field",8),o["\u0275\u0275pipe"](14,"translate"),o["\u0275\u0275elementContainerStart"](15,9),o["\u0275\u0275elementStart"](16,"div"),o["\u0275\u0275text"](17),o["\u0275\u0275pipe"](18,"translate"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](19,"a",10),o["\u0275\u0275text"](20),o["\u0275\u0275pipe"](21,"translate"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementContainerEnd"](),o["\u0275\u0275element"](22,"mat-checkbox",11),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementContainerEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275template"](23,F,15,16,"div",12),o["\u0275\u0275pipe"](24,"async"),o["\u0275\u0275elementStart"](25,"div",13)(26,"button",14),o["\u0275\u0275text"](27),o["\u0275\u0275pipe"](28,"translate"),o["\u0275\u0275elementEnd"]()()()()()),2&e){const e=o["\u0275\u0275reference"](7);o["\u0275\u0275advance"](4),o["\u0275\u0275textInterpolate1"](" ",o["\u0275\u0275pipeBind1"](5,9,"settings.title")," "),o["\u0275\u0275advance"](2),o["\u0275\u0275property"]("formGroup",e.form),o["\u0275\u0275advance"](7),o["\u0275\u0275propertyInterpolate"]("inputTitle",o["\u0275\u0275pipeBind1"](14,11,"settings.general.genericUserNotifications.label")),o["\u0275\u0275property"]("isLongTitle",!0),o["\u0275\u0275advance"](4),o["\u0275\u0275textInterpolate"](o["\u0275\u0275pipeBind1"](18,13,"settings.general.genericUserNotifications.description")),o["\u0275\u0275advance"](2),o["\u0275\u0275property"]("href",t.moreLink,o["\u0275\u0275sanitizeUrl"]),o["\u0275\u0275advance"](1),o["\u0275\u0275textInterpolate1"](" ",o["\u0275\u0275pipeBind1"](21,15,"settings.general.genericUserNotifications.linkLabel")," "),o["\u0275\u0275advance"](3),o["\u0275\u0275property"]("ngIf",o["\u0275\u0275pipeBind1"](24,17,t.requestsState.hasAv)),o["\u0275\u0275advance"](4),o["\u0275\u0275textInterpolate1"](" ",o["\u0275\u0275pipeBind1"](28,19,"settings.saveSettings")," ")}},dependencies:[u.MatCheckbox,m.NgForOf,m.NgIf,g["\u0275NgNoValidate"],g.DefaultValueAccessor,g.NgControlStatus,g.NgControlStatusGroup,g.FormGroupDirective,g.FormControlName,g.FormGroupName,f.e,h.w,_.F,v.O,b.J,x.Q,C.MatFormField,y.MatSelect,S.MatOption,M.MatButton,O.MatIcon,E.Pi,A.x,I.C,m.AsyncPipe,E.X$],styles:['i360-header[_ngcontent-%COMP%]     [aria-level="1"] {\n  position: relative;\n}\n.ltr[_nghost-%COMP%]   i360-header[_ngcontent-%COMP%]     [aria-level="1"], .ltr   [_nghost-%COMP%]   i360-header[_ngcontent-%COMP%]     [aria-level="1"] {\n  margin-left: 32px;\n}\n.rtl[_nghost-%COMP%]   i360-header[_ngcontent-%COMP%]     [aria-level="1"], .rtl   [_nghost-%COMP%]   i360-header[_ngcontent-%COMP%]     [aria-level="1"] {\n  margin-right: 32px;\n}\ni360-header[_ngcontent-%COMP%]     [aria-level="1"] mat-icon:not(.standart-style) {\n  position: absolute;\n  bottom: -4px;\n}\n.ltr[_nghost-%COMP%]   i360-header[_ngcontent-%COMP%]     [aria-level="1"] mat-icon:not(.standart-style), .ltr   [_nghost-%COMP%]   i360-header[_ngcontent-%COMP%]     [aria-level="1"] mat-icon:not(.standart-style) {\n  left: -32px;\n}\n.rtl[_nghost-%COMP%]   i360-header[_ngcontent-%COMP%]     [aria-level="1"] mat-icon:not(.standart-style), .rtl   [_nghost-%COMP%]   i360-header[_ngcontent-%COMP%]     [aria-level="1"] mat-icon:not(.standart-style) {\n  right: -32px;\n}\n  .canvas:not(.i360-visible-save-button) {\n  padding: 0 0 29px;\n}\n  .canvas.i360-visible-save-button .tools {\n  position: sticky;\n  bottom: 0;\n  background-color: #ffffff;\n  border-top: solid 1px #eeeeee;\n  padding-bottom: 29px;\n  z-index: 99;\n}\n  .canvas.i360-visible-save-button .input_group:nth-last-child(2) {\n  border: none;\n}\n  .input_group {\n  display: flex;\n  flex-direction: column;\n}\n  .settings-container .input_group {\n  border-bottom: solid 1px #eeeeee;\n  padding: 25px 29px 0;\n}\n  .settings-container .input_group.no-border {\n  border: none;\n}\n  .settings-container .input_group > * {\n  font-size: 14px;\n  font-family: "Open Sans", sans-serif;\n  object-fit: contain;\n  color: #1d1d1d;\n}\n  .settings-container .input_group .group_name {\n  font-weight: bold;\n  margin-bottom: 21px;\n}\n  .settings-container .input_group.i360-accordioned {\n  padding: 0px;\n}\n  .settings-container .input_group.i360-accordioned .group_name {\n  margin-bottom: 0px;\n  -webkit-user-select: none;\n          user-select: none;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  padding-left: 0px;\n  padding-bottom: 21px;\n  padding-top: 25px;\n  border-bottom: 1px solid #eeeeee;\n}\n  .settings-container .input_group.i360-accordioned .group_name mat-icon {\n  width: 60px;\n  text-align: center;\n}\n  .settings-container .input_group.i360-accordioned .group_name mat-icon:not(.i360-icon-arrow-up) {\n  color: #535353;\n}\n  .settings-container .input_group.i360-accordioned .items {\n  padding-left: 45px;\n}\n  .settings-container .input_group.i360-accordioned .items > * {\n  padding-left: 0px;\n}\n  .settings-container .input_group.i360-accordioned .i360-default-emails {\n  margin-bottom: 19px;\n}\n  .settings-container .input_group.i360-accordioned cl-text-input textarea {\n  min-height: 57px;\n}\n  .settings-container .input_group.i360-accordioned.i360-expended mat-icon.i360-icon-arrow-up {\n  transform: rotate(90deg);\n}\n  .settings-container .input_group.i360-accordioned:not(.i360-expended) .group_name {\n  margin-bottom: 0px;\n  border-bottom: none;\n}\n  .settings-container .input_group.i360-accordioned:not(.i360-expended) .items {\n  display: none;\n}\n  .settings-container .input_group .config_item {\n  display: block;\n  padding-bottom: 25px;\n}\n  .settings-container .isolated {\n  border-top: solid 1px #eeeeee;\n  margin: 0 -29px;\n  padding: 25px 29px 0;\n}\n  .settings-container .isolated > .config_item {\n  padding-bottom: 25px;\n}\n  .settings-container .tools {\n  display: flex;\n  padding: 29px 29px 0;\n}\n.ltr[_nghost-%COMP%]     .settings-container .tools > *, .ltr   [_nghost-%COMP%]     .settings-container .tools > * {\n  margin-right: 30px;\n}\n.rtl[_nghost-%COMP%]     .settings-container .tools > *, .rtl   [_nghost-%COMP%]     .settings-container .tools > * {\n  margin-left: 30px;\n}\n  a.i360-warning-more-new-line {\n  padding-left: 28px;\n  font-size: 12px;\n  display: -webkit-box;\n  max-height: 52px;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 3;\n  overflow: hidden;\n  margin-top: 2px;\n}\n  button#update-config:not(.capitalize) {\n  text-transform: uppercase;\n}']}),e})();var G=n(23233),B=n(90285),L=n(77026),q=n(77939),D=n(31336),U=n(76331),Q=n(3947),X=n(34204),V=n(53624),z=n(67345),J=n(21077);const K=[{path:"",component:B.y,canActivate:[Q.F],canActivateChild:[Q.F],children:[{path:"",redirectTo:"malware",pathMatch:"full"},{path:"malware",component:z.w,data:{feature:U.eS.av},canActivate:[V.qX],runGuardsAndResolvers:"paramsOrQueryParamsChange",children:[{path:"",redirectTo:"files",pathMatch:"full"},{path:"files",component:G.u,data:{feature:U.eS.av},canActivate:[V.qX],runGuardsAndResolvers:"paramsOrQueryParamsChange"},{path:"history",component:L.w,data:{feature:U.eS.av},canActivate:[V.qX],runGuardsAndResolvers:"paramsOrQueryParamsChange"},{path:"on-demand-scan",component:J.D,data:{feature:U.eS.av},canActivate:[V.qX],runGuardsAndResolvers:"paramsOrQueryParamsChange"},{path:"ignore-list",component:q.j,data:{feature:U.eS.av},canActivate:[V.qX],runGuardsAndResolvers:"paramsOrQueryParamsChange"}]},{path:D.Q.path,loadChildren:D.Q.loadChildren,data:{feature:U.eS.proactive},canActivate:[V.qX],runGuardsAndResolvers:"paramsOrQueryParamsChange"},{path:"coming-soon",component:i.s},{path:"settings",component:j,canDeactivate:[X.R]}]},{path:"features-disabled",loadChildren:()=>n.e("src_app_components_features-disabled_features-disabled_module_ts").then(n.bind(n,75917)).then((e=>e.FeaturesDisabledModule))}];let W=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=o["\u0275\u0275defineNgModule"]({type:e}),e.\u0275inj=o["\u0275\u0275defineInjector"]({imports:[a.RouterModule.forChild(K),a.RouterModule]}),e})();var $=n(38684);let Y=(()=>{class e{constructor(){this.infectedFilesCount=23}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275prov=o["\u0275\u0275defineInjectable"]({token:e,factory:e.\u0275fac}),e})();var H=n(28838),Z=n(34322),ee=n(92209);const te=e=>({CONTROL_PANEL:e.group({generic_user_notifications:e.control(!0)}),MALWARE_SCANNING:e.group((0,ee.L)(e)),BACKUP_RESTORE:e.group({max_days_in_backup:e.control(0,[Z.M.integer(!0),g.Validators.min(1)])}),PROACTIVE_DEFENCE:e.group({mode:e.control(null),blamer:e.control(!1)}),ERROR_REPORTING:e.group({enable:e.control(!0)}),MALWARE_CLEANUP:e.group({trim_file_instead_of_removal:e.control(!0),keep_original_files_days:e.control(14,[Z.M.integer(!0),g.Validators.min(1)])}),MY_IMUNIFY:e.group({enable:e.control(!1),purchase_page_url:e.control("")})});let ne=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=o["\u0275\u0275defineNgModule"]({type:e}),e.\u0275inj=o["\u0275\u0275defineInjector"]({providers:[Y,H.j,c.q,Q.F,{provide:d.H,useValue:te}],imports:[$.m.forUser(),W]}),e})()},3947:(e,t,n)=>{n.d(t,{F:()=>c});var a=n(91792),i=n(52191),r=n(76331),o=n(53850),s=n(72986),p=n(6009),l=n(28838);let c=(()=>{class e{constructor(e,t,n,a){this.authState=e,this.requestsState=t,this.userFeaturesStatusService=n,this.router=a}canActivate(e,t){return!!this.authState.isAdmin.value||this.requestsState.hasEnabledFeatures.pipe((0,a.filter)((e=>null!=e)),(0,a.take)(1),(0,a.tap)((e=>{e||this.router.navigate(this.authState.featuresDisabledCommands)})))}canActivateChild(e,t){return!!this.authState.isAdmin.value||this.requestsState.clientFeatures.cache.pipe((0,a.take)(1),(0,a.map)((t=>{const n=e.data.feature;if(!(t[n]!==r.Mi.na)){const n=(e.parent.routeConfig.children||[]).find((e=>!!e.data&&t[e.data.feature]!==r.Mi.na));return n&&this.router.navigate(this.authState.getDisabledRouteCommands(n)),!1}return!0})))}}return e.\u0275fac=function(t){return new(t||e)(o["\u0275\u0275inject"](s.j),o["\u0275\u0275inject"](p.x),o["\u0275\u0275inject"](l.j),o["\u0275\u0275inject"](i.Router))},e.\u0275prov=o["\u0275\u0275defineInjectable"]({token:e,factory:e.\u0275fac}),e})()}}]);
//# sourceMappingURL=src_app_core_client_module_ts.8f2d1c88ef75fc95.js.map