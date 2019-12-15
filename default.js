(function ($) {
	var arr = [];
	var index = 0;
	 this.createElement = function (elementType, className) {
        var element = document.createElement(elementType);

        if (typeof className === "string" && className !== "") {
            element.className = className;
        }

        return element;
    };

	this.createHeader = function (columns){
		var columnContainer = createElement("thead");
		var columnTrContainer = createElement("tr");
		
		var orderItem = createElement("th");
		orderItem.textContent = "#";
		columnTrContainer.append(orderItem);
        for (var i = 0; i < columns.length; i++) {
			var columnItem = createElement("th");
			columnItem.textContent = columns[i];
            columnTrContainer.append(columnItem);
        }
		columnContainer.append(columnTrContainer);
		return columnContainer;
	}
	
	this.createRowItem = function (rowItem, isChild, innerIndex){
	

	var i = 0;
	var rLength = rowItem.length;
		for (0; i < rLength; i++) {
			var rowContainer;
			var rowTrContainer;
			var actionItem = createElement("td","hvr");
			if(isChild){
				var indexId = "group-of-rows-"+ innerIndex;
				rowContainer = createElement("tbody","collapse");
				rowContainer.setAttribute("id",indexId);
				rowTrContainer = createElement("tr");
				actionItem.textContent = "#";
			}else{
				index++;		
				actionItem.textContent = "+/-";
				actionItem.addC
				var indexId = "group-of-rows-"+ index;
				var target = "#group-of-rows-"+ index;
				rowContainer = createElement("tbody");
				rowTrContainer = createElement("tr","clickable");
				rowTrContainer.setAttribute("data-toggle","collapse");
				rowTrContainer.setAttribute("data-target",target);
				rowTrContainer.setAttribute("aria-expanded","false");
				rowTrContainer.setAttribute("aria-controls",indexId);
			}

			rowTrContainer.append(actionItem);
		
			$.each(rowItem[i], function (key, value) {
				if(key != "child" && key != "childs"){
					var rowItemElement = createElement("td");
					rowItemElement.textContent = value;
					rowTrContainer.append(rowItemElement);
				}
                
            });
			rowContainer.append(rowTrContainer);
			arr.push(rowContainer);
			if(rowItem[i].child){
				var row = createRowItem(rowItem[i].childs, true, index);
			}
        }
		return arr;
	}
	
    $.fn.tableCreater = function (data) {
		
		var columns = data.columns;
		var rowItem = data.data;	
		
        var container = createElement("table","table table-responsive table-hover");		
		
		container.append(createHeader(columns));
		var arri = createRowItem(rowItem);
		for(var i =0;i<arri.length;i++){
			container.append(arri[i]);
		}
		
		this.append(container);
    };

}(jQuery));