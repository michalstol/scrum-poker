export default class CardFigures {
    constructor($context) {
        this.$context = $context;
        this.dimension = {
            width: $context.offsetWidth,
            height: $context.offsetHeight
        };
        this.setSizeAndRatio();

        this.ctx = $context.getContext('2d');

        this.create();
    }

    setSizeAndRatio() {
        const { width, height } = this.dimension;

        this.$context.width = width;
        this.$context.height = height;
        this.ratio = width / height;
    }

    create(number = 1, ctx = this.ctx) {
        const coordinates = this.createCoordinates(number);

        if (coordinates && coordinates.length) {
            ctx.clearRect(0, 0, this.$context.width, this.$context.height);

            for (let points of coordinates) {
                ctx.beginPath();
                ctx.moveTo(points[0].x, points[0].y);

                for (let i = 1; i <= 3; i++) {
                    ctx.lineTo(points[i].x, points[i].y);
                }

                ctx.closePath();
                ctx.fillStyle = "#a52828";
                ctx.fill();
            }
        }
    }

    createCoordinates(number) {
        if (number === 13) {
            return this.createLines(1);
        } else if (number === 5 || number === 20 || number === 40) {
            return this.createFives(number);
        } else {
            return this.createLines(number);
        }
    }

    createLines(number) {
        const h = this.dimension.height / number * (number === 100 ? 10 : number === 8 ? 2 : 1);
        const w = h * this.ratio;
        const extraX = this.dimension.width / 2 - w / 2 * (number === 100 ? 10 : number === 8 ? 2 : 1);
        const coordinates = [];
        let col = 0;
        let row = 0;

        for (let i = 1; i <= number; i++) {
            coordinates.push([
                {
                    x: w / 2 + extraX + col * w,
                    y: h * row
                },
                {
                    x: w + extraX + col * w,
                    y: h / 2 + h * row
                },
                {
                    x: w / 2 + extraX + col * w,
                    y: h + h * row
                },
                {
                    x: extraX + col * w,
                    y: h / 2 + h * row
                }
            ]);

            if ((number <= 8 && i % 4 === 0) || (number === 100 && i % 10 === 0)) {
                col++;
                row = 0;
            } else {
                row++;
            }
        }

        return coordinates;
    }

    createFives(number) {
        const { width, height } = this.dimension;
        const amountFive = number / 5;
        const fiveH = height / amountFive * (amountFive === 1 ? 1 : 2);
        const fiveW = fiveH * this.ratio;
        const extraX = (width - fiveW * (amountFive === 1 ? 1 : 2)) / 2;
        const coordinates = [];
        let row = 1;
        let col = 1;

        for (let i = 1; i <= amountFive; i++) {
            const x = fiveW * (col - 1);
            const y = fiveH * (row - 1);

            const smallH = fiveH / 3;
            const smallW = fiveW / 3;
            let smallRow = 1;
            let smallCol = 1;

            for (let j = 1; j <= 9; j++) {
                if (j % 2 !== 0) {
                    coordinates.push([
                        {
                            x: smallW / 2 + smallW * (smallCol - 1) + x + extraX,
                            y: smallH * (smallRow - 1) + y
                        },
                        {
                            x: smallW + smallW * (smallCol - 1) + x + extraX,
                            y: smallH / 2 + smallH * (smallRow - 1) + y
                        },
                        {
                            x: smallW / 2 + smallW * (smallCol - 1) + x + extraX,
                            y: smallH + smallH * (smallRow - 1) + y
                        },
                        {
                            x: smallW * (smallCol - 1) + x + extraX,
                            y: smallH / 2 + smallH * (smallRow - 1) + y
                        }
                    ]);
                }

                if (j % 3 === 0) {
                    smallRow++;
                    smallCol = 1;
                } else {
                    smallCol++;
                }
            }
            
            if (i % 2 === 0) {
                row++;
                col = 1;
            } else {
                col++
            }
        }

        return coordinates;
    }
}