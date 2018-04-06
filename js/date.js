
/*
 * Get the current day's pretty name. E.g Sunday, Monday, etc.
 */
function getCurrentDayName() {
    var d = new Date();
    var weekday = new Array(7);
    weekday[0] =  "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    return weekday[d.getDay()];
}

/*
 * Get the current months short name. For example if it was December, then it would return Dec.
 */
function getCurrentMonthShortname() {
    var d = new Date();
    var months = new Array(12);
    months[0] = "Jan";
    months[1] = "Feb";
    months[2] = "Mar";
    months[3] = "Apr";
    months[4] = "May";
    months[5] = "Jun";
    months[6] = "Jul";
    months[7] = "Aug";
    months[8] = "Sep";
    months[9] = "Oct";
    months[10] = "Nov";
    months[11] = "Dec";
    return months[d.getMonth()];
}

/*
 * Get the current day (in number format)
 */
function getDayNumber() {
        var d = new Date();
        return d.getDate();
}

/*
 * Gets the current year
 */
function getYear() {
        var d = new Date();
        return d.getFullYear();
}

/*
 * Get the current date in the form of "Month Day Year" e.g "Feb 26 1920".
 */
function getDate() {
    return getCurrentMonthShortname() + " " + getDayNumber() + ", " + getYear();
}

/**
 * Starts the clock. Runs every half second to update the main clock.
 */
function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s); 
    $('#time').text( h + ":" + m + ":" + s);
    var t = setTimeout(startTime, 500);
}

/**
 * Checks the current time
 */
function checkTime(i) {
    if (i < 10) {i = "0" + i};
        return i;
}


