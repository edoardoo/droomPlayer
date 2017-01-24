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

            this.keyUp = this.reaction[1].bind(this);
            this.keyDown = this.reaction[0].bind(this);

        }else if( this.action == 'down' ){

            this.keyUp = ()=>{};
            this.keyDown = this.reaction;

        }else{
            this.keyUp = this.reaction;
            this.keyDown = ()=>{};

        }
    }

}
