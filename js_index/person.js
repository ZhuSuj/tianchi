var dom5 = document.getElementById("container5");
var myChart5 = echarts.init(dom5);

option5 = null;
myChart5.showLoading();

$.get('data/cluster.json', function (json) {
    myChart5.hideLoading();
option5 = {
color:['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',
    '#bda29a','#6e7074',
    '#546570', '#c4ccd3'],
    title : {

        text: '求职者信息',
        subtext: '姓名：小李',
        x:'center',
        y:'1%',
        textStyle: {
            color: '#5b5b5b',
            fontSize:"20",
        },
        subtextStyle: {
            color: '#6c6c6c',
            fontSize:"20",
        },
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {

        icon: 'circle',
        inactiveColor:"#5b5b5b",//未选中时文本的颜色
        itemWidth:10,//图例的宽度
        itemHeight:10,//图例的高度
        x : 'center',
        y : '0%',
        data:['学历','专业','年龄','期望城市','期望职位','外语水平','性别','工作经验'],
        textStyle: {
            color: '#eaf5ff',
            fontSize:"10",
        }
    },
    toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {
                show: true,
                type: ['pie', 'funnel']
            },
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    addDataAnimation: true,
    series : [
        {
            name:'求职者信息',
            type:'pie',
            radius : [30, 110],
            center : ['50%', '50%'],
            roseType : 'area',
            data: person_array,
        },
        {

            type:'pie',
            radius: ['0%', '10%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    position: 'center',
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold',
                        color: '#fafafa',
                    }
                },
            },
        data: [{value:json.nodes[1].value, name:'女'}],
        }
    ]
}
    myChart5.setOption(option5);

});
if (option5 && typeof option5 === "object") {
    myChart5.setOption(option5, true);
}