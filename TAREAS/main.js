class TaskManager {
    tasks = [];
    lastId = 0;
    tagTask = null;
    tagText = null;
    nameLabelStorage = "tasks";

    constructor(tagTask, tagText) {
        this.tagTask = tagTask;
        this.tagText = tagText;
        // console.log(this.tagTask.id);

        if (localStorage.getItem(this.nameLabelStorage) !== null) {
            this.tasks = JSON.parse(localStorage.getItem(this.nameLabelStorage));
            this.lastId = this.tasks.length > 0 ?
                this.tasks[this.tasks.length - 1].id : 0;
            this.refresh();
        }
    }

    add() {
        this.lastId++;
        this.tasks.push({
            id: this.lastId,
            text: this.tagText.value
        });
        localStorage.setItem(this.nameLabelStorage,
            JSON.stringify(this.tasks));
        // console.log(this.tasks);
        this.tagText.value = "";
        this.tagText.focus();
        this.refresh();
    }


    remove(id) {
        this.tasks = this.tasks.filter(e => e.id !== id);
        localStorage.setItem(this.nameLabelStorage,
            JSON.stringify(this.tasks));
        this.refresh();
    }

    refresh() {
        this.tagTask.innerHTML = "";

        this.tasks.forEach(e => {
            // console.log(e.text);
            let div = document.createElement("div");
            let divRemove = document.createElement("div");
            let buttonRemove = document.createElement("input");

            // div por elemento 
            div.innerHTML = e.text;

            // div del botón borrar 
            divRemove.classList.add("divButtom");

            // botón borrar
            buttonRemove.type = "button";
            buttonRemove.value = "X";
            buttonRemove.classList.add("btn-danger");
            buttonRemove.addEventListener("click", () => {
                // console.log("eliminar" + e.id);
                this.remove(e.id);
            })
            divRemove.appendChild(buttonRemove);
            div.appendChild(divRemove);


            // agregar elementos a div padre
            this.tagTask.appendChild(div);
        });
    }
}