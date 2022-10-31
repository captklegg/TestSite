jQuery(function ($) {
    'use strict'
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        // initialize plyr
        var player = new Plyr('#audio40', {
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
            mediaPath = 'https://traffic.libsyn.com/secure/draculanovel/',
            extension = '',
            tracks = [{
                "track": 1,
                "name": "Dracula - Episode 1",
                "duration": "37:28",
                "file": "Dracula_01"
            }, {
                "track": 2,
                "name": "Dracula - Episode 2",
                "duration": "40:01",
                "file": "Dracula_02"
            }, {
                "track": 3,
                "name": "Dracula - Episode 3",
                "duration": "38:33",
                "file": "Dracula_03"
            }, {
                "track": 4,
                "name": "Dracula - Episode 4",
                "duration": "39:17",
                "file": "Dracula_04"
            }, {
                "track": 5,
                "name": "Dracula - Episode 5",
                "duration": "23:10",
                "file": "Dracula_05"
            }, {
                "track": 6,
                "name": "Dracula - Episode 6",
                "duration": "37:35",
                "file": "Dracula_06"
            }, {
                "track": 7,
                "name": "Dracula - Episode 7",
                "duration": "38:26",
                "file": "Dracula_07"
            }, {
                "track": 8,
                "name": "Dracula - Episode 8",
                "duration": "21:03",
                "file": "Dracula_08"
            }, {
                "track": 9,
                "name": "Dracula - Episode 9",
                "duration": "37:57",
                "file": "Dracula_09"
            }, {
                "track": 10,
                "name": "Dracula - Episode 10",
                "duration": "38:3",
                "file": "Dracula_10"
            }, {
                "track": 11,
                "name": "Dracula - Episode 11",
                "duration": "32:01",
                "file": "Dracula_11"
            }, {
                "track": 12,
                "name": "Dracula - Episode 12",
                "duration": "47:10",
                "file": "Dracula_12"
            }, {
                "track": 13,
                "name": "Dracula - Episode 13",
                "duration": "44:36",
                "file": "Dracula_13"
            }, {
                "track": 14,
                "name": "Dracula - Episode 14",
                "duration": "44:13",
                "file": "Dracula_14"
            }, {
                "track": 15,
                "name": "Dracula - Episode 15",
                "duration": "40:39",
                "file": "Dracula_15"
            }, {
                "track": 16,
                "name": "Dracula - Episode 16",
                "duration": "35:58",
                "file": "Dracula_16"
            }, {
                "track": 17,
                "name": "Dracula - Episode 17",
                "duration": "36:13",
                "file": "Dracula_17"
            }, {
                "track": 18,
                "name": "Dracula - Episode 18",
                "duration": "46:23",
                "file": "Dracula_18"
            }, {
                "track": 19,
                "name": "Dracula - Episode 19",
                "duration": "37:10",
                "file": "Dracula_19"
			}, {
                "track": 20,
                "name": "Dracula - Episode 20",
                "duration": "37:13",
                "file": "Dracula_20"
            },],
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
            audio = $('#audio40').on('play', function () {
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
        var noSupport = $('#audio40').text();
        $('.container').append('<p class="no-support">' + noSupport + '</p>');
    }
});