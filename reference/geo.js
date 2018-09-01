var map = new BMap.Map("container7");
map.centerAndZoom(new BMap.Point(120.10, 31.52), 10);
map.addControl(new BMap.NavigationControl({type: BMAP_NAVIGATION_CONTROL_SMALL}));
map.enableScrollWheelZoom();
setTimeout("getBoundary()",1000);
getBoundary();
function getBoundary(){
    click();
}
function click(){

    var bdary = new BMap.Boundary();
    var name = ["锡山区","惠山区","滨湖区","梁溪区","新吴区","宜兴市","江阴市"];
    for(var j = 0; j <7; j++){

        bdary.get(name[j], function(rs){       //获取行政区域
            // map.clearOverlays();        //清除地图覆盖物
            var count = rs.boundaries.length; //行政区域的点有多少个
            for(var i = 0; i<count; i++){
                var ply = new BMap.Polygon(rs.boundaries[i], {strokeWeight: 2, strokeColor: "#ff0000"}); //建立多边形覆盖物
                map.addOverlay(ply);  //添加覆盖物
            }
        });
    }


}
