var drumOptions = { panelCount: 20, dail_w: 35, dail_h: 10, dail_stroke_width: 2 };
$("#hours").drum(drumOptions);
$("#minutes").drum(drumOptions);
$("#seconds").drum(drumOptions);
$("#hundredths").drum(drumOptions);

$("#hours").drum('setIndex', 0);
$("#minutes").drum('setIndex', 24);
$("#seconds").drum('setIndex', 50);
$("#hundredths").drum('setIndex', 42);

setTimeout(function () {
    $('.wrapper-drum-numbers').addClass('loaded');
});
