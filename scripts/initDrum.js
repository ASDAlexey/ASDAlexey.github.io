var drumOptions = {
    panelCount: 20,
    dail_w: 35,
    dail_h: 10,
    dail_stroke_width: 2,
    onChange: function (e) {
        var name = $(e).attr('name');
        $('.time__' + name).find('span').text(e.value);
    }
};
$("#hours").drum(drumOptions);
$("#minutes").drum(drumOptions);
$("#seconds").drum(drumOptions);
$("#hundredths").drum(drumOptions);

var time = {
    hours: 0,
    minutes: 24,
    seconds: 50,
    hundredths: 82,
};

$("#hours").drum('setIndex', time.hours);
$("#minutes").drum('setIndex', time.minutes);
$("#seconds").drum('setIndex', time.seconds);
$("#hundredths").drum('setIndex', time.hundredths);

$(".time__hours").find('span').text(time.hours);
$(".time__minutes").find('span').text(time.minutes);
$(".time__seconds").find('span').text(time.seconds);
$(".time__hundredths").find('span').text(time.hundredths);

setTimeout(function () {
    $('.wrapper-drum-numbers').addClass('loaded');
});
