class MarkersManager{
    constructor( media ){
        this._markers = [];
        this._media = media;
        this._recordinMedia = false;
        this._currentMarker = 0;
        return;


    }

    set markers( markers ){
        this._markers = markers;
    }

    get markers(){
        return this._markers;
    }

    set media( media ){
        this._media = media;
    }

    get media(){
        return this._media;
    }

    startMarker( ){

        let complete = Q.defer();

        if ( !this._recordingMarker ) {
            // logger.debug("PlayerManager", "got this:", this);
            this._currentMarker = this._markers.push(new Marker(this._media.currentTime));
            this._recordingMarker = true;
            complete.resolve();
        }
        complete.resolve();


        return complete.promise;
    }

    stopMarker(){

        let complete = Q.defer();
        this._recordingMarker = false;
        this._markers[ this._currentMarker - 1 ].end = this._media.currentTime;
        complete.resolve();

        return complete.promise;

    }





}
