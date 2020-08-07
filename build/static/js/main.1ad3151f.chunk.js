(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{15:function(e,n,t){e.exports=t(38)},37:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),c=t(14),o=t.n(c),u=t(4),l=t(2),i=function(e){var n=e.peopleToShow.find((function(n){return n.name===e.newName}));return r.a.createElement("form",{onSubmit:function(){if(e.newName&&n)return n.id}&&e.isUpdated?e.updatePerson:e.addPerson},r.a.createElement("div",null,r.a.createElement("span",null,"name: "),r.a.createElement("input",{className:"name",value:e.newName,onChange:e.handlePersonChange})),r.a.createElement("div",null,r.a.createElement("span",null,"number: "),r.a.createElement("input",{className:"number",value:e.newNumber,onChange:e.handleNumberChange})),r.a.createElement("button",{className:"button",type:"submit"},"ADD"))},s=function(e){var n=e.person;return r.a.createElement("div",{className:"person"},n.name," ",n.number)},m=function(e){return r.a.createElement("div",null,e.peopleToShow.map((function(n,t){return r.a.createElement("div",{key:t},r.a.createElement(s,{person:n}),r.a.createElement("button",{className:"button",onClick:function(){return e.deletePerson(n.id)}},"DELETE"))})))},d=t(3),f=t.n(d),h="/api/persons",p=function(){return f.a.get(h).then((function(e){return e.data}))},b=function(e){return f.a.post(h,e).then((function(e){return e.data}))},E=function(e,n){return f.a.put("".concat(h,"/").concat(e),n).then((function(e){return e.data}))},v=function(e){return f.a.delete("".concat(h,"/").concat(e)).then((function(e){return e.data}))},w=function(e){return r.a.createElement("div",null,r.a.createElement("span",null,"filter shown with "),r.a.createElement("input",{value:e.filteredPeople,onChange:e.handlePersonSearch}))},j=function(e){var n=e.message,t=e.errorMessage;return r.a.createElement("div",null,n?r.a.createElement("div",{className:"success"},n):r.a.createElement("div",{className:"error"},t))},O=function(){var e=Object(a.useState)([]),n=Object(l.a)(e,2),t=n[0],c=n[1],o=Object(a.useState)(""),s=Object(l.a)(o,2),d=s[0],f=s[1],h=Object(a.useState)(""),O=Object(l.a)(h,2),N=O[0],g=O[1],S=Object(a.useState)(!0),P=Object(l.a)(S,2),C=P[0],k=P[1],T=Object(a.useState)(""),y=Object(l.a)(T,2),D=y[0],L=y[1],U=Object(a.useState)([]),A=Object(l.a)(U,2),I=A[0],J=A[1],M=Object(a.useState)(""),x=Object(l.a)(M,2),B=x[0],q=x[1],z=Object(a.useState)(""),F=Object(l.a)(z,2),G=F[0],H=F[1],K=Object(a.useState)(!1),Q=Object(l.a)(K,2),R=Q[0],V=Q[1];Object(a.useEffect)((function(){p().then((function(e){c(e)}))}),[]);var W=C?t:I,X=function(e,n){var a=W.find((function(n){return n.id===e})),r=Object(u.a)(Object(u.a)({},a),{},{number:n});E(e,r).then((function(n){c(t.map((function(t){return t.id===e&&n}))),q("Number was updated"),setTimeout((function(){q(null)}),5e3)})).catch((function(e){q("Information of ".concat(a.name," has already been removed from server"))})),setTimeout((function(){q(null)}),5e3)},Y=function(){var e=W.find((function(e){return e.name===d})).id;V(!0),X(e,N)};return r.a.createElement("div",{className:"app"},r.a.createElement("h1",null,"Phonebook"),(B||G)&&r.a.createElement(j,{message:B,errorMessage:G}),r.a.createElement(w,{searchPerson:D,handlePersonSearch:function(e){var n=e.target.value,a=t.filter((function(e){return e.name.toLowerCase().includes(n.toLowerCase())}));L(n),""===n?k(W):(J(a),k(!C))}}),r.a.createElement("h2",null,"add a new"),r.a.createElement(i,{addPerson:function(e){e.preventDefault();var n={name:d,number:N};t.map((function(e){return e.name})).includes(d)?window.confirm("".concat(d," is already added to phonebook, replace the old number with a new one?"))&&Y():b(n).then((function(e){c(t.concat(e)),f(""),g(""),q("Added ".concat(d)),setTimeout((function(){q(null)}),5e3)}))},updatePerson:X,newName:d,newNumber:N,handleNumberChange:function(e){g(e.target.value)},handlePersonChange:function(e){f(e.target.value)},peopleToShow:W,isUpdated:R,handleSetUpdated:Y}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(m,{peopleToShow:W,deletePerson:function(e){v(e).then((function(){c(t.filter((function(n){return n.id!==e})))})).catch((function(e){H("Error happened"),console.log(e)}))}}))};t(37);o.a.render(r.a.createElement(O,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.1ad3151f.chunk.js.map