class HtmlPlayerWrapper extends MediaWrapper{

    constructor( media ){
        super();
        this.player = media;
    }

    set currentTime(time){
        this.player.currentTime = time;
    }

    get currentTime(){
        return this.player.currentTime;
    }

    get length(){
        return this.player.duration;
    }

    set source( url ){
        this.player.src = url;
    }

    get source(){
        return this.player.src;
    }

    set timeUpdateListener( callback ){

        if( !isUndefined( this.timeUpdateListener ) ){

            this.player.removeEventListener(this.timeUpdateListener);

        }

        this.timeUpdateListener = this.player.addEventListener("timeupdate", callback );
    }

    get timeUpdateListener(){
        return this.timeUpdateListener;
    }

    play(){
        this.player.play();
    }

    pause(){
        this.player.pause();
    }

    isPlaying(){
        return !this.player.paused;
    }

}
