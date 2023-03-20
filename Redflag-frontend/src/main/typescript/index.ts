function f() {
    const el = document.createElement('div');
    el.innerHTML = "ASDF";
    return el;
}

document.body.appendChild(f())