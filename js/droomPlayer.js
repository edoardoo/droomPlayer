class ShortKey {

    constructor( keyId, keyPressed, description, action, reaction){
        this.keyId = keyId;
        this.action = action;
        this.reaction = reaction;
        this.description = description;
        this.setListeners();
    }

    getKeyId(){
        return this.idkeyId;
    }

    getAction(){
        return this.action;
    }

    getReaction(){
        return this.reaction;
    }

    getDescription(){
        return this.description;
    }

    setListeners(){

        if( Array.isArray(this.reaction) ){

            this.keyUp = this.reaction[1];
            this.keyDown = this.reaction[0];

        }else if( this.action == 'down' ){

            this.keyUp = ()=>{};
            this.keyDown = this.reaction;

        }else{
            this.keyUp = this.reaction;
            this.keyDown = ()=>{};

        }
    }

}




let seeker  = function(){
    let sk = this;
    sk.videoLength = 100;
    sk.seconds = 0;
    sk.width = 400;
    let seeker = document.getElementById("seeker");
    seekerWidth = seeker.width;

    sk.linearScale = d3.scaleLinear()
                      .domain([0, sk.videoLength])
                      .range([0,seekerWidth]);

    sk.svgContainer = d3.select("#seeker").append("svg")
                      .attr("width", "100%")
                      .attr("height", 50)
                      .attr("style", "background-color: #999;");


    sk.rectangle = svgContainer.append("rect")
                    .attr("x", 0)
                    .attr("y", 0)
                    .attr("width", linearScale(sk.seconds))
                    .attr("height", 50)
                    .attr("style", "fill: black;");


    sk.svg = d3.select("svg"),
          width = +svg.attr("width"),
          height = +svg.attr("height"),
          g = svg.append("g");

    sk.update = function() {

          rectangle.attr( "width", linearScale( sk.seconds ) );

          if ( sk.refresh ) {

              window.requestAnimationFrame(sk.update);

          }

    }

    sk.startRefresh = function(){

        sk.refresh = true;
        update();
    }

    sk.stopRefresh  = function () {

        sk.refresh = false;

    }

    window.requestAnimationFrame( sk.update );
    return sk;
}



let playerManager = function( video ){
    logger.debug("droomPlayer", 'Starting up...');

    let pm = this;
    pm.player = video;

    pm.setPlayer = function ( player ) {

        pm.player = player;
    };

    pm.initSeeker =function () {

        pm.seekerVideo = seeker();
        pm.seekerVideo.videoLength = pm.player.duration;

    }

    pm.play = ()=>{

        pm.seekerVideo.startRefresh();
        logger.debug("PlayerManager", "old current time", pm.seekerVideo.seconds);
        pm.seekerVideo.seconds = pm.player.currentTime;
        logger.debug("PlayerManager", "new current time", pm.seekerVideo.seconds);

        return pm.player.play();

    };

    pm.pause = ()=>{

        pm.seekerVideo.stopRefresh();
        return pm.player.pause();
    };

    pm.toggle = ()=>{

        if( pm.isPlaying() ){
            pm.pause();
        }else{
            pm.play();
        }

    };

    pm.isPlaying = ()=>{

        return !pm.player.paused;

    };

    pm.shortKeys = [
        new ShortKey( 32, '[space]', 'playOnPress' , 'hold', [pm.play, pm.pause] ),
        new ShortKey( 80, 'p', 'playToggle'  , 'down', pm.toggle )
    ];

    pm.mappedShortKeys = {};

    pm.prepareMappedKeysObject = ()=>{
        pm.shortKeys.map(function( element ){

            let id =  element.keyId;
            pm.mappedShortKeys[id] = element;

        });
    }


    pm.setListeners = ()=>{

        pm.prepareMappedKeysObject();

        window.onkeydown = (e)=>{

            let key = e.keyCode ? e.keyCode : e.which;
            e.preventDefault();
            //logger.debug("Listeners", 'Received on key down: ', e.keyCode);
            let shortKey = pm.mappedShortKeys[key];
            if( typeof(shortKey) !== 'undefined'){

                shortKey.keyDown();

            }
        }

        window.onkeyup = (e)=>{

            let key = e.keyCode ? e.keyCode : e.which;
            e.preventDefault();
            //logger.debug("Listeners", 'Received on key up: ', e.keyCode);
            let shortKey = pm.mappedShortKeys[key];
            if( typeof(shortKey) !== 'undefined'){

                shortKey.keyUp();
            }
        }

    }
    pm.setListeners();
    pm.initSeeker();


    return pm;
}
