var dom1 = document.getElementById("container3");
var myChart1 = echarts.init(dom1);
option1 = null;
var category = [];
for (var i = 0; i < 60; i++) {
    category.push(i)
}
category=[
    "办公用品及设备", "保险", "电力/水利", "电子技术/半导体/集成电路",
    "多元化业务集团公司", "房地产/建筑", "服务业", "服装/纺织/皮革", "公关/市场推广/会展", "广告/媒体",

    "航天/航空", "互联网/电子商务", "环保", "会计/金融/银行/保险", "会计/审计", "机械/设备/重工",
    "计算机/互联网/通信/电子", "计算机服务(系统、数据服务，维修)", "计算机软件", "计算机硬件",

    "家具/家电/工艺品/玩具", "检测，认证", "交通/运输/物流", "教育/培训", "金融/投资/证券",
    "酒店/旅游", "快速消费品(食品,饮料,化妆品)", "贸易/进出口", "贸易/消费/制造/营运", "能源/原材料",

    "批发/零售", "其他行业", "汽车及零配件", "石油/化工/矿产/地质", "通信/电信/网络设备/增值服务", "网络游戏",
    "文字媒体/出版", "物流/运输", "物业管理/商业中心", "学术/科研",

    "医疗设备/器械/护理/保健", "仪器仪表/工业自动化", "印刷/包装/造纸", "影视/娱乐/体育", "原材料和加工",
    "政府/非赢利机构/其他", "制药/生物工程/医疗", "中介服务", "专业服务(咨询，人力资源)", "技术研发经理/主管/品质经理/人事主管",

    "111"
];
var barData=
    [
        14, 5 , 2 , 3 , 555 , 3 , 16 , 18 , 27 , 5 , 36 , 1 , 95 , 3 , 182 , 304 , 646 , 23 , 70 , 48 ,
        8 , 11 , 4 , 4 , 12 , 42 , 1 , 23 , 809 , 80 ,
        14 , 3 , 42 , 1 , 137 , 11 , 6 , 30 , 8 , 1 ,
        4 , 138 , 48 , 1 , 3 , 1 , 6 , 1 , 23 , 1 ,
        36 ,

    ]
var lineData=
    [
        42 , 0 , 0 , 13 , 228 , 16 , 9 , 5 , 9 , 0 , 7 , 0 , 9 , 61 , 4 , 958 , 245 , 8 , 7 , 2 ,
        5 , 6 , 10 , 86 , 2 , 1 , 1 , 8 , 194 , 240 ,
        1 , 70 , 602 , 42 , 63 , 0 , 0 , 37 , 1 , 9 ,
        61 , 100 , 0 , 23 , 3 , 0 , 70 , 7 , 74 , 1 ,
        23 ,

    ]

option1 = {

    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: ['公司招聘', '求职者数目'],
        textStyle: {
            color: '#ccc'
        }
    },

    xAxis: {
        data: category,
        axisLabel: {
            show: true,
            // showMaxLabel: true,
            // showMinLabel: true,
            // interval:0,
            textStyle: {
                color: '#fff',
                fontSize:"8",
            }
        },
        axisLine: {
            show: true,
            lineStyle: {
                color: '#ccc'
            },
        },
    },

    yAxis: {
        splitLine: {show: false},
        axisLine: {
            lineStyle: {
                color: '#ccc'
            }
        }
    },
    series: [{
        x:"1%",
        // name: '公司招聘',
        type: 'line',
        smooth: true,
        showAllSymbol: true,
        symbol: 'emptyCircle',
        symbolSize: 5,//小点点的半径
        color: 'rgba(212, 49, 74, 0.8)' ,//线条透明度
        opacity:0.3,
        data: lineData
    }, {
        // name: '求职者数目',
        type: 'bar',
        barWidth: 5,
        itemStyle: {
            normal: {
                barBorderRadius: 8,
                color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                        {offset: 0, color: '#14c8d4'},
                        {offset: 1, color: '#43eec6'}
                    ]
                )
            }
        },
        data: barData
    }, {
        name: 'line',
        type: 'bar',
        barGap: '-100%',
        barWidth: 5,
        itemStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                        {offset: 0, color: 'rgba(20,200,212,0.5)'},
                        {offset: 0.2, color: 'rgba(20,200,212,0.2)'},
                        {offset: 1, color: 'rgba(20,200,212,0)'}
                    ]
                )
            }
        },
        z: -12,
        data: lineData
    }, {
        name: 'dotted',
        type: 'pictorialBar',
        symbol: 'rect',
        itemStyle: {
            normal: {
                color: '#0f375f'
            }
        },
        symbolRepeat: true,
        symbolSize: [12, 4],
        symbolMargin: 1,
        z: -10,
        data: lineData
    }]
};;
if (option1 && typeof option1 === "object") {
    myChart1.setOption(option1, true);
}