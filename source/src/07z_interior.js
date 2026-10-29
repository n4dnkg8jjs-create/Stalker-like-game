/* ---------- interior kit for the izba: flowed blood decals, printed papers, Soviet fridge, Russian stove,
   wardrobe, oilcloth table, rag runner, washstand, wall clock ---------- */
/* deterministic local RNG so props look the same every load */
function rng(seed){let s=(seed*9301+49297)%233280||1;return()=>{s=(s*16807)%2147483647;return(s-1)/2147483646;};}

/* ---- blood: a density field built from a pool and gravity-driven rivulets that follow the floorboard seams,
   thresholded into a sharp-but-soft edge with a darker coagulated rim and a wet, glossy centre ---- */
const BLOODCACHE={};
function bloodTex(kind,seed){const key=kind+seed;if(BLOODCACHE[key])return BLOODCACHE[key];
  const N=384,F=new Float32Array(N*N),r=rng(seed),Q=N/256;
  const splat=(cx,cy,rad,amt)=>{cx*=Q;cy*=Q;rad*=Q;const r2=rad*rad,x0=Math.max(0,Math.floor(cx-rad*2)),x1=Math.min(N-1,Math.ceil(cx+rad*2)),y0=Math.max(0,Math.floor(cy-rad*2)),y1=Math.min(N-1,Math.ceil(cy+rad*2));
    for(let y=y0;y<=y1;y++)for(let x=x0;x<=x1;x++){const d=((x-cx)**2+(y-cy)**2)/r2;if(d<4)F[y*N+x]+=amt*Math.exp(-d*1.6);}};
  if(kind==='pool'||kind==='bed'){/* a pool spreads as overlapping round lobes (surface tension keeps the edge smooth and
     convex between them), with one or two short tongues where it found a low spot and a few separate drops near the
     edge. A mattress soaks it up instead: wide, soft, darker, no hard edge. */
    const bed=kind==='bed';
    /* the pool fills most of the decal (radius ~100 of 128 texels) so its size on the floor is what the decal's size says */
    const inb=(x,y,rad)=>Math.hypot(x-128,y-128)+rad*1.1<124;
    splat(128,128,bed?62:54,1.3);
    const lobes=bed?9:11;for(let i=0;i<lobes;i++){const a=r()*6.28,d=Math.pow(r(),.6)*(bed?44:46),rad=(bed?24:18)+r()*(bed?20:18);const x=128+Math.cos(a)*d,y=128+Math.sin(a)*d*.9;if(inb(x,y,rad*.8))splat(x,y,rad,1.1);}
    if(!bed){const tongues=1+Math.floor(r()*2);for(let k=0;k<tongues;k++){const a=r()*6.28;let x=128+Math.cos(a)*48,y=128+Math.sin(a)*44,w=13+r()*5;
        for(let s2=0,n=14+r()*14;s2<n;s2++){x+=Math.cos(a)*1.5;y+=Math.sin(a)*1.5;w*=.972;if(!inb(x,y,w))break;splat(x,y,w,.9);}if(inb(x,y,w*1.3))splat(x,y,w*1.3,1);}
      for(let i=0;i<9;i++){const a=r()*6.28,d=94+r()*20,rad=1.6+r()*2.6;if(inb(128+Math.cos(a)*d,128+Math.sin(a)*d,rad))splat(128+Math.cos(a)*d,128+Math.sin(a)*d,rad,1.3);}}}
  else if(kind==='smear'){/* vertical smear down a wall where a body slid, with runs dripping further */
    for(let y=20;y<200;y++){const w=28-y*.08+Math.sin(y*.07)*4;const cx=128+Math.sin(y*.03)*8;for(let k=0;k<3;k++)splat(cx+(r()-.5)*w*1.6,y,4+r()*5,.35*(1-y/240));}
    for(let k=0;k<7;k++){let x=100+r()*56,y=120+r()*70,w=3+r()*2.5;const L=30+r()*70;for(let s=0;s<L;s++){y+=1.6;x+=(r()-.5)*.6;w*=.992;if(y>248)break;splat(x,y,w,.9);}splat(x,y+2,w*1.5,1);}}
  else{/* spatter: one impact with satellite drops and elongated tails pointing away */
    splat(128,128,10,1.4);for(let i=0;i<90;i++){const a=r()*6.28,d=12+Math.pow(r(),1.6)*100,s=1.2+r()*4*(1-d/120);const x=128+Math.cos(a)*d,y=128+Math.sin(a)*d;splat(x,y,s,1.1);
      if(r()<.4)for(let t=1;t<4;t++)splat(x+Math.cos(a)*t*s*.9,y+Math.sin(a)*t*s*.9,s*(1-t*.22),.9);}}
  /* noise-perturbed threshold -> colour (thin film bright red, pooled blood near-black red, a darker drying rim),
     height (a raised meniscus at the edge, a level surface inside) -> normal map, and roughness */
  const cv=document.createElement('canvas');cv.width=cv.height=N;const g=cv.getContext('2d'),im=g.createImageData(N,N),d=im.data;
  const rc=document.createElement('canvas');rc.width=rc.height=N;const rg=rc.getContext('2d'),ri=rg.createImageData(N,N),rd=ri.data;
  const Hh=new Float32Array(N*N),soak=kind==='bed';
  for(let y=0;y<N;y++)for(let x=0;x<N;x++){const i=y*N+x,u=x/N,v=y/N;const n=fbmT(u+seed*.1,v,8,4),n2=fbmT(u,v+seed*.1,30,2);
    const f=F[i]+(n-.5)*(soak?.6:.32)+(n2-.5)*.1,a=soak?sstep(.36,.62,f):sstep(.45,.5,f);const rim=a*(1-sstep(.5,.66,f));const deep=sstep(.6,1.5,f);
    let R0,G0,B0;
    if(soak){R0=32+deep*10+(n2-.5)*6;G0=4;B0=3;}
    else{const thin=1-sstep(.5,.85,f);R0=lerp(30,64,thin)-deep*10+(n2-.5)*6;G0=lerp(2,5,thin);B0=lerp(2,4,thin);R0=lerp(R0,26,rim*.7);G0=lerp(G0,7,rim*.7);B0=lerp(B0,5,rim*.7);}
    d[i*4]=R0;d[i*4+1]=G0;d[i*4+2]=B0;d[i*4+3]=a*(kind==='smear'?215:250)*(.9+n2*.1);
    Hh[i]=soak?a*.2:a*(.55+.45*sstep(.5,1.1,f))+rim*.35*(1-deep)+(n2-.5)*.04*a;
    const ro=(soak?.92:(.16-deep*.1+rim*.38+(1-a)*.4))*255;rd[i*4]=rd[i*4+1]=rd[i*4+2]=ro;rd[i*4+3]=255;}
  g.putImageData(im,0,0);rg.putImageData(ri,0,0);
  const nc=document.createElement('canvas');nc.width=nc.height=N;const ng=nc.getContext('2d'),ni=ng.createImageData(N,N),nd=ni.data;const at=(x,y)=>Hh[Math.min(N-1,Math.max(0,y))*N+Math.min(N-1,Math.max(0,x))];
  for(let y=0;y<N;y++)for(let x=0;x<N;x++){const k=(y*N+x)*4,du=(at(x+1,y)-at(x-1,y))*.5*2.2,dv=(at(x,y-1)-at(x,y+1))*.5*2.2;let nx=-du,ny=-dv,nz=1;const l=Math.hypot(nx,ny,nz);nd[k]=(nx/l*.5+.5)*255;nd[k+1]=(ny/l*.5+.5)*255;nd[k+2]=(nz/l*.5+.5)*255;nd[k+3]=255;}
  ng.putImageData(ni,0,0);
  const mk=(c,s)=>{const t=new T.CanvasTexture(c);t.wrapS=t.wrapT=T.ClampToEdgeWrapping;t.anisotropy=8;if(s)t.encoding=T.sRGBEncoding;return t;};
  return BLOODCACHE[key]={map:mk(cv,true),rough:mk(rc,false),nrm:mk(nc,false),soak};}
/* wet blood: a clear-coated film that mirrors the sky and the torch beam; soaked fabric stays matte */
function bloodDecal(par,kind,seed,x,y,z,sx,sz,rot,vertical){const t=bloodTex(kind,seed);
  const m=new T.MeshPhysicalMaterial({map:t.map,roughnessMap:t.rough,roughness:1,metalness:0,normalMap:t.nrm,normalScale:new T.Vector2(1.6,1.6),
    clearcoat:t.soak?0:.5,clearcoatRoughness:.2,reflectivity:.45,transparent:true,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-4,polygonOffsetUnits:-4,envMapIntensity:1.0});
  const d=mesh(new T.PlaneGeometry(sx,sz),m,x,y,z,par,false);d.receiveShadow=true;if(vertical){d.rotation.set(0,rot,0);}else d.rotation.set(-Math.PI/2,0,rot);d.renderOrder=2;return d;}

/* ---- blood outdoors: on soil and grass it does not sit as a glossy film - it soaks in, darkens almost to black at the
   centre where it is deepest, stays a duller red-brown where it is thin, and leaves a darker damp halo in the ground
   round the edge. Kinds: 'pool' (lobes plus a tongue running downhill along +v), 'drag' (a body dragged along +v: a
   broken band of parallel streaks with heavier blots where it stopped), 'drops' (a dotted line of drips).
   Besides colour / roughness / normal it returns a depth texture so a pool can spread over time (uSpread). ---- */
function groundBloodTex(kind,seed){const key='g'+kind+seed;if(BLOODCACHE[key])return BLOODCACHE[key];
  const N=256,F=new Float32Array(N*N),r=rng(seed);
  const splat=(cx,cy,rad,amt,sy=1)=>{const r2=rad*rad,x0=Math.max(0,Math.floor(cx-rad*2)),x1=Math.min(N-1,Math.ceil(cx+rad*2)),y0=Math.max(0,Math.floor(cy-rad*2*sy)),y1=Math.min(N-1,Math.ceil(cy+rad*2*sy));
    for(let y=y0;y<=y1;y++)for(let x=x0;x<=x1;x++){const d=((x-cx)**2+((y-cy)/sy)**2)/r2;if(d<4)F[y*N+x]+=amt*Math.exp(-d*1.6);}};
  const inb=(x,y,m)=>x>m&&x<N-m&&y>m&&y<N-m;
  if(kind==='pool'){for(let i=0;i<10;i++){const a=r()*6.28,d=Math.pow(r(),.7)*40,rad=17+r()*15;const x=128+Math.cos(a)*d,y=116+Math.sin(a)*d*.85;if(inb(x,y,rad*.9))splat(x,y,rad,1.15);}
    /* the tongue: down the slope, narrowing, meandering a little round tussocks */
    let x=128,y=128,w=22;for(let k=0;k<70;k++){y+=1.6;x+=Math.sin(k*.21+seed)*1.1+(r()-.5)*1.2;w*=.985;if(!inb(x,y,w))break;splat(x,y,w,.75);}
    for(let i=0;i<16;i++){const a=r()*6.28,d=78+r()*30,rad=1.5+r()*3;const x2=128+Math.cos(a)*d,y2=120+Math.sin(a)*d;if(inb(x2,y2,rad))splat(x2,y2,rad,1.3);}}
  else if(kind==='drag'){const lanes=[-26,-14,-3,9,21].map(o=>o+(r()-.5)*6);
    for(let y=4;y<N-4;y++){const cx=128+Math.sin(y*.025+seed)*9;const body=.45+.35*Math.sin(y*.05+seed*2)*Math.sin(y*.013+1);
      lanes.forEach((o,li)=>{const amt=(li===2?.55:.32)*body*(.6+.8*r());if(r()<.92)splat(cx+o+(r()-.5)*3,y,3.2+r()*3.5,amt*.5,1.6);});}
    for(let k=0;k<3;k++){const y=30+r()*190;splat(128+(r()-.5)*20,y,20+r()*8,1.1,1.2);}
    for(let i=0;i<26;i++){const x=128+(r()-.5)*110,y=r()*N;splat(x,y,1.2+r()*2.4,1.2);}}
  else if(kind==='spot'){/* one heavy drop and its spatter: a blot, satellites thrown out along +v, a short tail */
    splat(128,120,10+r()*5,1.4);for(let i=0;i<14;i++){const a=(r()-.5)*2.4+Math.PI/2,d=14+r()*60,rad=1+r()*3.2;const x=128+Math.cos(a)*d*.6,y=120+Math.sin(a)*d;if(inb(x,y,rad))splat(x,y,rad,1.25);}
    for(let k=0;k<10;k++)splat(128+(r()-.5)*3,128+k*3.2,7-k*.5,.8);}
  else{let x=128,y=6;for(let k=0;k<26;k++){y+=8+r()*7;x+=(r()-.5)*8;if(!inb(x,y,6))break;splat(x,y,1.8+r()*3.2,1.3);if(r()<.4)splat(x+(r()-.5)*6,y+(r()-.5)*6,1+r()*1.5,1.2);}}
  const cv=document.createElement('canvas');cv.width=cv.height=N;const g=cv.getContext('2d'),im=g.createImageData(N,N),d=im.data;
  const rc=document.createElement('canvas');rc.width=rc.height=N;const rg=rc.getContext('2d'),ri=rg.createImageData(N,N),rd=ri.data;
  const dc=document.createElement('canvas');dc.width=dc.height=N;const dg=dc.getContext('2d'),di=dg.createImageData(N,N),dd=di.data;
  const Hh=new Float32Array(N*N);
  for(let y=0;y<N;y++)for(let x=0;x<N;x++){const i=y*N+x,u=x/N,v=y/N;const n=fbmT(u+seed*.1,v,6,4),n2=fbmT(u,v+seed*.1,24,2),n3=fbmT(u+.3,v+.7,48,2);
    /* soil and grass break the film up: tiny dry gaps where blades and crumbs stick through */
    const f=F[i]+(n-.5)*.34+(n2-.5)*.12-(n3>.68?.25:0);
    const a=sstep(.44,.52,f),halo=sstep(.22,.44,f)*(1-a),deep=sstep(.7,1.5,f),thin=1-sstep(.52,.8,f);
    let R0=lerp(36,80,thin)-deep*8+(n2-.5)*5,G0=lerp(5,11,thin),B0=lerp(4,8,thin);
    /* the damp halo: soil darkened and browned, no red film */
    const A=Math.max(a,halo*.42);if(a<.5){R0=lerp(30,R0,a*2);G0=lerp(20,G0,a*2);B0=lerp(14,B0,a*2);}
    d[i*4]=R0;d[i*4+1]=G0;d[i*4+2]=B0;d[i*4+3]=A*245*(.92+n2*.08);
    Hh[i]=a*(.4+.6*sstep(.52,1.2,f))+(n2-.5)*.05*a;
    const ro=(halo>0&&a<.5?.9:lerp(.55,.24,deep))*255;rd[i*4]=rd[i*4+1]=rd[i*4+2]=ro;rd[i*4+3]=255;
    const dep=clamp(F[i]/1.6+(n-.5)*.12,0,1)*255;dd[i*4]=dd[i*4+1]=dd[i*4+2]=dep;dd[i*4+3]=255;}
  g.putImageData(im,0,0);rg.putImageData(ri,0,0);dg.putImageData(di,0,0);
  const nc=document.createElement('canvas');nc.width=nc.height=N;const ng=nc.getContext('2d'),ni=ng.createImageData(N,N),nd=ni.data;const at=(x,y)=>Hh[Math.min(N-1,Math.max(0,y))*N+Math.min(N-1,Math.max(0,x))];
  for(let y=0;y<N;y++)for(let x=0;x<N;x++){const k=(y*N+x)*4,du=(at(x+1,y)-at(x-1,y))*1.4,dv=(at(x,y-1)-at(x,y+1))*1.4;const l=Math.hypot(du,dv,1);nd[k]=(-du/l*.5+.5)*255;nd[k+1]=(-dv/l*.5+.5)*255;nd[k+2]=(1/l*.5+.5)*255;nd[k+3]=255;}
  ng.putImageData(ni,0,0);
  const mk=(c,s)=>{const t=new T.CanvasTexture(c);t.wrapS=t.wrapT=T.ClampToEdgeWrapping;t.anisotropy=8;if(s)t.encoding=T.sRGBEncoding;return t;};
  return BLOODCACHE[key]={map:mk(cv,true),rough:mk(rc,false),nrm:mk(nc,false),depth:mk(dc,false)};}
/* a decal that lies on the terrain (or any height function): a subdivided sheet whose vertices follow the ground, so it
   runs down a ditch bank instead of cutting into it. dir = the direction texture +v points along. */
function groundBlood(kind,seed,x,z,w,l,dir,hf,o={}){const t=groundBloodTex(kind,seed);
  const m=new T.MeshStandardMaterial({map:t.map,roughnessMap:t.rough,roughness:1,metalness:0,normalMap:t.nrm,normalScale:new T.Vector2(1.2,1.2),envMapIntensity:.7,
    transparent:true,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-4,polygonOffsetUnits:-4});
  m.userData.live=true;
  if(o.spread!==undefined){m.userData.spread={value:o.spread};m.onBeforeCompile=s=>{s.uniforms.uSpread=m.userData.spread;s.uniforms.tDepth={value:t.depth};
    s.fragmentShader='uniform float uSpread;uniform sampler2D tDepth;\n'+s.fragmentShader.replace('#include <alphamap_fragment>',
      '#include <alphamap_fragment>\n{float dp=texture2D(tDepth,vUv).r;float e=smoothstep(uSpread,uSpread+.06,dp);diffuseColor.a*=e;diffuseColor.rgb*=mix(1.25,1.,smoothstep(uSpread+.02,uSpread+.12,dp));}');};
    m.customProgramCacheKey=()=>'gblood';}
  const nx=Math.max(2,Math.round(w/.12)),nz=Math.max(2,Math.round(l/.12));const g=new T.PlaneGeometry(w,l,nx,nz);
  const c=Math.cos(Math.atan2(dir.x,dir.z)),sn=Math.sin(Math.atan2(dir.x,dir.z));const p=g.attributes.position;
  /* plane x -> right of dir, plane -y (texture +v downward) -> along dir */
  for(let i=0;i<p.count;i++){const px=p.getX(i),py=p.getY(i);const lx=px,lz=-py;const wx=x+lx*c+lz*sn,wz=z-lx*sn+lz*c;p.setXYZ(i,wx,hf(wx,wz)+(o.lift||.022),wz);}
  g.computeVertexNormals();g.computeBoundingSphere();
  /* (image rows run from the back edge to the front edge, so the pool's tongue and a drag mark follow dir) */
  const d=new T.Mesh(g,m);d.receiveShadow=true;d.renderOrder=2;d.frustumCulled=true;(o.parent||scene).add(d);return d;}

/* ---- papers: real (blurred) Cyrillic print so they read as text, not stripes ---- */
const WORDS='советский народ трудовой план пятилетка колхоз урожай станция энергия завод рабочие решение партия съезд товарищ выполнить район области город строительство передовой опыт бригада норма продукция рост сельского хозяйства председатель собрание инженер мирный атом безопасность населения эвакуация временно запрещается въезд радиационной обстановки'.split(' ');
function papers(kind,seed){const r=rng(seed);return tex(512,680,(g,w,h)=>{
    const base=kind==='letter'?'#ddd6c2':kind==='form'?'#d8d4c4':'#cfc6a8';g.fillStyle=base;g.fillRect(0,0,w,h);
    const word=()=>WORDS[Math.floor(r()*WORDS.length)];
    const para=(x,y,wd,lines,sz,col)=>{g.fillStyle=col;g.font=`${sz}px "Times New Roman",serif`;let yy=y;for(let l=0;l<lines;l++){let s='';while(g.measureText(s+word()).width<wd-20)s+=word()+' ';
        if(l===lines-1)s=s.slice(0,s.length*.6);g.fillText(s,x,yy);yy+=sz*1.25;}return yy;};
    g.filter='blur(.55px)';
    if(kind==='news'){g.fillStyle='#2a2620';g.font='bold 74px "Times New Roman",serif';g.textAlign='center';g.fillText('ПРАВДА',w/2,78);g.textAlign='left';
      g.fillRect(20,94,w-40,3);g.font='13px serif';g.fillText('Орган Центрального Комитета КПСС        № 117 (25084)        Цена 3 коп.',24,114);g.fillRect(20,122,w-40,1.5);
      g.font='bold 26px serif';g.fillText('Слава труженикам атомной',24,156);g.fillText('энергетики!',24,184);
      g.fillStyle='#6b665c';g.fillRect(24,200,210,150);g.fillStyle='#4a463e';for(let i=0;i<40;i++)g.fillRect(24+r()*200,200+r()*140,8+r()*30,4+r()*20);
      let y=para(248,212,240,11,13,'#2c2822');para(24,370,150,21,12,'#2c2822');para(182,370,150,21,12,'#2c2822');para(340,370,150,21,12,'#2c2822');
      g.fillStyle='#2c2822';[176,334].forEach(x=>g.fillRect(x,366,1,270));}
    else if(kind==='letter'){g.fillStyle='#2b3a6a';g.font='italic 20px "Comic Sans MS",cursive';let y=60;
      for(let l=0;l<22;l++){let s='';while(g.measureText(s).width<w-110)s+=word()+' ';g.save();g.translate(44+(l===0?40:0),y);g.rotate((r()-.5)*.012);g.fillText(s,0,0);g.restore();y+=26;}
      g.fillStyle='rgba(120,90,60,.25)';g.beginPath();g.arc(380,520,60,0,7);g.fill();}
    else{g.fillStyle='#2c2822';g.font='bold 22px serif';g.textAlign='center';g.fillText('ПРЕДПИСАНИЕ',w/2,56);g.font='14px serif';g.fillText('об эвакуации населения',w/2,78);g.textAlign='left';
      let y=para(30,112,w-50,6,14,'#2c2822');for(let i=0;i<6;i++){g.fillRect(30,y+12+i*34,w-60,1);g.font='12px serif';g.fillText(word(),30,y+8+i*34);}
      g.fillStyle='#2b3a6a';g.font='italic 18px cursive';for(let i=0;i<4;i++)g.fillText(word()+' '+word(),200,y+6+i*34);
      g.strokeStyle='rgba(150,40,40,.7)';g.lineWidth=3;g.beginPath();g.arc(400,600,46,0,7);g.stroke();g.font='bold 11px serif';g.fillStyle='rgba(150,40,40,.7)';g.fillText('ИСПОЛКОМ',368,604);}
    g.filter='none';
    /* age: yellowed edges, foxing, a fold line, a boot print */
    const gr=g.createRadialGradient(w/2,h/2,h*.25,w/2,h/2,h*.75);gr.addColorStop(0,'rgba(0,0,0,0)');gr.addColorStop(1,'rgba(110,80,30,.35)');g.fillStyle=gr;g.fillRect(0,0,w,h);
    for(let i=0;i<30;i++){g.fillStyle=`rgba(120,85,40,${.05+r()*.12})`;g.beginPath();g.arc(r()*w,r()*h,2+r()*10,0,7);g.fill();}
    g.fillStyle='rgba(60,50,40,.15)';g.fillRect(0,h/2-1,w,2);
    if(r()<.5){g.fillStyle='rgba(50,40,30,.28)';g.save();g.translate(r()*w,r()*h);g.rotate(r()*6);for(let i=0;i<9;i++)g.fillRect(-60,-110+i*24,120,12);g.restore();}
  },{clamp:true});}
/* a slightly crumpled, curled sheet */
function paperMesh(par,kind,seed,x,y,z,rot,sc=1){const r=rng(seed+7);const g=new T.PlaneGeometry(.21*sc*1.4,.297*sc*1.4,8,10);const p=g.attributes.position;
  const c1=r()*.03,c2=r()*.03,fold=r()<.5;for(let i=0;i<p.count;i++){const u=p.getX(i),v=p.getY(i);let zz=c1*(u*u)*30+c2*(v*v)*20+(fold?Math.abs(v)*-.04+.01:0)+(r()-.5)*.003;p.setZ(i,Math.max(0,zz));}
  g.computeVertexNormals();const m=mesh(g,std({map:papers(kind,seed),roughness:.95,side:T.DoubleSide,envMapIntensity:.2}),x,y,z,par,false);m.rotation.set(-Math.PI/2,0,rot);m.receiveShadow=true;return m;}

/* ---- ZIL-Moskva refrigerator: rounded enamel cabinet, lever handle, chrome script badge ---- */
function zilFridge(par,x,y,z,ry){const f=new T.Group();f.position.set(x,y,z);f.rotation.y=ry;par.add(f);
  const enT=memo('fridgeEn',()=>tex(256,512,(g,w,h)=>{g.fillStyle='#d9d0b4';g.fillRect(0,0,w,h);pix2(g,w,h,.18);const r=rng(11);
    for(let i=0;i<22;i++){const xx=r()*w,yy=h*(.86+r()*.14),L=8+r()*40;const gr=g.createLinearGradient(0,yy-L,0,yy);gr.addColorStop(0,'rgba(110,60,25,0)');gr.addColorStop(1,`rgba(110,60,25,${.25+r()*.35})`);g.fillStyle=gr;g.fillRect(xx,yy-L,2+r()*4,L);}
    const gr=g.createLinearGradient(0,h*.55,0,h);gr.addColorStop(0,'rgba(90,70,40,0)');gr.addColorStop(1,'rgba(90,70,40,.35)');g.fillStyle=gr;g.fillRect(0,0,w,h);
    }));
  const en=std({map:enT,roughness:.32,metalness:0,envMapIntensity:.9}),chrome=std({color:C(0xd6d6d2),metalness:1,roughness:.16,envMapIntensity:1.4}),dark=std({color:C(0x16140f),roughness:.8});
  const W=.64,D=.62,H=1.58;
  mesh(rbox(W,H-.08,D,.07),en,0,(H-.08)/2+.06,0,f);
  /* domed top */
  {const tg=rbox(W,.16,D,.075);mesh(tg,en,0,H-.1,0,f);}
  mesh(rbox(W-.06,.06,D-.04,.01),dark,0,.03,0,f);                                   /* plinth */
  /* door with gasket and the big chrome lever handle */
  mesh(rbox(W-.04,H-.28,.014,.01),dark,0,H/2+.03,D/2+.002,f);
  const door=new T.Group();door.position.set(0,0,D/2+.012);f.add(door);mesh(rbox(W-.03,H-.26,.045,.05),en,0,H/2+.03,.02,door);
  mesh(rbox(.05,.03,.04,.008),chrome,.22,H*.62,.06,door);const lv=new T.Group();lv.position.set(.22,H*.62,.085);lv.rotation.z=-.12;door.add(lv);
  mesh(rbox(.2,.035,.03,.012),chrome,-.08,0,0,lv);mesh(new T.CylinderGeometry(.022,.022,.03,14),chrome,0,0,0,lv).rotation.x=Math.PI/2;
  /* badge: chrome script on a dark field */
  const bt=memo('fridgeBadge',()=>tex(256,64,(g,w,h)=>{g.clearRect(0,0,w,h);g.fillStyle='#e8e8e2';g.font='italic bold 46px "Times New Roman",serif';g.textAlign='center';g.fillText('ЗИЛ',w/2-40,46);g.font='italic 22px serif';g.fillText('Москва',w/2+60,44);},{clamp:true}));
  const bm=mesh(new T.PlaneGeometry(.3,.075),std({map:bt,transparent:true,metalness:1,roughness:.2,envMapIntensity:1.6}),-.04,H*.82,.044,door,false);
  /* chrome trim strip and the vent grille at the bottom */
  mesh(rbox(W-.12,.012,.01,.004),chrome,0,H*.76,.044,door);
  const gr=new T.Group();gr.position.set(0,.14,D/2+.03);f.add(gr);mesh(rbox(W-.1,.1,.01,.01),dark,0,0,0,gr);for(let i=0;i<6;i++)mesh(rbox(W-.14,.008,.012,.003),chrome,0,-.04+i*.016,.006,gr);
  return f;}

/* ---- Russian stove (pech): whitewashed brick mass, arched mouth with a ledge, firewood niche below, warming bench
   on top, chimney breast to the ceiling, little drying niches, soot; cast-iron pot, oven fork, iron damper ---- */
function russianStove(par,x,y,z,ceil){const s=new T.Group();s.position.set(x,y,z);par.add(s);const Wd=1.55,Dp=1.85,H=1.55;
  const wT=memo('stoveW',()=>tex(512,512,(g,w,h)=>{g.fillStyle='#d8d4c8';g.fillRect(0,0,w,h);const r=rng(5);
    /* bricks showing through where the whitewash has flaked */
    for(let k=0;k<5;k++){/* flaked patches: a few clusters of bricks with mortar lines, edges of the whitewash ragged */
      const cx=r()*w,cy=r()*h,rad=20+r()*40;for(let row=0;row<26;row++)for(let c=0;c<9;c++){const bx=c*58+(row%2)*29,by=row*20;const d=Math.hypot(bx+27-cx,by+9-cy);if(d>rad*(.7+r()*.6))continue;
        g.fillStyle=`rgb(${118+r()*22},${78+r()*16},${62+r()*12})`;g.fillRect(bx+3,by+3,52,14);}}
    pix2(g,w,h,.5);
    const gr=g.createLinearGradient(0,0,0,h);gr.addColorStop(0,'rgba(60,55,45,.25)');gr.addColorStop(.6,'rgba(60,55,45,0)');gr.addColorStop(1,'rgba(80,70,55,.3)');g.fillStyle=gr;g.fillRect(0,0,w,h);}));
  const wh=std({map:wT,roughness:.95,envMapIntensity:.25}),soot=std({color:C(0x0c0b0a),roughness:1}),iron=std({color:C(0x24221f),roughness:.6,metalness:.6});
  /* body built around the mouth: front slab with real openings */
  const fs=new T.Shape();fs.moveTo(-Wd/2,0);fs.lineTo(Wd/2,0);fs.lineTo(Wd/2,H);fs.lineTo(-Wd/2,H);fs.closePath();
  const arch=(cx,y0,w,h,r)=>{const p=new T.Path();p.moveTo(cx-w/2,y0);p.lineTo(cx+w/2,y0);p.lineTo(cx+w/2,y0+h-r);p.absarc(cx,y0+h-r,w/2,0,Math.PI,false);p.lineTo(cx-w/2,y0);return p;};
  fs.holes.push(arch(0,.88,.56,.5,.28));fs.holes.push(arch(0,.06,.62,.46,.31));
  const fg=new T.ExtrudeGeometry(fs,{depth:.3,bevelEnabled:true,bevelSize:.02,bevelThickness:.02,bevelSegments:2,curveSegments:16});worldUV(fg,.9);mesh(fg,wh,0,0,Dp/2-.3,s);
  mesh(rbox(Wd,H,Dp-.3,.03),wh,0,H/2,-.15,s);
  /* tunnels behind the openings: sooty firebox, wood niche with split logs */
  mesh(rbox(.54,.48,.55,.02),soot,0,.88+.24,Dp/2-.55,s);mesh(rbox(.6,.44,.5,.02),std({color:C(0x1a1512),roughness:1}),0,.06+.22,Dp/2-.5,s);
  for(let i=0;i<6;i++){const l=mesh(xf(new T.CylinderGeometry(.045,.05,.48,6),0,0,0,Math.PI/2,0,0),M.logs,-.22+(i%3)*.15+(i>2?.07:0),.12+(i>2?.09:0),Dp/2-.45,s);l.rotation.z=(i*.7)%1*.2;}
  /* ledge (shestok) under the mouth and soot licking up the face above it */
  mesh(rbox(Wd+.04,.08,.32,.02),wh,0,.84,Dp/2+.1,s);
  const st=memo('stoveSt',()=>tex(128,256,(g,w,h)=>{const gr=g.createRadialGradient(w/2,h,10,w/2,h*.75,h*.8);gr.addColorStop(0,'rgba(10,9,8,.95)');gr.addColorStop(.5,'rgba(20,18,15,.5)');gr.addColorStop(1,'rgba(20,18,15,0)');g.fillStyle=gr;g.fillRect(0,0,w,h);},{clamp:true}));
  mesh(new T.PlaneGeometry(.8,.7),std({map:st,transparent:true,depthWrite:false,roughness:1,polygonOffset:true,polygonOffsetFactor:-3}),0,1.45,Dp/2+.023,s,false);
  /* the top: a stepped cornice belt under the sleeping bench (lezhanka), its slab with a rounded lip; a patchwork quilt and
     a pillow on it. Over the back of it the chimney breast rises in two stages to the ceiling - a broad lower stage with
     its own cornice, the round iron cleaning door (vyushka) with its lid on a chain, the slide damper with its iron
     handle - then the narrower flue with a moulded collar where it meets the ceiling */
  mesh(rbox(Wd+.05,.05,Dp+.05,.012),wh,0,H-.06,0,s);mesh(rbox(Wd+.1,.035,Dp+.1,.01),wh,0,H-.015,0,s);
  mesh(rbox(Wd+.08,.08,Dp+.06,.03),wh,0,H+.04,0,s);
  const quilt=memo('stoveQuilt',()=>tex(256,256,(g,w,h)=>{const r=rng(17);const cols=['#7a3a32','#3e5a6a','#8a7a4a','#5a6a3a','#6a4a5a','#9a8a6a'];for(let y=0;y<8;y++)for(let x=0;x<8;x++){g.fillStyle=cols[Math.floor(r()*cols.length)];g.fillRect(x*32,y*32,32,32);
      g.strokeStyle='rgba(230,220,200,.5)';g.setLineDash([3,3]);g.strokeRect(x*32+3,y*32+3,26,26);}const im=g.getImageData(0,0,w,h),d=im.data;for(let i=0;i<d.length;i+=4){const k=.8+Math.random()*.3;d[i]*=k;d[i+1]*=k;d[i+2]*=k;}g.putImageData(im,0,0);}));
  {const qg=new T.PlaneGeometry(Wd-.1,Dp*.55,16,12);const p=qg.attributes.position;for(let i=0;i<p.count;i++){const u=p.getX(i),v=p.getY(i);p.setZ(i,.02+Math.max(0,Math.sin(u*9+v*6)*.012+Math.cos(v*11)*.008));}qg.computeVertexNormals();
   const q=mesh(qg,std({map:quilt,roughness:1,envMapIntensity:.15}),0,H+.081,Dp*.18,s,false);q.rotation.x=-Math.PI/2;q.receiveShadow=true;
   const pl=mesh(new T.SphereGeometry(.2,14,10),std({map:TX.cloth,color:C(0xe4dccc),roughness:1}),-.45,H+.15,Dp/2-.35,s);pl.scale.set(1.2,.35,.8);}
  const cbH=.85,cw=1.0,cd=.8,cx=.25,cz=-Dp/2+.42;
  mesh(rbox(cw,cbH,cd,.03),wh,cx,H+.08+cbH/2,cz,s);
  [[cbH-.02,.05,.06],[cbH+.03,.04,.03]].forEach(([dy,hh,o])=>mesh(rbox(cw+o*2,hh,cd+o*2,.01),wh,cx,H+.08+dy,cz,s));
  const fH=ceil-H-.08-cbH-.07;mesh(rbox(.72,fH,.6,.03),wh,cx+.06,H+.08+cbH+.07+fH/2,cz-.06,s);
  mesh(rbox(.86,.06,.74,.01),wh,cx+.06,ceil-.03,cz-.06,s);mesh(rbox(.8,.04,.68,.01),wh,cx+.06,ceil-.09,cz-.06,s);
  /* the cleaning door (vyushka) on the side of the breast: a cast ring set in the brick with its round lid shut in it,
     a small knob on the lid */
  {const vx=cx+cw/2+.006,vy=H+.08+cbH*.5,vz=cz+.05;const r=mesh(new T.TorusGeometry(.1,.016,8,22),iron,vx,vy,vz,s);r.rotation.y=Math.PI/2;
   const lid=mesh(new T.CylinderGeometry(.088,.088,.012,22),iron,vx+.004,vy,vz,s);lid.rotation.z=Math.PI/2;mesh(new T.SphereGeometry(.016,8,6),iron,vx+.016,vy,vz,s);}
  /* the slide damper's iron handle out of the flue face */
  mesh(new T.CylinderGeometry(.012,.012,.2,6),iron,cx-.22,H+.08+cbH+.3,cz-.06+.3+.1,s).rotation.x=Math.PI/2;mesh(new T.SphereGeometry(.024,8,6),iron,cx-.22,H+.08+cbH+.3,cz-.06+.3+.2,s);
  /* the cooking plate on the side hearth (podtopok): a little brick firebox against the front corner, its cast-iron
     plate with two rings and their lids, the fire door and ash door below with their latches */
  {const px=Wd/2-.215,pz=Dp/2+.17,pw=.43,pd=.36,ph=.88;mesh(rbox(pw,ph,pd,.02),wh,px,ph/2,pz,s);
   const pt=mesh(rbox(pw+.03,.025,pd+.03,.004),iron,px,ph+.012,pz,s);
   [[-.09,.06],[.1,.05]].forEach(([dx,r])=>{mesh(new T.TorusGeometry(r,.012,6,20),iron,px+dx,ph+.027,pz,s).rotation.x=Math.PI/2;mesh(new T.CylinderGeometry(r-.012,r-.012,.012,20),iron,px+dx,ph+.03,pz,s);
     mesh(new T.TorusGeometry(r*.45,.006,5,14),iron,px+dx,ph+.038,pz,s).rotation.x=Math.PI/2;});
   [[.52,.18,.14],[.17,.16,.09]].forEach(([y,w,hh])=>{mesh(rbox(w,hh,.015,.004),iron,px,y,pz+pd/2+.006,s);mesh(rbox(.05,.02,.02,.004),iron,px+w/2-.04,y,pz+pd/2+.018,s);});}
  /* drying niches on the side */
  [[-.35,.8],[.25,.8],[-.35,1.25]].forEach(([dz,dy])=>{mesh(rbox(.06,.16,.18,.01),soot,-Wd/2+.02,dy,dz,s,false);});
  /* cast-iron pot on the ledge, the iron mouth cover leaning, oven fork against the side */
  mesh(lathe([[0,0],[.09,0],[.13,.05],[.15,.13],[.13,.2],[.12,.21],[0,.21]],18),iron,-.42,.88,Dp/2+.12,s);
  const zs=mesh(rbox(.44,.4,.012,.03),iron,-.52,.2,Dp/2+.08,s);zs.rotation.x=-.12;mesh(rbox(.14,.03,.05,.01),iron,-.52,.37,Dp/2+.13,s);
  const uk=new T.Group();uk.position.set(-Wd/2-.08,0,Dp/2-.1);uk.rotation.z=.2;s.add(uk);mesh(new T.CylinderGeometry(.018,.022,1.7,6),M.wood,0,.85,0,uk);
  mesh(xf(new T.TorusGeometry(.12,.012,5,12,Math.PI),0,0,0,0,0,0),iron,0,1.78,0,uk).rotation.z=Math.PI;
  return s;}

/* ---- wardrobe (shifonier): framed panel doors, mirror, cornice, keyholes, stubby legs ---- */
function wardrobe(par,x,y,z,ry){const w=new T.Group();w.position.set(x,y,z);w.rotation.y=ry;par.add(w);
  const v=std({map:PB.boards.a,normalMap:PB.boards.n,roughnessMap:PB.boards.r,roughness:1,color:C(0x6a4a30)});
  mesh(rbox(1.1,1.82,.56,.015),v,0,.08+.91,0,w);mesh(rbox(1.18,.08,.62,.02),v,0,1.86,0,w);mesh(rbox(1.14,.05,.6,.01),v,0,1.92,0,w);
  [[-.5,-.22],[.5,-.22],[-.5,.22],[.5,.22]].forEach(([a,b])=>mesh(rbox(.06,.09,.06,.01),v,a,.045,b,w));
  [-.275,.275].forEach((dx,i)=>{mesh(rbox(.52,1.7,.03,.01),v,dx,.99,.29,w);if(i===0){mesh(rbox(.4,1.2,.012,.004),std({color:C(0x9aa6a8),metalness:.9,roughness:.08,envMapIntensity:1.6}),dx,1.0,.31,w);}
    else{[1.4,.6].forEach(yy=>{mesh(rbox(.4,.6,.012,.02),v,dx,yy,.31,w);});}
    mesh(rbox(.02,.05,.01,.003),std({color:C(0x8a7a40),metalness:.8,roughness:.35}),dx+(i?-.22:.22),1.0,.31,w);});
  return w;}

/* ---- oilcloth (kleenka) for the table: faded check with a floral border, worn through at the edge ---- */
const KLEENKA=tex(256,256,(g,w,h)=>{g.fillStyle='#c9c3ae';g.fillRect(0,0,w,h);for(let y=0;y<8;y++)for(let x=0;x<8;x++)if((x+y)%2){g.fillStyle='rgba(70,100,120,.35)';g.fillRect(x*32,y*32,32,32);}
  g.strokeStyle='rgba(150,60,50,.45)';g.lineWidth=3;for(let i=0;i<16;i++){g.beginPath();g.arc(i*16+8,10,6,0,Math.PI);g.stroke();}pix2(g,w,h,.5);},{rep:[2,2]});
/* ---- striped rag runner ---- */
function ragRunner(par,x,y,z,len,wd,ry){const t=memo('rag',()=>tex(64,512,(g,w,h)=>{const r=rng(3);let yy=0;const cols=['#5a4038','#3e4650','#6e6656','#4a5040','#625a50','#4e3e44','#7a7060'];
    while(yy<h){const sh=4+r()*20;g.fillStyle=cols[Math.floor(r()*cols.length)];g.fillRect(0,yy,w,sh);yy+=sh;}
    const im=g.getImageData(0,0,w,h),d=im.data;for(let i=0;i<d.length;i+=4){const k=.75+((i/4)%2)*.1+Math.random()*.15;d[i]*=k;d[i+1]*=k;d[i+2]*=k;}g.putImageData(im,0,0);}));
  const g=new T.PlaneGeometry(wd,len,6,40);const p=g.attributes.position;for(let i=0;i<p.count;i++){const u=p.getX(i),v=p.getY(i);p.setZ(i,Math.max(0,Math.sin(v*7+u*2)*.006+Math.sin(v*2.3)*.004));}g.computeVertexNormals();
  const m=mesh(g,std({map:t,roughness:1,envMapIntensity:.15}),x,y,z,par,false);m.rotation.set(-Math.PI/2,0,ry);m.receiveShadow=true;return m;}
/* ---- washstand with an enamel basin and a hanging tin washer, towel on a nail ---- */
function washstand(par,x,y,z,ry){const w=new T.Group();w.position.set(x,y,z);w.rotation.y=ry;par.add(w);
  /* the village washstand: a painted cupboard with the enamel basin let into its top, the backboard standing up behind
     carrying the tin cistern with its push-valve spout over the basin, a little mirror, the soap dish and a towel on its peg */
  const pt=std({map:RF.PAINT.map,color:C(0xd8dccc),roughness:.55,envMapIntensity:.35}),tin=std({color:C(0x9a9c96),metalness:.8,roughness:.35,envMapIntensity:.8});
  const W=.56,H=.78,D=.42;mesh(rbox(W,H-.06,D,.008),pt,0,.06+(H-.06)/2,0,w);[[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([a,b])=>mesh(rbox(.05,.06,.05,.006),pt,a*(W/2-.03),.03,b*(D/2-.03),w));
  mesh(rbox(W-.08,H-.2,.018,.006),pt,0,.42,D/2+.004,w);mesh(rbox(W-.14,H-.28,.012,.005),pt,0,.42,D/2+.014,w);mesh(new T.SphereGeometry(.016,10,8),M.rust,W/2-.09,.46,D/2+.025,w);
  mesh(rbox(W+.04,.03,D+.03,.006),pt,0,H+.015,0,w);
  mesh(lathe([[0,-.11],[.1,-.1],[.16,-.05],[.19,0],[.205,.008],[.2,.012],[.17,-.03],[.1,-.085],[0,-.095]],24),M.enamel,0,H+.03,.04,w);
  /* backboard, cistern, spout */
  const bb=mesh(rbox(W,.74,.025,.006),pt,0,H+.03+.37,-D/2+.0125,w);mesh(rbox(W+.04,.04,.06,.008),pt,0,H+.03+.76,-D/2+.03,w);
  const cz=-D/2+.025+.1;mesh(new T.CylinderGeometry(.1,.1,.26,20),tin,-.1,H+.5,cz,w);mesh(new T.CylinderGeometry(.106,.106,.025,20),tin,-.1,H+.645,cz,w);mesh(new T.SphereGeometry(.015,8,6),tin,-.1,H+.67,cz,w);
  mesh(new T.ConeGeometry(.1,.08,20),tin,-.1,H+.33,cz,w).rotation.x=Math.PI;mesh(new T.CylinderGeometry(.008,.008,.14,8),tin,-.1,H+.23,cz,w);mesh(new T.SphereGeometry(.014,8,6),tin,-.1,H+.16,cz,w);
  mesh(rbox(.05,.3,.012,.003),tin,-.1,H+.5,-D/2+.031,w);
  const mi=new T.Group();mi.position.set(.15,H+.46,-D/2+.03);w.add(mi);mesh(rbox(.2,.27,.016,.004),RF.W3,0,0,0,mi);mesh(new T.PlaneGeometry(.17,.24),RF.MIRR,0,0,.009,mi);
  mesh(lathe([[0,0],[.045,0],[.05,.015],[.04,.02],[0,.012]],14),M.enamel,.18,H+.03,-.1,w);mesh(rbox(.07,.022,.045,.012),std({color:C(0xd8c890),roughness:.6}),.18,H+.05,-.1,w);
  mesh(new T.CylinderGeometry(.008,.008,.06,6),RF.W3,W/2+.025,H+.68,-D/2+.0125,w).rotation.z=Math.PI/2;
  const tw=new T.PlaneGeometry(.16,.5,1,6);const tp=tw.attributes.position;for(let i=0;i<tp.count;i++)tp.setZ(i,Math.sin((tp.getY(i)+.25)*6)*.006);tw.computeVertexNormals();
  mesh(tw,std({map:TX.cloth,color:C(0xf0ece0),roughness:1,side:T.DoubleSide}),W/2+.04,H+.43,-D/2+.06,w).rotation.y=Math.PI/2;
  RF.fin(w);return w;}
/* ---- pendulum wall clock (khodiki) with weights on chains ---- */
function wallClock(par,x,y,z,ry){const c=new T.Group();c.position.set(x,y,z);c.rotation.y=ry;par.add(c);
  const face=memo('clockFace',()=>tex(128,128,(g,w,h)=>{g.fillStyle='#e8e0c8';g.beginPath();g.arc(64,64,62,0,7);g.fill();g.fillStyle='#222';g.font='bold 14px serif';g.textAlign='center';
    for(let i=1;i<=12;i++){const a=i/12*Math.PI*2;g.fillText(i,64+Math.sin(a)*48,69-Math.cos(a)*48);}g.lineWidth=3;g.strokeStyle='#222';g.beginPath();g.moveTo(64,64);g.lineTo(64+20,64-20);g.moveTo(64,64);g.lineTo(64,24);g.stroke();},{clamp:true}));
  mesh(rbox(.2,.24,.05,.01),std({color:C(0x7a5a30),roughness:.6}),0,0,0,c);mesh(new T.CircleGeometry(.08,20),std({map:face,roughness:.6}),0,0,.026,c,false);
  const br=std({color:C(0x9a7a40),metalness:.8,roughness:.35});mesh(new T.CylinderGeometry(.004,.004,.42,4),br,0,-.33,.01,c);mesh(new T.CylinderGeometry(.03,.03,.012,12),br,0,-.55,.01,c).rotation.x=Math.PI/2;
  [-.05,.05].forEach((dx,i)=>{mesh(new T.CylinderGeometry(.003,.003,.35+i*.12,4),br,dx,-.3-i*.06,.0,c);mesh(new T.CylinderGeometry(.018,.018,.08,8),br,dx,-.5-i*.12,0,c);});
  return c;}
