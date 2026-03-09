public with sharing class Contact {
    public Contact() {

    }
    @AuraEnabled
    public static List<Contact> getContacts(){
        try {
            return [SELECT Id, Name, Email, Phone, CreatedDate , Account.Name FROM Contact ORDER BY CreatedDate LIMIT 6];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}