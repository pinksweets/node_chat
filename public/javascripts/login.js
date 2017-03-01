(function () {
  $(document).ready(function () {
    $('#login').click(function () {
      $(this).parents('form').attr('action', '/chat/' + $('#id').val());
      $(this).parents('form').submit();
    });
    $('#id').val('匿名さん');
  });
})();