jQuery(function ($) {
    'use strict'
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        // initialize plyr
        var player = new Plyr('#audio1', {
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
            mediaPath = 'https://traffic.libsyn.com/underwoodandflinch/',
            extension = '',
            tracks = [{
                "track": 1,
                "name": "Underwood & Flinch - Episode 1",
                "duration": "1:06:05",
                "file": "PB-Underwood-01"
            }, {
                "track": 2,
                "name": "Underwood & Flinch - Episode 2",
                "duration": "26:57",
                "file": "PB-Underwood-02"
            }, {
                "track": 3,
                "name": "Underwood & Flinch - Episode 3",
                "duration": "26:30",
                "file": "PB-Underwood-03"
            }, {
                "track": 4,
                "name": "Underwood & Flinch - Episode 4",
                "duration": "28:26",
                "file": "PB-Underwood-04"
            }, {
                "track": 5,
                "name": "Underwood & Flinch - Episode 5",
                "duration": "23:59",
                "file": "PB-Underwood-05"
            }, {
                "track": 6,
                "name": "Underwood & Flinch - Episode 6",
                "duration": "45:00",
                "file": "PB-Underwood-06"
            }, {
                "track": 7,
                "name": "Underwood & Flinch - Episode 7",
                "duration": "29:14",
                "file": "PB-Underwood-07"
            }, {
                "track": 8,
                "name": "Underwood & Flinch - Episode 8",
                "duration": "42:34",
                "file": "PB-Underwood-08"
            }, {
                "track": 9,
                "name": "Underwood & Flinch - Episode 9",
                "duration": "34:58",
                "file": "PB-Underwood-09"
            }, {
                "track": 10,
                "name": "Underwood & Flinch - Episode 10",
                "duration": "28:31",
                "file": "PB-Underwood-10"
            }, {
                "track": 11,
                "name": "Underwood & Flinch - Episode 11",
                "duration": "35:39",
                "file": "PB-Underwood-11"
            }, {
                "track": 12,
                "name": "Underwood & Flinch - Episode 12",
                "duration": "31:17",
                "file": "PB-Underwood-12"
            }, {
                "track": 13,
                "name": "Underwood & Flinch - Episode 13",
                "duration": "54:32",
                "file": "PB-Underwood-13"
            }, {
                "track": 14,
                "name": "Underwood & Flinch - Episode 14",
                "duration": "8:12",
                "file": "PB-Underwood-14"
            }, {
                "track": 15,
                "name": "Underwood & Flinch - Episode 15",
                "duration": "54:49",
                "file": "PB-Underwood-15"
            }, {
                "track": 16,
                "name": "Underwood & Flinch - Episode 16",
                "duration": "48:48",
                "file": "PB-Underwood-16"
            }, {
                "track": 17,
                "name": "Underwood & Flinch - Episode 17",
                "duration": "33:14",
                "file": "PB-Underwood-17"
            }, {
                "track": 18,
                "name": "Underwood & Flinch - Episode 18",
                "duration": "38:10",
                "file": "PB-Underwood-18"
            }, {
                "track": 19,
                "name": "Underwood & Flinch - Episode 19",
                "duration": "28:04",
                "file": "PB-Underwood-19"
            }, {
                "track": 20,
                "name": "Underwood & Flinch - Episode 20",
                "duration": "30:59",
                "file": "PB-Underwood-20"
            }, {
                "track": 21,
                "name": "Underwood & Flinch - Episode 21",
                "duration": "57:44",
                "file": "PB-Underwood-21"
            }, {
                "track": 22,
                "name": "Underwood & Flinch - Episode 22",
                "duration": "55:23",
                "file": "PB-Underwood-22"
            }, {
                "track": 23,
                "name": "Underwood & Flinch - Episode 23",
                "duration": "29:06",
                "file": "PB-Underwood-23"
            }, {
                "track": 24,
                "name": "Underwood & Flinch - Episode 24",
                "duration": "42:29",
                "file": "PB-Underwood-24"
            }, {
                "track": 25,
                "name": "Underwood & Flinch - Episode 25",
                "duration": "47:59",
                "file": "PB-Underwood-25"
            }, {
                "track": 26,
                "name": "Underwood & Flinch - Episode 26",
                "duration": "48:23",
                "file": "PB-Underwood-26"
            }, {
                "track": 27,
                "name": "Underwood & Flinch - Episode 27",
                "duration": "41:06",
                "file": "PB-Underwood-27"
            }, {
                "track": 28,
                "name": "Underwood & Flinch - Episode 28",
                "duration": "1:01:50",
                "file": "PB-Underwood-28"
            }, {
                "track": 29,
                "name": "Underwood & Flinch - Episode 29",
                "duration": "37:10",
                "file": "PB-Underwood-29"
            }, {
                "track": 30,
                "name": "Underwood & Flinch - Episode 30",
                "duration": "41:14",
                "file": "PB-Underwood-30"
            }, {
                "track": 31,
                "name": "Underwood & Flinch - Episode 31",
                "duration": "1:01:42",
                "file": "PB-Underwood-31"
            }, {
                "track": 32,
                "name": "Underwood & Flinch - Episode 32",
                "duration": "29:31",
                "file": "PB-Underwood-32"
            }, {
                "track": 33,
                "name": "Underwood & Flinch - Episode 33",
                "duration": "55:03",
                "file": "PB-Underwood-33"
            }, {
                "track": 34,
                "name": "Underwood & Flinch - Episode 34",
                "duration": "55:03",
                "file": "SPB-Underwood-34"
            }, {
                "track": 35,
                "name": "Underwood & Flinch - Episode 35",
                "duration": "45:58",
                "file": "PB-Underwood-35"
            }, {
                "track": 36,
                "name": "Underwood & Flinch - Episode 36",
                "duration": "34:29",
                "file": "PB-Underwood-36"
			}, {
                "track": 37,
                "name": "Underwood & Flinch - Episode 37",
                "duration": "45:37",
                "file": "PB-Underwood-37"
            }, {
                "track": 38,
                "name": "Underwood & Flinch - Episode 38",
                "duration": "1:02:53",
                "file": "PB-Underwood-38"
			}, {
                "track": 39,
                "name": "Underwood & Flinch - Episode 39",
                "duration": "37:28",
                "file": "PB-Underwood-39"
			}, {
                "track": 40,
                "name": "Underwood & Flinch - Episode 40",
                "duration": "27:26",
                "file": "PB-Underwood-40"
			}, {
                "track": 41,
                "name": "Underwood & Flinch - Episode 41",
                "duration": "35:21",
                "file": "PB-Underwood-41"
			}, {
                "track": 42,
                "name": "Underwood & Flinch - Episode 42",
                "duration": "45:14",
                "file": "PB-Underwood-42"
			}, {
                "track": 43,
                "name": "Underwood & Flinch - Episode 43",
                "duration": "39:53",
                "file": "PB-Underwood-43"
			}, {
                "track": 44,
                "name": "Underwood & Flinch - Episode 44",
                "duration": "56:10",
                "file": "PB-Underwood-44"
			}, {
                "track": 45,
                "name": "Underwood & Flinch - Episode 45",
                "duration": "1:17:10",
                "file": "PB-Underwood-45"			
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
            audio = $('#audio1').on('play', function () {
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
        var noSupport = $('#audio1').text();
        $('.container').append('<p class="no-support">' + noSupport + '</p>');
    }
});