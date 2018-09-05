var dom7 = document.getElementById("container7");
var myChart7 = echarts.init(dom7);
var option7 = null;
myChart7.showLoading();
$.get('data/wuxi.json', function (geoJson) {
    myChart7.hideLoading();
    var province =  ['滨湖区', '北塘区', '惠山区', '锡山区','南长区', '崇安市', '江阴市', '宜兴市'];
    var gdp = [
        //['男','女','总人数']
        [97, 73,170],
        [48, 26,74],
        [3, 5,8],
        [331, 298,629],
        [105, 54,159],
        [533, 686,1219],
        [1, 0,1],
        [1, 1,2],
    ]
    var typeIndex = 1;
    var data = [];
    var name = "无锡市求职者男女比例概览"
    for (var i = 0; i < province.length; i++) {
        data.push({
            "name": province[i],
            "value": [{
                "name": '女',
                value: gdp[i][1]
            },
                {
                    "name": '男',
                    value: gdp[i][0]
                }
            ]
        })
    }
    var geoCoordMap = { //为了保证饼图不互相重叠，我对经纬坐标进行了调整
        '滨湖区': [120.262887,31.455631],
        '北塘区': [120.250926,31.602849],
        '惠山区': [120.214608,31.645616],
        '锡山区': [120.496375,31.604209],
        '南长区': [120.310287, 31.544811],
        '崇安市': [120.332237, 31.59349],
        '江阴市': [120.332327,31.83968],
        '宜兴市': [119.82,31.35],
    }

    function resetPie(myChart7, params, geoCoordMap, typeIndex) {
        var op = myChart7.getOption();
        var ops = op.series;
        ops.forEach(function (v, i) {
            if (i > 0) {
                var geoCoord = geoCoordMap[v.name];
                var p = myChart7.convertToPixel({
                    seriesIndex: 0
                }, geoCoord);
                v.center = p;
                if (params != 0 && params.zoom) {
                    v.radius = v.radius * params.zoom;
                }
                if (params != 0 && params.selected) {
                    var rangeFirstNumber = params.selected[0];
                    var rangeSecondNumber = params.selected[1];
                    var pd = v.data[typeIndex].value;
                    if (pd < rangeFirstNumber || pd > rangeSecondNumber) {
                        v.itemStyle.normal.opacity = 1;
                    } else {
                        v.itemStyle.normal.opacity = 0.8;
                    }
                }
            }
        });
        myChart7.setOption(op, true);
    }
    echarts.registerMap('HK', geoJson);
    /*addPie*/
    function addPie(chart, data) {
        var op = chart.getOption();
        var sd = option7.series;
        for (var i = 0; i < data.length; i++) {
            var randomValue =9;
            var radius = randomValue;
            var geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
                var vr = [];
                (data[i].value).map(function (v) {
                    vr.push({
                        name: v.name,
                        value: v.value,
                        visualMap: false
                    }); //饼图的数据不进行映射
                });
                var p = chart.convertToPixel({
                    seriesIndex: 0
                }, geoCoord);
                sd.push({
                    name: data[i].name,
                    type: 'pie',
                    // roseType: 'radius',
                    tooltip: {
                        formatter: function (params) {
                            return params.seriesName + "<br/>" + params.name + " : " + params.value + '个人';
                        }
                    },
                    radius: radius,
                    center: p,
                    data: vr,
                    zlevel: 4,
                    tooltip: {
                        formatter: '{a}<br/>{b}: {c}个人 ({d}%)'
                    },
                    label: {
                        normal: {
                            show: false,
                        },
                    },
                    labelLine: {
                        normal: {
                            show: true
                        }
                    },
                    itemStyle: {
                        opacity: 0.8
                    },

                });
            }
        }
        return sd;
    };
    // addBar(myChart7,data);
    myChart7.setOption(option7 = {
        title: {
            text: name,
            left: 'center',
            textStyle: {
                color: '#5b5b5b'
            }
        },
        legend: {
            data: [ '男', '女'],
            orient: 'vertical',
            top: '10%',
            left: 'right',
            zlevel: 4,
            textStyle:{
                color:"#5b5b5b",
            }
        },
        toolbox: {
            feature: {
                saveAsImage: {
                    pixelRatio: 5
                }
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: function (params) {
                if (params.value) {
                    return  "总人数: " + params.value + "个";
                }
            }
        },
        visualMap: {
            type: 'continuous',
            show: true,
            min: 1,
            max: 1200,
            left: 'right',
            top: 'bottom',
            text: ['人数    (个)'], // 文本，默认为数值文本
            textStyle:{
                color:"#5b5b5b",
            },
            calculable: true,
            // seriesIndex: [0],
            inRange: {
                color: ['#eaf5ff', '#ff0df5'] // 蓝绿
                // color: ['#eaf5ff', '#ff0df5'] // 蓝绿

            },

        },
        series: [
            {
                roam:true,
                name: '无锡人口密度',
                type: 'map',
                mapType: 'HK', // 自定义扩展图表类型
                itemStyle:{
                    normal:{
                        label:{                   //各区的名字样式
                            show:true,
                            color: 'black',
                            fontSize:8,
                            opacity:0.6
                        },
                        color: 'black',
                        opacity:0.5
                    },
                    emphasis:{
                        label:{show:true},

                    },
                },

                data:[
                    {name: '滨湖区', value: 170},
                    {name: '北塘区', value: 74},
                    {name: '惠山区', value: 8},
                    {name: '锡山区', value: 629},
                    {name: '南长区', value: 159},
                    {name: '崇安区', value: 1219},
                    {name: '江阴市', value: 1},
                    {name: '宜兴市', value: 2},
                    //注：无锡市1303，男861，女442，因为数据没有说明具体的地区所以就线放着
                ],
                // 自定义名称映射
                nameMap: {
                    '滨湖区': '滨湖区',
                    '北塘区': '北塘区',
                    '惠山区': '惠山区',
                    '锡山区': '锡山区',
                    '南长区': '南长区',
                    '宜兴市': '宜兴市',
                    '崇安区': '崇安区',
                    '江阴市': '江阴市',
                }
            },
        ]
    });
    addPie(myChart7, data);
    /*饼图跟着地图移动:pie*/
    myChart7.on('georoam', function (params) {
        resetPie(myChart7, params, geoCoordMap, typeIndex);
    });
    myChart7.on('datarangeselected', function (params) {
        resetPie(myChart7, params, geoCoordMap, typeIndex);
    });
    window.addEventListener("resize", function () {
        myChart7.resize();
        resetPie(myChart7, 0, geoCoordMap);
    })
    if (option7 && typeof option7 === "object") {
        myChart7.setOption(option7, true);
    };
});
