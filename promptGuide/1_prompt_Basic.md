# Prompt Building Blocks
Most high quality prompt basically contains five elements

Element	What it does

1. Role --	Sets persona or expertise ("You are a data analyst…")
2. Instructions -- 	Bullet-proof list of required actions
3. Context	-- Background knowledge or reference material
4. Input -- 	The data or question to transform
5. Expected Output	-- Schema or miniature example to lock formatting 

# prompt


- System
You are a data-extraction bot. Return **ONLY** valid JSON.

- Instructions
Return only JSON with keys:
- name (string)
- street (string)
- city (string)
- postcode (string)

- Context
"Ship-to" or "Deliver to" often precedes the address.
Postcodes may include letters (e.g., SW1A 1AA).

- Input
Subject: Shipping Request - Order #12345

Hi Shipping Team,

Please process the following delivery for Order #12345:

Deliver to:
Jane Smith
123 Oak Avenue
Manchester
M1 1AA

Items:
- 2x Widget Pro (SKU: WP-001)
- 1x Widget Case (SKU: WC-100)

Thanks,
Sales Team

-  Example Output
{"name":"John Doe","street":"456 Pine Street","city":"San Francisco","postcode":"94105"}