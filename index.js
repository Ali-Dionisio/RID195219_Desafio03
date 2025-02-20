const dados = [
    {id: 1, tarefa: 'Implementar tela de listagem de tarefas', etiqueta: 'frontend', concluido: 'false'},
    {id: 2, tarefa: 'Criar endpoint para cadastro de tarefas', etiqueta: 'backend', concluido: 'false'},
    {id: 3, tarefa: 'Implementar protótipo da listagem de tarefas', etiqueta: 'UX', concluido: 'true'},
]

const getConcluirBtn = (dado) => {
    const espacoBotaoTag = document.createElement('div');
    espacoBotaoTag.className = 'espacoBotaoTag';
    espacoBotaoTag.id = dado.concluido;

    const btnConcluir = document.createElement('button');
    let img = document.createElement("img");
    img.src= 'Checked.png';
    img.className = 'checkedImg'
    img.id = dado.concluido;
    btnConcluir.className = 'btnConcluir';
    btnConcluir.id = 'btnConcluir';
    btnConcluir.textContent = "Concluir";

    li.appendChild(espacoBotaoTag)
    espacoBotaoTag.appendChild(btnConcluir)
    espacoBotaoTag.appendChild(img)

}

const getNovaTarefaId = () => {
    const lastId = dados[dados.length - 1]?.id;
    return lastId ? lastId + 1 : 1;
}
const getNovosDadosTarefa = (event) => {
    const nomeTarefa = event.target.elements.nomeTarefa.value;
    const etiqueta = event.target.elements.etiqueta.value;

    return { nomeTarefa, etiqueta}
}

const criarTarefa = (event) => {
    event.preventDefault();

    const newTarefaData = getNovosDadosTarefa(event);
    const{id, nomeTarefa, etiqueta} = newTarefaData;
    
    console.log(lastId);
    console.log(nomeTarefa);
    console.log(etiqueta);
}
window.onload = function () {
    const form = document.getElementById('inputarDados');
    form.addEventListener('submit',criarTarefa)

    const now = new Date;
    const data = (now)

    dados.forEach((dado) => {

        const list = document.getElementById('tarefas');
        const li = document.createElement('li');
        li.className = 'li';
        li.id = 'qualities';

        const subTitulo = document.createElement('p');
        subTitulo.className = 'titulo';
        subTitulo.id = dado.concluido;
        
        const espacoTag_Dt = document.createElement('div');
        espacoTag_Dt.className = 'espacoTag_Dt';
        const espacoTag = document.createElement('div');
        espacoTag.className = 'espacoTag';
        const espacoBotaoTag = document.createElement('div');
        espacoBotaoTag.className = 'espacoBotaoTag';
        espacoBotaoTag.id = dado.concluido;

        const tag = document.createElement('p');
        tag.className = 'tag';
        const dataTag = document.createElement('p');
        dataTag.className = 'dataTag';

        const btnConcluir = document.createElement('button');
        let img = document.createElement("img");
        img.src= 'Checked.png';
        img.className = 'checkedImg'
        img.id = dado.concluido;
        btnConcluir.className = 'btnConcluir';
        btnConcluir.id = 'btnConcluir';
        btnConcluir.textContent = "Concluir";

        subTitulo.textContent = dado.tarefa;
        tag.textContent = dado.etiqueta;
        dataTag.textContent = ('Criado em: ' + data.toLocaleDateString());
                

        list.appendChild(li);
        li.appendChild(espacoBotaoTag)
        li.appendChild(espacoTag);
        espacoTag.appendChild(subTitulo);
        espacoTag.appendChild(espacoTag_Dt)
        espacoTag_Dt.appendChild(tag);
        espacoTag_Dt.appendChild(dataTag);
        espacoBotaoTag.appendChild(btnConcluir)
        espacoBotaoTag.appendChild(img)

    })
}