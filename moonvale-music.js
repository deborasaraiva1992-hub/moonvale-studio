(function(){
  // One track per zone. Atlas plays the general theme too — it layers its
  // own ocean ambience underneath separately (see the inline script in
  // atlas.html), rather than replacing the theme with a different zone track.
  const TRACKS={
    general:'audio/moonvale-theme.mp3',
    ethernia:'audio/ethernia-theme.mp3',
    fantasy:'audio/fantasy-theme.mp3',
    lore:'audio/lore-library-theme.mp3',
    shop:'audio/artefacts-theme.mp3'
  };

  function detectZone(){
    const file=location.pathname.split('/').pop();
    if(file==='ethernia.html')return'ethernia';
    if(file==='fantasy.html')return'fantasy';
    if(file==='lore-library.html')return'lore';
    if(file==='artefacts.html')return'shop';
    if(file==='chronicles.html'||file==='relics.html'||file==='characters.html'||file==='regions.html')return'lore';
    if(document.querySelector('.realm-ethernia'))return'ethernia';
    if(document.querySelector('.realm-fantasy'))return'fantasy';
    return'general';
  }

  let zone=detectZone();
  const audio=document.getElementById('bgAudio');
  const player=document.getElementById('musicPlayer');
  if(!audio||!player)return;

  audio.src=TRACKS[zone]||TRACKS.general;

  const mLabel=document.getElementById('musicLabel');
  const mIcon=document.getElementById('musicIcon');
  const mVol=document.getElementById('musicVol');

  const ON_KEY='moonvale.musicOn';
  const VOL_KEY='moonvale.musicVol';
  const ZONE_KEY='moonvale.musicZone';
  const TIME_KEY='moonvale.musicTime';

  let musicOn=false;
  let fadeTimer=null;

  const savedVolRaw=parseFloat(localStorage.getItem(VOL_KEY));
  let targetVol=(!isNaN(savedVolRaw)&&savedVolRaw>=0&&savedVolRaw<=1)?savedVolRaw:0.14;
  audio.volume=0;
  if(mVol)mVol.value=String(targetVol);

  function label(key,fallback){
    try{
      const i18n=window.MoonvaleI18n;
      const lang=i18n&&i18n.getLanguage&&i18n.getLanguage();
      const t=i18n&&i18n.translations;
      return (t&&t[lang]&&t[lang][key])||(t&&t.en&&t.en[key])||fallback;
    }catch(e){return fallback;}
  }
  function updateLabel(){
    if(mLabel)mLabel.textContent=musicOn?label('music.on','MUSIC ON'):label('music.off','MUSIC OFF');
  }

  // Fires whenever the shared background-music on/off state actually changes,
  // and whenever its target volume changes — so a page can layer extra ambience
  // underneath it (see atlas.html) and keep that layer in sync with the single
  // visible music toggle/slider, without this file needing to know about it.
  function broadcastState(){
    try{window.dispatchEvent(new CustomEvent('moonvale:musicstate',{detail:{on:musicOn,vol:targetVol}}));}catch(e){}
  }

  function fadeIn(){
    musicOn=true;
    audio.muted=false;
    if(fadeTimer)clearInterval(fadeTimer);
    audio.volume=0;
    audio.play().then(()=>{
      if(mIcon)mIcon.textContent='♫';
      updateLabel();
      sessionStorage.setItem(ON_KEY,'1');
      broadcastState();
      let v=0;
      fadeTimer=setInterval(()=>{
        v=Math.min(v+.01,targetVol);audio.volume=v;
        if(v>=targetVol)clearInterval(fadeTimer);
      },60);
    }).catch(()=>{
      musicOn=false;
      updateLabel();
      broadcastState();
    });
  }

  function fadeOut(){
    musicOn=false;
    if(mIcon)mIcon.textContent='♪';
    updateLabel();
    sessionStorage.setItem(ON_KEY,'0');
    broadcastState();
    if(fadeTimer)clearInterval(fadeTimer);
    let v=audio.volume;
    fadeTimer=setInterval(()=>{
      v=Math.max(v-.01,0);audio.volume=v;
      if(v<=0){audio.pause();clearInterval(fadeTimer);}
    },60);
  }

  function toggleMusic(){if(musicOn){fadeOut();}else{fadeIn();}}
  function setVol(v){
    const vol=parseFloat(v);
    if(isNaN(vol))return;
    targetVol=vol;
    audio.volume=vol;
    localStorage.setItem(VOL_KEY,String(vol));
    broadcastState();
  }
  window.toggleMusic=toggleMusic;
  window.setVol=setVol;

  // Resume mid-track when the previous page (same zone) saved a position
  // right before navigating away — see beforeNav() below.
  try{
    const savedZone=sessionStorage.getItem(ZONE_KEY);
    const savedTime=parseFloat(sessionStorage.getItem(TIME_KEY));
    if(savedZone===zone&&!isNaN(savedTime)&&isFinite(savedTime)){
      audio.addEventListener('loadedmetadata',function once(){
        audio.currentTime=savedTime;
        audio.removeEventListener('loadedmetadata',once);
      });
    }
  }catch(e){}

  // Music plays by default for every visitor, softly — unless they've
  // explicitly turned it off earlier in this same browser session (an
  // explicit '0' in sessionStorage, as opposed to never having touched the
  // toggle at all). A fresh visit (new tab/session) always tries again,
  // regardless of what an earlier session chose — only that one session's
  // own off-choice sticks, so the person can turn it off without that
  // blocking autoplay forever. Browsers block audible autoplay without a
  // user gesture, so the honest version of "already on" is: show the ON
  // state right away, start a muted loop immediately (muted autoplay is
  // always allowed), and quietly lift the mute — gently fading up, never a
  // jump — the instant the visitor does anything else on the page. Almost
  // nobody looks at a page without touching it, so in practice it reads as
  // already playing. A click on the player itself is left to its own
  // handler instead of being double-handled here.
  const shouldAutoStart=sessionStorage.getItem(ON_KEY)!=='0';
  if(shouldAutoStart){
    musicOn=true;
    audio.muted=true;
    audio.volume=0;
    audio.play().catch(()=>{});
    sessionStorage.setItem(ON_KEY,'1');
    updateLabel();

    function rampUp(){
      if(fadeTimer)clearInterval(fadeTimer);
      let v=0;audio.volume=0;
      fadeTimer=setInterval(()=>{
        v=Math.min(v+.01,targetVol);audio.volume=v;
        if(v>=targetVol)clearInterval(fadeTimer);
      },60);
    }
    const unlockEvents=['click','keydown','touchstart','touchend','pointerdown'];
    function stopListening(){
      unlockEvents.forEach(evt=>document.removeEventListener(evt,autoEnableOnce));
    }
    // Not {once:true}: a rejected play() shouldn't burn this event type's
    // only chance — scroll/wheel are deliberately excluded above since
    // browsers don't treat them as a real user gesture for audio unlock,
    // so keep retrying on the gesture types that actually count until one
    // of them succeeds.
    function autoEnableOnce(e){
      if(player.contains(e.target))return;
      if(!audio.muted&&!audio.paused){stopListening();return;}
      audio.muted=false;
      if(audio.paused){
        audio.play().then(()=>{stopListening();rampUp();}).catch(()=>{
          audio.muted=true;
        });
      }else{
        stopListening();rampUp();
      }
    }
    unlockEvents.forEach(evt=>{
      document.addEventListener(evt,autoEnableOnce,{passive:true});
    });
  }else{
    updateLabel();
  }
  window.addEventListener('moonvale:languagechange',updateLabel);

  // Switches the active zone in-page (no navigation) — used by the realm
  // filter tabs on chronicles/relics/characters/regions, where "ALL REALMS"
  // plays the Lore Library track and picking a realm crossfades to that
  // realm's track instead. A no-op if the zone has no track of its own or
  // is already playing.
  function switchZone(newZone){
    if(newZone===zone||!TRACKS[newZone])return;
    zone=newZone;
    window.MoonvaleMusic.zone=zone;
    const newSrc=TRACKS[zone];
    if(fadeTimer)clearInterval(fadeTimer);
    if(!musicOn||audio.paused){
      audio.src=newSrc;
      return;
    }
    let v=audio.volume;
    fadeTimer=setInterval(()=>{
      v=Math.max(v-.02,0);audio.volume=v;
      if(v<=0){
        clearInterval(fadeTimer);
        audio.pause();
        audio.src=newSrc;
        audio.currentTime=0;
        audio.volume=0;
        audio.play().then(()=>{
          let v2=0;
          fadeTimer=setInterval(()=>{
            v2=Math.min(v2+.02,targetVol);audio.volume=v2;
            if(v2>=targetVol)clearInterval(fadeTimer);
          },40);
        }).catch(()=>{});
      }
    },40);
  }

  // Called by the page-transition click handler, before the page actually
  // navigates away: ducks the volume (without touching the persisted on/off
  // state) and remembers where playback was, so the next page can resume
  // there if it turns out to be the same music zone.
  window.MoonvaleMusic={
    zone:zone,
    setZone:switchZone,
    beforeNav:function(){
      if(!musicOn)return;
      try{
        sessionStorage.setItem(ZONE_KEY,zone);
        sessionStorage.setItem(TIME_KEY,String(audio.currentTime));
      }catch(e){}
      let v=audio.volume;
      const duck=setInterval(()=>{
        v=Math.max(v-.03,0);audio.volume=v;
        if(v<=0)clearInterval(duck);
      },30);
    }
  };
})();
