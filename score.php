<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta http-equiv="Content-Type" content="text/html"  charset="utf-8">
    <title>Document</title>
    <link href="css/style.css" rel="stylesheet">
</head>
<body>
    <?php
        require 'database.php';

        $name = $_POST["name"];     
        $score = $_POST["score"];
        if($score != ""){
            $sql = "INSERT INTO finalproject (`name`,`score`)
            VALUES ('".$name."','".$score."')  ";
            mysqli_query($database,$sql);
        }
        
        
        $query = "SELECT * FROM `finalproject` ORDER BY `score` DESC";
        $result = mysqli_query($database,$query);
        
        mysqli_close($database);
        $number = 1;
        print ("<table style='margin-left:auto; 
        margin-right:auto;'>");
        print("<tr><td>rank</td>");
        print("<td>name</td>");
        print("<td>score</td></tr>");
        while($row = mysqli_fetch_row($result))
        {
            print( "<tr>" );
            print( "<td>$number.&nbsp&nbsp&nbsp&nbsp</td>" );
            foreach ( $row as $value )
              print( "<td>$value</td>" );
            print( "</tr>" );
            if($number > 9)
                break;
            $number++;
        }
        print ("</table>");
    ?>
</body>
</html>

