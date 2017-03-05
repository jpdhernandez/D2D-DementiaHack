'use strict';
const angular = require('angular');

import extractor from 'keyword-extractor';
import _ from 'lodash';
// import parseColour from 'parse-color';
import wordsToNumbers from 'words-to-numbers';

import './bold-keywords.css';

const niceWords = ['love', 'like', 'favorite', 'favourite'];
const badWords = ['hate', 'not'];

export class boldKeywordsComponent {
  mapKeywords() {
    this.phrase = this.phrase || '';

    // const phrase = 'I love listening to music, mostly jazz';
    const keywords = extractor.extract(this.phrase);
    const split = this.phrase.split(' ');

    this.words = _.map(split, word => {
      const cleaned = word.split('')
      .filter(char => !_.includes([';', ',', '.'], char))
      .join('')
      .toLowerCase();

      const isKeyword = _.includes(keywords, cleaned);

      const isNice = _.includes(niceWords, cleaned);
      const isBad = _.includes(badWords, cleaned);

      let cssClass = 'normal-word';

      if (isNice) {
        if (cleaned === 'love') {
          word = '';
          cssClass = 'heart-icon fa fa-heart';
        }  else {
          cssClass = 'good-word';
        }
      } else if (isBad) {
        cssClass = 'bad-word';
      } else if (isKeyword) {
        // if (cleaned === 'bath') {
        //   cssClass = 'good-word fa fa-bathtub';
        //   word = '';
        // } else {
          cssClass = 'big-word';
        // }
      }

      let style = {};
      //
      // const parsedStyle = parseColour(cleaned);

      // if (parsedStyle.hex) {
      //   style = {
      //     color: parsedStyle.hex
      //   };
      // }

      const parsedNumber = wordsToNumbers(cleaned);

      // For some reason wordsToNumbers parses an 'a' into a 1
      if (cleaned !== 'a' && parsedNumber) {
        cssClass = 'number-word';
        word = parsedNumber;
      } else if (_.isNumber(+cleaned) && !_.isNaN(+cleaned)) {
        cssClass = 'number-word';
      }

      return {
        cssClass,
        word,
        style
      };
    });
  }

  $onInit() {
    this.mapKeywords();
  }

  $onChanges() {
    this.mapKeywords();
  }
}

export default angular.module('d2DDementiaHackApp.bold-keywords', [])
  .component('boldKeywords', {
    templateUrl: 'components/bold-keywords/bold-keywords.html',
    bindings: { phrase: '<' },
    controller: boldKeywordsComponent
  })
  .name;
