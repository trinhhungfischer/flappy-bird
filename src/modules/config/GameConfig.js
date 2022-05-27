

var MW = MW || {};

//game state
MW.GAME_STATE = {
    HOME:0,
    PLAY:1,
    READY:2,
    OVER:3,
    RETRY: 4
};


MW.BIRD_TYPE = {
    BLUE: 1,
    RED: 2,
    YELLOW: 3
};

MW.SOUND = true;
MW.FONTCOLOR = "#1f2d96";

MW.UNIT_TAG = {
    UPPER_PIPE: 1,
    DOWN_PIPE: 2,
    BIRD: 3,
    READY: 999,
}

MW.CONTAINER = {
    BACKGROUND:[],
    UPPER_PIPE:[],
    DOWN_PIPE:[],
    GROUND:[]
};

MW.NUMBACKGROUND = 5;

// score
MW.SCORE = 0;

MW.ZORDER = {
    PIPE: 10,
    BACKGROUND: -999,
    BIRD: 50,
    GROUND: 20,
    SCORE: 100,
    OVER: 999
}

MW.PIPE_CONFIG = {
    RANDOM_RANGE: 100,
}

MW.SCALE = 2.0

MW.GAME_LAYER_TEXT = {
    RETRY: 1,
    BACK_MAIN: 2,
}

MW.GAME_MODE = {
    EASY: 4,
    MEDIUM: 3.5,
    HIGH: 3
}