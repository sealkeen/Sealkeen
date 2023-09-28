import { fetchContentCrossOrigin } from "../Router/shared.js";
import { handleLocation } from './../Router/location-mapper.js';
import urls from "./../api.js"


export default class MusicAPI {
    constructor() {
      console.log('%j', window.location)
      const params = new URLSearchParams(window.location.search);
      const artist = params.get("artist");
      const track = params.get("track") || "*";
  
      if (artist) {
        this.search(artist, track);
      } else {
        handleLocation();
      }
    }
  
    search(artist, track) {
      console.log(`[INF] url-decoding.js/Searching for "${track}" by ${artist}...`);
      // Call the API with the given artist and track
      fetchContentCrossOrigin(`GetPartialCompositionPageByArtistName?artistName=${artist}`
      , false).then(result => {
        if(result.ok) { replaceArtistParamInUrl(artist); }
          return result;
      });;
    }
  }
  
  // Create a new instance of the MusicAPI class
  // const api = new MusicAPI();

export function replaceArtistParamInUrl(artist) {
    console.log("[INF] url-decoding.js/replaceArtistParamInUrl(), artist: " + artist);
    if (!urls.isGithub() && !urls.isNodeJSHost() && !urls.isRemoteWorkspace()) {
      return;
    }
  
    const params = new URLSearchParams(window.location.search);
  
    if (!params.has('artist')) {
      // No artist parameter, so add it
      params.append('artist', artist);
    } else {
      // Artist parameter exists, so modify it
      params.set('artist', artist);
    }
  
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState(null, null, newUrl);
  }