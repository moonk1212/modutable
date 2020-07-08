$('.ui.sidebar')
  .sidebar('toggle')
;

$('#main_sidebar').first()
  .sidebar('attach events', '.open.button', 'show')
;
$('.open.button')
  .removeClass('disabled')
;