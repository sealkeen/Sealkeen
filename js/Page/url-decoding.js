import { fetchContentCrossOrigin } from "../Router/shared.js";

export default class MusicAPI {
    constructor() {
      //console.log('%j', window.location)
      const params = new URLSearchParams(window.location.search);
      const artist = params.get("artist");
      const track = params.get("track") || "*";
  
      if (artist) {
        this.search(artist, track);
      }
    }
  
    search(artist, track) {
      console.log(`Searching for "${track}" by ${artist}...`);
      // Call the API with the given artist and track
      fetchContentCrossOrigin(`GetPartialCompositionPageByArtistName?artistName=${artist}`);
    }
  }
  
  // Create a new instance of the MusicAPI class
  // const api = new MusicAPI();