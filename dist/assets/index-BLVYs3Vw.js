import{u as m,a as c,f as h,r as a,am as s,j as t,B as r}from"./index-DP8KUik0.js";import{T as l}from"./TablePagination-Bqy9TBjS.js";import{C as p}from"./Container-CJKjEmvN.js";import"./Chip-DFlt0T8Q.js";import"./TextField-wt1h2hNg.js";import"./Tooltip-BGGRBVqn.js";import"./useThemeProps-RlFDv_1a.js";import"./FormControlLabel-f3UpizWu.js";import"./SwitchBase-BEEy8CUH.js";import"./InputAdornment-BB7_Xr8N.js";import"./KeyboardArrowRight-DXd9sxFF.js";function T(){m();const i=c(),n=h(e=>e.pointHistory.data);a.useEffect(()=>{i(s())},[i]);const d=a.useMemo(()=>[{field:"historyId",headerName:"ID Lịch Sử",width:150},{field:"customerId",headerName:"Mã Khách Hàng",width:150},{field:"points",headerName:"Điểm",width:150},{field:"description",headerName:"Mô Tả",width:300},{field:"transactionDate",headerName:"Ngày Giao Dịch",width:200,renderCell:e=>{const o=new Date(e.row.transactionDate);return`${o.toLocaleDateString()} ${o.toLocaleTimeString()}`}}],[]);return t.jsxs(p,{maxWidth:"xl",children:[t.jsx(r,{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:3}),t.jsx(r,{sx:{height:500,overflow:"auto"},children:t.jsx(l,{columns:d,stt:!0,id:"historyId",dispatchHandle:s,sliceName:"pointHistory",rows:n||[]})})]})}export{T as default};