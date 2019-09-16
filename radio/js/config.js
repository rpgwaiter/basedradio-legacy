/* This is the BasedRadio Config File
Fill this out and all your dreams will come true */
export function Config() {
    /*

URL Prefix for the radio
For example, if your site's URL is https://based.zone ,
siteroot = "/radio" would setup basedradio at https://based.zone/radio */
    this.siteRoot = "/radio";

    // Site Title
    this.siteTitle = "BasedRadio - Video Game Music Stream";

    // Directory where the radio files reside at
    this.radioFiles = "/filehost/radiofiles";

    // Opus Audio Source (Casted through Icecast or similar)
    this.opusStream = "https://radio.based.zone/files/basedvgm.ogg";

    // MP3 Audio Source (not as good as Opus)
    this.mp3Stream = "https://radio.based.zone/files/basedvgm.mp3";

    // Link to BasedRadio API
    this.apiLink = "https://api.based.zone/status";
}