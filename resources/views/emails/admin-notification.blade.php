<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #f97316; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .footer { padding: 20px; text-align: center; color: #666; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>SD Negeri Jinggotan</h2>
        </div>
        <div class="content">
            <p>Halo,</p>
            <p>{{ $message }}</p>
            <p><strong>- {{ $senderName }}</strong></p>
        </div>
        <div class="footer">
            <p>Email ini dikirim secara otomatis dari sistem SD Negeri Jinggotan.</p>
        </div>
    </div>
</body>
</html>
