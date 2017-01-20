function isUndefined( variable ){
    return typeof( variable ) === 'undefined'
}

class MediaWrapper {
    constructor( media ){
        if (new.target === MediaWrapper) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }
        var d = Object.getOwnPropertyDescriptor(new.target.prototype, 'currentTime');
        // console.log( isUndefined(d.get) );

    }

    set currentTime( time ){

    }

    get currentTime(){

    }

    get length(){

    }

    set source( url ){

    }

    get source(){

    }

    set timeUpdateListener( callback ){

    }

    get timeUpdateListener(){

    }

    play(){

    }

    pause(){

    }

    isPlaying(){

    }

}
