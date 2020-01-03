/*
 * fixes timing issue on initial page load with ipad webview setting flag for
 * use with pageUpdate()
 */
window.in2OnIPad = /iPhone/i.test(navigator.userAgent) || 
                   /iPod/i.test(navigator.userAgent) || 
                   /iPad/i.test(navigator.userAgent);

function NameValuePair(name,value) {
    this.Key = name;
    this.Value = value;
}

NameValuePair.prototype.toString = function() {
	return "NameValuePair";
}

String.prototype.startsWith = function(str) {
	return this.indexOf(str) == 0;
};

//---
var in2AppTalk = (function(){

	function in2AppTalk() {

        //---
        // HashMap to track the messages subscribers have asked to be
        // notified of
        // key = subject
        // value = Array of callback functions
        //---
        this.subscribers = new HashMap(),

        //---
        // Method for objects to subscribe to messages published in this
        // framework
        // Subscribers must specify a 'subject' but '*' is valid to
        // subscribe to all messages
        // Subscribers must specify a callback method to invoke to
        // deliver a message
        //---
        this.subscribe = function(subject, callback) {
            var callbackArray = null;

            //---
            try {
                if (subject && callback) {
                    if (Object.prototype.toString.apply(callback) === '[object Function]') {
                        callbackArray = this.subscribers.get(subject);
                        if (!callbackArray) {
                            callbackArray = new Array();
                            callbackArray.push(callback);
                            this.subscribers.put(subject, callbackArray);
                        }
                        else {
                            callbackArray.push(callback);
                        }
                    }
                }
            }
            catch (e) {
                console.log("in2AppTalk.subscribe() - Exception caught!  " + e);
            }
        },

        //---
        // Unsubscribe
        //---
        this.unsubscribe = function(subject) {
            var callbackArray = null;

            //---
            try {
                if (subject) {
                	if (this.subscribers.get(subject) != null) {
                		this.subscribers.remove(subject);
                	}
                    else {
                        console.log("in2AppTalk.unsubscribe() - No subcribers to subject '" + subject + "'");
                    }
                }
                else {
                    console.log("in2AppTalk.unsubscribe() - 'subject' not specified");
                }
            }
            catch (e) {
                console.log("in2AppTalk.unsubscribe() - Exception caught!  " + e);
            }
        },
        
        //---
    	this.getUser = function() {
    
    		useIn2DT = (window.in2 !== undefined);
    
    		//---
    		// Check for iPad (or iPhone?) container
    		// If we're running on an iPad (or iPhone?),
    		// 'window.in2OnIPad' will be defined
    		//---
    		useIn2Schema = (window.in2OnIPad !== undefined && window.in2OnIPad!=false);
    
    		// If we're on the In2 Desktop...
    		if (useIn2DT === true) {
    			return in2.Username;
    		}
    		// If we're running on an iPad (or phone)
    		else if (useIn2Schema === true) {
    			return window.in2Username;
    		}
    		else {
    			console.log("in2AppTalk.getUser() - No 'getUser' framework...");
    		}
    	},
    	
    	this.getUserToken = function() {
    	    
    		useIn2DT = (window.in2 !== undefined);
    
    		//---
    		// Check for iPad (or iPhone?) container
    		// If we're running on an iPad (or iPhone?),
    		// 'window.in2OnIPad' will be defined
    		//---
    		useIn2Schema = (window.in2OnIPad !== undefined && window.in2OnIPad!=false);
    
    		// If we're on the In2 Desktop...
    		if (useIn2DT === true) {
    			return in2.Usertoken;
    		}
    		// If we're running on an iPad (or phone)
    		else if (useIn2Schema === true) {
    			return window.Usertoken;
    		}
    		else {
    			console.log("in2AppTalk.getUser() - No 'getUserToken' framework...");
    		}
    	},
    	
		this.getItemId = function() {

			useIn2DT = (window.in2 !== undefined);

			//---
			// Check for iPad (or iPhone?) container
			// If we're running on an iPad (or iPhone?),
			// 'window.in2OnIPad' will be defined
			//---
			useIn2Schema = (window.in2OnIPad !== undefined && window.in2OnIPad!=false);

			// If we're on the In2 Desktop...
			if (useIn2DT === true) {
				return in2.ItemId;
			}
			// If we're running on an iPad (or phone)
			else if (useIn2Schema === true) {
				return window.in2GadgetItemID;
			}
			else {
				console.log("in2AppTalk.getUser() - No 'getItemId' framework...");
			}
		},
		
		this.getCollectionItemId = function() {

			useIn2DT = (window.in2 !== undefined);

			//---
			// Check for iPad (or iPhone?) container
			// If we're running on an iPad (or iPhone?),
			// 'window.in2OnIPad' will be defined
			//---
			useIn2Schema = (window.in2OnIPad !== undefined && window.in2OnIPad!=false);

			// If we're on the In2 Desktop...
			if (useIn2DT === true) {
				return in2.CollectionItemId;
			}
			// If we're running on an iPad (or phone)
			else if (useIn2Schema === true) {
				return window.in2GadgetCollectionID;
			}
			else {
				console.log("in2AppTalk.getUser() - No 'getCollectionItemId' framework...");
			}
		},

		this.setDates = function(fromDate, toDate) {

			useIn2DT = (window.in2 !== undefined);

			//---
			// Check for iPad (or iPhone?) container
			// If we're running on an iPad (or iPhone?),
			// 'window.in2OnIPad' will be defined
			//---
			useIn2Schema = (window.in2OnIPad !== undefined && window.in2OnIPad!=false);

			// If we're on the In2 Desktop...
			if (useIn2DT === true) {
				in2.SetDates(fromDate, toDate);
			}
			// If we're running on an iPad (or phone)
			else if (useIn2Schema === true) { 
				var iPadUrlSB = new Array(),
			    	paramSB = new Array(),
			    	completeIPadUrl = null;

	            iPadUrlSB.push("in2:");
	            iPadUrlSB.push("subject=SetDates");
	            iPadUrlSB.push("&");
	            paramSB.push("fromDate=");
	            paramSB.push(fromDate);
	            paramSB.push("&");
	            paramSB.push("toDate=");
	            paramSB.push(toDate);
	            
	            var tmpStr = iPadUrlSB.concat(paramSB).join("");
	
	            completeIPadUrl = encodeURI(tmpStr);
	
	            window.location = completeIPadUrl;
			}
			else {
				console.log("in2AppTalk.setDates(fromDate, toDate) - No date Picker framework...");
			}
		},
		
		this.initializeDatePickers = function(dateType, datePickerType, dfltFromDate, dfltToDate, periodType, unitType, readOnly1, readOnly2, autoUpdate) {

			useIn2DT = (window.in2 !== undefined);

			//---
			// Check for iPad (or iPhone?) container
			// If we're running on an iPad (or iPhone?),
			// 'window.in2OnIPad' will be defined
			//---
			useIn2Schema = (window.in2OnIPad !== undefined && window.in2OnIPad!=false);

			// If we're on the In2 Desktop...
			if (useIn2DT === true) {
				in2.InitializeDateAPI(dateType, datePickerType, dfltFromDate, dfltToDate, periodType, unitType, readOnly1, readOnly2, autoUpdate);
			}
			// If we're running on an iPad (or phone)
			else if (useIn2Schema === true) {
				//console.log("in2AppTalk.initializeDatePickers(dateType, datePickerType, dfltFromDate, dfltToDate) - No date Picker framework on iOS...");
				var iPadUrlSB = new Array(),
			    	paramSB = new Array(),
			    	completeIPadUrl = null;

	            iPadUrlSB.push("in2:");
	            iPadUrlSB.push("subject=InitializeDatePickers");
	            iPadUrlSB.push("&");
	
	            paramSB.push("dateType=");
	            paramSB.push(dateType);
	            paramSB.push("&");
	            
	            paramSB.push("datePickerType=");
	            paramSB.push(datePickerType);
	            paramSB.push("&");
	            
	            paramSB.push("dfltFromDate=");
	            paramSB.push(dfltFromDate);
	            paramSB.push("&");
	            
	            paramSB.push("dfltToDate=");
	            paramSB.push(dfltToDate);
	            paramSB.push("&");
	            
	            paramSB.push("periodType=");
	            paramSB.push(periodType);
	            paramSB.push("&");
	            
	            paramSB.push("unitType=");
	            paramSB.push(unitType);
	            paramSB.push("&");
	
	            paramSB.push("readOnly1=");
	            paramSB.push(readOnly1);
	            paramSB.push("&");
	            
	            paramSB.push("readOnly2=");
	            paramSB.push(readOnly2);
	            paramSB.push("&");
	            
	            paramSB.push("autoUpdate=");
	            paramSB.push(autoUpdate);
	            
	            var tmpStr = iPadUrlSB.concat(paramSB).join("");
	
	            completeIPadUrl = encodeURI(tmpStr);
	
	            window.location = completeIPadUrl;
			}
			else {
				console.log("in2AppTalk.initializeDatePickers(dateType, datePickerType, dfltFromDate, dfltToDate) - No date Picker framework...");
			}
		},

        //---
        // Method to publish a message into any messaging frameworks
        // that are present and through the native JS one as well
        //---
        this.publish = function(subject, msg) {
            var localOnly = false;
            var useIn2DT = false;
            var useIn2Schema = false;
            var skipLocalProcessing = false;
            var callbackArray = null;
            var i;
            var retval = null; 

            //---
            try { 
                // Ensure subject and message values
                if (subject && msg) {
 
					//---
					// Check for In2 Desktop:
					// If we're running in In2 Desktop, 'window.in2'
					// will be defined
					//---
					useIn2DT = (window.in2 !== undefined);

					//---
					// Check for iPad (or iPhone?) container
					// If we're running on an iPad (or iPhone?),
					// 'window.in2OnIPad' will be defined
					//---
					useIn2Schema = ((window.in2OnIPad !== undefined)  && (window.in2OnIPad != false));

					//---
					// Check for localOnly flag
					// If there are three or more arguments, 'localFlag'
					// has been specified
					// If it's set to true, don't publish the message
					// through known, non-local interfaces
					// (eg In2 Desktop, iPad container)
					//---
					if (arguments.length >= 3) {
						localOnly = arguments[2];
					}
					
					if (localOnly === false) {
						//alert("LOACL");
						// If we're on the In2 Desktop...
						if (useIn2DT === true) {
							// Hardcoded 'subject' strings because
							// we can't see the enum values in here
							//alert("DT"); 
							
							if (subject === 'PrimaryItemChange') {
								//alert("size PIC: " + getObjectSize(msg));
								if (getObjectSize(msg)>9) {
									in2.RequestPrimaryItemChanged( msg.in2type,
																   msg.label,
																   msg.insitetype,
																   msg.uniqueIdType,
																   msg.uniqueIdVal,
																   msg.name,
																   msg.ticker,
																   msg.issuer,
																   msg.senderId,
																   msg.dateType,
																   msg.fromDate,
																   msg.toDate,
																   msg.periodType,
																   msg.unitType);
								}
								else {
									in2.RequestPrimaryItemChanged( msg.in2type,
																   msg.label,
																   msg.insitetype,
																   msg.uniqueIdType,
																   msg.uniqueIdVal,
																   msg.name,
																   msg.ticker,
																   msg.issuer,
																   msg.senderId);
								}
							}
							else if (subject === 'SecondaryItemChange') {
								in2.RequestSecondaryItemChanged( msg.itIdentifier,
																 msg.uniqueIdType,
																 msg.uniqueIdVal,
																 msg.name,
																 msg.senderId);
							}
							else if (subject === 'CommandLineStatement') {
								in2.RequestCommandLineStatement(msg);
							}
							else if (subject === 'PrimaryListChange') {
								var JSONified = null;

								if (msg.toString && (msg.toString() == 'HashMap')) {
									JSONified = msg.toJSONString();
								}
								else {
									JSONified = JSON.stringify(msg);
								}

								skipLocalProcessing = true;

								in2.RequestPrimaryStackedItemChanged(JSONified);
							}  
							else if (subject === 'PrimaryListChangeStr') {
								skipLocalProcessing = true;
								in2.RequestPrimaryStackedItemChanged(msg);
							}  
							else if (subject === 'PrimaryStackedItemChange') {
								var JSONified = null;

								if (msg.toString && (msg.toString() == 'HashMap')) {
									JSONified = msg.toJSONString();
								}
								else {
									JSONified = JSON.stringify(msg);
								}

								skipLocalProcessing = true;

								in2.RequestPrimaryStackedItemChanged(JSONified);
							}
							else { 
								retval = "Unknown 'subject' value '" + subject + "'";
								console.log("in2AppTalk.publish() - " + retval);
							}
						}
						else {
							console.log("in2AppTalk.publish() - No 'in2' desktop framework...");
						}

						// If we're running on an iPad (or phone)
						if (useIn2Schema === true) {
							var iPadUrlSB = new Array(),
							    paramSB = new Array(),
							    completeIPadUrl = null;
							var msgObjType = null;
							var key = null, value = null;

                            iPadUrlSB.push("in2:");
                            iPadUrlSB.push("subject=");
                            iPadUrlSB.push(subject);
                            iPadUrlSB.push("&");

                            // Handle HashMap messages first
                            if (msg.toString) {
                            	msgObjType = msg.toString();
                            	if (msgObjType == 'HashMap') {
                            		var kvStr = msg.toKeyValueString();
                            		iPadUrlSB.push(kvStr);

                            		completeIPadUrl = iPadUrlSB.join("");
                            	}
                            	else {
                            		msgObjType = null;
                            	}
                            }

                            // If 'msgObjType' isn't set,
                            //   Handle old-school messages
                            if (msgObjType == null) {

	                            for (var prop in msg) {

	                            	// Reset these very time through
	                            	key = null;
	                            	value = null;

	                            	// Check this here because
	                            	// if 'msg[prop]' is null, typeof will return 'object'
	                            	if (msg[prop] != null) {

	                            		// If msg[prop] isn't an object, use simple processing
		                        		if (typeof msg[prop] != "object") {
		                        			key = prop;
		                        			value = msg[prop];
		                        		}
		                        		else {
		                        			if (msg[prop].toString) {
		                        				var objectType = msg[prop].toString().toLowerCase();

			                        			// If msg[prop] is a NameValuePair object
			                        			//   Handle it appropriately
		                        				if (objectType == 'namevaluepair') {
			                        				if ((msg[prop].Key != undefined) && (msg[prop].Value != undefined)) {
			                        					key = "__"+msg[prop].Key;
			                        					value = msg[prop].Value;
			                        				}
		                        				}
		                        				// If it's an array
		                        				//   Create comma-sep string with its content
		                        				else if (objectType == 'array') {
		                        					key = prop;
		                        					value = msg[prop].join(",");
		                        				}
		                        				// other types of objects can be handled here
		                        			}
		                        		}

		                        		// 'key' and 'value' must be set!
		                        		if ((key != null) && (value != null)) {
			                                if (paramSB.length > 0) {
			                                    paramSB.push("&");
			                                }

			                    			paramSB.push(key);
			                    			paramSB.push("=");
			                    			paramSB.push(value);
		                        		}
	                            	}
	                            }
	                            
                            	//alert("in2AppTalk.publish() - 'paramSB.length' = " + paramSB.length + ", 'iPadUrlSB.length' = " + iPadUrlSB.length);

	                            var tmpStr = iPadUrlSB.concat(paramSB).join("");

	                            completeIPadUrl = encodeURI(tmpStr);
                            }

                            console.log("in2Apptalk.publish() - 'completeIPadUrl' = '" + completeIPadUrl + "'");

                            //window.location = completeIPadUrl;
                            publishMessageThruIFrame(completeIPadUrl);
						}
						else {
							console.log("in2AppTalk.publish() - No 'In2OnIPad' framework...");
						}
					}

					//---
					// JD: New 05/24/2012
					// This will prevent some locally-published messages 
					// from being processed twice
					//---
					if (skipLocalProcessing == false) {

	                    // Set or alter msg.src if necessary
	                    if ((useIn2DT === false) && (useIn2Schema === false)) {
	                        if (msg['src'] === undefined) {
	                            msg['src'] = 'local';
	                        }
	                    }

	                    //---
	                    // Send the message to all '*' subscribers
	                    //---
	                    callbackArray = this.subscribers.get('*');
	                    if (callbackArray) {
	                        for (i = 0; i < callbackArray.length; i++) {
	                            callbackArray[i].call(this, subject, msg);
	                        }
	                    } 
	                    else {
	                        console.log("in2AppTalk.publish() - No subscribers to '*' messages...");
	                    }

	                    //---
	                    // Then send the message to specific subject
	                    // subscribers
	                    //---
	                    callbackArray = this.subscribers.get(subject);
	                    if (callbackArray) {
	                        for (i = 0; i < callbackArray.length; i++) {
	                            callbackArray[i].call(this, subject, msg);
	                        }
	                    }
	                    else {
	                        console.log("in2AppTalk.publish() - No subscribers to '" + subject + "' messages...'");
	                    }
                    }
                }
            }
            catch (e) {
                retval = "Exception caught!  " + e;
                console.log("in2AppTalk.publish() - " + retval);
            }

            return retval;
        },

        //---
        // Only publish locally, not through any known interfaces
        //---
        this.republish = function(subject, msg) {
            this.publish(subject, msg, true);
        };
    }

	
	function getObjectSize(myObject) { 
		  var count=0; 
		  for (var key in myObject) 
		    count++;
		  return count; 
		} 

    //---
    // Fun with JavaScript singletons!
    //---
    var instance = null;

    return {
        getInstance : function() {
            if (instance === null) {
                instance = new in2AppTalk();
                // Hide the constructor so the returned objected can't be
                // new'd...
                instance.constructor = null;
            }

            return instance;
        }
    };
})();

//---
// Add Enumerations
in2AppTalk.MSG_TYPE = {
    "PRIMARY_ITEM_CHANGE" : "PrimaryItemChange",
    "PRIMARY_LIST_CHANGE" : "PrimaryListChange",
    "PRIMARY_LIST_CHANGE_STR" : "PrimaryListChangeStr",
    "SECONDARY_ITEM_CHANGE" : "SecondaryItemChange",
    "PRIMARY_STACKED_ITEM_CHANGE" : "PrimaryStackedItemChange",
	"WINDOW_LOADED" : "WindowLoaded",
	"BEGIN_PAGE_UPDATE" : "BeginPageUpdate",    
    "PAGE_UPDATED" : "PageUpdated",
    "OPEN_POPUP" : "OpenPopup", 
    "PUBLISH_POPUP_DATA" : "PublishPopupData",
    "CLOSE_POPUP" : "ClosePopup",

    // JD: Added 05/23/2012
    // New commands for iPad In2
    "PANEL_QUERY":"PanelQuery",
    "SHOW_TOOLBAR":"ShowToolbar",
    "SHOW_FULL_SCREEN": "ShowFullScreen"
};

in2AppTalk.PS_MSG_TYPE = {
		"CLIENT_SSI_ID" : "CLIENT_SSI_ID",
		"CLIENT_NAME" : "CLIENT_NAME",
		"ACCOUNT_SSI_ID" : "ACCOUNT_SSI_ID",
		"ACCOUNT_FIDR_ENTITY_ID" : "ACCOUNT_FIDR_ENTITY_ID",
		"ACCOUNT_GPS_ACID" : "ACCOUNT_GPS_ACID",
		"ACCOUNT_MINOR" : "ACCOUNT_MINOR",
		"ACCOUNT_MAJOR" : "ACCOUNT_MAJOR",
		"ACCOUNT_NAME" : "ACCOUNT_NAME",
		"BENCHMARK_FIDR_ENTITY_ID" : "BENCHMARK_FIDR_ENTITY_ID",
		"BENCHMARK_GPS_ACID" : "BENCHMARK_GPS_ACID",	
		"BENCHMARK_NAME" : "BENCHMARK_NAME",
		"COMPOSITE_SSI_ID" : "COMPOSITE_SSI_ID",
		"COMPOSITE_NAME" : "COMPOSITE_NAME",
		"COMPOSITE_SSI_ID" : "COMPOSITE_SSI_ID",
		"COMPOSITE_NAME" : "COMPOSITE_NAME",
		"CONSULTANT_SSI_ID" : "CONSULTANT_SSI_ID",
		"CONSULTANT_NAME" : "CONSULTANT_NAME",
		"INVESTMENT_MGR_SSI_ID" : "INVESTMENT_MGR_SSI_ID",
		"INVESTMENT_MGR_NAME" : "INVESTMENT_MGR_NAME",
		"LOOMIS_EMPLOYEE_SSI_ID" : "LOOMIS_EMPLOYEE_SSI_ID",
		"LOOMIS_EMPLOYEE_NAME" : "LOOMIS_EMPLOYEE_NAME",
		"PERSON_SSI_ID" : "PERSON_SSI_ID",
		"PERSON_NAME" : "PERSON_NAME",
		"PRODUCT_SSI_ID" : "PRODUCT_SSI_ID",
		"PRODUCT_NAME" : "PRODUCT_NAME",
		"PLAN_SPONSOR_SSI_ID" : "PLAN_SPONSOR_SSI_ID",
		"PLAN_SPONSOR_NAME" : "PLAN_SPONSOR_NAME",
		"SECURITY_FIDR_REPSEC_ID" : "SECURITY_FIDR_REPSEC_ID",
		"SECURITY_GPS_SEC_ID" : "SECURITY_GPS_SEC_ID",
		"SECURITY_CUSIP_ID" : "SECURITY_CUSIP_ID",
		"SECURITY_TICKER" : "SECURITY_TICKER",
		"SECURITY_SEDOL_ID" : "SECURITY_SEDOL_ID",
		"SECURITY_BLOOMBERG_ID" : "SECURITY_BLOOMBERG_ID",
		"SECURITY_ISIN_ID" : "SECURITY_ISIN_ID",
		"SECURITY_NAME" : "SECURITY_NAME",
		"CUSTODIAN_SSI_ID" : "CUSTODIAN_SSI_ID",
		"CUSTODIAN_NAME" : "CUSTODIAN_NAME",
		"ISSUER_NAME" : "ISSUER_NAME",
		"ISSUER_TICKER" : "ISSUER_TICKER"
}

in2AppTalk.IN2_ID_TYPE = {
    "SSI_ID" : 0,
    "GPS_SEC_ID" : 1,
    "ACID" : 2,
    "TICKER" : 3,
    "URL" : 4,
    "FIDR_ID" : 5
};

in2AppTalk.IN2_DATA_TYPE = {
    "ACCOUNT" : 0,
    "CLIENT" : 1,
    "COMPOSITE" : 2,
    "CONSULTANT" : 3,
    "INVESTMENT_MGR" : 4,
    "LOOMIS_EMPLOYEE" : 5,
    "EMPLOYEE" : 5,
    "PERSON" : 6,
    "PLAN_SPONSOR" : 7,
    "PRODUCT" : 8,
    "SECURITY" : 9,
    "SHARE_CLASS" : 10,
    "FUND" : 10,
    "MUTUAL_FUND" : 10,
    "CUSTODIAN" : 11,
    "BENCHMARK" : 12,
    "ISSUER" : 13
};

in2AppTalk.IN2_SECONDARY_DATA_TYPE = {
    "ACCOUNT" : "ACCOUNT",
    "ACTIVITY" : "ACTIVITY",
    "PRODUCT" : "PRODUCT",
    "CLIENT" : "CLIENT",
    "INVEST_MGR" : "INVEST_MGR",
    "CONSULTANT" : "CONSULTANT",
    "SECURITY" : "SECURITY",
    "ISSUER_TICKER" : "ISSUER_TICKER",
    "INDUSTRY1" : "INDUSTRY1",
    "INDUSTRY2" : "INDUSTRY2",
    "INDUSTRY3" : "INDUSTRY3",
    "INDUSTRY4" : "INDUSTRY4",
    "QUALITY_BUCKET" : "QUALITY_BUCKET",
    "DURATION_BUCKET" : "DURATION_BUCKET",
    "MSAA" : "MSAA",
    "URL" : "URL",
    "RESEARCH" : "RESEARCH",
    "ICON_SET" : "iconSet",
    "IN2_ITEM" : "item",
    "IN2_ITEMREF" : "node",
    "IN2_PLATFORM" : "PLATFORM",
    "IN2_PLATFORM_SET" : "PLATFORMSET",
    "IN2_USER" : "IN2USER"
};

in2AppTalk.INSITE_DATA_TYPE = {
	"ISSUER" : -1,
    "SECURITY" : 0,
    "PLAN_SPONSOR" : 1,
    "INVESTMENT_MGR" : 2,
    "CONSULTANT" : 3,
    "ACCOUNT" : 5,
    "CLIENT" : 6,
    "CUSTODIAN" : 8,
    "PRODUCT" : 9,
    "PLAN_SPONSOR_PERSON" : 14,
    "CONSULTANT_BRANCH_OFFICE_PERSON" : 17,
    "IM_BRANCH_OFFICE_PERSON" : 18,
    "CONSULTANT_PERSON" : 19,
    "IM_PERSON" : 20,
    "LOOMIS_EMPLOYEE" : 21,
    "EMPLOYEE" : 21,
    "ACCOUNT_PERSON" : 25,
    "BROKER_PERSON" : 26,
    "CUSTODIAN_PERSON" : 27,
    "ASSISTANT_PERSON" : 28,
    "INTERMEDIARY_PERSON" : 30,
    "PRIVATE_CLIENT_PERSON" : 32,
    "COMPOSITE" : 53,
    "SHARE_CLASS" : 61,
    "FUND" : 61,
    "MUTUAL_FUND" : 61,
    "ALL_PEOPLE" : 2000
};

//Date message passing enums

//NONE is exactly that
//AS_OF is point in time
//RANGE is either a point in time and period combo or two dates.
in2AppTalk.IN2_DATE_TYPE = {
	"NONE" : null,                         
	"AS_OF" : "ASOF",
	"ASOF" : "ASOF",
	"RANGE" : "RANGE"
};


//Combine with point in time
in2AppTalk.IN2_PERIOD_TYPE = {
	"NONE" : null,                         
    "YESTERDAY" : "D",
    "D" : "D",
    "WEEK" : "W",
    "WK" : "W",
    "W" : "W",
    "MTD" : "MTD",
    "TM" : "TM",   //Trailing Month
    "TRL_MTH" : "TM",
    "MTH" : "M",
    "M" : "M",
    "QTD" : "QTD",
    "TQ" : "TQ",    //Trailing Qtr
    "TRL_QTR" : "TQ",
    "Q" : "Q",
    "YTD" : "YTD",
    "TY" : "TY",   //Trailing Year
    "TRL_YR" : "TY",   
    "SI" : "SI"   //Since Inception
};

//essentially periodicity for attribution and performance
in2AppTalk.IN2_UNIT_TYPE = {
	"NONE" : null,                         
    "D" : "D",
    "W" : "W",
    "M" : "M",
    "Q" : "Q",
    "Y" : "Y"
};


in2AppTalk.IN2_DATE_PICKER_TYPE = {                        	                    
    "DAILY" : "DAILY",
    "MONTHLY" : "MONTHLY",
    "YEARLY" : "YEARLY"
};

//---
// Our "hooks" into the In2 Desktop messaging system
// When we get a message through these methods,
// republish the message locally with our subject and msg format
//---
function PrimaryItemChangedHandler(it, itDesc, itCode, uniqueIdType, uniqueIdVal, name, ticker, issuer, senderId, dateType, fromDate, toDate, periodType, unitType) {
    var msg = {
        in2type : it,
        label : itDesc,
        insitetype : itCode,
        uniqueIdType : uniqueIdType,
        uniqueIdVal : uniqueIdVal,
        name : name,
        ticker : ticker,
        issuer : issuer,
        senderId : senderId,
        dateType : dateType,
        fromDate : fromDate,
        toDate : toDate,
        periodType : periodType,
        unitType : unitType
    };

    if (arguments.length >= 10) {
        msg['src'] = arguments[9];
    }
    else {
        msg['src'] = 'in2dt';
    }

    in2AppTalk.getInstance().republish(in2AppTalk.MSG_TYPE.PRIMARY_ITEM_CHANGE, msg);
}

//---
// Our "hooks" into the In2 Desktop messaging system
// When we get a message through these methods,
// republish the message locally with our subject and msg format
//---
function PrimaryStackedItemChangedHandler(jsonStr) {
    var msg = null;

    //---
    try {
		msg = new HashMap();
		msg.fromJSONString(jsonStr);

   		in2AppTalk.getInstance().republish(in2AppTalk.MSG_TYPE.PRIMARY_STACKED_ITEM_CHANGE, msg);
    }
    catch (ex) {
    	console.log("PrimaryStackedItemChangedHandler() - Exception caught!  " + ex);
    }
}

//---
function SecondaryItemChangedHandler(itIdentifier, uniqueIdType, uniqueIdVal, name, senderId) {
    var msg = {
        itIdentifier : itIdentifier,
        uniqueIdType : uniqueIdType,
        uniqueIdVal : uniqueIdVal,
        name : name,
        senderId : senderId
    };

    if (arguments.length >= 6) {
        msg['src'] = arguments[5];
    }
    else {
        msg['src'] = 'in2dt';
    }

    in2AppTalk.getInstance().republish(in2AppTalk.MSG_TYPE.SECONDARY_ITEM_CHANGE, msg);
}

//---
// Our "hooks" into the iPad In2 WebView messaging system
// RegisterWithIn2AppTalk() will be called when the 'container' page is loaded
// on the iPad
// so in2AppTalk knows to make the calls to the WebView Controller messaging
// framework.
// WVCPublish() is used by the WebView Controller framework to publish messages
// through in2AppTalk.
//---
function RegisterWithIn2AppTalk() {
    window.in2OnIPad = true;
}

//---
// Expect 'pubStr' to be in 'key=value&' form
// eg:
// 'subject=PrimaryItemChange&in2type=7&label=Product&insitetype=9&uniqueIdType=0&uniqueIdVal=1448428&name=Core
// Equity Taxable'
//---
function WVCPublish(pubStr) {
    var outerTokens = null,
        innerTokens = null, 
        subject = null, 
        msg = null, 
        i = 0;

    //---
    if (pubStr) {

        //---
        // Anything using 'colonPos' is just for testing
        //---
        var colonPos;
        if ((colonPos = pubStr.indexOf('://')) !== -1) {
            colonPos += 3;
            pubStr = pubStr.substr(colonPos);
        }
        else if ((colonPos = pubStr.indexOf(':')) !== -1) {
        	// JD 05/14/2012
        	// Added the check on 'colonPos' because it was finding a colon 
        	// deep in the message and truncating at that position
        	// rendering the message useless
        	if (colonPos < 5) {
        		colonPos++;
        		pubStr = pubStr.substr(colonPos);
        	}
        }

        //---
        // Check for HashMap indicator
        //---
        if (pubStr.indexOf("dataType=HashMap") > -1) {
        	msg = new HashMap();
        	msg.fromKeyValueString(pubStr);
            msg.put('src', 'WVCPublish');

            if ((subject = msg.get("subject")) != null) {
            	msg.remove("subject");
            }
        }

        if ((subject == null) && (msg == null)) {
	        // The real work
	        // Split on '&' for 'key=value' pairs
	        // Then split on '=' to separate them and
	        // put them into 'msg' as property=value
	        outerTokens = pubStr.split('&');
	        if (outerTokens && (outerTokens.length > 0)) {
	            for (i = 0; i < outerTokens.length; i++) {
	                innerTokens = outerTokens[i].split('=');
	                if (innerTokens && (innerTokens.length === 2)) {
	                    if (innerTokens[0] === 'subject') {
	                        subject = innerTokens[1];
	                    }
	                    else {
	                    	/*
	                        if (innerTokens[0].startsWith("__")) {
	                            if (msg === null) {
	                                msg = [];
	                            	msg.push(new NameValuePair('src', 'WVCPublish'));
	                            }

	                        	var key = innerTokens[0].substr(2),
	                        	    value = innerTokens[1];

	                        	msg.push(new NameValuePair(key, value));
	                        }
	                        else {
	                        */
	                            if (msg === null) {
	                                msg = {};
	                                msg['src'] = 'WVCPublish';
	                            }

	                        	msg[innerTokens[0]] = innerTokens[1];
	                        /*
	                        }
	                        */
	                    }
	                }
	            }
	        }
        }
    }

    if ((subject !== null) && (msg !== null)) {
        in2AppTalk.getInstance().republish(subject, msg);
    }
    else {
    	alert("WVCPublish() - 'subject' and 'msg' are both NULL!\n'pubStr' = '" + pubStr + "'");
    }
}

//---
// iPad/iPhone/iPod status messages
// windowLoaded() is called to notify listeners that the window object has
// finished loading
// beginPageUpdate() is called to notify listeners a data request has been made
// pageUpdated() is called to notify listeners the request data has been
// received and processed
//---
function windowLoaded(iFrameLoc) {
    if ( window.in2OnIPad && (window.in2OnIPad == true) ) {
        var msg = {};
        if( typeof(iFrameLoc) != 'undefined' && iFrameLoc != null ) {
			if ( typeof(iFrameLoc) === 'string' && iFrameLoc.length > 0 ) {
				msg.CALLING_JAVA_OBJECT = iFrameLoc;
			} 
		}
        in2AppTalk.getInstance().publish(in2AppTalk.MSG_TYPE.WINDOW_LOADED, msg);
    }
}

function beginPageUpdate() {
    if ( window.in2OnIPad && (window.in2OnIPad === true) ) {
        var msg = {};
        in2AppTalk.getInstance().publish(in2AppTalk.MSG_TYPE.BEGIN_PAGE_UPDATE, msg);
    }
}

function pageUpdated() {
    if ( window.in2OnIPad && (window.in2OnIPad === true) ) {
		var msg = {};
		in2AppTalk.getInstance().publish(in2AppTalk.MSG_TYPE.PAGE_UPDATED, msg);
	}
}

//---
// More quick and dirty helper functions
// If the translations aren't right, please feel free to correct them.
//---
function xlateIn2ToInsiteType(in2type) {
	var retval = -1;

	switch (in2type) {
		case in2AppTalk.IN2_DATA_TYPE.ACCOUNT:
			retval = in2AppTalk.INSITE_DATA_TYPE.ACCOUNT;
			break;
		case in2AppTalk.IN2_DATA_TYPE.CLIENT:
			retval = in2AppTalk.INSITE_DATA_TYPE.CLIENT;
			break;
		case in2AppTalk.IN2_DATA_TYPE.COMPOSITE:
			retval = in2AppTalk.INSITE_DATA_TYPE.COMPOSITE;
			break;
		case in2AppTalk.IN2_DATA_TYPE.CONSULTANT:
			retval = in2AppTalk.INSITE_DATA_TYPE.CONSULTANT;
			break;
		case in2AppTalk.IN2_DATA_TYPE.INVESTMENT_MGR:
			retval = in2AppTalk.INSITE_DATA_TYPE.INVESTMENT_MGR;
			break;
		case in2AppTalk.IN2_DATA_TYPE.LOOMIS_EMPLOYEE:
			retval = in2AppTalk.INSITE_DATA_TYPE.LOOMIS_EMPLOYEE;
			break;
		case in2AppTalk.IN2_DATA_TYPE.EMPLOYEE:
			retval = in2AppTalk.INSITE_DATA_TYPE.EMPLOYEE;
			break;
		case in2AppTalk.IN2_DATA_TYPE.PLAN_SPONSOR:
			retval = in2AppTalk.INSITE_DATA_TYPE.PLAN_SPONSOR;
			break;
		case in2AppTalk.IN2_DATA_TYPE.PRODUCT:
		 	retval = in2AppTalk.INSITE_DATA_TYPE.PRODUCT;
			break;
		case in2AppTalk.IN2_DATA_TYPE.SECURITY:
			retval = in2AppTalk.INSITE_DATA_TYPE.SECURITY;
			break;
		case in2AppTalk.IN2_DATA_TYPE.SHARE_CLASS:
			retval = in2AppTalk.INSITE_DATA_TYPE.SHARE_CLASS;
			break;
		case in2AppTalk.IN2_DATA_TYPE.FUND:
			retval = in2AppTalk.INSITE_DATA_TYPE.FUND;
			break;
		case in2AppTalk.IN2_DATA_TYPE.MUTUAL_FUND:
			retval = in2AppTalk.INSITE_DATA_TYPE.MUTUAL_FUND;
			break;
		case in2AppTalk.IN2_DATA_TYPE.CUSTODIAN:
			retval = in2AppTalk.INSITE_DATA_TYPE.CUSTODIAN;
			break;
		case in2AppTalk.IN2_DATA_TYPE.ISSUER:
			retval = in2AppTalk.INSITE_DATA_TYPE.SECURITY;
			break;

		// These don't translate (yet)
		case in2AppTalk.IN2_DATA_TYPE.PERSON:
		case in2AppTalk.IN2_DATA_TYPE.BENCHMARK:
			break;
	}

	return retval;
}

function xlateInsiteToIn2Type(insitetype) {
	var retval = -1;

	switch (insitetype) {
		case in2AppTalk.INSITE_DATA_TYPE.ACCOUNT:
			retval = in2AppTalk.IN2_DATA_TYPE.ACCOUNT;
			break;
		case in2AppTalk.INSITE_DATA_TYPE.CLIENT:
			retval = in2AppTalk.IN2_DATA_TYPE.CLIENT;
			break;
		case in2AppTalk.INSITE_DATA_TYPE.COMPOSITE:
			retval = in2AppTalk.IN2_DATA_TYPE.COMPOSITE;
			break;
		case in2AppTalk.INSITE_DATA_TYPE.CONSULTANT:
			retval = in2AppTalk.IN2_DATA_TYPE.CONSULTANT;
			break;
		case in2AppTalk.INSITE_DATA_TYPE.INVESTMENT_MGR:
			retval = in2AppTalk.IN2_DATA_TYPE.INVESTMENT_MGR;
			break;
		case in2AppTalk.INSITE_DATA_TYPE.LOOMIS_EMPLOYEE:
			retval = in2AppTalk.IN2_DATA_TYPE.LOOMIS_EMPLOYEE;
			break;
		case in2AppTalk.INSITE_DATA_TYPE.EMPLOYEE:
			retval = in2AppTalk.IN2_DATA_TYPE.EMPLOYEE;
			break;
		case in2AppTalk.INSITE_DATA_TYPE.PLAN_SPONSOR:
			retval = in2AppTalk.IN2_DATA_TYPE.PLAN_SPONSOR;
			break;
		case in2AppTalk.INSITE_DATA_TYPE.PRODUCT:
			retval = in2AppTalk.IN2_DATA_TYPE.PRODUCT;
			break;
		case in2AppTalk.INSITE_DATA_TYPE.SECURITY:
			retval = in2AppTalk.IN2_DATA_TYPE.SECURITY;
			break;
		case in2AppTalk.INSITE_DATA_TYPE.SHARE_CLASS:
			retval = in2AppTalk.IN2_DATA_TYPE.SHARE_CLASS;
			break;
		case in2AppTalk.INSITE_DATA_TYPE.FUND:
			retval = in2AppTalk.IN2_DATA_TYPE.FUND;
			break;
		case in2AppTalk.INSITE_DATA_TYPE.MUTUAL_FUND:
			retval = in2AppTalk.IN2_DATA_TYPE.MUTUAL_FUND;
			break;
		case in2AppTalk.INSITE_DATA_TYPE.CUSTODIAN:
			retval = in2AppTalk.IN2_DATA_TYPE.CUSTODIAN;
			break;
	}

	return retval;
}

function in2TypeAsString(in2type) {
	var retval = "";

	switch (in2type) {
		case in2AppTalk.IN2_DATA_TYPE.ACCOUNT:
			retval = "Account";
			break;
		case in2AppTalk.IN2_DATA_TYPE.CLIENT:
			retval = "Client";
			break;
		case in2AppTalk.IN2_DATA_TYPE.COMPOSITE:
			retval = "Composite";
			break;
		case in2AppTalk.IN2_DATA_TYPE.CONSULTANT:
			retval = "Consultant";
			break;
		case in2AppTalk.IN2_DATA_TYPE.INVESTMENT_MGR:
			retval = "Investment Manager";
			break;
		case in2AppTalk.IN2_DATA_TYPE.LOOMIS_EMPLOYEE:
		case in2AppTalk.IN2_DATA_TYPE.EMPLOYEE:
			retval = "Loomis Employee";
			break;
		case in2AppTalk.PERSON:
			retval = "Person";
			break;
		case in2AppTalk.IN2_DATA_TYPE.PLAN_SPONSOR:
			retval = "Plan Sponsor";
			break;
		case in2AppTalk.IN2_DATA_TYPE.PRODUCT:
		 	retval = "Product";
			break;
		case in2AppTalk.IN2_DATA_TYPE.SECURITY:
			retval = "Security";
			break;
		case in2AppTalk.IN2_DATA_TYPE.SHARE_CLASS:
		case in2AppTalk.IN2_DATA_TYPE.FUND:
		case in2AppTalk.IN2_DATA_TYPE.MUTUAL_FUND:
			retval = "Mutual Fund";
			break;
		case in2AppTalk.IN2_DATA_TYPE.CUSTODIAN:
			retval = "Custodian";
			break;
		case in2AppTalk.IN2_DATA_TYPE.BENCHMARK:
			retval = "Benchmark";
			break;
		case in2AppTalk.IN2_DATA_TYPE.ISSUER:
			retval = "Issuer";
			break;
	}

	return retval;
}


function insiteTypeAsString(insitetype) {
	var retval = "";

	switch (insitetype) {
		case in2AppTalk.INSITE_DATA_TYPE.SECURITY:
			retval = "Security";
			break;
		case in2AppTalk.INSITE_DATA_TYPE.PLAN_SPONSOR:
			retval = "Plan Sponsor";
			break;
		case in2AppTalk.INSITE_DATA_TYPE.INVESTMENT_MGR:
			retval = "Investment Manager";
			break;
		case in2AppTalk.INSITE_DATA_TYPE.CONSULTANT:
			retval = "Consultant";
			break;
		case in2AppTalk.INSITE_DATA_TYPE.ACCOUNT:
			retval = "Account";
			break;
		case in2AppTalk.INSITE_DATA_TYPE.CLIENT:
			retval = "Client";
			break;
		case in2AppTalk.INSITE_DATA_TYPE.CUSTODIAN:
			retval = "Custodian";
			break;
		case in2AppTalk.INSITE_DATA_TYPE.PRODUCT:
			retval = "Product";
			break;
		case in2AppTalk.INSITE_DATA_TYPE.PLAN_SPONSOR_PERSON:
			retval = "Plan Sponsor Person";
			break;
		case in2AppTalk.INSITE_DATA_TYPE.CONSULTANT_BRANCH_OFFICE_PERSON:
			retval = "Consultant Branch Office Person";
			break;
		case in2AppTalk.INSITE_DATA_TYPE.IM_BRANCH_OFFICE_PERSON:
			retval = "IM Branch Office Person";
			break;
		case in2AppTalk.INSITE_DATA_TYPE.CONSULTANT_PERSON:
			retval = "Consultant Person";
			break;
		case in2AppTalk.INSITE_DATA_TYPE.IM_PERSON:
			retval = "IM Person";
			break;
		case in2AppTalk.INSITE_DATA_TYPE.LOOMIS_EMPLOYEE:
		case in2AppTalk.INSITE_DATA_TYPE.EMPLOYEE:
			retval = "Loomis Employee";
			break;
		case in2AppTalk.INSITE_DATA_TYPE.ACCOUNT_PERSON:
			retval = "Account Person";
			break;
		case in2AppTalk.INSITE_DATA_TYPE.BROKER_PERSON:
			retval = "Broker Person";
			break;
		case in2AppTalk.INSITE_DATA_TYPE.CUSTODIAN_PERSON:
			retval = "Custodian Person";
			break;
		case in2AppTalk.INSITE_DATA_TYPE.ASSISTANT_PERSON:
			retval = "Assistant Person";
			break;
		case in2AppTalk.INSITE_DATA_TYPE.INTERMEDIARY_PERSON:
			retval = "Intermediary Person";
			break;
		case in2AppTalk.INSITE_DATA_TYPE.PRIVATE_CLIENT_PERSON:
			retval = "Private Client Person";
			break;
		case in2AppTalk.INSITE_DATA_TYPE.COMPOSITE:
			retval = "Composite";
			break;
		case in2AppTalk.INSITE_DATA_TYPE.SHARE_CLASS:
		case in2AppTalk.INSITE_DATA_TYPE.FUND:
		case in2AppTalk.INSITE_DATA_TYPE.MUTUAL_FUND:
			retval = "Mutual Fund";
			break;
		case in2AppTalk.INSITE_DATA_TYPE.ALL_PEOPLE:
			retval = "All People";
			break;
	}

	return retval;
}

//---
// JD 05/29/2012 - Should make this a member function
//---
// This method will: 
// 1. Create an iframe element in the current DOM
// 2. Set its 'src' attribute to effect a web page 'hit'
// 3. Schedule the removal of the iframe two seconds after its use
//---
function publishMessageThruIFrame(msgStr) {
	var iframe = null;
	var iframeID = "";

	//---
	try {
		iframeID = "iframe_" + new Date().getTime();

		iframe = document.createElement('iframe');
		if ( iframe ) {
			iframe.id = iframeID;
            iframe.style.display = 'none';
            iframe.style.visibility = 'hidden';

            document.body.appendChild(iframe);

	    	iframe.src = msgStr;

	    	setTimeout(function() { removeIFrame(iframeID); }, 2000);
	    }
		else {
			alert("publishMessageThruIFrame() - ERROR: Couldn't create an iframe!");
		}
	}
	catch (ex) {
		alert("publishMessageThruIFrame() - ERROR: Exception caught! " + ex);
	}
}

function removeIFrame(iframeID) {
	var iframeToRemove = null;

	try {
		iframeToRemove = document.getElementById(iframeID);
		if (iframeToRemove) {
			document.body.removeChild(iframeToRemove);
		}
		else {
			// If we're here, things aren't good
			console.log("removeIFrame() - Couldn't find the iframe '" + iframeID + "'!");
		}
	}
	catch (ex) {
		alert("removeIFrame() - ERROR: Exception caught! " + ex);
	}
}
