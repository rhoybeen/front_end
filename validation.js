var uniqueValidations = {
	"INACCURATE_ASIN_QUANTITY_IN_CARTON":[
		'ExclusiveDefectTypeValidateActivity',
		'IsAuthorizedReceivedActivity',
		'WrongPOReconciliationCheckActivity'
	],
	'UNEXPECTED_ASIN_IN_CARTON':[
		'ExclusiveDefectTypeValidateActivity',
		'IsAuthorizedReceivedActivity'
	],
	'INACCURATE_CARTON_COUNT':[
		'ReceivedQuantityCheckActivity'
	],
	'ITEM_NOT_ON_PO':[
		'ExclusiveDefectTypeValidateActivity',
		'CartonLevelDefectExclusionCheckActivity',
		'FnSkuFormatValidateActivity'
	],
	'VENDOR_DAMAGED':[
		'VendorDamageCarrierValidateActivity'
	],
	'EXPIRED':[
		'IsExpirationProductValidateActivity'
	],
	'CARTON_OVERSIZED':[
		'CartonDimentionValidateActivity'
	],
	'ITEM_LABEL_MISSING':[
		'StickerlessInventoryLabelingValidateActivity',
		'UnoFnskuValidateActivity'
	],
	'NO_PO_CARTON':[
		'FaultOwnerCheckForNoPOOnCartonActivity'
	],
	'ITEM_OVERAGE':[
		'FnSkuFormatValidateActivity',
		'OverageValidateActitivity'
	],
	'BAGGING':[
		'PIMValidateActivity'
	],
	'BUBBLE':[
		'PIMValidateActivity'
	],
	'TAPING':[
		'PIMValidateActivity'
	],
	'SUFFOCATION_STICKER':[
		'PIMValidateActivity'
	],
	'OPAQUE':[
		'PIMValidateActivity'
	],
	'ITEM_MISLABELED':[
		'FnSkuFieldMismatchValidateActivity',
		'UnoFnskuValidateActivity'
	],
	'ITEM_LABEL_UNSCANNABLE':[
		'ITEM_LABEL_UNSCANNABLE'
	],
	'BARCODE_INACCESSIBLE':[
		'ITEM_LABEL_UNSCANNABLE'
	],
	'LABEL_ISSUE':[
		'MerchantExemptActivity',
		'ExclusiveDefectTypeValidateActivity',
		'UnoFnskuValidateActivity'
	]
};

var commonValidators = [
	'FilterDifferentDefectSourceActivity',
	'MerchantExemptActivity',
	'FnSkuFieldValidateActivity',
	'ExistedDefectResolveActivity',
	'ExistingDefectDisputeStateValidateActivity',
	'ShipmentResovleActivity',
	'MeasurementUnitResolveActivity',
	'DefectQuantityResolveActivity',
	'DefectQuantityValidateActivity',
	'CatalogItemInfoResovleActivity',
	'CoachingChannelResolveActivity',
];

function buildValidationList(data, type){
	var list = $("#validation_list");
	var rejectReasons = data;
	var validationPoints = [];
	$.each(rejectReasons,function(n,rejectReason){
		var validationPoint = rejectReason['validationPoint'];
		validationPoints.push(validationPoint);
	});
	var defectType = type;
	var uniqueValidators = uniqueValidations[defectType];
	if(uniqueValidators != null){
		var validators = commonValidators.concat(uniqueValidators);
		//Var flag is used to indicate whether code has reached faled validation step.
		var flag = false;
		$.each(validators,function(n, validator){
			var validationStr = '';
			if($.inArray(validator,validationPoints) >=0 ){
				//Show failed validaton.
				validationStr = '<li class="fail">❌'+validator+'</li>'
				if(!flag) flag = true;
			}else{
				//Show invalid validation.
				if(flag){
					validationStr = '<li class="invalid">➖'+validator+'</li>';
				}else{
				//Show validation pass.
					validationStr = '<li>✅'+validator+'</li>';
				}
			}
				list.append(validationStr);
		});
	}else{
		var errorStr = '<li>Unable to resolve validation process.</li>';
		list.append(errorStr);
	}
}