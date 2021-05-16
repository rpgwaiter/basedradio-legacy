import React, {useEffect, useRef, useState} from 'react';
import ReactDOM from 'react-dom';

import logo from './windows95_logo.png';
import vol from './img/volume.png';

import './based98.css';

import './app.css';


function ButtonMinimize() {
    return(
        <div class="buttons">
            <button class="button-minimize" id="button-minimize"></button>
        </div>
    )
}

function ButtonHome() {
    return(
        <div class="action">
            <a id="home-btn" role="button" tabindex="0" href="/">
                <u>H</u>ome
            </a>
        </div>
    )
}

function ButtonAbout() {
    return(
        <div class="action">
            <a id="about-show" role="button" tabindex="1">
                <u>A</u>bout
            </a>
        </div>
    )
}

function ButtonDownloadSong() {
    return(
        <div class="action">
            <a id="song-dl-link" role="button" tabindex="2" download>
                <u>D</u>ownload Song
            </a>
        </div>
    )
}

function ButtonUpdates() {
    return(
        <div class="action" style={{float: 'right'}}>
            <a role="button" id="updates-show" tabindex="3">
                <u>U</u>pdates
            </a>
        </div>
    )
}

function MenuBar() {
    return(
        <div class="menu-bar noselect" id="actions">
            <ButtonHome />
            <ButtonAbout />
            <ButtonDownloadSong />
            <ButtonUpdates />
        </div>
    )
}

function CoverArt() {
    return(
        <div class="cover noselect">
            <img src={logo} alt="Cover Art"/>
        </div>
        
    )
}


function PlayerHeader() {
    return(
        <div class="header header-draggable">
            <div class="icon"></div>BasedRadio
            <ButtonMinimize />
        </div>
    )
}

function PlayerFooter() {
    return(
        <div class="status-bar clearfix">
            <div class="cell">Listeners: <span id="listeners">0</span></div>
            <div class="cell pull-right mr-12" id="statusbar-username">Keep it Based</div>
            <div class="separator pull-right"></div>
            <img src="img/statusbar.png" alt="" />
        </div>
    )
}

function PlayerInfo() {
    return(
        <div class="col-md-6 col-xs-12">
            <div class="text-field pa-0 ma-0 player-time-container">
                <canvas id="canvas" class="player-visual"></canvas>
                <div id="player-time" class="player-time">- Welcome Back -</div>
            </div>
        </div>
    )
}

function PlayerVolume() {
    return(
        <div class="col-md-6 hidden-sm hidden-xs">
            <div class="player-volume">
                <div class="player-volume-icon">
                    <img src={vol} alt="Volume Icon" />
                </div>
                <div class="player-volume-control">
                    <div id="player-volume-range"></div>
                    <div class="player-volume-line"></div>
                </div>
            </div>
        </div>
    )
}

function PlayerContent() {
    let audioEl = useRef();
    let playEl = useRef();
    let context = new(window.AudioContext || window.webkitAudioContext)();

    const [songState, setSongState] = useState("paused");
    // const [currentTime, setCurrentTime] = useState(0);
    // const [currentVol, setCurrentVol] = useState(0); // 0-100

    // const api_url = process.env.REACT_APP_API_URL;
    const stream_url = process.env.REACT_APP_STREAM_URL;

    const constructAudio = () => {
        context.resume().then(function() {
            audioEl.current.type = 'audio/ogg; codecs="opus"';
            audioEl.current.src = stream_url;
            audioEl.current.load();
            audioEl.current.volume = 1;
            // TODO: Add logic to handle mp3 for legacy

        });
    }

    const canPlay = () => {
        setSongState("playing");
        audioEl.current.play();
        playEl.current.innerText =  "Pause";
    }

    const pressPlay = () => {
        switch (songState) {
            case "playing":
                setSongState("paused");
                audioEl.current.pause();
                playEl.current.innerText = "Play"
                // set page title to song
                break;
            case "paused":
                setSongState("loading");
                playEl.current.innerText = "loading.."
                constructAudio();
                break;
            default:
        }
    }
    return (
        <div class="player-content"> {/* mirrors content*/ }
            <audio onCanPlay={canPlay} ref={audioEl} crossOrigin="anonymous" preload="auto"></audio>
            <div class="cover-slot">
                <CoverArt />
            </div>
            <div class="player-meta-slot">
                <div class="player-meta">
                    <div class="player-game">Game: </div>
                    <div class="player-track">Track: </div>
                    <div class="player-system">System: </div>

                    {/* <div class="clearfix mt-3 mb-3">
                        <PlayerInfo />
                        <PlayerVolume />
                    </div> */}
                    <div class="content-buttons no-gutter">
                        <div class="col-5 col-md-6 col-sm-3 mb-1 mb-sm-0 pr-2">
                            <button onClick={pressPlay} ref={playEl} class="noselect player-play d-block">Play</button>
                        </div>
                        <div class="col-md-4 col-sm-4 col-xs-12">
                            <button class="block ma-0 mt-6">Settings</button>
                        </div>
                        <div class="col-md-3 col-sm-3 col-xs-12" style={{float: 'right'}}>
                            <button class="block ma-0 mt-6">More Info</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function WinForm() {
    return(
        <div class="window-player">
            <div class="win98 player-form">
                <div style={{position: 'relative'}} class="window" id="player-form">
                    <div class="inner">
                        <PlayerHeader />
                        <MenuBar />
                        <PlayerContent />
                    </div>
                    <PlayerFooter />
                </div>
            </div>
        </div>
    )
}

function VGMPlayer() {
  return (
    <div class="frame row align-items-center">
        <WinForm />
    </div>
  )
}

export default VGMPlayer;