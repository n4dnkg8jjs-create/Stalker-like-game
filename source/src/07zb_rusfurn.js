/* ---------- Russian village furniture, all of it modelled piece by piece at the same scale and finish as the rest of the
   interiors (metres, built standing on the floor at y, facing +z unless turned):
   the glazed sideboard (servant) with its dishes and crystal, the iron-bound dowry chest (sunduk), bentwood "Viennese"
   chairs, the round table under its fringed cloth and the silk lampshade (abazhur) over it, the Rubin television on its
   splayed legs, the chest of drawers (komod) with the mirror over it, the Podolsk treadle sewing machine, the pillow stack
   under its lace cover with the lace valance (podzor) on the bed, the icon lamp (lampada) on its chains, the wall rug of
   deer in a forest. Lace and crochet doilies are cut-out textures. ---------- */
const RF=(()=>{
  /* polished veneer: long figured grain, a little darker toward the edges; varnished */
  const grain=(base,dark,seed)=>tex(256,256,(c,w,h)=>{c.fillStyle=base;c.fillRect(0,0,w,h);const q=rng(seed);for(let i=0;i<140;i++){const x=q()*w;c.strokeStyle=`rgba(${dark},${.08+q()*.18})`;c.lineWidth=.5+q()*2;c.beginPath();c.moveTo(x,0);
      for(let y=0;y<=h;y+=16)c.lineTo(x+Math.sin(y*.03+i)*4*q()+Math.sin(y*.11)*1.5,y);c.stroke();}
    for(let i=0;i<6;i++){c.strokeStyle=`rgba(${dark},.18)`;c.lineWidth=1;const cx=q()*w,cy=q()*h;for(let r=4;r<40;r+=4){c.beginPath();c.ellipse(cx,cy,r*.4,r,0,0,7);c.stroke();}}});
  const W1=std({map:grain('#6a3f22','40,20,8',3),roughness:.38,envMapIntensity:.6}),W2=std({map:grain('#8a5a32','60,32,14',5),roughness:.42,envMapIntensity:.55}),W3=std({map:grain('#3e2414','20,10,4',7),roughness:.35,envMapIntensity:.6});
  const BR=std({color:C(0xb08a40),metalness:.9,roughness:.32,envMapIntensity:1}),IRON=std({color:C(0x1c1c1c),metalness:.6,roughness:.45}),TIN=std({color:C(0x8a8a84),metalness:.85,roughness:.38});
  const PORC=std({color:C(0xf2efe8),roughness:.18,envMapIntensity:.9}),CRYS=std({color:C(0xd8e4ea),roughness:.04,metalness:.1,transparent:true,opacity:.42,envMapIntensity:1.4}),MIRR=std({color:C(0xc8ccd0),metalness:1,roughness:.04,envMapIntensity:1.6});
  /* crochet lace: rings of holes, a scalloped edge, cut out */
  const laceT=tex(256,256,(c,w,h)=>{c.clearRect(0,0,w,h);c.fillStyle='#f4f1ea';c.beginPath();for(let i=0;i<=48;i++){const a=i/48*6.28,r=118+Math.sin(a*12)*8;c.lineTo(w/2+Math.cos(a)*r,h/2+Math.sin(a)*r);}c.fill();
    c.globalCompositeOperation='destination-out';for(let ring=1;ring<7;ring++){const n=6*ring+4,r=ring*16;for(let i=0;i<n;i++){const a=i/n*6.28+ring;c.beginPath();c.arc(w/2+Math.cos(a)*r,h/2+Math.sin(a)*r,3.4+ring*.5,0,7);c.fill();}}
    c.globalCompositeOperation='source-over';c.strokeStyle='#f4f1ea';c.lineWidth=2;for(let ring=1;ring<7;ring++){c.beginPath();c.arc(w/2,h/2,ring*16+8,0,7);c.stroke();}},{clamp:true});
  const LACE=std({map:laceT,alphaTest:.5,side:T.DoubleSide,roughness:.9,envMapIntensity:.2});
  const edgeT=tex(256,64,(c,w,h)=>{c.clearRect(0,0,w,h);c.fillStyle='#f2efe6';c.fillRect(0,0,w,h*.45);for(let i=0;i<16;i++){c.beginPath();c.arc(i*16+8,h*.45,8,0,Math.PI);c.fill();}
    c.globalCompositeOperation='destination-out';for(let i=0;i<32;i++){c.beginPath();c.arc(i*8+4,h*.22,2.6,0,7);c.fill();}for(let i=0;i<16;i++){c.beginPath();c.arc(i*16+8,h*.52,3,0,7);c.fill();}});edgeT.wrapS=T.RepeatWrapping;
  const LEDGE=std({map:edgeT,alphaTest:.5,side:T.DoubleSide,roughness:.9,envMapIntensity:.2});
  const doily=(par,x,y,z,r,ry=0)=>{const m=mesh(new T.CircleGeometry(r,32),LACE,x,y,z,par,false);m.rotation.set(-Math.PI/2,0,ry);return m;};
  const G=(par,x,y,z,ry)=>{const g=new T.Group();g.position.set(x,y,z);g.rotation.y=ry||0;par.add(g);return g;};
  const knob=(g,x,y,z)=>{mesh(new T.CylinderGeometry(.008,.01,.02,10),BR,x,y,z+.01,g).rotation.x=Math.PI/2;mesh(new T.SphereGeometry(.015,10,8),BR,x,y,z+.025,g);};
  const panelDoor=(g,x,y,z,w,h,m)=>{mesh(rbox(w,h,.02,.004),m,x,y,z,g);mesh(rbox(w-.08,h-.08,.012,.004),m,x,y,z+.012,g);mesh(rbox(w-.12,h-.12,.01,.003),m,x,y,z+.02,g);};
  /* a dinner plate standing on edge, a cup on its saucer, a crystal vase */
  const plate=(g,x,y,z,r,tilt)=>{const p=mesh(lathe([[0,0],[r*.6,0],[r*.65,.008],[r,.016],[r,.019],[r*.6,.006],[0,.004]],24),PORC,x,y,z,g);p.rotation.set(Math.PI/2-tilt,0,0);
    mesh(new T.TorusGeometry(r*.92,.0025,4,28),std({color:C(0x2a4a8a),roughness:.3}),x,y+Math.cos(tilt)*.012,z+.017,g,false).rotation.x=-tilt;};
  const cup=(g,x,y,z)=>{mesh(lathe([[0,0],[.05,0],[.065,.006],[.07,.01],[0,.008]],18),PORC,x,y,z,g);mesh(lathe([[0,0],[.025,0],[.032,.01],[.04,.06],[.038,.062],[.03,.012],[0,.012]],18),PORC,x,y+.008,z,g);
    mesh(new T.TorusGeometry(.015,.004,6,10,Math.PI*1.3),PORC,x+.042,y+.04,z,g).rotation.z=-1.2;};
  const vase=(g,x,y,z,s=1)=>{const v=mesh(lathe([[0,0],[.05,0],[.055,.02],[.04,.06],[.07,.16],[.075,.2],[.06,.22],[.064,.225],[.055,.22],[0,.03]].map(([a,b])=>[a*s,b*s]),10),CRYS,x,y,z,g);v.renderOrder=3;};
  return{W1,W2,W3,BR,IRON,TIN,PORC,CRYS,MIRR,LACE,LEDGE,doily,G,knob,panelDoor,plate,cup,vase};})();

/* ---- the sideboard (servant): a cupboard of two panelled doors under two drawers, the counter with a doily and the
   crystal; over it, set back, the glazed case on two glass shelves: plates on edge, cups on saucers, the good vase ---- */
function servant(par,x,y,z,ry){const R=RF,g=R.G(par,x,y,z,ry),W=1.36,D=.46,lh=.86,uh=.92;
  [[-W/2+.05,-D/2+.05],[W/2-.05,-D/2+.05],[-W/2+.05,D/2-.05],[W/2-.05,D/2-.05]].forEach(([a,b])=>mesh(lathe([[0,0],[.022,0],[.026,.04],[.02,.08],[0,.08]],10),R.W3,a,0,b,g));
  mesh(rbox(W,lh-.08,D,.006),R.W1,0,.08+(lh-.08)/2,0,g);mesh(rbox(W+.02,.03,D+.02,.006),R.W3,0,.08,0,g);
  [-1,1].forEach(s=>{R.panelDoor(g,s*W/4,.36,D/2,W/2-.04,.5,R.W1);R.knob(g,s*.06,.4,D/2+.02);
    mesh(rbox(W/2-.04,.15,.02,.004),R.W1,s*W/4,.72,D/2,g);R.knob(g,s*W/4,.72,D/2+.01);});
  mesh(rbox(W+.04,.03,D+.04,.006),R.W3,0,lh+.015,0,g);R.doily(g,.25,lh+.031,.06,.17);R.vase(g,.25,lh+.032,.06,1.1);
  /* the glazed case: back, sides, top with its cornice, two sliding glass doors in thin frames */
  const ud=.32,uz=-D/2+ud/2;mesh(rbox(W,uh,.015,.003),R.W1,0,lh+.03+uh/2,-D/2+.008,g);[-1,1].forEach(s=>mesh(rbox(.02,uh,ud,.004),R.W1,s*(W/2-.01),lh+.03+uh/2,uz,g));
  mesh(rbox(W+.02,.03,ud+.02,.005),R.W1,0,lh+.03+uh,uz,g);mesh(rbox(W+.08,.045,ud+.08,.008),R.W3,0,lh+.06+uh,uz,g);mesh(rbox(W+.05,.02,ud+.05,.004),R.W1,0,lh+.035+uh-.02,uz,g);
  [.32,.62].forEach(sy=>{const s=mesh(rbox(W-.04,.008,ud-.03,.002),R.CRYS,0,lh+.03+sy,uz,g);s.renderOrder=3;});
  [-1,1].forEach((s,i)=>{const gd=mesh(new T.PlaneGeometry(W/2,uh-.06),R.CRYS,s*W/4-s*.01*i,lh+.03+uh/2,uz+ud/2-.01-i*.012,g,false);gd.renderOrder=4;
    [[0,uh/2-.03,W/2,.015],[0,-uh/2+.03,W/2,.015]].forEach(([dx,dy,w,hh])=>mesh(rbox(w,hh,.012,.002),R.W3,s*W/4+dx,lh+.03+uh/2+dy,uz+ud/2-.01-i*.012,g));});
  /* the dishes: a row of plates on edge at the back of each shelf, cups on saucers in front, a teapot */
  [[lh+.04],[lh+.03+.33],[lh+.03+.63]].forEach(([sy],k)=>{for(let i=0;i<5;i++)R.plate(g,-.55+i*.12+k*.05,sy+.11,uz-.08,.11,.18);if(k<2)for(let i=0;i<3;i++)R.cup(g,.15+i*.15,sy,uz+.05);});
  mesh(lathe([[0,0],[.06,0],[.08,.04],[.078,.09],[.05,.12],[.02,.125],[.025,.14],[0,.15]],18),R.PORC,.5,lh+.04,uz+.02,g);
  g.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true;}});return g;}

/* ---- the dowry chest (sunduk): painted planks under tinned iron straps and corner plates, a lock plate with its hasp,
   the lid slightly cambered, on four block feet; a folded blanket and a doily on top ---- */
function sunduk(par,x,y,z,ry,col){const R=RF,g=R.G(par,x,y,z,ry),W=.95,D=.52,H=.44;const paint=std({map:TX.boards,color:C(col||0x5a3828),roughness:.6,envMapIntensity:.3});
  [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([a,b])=>mesh(rbox(.08,.05,.08,.008),R.W3,a*(W/2-.06),.025,b*(D/2-.06),g));
  mesh(rbox(W,H,D,.01),paint,0,.05+H/2,0,g);
  /* the lid, gently cambered: a half round flattened, standing on the lid rim */
  {const lid=new T.CylinderGeometry(D/2+.01,D/2+.01,W+.02,24,1,false,0,Math.PI);lid.rotateZ(Math.PI/2);lid.scale(1,.18,1);mesh(lid,paint,0,.05+H+.006,0,g);}
  mesh(rbox(W+.02,.012,D+.02,.003),R.TIN,0,.05+H,0,g);
  [-.32,0,.32].forEach(sx=>{mesh(rbox(.05,H+.004,D+.012,.003),R.TIN,sx,.05+H/2,0,g);for(let k=0;k<4;k++)[-1,1].forEach(sz=>mesh(new T.SphereGeometry(.007,6,5),R.TIN,sx,.12+k*.1,sz*(D/2+.007),g));});
  [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([a,b])=>mesh(rbox(.1,.1,.1,.01),R.TIN,a*(W/2-.04),.1,b*(D/2-.04),g).scale.set(1,1,1));
  mesh(rbox(.14,.16,.012,.004),R.TIN,0,.05+H-.12,D/2+.006,g);mesh(rbox(.04,.1,.016,.004),R.TIN,0,.05+H-.04,D/2+.01,g);mesh(new T.TorusGeometry(.018,.004,6,12),R.TIN,0,.05+H-.15,D/2+.016,g);
  [-1,1].forEach(s=>{const h=mesh(new T.TorusGeometry(.04,.007,6,14,Math.PI),R.IRON,s*(W/2+.012),.05+H*.7,0,g);h.rotation.set(0,Math.PI/2,Math.PI);});
  R.doily(g,0,.05+H+.03,0,.2);const bl=mesh(rbox(.5,.08,.36,.03),std({map:TX.cloth,color:C(0x6a3a3a),roughness:1}),-.15,.05+H+.07,-.02,g);bl.rotation.y=.12;
  g.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true;}});return g;}

/* ---- a bentwood ("Viennese") chair: the round seat with its woven cane, four turned legs splayed out with the ring
   stretcher, the back legs bent up into the hoop with the inner loop ---- */
function viennaChair(par,x,y,z,ry,fall){const R=RF,g=R.G(par,x,y,z,ry);if(fall){g.rotation.set(0,ry,Math.PI/2);g.position.y=y+.2;}
  const caneT=tex(64,64,(c,w,h)=>{c.fillStyle='#c8a870';c.fillRect(0,0,w,h);c.strokeStyle='rgba(90,60,30,.6)';for(let i=-64;i<64;i+=6){c.beginPath();c.moveTo(i,0);c.lineTo(i+64,64);c.stroke();c.beginPath();c.moveTo(i+64,0);c.lineTo(i,64);c.stroke();}});
  mesh(new T.CylinderGeometry(.205,.2,.035,28),R.W3,0,.45,0,g);mesh(new T.CircleGeometry(.17,24),std({map:caneT,roughness:.85}),0,.469,0,g,false).rotation.x=-Math.PI/2;
  [[-1,1],[1,1],[-1,-1],[1,-1]].forEach(([a,b])=>{const l=mesh(new T.CylinderGeometry(.016,.012,.46,10),R.W3,a*.15,.22,b*.15,g);l.rotation.set(b*.08,0,-a*.08);});
  mesh(new T.TorusGeometry(.16,.008,6,28),R.W3,0,.17,0,g).rotation.x=Math.PI/2;
  const hoop=mesh(new T.TorusGeometry(.17,.013,8,28,Math.PI),R.W3,0,.69,-.17,g);const inner=mesh(new T.TorusGeometry(.09,.009,6,20,Math.PI),R.W3,0,.62,-.165,g);
  [-1,1].forEach(a=>mesh(new T.CylinderGeometry(.013,.013,.25,8),R.W3,a*.17,.57,-.17,g));inner.scale.set(1,1.3,1);
  g.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true;}});return g;}

/* ---- the round table under its cloth (hem fringed), a lace doily in the middle with the crystal vase ---- */
function roundTable(par,x,y,z,col){const R=RF,g=R.G(par,x,y,z,0);mesh(new T.CylinderGeometry(.06,.18,.06,16),R.W3,0,.03,0,g);mesh(new T.CylinderGeometry(.04,.05,.68,12),R.W3,0,.38,0,g);
  mesh(new T.CylinderGeometry(.5,.5,.03,40),R.W2,0,.74,0,g);
  const clothT=tex(256,64,(c,w,h)=>{c.fillStyle=col||'#7a2a26';c.fillRect(0,0,w,h);c.strokeStyle='rgba(230,200,120,.6)';c.lineWidth=2;for(let i=0;i<w;i+=16){c.beginPath();c.moveTo(i,6);c.lineTo(i+8,14);c.lineTo(i+16,6);c.stroke();}
    c.clearRect(0,h-10,w,10);c.fillStyle=col||'#7a2a26';for(let i=0;i<w;i+=3)c.fillRect(i,h-10,1.4,10);});clothT.wrapS=T.RepeatWrapping;clothT.repeat.set(4,1);
  const cm=std({map:clothT,alphaTest:.5,side:T.DoubleSide,roughness:.95,envMapIntensity:.15});
  /* the top of the cloth: the same plush, its woven border running round just inside the edge (no fringe up here) */
  const topT=tex(256,256,(c,w,h)=>{c.fillStyle=col||'#7a2a26';c.fillRect(0,0,w,h);c.strokeStyle='rgba(230,200,120,.55)';c.lineWidth=2.5;[118,108].forEach(r=>{c.beginPath();c.arc(w/2,h/2,r,0,7);c.stroke();});
    for(let i=0;i<64;i++){const a=i/64*Math.PI*2,b=(i+.5)/64*Math.PI*2;c.beginPath();c.moveTo(w/2+Math.cos(a)*112,h/2+Math.sin(a)*112);c.lineTo(w/2+Math.cos(b)*104,h/2+Math.sin(b)*104);c.stroke();}
    const im=c.getImageData(0,0,w,h),d=im.data;for(let i=0;i<d.length;i+=4){const k=.9+Math.random()*.16;d[i]*=k;d[i+1]*=k;d[i+2]*=k;}c.putImageData(im,0,0);});
  mesh(new T.CircleGeometry(.55,40),std({map:topT,roughness:.95,envMapIntensity:.15}),0,.757,0,g,false).rotation.x=-Math.PI/2;
  const sk=new T.CylinderGeometry(.55,.6,.3,40,4,true);const p=sk.attributes.position;for(let i=0;i<p.count;i++){const a=Math.atan2(p.getZ(i),p.getX(i)),yy=p.getY(i);const k=(.15-yy)/.3;const r=.55+k*.05+Math.sin(a*14)*.012*k;p.setX(i,Math.cos(a)*r);p.setZ(i,Math.sin(a)*r);}sk.computeVertexNormals();
  mesh(sk,cm,0,.755-.15,0,g,false);R.doily(g,0,.762,0,.18);R.vase(g,0,.763,0,1.2);
  g.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true;}});return g;}
/* ---- the silk lampshade (abazhur) over the table: a cord from the ceiling, the shade ribbed and fringed ---- */
function abazhur(par,x,z,ceilY,col){const g=RF.G(par,x,ceilY,z,0);mesh(new T.CylinderGeometry(.004,.004,.55,5),RF.IRON,0,-.275,0,g);mesh(new T.CylinderGeometry(.04,.03,.04,10),RF.BR,0,-.04,0,g);
  const sh=lathe([[.06,0],[.12,-.03],[.26,-.12],[.33,-.2],[.34,-.24]],24);const m=mesh(sh,std({color:C(col||0xd06a30),roughness:.8,side:T.DoubleSide,emissive:C(0x221005)}),0,-.55,0,g);
  const fr=new T.CylinderGeometry(.34,.345,.09,40,1,true);mesh(fr,RF.LEDGE,0,-.55-.285,0,g,false);return g;}

/* ---- the Rubin television on its splayed legs: walnut cabinet, the bulging grey screen in its bezel, the control
   panel with channel and volume knobs, speaker cloth; a doily on top with a porcelain figure ---- */
function tvRubin(par,x,y,z,ry){const R=RF,g=R.G(par,x,y,z,ry);
  [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([a,b])=>{const l=mesh(new T.CylinderGeometry(.012,.018,.5,8),R.W3,a*.26,.25,b*.17,g);l.rotation.set(b*.12,0,-a*.12);mesh(new T.SphereGeometry(.014,8,6),R.BR,a*.29,.012,b*.2,g);});
  mesh(rbox(.6,.02,.38,.004),R.W1,0,.5,0,g);
  mesh(rbox(.62,.5,.44,.02),R.W1,0,.76,0,g);mesh(rbox(.42,.34,.2,.03),std({color:C(0x2a2622),roughness:.7}),0,.74,-.28,g);
  mesh(rbox(.42,.36,.02,.03),std({color:C(0x8a8478),roughness:.4,metalness:.3}),-.08,.77,.22,g);
  {const sc=new T.PlaneGeometry(.34,.28,10,10);const p=sc.attributes.position;for(let i=0;i<p.count;i++){const u=p.getX(i)/.17,v=p.getY(i)/.14;p.setZ(i,.025*(1-u*u*.8)*(1-v*v*.8));}sc.computeVertexNormals();
   mesh(sc,std({color:C(0x343a38),roughness:.06,metalness:.2,envMapIntensity:1.2}),-.08,.77,.232,g);}
  const grT=tex(64,128,(c,w,h)=>{c.fillStyle='#6a5a44';c.fillRect(0,0,w,h);c.strokeStyle='rgba(40,30,20,.5)';for(let i=0;i<w;i+=3){c.beginPath();c.moveTo(i,0);c.lineTo(i,h);c.stroke();}for(let j=0;j<h;j+=3){c.beginPath();c.moveTo(0,j);c.lineTo(w,j);c.stroke();}});
  mesh(new T.PlaneGeometry(.1,.2),std({map:grT,roughness:.95}),.225,.82,.222,g,false);
  [.68,.6].forEach((yy,i)=>{mesh(new T.CylinderGeometry(.022,.022,.025,16),R.W3,.225,yy,.235,g).rotation.x=Math.PI/2;mesh(new T.CylinderGeometry(.006,.006,.03,8),R.BR,.225,yy,.25,g).rotation.x=Math.PI/2;});
  R.doily(g,0,1.012,0,.18);mesh(lathe([[0,0],[.03,0],[.03,.01],[.015,.03],[.02,.07],[.012,.1],[.018,.115],[0,.13]],14),R.PORC,.12,1.015,0,g);
  g.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true;}});return g;}

/* ---- the chest of drawers (komod): three drawers with raised fronts and brass pulls, top with a doily and a small
   mirror on its stand; the oval mirror in its frame on the wall over it ---- */
function komod(par,x,y,z,ry,wallMirror){const R=RF,g=R.G(par,x,y,z,ry),W=.95,D=.46,H=.86;
  mesh(rbox(W,.07,D,.006),R.W3,0,.035,0,g);mesh(rbox(W,H-.07,D-.02,.006),R.W2,0,.07+(H-.07)/2,-.01,g);
  for(let i=0;i<3;i++){const yy=.17+i*.24;R.panelDoor(g,0,yy,D/2-.02,W-.06,.21,R.W2);[-1,1].forEach(s=>{mesh(rbox(.08,.012,.012,.003),R.BR,s*.26,yy,D/2+.015,g);mesh(new T.TorusGeometry(.03,.004,6,12,Math.PI),R.BR,s*.26,yy-.005,D/2+.02,g).rotation.z=Math.PI;});mesh(rbox(.04,.05,.006,.002),R.BR,0,yy+.03,D/2+.01,g);}
  mesh(rbox(W+.04,.03,D+.04,.006),R.W3,0,H+.015,0,g);R.doily(g,0,H+.032,0,.2);
  const ms=R.G(g,-.25,H+.03,-.05,.3);mesh(rbox(.18,.02,.1,.004),R.W3,0,.01,0,ms);[-1,1].forEach(s=>mesh(new T.CylinderGeometry(.006,.006,.2,6),R.W3,s*.09,.11,0,ms));
  const mm=mesh(new T.CircleGeometry(.08,24),R.MIRR,0,.15,.005,ms);mm.scale.set(1,1.3,1);const mf=mesh(new T.TorusGeometry(.08,.008,6,24),R.W3,0,.15,0,ms);mf.scale.set(1,1.3,1);
  if(wallMirror){const wm=R.G(g,0,H+.62,-D/2-.01,0);const m=mesh(new T.CircleGeometry(.24,32),R.MIRR,0,0,.012,wm);m.scale.set(1,1.35,1);const f=mesh(new T.TorusGeometry(.24,.02,8,36),R.W3,0,0,.012,wm);f.scale.set(1,1.35,1);}
  g.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true;}});return g;}

/* ---- the Podolsk treadle sewing machine: cast-iron side frames, the treadle and its belt wheel, the wooden top with
   the black arm, the hand wheel, the needle bar, gilt scrollwork on the arm ---- */
function sewingMachine(par,x,y,z,ry){const R=RF,g=R.G(par,x,y,z,ry);
  const frame=new T.Shape();frame.moveTo(-.2,0);frame.lineTo(.2,0);frame.lineTo(.14,.12);frame.lineTo(.06,.68);frame.lineTo(-.06,.68);frame.lineTo(-.14,.12);frame.closePath();
  const hole=new T.Path();hole.absellipse(0,.32,.05,.14,0,Math.PI*2);frame.holes.push(hole);const h2=new T.Path();h2.absarc(0,.56,.03,0,Math.PI*2);frame.holes.push(h2);
  [-1,1].forEach(s=>{const f=mesh(new T.ExtrudeGeometry(frame,{depth:.025,bevelEnabled:true,bevelSize:.004,bevelThickness:.004,bevelSegments:1}),R.IRON,s*.28,0,0,g);f.rotation.y=Math.PI/2;f.position.z=-.012+.0;});
  mesh(rbox(.56,.03,.04,.005),R.IRON,0,.1,0,g);const tr=mesh(rbox(.4,.015,.22,.004),R.IRON,0,.12,.02,g);tr.rotation.x=-.12;
  const wh=mesh(new T.TorusGeometry(.14,.012,6,24),R.IRON,.24,.38,0,g);wh.rotation.y=Math.PI/2;for(let i=0;i<4;i++){const sp=mesh(new T.CylinderGeometry(.006,.006,.26,5),R.IRON,.24,.38,0,g);sp.rotation.x=i*Math.PI/4;}
  mesh(rbox(.72,.035,.42,.008),R.W2,0,.7,0,g);mesh(rbox(.12,.12,.32,.01),R.W2,-.28,.62,0,g);
  /* the machine: bed plate, the curved arm and head, hand wheel, needle bar, spool pin with thread */
  const blk=std({color:C(0x0e0e0e),roughness:.25,metalness:.3,envMapIntensity:1.1});const gilt=tex(256,64,(c,w,h)=>{c.fillStyle='#0e0e0e';c.fillRect(0,0,w,h);c.strokeStyle='#c8a050';c.lineWidth=2;for(let i=0;i<8;i++){c.beginPath();c.arc(20+i*30,h/2,10,0,5);c.stroke();}c.fillStyle='#c8a050';c.font='bold 16px serif';c.fillText('ПОДОЛЬСК',60,h-6);});
  mesh(rbox(.36,.03,.17,.008),blk,0,.735,0,g);const arm=new T.Shape();arm.moveTo(-.16,0);arm.lineTo(-.12,0);arm.lineTo(-.12,.18);arm.quadraticCurveTo(-.1,.24,0,.24);arm.lineTo(.14,.24);arm.lineTo(.17,.2);arm.lineTo(.17,.13);arm.lineTo(.13,.13);arm.lineTo(.13,.17);arm.lineTo(-.04,.17);arm.quadraticCurveTo(-.08,.17,-.08,.12);arm.lineTo(-.08,0);arm.closePath();
  const am=mesh(new T.ExtrudeGeometry(arm,{depth:.07,bevelEnabled:true,bevelSize:.012,bevelThickness:.012,bevelSegments:3}),std({map:gilt,color:C(0xffffff),roughness:.25,metalness:.3,envMapIntensity:1.1}),0,.75,-.035,g);
  const hw=mesh(new T.CylinderGeometry(.06,.06,.03,24),R.TIN,-.17,.94,0,g);hw.rotation.z=Math.PI/2;mesh(new T.CylinderGeometry(.008,.008,.12,6),R.TIN,.15,.84,0,g);mesh(new T.CylinderGeometry(.004,.004,.06,5),R.TIN,0,.98,0,g);
  mesh(new T.CylinderGeometry(.012,.012,.03,10),std({color:C(0xd8d0b8),roughness:.8}),.03,1.01,0,g);
  g.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true;}});return g;}

/* ---- a made bed's finery: three pillows stacked largest to smallest under a lace cover (nakidka), and the lace valance
   (podzor) hanging along the side of the bed ---- */
function pillowStack(par,x,y,z,ry,len){const R=RF,g=R.G(par,x,y,z,ry);const pw=std({map:TX.cloth,color:C(0xf2eee4),roughness:.95});
  [[.62,.14,.36,0],[.5,.12,.3,.11],[.38,.1,.24,.2]].forEach(([w,h,d,yy])=>{const p=mesh(new T.SphereGeometry(.5,20,12),pw,0,yy+h/2,0,g);p.scale.set(w,h,d);});
  const nk=mesh(new T.PlaneGeometry(.42,.3),R.LACE,0,.28,.06,g,false);nk.rotation.x=-.9;
  if(len){const v=mesh(new T.PlaneGeometry(len,.22),R.LEDGE,0,-.2,.47,g,false);v.material=R.LEDGE;}
  return g;}
/* ---- the icon lamp: a red glass cup in a brass cradle hung on three fine chains under the icon shelf ---- */
function lampada(par,x,y,z){const g=RF.G(par,x,y,z,0);[0,2.1,4.2].forEach(a=>{const c=mesh(new T.CylinderGeometry(.0015,.0015,.22,3),RF.BR,Math.cos(a)*.03,-.11,Math.sin(a)*.03,g);c.rotation.set(Math.sin(a)*.12,0,-Math.cos(a)*.12);});
  mesh(lathe([[0,0],[.035,.005],[.042,.03],[.04,.05],[0,.05]],14),RF.BR,0,-.27,0,g);mesh(lathe([[0,0],[.03,.0],[.038,.045],[.034,.07],[0,.06]],14),std({color:C(0xa01818),roughness:.1,transparent:true,opacity:.75,emissive:C(0x300404)}),0,-.25,0,g);return g;}
/* ---- a woven wall rug (kovyor) of deer at a forest edge, in its fringe ---- */
function deerRug(par,x,y,z,ry,w,h){const t=tex(256,192,(c,W,H)=>{c.fillStyle='#3a4a2a';c.fillRect(0,0,W,H);const g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,'#8aa0a8');g.addColorStop(.55,'#6a7a58');g.addColorStop(1,'#3a4a2a');c.fillStyle=g;c.fillRect(8,8,W-16,H-16);
    c.fillStyle='#24301c';for(let i=0;i<14;i++){const x=10+i*18,h=40+(i*37)%50;c.beginPath();c.moveTo(x,H*.62);c.lineTo(x+9,H*.62-h);c.lineTo(x+18,H*.62);c.fill();}
    const deer=(x,y,s,f)=>{c.save();c.translate(x,y);c.scale(s*f,s);c.fillStyle='#7a4a24';c.beginPath();c.ellipse(0,0,18,8,0,0,7);c.fill();c.fillRect(-14,4,3,18);c.fillRect(-8,4,3,18);c.fillRect(8,4,3,18);c.fillRect(13,4,3,18);
      c.beginPath();c.moveTo(14,-4);c.lineTo(22,-18);c.lineTo(28,-16);c.lineTo(20,-2);c.fill();c.strokeStyle='#5a3418';c.lineWidth=2;c.beginPath();c.moveTo(24,-18);c.lineTo(20,-32);c.moveTo(22,-26);c.lineTo(28,-32);c.moveTo(26,-18);c.lineTo(32,-30);c.stroke();c.restore();};
    deer(W*.38,H*.72,1.1,1);deer(W*.66,H*.76,.9,-1);c.strokeStyle='#c8a860';c.lineWidth=5;c.strokeRect(5,5,W-10,H-10);
    const im=c.getImageData(0,0,W,H),d=im.data;for(let i=0;i<d.length;i+=4){const k=.82+Math.random()*.3;d[i]*=k;d[i+1]*=k;d[i+2]*=k;}c.putImageData(im,0,0);});
  const m=mesh(new T.PlaneGeometry(w,h),std({map:t,roughness:1,envMapIntensity:.1}),x,y,z,par,false);m.rotation.y=ry;return m;}
