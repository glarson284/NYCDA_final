interact('.draggable')
  .draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    restrict: {
      restriction: "body",
      endOnly: true,
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    },

    // call this function on every dragmove event
    onmove: dragMoveListener,
    // call this function on every dragend event
    onend: function (event) {
      var textEl = event.target.querySelector('p');

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
     $('.button').css('display', 'initial');
  } else {
    console.log("hits else")
    $('.button').css('display', 'none');
  }
}

function dropzone(drop, classname){

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
    event.relatedTarget.style.backgroundColor = "transparent"
    event.relatedTarget.classList.remove('draggable');
    checkChildren();
   
  },
  ondropdeactivate: function (event) {
    // remove active dropzone feedback
    event.target.classList.remove('drop-active');
    event.target.classList.remove('drop-target');
    event.target.classList.add('dropped-target');
  }

});
}
dropzone('.res_dropzone','.resistor');
dropzone('.battery_dropzone','.battery');
dropzone('.battery_dropzone_first','.battery');
dropzone('.res_dropzone_first','.resistor');

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

  $('.resistor').hover(function(){
    $('#start_res').css('box-shadow', 'none');

  })
  $(".nav_res").hover(function(e){
    $(e.target).attr("src","/assets/resistor_color.png");
    }, function(){
    $(this).attr("src","/assets/resistor.png");
  });

   $("#lightbulb_off").hover(function(e){
    $(e.target).attr("src","/assets/lightbulbon_copy.png");
    }, function(){
    $(this).attr("src","/assets/lightbulb.png");
  });

   $("nav").hover(function(){
    $("nav").find("span").css('display', 'initial');
    }, function(){
    $(this).find("span").css('display', 'none');
  });

})




