
describe("Player", function() {
    var player;

    function prepareVideo(){
        var video = document.createElement('video');
        video.src = 'videoExample/SampleVideo_1280x720_2mb.mp4';
        video.autoPlay = false;
        return video;
    }

    describe("when player has loaded", function() {

        beforeEach(function() {
            var video = prepareVideo();
            player = playerManager( video );
        });

        it("should be able to play a Video", function() {
            player.play();
            expect(player.isPlaying()).toEqual(true);
            player.pause();

            //demonstrates use of custom matcher
            // expect(player).toBePlaying(song);
        });

        it("should be able to pause a Video", function() {

            player.pause();
            expect(player.isPlaying()).toEqual(false);

        });

        it("should be able to toggle a Video", function() {
            player.pause();
            player.toggle();
            expect( player.isPlaying() ).toEqual(true);

            player.toggle();
            expect( player.isPlaying() ).toEqual(false);

        });

        player.shortKeys.each( function (shortKey) {
            it("should be able to " + shortkey.getDescription(), function(){

            })
        });

        function generateKeyEvent(shortKey){
            let keyboardEvent = document.createEvent("KeyboardEvent");
            let initMethod = typeof keyboardEvent.initKeyboardEvent !== 'undefined' ? "initKeyboardEvent" : "initKeyEvent";

            let keyActions = {
                "down": "keydown",
                "up": "keyup"
            };

            keyboardEvent[initMethod](
                               "keydown", // event type : keydown, keyup, keypress
                                true, // bubbles
                                true, // cancelable
                                window, // viewArg: should be window
                                false, // ctrlKeyArg
                                false, // altKeyArg
                                false, // shiftKeyArg
                                false, // metaKeyArg
                                shortKey.getKeyId(), // keyCodeArg : unsigned long the virtual key code, else 0
                                0 // charCodeArgs : unsigned long the Unicode character associated with the depressed key, else 0
            );
            document.dispatchEvent(keyboardEvent);
        }
    });


    //
    // describe("when song has been paused", function() {
    //   beforeEach(function() {
    //     player.play(song);
    //     player.pause();
    //   });
    //
    //   it("should indicate that the song is currently paused", function() {
    //     expect(player.isPlaying).toBeFalsy();
    //
    //     // demonstrates use of 'not' with a custom matcher
    //     expect(player).not.toBePlaying(song);
    //   });
    //
    //   it("should be possible to resume", function() {
    //     player.resume();
    //     expect(player.isPlaying).toBeTruthy();
    //     expect(player.currentlyPlayingSong).toEqual(song);
    //   });
    // });
    //
    // // demonstrates use of spies to intercept and test method calls
    // it("tells the current song if the user has made it a favorite", function() {
    //   spyOn(song, 'persistFavoriteStatus');
    //
    //   player.play(song);
    //   player.makeFavorite();
    //
    //   expect(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
    // });
    //
    // //demonstrates use of expected exceptions
    // describe("#resume", function() {
    //   it("should throw an exception if song is already playing", function() {
    //     player.play(song);
    //
    //     expect(function() {
    //       player.resume();
    //     }).toThrowError("song is already playing");
    //   });
    // });
});
