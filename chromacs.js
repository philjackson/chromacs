// tell chrome to listen for a keypress
document.addEventListener( "keydown", key_press, false );

function key_press( e ) {
    var key = get_key( e );

    console.log( e );
    if ( e.which != 0 && e.charCode != 0 ) {
        console.log( String.fromCharCode( e.keyCode ) );
    }
}

function get_key( e ) {
    var key = e.keyIdentifier,

    // emacs style key identifiers
    ctrl = e.ctrlKey                 ? 'C-' : '',
    meta = ( e.metaKey || e.altKey ) ? 'M-' : '',
    shift = e.shiftKey               ? 'S-' : '';

    return ctrl + meta + key;
}
