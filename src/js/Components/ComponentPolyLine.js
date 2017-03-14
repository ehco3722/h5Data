require('../../less/ComponentPolyLine.less');
let ComponentBaseFactory = require('./ComponentBase.js');

let ComponentPolyLineFactory = (config) => {
    let Component = ComponentBaseFactory(config).addClass('ComponentPolyLine');
    const Data = config.data;
    let oCanvas = $('<canvas/>').get(0);
    let oContext = oCanvas.getContext('2d');
    oCanvas.width = config.width;
    oCanvas.height = config.height;
    Component.append(oCanvas);
    oContext.beginPath();
    oContext.lineWidth = 2;
    oContext.strokeStyle = '#f00';

    let step = 10;

    for (let i = 0; i < step + 1; i++) {
        let y = config.height / step * i;
        oContext.moveTo(0, y);
        oContext.lineTo(config.width, y);
    }

    oContext.stroke();

    for (let i = 0; i < config.data.length + 2; i++) {
        let x = config.width / (config.data.length + 1) * i;
        oContext.moveTo(x, 0);
        oContext.lineTo(x, config.height);
    }

    oContext.stroke();

    let oTrueWidth = config.width / 2 / (config.data.length + 1);
    console.log(oTrueWidth)
    Data.forEach((ele, index) => {
        let oText = $('<div/>').addClass('text');    
        let x = oTrueWidth * (index + 1);
        console.log();
        oText.text(ele[0]).css({position: 'absolute', left: x, bottom: -20, width: oTrueWidth, marginLeft: -oTrueWidth / 2, textAlign: 'center'});

        Component.append(oText);
    })

    let oCav = $('<canvas/>').get(0);
    let oCt = oCav.getContext('2d');
    oCav.width = config.width;
    oCav.height = config.height;
    Component.append(oCav);
    function draw (per) {
        oCt.clearRect(0 , 0, config.width, config.height);
        oCt.beginPath();
        oCt.lineWidth = 2;
        oCt.strokeStyle = '#f00';
        //小圆点
        let onePosX = config.width / (config.data.length + 1);
        Data.forEach( (ele, index) => {
            var x = onePosX * (index + 1);
            var y = config.height *(1 - ele[1] * per );
            oCt.moveTo(x, y);
            oCt.arc(x, y, 5, 0, Math.PI * 2);
            oCt.stroke();
        });
        //阴影
        oCt.moveTo(onePosX, config.height *(1 - config.data[0][1] * per ));

        Data.forEach( (ele, index) => {
            var x = config.width / (config.data.length + 1) * (index + 1);
            var y = config.height *(1 - ele[1] * per);
            oCt.lineTo(x, y);
            oCt.stroke();
            if (index == config.data.length - 1) {
                oCt.lineTo(x, config.height);
                oCt.lineTo(onePosX, config.height);
                oCt.fillStyle = 'rgba(255, 0 , 0, 0.4)';
                oCt.fill();
            }
        });
        //文字
        Data.forEach( (ele, index) => {
            var x = onePosX * (index + 1);
            var y = config.height *(1 - ele[1] * per );
            oCt.moveTo(x, y);
            oCt.font = '30px Arial';
            oCt.fillStyle= ele[2];
            oCt.fillText(ele[1] * 100 + '%', x - 20, y - 20);
            oCt.stroke();
        });
    }
    
    draw(0) 

    Component.on('loadComponent', () => {
        var index = 0;
        setTimeout (() => {
            for (let i = 0; i < 100; i++) {
                setTimeout(() => {
                    index += 0.01;
                    draw(index)  
                }, i * 10);
            }
        }, 1000) 
    });


    Component.on('leaveComponent', () => {
        var index = 1;
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                index -= 0.01;
                draw(index)  
            }, i * 10)
        }
    });

   
    


    return Component;
}

module.exports = ComponentPolyLineFactory;