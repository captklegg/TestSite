var controls = ["play", "progress", "duration", "mute", "volume", "download"];

const player = Plyr.setup(".js-player", { controls });

// Expose
window.player = player;

    for (var i in player) {
     player[i].on('play', function (instance) {
       var source = instance.detail.plyr.source;
       for (var x in player) {
         if (player[x].source != source) {
          player[x].pause();
         }
       }
     });
    }