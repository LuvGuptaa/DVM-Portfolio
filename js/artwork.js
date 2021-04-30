const scrollFullPage = () => {
    const back = document.querySelector('.background');
    window.scrollTo(0 , back.offsetHeight)
}

const el = document.querySelector(".artworkImage");

el.addEventListener("onmouseover", (e) => {
    el.style.transform = `translate(${-e.offsetX/10}px , ${-e.offsetY/10}px)`;
    console.log(`translate(${-e.offsetX/100}px , ${-e.offsetY/100}px)`)
});

let inner = document.querySelectorAll(".artworkImage");

inner.forEach((inner) => (function() {
    // Init


    // Mouse
    let mouse = {
        _x: 0,
        _y: 0,
        x: 0,
        y: 0,
        updatePosition: function(event) {
            let e = event || window.event;
            this.x = e.clientX - this._x;
            this.y = e.offsetY - this._y ;
            // console.log(this)
        },
        setOrigin: function(e) {
            this._x = e.offsetLeft + Math.floor(e.offsetWidth / 2);
            this._y =  Math.floor(e.offsetHeight / 2);
        },
        show: function() {
            return "(" + this.x + ", " + this.y + ")";
        }
    };

    // Track the mouse position relative to the center of the container.
    mouse.setOrigin(inner);

    //-----------------------------------------

    let counter = 0;
    let updateRate = 10;
    let isTimeToUpdate = function() {
        return counter++ % updateRate === 0;
    };

    //-----------------------------------------

    let onMouseEnterHandler = function(event) {
        update(event);
    };

    let onMouseLeaveHandler = function() {
        inner.style = "";
    };

    let onMouseMoveHandler = function(event) {
        if (isTimeToUpdate()) {
            update(event);
        }
    };

    //-----------------------------------------

    let update = function(event) {
        mouse.updatePosition(event);
        updateTransformStyle(
            2 * (mouse.x / inner.offsetWidth ).toFixed(2),
            2 * (mouse.y / inner.offsetHeight).toFixed(2)
        );
    };

    let updateTransformStyle = function(x, y) {
        // console.log(x)
        let style = "translateX(" + -10*x + "px) translateY(" + -10*y + "px)";
        inner.children[0].style.transform = "translateX(" + 10* x + "px) translateY(" + 10* y + "px) scale(1.15)"
        inner.style.transform = style;
    };

    //-----------------------------------------

    inner.onmouseenter = onMouseEnterHandler;
    inner.onmouseleave = onMouseLeaveHandler;
    inner.onmousemove = onMouseMoveHandler;
})())

