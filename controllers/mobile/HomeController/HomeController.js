/* jshint esnext: true */

define({ 
  
   catSegment : function(){
     
   ///SHOW CURRENT PAGE///
    var currFrm = kony.application.getCurrentForm();
    this.view.lblCurrentPage.text=currFrm.id;
	//alert("Value of first form is :" +currFrm.id);
  
  //array data
  var segData=[ { categories:"TV, Home Theater" },
           		{ categories:"Audio" },
            	{ categories:"Car Electronic & GPS" },
            	{ categories:"Cameras & Camcorders" },
            	{ categories:"Computers & Tablets" },
              	{ categories:"Video Games, Movies & Music" },
            	{ categories:"Movies & Music" },
            	{ categories:"Video Games" },
              	{ categories:"Cell Phones" },
            	{ categories:"Connected Home & Housewares" },
            	{ categories:"Appliance" },
            	{ categories:"Health, Fitness & Beauty" },
              	{ categories:"Best Buy Gift Cards" },
            	{ categories:"Corporate Gift Cards" },
            	{ categories:"Gift Ideas" },
              	{ categories:"Name Brands" },
            	{ categories:"Reward Zone" },
            	{ categories:"Best Buy News" },
            	{ categories:"Magnolia Home Theater" },
              	{ categories:"Special Sale" },
            	{ categories:"Best Buy Outlet" },
            	{ categories:"More Categories" },
              { categories:"Review & Rating" },
              { categories:"Best Buy Racing" },
              { categories:"Partsearch" },
              { categories:"Best Buy For Business" },
              { categories:"Office" },
              { categories:"Houseware" },
              { categories:"Customer Service" },
              { categories:"e Gift Cards" },
              { categories:"Musical Instruments" },
              { categories:"Featured Offers" },
              { categories:"Batteries & Power" },
              { categories:"Wearable Technology" },
              { categories:"Geek Squad" },
              { categories:"AppleCare" }];
  
  //map data to segment
  this.view.segCategory.widgetDataMap={lblCategoryData:"categories"};
  this.view.segCategory.setData(segData);

    //////ANIMATION////////
    //define
    var transformObject1 = kony.ui.makeAffineTransform();
 	var transformObject2 = kony.ui.makeAffineTransform();
    
    transformObject1.translate(200, 0);
    transformObject2.translate(0, 0);
    
    var animationObject = kony.ui.createAnimation({
      "0":{"transform":transformObject1,"stepConfig":{"timingFunction":kony.anim.LINEAR}},
    "100":{"transform":transformObject2,"stepConfig":{"timingFunction":kony.anim.LINEAR}}});
   	
    var animationConfig = {
    	duration: 1,
    	fillMode: kony.anim.FILL_MODE_FORWARDS
    };
    
  	var animationCallbacks = {"animationEnd":function(){kony.print("animation END")}};
  	
    var animationDefObject={definition:animationObject,config:animationConfig,callbacks:animationCallbacks};
  	
    this.view.segCategory.setAnimations({visible:animationDefObject});
  }
 });