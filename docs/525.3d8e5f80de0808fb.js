"use strict";(self.webpackChunkpregnantPortal=self.webpackChunkpregnantPortal||[]).push([[525],{6525:(y,l,r)=>{r.r(l),r.d(l,{CoursesModule:()=>O});var a=r(6814),u=r(4190),d=r(7694),t=r(5879),f=r(330),g=r(8895);function C(n,p){if(1&n&&(t.TgZ(0,"video",5),t._UZ(1,"source",6),t.qZA()),2&n){const e=t.oxw().$implicit;t.xp6(1),t.Q6J("src",e.img,t.LSH)}}function m(n,p){if(1&n){const e=t.EpF();t.TgZ(0,"div",2)(1,"div",3),t.NdJ("click",function(){const s=t.CHM(e).$implicit,c=t.oxw();return t.KtG(c.addStuffToCart(s))})("click",function(){const s=t.CHM(e).$implicit,c=t.oxw();return t.KtG(c.viewDetails(s.key))}),t._uU(2),t.YNc(3,C,2,1,"video",4),t._uU(4),t.qZA()()}if(2&n){const e=p.$implicit;t.xp6(2),t.hij(" ",e.title," "),t.xp6(1),t.Q6J("ngIf","courses"===e.productType),t.xp6(1),t.AsE(" ",e.description," ",e.prise," \u20be ")}}const v=[{path:"",component:d.$,data:{pageName:"\u10d9\u10e3\u10e0\u10e1\u10d4\u10d1\u10d8"},children:[{path:"",component:(()=>{class n{constructor(e,o,i){this.shopService=e,this.localStorage=o,this.router=i}ngOnInit(){this.getCourses()}getCourses(){this.shopService.getCourses().subscribe({next:e=>{this.stuffs=e,console.log(this.stuffs)},error:e=>{}})}countItemInCart(e,o){return e.filter(s=>s.key===o.key).length+1}addStuffToCart(e){this.localStorage.getToken().subscribe(o=>{let i=localStorage.getItem("stuff");if(i){let s=JSON.parse(i);const c=this.countItemInCart(s,e),_={...e,uid:o.uid,inCart:c};s.push(_),localStorage.setItem("stuff",JSON.stringify(s))}else{let s=[];const c={...e,uid:o.uid,inCart:1};s.push(c),localStorage.setItem("stuff",JSON.stringify(s))}})}viewDetails(e){this.router.navigate([`shop/view-details-shop/${e}`])}static#t=this.\u0275fac=function(o){return new(o||n)(t.Y36(f.d),t.Y36(g.n),t.Y36(u.F0))};static#e=this.\u0275cmp=t.Xpm({type:n,selectors:[["app-courses"]],decls:2,vars:1,consts:[[1,"cont"],["class","inner",4,"ngFor","ngForOf"],[1,"inner"],[1,"item",3,"click"],["controls","",4,"ngIf"],["controls",""],["type","video/mp4",3,"src"]],template:function(o,i){1&o&&(t.TgZ(0,"div",0),t.YNc(1,m,5,4,"div",1),t.qZA()),2&o&&(t.xp6(1),t.Q6J("ngForOf",i.stuffs))},dependencies:[a.sg,a.O5],styles:[".cont[_ngcontent-%COMP%]{width:100%;display:flex;flex-wrap:wrap;justify-content:center;border-radius:8px}.cont[_ngcontent-%COMP%]   .inner[_ngcontent-%COMP%]{display:flex;justify-content:center;padding:15px;background-color:#fff;border-radius:8px}.cont[_ngcontent-%COMP%]   .inner[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]{padding:10px;width:250px;height:200px;border-radius:16px;cursor:pointer}.cont[_ngcontent-%COMP%]   .inner[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]   img[_ngcontent-%COMP%], .cont[_ngcontent-%COMP%]   .inner[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]   video[_ngcontent-%COMP%]{width:100%;height:80%;object-fit:cover}"]})}return n})()}]}];let x=(()=>{class n{static#t=this.\u0275fac=function(o){return new(o||n)};static#e=this.\u0275mod=t.oAB({type:n});static#n=this.\u0275inj=t.cJS({imports:[u.Bz.forChild(v),u.Bz]})}return n})(),O=(()=>{class n{static#t=this.\u0275fac=function(o){return new(o||n)};static#e=this.\u0275mod=t.oAB({type:n});static#n=this.\u0275inj=t.cJS({imports:[a.ez,x]})}return n})()}}]);