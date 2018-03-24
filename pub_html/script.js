const app = new Vue({
  el: '#app',
  data: {
    totalCount: '',
    user: '',
    PIN: '',
    checkString: '',
    userString: '',
    name: '',
    id: '',
    show: 'login'
  },
  methods: {
    adminLogin: function(){
      if(app.user==='admin' && app.PIN==='1234'){
        app.show='landing';
      }else{
        alert('Incorrect credentials!');
      }
    },
    openCheckin: function(){
      //send checkString to server
      $.ajax({
        method: 'post',
        url: '/start',
        data: {string:app.checkString},
        success: function(data){
          alert(data);
        }
      });

      app.show='checkin-open';
    },
    studentCheckin: function(){
      app.show='check-in';
    },
    openThankYou: function(){
      if(app.userString==='' || app.name==='' || app.id===''){
        alert('please fill out all of these fields before clicking Check-in');
      }else {
        $.ajax({
          method: 'post',
          url: '/check-in',
          data: {ustring:app.userString, name:app.name, id:app.id},
          success: function (data) {
            alert(data);
            if(data==='Checked in'){
              app.show = 'thank-you';
            }
          }
        });
      }
    },
    stopCheckin: function(){
      $.ajax({
        method: 'post',
        url: '/stop',
        data: {string:app.checkString},
        success: function (data) {
          let trHTML = '';
          $.each(JSON.parse(data), function (i, item) {
            trHTML += '<tr><td>' + item.studName + '</td><td>' + item.studNum + '</td></tr>';
            app.totalCount = i + 1;
          });
          $('#records').append(trHTML);
        }
      });
      app.show = 'stopped';
    },
    viewHistory: function(){
      $.ajax({
        method: 'get',
        url: '/history',
        data: '',
        success: function(data){
          //create history table here
          let trHTML = '';
          $.each(JSON.parse(data), function (i, item) {
            trHTML += '<tr><td>' + item.name + '</td></tr>';
            $.each(item.users, function (j, newItem) {
              trHTML += '<tr><td>' + newItem.studName + '</td><td>' + newItem.studNum + '</td></tr>';
            });
          });
          $('#histTable').append(trHTML);
        }
      });
      app.show = 'history';
    }
  }
});
