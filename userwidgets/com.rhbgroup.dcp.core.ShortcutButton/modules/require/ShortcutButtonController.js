define(function() {
  const DEFAULT_BASE64_IMAGE = '';
  
  // Skins
  const flxMaskImageBg = 'sknFlxRoundedBtnMask';
  const flxMaskInitialsBg = 'sknFlxRoundedSecondaryGrey';
  const flxShadowEmpty = 'sknFlxRoundedDividerGrey';
  const flxShadowNeutral = 'sknFlxRoundedNeutral';
  const flxShadowDefault = 'sknFlxRoundedBtn';
  const addNewQLText = 'sknLblReg10spSecondaryGrey';
  const activeSkin = 'slFbox';
  const inactiveSkin = 'sknSegFlxWhite50opac';
  
  // Images
  const quickLink = 'quick_link_add.png';
  
  return {

    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this._base64 = DEFAULT_BASE64_IMAGE;
    },

    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      defineSetter(this, 'base64', function(val) {
        try {
          if (val !== null && val !== undefined && val !== '') {
            this.view.imgIcon.base64 = val;
          }
        } catch (exp) {
          kony.print(JSON.stringify(exp));
        }
      });
      
      // set inactive button to have white mask with 50% opacity
      defineSetter(this, 'isActive', function(val) {
        try {
          if (typeof (val) === 'boolean') {
            this._isActive = val;
            kony.print(`Inside setter: ${val}`);
            this.view.flxAction.skin = val ? activeSkin : inactiveSkin;
            this.view.flxBlur.skin = val ? activeSkin : inactiveSkin;
          } else {
            throw 'Invalid isActive value';
          }
        } catch (exp) {
          kony.print(JSON.stringify(exp));
        }
      });
      
    },

    setShadow: function() {
      utils.setShadow(this.view.flxShadow);
    },
    
    /* Properties for Add New Quick Link */
    setAddNewQLProp: function() {
      // Clip bound
      this.view.flxMask.clipBounds = false;
      // Skin
      this.view.flxShadow.skin = flxShadowNeutral;
      this.view.lblShortcut.skin = addNewQLText;
      // Label
      this.view.lblShortcut.text = kony.i18n.getLocalizedString('mgt.frmDashboardSummary.quickLink.AddNew');
      // Image
      this.view.imgIcon.src = quickLink;
      this.view.imgIcon.isVisible = true;
    },
    
    /* Properties for empty Quick Link */
    setEmptyQLProp: function() {
      this.view.flxShadow.skin = flxShadowEmpty;
      this.view.flxMask.isVisible = false;
    },
    
    setInitials: function(textSource) {
      // Setting properties
      this.setShadow(); // Set shadow for Android
      this.view.imgIcon.isVisible = false;
      this.view.lblInitials.isVisible = true;
      this.view.flxMask.skin = flxMaskInitialsBg;
      // Initials
      this.view.lblInitials.text = utils.getInitials(textSource);
    },
    
    setSrcImage: function(imgSource, fitToDimensionsFlag) {
      // Setting properties
      this.setShadow(); // Set shadow for Android
      this.view.imgIcon.isVisible = true;
      this.view.lblInitials.isVisible = false;
      this.view.flxMask.skin = flxMaskImageBg;
//       this.view.flxShadow.skin = flxShadowDefault;
//       this.view.flxShadow.shadowDepth = 0; // To remove shadow boundary for Android
      if (fitToDimensionsFlag) this.view.imgIcon.imageScaleMode = constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS;
      // Image
      this.view.imgIcon.src = imgSource;
    },
    
    setBase64Image: function(imgSource) {
      // Setting properties
      this.setShadow(); // Set shadow for Android
      this.view.imgIcon.isVisible = true;
      this.view.lblInitials.isVisible = false;
      this.view.flxMask.skin = flxMaskImageBg;
//       this.view.flxShadow.skin = flxShadowDefault;
//       this.view.flxShadow.shadowDepth = 0; // To remove shadow boundary for Android
      this.view.imgIcon.imageScaleMode = constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS;
      // Image
      this.view.imgIcon.base64 = imgSource;
    },
    
    
  };
});