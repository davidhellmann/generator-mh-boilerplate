/**
 * Loading Fonts responsibly
 *
 * @package  mh-boilerplate
 * @author   Martin Herweg <info@martinherweg.de>
 */

/*
 |--------------------------------------------------------------------------
 | fontfaceobserver.js
 |--------------------------------------------------------------------------
 */

import Observer from 'fontfaceobserver';

/**
 * Define your fonts like this
 * const FONTNAME = new Observer('FONTNAME');
 */


/**
 * Check if the User already visited the site and the Fonts were loaded
 * If not resolve all fonts, otherwise directly set the class to html
 */
if (!sessionStorage.fontsLoaded) {
  /**
   * Add all Variables defined above in the array of Promise.all
   */
  Promise.all([])
    .then(() => {
      /**
       * Add a Class to the html element with the loading status,
       * also save the Value in the Session Storage
       */
      document.documentElement.classList.add('wf-loaded');
      sessionStorage.fontsLoaded = true;
    })
    .catch((e) => {
      console.error(e);
      document.documentElement.classList.add('wf-failed');
      sessionStorage.fontsLoaded = false;
    });
} else {
  document.documentElement.classList.add('wf-loaded');
}
