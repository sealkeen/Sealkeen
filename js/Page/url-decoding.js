import { fetchContentCrossOrigin } from "../Router/shared.js";
import { handleLocation } from './../Router/location-mapper.js';

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
      , false, false).then(result => {
        if(result.ok) { replaceArtistParamInUrl(artist); }
          return result;
      });;
    }
  }
  
export function replaceArtistParamInUrl(artist) {
  console.log("[INF] url-decoding.js/replaceArtistParamInUrl(), artist: " + artist);

  const params = new URLSearchParams(window.location.search);

  if (!params.has('artist')) {
    // No artist parameter, so add it
    params.append('artist', artist);
  } else {
    // Artist parameter exists, so modify it
    params.set('artist', artist);
  }

  const newUrl = `${window.location.origin}?${params.toString()}`;
  window.history.replaceState(null, null, newUrl);
}