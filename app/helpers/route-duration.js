import Ember from 'ember';

/**
* @name Duration helper
* @desc Formats route duration to nicer time format.
* @param { String } params - time HH:mm:ss
* @return string
*/
export function routeDuration (params/*, hash */) {
  let timeSplit = params[0].split(':');
  let timeFormated = '';
  if (timeSplit[0] !== '00') {
    timeFormated += `${timeSplit[0].replace(/^0+/, '')} hrs `;
  }

  if (timeSplit[1] !== '00') {
    timeFormated += `${timeSplit[1].replace(/^0+/, '')} min`;
  }

  return timeFormated;
}

export default Ember.Helper.helper(routeDuration);
