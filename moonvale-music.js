(function(){
  // One track per zone. Ethernia/Fantasy point at the general theme for now —
  // once their dedicated files are added to audio/, just update these two paths.
  const TRACKS={
    general:'audio/moonvale-theme.mp3',
    ethernia:'audio/moonvale-theme.mp3',
    fantasy:'audio/moonvale-theme.mp3'
  };

  function detectZone(){
    const file=location.pathname.split('/').pop();
    if(file==='ethernia.html')return'ethernia';
    if(file==='fantasy.html')return'fantasy';
    if(document.querySelector('.realm-ethernia'))return'ethernia';
    if(document.querySelector('.realm-fantasy'))return'fantasy';
    return'general';
  }

  const zone=detectZone();
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
  let targetVol=(!isNaN(savedVolRaw)&&savedVolRaw>=0&&savedVolRaw<=1)?savedVolRaw:0.18;
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

  function fadeIn(){
    musicOn=true;
    if(fadeTimer)clearInterval(fadeTimer);
    audio.volume=0;
    audio.play().then(()=>{
      if(mIcon)mIcon.textContent='♫';
      updateLabel();
      localStorage.setItem(ON_KEY,'1');
      let v=0;
      fadeTimer=setInterval(()=>{
        v=Math.min(v+.01,targetVol);audio.volume=v;
        if(v>=targetVol)clearInterval(fadeTimer);
      },60);
    }).catch(()=>{
      musicOn=false;
      updateLabel();
    });
  }

  function fadeOut(){
    musicOn=false;
    if(mIcon)mIcon.textContent='♪';
    updateLabel();
    localStorage.setItem(ON_KEY,'0');
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

  if(localStorage.getItem(ON_KEY)==='1'){
    fadeIn();
  }else{
    updateLabel();
  }
  window.addEventListener('moonvale:languagechange',updateLabel);

  // Called by the page-transition click handler, before the page actually
  // navigates away: ducks the volume (without touching the persisted on/off
  // state) and remembers where playback was, so the next page can resume
  // there if it turns out to be the same music zone.
  window.MoonvaleMusic={
    zone:zone,
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
