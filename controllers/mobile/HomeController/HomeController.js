define({
  context: {},
  cachedContext: {},

  TYPE:{
    FAVORITE: 'FAVORITE FOOD',
    OTHER: 'OTHER FOOD',
  },

  TEMPLATES: {
    favSelectRow: 'flxRowCategory',
    sectionHeader: 'flxHeader',
  },

  SKINS: {
    rowFocus: 'sknFlxBgOriginalWhite',
  },

  onViewCreated: function(){
      this.getFoodList(); 
  },

  ///set data to segment///
  prepareSection: function(type, data) {
    let section = [];

    // set section header
    section.push({
      foodType: this.TYPE[type], 
      template: this.TEMPLATES.sectionHeader 
    });

    if (data.length !== 0) {
      let foodData = [];
      for (let [i, food] of data.entries()) {
//         let foodIcon;
//         let initials;
//         let imgBounds;
//         if (food.iconUrl) {
//           foodIcon = {src: utils.getFullUrl(food.iconUrl)};
//           imgBounds = {isVisible: true};
//           initials = {isVisible: false};
//         } else {
//           imgBounds = {isVisible: false};
//           initials = {isVisible: true, text: utils.getInitials(food.name)};
//         }

        foodData.push({
          "id": food.id,
          "template": this.TEMPLATES.favSelectRow,
          'flxInfo': {width: '75%'},
//           "iconUrl": foodIcon,
//           "initials": initials,
          "lblCategoryData": food.name,
//           "title": {text: food.name, centerY: '50%'},
//           'subtitle': {isVisible: false},
//           "lblLine": (i < data.length - 1) ? {isVisible: true} : {},
//           "imgBounds": imgBounds,
//           'lblAmount': {isVisible: false},
        });
      }
      section.push(foodData);
    }
    return section;
  },

  getFoodList: function() {
    let response = require('mock/getDataDummy');
    this.getFoodListSuccess(response);
  },

  getFoodListSuccess: function(response) {
    if (response !== null) { 
      if (response.status.code === "10000"){ 
        try {
          let segData = [];
          if (response.data.favFood.length !== 0) {
            let favFoodData = this.prepareSection('FAVORITE', response.data.favFood);
            segData.push(favFoodData);
          }

          if (response.data.foods.length !== 0) {
            let otherfoodsData = this.prepareSection('OTHER', response.data.foods);
            segData.push(otherfoodsData);
          }

          this.view.segDetail.widgetDataMap = {
            flxRowCategory: 'flxInfo',
            lblCategoryData: 'lblCategoryData',
            imgNext: "imgNext", 
//             lblAccName: "title", 
//             lblAccNo: 'subtitle',
//             lblAmount: 'lblAmount',
//             lblLine: "lblLine", 
//             flxCircleBound: 'imgBounds',
            lblSecHeader: "foodType",
          }; 

          this.view.segDetail.setData(segData);
        }catch(err){
          kony.print(err);
        }

      } else {
        kony.print('Unhandled error code for getFoodList');
      }
    } else {
      kony.print("Response is empty");
    }
//     loadingOverlay.remove();
  },

  getFoodListFailure: function(error) {
    kony.print('Failed to invoke getFoodList: ' + error);
//     loadingOverlay.remove();
  },
});
