function kmean(data,cum){
	//alert(JSON.stringify(cum));
	//khoi tao, phan cum moi cho cac point trong data.
	for(var i=0;i<data.length;i++){
		// tim chi so cum va distance noi point se thuoc ve
		var index_cum=0;
		var distanceValue=distance(data[i],cum[index_cum].center);
		//var distanceValue=distance({x:1,y:2},{x:1,y:5});
		//alert(distanceValue);
		for(var j=1;j<cum.length;j++){
			var temp=distance(data[i],cum[j].center);
			if(temp<distanceValue){
				index_cum=j;
				distanceValue=temp;
			}
		}
		// da tim duoc cum cho point
		//alert(index_cum);
		//gan idpoint vao cum moi va xoa idpoint khoi cum cu
		if(data[i].cumBelongTo!=index_cum){
			cum[index_cum].points.push(i);
			var index_i_cum_cu=timTrongMang(i,cum[data[i].cumBelongTo].points);
			cum[data[i].cumBelongTo].points.splice(index_i_cum_cu, 1);
			data[i].cumBelongTo=index_cum;
		}
	}//khoi tao xong

	//update points_old
	var stop=0;
	for(var i=0;i<cum.length;i++){
		var txt='';
		for(var j=0;j<cum[i].points.length;j++){
			txt+=cum[i].points[j];
		}
		if(cum[i].points_old==txt){
			stop++;
		}
		cum[i].points_old=txt;
	}
	if(stop==cum.length){
		//alert(JSON.stringify(cum));
		return cum;
	}
	
	//chuong trinh khong dung, tim tronng tam moi cho cac cum
	for(var i=0;i<cum.length;i++){
		cum[i].center=timNewCenter(cum[i],data);
	}
	//de quy
	
	kmean(data,cum);


}