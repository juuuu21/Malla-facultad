
document.addEventListener("DOMContentLoaded", () => {
    const materias = document.querySelectorAll(".materia");
    const aprobadas = JSON.parse(localStorage.getItem("materiasAprobadas") || "[]");

    function actualizarEstado() {
        materias.forEach(m => {
            const id = m.dataset.id;
            if (!id) return;

            if (aprobadas.includes(id)) {
                m.classList.add("aprobada");
                m.classList.remove("bloqueada");
            } else {
                const previas = m.dataset.previas?.split(",");
                if (previas && !previas.every(pid => aprobadas.includes(pid))) {
                    m.classList.add("bloqueada");
                    m.classList.remove("aprobada");
                } else {
                    m.classList.remove("bloqueada");
                    m.classList.remove("aprobada");
                }
            }
        });
    }

    materias.forEach(materia => {
        const id = materia.dataset.id;
        if (!id) return;

        materia.addEventListener("click", () => {
            if (materia.classList.contains("bloqueada")) return;

            const idx = aprobadas.indexOf(id);
            if (idx !== -1) {
                aprobadas.splice(idx, 1);
            } else {
                aprobadas.push(id);
            }

            localStorage.setItem("materiasAprobadas", JSON.stringify(aprobadas));
            actualizarEstado();
        });
    });

    actualizarEstado();
});
