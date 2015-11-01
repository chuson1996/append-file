#Append file

A node module to easily insert content from a file to another. Check out the example below.

##Install:

NPM: `npm install -g append-file`



---

```
<!-- sou.css -->
body{
    background-color:#fff;
}
h1{
    font-size:30px;
}

<!-- script.js -->
alert('hello');
alert('hello again');

<!-- dest.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
    <style>
        /*<sou.css>*/
        /*</sou.css>*/
    </style>
</head>
<body>
    <script>
        /*<script.js>*/
        /*</script.js>*/
    </script>
</body>
</html>
```

**Now remember to always put source file(s) in the same directory of the destination file.** Execute this command to append sou.css and script.js to dest.html
 
`append-file dest.html`

Result:

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
    <style>
        /*<sou.css>*/
        body{
            background-color:#fff;
        }
        h1{
            font-size:30px;
        }
        /*</sou.css>*/
    </style>
</head>
<body>
    <script>
        /*<script.js>*/
        alert('hello');
        alert('hello again');
        /*</script.js>*/
    </script>
</body>
</html>
```

 
