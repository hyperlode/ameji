
var nouns_JSON = `[
    {"file":"hourglass.png",
     "meaning":{
            "time value":{
                "synonyms":["period","amound of time"],
                "value":"-", "dia_top":"-", "dia_bot":"-"},
            "hourglass":{
                "synonyms":["sandglass","clepsydra","clock","timepiece","timer", "chronometer", "timekeeper"],
                "value":"-", "dia_top":"lit", "dia_bot":"-"}
    }},
    {"file":"clock-face.png", "meaning":{
        "time stamp":{
            "synonyms":["timestamp", "time marker", "point in time", "absolute time"],
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
   
    {"file":"loop.png", "meaning":{
        "periodicity":{
            "synonyms":["frequency", "recurrence", 
                "continuously", "all the time", "once", "a few times", "when used with absolute or relative quantity", 
                "never", "often", "sometimes", "always", "when used with probability"], 
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
   
    {"file":"podium.png", "meaning":{
        "position":{
            "synonyms":["ordinal number","place","winner", "first", "second", "third"], 
            "value":"-", "dia_top":"gen", "dia_bot":"-"}
    }},
    {"file":"brain.png", "meaning":{
        "reason":{
            "synonyms":["why","meaning","what for"], 
            "value":"-", "dia_top":"sym", "dia_bot":"-"}
    }},
    {"file":"mask.png", "meaning":{
        "mask":{
            "synonyms":["who", "whose", "unknown person", "party", "Venice"], 
            "value":"-", "dia_top":"sym", "dia_bot":"-"}
    }},
    {"file":"marbles_slope.png", "meaning":{
        "position":{
            "synonyms":["order", "rank"], 
            "value":"-", "dia_top":"gen", "dia_bot":"-"}
    }},
    {"file":"people_queue.png", "meaning":{
        "queue":{
            "synonyms":["first","last", "before", "behind", "in front of", "next", "between"], 
            "value":"-", "dia_top":"gen", "dia_bot":"-"}
    }},
    {"file":"people_queue_in_front.png", "meaning":{
        "in front":{
            "synonyms":["before"], 
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"people_queue_behind.png", "meaning":{
        "behind":{
            "synonyms":["next"], 
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"dice_pips_9.png", "meaning":{
        "9":{
            "synonyms":["number", "nine", "dice", "die", "pips"], 
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
   
    {"file":"dice_pips_8.png", "meaning":{
        "8":{
            "synonyms":["number", "dice", "die", "pips","eight"], 
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"dice_pips_7.png", "meaning":{
        "7":{
            "synonyms":["number", "dice", "die", "pips","seven"], 
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"dice_pips_6.png", "meaning":{
        "6":{
            "synonyms":["number", "dice", "die", "pips","six"], 
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"dice_pips_5.png", "meaning":{
        "5":{
            "synonyms":["number", "dice", "die", "pips","five"], 
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"dice_pips_4.png", "meaning":{
        "4":{
            "synonyms":["number", "dice", "die", "pips","four"], 
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"dice_pips_3.png", "meaning":{
        "3":{
            "synonyms":["number", "dice", "die", "pips","three"], 
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"dice_pips_2.png", "meaning":{
        "2":{
            "synonyms":["number", "dice", "die", "pips","two"], 
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"dice_pips_1.png", "meaning":{
        "1":{
            "synonyms":["number", "dice", "die", "pips","one"], 
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"dice_pips_0.png", "meaning":{
        "0":{
            "synonyms":["number", "dice", "die", "pips","zero"], 
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"gauss-empty.png", "meaning":{
        "probability":{
            "synonyms":["likelyhood","chance","gauss","bell curve"], 
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},

    {"file":"set-0-in-7-out.png", "meaning":{
        "0 in set":{
            "synonyms":["set", "quantitative determininer", "none", "empty", "all outside"], 
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"set-1-in-6-out.png", "meaning":{
        "1 in set":{
            "synonyms":["set", "quantitative determininer","one", "solo", "rare", "curiosity", "rarity", "almost empty", "almost none"], 
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"set-2-in-5-out.png", "meaning":{
        "2 in set":{
            "synonyms":["set", "quantitative determininer", "two", "some", "a few", "a couple"], 
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"set-3-in-4-out.png", "meaning":{
        "3 in set":{
            "synonyms":["set", "quantitative determininer","three", "quite a bit", "a few", "not insignificant"], 
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"set-4-in-3-out.png", "meaning":{
        "4 in set":{
            "synonyms":["set", "quantitative determininer", "four", "more than half", "half", "quite a lot", "over half", "significant", "quite a few"], 
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"set-5-in-2-out.png", "meaning":{
        "5 in set":{
            "synonyms":["set", "quantitative determininer", "five", "a lot", "many", "significant"], 
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"set-6-in-1-out.png", "meaning":{
        "6 in set":{
            "synonyms":["set", "quantitative determininer", "six", "a lot", "many", "almost all", "almost full"], 
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"set-7-in-0-out.png", "meaning":{
        "7 in set":{
            "synonyms":["set", "quantitative determininer", "seven", "all", "full", "everything"], 
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
   
    {"file":"earth-encircles-sun.png", "meaning":{
        "year":{
            "synonyms":["12 months","annus"],
            "value":"-", "dia_top":"-", "dia_bot":"-"},
        "earth around sun":{
            "synonyms":[],
            "value":"-", "dia_top":"lit", "dia_bot":"-"}
    }},
    {"file":"moon-encircles-earth.png", "meaning":{
        "month":{
            "synonyms":[],
            "value":"-", "dia_top":"-", "dia_bot":"-"},
        "moon around earth":{
            "synonyms":[],
            "value":"-", "dia_top":"lit", "dia_bot":"-"}
    }},
    {"file":"earth-spin.png", "meaning":{
        "day":{
            "synonyms":["24 hours","days"],
            "value":"-", "dia_top":"-", "dia_bot":"-"},
        "earth spin":{
            "synonyms":[],
            "value":"-", "dia_top":"lit", "dia_bot":"-"}
    }},
    {"file":"clock-hour-one.png", "meaning":{
        "hour":{
            "synonyms":["1 hour","60 minutes"],
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"clock-minute-one.png", "meaning":{
        "minute":{
            "synonyms":["1 minute","60 seconds"],
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"clock-second-one.png", "meaning":{
        "minute":{
            "synonyms":["1 second"],
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"luciebox.png", "meaning":{
        "luciebox":{
            "synonyms":["pretbak","busybox"],
            "value":"-", "dia_top":"-", "dia_bot":"-"},
        "electronic toy":{
            "synonyms":["toy", "electronic device"],
            "value":"-", "dia_top":"gen", "dia_bot":"-"}
    }},
    {"file":"abacus.png", "meaning":{
        "abacus":{
            "synonyms":["calculate", "calculator"],
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"circle-full.png", "meaning":{
        "full":{
            "synonyms":["circle","quarters","eights","everything"],
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"circle-quarters-three.png", "meaning":{
        "three-quarters":{
            "synonyms":["circle","quarter","4","3"],
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"circle-half.png", "meaning":{
        "half":{
            "synonyms":["circle","half","2","medium"],
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"circle-eights-three.png", "meaning":{
        "three-eights":{
            "synonyms":["circle","eights","8","3"],
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"circle-quarters-one.png", "meaning":{
        "quarter":{
            "synonyms":["circle","quarter","4","1"],
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"circle-eights-one.png", "meaning":{
        "one-eight":{
            "synonyms":["circle","eights","8","1"],
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    
    {"file":"meter_relative_0.png", "meaning":{
        "value 0":{
            "synonyms":["zero","null","none"],
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"meter_relative_1.png", "meaning":{
        "value 1":{
            "synonyms":["low"],
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"meter_relative_2.png", "meaning":{
        "value 2":{
            "synonyms":["average"],
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"meter_relative_3.png", "meaning":{
        "value 3":{
            "synonyms":["high"],
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"meter_relative_4.png", "meaning":{
        "value 4":{
            "synonyms":["extreme"],
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"pin-on-map.png", "meaning":{
        "location":{
            "synonyms":["position"],
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"head_profile_mouth_closed.png", "meaning":{
        "you":{
            "synonyms":["listener"],
            "value":"-", "dia_top":"-", "dia_bot":"-"},
        "head closed mouth":{
            "synonyms":["head profile person mouth closed"],
            "value":"-", "dia_top":"lit", "dia_bot":"-"}
    }},
    {"file":"circle-60degrees-cutout.png", "meaning":{
        "I":{
            "synonyms":["me","narrator", "head profile person"],
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"circle-half-strikethrough-horizontal.png", "meaning":{
        "you":{
            "synonyms":["you", "listener"],
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"circle-half-strikethrough-vertical.png", "meaning":{
        "he":{
            "synonyms":["he","her","his","hers","it"],
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"circle-double-strikethrough-horizontal.png", "meaning":{
        "you":{
            "synonyms":["you"],
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"circle-double-strikethrough-vertical.png", "meaning":{
        "he":{
            "synonyms":["they","their","theirs"],
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"circle-60degrees-cutout-with-half-strikethrough-horizontal.png", "meaning":{
        "we_inclusive":{
            "synonyms":["we inclusive", "talker and listener", "us", "ours"],
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"circle-60degrees-cutout-strikethrough-horizontal-double.png", "meaning":{
        "we inclusive plural":{
            "synonyms":["we all","us","ours", "me and all of you"],
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"circle-60degrees-cutout-with-vertical.png", "meaning":{
        "we_exclusive":{
            "synonyms":["we exclusive", "me and him her but not you", "us", "ours"],
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"circle-60degrees-cutout-strikethrough-vertical-double.png", "meaning":{
        "we exclusive plural":{
            "synonyms":["we","us","ours", "me and them but not you"],
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"circle-60degrees-cutout-with-vertical-and-horizontal.png", "meaning":{
        "all of us":{
            "synonyms":["we","all of us", "everybody", "everybodies'", "ours"],
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"circle-60degrees-cutout-with-vertical-and-horizontal-double.png", "meaning":{
        "all of us plural":{
            "synonyms":["we","all of us", "everybody", "everybodies'", "ours"],
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"dot-space.png", "meaning":{
        "period":{
            "synonyms":["dot period with space for end of senctence"],
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"hash.png", "meaning":{
       "hash":{
            "synonyms":["pound","count","number", "quantity", "amount", "0023 emoji"],
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"asterisk.png", "meaning":{
       
        "this":{
            "synonyms":["the","it","that", "asterisk", "002a emoji"],
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"cube.png", "meaning":{
       
        "cube":{
            "synonyms":[""],
            "value":"-", "dia_top":"lit", "dia_bot":"-"},
        "thing":{
            "synonyms":["object"],
            "value":"-", "dia_top":"gen", "dia_bot":"-"},
        "materialistic":{
            "synonyms":["3D","real world", "tangible", "square", "blocky"],
            "value":"-", "dia_top":"sym", "dia_bot":"-"}
    }},
    {"file":"sphere.png", "meaning":{
        "sphere":{
            "synonyms":["ball", "globe"],
            "value":"-", "dia_top":"-", "dia_bot":"-"},
        "thing":{
            "synonyms":["object"],
            "value":"-", "dia_top":"gen", "dia_bot":"-"},
        "materialistic":{
            "synonyms":["3D","real world", "tangible", "round", "spherical", "circle"],
            "value":"-", "dia_top":"sym", "dia_bot":"-"}
    }},
    {"file":"head_profile_mouth_open.png", "meaning":{
        "I":{
            "synonyms":["me","narrator", "head profile person"],
            "value":"-", "dia_top":"-", "dia_bot":"-"},
        "head open mouth":{
            "synonyms":["head profile person"],
            "value":"-", "dia_top":"lit", "dia_bot":"-"}
    }}
]`;