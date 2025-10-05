import{d as q,e as $e,f as Oe,h as M,k as Ue,l as F,m as E,n as g,p as Be,q as ae,t as y,v as h,w as D,x as k,y as v,z as O,A as Q,B as Te,C as B,E as K,F as G,G as le,P as Le,H as X,J as ie,K as se,M as Ye,N as W,O as Ne,Q as je,U as Re,V as he,W as We,X as fe,Y as qe}from"./main-tENVBu92.js";let Ke={data:""},Ge=r=>{if(typeof window=="object"){let e=(r?r.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return e.nonce=window.__nonce__,e.parentNode||(r||document.head).appendChild(e),e.firstChild}return r||Ke},Ve=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,Ze=/\/\*[^]*?\*\/|  +/g,ve=/\n+/g,$=(r,e)=>{let l="",i="",d="";for(let s in r){let a=r[s];s[0]=="@"?s[1]=="i"?l=s+" "+a+";":i+=s[1]=="f"?$(a,s):s+"{"+$(a,s[1]=="k"?"":e)+"}":typeof a=="object"?i+=$(a,e?e.replace(/([^,])+/g,t=>s.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,n=>/&/.test(n)?n.replace(/&/g,t):t?t+" "+n:n)):s):a!=null&&(s=/^--/.test(s)?s:s.replace(/[A-Z]/g,"-$&").toLowerCase(),d+=$.p?$.p(s,a):s+":"+a+";")}return l+(e&&d?e+"{"+d+"}":d)+i},P={},Se=r=>{if(typeof r=="object"){let e="";for(let l in r)e+=l+Se(r[l]);return e}return r},Je=(r,e,l,i,d)=>{let s=Se(r),a=P[s]||(P[s]=(n=>{let o=0,c=11;for(;o<n.length;)c=101*c+n.charCodeAt(o++)>>>0;return"go"+c})(s));if(!P[a]){let n=s!==r?r:(o=>{let c,p,u=[{}];for(;c=Ve.exec(o.replace(Ze,""));)c[4]?u.shift():c[3]?(p=c[3].replace(ve," ").trim(),u.unshift(u[0][p]=u[0][p]||{})):u[0][c[1]]=c[2].replace(ve," ").trim();return u[0]})(r);P[a]=$(d?{["@keyframes "+a]:n}:n,l?"":"."+a)}let t=l&&P.g?P.g:null;return l&&(P.g=P[a]),((n,o,c,p)=>{p?o.data=o.data.replace(p,n):o.data.indexOf(n)===-1&&(o.data=c?n+o.data:o.data+n)})(P[a],e,i,t),a},Xe=(r,e,l)=>r.reduce((i,d,s)=>{let a=e[s];if(a&&a.call){let t=a(l),n=t&&t.props&&t.props.className||/^go/.test(t)&&t;a=n?"."+n:t&&typeof t=="object"?t.props?"":$(t,""):t===!1?"":t}return i+d+(a??"")},"");function _(r){let e=this||{},l=r.call?r(e.p):r;return Je(l.unshift?l.raw?Xe(l,[].slice.call(arguments,1),e.p):l.reduce((i,d)=>Object.assign(i,d&&d.call?d(e.p):d),{}):l,Ge(e.target),e.g,e.o,e.k)}_.bind({g:1});_.bind({k:1});const J=(r,e)=>r===e||r.length===e.length&&r.every((l,i)=>l===e[i]),_e=q;function L(r,e,l,i){return r.addEventListener(e,l,i),_e(r.removeEventListener.bind(r,e,l,i))}function ce(r,e=$e()){let l=0,i,d;return()=>(l++,q(()=>{l--,queueMicrotask(()=>{!l&&d&&(d(),d=i=void 0)})}),d||Oe(s=>i=r(d=s),e),i)}function me(r,e){for(let l=r.length-1;l>=0;l--){const i=e.slice(0,l+1);if(!J(r[l],i))return!1}return!0}const ze=ce(()=>{const[r,e]=E(null);return L(window,"keydown",l=>{e(l),setTimeout(()=>e(null))}),r}),et=ce(()=>{const[r,e]=E([]),l=()=>e([]),i=ze();return L(window,"keydown",d=>{if(d.repeat||typeof d.key!="string")return;const s=d.key.toUpperCase(),a=r();if(a.includes(s))return;const t=[...a,s];a.length===0&&s!=="ALT"&&s!=="CONTROL"&&s!=="META"&&s!=="SHIFT"&&(d.shiftKey&&t.unshift("SHIFT"),d.altKey&&t.unshift("ALT"),d.ctrlKey&&t.unshift("CONTROL"),d.metaKey&&t.unshift("META")),e(t)}),L(window,"keyup",d=>{if(typeof d.key!="string")return;const s=d.key.toUpperCase();e(a=>a.filter(t=>t!==s))}),L(window,"blur",l),L(window,"contextmenu",d=>{d.defaultPrevented||l()}),r[0]=r,r[1]={event:i},r[Symbol.iterator]=function*(){yield r[0],yield r[1]},r}),tt=ce(()=>{const r=et();return F(e=>r().length===0?[]:[...e,r()],[])});function rt(r,e,l={}){if(!r.length)return;r=r.map(o=>o.toUpperCase());const{preventDefault:i=!0}=l,d=ze(),s=tt();let a=!1;const t=o=>{if(!o.length)return a=!1;if(a)return;const c=d();o.length<r.length?me(o,r.slice(0,o.length))?i&&c&&c.preventDefault():a=!0:(a=!0,me(o,r)&&(i&&c&&c.preventDefault(),e(c)))},n=o=>{const c=o.at(-1);if(!c)return;const p=d();if(i&&c.length<r.length){J(c,r.slice(0,r.length-1))&&p&&p.preventDefault();return}if(J(c,r)){const u=o.at(-2);(!u||J(u,r.slice(0,r.length-1)))&&(i&&p&&p.preventDefault(),e(p))}};M(Ue(s,l.requireReset?t:n))}const Me=Be(void 0),ot=r=>{const[e,l]=E(r.theme);return M(()=>{l(r.theme)}),g(Me.Provider,{value:{theme:e,setTheme:l},get children(){return r.children}})};function nt(){const r=ae(Me);if(!r)throw new Error("useTheme must be used within a ThemeContextProvider");return r}const b={colors:{inherit:"inherit",current:"currentColor",transparent:"transparent",black:"#000000",white:"#ffffff",neutral:{50:"#f9fafb",100:"#f2f4f7",200:"#eaecf0",300:"#d0d5dd",400:"#98a2b3",500:"#667085",600:"#475467",700:"#344054",800:"#1d2939",900:"#101828"},darkGray:{50:"#525c7a",100:"#49536e",200:"#414962",300:"#394056",400:"#313749",500:"#292e3d",600:"#212530",700:"#191c24",800:"#111318",900:"#0b0d10"},gray:{50:"#f9fafb",100:"#f2f4f7",200:"#eaecf0",300:"#d0d5dd",400:"#98a2b3",500:"#667085",600:"#475467",700:"#344054",800:"#1d2939",900:"#101828"},blue:{25:"#F5FAFF",50:"#EFF8FF",100:"#D1E9FF",200:"#B2DDFF",300:"#84CAFF",400:"#53B1FD",500:"#2E90FA",600:"#1570EF",700:"#175CD3",800:"#1849A9",900:"#194185"},green:{25:"#F6FEF9",50:"#ECFDF3",100:"#D1FADF",200:"#A6F4C5",300:"#6CE9A6",400:"#32D583",500:"#12B76A",600:"#039855",700:"#027A48",800:"#05603A",900:"#054F31"},red:{50:"#fef2f2",100:"#fee2e2",200:"#fecaca",300:"#fca5a5",400:"#f87171",500:"#ef4444",600:"#dc2626",700:"#b91c1c",800:"#991b1b",900:"#7f1d1d",950:"#450a0a"},yellow:{25:"#FFFCF5",50:"#FFFAEB",100:"#FEF0C7",200:"#FEDF89",300:"#FEC84B",400:"#FDB022",500:"#F79009",600:"#DC6803",700:"#B54708",800:"#93370D",900:"#7A2E0E"},purple:{25:"#FAFAFF",50:"#F4F3FF",100:"#EBE9FE",200:"#D9D6FE",300:"#BDB4FE",400:"#9B8AFB",500:"#7A5AF8",600:"#6938EF",700:"#5925DC",800:"#4A1FB8",900:"#3E1C96"},teal:{25:"#F6FEFC",50:"#F0FDF9",100:"#CCFBEF",200:"#99F6E0",300:"#5FE9D0",400:"#2ED3B7",500:"#15B79E",600:"#0E9384",700:"#107569",800:"#125D56",900:"#134E48"},pink:{25:"#fdf2f8",50:"#fce7f3",100:"#fbcfe8",200:"#f9a8d4",300:"#f472b6",400:"#ec4899",500:"#db2777",600:"#be185d",700:"#9d174d",800:"#831843",900:"#500724"},cyan:{25:"#ecfeff",50:"#cffafe",100:"#a5f3fc",200:"#67e8f9",300:"#22d3ee",400:"#06b6d4",500:"#0891b2",600:"#0e7490",700:"#155e75",800:"#164e63",900:"#083344"}},alpha:{20:"33"},font:{size:{xs:"calc(var(--tsrd-font-size) * 0.75)",sm:"calc(var(--tsrd-font-size) * 0.875)",md:"var(--tsrd-font-size)"},lineHeight:{xs:"calc(var(--tsrd-font-size) * 1)"},weight:{medium:"500",semibold:"600",bold:"700"},fontFamily:{sans:"ui-sans-serif, Inter, system-ui, sans-serif, sans-serif",mono:"ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace"}},border:{radius:{xs:"calc(var(--tsrd-font-size) * 0.125)",sm:"calc(var(--tsrd-font-size) * 0.25)",full:"9999px"}},size:{.5:"calc(var(--tsrd-font-size) * 0.125)",1:"calc(var(--tsrd-font-size) * 0.25)",1.5:"calc(var(--tsrd-font-size) * 0.375)",2:"calc(var(--tsrd-font-size) * 0.5)",2.5:"calc(var(--tsrd-font-size) * 0.625)",3:"calc(var(--tsrd-font-size) * 0.75)",4:"calc(var(--tsrd-font-size) * 1)",4.5:"calc(var(--tsrd-font-size) * 1.125)",6.5:"calc(var(--tsrd-font-size) * 1.625)",12:"calc(var(--tsrd-font-size) * 3)"}},it={primary:{bg:b.colors.purple[500],hover:b.colors.purple[600],active:b.colors.purple[700],text:"#fff",border:b.colors.purple[500]},secondary:{bg:b.colors.gray[800],hover:b.colors.gray[700],active:b.colors.gray[600],text:b.colors.gray[100],border:b.colors.gray[700]},info:{bg:b.colors.blue[500],hover:b.colors.blue[600],active:b.colors.blue[700],text:"#fff",border:b.colors.blue[500]},warning:{bg:b.colors.yellow[500],hover:b.colors.yellow[600],active:b.colors.yellow[700],text:"#fff",border:b.colors.yellow[500]},danger:{bg:b.colors.red[500],hover:b.colors.red[600],active:b.colors.red[700],text:"#fff",border:b.colors.red[500]},success:{bg:b.colors.green[500],hover:b.colors.green[600],active:b.colors.green[700],text:"#fff",border:b.colors.green[500]}},f=_,be=(r="dark")=>{const{colors:e,font:l,size:i,alpha:d,border:s}=b,{fontFamily:a}=l,t=(o,c)=>r==="light"?o:c,n=320;return{logo:f`
      cursor: pointer;
      display: flex;
      flex-direction: column;
      background-color: transparent;
      border: none;
      width: ${i[12]};
      height: ${i[12]};
      font-family: ${a.sans};
      gap: ${b.size[.5]};
      padding: 0px;
      &:hover {
        opacity: 0.7;
      }
    `,selectWrapper:f`
      width: 100%;
      max-width: ${n}px;
      display: flex;
      flex-direction: column;
      gap: 0.375rem;
    `,selectContainer:f`
      width: 100%;
    `,selectLabel:f`
      font-size: 0.875rem;
      font-weight: 500;
      color: ${t(e.gray[900],e.gray[100])};
      text-align: left;
    `,selectDescription:f`
      font-size: 0.8rem;
      color: ${t(e.gray[500],e.gray[400])};
      margin: 0;
      line-height: 1.3;
      text-align: left;
    `,select:f`
      appearance: none;
      width: 100%;
      padding: 0.75rem 3rem 0.75rem 0.75rem;
      border-radius: 0.5rem;
      background-color: ${t(e.gray[50],e.darkGray[800])};
      color: ${t(e.gray[900],e.gray[100])};
      border: 1px solid ${t(e.gray[300],e.gray[700])};
      font-size: 0.875rem;
      transition: all 0.2s ease;
      cursor: pointer;

      /* Custom arrow */
      background-image: url("data:image/svg+xml;utf8,<svg fill='%236b7280' height='20' viewBox='0 0 24 24' width='20' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>");
      background-repeat: no-repeat;
      background-position: right 0.75rem center;
      background-size: 1.25rem;

      &:hover {
        border-color: ${t(e.gray[400],e.gray[600])};
      }

      &:focus {
        outline: none;
        border-color: ${e.purple[400]};
        box-shadow: 0 0 0 3px ${e.purple[400]}${d[20]};
      }
    `,inputWrapper:f`
      width: 100%;
      max-width: ${n}px;
      display: flex;
      flex-direction: column;
      gap: 0.375rem;
    `,inputContainer:f`
      width: 100%;
    `,inputLabel:f`
      font-size: 0.875rem;
      font-weight: 500;
      color: ${t(e.gray[900],e.gray[100])};
      text-align: left;
    `,inputDescription:f`
      font-size: 0.8rem;
      color: ${t(e.gray[500],e.gray[400])};
      margin: 0;
      line-height: 1.3;
      text-align: left;
    `,input:f`
      appearance: none;
      box-sizing: border-box;
      width: 100%;
      padding: 0.75rem;
      border-radius: 0.5rem;
      background-color: ${t(e.gray[50],e.darkGray[800])};
      color: ${t(e.gray[900],e.gray[100])};
      border: 1px solid ${t(e.gray[300],e.gray[700])};
      font-size: 0.875rem;
      font-family: ${a.mono};
      transition: all 0.2s ease;

      &::placeholder {
        color: ${t(e.gray[400],e.gray[500])};
      }

      &:hover {
        border-color: ${t(e.gray[400],e.gray[600])};
      }

      &:focus {
        outline: none;
        border-color: ${t(e.purple[500],e.purple[400])};
        box-shadow: 0 0 0 3px
          ${t(e.purple[100]+d[20],e.purple[400]+d[20])};
      }
    `,checkboxWrapper:f`
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      cursor: pointer;
      user-select: none;
      padding: 0.5rem;
      border-radius: 0.5rem;
      transition: background-color 0.2s ease;

      &:hover {
        background-color: ${t(e.gray[100],e.darkGray[800])};
      }
    `,checkboxContainer:f`
      width: 100%;
    `,checkboxLabelContainer:f`
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      flex: 1;
    `,checkbox:f`
      appearance: none;
      width: 1.25rem;
      height: 1.25rem;
      border: 2px solid ${t(e.gray[300],e.gray[700])};
      border-radius: 0.375rem;
      background-color: ${t(e.gray[50],e.darkGray[800])};
      display: grid;
      place-items: center;
      transition: all 0.2s ease;
      flex-shrink: 0;
      margin-top: 0.125rem;

      &:hover {
        border-color: ${t(e.purple[500],e.purple[400])};
      }

      &:checked {
        background-color: ${t(e.purple[500],e.purple[700])};
        border-color: ${t(e.purple[500],e.purple[700])};
      }

      &:checked::after {
        content: '';
        width: 0.4rem;
        height: 0.6rem;
        border: solid ${t("#fff",e.gray[100])};
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
        margin-top: -3px;
      }
    `,checkboxLabel:f`
      color: ${t(e.gray[900],e.gray[100])};
      font-size: 0.875rem;
      font-weight: 500;
      line-height: 1.4;
      text-align: left;
    `,checkboxDescription:f`
      color: ${t(e.gray[500],e.gray[400])};
      font-size: 0.8rem;
      line-height: 1.3;
      text-align: left;
    `,button:{base:f`
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-family: ${b.font.fontFamily.sans};
        font-size: 0.8rem;
        font-weight: 500;
        border-radius: 0.2rem;
        padding: 0.2rem 0.6rem;
        cursor: pointer;
        transition:
          background 0.2s,
          color 0.2s,
          border 0.2s,
          box-shadow 0.2s;
        outline: none;
        border-width: 1px;
        border-style: solid;
      `,variant(o,c,p){const u=it[o];return p?f`
            background: transparent;
            color: ${t(u.bg,u.bg)};
            border-color: transparent;
            &:hover {
              background: ${t(e.purple[100],e.darkGray[700])};
            }
            &:active {
              background: ${t(e.purple[200],e.darkGray[800])};
            }
          `:c?f`
            background: transparent;
            color: ${t(u.bg,u.bg)};
            border-color: ${t(u.bg,u.bg)};
            &:hover {
              background: ${t(e.purple[100],e.darkGray[700])};
              border-color: ${t(u.hover,u.hover)};
            }
            &:active {
              background: ${t(e.purple[200],e.darkGray[800])};
              border-color: ${t(u.active,u.active)};
            }
          `:f`
          background: ${t(u.bg,u.bg)};
          color: ${t(u.text,u.text)};
          border-color: ${t(u.border,u.border)};
          &:hover {
            background: ${t(u.hover,u.hover)};
            border-color: ${t(u.hover,u.hover)};
          }
          &:active {
            background: ${t(u.active,u.active)};
            border-color: ${t(u.active,u.active)};
          }
        `}},tag:{dot:o=>f`
        width: ${b.size[1.5]};
        height: ${b.size[1.5]};
        border-radius: ${b.border.radius.full};
        background-color: ${t(b.colors[o][500],b.colors[o][500])};
      `,base:f`
        display: flex;
        gap: ${b.size[1.5]};
        box-sizing: border-box;
        height: ${b.size[6.5]};
        background: ${t(e.gray[50],e.darkGray[500])};
        color: ${t(e.gray[700],e.gray[300])};
        border-radius: ${b.border.radius.sm};
        font-size: ${l.size.sm};
        padding: ${b.size[1]};
        padding-left: ${b.size[1.5]};
        align-items: center;
        font-weight: ${l.weight.medium};
        border: ${t("1px solid "+e.gray[300],"1px solid transparent")};
        user-select: none;
        position: relative;
        &:focus-visible {
          outline-offset: 2px;
          outline: 2px solid ${t(e.blue[700],e.blue[800])};
        }
      `,label:f`
        font-size: ${l.size.xs};
      `,count:f`
        font-size: ${l.size.xs};
        padding: 0 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${t(e.gray[500],e.gray[400])};
        background-color: ${t(e.gray[200],e.darkGray[300])};
        border-radius: 2px;
        font-variant-numeric: tabular-nums;
        height: ${b.size[4.5]};
      `},tree:{info:f`
        color: ${t(e.gray[500],e.gray[500])};
        font-size: ${l.size.xs};
        margin-right: ${i[1]};
      `,actionButton:f`
        background-color: transparent;
        color: ${t(e.gray[500],e.gray[500])};
        border: none;
        display: inline-flex;
        padding: 0px;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        width: ${i[3]};
        height: ${i[3]};
        position: relative;
        z-index: 1;

        &:hover svg {
          color: ${t(e.gray[600],e.gray[400])};
        }

        &:focus-visible {
          border-radius: ${s.radius.xs};
          outline: 2px solid ${t(e.blue[700],e.blue[800])};
          outline-offset: 2px;
        }
      `,expanderContainer:f`
        position: relative;
      `,expander:f`
        position: absolute;
        cursor: pointer;
        left: -16px;
        top: 3px;
        & path {
          stroke: ${t(e.blue[400],e.blue[300])};
        }
        & svg {
          width: ${i[3]};
          height: ${i[3]};
        }

        display: inline-flex;
        align-items: center;
        transition: all 0.1s ease;
      `,expandedLine:o=>f`
        display: block;
        padding-left: 0.75rem;
        margin-left: -0.7rem;
        ${o?`border-left: 1px solid ${t(e.blue[400],e.blue[300])};`:""}
      `,collapsible:f`
        cursor: pointer;
        transition: all 0.2s ease;
        &:hover {
          background-color: ${t(e.gray[100],e.darkGray[700])};
          border-radius: ${b.border.radius.sm};
          padding: 0 ${b.size[1]};
        }
      `,actions:f`
        display: inline-flex;
        margin-left: ${i[2]};
        gap: ${i[2]};
        align-items: center;
        & svg {
          height: 12px;
          width: 12px;
        }
      `,valueCollapsed:f`
        color: ${t(e.gray[500],e.gray[400])};
      `,valueFunction:f`
        color: ${t(e.cyan[500],e.cyan[400])};
      `,valueString:f`
        color: ${t(e.green[500],e.green[400])};
      `,valueNumber:f`
        color: ${t(e.yellow[500],e.yellow[400])};
      `,valueBoolean:f`
        color: ${t(e.pink[500],e.pink[400])};
      `,valueNull:f`
        color: ${t(e.gray[500],e.gray[400])};
        font-style: italic;
      `,valueKey:f`
        color: ${t(e.blue[400],e.blue[300])};
      `,valueBraces:f`
        color: ${e.gray[500]};
      `,valueContainer:o=>f`
        display: block;
        margin-left: ${o?"0":"1rem"};

        &:not(:hover) .actions {
          display: none;
        }

        &:hover .actions {
          display: inline-flex;
        }
      `},header:{row:f`
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: ${b.size[2]} ${b.size[2.5]};
        gap: ${b.size[2.5]};
        border-bottom: ${t(e.gray[300],e.darkGray[500])} 1px solid;
        align-items: center;
      `,logoAndToggleContainer:f`
        display: flex;
        gap: ${b.size[3]};
        align-items: center;
        & > button {
          padding: 0;
          background: transparent;
          border: none;
          display: flex;
          gap: ${i[.5]};
          flex-direction: column;
        }
      `,logo:f`
        cursor: pointer;
        display: flex;
        flex-direction: column;
        background-color: transparent;
        border: none;
        gap: ${b.size[.5]};
        padding: 0px;
        &:hover {
          opacity: 0.7;
        }
        &:focus-visible {
          outline-offset: 4px;
          border-radius: ${s.radius.xs};
          outline: 2px solid ${e.blue[800]};
        }
      `,tanstackLogo:f`
        font-size: ${l.size.md};
        font-weight: ${l.weight.bold};
        line-height: ${l.lineHeight.xs};
        white-space: nowrap;
        color: ${t(e.gray[700],e.gray[300])};
      `,flavorLogo:(o,c)=>f`
        font-weight: ${l.weight.semibold};
        font-size: ${l.size.xs};
        background: linear-gradient(to right, ${t(o,c)});
        background-clip: text;
        -webkit-background-clip: text;
        line-height: 1;
        -webkit-text-fill-color: transparent;
        white-space: nowrap;
      `},section:{main:f`
        margin-bottom: 2rem;
        padding: 1.5rem;
        background-color: ${t(e.gray[50],e.darkGray[800])};
        border: 1px solid ${t(e.gray[300],e.gray[700])};
        border-radius: 0.75rem;
        box-shadow: ${t("0 1px 3px rgba(0,0,0,0.06)","0 1px 3px rgba(0,0,0,0.18)")};
      `,title:f`
        font-size: 1.125rem;
        font-weight: 600;
        color: ${t(e.gray[900],e.gray[100])};
        margin: 0 0 1rem 0;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid ${t(e.gray[300],e.gray[700])};
        display: flex;
        align-items: center;
        gap: 0.5rem;
        text-align: left;
      `,icon:f`
        height: 20px;
        width: 20px;
        & > svg {
          height: 100%;
          width: 100%;
        }
        color: ${t(e.purple[500],e.purple[400])};
      `,description:f`
        color: ${t(e.gray[500],e.gray[400])};
        font-size: 0.875rem;
        margin: 0 0 1.5rem 0;
        line-height: 1.5;
        text-align: left;
      `},mainPanel:{panel:o=>f`
        padding: ${o?b.size[4]:0};
        background: ${t(e.gray[50],e.darkGray[700])};
        overflow-y: auto;
        height: 100%;
      `}}};function H(){const{theme:r}=nt(),[e,l]=E(be(r()));return M(()=>{l(be(r()))}),e}var at=y("<div><label><input type=checkbox><div>"),ye=y("<span>");function te(r){const e=H(),[l,i]=E(r.checked||!1),d=s=>{const a=s.target.checked;i(a),r.onChange?.(a)};return(()=>{var s=at(),a=s.firstChild,t=a.firstChild,n=t.nextSibling;return t.$$input=d,h(n,(()=>{var o=D(()=>!!r.label);return()=>o()&&(()=>{var c=ye();return h(c,()=>r.label),k(()=>v(c,e().checkboxLabel)),c})()})(),null),h(n,(()=>{var o=D(()=>!!r.description);return()=>o()&&(()=>{var c=ye();return h(c,()=>r.description),k(()=>v(c,e().checkboxDescription)),c})()})(),null),k(o=>{var c=e().checkboxContainer,p=e().checkboxWrapper,u=e().checkbox,x=e().checkboxLabelContainer;return c!==o.e&&v(s,o.e=c),p!==o.t&&v(a,o.t=p),u!==o.a&&v(t,o.a=u),x!==o.o&&v(n,o.o=x),o},{e:void 0,t:void 0,a:void 0,o:void 0}),k(()=>t.checked=l()),s})()}O(["input"]);var lt=y("<div><div><input>"),st=y("<label>"),ct=y("<p>");function re(r){const e=H(),[l,i]=E(r.value||""),d=s=>{const a=s.target.value;i(t=>t!==a?a:t),r.onChange?.(a)};return(()=>{var s=lt(),a=s.firstChild,t=a.firstChild;return h(a,(()=>{var n=D(()=>!!r.label);return()=>n()&&(()=>{var o=st();return h(o,()=>r.label),k(()=>v(o,e().inputLabel)),o})()})(),t),h(a,(()=>{var n=D(()=>!!r.description);return()=>n()&&(()=>{var o=ct();return h(o,()=>r.description),k(()=>v(o,e().inputDescription)),o})()})(),t),t.$$input=d,k(n=>{var o=e().inputContainer,c=e().inputWrapper,p=r.type||"text",u=e().input,x=r.placeholder;return o!==n.e&&v(s,n.e=o),c!==n.t&&v(a,n.t=c),p!==n.a&&Q(t,"type",n.a=p),u!==n.o&&v(t,n.o=u),x!==n.i&&Q(t,"placeholder",n.i=x),n},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0}),k(()=>t.value=l()),s})()}O(["input"]);var dt=y("<div><div><select>"),ut=y("<label>"),gt=y("<p>"),pt=y("<option>");function oe(r){const e=H(),[l,i]=E(r.value||r.options[0]?.value),d=s=>{const a=s.target.value;i(t=>t!==a?a:t),r.onChange?.(a)};return(()=>{var s=dt(),a=s.firstChild,t=a.firstChild;return h(a,(()=>{var n=D(()=>!!r.label);return()=>n()&&(()=>{var o=ut();return h(o,()=>r.label),k(()=>v(o,e().selectLabel)),o})()})(),t),h(a,(()=>{var n=D(()=>!!r.description);return()=>n()&&(()=>{var o=gt();return h(o,()=>r.description),k(()=>v(o,e().selectDescription)),o})()})(),t),t.$$input=d,h(t,()=>r.options.map(n=>(()=>{var o=pt();return h(o,()=>n.label),k(()=>o.value=n.value),o})())),k(n=>{var o=e().selectContainer,c=e().selectWrapper,p=e().select;return o!==n.e&&v(s,n.e=o),c!==n.t&&v(a,n.t=c),p!==n.a&&v(t,n.a=p),n},{e:void 0,t:void 0,a:void 0}),k(()=>t.value=l()),s})()}O(["input"]);var ht=y('<svg xmlns=http://www.w3.org/2000/svg width=24 height=24 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round><path d="M8 6h10"></path><path d="M6 12h9"></path><path d="M11 18h7">'),ft=y('<svg xmlns=http://www.w3.org/2000/svg width=24 height=24 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round class="lucide lucide-file-search2-icon lucide-file-search-2"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path><circle cx=11.5 cy=14.5 r=2.5></circle><path d="M13.3 16.3 15 18">'),vt=y('<svg xmlns=http://www.w3.org/2000/svg width=24 height=24 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round><path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"></path><path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path><path d="M12 2v2"></path><path d="M12 22v-2"></path><path d="m17 20.66-1-1.73"></path><path d="M11 10.27 7 3.34"></path><path d="m20.66 17-1.73-1"></path><path d="m3.34 7 1.73 1"></path><path d="M14 12h8"></path><path d="M2 12h2"></path><path d="m20.66 7-1.73 1"></path><path d="m3.34 17 1.73-1"></path><path d="m17 3.34-1 1.73"></path><path d="m11 13.73-4 6.93">'),Fe=y('<svg xmlns=http://www.w3.org/2000/svg width=20 height=20 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round><path d="m10 9-3 3 3 3"></path><path d="m14 15 3-3-3-3"></path><path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719">'),mt=y('<svg xmlns=http://www.w3.org/2000/svg width=20 height=20 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round><path d="M10 8h.01"></path><path d="M12 12h.01"></path><path d="M14 8h.01"></path><path d="M16 12h.01"></path><path d="M18 8h.01"></path><path d="M6 8h.01"></path><path d="M7 16h10"></path><path d="M8 12h.01"></path><rect width=20 height=16 x=2 y=4 rx=2>'),bt=y('<svg xmlns=http://www.w3.org/2000/svg width=20 height=20 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx=12 cy=10 r=3>'),yt=y('<svg xmlns=http://www.w3.org/2000/svg width=20 height=20 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round><path d="M9 17H7A5 5 0 0 1 7 7h2"></path><path d="M15 7h2a5 5 0 1 1 0 10h-2"></path><line x1=8 x2=16 y1=12 y2=12>'),wt=y('<svg xmlns=http://www.w3.org/2000/svg width=24 height=24 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round><path d="M18 6 6 18"></path><path d="m6 6 12 12">'),xt=y('<svg xmlns=http://www.w3.org/2000/svg width=24 height=24 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round><path d="M2 10h6V4"></path><path d="m2 4 6 6"></path><path d="M21 10V7a2 2 0 0 0-2-2h-7"></path><path d="M3 14v2a2 2 0 0 0 2 2h3"></path><rect x=12 y=14 width=10 height=7 rx=1>');function kt(){return ht()}function Ct(){return ft()}function At(){return vt()}function Et(){return Fe()}function Bt(){return mt()}function St(){return bt()}function zt(){return Fe()}function Mt(){return yt()}function Ft(){return wt()}function Dt(){return xt()}var Pt=y("<button>");function Z(r){const e=H(),[l,i]=Te(r,["variant","outline","ghost","children","className"]),d=l.variant||"primary",s=B(e().button.base,e().button.variant(d,l.outline,l.ghost),l.className);return(()=>{var a=Pt();return K(a,G(i,{class:s}),!1),h(a,()=>l.children),a})()}var Ht=y("<div>");const De=({className:r,children:e,class:l,withPadding:i})=>{const d=H();return(()=>{var s=Ht();return h(s,e),k(()=>v(s,B(d().mainPanel.panel(!!i),r,l))),s})()};var It=y("<section>"),Qt=y("<h3>"),$t=y("<p>"),Ot=y("<span>");const Y=({children:r,...e})=>{const l=H();return(()=>{var i=It();return K(i,G({get class(){return B(l().section.main,e.class)}},e),!1),h(i,r),i})()},N=({children:r,...e})=>{const l=H();return(()=>{var i=Qt();return K(i,G({get class(){return B(l().section.title,e.class)}},e),!1),h(i,r),i})()},j=({children:r,...e})=>{const l=H();return(()=>{var i=$t();return K(i,G({get class(){return B(l().section.description,e.class)}},e),!1),h(i,r),i})()},R=({children:r,...e})=>{const l=H();return(()=>{var i=Ot();return K(i,G({get class(){return B(l().section.icon,e.class)}},e),!1),h(i,r),i})()};var Ut=r=>{const[e,l]=E(!1),[i,d]=E(!1),s=F(()=>e()||i());let a=null;return q(()=>{a&&clearTimeout(a)}),{expanded:s,setForceExpand:d,hoverUtils:{enter:()=>{a&&(clearTimeout(a),a=null),l(!0)},leave:()=>{a=setTimeout(()=>{l(!1)},r.animationMs)}},animationMs:r.animationMs}},Pe=Be(void 0),Tt=r=>{const e=Ut({animationMs:r.animationMs});return g(Pe.Provider,{value:e,get children(){return r.children}})};function de(){const r=ae(Pe);if(r===void 0)throw new Error("useDrawContext must be used within a DrawClientProvider");return r}var ue=()=>{const r=ae(Ne);if(r===void 0)throw new Error("useDevtoolsShellContext must be used within a ShellContextProvider");return r};function ge(){const{settings:r,setSettings:e}=U();return{theme:F(()=>r().theme),setTheme:i=>e({theme:i})}}var Lt=()=>{const{store:r,setStore:e}=ue(),{setForceExpand:l}=de(),i=F(()=>r.plugins),d=F(()=>r.state.activePlugins);return M(()=>{d().length===0?l(!0):l(!1)}),{plugins:i,toggleActivePlugins:a=>{e(t=>{const o=t.state.activePlugins.includes(a)?t.state.activePlugins.filter(c=>c!==a):[...t.state.activePlugins,a];return o.length>3?t:{...t,state:{...t.state,activePlugins:o}}})},activePlugins:d}},ee=()=>{const{store:r,setStore:e}=ue();return{state:F(()=>r.state),setState:d=>{e(s=>({...s,state:{...s.state,...d}}))}}},U=()=>{const{store:r,setStore:e}=ue(),l=F(()=>r.settings);return{setSettings:d=>{e(s=>({...s,settings:{...s.settings,...d}}))},settings:l}},Yt=()=>{const{state:r,setState:e}=ee();return{persistOpen:F(()=>r().persistOpen),setPersistOpen:d=>{e({persistOpen:d})}}},He=()=>{const{state:r,setState:e}=ee();return{height:F(()=>r().height),setHeight:d=>{e({height:d})}}},Ie=(r,e=!0)=>{e?r.setAttribute("tabIndex","-1"):r.removeAttribute("tabIndex");for(const l of r.children)Ie(l,e)},Nt=r=>{M(()=>{const e=document.getElementById(se);e&&Ie(e,!r())})},jt={colors:{black:"#000000",white:"#ffffff",darkGray:{700:"#191c24",800:"#111318",900:"#0b0d10"},gray:{100:"#f2f4f7",200:"#eaecf0",300:"#d0d5dd",500:"#667085",700:"#344054",800:"#1d2939",900:"#101828"},green:{500:"#12B76A",700:"#027A48"},red:{100:"#fee2e2",400:"#f87171",500:"#ef4444",700:"#b91c1c"},purple:{200:"#D9D6FE",400:"#9B8AFB",500:"#7A5AF8",600:"#6938EF",700:"#5925DC"}},font:{size:{xs:"calc(var(--tsrd-font-size) * 0.75)",sm:"calc(var(--tsrd-font-size) * 0.875)"},fontFamily:{sans:"ui-sans-serif, Inter, system-ui, sans-serif, sans-serif"}},border:{radius:{full:"9999px"}},size:{2:"calc(var(--tsrd-font-size) * 0.5)",10:"calc(var(--tsrd-font-size) * 2.5)",48:"calc(var(--tsrd-font-size) * 12)"}},we=r=>`${(r/1e3).toFixed(2)}s`,xe=r=>{const{colors:e,font:l,size:i,border:d}=jt,{fontFamily:s,size:a}=l,t=_,n=(o,c)=>r==="light"?o:c;return{seoTabContainer:t`
      padding: 0;
      margin: 0 auto;
      background: ${n(e.white,e.darkGray[700])};
      border-radius: 12px;
      box-shadow: 0 2px 16px ${n("rgba(0, 0, 0, 0.04)","rgba(0, 0, 0, 0.08)")};
      overflow-y: auto;
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: 0;
      width: 100%;
      overflow-y: auto;
    `,seoTabTitle:t`
      font-size: 1.25rem;
      font-weight: 600;
      color: ${n(e.purple[500],e.purple[400])};
      margin: 0;
      padding: 1rem 1.5rem 0.5rem 1.5rem;
      text-align: left;
      border-bottom: 1px solid ${n(e.gray[300],e.gray[700])};
    `,seoTabSection:t`
      padding: 1.5rem;
      background: ${n(e.gray[100],e.gray[800])};
      border: 1px solid ${n(e.gray[300],e.gray[700])};
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-bottom: 2rem;
      border-radius: 0.75rem;
    `,seoPreviewSection:t`
      display: flex;
      flex-direction: row;
      gap: 16px;
      margin-bottom: 0;
      justify-content: flex-start;
      align-items: flex-start;
      overflow-x: auto;
      flex-wrap: wrap;
      padding-bottom: 0.5rem;
    `,seoPreviewCard:t`
      border: 1px solid ${n(e.gray[300],e.gray[700])};
      border-radius: 8px;
      padding: 12px 10px;
      background: ${n(e.white,e.darkGray[900])};
      margin-bottom: 0;
      box-shadow: 0 1px 4px ${n("rgba(0,0,0,0.02)","rgba(0,0,0,0.04)")};
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      min-width: 200px;
      max-width: 240px;
      font-size: 0.95rem;
      gap: 4px;
    `,seoPreviewHeader:t`
      font-size: 1rem;
      font-weight: 500;
      margin-bottom: 6px;
      color: ${n(e.purple[500],e.purple[400])};
    `,seoPreviewImage:t`
      max-width: 100%;
      border-radius: 6px;
      margin-bottom: 6px;
      box-shadow: 0 1px 2px ${n("rgba(0,0,0,0.03)","rgba(0,0,0,0.06)")};
      height: 160px;
    `,seoPreviewTitle:t`
      font-size: 1rem;
      font-weight: 600;
      margin-bottom: 2px;
      color: ${n(e.gray[900],e.gray[100])};
    `,seoPreviewDesc:t`
      color: ${n(e.gray[700],e.gray[300])};
      margin-bottom: 2px;
      font-size: 0.95rem;
    `,seoPreviewUrl:t`
      color: ${n(e.gray[500],e.gray[500])};
      font-size: 0.9rem;
      margin-bottom: 2px;
      word-break: break-all;
    `,seoMissingTagsSection:t`
      margin-top: 4px;
      font-size: 0.95rem;
      color: ${n(e.red[400],e.red[400])};
    `,seoMissingTagsList:t`
      margin: 4px 0 0 0;
      padding: 0;
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      max-width: 240px;
    `,seoMissingTag:t`
      background: ${n(e.red[100],e.red[500]+"22")};
      color: ${n(e.red[700],e.red[500])};
      border-radius: 4px;
      padding: 1px 6px;
      font-size: 0.9rem;
      font-weight: 500;
    `,seoAllTagsFound:t`
      color: ${n(e.green[700],e.green[500])};
      font-weight: 500;
      margin-left: 6px;
      font-size: 0.95rem;
    `,devtoolsPanelContainer:(o,c)=>t`
      direction: ltr;
      position: fixed;
      overflow-y: hidden;
      overflow-x: hidden;
      ${o}: 0;
      right: 0;
      z-index: 99999;
      width: 100%;
      ${c?"":"max-height: 90%;"}
      border-top: 1px solid ${n(e.gray[300],e.gray[700])};
      transform-origin: top;
    `,devtoolsPanelContainerVisibility:o=>t`
        visibility: ${o?"visible":"hidden"};
        height: ${o?"auto":"0"};
      `,devtoolsPanelContainerResizing:o=>o()?t`
          transition: none;
        `:t`
        transition: all 0.4s ease;
      `,devtoolsPanelContainerAnimation:(o,c,p)=>o?t`
          pointer-events: auto;
          transform: translateY(0);
        `:t`
        pointer-events: none;
        transform: translateY(${p==="top"?-c:c}px);
      `,devtoolsPanel:t`
      display: flex;
      font-size: ${a.sm};
      font-family: ${s.sans};
      background-color: ${n(e.white,e.darkGray[700])};
      color: ${n(e.gray[900],e.gray[300])};
      width: w-screen;
      flex-direction: row;
      overflow-x: hidden;
      overflow-y: hidden;
      height: 100%;
    `,dragHandle:o=>t`
      position: absolute;
      left: 0;
      ${o==="bottom"?"top":"bottom"}: 0;
      width: 100%;
      height: 4px;
      cursor: row-resize;
      user-select: none;
      z-index: 100000;
      &:hover {
        background-color: ${n(e.purple[700],e.purple[400])};
      }
    `,mainCloseBtn:t`
      background: transparent;
      position: fixed;
      z-index: 99999;
      display: inline-flex;
      width: fit-content;
      cursor: pointer;
      appearance: none;
      border: 0;
      align-items: center;
      padding: 0;
      font-size: ${l.size.xs};
      cursor: pointer;
      transition: all 0.25s ease-out;
      & > img {
        width: 56px;
        height: 56px;
        transition: all 0.3s ease;
        outline-offset: 2px;
        border-radius: ${d.radius.full};
        outline: 2px solid transparent;
      }
      &:hide-until-hover {
        opacity: 0;
        pointer-events: none;
        visibility: hidden;
      }
      &:hide-until-hover:hover {
        opacity: 1;
        pointer-events: auto;
        visibility: visible;
      }
      & > img:focus-visible,
      img:hover {
        outline: 2px solid ${n(e.black,e.black)};
      }
    `,mainCloseBtnPosition:o=>t`
        ${o==="top-left"?`top: ${i[2]}; left: ${i[2]};`:""}
        ${o==="top-right"?`top: ${i[2]}; right: ${i[2]};`:""}
        ${o==="middle-left"?`top: 50%; left: ${i[2]}; transform: translateY(-50%);`:""}
        ${o==="middle-right"?`top: 50%; right: ${i[2]}; transform: translateY(-50%);`:""}
        ${o==="bottom-left"?`bottom: ${i[2]}; left: ${i[2]};`:""}
        ${o==="bottom-right"?`bottom: ${i[2]}; right: ${i[2]};`:""}
      `,mainCloseBtnAnimation:(o,c)=>o?t`
        opacity: 0;
        pointer-events: none;
        visibility: hidden;
      `:c?t`
              opacity: 0;

              &:hover {
                opacity: 1;
                pointer-events: auto;
                visibility: visible;
              }
            `:t`
              opacity: 1;
              pointer-events: auto;
              visibility: visible;
            `,tabContainer:t`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      height: 100%;
      background-color: ${n(e.gray[100],e.darkGray[800])};
      border-right: 1px solid ${n(e.gray[300],e.gray[700])};
      box-shadow: 0 1px 0 ${n(e.gray[200],e.gray[700])};
      position: relative;
      width: ${i[10]};
    `,tab:t`
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: ${i[10]};
      cursor: pointer;
      font-size: ${a.sm};
      font-family: ${s.sans};
      color: ${n(e.gray[700],e.gray[300])};
      background-color: transparent;
      border: none;
      transition: all 0.2s ease-in-out;
      border-left: 2px solid transparent;
      &:hover:not(.close):not(.active):not(.detach) {
        background-color: ${n(e.gray[200],e.gray[700])};
        color: ${n(e.gray[900],e.gray[100])};
        border-left: 2px solid ${n(e.purple[700],e.purple[500])};
      }
      &.active {
        background-color: ${n(e.purple[200],e.purple[500])};
        color: ${n(e.gray[900],e.gray[100])};
        border-left: 2px solid ${n(e.purple[700],e.purple[500])};
      }
      &.detach {
        &:hover {
          background-color: ${n(e.gray[200],e.gray[700])};
        }
        &:hover {
          color: ${n(e.green[700],e.green[500])};
        }
      }
      &.close {
        margin-top: auto;
        &:hover {
          background-color: ${n(e.gray[200],e.gray[700])};
        }
        &:hover {
          color: ${n(e.red[700],e.red[500])};
        }
      }
      &.disabled {
        cursor: not-allowed;
        opacity: 0.2;
        pointer-events: none;
      }
      &.disabled:hover {
        background-color: transparent;
        color: ${e.gray[300]};
      }
    `,tabContent:t`
      transition: all 0.2s ease-in-out;
      width: 100%;
      height: 100%;
    `,pluginsTabPanel:t`
      display: flex;
      flex-direction: row;
      width: 100%;
      height: 100%;
      overflow: hidden;
    `,pluginsTabDraw:o=>t`
      width: ${o?i[48]:0};
      height: 100%;
      background-color: ${n(e.white,e.darkGray[800])};
      box-shadow: 0 1px 0 ${e.gray[700]};
      ${o?`border-right: 1px solid ${n(e.gray[300],e.gray[700])};`:""}
    `,pluginsTabDrawExpanded:t`
      width: ${i[48]};
      border-right: 1px solid ${n(e.gray[300],e.gray[700])};
    `,pluginsTabDrawTransition:o=>t`
        transition: width ${we(o)} ease;
      `,pluginsTabSidebar:o=>t`
      width: ${i[48]};
      overflow-y: auto;
      transform: ${o?"translateX(0)":"translateX(-100%)"};
    `,pluginsTabSidebarTransition:o=>t`
        transition: transform ${we(o)} ease;
      `,pluginName:t`
      font-size: ${a.xs};
      font-family: ${s.sans};
      color: ${n(e.gray[700],e.gray[300])};
      padding: ${i[2]};
      cursor: pointer;
      text-align: center;
      transition: all 0.2s ease-in-out;
      &:hover {
        background-color: ${n(e.gray[200],e.gray[700])};
        color: ${n(e.gray[900],e.gray[100])};
        padding: ${i[2]};
      }
      &.active {
        background-color: ${n(e.purple[200],e.purple[500])};
        color: ${n(e.gray[900],e.gray[100])};
      }
    `,pluginsTabContent:t`
      width: 100%;
      height: 100%;
      overflow-y: auto;
    `,settingsGroup:t`
      display: flex;
      flex-direction: column;
      gap: 1rem;
    `,conditionalSetting:t`
      margin-left: 1.5rem;
      padding-left: 1rem;
      border-left: 2px solid ${n(e.purple[600],e.purple[400])};
      background-color: ${n(e.gray[100],e.darkGray[800])};
      padding: 1rem;
      border-radius: 0.5rem;
      margin-top: 0.5rem;
    `,settingRow:t`
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }
    `,settingsModifiers:t`
      display: flex;
      gap: 0.5rem;
    `}};function I(){const{theme:r}=ge(),[e,l]=E(xe(r()));return M(()=>{l(xe(r()))}),e}var ke="data:image/png;base64,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",Rt=y('<button type=button aria-label="Open TanStack Devtools"><img alt="TanStack Devtools">'),Wt=({isOpen:r,setIsOpen:e,image:l=ke})=>{const{settings:i}=U(),d=I(),s=F(()=>B(d().mainCloseBtn,d().mainCloseBtnPosition(i().position),d().mainCloseBtnAnimation(r(),i().hideUntilHover)));return(()=>{var a=Rt(),t=a.firstChild;return a.$$click=()=>e(!r()),Q(t,"src",l||ke),k(()=>v(a,s())),a})()};O(["click"]);var qt=y("<div>"),Kt=r=>{const e=I(),{height:l}=He(),{settings:i}=U(),d=le();return(()=>{var s=qt();return Q(s,"id",se),h(s,g(Tt,{animationMs:400,get children(){return r.children}})),k(a=>{var t=d().pipWindow?"100vh":l()+"px",n=B(e().devtoolsPanelContainer(i().panelLocation,!!d().pipWindow),e().devtoolsPanelContainerAnimation(r.isOpen(),l(),i().panelLocation),e().devtoolsPanelContainerVisibility(r.isOpen()),e().devtoolsPanelContainerResizing(r.isResizing));return t!==a.e&&((a.e=t)!=null?s.style.setProperty("height",t):s.style.removeProperty("height")),n!==a.t&&v(s,a.t=n),a},{e:void 0,t:void 0}),s})()},Ce=y("<div>"),Gt=r=>{const e=I(),{settings:l}=U();return(()=>{var i=Ce(),d=r.ref;return typeof d=="function"?X(d,i):r.ref=i,h(i,(()=>{var s=D(()=>!!r.handleDragStart);return()=>s()?(()=>{var a=Ce();return Ye(a,"mousedown",r.handleDragStart,!0),k(()=>v(a,e().dragHandle(l().panelLocation))),a})():null})(),null),h(i,()=>r.children,null),k(()=>v(i,e().devtoolsPanel)),i})()};O(["mousedown"]);var ne=y("<div>"),Vt=y("<div><div></div>Final shortcut is: "),Zt=y("<div><div>"),Jt=()=>{const{setSettings:r,settings:e}=U(),l=I(),i=F(()=>e().openHotkey),d=["Control","Alt","Meta","Shift"],s=a=>()=>{if(i().includes(a))return r({openHotkey:i().filter(o=>o!==a)});const t=i().filter(o=>d.includes(o)),n=i().filter(o=>!d.includes(o));r({openHotkey:[...t,a,...n]})};return g(De,{withPadding:!0,get children(){return[g(Y,{get children(){return[g(N,{get children(){return[g(R,{get children(){return g(Et,{})}}),"General"]}}),g(j,{children:"Configure general behavior of the devtools panel."}),(()=>{var a=ne();return h(a,g(te,{label:"Default open",description:"Automatically open the devtools panel when the page loads",onChange:()=>r({defaultOpen:!e().defaultOpen}),get checked(){return e().defaultOpen}}),null),h(a,g(te,{label:"Hide trigger until hovered",description:"Keep the devtools trigger button hidden until you hover over its area",onChange:()=>r({hideUntilHover:!e().hideUntilHover}),get checked(){return e().hideUntilHover}}),null),h(a,g(re,{label:"Trigger Image",description:"Specify the URL of the image to use for the trigger",get value(){return e().triggerImage},placeholder:"Default TanStack Logo",onChange:t=>r({triggerImage:t})}),null),h(a,g(oe,{label:"Theme",description:"Choose the theme for the devtools panel",get value(){return e().theme},options:[{label:"Dark",value:"dark"},{label:"Light",value:"light"}],onChange:t=>r({theme:t})}),null),k(()=>v(a,l().settingsGroup)),a})()]}}),g(Y,{get children(){return[g(N,{get children(){return[g(R,{get children(){return g(Mt,{})}}),"URL Configuration"]}}),g(j,{children:"Control when devtools are available based on URL parameters."}),(()=>{var a=ne();return h(a,g(te,{label:"Require URL Flag",description:"Only show devtools when a specific URL parameter is present",get checked(){return e().requireUrlFlag},onChange:t=>r({requireUrlFlag:t})}),null),h(a,g(ie,{get when(){return e().requireUrlFlag},get children(){var t=ne();return h(t,g(re,{label:"URL flag",description:"Enter the URL parameter name (e.g., 'debug' for ?debug=true)",placeholder:"debug",get value(){return e().urlFlag},onChange:n=>r({urlFlag:n})})),k(()=>v(t,l().conditionalSetting)),t}}),null),k(()=>v(a,l().settingsGroup)),a})()]}}),g(Y,{get children(){return[g(N,{get children(){return[g(R,{get children(){return g(Bt,{})}}),"Keyboard"]}}),g(j,{children:"Customize keyboard shortcuts for quick access."}),(()=>{var a=Vt(),t=a.firstChild,n=t.nextSibling;return h(t,g(ie,{keyed:!0,get when(){return i()},get children(){return[g(Z,{variant:"success",get onclick(){return s("Shift")},get outline(){return!i().includes("Shift")},children:"Shift"}),g(Z,{variant:"success",get onclick(){return s("Alt")},get outline(){return!i().includes("Alt")},children:"Alt"}),g(Z,{variant:"success",get onclick(){return s("Meta")},get outline(){return!i().includes("Meta")},children:"Meta"}),g(Z,{variant:"success",get onclick(){return s("Control")},get outline(){return!i().includes("Control")},children:"Control"})]}})),h(a,g(re,{label:"Hotkey to open/close devtools",description:"Use '+' to combine keys (e.g., 'a+b' or 'd'). This will be used with the enabled modifiers from above",placeholder:"a",get value(){return i().filter(o=>!["Shift","Meta","Alt","Ctrl"].includes(o)).join("+")},onChange:o=>{const c=u=>{if(u.length===1)return[he(u)];const x=[];for(const C of u){const m=he(C);x.includes(m)||x.push(m)}return x},p=o.split("+").flatMap(u=>c(u)).filter(Boolean);return r({openHotkey:[...i().filter(u=>["Shift","Meta","Alt","Ctrl"].includes(u)),...p]})}}),n),h(a,()=>i().join(" + "),null),k(o=>{var c=l().settingsGroup,p=l().settingsModifiers;return c!==o.e&&v(a,o.e=c),p!==o.t&&v(t,o.t=p),o},{e:void 0,t:void 0}),a})()]}}),g(Y,{get children(){return[g(N,{get children(){return[g(R,{get children(){return g(St,{})}}),"Position"]}}),g(j,{children:"Adjust the position of the trigger button and devtools panel."}),(()=>{var a=Zt(),t=a.firstChild;return h(t,g(oe,{label:"Trigger Position",options:[{label:"Bottom Right",value:"bottom-right"},{label:"Bottom Left",value:"bottom-left"},{label:"Top Right",value:"top-right"},{label:"Top Left",value:"top-left"},{label:"Middle Right",value:"middle-right"},{label:"Middle Left",value:"middle-left"}],get value(){return e().position},onChange:n=>r({position:n})}),null),h(t,g(oe,{label:"Panel Position",get value(){return e().panelLocation},options:[{label:"Top",value:"top"},{label:"Bottom",value:"bottom"}],onChange:n=>r({panelLocation:n})}),null),k(n=>{var o=l().settingsGroup,c=l().settingRow;return o!==n.e&&v(a,n.e=o),c!==n.t&&v(t,n.t=c),n},{e:void 0,t:void 0}),a})()]}})]}})},Xt=y("<div><div><div>"),_t=y("<div><h3>"),er=y("<div>"),tr=()=>{const{plugins:r,activePlugins:e,toggleActivePlugins:l}=Lt(),{expanded:i,hoverUtils:d,animationMs:s}=de(),[a,t]=E(new Map),n=I(),{theme:o}=ge();return M(()=>{r()?.filter(p=>e().includes(p.id))?.forEach(p=>{const u=a().get(p.id);u&&p.render(u,o())})}),(()=>{var c=Xt(),p=c.firstChild,u=p.firstChild;return p.addEventListener("mouseleave",()=>d.leave()),p.addEventListener("mouseenter",()=>d.enter()),h(u,g(W,{get each(){return r()},children:x=>{let C;M(()=>{C&&(typeof x.name=="string"?C.textContent=x.name:x.name(C,o()))});const m=F(()=>e().includes(x.id));return(()=>{var w=_t(),A=w.firstChild;w.$$click=()=>{l(x.id)};var S=C;return typeof S=="function"?X(S,A):C=A,k(z=>{var V=B(n().pluginName,{active:m()}),T=`${je}-${x.id}`;return V!==z.e&&v(w,z.e=V),T!==z.t&&Q(A,"id",z.t=T),z},{e:void 0,t:void 0}),w})()}})),h(c,g(W,{get each(){return e()},children:x=>(()=>{var C=er();return X(m=>{t(w=>{const A=new Map(w);return A.set(x,m),A})},C),Q(C,"id",`${Re}-${x}`),k(()=>v(C,n().pluginsTabContent)),C})()}),null),k(x=>{var C=n().pluginsTabPanel,m=B(n().pluginsTabDraw(i()),{[n().pluginsTabDraw(i())]:i()},n().pluginsTabDrawTransition(s)),w=B(n().pluginsTabSidebar(i()),n().pluginsTabSidebarTransition(s));return C!==x.e&&v(c,x.e=C),m!==x.t&&v(p,x.t=m),w!==x.a&&v(u,x.a=w),x},{e:void 0,t:void 0,a:void 0}),c})()};O(["click"]);function rr(r,e={}){const{attributes:l=!0,childList:i=!0,subtree:d=!0,observeTitle:s=!0}=e;We(()=>{const a=new MutationObserver(n=>{for(const o of n)if(o.type==="childList")o.addedNodes.forEach(c=>r({kind:"added",node:c},o)),o.removedNodes.forEach(c=>r({kind:"removed",node:c},o));else if(o.type==="attributes"){const c=o.target;r({kind:"attr",target:c,name:o.attributeName,oldValue:o.oldValue??null},o)}else o.target.parentNode&&o.target.parentNode.tagName.toLowerCase()==="title"&&r({kind:"title",title:document.title},o)});a.observe(document.head,{childList:i,attributes:l,subtree:d,attributeOldValue:l,characterData:!0,characterDataOldValue:!1});let t;if(s){const n=document.head.querySelector("title")||document.head.appendChild(document.createElement("title"));t=new MutationObserver(()=>{r({kind:"title",title:document.title})}),t.observe(n,{childList:!0,characterData:!0,subtree:!0})}q(()=>{a.disconnect(),t?.disconnect()})})}var or=y("<div><div> Preview</div><div></div><div></div><div>"),nr=y("<img alt=Preview>"),ir=y("<div>No Image"),Ae=y("<div>"),ar=y("<div><strong>Missing tags for <!>:</strong><ul>"),lr=y("<li>"),Ee=[{network:"Facebook",tags:[{key:"og:title",prop:"title"},{key:"og:description",prop:"description"},{key:"og:image",prop:"image"},{key:"og:url",prop:"url"}],color:"#4267B2"},{network:"X/Twitter",tags:[{key:"twitter:title",prop:"title"},{key:"twitter:description",prop:"description"},{key:"twitter:image",prop:"image"},{key:"twitter:url",prop:"url"}],color:"#1DA1F2"},{network:"LinkedIn",tags:[{key:"og:title",prop:"title"},{key:"og:description",prop:"description"},{key:"og:image",prop:"image"},{key:"og:url",prop:"url"}],color:"#0077B5"},{network:"Discord",tags:[{key:"og:title",prop:"title"},{key:"og:description",prop:"description"},{key:"og:image",prop:"image"},{key:"og:url",prop:"url"}],color:"#5865F2"},{network:"Slack",tags:[{key:"og:title",prop:"title"},{key:"og:description",prop:"description"},{key:"og:image",prop:"image"},{key:"og:url",prop:"url"}],color:"#4A154B"},{network:"Mastodon",tags:[{key:"og:title",prop:"title"},{key:"og:description",prop:"description"},{key:"og:image",prop:"image"},{key:"og:url",prop:"url"}],color:"#6364FF"},{network:"Bluesky",tags:[{key:"og:title",prop:"title"},{key:"og:description",prop:"description"},{key:"og:image",prop:"image"},{key:"og:url",prop:"url"}],color:"#1185FE"}];function sr(r){const e=I();return(()=>{var l=or(),i=l.firstChild,d=i.firstChild,s=i.nextSibling,a=s.nextSibling,t=a.nextSibling;return h(i,()=>r.network,d),h(l,(()=>{var n=D(()=>!!r.meta.image);return()=>n()?(()=>{var o=nr();return k(c=>{var p=r.meta.image,u=e().seoPreviewImage;return p!==c.e&&Q(o,"src",c.e=p),u!==c.t&&v(o,c.t=u),c},{e:void 0,t:void 0}),o})():(()=>{var o=ir();return o.style.setProperty("background","#222"),o.style.setProperty("color","#888"),o.style.setProperty("display","flex"),o.style.setProperty("align-items","center"),o.style.setProperty("justify-content","center"),o.style.setProperty("min-height","80px"),o.style.setProperty("width","100%"),k(()=>v(o,e().seoPreviewImage)),o})()})(),s),h(s,()=>r.meta.title||"No Title"),h(a,()=>r.meta.description||"No Description"),h(t,()=>r.meta.url||window.location.href),k(n=>{var o=e().seoPreviewCard,c=r.color,p=e().seoPreviewHeader,u=r.color,x=e().seoPreviewTitle,C=e().seoPreviewDesc,m=e().seoPreviewUrl;return o!==n.e&&v(l,n.e=o),c!==n.t&&((n.t=c)!=null?l.style.setProperty("border-color",c):l.style.removeProperty("border-color")),p!==n.a&&v(i,n.a=p),u!==n.o&&((n.o=u)!=null?i.style.setProperty("color",u):i.style.removeProperty("color")),x!==n.i&&v(s,n.i=x),C!==n.n&&v(a,n.n=C),m!==n.s&&v(t,n.s=m),n},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0}),l})()}var cr=()=>{const[r,e]=E(i()),l=I();function i(){const d=Array.from(document.head.querySelectorAll("meta")),s=[];for(const a of Ee){const t={},n=[];for(const o of a.tags){const c=d.find(p=>(o.key.includes("twitter:")?!1:p.getAttribute("property")===o.key)||p.getAttribute("name")===o.key);c&&c.getAttribute("content")?t[o.prop]=c.getAttribute("content")||void 0:n.push(o.key)}s.push({network:a.network,found:t,missing:n})}return s}return rr(()=>{e(i())}),g(De,{withPadding:!0,get children(){return g(Y,{get children(){return[g(N,{get children(){return[g(R,{get children(){return g(zt,{})}}),"Social previews"]}}),g(j,{children:"See how your current page will look when shared on popular social networks. The tool checks for essential meta tags and highlights any that are missing."}),(()=>{var d=Ae();return h(d,g(W,{get each(){return r()},children:(s,a)=>{const t=Ee[a()];return(()=>{var n=Ae();return h(n,g(sr,{get meta(){return s.found},get color(){return t.color},get network(){return t.network}}),null),h(n,(()=>{var o=D(()=>s.missing.length>0);return()=>o()?(()=>{var c=ar(),p=c.firstChild,u=p.firstChild,x=u.nextSibling;x.nextSibling;var C=p.nextSibling;return h(p,()=>t?.network,x),h(C,g(W,{get each(){return s.missing},children:m=>(()=>{var w=lr();return h(w,m),k(()=>v(w,l().seoMissingTag)),w})()})),k(m=>{var w=l().seoMissingTagsSection,A=l().seoMissingTagsList;return w!==m.e&&v(c,m.e=w),A!==m.t&&v(C,m.t=A),m},{e:void 0,t:void 0}),c})():null})(),null),n})()}})),k(()=>v(d,l().seoPreviewSection)),d})()]}})}})},Qe=[{name:"Plugins",id:"plugins",component:()=>g(tr,{}),icon:()=>g(kt,{})},{name:"SEO",id:"seo",component:()=>g(cr,{}),icon:()=>g(Ct,{})},{name:"Settings",id:"settings",component:()=>g(Jt,{}),icon:()=>g(At,{})}],dr=y("<div>"),ur=y("<button type=button>"),gr=y("<div><button type=button></button><button type=button>"),pr=r=>{const e=I(),{state:l,setState:i}=ee(),d=le(),s=()=>{d().requestPipWindow(`width=${window.innerWidth},height=${l().height},top=${window.screen.height},left=${window.screenLeft}}`)},{hoverUtils:a}=de();return(()=>{var t=dr();return h(t,g(W,{each:Qe,children:n=>(()=>{var o=ur();return o.addEventListener("mouseleave",()=>{n.id==="plugins"&&a.leave()}),o.addEventListener("mouseenter",()=>{n.id==="plugins"&&a.enter()}),o.$$click=()=>i({activeTab:n.id}),h(o,()=>n.icon()),k(()=>v(o,B(e().tab,{active:l().activeTab===n.id}))),o})()}),null),h(t,(()=>{var n=D(()=>d().pipWindow!==null);return()=>n()?null:(()=>{var o=gr(),c=o.firstChild,p=c.nextSibling;return o.style.setProperty("margin-top","auto"),c.$$click=s,h(c,g(Dt,{})),p.$$click=()=>r.toggleOpen(),h(p,g(Ft,{})),k(u=>{var x=B(e().tab,"detach"),C=B(e().tab,"close");return x!==u.e&&v(c,u.e=x),C!==u.t&&v(p,u.t=C),u},{e:void 0,t:void 0}),o})()})(),null),k(()=>v(t,e().tabContainer)),t})()};O(["click"]);var hr=y("<div>"),fr=()=>{const{state:r}=ee(),e=I(),l=F(()=>Qe.find(i=>i.id===r().activeTab)?.component||null);return(()=>{var i=hr();return h(i,()=>l()?.()),k(()=>v(i,e().tabContent)),i})()},vr=y("<div>");function br(){const{settings:r}=U(),{setHeight:e}=He(),{persistOpen:l,setPersistOpen:i}=Yt(),[d,s]=E(),[a,t]=E(r().defaultOpen||l()),n=le();let o;const[c,p]=E(!1),u=()=>{if(n().pipWindow)return;const m=a();t(!m),i(!m)},x=(m,w)=>{if(w.button!==0||!m)return;p(!0);const A={originalHeight:m.getBoundingClientRect().height,pageY:w.pageY},S=V=>{const T=A.pageY-V.pageY,pe=r().panelLocation==="bottom"?A.originalHeight+T:A.originalHeight-T;e(pe),pe<70?t(!1):t(!0)},z=()=>{p(!1),document.removeEventListener("mousemove",S),document.removeEventListener("mouseUp",z)};document.addEventListener("mousemove",S),document.addEventListener("mouseup",z)};M(()=>{if(a()){const m=d()?.parentElement?.style.paddingBottom,w=()=>{o&&d()?.parentElement&&s(A=>(A?.parentElement,A))};if(w(),typeof window<"u")return(n().pipWindow??window).addEventListener("resize",w),()=>{(n().pipWindow??window).removeEventListener("resize",w),d()?.parentElement&&typeof m=="string"&&s(A=>A)}}else d()?.parentElement&&s(m=>(m?.parentElement&&m.parentElement.removeAttribute("style"),m))}),M(()=>{window.addEventListener("keydown",m=>{m.key==="Escape"&&a()&&u()})}),Nt(a),M(()=>{if(d()){const m=d(),w=getComputedStyle(m).fontSize;m?.style.setProperty("--tsrd-font-size",w)}}),M(()=>{const m=r().openHotkey.filter(S=>fe.includes(S)),w=r().openHotkey.filter(S=>!fe.includes(S)),A=qe(m);for(const S of A){const z=[...S,...w];rt(z,()=>{u()})}}),M(()=>{const m=w=>{const A=w.shiftKey,S=w.ctrlKey||w.metaKey;if(!(!A||!S)&&w.target instanceof HTMLElement){const z=w.target.getAttribute("data-tsd-source");window.getSelection()?.removeAllRanges(),z&&(w.preventDefault(),w.stopPropagation(),fetch(`${location.origin}/__tsd/open-source?source=${encodeURIComponent(z)}`).catch(()=>{}))}};window.addEventListener("click",m),q(()=>{window.removeEventListener("click",m)})});const{theme:C}=ge();return g(ot,{get theme(){return C()},get children(){return g(Le,{get mount(){return(n().pipWindow??window).document.body},get children(){var m=vr();return X(s,m),Q(m,"data-testid",se),h(m,g(ie,{get when(){return D(()=>n().pipWindow!==null)()?!0:D(()=>!!r().requireUrlFlag)()?window.location.search.includes(r().urlFlag):!0},get children(){return[g(Wt,{isOpen:a,setIsOpen:u,get image(){return r().triggerImage}}),g(Kt,{isResizing:c,isOpen:a,get children(){return g(Gt,{ref:w=>o=w,handleDragStart:w=>x(o,w),get children(){return[g(pr,{toggleOpen:u}),g(fr,{})]}})}})]}})),m}})}})}export{br as default};
