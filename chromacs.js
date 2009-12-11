// tell chrome to listen for a keypress
document.addEventListener( "keydown", key_press, false );

var chromacs_bindings = {
    "r": function () { location.reload() },
    "B": function () { history.back()    },
    "F": function () { history.forward() },
    "C-x": {
        "C-f": function () { alert( "chained!" ) }
    }
};

var current_binding = chromacs_bindings;

function key_press( e ) {
    var key = get_key( e ),
    command = current_binding[ key ];

    console.log( key );

    if ( command ) {
        console.log( typeof command );

        switch ( typeof command ) {
        case "function":
            // reset the key-chain
            current_binding = chromacs_bindings;

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
    var key = key   = String.fromCharCode( e.keyCode ),

    // try and make the identifiers as emacs-like as possible
    ctrl  = e.ctrlKey                 ? 'C-' : '',
    meta  = ( e.metaKey || e.altKey ) ? 'M-' : '',
    shift = e.shiftKey                ? 'S-' : '';

    return ctrl + meta + ( shift ? key : key.toLowerCase() );
}
