<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recebi sua mensagem 🥰</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333333;
            margin: 0;
            padding: 0;
            background: linear-gradient(180deg, rgba(17, 20, 24, 1) 7%, rgba(173, 0, 255, 1) 100%);
            background-repeat: no-repeat;
            background-attachment: fixed;
            min-height: 100vh;
        }
        p {
            color: #fff;
        }
        .container {
            color: #fff;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #181030;
            border-radius: 5px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 1px solid #eeeeee;
        }
        .logo {
            margin-bottom: 15px;
            max-width: 150px;
            height: auto;
        }
        .content {
            padding: 20px 0;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            color: #777777;
            border-top: 1px solid #eeeeee;
            padding-top: 20px;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #3490dc;
            color: #ffffff;
            text-decoration: none;
            border-radius: 4px;
            margin-top: 15px;
        }
    </style>
</head>
<body>
<div class="container">
    <div class="header">
        <h1>{{  $subjectR  }}</h1>
    </div>

    <div class="content">
        <p>Olá {{ $name }},</p>

        <p>{{ $emailMessage }}</p>

        <div style="text-align: center;">
            <a href="https://www.gabrielmullerdev.com.br/" class="button">Visite nosso site</a>
        </div>
    </div>

    <div class="footer">
        <p>&copy; {{ date('Y') }} {{ 'Gabriel Muller Dev' }}. Todos os direitos reservados.</p>
    </div>
</div>
</body>
</html>
