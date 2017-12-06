function taoFormNhapLieu(soDiem){
	//alert(soDiem);
	var txt='';
	var startSpan='<span id="nhaplieu">';
	var endSpan='</span>';
	var index=0;
	for(var i=0;i<soDiem;i++)
	{
		txt+=startSpan;
		txt+='Điểm '+ (i+1)+': X: ';
		txt+='<input type="number" id="'+index+'">  ';
		txt+='Y: <input type="number" id="'+(index+1)+'">'
		txt+=endSpan + '<br>';
		index+=2;
	}
	return txt;
}
function createData(soDiem){
	var data_=[];
	var index=0;
	for(var i=0;i<soDiem;i++){
		var temp = new Object();
		temp.x=parseFloat(document.getElementById(index).value);
		temp.y=parseFloat(document.getElementById(index+1).value);
		temp.cumBelongTo=0;
		data_.push(temp);
		index+=2;
	}
	return data_;
}

function createCumData(soCum,data){

	var cumData=[];
	for(var i=0;i<soCum;i++){
		var temp= new Object();
		temp.center={x:data[i].x,y:data[i].y};
		temp.points=[];
		temp.points_old='';
		if(i==0){
			var txt=''
			for(var j=0;j<data.length;j++){
				temp.points.push(j);
				txt+=j;
			}
			temp.points_old=txt;	
		}
		cumData.push(temp);

	}
	return cumData;

}

function distance(point1,point2){
	return Math.sqrt((point1.x-point2.x)*(point1.x-point2.x)+(point1.y-point2.y)*(point1.y-point2.y));
}

function timTrongMang(x,array){
	return array.indexOf(x);
}

function timNewCenter(cumi,data){

	if (cumi.points.length==0){
	// khon co phan tu nao de tinh trung tam moi
		return cumi.center;
	}
	var totalx=0;
	var totaly=0;
	for(var i=0;i<cumi.points.length;i++){
		var index=cumi.points[i];
		totalx+=data[index].x;
		//alert('type: '+typeof(totalx));
		totaly+=data[index].y;
	}
	
	totalx=totalx/cumi.points.length;
	totaly=totaly/cumi.points.length;

	// tra ve trong tam moi
	
	return {
		x:totalx,
		y:totaly
	}
}
function trinhBayKetQua(data,cum){
	var txt='';
	for(var i=0;i<cum.length;i++){
		txt+='<h3>'
		txt+='Cụm '+(i+1)+': '
		for(var j=0;j<cum[i].points.length;j++){
			var index= cum[i].points[j];
			txt+=' Điểm '+(index+1)+':';
			txt+='{ '+data[index].x+', '+data[index].y+' }'
		}
		txt+='</h3>'
	}
	return txt;
}