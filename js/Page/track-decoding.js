
import Trace from "../Extensions/cs-trace.js";
import { _trackQueue } from './../Shared/Queue.js';

export default class TrackAPI {
    constructor(callBack) {
      this.callBack = callBack;
      Trace.WriteLine('track-decoding.js/TrackAPI: %j', window.location);
      const params = new URLSearchParams(window.location.search);
      const track = params.get("trackId") || "*";
  
      if (track && track !== "*") {
        this.search(track);
      } 
    }
  
    search(track) {
      console.log(`[INF] track-decoding.js/Tring to load direct for "${track}" ...`);
      _trackQueue.enqueue({id : track})
      this.callBack(track);
    }
  }

export function replaceTrackParamInUrl(trackId) {
      console.log("[INF] track-decoding.js/replaceTrackParamInUrl(), track id: " + trackId);
      const params = new URLSearchParams(window.location.search);
    
      if (!params.has('trackId')) {
          console.log("[INF] track-decoding.js/No track parameter, so add it");
          params.append('trackId', trackId);
      } else {
          console.log("[INF] track-decoding.js/Track parameter exists, so modify it");
          params.set('trackId', trackId);
      }
    
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState(null, null, newUrl);
  }