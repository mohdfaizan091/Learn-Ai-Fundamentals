# One Shot & Few Shot

A one shot prompt includes exactly one worked example; a few shot prompt provides several (typically 3-8) examples. Both rely on the model's in-context learning to imitate the demonstrated input to output mapping. Because the demonstrations live in the prompt, you get the benefits of "training" without fine-tuning: you can swap tasks or tweak formats instantly by editing examples.

---

## Prompt

### Example 1

**Ticket:**
```
Support Ticket ##

Ticket ID: TSK-2024-00122
Customer Name: John Smith
Customer Email: john.smith@example.com
Customer ID: CUST-45678
Date Submitted: 2024-03-14 09:15 AM UTC
Product/Service: SuperWidget Pro
Subject: Billing cycle error - double charged

Issue Description:
I was charged twice for my monthly subscription on March 10th. The first charge is $29.99 and then there's another identical charge of $29.99 on the same day. I've never had this happen before. Please refund the duplicate charge. My subscription ID is SUB-9876.
```

**Output:**
```json
{
  "ticket_id": "TSK-2024-00122",
  "customer_info": {
    "name": "John Smith",
    "email": "john.smith@example.com",
    "customer_id": "CUST-45678"
  },
  "submission_details": {
    "date_submitted": "2024-03-14 09:15 AM UTC",
    "product_service": "SuperWidget Pro",
    "subject": "Billing cycle error - double charged"
  },
  "issue_analysis": {
    "summary": "Customer was double-charged $29.99 for their monthly subscription on March 10th.",
    "category": "Billing Issue",
    "sub_category": "Double Charge",
    "urgency": "Medium",
    "subscription_id": "SUB-9876"
  },
  "suggested_resolution": {
    "next_step_internal": "Verify the duplicate charge and process refund.",
    "draft_response_to_customer": "Dear John, I'm sorry to hear about the duplicate charge for your SuperWidget Pro subscription. I've verified the issue and have initiated a refund of $29.99 to your original payment method. This should appear in your account within 3-5 business days. Please let me know if you have any other questions."
  }
}
```

### Example 2

**Ticket:**
```
Support Ticket ##

Ticket ID: TSK-2024-00115
Customer Name: Sarah Johnson
Customer Email: sarah.j@example.com
Customer ID: CUST-33456
Date Submitted: 2024-03-12 14:22 PM UTC
Product/Service: SuperWidget Lite
Subject: Feature request - dark mode

Issue Description:
I love using SuperWidget Lite but it's hard on my eyes when working late. Could you please add a dark mode option? Most apps I use have this feature now. Not urgent but would really improve my experience! Thanks for considering.
```

**Output:**
```json
{
  "ticket_id": "TSK-2024-00115",
  "customer_info": {
    "name": "Sarah Johnson",
    "email": "sarah.j@example.com",
    "customer_id": "CUST-33456"
  },
  "submission_details": {
    "date_submitted": "2024-03-12 14:22 PM UTC",
    "product_service": "SuperWidget Lite",
    "subject": "Feature request - dark mode"
  },
  "issue_analysis": {
    "summary": "Customer requests adding dark mode to SuperWidget Lite to reduce eye strain when working late.",
    "category": "Feature Request",
    "sub_category": "UI Enhancement",
    "urgency": "Low"
  },
  "suggested_resolution": {
    "next_step_internal": "Add to product feature request backlog for consideration in upcoming sprint planning.",
    "draft_response_to_customer": "Dear Sarah, thank you for your suggestion about adding dark mode to SuperWidget Lite. I've forwarded your request to our product team for consideration in our future updates. We appreciate your feedback as it helps us improve our product. I'll make a note in your account so we can notify you if this feature becomes available."
  }
}
```

### Task

Using the format from the examples, analyze the following ticket:

**Ticket:**
```
Support Ticket ##

Ticket ID: TSK-2024-00123
Customer Name: Jane Doe
Customer Email: jane.doe@example.com
Customer ID: CUST-78910
Date Submitted: 2024-03-15 10:30 AM UTC
Product/Service: SuperWidget Pro
Subject: Cannot log in to my account

Issue Description:
I've been trying to log into my SuperWidget Pro account for the past 3 hours with no success. I keep getting an "Authentication Error (Code: 503)" message. I tried resetting my password, but I'm not receiving the reset email. I need urgent access to my project files for a client meeting this afternoon. My username is janedoe_widgets.
```

---

## Why This Works

Few shot prompting works effectively for detailed support ticket analysis because:

1. The examples provide a precise template for the expected JSON structure, including all required fields and formatting.
2. The examples demonstrate proper categorization and sub-categorization according to ticket content.
3. The model learns how to extract implicit information (like usernames mentioned in the text) by seeing it done in examples.
4. The urgency assessment criteria (with three different urgency levels across examples) helps calibrate the model's understanding of priority.
5. Response drafting follows the tone and format demonstrated in the examples, maintaining consistency with company standards.