'use strict';
const angular = require('angular');

const extractor = require('keyword-extractor');
const _ = require('lodash');

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
      .join('');

      const isKeyword = _.includes(keywords, cleaned.toLowerCase());

      const isNice = _.includes(niceWords, cleaned);
      const isBad = _.includes(badWords, cleaned);

      let cssClass = "normal-word";

      if (isNice) {
        cssClass = "good-word";
      } else if (isBad) {
        cssClass = "bad-word";
      } else if (isKeyword) {
        cssClass = "big-word";
      }

      return {
        cssClass,
        word
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
