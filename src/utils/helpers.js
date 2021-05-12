import _ from 'lodash';

export default {
  /**
   * Adds element to an array only when there is no the element yet.
   * @param {array} collection ['A4', B5']
   * @param {string} element 'F5'
   * @returns array ['A4', 'B5', 'F5']
   */
  pushUniq(collection, element) {
    return _.uniqWith(_.concat(collection, element), _.isEqual);
  },

  //TODO something wrong with this algorithm
  /**
   * (Losuje) random numbers of notes depending of an amount of max
   * notes at once
   * @param {number} valuesAmount 
   * @param {number} from 
   * @param {number} to 
   * @returns array of randomed numbers of one notes set e.g. when 
   * max amount of notes are:
   * 1 -> [14]
   * 2 -> [17, 12]
   * 3 -> [12, 6, 9]
   */
  drawUniqueAndFarEnoughValues(valuesAmount=3, from=0, to=6) {
    if(valuesAmount * 2 > to - from + 1) {
      console.log('Too small range');
      return [];
    }
    const output = [];
    let firstVal, secVal, thirdVal, fourthVal;

    if(valuesAmount > 0) {
      firstVal = _.random(from, to);
      _.set(output, ['0'], firstVal);
    };

    if(valuesAmount > 1) {
      do {
        secVal = _.random(from, to);
      } while (
        _.inRange(secVal, firstVal - 1, firstVal + 2) ||
        !_.inRange(secVal, firstVal - 7, firstVal + 8)
      );

      _.set(output, ['1'], secVal);
    };

    if(valuesAmount > 2) {
      do {
        thirdVal = _.random(from, to);
      } while (
        _.inRange(thirdVal, firstVal - 1, firstVal + 2) ||
        _.inRange(thirdVal, secVal - 1, secVal + 2) ||
        !_.inRange(thirdVal, firstVal - 7, firstVal + 8) ||
        !_.inRange(thirdVal, secVal - 7, secVal + 8)
      );

      _.set(output, ['2'], thirdVal);
    };

    if(valuesAmount > 3) {
      do {
        fourthVal = _.random(from, to);
      } while (
        _.inRange(fourthVal, firstVal - 1, firstVal + 2) ||
        _.inRange(fourthVal, secVal - 1, secVal + 2) ||
        _.inRange(fourthVal, thirdVal - 1, thirdVal + 2) ||
        !_.inRange(fourthVal, firstVal - 7, firstVal + 8) ||
        !_.inRange(fourthVal, secVal - 7, secVal + 8) ||
        !_.inRange(fourthVal, thirdVal - 7, thirdVal + 8)
      );

      _.set(output, ['3'], fourthVal);
    };

    return output;
  },
}
