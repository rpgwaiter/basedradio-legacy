# Broadcasts info in json
import urllib.request
import json
import time
import os
import time
import subprocess
from mpd import MPDClient
from flask import Flask, Response
from flask_cors import CORS
from objdict import ObjDict
from datetime import datetime


#####################################
# CONFIG
#####################################
update_file = "updates.txt"
todo_file = "todo.txt"
#####################################

# Globals are fun
big_timer = 0


# Generates update string
def getUpdates():
    niceupdates = ""

    # If the update file exists, build return string
    if os.path.isfile(update_file):
        with open(update_file) as f:
            line = f.readline()
            while line:
                niceupdates += "- {0}\n".format(line)

    return niceupdates


# Generates todo string
def getTodo():
    nicetodo = ""

    # If the update file exists, build return string
    if os.path.isfile(todo_file):
        with open(todo_file) as f:
            line = f.readline()
            while line:
                nicetodo += "- {0}\n".format(line)

    return nicetodo


# Get total number of songs in playlist
def getNumSongs(m):
    num_songs = int(m.stats()['songs']) if m else 0
    return num_songs


# Ran at regular intervals (60 seconds for now)
# Takes "m" mpdobject, updates playlist if needed
def reloadplaylist(m):
    print("Checking playlist")
    m.update()
    num_songs = getNumSongs(m)
    num_playlist = len(m.playlist())
    print("num of songs = {0}".format(num_songs))
    print("num in playlist = {0}".format(num_playlist))

    if num_playlist != num_songs:
        print("mismatch, running playlist update script")
        subprocess.call("/home/robots/scripts/mpd/updateplaylist.sh")
        reloadplaylist()
    return


# Removes extension from title. Assumes title exists
def removeExt(title):
    # Default output if extension not supported
    out_title = title
    if title.endswith('.mp3'):
        out_title = title.replace(".mp3", "").split('/')[-1:]
    elif title.endswith('.flac'):
        out_title = title.replace(".flac", "").split('/')[-1:]
    elif title.endswith('.opus'):
        out_title = title.replace(".opus", "").split('/')[-1:]
    elif title.endswith('.m4a'):
        out_title = title.replace(".m4a", "").split('/')[-1:]

    return out_title


# Generates the dataset for use with API
def generateJSON(songinfo, clientinfo):
    # Radio Root (rr)
    rr = "/var/www/html/radiofiles/"
    filename = songinfo['file']

    # Build the data obj "d"
    d = {}
    d['song'] = {}
    d['site'] = {}
    d['song']['title'] = songinfo['title'] if 'title' in songinfo else removeExt(filename)
    d['song']['game'] = filename.split("/")[1][:-7]
    d['song']['system'] = filename.split("/")[0]
    d['song']['filename'] = filename
    d['song']['composer'] = songinfo['artist'] if 'artist' in songinfo else ""
    d['song']['currenttime'] = int(round(float(clientinfo['elapsed'])))
    d['song']['songlength'] = int(round(float(clientinfo['duration'])))
    d['song']['songlink'] = "filehost/radiofiles/{0}".format(filename)
    d['song']['year'] = filename.split("/")[1][-5:][:-1]
    # Art
    if os.path.isfile("{0}{1}/{2}/art.jpg".format(rr, d['song']['system'], filename.split("/")[1])):
        d['song']['art'] = "{0}/{1}/art.jpg".format(d['song']['system'], filename.split("/")[1])
    elif os.path.isfile("{0}{1}/art.jpg".format(rr, d['song']['system'])):
        d['song']['art'] = "{0}/art.jpg".format(d['song']['system'])
    else:
        d['song']['art'] = ""

    # Get info from icecast
    try:
        with urllib.request.urlopen("http://localhost:8000/status-json.xsl") as url:
            icecastdata = json.loads(url.read().decode())
            # d['site']['listeners'] = icecastdata['icestats']['source'][1]['listeners']
            d['site']['listeners'] = icecastdata['icestats']['source']['listeners']
    except:
        pass

    # Updates
    d['updates'] = getUpdates()
    d['todo'] = getTodo()
    d['maintenance'] = False
    d['api_version'] = 5.1

    return d


def spitjson():
    global big_timer

    m = MPDClient()
    # Attributes
    m.idletimeout = None
    m.timeout = None
    m.connect('localhost', 6600)

    # Get json data
    d = generateJSON(m.currentsong(), m.status())
    d['site']['num_songs'] = getNumSongs(m)

    # How often the playlist check runs (minutes)
    update_interval = 1

    ####
    # This should run every 60 seconds
    if int(time.time()) > big_timer:
        big_timer = int(time.time()) + (update_interval * 60)
        reloadplaylist(m)
    ####

    m.close()

    return json.dumps(d, indent=4)


# Flask Stuff
api = Flask(__name__)
CORS(api)


@api.route('/status', methods=['GET'])
def getstatus():
    return Response(spitjson(), mimetype='application/json')


if __name__ == '__main__':
    api.run(debug=True, host="localhost", port=9001)
