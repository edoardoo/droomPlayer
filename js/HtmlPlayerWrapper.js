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

    get duration(){
        return this.player.duration;
    }

    set source( url ){
        this.player.src = url;
    }

    get source(){
        return this.player.src;
    }

    set timeUpdateListener( callback ){

        // if( !isUndefined( this.timeUpdateListenerInstance) ){
        //
        //     this.player.removeEventListener(this.timeUpdateListenerInstance );
        //
        // }

        this.timeUpdateListenerInstance = this.player.addEventListener("timeupdate", callback );
    }

    get timeUpdateListener(){
        return this.timeUpdateListenerInstance;
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
