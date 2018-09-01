var dom3 = document.getElementById("container2");
var myChart3 = echarts.init(dom3);
var app3 = {};
option3 = null;
var uploadedDataURL1 = "data/apply.json";
myChart3.showLoading();
$.getJSON(uploadedDataURL1, function (rawData3) {
    myChart3.hideLoading();
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

    var data3 = [];
    convert(rawData3, data3, '');
    myChart3.setOption(option3 = {
        title: {
            text: '求职者数目',
            textStyle: {
                color: '#5b5b5b',
                fontSize:"15",
            },
            subtext: ' ',
            left: 'leafDepth'
        },
        tooltip: {},
        series: [{
            name: 'option3',
            type: 'treemap',
            visibleMin: 300,
            data: data3.children,
            leafDepth: 3,
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
if (option3 && typeof option3 == "object") {
    myChart3.setOption(option3, true);
}