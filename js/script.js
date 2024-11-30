document.addEventListener("DOMContentLoaded", function () {
  function formatNumber(num) {
    let formatted = ("00" + num).substr(-2);
    return `<span>${formatted[0]}</span><span>${formatted[1]}</span>`;
  }

  // Таймер зворотного відліку
  function startTimer() {
    const now = new Date();
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    if (
      now.getHours() === 23 &&
      now.getMinutes() === 59 &&
      now.getSeconds() === 59
    ) {
      endOfDay.setDate(endOfDay.getDate() + 1);
    }

    const totalSeconds = Math.floor(
      (endOfDay.getTime() - now.getTime()) / 1000
    );
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // Оновлення для всіх таймерів
    document.querySelectorAll(".timer").forEach((timer) => {
      timer.querySelector(".hours").innerHTML = formatNumber(hours);
      timer.querySelector(".minutes").innerHTML = formatNumber(minutes);
      timer.querySelector(".seconds").innerHTML = formatNumber(seconds);
    });

    setTimeout(startTimer, 200);
  }

  startTimer();

  // Ініціалізація каруселі (без OwlCarousel, використовувати альтернативний підхід)
  const carousel = document.querySelector(".owl-carousel");
  if (carousel) {
    let currentIndex = 0;
    const items = carousel.children;
    const totalItems = items.length;

    function showItem(index) {
      for (let i = 0; i < totalItems; i++) {
        items[i].style.display = i === index ? "block" : "none";
      }
    }

    showItem(currentIndex);

    // Кнопки навігації
    const prevButton = document.querySelector(".owl-prev");
    const nextButton = document.querySelector(".owl-next");

    if (prevButton) {
      prevButton.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        showItem(currentIndex);
      });
    }

    if (nextButton) {
      nextButton.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % totalItems;
        showItem(currentIndex);
      });
    }
  }
});

const arrowReviewsLeft = document.querySelector(".arrow-left-reviews");
const arrowReviewsRight = document.querySelector(".arrow-right-reviews");

var swiper = new Swiper(".reviews_swiper", {
  spaceBetween: 20,
  pagination: {
    el: ".swiper-pagination",
  },
  navigation: {
    nextEl: arrowReviewsRight,
    prevEl: arrowReviewsLeft,
  },
});

document.addEventListener("DOMContentLoaded", function () {
  const orderForm = document.getElementById("order_form");

  if (orderForm) {
    orderForm.addEventListener("submit", function (event) {
      const submitButton = this.querySelector("button");
      const loadingImage = document.querySelector(".img-loading");

      if (submitButton) {
        submitButton.style.display = "none";
      }

      if (loadingImage) {
        loadingImage.style.display = "block";
      }
    });
  }
});

// telegram form
document
  .querySelector(".order_form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let form = this;
    let loadingImage = form.querySelector(".img-loading");
    let successMessage = form.querySelector(".form_status .success");
    let errorMessage = form.querySelector(".form_status .error");
    let button = form.querySelector(".button");

    // Показати loader
    loadingImage.style.display = "block";

    // Сховати старі повідомлення про статус
    successMessage.style.display = "none";
    errorMessage.style.display = "none";

    let data = new FormData(form);

    // Відправка даних через Fetch API
    fetch("ajax.php", {
      method: "POST",
      body: data,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then(() => {
        // Показати повідомлення про успіх
        successMessage.style.display = "block";
      })
      .catch(() => {
        // Показати повідомлення про помилку
        errorMessage.style.display = "block";
      })
      .finally(() => {
        // Сховати loader
        loadingImage.style.display = "none";

        // Скинути форму
        form.reset();

        // Переконатися, що кнопка відображається
        button.style.display = "block";
        button.disabled = false;
      });
  });
