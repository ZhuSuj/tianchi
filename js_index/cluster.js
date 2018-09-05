var dom4 = document.getElementById("container4");
var myChart4 = echarts.init(dom4);

var person_array=[];
person_array = [
    {value: 2, name: '期望职位_销售工程师'},
    {value: 2, name: '期望城市_崇安区'},
    {value: 2, name: '出生_1994年'},
    {value: 9, name: "当前工资_10000"},
    {value: 10, name: "期望工资_1200"},
    {value: 10, name: "学历_硕士"},
    {value: 3, name: '工作经验三年'},
    {value: 13, name: '第二外语-日语-熟练'},
];

option4 = null;
myChart4.showLoading();
$.get('data/cluster.json', function (webkitDep) {
    var borderradius=Math.random();
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
                "公共管理类":true, "数学类":true, "生物类":false,
                "土建类":false, "天文地质地理类":true, "艺术类":false,
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
        series: [
            {
                left:'0%',
                top: '8%',
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
                    var sum_level=(webkitDep.nodes[idx].now_salary_lan  +  webkitDep.nodes[idx].dr_salary_lan  +  (webkitDep.nodes[idx].edu_lan*3)  +  webkitDep.nodes[idx].work_lan  +  webkitDep.nodes[idx].lan_level)/2.9
                    node.symbolSize=sum_level;//元的大小表示这个人的平均能力水平:当前薪资，期望薪资，学历，工作经验，外语等
                    return node;
                }),
                itemStyle: {
                    normal: {
                        borderWidth: 2,
                        // borderOpacity:0.5,
                        // borderColor:
                        // // 颜色渐变
                        //     new echarts.graphic.LinearGradient(
                        //     0, 0.5, 0.5, 1,// 渐变起始点x坐标，渐变起始点y坐标，渐变结束点x坐标，渐变结束点y坐标
                        //         [
                        //         {offset: borderradius, color: '#333edf'},
                        //         {offset: borderradius, color: '#000'},
                        //         {offset: borderradius, color: '#000'}
                        //     ]),


                        shadowBlur: 5,
                        shadowColor: 'rgba(0, 0, 0, 0.3)',
                    },
                    emphasis: {
                        borderColor: '#d0d0d0',
                        opacity: 0.5,
                        borderWidth:15,
                        label:{show:true,position: 'right',formatter: '{b}', textStyle: {fontSize:"30",}},
                        addDataAnimation: true,
                    },
                    data:
                        myChart4.on('click', function (params) {
                            var index=params.data.id;
                            // console.log(params.data.id);//此处的data，id是添加在series中的，而不是加到json文件的nodes上，二不是加到webkitDep.nodes上

                            console.log(params);
                            person_array = [
                                {value: 2, name: '期望职位_'+webkitDep.nodes[index].dr_aim_job},
                                {value: 2, name: '期望城市_'+webkitDep.nodes[index].dr_cty},
                                {value: 2, name: '出生_'+webkitDep.nodes[index]. Birthday+'年'},
                                {value: webkitDep.nodes[index].now_salary_lan, name: '当前工资_'+webkitDep.nodes[index].now_salary},
                                {value: webkitDep.nodes[index].dr_salary_lan, name: '期望工资_'+webkitDep.nodes[index].dr_salary},
                                {value: webkitDep.nodes[index].edu_lan,name:'学历_'+webkitDep.nodes[index].edu},
                                {value: webkitDep.nodes[index].work_lan, name: '工作经验_'+webkitDep.nodes[index].work},
                                {value: webkitDep.nodes[index].lan_level, name: '第二外语水平_'+webkitDep.nodes[index].lan},
                                // {value: 1, name: webkitDep.nodes[index].gender},

                                // "now_salary":"4-5万","now_salary_lan":4,"dr_salary":"3000-4499","dr_salary_lan":4,"d




                            ];
                            var gender_temp=webkitDep.nodes[index].gender;
                            option5.series[0].data = person_array;
                            option5.title.subtext="姓名："+params.name
                            // option5.title.subtext="姓名："+params.name+'\n+期望职位_'+params.data.dr_job;
                            option5.series[1].data[0].name = gender_temp;

                            if(gender_temp=='男')
                                option5.series[1].color='#546570';
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
                    edgeLength: 3,
                    repulsion: 30,
                    gravity: 0.4
                },
                edges: webkitDep.links
            },

        ]
    };
    myChart4.setOption(option4);
});
if (option4 && typeof option4 === "object") {
    myChart4.setOption(option4, true);
}
