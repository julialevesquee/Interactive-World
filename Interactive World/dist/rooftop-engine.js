(() => {
  const roofs=[{x:-120,end:320,y:0,z:0,depth:280},{x:520,end:820,y:20,z:0,depth:280},{x:1100,end:1400,y:0,z:0,depth:280},{x:1690,end:2080,y:35,z:0,depth:300}];
  const anchors=[{x:420,y:300,z:0},{x:965,y:340,z:0},{x:1540,y:345,z:0}];
  const trackers=[{x:210,y:30,z:0},{x:675,y:50,z:0},{x:1250,y:30,z:0}];
  class Course {
    constructor(){this.reset()}
    reset(){this.player={x:60,y:0,z:0,vx:0,vy:0,vz:0,grounded:true};this.collected=new Set();this.rope=null;this.time=0;this.falls=0;this.checkpoint=0;this.complete=false;this.message='Run toward the gold tracker. Jump at the edge, then attach a web.';return this}
    roofAt(x,z){return roofs.findIndex(r=>x>=r.x-8&&x<=r.end+8&&Math.abs(z-r.z)<=r.depth/2)}
    jump(){if(this.complete)return;const p=this.player;if(this.rope){this.release();p.vy=Math.max(p.vy,250);p.grounded=false;this.message='Web released. Steer toward the next rooftop.'}else if(p.grounded){p.vy=395;p.grounded=false;this.message='In the air. Press E or Web to catch a glowing anchor.'}}
    attach(index){if(this.complete)return false;if(this.rope){this.release();return true}const p=this.player;let i=index;if(i===undefined){let best=Infinity;i=-1;anchors.forEach((a,n)=>{const d=Math.hypot(p.x-a.x,p.y+25-a.y,p.z-a.z);if(d<best&&a.x>p.x-120){best=d;i=n}})}const a=anchors[i];if(!a)return false;const distance=Math.hypot(p.x-a.x,p.y+25-a.y,p.z-a.z);if(distance>455){this.message='Move closer to a glowing anchor first.';return false}this.rope={index:i,length:Math.max(150,Math.min(285,distance))};if(p.grounded)p.vy=300;p.grounded=false;this.message='Web attached! Hold right to swing. Press E or Web again to release.';return true}
    release(){this.rope=null;this.message='Web released. Aim for the next roof.'}
    respawn(countFall=true){const r=roofs[this.checkpoint];this.player={x:this.checkpoint?r.x+48:60,y:r.y,z:0,vx:0,vy:0,vz:0,grounded:true};this.rope=null;if(countFall)this.falls++;this.message='Back at your checkpoint. Your collected trackers are safe.'}
    tick(dt,input={}){if(this.complete)return;dt=Math.min(Math.max(dt,0),.05);this.time+=dt;const steps=Math.ceil(dt/(1/120))||1;for(let n=0;n<steps;n++)this.step(dt/steps,input)}
    step(dt,input){const p=this.player,previousY=p.y;const ix=Math.max(-1,Math.min(1,input.x||0)),iz=Math.max(-1,Math.min(1,input.z||0));if(p.grounded){const blend=Math.min(1,dt*13);p.vx+=(ix*285-p.vx)*blend;p.vz+=(iz*180-p.vz)*blend;if(this.roofAt(p.x,p.z)<0)p.grounded=false}else{p.vx+=ix*480*dt;p.vz+=iz*330*dt;p.vx*=Math.exp(-.32*dt);p.vz*=Math.exp(-.65*dt)}p.vx=Math.max(-430,Math.min(430,p.vx));p.vz=Math.max(-210,Math.min(210,p.vz));if(!p.grounded)p.vy-=930*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.z+=p.vz*dt;
      if(this.rope){const a=anchors[this.rope.index],dx=p.x-a.x,dy=p.y+25-a.y,dz=p.z-a.z,d=Math.hypot(dx,dy,dz);if(d>this.rope.length){const nx=dx/d,ny=dy/d,nz=dz/d;p.x=a.x+nx*this.rope.length;p.y=a.y+ny*this.rope.length-25;p.z=a.z+nz*this.rope.length;const radial=p.vx*nx+p.vy*ny+p.vz*nz;if(radial>0){p.vx-=radial*nx;p.vy-=radial*ny;p.vz-=radial*nz}}}
      if(p.vy<=0){const i=this.roofAt(p.x,p.z);if(i>=0&&previousY>=roofs[i].y-.5&&p.y<=roofs[i].y){p.y=roofs[i].y;p.vy=0;p.grounded=true;if(i>this.checkpoint){this.checkpoint=i;this.message='Checkpoint reached. Collect the tracker and keep going.'}if(this.rope)this.release()}}
      trackers.forEach((t,i)=>{if(!this.collected.has(i)&&Math.hypot(p.x-t.x,p.y+22-t.y,p.z-t.z)<43){this.collected.add(i);this.message='Tracker recovered! '+this.collected.size+' of 3.'}});
      if(p.y< -240||p.x< -200||Math.abs(p.z)>430)this.respawn();if(p.x>1900&&p.grounded&&this.checkpoint===3){if(this.collected.size===3){this.complete=true;this.rope=null;this.message='Course complete! All trackers recovered.'}else this.message='Reach the finish with all three gold trackers. Restart to try again.'}
    }
  }
  window.RooftopPhysics={Course,roofs,anchors,trackers};
})();
