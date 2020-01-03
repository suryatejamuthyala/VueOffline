var HashMap = function() {
	this.initialize();
};

HashMap.prototype = {

	/*
	 * Method to initialize this object
	 */ 
	initialize: function() {
		this.dataTypeKey = "dataType";
		this.dataTypeVal = "HashMap";

		this.keyList = new Array();
		this.values = new Array();
		this.assoc = new Array();
	},

	/*
	 * Method to identify this class/object
	 */ 
	toString: function() {
		return this.dataTypeVal;
	},

	/*
   	 maps value to key returning previous association
	 */
	put: function(key, value) {
		var prev = null, 
		    pos = -1;

		//if (this.validateKey( key ) && value) {
		if (this.validateKey( key )) {
			if ( this.keyList.indexOf( key ) === -1 ) {
				this.keyList.push( key );
				this.values.push( value );
				this.assoc[key] = value;
			}
			else {
				var tmpVal = this.assoc[key];
				pos = this.values.indexOf( tmpVal );
				if ( pos !== -1 ) {
					prev = this.values.splice(pos, 1, value)[0];
				}

				this.assoc[key] = value;
			}
		}

		return prev;
	},

	/*
	 returns value associated with given key
	 */
	get: function(key) {
		var value = null;

		if ( this.validateKey( key ) ) {
			value = this.assoc[key];
		}

		return value;
	},

	/*
	 deletes association by given key.
	 Returns true if the association was removed, false otherwise
	 */
	remove: function(key) {
		var success = false,
		    tmpVal = null,
		    pos = -1;

		if ( this.validateKey( key ) ) {
			tmpVal = this.assoc[key];
			if (tmpVal != null) {
				pos = this.values.indexOf( tmpVal );
				if ( pos !== -1 ) {
					this.values.splice(pos, 1);
				}

				pos = this.keyList.indexOf( key );
				if ( pos !== -1 ) {
					this.keyList.splice(pos, 1);
				}

				this.assoc[key] = null;
				retval = true;
			}
		}

		return success;
	},

	// Get a deep copy of the keys in the HashMap
	keys: function() {
		var retval = new Array();
		for ( var i = 0; i < this.keyList.length; i++ ) {
			retval[i] = this.keyList[i];
		}

		return retval;
	},
	
	// Get a deep copy of the values in the HashMap
	values: function() {
		var retval = new Array();
		for ( var i = 0; i < this.values.length; i++ ) {
			retval[i] = this.values[i];
		}

		return retval;
	},

	// Remove everything in the HashMap
	clear: function() {
		var keyColl = this.keys();

		// Walk through the keys, calling remove() for each
		for ( var i = 0; i < keyColl.length; i++ ) {
			this.remove( keyColl[i] );

			// splice() doesn't work on keys of type 'string' in 'assoc'
			// but delete does so use it to remove them
			if ( typeof keyColl[i] === 'string' ) {
				delete this.assoc[keyColl[i]];
			}
		}

		// Reset the length of 'assoc' to 0
		this.assoc.length = 0;
	},

	// Ensure 'key' is valid by checking its type then contents
	validateKey: function( key ) {
		var retval = false;
		var keyType = null;

		//---
		// Get the data type of 'key'
		//---
		keyType = typeof key;

		// If it's 'number', it's good regardless of value
		if ( keyType === 'number' ) {
			retval = true;
		}
		// If it's 'string', it's only good if it's not empty
		// (null strings drop into the next case)
		else if ( keyType === 'string' ) {
			if ( key !== "" ) {
				retval = true;
			}
		}
		// If it's 'object', it could be anything
		// so don't allow null values
		else if ( keyType === 'object' ) {
			if ( key !== null ) {
				retval = true;
			}
		}

		return retval;
	},

	//---
	// We should probably extend HashMap into a new class
	// and move these methods into that extended class
	// But this will have to do for the time being
	//---
	// 'retval' will be in this format:
	//     [{"Key":"key1","Value":"val1"},{"Key":"key2","Value":"val2"},...]
	//---
	toJSONString: function() {
		var retval = null;
		var sb = [];

		//---
		try {
			var keys = this.keys();
			for (var i = 0; i < keys.length; i++ ) {
				var val = this.get(keys[i]);
				if (val != null) {
					if (i > 0) {
						sb.push(',');
					}

					sb.push('{"Key":"');
					sb.push(keys[i]);
					sb.push('","Value":');

					if (val != null) {
						if (typeof val == 'string') {
							sb.push('"');
							sb.push(val);
							sb.push('"');
						}
						else if (typeof val == 'object') {
							sb.push('"');
							sb.push(val);
							sb.push('"');
						}
						else {
							sb.push(val);
						}
					}

					sb.push('}');
				}
			}
		}
		catch (ex) {
			alert("HashMap.toJSONString() - Exception caught!  " + ex);
		}
		finally {
			var tmpArr = [];

			tmpArr.push("[");
			if (sb.length > 0) {
				tmpArr.push(sb.join(""));
			}
			tmpArr.push("]");

			retval = tmpArr.join("");
		}

		return retval;
	},

	//---
	// 'jsonStr' will be in this format:
	//     [{"Key":"key1","Value":"val1"},{"Key":"key2","Value":"val2"},...]
	//---
	fromJSONString: function(jsonStr) {
		var jsonArrayObj = null, 
		    i = 0,
		    elem = null;

		try {
	    	jsonArrayObj = JSON.parse(jsonStr);
	    	if ((jsonArrayObj != null) && (jsonArrayObj.length > 0)) {
	    		for (i = 0; i < jsonArrayObj.length; i++) {
	    			elem = jsonArrayObj[i];
	    			this.put(elem.Key, elem.Value);
	    		}
	    	}
    	}
	    catch (ex) {
			alert("HashMap.fromJSONString() - Exception caught!  " + ex);
	    }
	},

	//---
	// 'retval' will be in this format:
	//     key=value&key=value&key=value
	//---
	toKeyValueString: function() {
		var keys = null;
		var retval = null;
		var sb = [];

		//---
		try {
			keys = this.keys();

			if (keys.indexOf(this.dataTypeKey) == -1) {
				this.put(this.dataTypeKey, this.dataTypeVal);

				keys = this.keys();
			}

			for (var i = 0; i < keys.length; i++ ) {
				var val = this.get(keys[i]);
				if (val != null) {
					if (sb.length > 0) {
						sb.push('&');
					}

					sb.push(encodeURIComponent(keys[i]));
					sb.push('=');
					sb.push(encodeURIComponent(val));
				}
			}
		}
		catch (ex) {
			alert("HashMap.toKeyValueString() - Exception caught!  " + ex);
		}
		finally {
			retval = sb.join("");
		}

		return retval;
	},

	//---
	// 'inKVStr' will be in this format:
	//     key=value&key=value&key=value
	//---
	fromKeyValueString: function(inKVStr) {
	    var ampStrArray = null,
            kvPairArray = null, 
            i = 0;
	    var key, val, tmpKey, tmpVal;

	    //---
	    try {
	    	// Split the Key/Value pairs on the ampersands
	    	ampStrArray = inKVStr.split('&');
	        if (ampStrArray && (ampStrArray.length > 0)) {
	            for (i = 0; i < ampStrArray.length; i++) {

	            	// Split the key from the value on the equal sign
	            	kvPairArray = ampStrArray[i].split('=');
	                if (kvPairArray && (kvPairArray.length === 2)) {

	                	// Process the key
	                	key = decodeURIComponent(kvPairArray[0]);

	                	// Try to convert 'key' to a number
	                	tmpKey = key * 1;

	                	// Yes, this says "If not is not a number..." or,
	                	// simply put "If is a number..."
	                	if (!isNaN(tmpKey)) {
	                		key = tmpKey;
	                	}

	                	// Process the value part of the pair
	                	val = decodeURIComponent(kvPairArray[1]);

	                	// Try to convert value to number
	                	tmpVal = val * 1;

	                	// If it's a valid number (not a not a number)
	                	if (!isNaN(tmpVal)) {
	                		val = tmpVal;
	                	}
	                	else {
	                		// Check for boolean values
	                		if (val.toLowerCase() == "true") {
	                			val = true;
	                		}
	                		else if (val.toLowerCase() == "false") {
	                			val = false;
	                		}
	                	}

	                	this.put(key, val);
	                }
	            }
	        }
	    }
	    catch (ex) {
			alert("HashMap.fromKeyValueString() - Exception caught!  " + ex);
	    }
	},
	
	htmlDump: function() {
		var keys = null;
		var retval = null;
		var sb = [];

		//---
		try {
			keys = this.keys();
			for (var i = 0; i < keys.length; i++ ) {
				var val = this.get(keys[i]);
				if (val) {
					if (sb.length > 0) {
						sb.push('<br/>');
					}

					key = keys[i];

					if (typeof key == 'string') {
						sb.push("'");
						sb.push(key);
						sb.push("'");
					}
					else {
						sb.push(key);
					}

					sb.push(' = ');

					if (val != null) {
						if (typeof val == 'string') {
							sb.push("'");
							sb.push(val);
							sb.push("'");
						}
						else {
							sb.push(val);
						}
					}
				}
			}
		}
		catch (ex) {
			alert("HashMap.htmlDump() - Exception caught!  " + ex);
		}
		finally {
			retval = sb.join("");
		}

		return retval;
	},
	
	containsKey: function(key) {
		var retval = false;
		var keyPos = -1;
		
		//---
		try {
			if (key) {
				if ((keyPos = this.keys().indexOf(key)) > -1) {
					retval = true;
				}
			}
		}
		catch (ex) {
			alert("HashMap.containsKey() - Exception caught!  " + ex);
		}
		finally {
		}

		return retval;
	}
};
