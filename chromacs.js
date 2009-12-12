// tell chrome to listen for a keypress
window.addEventListener( "keydown", key_press, true );

var body_bindings = {
    // basic history navigation
    "r": function () { location.reload() },
    "B": function () { history.back()    },
    "F": function () { history.forward() },

    // page navigation
    "C-n": function () { scrollBy( 0, 30 )  },
    "C-p": function () { scrollBy( 0, -30 ) },

    "n": function () { scrollBy( 0, 30 )  },
    "p": function () { scrollBy( 0, -30 ) },
};

var text_area_bindings = { };

// this variable will contain either an object or a function which
// allow chromacs to determine what to do with the current keypress.
var current_binding;

// behaviour obviously affected by input type
function get_current_binding( target_type ) {
    return ( target_type == "input"
             || target_type == "textarea" )
        ? text_area_bindings
        : body_bindings;
}

function key_press( e ) {
    var key         = get_key( e ),
        target_type = e.target.tagName.toLowerCase();

    if ( ! current_binding ) {
        current_binding = get_current_binding( target_type );
    }

    // action we're going to take with the current binding
    var command = current_binding[ key ];

    switch ( typeof command ) {
    case "function":
        command();

        // reset any chaing we have going on
        current_binding = null;
        e.preventDefault();

        break;

    case "object":
        // set the current binding to that of the chain
        current_binding = command;
        e.preventDefault();

        break;

    default:
        // abort
        current_binding = null;

        break;
    }
}

function get_key( e ) {
    var key   = String.fromCharCode( e.keyCode ),
        ctrl  = e.ctrlKey                 ? "C-" : "",
        meta  = ( e.metaKey || e.altKey ) ? "M-" : "",
        shift = e.shiftKey                ? "S-" : "";

    return ctrl + meta + ( shift ? key : key.toLowerCase() );
}
