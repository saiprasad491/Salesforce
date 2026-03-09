public with sharing class ContactController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(){
        return [SELECT Id, Name, Email, Phone, CreatedDate , Account.Name FROM Contact ORDER BY CreatedDate LIMIT 6];
        // return [SELECT Id,Name,Custom_Account__c FROM Contact LIMIT 2];
        // return [SELECT Id,Name,Custom_Account__c,Custom_Account__r.Phone FROM Contact LIMIT 2];
    }
    @AuraEnabled
    public static void contactObjInsert(String fname,String lname, String email,String Phone){
        try {
            Contact con = new Contact();
            con.FirstName=fname;
            con.LastName=lname;
            con.Email= email;
            con.Phone=Phone;
            insert con;
        }
        catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}