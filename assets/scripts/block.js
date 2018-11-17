import colors from 'colors';

cc.Class({
    extends: cc.Component,

    properties: {
        numberLabel: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    setNumber (number) {
        if (number == 0) {
            this.numberLabel.node.active = false;
        }
        this.numberLabel.string = number;
        if (number in colors) {
            this.node.color = colors[number];
        }
    }

    // update (dt) {},
});
