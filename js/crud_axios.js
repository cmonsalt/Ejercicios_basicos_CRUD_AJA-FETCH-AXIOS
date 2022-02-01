const d = document,
  $table = d.querySelector(".crud-table"),
  $form = d.querySelector(".crud-form"),
  $title = d.querySelector(".crud-tittle"),
  $template = d.getElementById("crud-template").content,
  $fragment = d.createDocumentFragment();

const getAll = async () => {
  try {
    let res = await axios.get("http://localhost:3000/estudiantes"),
      json = res.data;
    json.forEach((el) => {
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
  } catch (err) {
    let message = err.statusText || "Ocurrio un error";
    $table.insertAdjacentHTML(
      "afterend",
      `<p><b>Error ${err.status}: ${message}</b></p>`
    );
  }
};
d.addEventListener("DOMContentLoaded", getAll);

d.addEventListener("submit", async (e) => {
  if (e.target === $form) {
    e.preventDefault;

    if (!e.target.id.value) {
      //create-POST
      try {
        let options = {
          method: "POST",
          headers: { "content-type": "application/json;charset=utf-8" },
          data: JSON.stringify({
            nombre: e.target.nombre.value,
            apellidos: e.target.apellidos.value,
          }),
        };
        let res = await axios("http://localhost:3000/estudiantes", options),
          json = await res.json();
        location.reload();
      } catch (err) {
        let message = err.statusText || "Ocurrio un error";
        $form.insertAdjacentHTML(
          "afterend",
          `<p><b>Error ${err.status}: ${message}</b></p`
        );
      }
    } else {
      //update-PUT
      try {
        let options = {
          method: "PUT",
          headers: { "content-type": "application/json;charset=utf-8" },
          data: JSON.stringify({
            nombre: e.target.nombre.value,
            apellidos: e.target.apellidos.value,
          }),
        };
        let res = await axios(
            `http://localhost:3000/estudiantes/${e.target.id.value}`,
            options
          ),
          json = await res.json();
        location.reload();
      } catch (err) {
        let message = err.statusText || "Ocurrio un error";
        $form.insertAdjacentHTML(
          "afterend",
          `<p><b>Error ${err.status}: ${message}</b></p`
        );
      }
    }
  }
});

d.addEventListener("click", async (e) => {
  if (e.target.matches(".edit")) {
    $title.textContent = "Editar Estudiante";
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
      try {
        let options = {
          method: "DELETE",
          headers: { "content-type": "application/json;charset=utf-8" },
        };
        let res = await axios(
            `http://localhost:3000/estudiantes/${e.target.dataset.id}`,
            options
          ),
          json = await res.data;
        location.reload();
      } catch (err) {
        let message = err.statusText || "Ocurrio un error";
        alert(`Error ${err.status}: ${message}`);
      }
    }
  }
});
