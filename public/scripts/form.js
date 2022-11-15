$('#categoria').select2({
    placeholder: {
        id: '',
        text: "Selecione uma categoria"
    },
    language: {
        noResults: function (params) {
          return "Não encontrado.";
        }
    },
    minimumResultsForSearch: -1 //esconde searchbar
});

const categoriaSelect = document.getElementById('categoria');
const form = document.getElementById('form-add-knowledge');

form.addEventListener('reset', limparCategoriaSelect);

function limparCategoriaSelect() {
    $("#categoria").val('').trigger('change');
}