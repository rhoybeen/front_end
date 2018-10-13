
var jsPlumbInstance;
$(document).ready(function(){
    $(window).resize(function() {
        redrawConnectLines();
         $("#component_candidate_attachments").loading();
    });
    $("#layer_candidates").resize(function(){
        console.log("panel resize");
    });
});
jsPlumb.ready(function() {
    jsPlumbInstance = jsPlumb.getInstance();
    jsPlumbInstance.importDefaults({
    Connector : [ "Straight"],
    Endpoint: ["Dot", { radius: 1}],
    ConnectionOverlays: [
            ["Arrow", {
                location: 1,
                //foldback: 1,
                foldback: 0.618,
                visible: true,
                id: "arrow"
            }]],
    reattach: true,
    }
    );
    var end1 = jsPlumbInstance.addEndpoint("component_candidates_info",{anchors:"RightMiddle"});
    var end2 = jsPlumbInstance.addEndpoint("component_candidate_attachments",{anchors:"LeftMiddle"});

    var end3 = jsPlumbInstance.addEndpoint("component_candidates_info",{anchors:"BottomCenter"});
    var end4 = jsPlumbInstance.addEndpoint("component_defect_info",{anchors:"TopCenter"});

    var end5 = jsPlumbInstance.addEndpoint("component_defect_info",{anchors:"BottomCenter"});
    var end6 = jsPlumbInstance.addEndpoint("component_andon",{anchors:"TopCenter"});

    var end7 = jsPlumbInstance.addEndpoint("component_defect_attachments",{anchors:"BottomCenter"});
    var end8 = jsPlumbInstance.addEndpoint("component_attachment_hit",{anchors:"TopCenter"});

    var end9 = jsPlumbInstance.addEndpoint("component_defect_info",{anchors:"RightMiddle"});
    var end10 = jsPlumbInstance.addEndpoint("component_defect_attachments",{anchors:"LeftMiddle"});

    jsPlumbInstance.connect({source:end1,target:end2});
    jsPlumbInstance.connect({source:end3,target:end4});
    jsPlumbInstance.connect({source:end5,target:end6});
    jsPlumbInstance.connect({source:end7,target:end8});
    jsPlumbInstance.connect({source:end9,target:end10});
    jsPlumbInstance.setSuspendDrawing(false, true);
});
function redrawConnectLines(){
    jsPlumbInstance.setSuspendDrawing(false, true);
}
function queryDefects(){
$.toast("Uh oh! You're not going to like this, but...", { type: 'error' });
}
function zonedTimeToString(time){
    if(time == null) return "N/A";
    var dayOfMonth = time['dayOfMonth'];
    var monthVal = time['monthValue'];
    var year = time['year'];
    var hour = time['hour'];
    var minute = time['minute'];
    var sec = time['second'];
    if(dayOfMonth<10) dayOfMonth = '0' + dayOfMonth;
    if(monthVal<10) monthVal = '0' + monthVal;
    if(hour<10) hour = '0' + hour;
    if(minute<10) minute = '0' + minute;
    if(sec<10) sec = '0' + sec;
    return year+'-'+monthVal+'-'+dayOfMonth+' '+hour+':'+minute+':'+sec+' UTC';
}
function validateInput(form){
    var queryType = $.trim(form.queryType.value);
    var queryInput = $.trim(form.queryId.value);
    if(queryType=="shipmentId"){
        if(!validateFBAshipmentId(queryInput)){
            alert("Invalid shipmentId ! Please check it.");
            return false;
        }
    }
    if(queryType=="defectId"){
        //Query by defect id is not supported now
        //Related restrict code should be removed after feature launch.
        alert("Query by defect id is not supported now. It will be available later.");
        return false;

        if(!validateFBADefectId(queryInput)){
            alert("Invalid defectId ! Please check it.");
            return false;
        }
    }
    return true;
}

function validateFBAshipmentId(sid){
    var result = true
    if(!new RegExp("^FBA|^fba\\w{5,12}").test($.trim(sid))) { result = false; }
    return result;
}

function validateFBADefectId(did){
    var result = true;
    if(!new RegExp("^DFT|^dft\\w{7,18}").test($.trim(did))) { result = false; }
    return result;
}

function buildCandidateTable(payload){
    var candidates = payload;
    for(var index in candidates){
        var candidate = candidates[index];
        var candidateTable = $("#table_defect_info");
        var sourceSystem = candidate['candidateSourceSystemData']['defectSourceSystemName'];
        var rowId = "candidate_row_"+sourceSystem;
        var row = $("#"+rowId);
        var tableName = "table_" + sourceSystem;
        if(! row.length > 0){
            var tableRow = '<tr id="'+rowId+'"><td>'+sourceSystem+'</td><td><table class="table table-hover" id="'+tableName+'"></table></td></tr>';
            candidateTable.append(tableRow);
        }
        var sourceSystemTable = $("#"+tableName);
        var sourceSystemTableRow = "<tr><td>"+candidate['candidateId'] + "</td>";
        sourceSystemTableRow += '<td><a href="#">Details</a></td></tr>';
        sourceSystemTable.append(sourceSystemTableRow);
    }
}

function init(){
        $(".owl-carousel").owlCarousel({
        items:1,
        lazyLoad:true,
        loop:true,
        margin:10,
        nav:true,
        autoHeight:false,
    });
}

var data = [
        {
            "asin": {
                "value": "B00CI4RV4O"
            },
            "candidateAttachments": [],
            "candidateContextData": null,
            "candidateId": "1c1c26e1-429a-4ef6-8633-19d2fdbbaea6",
            "candidateNatureKey": {
                "defectType": "UNEXPECTED_ASIN_IN_CARTON",
                "fbaCartonId": {
                    "value": "FBA4ZQCFQ9U000001"
                },
                "fbaInboundShipmentId": {
                    "value": "FBA4ZQCFQ9"
                },
                "fnsku": {
                    "value": "X001I2D65B"
                },
                "merchantCustomerId": {
                    "value": 1500871921
                }
            },
            "candidateRejectReasons": [],
            "candidateSourceSystemData": {
                "defectSourceSystemName": "MIC_SELF_DETECTION",
                "defectSourceSystemReferenceId": {
                    "value": "FBA4ZQCFQ9|FBA4ZQCFQ9U000001|X001I2D65B"
                },
                "defectSourceType": "UNEXPECTED_ASIN_IN_CARTON"
            },
            "candidateStatus": "QUALIFIED",
            "comment": "",
            "createdBy": "system",
            "creationTime": {
                "dayOfMonth": 15,
                "dayOfWeek": "TUESDAY",
                "dayOfYear": 227,
                "hour": 4,
                "minute": 22,
                "month": "AUGUST",
                "monthValue": 8,
                "nano": 884000000,
                "offset": {
                    "id": "Z",
                    "rules": {
                        "fixedOffset": true,
                        "transitionRules": [],
                        "transitions": []
                    },
                    "totalSeconds": 0
                },
                "second": 22,
                "year": 2017,
                "zone": {
                    "id": "UTC",
                    "rules": {
                        "fixedOffset": true,
                        "transitionRules": [],
                        "transitions": []
                    }
                }
            },
            "expectProcessTime": {
                "dayOfMonth": 16,
                "dayOfWeek": "WEDNESDAY",
                "dayOfYear": 228,
                "hour": 4,
                "minute": 22,
                "month": "AUGUST",
                "monthValue": 8,
                "nano": 884000000,
                "offset": {
                    "id": "Z",
                    "rules": {
                        "fixedOffset": true,
                        "transitionRules": [],
                        "transitions": []
                    },
                    "totalSeconds": 0
                },
                "second": 22,
                "year": 2017,
                "zone": {
                    "id": "UTC",
                    "rules": {
                        "fixedOffset": true,
                        "transitionRules": [],
                        "transitions": []
                    }
                }
            },
            "fcId": {
                "value": "MDW2"
            },
            "fcLocatedCountryCode": null,
            "isAllowAcknowledged": true,
            "isAndonPull": false,
            "msku": {
                "value": "FBA2/1/16_1081"
            },
            "problemQuantity": {
                "value": 1
            },
            "purchaseOrderId": {
                "value": "6NLZQEGE"
            },
            "receivedQuantity": {
                "value": 1
            },
            "shippedQuantity": {
                "value": 0
            },
            "vendorCode": {
                "value": "LAL0U"
            }
        },        {
            "asin": {
                "value": "JKHI4RV4O"
            },
            "candidateAttachments": [],
            "candidateContextData": null,
            "candidateId": "1c1c26e1-429a-4ef6-8633-19d2fdbbaea6",
            "candidateNatureKey": {
                "defectType": "UNEXPECTED_ASIN_IN_CARTON",
                "fbaCartonId": {
                    "value": "FBA4ZQCFQ9U000001"
                },
                "fbaInboundShipmentId": {
                    "value": "FBA4ZQCFQ9"
                },
                "fnsku": {
                    "value": "X001I2D65B"
                },
                "merchantCustomerId": {
                    "value": 1500871921
                }
            },
            "candidateRejectReasons": [],
            "candidateSourceSystemData": {
                "defectSourceSystemName": "MIC_DETECTION",
                "defectSourceSystemReferenceId": {
                    "value": "FBA4ZQCFQ9|FBA4ZQCFQ9U000001|X001I2D65B"
                },
                "defectSourceType": "UNEXPECTED_ASIN_IN_CARTON"
            },
            "candidateStatus": "QUALIFIED",
            "comment": "",
            "createdBy": "system",
            "creationTime": {
                "dayOfMonth": 15,
                "dayOfWeek": "TUESDAY",
                "dayOfYear": 227,
                "hour": 4,
                "minute": 22,
                "month": "AUGUST",
                "monthValue": 8,
                "nano": 884000000,
                "offset": {
                    "id": "Z",
                    "rules": {
                        "fixedOffset": true,
                        "transitionRules": [],
                        "transitions": []
                    },
                    "totalSeconds": 0
                },
                "second": 22,
                "year": 2017,
                "zone": {
                    "id": "UTC",
                    "rules": {
                        "fixedOffset": true,
                        "transitionRules": [],
                        "transitions": []
                    }
                }
            },
            "expectProcessTime": {
                "dayOfMonth": 16,
                "dayOfWeek": "WEDNESDAY",
                "dayOfYear": 228,
                "hour": 4,
                "minute": 22,
                "month": "AUGUST",
                "monthValue": 8,
                "nano": 884000000,
                "offset": {
                    "id": "Z",
                    "rules": {
                        "fixedOffset": true,
                        "transitionRules": [],
                        "transitions": []
                    },
                    "totalSeconds": 0
                },
                "second": 22,
                "year": 2017,
                "zone": {
                    "id": "UTC",
                    "rules": {
                        "fixedOffset": true,
                        "transitionRules": [],
                        "transitions": []
                    }
                }
            },
            "fcId": {
                "value": "MDW2"
            },
            "fcLocatedCountryCode": null,
            "isAllowAcknowledged": true,
            "isAndonPull": false,
            "msku": {
                "value": "FBA2/1/16_1081"
            },
            "problemQuantity": {
                "value": 1
            },
            "purchaseOrderId": {
                "value": "6NLZQEGE"
            },
            "receivedQuantity": {
                "value": 1
            },
            "shippedQuantity": {
                "value": 0
            },
            "vendorCode": {
                "value": "LAL0U"
            }
        },        {
            "asin": {
                "value": "B00CI4RV4O"
            },
            "candidateAttachments": [],
            "candidateContextData": null,
            "candidateId": "1c1c26e1-429a-4ef6-8633-19d2fdbbaea6",
            "candidateNatureKey": {
                "defectType": "UNEXPECTED_ASIN_IN_CARTON",
                "fbaCartonId": {
                    "value": "FBA4ZQCFQ9U000001"
                },
                "fbaInboundShipmentId": {
                    "value": "FBA4ZQCFQ9"
                },
                "fnsku": {
                    "value": "X001I2D65B"
                },
                "merchantCustomerId": {
                    "value": 1500871921
                }
            },
            "candidateRejectReasons": [],
            "candidateSourceSystemData": {
                "defectSourceSystemName": "MIC_SELF_DETECTION",
                "defectSourceSystemReferenceId": {
                    "value": "FBA4ZQCFQ9|FBA4ZQCFQ9U000001|X001I2D65B"
                },
                "defectSourceType": "UNEXPECTED_ASIN_IN_CARTON"
            },
            "candidateStatus": "QUALIFIED",
            "comment": "",
            "createdBy": "system",
            "creationTime": {
                "dayOfMonth": 15,
                "dayOfWeek": "TUESDAY",
                "dayOfYear": 227,
                "hour": 4,
                "minute": 22,
                "month": "AUGUST",
                "monthValue": 8,
                "nano": 884000000,
                "offset": {
                    "id": "Z",
                    "rules": {
                        "fixedOffset": true,
                        "transitionRules": [],
                        "transitions": []
                    },
                    "totalSeconds": 0
                },
                "second": 22,
                "year": 2017,
                "zone": {
                    "id": "UTC",
                    "rules": {
                        "fixedOffset": true,
                        "transitionRules": [],
                        "transitions": []
                    }
                }
            },
            "expectProcessTime": {
                "dayOfMonth": 16,
                "dayOfWeek": "WEDNESDAY",
                "dayOfYear": 228,
                "hour": 4,
                "minute": 22,
                "month": "AUGUST",
                "monthValue": 8,
                "nano": 884000000,
                "offset": {
                    "id": "Z",
                    "rules": {
                        "fixedOffset": true,
                        "transitionRules": [],
                        "transitions": []
                    },
                    "totalSeconds": 0
                },
                "second": 22,
                "year": 2017,
                "zone": {
                    "id": "UTC",
                    "rules": {
                        "fixedOffset": true,
                        "transitionRules": [],
                        "transitions": []
                    }
                }
            },
            "fcId": {
                "value": "MDW2"
            },
            "fcLocatedCountryCode": null,
            "isAllowAcknowledged": true,
            "isAndonPull": false,
            "msku": {
                "value": "FBA2/1/16_1081"
            },
            "problemQuantity": {
                "value": 1
            },
            "purchaseOrderId": {
                "value": "6NLZQEGE"
            },
            "receivedQuantity": {
                "value": 1
            },
            "shippedQuantity": {
                "value": 0
            },
            "vendorCode": {
                "value": "LAL0U"
            }
        },
        {
            "asin": {
                "value": "B00CI4RV4O"
            },
            "candidateAttachments": [],
            "candidateContextData": null,
            "candidateId": "1c1c26e1-429a-4ef6-8633-19d2fdbbaea6",
            "candidateNatureKey": {
                "defectType": "UNEXPECTED_ASIN_IN_CARTON",
                "fbaCartonId": {
                    "value": "FBA4ZQCFQ9U000001"
                },
                "fbaInboundShipmentId": {
                    "value": "FBA4ZQCFQ9"
                },
                "fnsku": {
                    "value": "X001I2D65B"
                },
                "merchantCustomerId": {
                    "value": 1500871921
                }
            },
            "candidateRejectReasons": [],
            "candidateSourceSystemData": {
                "defectSourceSystemName": "MIC_SELF_DETECTION",
                "defectSourceSystemReferenceId": {
                    "value": "FBA4ZQCFQ9|FBA4ZQCFQ9U000001|X001I2D65B"
                },
                "defectSourceType": "UNEXPECTED_ASIN_IN_CARTON"
            },
            "candidateStatus": "QUALIFIED",
            "comment": "",
            "createdBy": "system",
            "creationTime": {
                "dayOfMonth": 15,
                "dayOfWeek": "TUESDAY",
                "dayOfYear": 227,
                "hour": 4,
                "minute": 22,
                "month": "AUGUST",
                "monthValue": 8,
                "nano": 884000000,
                "offset": {
                    "id": "Z",
                    "rules": {
                        "fixedOffset": true,
                        "transitionRules": [],
                        "transitions": []
                    },
                    "totalSeconds": 0
                },
                "second": 22,
                "year": 2017,
                "zone": {
                    "id": "UTC",
                    "rules": {
                        "fixedOffset": true,
                        "transitionRules": [],
                        "transitions": []
                    }
                }
            },
            "expectProcessTime": {
                "dayOfMonth": 16,
                "dayOfWeek": "WEDNESDAY",
                "dayOfYear": 228,
                "hour": 4,
                "minute": 22,
                "month": "AUGUST",
                "monthValue": 8,
                "nano": 884000000,
                "offset": {
                    "id": "Z",
                    "rules": {
                        "fixedOffset": true,
                        "transitionRules": [],
                        "transitions": []
                    },
                    "totalSeconds": 0
                },
                "second": 22,
                "year": 2017,
                "zone": {
                    "id": "UTC",
                    "rules": {
                        "fixedOffset": true,
                        "transitionRules": [],
                        "transitions": []
                    }
                }
            },
            "fcId": {
                "value": "MDW2"
            },
            "fcLocatedCountryCode": null,
            "isAllowAcknowledged": true,
            "isAndonPull": false,
            "msku": {
                "value": "FBA2/1/16_1081"
            },
            "problemQuantity": {
                "value": 1
            },
            "purchaseOrderId": {
                "value": "6NLZQEGE"
            },
            "receivedQuantity": {
                "value": 1
            },
            "shippedQuantity": {
                "value": 0
            },
            "vendorCode": {
                "value": "LAL0U"
            }
        },        {
            "asin": {
                "value": "B00CI4RV4O"
            },
            "candidateAttachments": [],
            "candidateContextData": null,
            "candidateId": "1c1c26e1-429a-4ef6-8633-19d2fdbbaea6",
            "candidateNatureKey": {
                "defectType": "UNEXPECTED_ASIN_IN_CARTON",
                "fbaCartonId": {
                    "value": "FBA4ZQCFQ9U000001"
                },
                "fbaInboundShipmentId": {
                    "value": "FBA4ZQCFQ9"
                },
                "fnsku": {
                    "value": "X001I2D65B"
                },
                "merchantCustomerId": {
                    "value": 1500871921
                }
            },
            "candidateRejectReasons": [],
            "candidateSourceSystemData": {
                "defectSourceSystemName": "MIC_SELF_DETECTION",
                "defectSourceSystemReferenceId": {
                    "value": "FBA4ZQCFQ9|FBA4ZQCFQ9U000001|X001I2D65B"
                },
                "defectSourceType": "UNEXPECTED_ASIN_IN_CARTON"
            },
            "candidateStatus": "QUALIFIED",
            "comment": "",
            "createdBy": "system",
            "creationTime": {
                "dayOfMonth": 15,
                "dayOfWeek": "TUESDAY",
                "dayOfYear": 227,
                "hour": 4,
                "minute": 22,
                "month": "AUGUST",
                "monthValue": 8,
                "nano": 884000000,
                "offset": {
                    "id": "Z",
                    "rules": {
                        "fixedOffset": true,
                        "transitionRules": [],
                        "transitions": []
                    },
                    "totalSeconds": 0
                },
                "second": 22,
                "year": 2017,
                "zone": {
                    "id": "UTC",
                    "rules": {
                        "fixedOffset": true,
                        "transitionRules": [],
                        "transitions": []
                    }
                }
            },
            "expectProcessTime": {
                "dayOfMonth": 16,
                "dayOfWeek": "WEDNESDAY",
                "dayOfYear": 228,
                "hour": 4,
                "minute": 22,
                "month": "AUGUST",
                "monthValue": 8,
                "nano": 884000000,
                "offset": {
                    "id": "Z",
                    "rules": {
                        "fixedOffset": true,
                        "transitionRules": [],
                        "transitions": []
                    },
                    "totalSeconds": 0
                },
                "second": 22,
                "year": 2017,
                "zone": {
                    "id": "UTC",
                    "rules": {
                        "fixedOffset": true,
                        "transitionRules": [],
                        "transitions": []
                    }
                }
            },
            "fcId": {
                "value": "MDW2"
            },
            "fcLocatedCountryCode": null,
            "isAllowAcknowledged": true,
            "isAndonPull": false,
            "msku": {
                "value": "FBA2/1/16_1081"
            },
            "problemQuantity": {
                "value": 1
            },
            "purchaseOrderId": {
                "value": "6NLZQEGE"
            },
            "receivedQuantity": {
                "value": 1
            },
            "shippedQuantity": {
                "value": 0
            },
            "vendorCode": {
                "value": "LAL0U"
            }
        },        {
            "asin": {
                "value": "B00CI4RV4O"
            },
            "candidateAttachments": [],
            "candidateContextData": null,
            "candidateId": "1c1c26e1-429a-4ef6-8633-19d2fdbbaea6",
            "candidateNatureKey": {
                "defectType": "UNEXPECTED_ASIN_IN_CARTON",
                "fbaCartonId": {
                    "value": "FBA4ZQCFQ9U000001"
                },
                "fbaInboundShipmentId": {
                    "value": "FBA4ZQCFQ9"
                },
                "fnsku": {
                    "value": "X001I2D65B"
                },
                "merchantCustomerId": {
                    "value": 1500871921
                }
            },
            "candidateRejectReasons": [],
            "candidateSourceSystemData": {
                "defectSourceSystemName": "MIC_SELF_DETECTION",
                "defectSourceSystemReferenceId": {
                    "value": "FBA4ZQCFQ9|FBA4ZQCFQ9U000001|X001I2D65B"
                },
                "defectSourceType": "UNEXPECTED_ASIN_IN_CARTON"
            },
            "candidateStatus": "QUALIFIED",
            "comment": "",
            "createdBy": "system",
            "creationTime": {
                "dayOfMonth": 15,
                "dayOfWeek": "TUESDAY",
                "dayOfYear": 227,
                "hour": 4,
                "minute": 22,
                "month": "AUGUST",
                "monthValue": 8,
                "nano": 884000000,
                "offset": {
                    "id": "Z",
                    "rules": {
                        "fixedOffset": true,
                        "transitionRules": [],
                        "transitions": []
                    },
                    "totalSeconds": 0
                },
                "second": 22,
                "year": 2017,
                "zone": {
                    "id": "UTC",
                    "rules": {
                        "fixedOffset": true,
                        "transitionRules": [],
                        "transitions": []
                    }
                }
            },
            "expectProcessTime": {
                "dayOfMonth": 16,
                "dayOfWeek": "WEDNESDAY",
                "dayOfYear": 228,
                "hour": 4,
                "minute": 22,
                "month": "AUGUST",
                "monthValue": 8,
                "nano": 884000000,
                "offset": {
                    "id": "Z",
                    "rules": {
                        "fixedOffset": true,
                        "transitionRules": [],
                        "transitions": []
                    },
                    "totalSeconds": 0
                },
                "second": 22,
                "year": 2017,
                "zone": {
                    "id": "UTC",
                    "rules": {
                        "fixedOffset": true,
                        "transitionRules": [],
                        "transitions": []
                    }
                }
            },
            "fcId": {
                "value": "MDW2"
            },
            "fcLocatedCountryCode": null,
            "isAllowAcknowledged": true,
            "isAndonPull": false,
            "msku": {
                "value": "FBA2/1/16_1081"
            },
            "problemQuantity": {
                "value": 1
            },
            "purchaseOrderId": {
                "value": "6NLZQEGE"
            },
            "receivedQuantity": {
                "value": 1
            },
            "shippedQuantity": {
                "value": 0
            },
            "vendorCode": {
                "value": "LAL0U"
            }
        }
    ];


 (function ($, h, c) {
        var a = $([]), e = $.resize = $.extend($.resize, {}), i, k = "setTimeout", j = "resize", d = j + "-special-event", b = "delay", f = "throttleWindow";
        e[b] = 250;
        e[f] = true;
        $.event.special[j] = {
            setup: function () {
                if (!e[f] && this[k]) {
                    return false
                }
                var l = $(this);
                a = a.add(l);
                $.data(this, d, {w: l.width(), h: l.height()});
                if (a.length === 1) {
                    g()
                }
            }, teardown: function () {
                if (!e[f] && this[k]) {
                    return false
                }
                var l = $(this);
                a = a.not(l);
                l.removeData(d);
                if (!a.length) {
                    clearTimeout(i)
                }
            }, add: function (l) {
                if (!e[f] && this[k]) {
                    return false
                }
                var n;
 
                function m(s, o, p) {
                    var q = $(this), r = $.data(this, d);
                    r.w = o !== c ? o : q.width();
                    r.h = p !== c ? p : q.height();
                    n.apply(this, arguments)
                }
 
                if ($.isFunction(l)) {
                    n = l;
                    return m
                } else {
                    n = l.handler;
                    l.handler = m
                }
            }
        };
        function g() {
            i = h[k](function () {
                a.each(function () {
                    var n = $(this), m = n.width(), l = n.height(), o = $.data(this, d);
                    if (m !== o.w || l !== o.h) {
                        n.trigger(j, [o.w = m, o.h = l])
                    }
                });
                g()
            }, e[b])
        }
    })(jQuery, this);
