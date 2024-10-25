(function(){
    var script = {
 "scrollBarMargin": 2,
 "layout": "absolute",
 "class": "Player",
 "id": "rootPlayer",
 "children": [
  "this.MainViewer"
 ],
 "mobileMipmappingEnabled": false,
 "defaultVRPointer": "laser",
 "borderSize": 0,
 "start": "this.init()",
 "paddingLeft": 0,
 "scripts": {
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "existsKey": function(key){  return key in window; },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "unregisterKey": function(key){  delete window[key]; },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "registerKey": function(key, value){  window[key] = value; },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "getKey": function(key){  return window[key]; },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } }
 },
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "contentOpaque": false,
 "width": "100%",
 "minHeight": 20,
 "verticalAlign": "top",
 "downloadEnabled": false,
 "borderRadius": 0,
 "paddingRight": 0,
 "propagateClick": false,
 "height": "100%",
 "minWidth": 20,
 "gap": 10,
 "definitions": [{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_D3F6545D_C2B8_04ED_41D9_8E42E78674E0_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "TargetPanoramaCameraMovement",
    "yawSpeed": 1.89,
    "easing": "cubic_in",
    "targetYaw": 2.75,
    "path": "shortest"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "yawSpeed": 1.89,
    "easing": "linear",
    "targetYaw": 42.25,
    "path": "shortest"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "yawSpeed": 1.89,
    "easing": "cubic_out",
    "targetYaw": 45,
    "path": "shortest"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "label": "Gerbang1",
 "id": "panorama_B1DDF7A3_BD5E_BBF1_41C9_AF5D825F5C29",
 "thumbnailUrl": "media/panorama_B1DDF7A3_BD5E_BBF1_41C9_AF5D825F5C29_t.jpg",
 "hfov": 180,
 "pitch": 0,
 "hfovMax": 150,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B1DDF7A3_BD5E_BBF1_41C9_AF5D825F5C29_0/f/0/{row}_{column}.jpg",
      "width": 6656,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 13,
      "rowCount": 13,
      "height": 6656
     },
     {
      "url": "media/panorama_B1DDF7A3_BD5E_BBF1_41C9_AF5D825F5C29_0/f/1/{row}_{column}.jpg",
      "width": 3584,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 7,
      "rowCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_B1DDF7A3_BD5E_BBF1_41C9_AF5D825F5C29_0/f/2/{row}_{column}.jpg",
      "width": 2048,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B1DDF7A3_BD5E_BBF1_41C9_AF5D825F5C29_0/f/3/{row}_{column}.jpg",
      "width": 1024,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B1DDF7A3_BD5E_BBF1_41C9_AF5D825F5C29_0/f/4/{row}_{column}.jpg",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B1DDF7A3_BD5E_BBF1_41C9_AF5D825F5C29_0/u/0/{row}_{column}.jpg",
      "width": 6656,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 13,
      "rowCount": 13,
      "height": 6656
     },
     {
      "url": "media/panorama_B1DDF7A3_BD5E_BBF1_41C9_AF5D825F5C29_0/u/1/{row}_{column}.jpg",
      "width": 3584,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 7,
      "rowCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_B1DDF7A3_BD5E_BBF1_41C9_AF5D825F5C29_0/u/2/{row}_{column}.jpg",
      "width": 2048,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B1DDF7A3_BD5E_BBF1_41C9_AF5D825F5C29_0/u/3/{row}_{column}.jpg",
      "width": 1024,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B1DDF7A3_BD5E_BBF1_41C9_AF5D825F5C29_0/u/4/{row}_{column}.jpg",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B1DDF7A3_BD5E_BBF1_41C9_AF5D825F5C29_0/r/0/{row}_{column}.jpg",
      "width": 6656,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 13,
      "rowCount": 13,
      "height": 6656
     },
     {
      "url": "media/panorama_B1DDF7A3_BD5E_BBF1_41C9_AF5D825F5C29_0/r/1/{row}_{column}.jpg",
      "width": 3584,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 7,
      "rowCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_B1DDF7A3_BD5E_BBF1_41C9_AF5D825F5C29_0/r/2/{row}_{column}.jpg",
      "width": 2048,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B1DDF7A3_BD5E_BBF1_41C9_AF5D825F5C29_0/r/3/{row}_{column}.jpg",
      "width": 1024,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B1DDF7A3_BD5E_BBF1_41C9_AF5D825F5C29_0/r/4/{row}_{column}.jpg",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B1DDF7A3_BD5E_BBF1_41C9_AF5D825F5C29_0/d/0/{row}_{column}.jpg",
      "width": 6656,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 13,
      "rowCount": 13,
      "height": 6656
     },
     {
      "url": "media/panorama_B1DDF7A3_BD5E_BBF1_41C9_AF5D825F5C29_0/d/1/{row}_{column}.jpg",
      "width": 3584,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 7,
      "rowCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_B1DDF7A3_BD5E_BBF1_41C9_AF5D825F5C29_0/d/2/{row}_{column}.jpg",
      "width": 2048,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B1DDF7A3_BD5E_BBF1_41C9_AF5D825F5C29_0/d/3/{row}_{column}.jpg",
      "width": 1024,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B1DDF7A3_BD5E_BBF1_41C9_AF5D825F5C29_0/d/4/{row}_{column}.jpg",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B1DDF7A3_BD5E_BBF1_41C9_AF5D825F5C29_0/l/0/{row}_{column}.jpg",
      "width": 6656,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 13,
      "rowCount": 13,
      "height": 6656
     },
     {
      "url": "media/panorama_B1DDF7A3_BD5E_BBF1_41C9_AF5D825F5C29_0/l/1/{row}_{column}.jpg",
      "width": 3584,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 7,
      "rowCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_B1DDF7A3_BD5E_BBF1_41C9_AF5D825F5C29_0/l/2/{row}_{column}.jpg",
      "width": 2048,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B1DDF7A3_BD5E_BBF1_41C9_AF5D825F5C29_0/l/3/{row}_{column}.jpg",
      "width": 1024,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B1DDF7A3_BD5E_BBF1_41C9_AF5D825F5C29_0/l/4/{row}_{column}.jpg",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_B1DDF7A3_BD5E_BBF1_41C9_AF5D825F5C29_t.jpg"
  }
 ],
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_B3933DF9_BD79_EF5E_41DA_47CF32CD2EBF",
   "yaw": -74.25,
   "backwardYaw": 82.64,
   "distance": 1
  }
 ],
 "vfov": 90,
 "overlays": [
  "this.overlay_AD551C2E_BD56_ACF2_41E3_9EF52EBBF75A"
 ],
 "partial": true
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 141.65,
  "pitch": 0
 },
 "id": "camera_D7AA65FC_C348_07B3_41E3_9209109DD5B7",
 "initialSequence": {
  "movements": [
   {
    "class": "TargetPanoramaCameraMovement",
    "yawSpeed": 1.89,
    "easing": "cubic_in",
    "targetYaw": 2.75,
    "path": "shortest"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "yawSpeed": 1.89,
    "easing": "linear",
    "targetYaw": 42.25,
    "path": "shortest"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "yawSpeed": 1.89,
    "easing": "cubic_out",
    "targetYaw": 45,
    "path": "shortest"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D33B86FD_C2B8_05AD_41E6_05D2F2AF8A9D_0/f/0/{row}_{column}.jpg",
      "width": 6656,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 13,
      "rowCount": 13,
      "height": 6656
     },
     {
      "url": "media/panorama_D33B86FD_C2B8_05AD_41E6_05D2F2AF8A9D_0/f/1/{row}_{column}.jpg",
      "width": 3584,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 7,
      "rowCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_D33B86FD_C2B8_05AD_41E6_05D2F2AF8A9D_0/f/2/{row}_{column}.jpg",
      "width": 2048,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_D33B86FD_C2B8_05AD_41E6_05D2F2AF8A9D_0/f/3/{row}_{column}.jpg",
      "width": 1024,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_D33B86FD_C2B8_05AD_41E6_05D2F2AF8A9D_0/f/4/{row}_{column}.jpg",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D33B86FD_C2B8_05AD_41E6_05D2F2AF8A9D_0/u/0/{row}_{column}.jpg",
      "width": 6656,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 13,
      "rowCount": 13,
      "height": 6656
     },
     {
      "url": "media/panorama_D33B86FD_C2B8_05AD_41E6_05D2F2AF8A9D_0/u/1/{row}_{column}.jpg",
      "width": 3584,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 7,
      "rowCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_D33B86FD_C2B8_05AD_41E6_05D2F2AF8A9D_0/u/2/{row}_{column}.jpg",
      "width": 2048,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_D33B86FD_C2B8_05AD_41E6_05D2F2AF8A9D_0/u/3/{row}_{column}.jpg",
      "width": 1024,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_D33B86FD_C2B8_05AD_41E6_05D2F2AF8A9D_0/u/4/{row}_{column}.jpg",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D33B86FD_C2B8_05AD_41E6_05D2F2AF8A9D_0/r/0/{row}_{column}.jpg",
      "width": 6656,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 13,
      "rowCount": 13,
      "height": 6656
     },
     {
      "url": "media/panorama_D33B86FD_C2B8_05AD_41E6_05D2F2AF8A9D_0/r/1/{row}_{column}.jpg",
      "width": 3584,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 7,
      "rowCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_D33B86FD_C2B8_05AD_41E6_05D2F2AF8A9D_0/r/2/{row}_{column}.jpg",
      "width": 2048,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_D33B86FD_C2B8_05AD_41E6_05D2F2AF8A9D_0/r/3/{row}_{column}.jpg",
      "width": 1024,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_D33B86FD_C2B8_05AD_41E6_05D2F2AF8A9D_0/r/4/{row}_{column}.jpg",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D33B86FD_C2B8_05AD_41E6_05D2F2AF8A9D_0/d/0/{row}_{column}.jpg",
      "width": 6656,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 13,
      "rowCount": 13,
      "height": 6656
     },
     {
      "url": "media/panorama_D33B86FD_C2B8_05AD_41E6_05D2F2AF8A9D_0/d/1/{row}_{column}.jpg",
      "width": 3584,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 7,
      "rowCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_D33B86FD_C2B8_05AD_41E6_05D2F2AF8A9D_0/d/2/{row}_{column}.jpg",
      "width": 2048,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_D33B86FD_C2B8_05AD_41E6_05D2F2AF8A9D_0/d/3/{row}_{column}.jpg",
      "width": 1024,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_D33B86FD_C2B8_05AD_41E6_05D2F2AF8A9D_0/d/4/{row}_{column}.jpg",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D33B86FD_C2B8_05AD_41E6_05D2F2AF8A9D_0/l/0/{row}_{column}.jpg",
      "width": 6656,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 13,
      "rowCount": 13,
      "height": 6656
     },
     {
      "url": "media/panorama_D33B86FD_C2B8_05AD_41E6_05D2F2AF8A9D_0/l/1/{row}_{column}.jpg",
      "width": 3584,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 7,
      "rowCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_D33B86FD_C2B8_05AD_41E6_05D2F2AF8A9D_0/l/2/{row}_{column}.jpg",
      "width": 2048,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_D33B86FD_C2B8_05AD_41E6_05D2F2AF8A9D_0/l/3/{row}_{column}.jpg",
      "width": 1024,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_D33B86FD_C2B8_05AD_41E6_05D2F2AF8A9D_0/l/4/{row}_{column}.jpg",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D33B86FD_C2B8_05AD_41E6_05D2F2AF8A9D_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_D3F6545D_C2B8_04ED_41D9_8E42E78674E0",
   "yaw": -50.73,
   "backwardYaw": -28.64,
   "distance": 1
  }
 ],
 "vfov": 90,
 "hfov": 180,
 "label": "GRound 3",
 "id": "panorama_D33B86FD_C2B8_05AD_41E6_05D2F2AF8A9D",
 "thumbnailUrl": "media/panorama_D33B86FD_C2B8_05AD_41E6_05D2F2AF8A9D_t.jpg",
 "pitch": 0,
 "class": "Panorama",
 "overlays": [
  "this.overlay_D2306CBD_C2B8_05AD_41D1_D5E421889694"
 ],
 "partial": true
},
{
 "class": "PlayList",
 "items": [
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "media": "this.panorama_B1DDF7A3_BD5E_BBF1_41C9_AF5D825F5C29",
   "camera": "this.panorama_B1DDF7A3_BD5E_BBF1_41C9_AF5D825F5C29_camera",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "media": "this.panorama_B3933DF9_BD79_EF5E_41DA_47CF32CD2EBF",
   "camera": "this.panorama_B3933DF9_BD79_EF5E_41DA_47CF32CD2EBF_camera",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "media": "this.panorama_B20994BA_BDB9_DDD3_41E4_149DD367EB75",
   "camera": "this.panorama_B20994BA_BDB9_DDD3_41E4_149DD367EB75_camera",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "media": "this.panorama_ADC96448_BDDE_7CBE_41E2_6B59FAC8A0FA",
   "camera": "this.panorama_ADC96448_BDDE_7CBE_41E2_6B59FAC8A0FA_camera",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "media": "this.panorama_ACB8D447_BDDA_FCB1_41E6_9D21EEBB3C61",
   "camera": "this.panorama_ACB8D447_BDDA_FCB1_41E6_9D21EEBB3C61_camera",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "media": "this.panorama_CE0FDF78_C2C8_04B3_41D9_7F71BAE83480",
   "camera": "this.panorama_CE0FDF78_C2C8_04B3_41D9_7F71BAE83480_camera",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7)",
   "media": "this.panorama_D3F6545D_C2B8_04ED_41D9_8E42E78674E0",
   "camera": "this.panorama_D3F6545D_C2B8_04ED_41D9_8E42E78674E0_camera",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 7, 8)",
   "media": "this.panorama_D33B86FD_C2B8_05AD_41E6_05D2F2AF8A9D",
   "camera": "this.panorama_D33B86FD_C2B8_05AD_41E6_05D2F2AF8A9D_camera",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 0)",
   "media": "this.panorama_D25DDCFB_C348_05B5_41E1_EAB5D16A8DB1",
   "camera": "this.panorama_D25DDCFB_C348_05B5_41E1_EAB5D16A8DB1_camera",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "end": "this.trigger('tourEnded')"
  }
 ],
 "id": "mainPlayList"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 121.09,
  "pitch": 0
 },
 "id": "camera_D601466C_C348_04D3_41BD_C68DD9C08ACE",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_B20994BA_BDB9_DDD3_41E4_149DD367EB75_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "TargetPanoramaCameraMovement",
    "yawSpeed": 1.89,
    "easing": "cubic_in",
    "targetYaw": 2.75,
    "path": "shortest"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "yawSpeed": 1.89,
    "easing": "linear",
    "targetYaw": 42.25,
    "path": "shortest"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "yawSpeed": 1.89,
    "easing": "cubic_out",
    "targetYaw": 45,
    "path": "shortest"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 124.81,
  "pitch": 0
 },
 "id": "camera_D7E68649_C348_04D5_41DE_22B53C5EC598",
 "initialSequence": {
  "movements": [
   {
    "class": "TargetPanoramaCameraMovement",
    "yawSpeed": 1.89,
    "easing": "cubic_in",
    "targetYaw": 2.75,
    "path": "shortest"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "yawSpeed": 1.89,
    "easing": "linear",
    "targetYaw": 42.25,
    "path": "shortest"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "yawSpeed": 1.89,
    "easing": "cubic_out",
    "targetYaw": 45,
    "path": "shortest"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 151.36,
  "pitch": 0
 },
 "id": "camera_D7C4C627_C348_045D_41E7_1DE444A4E926",
 "initialSequence": {
  "movements": [
   {
    "class": "TargetPanoramaCameraMovement",
    "yawSpeed": 1.89,
    "easing": "cubic_in",
    "targetYaw": 2.75,
    "path": "shortest"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "yawSpeed": 1.89,
    "easing": "linear",
    "targetYaw": 42.25,
    "path": "shortest"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "yawSpeed": 1.89,
    "easing": "cubic_out",
    "targetYaw": 45,
    "path": "shortest"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 108.4,
  "pitch": 0
 },
 "id": "camera_D78FF5CD_C348_07ED_41E0_1E894B9D10CF",
 "initialSequence": {
  "movements": [
   {
    "class": "TargetPanoramaCameraMovement",
    "yawSpeed": 1.89,
    "easing": "cubic_in",
    "targetYaw": 2.75,
    "path": "shortest"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "yawSpeed": 1.89,
    "easing": "linear",
    "targetYaw": 42.25,
    "path": "shortest"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "yawSpeed": 1.89,
    "easing": "cubic_out",
    "targetYaw": 45,
    "path": "shortest"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -143.28,
  "pitch": 0
 },
 "id": "camera_D7F55638_C348_04B3_41E8_0D0DF64E9C3F",
 "initialSequence": {
  "movements": [
   {
    "class": "TargetPanoramaCameraMovement",
    "yawSpeed": 1.89,
    "easing": "cubic_in",
    "targetYaw": 2.75,
    "path": "shortest"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "yawSpeed": 1.89,
    "easing": "linear",
    "targetYaw": 42.25,
    "path": "shortest"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "yawSpeed": 1.89,
    "easing": "cubic_out",
    "targetYaw": 45,
    "path": "shortest"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 108.1,
  "pitch": 0
 },
 "id": "camera_D755454A_C348_04D7_41DD_763E48BA8691",
 "initialSequence": {
  "movements": [
   {
    "class": "TargetPanoramaCameraMovement",
    "yawSpeed": 1.89,
    "easing": "cubic_in",
    "targetYaw": 2.75,
    "path": "shortest"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "yawSpeed": 1.89,
    "easing": "linear",
    "targetYaw": 42.25,
    "path": "shortest"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "yawSpeed": 1.89,
    "easing": "cubic_out",
    "targetYaw": 45,
    "path": "shortest"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 113.41,
  "pitch": 0
 },
 "id": "camera_D772F573_C348_04B5_41D1_A091A290D143",
 "initialSequence": {
  "movements": [
   {
    "class": "TargetPanoramaCameraMovement",
    "yawSpeed": 1.89,
    "easing": "cubic_in",
    "targetYaw": 2.75,
    "path": "shortest"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "yawSpeed": 1.89,
    "easing": "linear",
    "targetYaw": 42.25,
    "path": "shortest"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "yawSpeed": 1.89,
    "easing": "cubic_out",
    "targetYaw": 45,
    "path": "shortest"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 125.1,
  "pitch": 0
 },
 "id": "camera_D76CA59E_C348_046F_41E2_8F039C0DC713",
 "initialSequence": {
  "movements": [
   {
    "class": "TargetPanoramaCameraMovement",
    "yawSpeed": 1.89,
    "easing": "cubic_in",
    "targetYaw": 2.75,
    "path": "shortest"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "yawSpeed": 1.89,
    "easing": "linear",
    "targetYaw": 42.25,
    "path": "shortest"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "yawSpeed": 1.89,
    "easing": "cubic_out",
    "targetYaw": 45,
    "path": "shortest"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -113.93,
  "pitch": 0
 },
 "id": "camera_D72F5532_C348_04B7_41E7_9ED72CEE321F",
 "initialSequence": {
  "movements": [
   {
    "class": "TargetPanoramaCameraMovement",
    "yawSpeed": 1.89,
    "easing": "cubic_in",
    "targetYaw": 2.75,
    "path": "shortest"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "yawSpeed": 1.89,
    "easing": "linear",
    "targetYaw": 42.25,
    "path": "shortest"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "yawSpeed": 1.89,
    "easing": "cubic_out",
    "targetYaw": 45,
    "path": "shortest"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 94,
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_B1DDF7A3_BD5E_BBF1_41C9_AF5D825F5C29_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "TargetPanoramaCameraMovement",
    "yawSpeed": 1.8,
    "easing": "cubic_in",
    "targetYaw": 2.65,
    "path": "shortest"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "yawSpeed": 1.8,
    "easing": "linear",
    "targetYaw": 40.35,
    "path": "shortest"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "yawSpeed": 1.8,
    "easing": "cubic_out",
    "targetYaw": 43,
    "path": "shortest"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B3933DF9_BD79_EF5E_41DA_47CF32CD2EBF_0/f/0/{row}_{column}.jpg",
      "width": 6656,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 13,
      "rowCount": 13,
      "height": 6656
     },
     {
      "url": "media/panorama_B3933DF9_BD79_EF5E_41DA_47CF32CD2EBF_0/f/1/{row}_{column}.jpg",
      "width": 3584,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 7,
      "rowCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_B3933DF9_BD79_EF5E_41DA_47CF32CD2EBF_0/f/2/{row}_{column}.jpg",
      "width": 2048,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B3933DF9_BD79_EF5E_41DA_47CF32CD2EBF_0/f/3/{row}_{column}.jpg",
      "width": 1024,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B3933DF9_BD79_EF5E_41DA_47CF32CD2EBF_0/f/4/{row}_{column}.jpg",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B3933DF9_BD79_EF5E_41DA_47CF32CD2EBF_0/u/0/{row}_{column}.jpg",
      "width": 6656,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 13,
      "rowCount": 13,
      "height": 6656
     },
     {
      "url": "media/panorama_B3933DF9_BD79_EF5E_41DA_47CF32CD2EBF_0/u/1/{row}_{column}.jpg",
      "width": 3584,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 7,
      "rowCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_B3933DF9_BD79_EF5E_41DA_47CF32CD2EBF_0/u/2/{row}_{column}.jpg",
      "width": 2048,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B3933DF9_BD79_EF5E_41DA_47CF32CD2EBF_0/u/3/{row}_{column}.jpg",
      "width": 1024,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B3933DF9_BD79_EF5E_41DA_47CF32CD2EBF_0/u/4/{row}_{column}.jpg",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B3933DF9_BD79_EF5E_41DA_47CF32CD2EBF_0/r/0/{row}_{column}.jpg",
      "width": 6656,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 13,
      "rowCount": 13,
      "height": 6656
     },
     {
      "url": "media/panorama_B3933DF9_BD79_EF5E_41DA_47CF32CD2EBF_0/r/1/{row}_{column}.jpg",
      "width": 3584,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 7,
      "rowCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_B3933DF9_BD79_EF5E_41DA_47CF32CD2EBF_0/r/2/{row}_{column}.jpg",
      "width": 2048,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B3933DF9_BD79_EF5E_41DA_47CF32CD2EBF_0/r/3/{row}_{column}.jpg",
      "width": 1024,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B3933DF9_BD79_EF5E_41DA_47CF32CD2EBF_0/r/4/{row}_{column}.jpg",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B3933DF9_BD79_EF5E_41DA_47CF32CD2EBF_0/d/0/{row}_{column}.jpg",
      "width": 6656,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 13,
      "rowCount": 13,
      "height": 6656
     },
     {
      "url": "media/panorama_B3933DF9_BD79_EF5E_41DA_47CF32CD2EBF_0/d/1/{row}_{column}.jpg",
      "width": 3584,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 7,
      "rowCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_B3933DF9_BD79_EF5E_41DA_47CF32CD2EBF_0/d/2/{row}_{column}.jpg",
      "width": 2048,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B3933DF9_BD79_EF5E_41DA_47CF32CD2EBF_0/d/3/{row}_{column}.jpg",
      "width": 1024,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B3933DF9_BD79_EF5E_41DA_47CF32CD2EBF_0/d/4/{row}_{column}.jpg",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B3933DF9_BD79_EF5E_41DA_47CF32CD2EBF_0/l/0/{row}_{column}.jpg",
      "width": 6656,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 13,
      "rowCount": 13,
      "height": 6656
     },
     {
      "url": "media/panorama_B3933DF9_BD79_EF5E_41DA_47CF32CD2EBF_0/l/1/{row}_{column}.jpg",
      "width": 3584,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 7,
      "rowCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_B3933DF9_BD79_EF5E_41DA_47CF32CD2EBF_0/l/2/{row}_{column}.jpg",
      "width": 2048,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B3933DF9_BD79_EF5E_41DA_47CF32CD2EBF_0/l/3/{row}_{column}.jpg",
      "width": 1024,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B3933DF9_BD79_EF5E_41DA_47CF32CD2EBF_0/l/4/{row}_{column}.jpg",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_B3933DF9_BD79_EF5E_41DA_47CF32CD2EBF_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_B1DDF7A3_BD5E_BBF1_41C9_AF5D825F5C29",
   "yaw": 82.64,
   "backwardYaw": -74.25,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_ADC96448_BDDE_7CBE_41E2_6B59FAC8A0FA",
   "yaw": 28.43,
   "backwardYaw": -54.9,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_B20994BA_BDB9_DDD3_41E4_149DD367EB75",
   "yaw": -58.91,
   "backwardYaw": -71.6,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_B20994BA_BDB9_DDD3_41E4_149DD367EB75",
   "yaw": -58.91,
   "backwardYaw": -71.6,
   "distance": 1
  }
 ],
 "vfov": 90,
 "hfov": 180,
 "label": "Hl1",
 "id": "panorama_B3933DF9_BD79_EF5E_41DA_47CF32CD2EBF",
 "thumbnailUrl": "media/panorama_B3933DF9_BD79_EF5E_41DA_47CF32CD2EBF_t.jpg",
 "pitch": 0,
 "class": "Panorama",
 "overlays": [
  "this.overlay_AC07EE70_BDB6_6D6F_41E5_F9DA31BB9B30",
  "this.overlay_AD153DD5_BDBA_AF56_41B0_5107B066F56C",
  "this.overlay_ACC33DAC_BDCA_AFF6_41E6_C187A7495F85"
 ],
 "partial": true
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_ADC96448_BDDE_7CBE_41E2_6B59FAC8A0FA_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "TargetPanoramaCameraMovement",
    "yawSpeed": 1.89,
    "easing": "cubic_in",
    "targetYaw": 2.75,
    "path": "shortest"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "yawSpeed": 1.89,
    "easing": "linear",
    "targetYaw": 42.25,
    "path": "shortest"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "yawSpeed": 1.89,
    "easing": "cubic_out",
    "targetYaw": 45,
    "path": "shortest"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -151.57,
  "pitch": 0
 },
 "id": "camera_D742755C_C348_04F3_41E8_2FA423DCDD63",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_B3933DF9_BD79_EF5E_41DA_47CF32CD2EBF_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -153.2,
  "pitch": 0
 },
 "id": "camera_D617765C_C348_04F3_41E4_E3D92C828723",
 "initialSequence": {
  "movements": [
   {
    "class": "TargetPanoramaCameraMovement",
    "yawSpeed": 1.89,
    "easing": "cubic_in",
    "targetYaw": 2.75,
    "path": "shortest"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "yawSpeed": 1.89,
    "easing": "linear",
    "targetYaw": 42.25,
    "path": "shortest"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "yawSpeed": 1.89,
    "easing": "cubic_out",
    "targetYaw": 45,
    "path": "shortest"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 129.27,
  "pitch": 0
 },
 "id": "camera_D7BFA5E5_C348_07DD_41DC_F0BC54CA59B5",
 "initialSequence": {
  "movements": [
   {
    "class": "TargetPanoramaCameraMovement",
    "yawSpeed": 1.89,
    "easing": "cubic_in",
    "targetYaw": 2.75,
    "path": "shortest"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "yawSpeed": 1.89,
    "easing": "linear",
    "targetYaw": 42.25,
    "path": "shortest"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "yawSpeed": 1.89,
    "easing": "cubic_out",
    "targetYaw": 45,
    "path": "shortest"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_D25DDCFB_C348_05B5_41E1_EAB5D16A8DB1_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "TargetPanoramaCameraMovement",
    "yawSpeed": 1.89,
    "easing": "cubic_in",
    "targetYaw": 2.75,
    "path": "shortest"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "yawSpeed": 1.89,
    "easing": "linear",
    "targetYaw": 42.25,
    "path": "shortest"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "yawSpeed": 1.89,
    "easing": "cubic_out",
    "targetYaw": 45,
    "path": "shortest"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADC96448_BDDE_7CBE_41E2_6B59FAC8A0FA_0/f/0/{row}_{column}.jpg",
      "width": 6656,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 13,
      "rowCount": 13,
      "height": 6656
     },
     {
      "url": "media/panorama_ADC96448_BDDE_7CBE_41E2_6B59FAC8A0FA_0/f/1/{row}_{column}.jpg",
      "width": 3584,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 7,
      "rowCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_ADC96448_BDDE_7CBE_41E2_6B59FAC8A0FA_0/f/2/{row}_{column}.jpg",
      "width": 2048,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_ADC96448_BDDE_7CBE_41E2_6B59FAC8A0FA_0/f/3/{row}_{column}.jpg",
      "width": 1024,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_ADC96448_BDDE_7CBE_41E2_6B59FAC8A0FA_0/f/4/{row}_{column}.jpg",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADC96448_BDDE_7CBE_41E2_6B59FAC8A0FA_0/u/0/{row}_{column}.jpg",
      "width": 6656,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 13,
      "rowCount": 13,
      "height": 6656
     },
     {
      "url": "media/panorama_ADC96448_BDDE_7CBE_41E2_6B59FAC8A0FA_0/u/1/{row}_{column}.jpg",
      "width": 3584,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 7,
      "rowCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_ADC96448_BDDE_7CBE_41E2_6B59FAC8A0FA_0/u/2/{row}_{column}.jpg",
      "width": 2048,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_ADC96448_BDDE_7CBE_41E2_6B59FAC8A0FA_0/u/3/{row}_{column}.jpg",
      "width": 1024,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_ADC96448_BDDE_7CBE_41E2_6B59FAC8A0FA_0/u/4/{row}_{column}.jpg",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADC96448_BDDE_7CBE_41E2_6B59FAC8A0FA_0/r/0/{row}_{column}.jpg",
      "width": 6656,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 13,
      "rowCount": 13,
      "height": 6656
     },
     {
      "url": "media/panorama_ADC96448_BDDE_7CBE_41E2_6B59FAC8A0FA_0/r/1/{row}_{column}.jpg",
      "width": 3584,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 7,
      "rowCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_ADC96448_BDDE_7CBE_41E2_6B59FAC8A0FA_0/r/2/{row}_{column}.jpg",
      "width": 2048,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_ADC96448_BDDE_7CBE_41E2_6B59FAC8A0FA_0/r/3/{row}_{column}.jpg",
      "width": 1024,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_ADC96448_BDDE_7CBE_41E2_6B59FAC8A0FA_0/r/4/{row}_{column}.jpg",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADC96448_BDDE_7CBE_41E2_6B59FAC8A0FA_0/d/0/{row}_{column}.jpg",
      "width": 6656,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 13,
      "rowCount": 13,
      "height": 6656
     },
     {
      "url": "media/panorama_ADC96448_BDDE_7CBE_41E2_6B59FAC8A0FA_0/d/1/{row}_{column}.jpg",
      "width": 3584,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 7,
      "rowCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_ADC96448_BDDE_7CBE_41E2_6B59FAC8A0FA_0/d/2/{row}_{column}.jpg",
      "width": 2048,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_ADC96448_BDDE_7CBE_41E2_6B59FAC8A0FA_0/d/3/{row}_{column}.jpg",
      "width": 1024,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_ADC96448_BDDE_7CBE_41E2_6B59FAC8A0FA_0/d/4/{row}_{column}.jpg",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ADC96448_BDDE_7CBE_41E2_6B59FAC8A0FA_0/l/0/{row}_{column}.jpg",
      "width": 6656,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 13,
      "rowCount": 13,
      "height": 6656
     },
     {
      "url": "media/panorama_ADC96448_BDDE_7CBE_41E2_6B59FAC8A0FA_0/l/1/{row}_{column}.jpg",
      "width": 3584,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 7,
      "rowCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_ADC96448_BDDE_7CBE_41E2_6B59FAC8A0FA_0/l/2/{row}_{column}.jpg",
      "width": 2048,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_ADC96448_BDDE_7CBE_41E2_6B59FAC8A0FA_0/l/3/{row}_{column}.jpg",
      "width": 1024,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_ADC96448_BDDE_7CBE_41E2_6B59FAC8A0FA_0/l/4/{row}_{column}.jpg",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_ADC96448_BDDE_7CBE_41E2_6B59FAC8A0FA_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_B3933DF9_BD79_EF5E_41DA_47CF32CD2EBF",
   "yaw": -54.9,
   "backwardYaw": 28.43,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_ACB8D447_BDDA_FCB1_41E6_9D21EEBB3C61",
   "yaw": 36.72,
   "backwardYaw": -66.59,
   "distance": 1
  }
 ],
 "vfov": 90,
 "hfov": 180,
 "label": "pDM",
 "id": "panorama_ADC96448_BDDE_7CBE_41E2_6B59FAC8A0FA",
 "thumbnailUrl": "media/panorama_ADC96448_BDDE_7CBE_41E2_6B59FAC8A0FA_t.jpg",
 "pitch": 0,
 "class": "Panorama",
 "overlays": [
  "this.overlay_AD55BD54_BDD9_AF57_41E5_96AC544E986E",
  "this.overlay_AFAD3C8F_BDDA_ADB2_41DE_1D29728D9E2B"
 ],
 "partial": true
},
{
 "hfovMin": "150%",
 "label": "IMG_20240917_100601",
 "id": "panorama_B20994BA_BDB9_DDD3_41E4_149DD367EB75",
 "thumbnailUrl": "media/panorama_B20994BA_BDB9_DDD3_41E4_149DD367EB75_t.jpg",
 "hfov": 180,
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B20994BA_BDB9_DDD3_41E4_149DD367EB75_0/f/0/{row}_{column}.jpg",
      "width": 3072,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_B20994BA_BDB9_DDD3_41E4_149DD367EB75_0/f/1/{row}_{column}.jpg",
      "width": 1536,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B20994BA_BDB9_DDD3_41E4_149DD367EB75_0/f/2/{row}_{column}.jpg",
      "width": 1024,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B20994BA_BDB9_DDD3_41E4_149DD367EB75_0/f/3/{row}_{column}.jpg",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B20994BA_BDB9_DDD3_41E4_149DD367EB75_0/u/0/{row}_{column}.jpg",
      "width": 3072,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_B20994BA_BDB9_DDD3_41E4_149DD367EB75_0/u/1/{row}_{column}.jpg",
      "width": 1536,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B20994BA_BDB9_DDD3_41E4_149DD367EB75_0/u/2/{row}_{column}.jpg",
      "width": 1024,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B20994BA_BDB9_DDD3_41E4_149DD367EB75_0/u/3/{row}_{column}.jpg",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B20994BA_BDB9_DDD3_41E4_149DD367EB75_0/r/0/{row}_{column}.jpg",
      "width": 3072,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_B20994BA_BDB9_DDD3_41E4_149DD367EB75_0/r/1/{row}_{column}.jpg",
      "width": 1536,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B20994BA_BDB9_DDD3_41E4_149DD367EB75_0/r/2/{row}_{column}.jpg",
      "width": 1024,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B20994BA_BDB9_DDD3_41E4_149DD367EB75_0/r/3/{row}_{column}.jpg",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B20994BA_BDB9_DDD3_41E4_149DD367EB75_0/d/0/{row}_{column}.jpg",
      "width": 3072,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_B20994BA_BDB9_DDD3_41E4_149DD367EB75_0/d/1/{row}_{column}.jpg",
      "width": 1536,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B20994BA_BDB9_DDD3_41E4_149DD367EB75_0/d/2/{row}_{column}.jpg",
      "width": 1024,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B20994BA_BDB9_DDD3_41E4_149DD367EB75_0/d/3/{row}_{column}.jpg",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B20994BA_BDB9_DDD3_41E4_149DD367EB75_0/l/0/{row}_{column}.jpg",
      "width": 3072,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 6,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_B20994BA_BDB9_DDD3_41E4_149DD367EB75_0/l/1/{row}_{column}.jpg",
      "width": 1536,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B20994BA_BDB9_DDD3_41E4_149DD367EB75_0/l/2/{row}_{column}.jpg",
      "width": 1024,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B20994BA_BDB9_DDD3_41E4_149DD367EB75_0/l/3/{row}_{column}.jpg",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_B20994BA_BDB9_DDD3_41E4_149DD367EB75_t.jpg"
  }
 ],
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_B3933DF9_BD79_EF5E_41DA_47CF32CD2EBF",
   "yaw": -71.6,
   "backwardYaw": -58.91,
   "distance": 1
  }
 ],
 "vfov": 135,
 "overlays": [
  "this.overlay_AC26C457_BDBE_5D51_41D1_CE108B194ED6"
 ],
 "partial": true
},
{
 "touchControlMode": "drag_rotation",
 "gyroscopeVerticalDraggingEnabled": true,
 "class": "PanoramaPlayer",
 "mouseControlMode": "drag_acceleration",
 "id": "MainViewerPanoramaPlayer",
 "viewerArea": "this.MainViewer",
 "displayPlaybackBar": true
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 108.4,
  "pitch": 0
 },
 "id": "camera_D79EA5B6_C348_07BF_41B7_32E646ED0533",
 "initialSequence": {
  "movements": [
   {
    "class": "TargetPanoramaCameraMovement",
    "yawSpeed": 1.89,
    "easing": "cubic_in",
    "targetYaw": 2.75,
    "path": "shortest"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "yawSpeed": 1.89,
    "easing": "linear",
    "targetYaw": 42.25,
    "path": "shortest"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "yawSpeed": 1.89,
    "easing": "cubic_out",
    "targetYaw": 45,
    "path": "shortest"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D25DDCFB_C348_05B5_41E1_EAB5D16A8DB1_0/f/0/{row}_{column}.jpg",
      "width": 6656,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 13,
      "rowCount": 13,
      "height": 6656
     },
     {
      "url": "media/panorama_D25DDCFB_C348_05B5_41E1_EAB5D16A8DB1_0/f/1/{row}_{column}.jpg",
      "width": 3584,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 7,
      "rowCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_D25DDCFB_C348_05B5_41E1_EAB5D16A8DB1_0/f/2/{row}_{column}.jpg",
      "width": 2048,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_D25DDCFB_C348_05B5_41E1_EAB5D16A8DB1_0/f/3/{row}_{column}.jpg",
      "width": 1024,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_D25DDCFB_C348_05B5_41E1_EAB5D16A8DB1_0/f/4/{row}_{column}.jpg",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D25DDCFB_C348_05B5_41E1_EAB5D16A8DB1_0/u/0/{row}_{column}.jpg",
      "width": 6656,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 13,
      "rowCount": 13,
      "height": 6656
     },
     {
      "url": "media/panorama_D25DDCFB_C348_05B5_41E1_EAB5D16A8DB1_0/u/1/{row}_{column}.jpg",
      "width": 3584,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 7,
      "rowCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_D25DDCFB_C348_05B5_41E1_EAB5D16A8DB1_0/u/2/{row}_{column}.jpg",
      "width": 2048,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_D25DDCFB_C348_05B5_41E1_EAB5D16A8DB1_0/u/3/{row}_{column}.jpg",
      "width": 1024,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_D25DDCFB_C348_05B5_41E1_EAB5D16A8DB1_0/u/4/{row}_{column}.jpg",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D25DDCFB_C348_05B5_41E1_EAB5D16A8DB1_0/r/0/{row}_{column}.jpg",
      "width": 6656,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 13,
      "rowCount": 13,
      "height": 6656
     },
     {
      "url": "media/panorama_D25DDCFB_C348_05B5_41E1_EAB5D16A8DB1_0/r/1/{row}_{column}.jpg",
      "width": 3584,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 7,
      "rowCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_D25DDCFB_C348_05B5_41E1_EAB5D16A8DB1_0/r/2/{row}_{column}.jpg",
      "width": 2048,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_D25DDCFB_C348_05B5_41E1_EAB5D16A8DB1_0/r/3/{row}_{column}.jpg",
      "width": 1024,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_D25DDCFB_C348_05B5_41E1_EAB5D16A8DB1_0/r/4/{row}_{column}.jpg",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D25DDCFB_C348_05B5_41E1_EAB5D16A8DB1_0/d/0/{row}_{column}.jpg",
      "width": 6656,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 13,
      "rowCount": 13,
      "height": 6656
     },
     {
      "url": "media/panorama_D25DDCFB_C348_05B5_41E1_EAB5D16A8DB1_0/d/1/{row}_{column}.jpg",
      "width": 3584,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 7,
      "rowCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_D25DDCFB_C348_05B5_41E1_EAB5D16A8DB1_0/d/2/{row}_{column}.jpg",
      "width": 2048,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_D25DDCFB_C348_05B5_41E1_EAB5D16A8DB1_0/d/3/{row}_{column}.jpg",
      "width": 1024,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_D25DDCFB_C348_05B5_41E1_EAB5D16A8DB1_0/d/4/{row}_{column}.jpg",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D25DDCFB_C348_05B5_41E1_EAB5D16A8DB1_0/l/0/{row}_{column}.jpg",
      "width": 6656,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 13,
      "rowCount": 13,
      "height": 6656
     },
     {
      "url": "media/panorama_D25DDCFB_C348_05B5_41E1_EAB5D16A8DB1_0/l/1/{row}_{column}.jpg",
      "width": 3584,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 7,
      "rowCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_D25DDCFB_C348_05B5_41E1_EAB5D16A8DB1_0/l/2/{row}_{column}.jpg",
      "width": 2048,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_D25DDCFB_C348_05B5_41E1_EAB5D16A8DB1_0/l/3/{row}_{column}.jpg",
      "width": 1024,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_D25DDCFB_C348_05B5_41E1_EAB5D16A8DB1_0/l/4/{row}_{column}.jpg",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D25DDCFB_C348_05B5_41E1_EAB5D16A8DB1_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_ACB8D447_BDDA_FCB1_41E6_9D21EEBB3C61"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_D3F6545D_C2B8_04ED_41D9_8E42E78674E0",
   "yaw": 52.57,
   "backwardYaw": 26.8,
   "distance": 1
  }
 ],
 "vfov": 90,
 "hfov": 180,
 "label": "GRound 4",
 "id": "panorama_D25DDCFB_C348_05B5_41E1_EAB5D16A8DB1",
 "thumbnailUrl": "media/panorama_D25DDCFB_C348_05B5_41E1_EAB5D16A8DB1_t.jpg",
 "pitch": 0,
 "class": "Panorama",
 "overlays": [
  "this.overlay_D3EBFF58_C348_04F3_41E8_495BDB93A6C1",
  "this.overlay_D168ECDB_C348_05F4_41D3_BC9F5FA657BD"
 ],
 "partial": true
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CE0FDF78_C2C8_04B3_41D9_7F71BAE83480_0/f/0/{row}_{column}.jpg",
      "width": 6656,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 13,
      "rowCount": 13,
      "height": 6656
     },
     {
      "url": "media/panorama_CE0FDF78_C2C8_04B3_41D9_7F71BAE83480_0/f/1/{row}_{column}.jpg",
      "width": 3584,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 7,
      "rowCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_CE0FDF78_C2C8_04B3_41D9_7F71BAE83480_0/f/2/{row}_{column}.jpg",
      "width": 2048,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CE0FDF78_C2C8_04B3_41D9_7F71BAE83480_0/f/3/{row}_{column}.jpg",
      "width": 1024,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CE0FDF78_C2C8_04B3_41D9_7F71BAE83480_0/f/4/{row}_{column}.jpg",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CE0FDF78_C2C8_04B3_41D9_7F71BAE83480_0/u/0/{row}_{column}.jpg",
      "width": 6656,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 13,
      "rowCount": 13,
      "height": 6656
     },
     {
      "url": "media/panorama_CE0FDF78_C2C8_04B3_41D9_7F71BAE83480_0/u/1/{row}_{column}.jpg",
      "width": 3584,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 7,
      "rowCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_CE0FDF78_C2C8_04B3_41D9_7F71BAE83480_0/u/2/{row}_{column}.jpg",
      "width": 2048,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CE0FDF78_C2C8_04B3_41D9_7F71BAE83480_0/u/3/{row}_{column}.jpg",
      "width": 1024,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CE0FDF78_C2C8_04B3_41D9_7F71BAE83480_0/u/4/{row}_{column}.jpg",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CE0FDF78_C2C8_04B3_41D9_7F71BAE83480_0/r/0/{row}_{column}.jpg",
      "width": 6656,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 13,
      "rowCount": 13,
      "height": 6656
     },
     {
      "url": "media/panorama_CE0FDF78_C2C8_04B3_41D9_7F71BAE83480_0/r/1/{row}_{column}.jpg",
      "width": 3584,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 7,
      "rowCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_CE0FDF78_C2C8_04B3_41D9_7F71BAE83480_0/r/2/{row}_{column}.jpg",
      "width": 2048,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CE0FDF78_C2C8_04B3_41D9_7F71BAE83480_0/r/3/{row}_{column}.jpg",
      "width": 1024,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CE0FDF78_C2C8_04B3_41D9_7F71BAE83480_0/r/4/{row}_{column}.jpg",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CE0FDF78_C2C8_04B3_41D9_7F71BAE83480_0/d/0/{row}_{column}.jpg",
      "width": 6656,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 13,
      "rowCount": 13,
      "height": 6656
     },
     {
      "url": "media/panorama_CE0FDF78_C2C8_04B3_41D9_7F71BAE83480_0/d/1/{row}_{column}.jpg",
      "width": 3584,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 7,
      "rowCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_CE0FDF78_C2C8_04B3_41D9_7F71BAE83480_0/d/2/{row}_{column}.jpg",
      "width": 2048,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CE0FDF78_C2C8_04B3_41D9_7F71BAE83480_0/d/3/{row}_{column}.jpg",
      "width": 1024,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CE0FDF78_C2C8_04B3_41D9_7F71BAE83480_0/d/4/{row}_{column}.jpg",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CE0FDF78_C2C8_04B3_41D9_7F71BAE83480_0/l/0/{row}_{column}.jpg",
      "width": 6656,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 13,
      "rowCount": 13,
      "height": 6656
     },
     {
      "url": "media/panorama_CE0FDF78_C2C8_04B3_41D9_7F71BAE83480_0/l/1/{row}_{column}.jpg",
      "width": 3584,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 7,
      "rowCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_CE0FDF78_C2C8_04B3_41D9_7F71BAE83480_0/l/2/{row}_{column}.jpg",
      "width": 2048,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CE0FDF78_C2C8_04B3_41D9_7F71BAE83480_0/l/3/{row}_{column}.jpg",
      "width": 1024,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CE0FDF78_C2C8_04B3_41D9_7F71BAE83480_0/l/4/{row}_{column}.jpg",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CE0FDF78_C2C8_04B3_41D9_7F71BAE83480_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_ACB8D447_BDDA_FCB1_41E6_9D21EEBB3C61",
   "yaw": -55.19,
   "backwardYaw": 66.07,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_D3F6545D_C2B8_04ED_41D9_8E42E78674E0",
   "yaw": -38.35,
   "backwardYaw": -71.9,
   "distance": 1
  }
 ],
 "vfov": 90,
 "hfov": 180,
 "label": "Ground1",
 "id": "panorama_CE0FDF78_C2C8_04B3_41D9_7F71BAE83480",
 "thumbnailUrl": "media/panorama_CE0FDF78_C2C8_04B3_41D9_7F71BAE83480_t.jpg",
 "pitch": 0,
 "class": "Panorama",
 "overlays": [
  "this.overlay_CD0CFB59_C2C8_0CF5_41C7_59804EAC0CC9",
  "this.overlay_D2338E9A_C2B8_0477_41E0_2650F0FE346C"
 ],
 "partial": true
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 94,
  "yaw": 105.75,
  "pitch": 0
 },
 "id": "camera_D77C058B_C348_0455_41E5_71A682345610",
 "initialSequence": {
  "movements": [
   {
    "class": "TargetPanoramaCameraMovement",
    "yawSpeed": 1.8,
    "easing": "cubic_in",
    "targetYaw": 2.65,
    "path": "shortest"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "yawSpeed": 1.8,
    "easing": "linear",
    "targetYaw": 40.35,
    "path": "shortest"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "yawSpeed": 1.8,
    "easing": "cubic_out",
    "targetYaw": 43,
    "path": "shortest"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_CE0FDF78_C2C8_04B3_41D9_7F71BAE83480_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "TargetPanoramaCameraMovement",
    "yawSpeed": 1.89,
    "easing": "cubic_in",
    "targetYaw": 2.75,
    "path": "shortest"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "yawSpeed": 1.89,
    "easing": "linear",
    "targetYaw": 42.25,
    "path": "shortest"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "yawSpeed": 1.89,
    "easing": "cubic_out",
    "targetYaw": 45,
    "path": "shortest"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -97.36,
  "pitch": 0
 },
 "id": "camera_D722751A_C348_0477_41DA_F0DC44F85175",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_ACB8D447_BDDA_FCB1_41E6_9D21EEBB3C61_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "TargetPanoramaCameraMovement",
    "yawSpeed": 1.89,
    "easing": "cubic_in",
    "targetYaw": 2.75,
    "path": "shortest"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "yawSpeed": 1.89,
    "easing": "linear",
    "targetYaw": 42.25,
    "path": "shortest"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "yawSpeed": 1.89,
    "easing": "cubic_out",
    "targetYaw": 45,
    "path": "shortest"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ACB8D447_BDDA_FCB1_41E6_9D21EEBB3C61_0/f/0/{row}_{column}.jpg",
      "width": 6656,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 13,
      "rowCount": 13,
      "height": 6656
     },
     {
      "url": "media/panorama_ACB8D447_BDDA_FCB1_41E6_9D21EEBB3C61_0/f/1/{row}_{column}.jpg",
      "width": 3584,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 7,
      "rowCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_ACB8D447_BDDA_FCB1_41E6_9D21EEBB3C61_0/f/2/{row}_{column}.jpg",
      "width": 2048,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_ACB8D447_BDDA_FCB1_41E6_9D21EEBB3C61_0/f/3/{row}_{column}.jpg",
      "width": 1024,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_ACB8D447_BDDA_FCB1_41E6_9D21EEBB3C61_0/f/4/{row}_{column}.jpg",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ACB8D447_BDDA_FCB1_41E6_9D21EEBB3C61_0/u/0/{row}_{column}.jpg",
      "width": 6656,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 13,
      "rowCount": 13,
      "height": 6656
     },
     {
      "url": "media/panorama_ACB8D447_BDDA_FCB1_41E6_9D21EEBB3C61_0/u/1/{row}_{column}.jpg",
      "width": 3584,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 7,
      "rowCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_ACB8D447_BDDA_FCB1_41E6_9D21EEBB3C61_0/u/2/{row}_{column}.jpg",
      "width": 2048,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_ACB8D447_BDDA_FCB1_41E6_9D21EEBB3C61_0/u/3/{row}_{column}.jpg",
      "width": 1024,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_ACB8D447_BDDA_FCB1_41E6_9D21EEBB3C61_0/u/4/{row}_{column}.jpg",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ACB8D447_BDDA_FCB1_41E6_9D21EEBB3C61_0/r/0/{row}_{column}.jpg",
      "width": 6656,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 13,
      "rowCount": 13,
      "height": 6656
     },
     {
      "url": "media/panorama_ACB8D447_BDDA_FCB1_41E6_9D21EEBB3C61_0/r/1/{row}_{column}.jpg",
      "width": 3584,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 7,
      "rowCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_ACB8D447_BDDA_FCB1_41E6_9D21EEBB3C61_0/r/2/{row}_{column}.jpg",
      "width": 2048,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_ACB8D447_BDDA_FCB1_41E6_9D21EEBB3C61_0/r/3/{row}_{column}.jpg",
      "width": 1024,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_ACB8D447_BDDA_FCB1_41E6_9D21EEBB3C61_0/r/4/{row}_{column}.jpg",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ACB8D447_BDDA_FCB1_41E6_9D21EEBB3C61_0/d/0/{row}_{column}.jpg",
      "width": 6656,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 13,
      "rowCount": 13,
      "height": 6656
     },
     {
      "url": "media/panorama_ACB8D447_BDDA_FCB1_41E6_9D21EEBB3C61_0/d/1/{row}_{column}.jpg",
      "width": 3584,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 7,
      "rowCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_ACB8D447_BDDA_FCB1_41E6_9D21EEBB3C61_0/d/2/{row}_{column}.jpg",
      "width": 2048,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_ACB8D447_BDDA_FCB1_41E6_9D21EEBB3C61_0/d/3/{row}_{column}.jpg",
      "width": 1024,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_ACB8D447_BDDA_FCB1_41E6_9D21EEBB3C61_0/d/4/{row}_{column}.jpg",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ACB8D447_BDDA_FCB1_41E6_9D21EEBB3C61_0/l/0/{row}_{column}.jpg",
      "width": 6656,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 13,
      "rowCount": 13,
      "height": 6656
     },
     {
      "url": "media/panorama_ACB8D447_BDDA_FCB1_41E6_9D21EEBB3C61_0/l/1/{row}_{column}.jpg",
      "width": 3584,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 7,
      "rowCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_ACB8D447_BDDA_FCB1_41E6_9D21EEBB3C61_0/l/2/{row}_{column}.jpg",
      "width": 2048,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_ACB8D447_BDDA_FCB1_41E6_9D21EEBB3C61_0/l/3/{row}_{column}.jpg",
      "width": 1024,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_ACB8D447_BDDA_FCB1_41E6_9D21EEBB3C61_0/l/4/{row}_{column}.jpg",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_ACB8D447_BDDA_FCB1_41E6_9D21EEBB3C61_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_ADC96448_BDDE_7CBE_41E2_6B59FAC8A0FA",
   "yaw": -66.59,
   "backwardYaw": 36.72,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_CE0FDF78_C2C8_04B3_41D9_7F71BAE83480",
   "yaw": 66.07,
   "backwardYaw": -55.19,
   "distance": 1
  }
 ],
 "vfov": 90,
 "hfov": 180,
 "label": "pDM2",
 "id": "panorama_ACB8D447_BDDA_FCB1_41E6_9D21EEBB3C61",
 "thumbnailUrl": "media/panorama_ACB8D447_BDDA_FCB1_41E6_9D21EEBB3C61_t.jpg",
 "pitch": 0,
 "class": "Panorama",
 "overlays": [
  "this.overlay_CC3A5076_C2D8_1CBC_41DA_C7F5A175DC88",
  "this.overlay_CDB46F14_C2C8_0473_41E0_05021AB90872"
 ],
 "partial": true
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_D33B86FD_C2B8_05AD_41E6_05D2F2AF8A9D_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "TargetPanoramaCameraMovement",
    "yawSpeed": 1.89,
    "easing": "cubic_in",
    "targetYaw": 2.75,
    "path": "shortest"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "yawSpeed": 1.89,
    "easing": "linear",
    "targetYaw": 42.25,
    "path": "shortest"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "yawSpeed": 1.89,
    "easing": "cubic_out",
    "targetYaw": 45,
    "path": "shortest"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -127.43,
  "pitch": 0
 },
 "id": "camera_D7DAF60F_C348_046D_41E3_D29A8CF487CC",
 "initialSequence": {
  "movements": [
   {
    "class": "TargetPanoramaCameraMovement",
    "yawSpeed": 1.89,
    "easing": "cubic_in",
    "targetYaw": 2.75,
    "path": "shortest"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "yawSpeed": 1.89,
    "easing": "linear",
    "targetYaw": 42.25,
    "path": "shortest"
   },
   {
    "class": "TargetPanoramaCameraMovement",
    "yawSpeed": 1.89,
    "easing": "cubic_out",
    "targetYaw": 45,
    "path": "shortest"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D3F6545D_C2B8_04ED_41D9_8E42E78674E0_0/f/0/{row}_{column}.jpg",
      "width": 6656,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 13,
      "rowCount": 13,
      "height": 6656
     },
     {
      "url": "media/panorama_D3F6545D_C2B8_04ED_41D9_8E42E78674E0_0/f/1/{row}_{column}.jpg",
      "width": 3584,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 7,
      "rowCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_D3F6545D_C2B8_04ED_41D9_8E42E78674E0_0/f/2/{row}_{column}.jpg",
      "width": 2048,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_D3F6545D_C2B8_04ED_41D9_8E42E78674E0_0/f/3/{row}_{column}.jpg",
      "width": 1024,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_D3F6545D_C2B8_04ED_41D9_8E42E78674E0_0/f/4/{row}_{column}.jpg",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D3F6545D_C2B8_04ED_41D9_8E42E78674E0_0/u/0/{row}_{column}.jpg",
      "width": 6656,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 13,
      "rowCount": 13,
      "height": 6656
     },
     {
      "url": "media/panorama_D3F6545D_C2B8_04ED_41D9_8E42E78674E0_0/u/1/{row}_{column}.jpg",
      "width": 3584,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 7,
      "rowCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_D3F6545D_C2B8_04ED_41D9_8E42E78674E0_0/u/2/{row}_{column}.jpg",
      "width": 2048,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_D3F6545D_C2B8_04ED_41D9_8E42E78674E0_0/u/3/{row}_{column}.jpg",
      "width": 1024,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_D3F6545D_C2B8_04ED_41D9_8E42E78674E0_0/u/4/{row}_{column}.jpg",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D3F6545D_C2B8_04ED_41D9_8E42E78674E0_0/r/0/{row}_{column}.jpg",
      "width": 6656,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 13,
      "rowCount": 13,
      "height": 6656
     },
     {
      "url": "media/panorama_D3F6545D_C2B8_04ED_41D9_8E42E78674E0_0/r/1/{row}_{column}.jpg",
      "width": 3584,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 7,
      "rowCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_D3F6545D_C2B8_04ED_41D9_8E42E78674E0_0/r/2/{row}_{column}.jpg",
      "width": 2048,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_D3F6545D_C2B8_04ED_41D9_8E42E78674E0_0/r/3/{row}_{column}.jpg",
      "width": 1024,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_D3F6545D_C2B8_04ED_41D9_8E42E78674E0_0/r/4/{row}_{column}.jpg",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D3F6545D_C2B8_04ED_41D9_8E42E78674E0_0/d/0/{row}_{column}.jpg",
      "width": 6656,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 13,
      "rowCount": 13,
      "height": 6656
     },
     {
      "url": "media/panorama_D3F6545D_C2B8_04ED_41D9_8E42E78674E0_0/d/1/{row}_{column}.jpg",
      "width": 3584,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 7,
      "rowCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_D3F6545D_C2B8_04ED_41D9_8E42E78674E0_0/d/2/{row}_{column}.jpg",
      "width": 2048,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_D3F6545D_C2B8_04ED_41D9_8E42E78674E0_0/d/3/{row}_{column}.jpg",
      "width": 1024,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_D3F6545D_C2B8_04ED_41D9_8E42E78674E0_0/d/4/{row}_{column}.jpg",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D3F6545D_C2B8_04ED_41D9_8E42E78674E0_0/l/0/{row}_{column}.jpg",
      "width": 6656,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 13,
      "rowCount": 13,
      "height": 6656
     },
     {
      "url": "media/panorama_D3F6545D_C2B8_04ED_41D9_8E42E78674E0_0/l/1/{row}_{column}.jpg",
      "width": 3584,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 7,
      "rowCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_D3F6545D_C2B8_04ED_41D9_8E42E78674E0_0/l/2/{row}_{column}.jpg",
      "width": 2048,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_D3F6545D_C2B8_04ED_41D9_8E42E78674E0_0/l/3/{row}_{column}.jpg",
      "width": 1024,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_D3F6545D_C2B8_04ED_41D9_8E42E78674E0_0/l/4/{row}_{column}.jpg",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D3F6545D_C2B8_04ED_41D9_8E42E78674E0_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_D33B86FD_C2B8_05AD_41E6_05D2F2AF8A9D",
   "yaw": -28.64,
   "backwardYaw": -50.73,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_CE0FDF78_C2C8_04B3_41D9_7F71BAE83480",
   "yaw": -71.9,
   "backwardYaw": -38.35,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_D25DDCFB_C348_05B5_41E1_EAB5D16A8DB1",
   "yaw": 26.8,
   "backwardYaw": 52.57,
   "distance": 1
  }
 ],
 "vfov": 90,
 "hfov": 180,
 "label": "GRound 2",
 "id": "panorama_D3F6545D_C2B8_04ED_41D9_8E42E78674E0",
 "thumbnailUrl": "media/panorama_D3F6545D_C2B8_04ED_41D9_8E42E78674E0_t.jpg",
 "pitch": 0,
 "class": "Panorama",
 "overlays": [
  "this.overlay_D3E63056_C2B8_1CFC_41A5_B952FC932D4E",
  "this.overlay_D32C1496_C2B8_047F_41C6_70E8B2CA66F2",
  "this.overlay_D33E2744_C2B8_04D3_41D8_B7CB1E244EBA"
 ],
 "partial": true
},
{
 "playbackBarHeadWidth": 6,
 "playbackBarHeight": 10,
 "id": "MainViewer",
 "playbackBarRight": 0,
 "toolTipFontWeight": "normal",
 "toolTipShadowColor": "#333333",
 "width": "100%",
 "progressBarBorderSize": 0,
 "playbackBarBackgroundColorDirection": "vertical",
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "paddingLeft": 0,
 "playbackBarProgressBorderSize": 0,
 "minHeight": 50,
 "playbackBarBorderRadius": 0,
 "toolTipShadowOpacity": 1,
 "paddingRight": 0,
 "playbackBarProgressBorderColor": "#000000",
 "toolTipFontStyle": "normal",
 "playbackBarHeadBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "propagateClick": false,
 "toolTipFontFamily": "Arial",
 "playbackBarProgressOpacity": 1,
 "height": "100%",
 "minWidth": 100,
 "toolTipTextShadowOpacity": 0,
 "playbackBarBorderSize": 0,
 "playbackBarHeadBorderSize": 0,
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "progressLeft": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipBackgroundColor": "#F6F6F6",
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "toolTipFontColor": "#606060",
 "toolTipShadowHorizontalLength": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressRight": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "toolTipShadowVerticalLength": 0,
 "shadow": false,
 "progressHeight": 10,
 "playbackBarHeadShadow": true,
 "progressBottom": 0,
 "class": "ViewerArea",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipPaddingRight": 6,
 "borderSize": 0,
 "toolTipBorderSize": 1,
 "vrPointerColor": "#FFFFFF",
 "toolTipPaddingLeft": 6,
 "toolTipPaddingTop": 4,
 "progressBarOpacity": 1,
 "toolTipDisplayTime": 600,
 "progressBorderSize": 0,
 "displayTooltipInTouchScreens": true,
 "transitionMode": "blending",
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarBorderColor": "#FFFFFF",
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "transitionDuration": 500,
 "progressBorderRadius": 0,
 "playbackBarLeft": 0,
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarHeadHeight": 15,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#000000",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "paddingBottom": 0,
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 5,
 "paddingTop": 0,
 "toolTipShadowBlurRadius": 3,
 "progressBorderColor": "#000000",
 "toolTipTextShadowColor": "#000000",
 "toolTipOpacity": 1,
 "toolTipShadowSpread": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipFontSize": "1.11vmin",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarHeadShadowHorizontalLength": 0,
 "toolTipPaddingBottom": 4,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "toolTipBorderColor": "#767676",
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "data": {
  "name": "Main Viewer"
 },
 "progressBackgroundColorDirection": "vertical"
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_B3933DF9_BD79_EF5E_41DA_47CF32CD2EBF, this.camera_D722751A_C348_0477_41DA_F0DC44F85175); this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 02a Left-Up"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 13.91,
   "yaw": -74.25,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_B1DDF7A3_BD5E_BBF1_41C9_AF5D825F5C29_1_HS_0_0_0_map.gif",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -19.13
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "hfov": 13.91,
   "image": "this.AnimatedImageResource_AFB1B275_BD4A_D551_41CC_E1C6F474F59A",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -19.13,
   "yaw": -74.25,
   "distance": 50
  }
 ],
 "id": "overlay_AD551C2E_BD56_ACF2_41E3_9EF52EBBF75A",
 "enabledInCardboard": true
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D3F6545D_C2B8_04ED_41D9_8E42E78674E0, this.camera_D7C4C627_C348_045D_41E7_1DE444A4E926); this.mainPlayList.set('selectedIndex', 6)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01 Left"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 9.58,
   "yaw": -50.73,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_D33B86FD_C2B8_05AD_41E6_05D2F2AF8A9D_0_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -12.68
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "hfov": 9.58,
   "image": "this.AnimatedImageResource_D732B4F7_C348_05BD_41E7_4054D85D8EB6",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -12.68,
   "yaw": -50.73,
   "distance": 50
  }
 ],
 "id": "overlay_D2306CBD_C2B8_05AD_41D1_D5E421889694",
 "enabledInCardboard": true
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_B1DDF7A3_BD5E_BBF1_41C9_AF5D825F5C29, this.camera_D77C058B_C348_0455_41E5_71A682345610); this.mainPlayList.set('selectedIndex', 0)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 02 Right-Up"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 5.81,
   "yaw": 82.64,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_B3933DF9_BD79_EF5E_41DA_47CF32CD2EBF_0_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -18.82
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "hfov": 5.81,
   "image": "this.AnimatedImageResource_AC4AADE3_BDBF_AF72_41E1_C97D4A82FB84",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -18.82,
   "yaw": 82.64,
   "distance": 50
  }
 ],
 "id": "overlay_AC07EE70_BDB6_6D6F_41E5_F9DA31BB9B30",
 "enabledInCardboard": true
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_B20994BA_BDB9_DDD3_41E4_149DD367EB75, this.camera_D78FF5CD_C348_07ED_41E0_1E894B9D10CF); this.mainPlayList.set('selectedIndex', 2); this.mainPlayList.set('selectedIndex', 2)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 02 Left-Up"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 6.02,
   "yaw": -58.91,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_B3933DF9_BD79_EF5E_41DA_47CF32CD2EBF_0_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -11.25
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "hfov": 6.02,
   "image": "this.AnimatedImageResource_AC4A7DE4_BDBF_AF76_41E1_FC34B18AE4B2",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -11.25,
   "yaw": -58.91,
   "distance": 50
  }
 ],
 "id": "overlay_AD153DD5_BDBA_AF56_41B0_5107B066F56C",
 "enabledInCardboard": true
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADC96448_BDDE_7CBE_41E2_6B59FAC8A0FA, this.camera_D76CA59E_C348_046F_41E2_8F039C0DC713); this.mainPlayList.set('selectedIndex', 3)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01b"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 10.56,
   "yaw": 28.43,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_B3933DF9_BD79_EF5E_41DA_47CF32CD2EBF_0_HS_3_0_0_map.gif",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -6.74
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "hfov": 10.56,
   "image": "this.AnimatedImageResource_D70E44F5_C348_05BD_41E3_F976327FCB96",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -6.74,
   "yaw": 28.43,
   "distance": 100
  }
 ],
 "id": "overlay_ACC33DAC_BDCA_AFF6_41E6_C187A7495F85",
 "enabledInCardboard": true
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_B3933DF9_BD79_EF5E_41DA_47CF32CD2EBF, this.camera_D742755C_C348_04F3_41E8_2FA423DCDD63); this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01 Left"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 11.04,
   "yaw": -54.9,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_ADC96448_BDDE_7CBE_41E2_6B59FAC8A0FA_0_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 1.43
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "hfov": 11.04,
   "image": "this.AnimatedImageResource_D70DC4F5_C348_05BD_41D8_9B83164326D1",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": 1.43,
   "yaw": -54.9,
   "distance": 50
  }
 ],
 "id": "overlay_AD55BD54_BDD9_AF57_41E5_96AC544E986E",
 "enabledInCardboard": true
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ACB8D447_BDDA_FCB1_41E6_9D21EEBB3C61, this.camera_D772F573_C348_04B5_41D1_A091A290D143); this.mainPlayList.set('selectedIndex', 4)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01 Right-Up"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 8.12,
   "yaw": 36.72,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_ADC96448_BDDE_7CBE_41E2_6B59FAC8A0FA_0_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -7.06
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "hfov": 8.12,
   "image": "this.AnimatedImageResource_D70D14F6_C348_05BF_41E5_11FA3B4F0F2B",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -7.06,
   "yaw": 36.72,
   "distance": 50
  }
 ],
 "id": "overlay_AFAD3C8F_BDDA_ADB2_41DE_1D29728D9E2B",
 "enabledInCardboard": true
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_B3933DF9_BD79_EF5E_41DA_47CF32CD2EBF, this.camera_D601466C_C348_04D3_41BD_C68DD9C08ACE); this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01 Left"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 14.56,
   "yaw": -71.6,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_B20994BA_BDB9_DDD3_41E4_149DD367EB75_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -40.64
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "hfov": 14.56,
   "image": "this.AnimatedImageResource_AC4A1DE4_BDBF_AF76_41CF_FED371B5AC68",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -40.64,
   "yaw": -71.6,
   "distance": 50
  }
 ],
 "id": "overlay_AC26C457_BDBE_5D51_41D1_CE108B194ED6",
 "enabledInCardboard": true
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 4)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01a"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 14.86,
   "yaw": -58.81,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_D25DDCFB_C348_05B5_41E1_EAB5D16A8DB1_1_HS_0_0_0_map.gif",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -5.62
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "hfov": 14.86,
   "image": "this.AnimatedImageResource_D70BC9AA_C348_0C57_41C2_03E22439834A",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -5.62,
   "yaw": -58.81,
   "distance": 100
  }
 ],
 "id": "overlay_D3EBFF58_C348_04F3_41E8_495BDB93A6C1",
 "enabledInCardboard": true
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D3F6545D_C2B8_04ED_41D9_8E42E78674E0, this.camera_D617765C_C348_04F3_41E4_E3D92C828723); this.mainPlayList.set('selectedIndex', 6)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01 Left-Up"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 15.01,
   "yaw": 52.57,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_D25DDCFB_C348_05B5_41E1_EAB5D16A8DB1_1_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -7.36
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "hfov": 15.01,
   "image": "this.AnimatedImageResource_D71419AA_C348_0C57_41CE_131E91B87DAF",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -7.36,
   "yaw": 52.57,
   "distance": 50
  }
 ],
 "id": "overlay_D168ECDB_C348_05F4_41D3_BC9F5FA657BD",
 "enabledInCardboard": true
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ACB8D447_BDDA_FCB1_41E6_9D21EEBB3C61, this.camera_D72F5532_C348_04B7_41E7_9ED72CEE321F); this.mainPlayList.set('selectedIndex', 4)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01 Left"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 12.95,
   "yaw": -55.19,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_CE0FDF78_C2C8_04B3_41D9_7F71BAE83480_0_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -29.84
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "hfov": 12.95,
   "image": "this.AnimatedImageResource_D2F77F23_C358_0455_41E6_C6414A971746",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -29.84,
   "yaw": -55.19,
   "distance": 50
  }
 ],
 "id": "overlay_CD0CFB59_C2C8_0CF5_41C7_59804EAC0CC9",
 "enabledInCardboard": true
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D3F6545D_C2B8_04ED_41D9_8E42E78674E0, this.camera_D755454A_C348_04D7_41DD_763E48BA8691); this.mainPlayList.set('selectedIndex', 6)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 12.33,
   "yaw": -38.35,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_CE0FDF78_C2C8_04B3_41D9_7F71BAE83480_0_HS_1_0_0_map.gif",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -1.84
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "hfov": 12.33,
   "image": "this.AnimatedImageResource_D108EF23_C358_0455_41BE_6850F5B5A502",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -1.84,
   "yaw": -38.35,
   "distance": 100
  }
 ],
 "id": "overlay_D2338E9A_C2B8_0477_41E0_2650F0FE346C",
 "enabledInCardboard": true
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ADC96448_BDDE_7CBE_41E2_6B59FAC8A0FA, this.camera_D7F55638_C348_04B3_41E8_0D0DF64E9C3F); this.mainPlayList.set('selectedIndex', 3)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 02 Left-Up"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 8.35,
   "yaw": -66.59,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_ACB8D447_BDDA_FCB1_41E6_9D21EEBB3C61_0_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -5.62
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "hfov": 8.35,
   "image": "this.AnimatedImageResource_D70CA4F6_C348_05BF_41C4_E187BC43E9FD",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -5.62,
   "yaw": -66.59,
   "distance": 50
  }
 ],
 "id": "overlay_CC3A5076_C2D8_1CBC_41DA_C7F5A175DC88",
 "enabledInCardboard": true
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CE0FDF78_C2C8_04B3_41D9_7F71BAE83480, this.camera_D7E68649_C348_04D5_41DE_22B53C5EC598); this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01 Right"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 9.41,
   "yaw": 66.07,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_ACB8D447_BDDA_FCB1_41E6_9D21EEBB3C61_0_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 1.53
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "hfov": 9.41,
   "image": "this.AnimatedImageResource_D70CF4F6_C348_05BF_41D0_0F18A8EA4E7F",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": 1.53,
   "yaw": 66.07,
   "distance": 50
  }
 ],
 "id": "overlay_CDB46F14_C2C8_0473_41E0_05021AB90872",
 "enabledInCardboard": true
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D33B86FD_C2B8_05AD_41E6_05D2F2AF8A9D, this.camera_D7BFA5E5_C348_07DD_41DC_F0BC54CA59B5); this.mainPlayList.set('selectedIndex', 7)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01b"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 11.86,
   "yaw": -28.64,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_D3F6545D_C2B8_04ED_41D9_8E42E78674E0_0_HS_0_0_0_map.gif",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -2.15
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "hfov": 11.86,
   "image": "this.AnimatedImageResource_D733B4F6_C348_05BF_41DD_8D85EDDBAE18",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -2.15,
   "yaw": -28.64,
   "distance": 100
  }
 ],
 "id": "overlay_D3E63056_C2B8_1CFC_41A5_B952FC932D4E",
 "enabledInCardboard": true
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CE0FDF78_C2C8_04B3_41D9_7F71BAE83480, this.camera_D7AA65FC_C348_07B3_41E3_9209109DD5B7); this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01 Left"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 11.2,
   "yaw": -71.9,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_D3F6545D_C2B8_04ED_41D9_8E42E78674E0_0_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -5.32
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "hfov": 11.2,
   "image": "this.AnimatedImageResource_D733C4F6_C348_05BF_41E1_E3DB511622E4",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -5.32,
   "yaw": -71.9,
   "distance": 50
  }
 ],
 "id": "overlay_D32C1496_C2B8_047F_41C6_70E8B2CA66F2",
 "enabledInCardboard": true
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D25DDCFB_C348_05B5_41E1_EAB5D16A8DB1, this.camera_D7DAF60F_C348_046D_41E3_D29A8CF487CC); this.mainPlayList.set('selectedIndex', 8)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01 Right"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 8.89,
   "yaw": 26.8,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_D3F6545D_C2B8_04ED_41D9_8E42E78674E0_0_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -8.9
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "hfov": 8.89,
   "image": "this.AnimatedImageResource_D73374F7_C348_05BD_41C9_41DC45E48CFF",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -8.9,
   "yaw": 26.8,
   "distance": 50
  }
 ],
 "id": "overlay_D33E2744_C2B8_04D3_41D8_B7CB1E244EBA",
 "enabledInCardboard": true
},
{
 "colCount": 4,
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "id": "AnimatedImageResource_AFB1B275_BD4A_D551_41CC_E1C6F474F59A",
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_B1DDF7A3_BD5E_BBF1_41C9_AF5D825F5C29_1_HS_0_0.png",
   "width": 400,
   "height": 360
  }
 ],
 "frameCount": 24
},
{
 "colCount": 3,
 "rowCount": 3,
 "class": "AnimatedImageResource",
 "frameDuration": 62,
 "id": "AnimatedImageResource_D732B4F7_C348_05BD_41E7_4054D85D8EB6",
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_D33B86FD_C2B8_05AD_41E6_05D2F2AF8A9D_0_HS_0_0.png",
   "width": 300,
   "height": 300
  }
 ],
 "frameCount": 9
},
{
 "colCount": 4,
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "id": "AnimatedImageResource_AC4AADE3_BDBF_AF72_41E1_C97D4A82FB84",
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_B3933DF9_BD79_EF5E_41DA_47CF32CD2EBF_0_HS_0_0.png",
   "width": 380,
   "height": 570
  }
 ],
 "frameCount": 24
},
{
 "colCount": 4,
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "id": "AnimatedImageResource_AC4A7DE4_BDBF_AF76_41E1_FC34B18AE4B2",
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_B3933DF9_BD79_EF5E_41DA_47CF32CD2EBF_0_HS_1_0.png",
   "width": 380,
   "height": 570
  }
 ],
 "frameCount": 24
},
{
 "colCount": 3,
 "rowCount": 3,
 "class": "AnimatedImageResource",
 "frameDuration": 62,
 "id": "AnimatedImageResource_D70E44F5_C348_05BD_41E3_F976327FCB96",
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_B3933DF9_BD79_EF5E_41DA_47CF32CD2EBF_0_HS_3_0.png",
   "width": 330,
   "height": 180
  }
 ],
 "frameCount": 9
},
{
 "colCount": 3,
 "rowCount": 3,
 "class": "AnimatedImageResource",
 "frameDuration": 62,
 "id": "AnimatedImageResource_D70DC4F5_C348_05BD_41D8_9B83164326D1",
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_ADC96448_BDDE_7CBE_41E2_6B59FAC8A0FA_0_HS_0_0.png",
   "width": 300,
   "height": 300
  }
 ],
 "frameCount": 9
},
{
 "colCount": 3,
 "rowCount": 3,
 "class": "AnimatedImageResource",
 "frameDuration": 62,
 "id": "AnimatedImageResource_D70D14F6_C348_05BF_41E5_11FA3B4F0F2B",
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_ADC96448_BDDE_7CBE_41E2_6B59FAC8A0FA_0_HS_1_0.png",
   "width": 300,
   "height": 300
  }
 ],
 "frameCount": 9
},
{
 "colCount": 3,
 "rowCount": 3,
 "class": "AnimatedImageResource",
 "frameDuration": 62,
 "id": "AnimatedImageResource_AC4A1DE4_BDBF_AF76_41CF_FED371B5AC68",
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_B20994BA_BDB9_DDD3_41E4_149DD367EB75_1_HS_0_0.png",
   "width": 300,
   "height": 300
  }
 ],
 "frameCount": 9
},
{
 "colCount": 3,
 "rowCount": 3,
 "class": "AnimatedImageResource",
 "frameDuration": 62,
 "id": "AnimatedImageResource_D70BC9AA_C348_0C57_41C2_03E22439834A",
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_D25DDCFB_C348_05B5_41E1_EAB5D16A8DB1_1_HS_0_0.png",
   "width": 330,
   "height": 180
  }
 ],
 "frameCount": 9
},
{
 "colCount": 3,
 "rowCount": 3,
 "class": "AnimatedImageResource",
 "frameDuration": 62,
 "id": "AnimatedImageResource_D71419AA_C348_0C57_41CE_131E91B87DAF",
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_D25DDCFB_C348_05B5_41E1_EAB5D16A8DB1_1_HS_1_0.png",
   "width": 300,
   "height": 300
  }
 ],
 "frameCount": 9
},
{
 "colCount": 3,
 "rowCount": 3,
 "class": "AnimatedImageResource",
 "frameDuration": 62,
 "id": "AnimatedImageResource_D2F77F23_C358_0455_41E6_C6414A971746",
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_CE0FDF78_C2C8_04B3_41D9_7F71BAE83480_0_HS_0_0.png",
   "width": 300,
   "height": 300
  }
 ],
 "frameCount": 9
},
{
 "colCount": 3,
 "rowCount": 3,
 "class": "AnimatedImageResource",
 "frameDuration": 62,
 "id": "AnimatedImageResource_D108EF23_C358_0455_41BE_6850F5B5A502",
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_CE0FDF78_C2C8_04B3_41D9_7F71BAE83480_0_HS_1_0.png",
   "width": 300,
   "height": 270
  }
 ],
 "frameCount": 9
},
{
 "colCount": 4,
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "id": "AnimatedImageResource_D70CA4F6_C348_05BF_41C4_E187BC43E9FD",
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_ACB8D447_BDDA_FCB1_41E6_9D21EEBB3C61_0_HS_0_0.png",
   "width": 380,
   "height": 570
  }
 ],
 "frameCount": 24
},
{
 "colCount": 3,
 "rowCount": 3,
 "class": "AnimatedImageResource",
 "frameDuration": 62,
 "id": "AnimatedImageResource_D70CF4F6_C348_05BF_41D0_0F18A8EA4E7F",
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_ACB8D447_BDDA_FCB1_41E6_9D21EEBB3C61_0_HS_1_0.png",
   "width": 300,
   "height": 300
  }
 ],
 "frameCount": 9
},
{
 "colCount": 3,
 "rowCount": 3,
 "class": "AnimatedImageResource",
 "frameDuration": 62,
 "id": "AnimatedImageResource_D733B4F6_C348_05BF_41DD_8D85EDDBAE18",
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_D3F6545D_C2B8_04ED_41D9_8E42E78674E0_0_HS_0_0.png",
   "width": 330,
   "height": 180
  }
 ],
 "frameCount": 9
},
{
 "colCount": 3,
 "rowCount": 3,
 "class": "AnimatedImageResource",
 "frameDuration": 62,
 "id": "AnimatedImageResource_D733C4F6_C348_05BF_41E1_E3DB511622E4",
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_D3F6545D_C2B8_04ED_41D9_8E42E78674E0_0_HS_1_0.png",
   "width": 300,
   "height": 300
  }
 ],
 "frameCount": 9
},
{
 "colCount": 3,
 "rowCount": 3,
 "class": "AnimatedImageResource",
 "frameDuration": 62,
 "id": "AnimatedImageResource_D73374F7_C348_05BD_41C9_41DC45E48CFF",
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_D3F6545D_C2B8_04ED_41D9_8E42E78674E0_0_HS_2_0.png",
   "width": 300,
   "height": 300
  }
 ],
 "frameCount": 9
}],
 "scrollBarColor": "#000000",
 "paddingBottom": 0,
 "overflow": "visible",
 "paddingTop": 0,
 "backgroundPreloadEnabled": true,
 "data": {
  "name": "Player445"
 },
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "mouseWheelEnabled": true,
 "shadow": false,
 "vrPolyfillScale": 0.5,
 "desktopMipmappingEnabled": false
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
