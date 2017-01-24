var playerManager = function( video ){
    logger.debug("droomPlayer", 'Starting up...');

    var pm = this;
    pm.player = video;
    pm.mappedShortKeys = {};

    pm.init = ()=>{

        pm.initSeeker();
        pm.setListeners();
        pm.recordingMarker = false;

    }

    pm.initSeeker = ()=>{
        pm.seekerVideo = new Seeker(  pm.player );
    }

    pm.setCurrentTime = ( time )=>{
        pm.player.currentTime = time ;
    }

    pm.getCurrentTime = ()=>{
        return pm.player.currentTime;
    }

    pm.getDuration = ()=>{
        return pm.player.duration;
    }

    pm.loadVideo = ( url )=>{

        pm.player.source = url ;
        pm.seekerVideo.updateLength( pm.player.duration );

    }

    pm.play = ()=>{
        // console.dir(pm.isPlaying())
        if ( !pm.isPlaying() ) {

            pm.seekerVideo.startRefresh();
            pm.player.play();

        }

    };

    pm.pause = ()=>{
        if ( pm.isPlaying() ) {
            pm.seekerVideo.stopRefresh();
            pm.player.pause();
        }
    };

    pm.toggle = ()=>{

        if( pm.isPlaying() ){
            pm.pause();
        }else{
            pm.play();
        }

    };

    pm.isPlaying = ()=>{

        return pm.player.isPlaying();

    };

    pm.seekToTime = ( time, isRelative )=>{

        var newVideoTime = ( isRelative ) ? pm.player.currentTime + time : time;
        newVideoTime = ( newVideoTime < 0 ) ? 0 : ( newVideoTime > pm.player.duration ) ? pm.player.duration : newVideoTime;
        pm.player.currentTime = newVideoTime ;


    }

    pm.prepareMappedKeysObject = ()=>{
        pm.shortKeys.map(function( element ){

            let id =  element.keyId;
            pm.mappedShortKeys[id] = element;

        });
    }

    pm.setListeners = ()=>{

        pm.prepareMappedKeysObject();

        window.onkeydown = (e)=>{

            var key = e.keyCode ? e.keyCode : e.which;
            e.preventDefault();
            logger.debug("Listeners", 'Received on key down: '+ e.keyCode);
            var shortKey = pm.mappedShortKeys[key];
            if( typeof(shortKey) !== 'undefined'){

                shortKey.keyDown();

            }
        }

        window.onkeyup = (e)=>{

            var key = e.keyCode ? e.keyCode : e.which;
            e.preventDefault();
            logger.debug("Listeners", 'Received on key up: '+ e.keyCode);
            var shortKey = pm.mappedShortKeys[key];
            if( typeof(shortKey) !== 'undefined'){

                shortKey.keyUp();
            }
        }

    }

    pm.markers = [];
    pm.startMarker = function(){
        if ( !pm.recordingMarker ) {
            if ( !pm.player.isPlaying()) {
                pm.play();
            }
            // logger.debug("PlayerManager", "got this:", this);
            pm.currentMarker = pm.markers.push(new Marker(pm.player.currentTime));
            pm.recordingMarker = true;

        }

    }

    pm.stopMarker = function(){

        if ( pm.player.isPlaying()) {
            pm.pause();
        }
        pm.recordingMarker = false;
        pm.markers[ pm.currentMarker - 1 ].end = pm.player.currentTime;

    }

    pm.shortKeys = [
        new ShortKey( 32, '[space]', 'playOnPress' , 'hold', [pm.play, pm.pause] ),
        new ShortKey( 80, 'p', 'playToggle'  , 'down', pm.toggle ),
        new ShortKey( 77, 'm', 'startMarker' , 'hold', [pm.startMarker, pm.stopMarker])
    ];


    pm.init();

    return pm;
}

var testPlayer = new HtmlPlayerWrapper();
