import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({
  infinity: inject(),

  loadText: 'Load more',
  loadedText: 'Loaded',
  actions: {
    click(){
      this.infinity.infinityLoad(this.infinityModel);
    }
  }
});
