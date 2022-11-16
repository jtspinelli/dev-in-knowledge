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
form.addEventListener('submit', submitForm);

function limparCategoriaSelect() {
    $("#categoria").val('').trigger('change');
}

function submitForm(event) {
    event.preventDefault();
}