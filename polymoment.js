// polymoment.js
// version : 0.0.1
// authors : Seyed Mohsen Moosavi
// license : MIT
// appgeek.com

'use strict';
(function (root, factory) {
    /* global define */
    if (typeof define === 'function' && define.amd) {
        define(['moment', 'moment-jalaali', 'moment-hijri'], function (moment, jMoment, iMoment) {
            root.moment = factory(moment, jMoment, iMoment)
            return root.moment
        })
    } else if (typeof exports === 'object') {
        module.exports = factory(require('moment'), require('moment-jalaali'), require('moment-hijri'))
    } else {
        root.moment = factory(root.moment, root.jMoment, root.iMoment)
    }
})(this, function (moment, jMoment, iMoment) { // jshint ignore:line

    function objectCreate(parent) {
        function F() { }
        F.prototype = parent
        return new F()
    }

    function extend(a, b) {
        var key
        for (key in b)
            if (b.hasOwnProperty(key))
                a[key] = b[key]
        return a
    }

    function polymoment(cal, input, format, lang, strict) {
        var uMoment;
        switch (cal) {
            case "jalali": { 
                uMoment = jMoment(input, format, lang, strict); 
                break; 
            }
            case "hijri": { 
                uMoment = iMoment(input, format, lang);
                 break; 
                }
            default: {
                uMoment = moment(input, format, lang, strict);
            }
        }
        var pm = objectCreate(polymoment.fn)
        extend(pm, uMoment);
        pm.calendar = cal;
        pm.uMoment = uMoment;
        return pm;
    }

    extend(polymoment, moment);

    polymoment.fn = objectCreate(moment.fn);

    polymoment.utc = function (cal, input, format, lang, strict) {
        var uMoment;
        switch (cal) {
            case "jalali": { 
                uMoment = jMoment.utc(input, format, lang, strict);
                break;
            }
            case "hijri": {
                uMoment = iMoment.utc(input, format, lang);
                break;
            }
            default: {
                uMoment = moment.utc(input, format, lang, strict);
            }
        }
        var pm = objectCreate(polymoment.fn)
        extend(pm, uMoment)
        pm.calendar = cal;
        pm.uMoment = uMoment;
        return pm
    }
    
    polymoment.fn.startOf = function (units) {
        this.uMoment.startOf(units);
        return this;
    }

    polymoment.fn.endOf = function (units) {
        this.uMoment.endOf(units);
        return this;
    }

    polymoment.fn.utcOffset = function (units) {
        if(units!==undefined){
            this.uMoment.utcOffset(units);
            return this;
        }else{
            return this.uMoment.utcOffset();
        }

    }

    //weekdaysMin
    polymoment.fn.monthsShort = function (format, integer) {
        switch (this.calendar) {
            case "jalali": 
                return this.uMoment.localeData().jMonthsShort(format, integer);
            case "hijri": 
                return this.uMoment.localeData().iMonthsShort(format, integer);
            default: 
                return this.uMoment.monthsShort(format, integer);
        }
        
    }

    polymoment.fn.year = function (input) {
        var result ;
        switch (this.calendar) {
            case "jalali": 
                result= this.uMoment.jYear(input);
                break;
            case "hijri": 
                result = this.uMoment.iYear(input);
                break;
            default: 
                result = this.uMoment.year(input);
        }
        if(typeof input !== 'number'){
            return result;
        }
        return this;
    }
    
    polymoment.fn.month = function (input) {
        var result;
        switch (this.calendar) {
            case "jalali": 
                result = this.uMoment.jMonth(input);
                break;
            case "hijri": 
                result = this.uMoment.iMonth(input);
                break;
            default: 
                result = this.uMoment.month(input);
        }
        if(typeof input !== 'number'){
            return result;
        }
        return this;
    }
    
    polymoment.fn.date = function (input) {
        var result;
        switch (this.calendar) {
            case "jalali": 
                result = this.uMoment.jDate(input);
                break;
            case "hijri": 
                result = this.uMoment.iDate(input);
                break;
            default: 
                result = this.uMoment.date(input);
        }
        if(typeof input !== 'number'){
            return result;
        }
        return this;
    }
    
    
    
    polymoment.fn.hour = function(input) {
        var result = this.uMoment.hour(input);
        if(typeof input !== 'number'){
            return result;
        }
        return this;
    }
    
    polymoment.fn.minute = function(input) {
        var result = this.uMoment.minute(input);
        if(typeof input !== 'number'){
            return result;
        }
        return this;
    }
    
    polymoment.fn.second = function(input) {
        var result = this.uMoment.second(input);
        if(typeof input !== 'number'){
            return result;
        }
        return this;
    }
    
    polymoment.fn.clone = function () {
        return polymoment(this.calendar,this);
    }

    polymoment.fn.format = function(value){
        return this.uMoment.format(value);
    }
    
    polymoment.fn.isAfter = function(arg1,arg2){
        return this.uMoment.isAfter(arg1,arg2);
    }

    
    polymoment.fn.isBefore = function(arg1,arg2){
        return this.uMoment.isBefore(arg1,arg2);
    }

    polymoment.fn.isSame = function(arg1,arg2){
        return this.uMoment.isSame(arg1,arg2);
    }

    polymoment.fn.add = function(val, units){
        units = moment.normalizeUnits(units);
        switch(this.calendar){
            case "jalali":
                if(units=='month'){
                    units = 'jmonth';
                }else if(units == 'year'){
                    units = 'jyear';
                }
            break;
            case "hijri":
                if(units=='month'){
                    units = 'imonth';
                }else if(units == 'year'){
                    units = 'iyear';
                }
            break;
        }
        this.uMoment.add(val,units);
        return this;
    }
    
    polymoment.fn.subtract = function (val, units) {
        units = moment.normalizeUnits(units);
        switch(this.calendar){
            case "jalali":
                if(units=='month'){
                    units = 'jmonth';
                }else if(units == 'year'){
                    units = 'jyear';
                }
            break;
            case "hijri":
                if(units=='month'){
                    units = 'imonth';
                }else if(units == 'year'){
                    units = 'iyear';
                }
            break;
        }
        this.uMoment.subtract(val,units);
        return this;
    }
    
    polymoment.fn.daysInMonth =  function () {
        var result ;
        switch (this.calendar) {
            case "jalali": 
                return this.uMoment.jDaysInMonth();
            case "hijri": 
                return this.uMoment.iDaysInMonth();
            default: 
                return this.uMoment.daysInMonth();
        }
    }

    polymoment.fn.week = function(input){
        var result ;
        switch (this.calendar) {
            case "jalali": 
                result = this.uMoment.jWeek(input);
                break;
            case "hijri": 
                result = this.uMoment.iWeek(input);
                break;
            default: 
                result = this.uMoment.week(input);
        }
        if(typeof input !== 'number'){
            return result;
        }
        return this;
    }

    return polymoment;
});