import{d as P,e as S,f as N,N as A,b as B,g as G,u as V,a as i,j as r,P as D,B as k,T as v,c as C}from"./index-fCbYz-6P.js";import{d as I}from"./LockOutlined-BYT1XGMt.js";import{G as h}from"./Grid-BhrwLh7C.js";import{A as z}from"./Avatar-BgBfa0Bm.js";import{T as u}from"./TextField-D13pBZMm.js";const K={loading:!1,data:null,error:null},c=P("userCurrent/sendResetPasswordCode",async(s,{rejectWithValue:e})=>{var a,t;try{return(await S.post("/api-public/auth/send-otp",{email:s})).data.message}catch(o){return e(((t=(a=o.response)==null?void 0:a.data)==null?void 0:t.message)||"Failed to send reset code")}}),m=P("/api-public/auth/verify-otp",async(s,{rejectWithValue:e})=>{var a,t;try{return(await S.post("/api-public/auth/verify-otp",s)).data.message}catch(o){return e(((t=(a=o.response)==null?void 0:a.data)==null?void 0:t.message)||"Failed to reset password")}});N({name:"userCurrent",initialState:K,reducers:{},extraReducers:s=>{s.addCase(c.pending,e=>{e.loading=!0,e.error=null}).addCase(c.fulfilled,(e,a)=>{e.loading=!1,e.data=a.payload}).addCase(c.rejected,(e,a)=>{e.loading=!1,e.error=a.payload}).addCase(m.pending,e=>{e.loading=!0,e.error=null}).addCase(m.fulfilled,(e,a)=>{e.loading=!1,e.data=a.payload}).addCase(m.rejected,(e,a)=>{e.loading=!1,e.error=a.payload})}});function J(){const s=new A({position:{x:"right",y:"top"},dismissible:!0}),e=B(),{loading:a,error:t,data:o}=G(n=>n.userCurrent),F=V(),f=i.useRef(null),g=i.useRef(null),x=i.useRef(null),y=i.useRef(null),[p,M]=i.useState(1),[T,W]=i.useState(""),q=async()=>{const n=f.current.value;if(!n){s.error("Vui lòng nhập email!");return}try{await e(c(n)).unwrap(),s.success("Mã xác nhận đã được gửi!"),W(n),M(2)}catch(l){s.error(l)}},E=async()=>{var j,b,R;const n=(j=x.current)==null?void 0:j.value,l=(b=g.current)==null?void 0:b.value,w=(R=y.current)==null?void 0:R.value;if(!l||!w){s.error("Vui lòng nhập đầy đủ thông tin!");return}if(!n){s.error("Mã OTP không chính xác vui lòng nhập lại !");return}if(l!==w){s.error("Mật khẩu xác nhận không khớp!");return}try{const d={otp:n,newPassword:l,email:T};console.log("Payload gửi đi:",d),await e(m(d)).unwrap(),s.success("Mật khẩu đã được đặt lại thành công!"),F("/login")}catch(d){s.error(d)}};return r.jsxs(h,{container:!0,component:"main",sx:{height:"100vh"},children:[r.jsx(h,{item:!0,xs:!1,sm:4,md:7,sx:{backgroundImage:"url(/assets/images/background.png)",backgroundSize:"cover",backgroundPosition:"left"}}),r.jsx(h,{item:!0,xs:12,sm:8,md:5,component:D,elevation:6,square:!0,children:r.jsxs(k,{sx:{my:8,mx:4,display:"flex",flexDirection:"column",alignItems:"center"},children:[r.jsx(z,{sx:{m:1,bgcolor:"secondary.main"},children:r.jsx(I,{})}),r.jsx(v,{component:"h1",variant:"h5",children:p===1?"Khôi phục mật khẩu":"Đặt mật khẩu mới"}),r.jsxs(k,{component:"form",noValidate:!0,sx:{mt:1},children:[p===1&&r.jsxs(r.Fragment,{children:[r.jsx(u,{margin:"normal",required:!0,fullWidth:!0,id:"email",label:"Nhập email",name:"email",autoComplete:"email",autoFocus:!0,inputRef:f}),r.jsx(C,{onClick:q,fullWidth:!0,variant:"contained",sx:{mt:3,mb:2},disabled:a,children:a?"Đang gửi...":"Gửi mã"})]}),p===2&&r.jsxs(r.Fragment,{children:[r.jsx(u,{margin:"normal",required:!0,fullWidth:!0,id:"otp",label:"Mã xác nhận",type:"otp",inputRef:x}),r.jsx(u,{margin:"normal",required:!0,fullWidth:!0,id:"new-password",label:"Mật khẩu mới",type:"password",inputRef:g}),r.jsx(u,{margin:"normal",required:!0,fullWidth:!0,id:"confirm-password",label:"Xác nhận mật khẩu",type:"password",inputRef:y}),r.jsx(C,{onClick:E,fullWidth:!0,variant:"contained",sx:{mt:3,mb:2},disabled:a,children:a?"Đang xử lý...":"Đặt lại mật khẩu"})]}),t&&r.jsx(v,{color:"error",children:t})]})]})})]})}export{J as default};