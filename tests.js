
function identity(value) {
    return value;
}

/**
 * Given a list of arguments, specified as lists of lists,
 * where the first element in each list is the function to call
 * to construct an object and the second is the parameters to the
 * object, return a list with the constructed objects
 * @param {list} args 
 */
function evalArgs(args) {
    return args.map(function(arg) {
        let fn = eval(arg[0]);
        return fn.apply(null, arg[1]);
    });
}

function prettyvec3(v) {
    try {
        return "vec3(" + v[0].toFixed(2) + ", " + v[1].toFixed(2) + ", " + v[2].toFixed(2) + ")";
    }
    catch {
        return "" + v;
    }
}

function prettyvec3list(vs) {
    try{
        let s = "[";
        vs.forEach(function(v, index) {
            s += prettyvec3(v);
            if (index < vs.length-1) {
                s += ",<BR>";
            }
        });
        s += "]";
        return s;
    }
    catch {
        return "" + v;
    }
}

function prettyfloat(x) {
    try {
        return x.toFixed(2);
    }
    catch {
        return "" + x;
    }
}

/**
 * Return true if two numbers are near, or false otherwise
 * @param {number} x 
 * @param {number} y 
 */
function nearFloats(x, y) {
    try {
        return eval(x.toFixed(2)) == eval(y.toFixed(2));
    }
    catch(err) {
        return false;
    }
}

/**
 * Return true if vectors are near, or false otherwise
 * @param {vec3} x 
 * @param {vec3} y 
 */
function nearVecs(x, y) {
    try {
        let diff = vec3.create();
        vec3.subtract(diff, x, y);
        let magSqr = vec3.dot(diff, diff);
        let xmagSqr = vec3.dot(x, x);
        let ymagSqr = vec3.dot(y, y);
        if (xmagSqr == 0 && ymagSqr == 0) {
            return true;
        }
        else if (xmagSqr == 0 || ymagSqr == 0) {
            return false;
        }
        else if (magSqr/xmagSqr < 1e-5 && magSqr/ymagSqr < 1e-5) {
            return true;
        }
        else {
            return false;
        }
    }
    catch(err) {
        return false;
    }
}

/**
 * Check if two ordered lists of vectors agree
 * @param {list of vec3} xl 
 * @param {list of vec3} yl 
 */
function nearVecsList(xl, yl) {
    try {
        if (xl.length != yl.length) {
            return false;
        }
        for (var i = 0; i < xl.length; i++) {
            if (!nearVecs(xl[i], yl[i])) {
                return false;
            }
        }
        return true;
    }
    catch {
        return false;
    }
}


tests = "[{\"fn\":\"rayIntersectSphere\",\"argnames\":[\"p0\",\"v\",\"c\",\"r\"],\"argformat\":[\"prettyvec3\",\"prettyvec3\",\"prettyvec3\",\"prettyfloat\"],\"outputformat\":\"prettyvec3list\",\"checkNear\":\"nearVecsList\",\"examples\":[{\"args\":[[\"vec3.fromValues\",[0,0,0]],[\"vec3.fromValues\",[1,0,0]],[\"vec3.fromValues\",[2,-2,0]],[\"identity\",[2]]],\"ans\":[\"evalArgs\",[[[\"vec3.fromValues\",[2,0,0]]]]],\"comments\":\"Corner case: double root\"},{\"args\":[[\"vec3.fromValues\",[0,0,0]],[\"vec3.fromValues\",[1,1,1]],[\"vec3.fromValues\",[-5,-5,-5]],[\"identity\",[1]]],\"ans\":[\"evalArgs\",[[]]],\"comments\":\"Ray pointing wrong way\"},{\"args\":[[\"vec3.fromValues\",[0,0,0]],[\"vec3.fromValues\",[1,1,1]],[\"vec3.fromValues\",[5,5,5]],[\"identity\",[1]]],\"ans\":[\"evalArgs\",[[[\"vec3.fromValues\",[4.422649730810374,4.422649730810374,4.422649730810374]],[\"vec3.fromValues\",[5.577350269189626,5.577350269189626,5.577350269189626]]]]],\"comments\":\"Ray pointing the right way<BR>Should be 2 intersections<BR>(check their order)\"},{\"args\":[[\"vec3.fromValues\",[0,0,0]],[\"vec3.fromValues\",[1,1,1]],[\"vec3.fromValues\",[0,0,0]],[\"identity\",[1]]],\"ans\":[\"evalArgs\",[[[\"vec3.fromValues\",[0.5773502691896258,0.5773502691896258,0.5773502691896258]]]]],\"comments\":\"Ray inside sphere\"},{\"args\":[[\"vec3.fromValues\",[0,-1,2]],[\"vec3.fromValues\",[-1,0,0]],[\"vec3.fromValues\",[0,2,0]],[\"identity\",[3.842216172317346]]],\"ans\":[\"evalArgs\",[[[\"vec3.fromValues\",[-1.3276389837265015,-1,2]]]]]},{\"args\":[[\"vec3.fromValues\",[-2,-1,2]],[\"vec3.fromValues\",[0,-2,-2]],[\"vec3.fromValues\",[-2,1,1]],[\"identity\",[0.1804997169025685]]],\"ans\":[\"evalArgs\",[[]]]},{\"args\":[[\"vec3.fromValues\",[1,-2,1]],[\"vec3.fromValues\",[1,1,0]],[\"vec3.fromValues\",[2,-2,0]],[\"identity\",[2.615015875904249]]],\"ans\":[\"evalArgs\",[[[\"vec3.fromValues\",[3.1337544918060303,0.13375458121299744,1]]]]]},{\"args\":[[\"vec3.fromValues\",[2,2,0]],[\"vec3.fromValues\",[0,-2,1]],[\"vec3.fromValues\",[0,-2,2]],[\"identity\",[1.12358532630085]]],\"ans\":[\"evalArgs\",[[]]]},{\"args\":[[\"vec3.fromValues\",[2,-2,1]],[\"vec3.fromValues\",[-2,2,0]],[\"vec3.fromValues\",[2,2,1]],[\"identity\",[0.9751983327235147]]],\"ans\":[\"evalArgs\",[[]]]},{\"args\":[[\"vec3.fromValues\",[-1,1,-2]],[\"vec3.fromValues\",[1,0,0]],[\"vec3.fromValues\",[0,-2,-2]],[\"identity\",[4.6221104590164055]]],\"ans\":[\"evalArgs\",[[[\"vec3.fromValues\",[3.5162343978881836,1,-2]]]]]},{\"args\":[[\"vec3.fromValues\",[2,1,0]],[\"vec3.fromValues\",[2,-1,0]],[\"vec3.fromValues\",[1,-2,-1]],[\"identity\",[4.659891303423932]]],\"ans\":[\"evalArgs\",[[[\"vec3.fromValues\",[5.354939937591553,-0.6774699091911316,0]]]]]},{\"args\":[[\"vec3.fromValues\",[-1,1,1]],[\"vec3.fromValues\",[2,1,2]],[\"vec3.fromValues\",[1,1,2]],[\"identity\",[4.294740567995162]]],\"ans\":[\"evalArgs\",[[[\"vec3.fromValues\",[3.1177978515625,3.05889892578125,5.1177978515625]]]]]},{\"args\":[[\"vec3.fromValues\",[-2,2,0]],[\"vec3.fromValues\",[-2,0,2]],[\"vec3.fromValues\",[0,2,0]],[\"identity\",[2.0123937230185613]]],\"ans\":[\"evalArgs\",[[[\"vec3.fromValues\",[-2.0123558044433594,2,0.01235579140484333]]]]]},{\"args\":[[\"vec3.fromValues\",[0,1,-2]],[\"vec3.fromValues\",[0,-2,2]],[\"vec3.fromValues\",[1,-1,-2]],[\"identity\",[4.93791786276165]]],\"ans\":[\"evalArgs\",[[[\"vec3.fromValues\",[0,-3.2697885036468506,2.2697885036468506]]]]]}]},{\"fn\":\"getBarycentricCoords\",\"argnames\":[\"a\",\"b\",\"c\",\"p\"],\"argformat\":[\"prettyvec3\",\"prettyvec3\",\"prettyvec3\",\"prettyvec3\"],\"outputformat\":\"prettyvec3\",\"checkNear\":\"nearVecs\",\"examples\":[{\"args\":[[\"vec3.fromValues\",[0,1,2]],[\"vec3.fromValues\",[1,0,0]],[\"vec3.fromValues\",[0,1,0]],[\"vec3.fromValues\",[0,1,0]]],\"ans\":[\"vec3.fromValues\",[0,0,1]],\"comments\":\"Literally a \\\"corner case:\\\"<BR>point on vertex\"},{\"args\":[[\"vec3.fromValues\",[0,0,0]],[\"vec3.fromValues\",[1,0,0]],[\"vec3.fromValues\",[0,1,0]],[\"vec3.fromValues\",[0.5,0,0]]],\"ans\":[\"vec3.fromValues\",[0.5,0.5,0]],\"comments\":\"Corner case: point on edge\"},{\"args\":[[\"vec3.fromValues\",[0,0,0]],[\"vec3.fromValues\",[0,0,0]],[\"vec3.fromValues\",[0,0,0]],[\"vec3.fromValues\",[0,0,0]]],\"ans\":[\"vec3.fromValues\",[1,0,0]],\"comments\":\"Corner case: zero area triangle, same point\"},{\"args\":[[\"vec3.fromValues\",[0,0,0]],[\"vec3.fromValues\",[0,0,0]],[\"vec3.fromValues\",[0,0,0]],[\"vec3.fromValues\",[1,0,0]]],\"ans\":[\"vec3.fromValues\",[0,0,0]],\"comments\":\"Corner case: zero area triangle, different point\"},{\"args\":[[\"vec3.fromValues\",[0,0,0]],[\"vec3.fromValues\",[1,0,0]],[\"vec3.fromValues\",[0,1,0]],[\"vec3.fromValues\",[0,1,0.1]]],\"ans\":[\"vec3.fromValues\",[0,0,0]],\"comments\":\"Point above triangle\"},{\"args\":[[\"vec3.fromValues\",[0,0,0]],[\"vec3.fromValues\",[1,0,0]],[\"vec3.fromValues\",[0,1,0]],[\"vec3.fromValues\",[2,2,0]]],\"ans\":[\"vec3.fromValues\",[0,0,0]],\"comments\":\"Point in plane but outside triangle\"},{\"args\":[[\"vec3.fromValues\",[-4,1,3]],[\"vec3.fromValues\",[2,-5,1]],[\"vec3.fromValues\",[0,4,-4]],[\"vec3.fromValues\",[-0.36925435066223145,-0.7441874146461487,0.2625376284122467]]],\"ans\":[\"vec3.fromValues\",[0.3050396178934034,0.42545206052546714,0.2695083215811296]]},{\"args\":[[\"vec3.fromValues\",[-3,-4,-3]],[\"vec3.fromValues\",[0,3,4]],[\"vec3.fromValues\",[-3,3,-2]],[\"vec3.fromValues\",[-1.748275876045227,2.6032521724700928,0.4467700719833374]]],\"ans\":[\"vec3.fromValues\",[0.056678248427531476,0.4172413858161667,0.5260803657563018]]},{\"args\":[[\"vec3.fromValues\",[-3,2,-2]],[\"vec3.fromValues\",[4,5,-3]],[\"vec3.fromValues\",[-2,4,-4]],[\"vec3.fromValues\",[1.8841949701309204,4.271690368652344,-2.90865421295166]]],\"ans\":[\"vec3.fromValues\",[0.20491384322140813,0.6815181508259535,0.11356800595263838]]},{\"args\":[[\"vec3.fromValues\",[5,-4,5]],[\"vec3.fromValues\",[-3,3,-5]],[\"vec3.fromValues\",[-1,-5,-3]],[\"vec3.fromValues\",[-1.9403553009033203,-1.186591386795044,-3.9361960887908936]]],\"ans\":[\"vec3.fromValues\",[0.0020795001781561706,0.4764161391412123,0.5215043606806314]]},{\"args\":[[\"vec3.fromValues\",[-3,0,4]],[\"vec3.fromValues\",[-3,5,0]],[\"vec3.fromValues\",[4,0,-1]],[\"vec3.fromValues\",[-1.5259114503860474,1.9541674852371216,1.3837456703186035]]],\"ans\":[\"vec3.fromValues\",[0.39858241915641063,0.39083350666176236,0.21058407418182695]]},{\"args\":[[\"vec3.fromValues\",[2,3,4]],[\"vec3.fromValues\",[-1,2,3]],[\"vec3.fromValues\",[4,-2,2]],[\"vec3.fromValues\",[2.2596595287323,1.310638666152954,3.250828504562378]]],\"ans\":[\"vec3.fromValues\",[0.5642254032106829,0.12237790641732456,0.3133966903719926]]},{\"args\":[[\"vec3.fromValues\",[-3,-5,1]],[\"vec3.fromValues\",[0,-4,-4]],[\"vec3.fromValues\",[-3,-3,4]],[\"vec3.fromValues\",[-2.2528562545776367,-3.8254735469818115,1.142978310585022]]],\"ans\":[\"vec3.fromValues\",[0.28821288183752064,0.24904787938435086,0.46273923877812856]]},{\"args\":[[\"vec3.fromValues\",[-3,-3,-5]],[\"vec3.fromValues\",[3,0,-3]],[\"vec3.fromValues\",[-5,3,1]],[\"vec3.fromValues\",[-2.317948341369629,0.8874413967132568,-1.395110845565796]]],\"ans\":[\"vec3.fromValues\",[0.21081699339062157,0.28255221753902776,0.5066307890703506]]},{\"args\":[[\"vec3.fromValues\",[3,0,-5]],[\"vec3.fromValues\",[3,-3,1]],[\"vec3.fromValues\",[1,-3,-4]],[\"vec3.fromValues\",[2.3308827877044678,-2.4710023403167725,-1.730788230895996]]],\"ans\":[\"vec3.fromValues\",[0.17633253856065817,0.48910885365029116,0.33455860778905067]]},{\"args\":[[\"vec3.fromValues\",[-1,1,-4]],[\"vec3.fromValues\",[-1,-1,2]],[\"vec3.fromValues\",[0,-4,1]],[\"vec3.fromValues\",[-0.540823221206665,-1.3516395092010498,-1.5368489027023315]]],\"ans\":[\"vec3.fromValues\",[0.5129453590831625,0.027877885077644122,0.4591767558391933]]}]},{\"fn\":\"rayIntersectTriangle\",\"argnames\":[\"p0\",\"v\",\"a\",\"b\",\"c\"],\"argformat\":[\"prettyvec3\",\"prettyvec3\",\"prettyvec3\",\"prettyvec3\",\"prettyvec3\"],\"outputformat\":\"prettyvec3list\",\"checkNear\":\"nearVecsList\",\"examples\":[{\"args\":[[\"vec3.fromValues\",[0.3,0.3,0]],[\"vec3.fromValues\",[0,0,1]],[\"vec3.fromValues\",[0,0,1]],[\"vec3.fromValues\",[1,0,1]],[\"vec3.fromValues\",[0,1,1]]],\"ans\":[\"evalArgs\",[[[\"vec3.fromValues\",[0.3,0.3,1]]]]],\"comments\":\"Simple example\"},{\"args\":[[\"vec3.fromValues\",[1,1,0]],[\"vec3.fromValues\",[0,0,1]],[\"vec3.fromValues\",[0,0,1]],[\"vec3.fromValues\",[1,0,1]],[\"vec3.fromValues\",[0,1,1]]],\"ans\":[\"evalArgs\",[[]]],\"comments\":\"Ray hits plane outside of triangle\"},{\"args\":[[\"vec3.fromValues\",[0.3,0.3,0]],[\"vec3.fromValues\",[0,0,-1]],[\"vec3.fromValues\",[0,0,1]],[\"vec3.fromValues\",[1,0,1]],[\"vec3.fromValues\",[0,1,1]]],\"ans\":[\"evalArgs\",[[]]],\"comments\":\"Ray wrong way\"},{\"args\":[[\"vec3.fromValues\",[0.3,0.3,0]],[\"vec3.fromValues\",[1,1,0]],[\"vec3.fromValues\",[0,0,1]],[\"vec3.fromValues\",[1,0,1]],[\"vec3.fromValues\",[0,1,1]]],\"ans\":[\"evalArgs\",[[]]],\"comments\":\"Corner case: Ray parallel to plane\"},{\"args\":[[\"vec3.fromValues\",[1,1,0]],[\"vec3.fromValues\",[-2,-2,-1]],[\"vec3.fromValues\",[-48,-4,-21]],[\"vec3.fromValues\",[-33,-33,5]],[\"vec3.fromValues\",[49,-18,-31]]],\"ans\":[\"evalArgs\",[[[\"vec3.fromValues\",[-20.62485122680664,-20.62485122680664,-10.81242561340332]]]]]},{\"args\":[[\"vec3.fromValues\",[-2,2,1]],[\"vec3.fromValues\",[-2,-1,-1]],[\"vec3.fromValues\",[-24,-23,45]],[\"vec3.fromValues\",[-30,-5,-47]],[\"vec3.fromValues\",[-48,4,34]]],\"ans\":[\"evalArgs\",[[[\"vec3.fromValues\",[-28.335052490234375,-11.167526245117188,-12.167526245117188]]]]]},{\"args\":[[\"vec3.fromValues\",[-1,2,-2]],[\"vec3.fromValues\",[2,1,2]],[\"vec3.fromValues\",[-24,-17,-5]],[\"vec3.fromValues\",[21,6,-28]],[\"vec3.fromValues\",[15,16,45]]],\"ans\":[\"evalArgs\",[[[\"vec3.fromValues\",[14.291824340820312,9.645912170410156,13.291824340820312]]]]]},{\"args\":[[\"vec3.fromValues\",[-2,2,2]],[\"vec3.fromValues\",[1,-1,1]],[\"vec3.fromValues\",[15,45,7]],[\"vec3.fromValues\",[23,-28,22]],[\"vec3.fromValues\",[-34,-47,18]]],\"ans\":[\"evalArgs\",[[[\"vec3.fromValues\",[14.184346199035645,-14.184346199035645,18.184345245361328]]]]]},{\"args\":[[\"vec3.fromValues\",[1,2,1]],[\"vec3.fromValues\",[1,-1,1]],[\"vec3.fromValues\",[-14,38,-22]],[\"vec3.fromValues\",[13,-40,-34]],[\"vec3.fromValues\",[35,-46,46]]],\"ans\":[\"evalArgs\",[[[\"vec3.fromValues\",[13.136246681213379,-10.136246681213379,13.136246681213379]]]]]},{\"args\":[[\"vec3.fromValues\",[-2,-2,0]],[\"vec3.fromValues\",[1,2,-2]],[\"vec3.fromValues\",[50,-41,2]],[\"vec3.fromValues\",[0,40,-42]],[\"vec3.fromValues\",[16,18,17]]],\"ans\":[\"evalArgs\",[[[\"vec3.fromValues\",[10.672340393066406,23.344680786132812,-25.344680786132812]]]]]},{\"args\":[[\"vec3.fromValues\",[-2,0,-1]],[\"vec3.fromValues\",[-2,1,0]],[\"vec3.fromValues\",[-22,6,-47]],[\"vec3.fromValues\",[28,19,44]],[\"vec3.fromValues\",[12,-45,-24]]],\"ans\":[\"evalArgs\",[[]]]},{\"args\":[[\"vec3.fromValues\",[-1,0,-1]],[\"vec3.fromValues\",[-2,0,-1]],[\"vec3.fromValues\",[17,23,25]],[\"vec3.fromValues\",[-36,13,-20]],[\"vec3.fromValues\",[1,14,40]]],\"ans\":[\"evalArgs\",[[]]]},{\"args\":[[\"vec3.fromValues\",[1,-1,2]],[\"vec3.fromValues\",[-1,1,-1]],[\"vec3.fromValues\",[-19,21,-31]],[\"vec3.fromValues\",[50,41,35]],[\"vec3.fromValues\",[-18,8,-36]]],\"ans\":[\"evalArgs\",[[]]]},{\"args\":[[\"vec3.fromValues\",[0,-2,-1]],[\"vec3.fromValues\",[2,-1,0]],[\"vec3.fromValues\",[10,-13,-6]],[\"vec3.fromValues\",[19,-31,41]],[\"vec3.fromValues\",[-47,-43,20]]],\"ans\":[\"evalArgs\",[[]]]},{\"args\":[[\"vec3.fromValues\",[-2,-2,2]],[\"vec3.fromValues\",[0,2,-2]],[\"vec3.fromValues\",[-5,25,39]],[\"vec3.fromValues\",[1,26,31]],[\"vec3.fromValues\",[-35,-20,13]]],\"ans\":[\"evalArgs\",[[]]]}]}]";

tests = JSON.parse(tests);