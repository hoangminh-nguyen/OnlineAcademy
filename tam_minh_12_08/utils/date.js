

module.exports = {

    curDate() {
        var d = new Date();
        var day=d.getDate(), month=(d.getMonth()+1), year=d.getFullYear(), hour=d.getHours(), minute=d.getMinutes(), second=d.getSeconds();
        if (day <10) day="0"+day;
        if (month<10) month="0"+month;
        if (hour<10) hour="0"+hour;
        if (minute<10) minute="0"+minute;
        if (second<10) second="0"+second;
        var date = year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;
        return date;
    }
};