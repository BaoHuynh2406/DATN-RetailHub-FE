import{l as T,m as b,j as t,u as R,a as H,f as x,r as l,B as s,M as y,Z as M,$ as P,a0 as _,T as v,b as w,a1 as B,a2 as q,a3 as V}from"./index-DP8KUik0.js";import{T as $}from"./TablePagination-Bqy9TBjS.js";import{E as K}from"./useExportExcel-B3uvJs9a.js";import"./FileSaver.min-Cv5WsCZf.js";import{d as W}from"./Explicit-CDg5BFZq.js";import{S as g}from"./Switch-DhSWMwzF.js";import{E as X}from"./Edit-Dd-fut1e.js";import{T as z}from"./Tooltip-BGGRBVqn.js";import{C as G}from"./Container-CJKjEmvN.js";import{A as O}from"./AddCircle-BCosJuU0.js";import"./Chip-DFlt0T8Q.js";import"./TextField-wt1h2hNg.js";import"./useThemeProps-RlFDv_1a.js";import"./FormControlLabel-f3UpizWu.js";import"./SwitchBase-BEEy8CUH.js";import"./InputAdornment-BB7_Xr8N.js";import"./KeyboardArrowRight-DXd9sxFF.js";var c={},U=b;Object.defineProperty(c,"__esModule",{value:!0});var j=c.default=void 0,Z=U(T()),F=t;j=c.default=(0,Z.default)((0,F.jsx)("path",{d:"M14.83 4.83 12.7 2.7c-.62-.62-1.7-.18-1.7.71v.66C7.06 4.56 4 7.92 4 12c0 3.64 2.43 6.71 5.77 7.68.62.18 1.23-.32 1.23-.96v-.03c0-.43-.27-.82-.68-.94C7.82 17.03 6 14.73 6 12c0-2.97 2.16-5.43 5-5.91v1.53c0 .89 1.07 1.33 1.7.71l2.13-2.08c.4-.38.4-1.02 0-1.42m4.84 4.93c-.16-.55-.38-1.08-.66-1.59-.31-.57-1.1-.66-1.56-.2l-.01.01c-.31.31-.38.78-.17 1.16.2.37.36.76.48 1.16.12.42.51.7.94.7h.02c.65 0 1.15-.62.96-1.24M13 18.68v.02c0 .65.62 1.14 1.24.96.55-.16 1.08-.38 1.59-.66.57-.31.66-1.1.2-1.56l-.02-.02c-.31-.31-.78-.38-1.16-.17-.37.21-.76.37-1.16.49-.41.12-.69.51-.69.94m4.44-2.65c.46.46 1.25.37 1.56-.2.28-.51.5-1.04.67-1.59.18-.62-.31-1.24-.96-1.24h-.02c-.44 0-.82.28-.94.7-.12.4-.28.79-.48 1.17-.21.38-.13.86.17 1.16"}),"RotateRightRounded");const J=new V({position:{x:"right",y:"top"},dismissible:!0});function ue(){const d=R(),i=H(),r=x(e=>e.userCurrent),[o,h]=l.useState(!1),N=l.useMemo(()=>[{field:"userId",headerName:"Mã nhân viên",width:150,renderCell:e=>{var a,n;return t.jsx("span",{className:((a=e.row)==null?void 0:a.userId)===((n=r==null?void 0:r.data)==null?void 0:n.userId)?"text-orange-400 font-bold":"",children:e.value})}},{field:"fullName",headerName:"Họ và tên",width:210,renderCell:e=>{var a,n;return t.jsx("span",{className:((a=e.row)==null?void 0:a.userId)===((n=r==null?void 0:r.data)==null?void 0:n.userId)?"text-orange-400 font-bold":"",children:e.value})}},{field:"phoneNumber",headerName:"Số điện thoại",width:170},{field:"role",headerName:"Chức vụ",width:150,valueGetter:e=>e.roleDescription?e.roleDescription:"?"},{field:"startDate",headerName:"Ngày vào làm",width:180},{field:"isActive",headerName:"Trạng thái",width:120,renderCell:e=>{var a,n,u;return t.jsx(g,{disabled:((a=e.row)==null?void 0:a.userId)===((n=r==null?void 0:r.data)==null?void 0:n.userId)||!1||o,checked:(u=e.row)==null?void 0:u.isActive,onChange:()=>{var f;return E((f=e.row)==null?void 0:f.userId)},color:"secondary"})}},{field:"actions",headerAlign:"center",headerName:"Công cụ",width:130,renderCell:e=>t.jsxs(s,{display:"flex",justifyContent:"center",alignItems:"center",height:"100%",children:[t.jsx(y,{color:"primary",onClick:()=>I(e.row),style:{textAlign:"center"},children:t.jsx(X,{})}),o&&t.jsx(z,{title:"Khôi phục tài khoản này",placement:"bottom",children:t.jsx(y,{color:"primary",onClick:()=>A(e.row),style:{textAlign:"center"},children:t.jsx(j,{})})})]})}],[o]),I=e=>{d(`/employee/EmployeeDetail/${e.userId}`)},C=()=>{d("/employee/EmployeeDetail/create")},E=e=>{i(M(e))},A=e=>{e.userId&&(i(P(e.userId)),J.success("Khôi phục tài khoản thành công!"))},m=x(e=>{var a;return((a=e.employeeNew)==null?void 0:a.data.data)||[]}),S=e=>{h(e.target.checked);const a=new URLSearchParams(p);a.set("showDeleted",e.target.checked),D(a)},k=async()=>{const e=[{header:"STT",key:"STT",width:10},{header:"Mã nhân viên",key:"userId",width:15},{header:"Họ và tên",key:"fullName",width:25},{header:"Số điện thoại",key:"phoneNumber",width:20},{header:"Chức vụ",key:"role",width:15},{header:"Ngày vào làm",key:"startDate",width:18},{header:"Trạng thái",key:"isActive",width:20},,];m&&K(e,m,"DanhSachNhanVien")},[p,D]=_();return l.useEffect(()=>{const e=p.get("showDeleted")==="true";h(e)},[o,i]),t.jsxs(G,{maxWidth:"xl",sx:{paddingTop:3},children:[t.jsxs(s,{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:3,children:[t.jsx(v,{variant:"h4",component:"h2",fontWeight:"bold",color:o?"#ab003c":"inherit",children:o?"DANH SÁCH NHÂN VIÊN ĐÃ XÓA":"DANH SÁCH NHÂN VIÊN"}),t.jsx(w,{variant:"contained",color:"success",startIcon:t.jsx(O,{}),onClick:C,children:"Thêm mới"})]}),t.jsx(s,{sx:{height:500,overflow:"auto"},children:t.jsx($,{columns:N,stt:!0,id:"userId",dispatchHandle:o?B:q,sliceName:"employeeNew"})}),t.jsxs(s,{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:2,children:[t.jsxs(s,{display:"flex",alignItems:"center",children:[t.jsx(v,{variant:"body1",marginRight:1,color:"red",children:"Nhân viên đã xóa:"}),t.jsx(g,{checked:o,onChange:S,color:"secondary"})]}),t.jsx(w,{variant:"contained",startIcon:t.jsx(W,{}),onClick:k,sx:{fontSize:10},children:"Xuất Excel"})]})]})}export{ue as default};