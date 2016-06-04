"use strict";

var React     = require('react');
var ReactDOM  = require('react-dom');
var uti       = require('util');
var Events    = require('events');

var events = new Events.EventEmitter();

var innerBar    = document.getElementById('inner-bar');
var progressBar = document.getElementById('progress-bar');

var progress_active = false;

events.on('set_progress_colour', function(colour) {
    innerBar.className = colour + '-bg';
});

events.on('set_progress', function(width, delay) {
    console.log('Setting progress bar to: ' + width);
    
    if (typeof delay == 'number' && delay !== null) {
        setTimeout(next, delay);
    } else {
        next();
    }
    
    function next() {
        if (progress_active == true) {
            setTimeout(function() {
                events.emit('set_progress', width, delay);
            }, 600);
            
            return;
        }

        if (typeof delay == 'string') {
            innerBar.className = delay + '-bg';
        } else {
            innerBar.className = '';
        }
        
        progressBar.style.opacity = 1;
    
        innerBar.style.width = width + '%';
        progress_active      = true;
        
        setTimeout(function() {
            progress_active = false;
            
            if (innerBar.style.width == '100%' || innerBar.style.width == '0%') {
                innerBar.className          = 'notransition';
                innerBar.style.width        = 0 + '%';
                progressBar.style.opacity   = 0;
            }
        }, 600);
    }
});

module.exports =  events;