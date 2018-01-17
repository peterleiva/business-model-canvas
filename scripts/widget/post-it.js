/**
 * Post-it anexados ao canvas
 */

jQuery(document).on('postit-loaded', function (e, postitElement) {

  /**
   * @module widget
   */
  window.PostIt = (function ($) {
    var _postitWidget = $(postitElement);
    var _editLabel = '.edit';

    // mostra e esconde o botão de edição enquanto navega o post-it
    _postitWidget
      .on('mouseenter', function () {
        $(_editLabel, this).css('visibility', 'visible');
      })
      .on('mouseleave', function () {
        $(_editLabel, this).css('visibility', 'hidden');
      });

    // envia evento de edição caso o botão tenha de edição tenha sido pressionado
    $(_editLabel, _postitWidget).on('click', function (event) {

      var id = $(this).parent('.post-it').data('id');
      $(this).trigger('edit-mode', id);
    });

    return {

      /**
       * anexa post-it ao bloco correspondente no DOM, assim substitui os dados
       * do, estilos e texto.
       *
       * @param {BMCanvas.PostIt} postit
       */
      attach: function (postit) {
        var blockWidget, textWidget;

        textWidget = $('.text', _postitWidget);

        blockWidget = $('.canvas-body-element').filter(function (index, element) {
          return $(element).parent('.canvas-element').data('id') == postit.block.id;
        });

        // preenche dados e conteúdo do post-it
        _postitWidget.data('id', postit.id);
        _postitWidget.css('background-color', postit.color);
        textWidget.text(postit.note);

        // anexa o post-it no bloco correspondente
        blockWidget.append(_postitWidget);
      },

      /**
       * Remove o post-it do canvas
       *
       * @param {BMCanvas.PostIt} postit - Post-it a ser removido
       */
      remove: function (postit) {

        // remove o post-it do bloco de canvas
        $('.canvas-element .post-it').filter(function () {
          return $(this).data('id') == postit.id;
        })
        .remove();
      },

      /**
       * Atualiza um post-it anexado ao canvas
       *
       * @param {BMCanvas.PostIt} postit - Post-it usado para atualização
       */
      update: function (postit) {
        var postitWidget, textWidget;

        postitWidget = $('.canvas-element .post-it').filter(function (index, el) {
          return $(el).data('id') == postit.id;
        });

        textWidget = $('.text', postitWidget);

        postitWidget.css('background-color', postit.color);
        textWidget.text(postit.note);

      }
    }

  })(jQuery);

});
