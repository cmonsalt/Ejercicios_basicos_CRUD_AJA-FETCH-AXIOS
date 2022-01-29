(() => {
  const xhr = new XMLHttpRequest(),
    $xhr = document.getElementById("xhr"),
    $fragment = document.createDocumentFragment();

  xhr.addEventListener("readystatechange", (e) => {
    if (xhr.readyState !== 4) {
      return;
    }

    if (xhr.status >= 200 && xhr.status < 300) {
      let json = JSON.parse(xhr.responseText);
      json.forEach((el) => {
        const $li = document.createElement("li");
        $li.textContent = `${el.name}--${el.email}--${el.phone}`;
        $fragment.appendChild($li);
      });
    } else {
      let message = xhr.statusText || "ocurrio un error";
      $xhr.innerHTML = `Error ${xhr.status}: ${message}`;
    }
    $xhr.appendChild($fragment);
  });

  xhr.open("GET", "https://jsonplaceholder.typicode.com/users");

  xhr.send();
})();

//------------------------------------------------------------------------------------

(() => {
  const $fetch = document.getElementById("fetch"),
    $fragment = document.createDocumentFragment();
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => {
      //console.log(res);
      return res.ok ? res.json() : Promise.reject(res);
    })
    .then((json) => {
      //console.log(json);
      json.forEach((el) => {
        const $li = document.createElement("li");
        $li.textContent = `${el.name}--${el.email}--${el.phone}`;
        $fragment.appendChild($li);
      });
      $fetch.appendChild($fragment);
    })
    .catch((err) => {
      let message = err.statusText || "ocurrio un error";
      $fetch.innerHTML = `Error ${err.status}: ${message}`;
    })
    .finally(() => {
      // console.log(
      //   "Esto se ejecutara independiente del resultado de la promesa Fetch"
      // );
    });
})();

//------------------------------------------------------------------------------------
(() => {
  const $fetchAsync = document.getElementById("fetch-async"),
    $fragment = document.createDocumentFragment();

  async function getData() {
    try {
      let res = await fetch("https://jsonplaceholder.typicode.com/users"),
        json = await res.json();
      if (!res.ok) throw { status: res.status, statusText: res.statusText };
      // console.log(res, json);
      json.forEach((el) => {
        const $li = document.createElement("li");
        $li.textContent = `${el.name}--${el.email}--${el.phone}`;
        $fragment.appendChild($li);
      });
      $fetchAsync.appendChild($fragment);
    } catch (err) {
      //console.log(err);
      let message = err.statusText || "ocurrio un error";
      $fetchAsync.innerHTML = `Error ${err.status}: ${message}`;
    } finally {
    }
  }

  getData();
})();

(() => {
  const $axios = document.getElementById("axios"),
    $fragment = document.createDocumentFragment();

  axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((res) => {
      //console.log(res);
      let json = res.data;
      json.forEach((el) => {
        const $li = document.createElement("li");
        $li.textContent = `${el.name}--${el.email}--${el.phone}`;
        $fragment.appendChild($li);
      });
      $axios.appendChild($fragment);
    })
    .catch((err) => {
      //console.log(err.response);
      let message = err.response.statusText || "ocurrio un error";
      $axios.innerHTML = `Error ${err.response.status}: ${message}`;
    })
    .finally();
})();

//------------------------------------------------------------------------------------
(() => {
  const $axiosAsync = document.getElementById("axios-async"),
    $fragment = document.createDocumentFragment();

  async function getData() {
    try {
      let res = await axios.get("https://jsonplaceholder.typicode.com/users");
      res.data.forEach((el) => {
        const $li = document.createElement("li");
        $li.textContent = `${el.name}--${el.email}--${el.phone}`;
        $fragment.appendChild($li);
      });
      $axiosAsync.appendChild($fragment);
    } catch (err) {
      //console.log(err);
      let message = err.statusText || "ocurrio un error";
      $axiosAsync.innerHTML = `Error ${err.status}: ${message}`;
    } finally {
    }
  }
  getData();
})();
