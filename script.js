const menuButton=document.querySelector('.menu-button');
const nav=document.querySelector('#main-nav');
const topButton=document.querySelector('.back-to-top');

menuButton.addEventListener('click',()=>{
  const open=menuButton.getAttribute('aria-expanded')==='true';
  menuButton.setAttribute('aria-expanded',String(!open));
  nav.classList.toggle('open',!open);
});

nav.addEventListener('click',event=>{
  if(event.target.matches('a')){
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded','false');
  }
});

const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('is-visible')});
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(element=>revealObserver.observe(element));

const photoshopGallery=document.querySelector('#photoshop .poster-grid');
if(photoshopGallery){
  const photoshopObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting)return;
      entry.target.classList.add('ps-animation-ready');
      photoshopObserver.unobserve(entry.target);
    });
  },{threshold:.45});
  photoshopObserver.observe(photoshopGallery);
}

const indesignShowcase=document.querySelector('#indesign .single-showcase');
if(indesignShowcase){
  const indesignObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting)return;
      entry.target.classList.add('id-animation-ready');
      indesignObserver.unobserve(entry.target);
    });
  },{threshold:.45});
  indesignObserver.observe(indesignShowcase);
}

window.addEventListener('scroll',()=>topButton.classList.toggle('show',window.scrollY>700),{passive:true});
topButton.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

const exploreHandle=document.querySelector('.explore-link');
const casesSection=document.querySelector('#cases');
const toolsSection=document.querySelector('#tools');

if(exploreHandle&&casesSection&&toolsSection){
  let dragging=false;
  let startY=0;
  let draggedDistance=0;
  let sectionHeight=0;

  const finishDrag=()=>{
    if(!dragging)return;
    dragging=false;
    exploreHandle.classList.remove('is-dragging');
    casesSection.classList.remove('is-dragging');
    casesSection.style.removeProperty('transform');
    casesSection.classList.toggle('is-open',draggedDistance>Math.min(100,sectionHeight*.18));
  };

  exploreHandle.addEventListener('pointerdown',event=>{
    if(event.button!==0)return;
    event.preventDefault();
    dragging=true;
    startY=event.clientY;
    draggedDistance=0;
    sectionHeight=casesSection.offsetHeight;
    exploreHandle.classList.add('is-dragging');
    casesSection.classList.add('is-dragging');
    exploreHandle.setPointerCapture(event.pointerId);
  });

  exploreHandle.addEventListener('pointermove',event=>{
    if(!dragging)return;
    event.preventDefault();
    draggedDistance=Math.min(sectionHeight,Math.max(0,startY-event.clientY));
    casesSection.style.transform=`translate3d(0,${-draggedDistance}px,0)`;
  });

  exploreHandle.addEventListener('pointerup',finishDrag);
  exploreHandle.addEventListener('pointercancel',finishDrag);
  exploreHandle.addEventListener('click',event=>event.preventDefault());
  exploreHandle.addEventListener('keydown',event=>{
    if(event.key==='Enter'||event.key===' '){
      event.preventDefault();
      casesSection.style.removeProperty('transform');
      casesSection.classList.add('is-open');
    }
  });

  document.querySelectorAll('a[href="#cases"]').forEach(link=>link.addEventListener('click',()=>{
    casesSection.style.removeProperty('transform');
    casesSection.classList.remove('is-open');
  }));
}
