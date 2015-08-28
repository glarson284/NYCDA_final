interact('.draggable')
  .draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    restrict: {
      restriction: "html",
      endOnly: true,
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    },

    // call this function on every dragmove event
    onmove: dragMoveListener,
    // call this function on every dragend event
    onend: function (event) {
      var textEl = event.target.querySelector('span');

      textEl && (textEl.textContent =
        'moved a distance of '
        + (Math.sqrt(event.dx * event.dx +
                     event.dy * event.dy)|0) + 'px');
    }
  });

  function dragMoveListener (event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }

  // this is used later in the resizing demo
  window.dragMoveListener = dragMoveListener;

function checkChildren() {
   if ( $('.draggable').children().length === 0 ) {
    console.log("greater than")
     $('.button').css('visibility', 'visible');
  } else {
    console.log("hits else")
    $('.button').css('visibility', 'hidden');
  }
}


function dropzone(drop, classname, x){
num = 0;
num2 = 0;
num3 = 1;
ans = 0;



interact(drop).dropzone({
  // only accept elements matching this CSS selector
  accept: classname, 
  // Require a 75% element overlap for a drop to be possible
  overlap: .75,

  // listen for drop related events:
  ondropactivate: function (event) {
    // add active dropzone feedback
    event.target.classList.add('drop-active');
  },
  ondragenter: function (event) {
    var draggableElement = event.relatedTarget,
        dropzoneElement = event.target;

    // feedback the possibility of a drop
    dropzoneElement.classList.add('drop-target');
    draggableElement.classList.add('can-drop');
  },
  ondragleave: function (event) {
    // remove the drop feedback style
    event.target.classList.remove('drop-target');
    event.relatedTarget.classList.remove('can-drop');
  },
  ondrop: function (event) {
    
    event.relatedTarget.style.backgroundColor = "transparent";
    

    if (x === true){
    event.relatedTarget.classList.remove('draggable');
    checkChildren();
    }
    else {

      $(".resistor_p.can-drop").each(function(){
        event.relatedTarget.classList.remove('draggable');
        console.log(this);
        id = $(this).data("score");
        
        function sum() {
            num2 += id;
            // console.log(num2);
          }
        function product() {
           num3 = num3 * id;
           // console.log(num3);
        }
        if (id) {
          sum();
          product();
          // console.log(id);
          ans = num3 / num2;
          console.log(ans);
        }  
      });

      $(".resistor_s.can-drop").each(function(){
        event.relatedTarget.classList.remove('draggable');
        console.log(this);
        id = $(this).data("score");
        if (id) {
          console.log(id);
          num += id;
          console.log(num)
        }  
      });


        if (num === 9) {  
          correct = true;
        } else if (ans === 4){
          correct = true;
        }
        else {
          correct = false;2
        }
        console.log(correct)

        // if (sum === 4){
        //   correct = true;
        // } else {
        //   correct = false;
        // }
        
        $('#check').click(function(){
          console.log(correct)
          if (correct === true) {
            $('.button').css('visibility', 'visible');
          }
          else {
            $('.wrong_button').css('display', 'initial');
          }

        })

    num = 0;
    num2 = 0;
    num3 = 1;
    ans = 0;

   }
   event.target.classList.remove('res_dropzone_first');
   event.target.classList.remove('res_dropzone_fifth');
   event.target.classList.remove('res_dropzone_sixth');

  },
  ondropdeactivate: function (event) {
    // remove active dropzone feedback
    event.target.classList.remove('drop-active');
    event.target.classList.remove('drop-target');
    event.target.classList.add('dropped-target');
  }

});
}
dropzone('.res_dropzone','.resistor',true);
dropzone('.battery_dropzone','.battery',true);
dropzone('.battery_dropzone_first','.battery', true);
dropzone('.res_dropzone_first','.resistor', true);
dropzone('.res_dropzone_third','.series_res', true);
dropzone('.res_dropzone_fifth','.resistor_s', false);
dropzone('.res_dropzone_sixth','.resistor_p', false);
dropzone('.battery_dropzone_s','.battery_s',false);



// Document Ready
$(function() {
  $('.resistor').click(function() {

    $('.bat_text').find("h2").css('display', 'none');
    $('.bat_text').find("p").css('display', 'none');

    $('.init_text').css('display','none');

    $('.res_text').find("h2").fadeIn(1000).css('display', 'initial');
    $('.res_text').find("p").fadeIn(2000).css('display', 'initial');
  });
  $('.battery').click(function() {

    $('.res_text').find("h2").css('display', 'none');
    $('.res_text').find("p").css('display', 'none');

    $('.init_text').css('display','none');

    $('.bat_text').find("h2").fadeIn(1000).css('display', 'initial');
    $('.bat_text').find("p").fadeIn(2000).css('display', 'initial');
  });

    $('#ohm_first_button').click(function(e){    
      $('.ohm_first').fadeOut('slow', function(){
        $('.ohm_second').fadeIn('slow');
      });
    });
  
    $('#ohm_second_button').click(function(e){    
      $('.ohm_second').fadeOut('slow', function(){
        $('.ohm_first').fadeIn('slow');
      });
    });

  $('.resistor').hover(function(){
    $('#start_res').css('box-shadow', 'none');

  })
  $(".nav_res").hover(function(e){
    $(e.target).attr("src","/assets/resistor_color.png");
    }, function(){
    $(this).attr("src","/assets/resistor.png");
  });

   $(".nav_bat").hover(function(e){
    $(e.target).attr("src","/assets/bat_pos_right_color.png");
    }, function(){
    $(this).attr("src","/assets/bat_pos_right.png");
  });

   $("nav span").hover(function(e){
    $(e.target).css('border-bottom', '5px solid white');
    $(e.target).css('color', '#FF6E5F');
    }, function(){
    $(this).css('border-bottom', '5px solid #FF6E5F');
    $(this).css('color', 'white');
  });

   $(".about_trigger").click(function() {
    $(".about").slideDown("slow", function() { $(this).show(); });
    });

   $("#about_x").click(function() {
    $(".about").slideUp("slow", function() { $(this).hide(); });
    });

   $("#instructions_check").click(function() {
    $(".dim").fadeOut("slow", function() { $(this).hide(); });
    });


   $("#variable_def_forward").click(function() {
     $('.current_def').css('display', 'initial');
     $('.variable_def').css('display', 'none');
    });

   $("#current_def_forward").click(function() {
     $('.current_def').css('display', 'none');
     $('.res_def').css('display', 'initial');
    });

   $("#current_def_back").click(function() {
     $('.current_def').css('display', 'none');
     $('.variable_def').css('display', 'initial');
    });

   $("#res_def").click(function() {
     $('.bat_def').css('display', 'initial');
     $('.res_def').css('display', 'none');
    });
   $("#res_def_back").click(function() {
    $('.current_def').css('display', 'initial');
     $('.res_def').css('display', 'none');
    });
   $("#bat_def_back").click(function() {
    $('.bat_def').css('display', 'none');
     $('.res_def').css('display', 'initial');
     });
   $("#bat_def").click(function() {
    $('.bat_def').css('display', 'none');
     $('.ohm_def').css('display', 'initial');
     });

    $("#ohm_def_back").click(function() {
    $('.bat_def').css('display', 'initial');
     $('.ohm_def').css('display', 'none');
     });

    $(".no_click").click(function(event){
      event.preventDefault();
    }); 


})






