const dados = [
    {id: '01', tarefa: 'Implementar tela de listagem de tarefas', etiqueta: 'frontend', concluido: 'false'},
    {id: '02', tarefa: 'Criar endpoint para cadastro de tarefas', etiqueta: 'backend', concluido: 'false'},
    {id: '03', tarefa: 'Implementar protótipo da listagem de tarefas', etiqueta: 'UX', concluido: 'true'},
]
const getTasksFromLocalStorage = () => {
    const localDados = JSON.parse(window.localStorage.getItem('dados'));
    return localDados ? localDados : [];

}
const setTasksLocalStorage = (dados) => {
    window.localStorage.setItem('dados', JSON.stringify(dados));
}

// const contarTarefas = (dados) => {
//     let tarefasProgresso;
//     const tarefasProgressoDOM = document.getElementById('tarefas-progresso');

//     if (tarefasProgressoDOM) tarefasProgresso = tarefasProgressoDOM.value;
//     else {
//         const newTarefaProgressoDOM = document.createElement('div');
//         newTarefaProgressoDOM.id = 'tarefas-progresso';
//         document.getElementById('contarTarefas')
//                 .appendChild(newTarefaProgressoDOM);
//         tarefasProgresso = newTarefaProgressoDOM;
//     }
//     const tarefasEncerradas = dados.filter(( {checked}) => checked).length
//     tarefasProgresso.textContent = `${tarefasEncerradas} tarefas concluídas`
// }
const tarefasConcluidas = () => {
    let tarefasProgresso = '';
    const tarefasFooter = document.getElementById('contarTarefas');
    
    if (tarefasFooter) tarefasProgresso = tarefasFooter.value;
    else {
        const divTarefasConcluidas = document.createElement('div');
        const textoTarefasConcluidas = document.createElement('p');
        
        divTarefasConcluidas.appendChild(textoTarefasConcluidas);
        tarefasFooter.appendChild(divTarefasConcluidas);

        tarefasProgresso = divTarefasConcluidas
    }

    let concluido = 1;
    // concluido++;
    // console.log(concluido);
    tarefasFooter.textContent = `${concluido} tarefas concluídas`
    //  tarefasProgresso.textContent = `${concluido} tarefas concluídas`;
}

const concluirTarefa = (buttonId) => {
    dados.filter(({ id }) => parseInt(id) !== parseInt(buttonId));
    const elemento = document.getElementById(buttonId);
    const titulo = document.querySelector('#tit'+buttonId)
    const botao = document.querySelector('#but'+buttonId);
    const img = document.querySelector('#img'+buttonId);
    elemento.id = `${buttonId} true`;
    titulo.className = 'newTitulo';
    botao.id = 'newBotao';
    img.id = 'newImg';
     
    let valor = [botao.id];
    let total = valor.length;
    console.log(total);
    tarefasConcluidas();
}

const CriarListaTarefas = (dado, button) => {
    // let concluido = dado.concluido || "false";
    const now = new Date;
    const data = (now)

    const list = document.getElementById('tarefas');
    const li = document.createElement('li');
    
    li.id = dado.id;
    li.className = 'li';

    const img = getImgInput(dado);

    const subTitulo = document.createElement('p');
    subTitulo.className = 'titulo';
    // subTitulo.id = dado.concluido;
    subTitulo.id = `tit${dado.id}`;
    
    const espacoTag_Dt = document.createElement('div');
    espacoTag_Dt.className = 'espacoTag_Dt';
    const espacoTag = document.createElement('div');
    espacoTag.className = 'espacoTag';
    espacoTag.id = dado.concluido;
    const espacoBotaoTag = document.createElement('div');
    espacoBotaoTag.className = 'espacoBotaoTag';
    espacoBotaoTag.id = dado.concluido;

    const tag = document.createElement('p');
    tag.className = 'tag';
    const dataTag = document.createElement('p');
    dataTag.className = 'dataTag';

    subTitulo.textContent = dado.tarefa || dado.nomeTarefa;
    tag.textContent = dado.etiqueta;
    dataTag.textContent = ('Criado em: ' + data.toLocaleDateString());

    // contarTarefas();
    // li.appendChild(button);
    list.appendChild(li);
    li.appendChild(espacoBotaoTag)
    li.appendChild(espacoTag);
    espacoTag.appendChild(subTitulo);
    espacoTag.appendChild(espacoTag_Dt)
    espacoTag_Dt.appendChild(tag);
    espacoTag_Dt.appendChild(dataTag);
    espacoBotaoTag.appendChild(button);
    espacoBotaoTag.appendChild(img)

    return li;
}
 const checkButtonClick = (event) => {
    const [id] = event.target.id.split('-');
    const tasks = getTasksFromLocalStorage();

    const updatedTasks = tasks.map((task) => {
        return parseInt(id) === parseInt(task.id)
            ? { ...task, checked: event.target.checked }
            : task;
    })
    setTasksLocalStorage(updatedTasks);
    tarefasProgresso(updatedTasks);
 }

const getImgInput = ({id, nomeTarefa, etiqueta, concluido}) => {
    concluido = 'false';
    const wrapper = document.createElement('div');
    const imgId = `img${id}`;
    const img = document.createElement("img");    

    img.src= 'Checked.png';
    img.className = 'checkedImg'
    img.id = imgId;

    wrapper.appendChild(img);

    return wrapper;
}

const getButtonInput = ({id, dado, concluido}) => {
    concluido = 'true';
    const button = document.createElement('button');
    const wrapper = document.createElement('div');
    const buttonId = `but${id}`;

    button.type = "button";
    button.id = buttonId
    button.className = "btnConcluir";
    button.textContent = "Concluir";

    button.concluido = concluido || false;

    button.onclick = () => 
        concluirTarefa(id);

    wrapper.appendChild(button);

    return wrapper;
}

const getNovaTarefaId = () => {
    const dados = getTasksFromLocalStorage();
    const lastId = dados[dados.length - 1]?.id;
    return lastId ? lastId + 1 : 1;
}

const getNovosDadosTarefa = (event) => {
    const id = getNovaTarefaId();
    const nomeTarefa = event.target.elements.nomeTarefa.value;
    const etiqueta = event.target.elements.etiqueta.value;

    return { id, nomeTarefa, etiqueta}
}

const criarTarefa = (event) => {
    event.preventDefault();
    const newTarefaData = getNovosDadosTarefa(event);
    
    const button = getButtonInput(newTarefaData)
    CriarListaTarefas(newTarefaData, button);

    const dados = getTasksFromLocalStorage();
    const updatedTasks = [
        ...dados, 
        {
            id: newTarefaData.id, 
            nomeTarefa: newTarefaData.nomeTarefa, 
            etiqueta: newTarefaData.etiqueta,
        }
    ]
    setTasksLocalStorage(updatedTasks);
    // tarefasConcluidas(updatedTasks);
    // contarTarefas(updatedTasks);

    document.getElementById('nomeTarefa').value = ''
    document.getElementById('etiqueta').value = ''
}

window.onload = function() {
    const form = document.getElementById('inputarDados');
    form.addEventListener('submit', criarTarefa)

    const tasks = getTasksFromLocalStorage();
    dados.forEach((dado) => {
        const checkbox = getButtonInput(dado);
        CriarListaTarefas(dado, checkbox)
    })
    tarefasConcluidas(dados)
}
