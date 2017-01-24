
var playerManager = function( video ){
    logger.debug("droomPlayer", 'Starting up...');

    var pm = this;
    pm.player = video;
    pm.mappedShortKeys = {};

    pm.init = ()=>{

        pm.initSeeker();
        pm.setListeners();

    }

    pm.initSeeker = ()=>{

        // console.dir(typeof(pm.player))
        pm.seekerVideo = new Seeker(  pm.player );
        //
        // pm.player.addEventListener("timeupdate", function(){
        //     if( ! pm.isPlaying() ){
        //         pm.seekerVideo.update();
        //     }
        // });

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

    pm.shortKeys = [
        new ShortKey( 32, '[space]', 'playOnPress' , 'hold', [pm.play, pm.pause] ),
        new ShortKey( 80, 'p', 'playToggle'  , 'down', pm.toggle )
    ];


    pm.init();

    return pm;
}

var testPlayer = new HtmlPlayerWrapper();
