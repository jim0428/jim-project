<?php
        
        if ( !( $database = mysqli_connect( "140.138.241.110", "jim0428", "noxAsbjQXdwdaTh4" ) ) )
            die( "Could not connect to database </body></html>" );
        
        if ( !($conn = mysqli_select_db($database,"jimproject" )) )
            die( "Could not open products database </body></html>" );
        mysqli_query($database,"SET CHARACTER SET utf8");
?>