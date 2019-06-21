class MouseTracker {
    constructor() {
        this.x = 0;
        this.y = 0;
        document.addEventListener("dragover", this.mousePosition)
    }

    mousePosition(e) {
        this.x = e.clientX;
        this.y = e.clientY;
    }
}

export let mouseTracker = new MouseTracker();