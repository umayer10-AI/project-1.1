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
    }

    v.forEach(x => {
        const d = document.createElement("div");
        d.innerHTML = `<div class="space-y-5 text-center bg-white p-7 rounded-3xl shadow-md">
            <div class="space-y-4">
              <h3 class="text-2xl font-bold">${x.word}</h3>
              <p class="font-medium">Meaning /Pronounciation</p>
              <p class="text-2xl font-semibold">"${x.meaning}/${x.pronunciation} ইগার"</p>
            </div>
            <div class="flex justify-between">
              <button class="btn btn-soft btn-info"><i class="fa-solid fa-circle-info"></i></button>
              <button class="btn btn-soft btn-info"><i class="fa-solid fa-volume-high"></i></button>
            </div>
          </div>`;
        
        card.appendChild(d);
    })
    
};

let cb = (id) => {
    const a = document.getElementById(id);

    let b1 = document.getElementById("1");
    let b2 = document.getElementById("2");
    let b3 = document.getElementById("3");
    let b4 = document.getElementById("4");
    let b5 = document.getElementById("5");
    let b6 = document.getElementById("6");
    let b7 = document.getElementById("7");

    b1.classList.remove("bg-primary","text-white");
    b2.classList.remove("bg-primary","text-white");
    b3.classList.remove("bg-primary","text-white");
    b4.classList.remove("bg-primary","text-white");
    b5.classList.remove("bg-primary","text-white");
    b6.classList.remove("bg-primary","text-white");
    b7.classList.remove("bg-primary","text-white");

    a.classList.add("bg-primary","text-white");

}

btn.addEventListener("click", async (e) => {
    if(e.target.matches("button")){
        const a = await fetch(`https://openapi.programming-hero.com/api/level/${e.target.id}`);
        const b = await a.json();
        const c = b.data;
        const f = e.target.id;

        cb(f);
        cardContainer(c);
    }
})