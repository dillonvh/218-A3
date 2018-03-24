const app = new Vue({
  el: '#app',
  data: {
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
        console.log('Incorrect credentials!');
      }
    },
    openCheckin: function(){
      app.show='checkin-open';
      //store checkString as Document title?

    },
    studentCheckin: function(){
      app.show='check-in';
    },
    openThankYou: function(){
      app.show='thank-you';
    }
  }
});
