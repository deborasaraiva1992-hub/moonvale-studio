(function(){
  const ON_KEY='moonvale.musicOn';
  function soundEnabled(){
    try{return sessionStorage.getItem(ON_KEY)!=='0';}catch(e){return true;}
  }

  let ctx=null;
  function getCtx(){
    if(ctx)return ctx;
    const AC=window.AudioContext||window.webkitAudioContext;
    if(!AC)return null;
    try{ctx=new AC();}catch(e){ctx=null;}
    return ctx;
  }

  function playChime(){
    const ac=getCtx();
    if(!ac||!soundEnabled())return;
    const now=ac.currentTime;
    const master=ac.createGain();
    master.gain.value=0.6;
    master.connect(ac.destination);

    // low cinematic thump — weight on arrival
    const thump=ac.createOscillator();
    thump.type='sine';
    thump.frequency.setValueAtTime(130,now);
    thump.frequency.exponentialRampToValueAtTime(55,now+0.35);
    const thumpGain=ac.createGain();
    thumpGain.gain.setValueAtTime(0.0001,now);
    thumpGain.gain.exponentialRampToValueAtTime(0.4,now+0.03);
    thumpGain.gain.exponentialRampToValueAtTime(0.0001,now+0.5);
    thump.connect(thumpGain).connect(master);
    thump.start(now);
    thump.stop(now+0.55);

    // whoosh — filtered noise sweep
    const bufferSize=Math.floor(ac.sampleRate*0.9);
    const noiseBuffer=ac.createBuffer(1,bufferSize,ac.sampleRate);
    const data=noiseBuffer.getChannelData(0);
    for(let i=0;i<bufferSize;i++)data[i]=Math.random()*2-1;
    const noise=ac.createBufferSource();
    noise.buffer=noiseBuffer;
    const bandpass=ac.createBiquadFilter();
    bandpass.type='bandpass';
    bandpass.Q.value=0.7;
    bandpass.frequency.setValueAtTime(280,now);
    bandpass.frequency.exponentialRampToValueAtTime(2600,now+0.6);
    const noiseGain=ac.createGain();
    noiseGain.gain.setValueAtTime(0.0001,now);
    noiseGain.gain.exponentialRampToValueAtTime(0.3,now+0.28);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001,now+0.85);
    noise.connect(bandpass).connect(noiseGain).connect(master);
    noise.start(now);
    noise.stop(now+0.9);

    // golden bell chime — root, fifth, octave shimmer
    const partials=[
      {freq:659.25,delay:0.16,gain:0.24,pan:0},
      {freq:987.77,delay:0.2,gain:0.14,pan:-0.22},
      {freq:1318.5,delay:0.24,gain:0.1,pan:0.22}
    ];
    partials.forEach(p=>{
      const osc=ac.createOscillator();
      osc.type='sine';
      osc.frequency.value=p.freq;
      const g=ac.createGain();
      const start=now+p.delay;
      g.gain.setValueAtTime(0.0001,start);
      g.gain.exponentialRampToValueAtTime(p.gain,start+0.05);
      g.gain.exponentialRampToValueAtTime(0.0001,start+1.6);
      let node=osc;
      if(ac.createStereoPanner){
        const panner=ac.createStereoPanner();
        panner.pan.value=p.pan;
        osc.connect(panner);
        node=panner;
      }
      node.connect(g).connect(master);
      osc.start(start);
      osc.stop(start+1.7);
    });
  }

  function tryPlay(){
    const ac=getCtx();
    if(!ac)return;
    if(ac.state==='suspended'){
      ac.resume().then(playChime).catch(()=>{});
    }else{
      playChime();
    }
  }

  function armUnlock(){
    const events=['click','keydown','touchstart','pointerdown'];
    function onGesture(){
      tryPlay();
      events.forEach(ev=>window.removeEventListener(ev,onGesture));
    }
    events.forEach(ev=>window.addEventListener(ev,onGesture,{passive:true}));
  }

  function init(){
    const pt=document.getElementById('pageTransition');
    if(!pt)return;
    let fired=false;
    function fire(){
      if(fired)return;
      if(pt.classList.contains('hide'))return; // instant back/forward skip — stay silent
      fired=true;
      const ac=getCtx();
      if(ac&&ac.state==='running')playChime();
      else armUnlock();
    }
    if(pt.classList.contains('ready'))fire();
    const obs=new MutationObserver(()=>{if(pt.classList.contains('ready'))fire();});
    obs.observe(pt,{attributes:true,attributeFilter:['class']});
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);
  else init();

  window.MoonvaleTransitionSFX={play:playChime};
})();
