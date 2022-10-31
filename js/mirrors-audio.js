jQuery(function ($) {
    'use strict'
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        // initialize plyr
        var player = new Plyr('#audio20', {
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
            mediaPath = 'https://traffic.libsyn.com/secure/homtsc/',
            extension = '',
            tracks = [{
                "track": 1,
                "name": "Hall of Mirrors - Salvation",
                "duration": "01:17:26",
                "file": "PB-HoM-01"
            }, {
                "track": 2,
                "name": "Hall of Mirrors - Trolls",
                "duration": "56:45",
                "file": "PB-HoM-02"
            }, {
                "track": 3,
                "name": "Hall of Mirrors - The Grave",
                "duration": "37:43",
                "file": "PB-HoM-03"
            }, {
                "track": 4,
                "name": "Hall of Mirrors - The Green Man",
                "duration": "37:16",
                "file": "PB-HoM-04"
            }, {
                "track": 5,
                "name": "Hall of Mirrors - Wet Velvet",
                "duration": "24:28",
                "file": "PB-HoM-05"
            }, {
                "track": 6,
                "name": "Hall of Mirrors - A Lovely Pair of Browns",
                "duration": "31:04",
                "file": "PB-HoM-06"
            }, {
                "track": 7,
                "name": "Hall of Mirrors - Hair and Skin - Part One",
                "duration": "68:46",
                "file": "PB-HoM-07"
            }, {
                "track": 8,
                "name": "Hall of Mirrors - Hair and Skin - Part Two",
                "duration": "59:48",
                "file": "PB-HoM-08"  
			}, {
                "track": 9,
                "name": "Hall of Mirrors - Dessert",
                "duration": "13:21",
                "file": "PB-HoM-09"
			}, {
                "track": 10,
                "name": "Hall of Mirrors - Poacher's Cottage",
                "duration": "67:35",
                "file": "PB-HoM-10"
			}, {
                "track": 11,
                "name": "Hall of Mirrors - Give Me a Hundred",
                "duration": "16:51",
                "file": "PB-HoM-11"
			}, {
                "track": 12,
                "name": "Hall of Mirrors - The Exterminators",
                "duration": "24:24",
                "file": "PB-HoM-12"
			}, {
                "track": 13,
                "name": "Hall of Mirrors - The Haslet Technique",
                "duration": "30:54",
                "file": "PB-HoM-13"
			}, {
                "track": 14,
                "name": "Hall of Mirrors - Night Crossing",
                "duration": "30:18",
                "file": "PB-HoM-14"				
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
            audio = $('#audio20').on('play', function () {
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
        var noSupport = $('#audio20').text();
        $('.container').append('<p class="no-support">' + noSupport + '</p>');
    }
});