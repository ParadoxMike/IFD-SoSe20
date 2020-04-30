const swotText = (function($) {

    /******************************************************************
        VARS
    ******************************************************************/
    const $swotChars = $('.swot-cta__item');
    const $swotItems = $('.swot-text__item');
    
    /******************************************************************
        EVENTS
    ******************************************************************/
    $swotChars.click(function() {
        handleClick($(this));
    });

    /******************************************************************
        FUNCTIONS
    ******************************************************************/
    function handleClick($clickedChar) {
        const char = $clickedChar.data('char');

        $.each($swotItems, function(index, swotItem) {
            const $swotItem = $(swotItem);

            if($swotItem.hasClass('active'))
                $swotItem.removeClass('active').slideUp();
                
            else if($swotItem.data('char') === char)
                $swotItem.addClass('active').slideDown();

            else if($swotItem.hasClass('active') && $swotItem.data('char') === char)
                $swotItem.removeClass('active').slideUp();
            
        });

    }

    /******************************************************************
        PUBLIC_FUNCTIONS
    ******************************************************************/

    return {
        // your code here
    };

})(jQuery);
