define({

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
  prepareSection: function(data) {
    let section = [];
//       let foodData = [];
//     set section header
    section.push({
      header: 'Home', 
      template: this.TEMPLATES.sectionHeader 
    });

    if (data.length !== 0) {
      let foodData = [];
      for (let [i, food] of data.entries()) {
        foodData.push({
          "id": food.id,
          "template": this.TEMPLATES.favSelectRow,
          'flxInfo': {width: '75%'},
          "lblCategoryData": food.name,
        });
      }
      section.push(foodData);
    }
//     return foodData;
    return section;
  },

  getFoodList: function() {
    let response = require('mock/getCategories');
    this.getFoodListSuccess(response);
  },

  getFoodListSuccess: function(response) {
    if (response !== null) { 
//       if (response.status.code === "10000"){ 
//         try {
          let segData = [];
//           if (response.data.favFood.length !== 0) {
//             let favFoodData = this.prepareSection('', response.data.favFood);
//             segData.push(favFoodData);
//           }

//           if (response.data.foods.length !== 0) {
            let otherfoodsData = this.prepareSection(response.data.categories);
            segData.push(otherfoodsData);
//           }

          this.view.segDetail.widgetDataMap = {
            flxRowCategory: 'flxInfo',
            lblCategoryData: 'lblCategoryData',
            imgNext: "imgNext", 
            lblSecHeader: "header",
          }; 

          this.view.segDetail.setData(segData);
//         }catch(err){
//           kony.print(err);
//         }

//       } else {
//         kony.print('Unhandled error code for getFoodList');
//       }
    } else {
      kony.print("Response is empty");
    }
  },

  getFoodListFailure: function(error) {
    kony.print('Failed to invoke getFoodList: ' + error);
  },
});
