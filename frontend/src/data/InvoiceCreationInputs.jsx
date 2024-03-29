export const inputs = [
  {
    id: 1,
    name: "issueDate",
    type: "date",
    placeholder: "Issue Date",
    label: "Issue Date",
    required: true,
  },
  // {
  //   id: 2,
  //   name: "invoiceTypeCode",
  //   type: "text",
  //   placeholder: "Invoice Type Code",
  //   label: "Invoice Type Code",
  //   required: true,
  //   options: [
  //     {
  //       id: 15,
  //       name: "Standard Invoice",
  //       type: "text",
  //     },
  //     {
  //       id: 16,
  //       name: "Commercial Invoice",
  //       type: "text",
  //     },
  //   ]
  // },
  {
    id: 3,
    heading: 'Party Details',
    name: "company",
    type: "text",
    placeholder: "EGG-Invoices Ltd",
    label: "Company Name",
  },
  {
    id: 4,
    name: "country",
    type: "text",
    placeholder: "AU",
    label: "Country",
  },
  {
    id: 5,
    name: "phone",
    type: "text",
    placeholder: "+61 412 345 678",
    label: "Mobile",
  },
  {
    id: 6,
    name: "email",
    type: "text",
    placeholder: "plain.jane@example.com",
    label: "Email",
  },
  {
    id: 7,
    heading: 'Tax Information',
    name: "taxSchemeId",
    type: "text",
    placeholder: "GST",
    label: "Tax Scheme ID",
    required: true
  },
  {
    id: 8,
    heading: 'Legal Entity',
    name: "legalName",
    type: "text",
    placeholder: "Legal Corporation Ltd",
    label: "Registration Name",
    required: true
  },
  {
    id: 9,
    name: "legalId",
    type: "text",
    placeholder: "AB123456C",
    label: "Legal Entity Company ID",
    required: true
  },
  {
    id: 10,
    heading: 'Monetary Totals',
    name: "taxExclusiveAmount",
    type: "text",
    placeholder: "5000",
    label: "Tax Exclusive Amount",
    required: true
  },
  {
    id: 11,
    name: "MonetaryCurrency",
    type: "text",
    placeholder: "AUD",
    label: "Currency",
    required: true
  },
  {
    id: 12,
    heading: 'Invoice Line Items',
    name: "numItems",
    type: "text",
    placeholder: "4",
    label: "Number of Items",
    required: true
  },
  {
    id: 13,
    heading: 'Tax Total',
    name: "taxAmount",
    type: "text",
    placeholder: "500",
    label: "Tax Amount",
    required: true
  },
  {
    id: 14,
    name: "taxCurrency",
    type: "text",
    placeholder: "AUD",
    label: "Tax Currency Id",
    required: true
  },
];