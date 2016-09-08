import Ember from 'ember';
import $ from 'jquery';

export default Ember.Controller.extend({
  autoComlete: Ember.inject.service('geolocation-srv'),
  trasportapi: Ember.inject.service('trasport-api'),
  routeDateUnformated: null,
  routeTimeUnformated: null,
  loaderOn: false,

  actions: {
    test(){
      Materialize.toast('<a href="#">I am a toast!</a>', 3000, 'rounded');
    },
    fetchData(){
      let routeData = this.get('autoComlete').fetchRouteData();
      if(!routeData.from || !routeData.to){
        return;
      }

      // Initialize loader
      this.set('loaderOn', true);

      // Clear search results
      this.set('model', null);

      // Slide form up
      $('.search-train-form').addClass('form-up');

      // If time and date selected add them to the search query object
      if(this.get('routeDateUnformated')){
        routeData.routeDate = this.get('routeDateUnformated');
      }
      if(this.get('routeTimeUnformated')){
        routeData.routeTime = this.get('routeTimeUnformated');
      }

      this.get('trasportapi').requestDataFromTrasportApi(routeData)
      .then((response)=>{
        this.set('loaderOn', false);
        this.set('model', response);
      })
      .catch((err)=>{
        console.log('Trasportapi request failed: ' + err);
        this.set('loaderOn', false);
      });
    },

    locationFrom(e){
      // The service require element id and string to name an object
      this.get('autoComlete').initAutocomplete(e.id, 'from');
    },

    locationTo(e){
      this.get('autoComlete').initAutocomplete(e.id, 'to');
    },

    dateSelected(element){
      let vm = this;// requires for ember to work inside pikadate object
      $(element).pickadate({
        onSet: function(date){
          vm.set('routeDateUnformated', new Date(date.select));
        }
      });
    },

    timeSelected(element){
      let vm = this;
      $(element).pickatime({
        onSet: function(time){
          vm.set('routeTimeUnformated', time.select);
        }
      });
    },
  },//actions


});
