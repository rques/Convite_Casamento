import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
  getFirestore, 
  collection, 
  onSnapshot, 
  doc, 
  updateDoc, 
  deleteDoc, 
  addDoc, 
  getDocs 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDqn1Sk_pb8yizeUR_pEaf2AYqkjXBSDdo",
  authDomain: "casamento-c7681.firebaseapp.com",
  projectId: "casamento-c7681",
  storageBucket: "casamento-c7681.firebasestorage.app",
  messagingSenderId: "946454952196",
  appId: "1:946454952196:web:2155e4d864db96ff05b851",
  measurementId: "G-CC9F347BWL"
};

// Inicialização
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const presentesRef = collection(db, "presentes");

// 32 Itens Iniciais variados para encher a lista do casamento
const presentesIniciais = [
  // Cozinha & Utensílios
  { nome: "Jogo de Colheres de Medida Inox", preco: 35.00, categoria: "Cozinha", img: "https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=400&q=80", reservado: false },
  { nome: "Moedor de Pimenta e Sal em Madeira", preco: 55.00, categoria: "Cozinha", img: "https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=400&q=80", reservado: false },
  { nome: "Kit Utensílios de Silicone (6 Peças)", preco: 79.90, categoria: "Cozinha", img: "https://images.unsplash.com/photo-1590794056226-77ef3a6c474e?auto=format&fit=crop&w=400&q=80", reservado: false },
  { nome: "Jogo de Taças para Vinho (6 Peças)", preco: 120.00, categoria: "Cozinha", img: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=400&q=80", reservado: false },
  { nome: "Conjunto de Copos de Vidro Trabalhado", preco: 85.00, categoria: "Cozinha", img: "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?auto=format&fit=crop&w=400&q=80", reservado: false },
  { nome: "Jogo de Pratos Cerâmica Rústica (6 Peças)", preco: 210.00, categoria: "Cozinha", img: "https://images.unsplash.com/photo-1614088685112-0a760b71a3c8?auto=format&fit=crop&w=400&q=80", reservado: false },
  { nome: "Faqueiro Inox 24 Peças com Estojo", preco: 180.00, categoria: "Cozinha", img: "https://images.unsplash.com/photo-1615865417236-d67f572a746f?auto=format&fit=crop&w=400&q=80", reservado: false },
  { nome: "Frigideira Antiaderente Premium 24cm", preco: 110.00, categoria: "Cozinha", img: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=400&q=80", reservado: false },
  { nome: "Jogo de Panelas Cerâmica (5 Peças)", preco: 450.00, categoria: "Cozinha", img: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=400&q=80", reservado: false },
  { nome: "Tábua de Corte Bambu com Pegador", preco: 65.00, categoria: "Cozinha", img: "https://images.unsplash.com/photo-1590794056226-77ef3a6c474e?auto=format&fit=crop&w=400&q=80", reservado: false },

  // Eletrodomésticos
  { nome: "Sanduicheira e Grill Inox", preco: 120.00, categoria: "Eletrodomésticos", img: "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=400&q=80", reservado: false },
  { nome: "Liquidificador de Alta Potência 1200W", preco: 190.00, categoria: "Eletrodomésticos", img: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=400&q=80", reservado: false },
  { nome: "Chaleira Elétrica Inox 1.8L", preco: 135.00, categoria: "Eletrodomésticos", img: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f6?auto=format&fit=crop&w=400&q=80", reservado: false },
  { nome: "Torradeira Elétrica Inox Vintage", preco: 160.00, categoria: "Eletrodomésticos", img: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=400&q=80", reservado: false },
  { nome: "Fritadeira Elétrica Air Fryer 4L", preco: 380.00, categoria: "Eletrodomésticos", img: "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=400&q=80", reservado: false },
  { nome: "Cafeteira Expresso e Cápsulas", preco: 490.00, categoria: "Eletrodomésticos", img: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=400&q=80", reservado: false },
  { nome: "Batedeira Planetária 500W", preco: 320.00, categoria: "Eletrodomésticos", img: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=400&q=80", reservado: false },
  { nome: "Aspirador de Pó Robo Inteligente", preco: 650.00, categoria: "Eletrodomésticos", img: "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=400&q=80", reservado: false },

  // Cama, Mesa e Banho
  { nome: "Jogo de Toalhas de Banho (4 Peças)", preco: 140.00, categoria: "Cama, mesa e banho", img: "https://images.unsplash.com/photo-1616627547584-bf28cee262db?auto=format&fit=crop&w=400&q=80", reservado: false },
  { nome: "Jogo de Lençol Casal 300 Fios Algodão", preco: 260.00, categoria: "Cama, mesa e banho", img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=400&q=80", reservado: false },
  { nome: "Edredom Toque de Pluma Queen", preco: 310.00, categoria: "Cama, mesa e banho", img: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=400&q=80", reservado: false },
  { nome: "Mesa Posta: Trilho + 6 Americanos", preco: 95.00, categoria: "Cama, mesa e banho", img: "https://images.unsplash.com/photo-1614088685112-0a760b71a3c8?auto=format&fit=crop&w=400&q=80", reservado: false },
  { nome: "Kit Travesseiros Nasa Toque Macio (2 un)", preco: 150.00, categoria: "Cama, mesa e banho", img: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=400&q=80", reservado: false },

  // Decoração & Casa
  { nome: "Difusor de Aromas Elétrico Ultra-sônico", preco: 98.00, categoria: "Decoração", img: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=400&q=80", reservado: false },
  { nome: "Vaso Decorativo de Cerâmica Moderno", preco: 75.00, categoria: "Decoração", img: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=400&q=80", reservado: false },
  { nome: "Porta-Retrato de Metal Dourado 15x20", preco: 45.00, categoria: "Decoração", img: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=400&q=80", reservado: false },
  { nome: "Quadro Decorativo Minimalista", preco: 115.00, categoria: "Decoração", img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=400&q=80", reservado: false },
  { nome: "Cesto Organizador de Fibra Natural", preco: 88.00, categoria: "Decoração", img: "https://images.unsplash.com/photo-1584589167171-541ce45f1eea?auto=format&fit=crop&w=400&q=80", reservado: false },

  // Experiências / Cotas
  { nome: "Jantar Romântico na Lua de Mel", preco: 250.00, categoria: "Experiências", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80", reservado: false },
  { nome: "Passeio de Barco / Aventura", preco: 300.00, categoria: "Experiências", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80", reservado: false },
  { nome: "Cota para Passagens da Lua de Mel", preco: 500.00, categoria: "Experiências", img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=400&q=80", reservado: false },
  { nome: "Dia de Spa para o Casal", preco: 350.00, categoria: "Experiências", img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=400&q=80", reservado: false }
];

let todosPresentes = [];
let categoriaSelecionada = "all";

// Inicializa no Firestore
async function iniciarFirebase() {
  const snapshot = await getDocs(presentesRef);

  // Se o banco estiver vazio, cadastra os itens iniciais automaticamente
  if (snapshot.empty) {
    for (const item of presentesIniciais) {
      await addDoc(presentesRef, item);
    }
  }

  // Listener para sincronização em tempo real entre todos os usuários
  onSnapshot(presentesRef, (snapshot) => {
    todosPresentes = [];
    snapshot.forEach((docSnap) => {
      todosPresentes.push({ id: docSnap.id, ...docSnap.data() });
    });
    renderizarPainel();
  });
}

function renderizarPainel() {
  renderizarCategorias();
  filtrarPresentes();
}

function renderizarCategorias() {
  const categoryContainer = document.getElementById("categoryFilterList");
  const contagem = {};

  todosPresentes.forEach(p => {
    contagem[p.categoria] = (contagem[p.categoria] || 0) + 1;
  });

  let html = `<li><label><input type="radio" name="catFilter" value="all" ${categoriaSelecionada === 'all' ? 'checked' : ''}> Todas (${todosPresentes.length})</label></li>`;

  for (const cat in contagem) {
    html += `<li><label><input type="radio" name="catFilter" value="${cat}" ${categoriaSelecionada === cat ? 'checked' : ''}> ${cat} (${contagem[cat]})</label></li>`;
  }

  categoryContainer.innerHTML = html;

  categoryContainer.querySelectorAll('input[name="catFilter"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      categoriaSelecionada = e.target.value;
      filtrarPresentes();
    });
  });
}

function filtrarPresentes() {
  const termoBusca = document.getElementById("searchInput").value.toLowerCase();
  const radioPreco = document.querySelector('input[name="priceFilter"]:checked');
  const faixaPreco = radioPreco ? radioPreco.value : "all";

  const filtrados = todosPresentes.filter(item => {
    const bateNome = item.nome.toLowerCase().includes(termoBusca);
    const bateCat = (categoriaSelecionada === "all") || (item.categoria === categoriaSelecionada);

    let batePreco = true;
    if (faixaPreco === "0-100") batePreco = item.preco <= 100;
    else if (faixaPreco === "100-250") batePreco = item.preco > 100 && item.preco <= 250;
    else if (faixaPreco === "250-500") batePreco = item.preco > 250 && item.preco <= 500;
    else if (faixaPreco === "500-99999") batePreco = item.preco > 500;

    return bateNome && bateCat && batePreco;
  });

  renderizarCards(filtrados);
  atualizarEstatisticas(todosPresentes);
}

function renderizarCards(lista) {
  const grid = document.getElementById("giftsGrid");
  grid.innerHTML = "";

  if (lista.length === 0) {
    grid.innerHTML = "<p style='grid-column: 1/-1; text-align: center; color: #777; padding: 2rem;'>Nenhum presente encontrado com estes filtros.</p>";
    return;
  }

  lista.forEach((item) => {
    const card = document.createElement("div");
    card.className = `card ${item.reservado ? "reservado" : ""}`;

    const precoFormatado = item.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

    card.innerHTML = `
      <img src="${item.img}" alt="${item.nome}" class="product-img">
      <span class="category-badge">${item.categoria}</span>
      <h3>${item.nome}</h3>
      <div class="price">${precoFormatado}</div>
      <button class="btn-presentear">
        ${item.reservado ? "Já Escolhido ♡" : "Presentear"}
      </button>
    `;

    card.querySelector(".btn-presentear").addEventListener("click", () => reservarPresente(item.id, item.reservado));

    grid.appendChild(card);
  });
}

function atualizarEstatisticas(lista) {
  const totalItens = lista.length;
  const disponiveis = lista.filter(i => !i.reservado).length;

  document.getElementById("totalCount").innerText = totalItens;
  document.getElementById("availableCount").innerText = disponiveis;
}

// Alterar status no Firebase
async function reservarPresente(id, statusAtual) {
  if (!statusAtual) {
    if (confirm("Você gostaria de escolher este presente para os noivos?")) {
      const docRef = doc(db, "presentes", id);
      await updateDoc(docRef, { reservado: true });
      alert("Obrigado pelo carinho! O presente foi reservado em seu nome.");
    }
  } else {
    // Permite desmarcar se clicado por engano
    if (confirm("Este presente já foi reservado. Deseja disponibilizá-lo novamente na lista?")) {
      const docRef = doc(db, "presentes", id);
      await updateDoc(docRef, { reservado: false });
    }
  }
}

// Copiar chave PIX
function copiarPix() {
  const pixKey = document.getElementById("pixKey");
  pixKey.select();
  pixKey.setSelectionRange(0, 99999);

  navigator.clipboard.writeText(pixKey.value).then(() => {
    const alertBox = document.getElementById("pixAlert");
    alertBox.style.display = "block";
    setTimeout(() => {
      alertBox.style.display = "none";
    }, 3500);
  });
}

// Event Listeners
document.getElementById("searchInput").addEventListener("input", filtrarPresentes);
document.getElementById("btnCopiarPix").addEventListener("click", copiarPix);
document.querySelectorAll('input[name="priceFilter"]').forEach(radio => {
  radio.addEventListener("change", filtrarPresentes);
});

// Inicializa ao carregar a página
document.addEventListener("DOMContentLoaded", iniciarFirebase);