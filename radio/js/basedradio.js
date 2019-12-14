/***************************************************************************
This is the BasedRadio Config
Fill this out and all your dreams will come true */

/*URL Prefix for the radio
       For example, if your site's URL is https://based.zone ,
       siteroot = "/radio" would setup basedradio at https://based.zone/radio */
var siteRoot = "/";
// Site Title
var siteTitle = "Viper Radio";
// Directory where the radio files reside at
var radioFiles = "https://based.zone/filehost/radiofiles";
// Opus Audio Source (Casted through Icecast or similar)
var opusStream = "https://radio.based.zone/files/viper.ogg";
// MP3 Audio Source (not as good as Opus)
var mp3Stream = "https://radio.based.zone/files/basedvgm.mp3";
// Link to BasedRadio API
var apiLink = "https://api.based.zone/viperstatus";

var backgrounds = [
    
],

/****************************************************************************/

function loadBackground() {
    $("body")[0].hasAttribute("lite") ?
        $(".player-settings-show").attr("disabled", "disabled") :
        $(".player-settings-show").on("click", function() {
            $("#window-settings").show();
        }),
        updateBackground(
            Cookies.get("background") ? Cookies.get("background") : "random"
        );
}

function nextBackground(e) {
    $.isNumeric(current_background) ?
        ((current_background = parseInt(current_background)),
            (current_background += e),
            current_background < 0 && (current_background = backgrounds.length - 1),
            current_background >= backgrounds.length && (current_background = 0)) :
        (current_background = 0),
        updateBackground(current_background);
}

function getRandomBackground() {
    return Math.floor(Math.random() * backgrounds.length);
}

function updateBackground(e) {
    var t = $("body");
    if (!t[0].hasAttribute("lite")) {
        if (
            (Cookies.set("background", e, { expires: 900 }),
                $.isNumeric(e) && $("#background-id").html("#" + (parseInt(e) + 1)),
                "solid" === e)
        )
            return (
                $("body").css("background-image", "none"),
                $("#background-id").html("Solid"),
                //$("#background-game").text("Windows 95"),
                //$("#background-system").text("Yes")
            );

        "random" === e &&
            ((e = getRandomBackground()),
                $("#background-id").html("#" + (parseInt(e) + 1) + " (random)")),
            (current_background = e),
            t.css(
                "background-image",
                //"url(" + siteRoot + "img/backs/" + backgrounds[e][0] + ")"
                "url(" + siteRoot + "img/backs/" + backgrounds[e] + ")"
            )//,
            //$("#background-game").text(backgrounds[e][1]),
            //$("#background-system").text(backgrounds[e][3]);
    }
}

// Shows waveforms of audio
function runVisual(e) {
    (canvasContext = e.getContext("2d")),
    (e.width = e.clientWidth),
    (e.height = e.clientHeight),
    (canvasWidth = e.width),
    (canvasHeight = e.height),
    constructVisual();
}

function stopVisual() {
    visualEnabled &&
        (Player.source.disconnect(),
            analyser.disconnect(),
            (canvasContext.fillStyle = backColor),
            canvasContext.fillRect(0, 0, canvasWidth, canvasHeight),
            (visualEnabled = !1));
}

function constructVisual() {
    visualEnabled ||
        ((analyser = Player.context.createAnalyser()),
            Player.source.connect(analyser),
            analyser.connect(Player.context.destination),
            (analyser.fftSize = 256)),
        calcFreqs(),
        (visualEnabled = !0),
        (frequencyData = new Uint8Array(analyser.frequencyBinCount)),
        analyser.getByteFrequencyData(frequencyData),
        visualize();
}

function calcFreqs() {
    for (
        var e = Player.context.sampleRate,
            t = e / (2 * analyser.frequencyBinCount),
            n = t; n + t < 16e3;

    )
        (n += t), bars++;
}

// Shows waveforms. No clue how this works.
function visualize() {
    if ((requestAnimationFrame(visualize), visualEnabled)) {
        (canvasContext.fillStyle = backColor),
        canvasContext.fillRect(0, 0, canvasWidth, canvasHeight),
            (frequencyData = new Uint8Array(analyser.frequencyBinCount)),
            analyser.getByteFrequencyData(frequencyData);
        for (var e = 0; e < bars; e++) {
            var t = Math.ceil((canvasHeight * frequencyData[e]) / 255),
                n = Math.ceil(canvasWidth / bars);
            (canvasContext.fillStyle = barsColor),
            canvasContext.fillRect(e * n, canvasHeight - t, n, t);
        }
    }
}

function disableSelection() {
    $(
            ".player-button, .text-field, .player-length, .actions, .header, .label, #about"
        )
        .attr("unselectable", "on")
        .css({
            "-moz-user-select": "none",
            "-o-user-select": "none",
            "-khtml-user-select": "none",
            "-webkit-user-select": "none",
            "-ms-user-select": "none",
            "user-select": "none"
        })
        .bind("selectstart", function() {
            return false;
        });
}

// I think this removes the current volume numbers
function clearSelection() {
    if (document.selection && document.selection.empty)
        document.selection.empty();
    else if (window.getSelection) {
        var e = window.getSelection();
        e.removeAllRanges();
    }
}

// Converts raw numerical time to something display-able
function formatTime(e) {
    return (
        (e = Number(e)),
        addZeros(Math.floor((e % 3600) / 60), 2) +
        ":" +
        addZeros(Math.floor((e % 3600) % 60), 2)
    );
}

// Adds zeroes in front of number (e) until e.len = t
function addZeros(e, t) {
    for (var n = e.toString(); n.length < t;) n = "0" + n;
    return n;
}

function $el(e) {
    return $(document.getElementById(e));
}

function onDisconnect() {
    $(".player-artist").html("API Error"),
        $(".player-title").html("Cannot connect to api");
}

function onStatus(e) {
    Player.updateStatus(e);
}

// Adds functionality to some buttons
function registerEvents() {
    $("#button-maximize").on("click", function() {
            $("#player-form").show(), $("#window-minimized").hide();
        }),
        $("#button-minimize").on("click", function() {
            $("#player-form").hide(), $("#window-minimized").show();
        }),
        $("#info-toggle").on("click", function() {
            ($m = $("#more-info")),
            ($l = $("#less-info")),
            ($t = $("#info-toggle")),
            $m.is(":visible") ?
                $m.hide() && $l.show() && $t.text("More Info") :
                $m.show() && $l.hide() && $t.text("Less Info");
        });
    window_about.registerEvents(),
        window_updates.registerEvents(),
        window_settings.registerEvents();
}

function showWindow(e) {
    setDraggable(e.find(".window")),
        e.on("dblclick", ".header", function() {
            var e = $(this).closest(".window");
            $(e).css("top", ""), $(e).css("left", "");
        }),
        e.on("mousedown", ".header", function() {
            pullWindow(e);
        }),
        e.on("click", function() {
            pullWindow(e);
        }),
        pullWindow(e);
    var t = e.find(".window");
    $(t).css("top", ""), $(t).css("left", ""), e.show();
}

function setDraggable(e) {
    e.draggable({
        handle: ".header-draggable",
        snap: ".flex-wrap",
        snapMode: "inner"
    });
}

function pullWindow(e) {
    z++, e.find(".window").css("z-index", z);
}
var Client = {
        onStatus: {},
        onFail: {},
        url: apiLink,
        interval: 10,
        timeout: {},
        init: function() {
            this.doRequest();
        },
        doRequest: function() {
            var e = this;
            clearTimeout(e.timeout),
                (e.timeout = {}),
                $.getJSON(this.url)
                .done(this.onStatus)
                .fail(this.onFail)
                .always(function() {
                    e.timeout = setTimeout(function() {
                        e.doRequest();
                    }, 1e3 * e.interval);
                });
        }
    },
    current_background = 0,
    canvasContext = {},
    canvasWidth = 0,
    canvasHeight = 0,
    analyser = {},
    frequencyData,
    bars = 0,
    barsColor = "#AAAAAA",
    backColor = "#C0C0C0",
    visualEnabled = false,
    $player_play = $("#player-play"),
    $player_volume_range = $("#player-volume-range")[0],
    $player_like = $("#player-like"),
    $player_dislike = $("#player-dislike"),
    $player_title = $("#player-title"),
    $player_artist = $("#player-artist"),
    $player_time = $("#player-time"),
    $player_artwork = $("#player-artwork-1, #player-artwork-2"),
    $player_listeners = $("#listeners"),
    $song_dl_link = $("#song-dl-link"),
    $update_list = $("#update-list-text"),
    $todo_list = $("#todo-list-text"),
    $title = $("title"),
    $num_songs = $("#num-songs"),
    // More info
    $more_title = $("#more-player-title"),
    $more_game = $("#more-player-game"),
    $more_year = $("#more-player-year"),
    $more_system = $("#more-player-system"),
    $more_composer = $("#more-player-composer"),
    $audio_element = document.getElementById("audio-element"),
    // Info about the currently playing song
    song = {
        state: "paused",
        maintenance: false,
        title: "",
        game: "",
        position: 0,
        length: 0,
        artwork: "",
        link: "",
        rate: 0
    },
    more = {
        title: "",
        game: "",
        year: "",
        system: "",
        composer: ""
    };
// Holds updates fetched from the api
(update_page = {
    update_list: "",
    todo_list: "",
    new_songs: "" //to be implemented
}),
(about_page = {
    number_of_songs: ""
}),
// Info about the player
(Player = {
    volume: 100,
    tickTimeout: 0,
    context: false,
    source: false,
    analyser: false,
    init: function() {
        Cookies.get("volume") && (this.volume = Cookies.get("volume")),
            noUiSlider.create($player_volume_range, {
                start: [this.volume],
                range: {
                    min: [0],
                    max: [100]
                }
            }),
            (this.context = new(window.AudioContext ||
                window.webkitAudioContext)()),
            (this.source = this.context.createMediaElementSource($audio_element)),
            this.handleEvents();
    },

    handleEvents: function() {
        var e = this;
        $player_play.click(function() {
                e.play();
            }),
            $player_volume_range.noUiSlider.on("slide", function() {
                e.updateVolume();
            }),
            $audio_element.addEventListener(
                "canplay",
                function() {
                    e.audioReady();
                },
                false
            );
    },

    constructAudio: function() {
        var e = this;
        this.context.resume().then(function() {
            ($audio_element.type = "audio/mpeg"),
            ($audio_element.src = mp3Stream), !(!$audio_element.canPlayType ||
                !$audio_element
                .canPlayType('audio/ogg; codecs="vorbis"')
                .replace(/no/, "")
            ) &&
            (($audio_element.type = 'audio/ogg; codecs="opus"'),
                ($audio_element.src = opusStream)),
            $audio_element.load(),
                ($audio_element.volume = e.volume / 100);
        });
    },

    play: function() {
        switch (song.state) {
            case "playing":
                (song.state = "paused"),
                $audio_element.pause(),
                    ($audio_element.currentTime = 0),
                    stopVisual(),
                    clearTimeout(this.restartTimer),
                    $player_play.removeAttr("disabled"),
                    $player_play.html("Play"),
                    $title.text(siteTitle);
                break;
            case "paused":
                (song.state = "loading"),
                $player_play.html("loading..."),
                    this.constructAudio();
        }
    },
    audioReady: function() {
        "loading" === song.state &&
            ((song.state = "playing"),
                $audio_element.play(),
                runVisual(document.getElementById("canvas")),
                $player_play.html("Stop"),
                $title.text(song.game + " — " + song.title),
                console.log($("#audio-element")));
    },

    restartTimer: false,
    restartOnError: function() {},
    updateVolume: function() {
        (this.volume = ~~$player_volume_range.noUiSlider.get()),
        $audio_element && ($audio_element.volume = this.volume / 100),
            this.showTempMessage("Volume: " + this.volume + "%"),
            Cookies.set("volume", this.volume, {
                expires: 900
            }),
            clearSelection();
    },

    tick: function() {
        var e = this;
        this.tickTimeout = setTimeout(function() {
            true === song.maintenance ?
                $player_time.html("maintenance mode") :
                song.length - song.position > 0 &&
                (false === e.tempMessageTimeout &&
                    $player_time.html(
                        formatTime(song.position) + " / " + formatTime(song.length)
                    ),
                    (song.position += 1)),
                e.tick();
        }, 1e3);
    },

    // Pulls info from api and applies it to client
    updateStatus: function(e) {
        e.song.game !== song.game && e.song.title !== song.title; // && (song.maintenance = e.maintenance,
        (song.game = e.song.game),
        (song.title = e.song.title),
        (song.length = e.song.songlength),
        (song.position = e.song.currenttime),
        (song.artwork = e.song.art),
        (song.link = e.song.songlink),
        (more.title = e.song.title),
        (more.game = e.song.game),
        (more.year = e.song.year),
        (more.system = e.song.system),
        (more.composer = e.song.composer),
        (update_page.update_list = e.updates),
        (update_page.todo_list = e.todo),
        (about_page.number_of_songs = e.site.num_songs),
        this.updateForm(),
            $player_listeners.html(e.site.listeners),
            clearTimeout(this.tickTimeout),
            this.tick();
    },

    updateListeners: function(e) {
        $player_listeners.html(e);
    },

    updateForm: function() {
        $player_artist.html(song.game),
            $player_title.html(song.title),
            $player_artwork.attr("src", radioFiles + "/" + song.artwork),
            $song_dl_link.attr("href", "https://based.zone/" + song.link),
            $more_title.text("Title: " + more.title),
            $more_game.text("Game: " + more.game),
            $more_year.text("Year: " + more.year),
            $more_system.text("System: " + more.system),
            more.composer == "" ?
            $more_composer.text("Composer(s): Missing Info") :
            $more_composer.text("Composer(s): " + more.composer),
            $more_composer.text("Composer(s): " + more.composer),
            $update_list.text(update_page.update_list),
            $todo_list.text(update_page.todo_list),
            // Replace the line breaks from the api with HTML breaks
            $update_list.html($update_list.html().replace(/\n/g, "<br/>")),
            $todo_list.html($todo_list.html().replace(/\n/g, "<br/>")),
            $num_songs.text(
                "Total songs in rotation: " + about_page.number_of_songs.toString()
            ),
            "playing" === song.state && $title.text(more.game + " — " + song.title);
    },

    tempMessageTimeout: false,
    showTempMessage: function(e) {
        var t = this;
        false !== this.tempMessageTimeout &&
            clearTimeout(this.tempMessageTimeout),
            $player_time.html(e),
            (this.tempMessageTimeout = setTimeout(function() {
                clearTimeout(t.tempMessageTimeout), (t.tempMessageTimeout = false);
            }));
    }
}),
(window_updates = {
    btn_show: "updates-show",
    btn_close: "updates-close",
    window: "window-updates",
    registerEvents: function() {
        var e = this;
        $app.on("click", "#" + this.btn_show, function() {
                e.show();
            }),
            $app.on("click", "#" + this.btn_close, function() {
                e.hide();
            });
    },
    show: function() {
        showWindow($el(this.window));
    },
    hide: function() {
        $el(this.window).hide();
    }
}),
(window_about = {
    btn_show: "about-show",
    btn_close: "about-close",
    window: "window-about",
    registerEvents: function() {
        var e = this;
        $app.on("click", "#" + this.btn_show, function() {
                e.show();
            }),
            $app.on("click", "#" + this.btn_close, function() {
                e.hide();
            });
    },
    show: function() {
        showWindow($el(this.window));
    },
    hide: function() {
        $el(this.window).hide();
    }
}),
(window_loading = {
    window: document.getElementById("window-loading"),
    title: document.getElementById("window-loading-title"),
    bar: document.getElementById("loading-bar"),
    indicator: document.getElementById("loading-indicator"),
    animate: true,
    left: 5,
    direction: 5,
    show: function(e) {
        (this.animate = true), this.loading(e);
    },
    loading: function(e) {
        var t = this;
        (this.title.innerHTML = e || "&nbsp;"),
        (this.window.style.display = "flex"),
        (this.left > this.bar.offsetWidth - this.indicator.offsetWidth - 6 ||
            this.left - 5 < 0) &&
        (this.direction *= -1),
        (this.left += this.direction),
        (this.indicator.style.left = this.left + "px"),
        this.animate ?
            setTimeout(function() {
                t.loading(e);
            }, 120) :
            (this.window.style.display = "none");
    },
    loaded: function() {
        this.animate = false;
    }
}),
(window_settings = {
    btn_show: "settings-show",
    btn_close: "settings-close",
    window: "window-settings",
    registerEvents: function() {
        var e = this;
        $app.on("click", "#" + this.btn_show, function() {
                e.show();
            }),
            $app.on("click", "#" + this.btn_close, function() {
                e.hide();
            }),
            $("#background-prev").on("click", function() {
                nextBackground(-1);
            }),
            $("#background-next").on("click", function() {
                nextBackground(1);
            }),
            $("#background-random").on("click", function() {
                updateBackground("random");
            }),
            $("#background-solid").on("click", function() {
                updateBackground("solid");
            });
    },
    show: function() {
        showWindow($el(this.window));
    },
    hide: function() {
        $el(this.window).hide();
    }
}),
($app = $("#app")),
(z = 100),
(STATIC_VER = 7);

// Functions called on page load
$().ready(function() {
    loadBackground(),
        registerEvents(),
        disableSelection(),
        (Client.onStatus = onStatus),
        (Client.onFail = onDisconnect),
        Client.init(),
        Player.init(),
        showWindow($("#window-player"));
});