function f() {
    const el = document.createElement('div');
    el.innerHTML = "sdfg";
    return el;
}

document.body.appendChild(f())