  function moveSearchDown(){
    //animation searchHeader
    this.view.searchHeader.animate(
      kony.ui.createAnimation({
        "100": {
          "top":"9%",
          "opacity":"100%",
          "stepConfig": {
            "timingFunction": kony.anim.LINEAR
          }
        }
      }), {
        "delay": 0,
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "duration": 1
      }, {
        "animationEnd": null
      });
    
     //animation content(flxPage)
    this.view.flxPage.animate(
      kony.ui.createAnimation({
        "100": {
          "top":"20%",
          "opacity":"100%",
          "stepConfig": {
            "timingFunction": kony.anim.LINEAR
          }
        }
      }), {
        "delay": 0,
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "duration": 1
      }, {
        "animationEnd": null
      });

  }

////MOVE SEARCH UP///
function moveSearchUp(){
  
    //animation searchHeader
    this.view.searchHeader.animate(
      kony.ui.createAnimation({
        "100": {
          "top":"-91%",
          "opacity":"10%",
          "stepConfig": {
            "timingFunction": kony.anim.ANIMATION_EFFECT_FADE
          }
        }
      }), {
        "delay": 0,
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "duration": 1
      }, {
        "animationEnd": null
      });
    
     //animation content(flxPage)
    this.view.flxPage.animate(
      kony.ui.createAnimation({
        
        "100": {
          "top":"9%",
          "opacity":"10%",
          "stepConfig": {
            "timingFunction": kony.anim.ANIMATION_EFFECT_FADE
          }
        }
      }), {
        "delay": 0,
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "duration": 1
      }, {
        "animationEnd": null
      });

  }