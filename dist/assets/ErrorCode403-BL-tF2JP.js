import{u as l,r as m,j as t}from"./index-DP8KUik0.js";import{d as o}from"./styled-components.browser.esm-CnG5tDFx.js";const h=o.div`
    background-color: rgb(51, 51, 51);
    width: 100vw;
    height: 100vh;
    color: white;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`,s=o.span`
    font-size: 8em;
    font-family: 'Arial Black';
`,u=o.div`
    background: #fff;
    border-radius: 50%;
    display: inline-block;
    height: 100px;
    position: relative;
    width: 100px;
    margin: 0 10px;

    &::after {
        background: #000;
        border-radius: 50%;
        bottom: 56.1px;
        content: '';
        height: 33px;
        position: absolute;
        right: 33px;
        width: 33px;
    }
`,f=o.p`
    margin-bottom: 4em;
`;o.a`
    color: white;
    text-decoration: none;
    text-transform: uppercase;

    &:hover {
        color: lightgray;
    }
`;const v=()=>{const i=l();return m.useEffect(()=>{const r=n=>{document.querySelectorAll(".eye").forEach(e=>{const a=e.offsetLeft+e.offsetWidth/2,c=e.offsetTop+e.offsetHeight/2,d=Math.atan2(n.pageX-a,n.pageY-c)*(180/Math.PI)*-1+180;e.style.transform=`rotate(${d}deg)`})};return document.body.addEventListener("mousemove",r),()=>{document.body.removeEventListener("mousemove",r)}},[]),t.jsxs(h,{children:[t.jsxs("div",{children:[t.jsx(s,{children:"4"}),t.jsx(u,{className:"eye"}),t.jsx(s,{children:"3"})]}),t.jsx(f,{children:"Vào đây làm gì?. Bạn làm gì có quyền truy cập?"}),t.jsx("span",{onClick:()=>{i("/login")},className:"cursor-pointer",children:"Thoát"})]})};export{v as default};
