import{u as l,r as h,j as t}from"./index-DP8KUik0.js";import{d as o}from"./styled-components.browser.esm-CnG5tDFx.js";const m=o.div`
    background-color: rgb(51, 51, 51);
    width: 100vw;
    height: 100vh;
    color: white;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`,f=o.span`
    font-size: 8em;
    font-family: 'Arial Black';
`,s=o.div`
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
`,p=o.p`
    margin-bottom: 4em;
`;o.a`
    color: white;
    text-decoration: none;
    text-transform: uppercase;

    &:hover {
        color: lightgray;
    }
`;const b=()=>{const a=l();return h.useEffect(()=>{const n=r=>{document.querySelectorAll(".eye").forEach(e=>{const i=e.offsetLeft+e.offsetWidth/2,c=e.offsetTop+e.offsetHeight/2,d=Math.atan2(r.pageX-i,r.pageY-c)*(180/Math.PI)*-1+180;e.style.transform=`rotate(${d}deg)`})};return document.body.addEventListener("mousemove",n),()=>{document.body.removeEventListener("mousemove",n)}},[]),t.jsxs(m,{children:[t.jsxs("div",{children:[t.jsx(f,{children:"5"}),t.jsx(s,{className:"eye"}),t.jsx(s,{className:"eye"})]}),t.jsx(p,{children:"Oh no! Chúng tôi đã gặp một chút sự cố."}),t.jsx("span",{onClick:()=>{a("/login")},className:"cursor-pointer",children:"Thoát"})]})};export{b as default};
