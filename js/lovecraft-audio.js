jQuery(function ($) {
    'use strict'
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        // initialize plyr
        var player = new Plyr('#audio50', {
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
            mediaPath = 'https://traffic.libsyn.com/secure/thevaultoflovecraft/',
            extension = '',
            tracks = [{
                "track": 1,
                "name": "Vault of Lovecraft - The Outsider",
                "duration": "22:53",
                "file": "PB-Lovecraft-01"
            }, {
                "track": 2,
                "name": "Vault of Lovecraft - The Terrible Old Man",
                "duration": "10:05",
                "file": "TPB-Lovecraft-02"
            }, {
                "track": 3,
                "name": "Vault of Lovecraft - Beyond the Wall of Sleep",
                "duration": "34:08",
                "file": "PB-Lovecraft-03"
            }, {
                "track": 4,
                "name": "Vault of Lovecraft - The Colour out of Space",
                "duration": "01:28:11",
                "file": "PB-Lovecraft-04"
            }, {
                "track": 5,
                "name": "Vault of Lovecraft - Pickman's Model",
                "duration": "38:47",
                "file": "PB-Lovecraft-05"
            }, {
                "track": 6,
                "name": "Vault of Lovecraft - Cool Air",
                "duration": "26:41",
                "file": "PB-Lovecraft-06"
            }, {
                "track": 7,
                "name": "Vault of Lovecraft - The Shadow over Innsmouth",
                "duration": "03:02:09",
                "file": "PB-Lovecraft-07"
            }, {
                "track": 8,
                "name": "Vault of Lovecraft - The Thing on the Doorstep",
                "duration": "01:20:05",
                "file": "PB-Lovecraft-08"
            }, {
                "track": 9,
                "name": "Vault of Lovecraft - From Beyond",
                "duration": "22:13",
                "file": "PB-Lovecraft-09"
            }, {
                "track": 10,
                "name": "Vault of Lovecraft - The Statement of Randolph Carter",
                "duration": "18:52",
                "file": "PB-Lovecraft-10"
            }, {
                "track": 11,
                "name": "Vault of Lovecraft - The Moon Bog",
                "duration": "27:01",
                "file": "PB-Lovecraft-11"
            }, {
                "track": 12,
                "name": "Vault of Lovecraft - Azathoth",
                "duration": "04:38",
                "file": "PB-Lovecraft-12"
            }, {
                "track": 13,
                "name": "Vault of Lovecraft - Dagon",
                "duration": "18:22",
                "file": "PB-Lovecraft-13"
            }, {
                "track": 14,
                "name": "Vault of Lovecraft - The Cats of Ulthar",
                "duration": "12:01",
                "file": "PB-Lovecraft-14"
            }, {
                "track": 15,
                "name": "Vault of Lovecraft - Herbert West: Reanimator",
                "duration": "01:32:26",
                "file": "PB-Lovecraft-15"
            }, {
                "track": 16,
                "name": "Vault of Lovecraft - The Music of Erich Zann",
                "duration": "26:43",
                "file": "PB-Lovecraft-16"
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
            audio = $('#audio50').on('play', function () {
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
        var noSupport = $('#audio50').text();
        $('.container').append('<p class="no-support">' + noSupport + '</p>');
    }
});