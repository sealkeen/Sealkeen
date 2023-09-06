import { fetchContentCrossOrigin } from "../Router/shared.js";
import { handleLocation } from './../Router/location-mapper.js';
import { setNextComposition } from "../Utils/Audio.js";
import urls from "./../api.js"

export default class TrackAPI {
    constructor(callBack) {
      this.callBack = callBack;
      console.log('[VRB] track-decoding.js/TrackAPI: %j', window.location);
      const params = new URLSearchParams(window.location.search);
      const track = params.get("trackId") || "*";
  
      if (track && track !== "*") {
        this.search(track);
      } 
    }
  
    search(track) {
      console.log(`[INF] track-decoding.js/Tring to load direct for "${track}" ...`);

      // Call the API with the given track
      this.callBack(track);
    }
  }

  export function replaceTrackParamInUrl(trackId) {
      console.log("[INF] track-decoding.js/replaceArtistParamInUrl(), track id: " + trackId);
      if (!urls.isGithub() && !urls.isNodeJSHost()) {
          return;
      }
  
      const params = new URLSearchParams(window.location.search);
    
      if (!params.has('trackId')) {
          console.log("[INF] track-decoding.js/No track parameter, so add it");
          params.append('trackId', artist);
      } else {
          console.log("[INF] track-decoding.js/Track parameter exists, so modify it");
          params.set('trackId', trackId);
      }
    
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState(null, null, newUrl);
  }