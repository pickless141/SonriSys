export const resetPasswordTemplate = (nombre, resetCode) => {
    return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Recuperación de Contraseña</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                padding: 20px;
            }
            .container {
                max-width: 600px;
                background: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                margin: auto;
                text-align: center;
            }
            .header {
                text-align: center;
                color: #007bff;
                font-size: 24px;
                font-weight: bold;
            }
            .message {
                font-size: 16px;
                color: #333333;
                line-height: 1.5;
                text-align: center;
            }
            .code-container {
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 20px auto;
            }
            .code {
                font-size: 28px;
                font-weight: bold;
                color: #007bff;
                background: #e9ecef;
                padding: 15px 30px;
                border-radius: 5px;
                display: inline-block;
            }
            .footer {
                text-align: center;
                font-size: 14px;
                color: #666666;
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">Recuperación de Contraseña</div>
            <p class="message">Hola <strong>${nombre}</strong>,</p>
            <p class="message">Hemos recibido una solicitud para restablecer tu contraseña.</p>
            <p class="message">Tu código de recuperación es:</p>
            <div class="code-container">
                <p class="code">${resetCode}</p>
            </div>
            <p class="message">Este código es válido por <strong>15 minutos</strong>.</p>
            <p class="footer">Si no solicitaste esto, ignora este correo.</p>
        </div>
    </body>
    </html>
    `;
};