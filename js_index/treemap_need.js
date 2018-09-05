var dom2 = document.getElementById("container1");
var myChart2 = echarts.init(dom2);
var app = {};
option = null;
var uploadedDataURL = "data/need.json";
myChart2.showLoading();
$.getJSON(uploadedDataURL, function (rawData) {
    myChart2.hideLoading();
    function convert(source, target, basePath) {
        for (var key in source) {
            var path = basePath ? (basePath + '.' + key) : key;
            if (key.match(/^\$/)) {
            }
            else {
                target.children = target.children || [];
                var child = {
                    name: path
                };
                target.children.push(child);
                convert(source[key], child, path);
            }
        }

        if (!target.children) {
            target.value = source.$count || 1;
        }
        else {
            target.children.push({
                name: basePath,
                value: source.$count
            });
        }
    }

    var data = [];

    convert(rawData, data, '');

    myChart2.setOption(option = {
        title: {
            text: '公司需求量',
            textStyle: {
                color: '#5b5b5b',
                fontSize:"15",
            },
            subtext: ' ',
            left: 'leafDepth'
        },
        tooltip: {},
        series: [{
            name: 'option',
            type: 'treemap',
            visibleMin: 300,
            data: data.children,
            leafDepth: 2,
            levels: [
                {
                    itemStyle: {
                        normal: {
                            borderColor: '#555',
                            borderWidth: 4,
                            gapWidth: 2
                        }
                    }
                },
                {
                    colorSaturation: [0.3, 0.6],
                    itemStyle: {
                        normal: {
                            borderColorSaturation: 0.7,
                            gapWidth: 2,
                            borderWidth: 2
                        }
                    }
                },
                {
                    colorSaturation: [0.3, 0.5],
                    itemStyle: {
                        normal: {
                            borderColorSaturation: 0.6,
                            gapWidth: 100000000
                        }
                    }
                },
                {
                    colorSaturation: [0.3, 0.5]
                }
            ]
        }]
    })
});;
if (option && typeof option === "object") {
    myChart2.setOption(option, true);
}