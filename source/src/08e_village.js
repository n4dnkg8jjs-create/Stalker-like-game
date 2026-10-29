/* ---------- the rest of Staroye Opalikhino (layout: VILL in 02_terrain): eleven more houses on the street and the lane,
   built like the farmhouse - log walls with real openings on a plinth, plank floors, carved white window frames and
   painted shutters - some clad in painted boards, gable or hip roofs of asbestos slate or painted ribbed tin, glazed
   verandas, one with its covered yard (dvor) under the same roof; every plot with its own fence, gate and path,
   outbuildings (shed, bathhouse, woodpile under a lean-to, privy, greenhouse), a proper cellar - stone-walled pit with
   its timber cellar-house over the stairs and the earth bank over the vault with its vent - and a dug vegetable garden
   of ridged beds. Three houses stand boarded up, one of those burnt out. ---------- */
const HOUSES=[HOUSE],PORCHES=[],DOORS=[],YARDS=[];
/* a sepia family photograph in a dark frame: people in a row, the old ones sat in front (each one different) */
function photoTex(seed){return tex(128,160,(c,w,h)=>{const q=rng(seed);const g=c.createLinearGradient(0,0,0,h);g.addColorStop(0,'#cdb894');g.addColorStop(1,'#a88e68');c.fillStyle=g;c.fillRect(0,0,w,h);
  const n=2+Math.floor(q()*4);for(let i=0;i<n;i++){const x=(i+.5)/n*w+(q()-.5)*8,big=q()<.5,y=h*(big?.48:.4),s=big?1:.85;
    c.fillStyle=`rgba(${50+q()*30|0},${38+q()*20|0},${28+q()*10|0},.9)`;c.beginPath();c.ellipse(x,y+40*s,22*s,34*s,0,Math.PI,0);c.fill();c.fillRect(x-22*s,y+40*s,44*s,h);
    c.fillStyle=`rgba(${120+q()*30|0},${95+q()*20|0},${70|0},.95)`;c.beginPath();c.ellipse(x,y,10*s,13*s,0,0,7);c.fill();c.fillStyle='rgba(40,30,22,.85)';c.beginPath();c.ellipse(x,y-6*s,11*s,7*s,0,Math.PI,0);c.fill();}
  for(let i=0;i<120;i++){c.fillStyle=`rgba(255,250,230,${q()*.12})`;c.fillRect(q()*w,q()*h,1+q()*2,1);}c.strokeStyle='#efe6d0';c.lineWidth=8;c.strokeRect(4,4,w-8,h-8);});}
/* Soviet wallpaper: a pale ground, a printed vertical stripe of little flower sprigs, a fine pinstripe, faded and
   foxed with age; and lime-wash over plaster, white with a blue tint, worn grey at hand height */
function wallPaper(seed){seed=seed%4;return memo('wp'+seed,()=>{const P=[['#e4dcc4','#8a6a4a','#5a7a4a'],['#d8e0d0','#4a6a5a','#a06a5a'],['#e8d8c0','#7a4a3a','#4a5a7a'],['#e0d4d8','#6a4a5a','#5a6a4a']][seed%4];
  const t=tex(256,256,(c,w,h)=>{const q=rng(300+seed);c.fillStyle=P[0];c.fillRect(0,0,w,h);
    for(let x=0;x<w;x+=64){c.fillStyle=`rgba(0,0,0,.05)`;c.fillRect(x+28,0,8,h);c.fillStyle=P[1];c.globalAlpha=.35;c.fillRect(x+2,0,1.5,h);c.fillRect(x+60,0,1.5,h);c.globalAlpha=1;
      for(let y=0;y<h;y+=42){const cx=x+32,cy=y+((x/64)%2)*21+10;c.strokeStyle=P[2];c.lineWidth=1.6;c.beginPath();c.moveTo(cx,cy+12);c.quadraticCurveTo(cx-3,cy+4,cx,cy-6);c.stroke();
        [[-6,-2],[6,0],[-4,6],[5,7]].forEach(([dx,dy])=>{c.fillStyle=P[2];c.beginPath();c.ellipse(cx+dx,cy+dy,4,2,dx>0?.6:-.6,0,7);c.fill();});
        c.fillStyle=P[1];[[0,-8],[-3,-10],[3,-10],[0,-12]].forEach(([dx,dy])=>{c.beginPath();c.arc(cx+dx,cy+dy,2.4,0,7);c.fill();});}}
    for(let i=0;i<14;i++){const x=q()*w,y=q()*h,r=8+q()*30,g=c.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,'rgba(140,110,60,.12)');g.addColorStop(1,'rgba(140,110,60,0)');c.fillStyle=g;c.fillRect(x-r,y-r,2*r,2*r);}
    const im=c.getImageData(0,0,w,h),d=im.data;for(let i=0;i<d.length;i+=4){const v=.93+Math.random()*.1;d[i]*=v;d[i+1]*=v;d[i+2]*=v;}c.putImageData(im,0,0);});
  t.wrapS=t.wrapT=T.RepeatWrapping;return std({map:t,roughness:.85,envMapIntensity:.2});});}
function wallLime(seed){return memo('lime',()=>{const t=tex(256,256,(c,w,h)=>{const q=rng(500+seed);c.fillStyle='#dfe6ea';c.fillRect(0,0,w,h);
    for(let i=0;i<260;i++){const x=q()*w,y=q()*h,r=2+q()*14;c.fillStyle=`rgba(${q()<.5?150:255},${q()<.5?160:255},${q()<.5?165:255},${.05+q()*.08})`;c.beginPath();c.arc(x,y,r,0,7);c.fill();}
    for(let i=0;i<40;i++){c.strokeStyle=`rgba(90,90,95,${.05+q()*.08})`;c.lineWidth=.6;c.beginPath();let x=q()*w,y=q()*h;c.moveTo(x,y);for(let k=0;k<5;k++){x+=(q()-.5)*20;y+=q()*14;c.lineTo(x,y);}c.stroke();}});
  t.wrapS=t.wrapT=T.RepeatWrapping;return std({map:t,roughness:.95,envMapIntensity:.25});});}
/* the carpet on the wall over the bed: dark red field, border bands, a row of medallions */
function carpetTex(seed){return tex(256,384,(c,w,h)=>{const q=rng(seed);const f=['#6e1c1a','#5a1e2a','#2a3858'][seed%3];c.fillStyle=f;c.fillRect(0,0,w,h);
  for(const [m,col] of [[6,'#d8c39a'],[18,'#1d2a3a'],[26,'#b5442e']]){c.strokeStyle=col;c.lineWidth=7;c.strokeRect(m,m,w-2*m,h-2*m);}
  for(let k=0;k<3;k++){const cx=w/2,cy=h*(.25+k*.25);c.fillStyle=['#d8c39a','#b5442e','#1d2a3a'][k%3];c.beginPath();c.moveTo(cx,cy-46);c.lineTo(cx+58,cy);c.lineTo(cx,cy+46);c.lineTo(cx-58,cy);c.closePath();c.fill();
    c.fillStyle=f;c.beginPath();c.moveTo(cx,cy-26);c.lineTo(cx+32,cy);c.lineTo(cx,cy+26);c.lineTo(cx-32,cy);c.closePath();c.fill();c.fillStyle='#d8c39a';c.fillRect(cx-6,cy-6,12,12);}
  for(let i=0;i<60;i++){c.fillStyle=['#d8c39a','#1d2a3a','#b5442e'][i%3];const x=40+q()*(w-80),y=40+q()*(h-80);c.fillRect(x,y,4,4);}
  const im=c.getImageData(0,0,w,h),d=im.data;for(let i=0;i<d.length;i+=4){const k=.82+Math.random()*.25;d[i]*=k;d[i+1]*=k;d[i+2]*=k;}c.putImageData(im,0,0);});}
(function village(){const LR=.125,LS=.215,NL=12;const top=FL+.11+NL*LS;const bk=bucket();
  const charred=std({map:TX.bark,color:C(0x2a2420),roughness:1,envMapIntensity:.1});
  /* ribbed sheet tin, painted and weathered: ribs run down the slope (v), rust bleeding from the fixings */
  const tinTex=tex(256,256,(c,w,h)=>{c.fillStyle='#bdbdb6';c.fillRect(0,0,w,h);for(let x=0;x<w;x+=16){const g=c.createLinearGradient(x,0,x+16,0);g.addColorStop(0,'#8e8e88');g.addColorStop(.3,'#e6e6de');g.addColorStop(.55,'#c9c9c2');g.addColorStop(1,'#7c7c76');c.fillStyle=g;c.fillRect(x,0,16,h);}
    const q=rng(41);for(let i=0;i<70;i++){const x=(q()*16|0)*16+8,y=q()*h;const g=c.createLinearGradient(0,y,0,y+30+q()*60);g.addColorStop(0,'rgba(120,60,30,.55)');g.addColorStop(1,'rgba(120,60,30,0)');c.fillStyle=g;c.fillRect(x-3,y,6,90);}
    for(let i=0;i<500;i++){c.fillStyle=`rgba(${q()<.5?60:220},${q()<.5?55:215},${q()<.5?50:205},${q()*.12})`;c.fillRect(q()*w,q()*h,2,2);}});tinTex.wrapS=tinTex.wrapT=T.RepeatWrapping;
  const tinM=col=>std({map:tinTex,color:C(col).multiplyScalar(1.25),roughness:.5,metalness:.45,envMapIntensity:.55,side:T.DoubleSide});
  const plank=std({map:M.boards.map,color:C(0x9a8c78),roughness:1}),plankG=std({map:M.boards.map,color:C(0x8a8478),roughness:1}),stone=std({map:TX.whitewash,color:C(0x7c776c),roughness:1}),brick=std({map:TX.whitewash,color:C(0x8a4a38),roughness:.95});
  /* the garden: freshly hoed earth - crumbs and clods, a few stones, dry crust on the tops - and the plants: potato
     haulm (compound leaves of 5-7 leaflets on branching stems), cabbages (a tight pale head in a ruff of broad, veined,
     blue-green outer leaves), carrot and dill rows (fine feathery tufts) */
  const SOIL_T=tex(256,256,(c,w,h)=>{c.fillStyle='#3a2e25';c.fillRect(0,0,w,h);const q=rng(55);
    /* turned earth: a mottle of damp and drier patches, then crumbs of every size, each lit on top and dark beneath,
       soft-edged so they read as loose soil rather than tiles; a few pale grit stones */
    for(let i=0;i<70;i++){const x=q()*w,y=q()*h,r=10+q()*26,gr=c.createRadialGradient(x,y,0,x,y,r);const l=q()<.5;gr.addColorStop(0,l?'rgba(82,66,52,.35)':'rgba(20,14,10,.4)');gr.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=gr;c.fillRect(x-r,y-r,2*r,2*r);}
    for(let i=0;i<2600;i++){const x=q()*w,y=q()*h,r=.8+Math.pow(q(),2.5)*6;const gr=c.createRadialGradient(x-r*.3,y-r*.35,0,x,y,r);gr.addColorStop(0,`rgba(${88+q()*30|0},${70+q()*22|0},${55+q()*18|0},.75)`);gr.addColorStop(.6,'rgba(48,38,30,.6)');gr.addColorStop(1,'rgba(14,10,7,0)');
      c.fillStyle=gr;c.beginPath();c.ellipse(x,y,r,r*(.6+q()*.4),q()*3,0,7);c.fill();}
    for(let i=0;i<5000;i++){c.fillStyle=`rgba(${q()<.6?16:96},${q()<.6?12:80},${q()<.6?9:64},${.25+q()*.4})`;c.fillRect(q()*w,q()*h,1+q()*1.5,1+q()*1.5);}
    for(let i=0;i<30;i++){const x=q()*w,y=q()*h;c.fillStyle=`rgba(${120+q()*30|0},${112+q()*25|0},${100+q()*25|0},.65)`;c.beginPath();c.ellipse(x,y,1+q()*1.6,.8+q()*1.2,q()*3,0,7);c.fill();}});SOIL_T.wrapS=SOIL_T.wrapT=T.RepeatWrapping;SOIL_T.repeat.set(3,1);
  const leafTex=(draw)=>{const t=tex(128,128,(c,w,h)=>{c.clearRect(0,0,w,h);draw(c,w,h);},{clamp:true});return t;};
  const potL=leafTex((c,w,h)=>{const q=rng(3);c.strokeStyle='#3d5a22';c.lineWidth=3;c.beginPath();c.moveTo(w/2,h);c.lineTo(w/2,8);c.stroke();
    const lf=(x,y,a,s)=>{c.save();c.translate(x,y);c.rotate(a);const g=c.createLinearGradient(-10*s,0,10*s,0);g.addColorStop(0,'#2f4a1a');g.addColorStop(.5,'#557a32');g.addColorStop(1,'#2f4a1a');c.fillStyle=g;c.beginPath();c.ellipse(0,-14*s,9*s,15*s,0,0,7);c.fill();
      c.strokeStyle='rgba(150,180,110,.6)';c.lineWidth=1;c.beginPath();c.moveTo(0,0);c.lineTo(0,-27*s);for(let k=1;k<4;k++){c.moveTo(0,-7*k*s);c.lineTo(6*s,-7*k*s-5*s);c.moveTo(0,-7*k*s);c.lineTo(-6*s,-7*k*s-5*s);}c.stroke();c.restore();};
    lf(w/2,14,0,1.05);[[36,-1],[62,1],[88,-1]].forEach(([y,_],i)=>{lf(w/2,y,-1.15,.85-i*.08);lf(w/2,y,1.15,.85-i*.08);});[50,76].forEach(y=>{lf(w/2,y,-1.6,.38);lf(w/2,y,1.6,.38);});});
  const cabL=leafTex((c,w,h)=>{const g=c.createRadialGradient(w/2,h,10,w/2,h*.5,h*.6);g.addColorStop(0,'#a8c098');g.addColorStop(1,'#5e8a6e');c.fillStyle=g;c.beginPath();c.moveTo(w/2,h);c.bezierCurveTo(-10,h*.7,0,0,w/2,4);c.bezierCurveTo(w,0,w+10,h*.7,w/2,h);c.fill();
    c.strokeStyle='rgba(225,235,215,.75)';c.lineWidth=3;c.beginPath();c.moveTo(w/2,h);c.lineTo(w/2,10);c.stroke();c.lineWidth=1.3;for(let k=1;k<7;k++){const y=h-k*16;c.beginPath();c.moveTo(w/2,y);c.quadraticCurveTo(w/2-20,y-10,w/2-42+k*3,y-22);c.moveTo(w/2,y);c.quadraticCurveTo(w/2+20,y-10,w/2+42-k*3,y-22);c.stroke();}
    const q=rng(9);for(let i=0;i<30;i++){c.clearRect(q()*w,q()*h*.6,2+q()*3,2+q()*3);}});
  const headT=tex(128,128,(c,w,h)=>{c.fillStyle='#c8d8b0';c.fillRect(0,0,w,h);c.strokeStyle='rgba(240,245,230,.8)';c.lineWidth=2;for(let i=0;i<9;i++){c.beginPath();c.moveTo(i*16,h);c.bezierCurveTo(i*16+20,h*.6,i*16-10,h*.3,i*16+12,0);c.stroke();}
    c.strokeStyle='rgba(120,150,100,.5)';c.lineWidth=1;for(let i=0;i<40;i++){c.beginPath();const x=Math.random()*w,y=Math.random()*h;c.moveTo(x,y);c.lineTo(x+8,y-6);c.stroke();}});
  const fernL=leafTex((c,w,h)=>{c.strokeStyle='#4f7a2e';for(let k=0;k<7;k++){const x=w/2+(k-3)*8;c.lineWidth=1.6;c.beginPath();c.moveTo(w/2,h);c.quadraticCurveTo(x,h*.6,x+(k-3)*5,10+Math.abs(k-3)*8);c.stroke();
      for(let j=0;j<10;j++){const t=j/10,yy=h-(h-10)*t,xx=w/2+(x+(k-3)*5-w/2)*t;c.lineWidth=.9;c.beginPath();c.moveTo(xx,yy);c.lineTo(xx-5,yy-4);c.moveTo(xx,yy);c.lineTo(xx+5,yy-4);c.stroke();}}});
  /* plain concatenation (position, normal, uv) - the bucket merges these again by material */
  const mergeP=list=>{const P=[],N=[],U=[];for(let g of list){g=g.index?g.toNonIndexed():g;g.computeVertexNormals();P.push(...g.attributes.position.array);N.push(...g.attributes.normal.array);U.push(...g.attributes.uv.array);}
    const o=new T.BufferGeometry();o.setAttribute('position',new T.Float32BufferAttribute(P,3));o.setAttribute('normal',new T.Float32BufferAttribute(N,3));o.setAttribute('uv',new T.Float32BufferAttribute(U,2));return o;};
  const leafM=(t,col)=>std({map:t,color:C(col||0xffffff),alphaTest:.45,side:T.DoubleSide,roughness:.85,envMapIntensity:.25});
  const POT=leafM(potL,0xc8d8b8),CABO=leafM(cabL,0x8fae8a),CABH=std({map:headT,color:C(0x93ad80),roughness:.75,envMapIntensity:.2}),FERN=leafM(fernL);
  /* one potato plant: stems fanning out, each with its compound leaf, the young top leaves smaller and upright */
  const potGeo=(()=>{const parts=[];for(let i=0;i<14;i++){const a=i/14*6.28*2+(i%2)*.3,up=i<9?.85+(i%3)*.15:.3,s=i<9?1:.75;const g=new T.PlaneGeometry(.27*s,.33*s);g.translate(0,.165*s,0);g.rotateX(-up);g.rotateY(a);g.translate(Math.sin(a)*.04,i<9?.08+(i%3)*.07:.26,Math.cos(a)*.04);parts.push(g);}
    for(let i=0;i<4;i++){const st=new T.CylinderGeometry(.006,.009,.22,4);st.translate(0,.11,0);st.rotateZ((i%2?1:-1)*.35);st.rotateY(i*1.57);parts.push(st);}return mergeP(parts);})();
  const cabGeo=(()=>{const parts=[];for(let i=0;i<7;i++){const a=i/7*6.28,g=new T.PlaneGeometry(.26,.28,4,4);const p=g.attributes.position;for(let k=0;k<p.count;k++){const x=p.getX(k),y=p.getY(k)+.14;p.setZ(k,-Math.pow(x*3,2)*.06+Math.pow(y*2.6,2)*.05);p.setY(k,y);}
      g.computeVertexNormals();g.rotateX(-1.05-(i%2)*.2);g.rotateY(a);g.translate(0,.03,0);parts.push(g);}return mergeP(parts);})();
  const fernGeo=(()=>{const parts=[];for(let i=0;i<3;i++){const g=new T.PlaneGeometry(.18,.24);g.translate(0,.12,0);g.rotateY(i*1.05);parts.push(g);}return mergeP(parts);})();
  const soilM=std({map:SOIL_T,bumpMap:SOIL_T,bumpScale:.025,color:C(0xa08a78),roughness:1,envMapIntensity:.04}),clodM=std({map:SOIL_T,bumpMap:SOIL_T,bumpScale:.02,color:C(0xb09a88),roughness:1,envMapIntensity:.04}),furrowM=std({map:SOIL_T,bumpMap:SOIL_T,bumpScale:.025,color:C(0x85725f),roughness:1,envMapIntensity:.03}),leafG=std({color:C(0x4f6e30),roughness:.9}),cabb=std({color:C(0x8fae78),roughness:.8}),film=std({color:C(0xe8ece8),roughness:.35,transparent:true,opacity:.42,side:T.DoubleSide,depthWrite:false});
  const slateDS=M.slate.clone();slateDS.side=T.DoubleSide;
  const turfM=std({map:TX.whitewash,color:C(0x56693a),roughness:1,envMapIntensity:.1});
  /* a sloped quad roof face with its own uv: u along the eave, v down the slope (the ribs) */
  const face=(pts,uvs)=>{const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(pts.flat(),3));g.setAttribute('uv',new T.Float32BufferAttribute(uvs.flat(),2));g.computeVertexNormals();return g;};
  const quad=(a,b,c,d,ua,ub,va,vb)=>face([a,b,c,a,c,d],[[ua,va],[ub,va],[ub,vb],[ua,va],[ub,vb],[ua,vb]]);
  const tri=(a,b,c,u0,u1,uc,v0,v1)=>face([a,b,c],[[u0,v0],[u1,v0],[uc,v1]]);
  const buildHouses=()=>VILL.houses.forEach((hd,hi)=>{const W=hd.W,D=hd.D;const h=new T.Group();h.position.set(hd.x,0,hd.z);h.rotation.y=hd.yaw;scene.add(h);
    const wb=(a0,a1,b0,b1)=>{const r=villRect(hd,a0,a1,b0,b1);return solidAABB(r.x1,r.x2,r.z1,r.z2);};
    const paint=M.blue.clone();paint.color=C(hd.col);const logM=hd.burnt?charred:M.logs;const dx=hi%2?.6:.2,sd=hi%2?-1:1;
    const cladM=std({map:M.boards.map,color:C(hd.col).multiplyScalar(1.15),roughness:.85});
    mesh(rbox(W+.3,FL-.02+.5,D+.3,.04),M.concrete,0,(FL-.02)/2-.27,0,h);
    const dX0=dx-.95,dX1=dx+.05,wf=W/2-1.25,wide=W>8.5;
    const w3=-sd*(wf-1.7);const fW=wide?[[-wf-.5,-wf+.5],[wf-.5,wf+.5],[w3-.5,w3+.5]]:[[-wf-.5,-wf+.5],[wf-.5,wf+.5]];
    /* the back window lights the kitchen: between the stove and the partition in a big house, clear of the stove in a small one */
    const bwx=W>=8?sd*(1.05+(W/2-1.78-1.05)/2):sd*Math.min(.9,W/2-1.78-.62);
    const open={front:[[dX0,dX1,FL,FL+2.05],...fW.map(o=>[o[0],o[1],FL+.9,FL+2.0])],back:hd.dvor?[]:[[bwx-.5,bwx+.5,FL+.9,FL+2.0]],
      east:hi%2?[]:[[-.5,.5,FL+.9,FL+2.0]].concat(D>7?[[1.6,2.6,FL+.9,FL+2.0]]:[]),west:hi%2?[[-.5,.5,FL+.9,FL+2.0]]:[]};
    /* the log walls, opening by opening; a clad house gets a skin of painted lap boards outside the logs */
    const logs=[],boards=[];const addLog=(axis,c,a0,a1,y)=>{const L=a1-a0;if(L<.05)return;const g=new T.CylinderGeometry(LR,LR,L,10,1);const uv=g.attributes.uv;for(let i=0;i<uv.count;i++){const u=uv.getX(i),v=uv.getY(i);uv.setXY(i,v*L*.45,u);}
      if(axis==='x'){g.rotateZ(Math.PI/2);g.translate((a0+a1)/2,y,c);}else{g.rotateX(Math.PI/2);g.translate(c,y,(a0+a1)/2);}logs.push(g);};
    const addBoard=(axis,c,a0,a1,y,out)=>{const L=a1-a0;if(L<.05)return;const g=new T.BoxGeometry(axis==='x'?L:.025,LS*.92,axis==='x'?.025:L);g.rotateX(axis==='x'?out*.07:0);g.rotateZ(axis==='x'?0:-out*.07);g.translate(axis==='x'?(a0+a1)/2:c,y,axis==='x'?c:(a0+a1)/2);boards.push(g);};
    const segsFor=(nm,half,ext,y,yr)=>{let segs=[[-half-ext,half+ext]];open[nm].forEach(o=>{if(y+yr<o[2]||y-yr>o[3])return;const ns=[];segs.forEach(s=>{if(o[1]<=s[0]||o[0]>=s[1]){ns.push(s);return;}if(o[0]>s[0])ns.push([s[0],o[0]]);if(o[1]<s[1])ns.push([o[1],s[1]]);});segs=ns;});return segs;};
    const WALLS=[['front',D/2,'x',1],['back',-D/2,'x',-1],['east',W/2,'z',1],['west',-W/2,'z',-1]];
    for(let k=0;k<NL;k++){const y=FL+.11+k*LS;
      WALLS.forEach(([nm,c,axis])=>{const half=(axis==='x'?W:D)/2;const ext=hd.clad?0:((k%2===0)===(axis==='x'))?.28:0;const yy=axis==='x'?y:y+LS/2;segsFor(nm,half,ext,y,LR*.5).forEach(s=>addLog(axis,c,s[0],s[1],yy));});}
    if(hd.clad)for(let y=FL-.05;y<top+.05;y+=LS*.92)WALLS.forEach(([nm,c,axis,o])=>{const half=(axis==='x'?W:D)/2+LR+.03;segsFor(nm,half,0,y,LS*.42).forEach(s=>addBoard(axis,c+o*(LR+.035),s[0],s[1],y,o));});
    addLog('z',W/2,-D/2,D/2,FL+.11-LS/2);addLog('z',-W/2,-D/2,D/2,FL+.11-LS/2);addLog('x',D/2,-W/2-(hd.clad?0:.28),W/2+(hd.clad?0:.28),top);addLog('x',-D/2,-W/2-(hd.clad?0:.28),W/2+(hd.clad?0:.28),top);
    shootables.push(mesh(merge(logs),logM,0,0,0,h));
    /* inside a lived-in house the logs are lined: wallpaper on battens over the logs in most, lime-washed plaster in some,
       cut round every window and the door, a painted skirting board along the floor */
    if(hd.enter){const lin=hi%4===2?wallLime(hi):wallPaper(hi);const IN=LR+.012,y0=FL+.03,y1=top-.08,parts=[],cas=[];
      /* a painted casing round each opening, standing a little proud of the lining */
      const casing=(lo,hi2,c0,c1,place,door)=>{const bw=.075,bx=(w,h_,cx,cy)=>{const g=new T.BoxGeometry(w,h_,.022);g.translate(cx,cy,.011);place(g);cas.push(g);};
        bx(bw,c1-c0+(door?bw:2*bw),lo-bw/2,(c0+c1)/2+(door?bw/2:0));bx(bw,c1-c0+(door?bw:2*bw),hi2+bw/2,(c0+c1)/2+(door?bw/2:0));bx(hi2-lo,bw,(lo+hi2)/2,c1+bw/2);if(!door)bx(hi2-lo,bw,(lo+hi2)/2,c0-bw/2);};
      const wallPiece=(a0,a1,holes,place)=>{const sh=new T.Shape();sh.moveTo(a0,y0);sh.lineTo(a1,y0);sh.lineTo(a1,y1);sh.lineTo(a0,y1);sh.closePath();
        holes.forEach(([b0,b1,c0,c1])=>{const lo=Math.max(b0,a0+.02),hi2=Math.min(b1,a1-.02);if(hi2<=lo)return;const hp=new T.Path();const yy0=Math.max(c0,y0+.01);
          if(yy0<=y0+.011){/* a doorway: notch from the floor */return;}hp.moveTo(lo,yy0);hp.lineTo(hi2,yy0);hp.lineTo(hi2,c1);hp.lineTo(lo,c1);hp.closePath();sh.holes.push(hp);casing(lo,hi2,yy0,c1,place,false);});
        const g=new T.ShapeGeometry(sh);const p=g.attributes.position,uv=g.attributes.uv;for(let i=0;i<p.count;i++)uv.setXY(i,p.getX(i)*1.8,p.getY(i)*1.8);place(g);parts.push(g);};
      /* doorways reach the floor: split the wall there instead of cutting a hole */
      const runs=(a0,a1,holes)=>{let segs=[[a0,a1]];holes.filter(o=>o[2]<=FL+.05).forEach(o=>{const ns=[];segs.forEach(sg=>{if(o[1]<=sg[0]||o[0]>=sg[1]){ns.push(sg);return;}if(o[0]>sg[0])ns.push([sg[0],o[0]]);if(o[1]<sg[1])ns.push([o[1],sg[1]]);});segs=ns;});
        /* and the lintel over the doorway */const door=holes.filter(o=>o[2]<=FL+.05);return{segs,door};};
      const doWall=(nm,len,mirror,place)=>{const L2=len/2-LR;const H_=open[nm].map(o=>mirror?[-o[1],-o[0],o[2],o[3]]:o);const {segs,door}=runs(-L2,L2,H_);
        segs.forEach(([a0,a1])=>wallPiece(a0,a1,H_.filter(o=>o[2]>FL+.05&&o[0]<a1&&o[1]>a0),place));
        door.forEach(o=>{casing(o[0],o[1],o[2],o[3],place,true);const sh=new T.Shape();sh.moveTo(o[0],o[3]);sh.lineTo(o[1],o[3]);sh.lineTo(o[1],y1);sh.lineTo(o[0],y1);sh.closePath();const g=new T.ShapeGeometry(sh);const p=g.attributes.position,uv=g.attributes.uv;for(let i=0;i<p.count;i++)uv.setXY(i,p.getX(i)*1.8,p.getY(i)*1.8);place(g);parts.push(g);});};
      doWall('back',W,false,g=>g.translate(0,0,-D/2+IN));
      doWall('front',W,true,g=>{g.rotateY(Math.PI);g.translate(0,0,D/2-IN);});
      doWall('east',D,false,g=>{g.rotateY(-Math.PI/2);g.translate(W/2-IN,0,0);});
      doWall('west',D,true,g=>{g.rotateY(Math.PI/2);g.translate(-W/2+IN,0,0);});
      parts.forEach(g=>{g.deleteAttribute('normal');g.computeVertexNormals();});mesh(merge(parts),lin,0,0,0,h,false).userData.inside=hd.id;if(cas.length)mesh(merge(cas),M.trimWhite,0,0,0,h,false).userData.inside=hd.id;
      /* skirting */const sk=std({map:RF.PAINT.map,color:C(hi%2?0x8a5a3a:0x6a4a34),roughness:.6});
      [[0,-D/2+IN+.012,W-2*LR,'x'],[W/2-IN-.012,0,D-2*LR,'z'],[-W/2+IN+.012,0,D-2*LR,'z']].forEach(([x,z,L,ax])=>{mesh(rbox(ax==='x'?L:.024,.1,ax==='x'?.024:L,.006),sk,x,FL+.08,z,h).userData.inside=hd.id;});
      [[-W/2+LR,dX0],[dX1,W/2-LR]].forEach(([a,b])=>{if(b-a>.05)mesh(rbox(b-a,.1,.024,.006),sk,(a+b)/2,FL+.08,D/2-IN-.012,h).userData.inside=hd.id;});}
    if(boards.length){shootables.push(mesh(merge(boards),cladM,0,0,0,h));
      /* white corner boards and the skirting board */[[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([sx,sz])=>mesh(rbox(.16,top-FL+.2,.16,.01),M.trimWhite,sx*(W/2+LR+.05),(top+FL)/2,sz*(D/2+LR+.05),h));
      [[0,D/2,W+.5,'x'],[0,-D/2,W+.5,'x'],[W/2,0,D+.5,'z'],[-W/2,0,D+.5,'z']].forEach(([x,z,L,ax])=>mesh(rbox(ax==='x'?L:.06,.18,ax==='x'?.06:L,.01),M.trimWhite,x+(ax==='z'?Math.sign(x)*(LR+.06):0),FL-.02,z+(ax==='x'?Math.sign(z)*(LR+.06):0),h));}
    wb(-W/2-.15,W/2+.15,-D/2-.15,-D/2+.15);wb(-W/2-.15,-W/2+.15,-D/2,D/2);wb(W/2-.15,W/2+.15,-D/2,D/2);wb(-W/2,dX0,D/2-.15,D/2+.15);wb(dX1,W/2,D/2-.15,D/2+.15);
    shootables.push(mesh(rbox(W-.2,.06,D-.2,.01),M.planks,0,FL,0,h));mesh(rbox(W-.1,.06,D-.1,.01),M.planks,0,top-.05,0,h);
    /* door */
    const door=new T.Group();door.position.set(dX0,FL,D/2-.02);h.add(door);
    mesh(rbox(1.0,2.02,.06,.01),hd.burnt?charred:M.boards,.5,1.01,0,door);[.3,1.7].forEach(y=>mesh(rbox(.9,.12,.04,.01),M.boards,.5,y,-.05,door));mesh(new T.SphereGeometry(.03,8,6),M.rust,.88,1.0,.05,door);
    const dsol=wb(dX0,dX1,D/2-.12,D/2+.12);
    if(hd.enter){const st={g:door,open:false};dsol.door=st;DOORS.push(st);interact.push({obj:door,off:V3(.5,1,0),label:'Open door',r:2.2,fn(){st.open=!st.open;this.label=st.open?'Close door':'Open door';sfx.creak();}});}
    else[[.55,.3],[1.45,-.25]].forEach(([y,rz])=>{const b=mesh(rbox(1.3,.14,.03,.01),M.boards,.5,y,.06,door);b.rotation.z=rz;});
    /* windows: carved white frames standing proud of the wall, painted shutters, glass, net curtains */
    const po=hd.clad?.06:0;
    const win=(x,z,ry,broken,boarded)=>{const g=new T.Group();g.position.set(x,FL+1.45,z);g.rotation.y=ry;h.add(g);
      [[0,.58,1.2,.1],[0,-.6,1.25,.12],[-.55,0,.1,1.25],[.55,0,.1,1.25]].forEach(b=>mesh(rbox(b[2],b[3],.07,.01),M.trimWhite,b[0],b[1],.15+po,g));
      const ped=new T.Shape();ped.moveTo(-.7,0);ped.lineTo(.7,0);ped.lineTo(.5,.22);ped.quadraticCurveTo(0,.42,-.5,.22);ped.closePath();mesh(new T.ExtrudeGeometry(ped,{depth:.04,bevelEnabled:false}),M.trimWhite,0,.62,.13+po,g);
      mesh(rbox(.08,1.15,.04,.01),paint,0,0,.06,g);mesh(rbox(1,.06,.04,.01),paint,0,.15,.06,g);
      if(!broken)mesh(new T.PlaneGeometry(1,1.1),M.glass,0,0,.04,g);else{const sh=new T.Shape();sh.moveTo(-.5,-.55);sh.lineTo(.5,-.55);sh.lineTo(.5,-.1);sh.lineTo(.1,-.3);sh.lineTo(-.2,.1);sh.lineTo(-.5,-.2);sh.closePath();mesh(new T.ShapeGeometry(sh),M.glass,0,0,.04,g);}
      if(!boarded)mesh(new T.PlaneGeometry(.95,.7),std({map:TX.cloth,color:C(0xe8e2d2),roughness:1,transparent:true,opacity:.75,side:T.DoubleSide}),0,.15,-.05,g,false);
      [-1,1].forEach(s=>{const sh=new T.Group();sh.position.set(s*.62,0,.178+po);g.add(sh);sh.rotation.y=-s*(broken&&s>0?.95:.1);mesh(rbox(.55,1.15,.04,.01),paint,s*.29,0,0,sh);mesh(rbox(.4,.06,.05,.01),M.trimWhite,s*.29,.3,0,sh);});
      if(boarded)[[.25,.12],[-.2,-.1],[-.5,.05]].forEach(([y,rz])=>{const b=mesh(rbox(1.35,.15,.03,.01),M.boards,0,y,.21+po,g);b.rotation.z=rz;});
      mesh(rbox(1.1,.05,.25,.01),M.boards,0,-.6,-.2,g);};
    const bo=!!hd.boarded;fW.forEach((o,i)=>win((o[0]+o[1])/2,D/2,0,bo||(hi===2&&i===1),bo));if(!hd.dvor)win(bwx,-D/2,Math.PI,bo,bo);
    if(hi%2)win(-W/2,0,-Math.PI/2,bo,bo);else{win(W/2,0,Math.PI/2,bo||hi===0,bo);if(D>7)win(W/2,2.1,Math.PI/2,bo,bo);}
    /* the roof: overhanging eaves; gable roofs carry painted board gables, hip roofs slope on all four sides */
    const ov=.55,ridge=top+(hd.hip?1.5:1.6),eave=top-.2,ex=W/2+(hd.hip?ov:.6),ez=D/2+ov;
    const roofM=hd.roof==='tin'?tinM(hd.rc||0x6a6e70):(hd.hip?slateDS:M.slate);
    if(hd.roof==='slate'&&!hd.hip){const slope=Math.hypot(ez,ridge-eave),pitch=Math.atan2(ridge-eave,ez);
      const sheet=G('vsheet'+D,()=>{const g=new T.PlaneGeometry(1.12,slope,28,1);const p=g.attributes.position;for(let i=0;i<p.count;i++)p.setZ(i,Math.sin(p.getX(i)/.167*Math.PI*2)*.018);g.computeVertexNormals();return g;});
      const nS=Math.ceil(2*ex/1.03);[-1,1].forEach(s=>{for(let i=0;i<nS;i++){if(hd.burnt&&s>0&&(i===2||i===3||i===4))continue;const m=mesh(sheet,roofM,-ex+.55+i*1.03,(ridge+eave)/2,s*ez/2,h);m.rotation.set(s>0?-(Math.PI/2-pitch):Math.PI/2-pitch,0,0);shootables.push(m);}});
      mesh(rbox(2*ex+.1,.08,.36,.02),roofM,0,ridge+.02,0,h);}
    else{const rx=hd.hip?Math.max(.2,W/2-D/2):ex;const sl=Math.hypot(ez,ridge-eave)*1.6;const parts=[];
      parts.push(quad([-ex,eave,ez],[ex,eave,ez],[rx,ridge,0],[-rx,ridge,0],-ex,ex,0,sl),quad([ex,eave,-ez],[-ex,eave,-ez],[-rx,ridge,0],[rx,ridge,0],-ex,ex,0,sl));
      if(hd.hip){const sl2=Math.hypot(ex-rx,ridge-eave)*1.6;parts.push(tri([ex,eave,ez],[ex,eave,-ez],[rx,ridge,0],-ez,ez,0,0,sl2),tri([-ex,eave,-ez],[-ex,eave,ez],[-rx,ridge,0],-ez,ez,0,0,sl2));}
      const rm=mesh(merge(parts),roofM,0,0,0,h);shootables.push(rm);mesh(rbox(2*rx+.2,.08,.2,.02),roofM,0,ridge+.01,0,h);
      /* fascia boards along the eaves */[[0,ez,2*ex,'x'],[0,-ez,2*ex,'x']].concat(hd.hip?[[ex,0,2*ez,'z'],[-ex,0,2*ez,'z']]:[]).forEach(([x,z,L,ax])=>mesh(rbox(ax==='x'?L:.04,.16,ax==='x'?.04:L,.01),M.trimWhite,x,eave-.07,z,h));}
    if(!hd.hip)[-1,1].forEach(s=>{const gs=new T.Shape();gs.moveTo(-D/2-.1,0);gs.lineTo(D/2+.1,0);gs.lineTo(0,ridge-top+.05);gs.closePath();const gg=new T.ExtrudeGeometry(gs,{depth:.05,bevelEnabled:false});worldUV(gg,1);
      const gm=mesh(gg,hd.burnt?charred:hd.clad?cladM:paint,s*(W/2+(hd.clad?LR+.06:.05)),top-.02,0,h);gm.rotation.y=s*Math.PI/2;
      /* the attic window in the gable, with its own little carved frame */mesh(rbox(.06,.5,.4,.01),M.dark,s*(W/2+(hd.clad?LR+.1:.1)),top+.6,0,h);mesh(rbox(.05,.62,.52,.01),M.trimWhite,s*(W/2+(hd.clad?LR+.09:.09)),top+.6,0,h);});
    {const cx=hi%2?-W/2+1.2:W/2-1.2;mesh(rbox(.52,2.4,.52,.03),brick,cx,ridge-.3,-.4,h);mesh(rbox(.62,.1,.62,.02),brick,cx,ridge+.92,-.4,h);}
    /* in front of the door: a glazed veranda (the small one round the door, or one across the whole front), or an open porch */
    if(hd.ver){const vw=hd.ver===2?W-.4:3.2,vd=2.3,vx=hd.ver===2?0:dx-.45,vz=D/2+vd/2+.02;const vg=new T.Group();vg.position.set(vx,0,vz);h.add(vg);
      mesh(rbox(vw,FL+.25,vd,.01),M.concrete,0,(FL-.25)/2,0,vg);mesh(rbox(vw-.1,.05,vd-.1,.01),M.planks,0,FL+.005,0,vg);
      const dw=1.0,dxx=(hd.ver===2?dX0+.5-vx:0);
      /* lower walls of boards, the glazing above in small panes behind white glazing bars, posts at the corners */
      const sides=[['f',vd/2,vw,'x'],['l',-vw/2,vd,'z'],['r',vw/2,vd,'z']];
      sides.forEach(([k,c,L,ax])=>{const segs=k==='f'?[[-L/2,dxx-dw/2],[dxx+dw/2,L/2]]:[[-L/2,L/2]];
        segs.forEach(([a,b])=>{if(b-a<.05)return;const len=b-a,mid=(a+b)/2;const px=ax==='x'?mid:c,pz=ax==='x'?c:mid;
          mesh(rbox(ax==='x'?len:.08,.9,ax==='x'?.08:len,.01),cladM,px,FL+.45,pz,vg);mesh(rbox(ax==='x'?len:.12,.06,ax==='x'?.12:len,.01),M.trimWhite,px,FL+.92,pz,vg);
          mesh(new T.PlaneGeometry(len,1.1),M.glass,px,FL+1.5,pz,vg).rotation.y=ax==='x'?0:Math.PI/2;
          const n=Math.max(1,Math.round(len/.45));for(let i=0;i<=n;i++){const t=a+len*i/n;mesh(rbox(.05,1.15,.06,.005),M.trimWhite,ax==='x'?t:c,FL+1.5,ax==='x'?c:t,vg);}
          [1.15,1.85,2.08].forEach(y=>mesh(rbox(ax==='x'?len:.06,.05,ax==='x'?.06:len,.005),M.trimWhite,px,FL+y-(y===1.15?.0:0),pz,vg));});});
      [[-vw/2,vd/2],[vw/2,vd/2]].forEach(([x,z])=>mesh(rbox(.12,2.2,.12,.01),M.trimWhite,x,FL+1.1,z,vg));
      const vr=mesh(rbox(vw+.3,.05,vd+.25,.01),roofM,0,FL+2.25,.105+LR+(hd.clad?.06:0),vg);vr.rotation.x=.16;
      /* the steps up to its doorway */mesh(rbox(1.2,FL*.5,.35,.01),M.boards,dxx,FL*.25,vd/2+.2,vg);
      const vr0=villRect(hd,vx-vw/2,vx+vw/2,D/2,D/2+vd);PORCHES.push(Object.assign(vr0,{y:FL}));const st=villRect(hd,vx+dxx-.6,vx+dxx+.6,D/2+vd,D/2+vd+.4);PORCHES.push(Object.assign(st,{y:FL*.5}));
      if(hd.enter)HOUSES.push(villRect(hd,vx-vw/2,vx+vw/2,D/2,D/2+vd));
      wb(vx-vw/2-.06,vx-vw/2+.06,D/2,D/2+vd);wb(vx+vw/2-.06,vx+vw/2+.06,D/2,D/2+vd);wb(vx-vw/2,vx+dxx-dw/2,D/2+vd-.06,D/2+vd+.06);wb(vx+dxx+dw/2,vx+vw/2,D/2+vd-.06,D/2+vd+.06);}
    else{const porch=new T.Group();porch.position.set(dx-.45,0,D/2+.75);h.add(porch);
      mesh(rbox(1.8,FL+.2,1.3,.01),M.boards,0,(FL-.2)/2,0,porch);mesh(rbox(1.8,FL*.5+.1,.32,.01),M.boards,0,FL*.25-.05,.75,porch);[-.85,.85].forEach(x=>mesh(rbox(.1,2.6,.1,.01),M.post,x,1.15,.55,porch));
      const pr=mesh(rbox(2.2,.05,1.6,.01),roofM,0,2.5,.05+LR+(hd.clad?.06:0),porch);pr.rotation.x=.18;
      PORCHES.push(Object.assign(villRect(hd,dx-1.35,dx+.45,D/2,D/2+1.45),{y:FL}),Object.assign(villRect(hd,dx-1.35,dx+.45,D/2+1.45,D/2+1.75),{y:FL*.5}));}
    /* the covered yard behind, under its own lower roof: weathered vertical boards, a pair of cart doors in the side */
    if(hd.dvor){const L=7.2,z0=-D/2-L/2,hh=3.4;const dv=new T.Group();h.add(dv);
      const pl=[];for(let x=-W/2;x<W/2;x+=.22)for(const zz of [-D/2-L]){const g=new T.BoxGeometry(.21,hh,.035);g.translate(x+.11,hh/2,zz);pl.push(g);}
      for(let z=-D/2-L;z<-D/2;z+=.22)for(const xx of [-W/2,W/2]){if(xx>0&&z>z0-1.3&&z<z0+1.3)continue;const g=new T.BoxGeometry(.035,hh,.21);g.translate(xx,hh/2,z+.11);pl.push(g);}
      shootables.push(mesh(merge(pl),plankG,0,0,0,dv));
      const dd=new T.Group();dd.position.set(W/2+.02,0,z0);dv.add(dd);[-1,1].forEach(s=>{const d=mesh(rbox(.05,2.8,1.25,.01),plankG,0,1.4,s*.64,dd);d.rotation.y=s*.04;});mesh(rbox(.08,.1,2.7,.01),M.post,.03,2.85,0,dd);
      const er=hd.roof==='tin'?tinM(hd.rc||0x6a6e70):slateDS;const rL=L+.4,rr2=hh+1.2;const sl=Math.hypot(W/2+.5,1.2)*1.6;
      const dp=[quad([-W/2-.5,hh,-D/2-L-.3],[-W/2-.5,hh,-D/2+.05],[0,rr2,-D/2+.05],[0,rr2,-D/2-L-.3],-rL,0,0,sl),quad([W/2+.5,hh,-D/2+.05],[W/2+.5,hh,-D/2-L-.3],[0,rr2,-D/2-L-.3],[0,rr2,-D/2+.05],-rL,0,0,sl)];
      shootables.push(mesh(merge(dp),er,0,0,0,dv));
      const gs=new T.Shape();gs.moveTo(-W/2,0);gs.lineTo(W/2,0);gs.lineTo(0,1.2);gs.closePath();const gg=new T.ExtrudeGeometry(gs,{depth:.04,bevelEnabled:false});worldUV(gg,1);mesh(gg,plankG,0,hh,-D/2-L,dv);
      wb(-W/2-.1,W/2+.1,-D/2-L-.1,-D/2-L+.1);wb(-W/2-.1,-W/2+.1,-D/2-L,-D/2);wb(W/2-.1,W/2+.1,-D/2-L,-D/2);}
    PLOT(hd,hi,W,D,dx);
    if(hd.enter)HOUSES.push(villRect(hd,-W/2,W/2,-D/2,D/2));
    /* (everything inside is tagged: it is merged per house and not drawn from more than ~32 m away) */
    if(hd.enter){const n0=h.children.length;furnish(h,hd,hi,W,D,wb,top);for(let i=n0;i<h.children.length;i++)h.children[i].userData.inside=hd.id;}
    h.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true;}});});
  /* ---- inside: the same layout as an izba always has, different in every house - the stove in a back corner with the
     kitchen by it, the red corner (icon, embroidered towel) over the table diagonally opposite, the bed under a carpet,
     the family's photographs, a clock, rag runners on the boards; left in a hurry: a chair over, papers on the floor ---- */
  function furnish(h,hd,hi,W,D,wb,top){const sd=hi%2?-1:1;
    {const sg=new T.Group();sg.scale.x=sd;sg.userData.noMerge=true;h.add(sg);russianStove(sg,W/2-.98,FL,-D/2+1.05,top-FL-.06);}wb(sd>0?W/2-1.78:-W/2+.18,sd>0?W/2-.18:-W/2+1.78,-D/2+.1,-D/2+2.05);
    {const dx=hi%2?.6:.2,lo=W>=8?1.13:(sd>0?dx+.05:-(dx-.95))+.05,hi_=W/2-1.25-.55,wx=sd*(lo+hi_)/2;washstand(h,wx,FL,D/2-.33,Math.PI);wb(wx-.3,wx+.3,D/2-.55,D/2-.1);}
    wardrobe(h,-sd*(W/2-.45),FL,-D/2+.95,sd*Math.PI/2);wb(sd>0?-W/2+.1:W/2-.8,sd>0?-W/2+.8:W/2-.1,-D/2+.3,-D/2+1.6);
    wallClock(h,-sd*.6,FL+1.85,-D/2+.15,0);
    ragRunner(h,0,FL+.034,.2,D-1.6,.7,.06*sd);ragRunner(h,-sd*1.1,FL+.034,-.6,1.4,.6,Math.PI/2);
    /* bed along the side wall with the carpet over it */
    const bed=new T.Group();bed.position.set(-sd*(W/2-.6),FL,.4);h.add(bed);const iron=std({color:C(0x2c3034),roughness:.5,metalness:.7});
    [[-.45,-1.0],[.45,-1.0],[-.45,1.0],[.45,1.0]].forEach(p=>mesh(new T.CylinderGeometry(.018,.018,p[1]<0?1.0:.75,6),iron,p[0],p[1]<0?.5:.375,p[1],bed));
    [-1.0,1.0].forEach(z=>{mesh(xf(new T.CylinderGeometry(.015,.015,.9,6),0,0,0,0,0,Math.PI/2),iron,0,z<0?.95:.7,z,bed);for(let i=0;i<5;i++)mesh(new T.CylinderGeometry(.008,.008,.35,10),iron,-.36+i*.18,z<0?.78:.55,z,bed);});
    /* mattress in its white sheet, the coverlet laid over it and hanging down the sides a little */mesh(rbox(.86,.14,1.9,.05),RF.LINEN,0,.49,0,bed);
      {const qm=RF.quilt(hi);qm.side=T.DoubleSide;mesh(new T.BoxGeometry(.92,.025,1.7),qm,0,.57,.1,bed);[-1,1].forEach(sx=>{const m=mesh(new T.PlaneGeometry(1.7,.13),qm,sx*.46,.505,.1,bed);m.rotation.y=sx*Math.PI/2;});}pillowStack(bed,0,.57,-.72,0);{const v=mesh(new T.PlaneGeometry(1.92,.22),RF.LEDGE,sd*.455,.38,0,bed,false);v.rotation.y=Math.PI/2;}
    wb(sd>0?-W/2+.15:W/2-1.05,sd>0?-W/2+1.05:W/2-.15,-.65,1.45);
    const cp=mesh(new T.PlaneGeometry(1.5,2.1),std({map:carpetTex(hi),roughness:1,envMapIntensity:.1}),-sd*(W/2-.14),FL+1.45,.4,h,false);cp.rotation.y=sd*Math.PI/2;
    /* table with oilcloth in the red corner, the bench along the wall, chairs */
    const tx=-sd*(W/2-.75),tz=D/2-.75;const table=new T.Group();table.position.set(tx,FL,tz);h.add(table);
    mesh(rbox(1.12,.05,.76,.01),RF.PAINT,0,.74,0,table);mesh(rbox(1.16,.006,.8,.002),std({map:KLEENKA,roughness:.35,envMapIntensity:.6}),0,.768,0,table);
    [[-.5,-.32],[.5,-.32],[-.5,.32],[.5,.32]].forEach(p=>mesh(rbox(.05,.72,.05,.01),RF.PAINT,p[0],.36,p[1],table));[[0,.66,-.32,1.0,'x'],[0,.66,.32,1.0,'x'],[-.5,.66,0,.6,'z'],[.5,.66,0,.6,'z']].forEach(([x,y,z,L,ax])=>mesh(rbox(ax==='x'?L:.025,.09,ax==='x'?.025:L,.006),RF.PAINT,x,y,z,table));RF.fin(table);wb(tx-.58,tx+.58,tz-.4,tz+.4);
    mesh(new T.CylinderGeometry(.06,.05,.1,12),M.enamel,.25,.82,-.1,table);mesh(lathe([[0,0],[.05,0],[.06,.05],[.04,.1],[.02,.12],[.035,.16],[.04,.22],[.02,.26],[0,.26]],12),M.glass,-.3,.77,.15,table);
    const chair=(x,z,ry,fall)=>{const c=new T.Group();c.position.set(x,FL,z);c.rotation.y=ry;h.add(c);if(fall){c.rotation.set(0,ry,Math.PI/2);c.position.y=FL+.22;}
      /* a plain kitchen chair: the back legs run on up as the uprights, two back rails between them, stretchers low down */
      mesh(rbox(.42,.04,.42,.01),RF.PAINT,0,.45,0,c);[[-.18,.18],[.18,.18]].forEach(p=>mesh(rbox(.035,.45,.035,.005),RF.PAINT,p[0],.225,p[1],c));
      [-.18,.18].forEach(x=>{const u=mesh(rbox(.035,.92,.035,.005),RF.PAINT,x,.46,-.185,c);u.rotation.x=-.04;});[.66,.84].forEach(y=>mesh(rbox(.36,.07,.022,.005),RF.PAINT,0,y,-.193-(y-.46)*.04,c));
      [[0,.12,.18,'x'],[0,.12,-.18,'x'],[-.18,.17,0,'z'],[.18,.17,0,'z']].forEach(([x,y,z,ax])=>mesh(rbox(ax==='x'?.36:.022,.025,ax==='x'?.022:.36,.004),RF.PAINT,x,y,z,c));RF.fin(c);};
    if(hi%3===1){chair(tx+sd*.75,tz-.1,sd*Math.PI/2,false);chair(sd*.3,.6,1.2+hi,hi%2===0);}
    else{viennaChair(h,tx+sd*.78,FL,tz-.1,sd*Math.PI/2,false);viennaChair(h,sd*.3,FL,.6,1.2+hi,hi%2===0);}
    /* against the back wall of the living room: the sideboard, or the chest of drawers under its mirror, or the dowry
       chest beside the television - a different house, a different family */
    {const v=hi%3,bz=-D/2+.13;
     if(v===0){servant(h,-sd*1.6,FL,bz+.24,0);wb(sd>0?-2.3:.9,sd>0?-.9:2.3,bz,bz+.5);}
     else if(v===1){komod(h,-sd*1.55,FL,bz+.24,0,true);wb(sd>0?-2.05:1.05,sd>0?-1.05:2.05,bz,bz+.5);}
     else{sunduk(h,-sd*1.75,FL,bz+.28,0,[0x5a3828,0x2e4a3a,0x4a2a2a][hi%3]);wb(sd>0?-2.25:1.25,sd>0?-1.25:2.25,bz,bz+.56);tvRubin(h,-sd*.55,FL,bz+.25,0);wb(sd>0?-.88:.22,sd>0?-.22:.88,bz,bz+.5);}}
    /* the big houses' living rooms: the round table under the silk lampshade with its bentwood chairs, the sewing machine
       under the window, a woven rug of deer on the partition */
    if(W>=8){const rx=-sd*(W/2-2.4),rz=.9;roundTable(h,rx,FL,rz,['#7a2a26','#2a4a6a','#5a4a2a'][hi%3]);abazhur(h,rx,rz,top-.05,[0xd06a30,0xc0a040,0xb04040][hi%3]);wb(rx-.5,rx+.5,rz-.5,rz+.5);
      [0,2.2,4.2].forEach(a=>viennaChair(h,rx+Math.sin(a)*.72,FL,rz+Math.cos(a)*.72,a+Math.PI));
      sewingMachine(h,-sd*(W/2-2.1),FL,D/2-.35,Math.PI);wb(-sd*(W/2-2.1)-.38,-sd*(W/2-2.1)+.38,D/2-.6,D/2-.1);
      deerRug(h,sd*(1.05-.035),FL+1.45,-1.5,-sd*Math.PI/2,1.0,.72);}
    else if(hi%2===0){sewingMachine(h,sd*(W/2-1.0),FL,.9,-sd*Math.PI/2);wb(sd*(W/2-1.0)-.25,sd*(W/2-1.0)+.25,.5,1.3);}
    /* the red corner: icon on its shelf, the embroidered towel over it */
    const ix=-sd*(W/2-.35),iz=D/2-.35;mesh(rbox(.3,.04,.3,.01),M.boards,ix,FL+1.75,iz,h);mesh(new T.PlaneGeometry(.2,.27),M.icon,ix+sd*.05,FL+1.92,iz-.05,h).rotation.y=sd>0?Math.PI*.75:-Math.PI*.75;
    mesh(new T.PlaneGeometry(.12,.6),std({color:C(0xd8d0c0),map:TX.cloth,roughness:1,side:T.DoubleSide}),ix+sd*.03,FL+1.7,iz-.03,h).rotation.y=sd>0?Math.PI*.75:-Math.PI*.75;lampada(h,ix+sd*.06,FL+1.73,iz-.06);
    /* the family's photographs on the back wall, a calendar, a shelf with jars */
    for(let i=0;i<2+hi%3;i++){const fx=-sd*(1.0+i*.36),fy=FL+2.12-(i%2)*.06;mesh(rbox(.24,.3,.02,.004),std({color:C(0x3a2a1c),roughness:.6}),fx,fy,-D/2+.15,h);mesh(new T.PlaneGeometry(.19,.24),std({map:photoTex(hi*7+i),roughness:.5}),fx,fy,-D/2+.162,h,false);}
    mesh(new T.PlaneGeometry(.28,.42),M.calendar,sd*(W/2-.15),FL+1.55,.9,h).rotation.y=-sd*Math.PI/2;
    const shX=W>=8?sd*1.22:sd*(W/2-.3);mesh(rbox(.28,.04,1.0,.01),M.boards,shX,FL+1.6,1.7,h);[1.4,1.6,1.8].forEach(z=>mesh(new T.CylinderGeometry(.045,.045,.16,10),M.glass,shX,FL+1.7,z,h));
    [1.3,2.1].forEach(z=>{const b=mesh(rbox(.03,.2,.03,.004),M.boards,shX+(W>=8?-sd:sd)*.1,FL+1.48,z,h);});
    /* a big house is two rooms: a whitewashed plank partition from the back wall to the front, the kitchen with the
       stove on one side, the living room with the bed and the red corner on the other, a doorway with its frame */
    if(W>=8){const px=sd*1.05,z0=-D/2+.13,z1=D/2-.13,dz0=-.35,dz1=.55,hh=top-FL-.08,pl=[];const pm=std({map:TX.whitewash,color:C(0xd6d0c2),roughness:.95,envMapIntensity:.2});
      for(let z=z0;z<z1-.01;z+=.16){const zz=Math.min(z+.16,z1),mid=(z+zz)/2;if(mid>dz0&&mid<dz1){const b=new T.BoxGeometry(.05,hh-2.05,zz-z-.004);b.translate(px,FL+2.05+(hh-2.05)/2,mid);pl.push(b);continue;}
        const b=new T.BoxGeometry(.05,hh,zz-z-.004);b.translate(px,FL+hh/2+.03,mid);pl.push(b);}
      shootables.push(mesh(merge(pl),pm,0,0,0,h));
      [[dz0-.05],[dz1+.05]].forEach(([z])=>mesh(rbox(.1,2.08,.08,.01),M.trimWhite,px,FL+1.04,z,h));mesh(rbox(.1,.08,dz1-dz0+.18,.01),M.trimWhite,px,FL+2.08,(dz0+dz1)/2,h);
      [-1,1].forEach(k=>mesh(rbox(.08,.1,(k<0?dz0-z0:z1-dz1),.01),M.trimWhite,px,FL+.08,k<0?(z0+dz0)/2:(dz1+z1)/2,h));
      wb(px-.05,px+.05,z0,dz0);wb(px-.05,px+.05,dz1,z1);}
    /* what is worth taking, left where it was put down: on the table, on the kitchen shelf */
    {const put=(id,lx,ly,lz,data)=>{const [x,z]=villW(hd,lx,lz);const o={id,x,y:ly,z,rot:[0,hi*1.7+lx,0]};if(data)o.data=data;LOOT.push(o);};
     const T_={n1:[['cigs',0,{id:'cigs',count:16}]],n2:[['ammo545',0]],n4:[['tushonka',1]],s1:[['bandage',0]],s2:[['antirad',1]],s4:[['bandage',0]],s5:[['pbs',0],['ammo545',1]],l2:[['tushonka',1]]}[hd.id]||[];
     T_.forEach(([id,where,data],k)=>{if(where===0)put(id,tx+(k?.25:-.2)*sd,FL+.79,tz-.05,data);else put(id,shX,FL+1.62,2.05-k*.15,data);});}
    /* left in a hurry */
    [['news',hi*5+1,.3,-.4,.5],['letter',hi*5+2,-.8*sd,.9,2.1],['form',hi*5+3,.5*sd,1.6,1.2]].forEach(([k,s,px,pz,rt])=>paperMesh(h,k,s,px,FL+.036,pz,rt));}

  /* ===== the plot: its fence all round (the street side in the house's own style with a gate on the path), the
     outbuildings, the cellar, the garden ===== */
  /* one ridge along local x from xa to xb about the line z: a mound of earth laid on the ground vertex by vertex */
  const clodG=[0,1,2,3].map(k=>{const g=k<2?new T.IcosahedronGeometry(1,0):new T.OctahedronGeometry(1,0);const p=g.attributes.position,q=rng(31+k),mm=new Map();
    for(let i=0;i<p.count;i++){const key=p.getX(i).toFixed(3)+','+p.getY(i).toFixed(3)+','+p.getZ(i).toFixed(3);if(!mm.has(key))mm.set(key,.68+q()*.6);const f=mm.get(key);p.setXYZ(i,p.getX(i)*f,p.getY(i)*f*.72,p.getZ(i)*f*(.85+k*.06));}g.computeVertexNormals();return g;});
  /* dug soil stands proud of the trodden ground round it */
  const BED=.08;
  function ridge(hd,xa,xb,zr,seed){const n=Math.max(2,Math.ceil((xb-xa)/.09)),RS=8,pos=[],uv=[],idx=[],top=[];
    for(let i=0;i<=n;i++){const x=xa+(xb-xa)*i/n,end=Math.min(1,Math.min(x-xa,xb-x)/.4),taper=Math.sqrt(Math.max(.06,end));
      const zc=zr+(vnoise(x*.55+seed,seed*.37)-.5)*.16+(vnoise(x*2.3+seed*3,seed)-.5)*.045;
      const wid=(.25+(vnoise(x*1.7+seed*5,1.3)-.5)*.09)*(.7+.3*taper),hgt=(.135+(vnoise(x*1.3+seed*2,4.1)-.5)*.07)*taper;
      for(let j=0;j<=RS;j++){const a=j/RS*Math.PI,lz=zc+Math.cos(a)*wid*(1+(hash(i*.7+seed,j*1.3)-.5)*.14);const [wx,wz]=villW(hd,x,lz);
        const lump=(hash(Math.round(wx*16),Math.round(wz*16))-.5)*.04+(vnoise(wx*7,wz*7)-.5)*.06+(vnoise(wx*3.2+9,wz*3.2)-.5)*.05;
        pos.push(wx,H(wx,wz)+BED+Math.sin(a)*hgt+(j===0||j===RS?-.03:lump*Math.sin(a)),wz);uv.push(x*.9,j/RS*.55+seed*.13);}
      top.push([x,zc,hgt,wid]);}
    for(let i=0;i<n;i++)for(let j=0;j<RS;j++){const a=i*(RS+1)+j,b=a+RS+1;idx.push(a,b,a+1,b,b+1,a+1);}
    const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(pos,3));g.setAttribute('uv',new T.Float32BufferAttribute(uv,2));g.setIndex(idx);g.computeVertexNormals();bk.add(g,soilM);return top;}
  function PLOT(hd,hi,W,D,dx){const g=hd.garden;const [x0,x1,z0,z1]=hd.plotL;
    /* the footprints of whatever stands in the garden (a greenhouse): the ridges stop short of it */
    const FPS={saray:[3.8,3.2],banya:[4.3,4.5],wood:[4.1,1.9],wc:[1.5,1.75],green:[3.1,5.9],cellar:[2.5,2.8]};
    const busy=hd.out.map(([k,lx,lz,ry])=>{const sw=Math.abs(Math.sin(ry))>.5,[w,d]=FPS[k];const W_=(sw?d:w)/2+.25,D_=(sw?w:d)/2+.25;return[lx-W_,lx+W_,lz-D_,lz+D_];});
    const isBusy=(x,z)=>busy.some(b=>x>b[0]&&x<b[1]&&z>b[2]&&z<b[3]);
    const gx=dx-.45;fenceRun(hd,x0,z1,x1,z1,hd.fence,[gx-.75,gx+.75]);fenceRun(hd,x0,z0,x0,z1,'rail');fenceRun(hd,x1,z0,x1,z1,'rail');fenceRun(hd,x0,z0,x1,z0,'rail');
    /* the garden: its own low rail fence, dug ridges, potatoes in most of them, a row or two of cabbages */
    fenceRun(hd,g[0],g[2],g[1],g[2],'rail',null,.9);fenceRun(hd,g[0],g[2],g[0],g[3],'rail',null,.9);fenceRun(hd,g[1],g[2],g[1],g[3],'rail',null,.9);fenceRun(hd,g[0],g[3],g[1],g[3],'rail',[(g[0]+g[1])/2-.6,(g[0]+g[1])/2+.6],.9);
    /* the ridges, hoed up by hand: each one follows the ground, wanders a little off the line, swells and slumps along
       its length, its crown lumpy, its ends ragged; clods large and small lie on its flanks and in the furrows */
    /* the whole bed is turned earth, furrows included: a sheet of soil laid over the ground, a little lumpy, darker and damper
       than the ridge crowns */
    {const nx=Math.ceil((g[1]-g[0])/.3),nz=Math.ceil((g[3]-g[2])/.3),pos=[],uv=[],idx=[];
     for(let j=0;j<=nz;j++)for(let i=0;i<=nx;i++){const lx=g[0]+(g[1]-g[0])*i/nx,lz=g[2]+(g[3]-g[2])*j/nz;const [wx,wz]=villW(hd,lx,lz);const edge=Math.min(i,nx-i,j,nz-j)===0;
       pos.push(wx,H(wx,wz)+(edge?-.04:BED+(vnoise(wx*5,wz*5)-.5)*.025),wz);uv.push(wx*.8,wz*.8);}
     for(let j=0;j<nz;j++)for(let i=0;i<nx;i++){const a=j*(nx+1)+i,b=a+nx+1;idx.push(a,b,a+1,b,b+1,a+1);}
     const bg=new T.BufferGeometry();bg.setAttribute('position',new T.Float32BufferAttribute(pos,3));bg.setAttribute('uv',new T.Float32BufferAttribute(uv,2));bg.setIndex(idx);bg.computeVertexNormals();
     {const n=bg.attributes.normal;let up=0;for(let k=0;k<n.count;k++)up+=n.getY(k);if(up<0){for(let k=0;k<idx.length;k+=3){const t=idx[k+1];idx[k+1]=idx[k+2];idx[k+2]=t;}bg.setIndex(idx);bg.computeVertexNormals();}}
     bk.add(bg,furrowM);}
    const q=rng(77+hi);let ri=0;
    for(let z=g[2]+.7+q()*.15;z<g[3]-.5;z+=.74+q()*.1){const kind=q();ri++;const seed=hi*31+ri*7.3;
      const xa0=g[0]+.45+q()*.3,xb0=g[1]-.45-q()*.3;const runs=[];let st=null;for(let x=xa0;x<=xb0+.001;x+=.1){const b=isBusy(x,z);if(!b&&st===null)st=x;if((b||x>xb0-.05)&&st!==null){const e=b?x-.1:x;if(e-st>.4)runs.push([st,e]);st=null;}}
      for(const [xa,xb] of runs){const top=ridge(hd,xa,xb,z,seed);
        /* clods: most of them crumbs, a few fist-sized */
        for(let t=xa+.04;t<xb;t+=.07){if(q()>(hd.boarded?.3:.6))continue;const k=Math.min(top.length-1,Math.round((t-xa)/(xb-xa)*(top.length-1))),[,zc,hg,wd]=top[k];const off=(q()*2-1)*(wd+.12),pr=Math.max(0,1-(off/wd)*(off/wd));
          const [cx,cz]=villW(hd,t,zc+off);const sc=.014+Math.pow(q(),1.8)*.085;bk.add(clodG[sc>.06?(q()*2|0):2+(q()*2|0)],clodM,TRS(cx,H(cx,cz)+BED+Math.sqrt(pr)*hg-sc*.25,cz,q()*3,q()*6.28,q()*3,sc));}
        /* potatoes in most rows, cabbages, carrots and dill in the rest; an empty house's garden is going to weed */
        if(hd.boarded)continue;const yAt=t=>{const k=Math.min(top.length-1,Math.round((t-xa)/(xb-xa)*(top.length-1)));return top[k];};
        if(kind<.62)for(let t=.18;t<xb-xa-.1;t+=.33+q()*.08){const [,zc,hg]=yAt(xa+t);const [px,pz]=villW(hd,xa+t,zc+(q()-.5)*.05);const sc=.8+q()*.45;bk.add(potGeo,POT,TRS(px,H(px,pz)+BED+hg-.05,pz,(q()-.5)*.15,q()*6.28,(q()-.5)*.15,sc));}
        else if(kind<.82)for(let t=.3;t<xb-xa-.15;t+=.5){const [,zc,hg]=yAt(xa+t);const [px,pz]=villW(hd,xa+t,zc);const y0=H(px,pz)+BED+hg-.06,sc=.85+q()*.35;bk.add(cabGeo,CABO,TRS(px,y0,pz,0,q()*6.28,0,sc));const hgg=new T.SphereGeometry(.12,14,10);hgg.scale(1,.85,1);bk.add(hgg,CABH,TRS(px,y0+.1*sc,pz,0,q()*6,0,sc));}
        else for(let t=.1;t<xb-xa-.05;t+=.14){const [,zc,hg]=yAt(xa+t);const [px,pz]=villW(hd,xa+t,zc);bk.add(fernGeo,FERN,TRS(px,H(px,pz)+BED+hg-.04,pz,0,q()*6.28,0,.6+q()*.5));}}}
    /* the bench (lavochka) outside the front fence beside the gate, where the old people sit of an evening: two log
       stumps dug in, a thick plank seat, on some a back board on two uprights */
    if(!hd.boarded){const bx=gx-2.25,bz=z1+.42;const bg=OUTG(hd,bx,bz,0);const sw=std({map:M.boards.map,color:C(0x8c7e6a),roughness:1});
      [-.62,.62].forEach(x=>{const st=new T.CylinderGeometry(.11,.12,.62,9);mesh(st,M.logs,x,.16,0,bg);});mesh(rbox(1.7,.055,.34,.012),sw,0,.5,0,bg);mesh(rbox(1.6,.04,.06,.008),sw,0,.455,.12,bg);
      if(hi%3!==1){[-.62,.62].forEach(x=>mesh(rbox(.06,.62,.05,.008),sw,x,.62,-.19,bg));mesh(rbox(1.6,.14,.035,.01),sw,0,.86,-.2,bg);}
      const r=villRect(hd,bx-.86,bx+.86,bz-.22,bz+.2);solidAABB(r.x1,r.x2,r.z1,r.z2);}
    for(const o of hd.out)OUT[o[0]](hd,o[1],o[2],o[3],hi);}
  /* a run of fence along a straight line in the house's frame, posts sunk in the ground; picket (shtaketnik), close
     boards, or poles on posts (zherdi); an opening [a,b] along the run for a gate */
  function fenceRun(hd,ax,az,bx,bz,type,gap,hgt){const L=Math.hypot(bx-ax,bz-az),ux=(bx-ax)/L,uz=(bz-az)/L,yr=hd.yaw+Math.atan2(-uz,ux);const hh=hgt||(type==='board'?1.65:type==='picket'?1.2:1.1);
    const fm=type==='board'&&hd.boarded?plankG:type==='board'?plank:plankG;const inGap=t=>{if(!gap)return false;const p=ax===bx?az+uz*t:ax+ux*t;return p>gap[0]&&p<gap[1];};
    const at=t=>villW(hd,ax+ux*t,az+uz*t);
    for(let t=0;t<=L+.01;t+=type==='rail'?2.4:2.2){if(inGap(t))continue;const [x,z]=at(Math.min(t,L));const y=H(x,z);const pg=new T.CylinderGeometry(.05,.06,hh+.45,6);pg.translate(0,(hh+.45)/2-.45,0);bk.add(pg,M.post,TRS(x,y,z,(Math.sin(t*3+x)*.03),0,0));}
    if(type==='picket'||type==='board'){const st=type==='board'?.19:.15;for(let t=.08;t<L;t+=st){if(inGap(t))continue;const [x,z]=at(t);const y=H(x,z),ph=hh+((x*31+z*17)%1)*.07*(type==='picket'?1:.3);
        const pg=new T.BoxGeometry(type==='board'?.17:.08,ph,.022);pg.translate(0,ph/2-.08,0);bk.add(pg,fm,TRS(x,y,z,0,yr,(Math.sin(t*7)*.015)));}}
    /* the rails (two on a picket or board fence behind the boards, three poles on a rail fence), broken at the gap */
    const rails=type==='rail'?[.3,.65,.98].map(k=>k*hh):[.3,.85].map(k=>k*hh);let segs=[[0,L]];if(gap){const t0=ax===bx?(gap[0]-az)/uz:(gap[0]-ax)/ux,t1=ax===bx?(gap[1]-az)/uz:(gap[1]-ax)/ux;segs=[[0,Math.min(t0,t1)],[Math.max(t0,t1),L]];}
    for(const [s0,s1] of segs){for(let s=s0;s<s1-.05;s+=2.4){const e=Math.min(s1,s+2.4),[x0,z0]=at(s),[x1,z1]=at(e),y0=H(x0,z0),y1=H(x1,z1),ln=Math.hypot(x1-x0,z1-z0);
        for(const ry of rails){const rg=type==='rail'?new T.CylinderGeometry(.045,.05,ln,6):new T.BoxGeometry(ln,.06,.035);if(type==='rail')rg.rotateZ(Math.PI/2);
          const m4=new T.Matrix4().compose(V3((x0+x1)/2,(y0+y1)/2+ry,(z0+z1)/2),new T.Quaternion().setFromEuler(new T.Euler(0,yr,Math.atan2(y1-y0,ln),'YXZ')),V3(1,1,1));
          if(type!=='rail')m4.multiply(new T.Matrix4().makeTranslation(0,0,-.03));bk.add(rg,type==='rail'?M.post:fm,m4);}
        const r=villRect(hd,Math.min(ax+ux*s,ax+ux*e)-(ax===bx?.08:0),Math.max(ax+ux*s,ax+ux*e)+(ax===bx?.08:0),Math.min(az+uz*s,az+uz*e)-(az===bz?.08:0),Math.max(az+uz*s,az+uz*e)+(az===bz?.08:0));solidAABB(r.x1,r.x2,r.z1,r.z2);}}
    /* the gate: posts either side, its leaf standing open */
    if(gap&&type!=='rail'){const t0=ax===bx?(gap[0]-az)/uz:(gap[0]-ax)/ux;[gap[0],gap[1]].forEach(p=>{const [x,z]=ax===bx?villW(hd,ax,p):villW(hd,p,az);bk.add(new T.CylinderGeometry(.07,.08,hh+.8,7).translate(0,(hh+.8)/2-.45,0),M.post,TRS(x,H(x,z),z));});
      const [x,z]=ax===bx?villW(hd,ax,gap[1]):villW(hd,gap[1],az);const gt=new T.Group();gt.position.set(x,H(x,z),z);gt.rotation.y=yr+2.1;scene.add(gt);
      for(let i=0;i<8;i++)mesh(new T.BoxGeometry(type==='board'?.17:.08,hh-.1,.022),fm,-.1-i*.18,hh/2-.05,0,gt);[.3,.85].forEach(k=>mesh(new T.BoxGeometry(1.45,.06,.035),fm,-.73,k*hh,-.03,gt));}}
  /* ===== outbuildings, placed in the house's frame (x, z) and turned (ry) relative to it; each sits on its own footing ===== */
  const OUTG=(hd,lx,lz,ry)=>{const [x,z]=villW(hd,lx,lz);const g=new T.Group();g.position.set(x,H(x,z),z);g.rotation.y=hd.yaw+ry;scene.add(g);return g;};
  const OUTS=(hd,lx,lz,ry,w,d)=>{const sw=Math.abs(Math.sin(ry))>.5;const r=villRect(hd,lx-(sw?d:w)/2,lx+(sw?d:w)/2,lz-(sw?w:d)/2,lz+(sw?w:d)/2);solidAABB(r.x1,r.x2,r.z1,r.z2);};
  const gableRoof=(g,w,d,y,rise,m,ovh=.3)=>{const ex=d/2+ovh,ez=w/2+ovh,sl=Math.hypot(ez,rise)*1.6;shootables.push(mesh(merge([quad([-ex,y,ez],[ex,y,ez],[ex,y+rise,0],[-ex,y+rise,0],-ex,ex,0,sl),quad([ex,y,-ez],[-ex,y,-ez],[-ex,y+rise,0],[ex,y+rise,0],-ex,ex,0,sl)].map(q=>{q.rotateY(Math.PI/2);q.computeVertexNormals();return q;})),m,0,0,0,g));
    [-1,1].forEach(s=>{const gs=new T.Shape();gs.moveTo(-w/2,0);gs.lineTo(w/2,0);gs.lineTo(0,rise);gs.closePath();const gg=new T.ExtrudeGeometry(gs,{depth:.03,bevelEnabled:false});worldUV(gg,1);mesh(gg,plankG,0,y,s*d/2-(s>0?.03:0),g);});};
  const plankWalls=(g,w,d,hh,m,doorW,doorSide)=>{const pl=[];const add=(x,z,ax,len)=>{const n=Math.round(len/.2);for(let i=0;i<n;i++){const t=-len/2+(i+.5)*len/n;if(doorSide&&ax===doorSide.ax&&Math.abs(t-doorSide.c)<doorW/2&&Math.sign(ax==='x'?z:x)===doorSide.s)continue;
      const b=new T.BoxGeometry(ax==='x'?len/n-.008:.03,hh+(i*7%3)*.02,ax==='x'?.03:len/n-.008);b.translate(ax==='x'?t:x,hh/2-.05,ax==='x'?z:t);pl.push(b);}};
    add(0,d/2,'x',w);add(0,-d/2,'x',w);add(w/2,0,'z',d);add(-w/2,0,'z',d);shootables.push(mesh(merge(pl),m,0,0,0,g));
    [[-w/2,-d/2],[w/2,-d/2],[-w/2,d/2],[w/2,d/2]].forEach(([x,z])=>mesh(rbox(.1,hh+.5,.1,.01),M.post,x,(hh+.5)/2-.5,z,g));};
  const doorLeaf=(g,x,z,ry,w,hh,m,ang)=>{const d=new T.Group();d.position.set(x,0,z);d.rotation.y=ry;g.add(d);const l=new T.Group();l.rotation.y=ang||0;d.add(l);mesh(rbox(w,hh,.04,.01),m,w/2,hh/2+.02,0,l);
    [.25,hh-.25].forEach(y=>mesh(rbox(w-.08,.1,.03,.01),m,w/2,y,.035,l));const zb=mesh(rbox(.08,Math.hypot(w-.2,hh-.6),.03,.005),m,w/2,hh/2,.035,l);zb.rotation.z=Math.atan2(w-.2,hh-.6);mesh(new T.SphereGeometry(.025,6,5),M.rust,w-.12,hh/2,.06,l);return l;};
  const OUT={
    /* the shed (saray): plank walls on posts, a lean of tin or slate, its door ajar */
    saray(hd,lx,lz,ry,hi){const g=OUTG(hd,lx,lz,ry);const w=3.2,d=2.6,hh=2.3;plankWalls(g,w,d,hh,hi%2?plank:plankG,1,{ax:'x',c:.4,s:1});mesh(rbox(w-.1,.05,d-.1,.01),plankG,0,.05,0,g);
      doorLeaf(g,-.1,d/2+.02,0,1.0,2.0,plankG,-.5);gableRoof(g,w,d,hh-.05,.8,hd.roof==='tin'?tinM(hd.rc||0x6a6e70):slateDS);OUTS(hd,lx,lz,ry,w,d);},
    /* the bathhouse (banya): a small log house, a little window, a stovepipe with its cap */
    banya(hd,lx,lz,ry,hi){const g=OUTG(hd,lx,lz,ry);const w=3.2,d=3.6,n=9,lr=.11,ls=.2;const lg=[];
      for(let k=0;k<n;k++){const y=.1+k*ls;[[0,d/2,'x',w],[0,-d/2,'x',w],[w/2,0,'z',d],[-w/2,0,'z',d]].forEach(([x,z,ax,L])=>{const ext=((k%2===0)===(ax==='x'))?.22:0;const pieces=ax==='x'&&z>0&&y<1.9?[[-L/2-ext,-.1],[.75,L/2+ext]]:ax==='z'&&x>0&&y>.9&&y<1.5?[[-L/2-ext,-.3],[.3,L/2+ext]]:[[-L/2-ext,L/2+ext]];
        pieces.forEach(([a,b])=>{const c=new T.CylinderGeometry(lr,lr,b-a,9);if(ax==='x'){c.rotateZ(Math.PI/2);c.translate((a+b)/2,y+(ax==='z'?ls/2:0),z);}else{c.rotateX(Math.PI/2);c.translate(x,y+ls/2,(a+b)/2);}lg.push(c);});});}
      shootables.push(mesh(merge(lg),hd.burnt?charred:M.logs,0,0,0,g));mesh(rbox(w+.2,.25,d+.2,.02),stone,0,-.05,0,g);
      doorLeaf(g,-.1,d/2+.03,0,.85,1.75,plankG,0);mesh(new T.PlaneGeometry(.55,.5),M.glass,w/2+.05,1.2,0,g).rotation.y=Math.PI/2;[[0,.3,.7,.06],[0,-.3,.7,.06],[0,0,.06,.66]].forEach(([y,zz,a,b])=>0);
      gableRoof(g,w+.3,d,.1+n*ls,.95,slateDS);const pipe=mesh(new T.CylinderGeometry(.09,.09,1.6,10),std({color:C(0x2a2826),roughness:.6,metalness:.6}),-.6,.1+n*ls+.9,-.6,g);mesh(new T.ConeGeometry(.2,.15,10),M.rust,-.6,.1+n*ls+1.78,-.6,g);
      OUTS(hd,lx,lz,ry,w+.4,d+.4);},
    /* firewood: split logs stacked end-out under a lean-to on four posts */
    wood(hd,lx,lz,ry,hi){const g=OUTG(hd,lx,lz,ry);const w=3.4,d=1.1,q=rng(500+hi);const wd=std({map:TX.bark,color:C(0x8a7458),roughness:1}),endM=std({color:C(0xb69a72),roughness:1});
      for(let r=0;r<7;r++)for(let i=0;i<14;i++){const x=-w/2+.15+i*.23+(r%2)*.11,y=.12+r*.2;if(x>w/2-.12)continue;const lg=new T.CylinderGeometry(.095+q()*.02,.1,d*.92,6);lg.rotateX(Math.PI/2);bk.add(lg,q()<.5?wd:endM,new T.Matrix4().multiplyMatrices(g.matrixWorld.clone().compose(g.position,g.quaternion,V3(1,1,1)),TRS(x,y,0,0,0,q()*3)));}
      /* the lean-to: tall posts at the back, short at the front, a top plate on each pair, the roof lying on the plates */
      const zb=-d/2-.1,zf=d/2+.1,yb=2.3,yf=1.95,ang=Math.atan2(yb-yf,zf-zb);
      [[-w/2-.1,zb,yb],[w/2+.1,zb,yb],[-w/2-.1,zf,yf],[w/2+.1,zf,yf]].forEach(([x,z,top])=>mesh(rbox(.1,top+.3,.1,.01),M.post,x,(top+.3)/2-.3,z,g));
      [[zb,yb],[zf,yf]].forEach(([z,top])=>mesh(rbox(w+.36,.08,.1,.01),M.post,0,top+.04,z,g));
      const rl=Math.hypot(zf-zb,yb-yf)+.5,r=mesh(rbox(w+.6,.035,rl,.008),hd.roof==='tin'?tinM(hd.rc||0x6a6e70):slateDS,0,(yb+yf)/2+.08+.0175/Math.cos(ang),(zb+zf)/2,g);r.rotation.x=ang;OUTS(hd,lx,lz,ry,w+.4,d+.4);},
    /* the privy at the end of the garden */
    wc(hd,lx,lz,ry,hi){const g=OUTG(hd,lx,lz,ry);plankWalls(g,1.1,1.3,2.0,plankG,.7,{ax:'x',c:0,s:1});doorLeaf(g,-.36,.67,0,.72,1.85,plankG,-.2);
      /* the roof sits on the wall tops and a raised front plate: high over the door, falling to the back */
      mesh(rbox(1.2,.2,.06,.01),plankG,0,2.01,.65,g);const ang=Math.atan2(.14,1.3);const r=mesh(rbox(1.5,.035,1.75,.008),slateDS,0,2.06,0,g);r.rotation.x=-ang;OUTS(hd,lx,lz,ry,1.3,1.5);},
    /* a greenhouse: hoops of steel under clouded film, tomatoes inside */
    green(hd,lx,lz,ry,hi){const g=OUTG(hd,lx,lz,ry);const L=5.6,R=1.4,st=std({color:C(0x8a8c88),roughness:.5,metalness:.7});for(let i=0;i<=6;i++){const t=new T.TorusGeometry(R,.025,5,16,Math.PI);t.translate(0,0,-L/2+i*L/6);bk.add(t,st,new T.Matrix4().compose(g.position,g.quaternion,V3(1,1,1)));}
      const fg=new T.CylinderGeometry(R,R,L,20,1,true,-Math.PI/2,Math.PI);fg.rotateX(Math.PI/2);mesh(fg,film,0,0,0,g);[-1,1].forEach(s=>mesh(new T.CircleGeometry(R,20,0,Math.PI),film,0,0,s*L/2,g));
      const q=rng(700+hi);for(let i=0;i<10;i++){const x=(i%2?.6:-.6),z=-L/2+.5+(i>>1)*1.1;mesh(new T.IcosahedronGeometry(.22,0),leafG,x,.35+q()*.2,z,g);mesh(new T.CylinderGeometry(.01,.01,.9,4),M.post,x,.45,z+.05,g);}
      mesh(rbox(2.4,.12,L-.2,.01),soilM,0,.04,0,g);OUTS(hd,lx,lz,ry,2*R,L);},
    /* the cellar (pogreb): a stone-walled pit roofed over by a squat timber cellar-house with a padlocked door; behind it
       the turfed earth bank over the vault, its tin vent pipe standing up out of the grass */
    cellar(hd,lx,lz,ry,hi){const g=OUTG(hd,lx,lz,ry);const w=1.9,d=2.2;
      mesh(rbox(w+.36,.75,d+.36,.03),stone,0,-.1,0,g);[[0,d/2+.19],[0,-d/2-.19]].forEach(([x,z])=>{for(let i=0;i<6;i++)mesh(rbox(.32,.16,.08,.02),stone,-w/2+.15+i*.33,.12+(i%2)*.1,z,g);});
      plankWalls(g,w,d,1.55,hi%2?plankG:plank,.8,{ax:'x',c:0,s:1});mesh(rbox(.95,.08,.12,.01),M.post,0,1.82,d/2+.02,g);
      const lf=doorLeaf(g,-.4,d/2+.03,0,.8,1.72,plankG,0);mesh(rbox(.06,.08,.03,.01),std({color:C(0x3a3a38),roughness:.4,metalness:.8}),.74,.95,.07,lf);mesh(new T.TorusGeometry(.03,.008,5,10),std({color:C(0x3a3a38),roughness:.4,metalness:.8}),.74,.9,.08,lf);
      gableRoof(g,w,d,1.5,.85,hd.roof==='tin'?tinM(hd.rc||0x6a6e70):slateDS,.25);
      /* the bank over the vault, turfed */const bg=new T.SphereGeometry(1,22,10,0,Math.PI*2,0,Math.PI/2);const p=bg.attributes.position;for(let i=0;i<p.count;i++){const q=Math.sin(p.getX(i)*6+hi)*.05+Math.cos(p.getZ(i)*5)*.04;p.setXYZ(i,p.getX(i)*(1.9+q),p.getY(i)*(.95+q)-.12,p.getZ(i)*(2.4+q));}bg.computeVertexNormals();
      mesh(bg,turfM,0,0,-d/2-2.45,g);const vp=std({color:C(0x7a7c78),roughness:.5,metalness:.6});mesh(new T.CylinderGeometry(.06,.06,1.1,10),vp,.3,.75,-d/2-2.85,g);mesh(new T.ConeGeometry(.14,.12,10),vp,.3,1.34,-d/2-2.85,g);
      OUTS(hd,lx,lz,ry,w+.4,d+.4);const [bx,bz]=villW(hd,lx-(d/2+2.45)*Math.sin(ry),lz-(d/2+2.45)*Math.cos(ry));solids.push({cx:bx,cz:bz,r:1.8});}};
  /* the yards' own growth, planted at boot (see villageYards): an apple tree or birch, lilac and currant by the fences */
  /* ===== what grows in and round the yards (planted at boot, see villageYards) ===== */
  let VT=null;const vt=()=>VT||(VT={birch:speciesTypes(birchGeo,woodMat.birch,MB,TX.twigBirch),bush:speciesTypes(bushGeo,woodMat.dead,MG,TX.twigBush),dead:speciesTypes(deadGeo,woodMat.dead,null,null),apple:speciesTypes(appleGeo,woodMat.bark,MG,TX.twigBush)});
  const SCALE={bush:[.6,1.05],apple:[.85,1.15],ybirch:[.5,.7],birch:[.8,1.15],dead:[.6,.8]},SOLR={bush:.35,apple:.2,ybirch:.16,birch:.22,dead:.2};
  const plantAt=(q,col,x,z,kind,s)=>{const L=vt()[kind==='ybirch'?'birch':kind];col.setRGB(1,1,1).offsetHSL((q()-.5)*.06,(q()-.5)*.15,(q()-.5)*.1);
    vegPut(L[(q()*L.length)|0],x,H(x,z)-.12,z,q()*6.28,s,s*(.9+q()*.2),col,null);solids.push({cx:x,cz:z,r:SOLR[kind]*s});};
  /* inside a plot: never on the house, the garden beds, an outbuilding or the cellar's bank, the gate path, or the fence */
  const FPY={saray:[3.8,3.2],banya:[4.3,4.5],wood:[4.1,1.9],wc:[1.5,1.75],green:[3.1,5.9],cellar:[2.5,2.8]};
  const yardBusy=(hd,hi)=>{if(hd._yb)return hd._yb;const W=hd.W,D=hd.D,g=hd.garden,L=[[-W/2-1.0,W/2+1.0,-D/2-1.0-(hd.dvor?7.4:0),D/2+(hd.ver?2.7:1.9)],[g[0]-.35,g[1]+.35,g[2]-.35,g[3]+.35]];
    hd.out.forEach(([k,lx,lz,ry])=>{const sw=Math.abs(Math.sin(ry))>.5,[w,d]=FPY[k];const a=(sw?d:w)/2+.6,b=(sw?w:d)/2+.6;L.push([lx-a,lx+a,lz-b,lz+b]);
      if(k==='cellar'){const bx=lx-3.55*Math.sin(ry),bz=lz-3.55*Math.cos(ry),ex=(sw?2.4:1.9)+.3,ez=(sw?1.9:2.4)+.3;L.push([bx-ex,bx+ex,bz-ez,bz+ez]);}});
    const gx=(hi%2?.6:.2)-.45;L.push([gx-1.2,gx+1.2,D/2,hd.plotL[3]+1]);return hd._yb=L;};
  const yardFree=(hd,hi,lx,lz,r,taken)=>{const [x0,x1,z0,z1]=hd.plotL;if(lx<x0+.7+r||lx>x1-.7-r||lz<z0+.7+r||lz>z1-.7-r)return false;
    if(yardBusy(hd,hi).some(b=>lx>b[0]-r&&lx<b[1]+r&&lz>b[2]-r&&lz<b[3]+r))return false;return !taken.some(t=>Math.hypot(t[0]-lx,t[1]-lz)<t[2]+r);};
  VILL.houses.forEach((hd,hi)=>YARDS.push(()=>{const q=rng(900+hi),col=new T.Color(),taken=[];const [x0,x1,z0,z1]=hd.plotL;
    /* an old apple tree or two (three in the big yards), a young birch, lilac and currant against the fences; an empty
       house's yard has gone wild - more bushes, a self-sown birch, a dead tree */
    const want=hd.boarded?[['dead',1],['ybirch',1],['bush',5]]:[['apple',hd.W>8?3:2],['ybirch',1],['bush',3]];
    for(const [kind,n] of want){let got=0;for(let t=0;t<60&&got<n;t++){let lx,lz;
      if(kind==='bush'){const e=(q()*4)|0;lx=e<2?(e?x1-1.1:x0+1.1):x0+1.5+q()*(x1-x0-3);lz=e>=2?(e===2?z0+1.1:z0+1.5+q()*(z1-z0-3)):z0+1.5+q()*(z1-z0-3);if(e===3)lz=z1-1.1;}
      else{lx=x0+1.5+q()*(x1-x0-3);lz=z0+1.5+q()*(z1-z0-3);}
      const r=kind==='bush'?.75:kind==='ybirch'?1.1:1.8;if(!yardFree(hd,hi,lx,lz,kind==='bush'?.35:.9,taken))continue;
      const [wx,wz]=villW(hd,lx,lz),sc=SCALE[kind];plantAt(q,col,wx,wz,kind,sc[0]+q()*(sc[1]-sc[0]));taken.push([lx,lz,r]);got++;}}}));
  /* the alleys: a hedge of lilac, elder and acacia either side, gapped here and there, an apple or a young birch every
     few metres; the streets' verges; and the odd tree in the grass between the plots */
  YARDS.push(()=>{const q=rng(1313),col=new T.Color(),placed=[];
    const inPlot=(x,z,m)=>VILL.houses.some(hd=>{const r=hd.prect;return x>r.x1-m&&x<r.x2+m&&z>r.z1-m&&z<r.z2+m;});
    const clear=(x,z,r)=>!placed.some(p=>Math.hypot(p[0]-x,p[1]-z)<p[2]+r);
    const free=(x,z,m,pathMin)=>!(villStreetD(x,z)<4.5||Math.hypot(x-HX,z-HZ)<13||villPathD(x,z)<pathMin||Math.hypot(x-VILL.well.x,z-VILL.well.z)<4||inPlot(x,z,m));
    const put=(x,z,kind,m,pathMin)=>{const sc=SCALE[kind],s=sc[0]+q()*(sc[1]-sc[0]),r=kind==='bush'?.6*s:kind==='apple'?1.6:1.0;if(!free(x,z,m,pathMin)||!clear(x,z,r))return false;plantAt(q,col,x,z,kind,s);placed.push([x,z,r]);return true;};
    for(const [pi,za,zb] of VILL.alleys){const L=VILL.paths[pi],w=(VILL.alleyW[pi]||0)+.9;
      for(let i=0;i<L.length-1;i++){const [ax,az]=L[i],[bx,bz]=L[i+1],len=Math.hypot(bx-ax,bz-az),ux=(bx-ax)/len,uz=(bz-az)/len;
        for(let t=0;t<len;t+=1.5+q()*.7){const x=ax+ux*t,z=az+uz*t;if(z>Math.max(za,zb)+.5||z<Math.min(za,zb)-.5)continue;
          for(const sd of [-1,1]){if(q()<.13)continue;const off=w+.55+q()*.35,px=x-uz*off*sd,pz=z+ux*off*sd;
            if(q()<.12){put(px-uz*.5*sd,pz+ux*.5*sd,q()<.55?'apple':'ybirch',.5,w+.6);}else put(px,pz,'bush',.15,w+.25);}}}}
    for(const L of VILL.streets){for(let i=0;i<L.length-1;i++){const [ax,az]=L[i],[bx,bz]=L[i+1],len=Math.hypot(bx-ax,bz-az),ux=(bx-ax)/len,uz=(bz-az)/len;
      for(let t=0;t<len;t+=3.5+q()*4)for(const sd of [-1,1]){const off=4.9+q()*6,px=ax+ux*t-uz*off*sd,pz=az+uz*t+ux*off*sd,r=q();put(px,pz,r<.5?'bush':r<.75?'apple':'ybirch',.8,2);}}}
    for(let x=4;x<165;x+=4+q()*5){for(const sdz of [-1,1]){const z=villSZ(x)+sdz*(4.8+q()*9);const r=q();if(r<.32)put(x,z,'bush',.8,2);else if(r<.42)put(x,z,'birch',1.6,2);else if(r<.52)put(x,z,q()<.5?'apple':'ybirch',1.2,2);}}
    for(let k=0;k<160;k++){const x=5+q()*200,z=-445+q()*190;const r=q();put(x,z,r<.5?'bush':r<.72?'apple':r<.9?'ybirch':'birch',1.2,2);}});
  buildHouses();
  /* ===== the power line along the street: wooden poles on the north verge with a crossarm and three glass insulators,
     the wires sagging pole to pole, and from the nearest pole a service wire down to an insulator on each house ===== */
  {const q=rng(4242),wood=std({map:TX.bark,color:C(0x6f6354),roughness:.95}),ins=std({color:C(0x9fb8b0),roughness:.15,metalness:.1,envMapIntensity:.9});const poles=[],wires=[];
   const sag=(a,b,dep)=>{for(let t=0;t<12;t++){const u0=t/12,u1=(t+1)/12,f=u=>-4*dep*u*(1-u);const pa=a.clone().lerp(b,u0),pb=a.clone().lerp(b,u1);pa.y+=f(u0);pb.y+=f(u1);wires.push(pa.x,pa.y,pa.z,pb.x,pb.y,pb.z);}};
   /* a pole stands on the verge, never in a yard, an alley, a path's line or the road; the crossarm across the line */
   const okP=(x,z)=>!(VILL.houses.some(hd=>{const r=hd.prect;return x>r.x1-.7&&x<r.x2+.7&&z>r.z1-.7&&z<r.z2+.7;})||villPathD(x,z)<1.5||villStreetD(x,z)<3.7||Math.hypot(x-HX,z-HZ)<9||Math.hypot(x-VILL.well.x,z-VILL.well.z)<3);
   const pole=(x,z,ang)=>{const y=H(x,z),lean=(q()-.5)*.05;const pg=new T.CylinderGeometry(.1,.14,8.8,9);pg.translate(0,4.4-.7,0);bk.add(pg,wood,TRS(x,y,z,lean,q()*6,0));
     const ag=rbox(.1,.1,1.9,.01);ag.translate(0,7.55,0);bk.add(ag,wood,TRS(x,y,z,lean,ang,0));const c=Math.cos(ang),sn=Math.sin(ang);
     const att=[-.8,0,.8].map(dz=>{const ig=new T.CylinderGeometry(.035,.05,.12,8);ig.translate(0,7.67,dz);bk.add(ig,ins,TRS(x,y,z,lean,ang,0));return V3(x+dz*sn,y+7.74,z+dz*c);});
     solids.push({cx:x,cz:z,r:.18});return att;};
   /* walk a street's centre line, a pole every 30-38 m on one verge (the other if that is taken), the wires pole to pole */
   const lines=[];const runLine=(L,side,first)=>{const ps=[];let next=first;let acc=0;
     for(let i=0;i<L.length-1;i++){const [ax,az]=L[i],[bx,bz]=L[i+1],len=Math.hypot(bx-ax,bz-az),ux=(bx-ax)/len,uz=(bz-az)/len;
       for(let t=0;t<len;t+=.5){acc+=.5;if(acc<next)continue;const cx=ax+ux*t,cz=az+uz*t;let done=false;
         for(const sd of [side,-side]){const x=cx-uz*5.3*sd,z=cz+ux*5.3*sd;if(okP(x,z)){ps.push(pole(x,z,Math.atan2(ux,uz)+Math.PI/2));done=true;break;}}
         if(done){next=acc+30+q()*8;}else next=acc+1.5;}}
     for(let i=1;i<ps.length;i++)for(let k=0;k<3;k++)sag(ps[i-1][k],ps[i][k],.45);lines.push(...ps);return ps;};
   {const M_=[];for(let x=4;x<=162;x+=2)M_.push([x,villSZ(x)]);runLine(M_,-1,2);}
   runLine(VILL.streets[0],-1,8);runLine(VILL.streets[1],1,8);poles.push(...lines);
   for(const hd of VILL.houses){if(hd.burnt)continue;const [hx,hz]=villW(hd,-hd.W/2+.5,hd.D/2+.14+(hd.clad?.06:0));const yT=FL+.11+12*.215-.25;let best=null,bd=1e9;for(const p of poles){const d=Math.hypot(p[1].x-hx,p[1].z-hz);if(d<bd){bd=d;best=p;}}
     if(!best||bd>60)continue;const tgt=V3(hx,yT,hz);const ig=new T.CylinderGeometry(.03,.04,.1,8);ig.rotateX(Math.PI/2);bk.add(ig,ins,TRS(hx,yT,hz,0,hd.yaw,0));sag(best[0],tgt,.6);}
   const wl=new T.LineSegments(new T.BufferGeometry().setAttribute('position',new T.Float32BufferAttribute(wires,3)),new T.LineBasicMaterial({color:C(0x161614)}));scene.add(wl);}
  /* ===== the village well (kolodets) at the mouth of the lane: a square log frame (srub) dovetailed at the corners over
     the shaft, two posts carrying the windlass drum with its chain and iron crank, a little gable roof over it, a hinged
     plank lid, and the zinc bucket stood on the rim ===== */
  {const wx=VILL.well.x,wz=VILL.well.z,g=new T.Group();g.position.set(wx,H(wx,wz)-.08,wz);g.rotation.y=.35;scene.add(g);const S=1.15,lr=.1,n=6,lg=[];
   for(let k=0;k<n;k++){const y=.1+k*.17;[[0,S/2,'x'],[0,-S/2,'x'],[S/2,0,'z'],[-S/2,0,'z']].forEach(([x,z,ax])=>{const ext=((k%2===0)===(ax==='x'))?.16:.04;const c=new T.CylinderGeometry(lr,lr*1.05,S+2*ext,10);
     if(ax==='x'){c.rotateZ(Math.PI/2);c.translate(0,y+(ax==='z'?.085:0),z);}else{c.rotateX(Math.PI/2);c.translate(x,y+.085,0);}lg.push(c);});}
   shootables.push(mesh(merge(lg),M.logs,0,0,0,g));
   /* dark water down the shaft, the boarded lid (one half hinged up) */
   mesh(new T.PlaneGeometry(S-.22,S-.22).rotateX(-Math.PI/2),std({color:C(0x0c0e0e),roughness:.05,metalness:.2,envMapIntensity:1.2}),0,-.6,0,g);
   const lw=std({map:M.boards.map,color:C(0x7a6e5e),roughness:1});mesh(rbox(S+.1,.04,S/2+.05,.008),lw,0,1.14,S/4,g);
   const lid=new T.Group();lid.position.set(0,1.16,0);lid.rotation.x=1.25;g.add(lid);mesh(rbox(S+.1,.04,S/2,.008),lw,0,0,-S/4,lid);[-.35,.35].forEach(x=>mesh(rbox(.06,.03,S/2-.04,.005),lw,x,.03,-S/4,lid));
   /* posts, windlass drum with the chain wound on it and hanging down, crank */
   const pH=2.05;[-S/2-.06,S/2+.06].forEach(x=>mesh(rbox(.13,pH+.4,.13,.015),M.post,x,(pH+.4)/2-.4,0,g));
   const dr=new T.CylinderGeometry(.11,.11,S+.1,12);dr.rotateZ(Math.PI/2);mesh(dr,M.logs,0,1.62,0,g);const iron=std({color:C(0x2c2a28),roughness:.55,metalness:.75});
   for(let i=0;i<9;i++){const t=new T.TorusGeometry(.115,.008,4,14);t.rotateY(Math.PI/2);mesh(t,iron,-.3+i*.055,1.62,0,g);}
   for(let i=0;i<12;i++){const l=new T.TorusGeometry(.018,.005,4,8);l.rotateY(i%2?Math.PI/2:0);mesh(l,iron,.12,1.5-i*.032,-.11,g);}
   const ax=new T.CylinderGeometry(.018,.018,.32,8);ax.rotateZ(Math.PI/2);mesh(ax,iron,S/2+.2,1.62,0,g);mesh(rbox(.035,.34,.03,.004),iron,S/2+.36,1.47,0,g);const hdl=new T.CylinderGeometry(.022,.022,.16,8);hdl.rotateZ(Math.PI/2);mesh(hdl,M.post,S/2+.43,1.31,0,g);
   /* the roof: two slopes of boards on the post heads, barge boards at the ends */
   const rw=S+.5,rise=.55,half=.85;[-1,1].forEach(sd=>{const r=mesh(rbox(rw,.03,Math.hypot(half,rise)+.08,.006),lw,0,pH+rise/2+.02,sd*half/2,g);r.rotation.x=sd*Math.atan2(rise,half);});
   mesh(rbox(rw+.04,.07,.07,.008),M.post,0,pH+rise+.03,0,g);mesh(rbox(S+.3,.09,.09,.01),M.post,0,pH,0,g);
   /* the zinc bucket on the rim, its bail up */
   const zn=std({color:C(0x9a9e9c),roughness:.35,metalness:.85,side:T.DoubleSide});const bu=new T.CylinderGeometry(.15,.11,.28,16,1,true);mesh(bu,zn,.28,1.29,.36,g);mesh(new T.CircleGeometry(.11,16).rotateX(-Math.PI/2),zn,.28,1.152,.36,g);
   const ba=new T.TorusGeometry(.15,.006,4,16,Math.PI);mesh(ba,iron,.28,1.43,.36,g);
   solids.push({cx:wx,cz:wz,r:1.0});}
  bk.flush(scene,true);
})();
/* at boot, before the vegetation is built: clear the wild growth out of every plot, then plant the yards */
function villageYards(){for(const hd of VILL.houses){const r=hd.prect;const x1=r.x1-1.5,x2=r.x2+1.5,z1=r.z1-1.5,z2=r.z2+1.5;
    for(const t of VEG.types){const P=t.P,M_=t.M,Cc=t.C;const keep=[];for(let i=0;i<P.length/2;i++){const x=P[i*2],z=P[i*2+1];if(!(x>x1&&x<x2&&z>z1&&z<z2))keep.push(i);}if(keep.length===P.length/2)continue;
      const nP=[],nM=[],nC=[];keep.forEach(i=>{nP.push(P[i*2],P[i*2+1]);for(let k=0;k<16;k++)nM.push(M_[i*16+k]);nC.push(Cc[i*3],Cc[i*3+1],Cc[i*3+2]);});t.P.length=0;t.P.push(...nP);t.M.length=0;t.M.push(...nM);t.C.length=0;t.C.push(...nC);}}
  for(const t of VEG.types){const P=t.P;const keep=[];for(let i=0;i<P.length/2;i++){const x=P[i*2],z=P[i*2+1];if(x>0&&x<205&&z>-448&&z<-240&&(villPathD(x,z)<2.2||villStreetD(x,z)<5||Math.hypot(x-VILL.well.x,z-VILL.well.z)<4))continue;keep.push(i);}
    if(keep.length===P.length/2)continue;const nP=[],nM=[],nC=[];keep.forEach(i=>{nP.push(P[i*2],P[i*2+1]);for(let k=0;k<16;k++)nM.push(t.M[i*16+k]);nC.push(t.C[i*3],t.C[i*3+1],t.C[i*3+2]);});t.P.length=0;t.P.push(...nP);t.M.length=0;t.M.push(...nM);t.C.length=0;t.C.push(...nC);}
  YARDS.forEach(f=>f());YARDS.length=0;}
