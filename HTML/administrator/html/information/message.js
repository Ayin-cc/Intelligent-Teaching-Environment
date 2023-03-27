$(document).ready(function () {
    $('#submit-btn').click(function () {
      var formData = {
        "title": $('.input-title:first').text().trim(),
        "content": $('.input-content:first').text().trim(),
        "time": $('.input-time:first').text().trim()
      };
      var jsonData = JSON.stringify(formData);
      $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/SCUEE/JoinMsg',
        data: jsonData,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (data) {
          alert('消息发送成功！');
        },
        error: function (xhr, status, error) {
          alert('消息发送失败：' + error);
        }
      });
    });
  });