var utils = (function() {
  return {
    /**
      Formats date string to readable date.
      @param {dateString} A string representing an RFC2822 or (a variant of) ISO 8601 date e.g. 2018-03-05T18:00:00.000+08:00
      @param {isLong} Boolean specifying if returned month should be long (January etc.)
      @returns {string} Date formatted in "dd mmm yyyy" e.g. 5 Mar 2018
	*/
    formatDate: function(t, isLongMonth = false) {
      let temp = new Date(t);
      let day = temp.getDate();
      let i18nMonth = [];
      for (let i = 0; i < 12; i++) {
        let month = isLongMonth ? kony.i18n.getLocalizedString('utils.monthLong.' + (i + 1)) : kony.i18n.getLocalizedString('utils.monthShort.' +
          (i + 1));
        i18nMonth.push(month);
      }
      let year = temp.getFullYear();

      let result = day.toString() + " " + i18nMonth[temp.getMonth()] + " " + year;
      return (result);
    },

    /**
      Formats date string to readable date.
      @param {dateString} A string representing an RFC2822 or (a variant of) ISO 8601 date e.g. 2018-03-05T18:00:00.000+08:00
      @returns {string} Date formatted in "day, dd mmm yyyy" e.g. Monday, 31 Dec 2018
	*/
    formatDateWithDay: function(val) {
      let tempDate = new Date(val);
      let i18nDay = [];
      for (let i = 0; i < 7; i++) {
        let day = kony.i18n.getLocalizedString('utils.day.' + i);
        i18nDay.push(day);
      }
      let date = this.formatDate(tempDate.toString(), true);
      let result = i18nDay[tempDate.getDay()] + ", " + date;

      return (result);
    },

    /**
      Formats date string to readable date.
      @param {dateString} A string representing an RFC2822 or (a variant of) ISO 8601 date e.g. 2018-03-05T18:00:00.000+08:00
      @param {withoutDay} Boolean specifiying if the return should have day or not
      @param {isReverse} Boolean reversing the format of returned date.
      @returns {string} Date formatted in "hh:mm AM/PM dd mmm yyyy" e.g. 5:00PM Monday, 31 Dec 2018
	*/

    formatDateLong: function(val, withoutDay, isReverse) {
      withoutDay = typeof withoutDay === "boolean" ? withoutDay : false;
      isReverse = typeof isReverse === "boolean" ? isReverse : false;
      const timeSeparator = ".";
      let time = "";

      let i18nDay = [];
      for (let i = 0; i < 7; i++) {
        let day = kony.i18n.getLocalizedString('utils.day.' + i);
        i18nDay.push(day);
      }

      let tempDate = new Date(val);
      let hour = tempDate.getHours().toString();
      let minute = tempDate.getMinutes().toString().length === 2 ? tempDate.getMinutes().toString() : "0" + tempDate.getMinutes().toString();
      let day = tempDate.getDay();
      let date = this.formatDate(tempDate.toString());


      if (Number(hour) > 11) {
        time = (Number(hour) === 12) ? hour + timeSeparator + minute + "PM " : hour - 12 + timeSeparator + minute + "PM ";
      } else if (Number(hour) === 0) {
        time = "12" + timeSeparator + minute + "AM ";
      } else {
        time = hour + timeSeparator + minute + "AM ";
      }

      if (withoutDay) {
        time = time.substring(0, time.length - 1);
        time = isReverse ? date + ", " + time : time + ", " + date;
        //         time += ", " + date;
      } else {
        time += i18nDay[day] + ", " + date;
      }
      return (time);
    },

    /**
      Formats date string to readable time.
      @param {dateString} A string representing an RFC2822 or (a variant of) ISO 8601 date e.g. 2018-03-05T18:00:00.000+08:00
      @returns {string} Time formatted in "hh24:mi" e.g. 20:15
	*/
    formatTime24Hr: function(t) {
      let temp = new Date(t);
      let hours = temp.getHours().toString();
      let minutes = temp.getMinutes().toString();
      if (hours.length === 1) {
        hours = "0" + hours;
      }
      if (minutes.length === 1) {
        minutes = "0" + minutes;
      }
      let result = hours + ":" + minutes;
      return (result);
    },

    /**
			Checks if parameter is a valid object of its own type.
			@param {data type} any data type
			@returns {boolean} true if data type satisfies itself
			- '' > false
            - ' ' > true
            - false > false
            - true > true
            - 0 > false
            - 1 > true
            - -1 > true
            - {} > true
            - null > false
            - undefined > false
            - new Date() > true
		*/
    isValidObject: (param) => {
      if (typeof(param) !== "undefined" && param) {
        return true;
      }

      return false;
    },

    /**
    Checks if parameter is a valid number.
    @param {data type} any data type
    @returns {boolean} true if data type satisfies itself
      - any number > true
      - null > false
      - undefined > false
    */
    isValidNumber: (param) => {
      if (typeof(param) === 'number' && !isNaN(param)) {
        return true;
      }
      return false;
    },

    /**
			Checks if object is null or a valid function.
			@param {data type} any data type
			@returns {boolean} true if null or is a function
		*/
    isNullOrIsValidFunction: (param) => {
      return (param === null || typeof(param) === 'function') ? true : false;
    },

    /**
    Checks if the given parameter is an Object type.
    @param {object}
    @returns {boolean} true if object is Object type else false
    **/
    isObject: (obj) => {
      return Object.prototype.toString.call(obj) === "[object Object]";
    },

    /**
    Checks if the given parameter is an Array type.
    @param {object}
    @returns {boolean} true if object is an Array else false
    **/
    isArray: (arr) => {
      return Object.prototype.toString.call(arr) === "[object Array]";
    },

    /**
    Check for empty object
    @param {object}
    @returns {boolean} true if object is empty, false if object is not empty
    **/
    isEmpty: function(param) {
      if (this.isObject(param)) {
        return Object.keys(param).length === 0;
      } else if (this.isArray(param)) {
        return param.length === 0;
      } else {
        return true;
      }
    },

    /**
    Formats amount with thousand separator and two decimal points
    @param {amount} Amount to display
    @param {currency} Currency to display
    @param {decimalPlace} Number of decimal place
    @returns {string} Formatted amount
    */
    formatAmount: function(amount, currency, decimalPlace, isSignDisplayed = false) {
      try {
        let absAmount = Math.abs(amount);
        let decPlace = typeof decimalPlace === 'number' ? decimalPlace : 2;
        let formattedAmount = absAmount.toFixed(decPlace).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
        if (currency) {
          if (amount < 0) return '- ' + currency + ' ' + formattedAmount;
          else {return (isSignDisplayed ? '+ ' : "") + currency + ' ' + formattedAmount;}
        } else {
          if (amount < 0) return '- ' + formattedAmount;
          else {return (isSignDisplayed ? '+ ' : "") + formattedAmount;}
        }
      } catch (err) {
        kony.logger("Unable to format amount " + err);
      }
    },

    /**
    Returns formatted amount in an object with amount and isNegative flag.
    {
      amount : (value same with formatAmount function),
      isNegative : (flag to know if the amount is negative value)
    }
    @param {amount} Amount to display
    @param {currency} Currency to display
    @returns {string} Formatted amount object
    */
    getFormattedAmountObject: function(amount, currency) {
      try {
        let formattedAmountObject = {
          amount: amount,
          isNegative: false
        };
        formattedAmountObject.amount = utils.formatAmount(amount, currency);
        formattedAmountObject.isNegative = (amount < 0) ? true : false;
        return formattedAmountObject;
      } catch (err) {
        kony.logger("Unable to format amount " + err);
      }
    },

    /**
        Formating number to a maximum amount of 999 million
        Number exceeding 999,999.99 will be converted into 'X + 'million +' respectively e.g. 10,123,456.78 = 10 million +
        @param {number} Amount
        @param {currency} Currency to display - optional, defaults to CURRENCY_CODE
        @param {decimalPosition} Number of decimal place
        @returns {string} Formatted amount with currency and >= 1 million handling
    **/
    formatAmountTrimmed: function(amount, currency, decimalPosition, isSignDisplayed = false) {
      try {
        let formattedAmount;
        let absAmount = Math.abs(amount);
        let million = kony.i18n.getLocalizedString('utils.amount.million');
        let billion = kony.i18n.getLocalizedString('utils.amount.billion');
        let integer = String(absAmount).split('.')[0];

        if (integer > 999999999) {
          formattedAmount = integer.slice(0, -9) + ' ' + billion;
          if (String(amount).slice(-9) !== '000000000') formattedAmount += ' +';
        } else if (integer > 999999) {
          formattedAmount = integer.slice(0, -6) + ' ' + million;
          if (String(amount).slice(-6) !== '000000') formattedAmount += ' +';
        } else {
          formattedAmount = utils.formatAmount(absAmount, null, decimalPosition);
        }
        if (currency) {
          if (amount < 0) return '- ' + currency + ' ' + formattedAmount;
          else{return (isSignDisplayed ? '+ ' : "") + currency + ' ' + formattedAmount;} 
        } else {
          if (amount < 0) return '- ' + formattedAmount;
          else{return (isSignDisplayed ? '+ ' : "") + formattedAmount;}
        }
      } catch (err) {
        kony.logger("Unable to format and trim amount " + err);
      }
    },

    /**
        Sets shadow for Android rendering
        @param {widget} Widget reference
    */
    setShadow: function(widget) {
      try {
        widget.shadowDepth = 4;
        widget.shadowType = constants.BACKGROUND_SHADOW;
      } catch (exp) {
        kony.print(exp);
      }
      return widget;
    },

    /**
        Dummy function; required to fix iOS segment
		onClick skinning issue if segment row has no onClick behavior
        @param {}
		@returns {void}
    */
    dummyFunction: function() {
      //	Do nothing
    },

    /**
        Convert the input to masked value based on masking type.
        @param   {String} value - field value
        @param   {Number} maskingType - MASKING_TYPE.ALL = Masking ALL characters (DEFAULT), MASKING_TYPE.CARD = Masking for Card Numbers, MASKING_TYPE.MOBILE = Masking for Mobile Numbers, MASKING_TYPE.USER_NAME = Masking for User Name.
        @returns {Object} maskedObject - Object which contains the actual and masked value. {value:'value', masked:'masked'}
    */
    convertToMaskedValue: function(value, maskingType) {
      let maskedObject = {};
      let maskConverter = require("utils/textMasking/MaskConverter");
      maskConverter.setValue(value);
      maskedObject = maskConverter.getMaskedData(maskingType);
      return maskedObject;
    },

    /**
      Get the Polling Configuration retrieve upon app login.
      TODO: Replace this with pre-auth values once Sprint 3 is ready
    */
    getPollingConfiguration: function() {
      return {
        INTERVAL_IN_MILISECONDS: 2000,
        MAX_POLLING_COUNT: 3,
        POLLING_INDIVIDUAL_TIMEOUT: 2000
      };
    },

    /**
        Display the first letter of the first and second name
        @param   {String} name - Name
        @returns {String} initials - Initials of first and second name
    */
    getInitials: function(name) {
      let initials = '';
      if (name.indexOf(" ") > 0) {
        let res = name.split(" ");
        initials = ((res[0][0] || '') + (res[1][0] || '')).toUpperCase();
      } else {
        initials = name.substring(0, 2).toUpperCase();
      }
      return initials;
    },

    /**
        Truncate text and append '...' if length > maximum characters. Truncates by taking first characters up to (maxChar - 1) and adds '...'
        @param   {String} text to check and truncate
        @param   {Number} maxChar - maximum number of characters that will not be truncated
        @returns {String} truncated text + '...' if length > maxChar; else return text itself
    */
    truncateText: function(text, maxChar) {
      let truncatedText = text;
      let appendStr = '...';
      try {
        if (typeof(maxChar) === 'number') {
          if (text.length > maxChar) {
            truncatedText = text.substr(0, maxChar - 1) + appendStr;
          }
        } else {
          alert('maxChar parameter should be an integer');
        }
      } catch (err) {
        kony.print(err);
      }

      return truncatedText;
    },

    /**
        Formatting CASA Account number
        @param {String} accNumber - Account number to format
        @return {String} formatted account number with hyphen
    */
    formatAccountNo: function(accNumber) {
      let spacedValue = accNumber;
      try {
        if(!accNumber || accNumber !== ""){
          if (accNumber.length === 16){ // For credit card numbers 
            spacedValue = this.convertToMaskedValue(accNumber, MASKING_TYPE.CARD).masked;
          } else {
            const MATCHREGEX = /(\d{1})(\d{5})(\d{7})(\d{1})/;
            let matchValue = accNumber.match(MATCHREGEX);
            spacedValue = matchValue[1] + '-' + matchValue[2] + '-' + matchValue[3] + '-' + matchValue[4];
          }
        }
      } catch (err) {
        kony.print(`DEBUG >> Exception occurred formatAccountNo: ${err}`);
      }

      return spacedValue;
    },

    /**
        Formatting account or card number based on type
        @param {object} {type, cardNumber, accountNumber}
        @return {string} (optional) subfunction to supersede the type field (used for payment to own)
    */
    formatAccountDisplay: function(accountObj) {
      let accountCategory = accountObj.type;

      let accountDisplay = '';
      switch (accountCategory) {
        case ACCOUNT_CATEGORY.savings.name:
        case ACCOUNT_CATEGORY.current.name:
        case ACCOUNT_CATEGORY.mortgage.name:
        case ACCOUNT_CATEGORY.termDeposit.name:
        case ACCOUNT_CATEGORY.asb.name:
        case ACCOUNT_CATEGORY.personalFinance.name:
          accountDisplay = this.formatAccountNo(accountObj.accountNumber);
          break;
        case ACCOUNT_CATEGORY.creditCard.name:
        case ACCOUNT_CATEGORY.debitCard.name:
          accountDisplay = this.convertToMaskedValue(accountObj.cardNumber, MASKING_TYPE.CARD).masked;
          break;
        default:
          // Hire purchase is not formatted
          accountDisplay = accountObj.accountNumber;
      }
      return accountDisplay;
    },



    /**
     * Transform the i18n keys objec to i18n values.
     *
     * @param i18nkeys - Object which contains i18n keys.
     */
    transformI18NObject: function(i18nKeys) {
      Object.keys(i18nKeys).map((key) => {
        i18nKeys[key] = kony.i18n.getLocalizedString(i18nKeys[key]);
      });
      //return transformI18NObject;
    },

    /**
  		Maps i18n values from i18n keys
        @param {object} i18n keys
        @return {object} transformed strings
  */
    transformI18NKeysToValues: function(i18nKeys) {
      let transformedI18n = {};
      Object.keys(i18nKeys).map(function(key) {
        transformedI18n[key] = kony.i18n.getLocalizedString(i18nKeys[key]);
      });

      return transformedI18n;
    },

    /**
        Deep clone a JSON object
        @param {Object} object - Object to clone
        @return {Object} the cloned object
    */
    cloneObject: function(object) {
      return JSON.parse(JSON.stringify(object));
    },

    /**
    	Convert text to title case (capitalize first letter of each word)
        @param {String} text to convert
        @return {String} title text string
    */
    toTitleCase: function(text) {
      return text.toLowerCase().split(' ').map(function(word) {
        return word.replace(word[0], word[0].toUpperCase());
      }).join(' ');
    },

    /**
        Format number with commas
        @param {string or number} Number to be formatted
        @return {string} Formatted number with commas at thousands
    */
    formatNumber: function(number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    /**
     *  Group data by specified property
     *  @param {array} Data array
     *  @param {string} Property to group with
     *  @return {array} Array object with two keys, 'property' which the property to group with and 'array' which is the array of data that belongs to the same group
     */
    groupByArray: function(data, key) {
      return data.reduce(function(groups, element) {
        // Value for property to group the elements with
        let propToGroup = element[key];
        // Check if there is same property in the group
        let existingGroup = groups.find((val) => val && val.property === propToGroup);
        // If there is push the element into the same array
        if (existingGroup) existingGroup.array.push(element);
        // Else create a new group/object
        else groups.push({
          property: propToGroup,
          array: [element]
        });
        return groups;
      }, []);

    },
    /**
     * @function - Use to capitalize the first letter of a String.
     *
     * @param valueString
     */
    capitalizeFirstLetter: function(valueString) {
      return valueString.charAt(0).toUpperCase() + valueString.slice(1);
    },


    checkAccountPermission: function(view, permission, successCallback, isNavigating = true) {
      let hasPermission = false;
      if (this.isArray(permission)) {
        for (let item of permission) {
          hasPermission = userSession.accounts[item];
          if (hasPermission) break;
        }
      } else {
        hasPermission = userSession.accounts[permission];
      }
      if (successCallback) {
        if (hasPermission) successCallback();
        else statusOverlay.showPermissionError(view, isNavigating);
      } else
        return hasPermission;
    },

    encryptDataHsm: function(key, data) {
      let cryptography = require("fnd/crypto/CryptographyMethod");
      return cryptography.encryptHsm(key, data);
    },

    encryptHsmCardPin: function(key, data) {
      let cryptography = require("fnd/crypto/CryptographyMethod");
      return cryptography.encryptHsmCardPin(key, data);
    },

    decryptDataHsm: function(key, data) {
      let cryptography = require("fnd/crypto/CryptographyMethod");
      return cryptography.decryptHsm(key, data);
    },

    generateEncryptionKey: function() {
      let cryptography = require("fnd/crypto/CryptographyMethod");
      return cryptography.generateRandomKey();
    },

    encryptRefreshToken: function(key, data) {
      let cryptography = require("fnd/crypto/CryptographyMethod");
      return cryptography.encryptToken(key, data);
    },

    decryptRefreshToken: function(key, data) {
      let cryptography = require("fnd/crypto/CryptographyMethod");
      return cryptography.decryptToken(key, data);
    },

    constructPasswordPad: function(password) {
      let cryptography = require("fnd/crypto/CryptographyMethod");
      return cryptography.constructPWPadding(password);
    },

    xorStrings: function(param1, param2) {
      let cryptography = require("fnd/crypto/CryptographyMethod");
      return cryptography.xorStrings(param1, param2);
    },

    retrieveRefreshToken: function(deviceId) {
      let keychainId = deviceId; // unique identifier for refresh token encryption key
      let storeKey = DATASTORE_KEYS.refreshToken;
      let keychainAcc = deviceId; // required to be unique in iOS only

      let keyData = store.getKeychain(keychainId, keychainAcc);
      //if has key, retrieve encrypted token from key store
      if (keyData) {
        let encRefreshToken = store.getPersistent(storeKey);
        //decrypt the encrypted token using userSession device Id
        if (encRefreshToken) {
          let decryptedRefreshToken = utils.decryptRefreshToken(keyData, encRefreshToken);
          kony.print(`DEBUG >> Decrypted refresh token: ${decryptedRefreshToken}`);
          return decryptedRefreshToken;
        }
      }
      return '';
    },

    saveRefreshToken: function(deviceId, token) {
      //store the device id as a key for encryption
      let keychainId = deviceId; // unique identifier for refresh token encryption key
      let storeKey = DATASTORE_KEYS.refreshToken;
      let keychainAcc = deviceId; // required to be unique in iOS only

      let encRefreshToken;
      let encKey = this.generateEncryptionKey();
      let saveKeychainStatus = store.setKeychain(keychainId, keychainAcc, encKey);
      if (saveKeychainStatus) {
        encRefreshToken = utils.encryptRefreshToken(encKey, token);
        if (encRefreshToken) {
          try {
            store.setPersistent(DATASTORE_KEYS.refreshToken, encRefreshToken);
            //             userSession.refreshToken = token; // store unencrypted token in session
          } catch (err) {
            kony.print(`DEBUG >> Unable to store encrypted refreshToken`);
          }
        }
      }
    },

    removeRefreshToken: function(deviceId) {
      let keychainId = deviceId; // unique identifier for refresh token encryption key
      let storeKey = DATASTORE_KEYS.refreshToken;
      let keychainAcc = deviceId; // required to be unique in iOS only

      let keyData = store.getKeychain(keychainId, keychainAcc);
      if (keyData) {
        store.removeKeychain(keychainId);
        store.removePersistent(storeKey);
        userSession.refreshToken = '';
        userSession.accessToken = '';
      }
    },

    invokeAutoEnrollment: function(form, context) {
      /** IMPORTANT:
       * For development mode, if there is a global 'hasSecurePlus' and it is false, registration steps will be skipped
       */

      let failCount = 0;
      const MAX_FAIL_COUNT = 3;

      let getTnCFailure = function(response) {
        // Failure handling for pre-dashboard flow
        failCount++;
        loadingOverlay.remove();
        let responseStatus = {};
        if (response.opstatus === 0 && response.status) responseStatus = response.status;
        if (failCount < MAX_FAIL_COUNT) {
          statusOverlay.showError(this.view, 3, responseStatus, getTnC);
        } else {
          statusOverlay.showError(this.view, 5, responseStatus);
        }
      };

      let getTnCSuccess = function(response) {
        let objToPass = {};
        kony.print(`DEBUG >> getTnCSuccess: ${JSON.stringify(response)}`);
        switch (response.status.code) {
          case '10000':
            objToPass.tncURL = response.data.url;
            objToPass.tncVersion = response.data.version;
            objToPass.isComingFromDetail = "Login";
            loadingOverlay.remove();
            nav.navigate("mgt/frmSecurePlusSetup", objToPass);
            break;
          default:
            getTnCFailure(response);
            break;
        }
      };

      let getTnC = function() {
        let request = {
          category: 'SECUREPLUS'
        };
        fabric.invokeService('getTermsAndConditions', null, request, getTnCSuccess, getTnCFailure);
      };

      kony.print("START - Auto Enrollment");

      let evaluateNextPage = function(formObj) {
        loadingOverlay.remove();
        if (userSession.newDeviceLogin) {
          getTnC();
        } else {
          if(userSession.profile && !userSession.profile.hasPrimaryDevice){
            statusOverlay.setCloseCallback(nav.navigate.bind(this, form, context));
            statusOverlay.showError(formObj, "noPrimaryDevice", null, null, true);
            return;
          } else {
            nav.navigate(form, context);
          }
        }
      };

      if (typeof hasSecurePlus === 'undefined' || hasSecurePlus) {
        //#ifdef android
        if (utils.checkAndroidPermissions(ANDROID_PERMISSIONS.SECUREPLUS)) {
          kony.print(`DEBUG >> SecurePlus Permissions granted`);
          //#endif

          if (!userSession.profile.securePlusSetup) {
            loadingOverlay.show(this.view, kony.i18n.getLocalizedString("utils.secure.plus.loading.title"),
              kony.i18n.getLocalizedString("utils.secure.plus.loading.message"));
            let SecurePlus = require("securePlus/SecurePlus");
            kony.print(`DEBUG >> clearSecureStorage`);
            SecurePlus.clearSecureStorage();
            SecurePlus.setReturnCallback((response) => {
              evaluateNextPage(this.view);
            });
            kony.print(`DEBUG >> Start SecurePlus registration`);
            SecurePlus.register(this.view);
          } else {
            evaluateNextPage(this.view);
          }

          //#ifdef android
        } else {
          kony.print(`DEBUG >> SecurePlus Permissions not granted`);
          evaluateNextPage(this.view);
        }
        //#endif
      } else {
        evaluateNextPage(this.view);
      }
    },

    retrieveAppConfigValue: function(parameter) {
      let requiredConfig = serverAppConfig.find(config => config.parameter === parameter);
      if (requiredConfig !== undefined) {
        return requiredConfig.value;
      } else {
        kony.print(`DEBUG >> appConfig ${parameter} not found`);
        return null;
      }
    },

    /**
        Clear persistent store, EXCEPT deviceId
    */
    purgePersistentStore: function() {

      for (let eachKey in DATASTORE_KEYS) {
        if (eachKey !== 'deviceId') store.removePersistent(DATASTORE_KEYS[eachKey]);
      }

    },

    isMultiFactorAuthExist: function(mfaList, multiFactorAuth) {
      if (mfaList !== null && mfaList !== undefined) {
        if (mfaList.constructor === Array) {
          return mfaList.some(function(item) {
            return item.name === multiFactorAuth;
          });
        } else {
          return mfaList === multiFactorAuth;
        }
      }
      return false;
    },

    getMultiFactorAuthConfig: function(mfaList) {
      let config = "";
      if (mfaList !== null && mfaList !== undefined) {
        if (mfaList.constructor === Array && mfaList.length > 0) {
          //Always get the first multi factor auth
          config = mfaList[0].name;
        } else {
          config = mfaList;
        }
      }
      return config;
    },

    /**
        Returns the URL with the FQDN from the config
        @param   {String} url - e.g '/tnc/master/1'
        @returns {String} The full URL with the FQDN
    */
    getFullUrl: function(url) {
      try {
        let CmsUrlHelper = require('utils/CmsUrlHelper');
        CmsUrlHelper.setCMSDomain();
        return CmsUrlHelper.getFullUrlPath(url);
      } catch (err) {
        kony.print(`DEBUG >> Exception occurred in util getFullUrl: ${err}`);
      }
    },

    /**
    	Generate UUID using NFI
      @returns {string} UUID string
    */
    generateUUID: function() {
      //#ifdef android
      let UUID = java.import("java.util.UUID");
      let UUIDstring = UUID.randomUUID().toString();
      //#endif
      //#ifdef iphone

      //Utilizing NFI to generate UUIDs
      let NSUUID = objc.import("NSUUID");
      let UUIDstring = NSUUID.UUID().UUIDString;
      //#endif
      return UUIDstring;
    },

    /**
        Uses FFI to check for Android permissions
        @param   {List<String>} A list of constants that refer to the Manifest permissions
        @returns {Boolean} True if ALL the specified permissions are granted, false if ANY ONE of the permissions are not granted.
     */
    checkAndroidPermissions: function(listOfPermissions) {
      //Written as such to cater for preprocessors

      //#ifdef android
      if (dcp.permissionHandler.checkPermissions(listOfPermissions)) {
        return true;
      } else {
        return false;
      }
      //#endif
      //Return true if iOS calls this function
      return true;
    },

    /**
        Uses FFI to request for Android permissions
        @param   {List<String>} A list of constants that refer to the Manifest permissions
        @param   {Function} A callback function to be fired once all the permissions have been prompted to the user, regardless of whether permission has been granted.
     */
    requestAndroidPermissions: function(callback, listOfPermissions) {
      //#ifdef android
      dcp.permissionHandler.requestPermissions(callback, listOfPermissions);
      //#endif
    },

    /**
    	Use to handle multiple tapping of clickable widget.
        @param func - {Function} The callback function to be invoked after checking the duration of the tap action.
    */
    handleEventInvocation: function(func) {
      function onTapEvent() {
        this.functionToCall = null;

        this.setFunctionToCall = function(func) {
          this.functionToCall = func;
        };

        this.invokeFunction = function() {
          this.functionToCall();
        }.bind(this);
      }

      let onTapEventInstance = new onTapEvent();
      onTapEventInstance.setFunctionToCall(func);
      return onTapEventInstance.invokeFunction;
    },

    replaceSmartPunctuation: function(text) {
      //#ifdef iphone
      return text
        .replace(/[\u2018\u2019]/g, "'")
        .replace(/[\u201C\u201D]/g, '"')
        .replace(/[\u2014]/g, '-');
      //#else
      return text;
      //#endif
    },

    removeCommas: function(text) {
      return text.replace(/\,/g, '');
    },

    /* A callback method mapped in TnC html file which detects the end of scrolling. This method will be
       overridden in the controller who uses the browser widget.
    */
    evaluateOnBrowserScrollEnd: function(data) {
      kony.print(`DEBUG >>> Browser callback evaluateOnBrowserScrollEnd  ${data}`);
      let browserMethod = require("fnd/browserScroll");
      browserMethod.executeOnScrollEndCallback();
    },

    callNotificationCallback: function(form, context) {
      if (this.pushUtility.notificationCallback) {
        this.pushUtility.notificationCallback(() => {
          nav.navigate(form, context);
        });
      } else {
        nav.navigate(form, context);
      }
    },
    
    setBrowserHandler: function(widgetRef, url){
      if(widgetRef){
        widgetRef.handleRequest = (browserWidget, params) => {
          if(params.originalURL !== url){
            kony.application.openURL(params.originalURL);
            return true;
          }
          return false;
        };
      }
    }

  };
})();
