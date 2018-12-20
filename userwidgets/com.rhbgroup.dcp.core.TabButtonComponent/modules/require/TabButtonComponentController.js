define(function() {
  const SKIN_TAB_BUTTON_SELECTED = 'sknTabButtonSelected';
  const SKIN_TAB_BUTTON_UNSELECTED = 'slFbox';
  const SKIN_TAB_LABEL_SELECTED = 'sknTabLabelSelected';
  const SKIN_TAB_LABEL_UNSELECTED = 'sknTabLabel';
  const TAB_POSITION = [
    ['0%', '50%'],
    ['0%', '33.33%', '66.67%'],
    ['0%', '25%', '50%', '75%']
  ];

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this._tabData = {};
      this._callbackFunction = [];
      this._tabFlexSkinGroup = [];
      this._tabLabelSkinGroup = [];
      this._selectedIndex = 0;
    },
    
    initGettersSetters: function() {},

    // Exposed methods - start
    // Programmatic selection of tab - runs onClick function without checking if current selection is the same
    onTabSelect: function(index){
      this._selectedIndex = index;
      this._setTabSkin(index);			//set skin mapping on tab click
      this._callbackFunction[index]();	//map the callback methods
    },

    generateTabButtonContents : function(data, callback){
      this._tabData = data;
      this._callbackFunction = callback;
      this._constructTabButtonContents(this.view.flxTabArea);
    },
    
    // Exposed methods - end
    
    // Component UI and event mappibg construction
    _constructTabButtonContents : function(viewContainer){
      let defaultValue = false;
      let tabNumber = this._tabData.data.length;
      let tabPositionArray = [];
      let tabFlexGroup = {};
      let tabLabelGroup = {};
      let counterOuter = 0;
      let counterInner = 0;
      for (let i = 0; i < tabNumber; i++) {
        tabPositionArray = TAB_POSITION[(tabNumber - 2)];
        let tabLabel = this._tabData.data[i].description;
        let tabFlexName = 'flxTab' + tabLabel;
        let tabLabelName = 'lblTab' + tabLabel;
        if (i === 0) {
          defaultValue = true;
        } else {
          defaultValue = false;
        }
        
        //create the Flex object
        tabFlexGroup[`${tabFlexName}`] = new kony.ui.FlexContainer({
          "autogrowMode": kony.flex.AUTOGROW_NONE,
          "clipBounds": true,
          "height": "100%",
          "id": tabFlexName,
          "onClick": () => { this._onTabSelect(i); },
          "isVisible": true,
          "layoutType": kony.flex.FREE_FORM,
          "left": tabPositionArray[i],
          "skin": defaultValue ? SKIN_TAB_BUTTON_SELECTED : SKIN_TAB_BUTTON_UNSELECTED,
          "top": "0%",
          "width": tabPositionArray[1],
          "zIndex": 1
        }, {}, {});
        this._tabFlexSkinGroup[i] = tabFlexGroup[`${tabFlexName}`];
        
        //create the Label object
        tabLabelGroup[`${tabLabelName}`] = new kony.ui.Label({
          "height": "100%",
          "id": tabLabelName,
          "isVisible": true,
          "left": "0%",
          "skin": defaultValue ? "sknTabLabelSelected" : "sknTabLabel",
          "text": tabLabel,
          "textStyle": {
            "letterSpacing": 0,
            "strikeThrough": false
          },
          "top": "0%",
          "width": "100%",
          "zIndex": 1
        }, {
          "contentAlignment": constants.CONTENT_ALIGN_CENTER,
          "padding": [0, 0, 0, 0],
          "paddingInPixel": false
        }, {
          "textCopyable": false
        });
        this._tabLabelSkinGroup[i] = tabLabelGroup[`${tabLabelName}`];
      }
      
      //add the label object to the Flex
      for (let flx in tabFlexGroup) {
        counterInner = 0;
        for (let lbl in tabLabelGroup) {
          if (counterOuter === counterInner) {
            tabFlexGroup[flx].add(tabLabelGroup[lbl]);
            break;
          }
          counterInner++;
        }
        counterOuter++;
      }
      //add to the flex component container
      for (let flx in tabFlexGroup) {
        viewContainer.add(tabFlexGroup[flx]);
      }
    },
    
    // On tab click event. Run only if newly selected index is different; prevents firing of callback when there's no tab change
    _onTabSelect: function(index) {
      if (this._selectedIndex !== index) {
        this._selectedIndex = index;
        this._setTabSkin(index);			//set skin mapping on tab click
        this._callbackFunction[index]();	//map the callback methods
      }
    },

    // Tab skin remapping
    _setTabSkin: function(index) {
      for (let loopCount = 0; loopCount < this._tabData.data.length; loopCount++) {
        if (loopCount === index) {
          this._tabFlexSkinGroup[loopCount].skin = SKIN_TAB_BUTTON_SELECTED;
          this._tabLabelSkinGroup[loopCount].skin = SKIN_TAB_LABEL_SELECTED;
        } else {
          this._tabFlexSkinGroup[loopCount].skin = SKIN_TAB_BUTTON_UNSELECTED;
          this._tabLabelSkinGroup[loopCount].skin = SKIN_TAB_LABEL_UNSELECTED;
        }
      }
    },
  };
});