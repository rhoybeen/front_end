/**
 * Build a row for table using a given data array
*/
function buildTableRow(rowData) {
    var row = '<tr>';
    for (var i = 0; i < rowData.length; ++ i) {
        row += ('<th>' + rowData[i] + '</th>');
    }
    row += '</tr>';
    return $(row);
}

/**
 * Set the error message for a given control group
 * The control group should have a span with class contain
 * error-alert-message.
*/
function setControlGroupErrorMessage(controlGroup, msg) {
    var errorAlert = controlGroup.find('.error-alert-message');
    errorAlert.html(msg);
}

/**
 * Show the error message for a given control group
 * The control group should have a span with class contain
 * error-alert-message.
*/
function showControlGroupError(controlGroup, msg) {
    setControlGroupErrorMessage(controlGroup, msg);
}

/**
 * Clear and hide the error message for a given control group
 * The control group should have a span with class contain
 * error-alert-message.
*/
function clearControlGroupError(controlGroup) {
    setControlGroupErrorMessage(controlGroup, '');
}

/**
 * Get the selected value of the given select.
*/
function getSelectedValue(select) {
    return select.find('option:selected').attr('value');
}

/**
 * Get the selected text of the given select.
*/
function getSelectedText(select) {
    return select.find('option:selected').text();
}

/**
 * Validate the given select, make sure the value is not empty
*/
function validateSelect(select) {
    var selectedValue = getSelectedValue(select);
    return (typeof(selectedValue) == 'string' && selectedValue != '') ? true : false;
}

/**
 * Reset the select value to empty and text to 'Select'
*/
function resetSelect(select, addDefault) {
    select.find('option').remove();
    if (addDefault != null) {
        select.append('<option>' + addDefault + '</option>');
    }
}

/**
 * set the select value from Map
 * key is for backend logic
 * value is user friendly name
*/
function setSelectOptionFromMap(select, map, optionVal, addDefault) {
    resetSelect(select, addDefault);
    for(var key in map) {
        select.append('<option value="' + key + '" >' + map[key] + '</option>')
    }

    if (optionVal in map) {
        select.val(optionVal);
        select.data('init', select.val());
    } else {
        select.data('init', '');
    }
}

function setSelectOption(select, list, value, addDefault) {
    resetSelect(select, addDefault);
    var index = $.inArray(value, list);
    for (var i = 0; i < list.length; ++ i ) {
        var poaOption = list[i];
        select.append('<option value="' + poaOption + '" >' + poaOption + '</option>')
    }

    if (index != -1) {
        select.val(list[index]);
        select.data('init', select.val());
    } else {
        select.data('init', '');
    }

}

/**
 * Feed data to a select. And the data is for select text.
*/
function feedDataToSelect(select, data) {
    if (typeof(data) == 'undefined') return;
    for (var i = 0; i < data.length; ++ i) {
        select.append('<option>' + data[i] + '</option>');
    }
}

function setSelectByText(select, text) {
    if (typeof(select) != 'object' || typeof(text) != 'string') return;
    select.val(text);
}

function getDataFromDataTable(dataTable) {
    if (typeof(dataTable) != 'object') return [];
    return dataTable.data();
}

function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};

function isNonEmptyString(str) {
    return validate.isString(str) && str.length > 0;
}

function isEmptyString(str) {
    return !isNonEmptyString(str);
}

function checkNumber(number) {
    return (/^(0|[1-9][0-9]*)\.?[\d]*$/g.test(number)) && !isNaN(parseFloat(number));
}

/**
 * scroll to element location, with duration time msc
 * @param id
 * @param msc
 */
function scrollPageTo(ele, msc) {
    $("html,body").stop(true);
    $("html,body").animate({scrollTop: ele.offset().top}, msc);
}

/**
* implementation of string format
*/
String.prototype.format = function() {
  var str = this;
  for (var i = 0; i < arguments.length; i++) {
    var reg = new RegExp("\\{" + i + "\\}", "gm");
    str = str.replace(reg, arguments[i]);
  }
  return str;
}

/**
 * validate UPC/EAN, used check digit rule to validate UPC/EAN
 * wiki: https://w.amazon.com/index.php/Barcodes%20ASINs%2C%20UPCs%2C%20and%20EANs
 * wiki: https://en.wikipedia.org/wiki/Check_digit
 * @param upc
 * @returns bool
 */
function barcodeValidate(barcode) {
	var re = /^\d{12,13}$/;
	if (!re.test(barcode)) {
		return false;
	}
	var rs = barcode.split("").reverse().join("");
	var result = 0;
	for (i = 0; i < rs.length; i++) {
		result = result + parseInt(rs.charAt(i)) * Math.pow(3, (i % 2));
	}
	return result % 10 == 0;
}

/**
 * basic validate to barcode, only check length of barcode
 * @param barcode
 * @return bool
 */
function basicBarcodeValidate(barcode) {
    if(barcode == null || barcode == undefined) {
        return false;
    }
    // UPC-8 and EAN-8 length is 8 digits, UPC-E length is 8 digits, FNSku is 10 characters
    // UPC length is 12 digits, EAN length is 13 digits
    if([8,10,12,13].indexOf(barcode.length) >= 0) {
        return true;
    }
    return false;
}
