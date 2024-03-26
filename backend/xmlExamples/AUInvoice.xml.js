const xml1 = `<?xml version="1.0" encoding="UTF-8"?>
<Invoice xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2"
    xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2"
    xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2">
    <cbc:CustomizationID>urn:cen.eu:en16931:2017#conformant#urn:fdc:peppol.eu:2017:poacc:billing:international:aunz:3.0</cbc:CustomizationID>
    <cbc:ProfileID>urn:fdc:peppol.eu:2017:poacc:billing:01:1.0</cbc:ProfileID>
    <cbc:ID>Invoice01</cbc:ID>
    <cbc:IssueDate>2019-07-29</cbc:IssueDate>
    <cbc:DueDate>2019-08-30</cbc:DueDate>
    <cbc:InvoiceTypeCode>380</cbc:InvoiceTypeCode>
    <cbc:Note>Tax invoice</cbc:Note>
    <cbc:DocumentCurrencyCode>AUD</cbc:DocumentCurrencyCode>
    <cbc:AccountingCost>4025:123:4343</cbc:AccountingCost>
    <cbc:BuyerReference>0150abc</cbc:BuyerReference>
    <cac:InvoicePeriod>
       <cbc:StartDate>2019-06-01</cbc:StartDate>
       <cbc:EndDate>2019-07-30</cbc:EndDate>
    </cac:InvoicePeriod>
    <cac:OrderReference>
       <cbc:ID>PurchaseOrderReference</cbc:ID>
       <cbc:SalesOrderID>12345678</cbc:SalesOrderID>
    </cac:OrderReference>
    <cac:BillingReference>
       <cac:InvoiceDocumentReference>
           <cbc:ID>PrecedingInvoiceReference</cbc:ID>
           <cbc:IssueDate>2019-05-30</cbc:IssueDate>
       </cac:InvoiceDocumentReference>
    </cac:BillingReference>
    <cac:DespatchDocumentReference>
       <cbc:ID>DDR-REF</cbc:ID>
    </cac:DespatchDocumentReference>
    <cac:ReceiptDocumentReference>
       <cbc:ID>RD-REF</cbc:ID>
    </cac:ReceiptDocumentReference>
    <cac:OriginatorDocumentReference>
       <cbc:ID>OD-REF</cbc:ID>
    </cac:OriginatorDocumentReference>
    <cac:ContractDocumentReference>
       <cbc:ID>CD-REF</cbc:ID>
    </cac:ContractDocumentReference>
    <cac:AccountingSupplierParty>
        <cac:Party>
            <cbc:EndpointID schemeID="0151">47555222000</cbc:EndpointID>
            <cac:PartyIdentification>
                <cbc:ID>47555222000</cbc:ID>
            </cac:PartyIdentification>
            <cac:PartyName>
                <cbc:Name>Supplier Trading Name Ltd</cbc:Name>
            </cac:PartyName>
            <cac:PostalAddress>
                <cbc:StreetName>Main street 1</cbc:StreetName>
                <cbc:AdditionalStreetName>Postbox 123</cbc:AdditionalStreetName>
                <cbc:CityName>Harrison</cbc:CityName>
                <cbc:PostalZone>2912</cbc:PostalZone>
                <cac:Country>
                    <cbc:IdentificationCode>AU</cbc:IdentificationCode>
                </cac:Country>
            </cac:PostalAddress>
            <cac:PartyTaxScheme>
                <cbc:CompanyID>47555222000</cbc:CompanyID>
                <cac:TaxScheme>
                    <cbc:ID>GST</cbc:ID>
                </cac:TaxScheme>
            </cac:PartyTaxScheme>
            <cac:PartyLegalEntity>
                <cbc:RegistrationName>Supplier Official Name Ltd</cbc:RegistrationName>
                <cbc:CompanyID  schemeID="0151">47555222000</cbc:CompanyID>
                <cbc:CompanyLegalForm>Partnership</cbc:CompanyLegalForm>
            </cac:PartyLegalEntity>

            <cac:Contact>
                <cbc:Name>Ronald MacDonald</cbc:Name>
                <cbc:Telephone>Mobile 0430123456</cbc:Telephone>
                <cbc:ElectronicMail>ronald.macdonald@qualitygoods.com.au</cbc:ElectronicMail>
            </cac:Contact>
        </cac:Party>
    </cac:AccountingSupplierParty>

    <cac:AccountingCustomerParty>
        <cac:Party>
            <cbc:EndpointID schemeID="0151">91888222000</cbc:EndpointID>
            <cac:PartyIdentification>
                <cbc:ID schemeID="0151">91888222000</cbc:ID>
            </cac:PartyIdentification>
            <cac:PartyName>
                <cbc:Name>Trotters Trading Co Ltd</cbc:Name>
            </cac:PartyName>
            <cac:PostalAddress>
                <cbc:StreetName>100 Queen Street</cbc:StreetName>
                <cbc:AdditionalStreetName>Po box 878</cbc:AdditionalStreetName>
                <cbc:CityName>Sydney</cbc:CityName>
                <cbc:PostalZone>2000</cbc:PostalZone>
                <cac:Country>
                    <cbc:IdentificationCode>AU</cbc:IdentificationCode>
                </cac:Country>
            </cac:PostalAddress>
            <cac:PartyTaxScheme>
                <cbc:CompanyID>91888222000</cbc:CompanyID>
                <cac:TaxScheme>
                    <cbc:ID>GST</cbc:ID>
                </cac:TaxScheme>
            </cac:PartyTaxScheme>
            <cac:PartyLegalEntity>
                <cbc:RegistrationName>Buyer Official Name</cbc:RegistrationName>
                <cbc:CompanyID schemeID="0151">91888222000</cbc:CompanyID>
            </cac:PartyLegalEntity>
            <cac:Contact>
                <cbc:Name>Lisa Johnson</cbc:Name>
                <cbc:Telephone>0261234567</cbc:Telephone>
                <cbc:ElectronicMail>lj@buyer.com.au</cbc:ElectronicMail>
            </cac:Contact>
        </cac:Party>
    </cac:AccountingCustomerParty>

    <cac:PayeeParty>
       <cac:PartyIdentification>
           <cbc:ID>91888222000</cbc:ID>
       </cac:PartyIdentification>
       <cac:PartyName>
           <cbc:Name>Mr Anderson</cbc:Name>
       </cac:PartyName>

       <cac:PartyLegalEntity>
           <cbc:CompanyID schemeID="0151">91888222000</cbc:CompanyID>
       </cac:PartyLegalEntity>    
    </cac:PayeeParty>

    <cac:TaxRepresentativeParty>
       <cac:PartyName>
           <cbc:Name>Mr Wilson</cbc:Name>
       </cac:PartyName>
       <cac:PostalAddress>
           <cbc:StreetName>16 Stout Street</cbc:StreetName>
           <cbc:AdditionalStreetName>Po box 878</cbc:AdditionalStreetName>
           <cbc:CityName>Sydney</cbc:CityName>
           <cbc:PostalZone>2000</cbc:PostalZone>
           <cbc:CountrySubentity>NSW</cbc:CountrySubentity>
           <cac:AddressLine>
               <cbc:Line>Unit 1</cbc:Line>
           </cac:AddressLine>
           <cac:Country>
                    <cbc:IdentificationCode>AU</cbc:IdentificationCode>
           </cac:Country>
      </cac:PostalAddress>
           <cac:PartyTaxScheme>
                <cbc:CompanyID>91888222000</cbc:CompanyID>
                <cac:TaxScheme>
                    <cbc:ID>GST</cbc:ID>
                </cac:TaxScheme>
            </cac:PartyTaxScheme> 
    </cac:TaxRepresentativeParty>


    <cac:Delivery>
        <cbc:ActualDeliveryDate>2019-07-01</cbc:ActualDeliveryDate>
        <cac:DeliveryLocation>
            <cbc:ID schemeID="0151">91888222000</cbc:ID>
            <cac:Address>
                <cbc:StreetName>Delivery street 2</cbc:StreetName>
                <cbc:AdditionalStreetName>Building 56</cbc:AdditionalStreetName>
                <cbc:CityName>Sydney</cbc:CityName>
                <cbc:PostalZone>2000</cbc:PostalZone>
                <cbc:CountrySubentity>NSW</cbc:CountrySubentity>
                <cac:AddressLine>
                    <cbc:Line>Unit 1</cbc:Line>
                </cac:AddressLine>
                <cac:Country>
                    <cbc:IdentificationCode>AU</cbc:IdentificationCode>
                </cac:Country>
            </cac:Address>
        </cac:DeliveryLocation>
        <cac:DeliveryParty>
            <cac:PartyName>
                <cbc:Name>Delivery party Name</cbc:Name>
            </cac:PartyName>
        </cac:DeliveryParty>
    </cac:Delivery>
    <cac:PaymentMeans>
        <cbc:PaymentMeansCode name="Credit transfer">30</cbc:PaymentMeansCode>
        <cbc:PaymentID>PaymentReferenceText</cbc:PaymentID>
        <cac:PayeeFinancialAccount>
            <cbc:ID>AccountNumber</cbc:ID>
            <cbc:Name>AccountName</cbc:Name>
            <cac:FinancialInstitutionBranch>
                <cbc:ID>BSB Number</cbc:ID>
            </cac:FinancialInstitutionBranch>
        </cac:PayeeFinancialAccount>  
    </cac:PaymentMeans>
    <cac:PaymentTerms>
        <cbc:Note>Payment within 30 days</cbc:Note>
    </cac:PaymentTerms>
    <cac:AllowanceCharge>
        <cbc:ChargeIndicator>true</cbc:ChargeIndicator>
        <cbc:AllowanceChargeReasonCode>SAA</cbc:AllowanceChargeReasonCode>
        <cbc:AllowanceChargeReason>Shipping and Handling</cbc:AllowanceChargeReason>
        <cbc:MultiplierFactorNumeric>0</cbc:MultiplierFactorNumeric>
        <cbc:Amount currencyID="AUD">0</cbc:Amount>
        <cbc:BaseAmount currencyID="AUD">0</cbc:BaseAmount>
        <cac:TaxCategory>
            <cbc:ID>S</cbc:ID>
            <cbc:Percent>10</cbc:Percent>
            <cac:TaxScheme>
                <cbc:ID>GST</cbc:ID>
            </cac:TaxScheme>
        </cac:TaxCategory>
    </cac:AllowanceCharge>


    <cac:TaxTotal>
        <cbc:TaxAmount currencyID="AUD">148.74</cbc:TaxAmount>
        <cac:TaxSubtotal>
            <cbc:TaxableAmount currencyID="AUD">1487.40</cbc:TaxableAmount>
            <cbc:TaxAmount currencyID="AUD">148.74</cbc:TaxAmount>
            <cac:TaxCategory>
                <cbc:ID>S</cbc:ID>
                <cbc:Percent>10</cbc:Percent>
                <cac:TaxScheme>
                    <cbc:ID>GST</cbc:ID>
                </cac:TaxScheme>
            </cac:TaxCategory>
        </cac:TaxSubtotal>
    </cac:TaxTotal>



    <cac:LegalMonetaryTotal>
        <cbc:LineExtensionAmount currencyID="AUD">1487.40</cbc:LineExtensionAmount>
        <cbc:TaxExclusiveAmount currencyID="AUD">1487.40</cbc:TaxExclusiveAmount>
        <cbc:TaxInclusiveAmount currencyID="AUD">1636.14</cbc:TaxInclusiveAmount>
        <cbc:ChargeTotalAmount currencyID="AUD">0.00</cbc:ChargeTotalAmount>
        <cbc:PrepaidAmount currencyID="AUD">0.00</cbc:PrepaidAmount>
        <cbc:PayableAmount currencyID="AUD">1636.14</cbc:PayableAmount>
    </cac:LegalMonetaryTotal>
 

    <cac:InvoiceLine>
       <cbc:ID>1</cbc:ID>
       <cbc:Note>Texts Giving More Info about the Invoice Line</cbc:Note>
       <cbc:InvoicedQuantity unitCode="E99">10</cbc:InvoicedQuantity>
       <cbc:LineExtensionAmount currencyID= "AUD">299.90</cbc:LineExtensionAmount>
           <cbc:AccountingCost>Consulting Fees</cbc:AccountingCost>
           <cac:InvoicePeriod>
           <cbc:StartDate>2019-06-01</cbc:StartDate> 
           <cbc:EndDate>2019-07-30</cbc:EndDate> 
       </cac:InvoicePeriod>
       <cac:OrderLineReference>
            <cbc:LineID>123</cbc:LineID>
       </cac:OrderLineReference>
       <cac:DocumentReference>
            <cbc:ID schemeID="HWB">9000074677</cbc:ID>
            <cbc:DocumentTypeCode>130</cbc:DocumentTypeCode> 
       </cac:DocumentReference>

    <cac:Item>
        <cbc:Description>Widgets True and Fair</cbc:Description>
           <cbc:Name>True-Widgets</cbc:Name>
           <cac:BuyersItemIdentification>
              <cbc:ID>W659590</cbc:ID>
           </cac:BuyersItemIdentification>
           <cac:SellersItemIdentification>
              <cbc:ID>WG546767</cbc:ID>
           </cac:SellersItemIdentification>
           <cac:StandardItemIdentification>
              <cbc:ID  schemeID="0002">WG546767</cbc:ID>
           </cac:StandardItemIdentification>
            <cac:OriginCountry>
                <cbc:IdentificationCode>AU</cbc:IdentificationCode>
            </cac:OriginCountry>
            <cac:CommodityClassification>
                <cbc:ItemClassificationCode listID="SRV">09348023</cbc:ItemClassificationCode>
            </cac:CommodityClassification>
            <cac:ClassifiedTaxCategory>
                <cbc:ID>S</cbc:ID>
                <cbc:Percent>10</cbc:Percent>
                <cac:TaxScheme>
                    <cbc:ID>GST</cbc:ID>
                </cac:TaxScheme>
            </cac:ClassifiedTaxCategory>
        </cac:Item>

       <cac:Price>
           <cbc:PriceAmount currencyID="AUD">29.99</cbc:PriceAmount>
           <cac:AllowanceCharge>
              <cbc:ChargeIndicator>false</cbc:ChargeIndicator>
              <cbc:Amount currencyID="AUD">0.00</cbc:Amount>
              <cbc:BaseAmount currencyID="AUD">29.99</cbc:BaseAmount>
           </cac:AllowanceCharge>
       </cac:Price>

    </cac:InvoiceLine>


   <cac:InvoiceLine>
      <cbc:ID>2</cbc:ID>
      <cbc:InvoicedQuantity unitCode="DAY">2</cbc:InvoicedQuantity>
      <cbc:LineExtensionAmount currencyID="AUD">1000</cbc:LineExtensionAmount>
      <cac:OrderLineReference>
          <cbc:LineID>123</cbc:LineID>
      </cac:OrderLineReference>
      <cac:Item>
          <cbc:Description>Description 2</cbc:Description>
          <cbc:Name>item name 2</cbc:Name>
          <cac:StandardItemIdentification>
              <cbc:ID schemeID="0151">21382183120983</cbc:ID>
          </cac:StandardItemIdentification>
          <cac:OriginCountry>
              <cbc:IdentificationCode>NO</cbc:IdentificationCode>
          </cac:OriginCountry>
          <cac:CommodityClassification>
              <cbc:ItemClassificationCode listID="SRV">09348023</cbc:ItemClassificationCode>
          </cac:CommodityClassification>
          <cac:ClassifiedTaxCategory>
              <cbc:ID>S</cbc:ID>
              <cbc:Percent>10</cbc:Percent>
              <cac:TaxScheme>
                  <cbc:ID>GST</cbc:ID>
              </cac:TaxScheme>
          </cac:ClassifiedTaxCategory>
      </cac:Item>
      <cac:Price>
          <cbc:PriceAmount currencyID="AUD">500</cbc:PriceAmount>
      </cac:Price>
   </cac:InvoiceLine>




<cac:InvoiceLine>
       <cbc:ID>3</cbc:ID>
       <cbc:Note>Invoice Line Description</cbc:Note>
       <cbc:InvoicedQuantity unitCode="M66">25</cbc:InvoicedQuantity>
       <cbc:LineExtensionAmount currencyID= "AUD">187.50</cbc:LineExtensionAmount>
           <cbc:AccountingCost>Consulting Fees</cbc:AccountingCost>
           <cac:InvoicePeriod>
           <cbc:StartDate>2019-06-01</cbc:StartDate> 
           <cbc:EndDate>2019-07-30</cbc:EndDate> 
       </cac:InvoicePeriod>
       <cac:OrderLineReference>
            <cbc:LineID>123</cbc:LineID>
       </cac:OrderLineReference>
       <cac:DocumentReference>
            <cbc:ID schemeID="HWB">9000074677</cbc:ID>
            <cbc:DocumentTypeCode>130</cbc:DocumentTypeCode> 
       </cac:DocumentReference>

    <cac:Item>
        <cbc:Description>Widgets True and Fair</cbc:Description>
           <cbc:Name>True-Widgets</cbc:Name>
           <cac:BuyersItemIdentification>
              <cbc:ID>W659590</cbc:ID>
           </cac:BuyersItemIdentification>
           <cac:SellersItemIdentification>
              <cbc:ID>WG546767</cbc:ID>
           </cac:SellersItemIdentification>
           <cac:StandardItemIdentification>
              <cbc:ID  schemeID="0151">WG546767</cbc:ID>
           </cac:StandardItemIdentification>
            <cac:OriginCountry>
                <cbc:IdentificationCode>AU</cbc:IdentificationCode>
            </cac:OriginCountry>
            <cac:CommodityClassification>
                <cbc:ItemClassificationCode listID="SRV">09348023</cbc:ItemClassificationCode>
            </cac:CommodityClassification>
            <cac:ClassifiedTaxCategory>
                <cbc:ID>S</cbc:ID>
                <cbc:Percent>10</cbc:Percent>
                <cac:TaxScheme>
                    <cbc:ID>GST</cbc:ID>
                </cac:TaxScheme>
            </cac:ClassifiedTaxCategory>
        </cac:Item>

       <cac:Price>
           <cbc:PriceAmount currencyID="AUD">7.50</cbc:PriceAmount>
           <cac:AllowanceCharge>
              <cbc:ChargeIndicator>false</cbc:ChargeIndicator>
              <cbc:Amount currencyID="AUD">0.00</cbc:Amount>
              <cbc:BaseAmount currencyID="AUD">7.50</cbc:BaseAmount>
           </cac:AllowanceCharge>
       </cac:Price>

    </cac:InvoiceLine>


</Invoice>`;

const xml2 = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Example of a simple invoice with 'mixed' taxable and non-taxable supplies including a non-taxable solar rebate (e.g. micro-business not registered for GST) -->
<Invoice xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2" xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2" xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2">
	<cbc:CustomizationID>urn:cen.eu:en16931:2017#conformant#urn:fdc:peppol.eu:2017:poacc:billing:international:aunz:3.0</cbc:CustomizationID>
	<cbc:ProfileID>urn:fdc:peppol.eu:2017:poacc:billing:01:1.0</cbc:ProfileID>
	<cbc:ID>Invoice01</cbc:ID>
	<cbc:IssueDate>2022-07-29</cbc:IssueDate>
	<cbc:DueDate>2022-08-30</cbc:DueDate>
	<cbc:InvoiceTypeCode>380</cbc:InvoiceTypeCode>
	<cbc:Note>Tax invoice. Please note you have $384.24 OVERDUE from prior bills.</cbc:Note> <!-- Free text field can bring attention to prior unpaid amount etc. -->
	<cbc:DocumentCurrencyCode>AUD</cbc:DocumentCurrencyCode>
	<cbc:BuyerReference>Simple solar plan</cbc:BuyerReference> <!-- Purchase Order and/or Buyer Reference MUST be provided -->
	<cac:InvoicePeriod>
		<!-- Period is optional at the invoice and line levels -->
		<cbc:StartDate>2022-06-15</cbc:StartDate>
		<cbc:EndDate>2022-07-15</cbc:EndDate>
	</cac:InvoicePeriod>
	<cac:AdditionalDocumentReference>
		<!-- Multiple attachments and external links may optionally be included -->
		<cbc:ID>Invoice01.pdf</cbc:ID>
		<cac:Attachment>
			<!-- For brevity, this sample Attachment is not representative of an embedded pdf -->
			<cbc:EmbeddedDocumentBinaryObject mimeCode="application/pdf" filename="Invoice01.pdf">UGxhaW4gdGV4dCBpbiBwbGFjZSBvZiBwZGYgYXR0YWNobWVudCBmb3Igc2FtcGxlIGludm9pY2Vz</cbc:EmbeddedDocumentBinaryObject>
		</cac:Attachment>
	</cac:AdditionalDocumentReference>
	<cac:AccountingSupplierParty>
		<!-- Seller details -->
		<cac:Party>
			<cbc:EndpointID schemeID="0151">47555222000</cbc:EndpointID> <!-- Seller 'Peppol ID' -->
			<cac:PostalAddress>
				<cbc:CityName>Harrison</cbc:CityName>
				<cbc:PostalZone>2912</cbc:PostalZone>
				<cbc:CountrySubentity>NSW</cbc:CountrySubentity>
				<cac:Country>
					<cbc:IdentificationCode>AU</cbc:IdentificationCode>
				</cac:Country>
			</cac:PostalAddress>
			<cac:PartyLegalEntity>
				<cbc:RegistrationName>Grey Roo Energy</cbc:RegistrationName>
				<cbc:CompanyID schemeID="0151">47555222000</cbc:CompanyID> <!-- Seller ABN -->
			</cac:PartyLegalEntity>
		</cac:Party>
	</cac:AccountingSupplierParty>
	<cac:AccountingCustomerParty>
		<!-- Buyer/customer details -->
		<cac:Party>
			<cbc:EndpointID schemeID="0151">91888222000</cbc:EndpointID> <!-- Buyer/customer 'Peppol ID' -->
			<cac:PartyIdentification>
				<cbc:ID>AccountNumber123</cbc:ID> <!-- Buyer/customer account number, assigned by the supplier -->
			</cac:PartyIdentification>
			<cac:PostalAddress>
				<cbc:StreetName>100 Queen Street</cbc:StreetName>
				<cbc:CityName>Sydney</cbc:CityName>
				<cbc:PostalZone>2000</cbc:PostalZone>
				<cbc:CountrySubentity>NSW</cbc:CountrySubentity>
				<cac:Country>
					<cbc:IdentificationCode>AU</cbc:IdentificationCode>
				</cac:Country>
			</cac:PostalAddress>
			<cac:PartyLegalEntity>
				<cbc:RegistrationName>Trotters Incorporated</cbc:RegistrationName>
				<cbc:CompanyID schemeID="0151">91888222000</cbc:CompanyID> <!-- Buyer/customer ABN -->
			</cac:PartyLegalEntity>
			<cac:Contact>
				<cbc:Name>Lisa Johnson</cbc:Name>
			</cac:Contact>
		</cac:Party>
	</cac:AccountingCustomerParty>
	<cac:TaxTotal>
		<cbc:TaxAmount currencyID="AUD">15.94</cbc:TaxAmount>
		<cac:TaxSubtotal>
			<!-- Subtotal for 'S' Standard-rated tax category of 10% GST -->
			<cbc:TaxableAmount currencyID="AUD">159.43</cbc:TaxableAmount>
			<cbc:TaxAmount currencyID="AUD">15.94</cbc:TaxAmount>
			<cac:TaxCategory>
				<cbc:ID>S</cbc:ID>
				<cbc:Percent>10</cbc:Percent>
				<cac:TaxScheme>
					<cbc:ID>GST</cbc:ID>
				</cac:TaxScheme>
			</cac:TaxCategory>
		</cac:TaxSubtotal>
		<cac:TaxSubtotal>
			<!-- Subtotal for 'Z' Zero-rated tax category of 0% GST -->
			<cbc:TaxableAmount currencyID="AUD">-13.5</cbc:TaxableAmount>
			<cbc:TaxAmount currencyID="AUD">0.00</cbc:TaxAmount>
			<cac:TaxCategory>
				<cbc:ID>Z</cbc:ID>
				<cbc:Percent>0</cbc:Percent>
				<cac:TaxScheme>
					<cbc:ID>GST</cbc:ID>
				</cac:TaxScheme>
			</cac:TaxCategory>
		</cac:TaxSubtotal>
	</cac:TaxTotal>
	<cac:LegalMonetaryTotal>
		<cbc:LineExtensionAmount currencyID="AUD">145.93</cbc:LineExtensionAmount>
		<cbc:TaxExclusiveAmount currencyID="AUD">145.93</cbc:TaxExclusiveAmount>
		<cbc:TaxInclusiveAmount currencyID="AUD">161.87</cbc:TaxInclusiveAmount>
		<cbc:PayableAmount currencyID="AUD">161.87</cbc:PayableAmount> <!-- New charges invoiced (excluding prior unpaid amount) -->
	</cac:LegalMonetaryTotal>
	<cac:InvoiceLine>
		<!-- Line with 10% GST -->
		<cbc:ID>1</cbc:ID>
		<cbc:InvoicedQuantity unitCode="KWH">325.2</cbc:InvoicedQuantity>
		<cbc:LineExtensionAmount currencyID="AUD">129.04</cbc:LineExtensionAmount>
		<cac:Item>
			<cbc:Name>Electricity charges - all day rate NMI 9000074677</cbc:Name>
			<cac:ClassifiedTaxCategory>
				<cbc:ID>S</cbc:ID>
				<cbc:Percent>10</cbc:Percent> <!-- 10% GST -->
				<cac:TaxScheme>
					<cbc:ID>GST</cbc:ID>
				</cac:TaxScheme>
			</cac:ClassifiedTaxCategory>
		</cac:Item>
		<cac:Price>
			<cbc:PriceAmount currencyID="AUD">0.3968</cbc:PriceAmount>
		</cac:Price>
	</cac:InvoiceLine>
	<cac:InvoiceLine>
		<!-- Line with credit value and zero GST -->
		<cbc:ID>2</cbc:ID>
		<cbc:InvoicedQuantity unitCode="KWH">-150</cbc:InvoicedQuantity>
		<cbc:LineExtensionAmount currencyID="AUD">-13.5</cbc:LineExtensionAmount>
		<cac:Item>
			<cbc:Name>Solar feed-in rebate NMI 9000074677</cbc:Name>
			<cac:ClassifiedTaxCategory>
				<cbc:ID>Z</cbc:ID>
				<cbc:Percent>0</cbc:Percent> <!-- 0% GST -->
				<cac:TaxScheme>
					<cbc:ID>GST</cbc:ID>
				</cac:TaxScheme>
			</cac:ClassifiedTaxCategory>
		</cac:Item>
		<cac:Price>
			<cbc:PriceAmount currencyID="AUD">0.09</cbc:PriceAmount>
		</cac:Price>
	</cac:InvoiceLine>
	<cac:InvoiceLine>
		<!-- Line with 10% GST -->
		<cbc:ID>3</cbc:ID>
		<cbc:InvoicedQuantity unitCode="DAY">31</cbc:InvoicedQuantity>
		<cbc:LineExtensionAmount currencyID="AUD">30.39</cbc:LineExtensionAmount>
		<cac:Item>
			<cbc:Name>Supply charge</cbc:Name>
			<cac:ClassifiedTaxCategory>
				<cbc:ID>S</cbc:ID>
				<cbc:Percent>10</cbc:Percent> <!-- 10% GST -->
				<cac:TaxScheme>
					<cbc:ID>GST</cbc:ID>
				</cac:TaxScheme>
			</cac:ClassifiedTaxCategory>
		</cac:Item>
		<cac:Price>
			<cbc:PriceAmount currencyID="AUD">0.9803</cbc:PriceAmount>
		</cac:Price>
	</cac:InvoiceLine>
</Invoice>
`;
const xml3 = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Example of 'mixed' taxable and non-taxable supplies and some optional data
(payment terms specifying a conditional discount, delivery location, payment means/options, invoiced objects) -->
<Invoice xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2" xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2" xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2">
	<cbc:CustomizationID>urn:cen.eu:en16931:2017#conformant#urn:fdc:peppol.eu:2017:poacc:billing:international:aunz:3.0</cbc:CustomizationID>
	<cbc:ProfileID>urn:fdc:peppol.eu:2017:poacc:billing:01:1.0</cbc:ProfileID>
	<cbc:ID>Invoice01</cbc:ID>
	<cbc:IssueDate>2022-07-29</cbc:IssueDate>
	<cbc:DueDate>2022-08-30</cbc:DueDate>
	<cbc:InvoiceTypeCode>380</cbc:InvoiceTypeCode>
	<cbc:Note>Tax invoice. A discount of $6.14 applies if you pay by the due date.</cbc:Note> <!-- Free text field can bring attention to conditional discount etc. -->
	<cbc:DocumentCurrencyCode>AUD</cbc:DocumentCurrencyCode>
	<cbc:BuyerReference>Simple solar plan</cbc:BuyerReference> <!-- Purchase Order and/or Buyer Reference MUST be provided -->
	<cac:InvoicePeriod>
		<!-- Period is optional at the invoice and line levels -->
		<cbc:StartDate>2022-06-15</cbc:StartDate>
		<cbc:EndDate>2022-07-15</cbc:EndDate>
	</cac:InvoicePeriod>
	<cac:AdditionalDocumentReference>
		<!-- Multiple attachments and external links may optionally be included -->
		<cbc:ID>Invoice01.pdf</cbc:ID>
		<cac:Attachment>
			<!-- For brevity, this sample Attachment is not representative of an embedded pdf -->
			<cbc:EmbeddedDocumentBinaryObject mimeCode="application/pdf" filename="Invoice01.pdf">UGxhaW4gdGV4dCBpbiBwbGFjZSBvZiBwZGYgYXR0YWNobWVudCBmb3Igc2FtcGxlIGludm9pY2Vz</cbc:EmbeddedDocumentBinaryObject>
		</cac:Attachment>
	</cac:AdditionalDocumentReference>
	<cac:AdditionalDocumentReference>
		<!-- Example of a link to web content -->
		<cbc:ID>Online</cbc:ID>
		<cbc:DocumentDescription>Supporting information</cbc:DocumentDescription>
		<cac:Attachment>
			<cac:ExternalReference>
				<cbc:URI>abc.com</cbc:URI>
			</cac:ExternalReference>
		</cac:Attachment>
	</cac:AdditionalDocumentReference>
	<cac:AdditionalDocumentReference>
		<!-- Invoiced object (e.g. equipment serial nbr) can be included at invoice and/or line levels -->
		<cbc:ID>NMI 9000074677</cbc:ID>
		<cbc:DocumentTypeCode>130</cbc:DocumentTypeCode>
	</cac:AdditionalDocumentReference>
	<cac:AccountingSupplierParty>
		<!-- Seller details -->
		<cac:Party>
			<cbc:EndpointID schemeID="0151">47555222000</cbc:EndpointID> <!-- Seller 'Peppol ID' -->
			<cac:PostalAddress>
				<cbc:CityName>Harrison</cbc:CityName>
				<cbc:PostalZone>2912</cbc:PostalZone>
				<cbc:CountrySubentity>NSW</cbc:CountrySubentity>
				<cac:Country>
					<cbc:IdentificationCode>AU</cbc:IdentificationCode>
				</cac:Country>
			</cac:PostalAddress>
			<cac:PartyLegalEntity>
				<cbc:RegistrationName>Grey Roo Energy</cbc:RegistrationName>
				<cbc:CompanyID schemeID="0151">47555222000</cbc:CompanyID> <!-- Seller ABN -->
			</cac:PartyLegalEntity>
		</cac:Party>
	</cac:AccountingSupplierParty>
	<cac:AccountingCustomerParty>
		<!-- Buyer/customer details -->
		<cac:Party>
			<cbc:EndpointID schemeID="0151">91888222000</cbc:EndpointID> <!-- Buyer/customer 'Peppol ID' -->
			<cac:PartyIdentification>
				<cbc:ID>AccountNumber123</cbc:ID> <!-- Buyer/customer account number, assigned by the supplier -->
			</cac:PartyIdentification>
			<cac:PostalAddress>
				<cbc:StreetName>100 Queen Street</cbc:StreetName>
				<cbc:CityName>Sydney</cbc:CityName>
				<cbc:PostalZone>2000</cbc:PostalZone>
				<cbc:CountrySubentity>NSW</cbc:CountrySubentity>
				<cac:Country>
					<cbc:IdentificationCode>AU</cbc:IdentificationCode>
				</cac:Country>
			</cac:PostalAddress>
			<cac:PartyLegalEntity>
				<cbc:RegistrationName>Trotters Incorporated</cbc:RegistrationName>
				<cbc:CompanyID schemeID="0151">91888222000</cbc:CompanyID> <!-- Buyer/customer ABN -->
			</cac:PartyLegalEntity>
			<cac:Contact>
				<cbc:Name>Lisa Johnson</cbc:Name>
			</cac:Contact>
		</cac:Party>
	</cac:AccountingCustomerParty>
	<cac:Delivery>
		<!-- Delivery date, location and/or person/entity may optionally be included -->
		<cac:DeliveryLocation>
			<cac:Address>
				<cbc:StreetName>Floor 15</cbc:StreetName>
				<cbc:AdditionalStreetName>100 Queen Street</cbc:AdditionalStreetName>
				<cbc:CityName>Sydney</cbc:CityName>
				<cbc:PostalZone>2000</cbc:PostalZone>
				<cbc:CountrySubentity>NSW</cbc:CountrySubentity>
				<cac:AddressLine>
					<cbc:Line>Unit 1</cbc:Line>
				</cac:AddressLine>
				<cac:Country>
					<cbc:IdentificationCode>AU</cbc:IdentificationCode>
				</cac:Country>
			</cac:Address>
		</cac:DeliveryLocation>
	</cac:Delivery>
	<cac:PaymentMeans>
		<!-- Multiple payment means/options may be included (refer to https://github.com/A-NZ-PEPPOL for detailed guidance) -->
		<cbc:PaymentMeansCode name="Credit transfer">30</cbc:PaymentMeansCode>
		<cbc:PaymentID>AccountNumber123</cbc:PaymentID> <!-- This is the customer/payment reference number to help the Seller assign an incoming payment/reconciliation-->
		<cac:PayeeFinancialAccount>
			<cbc:ID>https://www.yourpaymentwebsite.com.au/pay</cbc:ID>
			<cbc:Name>Supplier ABC</cbc:Name>
			<cac:FinancialInstitutionBranch>
				<cbc:ID>URI</cbc:ID>
			</cac:FinancialInstitutionBranch>
		</cac:PayeeFinancialAccount>
	</cac:PaymentMeans>
	<cac:PaymentMeans>
		<cbc:PaymentMeansCode>30</cbc:PaymentMeansCode>
		<cbc:PaymentID>AccountNumber123</cbc:PaymentID> <!-- This is the customer/payment reference number to help the Seller assign an incoming payment/reconciliation-->
		<cac:PayeeFinancialAccount>
			<cbc:ID>12345</cbc:ID> <!-- This is the BPAY Biller code -->
			<cbc:Name>Abc Ltd.</cbc:Name>
			<cac:FinancialInstitutionBranch>
				<cbc:ID>BPAY</cbc:ID>
			</cac:FinancialInstitutionBranch>
		</cac:PayeeFinancialAccount>
	</cac:PaymentMeans>
	<cac:PaymentTerms>
		<!-- Optional free-text field -->
		<cbc:Note>Discount of 3.5% applies if you pay by the due date and there is no outstanding amounts from prior bills</cbc:Note>
	</cac:PaymentTerms>
	<cac:TaxTotal>
		<cbc:TaxAmount currencyID="AUD">15.94</cbc:TaxAmount>
		<cac:TaxSubtotal>
			<!-- Subtotal for 'S' Standard-rated tax category of 10% GST -->
			<cbc:TaxableAmount currencyID="AUD">159.43</cbc:TaxableAmount>
			<cbc:TaxAmount currencyID="AUD">15.94</cbc:TaxAmount>
			<cac:TaxCategory>
				<cbc:ID>S</cbc:ID>
				<cbc:Percent>10</cbc:Percent>
				<cac:TaxScheme>
					<cbc:ID>GST</cbc:ID>
				</cac:TaxScheme>
			</cac:TaxCategory>
		</cac:TaxSubtotal>
		<cac:TaxSubtotal>
			<!-- Subtotal for 'Z' Zero-rated tax category of 0% GST -->
			<cbc:TaxableAmount currencyID="AUD">-13.5</cbc:TaxableAmount>
			<cbc:TaxAmount currencyID="AUD">0.00</cbc:TaxAmount>
			<cac:TaxCategory>
				<cbc:ID>Z</cbc:ID>
				<cbc:Percent>0</cbc:Percent>
				<cac:TaxScheme>
					<cbc:ID>GST</cbc:ID>
				</cac:TaxScheme>
			</cac:TaxCategory>
		</cac:TaxSubtotal>
	</cac:TaxTotal>
	<cac:LegalMonetaryTotal>
		<cbc:LineExtensionAmount currencyID="AUD">145.93</cbc:LineExtensionAmount>
		<cbc:TaxExclusiveAmount currencyID="AUD">145.93</cbc:TaxExclusiveAmount>
		<cbc:TaxInclusiveAmount currencyID="AUD">161.87</cbc:TaxInclusiveAmount>
		<cbc:PayableAmount currencyID="AUD">161.87</cbc:PayableAmount> <!-- New charges invoiced (excluding prior unpaid amount) -->
	</cac:LegalMonetaryTotal>
	<cac:InvoiceLine>
		<!-- Line with 10% GST -->
		<cbc:ID>1</cbc:ID>
		<cbc:InvoicedQuantity unitCode="KWH">325.2</cbc:InvoicedQuantity>
		<cbc:LineExtensionAmount currencyID="AUD">129.04</cbc:LineExtensionAmount>
		<cac:DocumentReference>
			<!-- Invoiced object (e.g. equipment serial nbr) can be included at invoice and/or line levels -->
			<cbc:ID>NMI 9000074677</cbc:ID>
			<cbc:DocumentTypeCode>130</cbc:DocumentTypeCode>
		</cac:DocumentReference>
		<cac:Item>
			<cbc:Name>Electricity charges - all day rate NMI 9000074677</cbc:Name> <!-- Details in Item Name may assist buyers/customers who use simple accounting solutions  -->
			<cac:ClassifiedTaxCategory>
				<cbc:ID>S</cbc:ID>
				<cbc:Percent>10</cbc:Percent> <!-- 10% GST -->
				<cac:TaxScheme>
					<cbc:ID>GST</cbc:ID>
				</cac:TaxScheme>
			</cac:ClassifiedTaxCategory>
		</cac:Item>
		<cac:Price>
			<cbc:PriceAmount currencyID="AUD">0.3968</cbc:PriceAmount>
		</cac:Price>
	</cac:InvoiceLine>
	<cac:InvoiceLine>
		<!-- Line with credit value and zero GST -->
		<cbc:ID>2</cbc:ID>
		<cbc:InvoicedQuantity unitCode="KWH">-150</cbc:InvoicedQuantity>
		<cbc:LineExtensionAmount currencyID="AUD">-13.5</cbc:LineExtensionAmount>
		<cac:DocumentReference>
			<cbc:ID>NMI 9000074677</cbc:ID>
			<cbc:DocumentTypeCode>130</cbc:DocumentTypeCode>
		</cac:DocumentReference>
		<cac:Item>
			<cbc:Name>Solar feed-in rebate NMI 9000074677</cbc:Name>
			<cac:ClassifiedTaxCategory>
				<cbc:ID>Z</cbc:ID>
				<cbc:Percent>0</cbc:Percent> <!-- 0% GST -->
				<cac:TaxScheme>
					<cbc:ID>GST</cbc:ID>
				</cac:TaxScheme>
			</cac:ClassifiedTaxCategory>
		</cac:Item>
		<cac:Price>
			<cbc:PriceAmount currencyID="AUD">0.09</cbc:PriceAmount>
		</cac:Price>
	</cac:InvoiceLine>
	<cac:InvoiceLine>
		<!-- Line with 10% GST -->
		<cbc:ID>3</cbc:ID>
		<cbc:InvoicedQuantity unitCode="DAY">31</cbc:InvoicedQuantity>
		<cbc:LineExtensionAmount currencyID="AUD">30.39</cbc:LineExtensionAmount>
		<cac:Item>
			<cbc:Name>Supply charge</cbc:Name>
			<cac:ClassifiedTaxCategory>
				<cbc:ID>S</cbc:ID>
				<cbc:Percent>10</cbc:Percent> <!-- 10% GST -->
				<cac:TaxScheme>
					<cbc:ID>GST</cbc:ID>
				</cac:TaxScheme>
			</cac:ClassifiedTaxCategory>
		</cac:Item>
		<cac:Price>
			<cbc:PriceAmount currencyID="AUD">0.9803</cbc:PriceAmount>
		</cac:Price>
	</cac:InvoiceLine>
</Invoice>
`;
const xml4 = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Example of a simple negative invoice -->
<Invoice xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2" xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2" xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2">
	<cbc:CustomizationID>urn:cen.eu:en16931:2017#conformant#urn:fdc:peppol.eu:2017:poacc:billing:international:aunz:3.0</cbc:CustomizationID>
	<cbc:ProfileID>urn:fdc:peppol.eu:2017:poacc:billing:01:1.0</cbc:ProfileID>
	<cbc:ID>Invoice03</cbc:ID>
	<cbc:IssueDate>2022-07-31</cbc:IssueDate>
	<cbc:InvoiceTypeCode>380</cbc:InvoiceTypeCode>
	<cbc:Note>Adjustment note to reverse prior bill Invoice01.</cbc:Note><!-- Free text field can bring attention to reason for credit etc. -->
	<cbc:DocumentCurrencyCode>AUD</cbc:DocumentCurrencyCode>
	<cbc:BuyerReference>Simple solar plan</cbc:BuyerReference>
	<cac:InvoicePeriod>
		<!-- Period is optional at the invoice and line levels -->
		<cbc:StartDate>2022-06-15</cbc:StartDate>
		<cbc:EndDate>2022-07-15</cbc:EndDate>
	</cac:InvoicePeriod>
	<cac:BillingReference>
		<cac:InvoiceDocumentReference>
			<cbc:ID>Invoice01</cbc:ID>
			<cbc:IssueDate>2022-07-29</cbc:IssueDate>
		</cac:InvoiceDocumentReference>
	</cac:BillingReference>
	<cac:AdditionalDocumentReference>
		<!-- Multiple attachments and external links may optionally be included -->
		<cbc:ID>Invoice03.pdf</cbc:ID>
		<cac:Attachment>
			<!-- For brevity, this sample Attachment is not representative of an embedded pdf -->
			<cbc:EmbeddedDocumentBinaryObject mimeCode="application/pdf" filename="Invoice03.pdf">UGxhaW4gdGV4dCBpbiBwbGFjZSBvZiBwZGYgYXR0YWNobWVudCBmb3Igc2FtcGxlIGludm9pY2Vz</cbc:EmbeddedDocumentBinaryObject>
		</cac:Attachment>
	</cac:AdditionalDocumentReference>
	<cac:AccountingSupplierParty>
		<!-- Seller details -->
		<cac:Party>
			<cbc:EndpointID schemeID="0151">47555222000</cbc:EndpointID><!-- Seller 'Peppol ID' -->
			<cac:PostalAddress>
				<cbc:CityName>Harrison</cbc:CityName>
				<cbc:PostalZone>2912</cbc:PostalZone>
				<cbc:CountrySubentity>NSW</cbc:CountrySubentity>
				<cac:Country>
					<cbc:IdentificationCode>AU</cbc:IdentificationCode>
				</cac:Country>
			</cac:PostalAddress>
			<cac:PartyLegalEntity>
				<cbc:RegistrationName>Grey Roo Energy</cbc:RegistrationName>
				<cbc:CompanyID schemeID="0151">47555222000</cbc:CompanyID><!-- Seller ABN -->
			</cac:PartyLegalEntity>
		</cac:Party>
	</cac:AccountingSupplierParty>
	<cac:AccountingCustomerParty>
		<!-- Buyer/customer details -->
		<cac:Party>
			<cbc:EndpointID schemeID="0151">91888222000</cbc:EndpointID><!-- Buyer/customer 'Peppol ID' -->
			<cac:PartyIdentification>
				<cbc:ID>AccountNumber123</cbc:ID><!-- Buyer/customer account number, assigned by the supplier -->
			</cac:PartyIdentification>
			<cac:PostalAddress>
				<cbc:StreetName>100 Queen Street</cbc:StreetName>
				<cbc:CityName>Sydney</cbc:CityName>
				<cbc:PostalZone>2000</cbc:PostalZone>
				<cbc:CountrySubentity>NSW</cbc:CountrySubentity>
				<cac:Country>
					<cbc:IdentificationCode>AU</cbc:IdentificationCode>
				</cac:Country>
			</cac:PostalAddress>
			<cac:PartyLegalEntity>
				<cbc:RegistrationName>Trotters Incorporated</cbc:RegistrationName>
				<cbc:CompanyID schemeID="0151">91888222000</cbc:CompanyID><!-- Buyer/customer ABN -->
			</cac:PartyLegalEntity>
			<cac:Contact>
				<cbc:Name>Lisa Johnson</cbc:Name>
			</cac:Contact>
		</cac:Party>
	</cac:AccountingCustomerParty>
	<cac:TaxTotal>
		<cbc:TaxAmount currencyID="AUD">-15.94</cbc:TaxAmount>
		<cac:TaxSubtotal>
			<!-- Subtotal for 'S' Standard-rated tax category of 10% GST -->
			<cbc:TaxableAmount currencyID="AUD">-159.43</cbc:TaxableAmount>
			<cbc:TaxAmount currencyID="AUD">-15.94</cbc:TaxAmount>
			<cac:TaxCategory>
				<cbc:ID>S</cbc:ID>
				<cbc:Percent>10</cbc:Percent>
				<cac:TaxScheme>
					<cbc:ID>GST</cbc:ID>
				</cac:TaxScheme>
			</cac:TaxCategory>
		</cac:TaxSubtotal>
	</cac:TaxTotal>
	<cac:LegalMonetaryTotal>
		<cbc:LineExtensionAmount currencyID="AUD">-159.43</cbc:LineExtensionAmount>
		<cbc:TaxExclusiveAmount currencyID="AUD">-159.43</cbc:TaxExclusiveAmount>
		<cbc:TaxInclusiveAmount currencyID="AUD">-175.37</cbc:TaxInclusiveAmount>
		<cbc:PayableAmount currencyID="AUD">-175.37</cbc:PayableAmount><!-- Credited to account -->
	</cac:LegalMonetaryTotal>
	<cac:InvoiceLine>
		<!-- Line with 10% GST -->
		<cbc:ID>1</cbc:ID>
		<cbc:InvoicedQuantity unitCode="KWH">-325.2</cbc:InvoicedQuantity>
		<cbc:LineExtensionAmount currencyID="AUD">-129.04</cbc:LineExtensionAmount>
		<cac:Item>
			<cbc:Name>Adjustment - reverse prior Electricity charges - all day rate NMI 9000074677</cbc:Name>
			<cac:ClassifiedTaxCategory>
				<cbc:ID>S</cbc:ID>
				<cbc:Percent>10</cbc:Percent><!-- 10% GST -->
				<cac:TaxScheme>
					<cbc:ID>GST</cbc:ID>
				</cac:TaxScheme>
			</cac:ClassifiedTaxCategory>
		</cac:Item>
		<cac:Price>
			<cbc:PriceAmount currencyID="AUD">0.3968</cbc:PriceAmount>
		</cac:Price>
	</cac:InvoiceLine>
	<cac:InvoiceLine>
		<!-- Line with 10% GST -->
		<cbc:ID>2</cbc:ID>
		<cbc:InvoicedQuantity unitCode="DAY">-31</cbc:InvoicedQuantity>
		<cbc:LineExtensionAmount currencyID="AUD">-30.39</cbc:LineExtensionAmount>
		<cac:Item>
			<cbc:Name>Adjustment - reverse prior Supply charge</cbc:Name>
			<cac:ClassifiedTaxCategory>
				<cbc:ID>S</cbc:ID>
				<cbc:Percent>10</cbc:Percent><!-- 10% GST -->
				<cac:TaxScheme>
					<cbc:ID>GST</cbc:ID>
				</cac:TaxScheme>
			</cac:ClassifiedTaxCategory>
		</cac:Item>
		<cac:Price>
			<cbc:PriceAmount currencyID="AUD">0.9803</cbc:PriceAmount>
		</cac:Price>
	</cac:InvoiceLine>
</Invoice>`;

module.exports = {xml1, xml2, xml3, xml4};
