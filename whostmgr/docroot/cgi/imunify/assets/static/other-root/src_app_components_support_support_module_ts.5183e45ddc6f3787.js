"use strict";(self["webpackJsonpother-root"]=self["webpackJsonpother-root"]||[]).push([["src_app_components_support_support_module_ts"],{69128:(e,t,n)=>{n.r(t),n.d(t,{I360SupportModule:()=>K});var i=n(60136),o=n(17602),r=n(85290),a=n(71670),s=n(34929),p=n(53850),l=n(34322),c=n(92013),d=n(15815),u=n(38949),g=n(40973),m=n(29012);class f{static send(e){return new m.Kl(["support","send"],e)}}var h=n(64650);let x=(()=>{class e{constructor(e){this.xhr=e,this.send=this.xhr.rx(f.send)}}return e.\u0275fac=function(t){return new(t||e)(p["\u0275\u0275inject"](h.K))},e.\u0275prov=p["\u0275\u0275defineInjectable"]({token:e,factory:e.\u0275fac}),e})();var _=n(91792),v=n(49818),M=n(74159),C=n(98521),b=n(14633),P=n(67765),O=n(50872),y=n(53530),I=n(38699),w=n(58160),S=n(29639),E=n(45837);function B(e,t){1&e&&(p["\u0275\u0275elementStart"](0,"i360-settings-field",7),p["\u0275\u0275pipe"](1,"translate"),p["\u0275\u0275element"](2,"i360-file-uploader",17),p["\u0275\u0275elementEnd"]()),2&e&&p["\u0275\u0275propertyInterpolate"]("inputTitle",p["\u0275\u0275pipeBind1"](1,1,"support.attachments"))}function k(e,t){if(1&e){const e=p["\u0275\u0275getCurrentView"]();p["\u0275\u0275elementStart"](0,"div")(1,"i360-header"),p["\u0275\u0275element"](2,"mat-icon",3),p["\u0275\u0275text"](3),p["\u0275\u0275pipe"](4,"translate"),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](5,"form",4),p["\u0275\u0275listener"]("i360Submit",(function(){p["\u0275\u0275restoreView"](e);const t=p["\u0275\u0275nextContext"]();return p["\u0275\u0275resetView"](t.submit())})),p["\u0275\u0275elementStart"](6,"div",5)(7,"div",6),p["\u0275\u0275elementContainerStart"](8),p["\u0275\u0275elementStart"](9,"i360-settings-field",7),p["\u0275\u0275pipe"](10,"translate"),p["\u0275\u0275element"](11,"input",8),p["\u0275\u0275pipe"](12,"translate"),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](13,"i360-settings-field",7),p["\u0275\u0275pipe"](14,"translate"),p["\u0275\u0275element"](15,"input",9),p["\u0275\u0275pipe"](16,"translate"),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](17,"i360-settings-field",10),p["\u0275\u0275pipe"](18,"translate"),p["\u0275\u0275pipe"](19,"translate"),p["\u0275\u0275element"](20,"textarea",11),p["\u0275\u0275pipe"](21,"translate"),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](22,"i360-settings-field",12),p["\u0275\u0275pipe"](23,"translate"),p["\u0275\u0275element"](24,"input",13),p["\u0275\u0275pipe"](25,"translate"),p["\u0275\u0275elementEnd"](),p["\u0275\u0275template"](26,B,3,3,"i360-settings-field",14),p["\u0275\u0275elementStart"](27,"i360-settings-field")(28,"div",15)(29,"button",16),p["\u0275\u0275text"](30),p["\u0275\u0275pipe"](31,"translate"),p["\u0275\u0275elementEnd"]()()(),p["\u0275\u0275elementContainerEnd"](),p["\u0275\u0275elementEnd"]()()()()}if(2&e){const e=p["\u0275\u0275nextContext"]();p["\u0275\u0275advance"](3),p["\u0275\u0275textInterpolate1"](" ",p["\u0275\u0275pipeBind1"](4,15,"support.title")," "),p["\u0275\u0275advance"](2),p["\u0275\u0275property"]("formGroup",e.form)("hidden",e.ticketUrl),p["\u0275\u0275advance"](4),p["\u0275\u0275propertyInterpolate"]("inputTitle",p["\u0275\u0275pipeBind1"](10,17,"support.email.title")),p["\u0275\u0275advance"](2),p["\u0275\u0275propertyInterpolate"]("placeholder",p["\u0275\u0275pipeBind1"](12,19,"support.email.placeholder")),p["\u0275\u0275advance"](2),p["\u0275\u0275propertyInterpolate"]("inputTitle",p["\u0275\u0275pipeBind1"](14,21,"support.subject.title")),p["\u0275\u0275advance"](2),p["\u0275\u0275propertyInterpolate"]("placeholder",p["\u0275\u0275pipeBind1"](16,23,"support.subject.placeholder")),p["\u0275\u0275advance"](2),p["\u0275\u0275propertyInterpolate"]("inputTitle",p["\u0275\u0275pipeBind1"](18,25,"support.description.title")),p["\u0275\u0275propertyInterpolate"]("description",p["\u0275\u0275pipeBind1"](19,27,"support.description.description")),p["\u0275\u0275advance"](3),p["\u0275\u0275propertyInterpolate"]("placeholder",p["\u0275\u0275pipeBind1"](21,29,"support.description.placeholder")),p["\u0275\u0275advance"](2),p["\u0275\u0275propertyInterpolate"]("inputTitle",p["\u0275\u0275pipeBind1"](23,31,"support.cln.title")),p["\u0275\u0275advance"](2),p["\u0275\u0275propertyInterpolate"]("placeholder",p["\u0275\u0275pipeBind1"](25,33,"support.cln.placeholder")),p["\u0275\u0275advance"](2),p["\u0275\u0275property"]("ngIf",!e.panel.isNoPanel),p["\u0275\u0275advance"](3),p["\u0275\u0275property"]("disabled",e.submitted),p["\u0275\u0275advance"](1),p["\u0275\u0275textInterpolate1"](" ",p["\u0275\u0275pipeBind1"](31,35,"support.submit")," ")}}function j(e,t){if(1&e&&(p["\u0275\u0275elementStart"](0,"div")(1,"p",20),p["\u0275\u0275text"](2,"support.success.link"),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](3,"a",22),p["\u0275\u0275text"](4),p["\u0275\u0275elementEnd"]()()),2&e){const e=p["\u0275\u0275nextContext"](2);p["\u0275\u0275advance"](3),p["\u0275\u0275propertyInterpolate"]("href",e.ticketUrl,p["\u0275\u0275sanitizeUrl"]),p["\u0275\u0275advance"](1),p["\u0275\u0275textInterpolate"](e.ticketUrl)}}function N(e,t){1&e&&(p["\u0275\u0275elementStart"](0,"p",23),p["\u0275\u0275text"](1,"support.success.checkEmail"),p["\u0275\u0275elementEnd"]())}function z(e,t){if(1&e&&(p["\u0275\u0275elementStart"](0,"div",18),p["\u0275\u0275element"](1,"img",19),p["\u0275\u0275elementStart"](2,"h3",20),p["\u0275\u0275text"](3,"support.success.title"),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](4,"h4",20),p["\u0275\u0275text"](5,"support.success.subtitle"),p["\u0275\u0275elementEnd"](),p["\u0275\u0275template"](6,j,5,2,"div",1),p["\u0275\u0275template"](7,N,2,0,"ng-template",null,21,p["\u0275\u0275templateRefExtractor"]),p["\u0275\u0275elementEnd"]()),2&e){const e=p["\u0275\u0275reference"](8),t=p["\u0275\u0275nextContext"]();p["\u0275\u0275advance"](1),p["\u0275\u0275property"]("src",t.imagePath+"/dog.png",p["\u0275\u0275sanitizeUrl"]),p["\u0275\u0275advance"](5),p["\u0275\u0275property"]("ngIf",t.ticketUrl)("ngIfElse",e)}}class T{constructor(e,t,n,i,o){this.formBuilder=e,this.fileService=t,this.supportService=n,this.panel=i,this.detector=o,this.form=this.formBuilder.group({email:this.formBuilder.control("",[l.M.required("email"),l.M.email]),subject:this.formBuilder.control("",l.M.required("subject")),description:this.formBuilder.control("",l.M.required("description")),cln:this.formBuilder.control(""),file:this.formBuilder.control([],[l.M.fileSize(g.T),l.M.maxFiles(5)])}),this.submitted=!1,this.imagePath=(0,u.al)()}submit(){var e=this;return(0,a.Z)((function*(){e.submitted=!0;const{email:t,subject:n,description:i,cln:o,file:r}=e.form.value;yield(0,_.firstValueFrom)(e.fileService.upload(r).pipe((0,_.switchMap)((r=>e.supportService.send({email:t,subject:n,description:i,cln:o,...r?{attachments:[r.data]}:{}}))),(0,_.tap)((t=>{e.ticketUrl=t.data.items.pop(),e.form.reset(),e.detector.detectChanges()}))),{defaultValue:void 0}),e.submitted=!1}))()}ngOnDestroy(){this.ticketUrl=""}}T.\u0275fac=function(e){return new(e||T)(p["\u0275\u0275directiveInject"](v.I),p["\u0275\u0275directiveInject"](M.I),p["\u0275\u0275directiveInject"](x),p["\u0275\u0275directiveInject"](C.s_),p["\u0275\u0275directiveInject"](p.ChangeDetectorRef))},T.\u0275cmp=p["\u0275\u0275defineComponent"]({type:T,selectors:[["support"]],viewQuery:function(e,t){if(1&e&&p["\u0275\u0275viewQuery"](d.e,5),2&e){let e;p["\u0275\u0275queryRefresh"](e=p["\u0275\u0275loadQuery"]())&&(t.loader=e.first)}},features:[p["\u0275\u0275ProvidersFeature"]([x])],decls:4,vars:2,consts:[[1,"card-container"],[4,"ngIf","ngIfElse"],["successMessage",""],["svgIcon","support",1,"support","hidden-xs"],[1,"card-container","settings-container","col-md-9",3,"formGroup","hidden","i360Submit"],["i360Loader","",1,"canvas"],[1,"input_group"],[3,"inputTitle"],["type","text","formControlName","email","name","request[anonymous_requester_email]","autocomplete","email",1,"underline-input",3,"placeholder"],["type","text","formControlName","subject",1,"underline-input",3,"placeholder"],[3,"inputTitle","description"],["formControlName","description","autosize","",1,"underline-input",3,"placeholder"],["description","",3,"inputTitle"],["type","text","formControlName","cln","name","request[custom_fields][43148369]",1,"underline-input",3,"placeholder"],[3,"inputTitle",4,"ngIf"],[1,"tools"],["id","support-submit","color","primary","type","submit","mat-raised-button","",3,"disabled"],["formControlName","file"],[1,"success-message"],[3,"src"],["translate",""],["messageText",""],["target","_blank",3,"href"],["translate","",1,"i360-severity-text-medium"]],template:function(e,t){if(1&e&&(p["\u0275\u0275elementStart"](0,"div",0),p["\u0275\u0275template"](1,k,32,37,"div",1),p["\u0275\u0275template"](2,z,9,3,"ng-template",null,2,p["\u0275\u0275templateRefExtractor"]),p["\u0275\u0275elementEnd"]()),2&e){const e=p["\u0275\u0275reference"](3);p["\u0275\u0275advance"](1),p["\u0275\u0275property"]("ngIf",void 0===t.ticketUrl)("ngIfElse",e)}},dependencies:[i.NgIf,o.MatButton,b.MatIcon,P["\u0275NgNoValidate"],P.DefaultValueAccessor,P.NgControlStatus,P.NgControlStatusGroup,P.FormGroupDirective,P.FormControlName,O.O,y.J,I.Pi,d.e,w.x,S.w,E.F,g.G,I.X$],styles:['i360-header[_ngcontent-%COMP%]     [aria-level="1"] {\n  position: relative;\n}\n.ltr[_nghost-%COMP%]   i360-header[_ngcontent-%COMP%]     [aria-level="1"], .ltr   [_nghost-%COMP%]   i360-header[_ngcontent-%COMP%]     [aria-level="1"] {\n  margin-left: 32px;\n}\n.rtl[_nghost-%COMP%]   i360-header[_ngcontent-%COMP%]     [aria-level="1"], .rtl   [_nghost-%COMP%]   i360-header[_ngcontent-%COMP%]     [aria-level="1"] {\n  margin-right: 32px;\n}\ni360-header[_ngcontent-%COMP%]     [aria-level="1"] mat-icon:not(.standart-style) {\n  position: absolute;\n  bottom: -4px;\n}\n.ltr[_nghost-%COMP%]   i360-header[_ngcontent-%COMP%]     [aria-level="1"] mat-icon:not(.standart-style), .ltr   [_nghost-%COMP%]   i360-header[_ngcontent-%COMP%]     [aria-level="1"] mat-icon:not(.standart-style) {\n  left: -32px;\n}\n.rtl[_nghost-%COMP%]   i360-header[_ngcontent-%COMP%]     [aria-level="1"] mat-icon:not(.standart-style), .rtl   [_nghost-%COMP%]   i360-header[_ngcontent-%COMP%]     [aria-level="1"] mat-icon:not(.standart-style) {\n  right: -32px;\n}\n  .canvas:not(.i360-visible-save-button) {\n  padding: 0 0 29px;\n}\n  .canvas.i360-visible-save-button .tools {\n  position: sticky;\n  bottom: 0;\n  background-color: #ffffff;\n  border-top: solid 1px #eeeeee;\n  padding-bottom: 29px;\n  z-index: 99;\n}\n  .canvas.i360-visible-save-button .input_group:nth-last-child(2) {\n  border: none;\n}\n  .input_group {\n  display: flex;\n  flex-direction: column;\n}\n  .settings-container .input_group {\n  border-bottom: solid 1px #eeeeee;\n  padding: 25px 29px 0;\n}\n  .settings-container .input_group.no-border {\n  border: none;\n}\n  .settings-container .input_group > * {\n  font-size: 14px;\n  font-family: "Open Sans", sans-serif;\n  object-fit: contain;\n  color: #1d1d1d;\n}\n  .settings-container .input_group .group_name {\n  font-weight: bold;\n  margin-bottom: 21px;\n}\n  .settings-container .input_group.i360-accordioned {\n  padding: 0px;\n}\n  .settings-container .input_group.i360-accordioned .group_name {\n  margin-bottom: 0px;\n  -webkit-user-select: none;\n          user-select: none;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  padding-left: 0px;\n  padding-bottom: 21px;\n  padding-top: 25px;\n  border-bottom: 1px solid #eeeeee;\n}\n  .settings-container .input_group.i360-accordioned .group_name mat-icon {\n  width: 60px;\n  text-align: center;\n}\n  .settings-container .input_group.i360-accordioned .group_name mat-icon:not(.i360-icon-arrow-up) {\n  color: #535353;\n}\n  .settings-container .input_group.i360-accordioned .items {\n  padding-left: 45px;\n}\n  .settings-container .input_group.i360-accordioned .items > * {\n  padding-left: 0px;\n}\n  .settings-container .input_group.i360-accordioned .i360-default-emails {\n  margin-bottom: 19px;\n}\n  .settings-container .input_group.i360-accordioned cl-text-input textarea {\n  min-height: 57px;\n}\n  .settings-container .input_group.i360-accordioned.i360-expended mat-icon.i360-icon-arrow-up {\n  transform: rotate(90deg);\n}\n  .settings-container .input_group.i360-accordioned:not(.i360-expended) .group_name {\n  margin-bottom: 0px;\n  border-bottom: none;\n}\n  .settings-container .input_group.i360-accordioned:not(.i360-expended) .items {\n  display: none;\n}\n  .settings-container .input_group .config_item {\n  display: block;\n  padding-bottom: 25px;\n}\n  .settings-container .isolated {\n  border-top: solid 1px #eeeeee;\n  margin: 0 -29px;\n  padding: 25px 29px 0;\n}\n  .settings-container .isolated > .config_item {\n  padding-bottom: 25px;\n}\n  .settings-container .tools {\n  display: flex;\n  padding: 29px 29px 0;\n}\n.ltr[_nghost-%COMP%]     .settings-container .tools > *, .ltr   [_nghost-%COMP%]     .settings-container .tools > * {\n  margin-right: 30px;\n}\n.rtl[_nghost-%COMP%]     .settings-container .tools > *, .rtl   [_nghost-%COMP%]     .settings-container .tools > * {\n  margin-left: 30px;\n}\n  a.i360-warning-more-new-line {\n  padding-left: 28px;\n  font-size: 12px;\n  display: -webkit-box;\n  max-height: 52px;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 3;\n  overflow: hidden;\n  margin-top: 2px;\n}\n  button#update-config:not(.capitalize) {\n  text-transform: uppercase;\n}',"form[_ngcontent-%COMP%] {\n  padding: 0;\n}\n.ltr[_nghost-%COMP%]   form[_ngcontent-%COMP%], .ltr   [_nghost-%COMP%]   form[_ngcontent-%COMP%] {\n  float: left;\n}\n.rtl[_nghost-%COMP%]   form[_ngcontent-%COMP%], .rtl   [_nghost-%COMP%]   form[_ngcontent-%COMP%] {\n  float: right;\n}\n.success-message[_ngcontent-%COMP%] {\n  letter-spacing: 0.2px;\n  color: #1d1d1d;\n  text-align: center;\n  margin: 100px auto 30px;\n  line-height: normal;\n}\n.success-message[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 22px;\n}\n.success-message[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.success-message[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 20px auto 0;\n  font-size: 14px;\n  font-weight: bold;\n}\n.success-message[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #11cb84;\n}\n.canvas[_ngcontent-%COMP%] {\n  min-width: 692px;\n}\n.ltr[_nghost-%COMP%]   .canvas[_ngcontent-%COMP%], .ltr   [_nghost-%COMP%]   .canvas[_ngcontent-%COMP%] {\n  border-top-right-radius: 53px;\n}\n.rtl[_nghost-%COMP%]   .canvas[_ngcontent-%COMP%], .rtl   [_nghost-%COMP%]   .canvas[_ngcontent-%COMP%] {\n  border-top-left-radius: 53px;\n}\n.canvas[_ngcontent-%COMP%]     .title {\n  font-weight: bold;\n}\n.canvas[_ngcontent-%COMP%]   .input_group[_ngcontent-%COMP%] {\n  border: none;\n}\n.canvas[_ngcontent-%COMP%]   mat-select[_ngcontent-%COMP%], .canvas[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%], .canvas[_ngcontent-%COMP%]   input[type=text][_ngcontent-%COMP%] {\n  min-width: 422px;\n}\n.canvas[_ngcontent-%COMP%]   textarea.underline-input[_ngcontent-%COMP%] {\n  width: 422px;\n}\n.canvas[_ngcontent-%COMP%]   .tools[_ngcontent-%COMP%] {\n  padding: 0;\n  width: 422px;\n}\n.canvas[_ngcontent-%COMP%]   .tools[_ngcontent-%COMP%]   .mat-raised-button[_ngcontent-%COMP%] {\n  height: 40px;\n  width: 100%;\n  margin: 0;\n}"]}),(0,s.gn)([c.U],T.prototype,"submit",null);var U=n(48810),V=n(80586);let q=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=p["\u0275\u0275defineNgModule"]({type:e}),e.\u0275inj=p["\u0275\u0275defineInjector"]({imports:[i.CommonModule,U.l,V.r]}),e})();var F=n(69679),G=n(62143),R=n(27758),D=n(60577),Q=n(27276),J=n(52191);let K=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=p["\u0275\u0275defineNgModule"]({type:e}),e.\u0275inj=p["\u0275\u0275defineInjector"]({imports:[i.CommonModule,o.MatButtonModule,r.MatTooltipModule,b.MatIconModule,F.Q,U.l,G.V,R.u,D.n,Q.a,q,J.RouterModule.forChild([{path:"",component:T}])]}),e})()}}]);
//# sourceMappingURL=src_app_components_support_support_module_ts.5183e45ddc6f3787.js.map