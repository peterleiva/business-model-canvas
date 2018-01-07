/**
 * Módulo do business canvas módulo que encapsula
 */

"use strict";

/**
 * Módulo do Business Model Canvas
 *
 * @module BMCanvas
 */
var BMCanvas = (function () {

  /**
   * Representa um usuário da aplicação
   *
   * @constructor
   * @param {string} name - Nome do usuário
   * @param {string} email - Email do usuário
   */
  function _User(name, email) {
    this.name = name;
    this.email = email || '';
  }

  /**
   * Representa um Business Model Canvas
   *
   * @constructor
   * @param {string} title - Título do canvas
   * @param {string} description - descrição do canvas
   */
  function _Canvas(title, description) {
    this.title = title || '';
    this.description = description || '';
    this.createdAt = new Date();
    this.lastModified = new Date();

    // inicializa os blocos do canvas
    this.canvasElements = new Array(9);

    // cria os elementos do canvas
    this.canvasElements[0] = new _CanvasElement(1, 'parcerias chave');
    this.canvasElements[1] = new _CanvasElement(2, 'atividades chave');
    this.canvasElements[2] = new _CanvasElement(3, 'recursos chave');
    this.canvasElements[3] = new _CanvasElement(4, 'proposta de Valor');
    this.canvasElements[4] = new _CanvasElement(5, 'relação com o cliente');
    this.canvasElements[5] = new _CanvasElement(6, 'canais');
    this.canvasElements[6] = new _CanvasElement(7, 'segmentos de mercado');
    this.canvasElements[7] = new _CanvasElement(8, 'estruturas de custos');
    this.canvasElements[8] = new _CanvasElement(9, 'fontes de renda');
  }

  /**
   * Anexa um post-it a um bloco do canvas, identificado por um id
   *
   * @param {int} blockIdentifier - Identificador do bloco que será anexado
   * @param {_PostIt} postIt - Post-It que será anexado
   *
   */
  _Canvas.prototype.attachStickyNote = function (blockIdentifier, note) {
    if (blockIdentifier >= 0 && blockIdentifier < this.canvasElements.length) {
      this.canvasElements[blockIdentifier - 1].attachPostIt(note);
    }
  };

  /**
   * Representa um dos 9 elementos de bloco do canvas
   *
   * @constructor
   * @param {int} id - Identificador do bloco
   * @param {string} name - Nome do elemento do bloco
   */
  function _CanvasElement(id, name) {
    this.id = id;
    this.name = name;
    this.postIts = new Array();
  }

  /**
   * Anexa um post-it ao elemento de canvas, no final do bloco
   *
   * @param {_PostIt} note - Post-it a ser anexado
   */
  _CanvasElement.prototype.attachPostIt = function(note) {
    this.postIts.push(note);
  };

  /**
   * Representa um Post-it, lembrete que é anexado ao canvas
   *
   * @constructor
   * @param {string} note - Texto do post-it
   * @param {int} color - Cor do post-it
   * @param {_User} author - Autor do Post-it
   */
  function _PostIt(note, color, author) {
    this.note = note || '';
    this.color = color || FFE079;
    this.createdAt = new Date();
    this.lastModified = new Date();
    this.author = author || null;
  }

  return {
    User: _User,
    PostIt: _PostIt,
    Canvas: _Canvas
  };
})();
