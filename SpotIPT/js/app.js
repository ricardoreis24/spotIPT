// Registar o nosso "main" para quando o DOM está carregado.
// O 'DOMContentLoaded' é executado ligeiramente antes do 'load',
// logo, quando possível, deve ser usado.
document.addEventListener('DOMContentLoaded', function main(e) {
    var xhr = new XMLHttpRequest();
    var xml = null;

    xhr.open('GET', './assets/xml/discot.xml');  // Configurar o URL para obter o XML.

    xhr.onload = function xmlLoaded(e) {  // Executado quando o conteúdo é carregado.
        if (xhr.status === 200) {  // OK
            xml = xhr.responseXML;

            // 'xml' é um documento, tal como o 'document'.
            // Podemos desempenhar as mesmas tarefas nele que no 'document'.
            console.log(xml);

            // Colocar os CDs do XML na página.
            var cds = xml.querySelectorAll('cd');
            //chamar tudo o que foi feito antes para mostrar os albuns e faixas
            listaConteudo(cds);
            //buscar a pesquisa
            var input = document.getElementById("pesquisa");
            //onde armazeno as cenas
            var container = document.getElementById("container");
            //evento para o search box
            input.addEventListener('input',
                function (evt) {
                    //buscar o conteudo do text box
                    var filtro = input.value;
                    //limpar a tela
                    container.innerHTML = "";
                    //IF para desenhar tudo ou não
                    if (filtro.length === 0) {
                        //desenha tudo
                        listaConteudo(cds);
                    } else {
                        //filtragem
                        var cdsFiltradosxml = xml.querySelectorAll('cd[titulo*="' + filtro + '"]');
                        console.log(cdsFiltradosxml);
                        //em vez de ir aos CDs todos no XML vou apenas aos CDs filtrados
                        listaConteudo(cdsFiltradosxml);
                    }
                });


        }
        else {  // Erro
            console.error(xhr.responseText);
            //mudei aqui umas cenas porque dava erro e não sei se faz diferença
        }
    }


    xhr.onerror = function communicationsError(e) {  // Problema de comunicação.
        console.error('An error occured.', e);
    };

    xhr.send();  // Enviar o pedido.
});

function listaConteudo(cds) {
    var container = document.getElementById("container");

    for (var i = 0; i < cds.length; i++) {
        var cd = cds[i];

        //Nome CD
        var titulo = cd.getAttribute('titulo');
        var h1 = document.createElement('h1');
        h1.textContent = titulo;
        container.appendChild(h1);

        //autoria
        var autoria = cd.getAttribute('autoria');
        //para buscar o ano
        var datas = cd.querySelector('data');
        var data = datas.getAttribute('ano');

        var p1 = document.createElement('p');
        p1.textContent = 'by: ' + autoria + ', (' + data + ')';
        container.appendChild(p1);

        //para a imagem
        var imagens = cd.querySelector('capa');
        var capa = imagens.getAttribute('imagBig');
        var imagem = document.createElement("IMG");
        imagem.setAttribute("src", "/assets/images/" + capa);
        imagem.setAttribute("width", "135");
        imagem.setAttribute("height", "135");

        container.appendChild(imagem);

        //separação
        var frase = document.createElement('p');
        frase.textContent = '--- Faixas ---';
        container.appendChild(frase);

        //adicionar o search das faixas
        var faixaSearch = document.createElement('INPUT');
        faixaSearch.setAttribute('type', 'search');
        container.appendChild(faixaSearch);

        //buscar o conteudo da faixa
        var faixas = cd.querySelectorAll('faixa');
        //ciclo FOR para mostrar as faixas do Album
        for (var y = 0; y < faixas.length; y++) {
            //Saber a posição da faixa no array
            var faixa = faixas[y];
            //O ref esta no XML como atributo do nome da musica dentro do album
            var ref = faixa.getAttribute('ref');
            //criar a lista
            var li = document.createElement('li');

            li.textContent = ref;
            container.appendChild(li);
        }

    }
}
