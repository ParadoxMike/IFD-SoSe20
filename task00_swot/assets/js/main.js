"use strict";

var swotText = function ($) {
  /******************************************************************
      VARS
  ******************************************************************/
  var $swotChars = $('.swot-cta__item');
  var $swotItems = $('.swot-text__item');
  /******************************************************************
      EVENTS
  ******************************************************************/

  $swotChars.click(function () {
    handleClick($(this));
  });
  /******************************************************************
      FUNCTIONS
  ******************************************************************/

  function handleClick($clickedChar) {
    var char = $clickedChar.data('char');
    $.each($swotItems, function (index, swotItem) {
      var $swotItem = $(swotItem);
      if ($swotItem.hasClass('active')) $swotItem.removeClass('active').slideUp();else if ($swotItem.data('char') === char) $swotItem.addClass('active').slideDown();else if ($swotItem.hasClass('active') && $swotItem.data('char') === char) $swotItem.removeClass('active').slideUp();
    });
  }
  /******************************************************************
      PUBLIC_FUNCTIONS
  ******************************************************************/


  return {// your code here
  };
}(jQuery);