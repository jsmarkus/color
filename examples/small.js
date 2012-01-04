function display(color) {
    var d = document.createElement('DIV');
    d.style.backgroundColor = '' + color;
    d.style.width = '100px';
    d.style.height = '100px';
    d.style.marginBottom = '1px';
    d.style.marginRight = '1px';
    d.style.float = 'left';
    document.body.appendChild(d);
    return d;
}

function br(color) {
    var d = document.createElement('DIV');
    d.style.clear = 'both';
    document.body.appendChild(d);
}

function print(text) {
    var d = document.createElement('DIV');
    d.style.clear = 'both';
    d.innerHTML = text;
    document.body.appendChild(d);
}


var c = Color.fromHex('#2277ee');

print('darken');

display(c);
display(c.darken(0.25));
display(c.darken(0.25));
display(c.darken(0.25));
display(c.darken(0.25));

br();
print('lighten');

//c = Color.fromHex('#2277ee');
display(c.lighten(0.25));
display(c.lighten(0.25));
display(c.lighten(0.25));
display(c.lighten(0.25));
display(c.lighten(0.25));

