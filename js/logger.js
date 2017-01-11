function instantiateLogger(){

    var log = this;
    log.active = true;
    log.addTime = false;
    log.cssError = 'color: #e74c3c;';
    log.coloursSections = {};
    log.index = 0;
    log.colours = [
        '#898CFF',
        '#FF89B5',
        '#FFDC89',
        '#90D4F7',
        '#72E096',
        '#F5A26F',
        '#668DE5',
        '#ED6D79',
        '#CFF381',
        '#68EEBD'];
    // log.cssBold = 'font-weight: bold'

    log.getColour = function( section ){
        var colour = null;
        if( typeof( log.coloursSections[section]) === 'undefined' ){
            colour = log.colours[ log.index ];
            log.increaseIndex();
            log.coloursSections[section] = {};
            log.coloursSections[section].colour = colour;
        }

        colour = log.coloursSections[section].colour;
        return colour;
    };

    log.increaseIndex = function(){
        if( log.index + 1 > log.colours.length -1){
            log.index = 0;
        }else{
            log.index++;
        }
    };

    log.debug = function( section, message, data ){
        if( log.active ){
            var time = '';
            var colour = log.getColour(section);
            if( log.addTime ){
                time = log.getTime();
            }
            console.log(
                time + '%c [' + section + '] %c' + message,
                'font-weight: bold; color:' + colour + ';' ,
                'color:' + colour + ';');
            if( typeof data !== 'undefined'){
                console.dir(data);
            }
        }
    };

    log.error = function( section, message , e){
        if( log.active ){

            console.log(  log.getTime()+ '%c Error in ' + section + ': ' + message, log.cssError );

            if( typeof e !== 'undefined'){
                console.dir(e);
            }
        }
    };

    log.getTime = function(){
        return new Date().getTime();
    };

    return {
        debug: log.debug,
        error: log.error
    };
}
var logger = instantiateLogger();
