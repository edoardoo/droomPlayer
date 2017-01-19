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

    // logger.debug('Seeker', ' video length:', sk.videoLength);
    // logger.debug('Seeker', ' seeker width:', sk.seekerWidth);

    sk.init = ()=> {

        sk.seeker = document.getElementById("seeker");
        sk.seekerWidth = sk.seeker.offsetWidth;
        sk.createSvg();
        sk.updateTimeToPixelScale();
        sk.updatePixelToTimeScale();
        sk.createSeekerRectangle();
        sk.setSeekerListeners();
    }

    sk.createSvg = ()=> {

        sk.svgContainer = d3.select("#seeker").append("svg")
        .attr("width", "100%")
        .attr("height", 50)
        .attr("style", "background-color: #999;");

        sk.svg = d3.select("svg"),
        width = +svg.attr("width"),
        height = +svg.attr("height"),
        g = svg.append("g");

    }

    sk.createSeekerRectangle = ()=> {

        sk.rectangle = svgContainer.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", sk.timeToPixelScale(sk.seconds))
        .attr("height", 50)
        .attr("style", "fill: black;");

    }

    sk.updateLength = ( length )=> {

        sk.videoLength = length;
        sk.updateTimeToPixelScale();
        sk.updatePixelToTimeScale();

    }

    sk.updateTimeToPixelScale = ()=> {
        sk.timeToPixelScale = d3.scaleLinear()
        .domain([0, sk.videoLength])
        .range([0, sk.seekerWidth]);
    }

    sk.updatePixelToTimeScale = ()=> {
        sk.pixelToTimeScale = d3.scaleLinear()
        .domain([0, sk.seekerWidth])
        .range([0, sk.videoLength]);
    }

    sk.update = ()=> {

        sk.rectangle.attr( "width", sk.timeToPixelScale( sk.player.getCurrentTime() ) );

        if ( sk.refresh ) {

            window.requestAnimationFrame(sk.update);

        }

    }

    sk.startRefresh = ()=>{

        logger.debug('Seeker', ' started refreshing seeker. ');
        sk.refresh = true;
        window.requestAnimationFrame(sk.update);
    }

    sk.stopRefresh  = ()=> {

        logger.debug('Seeker', ' stopped refreshing seeker. ');
        sk.refresh = false;

    }

    sk.seekTo = (e)=>{

        let timeInPixels = e.pageX - sk.seeker.offsetLeft;
        sk.player.setCurrentTime( sk.pixelToTimeScale( timeInPixels ) );

    }

    sk.setSeekerListeners = ()=>{
        sk.seeker.addEventListener("mousedown", sk.seekTo);
        sk.seeker.addEventListener("mouseup", function(){

        });
    }

    sk.init();

    return sk;
}



let playerManager = function( video ){
    logger.debug("droomPlayer", 'Starting up...');

    let pm = this;
    pm.player = video;
    pm.mappedShortKeys = {};

    pm.init = ()=>{

        pm.initSeeker();
        pm.setListeners();

    }

    pm.initSeeker = ()=> {

        pm.seekerVideo = seeker();
        pm.seekerVideo.player = pm.player;
        pm.seekerVideo.updateLength( pm.player.duration );
        pm.player.addEventListener("timeupdate", function(){
            if( ! pm.isPlaying() ){
                pm.seekerVideo.update();
            }
        });

    }

    pm.player.setCurrentTime = ( time )=>{
        pm.player.currentTime = time;
    }

    pm.player.getCurrentTime = ( )=>{
        return pm.player.currentTime;
    }

    pm.loadVideo = ( url )=>{

        pm.player.src = url;
        pm.seekerVideo.updateLength( pm.player.duration );

    }

    pm.play = ()=>{

        if ( !pm.isPlaying() ) {

            pm.seekerVideo.startRefresh();
            return pm.player.play();

        }

    };

    pm.pause = ()=>{
        if ( pm.isPlaying() ) {
            pm.seekerVideo.stopRefresh();
            return pm.player.pause();
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

        return !pm.player.paused;

    };

    pm.seekToTime = ( time, isRelative )=>{

        var newVideoTime = ( isRelative ) ? pm.player.currentTime + time : time;
        newVideoTime = ( newVideoTime < 0 ) ? 0 : ( newVideoTime > pm.player.duration) ? pm.player.duration : newVideoTime;
        pm.player.currentTime = newVideoTime;


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

            let key = e.keyCode ? e.keyCode : e.which;
            e.preventDefault();
            logger.debug("Listeners", 'Received on key down: '+ e.keyCode);
            let shortKey = pm.mappedShortKeys[key];
            if( typeof(shortKey) !== 'undefined'){

                shortKey.keyDown();

            }
        }

        window.onkeyup = (e)=>{

            let key = e.keyCode ? e.keyCode : e.which;
            e.preventDefault();
            logger.debug("Listeners", 'Received on key up: '+ e.keyCode);
            let shortKey = pm.mappedShortKeys[key];
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
