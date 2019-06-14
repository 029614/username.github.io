
//Drop menu functionality
$('#hamburger').click(function (){
  const dropMenu = $('#drop-down');
  dropMenu.toggleClass('hide-nav');
  $(document).mouseup(function (e) {
    if (!dropMenu.hasClass('hide-nav')) {
      dropMenu.addClass('hide-nav');
    };
  });
});
