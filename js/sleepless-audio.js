jQuery(function ($) {
    'use strict'
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        // initialize plyr
        var player = new Plyr('#audio10', {
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
            mediaPath = 'http://traffic.libsyn.com/sleepless/',
            extension = '',
            tracks = [{
                "track": 1,
                "name": "One Among the Sleepless - Episode 1",
                "duration": "1:06:05",
                "file": "PB-Sleepless-01"
            }, {
                "track": 2,
                "name": "One Among the Sleepless - Episode 2",
                "duration": "26:57",
                "file": "PB-Sleepless-02"
            }, {
                "track": 3,
                "name": "One Among the Sleepless - Episode 3",
                "duration": "26:30",
                "file": "PB-Sleepless-03"
            }, {
                "track": 4,
                "name": "One Among the Sleepless - Episode 4",
                "duration": "28:26",
                "file": "PB-Sleepless-04"
            }, {
                "track": 5,
                "name": "One Among the Sleepless - Episode 5",
                "duration": "23:59",
                "file": "PB-Sleepless-05"
            }, {
                "track": 6,
                "name": "One Among the Sleepless - Episode 6",
                "duration": "45:00",
                "file": "PB-Sleepless-06"
            }, {
                "track": 7,
                "name": "One Among the Sleepless - Episode 7",
                "duration": "29:14",
                "file": "PB-Sleepless-07"
            }, {
                "track": 8,
                "name": "One Among the Sleepless - Episode 8",
                "duration": "42:34",
                "file": "PB-Sleepless-08"
            }, {
                "track": 9,
                "name": "One Among the Sleepless - Episode 9",
                "duration": "23:42",
                "file": "PB-Sleepless-09"
            }, {
                "track": 10,
                "name": "One Among the Sleepless - Episode 10",
                "duration": "31:21",
                "file": "PB-Sleepless-10"
            }, {
                "track": 11,
                "name": "One Among the Sleepless - Episode 11",
                "duration": "28:19",
                "file": "PB-Sleepless-11"
            }, {
                "track": 12,
                "name": "One Among the Sleepless - Episode 12",
                "duration": "25:50",
                "file": "PB-Sleepless-12"
            }, {
                "track": 13,
                "name": "One Among the Sleepless - Episode 13",
                "duration": "49:33",
                "file": "PB-Sleepless-13"
            }, {
                "track": 14,
                "name": "One Among the Sleepless - Episode 14",
                "duration": "22:29",
                "file": "PB-Sleepless-14"
            }, {
                "track": 15,
                "name": "One Among the Sleepless - Episode 15",
                "duration": "27:52",
                "file": "PB-Sleepless-15"
            }, {
                "track": 16,
                "name": "One Among the Sleepless - Episode 16",
                "duration": "31:59",
                "file": "PB-Sleepless-16"
            }, {
                "track": 17,
                "name": "One Among the Sleepless - Episode 17",
                "duration": "42:31",
                "file": "PB-Sleepless-17"
            }, {
                "track": 18,
                "name": "One Among the Sleepless - Episode 18",
                "duration": "41:19",
                "file": "PB-Sleepless-18"
            }, {
                "track": 19,
                "name": "One Among the Sleepless - Episode 19",
                "duration": "45:32",
                "file": "PB-Sleepless-19"
            }, {
                "track": 20,
                "name": "One Among the Sleepless - Episode 20",
                "duration": "31:58",
                "file": "PB-Sleepless-20"
            }, {
                "track": 21,
                "name": "One Among the Sleepless - Episode 21",
                "duration": "47:07",
                "file": "PB-Sleepless-21"
            }, {
                "track": 22,
                "name": "One Among the Sleepless - Episode 22",
                "duration": "35:41",
                "file": "PB-Sleepless-22"
            }, {
                "track": 23,
                "name": "One Among the Sleepless - Episode 23",
                "duration": "54:54",
                "file": "PB-Sleepless-23"
            }, {
                "track": 24,
                "name": "One Among the Sleepless - Episode 24",
                "duration": "47:08",
                "file": "PB-Sleepless-24"
            }, {
                "track": 25,
                "name": "One Among the Sleepless - Episode 25",
                "duration": "37:03",
                "file": "PB-Sleepless-25"
            }, {
                "track": 26,
                "name": "One Among the Sleepless - Episode 26",
                "duration": "47:38",
                "file": "PB-Sleepless-26"
            }, {
                "track": 27,
                "name": "One Among the Sleepless - Episode 27",
                "duration": "22:51",
                "file": "PB-Sleepless-27"
            }, {
                "track": 28,
                "name": "One Among the Sleepless - Episode 28",
                "duration": "46:45",
                "file": "PB-Sleepless-28"
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
            audio = $('#audio10').on('play', function () {
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
        var noSupport = $('#audio10').text();
        $('.container').append('<p class="no-support">' + noSupport + '</p>');
    }
});