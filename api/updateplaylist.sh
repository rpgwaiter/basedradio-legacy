#!/bin/sh
mpc stop && mpc clear && mpc update && mpc ls | mpc add && mpc play
