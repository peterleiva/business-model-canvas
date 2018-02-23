/**
 * @fileoverview defines a sticky-note widget which represents a sticky-note
 * attached to business model canvas
 */

'use strict';

/**
 * @module widget
 */
define(
    [
      'jquery',
      'sage',
      './widget',
      'patterns/event-aggregator'
    ],
    function($, sage, Widget, EventAggregator){

      /** @const {string} TEMPLATE defines sticky-note template path */
      const TEMPLATE_PATH = sage.resrcPath + 'view/html/post-it.html';

      /**
       * Represents a sticky-note widget
       *
       * @extends Widget
       * @param {object} spec - spec to build the sticky-note widget
       * @param {object} my - shared secrets between inheritance
       * @return {StickyNote}
       */
      return function StickyNote(spec, my) {
        var template, $note, $editButton;

        my = my || {};

        // extends Widget
        Widget.call(this, spec, my);

        // extends publish/subscribe pattern to listen to button
        EventAggregator.call(this);

        // load sticky-note template synchronous
        $.get({
          async: false,
          url: TEMPLATE_PATH,
        })
          .done(function (data) {
            template = data;
          });

        // create a existing sticky-note or a loaded one
        spec.element = spec.element || template;

        // set jQuery component
        my.$component = $(spec.element);

        $note = $('.text', my.$component);


        /** @private {string} sticky-note identifier */
        var _id;

        /** @private {string} */
        var _color;

        /** @private {string} */
        var _note;


        /**
         * set the sticky-note' note
         * @param {string} note
         * @return {this}
         */
        var _setNote = function _setNote(note) {
          $note.text(note);
          _note = note;

          return this;
        }


        /**
         * returns sticky-note' note
         * @return {string}
         */
        var _getNote = function _getNote() {
          _note = $note.text();

          return _note;
        }

        /**
         * set the sticky-note' id
         * @param {string} text
         * @return {this}
         */
        var _setID = function _setID(id) {
          my.$component.data('id', id);
          _id = id;

          return this;
        }

        /**
         * returns sticky-note' id
         * @return {int}
         */
        var _getID = function _getID() {
          _id = my.$component.data('id');

          return _id;
        }


        /**
         * returns sticky-note' color
         * @return {string}
         */
        var _getColor = function _getColor() {
          _color = my.$component.css('background-color');

          return _color;
        }

        /**
         * set the sticky-note' text
         * @param {string} color
         * @return {this}
         */
        var _setColor = function _setColor(color) {
          my.$component.css('background-color', color);
          _color = color;

          return this;
        }


        // send event to sage app to edit sticky-note
        $editButton = $('.edit', my.$component);

        $editButton.click(function (_) {
          _.stopPropagation();
          var id = $(this).parent('.post-it').data('id');
          sage.publish('click.edit', {'id': id});
        })

        // appers and hide edit button on mouse hover
        my.$component.on('mouseenter', function () {
          $editButton = $('.edit', this);
          $editButton.css('visibility', 'visible');
        }).on('mouseleave', function () {
          $editButton = $('.edit', this);
          $editButton.css('visibility', 'hidden');
        });

        // set public interface
        this.app = sage;
        this.getID = _getID;
        this.setID = _setID;
        this.getNote = _getNote;
        this.setNote = _setNote;
        this.getColor = _getColor;
        this.setColor = _setColor;

      }

    }
);
