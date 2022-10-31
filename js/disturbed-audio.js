jQuery(function ($) {
    'use strict'
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        // initialize plyr
        var player = new Plyr('#audio60', {
            controls: [
                'restart',
                'play',
                'progress',
                'current-time',
                'duration',
                'mute',
                'volume',
                'download'
            ]
        });
        // initialize playlist and controls
        var index = 0,
            playing = false,
            mediaPath = 'https://traffic.libsyn.com/secure/bloodandsmoke/',
            extension = '',
            tracks = [{
                "track": 1,
                "name": "Blood and Smoke - Episode 1",
                "duration": "34:06",
                "file": "PB-UFBS-01"
            }, {
                "track": 2,
                "name": "Blood and Smoke - Episode 2",
                "duration": "31:01",
                "file": "PB-UFBS-02"
            }, {
                "track": 3,
                "name": "Blood and Smoke - Episode 3",
                "duration": "29:42",
                "file": "PB-UFBS-03"
            }, {
                "track": 4,
                "name": "Blood and Smoke - Episode 4",
                "duration": "46:47",
                "file": "PB-UFBS-04"
            }, {
                "track": 5,
                "name": "Blood and Smoke - Episode 5",
                "duration": "48:22",
                "file": "PB-UFBS-05"
            }, {
                "track": 6,
                "name": "Blood and Smoke - Episode 6",
                "duration": "33:17",
                "file": "PB-UFBS-06"
            }, {
                "track": 7,
                "name": "Blood and Smoke - Episode 7",
                "duration": "26:14",
                "file": "PB-UFBS-07"
            }, {
                "track": 8,
                "name": "Blood and Smoke - Episode 8",
                "duration": "53:15",
                "file": "PB-UFBS-08"            
            }],
            buildPlaylist = $.each(tracks, function(key, value) {
                var trackNumber = value.track,
                    trackName = value.name,
                    trackDuration = value.duration;
                if (trackNumber.toString().length === 1) {
                    trackNumber = '0' + trackNumber;
                }
                $('#plList').append('<li> \
                    <div class="plItem"> \
                        <span class="plNum">' + trackNumber + '.</span> \
                        <span class="plTitle">' + trackName + '</span> \
                        <span class="plLength">' + trackDuration + '</span> \
                    </div> \
                </li>');
            }),
            trackCount = tracks.length,
            npAction = $('#npAction'),
            npTitle = $('#npTitle'),
            audio = $('#audio60').on('play', function () {
                playing = true;
                npAction.text('Now Playing...');
            }).on('pause', function () {
                playing = false;
                npAction.text('Paused...');
            }).on('ended', function () {
                npAction.text('Paused...');
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    audio.play();
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }).get(0),
            btnPrev = $('#btnPrev').on('click', function () {
                if ((index - 1) > -1) {
                    index--;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            btnNext = $('#btnNext').on('click', function () {
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            li = $('#plList li').on('click', function () {
                var id = parseInt($(this).index());
                if (id !== index) {
                    playTrack(id);
                }
            }),
            loadTrack = function (id) {
                $('.plSel').removeClass('plSel');
                $('#plList li:eq(' + id + ')').addClass('plSel');
                npTitle.text(tracks[id].name);
                index = id;
                audio.src = mediaPath + tracks[id].file + extension;
                updateDownload(id, audio.src);
            },
            updateDownload = function (id, source) {
                player.on('loadedmetadata', function () {
                    $('a[data-plyr="download"]').attr('href', source);
                });
            },
            playTrack = function (id) {
                loadTrack(id);
                audio.play();
            };
        extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
        loadTrack(index);
    } else {
        // no audio support
        $('.column').addClass('hidden');
        var noSupport = $('#audio60').text();
        $('.container').append('<p class="no-support">' + noSupport + '</p>');
    }
});