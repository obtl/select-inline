(function($){
	$.fn.selectInline = function selectInline(options){
		if(options && options === "val"){
			//fonction de retour des valeurs
			return parseResult.call(this);
		}

		//default parameters for the pluggin.
		var defaultOptions = {
			labelRadioCss : "radio-inline",
			labelCheckboxCss: "checkbox-inline"
		};

		//Merge default options with options
        var opts = $.extend(defaultOptions, options);	

		return this.each(function(){
			var element = $(this);
			var id =  Math.floor(Math.random(999)*Math.random(999)*100);
			var isMultiple = element.prop("multiple");
			var type = isMultiple? "checkbox" : "radio";
			var name = isMultiple? "" : "name='radio" + id + "' ";
			var labelClass = isMultiple? opts.labelCheckboxCss : opts.labelRadioCss;

			//add a data-selectInline-id with id
			element.attr("data-selectinlineid", id);

			var html = "<div id ='selectinline-" + id + "'>";
			//parse select options to insert radios or checkbox
			element.find("option").each(function(){
				var currentOption = $(this);
				var currentValue = currentOption.attr("value");
				var checked = currentOption.prop("selected");

				if(currentValue !== undefined && currentValue !== null){
					html += "<label class='" + labelClass + "'>";
					html += "<input type='" + type + "' value='" + currentOption.attr("value") + "' " + name + (checked?"checked":"") +">";
					html += currentOption.text();
					html += "</label>";
				}
			});

			html += "</div>";
			//insert select inline after the current select
			element.after(html);
			//hide the current select element 
			element.hide();	
		});
	}

	function parseResult(){
		var selector = this;
		if(selector === undefined || selector.length === 0 || selector.length > 1){
			console.warn("unable to find a single value for selector");
			return null;	
		}
		var element = selector.first();
		var id = element.attr("data-selectinlineid");
		var isMultiple = element.prop("multiple");
		var result = [];
		$("div#selectinline-"+ id).find(":checked").each(function(){
			var currentValue = $(this).attr("value");
			if(currentValue !==undefined && currentValue !== null){
				result.push(currentValue);	
			}
		});

		if(!isMultiple){
			return result.length ===1? result[0] : null;
		}
		return result;
	}
})(jQuery);
