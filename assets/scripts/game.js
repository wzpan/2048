const ROWS = 4;
const NUMBERS = [2, 4];

cc.Class({
    extends: cc.Component,

    properties: {
        scoreLabel: cc.Label,
        score: 0,
        blockPrefab: cc.Prefab,
        gap: 20,
        bg: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.drawBgBlocks();
        this.init();
    },

    drawBgBlocks() {
        this.blockSize = (cc.winSize.width - this.gap * (ROWS + 1)) / ROWS;
        let x = this.gap + this.blockSize / 2;
        let y = this.blockSize;
        this.positions = [];
        for (let i = 0; i < ROWS; ++i) {
            this.positions.push([0, 0, 0, 0]);
            for (let j = 0; j < ROWS; ++j) {
                let block = cc.instantiate(this.blockPrefab);
                block.width = this.blockSize;
                block.height = this.blockSize;
                this.bg.addChild(block);
                block.setPosition(cc.p(x, y));
                this.positions[i][j] = cc.p(x, y);
                x += this.gap + this.blockSize;
                block.getComponent('block').setNumber(0);
            }
            y += this.gap + this.blockSize;
            x = this.gap + this.blockSize / 2;
        }
    },

    init() {
        this.updateScore(0);

        if (this.blocks) {
            for (let i = 0; i < this.blocks.length; ++i) {
                for (let j = 0; j < this.blocks[i].length; ++j) {
                    if (this.blocks[i][j] != null) {
                        this.blocks[i][j].destroy();
                    }
                }
            }
        }

        this.data = [];
        this.blocks = [];
        for (let i = 0; i < ROWS; ++i) {
            this.blocks.push([null, null, null, null]);
            this.data.push([0, 0, 0, 0]);
        }

        this.addBlock();
        this.addBlock();
        this.addBlock();
    },

    updateScore(number) {
        this.score = number;
        this.scoreLabel.string = '分数：' + number;
    },

    /**
     * 找出空闲的块
     * @return 空闲块的一维数组表示
     */
    getEmptyLocations() {
        let locations = [];
        for (let i = 0; i < this.blocks.length; ++i) {
            for (let j = 0; j < this.blocks[i].length; ++j) {
                if (this.blocks[i][j] == null) {
                    locations.push(i * ROWS + j);
                }
            }
        }
        return locations;
    },

    addBlock() {
        let locations = this.getEmptyLocations();
        let index = locations[Math.floor(cc.random0To1() * locations.length)];
        let x = Math.floor(index / ROWS);
        let y = Math.floor(index % ROWS);
        let position = this.positions[x][y];
        let block = cc.instantiate(this.blockPrefab);
        block.width = this.blockSize;
        block.height = this.blockSize;
        this.bg.addChild(block);
        block.setPosition(position);        
        block.getComponent('block').setNumber(NUMBERS[Math.floor(cc.random0To1() * NUMBERS.length)]);
    },

    // update (dt) {},
});