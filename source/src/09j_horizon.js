/* ---------- beyond the map: the land does not stop where the playable ground does. A belt of real trees stands all the
   way round just outside the edge, and behind it the forest goes on as a canopy over low rolling hills into the haze -
   so from the roads, the fields and the camp there is no edge to see, only more forest ---------- */
(function horizon(){const X0=TERR.x0,X1=TERR.x0+TERR.w,Z0=TERR.z0,Z1=TERR.z0+TERR.d;const r_=rng(4646),rr=(a,b)=>a+(b-a)*r_();
  /* (the country west of the lumber yard, WX.box, is walkable ground of its own: the ring goes round it as well, and is
     sunk out of sight under it) */
  const XB=WX.box,inB=(x,z)=>Math.max(XB.x0-x,x-XB.x1,XB.z0-z,z-XB.z1);
  const out0=(x,z)=>Math.max(X0-x,x-X1,Z0-z,z-Z1);const out=(x,z)=>Math.min(out0(x,z),inB(x,z));
  const edgeY=(x,z)=>inB(x,z)<out0(x,z)?H(clamp(x,XB.x0+1,XB.x1-1),clamp(z,XB.z0+1,XB.z1-1)):Hterr(clamp(x,X0+1,X1-1),clamp(z,Z0+1,Z1-1));
  const hills=(x,z)=>fbm(x/420+11,z/420+7,3)*30+fbm(x/130,z/130+3,2)*8-12;
  const groundY=(x,z)=>{const d=out(x,z),e=edgeY(x,z);if(inB(x,z)<-1)return e-6;return lerp(e,e*.4+hills(x,z),sstep(30,320,d))-(d<0?.6:0);};
  const canopy=(x,z)=>sstep(38,70,out(x,z))*(15.5+fbm(x/36,z/36+2,2)*5);
  /* the canopy texture: crowns seen from a distance, dark conifers with lighter birch among them */
  const ct=tex(256,256,(c,w,h)=>{c.fillStyle='#26301e';c.fillRect(0,0,w,h);const q=rng(17);for(let i=0;i<900;i++){const x=q()*w,y=q()*h,r=3+q()*9,b=q()<.25;
      c.fillStyle=b?`rgba(${70+q()*30|0},${86+q()*30|0},${44+q()*20|0},.85)`:`rgba(${22+q()*18|0},${34+q()*18|0},${22+q()*12|0},.9)`;c.beginPath();c.arc(x,y,r,0,7);c.fill();
      c.fillStyle='rgba(0,0,0,.25)';c.beginPath();c.arc(x+r*.35,y+r*.35,r*.7,0,7);c.fill();}},{rep:[1,1]});
  const mat=std({map:ct,vertexColors:true,roughness:1,envMapIntensity:.15});
  const strip=(xa,xb,za,zb,step)=>{const nx=Math.ceil((xb-xa)/step),nz=Math.ceil((zb-za)/step);const g=new T.PlaneGeometry(xb-xa,zb-za,nx,nz);g.rotateX(-Math.PI/2);g.translate((xa+xb)/2,0,(za+zb)/2);
    const p=g.attributes.position,col=new Float32Array(p.count*3),uv=g.attributes.uv;
    for(let i=0;i<p.count;i++){const x=p.getX(i),z=p.getZ(i),cy=canopy(x,z);p.setY(i,groundY(x,z)+cy);uv.setXY(i,x/42,z/42);
      const k=cy>1?.9+fbm(x/90,z/90,2)*.25:.75;const f=cy>1?1:0;col[i*3]=lerp(.52,1,f)*k;col[i*3+1]=lerp(.5,1,f)*k;col[i*3+2]=lerp(.4,1,f)*k;}
    g.setAttribute('color',new T.BufferAttribute(col,3));g.computeVertexNormals();const m=new T.Mesh(g,mat);m.receiveShadow=true;m.userData.keep=true;scene.add(m);return m;};
  const F=900,IN=12;
  strip(X0-F,X1+F,Z0-F,Z0+IN,14);strip(X0-F,X1+F,Z1-IN,Z1+F,14);strip(X0-F,X0+IN,Z0+IN,Z1-IN,14);strip(X1-IN,X1+F,Z0+IN,Z1-IN,14);
  /* the belt of trees just outside the edge, standing on the ring */
  const pine=speciesTypes(pineGeo,woodMat.bark,MP,TX.spray),birch=speciesTypes(birchGeo,woodMat.birch,MB,TX.twigBirch),dead=speciesTypes(deadGeo,woodMat.dead,null,null);
  const col=new T.Color();let n=0;
  const put=(x,z)=>{const d=out(x,z);if(d<1.5||d>50)return;/* (the kolkhoz road goes on east into the woods) */if(x>X1&&Math.abs(z+640.5)<7)return;const y=groundY(x,z)-.15;const u=r_();const s=rr(.85,1.2);col.setRGB(1,1,1).offsetHSL(rr(-.04,.04),rr(-.1,.1),rr(-.08,.05));
    if(u<.62)vegPut(pine[(r_()*pine.length)|0],x,y,z,rr(0,6.28),s,s*rr(.9,1.15),col,null);else if(u<.95)vegPut(birch[(r_()*birch.length)|0],x,y,z,rr(0,6.28),s,s*rr(.9,1.1),col,null);else vegPut(dead[(r_()*dead.length)|0],x,y,z,rr(0,6.28),s,s,null,null);n++;};
  const sp=6.8;for(let x=X0-52;x<=X1+52;x+=sp){for(const zb of [Z0,Z1])for(let dz=2;dz<=50;dz+=sp)put(x+rr(-2.5,2.5),zb+(zb===Z0?-dz:dz)+rr(-2.5,2.5));}
  for(let z=Z0+2;z<=Z1-2;z+=sp){for(const xb of [X0,X1])for(let dx=2;dx<=50;dx+=sp)put(xb+(xb===X0?-dx:dx)+rr(-2.5,2.5),z+rr(-2.5,2.5));}
  window.__horizonTrees=n;})();
