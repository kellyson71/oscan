document.addEventListener("DOMContentLoaded", () => {
  // Ajustar altura para mobile
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  window.addEventListener("resize", () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });

  // Elementos do DOM
  const card = document.querySelector(".card");
  const photo = document.querySelector(".profile-photo");
  const celebrateBtn = document.getElementById("celebrateBtn");

  // Inicialização e eventos
  initializeCard();
  setupEventListeners();

  function initializeCard() {
    setTimeout(() => {
      card.style.transform = "translateY(0) scale(1)";
    }, 200);
  }

  function setupEventListeners() {
    // Efeito suave na foto
    photo.addEventListener("mouseover", () => {
      photo.style.transition = "transform 0.3s ease";
    });

    // Evento de clique no botão
    celebrateBtn.addEventListener("click", () => {
      createConfetti();
      blowCandle();
      playBirthdaySong();
      animateCard();
    });

    // Suporte para touch events
    card.addEventListener("touchstart", (e) => {
      e.stopPropagation();
    });

    // Prevenir bounce do scroll no iOS
    document.body.addEventListener(
      "touchmove",
      (e) => {
        if (e.target.closest(".card")) return;
        e.preventDefault();
      },
      { passive: false }
    );
  }

  function animateCard() {
    card.style.transform = "translateY(-10px)";
    setTimeout(() => {
      card.style.transform = "translateY(0)";
    }, 500);
  }

  // Função para apagar a vela
  function blowCandle() {
    const flame = document.querySelector(".flame");
    flame.style.opacity = "0";

    // Adiciona pequena fumaça depois de apagar a vela
    setTimeout(() => {
      const smoke = document.createElement("div");
      smoke.style.cssText = `
        position: absolute;
        width: 10px;
        height: 20px;
        background: rgba(200, 200, 200, 0.5);
        border-radius: 50%;
        top: -15px;
        left: 50%;
        transform: translateX(-50%);
        filter: blur(4px);
      `;

      document.querySelector(".candle").appendChild(smoke);

      const smokeAnim = smoke.animate(
        [
          {
            transform: "translateX(-50%) translateY(0) scale(1)",
            opacity: 0.7,
          },
          {
            transform: "translateX(-60%) translateY(-40px) scale(3)",
            opacity: 0,
          },
        ],
        {
          duration: 2000,
          easing: "ease-out",
        }
      );

      smokeAnim.onfinish = () => smoke.remove();
    }, 100);
  }

  // Substituir função createConfetti pela nova usando canvas-confetti
  function createConfetti() {
    const duration = 3000;
    const end = Date.now() + duration;

    function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#ff6b6b", "#5f27cd", "#ffbe76", "#54a0ff", "#1dd1a1"],
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#ff9ff3", "#feca57", "#48dbfb", "#1dd1a1", "#ff6b6b"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }

    frame();

    // Explosão no centro
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: [
        "#ff6b6b",
        "#5f27cd",
        "#ffbe76",
        "#54a0ff",
        "#1dd1a1",
        "#ff9ff3",
        "#feca57",
      ],
      scalar: 0.8,
      shapes: ["circle", "square"],
      disableForReducedMotion: true,
    });
  }

  // Função para simular música de aniversário
  function playBirthdaySong() {
    console.log("🎵 Parabéns pra você, nesta data querida... 🎵");

    // Criar elementos visuais de notas musicais flutuando
    const musicNotes = ["♪", "♫", "♩", "♬"];

    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        const note = document.createElement("div");
        const noteChar =
          musicNotes[Math.floor(Math.random() * musicNotes.length)];

        note.textContent = noteChar;
        note.style.cssText = `
          position: absolute;
          color: #5f27cd;
          font-size: ${Math.random() * 20 + 20}px;
          top: 50%;
          left: ${Math.random() * 80 + 10}%;
          opacity: 0.8;
          pointer-events: none;
          text-shadow: 0 2px 5px rgba(0,0,0,0.1);
        `;

        document.body.appendChild(note);

        const noteAnimation = note.animate(
          [
            { transform: "translateY(0) rotate(0deg)", opacity: 0.8 },
            {
              transform: `translateY(-100px) rotate(${
                Math.random() * 60 - 30
              }deg)`,
              opacity: 0,
            },
          ],
          {
            duration: 2000,
            easing: "ease-out",
          }
        );

        noteAnimation.onfinish = () => note.remove();
      }, i * 300);
    }
  }
});
