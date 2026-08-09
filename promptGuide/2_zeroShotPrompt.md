# Zero Shot

Zero shot prompting tells a large-language model exactly what you want without supplying a single demonstration. The model leans on the general-purpose knowledge it absorbed during pre-training to infer the right output. You provide instructions but no examples, allowing the model to apply its existing understanding to the task.

---

## Prompt

```
Analyze the following customer support ticket and provide a JSON output containing:
- A brief 'summary' of the issue.
- The 'category' of the issue (e.g., Technical, Billing, Inquiry).
- The 'urgency' level (Low, Medium, High).
- A 'suggested_next_action' for the support team.

Ticket:
- Support Ticket ##

Ticket ID: TSK-2024-00123
Customer Name: Jane Doe
Customer Email: jane.doe@example.com
Customer ID: CUST-78910
Date Submitted: 2025-05-19 10:30 AM UTC
Product/Service: SuperWidget Pro
Subject: Cannot log in to my account

Issue Description:
I've been trying to log into my SuperWidget Pro account for the past 3 hours with no success. I keep getting an "Authentication Error (Code: 503)" message. I tried resetting my password, but I'm not receiving the reset email. I need urgent access to my project files for a client meeting this afternoon. My username is janedoe_widgets.
```

---

## Why This Works

Zero shot prompting works effectively for this basic ticket analysis because:

1. The task involves common support concepts (categorization, urgency assessment) that models have encountered frequently in training data.
2. The instruction clearly states the expected output format and fields.
3. The customer's issue is described in straightforward terms with explicit mentions of errors and impact.
4. No specialized domain knowledge is required for this initial assessment.