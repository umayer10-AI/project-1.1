function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-US"; // English
  window.speechSynthesis.speak(utterance);
}


const btn = document.querySelector(".button");

let g = async () => {
    const a = await fetch("https://openapi.programming-hero.com/api/levels/all");
    const b = await a.json();
    const c = b.data;

    c.forEach(v => {
        const d = document.createElement("button");
        d.id = v.level_no;
        d.className = "btn btn-outline btn-primary font-bold text-base";
        d.innerHTML = `<i class="fa-solid fa-book-open"></i> Lesson -${v.level_no}`;
        btn.appendChild(d);
    });
}
g();

let load = (v) => {
    const load = document.querySelector(".load");
    const card = document.querySelector(".card");
    if(v === true){
        load.classList.remove("hidden");
    }
    else{
        load.classList.add("hidden");
    }
}

let add = (v) => {
    let m = v.map(x => `<button class="btn btn-soft btn-accent">${x}</button>`);
    return m.join(" ");
}

let local = async (id) => {

    const a = await fetch(`https://openapi.programming-hero.com/api/word/${id}`);
    const b = await a.json();
    const c = b.data;
    console.log(c);

    const div = document.querySelector(".kk");
    div.innerHTML = "";

    const d = document.createElement("div");
    d.innerHTML = `<div class="space-y-5 border-1 border-gray-300 p-5 rounded-2xl kk">
                <h2 class="text-2xl font-bold">${c.word} ( <i class="fa-solid fa-microphone"></i>: ${c.pronunciation})</h2>
                <div class="space-y-2.5">
                  <p class="text-lg font-semibold">Meaning</p>
                  <p>${c.meaning}</p>
                </div>
                <div class="space-y-2.5">
                  <p class="text-lg font-semibold">Example</p>
                  <p>${c.sentence}</p>
                </div>
                <div class="space-y-2.5">
                  <p class="font-semibold">সমার্থক শব্দ গুলো</p>
                  <div> ${add(c.synonyms)} </div>
                </div>
            </div>`;

    div.appendChild(d);
    
    document.getElementById("my_modal").showModal();
}


let cardContainer = (v) =>{
    const card = document.querySelector(".card");
    card.innerHTML = "";

    if(v.length === 0){
        const d = document.createElement("div");
        d.className = "col-span-full"
        d.innerHTML = `<div class="hero-content text-center py-10">
            <div class="max-w-md space-y-5">
              <div class="text-6xl text-neutral/40">
                  <i class="fa-solid fa-triangle-exclamation"></i>
              </div>
              <h1 class="text-neutral/70">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</h1>
              <p class="text-3xl font-medium">নেক্সট Lesson এ যান</p>
            </div>
          </div>`;
        card.appendChild(d);
        load(false);
        return;
    }

    v.forEach(x => {
        const d = document.createElement("div");
        d.innerHTML = `<div class="space-y-5 text-center bg-white p-7 rounded-2xl shadow-md">
            <div class="space-y-4">
              <h3 class="text-2xl font-bold">${x.word}</h3>
              <p class="font-medium">Meaning /Pronounciation</p>
              <p class="text-2xl font-semibold">"${x.meaning}/${x.pronunciation} ইগার"</p>
            </div>
            <div class="flex justify-between">
              <button onclick="local(${x.id})" class="btn btn-soft btn-info"><i class="fa-solid fa-circle-info"></i></button>
              <button onclick="pronounceWord('${x.word}')" class="btn btn-soft btn-info"><i class="fa-solid fa-volume-high"></i></button>
            </div>
          </div>`;
        
        card.appendChild(d);
    })
    
};

let cb = (id) => {
    const a = document.getElementById(id);

    let k = document.querySelectorAll(".button button");
    k.forEach(v => {
        v.classList.remove("bg-primary","text-white");
    })

    a.classList.add("bg-primary","text-white");
}


btn.addEventListener("click", async (e) => {
    const button = e.target.closest("button");
    if(button){
        load(true);
        const a = await fetch(`https://openapi.programming-hero.com/api/level/${button.id}`);
        const b = await a.json();
        const c = b.data;
        const f = button.id;

        cb(f);
        cardContainer(c);
        load(false);
    }
})


const search = document.querySelector(".search button");

let arr = [];

let allSearch = async () => {
    const a = await fetch("https://openapi.programming-hero.com/api/words/all");
    const b = await a.json();
    arr = b.data;
}
allSearch();

search.addEventListener("click", () => {

    load(false);
    const input = document.querySelector(".search input");
    const value = input.value.trim().toLowerCase();

    const f = arr.filter(x => x.word.toLowerCase().includes(value));

    const card = document.querySelector(".card");
    card.innerHTML = "";

    let k = document.querySelectorAll(".button button");
    k.forEach(v => {
        v.classList.remove("bg-primary","text-white");
    })

    if(f.length === 0){
        const d = document.createElement("div");
        d.className = "col-span-full"
        d.innerHTML = `<div class="hero-content text-center py-10">
            <div class="max-w-md space-y-5">
              <div class="text-6xl text-red-600 font-bold">
                  <i class="fa-solid fa-x"></i>
              </div>
              <p class="text-3xl font-medium">Word not founded</p>
            </div>
          </div>`;
        card.appendChild(d);
        load(false);
        return;
    }

    f.forEach(x => {
        const d = document.createElement("div");
        d.innerHTML = `<div class="space-y-5 text-center bg-white p-7 rounded-2xl shadow-md">
            <div class="space-y-4">
              <h3 class="text-2xl font-bold">${x.word}</h3>
              <p class="font-medium">Meaning /Pronounciation</p>
              <p class="text-2xl font-semibold">"${x.meaning}/${x.pronunciation} ইগার"</p>
            </div>
            <div class="flex justify-between">
              <button onclick="local(${x.id})" class="btn btn-soft btn-info"><i class="fa-solid fa-circle-info"></i></button>
              <button onclick="pronounceWord('${x.word}')" class="btn btn-soft btn-info"><i class="fa-solid fa-volume-high"></i></button>
            </div>
          </div>`;
        
        card.appendChild(d);
    })
})