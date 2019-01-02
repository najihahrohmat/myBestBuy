define({
  TEMPLATES: {
    favSelectRow: 'flxRowCategory',
    sectionHeader: 'flxHeader',
  },

  onViewCreated: function(){
    this.initHeader();
    this.getList(); 
    this.setRowAnimation();
    this.view.segDetail.onRowClick = () => {
      const navObj=new kony.mvc.Navigation("frmCategories");
      navObj.navigate();};
  },

  initHeader: function(){
    this.view.ApplicationHeader.initializeHeader({
      leftCallback: () => {alert('hi');},
      rightCallback: () => {alert('hi');},
    });
  },

  ///set data to segment///
  prepareSection: function(data) {
    let section = [];

    //     set section header
    section.push({
      header: 'Home', 
      template: this.TEMPLATES.sectionHeader 
    });

    if (data.length !== 0) {
      let listData = [];
      for (let list of data) {
        listData.push({
          "template": this.TEMPLATES.favSelectRow,
          "lblCategoryData": list.name,
        });
      }
      section.push(listData);
    }
    return section;
  },

  getList: function() {
    let response = require('mock/getCategories');
    this.getListSuccess(response);
  },

  getListSuccess: function(response) {
    if (response !== null) { 
      let segData = [];
      let listData = this.prepareSection(response.data.categories);
      segData.push(listData);

      this.view.segDetail.widgetDataMap = {
        flxRowCategory: 'flxInfo',
        lblCategoryData: 'lblCategoryData',
        lblSecHeader: 'header',
      }; 

      this.view.segDetail.setData(segData);
    } else {
      alert('Response is empty');
    }
  },

  getListFailure: function() {
    alert('Failed to invoke getList: ');
  },

  setRowAnimation: function(){
    const transformObject1 = kony.ui.makeAffineTransform();
    const transformObject2 = kony.ui.makeAffineTransform();

    transformObject1.translate(200, 0);
    transformObject2.translate(0, 0);

    const animationObject = kony.ui.createAnimation({
      "0":{"transform":transformObject1,"stepConfig":{"timingFunction":kony.anim.LINEAR}},
      "100":{"transform":transformObject2,"stepConfig":{"timingFunction":kony.anim.LINEAR}}});

    const animationConfig = {
      duration: 1,
      fillMode: kony.anim.FILL_MODE_FORWARDS
    };

    const animationDefObject={definition:animationObject,config:animationConfig,callbacks:null};

    this.view.segDetail.setAnimations({visible:animationDefObject});
  },
});
