(() => {
  const $=s=>document.querySelector(s),stage=$('#cover-3d-stage'),cover=$('#cover-3d'),lightbox=$('#photo-lightbox');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;let enabled=!reduced,rx=0,ry=0,drag=null,returnFocus=null;
  function render(){cover.style.setProperty('--photo-rx',rx+'deg');cover.style.setProperty('--photo-ry',ry+'deg');stage.classList.toggle('depth-disabled',!enabled)}
  function center(){rx=ry=0;render()}
  function tilt(x,y){if(!enabled)return;const r=stage.getBoundingClientRect();if(!r.width||!r.height)return;ry=Math.max(-6,Math.min(6,((x-r.left)/r.width-.5)*12));rx=Math.max(-4,Math.min(4,-((y-r.top)/r.height-.5)*8));render()}
  stage.addEventListener('pointermove',e=>{if(e.pointerType==='mouse'||drag)tilt(e.clientX,e.clientY)});stage.addEventListener('pointerdown',e=>{if(!enabled)return;drag=e.pointerId;tilt(e.clientX,e.clientY);stage.setPointerCapture?.(e.pointerId)});function end(){drag=null}stage.addEventListener('pointerup',end);stage.addEventListener('pointercancel',()=>{end();center()});stage.addEventListener('pointerleave',()=>{if(!drag)center()});stage.addEventListener('lostpointercapture',end);stage.addEventListener('keydown',e=>{if(!enabled||!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home'].includes(e.key))return;e.preventDefault();if(e.key==='Home'){center();return}if(e.key==='ArrowLeft')ry=Math.max(-6,ry-2);if(e.key==='ArrowRight')ry=Math.min(6,ry+2);if(e.key==='ArrowUp')rx=Math.max(-4,rx-2);if(e.key==='ArrowDown')rx=Math.min(4,rx+2);render()});
  function open(src,alt,caption){returnFocus=document.activeElement;$('#photo-lightbox-image').src=src;$('#photo-lightbox-image').alt=alt;$('#photo-lightbox-caption').textContent=caption;lightbox.showModal()}
  window.WebversePhoto={open};$('#photo-lightbox-close').onclick=()=>lightbox.close();lightbox.addEventListener('close',()=>returnFocus?.focus?.());lightbox.addEventListener('click',e=>{if(e.target===lightbox)lightbox.close()});render();
})();
