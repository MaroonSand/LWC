public with sharing class BryanBadge {
    @auraEnabled
    public static void insertBryan(string firstName, string lastName) 
    {
        Contact c = new Contact();
        c.firstname = firstName;
        c.lastName = lastName;

        system.debug('this is the last name ' + lastName);
        system.debug('this is the first name ' + firstName);

        insert c;
    }
}
