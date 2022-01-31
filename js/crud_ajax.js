const d = document,
  $table = d.querySelector(".crud-table"),
  $form = d.querySelector(".crud-form"),
  $title = d.querySelector(".crud-tittle"),
  $template = d.getElementById("crud-template").content,
  $fragment = d.createDocumentFragment();

const ajax = (options) => {
  let { url, method, success, error, data } = options;
  const xhr = new XMLHttpRequest();
  xhr.addEventListener("readystatechange", (e) => {
    if (xhr.readyState !== 4) {
      return;
    }
    if (xhr.status >= 200 && xhr.status < 300) {
      let json = JSON.parse(xhr.responseText);
      success(json);
    } else {
      let message = xhr.statusText || "ocurrio un error";
      error(`Error ${xhr.status}:${message}`);
    }
  });

  xhr.open(method || "GET", url);
  xhr.setRequestHeader("content-type", "application/json;charset=utf-8");
  xhr.send(JSON.stringify(data));
};
const getAll = () => {
  ajax({
    method: "GET",
    url: "http://localhost:3000/estudiantes",
    success: (res) => {
      console.log(res);
      res.forEach((el) => {
        $template.querySelector(".name").textContent = el.nombre;
        $template.querySelector(".apellidos").textContent = el.apellidos;
        $template.querySelector(".edit").dataset.id = el.id;
        $template.querySelector(".edit").dataset.name = el.nombre;
        $template.querySelector(".edit").dataset.apellidos = el.apellidos;
        $template.querySelector(".delete").dataset.id = el.id;
        let $clone = d.importNode($template, true);
        $fragment.appendChild($clone);
      });
      $table.querySelector("tbody").appendChild($fragment);
    },
    error: (err) => {
      //console.log(err);
      $table.insertAdjacentHTML("afterend", `<p><b>${err}</b></p`);
    },
  });
};
d.addEventListener("DOMContentLoaded", getAll);

d.addEventListener("submit", (e) => {
  if (e.target === $form) {
    e.preventDefault;
  }
  if (!e.target.id.value) {
    //create-POST
    ajax({
      method: "POST",
      url: "http://localhost:3000/estudiantes",
      sucess: (res) => location.reload(),
      error: (err) =>
        $form.insertAdjacentHTML("afterend", `<p><b>${err}</b></p`),
      data: {
        nombre: e.target.nombre.value,
        apellidos: e.target.apellidos.value,
      },
    });
  } else {
    //update-PUT
    ajax({
      method: "PUT",
      url: `http://localhost:3000/estudiantes/${e.target.id.value}`,
      sucess: (res) => location.reload(),
      error: (err) =>
        $form.insertAdjacentHTML("afterend", `<p><b>${err}</b></p`),
      data: {
        nombre: e.target.nombre.value,
        apellidos: e.target.apellidos.value,
      },
    });
  }
});

d.addEventListener("click", (e) => {
  if (e.target.matches(".edit")) {
    $title.textContent = "Editar Santo";
    $form.nombre.value = e.target.dataset.name;
    $form.apellidos.value = e.target.dataset.apellidos;
    $form.id.value = e.target.dataset.id;
  }

  if (e.target.matches(".delete")) {
    let isDelete = confirm(
      `¿Estas seguro que quieres eliminar le id ${e.target.dataset.id}?`
    );

    if (isDelete) {
      //delete-DELETE
      ajax({
        method: "DELETE",
        url: `http://localhost:3000/estudiantes/${e.target.dataset.id}`,
        sucess: (res) => location.reload(),
        error: (err) =>
          $form.insertAdjacentHTML("afterend", `<p><b>${err}</b></p`),
      });
    }
  }
});
