# Model Spec

- Account
- Favorite Vendor
- PrintingOffer
- PrintingMedium
- DocumentType
- Printer
- Order
- Document
- Order Document (Junction)
- Vendor Review
- Offer Spec
- SpecCriteriaPrintingMedium (Junction)
- SpecCriteriaDocType (Junction)

---

## Account

### Fields

id  
first Name  
last Name  
contact (Generalize to diff types i.e Snapchat, Insite, etc)  
bio  
password (hash)  
isVendor

### Associations

Has many orders  
Has many printing_offers  
Has many documents  
Has many reviews left  
Has many reviews received (rating)

---

## Favorite Vendor

### Fields

id  
owner  
vendor

### Associations

Has one owner  
Has one vendor (the one being favorited)

---

## PrintingOffer

### Fields

id  
owner  
printerName  
printer  
minPrice  
maxPrice  
note

### Associations

PrintingOffer has one account tied to it (owner)  
PrintingOffer can have many document types (represent files supported)  
PrintingOffer has one printer
PrintingOffer has multiple offer spec

---

## PrintingMedium

### Fields

id  
name  
description

### Associations

Printer can have multiple supported printing mediums
Can be connected to offer specs

---

## DocumentType

### Fields

id  
name  
extension  
info

### Associations

belongs to general printers  
has many offer specs connected to it

---

## Printer

### Fields

id  
name  
upc  
manufacturer

### Associations

Has printing mediums  
Has document types

---

## Order

Account has many orders  
order has 2 accounts (vendor, and recipient)

### Fields

address
orderer  
lat  
lon  
pickup  
shipping
printing_offer

### Associations

Has many OrderDocuments  
Has one orderer (Account)  
Has one vendor (Account) through printing offer
Connected to a printing offer

---

## Document

### Fields

id  
owner  
documentType  
uploadedFile  
printingMedium

### Associations

can be attached to several order documents  
Account can have multiple documents

---

## Order Document (Junction Table)

### Fields

id  
order  
document

### Associations

Connected to one document  
Connected to one order

---

## VendorReview

### Fields

id  
author  
reviewedVendor

### Associations

Connected to 2 accounts  
1 Account is the Author  
1 Account is the Vendor

---

## Offer Spec

### Fields

id
printing_offer
description

### Associations

Connected to one printing offer  
Can have many spec criteria printing mediums, document types etc

---

## Spec Criteria Printing Medium (Junction)

### Fields

id  
offer_spec  
printing_medium

### Associations

Connected to one offer spec
Connected to one printing medium

---

## Spec Criteria Document Type (Junction)

### Fields

id  
offer_spec  
document_type

### Associations

Connected to one offer spec  
Connected to one document type
