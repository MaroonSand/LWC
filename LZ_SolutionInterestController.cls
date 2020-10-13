public with sharing class LZ_SolutionInterestController {
    @AuraEnabled
    public static wrapperForSolutionInterest getSolutions(String recordId) 
    {
        wrapperForSolutionInterest wrapperForSolutionInt = new wrapperForSolutionInterest();
        system.debug('this is being called');
        map<String,String> solutionMap = new map<String,String>();
        String[] labelValueList;
        Platform__c[] solutionList = [Select Id, Name from Platform__c];

        for(Platform__c s : solutionList)
        {
            solutionMap.put(s.Name,s.Id);
        }
        
        wrapperForSolutionInt.optionMap = solutionMap;
        
        system.debug('getting values ' + recordId);
        String[] values = new string[]{};
        Product_Preference__c[] solutionInterestList = [Select Id, Name, Contact__c, Solution__c 
        from Product_Preference__c 
        where Contact__c = :recordId and RecordType.Name = 'Solution Interest'];
        system.debug('!!!!! SolutionSize ' + solutionInterestList.size());
        
        for(Product_Preference__c pP : solutionInterestList)
        {
            values.add(pP.Solution__c);
        }
        
        wrapperForSolutionInt.valueString = values;
        return wrapperForSolutionInt;
    }

    public class wrapperForSolutionInterest{
        @AuraEnabled public Map<String,String> optionMap{get;set;}
        @AuraEnabled public String[] valueString{get;set;}
    }
 
}