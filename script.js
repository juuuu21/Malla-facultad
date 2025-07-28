document.addEventListener("DOMContentLoaded", () => {
    const materias = document.querySelectorAll(".materia");
    const aprobadas = JSON.parse(localStorage.getItem("materiasAprobadas") || "[]");

    function actualizarEstado() {
        materias.forEach(m => {
            const id = m.dataset.id;
            if (aprobadas.includes(id)) {
                m.classList.add("aprobada");
                m.classList.remove("bloqueada");
            } else {
                const previas = m.dataset.previas?.split(",");
                if (previas && !previas.every(pid => aprobadas.includes(pid))) {
                    m.classList.add("bloqueada");
                } else {
                    m.classList.remove("bloqueada");
                }
                m.classList.remove("aprobada");
            }
        });
    }

    materias.forEach(materia => {
        materia.addEventListener("click", () => {
            const id = materia.dataset.id;
            if (materia.classList.contains("bloqueada")) return;

            if (aprobadas.includes(id)) {
                const index = aprobadas.indexOf(id);
                aprobadas.splice(index, 1);
            } else {
                aprobadas.push(id);
            }
            localStorage.setItem("materiasAprobadas", JSON.stringify(aprobadas));
            actualizarEstado();
        });
    });

    actualizarEstado();
});
