<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Form Submission</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background-color: #f4f4f4;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .header {
            background-color: #195f1f;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 10px 10px 0 0;
            margin: -30px -30px 30px -30px;
        }

        .field {
            margin-bottom: 15px;
            padding-bottom: 15px;
            border-bottom: 1px solid #eee;
        }

        .field:last-child {
            border-bottom: none;
        }

        .label {
            font-weight: bold;
            color: #333;
            margin-bottom: 5px;
        }

        .value {
            color: #666;
        }

        .message-content {
            background-color: #f9f9f9;
            padding: 15px;
            border-radius: 5px;
            border-left: 4px solid #195f1f;
        }

        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            text-align: center;
            color: #888;
            font-size: 12px;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h1>Contact Form Submission</h1>
            <p>Bank of Azad Jammu & Kashmir</p>
        </div>

        <div class="field">
            <div class="label">Name:</div>
            <div class="value">{{ $submission->name }}</div>
        </div>

        <div class="field">
            <div class="label">Email:</div>
            <div class="value">{{ $submission->email }}</div>
        </div>

        @if($submission->phone)
            <div class="field">
                <div class="label">Phone Number:</div>
                <div class="value">{{ $submission->phone }}</div>
            </div>
        @endif

        @if($submission->district)
            <div class="field">
                <div class="label">District:</div>
                <div class="value">{{ $submission->district }}</div>
            </div>
        @endif

        @if($submission->tehsil)
            <div class="field">
                <div class="label">Tehsil:</div>
                <div class="value">{{ $submission->tehsil }}</div>
            </div>
        @endif

        @if($submission->place)
            <div class="field">
                <div class="label">Place:</div>
                <div class="value">{{ $submission->place }}</div>
            </div>
        @endif

        @if($submission->category)
            <div class="field">
                <div class="label">Category:</div>
                <div class="value">{{ $submission->category }}</div>
            </div>
        @endif

        <div class="field">
            <div class="label">Subject:</div>
            <div class="value">{{ $submission->subject }}</div>
        </div>

        <div class="field">
            <div class="label">Message:</div>
            <div class="message-content">{{ $submission->message }}</div>
        </div>

        <div class="field">
            <div class="label">Submitted At:</div>
            <div class="value">{{ $submission->submitted_at->format('F j, Y g:i A') }}</div>
        </div>

        <div class="field">
            <div class="label">IP Address:</div>
            <div class="value">{{ $submission->ip_address }}</div>
        </div>

        <div class="footer">
            <p>This email was generated automatically from the contact form on the Bank of Azad Jammu & Kashmir website.
            </p>
        </div>
    </div>
</body>

</html>