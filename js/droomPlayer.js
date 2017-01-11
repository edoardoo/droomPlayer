let video = document.getElementById('videoPlayer');

class ShortKey {

    constructor( keyId, keyPressed, description, action, reaction){
        this.keyId = keyId;
        this.action = action;
        this.reaction = reaction;
        this.description = description;
        this.setListeners();
        this.sk = this;
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

let playerManager = function( video ){
    let pm = this;
    pm.player = video;

    pm.setPlayer = function ( player ) {

        pm.player = player;

    };

    pm.play = ()=>{

        return pm.player.play();
    };

    pm.pause = ()=>{

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
            var id =  element.keyId;

            pm.mappedShortKeys[id] = element;
        });
    }

    pm.setListeners = ()=>{

        pm.prepareMappedKeysObject();

        window.onkeydown = (e)=>{

            let key = e.keyCode ? e.keyCode : e.which;
            console.log("down "+key);
            let shortKey = pm.mappedShortKeys[key];
            if( typeof(shortKey) !== 'undefined'){

                shortKey.keyDown();

            }
        }

        window.onkeyup = (e)=>{

            let key = e.keyCode ? e.keyCode : e.which;
            console.log(e);
            let shortKey = pm.mappedShortKeys[key];
            if( typeof(shortKey) !== 'undefined'){

                shortKey.keyUp();
            }
        }

    }
    pm.setListeners();


    return pm;
}

video = playerManager( video );
