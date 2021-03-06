require('../../less/initial.less');
let ComponentBaseFacotry = require('../Components/ComponentBase.js');
let ComponentBarFacotry = require('../Components/ComponentBar.js');
let ComponentPolyLineFactory = require('../Components/ComponentPolyLine.js');
let ComponentPieFactory = require('../Components/ComponentPie.js');


let manage = {
    init (name = 'wrapper') {
        this.Container = $('<div/>').addClass(name).hide();
        $(document.body).append(this.Container);
        return this;
    },
    addPage (name = 'page') {
        this.page = $('<div class="section">').addClass(name);
        this.Container.append(this.page);
        this.page.append( this.addComponent({
            height: 40,
            text: '哈尔滨理工大学',
            css: {
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: -20,
                background: 'rgba(0, 0, 0, 0.7)',
                color: '#fff',
                textAlign: 'center',
                lineHeight: '20px',
            },
            animateIn: {
                bottom: 0,
            },
            animateOut: {
                bottom: -20,
            }
        }) );
        return this;
    },
    addComponent (config = {type: 'base'}) {
        let Component = null
        switch(config.type) {
            case 'bar': 
                    Component = ComponentBarFacotry(config);
                break;
            case 'poly':
                    Component = ComponentPolyLineFactory(config);
                break;
            case 'pie': 
                    Component = ComponentPieFactory(config);
                break;
            case 'base': 
            default:
                    Component = ComponentBaseFacotry(config);
                break;
        }
        this.page.append( Component );
        return this;
    },
    load () {
        this.Container.show();
        this.Container.fullpage({
            sectionsColor: ['yellow', 'blue', 'green', 'deeppink'],
            onLeave: function (index, nextIndex, direction) {
                $('.section').eq(index - 1).trigger('pageLeave');
            },
            afterLoad: function (anchor, index) {
                $('.section').eq(index - 1).trigger('pageLoad');
            }
        });

        $('.section').on('pageLeave', function () {
            // 找到 页面里所有组件 告诉他们可以离场
            $(this).find('.ComponentBase').trigger('leaveComponent');
        });

        $('.section').on('pageLoad', function () {
            // 找到 页面里所有组件 告诉他们可以入场
            $(this).find('.ComponentBase').trigger('loadComponent');
        });

        $('.section').eq(0).trigger('pageLoad');
    }
};
module.exports = manage;

