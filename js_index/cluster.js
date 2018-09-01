var dom4 = document.getElementById("container4");
var myChart4 = echarts.init(dom4);

var person_array=[];
person_array = [
    {value: 13, name: '第二外语日语-日语-熟练'},
    {value: 1, name: '出生_1994年'},
    {value: 10, name: "当前工资_10000"},
    {value: 5, name: '期望城市_崇安区'},
    {value: 10, name: "学历_硕士"},
    {value: 1, name: '工作经验一年'},
];
option4 = null;
myChart4.showLoading();
$.get('data/cluster.json', function (webkitDep) {

    myChart4.hideLoading();
    option4 = {
        // color:['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
        color:[
            '#be64a1', '#9291ff',  '#6462dc','#d48265', '#91c7ae','#749f83',
            '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3',
            '#c23531','#2f4554', '#61a0a8', '#EC407A',//前15，16个是数学
            '#aa5555', '#9f7664', '#5d7e68', '#2e3e32',  '#6a4625', '#5a4c49','#6996b3',
            '#4e65b7', '#067aa8', '#9e4f00', '#9CCC65','#d0c88a', '#383434', '#222d47',
            '#493154', '#253c4a',

        ],
        legend: {

            inactiveColor:"#5b5b5b",//未选中时文本的颜色
            selected:{
                "电子信息类":false, "语言文学类":false, "工商管理类":false,
                "机械类":false, "经济学类":true, "法学类":true,
                "管理科学与工程类":true, "交通运输类":true, "材料类":true,
                "哲学类":true, "环境科学与安全类":true, "仪器仪表类":true,
                "轻工纺织食品类":true, "化学类":true, "物理学类":false,
                "公共管理类":false, "数学类":false, "生物类":false,
                "土建类":false, "天文地质地理类":false, "艺术类":false,
                "制药工程类":false, "农业类":false, "历史学类":false,
                "公安技术类":false, "船舶与海洋工程类":false, "医学类":false,
                "图书档案学类":false, "武器类":false, "水利类":false, "力学类":false
            },

            // data: webkitDep.categories.name,
            icon: 'circle',
            textStyle: {//图例文字的样式
                color: '#eaf5ff',
                fontSize:"10",
            },

            // left:'center',
            // bottom:'10%',
            itemWidth:10,//图例的宽度
            itemHeight:10,//图例的高度
        },
        // toolbox: {show: true,
        //     feature: {
        //         dataView: {show: true, readOnly: true},
        //         restore: {show: true},
        //         saveAsImage: {show: true}
        //     }
        // },
        series: [{
            type: 'graph',
            layout: 'force',
            animation: true,
            draggable: true,
            animationDuration: 150,
            animationEasingUpdate: 'quinticInOut',
            // data: webkitDep.nodes,
            // symbolSize:30,
            data:  webkitDep.nodes.map(function (node,idx) {
                // console.log(idx);
                node.id = idx;
                node.symbolSize=10;
                return node;
            }),

            itemStyle: {
                symbolSize:30,
                normal: {
                    borderWidth: 1,
                    shadowBlur: 10,
                    opacity: 0.8,
                    shadowColor: 'rgba(0, 0, 0, 0.3)',
                },
                emphasis: {
                    borderColor: '#d0d0d0',
                    opacity: 0.5,
                    borderWidth: 20,
                    label:{show:true,position: 'right',formatter: '{b}', textStyle: {fontSize:"30",}},
                    addDataAnimation: true,
                },

                data:
                    myChart4.on('click', function (params) {
                        var index=params.data.id;
                        // console.log(params.data.id);//此处的data，id是添加在series中的，而不是加到json文件的nodes上，二不是加到webkitDep.nodes上
                        person_array = [

                            {value: webkitDep.nodes[index].lan_level, name: '第二外语水平_'+webkitDep.nodes[index].lan},
                            {value: 1, name: '出生_'+webkitDep.nodes[index]. Birthday+'年'},
                            {value: webkitDep.nodes[index].salary_lan, name: '当前工资_'+webkitDep.nodes[index].dr_salary},
                            {value: 1, name: '期望城市_'+webkitDep.nodes[index].dr_cty},
                            {value: webkitDep.nodes[index].edu_lan,name:webkitDep.nodes[index].edu},
                            // {value: 30, name: webkitDep.nodes[index].gender},
                            {value: webkitDep.nodes[index].work_lan, name: '工作经验_'+webkitDep.nodes[index].work},
                        ];
                        var gender_temp=webkitDep.nodes[index].gender;
                        option5.series[0].data = person_array;
                        option5.title.subtext="姓名："+params.name;
                        option5.series[1].data[0].name = gender_temp;

                        if(gender_temp=='男')
                            option5.series[1].color='#5355a2';
                        else
                            option5.series[1].color= '#d6a09e';

                        myChart5.clear();
                        myChart5.setOption(option5);
                }),
            },
            categories: webkitDep.categories,
            roam: true,

            force: {
                initLayout: 'circle',
                edgeLength: 1,
                repulsion: 20,
                gravity: 0.5
            },
            edges: webkitDep.links
        }]
    };
    myChart4.setOption(option4);
});
if (option4 && typeof option4 === "object") {
    myChart4.setOption(option4, true);
}
