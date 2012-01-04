function Color (value) {
	var hsv;
	if('string'===typeof(value)) {
		if(value.match(/^#/)) {
			hsv = Color.RGB2HSV(Color.hex2RGB(value));
		} else if (value.match(/^rgb/)) {
			hsv = Color.RGB2HSV(Color.RGBStringToRgb(value));
		} else {
			throw 'Bad color value '+value;
		}
	} else {
		hsv = value;
	}
	this.setHSV(hsv);
}

Color.prototype.clone = function () {
	return new Color(this.getHSV());
}
Color.prototype.toString = function () {
	return Color.RGB2hex(this.getRGB());
}
Color.prototype.getRGB = function () {
	var hsv = this.getHSV();
	var rgb = Color.HSV2RGB(hsv);
	return [1*rgb[0].toFixed(2), 1*rgb[1].toFixed(2), 1*rgb[2].toFixed(2)] ;
}

Color.prototype.getHSV = function () {
	var hsv = [this.h, this.s, this.v];
	return hsv;
}

Color.prototype.setRGB = function (rgb) {
	if(rgb.length < 3) {
		throw 'Bad RGB';
	}
	var hsv = Color.RGB2HSV(rgb);
	this.setHSV(hsv);
}

Color.prototype.setHSV = function (hsv) {
	if(hsv.length < 3) {
		throw 'Bad HSV';
	}
	this.h = hsv[0];
	this.s = hsv[1];
	this.v = hsv[2];
}

Color.prototype.R = function (q) {
	if(undefined === q) {
		return this.getRGB()[0];
	} else {
		var rgb = this.getRGB();
		rgb[0] = q;
		this.setRGB(rgb);
		return this;
	}
}

Color.prototype.G = function (q) {
	if(undefined === q) {
		return this.getRGB()[1];
	} else {
		var rgb = this.getRGB();
		rgb[1] = q;
		this.setRGB(rgb);
		return this;
	}
}

Color.prototype.B = function (q) {
	if(undefined === q) {
		return this.getRGB()[2];
	} else {
		var rgb = this.getRGB();
		rgb[2] = q;
		this.setRGB(rgb);
		return this;
	}
}

Color.prototype.H = function (q) {
	if(undefined === q) {
		return this.h;
	} else {
		if(q > 1 || q < 0) {
			throw 'Bad H';
		}
		this.h = q;
		return this;
	}
}

Color.prototype.S = function (q) {
	if(undefined === q) {
		return this.s;
	} else {
		if(q > 1 || q < 0) {
			throw 'Bad S';
		}
		this.s = q;
		return this;
	}
}

Color.prototype.V = function (q) {
	if(undefined === q) {
		return this.v;
	} else {
		if(q > 1 || q < 0) {
			throw 'Bad H';
		}
		this.v = q;
		return this;
	}
}

Color.prototype.darken = function (factor) {
    if(factor > 1) {
        factor = 1;
    }
    if(factor < 0) {
        factor = 0;
    }
    this.V(this.V() - (this.V() * factor));
    return this;
}
Color.prototype.lighten = function (factor) {
    if(factor > 1) {
        factor = 1;
    }
    if(factor < 0) {
        factor = 0;
    }
    this.V( this.V() + ((1-this.V()) * factor) );
    return this;
}


//-STATIC

Color.RGBStringToRgb = function (rgbString) {
	var s = String(rgbString);
	var parts = s.match(/^rgb\(\s?(\d{1,3}),\s?(\d{1,3}),\s?(\d{1,3})\s?\)$/);
	if(!parts) {
		throw 'Bad RGB-string';
	}
	parts.shift();
    return [
        Number(parts[0]),
        Number(parts[1]),
        Number(parts[2])
    ];
	// return _(parts).map(function (i) {
	// 	return Number(i);
	// });
}

Color.hex2RGB = function (hex) {
	var h = String(hex);
	var isShort = false;
    var parts = h.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
    if(!parts) {
        parts = h.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i);
        isShort = true;
    }
		
	if(!parts) {
		throw 'Bad hex';
	}
	parts.shift();
    if(isShort) {
        return [
            parseInt('' + parts[0] + parts[0], 16),
            parseInt('' + parts[1] + parts[1], 16),
            parseInt('' + parts[2] + parts[2], 16)
        ];
    }
    return [
        parseInt(parts[0], 16),
        parseInt(parts[1], 16),
        parseInt(parts[2], 16)
    ];
}

Color.RGB2hex = function (rgb) {
	var r = Math.round(rgb[0]).toString(16),
		g = Math.round(rgb[1]).toString(16),
		b = Math.round(rgb[2]).toString(16);
	if(r.length == 1) {
		r = '0'+r;
	}
	if(g.length == 1) {
		g = '0'+g;
	}
	if(b.length == 1) {
		b = '0'+b;
	}
	return '#'+r+g+b;
}

Color.fromRGB = function (rgb) {
    if(rgb.length < 3) {
        throw 'Bad RGB';
    }
    var hsv = Color.RGB2HSV(rgb);
    return new Color(hsv);
}

Color.fromHex = function (hex) {
	return Color.fromRGB(Color.hex2RGB(hex));
}

Color.HSV2RGB = function (hsv){
    var h = hsv[0], s = hsv[1], v = hsv[2];
    var r, g, b;

    var i = Math.floor(h * 6);
    var f = h * 6 - i;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);

    switch(i % 6){
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }

    return [r * 255, g * 255, b * 255];
}

Color.RGB2HSV = function (rgb){
    var r = rgb[0], g = rgb[1], b = rgb[2];
    r = r/255, g = g/255, b = b/255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, v = max;

    var d = max - min;
    s = max == 0 ? 0 : d / max;

    if(max == min){
        h = 0; // achromatic
    }else{
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, v];
}

