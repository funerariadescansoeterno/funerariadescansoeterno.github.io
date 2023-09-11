// Scroll Suave do Menu
(function () {
  const menuItems = document.querySelectorAll('.menu__list a[href^="#"]');

  if (menuItems) {
    menuItems.forEach((item) => {
      item.addEventListener("click", scrollToIdOnClick);
    });
  }

  const buttonLink = document.querySelector(".blockIntro a");
  if (buttonLink) {
    buttonLink.addEventListener("click", scrollToIdOnClick);
  }

  function scrollToIdOnClick(e) {
    e.preventDefault();
    const to = getScrollTopByHref(e.target);

    scrollToPosition(to - 80);
  }

  function scrollToPosition(to) {
    // window.scroll({
    //     top: to,
    //     behavior: "smooth"
    // });

    smoothScrollTo(0, to);
  }

  function getScrollTopByHref(element) {
    const id = element.getAttribute("href");
    return document.querySelector(id).offsetTop;
  }

  // Função scroll suave para navegadores antigos
  function smoothScrollTo(endX, endY, duration) {
    const startX = window.scrollX || window.pageXOffset;
    const startY = window.scrollY || window.pageYOffset;
    const distanceX = endX - startX;
    const distanceY = endY - startY;
    const startTime = new Date().getTime();

    duration = typeof duration !== "undefined" ? duration : 400;

    // Easing function
    const easeInOutQuart = (time, from, distance, duration) => {
      if ((time /= duration / 2) < 1)
        return (distance / 2) * time * time * time * time + from;
      return (-distance / 2) * ((time -= 2) * time * time * time - 2) + from;
    };

    const timer = setInterval(() => {
      const time = new Date().getTime() - startTime;
      const newX = easeInOutQuart(time, startX, distanceX, duration);
      const newY = easeInOutQuart(time, startY, distanceY, duration);
      if (time >= duration) {
        clearInterval(timer);
      }
      window.scroll(newX, newY);
    }, 1000 / 60); // 60 fps
  }
})();

// Tabs da página de contratar plano
(function () {
  let radio = document.querySelectorAll(
    '.selectPlan__checkbox input[type="radio"]'
  );
  let plan = document.querySelectorAll(".seleclPlan .plans__features");
  let locationVar = location.search;

  if (radio && plan) {
    radio.forEach((item, i) => {
      formatParam(locationVar, radio[i], plan[i]);
      item.addEventListener("click", () => {
        removeActive(getParent(radio[i]), plan[i]);
        showElements(radio[i], plan[i]);
      });
    });
  }

  // Seleciona o plano escolhido na tela anterior
  function formatParam(param, elm, wraper) {
    if (param) {
      let corda = param.split("=");
      let elementAttribute = elm.getAttribute("value");

      if (corda.includes(elementAttribute)) {
        showElements(elm, wraper, true);
      }
    } else {
      showElements(radio[0], plan[0], true);
    }
  }

  function showElements(item, content, noChecked) {
    noChecked ? noChecked : false;

    if (noChecked) {
      if (item && content) {
        item.checked = true;
        getParent(item).classList.add("selected");
        content.classList.add("visible");
        return true;
      }
    } else {
      if (item.checked) {
        getParent(item).classList.add("selected");
        content.classList.add("visible");
      }
    }
  }

  function getParent(elemento) {
    if (elemento) {
      return elemento.parentNode;
    } else {
      return false;
    }
  }

  function removeActive(item, content) {
    let parentItem = getParent(item);
    let parentContent = getParent(content);

    if (
      verifyElement(parentItem, "selected") &&
      verifyElement(parentContent, "visible")
    ) {
      verifyElement(parentItem, "selected").classList.remove("selected");
      verifyElement(parentContent, "visible").classList.remove("visible");
    }
  }

  function verifyElement(elemento, classe) {
    let containsCLass = elemento.querySelector("." + classe);

    if (containsCLass) {
      return containsCLass;
    } else {
      return false;
    }
  }
})();
