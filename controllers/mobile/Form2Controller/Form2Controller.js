define({ 

   moveAnimation:function(){
    this.view.btnMove.animate(
      kony.ui.createAnimation({
        "100": {
          "top":"10%",
          "opacity":"0.3",
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

  },
  
  moveAnimationB:function(){
    this.view.btnMove.animate(
      kony.ui.createAnimation({
        "100": {
          "top":"30%",
          "opacity":"0.3",
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

  },
  
  
    //Transform animation code
  transformAnimation:function(){
    var allAnimations=kony.ui.makeAffineTransform();
    allAnimations.translate(100,100);
    allAnimations.rotate(90);
    allAnimations.scale(2,2);

    this.view.btnMove.animate(
      kony.ui.createAnimation({
        "100": {
          "transform":allAnimations,
          "stepConfig": {
            "timingFunction": kony.anim.EASE
          }
        }
      }), {
        "delay": 0,
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_BACKWARDS,
        "duration": 1
      }, {
        "animationEnd": null
      });
  }
  

 });