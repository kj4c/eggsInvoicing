CREATE DATABASE seng2021_db;

CREATE TABLE IF NOT EXISTS users (
  uid           serial primary key,
  email         varchar(225) not null,
  phone_no      varchar(10) not null,
  username      varchar(225) not null,
  hashed_password      varchar(225) not null,
  notifications integer ARRAY
);

CREATE TABLE IF NOT EXISTS sent_invoices (
  invoice_id        serial primary key,
  sender_email      varchar(225) not null,
  receiver_email    varchar(225) not null,
  invoices          text ARRAY not null,
  type              varchar(225) not null,
  sent_at           timestamptz not null default now()
);

INSERT INTO users (email, phone_no, username, hashed_password) VALUES('dummy@gmail.com', '0123456789', 'dummy', 'password123');

INSERT INTO users (email, phone_no, username, hashed_password) VALUES('dummy2@gmail.com', '9876543210', 'dummy2', 'password123');

INSERT INTO users (email, phone_no, username, hashed_password) VALUES('dummy3@gmail.com', '1029384756', 'dummy3', 'password123');

INSERT INTO sent_invoices (sender_email, receiver_email, xml_invoices) VALUES ('dummy@gmail.com', 'dummy2@gmail.com', '{"xml1", "xml2", "xml3"}');

INSERT INTO sent_invoices (sender_email, receiver_email, xml_invoices) VALUES ('dummy@gmail2.com', 'dummy1@gmail.com', '{"xml3", "xml2", "xml1"}');

update users set notifications = array_append(notifications, 1) where users.uid = 2;
update users set notifications = array_append(notifications, 2) where users.uid = 1;

INSERT INTO send_invoice (sender, receiver, invoice_xml) VALUES (1, 2, 
'<?xml version="1.0" encoding="UTF-8"?>
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


</Invoice>');