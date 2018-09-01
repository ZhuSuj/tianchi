
var option2 = {
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        data:['总需求','python','java','web前端','其他']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data : ['计算机/电子','周二','周三','周四','周五','周六','周日']
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [

        {
            name:'python',
            type:'bar',
            stack: '公司需求量',
            data:[120, 132, 101, 134, 90, 230, 210]
        },
        {
            name:'java',
            type:'bar',
            stack: '公司需求量',
            data:[220, 182, 191, 234, 290, 330, 310]
        },
        {
            name:'web',
            type:'bar',
            stack: '公司需求量',
            data:[150, 232, 201, 154, 190, 330, 410]
        },

        {
            name:'python',
            type:'bar',
            // barWidth : 5,
            stack: '求职申请',
            data:[620, 732, 701, 734, 1090, 1130, 1120]
        },
        {
            name:'java',
            type:'bar',
            stack: '求职申请',
            data:[120, 132, 101, 134, 290, 230, 220]
        },
        {
            name:'前端web',
            type:'bar',
            stack: '求职申请',
            data:[60, 72, 71, 74, 190, 130, 110]
        },
        {
            name:'其他',
            type:'bar',
            stack: '求职申请',
            data:[62, 82, 91, 84, 109, 110, 120]
        }
    ]
};
