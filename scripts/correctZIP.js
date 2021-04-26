document.getElementById('zipcode').addEventListener('input', function (e)
{
    var target = e.target, position = target.selectionEnd, length = target.value.length;
    
    target.value = target.value.replace(/^[a-öA-ö0-9]/g, '').replace(/(.{3})/g, '$1 ').trim();
    target.selectionEnd = position += ((target.value.charAt(position - 1) === ' ' && target.value.charAt(length - 1) === ' ' && length !== target.value.length) ? 1 : 0);
  });