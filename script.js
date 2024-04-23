const studentlist = document.getElementById('student-list');

function renderStudent(doc){
    let li = document.createElement('li');
    let turma = document.createElement('span');
    let nome = document.createElement('span');
    let email = document.createElement('span');
    let telefoneAluno = document.createElement('span');
    let telefoneResponsa = document.createElement('span');
    let cpfAluno = document.createElement('span');
    let rgAluno = document.createElement('span');
    let dataNasc = document.createElement('span');
    let excluir = document.createElement('div');

    excluir.textContent = 'X';

    //carrega os dados nos elementos html
    li.setAttribute('data-id', doc.id);
    turma.textContent = doc.data().turma;
    nome.textContent = doc.data().nome;
    email.textContent = doc.data().email;
    telefoneAluno.textContent = doc.data().telefoneAluno;
    telefoneResponsa.textContent = doc.data().telefoneResponsa;
    cpfAluno.textContent = doc.data().cpfAluno;
    rgAluno.textContent = doc.data().rgAluno;
    dataNasc.textContent = doc.data().dataNasc;
    
    //adicionando os dados de nome e cod_Turma na tag li
    li.appendChild(turma);
    li.appendChild(nome);
    li.appendChild(email);
    li.appendChild(telefoneAluno);
    li.appendChild(telefoneResponsa);
    li.appendChild(cpfAluno);
    li.appendChild(rgAluno);
    li.appendChild(dataNasc);
    li.appendChild(excluir);

    //trata a ação de clique no X para a exclusão do arquivo
    excluir.addEventListener('click', (event)=>{
      event.stopPropagation();

      let id = event.target.parentElement.getAttribute('data-id')
      // alert (id);
      db.collection('bd3-nosql-atv5').doc(id).delete()
        .then(()=>{window.location.reload();})
    })

    //adicionando o li na tag ul
    studentlist.appendChild(li);
}

db.collection('bd3-nosql-atv5')
  .get()
  .then(
    (snapshot)=>{
      // console.log(snapshot.docs)
      snapshot.docs.forEach(doc => {
        console.log(doc.data());
        renderStudent(doc);
      });
  }
);

// Inserção de livros e autores
const form = document.getElementById("add-student-form")

form.addEventListener('submit', (event) =>{
    event.preventDefault();

    db.collection('bd3-nosql-atv5').add({
        nome: form.nome.value,
        turma: form.turma.value,
        email: form.email.value,
        telefoneAluno: form.telefoneAluno.value,
        telefoneResponsa: form.telefoneResponsa.value,
        cpfAluno: form.cpfAluno.value,
        rgAluno: form.rgAluno.value,
        dataNasc: form.dataNasc.value
    }).then(() =>{
        form.nome.value = '';
        form.turma.value = '';
        form.email.value = '';
        form.telefoneAluno.value = '';
        form.telefoneResponsa.value = '';
        form.cpfAluno.value = '';
        form.rgAluno.value = '';
        form.dataNasc.value = '';
        window.location.reload();
    })
});
 