// tell chrome to listen for a keypress
document.addEventListener( "keydown", key_press, false );

var bindings = {
    "R": function () { location.reload() }
};

function key_press( e ) {
    var key = get_key( e );
    var command = bindings[ key ];

    if ( command ) {
        console.log( "hit" );

        command();

        // nothing else, thanks
        e.preventDefault();
    }
}

function get_key( e ) {
    var key = e.keyIdentifier,

    // emacs style key identifiers
    ctrl = e.ctrlKey                 ? 'C-' : '',
    meta = ( e.metaKey || e.altKey ) ? 'M-' : '',
    shift = e.shiftKey               ? 'S-' : '';

    return ctrl + meta + String.fromCharCode( e.keyCode );
}
