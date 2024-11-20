"use strict";(self.webpackChunkbeedapp=self.webpackChunkbeedapp||[]).push([[38],{4038:function(e,n,t){t.r(n),t.d(n,{default:function(){return k}});var r=t(9439),o=t(4942),i=t(2791),s=t(6934),l=t(3746),a=t(165),c=t(4554),d=t(890),u=t(7391),p=t(3466),f=t(3400),x=t(6151),h=t(6314),m=t(9085),F=t(7689),g=t(1087),j=t(2925),b=t(9434),v=t(3050),Z=t(4500),w=t(1830),y=t.n(w),C=t(184),z=(0,s.ZP)("div")((function(e){var n=e.theme;return(0,o.Z)({},n.breakpoints.up("md"),{display:"flex",justifyContent:"space-between",background:"linear-gradient(135deg, #141E30, #243B55)",color:"#FFFFFF"})})),P=(0,s.ZP)("div")((function(e){return{margin:"auto",minHeight:"100vh",display:"flex",justifyContent:"center",flexDirection:"column",padding:e.theme.spacing(4,2)}}));function k(){var e=(0,i.useState)(!1),n=(0,r.Z)(e,2),t=n[0],o=n[1],s=(0,F.s0)(),w=(0,b.I0)(),k=(0,b.v9)((function(e){return e.user})),I=k.error,D=k.userInfo,S=k.loading,A=k.success;return(0,i.useEffect)((function(){I&&(y().fire({icon:"error",title:"Oops...",text:I}),w((0,Z.uD)())),A&&(y().fire({icon:"success",title:"Success!",text:"Login Successful"}),w((0,Z.uD)())),null!==D&&window.location.replace("/app")}),[w,I,D,s,A]),(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(v.ql,{children:(0,C.jsx)("title",{children:" Login | SAPTHAPDHI"})}),(0,C.jsx)(z,{children:(0,C.jsxs)(P,{children:[(0,C.jsx)(c.Z,{sx:{px:5,mt:10,mb:5},children:(0,C.jsx)(d.Z,{variant:"h3",textAlign:"center",children:"Hi, Welcome Back"})}),(0,C.jsx)(d.Z,{variant:"h4",gutterBottom:!0,textTransform:"uppercase",textAlign:"center",children:"Login to your Account"}),(0,C.jsxs)(c.Z,{component:"form",onSubmit:function(e){e.preventDefault();var n=new FormData(e.target),t=Object.fromEntries(n.entries());""!==t.phone&&""!==t.password?w((0,j.n$)(t)):m.Am.warn("Please fill all the fields")},children:[(0,C.jsx)(u.Z,{margin:"normal",required:!0,fullWidth:!0,id:"phone",label:"Phone",InputProps:{style:{color:"#FFFFFF"}},name:"phone",autoComplete:"phone",autoFocus:!0,InputLabelProps:{style:{color:"#B3C2D1"}}}),(0,C.jsx)(u.Z,{margin:"normal",required:!0,fullWidth:!0,id:"password",autoComplete:"current-password",name:"password",label:"Password",type:t?"text":"password",InputProps:{endAdornment:(0,C.jsx)(p.Z,{position:"end",children:(0,C.jsx)(f.Z,{onClick:function(){return o(!t)},edge:"end",children:t?(0,C.jsx)(l.Z,{color:"primary",fontSize:"small"}):(0,C.jsx)(a.Z,{color:"info",fontSize:"small"})})}),style:{color:"#FFFFFF"}},InputLabelProps:{style:{color:"#B3C2D1"}}}),(0,C.jsx)(x.Z,{sx:{marginTop:2,backgroundColor:"#007BFF",color:"#FFFFFF",borderRadius:"5px","&:hover":{backgroundColor:"#0056B3"},padding:"10px 20px",textTransform:"capitalize",boxShadow:"none"},disabled:!!S,type:"submit",fullWidth:!0,size:"large",variant:"contained",children:(0,C.jsx)(d.Z,{variant:"h6",children:"Login"})})]}),(0,C.jsx)(h.Z,{direction:"row",alignItems:"center",justifyContent:"space-between",display:"none",sx:{my:2},children:(0,C.jsx)(g.rU,{to:"/login ",variant:"subtitle2",underline:"hover",children:"Forgot password?"})}),(0,C.jsx)(h.Z,{direction:"row",alignItems:"center",justifyContent:"center",sx:{mt:2}})]})})]})}},3746:function(e,n,t){var r=t(4836);n.Z=void 0;var o=r(t(5649)),i=t(184),s=(0,o.default)((0,i.jsx)("path",{d:"M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"}),"Visibility");n.Z=s},165:function(e,n,t){var r=t(4836);n.Z=void 0;var o=r(t(5649)),i=t(184),s=(0,o.default)((0,i.jsx)("path",{d:"M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78 3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"}),"VisibilityOff");n.Z=s}}]);
//# sourceMappingURL=38.8c760d6b.chunk.js.map