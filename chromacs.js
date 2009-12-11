// tell chrome to listen for a keypress
document.addEventListener( "keydown", key_press, false );

var body_bindings = {
    // basic history navigation
    "r": function () { location.reload() },
    "B": function () { history.back()    },
    "F": function () { history.forward() },

    // page navigation
    "n": function () { scrollBy( 0, 30 )  },
    "p": function () { scrollBy( 0, -30 ) },

    "C-x": {
        "C-f": function () { alert( "chained!" ) }
    }
};

var text_area_bindings = { };

var current_binding,
    current_prefix  = null;

function key_press( e ) {
    var key         = get_key( e ),
        target_type = e.target.tagName.toLowerCase();

    // behaviour obviously affected by input type
    current_binding = ( target_type == 'input' || target_type == 'textarea' )
        ? text_area_bindings
        : body_bindings;

    // action we're going to take with the current binding
    var command = current_binding[ key ];

    if ( command ) {
        switch ( typeof command ) {
        case "function":
            // reset the key-chain
            current_binding = body_bindings;

            // run the function
            command();

            break;
        case "object":
            // set the current binding to that of the chain
            current_binding = command;

            break;
        }

        e.preventDefault();
    }
}

function get_key( e ) {
    var key   = String.fromCharCode( e.keyCode ),
        ctrl  = e.ctrlKey                 ? 'C-' : '',
        meta  = ( e.metaKey || e.altKey ) ? 'M-' : '',
        shift = e.shiftKey                ? 'S-' : '';

    return ctrl + meta + ( shift ? key : key.toLowerCase() );
}
