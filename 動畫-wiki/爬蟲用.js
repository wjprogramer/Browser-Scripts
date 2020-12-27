// !!!這邊需要隨頁面改!!!
var yearOfCurrentPage = 2000;

// for debug
var startTableIndex = 1;
var endTableIndex = 2;

/**
insert into works(name, chinese_name, episodes, comment, start_datetime, end_datetime, studio_id) 
values
	('テスト', '測試用', 10, 'Comment', '2020-11-22 21:21:21.4', null, 1),
	('テスト', '測試用', 10, 'Comment', '2020-11-22 21:21:21.4', null, 1);
*/
var querySyntax = 'insert into works(name, chinese_name, episodes, comment, start_datetime, end_datetime, studio_id) values ';
var tables = $('.wikitable');

var columnNameOf = {
	// 需處理
	"開始日－結束日": "time_range",
	"製作公司": "studio_id",
	// 不須處理、簡易處理
	"話數": "episodes",
	"作品名": "chinese_name",
	"原名": "name",
	"發售日期": "start_datetime",
	"上映日": "start_datetime",
};

function convertrowContent(colName, tdText) {
	if (tdText == undefined || tdText == "") {
		return undefined
	}
	switch(colName) {
		case "time_range":
			return "";
		case "start_datetime":
		case "end_datetime":
			return convertDateTime(tdText);
		case "episodes":
			return tdText.replace("話", "");
		case "chinese_name":
		case "name":
		case "studio_id":
			return tdText;
	}
	return tdText;
}

function convertDateTime(date) {
	if (date == undefined || date == "") {
		return date;
	}

	var yearIndex = date.indexOf("年");
	var monthIndex = date.indexOf("月");
	var dayIndex = date.indexOf("日");

	var year = undefined;
	var month = undefined;
	var day = undefined;

	var result = "";

	if (yearIndex != -1) {
		year = date.substring(0, yearIndex)
	}

	if (monthIndex != -1) {
		var startIndex = yearIndex != -1 
			? (yearIndex + 1) : 0;
		month = date.substring(startIndex, monthIndex).padStart(2, 0)
	}

	if (dayIndex != -1) {
		day = date.substring(monthIndex + 1, dayIndex)
	}

	if (year == undefined) {
		year = yearOfCurrentPage;
	}

	if (day == undefined) {
		day = "01"
	} else {
		day = day.padStart(2, 0)
	}

	result = `${year}-${month}-${day} 00:00:00.0`;

	return result
}

for (var i in tables) {

	if (startTableIndex != undefined && i < startTableIndex) {
		continue;
	}

	if (endTableIndex != undefined && i >= endTableIndex) {
		break;
	}

	console.log(`Table ${i}`);

	var columns = [];
	var rowContents = [];

	var table = tables[i];
	if (table.tBodies == undefined) {
		continue;
	}
	var tbody = table.tBodies[0];
	var rows = tbody.children;

	for (var ri in rows) {
		var row = rows[ri];

		if (ri == 0) {
			var ths = row.children;
			for (var thi in ths) {
				var th = ths[thi];
				var columnName = th.innerHTML?.trim()?.replace("\n", "");
				if (columnName != undefined) {
					columns.push(columnNameOf[columnName]);					
				}
			}
		} else {
			var tds = row.children;
			var rowContent = {};
			for (var tdi in tds) {
				var td = tds[tdi];
				// console.log(td);
				if (td == undefined || td.innerHTML == undefined) break;
				var colName = columns[tdi];
				var v = td.textContent?.trim().replace("\n", "");
				if (colName == "time_range") {
					var range = v.split('－');
					rowContent['start_datetime'] = convertDateTime(range[0]);
					rowContent['end_datetime'] = convertDateTime(range[1]);
				} else {
					rowContent[colName] = convertrowContent(colName, v);						
				}
			}
			rowContents.push(rowContent);
		}
	}

	// console.log(rowContents);
}


var tmpString = "";

rowContents.forEach((e) => {
	for (var i in e) {
		tmpString += `${i} ${e[i]}, `
	}
	tmpString += "\n";
});

console.log(tmpString);


