(function(){
  const KEY='moonvale.language';
  const order=['en','pt','es'];
  const copy='© 2026 Moonvale Studio. Todos os direitos reservados.';
  const base={
    en:{
      'nav.home':'HOME','nav.ethernia':'ETHERNIA','nav.fantasy':'FANTASY','nav.lore':'LORE LIBRARY','nav.artefacts':'ARTEFACTS','nav.about':'ABOUT',
      'footer.tagline':'Between Stars And Stories','footer.desc':'We are the bridge between worlds and imagination.','footer.navigation':'NAVIGATION','footer.worlds':'WORLDS','footer.archive':'ARCHIVE','footer.connect':'CONTACT','footer.atlas':'Atlas','footer.copy':copy,
      'archive.regions':'Regions','archive.characters':'Characters','archive.relics':'Relics','archive.chronicles':'Chronicles','footer.link.home':'Home','footer.link.ethernia':'Ethernia','footer.link.fantasy':'Fantasy','footer.link.lore':'Lore Library','footer.link.artefacts':'Artefacts','footer.link.about':'About','footer.link.atlas':'Atlas','footer.link.regions':'Regions','footer.link.characters':'Characters','footer.link.relics':'Relics','footer.link.chronicles':'Chronicles',
      'home.tagline':'BETWEEN STARS AND STORIES','home.hero.desc':'Two worlds shimmer beyond the veil — a living archive of celestial kingdoms, moonlit legends and forgotten magic.','home.hero.cta':'BEGIN YOUR JOURNEY','home.scroll':'SCROLL TO DISCOVER',
      'home.realm.title':'CHOOSE YOUR REALM','home.realm.sub':'Two portals stand open beneath the Moonvale sky.','home.realm.eth.kicker':'✦ Realm of Light','home.realm.eth.desc':'Gold, starlight and celestial kingdoms beyond the veil.','home.realm.fan.kicker':'☾ Realm of Shadows','home.realm.fan.desc':'Moonlit legends, violet mist and old magic in the dark.',
      'home.eth.sub':'The Realm of Light','home.fan.sub':'The Realm of Shadows','home.enter.eth':'ENTER ETHERNIA','home.enter.fan':'ENTER FANTASY',
      'home.featured':'TREASURES OF MOONVALE','home.featured.sub':'Relics, kingdoms and visions forged in story.',
      'home.explore':'EXPLORE THE WORLD','home.explore.sub':'Every place hides a story.','home.atlas.kicker':'Moonvale Atlas','home.atlas.title':'Chart the living world','home.atlas.desc':'Traverse kingdoms, ruins and hidden passages where every place guards a story.','home.open.map':'OPEN INTERACTIVE MAP',
      'home.lore.sub':'Ancient records, chronicles and fragments from both realms.','home.lore.kicker':'Lore Library','home.lore.title':'Enter the archive of legends','home.lore.desc':'Unseal chronicles of light and shadow, from celestial crowns to forgotten curses.','home.lore.cta':'OPEN THE LIBRARY',
      'home.journey':'CONTINUE THE JOURNEY','home.journey.sub':'More stories. More worlds. More Moonvale.','home.journey.kicker':'Moonvale Channels','home.journey.title':'Follow the living chronicle','home.journey.desc':'Step beyond the archive with golden realm tales, moonlit legends, lore deep dives and visual inspiration from both worlds.',
      'home.tiktok.eth.desc':'Daily tales from the golden realm','home.tiktok.fan.desc':'Shadows, legends and moonlit stories','home.youtube.desc':'Lore deep dives and world chronicles','home.pinterest.desc':'Visual inspiration from both worlds','social.tiktok.eth':'TikTok Ethernia','social.tiktok.fan':'TikTok Fantasy','social.youtube':'YouTube','social.pinterest':'Pinterest','music.off':'MUSIC OFF','music.on':'MUSIC ON'
    },
    pt:{
      'nav.home':'INÍCIO','nav.ethernia':'ETHERNIA','nav.fantasy':'FANTASY','nav.lore':'BIBLIOTECA DE LORE','nav.artefacts':'ARTEFACTOS','nav.about':'SOBRE',
      'footer.tagline':'Entre Estrelas e Histórias','footer.desc':'Somos a ponte entre mundos e imaginação.','footer.navigation':'NAVEGAÇÃO','footer.worlds':'MUNDOS','footer.archive':'ARQUIVO','footer.connect':'CONTACTO','footer.atlas':'Atlas','footer.copy':copy,
      'archive.regions':'Regiões','archive.characters':'Personagens','archive.relics':'Relíquias','archive.chronicles':'Crónicas','footer.link.home':'Início','footer.link.ethernia':'Ethernia','footer.link.fantasy':'Fantasy','footer.link.lore':'Biblioteca de Lore','footer.link.artefacts':'Artefactos','footer.link.about':'Sobre','footer.link.atlas':'Atlas','footer.link.regions':'Regiões','footer.link.characters':'Personagens','footer.link.relics':'Relíquias','footer.link.chronicles':'Crónicas',
      'home.tagline':'ENTRE ESTRELAS E HISTÓRIAS','home.hero.desc':'Dois mundos brilham além do véu — um arquivo vivo de reinos celestiais, lendas ao luar e magia esquecida.','home.hero.cta':'COMEÇAR A JORNADA','home.scroll':'DESCE PARA DESCOBRIR',
      'home.realm.title':'ESCOLHE O TEU REINO','home.realm.sub':'Dois portais permanecem abertos sob o céu de Moonvale.','home.realm.eth.kicker':'✦ Reino da Luz','home.realm.eth.desc':'Ouro, luz estelar e reinos celestiais além do véu.','home.realm.fan.kicker':'☾ Reino das Sombras','home.realm.fan.desc':'Lendas ao luar, névoa violeta e magia antiga na escuridão.',
      'home.eth.sub':'O Reino da Luz','home.fan.sub':'O Reino das Sombras','home.enter.eth':'ENTRAR EM ETHERNIA','home.enter.fan':'ENTRAR EM FANTASY',
      'home.featured':'TESOUROS DE MOONVALE','home.featured.sub':'Relíquias, reinos e visões forjados em história.',
      'home.explore':'EXPLORA O MUNDO','home.explore.sub':'Cada lugar esconde uma história.','home.atlas.kicker':'Atlas de Moonvale','home.atlas.title':'Mapeia o mundo vivo','home.atlas.desc':'Atravessa reinos, ruínas e passagens ocultas onde cada lugar guarda uma história.','home.open.map':'ABRIR MAPA INTERATIVO',
      'home.lore.sub':'Registos antigos, crónicas e fragmentos dos dois reinos.','home.lore.kicker':'Biblioteca de Lore','home.lore.title':'Entra no arquivo das lendas','home.lore.desc':'Revela crónicas de luz e sombra, de coroas celestiais a maldições esquecidas.','home.lore.cta':'ABRIR A BIBLIOTECA',
      'home.journey':'CONTINUA A JORNADA','home.journey.sub':'Mais histórias. Mais mundos. Mais Moonvale.','home.journey.kicker':'Canais Moonvale','home.journey.title':'Segue a crónica viva','home.journey.desc':'Vai além do arquivo com contos do reino dourado, lendas ao luar, mergulhos no lore e inspiração visual dos dois mundos.',
      'home.tiktok.eth.desc':'Contos diários do reino dourado','home.tiktok.fan.desc':'Sombras, lendas e histórias ao luar','home.youtube.desc':'Mergulhos no lore e crónicas dos mundos','home.pinterest.desc':'Inspiração visual dos dois mundos','social.tiktok.eth':'TikTok Ethernia','social.tiktok.fan':'TikTok Fantasy','social.youtube':'YouTube','social.pinterest':'Pinterest','music.off':'MÚSICA OFF','music.on':'MÚSICA ON'
    },
    es:{
      'nav.home':'INICIO','nav.ethernia':'ETHERNIA','nav.fantasy':'FANTASY','nav.lore':'BIBLIOTECA DE LORE','nav.artefacts':'ARTEFACTOS','nav.about':'ACERCA DE',
      'footer.tagline':'Entre Estrellas e Historias','footer.desc':'Somos el puente entre mundos e imaginación.','footer.navigation':'NAVEGACIÓN','footer.worlds':'MUNDOS','footer.archive':'ARCHIVO','footer.connect':'CONTACTO','footer.atlas':'Atlas','footer.copy':copy,
      'archive.regions':'Regiones','archive.characters':'Personajes','archive.relics':'Reliquias','archive.chronicles':'Crónicas','footer.link.home':'Inicio','footer.link.ethernia':'Ethernia','footer.link.fantasy':'Fantasy','footer.link.lore':'Biblioteca de Lore','footer.link.artefacts':'Artefactos','footer.link.about':'Acerca de','footer.link.atlas':'Atlas','footer.link.regions':'Regiones','footer.link.characters':'Personajes','footer.link.relics':'Reliquias','footer.link.chronicles':'Crónicas',
      'home.tagline':'ENTRE ESTRELLAS E HISTORIAS','home.hero.desc':'Dos mundos brillan más allá del velo: un archivo vivo de reinos celestiales, leyendas bajo la luna y magia olvidada.','home.hero.cta':'COMENZAR EL VIAJE','home.scroll':'DESPLÁZATE PARA DESCUBRIR',
      'home.realm.title':'ELIGE TU REINO','home.realm.sub':'Dos portales permanecen abiertos bajo el cielo de Moonvale.','home.realm.eth.kicker':'✦ Reino de la Luz','home.realm.eth.desc':'Oro, luz estelar y reinos celestiales más allá del velo.','home.realm.fan.kicker':'☾ Reino de las Sombras','home.realm.fan.desc':'Leyendas bajo la luna, niebla violeta y magia antigua en la oscuridad.',
      'home.eth.sub':'El Reino de la Luz','home.fan.sub':'El Reino de las Sombras','home.enter.eth':'ENTRAR EN ETHERNIA','home.enter.fan':'ENTRAR EN FANTASY',
      'home.featured':'TESOROS DE MOONVALE','home.featured.sub':'Reliquias, reinos y visiones forjados en historia.',
      'home.explore':'EXPLORA EL MUNDO','home.explore.sub':'Cada lugar esconde una historia.','home.atlas.kicker':'Atlas de Moonvale','home.atlas.title':'Traza el mundo vivo','home.atlas.desc':'Atraviesa reinos, ruinas y pasajes ocultos donde cada lugar guarda una historia.','home.open.map':'ABRIR MAPA INTERACTIVO',
      'home.lore.sub':'Registros antiguos, crónicas y fragmentos de ambos reinos.','home.lore.kicker':'Biblioteca de Lore','home.lore.title':'Entra en el archivo de leyendas','home.lore.desc':'Desvela crónicas de luz y sombra, desde coronas celestiales hasta maldiciones olvidadas.','home.lore.cta':'ABRIR LA BIBLIOTECA',
      'home.journey':'CONTINÚA EL VIAJE','home.journey.sub':'Más historias. Más mundos. Más Moonvale.','home.journey.kicker':'Canales Moonvale','home.journey.title':'Sigue la crónica viva','home.journey.desc':'Ve más allá del archivo con relatos del reino dorado, leyendas bajo la luna, inmersiones en lore e inspiración visual de ambos mundos.',
      'home.tiktok.eth.desc':'Relatos diarios del reino dorado','home.tiktok.fan.desc':'Sombras, leyendas e historias bajo la luna','home.youtube.desc':'Inmersiones en lore y crónicas del mundo','home.pinterest.desc':'Inspiración visual de ambos mundos','social.tiktok.eth':'TikTok Ethernia','social.tiktok.fan':'TikTok Fantasy','social.youtube':'YouTube','social.pinterest':'Pinterest','music.off':'MÚSICA OFF','music.on':'MÚSICA ON'
    }
  };
  function lang(){return localStorage.getItem(KEY)||'en'}
  function apply(l){
    localStorage.setItem(KEY,l);document.documentElement.lang=l;
    document.querySelectorAll('[data-i18n]').forEach(el=>{const v=base[l]?.[el.dataset.i18n]||base.en[el.dataset.i18n];if(v)el.textContent=v;});
    document.querySelectorAll('[data-i18n-alt]').forEach(el=>{const v=base[l]?.[el.dataset.i18nAlt]||base.en[el.dataset.i18nAlt];if(v)el.setAttribute('alt',v);});
    document.querySelectorAll('[data-i18n-label]').forEach(el=>{const v=base[l]?.[el.dataset.i18nLabel]||base.en[el.dataset.i18nLabel];if(v)el.setAttribute('aria-label',v);});
    document.querySelectorAll('.nav-lang,.footer-lang-row,.footer-lang').forEach(el=>{el.textContent='PT | EN | ES';el.setAttribute('role','button');el.setAttribute('tabindex','0');});
    window.dispatchEvent(new CustomEvent('moonvale:languagechange',{detail:{language:l}}));
  }
  function cycle(){const i=order.indexOf(lang());apply(order[(i+1)%order.length]);}
  document.addEventListener('DOMContentLoaded',()=>{apply(lang());document.querySelectorAll('.nav-lang,.footer-lang-row,.footer-lang').forEach(el=>{el.addEventListener('click',cycle);el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();cycle();}});});});
  window.MoonvaleI18n={apply,setLanguage:apply,getLanguage:lang,translations:base};
})();
