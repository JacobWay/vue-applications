// app.js
import 'bootstrap/dist/css/bootstrap.css';
import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)

const apiDomain = ''

new Vue({
  el: '#events',

  data: {
    event: { title: '', detail: '', date: '' },
    events: []
  },

  ready: function () {
    this.fetchEvents();
  },

  methods: {

    fetchEvents: function () {
      var events = [];
      // this.$set('events', events);
      this.$http.get(apiDomain + '/api/events')
        .success(function (events) {
          this.$set('events', events);
          console.log(events);
        })
        .error(function (err) {
          console.log(err);
        });
    },

    addEvent: function () {
      if (this.event.title.trim()) {
        // this.events.push(this.event);
        // this.event = { title: '', detail: '', date: '' };
        this.$http.post(apiDomain + '/api/events', this.event)
          .then(function (res) {
            this.events.push(this.event);
            console.log('Event added!');
          }, function (err) {
            console.log(err);
          });
      }
    },

    deleteEvent: function (index) {
      if (confirm('確定要移除此項事件？')) {
        // this.events.splice(index, 1);
        this.$http.delete(apiDomain + '/api/events/' + event.id)
          .then(function (res) {
            console.log(res);
            this.events.splice(index, 1);
          }, function (err) {
            console.log(err);
          });
      }
    }
  }
});
